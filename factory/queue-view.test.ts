import { describe, expect, test } from "bun:test";
import { type AttemptsStore, MAX_PR_ATTEMPTS, type PrAttempts } from "./pr-attempts";
import type { PullRequest } from "./prs";
import { buildQueue, renderQueueHtml } from "./queue-view";
import type { Task } from "./tasks.schema";

const task = (id: string, over: Partial<Task> = {}): Task => ({
  id,
  title: `title ${id}`,
  description: id,
  acceptanceCriteria: [],
  dependencies: [],
  status: "pending",
  ...over,
});

const pr = (number: number, over: Partial<PullRequest> = {}): PullRequest => ({
  number,
  url: `https://github.com/acme/widgets/pull/${number}`,
  repo: "acme/widgets",
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
  sync: () => {
    throw new Error("a read-only view must not call attempts.sync");
  },
});

const NOW = new Date("2026-10-29T14:00:00Z");

describe("buildQueue", () => {
  test("maps tasks to dev-task and PRs to review or patch", () => {
    const tasks = [task("a", { createdAt: "2026-10-29T10:00:00Z" })];
    const prs = [
      pr(1, { createdAt: "2026-10-29T11:00:00Z" }),
      pr(2, { createdAt: "2026-10-29T12:00:00Z", ci: "fail" }),
    ];
    const { queue } = buildQueue(tasks, prs, fakeAttempts());
    expect(queue.map((q) => [q.kind, q.ref, q.title])).toEqual([
      ["dev-task", "a", "title a"],
      ["review", "#1", "pr 1"],
      ["patch", "#2", "pr 2"],
    ]);
    expect(queue[0]?.createdAt).toBe("2026-10-29T10:00:00Z");
  });

  test("positions are 1-based and follow loop order", () => {
    const tasks = [task("late", { createdAt: "2026-10-29T13:00:00Z" })];
    const prs = [pr(7, { createdAt: "2026-10-29T09:00:00Z" })];
    const { queue } = buildQueue(tasks, prs, fakeAttempts());
    expect(queue.map((q) => [q.position, q.ref])).toEqual([
      [1, "#7"],
      [2, "late"],
    ]);
  });

  test("lists in_progress tasks under running and not in the queue", () => {
    const tasks = [task("busy", { status: "in_progress" }), task("wait")];
    const { running, queue } = buildQueue(tasks, [], fakeAttempts());
    expect(running.map((t) => t.id)).toEqual(["busy"]);
    expect(queue.map((q) => q.ref)).toEqual(["wait"]);
  });
});

describe("renderQueueHtml", () => {
  const sample = () =>
    buildQueue(
      [task("a", { createdAt: "2026-10-29T12:00:00Z" }), task("b", { status: "in_progress" })],
      [pr(3, { createdAt: "2026-10-29T13:30:00Z", ci: "fail" })],
      fakeAttempts(),
    );

  test("shows a Running now section and the running task", () => {
    const html = renderQueueHtml(sample(), { now: NOW });
    expect(html).toContain("Running now");
    expect(html).toContain("title b");
  });

  test("renders a numbered row with a kind badge, ref, title and age per item", () => {
    const html = renderQueueHtml(sample(), { now: NOW });
    expect(html).toContain("badge-dev-task");
    expect(html).toContain("badge-patch");
    expect(html).toContain("#3");
    expect(html).toContain("pr 3");
    expect(html).toContain("2h");
    expect(html).toContain("30m");
  });

  test("marks only the first row as next up", () => {
    const html = renderQueueHtml(sample(), { now: NOW });
    expect(html.match(/next up/g)?.length).toBe(1);
    const firstRow = html.split("<tr").find((r) => r.includes("title a")) ?? "";
    expect(firstRow).toContain("next up");
  });

  test("shows an empty state when nothing is queued", () => {
    const html = renderQueueHtml({ running: [], queue: [] }, { now: NOW });
    expect(html).toContain("Queue is empty");
    expect(html).not.toContain("next up");
  });

  test("shows a banner when prError is set, and none otherwise", () => {
    const q = sample();
    expect(renderQueueHtml(q, { now: NOW, prError: "gh exploded" })).toContain("gh exploded");
    expect(renderQueueHtml(q, { now: NOW })).not.toContain("banner-error");
  });

  test("escapes HTML-special characters in task and PR titles and in prError", () => {
    const q = buildQueue(
      [task("a", { title: "<script>alert(1)</script> & co" })],
      [pr(9, { title: `"><img src=x onerror=1>`, createdAt: "2026-10-29T08:00:00Z" })],
      fakeAttempts(),
    );
    const html = renderQueueHtml(q, { now: NOW, prError: "<b>bad</b>" });
    expect(html).not.toContain("<script>alert");
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain("<b>bad</b>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt; &amp; co");
  });

  test("is self-contained with a 10 second meta refresh", () => {
    const html = renderQueueHtml(sample(), { now: NOW, prError: "x" });
    expect(html).not.toMatch(/https?:\/\//);
    expect(html).toContain('<meta http-equiv="refresh" content="10">');
    expect(html).not.toContain("<script");
  });
});
