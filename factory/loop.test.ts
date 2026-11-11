import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  AGENT_CMD,
  agentRunner,
  ALLOWED_TOOLS,
  LOOP_IDLE_MS,
  main,
  PATCH_CMD,
  pickNext,
  prRunner,
  REVIEW_CMD,
  runLoop,
  type PrRunner,
  type RunResult,
  type Runner,
} from "./loop.ts";
import { AGENT_RESULT_SCHEMA, type AgentResult } from "./agent-result.ts";
import type { AuditEntry, AuditStore } from "./audit-log.ts";
import { attemptsStore, MAX_PR_ATTEMPTS, type AttemptsStore } from "./pr-attempts.ts";
import type { PrSource, PullRequest } from "./prs.ts";
import type { Task, TaskStatus } from "./tasks.schema.ts";
import type { TaskStore } from "./tasks.store.ts";

const task = (id: string, status: TaskStatus = "pending", dependencies: string[] = []): Task => ({
  id,
  title: `Task ${id}`,
  description: "d",
  acceptanceCriteria: ["c"],
  dependencies,
  status,
});

const PROCESSED: AgentResult = { outcome: "processed" };
const SKIPPED: AgentResult = { outcome: "skipped", reason: "PR is already merged" };

/** A runner result: exit 0 with a processed report unless told otherwise. */
const res = (exitCode = 0, report: AgentResult | null = exitCode === 0 ? PROCESSED : null): RunResult => ({ exitCode, report });

const NOOP_ATTEMPTS: AttemptsStore = {
  get: () => undefined,
  record: () => {},
  exceeded: () => false,
  flagForHuman: async () => {},
  sync: () => {},
};

/** In-memory store that records every status transition. */
function memStore(tasks: Task[]) {
  const history: string[] = [];
  const store: TaskStore = {
    load: () => tasks.map((t) => ({ ...t })),
    setStatus(id, status) {
      tasks.find((t) => t.id === id)!.status = status;
      history.push(`${id}:${status}`);
    },
    update(id, patch) {
      Object.assign(tasks.find((t) => t.id === id)!, patch);
    },
  };
  return { store, history, tasks };
}

/** Fake sleep that records its calls and aborts the signal after `after` of them (default: the first). */
function fakeSleep(after = 1, onCall: (n: number) => void = () => {}) {
  const controller = new AbortController();
  const calls: number[] = [];
  const sleep = async (ms: number) => {
    calls.push(ms);
    onCall(calls.length);
    if (calls.length >= after) controller.abort();
  };
  return { sleep, calls, signal: controller.signal };
}

describe("pickNext", () => {
  test("returns the first pending task with no dependencies", () => {
    expect(pickNext([task("A"), task("B")])?.id).toBe("A");
  });

  test("waits until every dependency is in pr", () => {
    expect(pickNext([task("A", "pending", ["B", "C"]), task("B", "pr"), task("C", "in_progress")])).toBeNull();
    expect(pickNext([task("A", "pending", ["B", "C"]), task("B", "pr"), task("C", "pr")])?.id).toBe("A");
  });

  test("a pending dependency blocks its dependent but is itself picked", () => {
    expect(pickNext([task("A", "pending", ["B"]), task("B")])?.id).toBe("B");
  });

  test("skips in_progress and pr tasks", () => {
    expect(pickNext([task("A", "in_progress"), task("B", "pr"), task("C")])?.id).toBe("C");
  });

  test("returns null when empty or nothing is ready", () => {
    expect(pickNext([])).toBeNull();
    expect(pickNext([task("A", "pr"), task("B", "in_progress")])).toBeNull();
  });

  test("never picks a task with an unknown dependency", () => {
    expect(pickNext([task("A", "pending", ["ghost"])])).toBeNull();
  });
});

