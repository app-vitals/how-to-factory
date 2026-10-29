import { describe, expect, test } from "bun:test";
import { pickCandidate } from "./candidates";
import { type AttemptsStore, MAX_PR_ATTEMPTS, type PrAttempts } from "./pr-attempts";
import type { PullRequest } from "./prs";
import type { Task } from "./tasks.schema";

const task = (id: string, over: Partial<Task> = {}): Task => ({
  id,
  title: id,
  description: id,
  acceptanceCriteria: [],
  dependencies: [],
  status: "pending",
  ...over,
});

// A PR that decidePr routes to review (new head SHA, nothing else going on).
const pr = (number: number, over: Partial<PullRequest> = {}): PullRequest => ({
  number,
  title: `pr ${number}`,
  branch: `feat/unknown-${number}`,
  createdAt: "2026-10-29T12:00:00Z",
  isDraft: false,
  headSha: "sha",
  ci: "pass",
  mergeable: "clean",
  reviewDecision: "none",
  labels: [],
  ...over,
});

const fakeAttempts = (entries: Record<number, PrAttempts> = {}): AttemptsStore => ({
  get: (n) => entries[n],
  record: () => {},
  exceeded: (n) => {
    const e = entries[n];
    return e !== undefined && e.reviews + e.patches >= MAX_PR_ATTEMPTS;
  },
  flagForHuman: async () => {},
  sync: () => {},
});

const idOf = (c: ReturnType<typeof pickCandidate>["candidate"]) =>
  c === null ? null : c.kind === "task" ? `task:${c.task.id}` : `pr:${c.pr.number}`;

describe("pickCandidate", () => {
  test("returns null when nothing is ready", () => {
    const r = pickCandidate([task("a", { status: "pr" })], [], fakeAttempts());
    expect(r).toEqual({ candidate: null, newlyExceeded: [] });
  });

  test("an older PR beats a newer task", () => {
    const tasks = [task("a", { createdAt: "2026-10-29T13:00:00Z" })];
    const prs = [pr(1, { createdAt: "2026-10-29T12:00:00Z" })];
    expect(idOf(pickCandidate(tasks, prs, fakeAttempts()).candidate)).toBe("pr:1");
  });

  test("an older task beats a newer PR", () => {
    const tasks = [task("a", { createdAt: "2026-10-29T11:00:00Z" })];
    const prs = [pr(1, { createdAt: "2026-10-29T12:00:00Z" })];
    expect(idOf(pickCandidate(tasks, prs, fakeAttempts()).candidate)).toBe("task:a");
  });

  test("an unstamped task loses to a stamped PR", () => {
    expect(idOf(pickCandidate([task("a")], [pr(1)], fakeAttempts()).candidate)).toBe("pr:1");
  });

  test("unstamped tasks keep file order", () => {
    expect(idOf(pickCandidate([task("b"), task("a")], [], fakeAttempts()).candidate)).toBe("task:b");
  });

  test("a PR on a task's branch is not its own candidate; an unknown branch is", () => {
    const tasks = [task("some-task-id", { status: "in_progress" })];
    const owned = pr(1, { branch: "feat/some-task-id" });
    const unowned = pr(2, { branch: "feat/unknown" });
    expect(pickCandidate(tasks, [owned], fakeAttempts()).candidate).toBeNull();
    expect(idOf(pickCandidate(tasks, [owned, unowned], fakeAttempts()).candidate)).toBe("pr:2");
  });

  test("a PR candidate carries its action", () => {
    const failing = pr(1, { ci: "fail" });
    const c = pickCandidate([], [failing], fakeAttempts()).candidate;
    expect(c).toEqual({ kind: "pr", pr: failing, action: "patch" });
  });

  test("tasks with unmet dependencies are skipped", () => {
    const tasks = [task("a", { status: "in_progress" }), task("b", { dependencies: ["a"] }), task("c")];
    expect(idOf(pickCandidate(tasks, [], fakeAttempts()).candidate)).toBe("task:c");
  });

  test("exceeded PRs are skipped, and newly exceeded ones are returned for flagging", () => {
    const attempts = fakeAttempts({ 1: { reviews: 2, patches: 1 } });
    const stuck = pr(1, { createdAt: "2026-10-29T01:00:00Z" });
    const r = pickCandidate([task("a", { createdAt: "2026-10-29T13:00:00Z" })], [stuck], attempts);
    expect(idOf(r.candidate)).toBe("task:a");
    expect(r.newlyExceeded).toEqual([stuck]);
  });

  test("an already flagged exceeded PR is not returned again", () => {
    const attempts = fakeAttempts({ 1: { reviews: 2, patches: 1, flagged: true } });
    expect(pickCandidate([], [pr(1)], attempts)).toEqual({ candidate: null, newlyExceeded: [] });
  });

  test("a PR that needs nothing is neither a candidate nor flagged", () => {
    const attempts = fakeAttempts({ 1: { reviews: 3, patches: 0 } });
    const r = pickCandidate([], [pr(1, { labels: ["needs-human"] }), pr(2, { isDraft: true })], attempts);
    expect(r).toEqual({ candidate: null, newlyExceeded: [] });
  });

  test("a PR already reviewed at its head SHA needs nothing", () => {
    const attempts = fakeAttempts({ 1: { reviews: 1, patches: 0, reviewedSha: "sha" } });
    expect(pickCandidate([], [pr(1)], attempts).candidate).toBeNull();
  });

  test("an exact timestamp tie picks the task", () => {
    const at = "2026-10-29T12:00:00Z";
    const r = pickCandidate([task("a", { createdAt: at })], [pr(1, { createdAt: at })], fakeAttempts());
    expect(idOf(r.candidate)).toBe("task:a");
  });
});
