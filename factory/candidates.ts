// Pick the next thing the loop should work on: the oldest of the ready tasks and the PRs that need review or patch.
// Pure: no I/O beyond reading the attempts store, nothing is run or written here.

import type { AttemptsStore } from "./pr-attempts.ts";
import { decidePr } from "./pr-state.ts";
import type { PullRequest } from "./prs.ts";
import type { Task } from "./tasks.schema.ts";

export type Candidate =
  | { kind: "task"; task: Task }
  | { kind: "pr"; pr: PullRequest; action: "review" | "patch" };

export interface Pick {
  /** The oldest candidate, or null when there is nothing to do. */
  candidate: Candidate | null;
  /** PRs that need work but hit the attempt limit and are not flagged yet; the loop flags them. */
  newlyExceeded: PullRequest[];
}

interface Ranked {
  candidate: Candidate;
  /** Epoch ms; Infinity for a task with no createdAt, so it sorts after every stamped candidate. */
  sortAt: number;
  index: number;
}

const stamp = (iso: string | undefined): number => {
  if (iso === undefined) return Number.POSITIVE_INFINITY;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
};

export function pickCandidate(tasks: Task[], prs: PullRequest[], attempts: AttemptsStore): Pick {
  const done = new Set(tasks.filter((t) => t.status === "pr").map((t) => t.id));
  const ranked: Ranked[] = [];
  const newlyExceeded: PullRequest[] = [];

  for (const task of tasks) {
    if (task.status !== "pending" || !task.dependencies.every((d) => done.has(d))) continue;
    ranked.push({ candidate: { kind: "task", task }, sortAt: stamp(task.createdAt), index: ranked.length });
  }

  // A PR on `<type>/<task-id>` belongs to that task; it is not worked on as a separate candidate.
  const owned = (pr: PullRequest) => tasks.some((t) => pr.branch.endsWith(`/${t.id}`));
  for (const pr of prs) {
    if (owned(pr)) continue;
    const action = decidePr(pr, { reviewedSha: attempts.get(pr.number)?.reviewedSha });
    if (action === "none") continue;
    if (attempts.exceeded(pr.number)) {
      if (!attempts.get(pr.number)?.flagged) newlyExceeded.push(pr);
      continue;
    }
    ranked.push({ candidate: { kind: "pr", pr, action }, sortAt: stamp(pr.createdAt), index: ranked.length });
  }

  // Tasks were ranked first, so a timestamp tie (and file order among unstamped tasks) falls to the lower index.
  ranked.sort((a, b) => (a.sortAt === b.sortAt ? a.index - b.index : a.sortAt < b.sortAt ? -1 : 1));
  return { candidate: ranked[0]?.candidate ?? null, newlyExceeded };
}