describe("runLoop", () => {
  const ok: Runner = async () => res();

  test("moves each task pending -> in_progress -> pr, in dependency order", async () => {
    const { store, history } = memStore([task("B", "pending", ["A"]), task("A")]);
    expect(await runLoop(store, ok, undefined, fakeSleep())).toEqual({ ran: ["A", "B"], stoppedOn: null });
    expect(history).toEqual(["A:in_progress", "A:pr", "B:in_progress", "B:pr"]);
  });

  test("marks the task in_progress while the runner executes", async () => {
    const { store, tasks } = memStore([task("A")]);
    let seen: TaskStatus | undefined;
    await runLoop(
      store,
      async (t) => {
        seen = tasks.find((x) => x.id === t.id)?.status;
        return res();
      },
      undefined,
      fakeSleep(),
    );
    expect(seen).toBe("in_progress");
  });

  test("passes the picked task to the runner", async () => {
    const { store } = memStore([task("A")]);
    const got: string[] = [];
    await runLoop(store, async (t) => { got.push(t.title); return res(); }, undefined, fakeSleep());
    expect(got).toEqual(["Task A"]);
  });

  test("a non-zero exit returns the task to pending and stops the loop", async () => {
    const { store, tasks } = memStore([task("A"), task("B"), task("C")]);
    const run: Runner = async (t) => res(t.id === "B" ? 1 : 0);
    const s = fakeSleep();
    expect(await runLoop(store, run, undefined, s)).toEqual({ ran: ["A", "B"], stoppedOn: "B" });
    expect(s.calls).toEqual([]);
    expect(tasks.map((t) => t.status)).toEqual(["pr", "pending", "pending"]);
  });

  test("a throwing runner is treated as a failure", async () => {
    const { store, tasks } = memStore([task("A")]);
    const logs: string[] = [];
    const run: Runner = async () => {
      throw new Error("spawn failed");
    };
    expect(await runLoop(store, run, (m) => logs.push(m), fakeSleep())).toEqual({ ran: ["A"], stoppedOn: "A" });
    expect(tasks[0]?.status).toBe("pending");
    expect(logs.some((m) => m.includes("spawn failed"))).toBe(true);
  });

  test("does not start dependents of a failed task", async () => {
    const { store, history } = memStore([task("A"), task("B", "pending", ["A"])]);
    await runLoop(store, async () => res(1), undefined, fakeSleep());
    expect(history).toEqual(["A:in_progress", "A:pending"]);
  });

  test("sleeps LOOP_IDLE_MS when no task is ready and returns only once the signal aborts", async () => {
    const { store, history } = memStore([task("A", "in_progress"), task("B", "pr")]);
    const logs: string[] = [];
    const s = fakeSleep(3);
    expect(await runLoop(store, ok, (m) => logs.push(m), s)).toEqual({ ran: [], stoppedOn: null });
    expect(s.calls).toEqual([LOOP_IDLE_MS, LOOP_IDLE_MS, LOOP_IDLE_MS]);
    expect(LOOP_IDLE_MS).toBe(60_000);
    expect(history).toEqual([]);
  });

  test("logs the stuck in_progress warning once across several idle polls", async () => {
    const { store } = memStore([task("A", "in_progress")]);
    const logs: string[] = [];
    await runLoop(store, ok, (m) => logs.push(m), fakeSleep(4));
    expect(logs.filter((m) => m.includes("still in_progress") && m.includes("A"))).toHaveLength(1);
  });

  test("logs the stuck warning again when the stuck set changes", async () => {
    const { store, tasks } = memStore([task("A", "in_progress")]);
    const logs: string[] = [];
    const s = fakeSleep(3, (n) => {
      if (n === 2) tasks.push(task("B", "in_progress"));
    });
    await runLoop(store, ok, (m) => logs.push(m), s);
    expect(logs.filter((m) => m.includes("still in_progress"))).toHaveLength(2);
  });

  test("picks up a task appended during the idle sleep on the next poll", async () => {
    const { store, tasks, history } = memStore([task("A", "pr")]);
    const s = fakeSleep(2, (n) => {
      if (n === 1) tasks.push(task("B"));
    });
    expect(await runLoop(store, ok, undefined, s)).toEqual({ ran: ["B"], stoppedOn: null });
    expect(history).toEqual(["B:in_progress", "B:pr"]);
    expect(s.calls).toHaveLength(2);
  });

  test("aborting during a sleep returns without waiting for it to finish", async () => {
    const { store } = memStore([]);
    const controller = new AbortController();
    const never = () => new Promise<void>(() => {});
    const loop = runLoop(store, ok, undefined, { sleep: never, signal: controller.signal });
    controller.abort();
    expect(await loop).toEqual({ ran: [], stoppedOn: null });
  });

  test("does not start a task when the signal is already aborted", async () => {
    const { store, history } = memStore([task("A")]);
    const controller = new AbortController();
    controller.abort();
    await runLoop(store, ok, undefined, { signal: controller.signal });
    expect(history).toEqual([]);
  });

  test("picks up tasks appended while the loop runs", async () => {
    const { store, tasks } = memStore([task("A")]);
    const run: Runner = async (t) => {
      if (t.id === "A") tasks.push(task("B", "pending", ["A"]));
      return res();
    };
    expect((await runLoop(store, run, undefined, fakeSleep())).ran).toEqual(["A", "B"]);
  });
});

