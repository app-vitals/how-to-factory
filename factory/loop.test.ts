import { describe, expect, test } from "bun:test";
import { agentRunner, main, pickNext, runLoop, type Runner } from "./loop.ts";
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
    expect(await runLoop(store, ok)).toEqual({ ran: ["A", "B"], stoppedOn: null });
    expect(history).toEqual(["A:in_progress", "A:pr", "B:in_progress", "B:pr"]);
  });

  test("marks the task in_progress while the runner executes", async () => {
    const { store, tasks } = memStore([task("A")]);
    let seen: TaskStatus | undefined;
    await runLoop(store, async (t) => {
      seen = tasks.find((x) => x.id === t.id)?.status;
      return 0;
    });
    expect(seen).toBe("in_progress");
  });

  test("passes the picked task to the runner", async () => {
    const { store } = memStore([task("A")]);
    const got: string[] = [];
    await runLoop(store, async (t) => (got.push(t.title), 0));
    expect(got).toEqual(["Task A"]);
  });

  test("a non-zero exit returns the task to pending and stops the loop", async () => {
    const { store, tasks } = memStore([task("A"), task("B"), task("C")]);
    const run: Runner = async (t) => (t.id === "B" ? 1 : 0);
    expect(await runLoop(store, run)).toEqual({ ran: ["A", "B"], stoppedOn: "B" });
    expect(tasks.map((t) => t.status)).toEqual(["pr", "pending", "pending"]);
  });

  test("a throwing runner is treated as a failure", async () => {
    const { store, tasks } = memStore([task("A")]);
    const logs: string[] = [];
    const run: Runner = async () => {
      throw new Error("spawn failed");
    };
    expect(await runLoop(store, run, (m) => logs.push(m))).toEqual({ ran: ["A"], stoppedOn: "A" });
    expect(tasks[0]?.status).toBe("pending");
    expect(logs.some((m) => m.includes("spawn failed"))).toBe(true);
  });

  test("does not start dependents of a failed task", async () => {
    const { store, history } = memStore([task("A"), task("B", "pending", ["A"])]);
    await runLoop(store, async () => 1);
    expect(history).toEqual(["A:in_progress", "A:pending"]);
  });

  test("does nothing when no task is ready", async () => {
    const { store, history } = memStore([task("A", "in_progress"), task("B", "pr")]);
    const logs: string[] = [];
    expect(await runLoop(store, ok, (m) => logs.push(m))).toEqual({ ran: [], stoppedOn: null });
    expect(history).toEqual([]);
    expect(logs.some((m) => m.includes("still in_progress") && m.includes("A"))).toBe(true);
  });

  test("picks up tasks appended while the loop runs", async () => {
    const { store, tasks } = memStore([task("A")]);
    const run: Runner = async (t) => {
      if (t.id === "A") tasks.push(task("B", "pending", ["A"]));
      return 0;
    };
    expect((await runLoop(store, run)).ran).toEqual(["A", "B"]);
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
    expect(await main(store, ["sh", "-c", "exit 0"])).toBe(0);
    expect(tasks[0]!.status).toBe("pr");
  });

  test("returns 1 and returns the task to pending when the agent fails", async () => {
    const { store, tasks } = memStore([task("A")]);
    expect(await main(store, ["sh", "-c", "exit 1"])).toBe(1);
    expect(tasks[0]!.status).toBe("pending");
  });
});
