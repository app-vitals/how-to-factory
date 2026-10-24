import { describe, expect, test } from "bun:test";
import { AGENT_CMD, agentRunner, ALLOWED_TOOLS, LOOP_IDLE_MS, main, pickNext, runLoop, type Runner } from "./loop.ts";
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

/** In-memory store that records every status transition. */
function memStore(tasks: Task[]) {
  const history: string[] = [];
  const store: TaskStore = {
    load: () => tasks.map((t) => ({ ...t })),
    setStatus(id, status) {
      tasks.find((t) => t.id === id)!.status = status;
      history.push(`${id}:${status}`);
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
  const ok: Runner = async () => 0;

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
        return 0;
      },
      undefined,
      fakeSleep(),
    );
    expect(seen).toBe("in_progress");
  });

  test("passes the picked task to the runner", async () => {
    const { store } = memStore([task("A")]);
    const got: string[] = [];
    await runLoop(store, async (t) => (got.push(t.title), 0), undefined, fakeSleep());
    expect(got).toEqual(["Task A"]);
  });

  test("a non-zero exit returns the task to pending and stops the loop", async () => {
    const { store, tasks } = memStore([task("A"), task("B"), task("C")]);
    const run: Runner = async (t) => (t.id === "B" ? 1 : 0);
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
    await runLoop(store, async () => 1, undefined, fakeSleep());
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
      return 0;
    };
    expect((await runLoop(store, run, undefined, fakeSleep())).ran).toEqual(["A", "B"]);
  });
});

describe("agentRunner", () => {
  test("resolves the child's exit code", async () => {
    expect(await agentRunner(["sh", "-c", "exit 0"])(task("T1"))).toBe(0);
    expect(await agentRunner(["sh", "-c", "exit 3"])(task("T1"))).toBe(3);
  });

  test("substitutes {id} in every argument", async () => {
    const check = ["sh", "-c", 'test "{id}" = T1 && test "$0" = T1', "{id}"];
    expect(await agentRunner(check)(task("T1"))).toBe(0);
    expect(await agentRunner(check)(task("T2"))).not.toBe(0);
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

  test("excludes broad or dangerous entries", () => {
    for (const t of ["Bash(*)", "Bash(python3 *)", "Bash(sed *)", "Bash(rm *)", "Bash(curl *)"]) {
      expect(ALLOWED_TOOLS).not.toContain(t);
    }
  });

  test("AGENT_CMD passes the joined list after --allowedTools", () => {
    expect(AGENT_CMD[AGENT_CMD.indexOf("--allowedTools") + 1]).toBe(ALLOWED_TOOLS.join(","));
  });
});