describe("runLoop PR routing", () => {
  const ok: Runner = async () => res();
  const pr = (number: number, over: Partial<PullRequest> = {}): PullRequest => ({
    number,
    url: `https://github.com/acme/widgets/pull/${number}`,
    repo: "acme/widgets",
    title: `PR ${number}`,
    branch: `feat/other-${number}`,
    createdAt: "2026-10-29T10:00:00.000Z",
    isDraft: false,
    headSha: `sha${number}`,
    ci: "pass",
    mergeable: "clean",
    reviewDecision: "none",
    labels: [],
    ...over,
  });
  const stamped = (id: string, createdAt: string): Task => ({ ...task(id), createdAt });

  /** PR source whose list reflects what the fake runner has done: reviewed PRs get approved, patched ones go green. */
  function world(prs: PullRequest[]) {
    const calls: string[] = [];
    const flagged: number[] = [];
    const source: PrSource = { list: async () => prs.map((p) => ({ ...p })) };
    const real = attemptsStore(join(mkdtempSync(join(tmpdir(), "loop-")), "attempts.json"));
    const attempts: AttemptsStore = {
      ...real,
      flagForHuman: async (n) => {
        flagged.push(n);
        await real.flagForHuman(n, async () => ({ exitCode: 0, stdout: "", stderr: "" }));
        const p = prs.find((x) => x.number === n)!;
        p.labels = [...p.labels, "needs-human"];
      },
    };
    return { source, attempts, calls, flagged, prs };
  }

  test("runs the oldest candidate first across tasks and PRs", async () => {
    const w = world([pr(7, { createdAt: "2026-10-29T10:00:00.000Z" }), pr(9, { createdAt: "2026-10-29T12:00:00.000Z" })]);
    const { store } = memStore([stamped("T1", "2026-10-29T11:00:00.000Z")]);
    const order: string[] = [];
    const run: Runner = async (t) => { order.push(`task ${t.id}`); return res(); };
    const runPr: PrRunner = async (p, a) => { order.push(`${a} ${p.number}`); return res(); };
    await runLoop(store, run, undefined, { ...fakeSleep(), prs: w.source, attempts: w.attempts, runPr });
    expect(order.slice(0, 3)).toEqual(["review 7", "task T1", "review 9"]);
  });

  test("a review and a patch route to their own command with {pr} substituted", async () => {
    const dir = mkdtempSync(join(tmpdir(), "loop-cmd-"));
    const reviewOut = join(dir, "review");
    const patchOut = join(dir, "patch");
    const reviewCmd = ["sh", "-c", `echo "$0" > ${reviewOut}`, "{pr}"];
    const patchCmd = ["sh", "-c", `echo "$0" > ${patchOut}`, "{pr}"];
    const run = prRunner(reviewCmd, patchCmd);
    expect((await run(pr(12), "review")).exitCode).toBe(0);
    expect((await run(pr(34), "patch")).exitCode).toBe(0);
    expect(readFileSync(reviewOut, "utf8").trim()).toBe("12");
    expect(readFileSync(patchOut, "utf8").trim()).toBe("34");
    expect(REVIEW_CMD.some((a) => a.includes("{pr}"))).toBe(true);
    expect(PATCH_CMD.some((a) => a.includes("{pr}"))).toBe(true);
  });

  test("a failed patch does not stop the loop and counts as an attempt", async () => {
    const w = world([pr(5, { ci: "fail" })]);
    const { store } = memStore([task("A")]);
    const s = fakeSleep();
    const runPr: PrRunner = async (p, a) => { w.calls.push(`${a} ${p.number}`); return res(1); };
    const result = await runLoop(store, ok, undefined, { ...s, prs: w.source, attempts: w.attempts, runPr });
    expect(result.stoppedOn).toBeNull();
    expect(w.calls[0]).toBe("patch 5");
    expect(w.attempts.get(5)?.patches).toBeGreaterThanOrEqual(1);
    expect(result.ran).toEqual(["A"]);
  });

  test("a failed review counts as an attempt but leaves the SHA unreviewed so it is retried", async () => {
    const w = world([pr(5)]);
    const { store } = memStore([]);
    const runPr: PrRunner = async (p, a) => { w.calls.push(`${a} ${p.number}`); return res(1); };
    await runLoop(store, ok, undefined, { ...fakeSleep(2), prs: w.source, attempts: w.attempts, runPr });
    expect(w.calls.length).toBeGreaterThan(1);
    expect(w.attempts.get(5)?.reviewedSha).toBeUndefined();
    expect(w.attempts.get(5)?.reviews).toBeGreaterThanOrEqual(2);
  });

  test("a PR reaching the limit is flagged once and never run again", async () => {
    const w = world([pr(5, { ci: "fail" })]);
    const { store } = memStore([]);
    const runPr: PrRunner = async (p, a) => { w.calls.push(`${a} ${p.number}`); return res(1); };
    await runLoop(store, ok, undefined, { ...fakeSleep(2), prs: w.source, attempts: w.attempts, runPr });
    expect(w.calls).toHaveLength(MAX_PR_ATTEMPTS);
    expect(w.flagged).toEqual([5]);
    expect(w.attempts.get(5)?.flagged).toBe(true);
  });

  test("a throwing PrSource still lets a pending task run", async () => {
    const { store, history } = memStore([task("A")]);
    const logs: string[] = [];
    const prs: PrSource = {
      list: async () => {
        throw new Error("gh down");
      },
    };
    const result = await runLoop(store, ok, (m) => logs.push(m), { ...fakeSleep(), prs, attempts: NOOP_ATTEMPTS });
    expect(result.ran).toEqual(["A"]);
    expect(history).toEqual(["A:in_progress", "A:pr"]);
    expect(logs.some((m) => m.includes("gh down"))).toBe(true);
  });

  test("sleeps only when there are no candidates", async () => {
    const w = world([pr(5, { ci: "fail" })]);
    const { store } = memStore([]);
    const runPr: PrRunner = async () => res();
    const s = fakeSleep();
    await runLoop(store, ok, undefined, { ...s, prs: w.source, attempts: w.attempts, runPr });
    // three patch runs, then the limit leaves nothing to do: exactly one sleep
    expect(s.calls).toEqual([LOOP_IDLE_MS]);
  });
});

