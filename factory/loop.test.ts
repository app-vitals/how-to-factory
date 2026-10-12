import { describe, expect, test } from "bun:test";
import { pickNext, runLoop } from "./loop.ts";
import type { Todo, TodoStatus } from "./todos.schema.ts";

const todo = (id: string, status: TodoStatus = "pending", dependencies: string[] = []): Todo => ({
  id,
  title: `Todo ${id}`,
  description: "d",
  acceptanceCriteria: [],
  status,
  dependencies,
});

describe("pickNext", () => {
  test("returns the first pending todo with no dependencies", () => {
    expect(pickNext([todo("A"), todo("B")])?.id).toBe("A");
  });

  test("gates on dependencies being done", () => {
    const todos = [todo("A", "pending", ["B"]), todo("B", "done"), todo("C", "pending", ["D"]), todo("D", "pending")];
    expect(pickNext(todos)?.id).toBe("A");
    expect(pickNext([todo("A", "pending", ["B"]), todo("B", "pr_open")])).toBeNull();
    expect(pickNext([todo("A", "pending", ["B"]), todo("B", "pending")])?.id).toBe("B");
  });

  test("skips blocked, in_progress, pr_open and done", () => {
    const todos = [todo("A", "blocked"), todo("B", "in_progress"), todo("C", "pr_open"), todo("D", "done"), todo("E")];
    expect(pickNext(todos)?.id).toBe("E");
  });

  test("returns null when empty or none ready", () => {
    expect(pickNext([])).toBeNull();
    expect(pickNext([todo("A", "done"), todo("B", "blocked")])).toBeNull();
  });
});

describe("runLoop", () => {
  const fakeStore = (todos: Todo[], outcome: (t: Todo) => TodoStatus) => ({
    load: () => todos.map((t) => ({ ...t })),
    run: async (t: Todo) => {
      todos.find((x) => x.id === t.id)!.status = outcome(t);
      return 0;
    },
  });

  test("runs todos in order until nothing is ready", async () => {
    const { load, run } = fakeStore([todo("A"), todo("B", "pending", ["A"])], () => "done");
    expect(await runLoop(load, run)).toEqual({ ran: ["A", "B"], stoppedOn: null });
  });

  test("pr_open counts as success but does not unblock dependents", async () => {
    const { load, run } = fakeStore([todo("A"), todo("B", "pending", ["A"])], () => "pr_open");
    expect(await runLoop(load, run)).toEqual({ ran: ["A"], stoppedOn: null });
  });

  test("stops on the first todo that does not end pr_open or done", async () => {
    const { load, run } = fakeStore([todo("A"), todo("B"), todo("C")], (t) => (t.id === "B" ? "blocked" : "done"));
    expect(await runLoop(load, run)).toEqual({ ran: ["A", "B"], stoppedOn: "B" });
  });

  test("stops when the agent leaves the todo unchanged", async () => {
    const { load } = fakeStore([todo("A")], () => "pending");
    expect(await runLoop(load, async () => 1)).toEqual({ ran: ["A"], stoppedOn: "A" });
  });
});