describe("runLoop audit log", () => {
  const ok: Runner = async () => res();
  const openPr = (number: number, over: Partial<PullRequest> = {}): PullRequest => ({
    number,
    url: `https://github.com/acme/widgets/pull/${number}`,
    repo: "acme/widgets",
    title: `PR ${number}`,
    branch: `feat/other-${number}`,
    createdAt: "2026-10-29T10:00:00.000Z",
    isDraft: false,
    headSha: `sha${number}`,
    ci: "pass",
    mergeable: "clean",
    reviewDecision: "none",
    labels: [],
    ...over,
  });

  /** Fake store that keeps what it was given; `failWith` makes every write throw. */
  function fakeAudit(failWith?: Error) {
    const entries: AuditEntry[] = [];
    const audit: AuditStore = {
      record(entry) {
        if (failWith) throw failWith;
        entries.push(entry);
      },
      list: () => entries,
    };
    return { audit, entries };
  }

  test("a successful task records one dev-task/success entry", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    await runLoop(store, ok, undefined, { ...fakeSleep(), audit });
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "dev-task", target: "A", title: "Task A", outcome: "success", exitCode: 0 });
    expect(Number.isNaN(Date.parse(entries[0]!.at))).toBe(false);
  });

  test("measures durationMs around the runner call", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const slow: Runner = async () => {
      await Bun.sleep(30);
      return res();
    };
    await runLoop(store, slow, undefined, { ...fakeSleep(), audit });
    expect(entries[0]!.durationMs).toBeGreaterThanOrEqual(25);
  });

  test("a failing task records dev-task/failure before the loop stops", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const result = await runLoop(store, async () => res(3), undefined, { ...fakeSleep(), audit });
    expect(result.stoppedOn).toBe("A");
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "dev-task", target: "A", outcome: "failure", exitCode: 3 });
  });

  test("a non-zero exit records failure with reason 'exited with code N'", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    await runLoop(store, async () => res(3), undefined, { ...fakeSleep(), audit });
    expect(entries[0]).toMatchObject({ outcome: "failure", exitCode: 3, reason: "exited with code 3" });
  });

  test("a successful run records no reason", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    await runLoop(store, ok, undefined, { ...fakeSleep(), audit });
    expect(entries[0]).not.toHaveProperty("reason");
  });

  test("a thrown runner records no audit entry, logs to the console and is handled as before", async () => {
    const { store, history } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const logs: string[] = [];
    const boom: Runner = async () => {
      throw new Error("spawn ENOENT");
    };
    const result = await runLoop(store, boom, (m) => logs.push(m), { ...fakeSleep(), audit });
    expect(entries).toEqual([]);
    expect(logs.some((m) => m.includes("runner threw") && m.includes("spawn ENOENT"))).toBe(true);
    expect(result.stoppedOn).toBe("A");
    expect(history).toEqual(["A:in_progress", "A:pending"]);
  });

  /** Lists the given PRs until each has been run once (the loop runs one candidate per poll), then goes idle. */
  const onceSource = (prs: PullRequest[]) => {
    const pending = [...prs];
    const source: PrSource = { list: async () => pending.map((p) => ({ ...p })) };
    const done = (n: number) => void pending.splice(0, pending.length, ...pending.filter((p) => p.number !== n));
    return { source, done };
  };

  test("review and patch runs record review and patch entries", async () => {
    const { source, done } = onceSource([openPr(7), openPr(8, { ci: "fail" })]);
    const { store } = memStore([]);
    const { audit, entries } = fakeAudit();
    const runPr: PrRunner = async (p) => {
      done(p.number);
      return res(p.number === 8 ? 1 : 0);
    };
    await runLoop(store, ok, undefined, { ...fakeSleep(), prs: source, attempts: NOOP_ATTEMPTS, runPr, audit });
    expect(entries).toContainEqual(expect.objectContaining({ action: "review", target: 7, title: "PR 7", outcome: "success", exitCode: 0 }));
    expect(entries).toContainEqual(expect.objectContaining({ action: "patch", target: 8, title: "PR 8", outcome: "failure", exitCode: 1 }));
  });

  test("a PR run with a non-zero exit records failure with reason 'exited with code N'", async () => {
    const { source, done } = onceSource([openPr(8, { ci: "fail" })]);
    const { store } = memStore([]);
    const { audit, entries } = fakeAudit();
    const runPr: PrRunner = async (p) => {
      done(p.number);
      return res(2);
    };
    await runLoop(store, ok, undefined, { ...fakeSleep(), prs: source, attempts: NOOP_ATTEMPTS, runPr, audit });
    expect(entries[0]).toMatchObject({ action: "patch", outcome: "failure", exitCode: 2, reason: "exited with code 2" });
  });

  test("a PR runner that throws records no audit entry and logs to the console", async () => {
    const { source, done } = onceSource([openPr(7)]);
    const { store } = memStore([]);
    const { audit, entries } = fakeAudit();
    const logs: string[] = [];
    const runPr: PrRunner = async (p) => {
      done(p.number);
      throw new Error("spawn ENOENT");
    };
    await runLoop(store, ok, (m) => logs.push(m), { ...fakeSleep(), prs: source, attempts: NOOP_ATTEMPTS, runPr, audit });
    expect(entries).toEqual([]);
    expect(logs.some((m) => m.includes("PR #7") && m.includes("spawn ENOENT"))).toBe(true);
  });

  test("an audit.record that throws is logged and the loop continues", async () => {
    const { store, history } = memStore([task("A"), task("B")]);
    const { audit } = fakeAudit(new Error("disk full"));
    const logs: string[] = [];
    const result = await runLoop(store, ok, (m) => logs.push(m), { ...fakeSleep(), audit });
    expect(result.ran).toEqual(["A", "B"]);
    expect(history).toEqual(["A:in_progress", "A:pr", "B:in_progress", "B:pr"]);
    expect(logs.some((m) => m.includes("disk full"))).toBe(true);
  });

  test("idle ticks record nothing: only the task run is in the log after three idle polls", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const s = fakeSleep(3);
    await runLoop(store, ok, undefined, { ...s, audit });
    expect(s.calls).toHaveLength(3);
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "dev-task", target: "A" });
  });

  test("main passes the audit option through to the loop", async () => {
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const processed = JSON.stringify({ result: "ok", structured_output: { outcome: "processed" } });
    await main(store, ["sh", "-c", `printf '%s' "$0"`, processed], { ...fakeSleep(), audit });
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "dev-task", target: "A", outcome: "success" });
  });
});

describe("runLoop agent result report", () => {
  const openPr = (number: number, over: Partial<PullRequest> = {}): PullRequest => ({
    number,
    title: `PR ${number}`,
    branch: `feat/other-${number}`,
    createdAt: "2026-10-29T10:00:00.000Z",
    url: `https://github.com/acme/widgets/pull/${number}`,
    repo: "acme/widgets",
    isDraft: false,
    headSha: `sha${number}`,
    ci: "pass",
    mergeable: "clean",
    reviewDecision: "none",
    labels: [],
    ...over,
  });

  function fakeAudit() {
    const entries: AuditEntry[] = [];
    const audit: AuditStore = { record: (e) => void entries.push(e), list: () => entries };
    return { audit, entries };
  }

  /** Lists the PR as-is until it has been run once, then as approved with green CI so nothing is left to do. */
  function onceSource(p: PullRequest) {
    let settled = false;
    const source: PrSource = {
      list: async () => [settled ? { ...p, ci: "pass", reviewDecision: "approved" } : { ...p }],
    };
    return {
      source,
      close: () => {
        settled = true;
      },
    };
  }

  const realAttempts = () => attemptsStore(join(mkdtempSync(join(tmpdir(), "loop-result-")), "attempts.json"));

  test("a processed task goes to pr and records a success entry", async () => {
    const { store, tasks } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    await runLoop(store, async () => res(0, PROCESSED), undefined, { ...fakeSleep(), audit });
    expect(tasks[0]?.status).toBe("pr");
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "dev-task", target: "A", outcome: "success", exitCode: 0 });
  });

  test("a skipped task returns to pending, stops the loop, and records a skip entry with the reason", async () => {
    const { store, tasks, history } = memStore([task("A"), task("B")]);
    const { audit, entries } = fakeAudit();
    const logs: string[] = [];
    const s = fakeSleep();
    const out = await runLoop(store, async () => res(0, { outcome: "skipped", reason: "task already done" }), (m) => logs.push(m), { ...s, audit });
    expect(out).toEqual({ ran: ["A"], stoppedOn: "A" });
    expect(tasks.map((t) => t.status)).toEqual(["pending", "pending"]);
    expect(history).toEqual(["A:in_progress", "A:pending"]);
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "dev-task", target: "A", outcome: "skip", reason: "task already done", exitCode: 0 });
    expect(logs.some((m) => m.includes("skipped") && m.includes("task already done"))).toBe(true);
  });

  test("exit 0 with no report is audited as failure but the task still goes to pr", async () => {
    const { store, tasks } = memStore([task("A"), task("B")]);
    const { audit, entries } = fakeAudit();
    const out = await runLoop(store, async () => res(0, null), undefined, { ...fakeSleep(), audit });
    expect(out.stoppedOn).toBeNull();
    expect(tasks.map((t) => t.status)).toEqual(["pr", "pr"]);
    expect(entries[0]).toMatchObject({ outcome: "failure", exitCode: 0, reason: "agent returned no result report" });
  });

  test("a non-zero exit with a report is still a failure that stops the loop", async () => {
    const { store, tasks } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const out = await runLoop(store, async () => res(1, PROCESSED), undefined, { ...fakeSleep(), audit });
    expect(out.stoppedOn).toBe("A");
    expect(tasks[0]?.status).toBe("pending");
    expect(entries[0]).toMatchObject({ outcome: "failure", exitCode: 1 });
  });

  test("a skipped PR review counts an attempt, marks the SHA handled and records a skip entry", async () => {
    const { source, close } = onceSource(openPr(7));
    const attempts = realAttempts();
    const { store } = memStore([]);
    const { audit, entries } = fakeAudit();
    const runPr: PrRunner = async () => {
      close();
      return res(0, SKIPPED);
    };
    await runLoop(store, async () => res(), undefined, { ...fakeSleep(), prs: source, attempts, runPr, audit });
    expect(attempts.get(7)?.reviews).toBe(1);
    expect(attempts.get(7)?.reviewedSha).toBe("sha7");
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ action: "review", target: 7, outcome: "skip", reason: "PR is already merged", exitCode: 0 });
  });

  test("a skipped PR patch counts an attempt and records a skip entry without stopping the loop", async () => {
    const { source, close } = onceSource(openPr(8, { ci: "fail" }));
    const attempts = realAttempts();
    const { store } = memStore([task("A")]);
    const { audit, entries } = fakeAudit();
    const runPr: PrRunner = async () => {
      close();
      return res(0, SKIPPED);
    };
    const out = await runLoop(store, async () => res(), undefined, { ...fakeSleep(), prs: source, attempts, runPr, audit });
    expect(out.stoppedOn).toBeNull();
    expect(attempts.get(8)?.patches).toBe(1);
    expect(entries[0]).toMatchObject({ action: "patch", target: 8, outcome: "skip", reason: "PR is already merged" });
  });

  test("a PR run with exit 0 and no report is audited as failure but marks the SHA reviewed as before", async () => {
    const { source, close } = onceSource(openPr(7));
    const attempts = realAttempts();
    const { store } = memStore([]);
    const { audit, entries } = fakeAudit();
    const runPr: PrRunner = async () => {
      close();
      return res(0, null);
    };
    await runLoop(store, async () => res(), undefined, { ...fakeSleep(), prs: source, attempts, runPr, audit });
    expect(attempts.get(7)?.reviewedSha).toBe("sha7");
    expect(entries[0]).toMatchObject({ action: "review", outcome: "failure", exitCode: 0, reason: "agent returned no result report" });
  });
});

describe("agent commands", () => {
  test("AGENT_CMD, REVIEW_CMD and PATCH_CMD request a JSON envelope with the result schema", () => {
    for (const cmd of [AGENT_CMD, REVIEW_CMD, PATCH_CMD]) {
      const format = cmd.indexOf("--output-format");
      expect(format).toBeGreaterThan(-1);
      expect(cmd[format + 1]).toBe("json");
      const schema = cmd.indexOf("--json-schema");
      expect(schema).toBeGreaterThan(-1);
      expect(JSON.parse(cmd[schema + 1]!)).toEqual(AGENT_RESULT_SCHEMA);
    }
  });
});

describe("agentRunner", () => {
  /** A stub command that prints a Claude Code JSON envelope and exits with `code`. */
  const envelope = (structured: unknown, code = 0, text = "all done") =>
    ["sh", "-c", `printf '%s' "$0"; exit ${code}`, JSON.stringify({ type: "result", is_error: false, result: text, structured_output: structured })];

  test("resolves the child's exit code", async () => {
    expect((await agentRunner(["sh", "-c", "exit 0"], () => {})(task("T1"))).exitCode).toBe(0);
    expect((await agentRunner(["sh", "-c", "exit 3"], () => {})(task("T1"))).exitCode).toBe(3);
  });

  test("substitutes {id} in every argument", async () => {
    const check = ["sh", "-c", 'test "{id}" = T1 && test "$0" = T1', "{id}"];
    expect((await agentRunner(check, () => {})(task("T1"))).exitCode).toBe(0);
    expect((await agentRunner(check, () => {})(task("T2"))).exitCode).not.toBe(0);
  });

  test("parses the report from the envelope and prints the result text", async () => {
    const printed: string[] = [];
    const out = await agentRunner(envelope({ outcome: "processed" }), (m) => printed.push(m))(task("T1"));
    expect(out).toEqual({ exitCode: 0, report: { outcome: "processed" } });
    expect(printed).toEqual(["all done"]);
  });

  test("parses a skipped report with its reason", async () => {
    const out = await agentRunner(envelope({ outcome: "skipped", reason: "nothing to do" }), () => {})(task("T1"));
    expect(out).toEqual({ exitCode: 0, report: { outcome: "skipped", reason: "nothing to do" } });
  });

  test("keeps a non-zero exit code alongside the parsed report", async () => {
    const out = await agentRunner(envelope({ outcome: "processed" }, 2), () => {})(task("T1"));
    expect(out.exitCode).toBe(2);
    expect(out.report).toEqual({ outcome: "processed" });
  });

  test("stdout that is not an envelope gives a null report and prints nothing", async () => {
    const printed: string[] = [];
    const out = await agentRunner(["sh", "-c", "echo not json"], (m) => printed.push(m))(task("T1"));
    expect(out).toEqual({ exitCode: 0, report: null });
    expect(printed).toEqual([]);
  });

  test("an envelope without a valid report gives a null report but still prints the result text", async () => {
    const printed: string[] = [];
    const out = await agentRunner(envelope({ outcome: "bogus" }), (m) => printed.push(m))(task("T1"));
    expect(out.report).toBeNull();
    expect(printed).toEqual(["all done"]);
  });
});

describe("prRunner", () => {
  test("parses the report and prints the result text for a review", async () => {
    const stub = ["sh", "-c", `printf '%s' "$0"`, JSON.stringify({ result: "reviewed {pr}", structured_output: { outcome: "skipped", reason: "closed" } })];
    const printed: string[] = [];
    const out = await prRunner(stub, stub, (m) => printed.push(m))(
      { number: 4, title: "t", branch: "b", createdAt: "x", url: "https://github.com/acme/widgets/pull/4", repo: "acme/widgets", isDraft: false, headSha: "s", ci: "pass", mergeable: "clean", reviewDecision: "none", labels: [] },
      "review",
    );
    expect(out).toEqual({ exitCode: 0, report: { outcome: "skipped", reason: "closed" } });
    expect(printed).toHaveLength(1);
  });
});

describe("main", () => {
  test("returns 0 and leaves the task in pr when the agent succeeds", async () => {
    const { store, tasks } = memStore([task("A")]);
    expect(await main(store, ["sh", "-c", "exit 0"], fakeSleep())).toBe(0);
    expect(tasks[0]!.status).toBe("pr");
  });

  test("returns 1 and returns the task to pending when the agent fails", async () => {
    const { store, tasks } = memStore([task("A")]);
    expect(await main(store, ["sh", "-c", "exit 1"], fakeSleep())).toBe(1);
    expect(tasks[0]!.status).toBe("pending");
  });

  test("returns 0 when aborted while idle", async () => {
    const { store } = memStore([]);
    expect(await main(store, ["sh", "-c", "exit 0"], fakeSleep(2))).toBe(0);
  });

  test("returns 0 on SIGINT while idle", async () => {
    const { store } = memStore([]);
    const never = () => new Promise<void>(() => {});
    const done = main(store, ["sh", "-c", "exit 0"], { sleep: never });
    await Bun.sleep(10);
    process.emit("SIGINT");
    expect(await done).toBe(0);
  });
});

describe("ALLOWED_TOOLS", () => {
  test("contains the base tools and the read-only helpers", () => {
    const expected = [
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep",
      "Bash(git *)",
      "Bash(gh *)",
      "Bash(bun *)",
      "Bash(jq *)",
      "Bash(ls *)",
      "Bash(cat *)",
      "Bash(head *)",
      "Bash(tail *)",
      "Bash(wc *)",
      "Bash(sed -n *)",
      "Bash(echo *)",
    ];
    for (const t of expected) expect(ALLOWED_TOOLS).toContain(t);
  });

  test("includes Agent so dev-task can launch the independent verifier subagent", () => {
    expect(ALLOWED_TOOLS).toContain("Agent");
  });

  test("excludes broad or dangerous entries", () => {
    for (const t of ["Bash(*)", "Bash(python3 *)", "Bash(sed *)", "Bash(rm *)", "Bash(curl *)"]) {
      expect(ALLOWED_TOOLS).not.toContain(t);
    }
  });

  test("AGENT_CMD passes the joined list after --allowedTools", () => {
    expect(AGENT_CMD[AGENT_CMD.indexOf("--allowedTools") + 1]).toBe(ALLOWED_TOOLS.join(","));
  });
});
