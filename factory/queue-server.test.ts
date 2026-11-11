import { afterEach, describe, expect, test } from "bun:test";
import type { AttemptsStore } from "./pr-attempts";
import type { PrSource, PullRequest } from "./prs";
import { startQueueServer } from "./queue-server";
import type { Task } from "./tasks.schema";
import type { TaskStore } from "./tasks.store";

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

const fakeStore = (tasks: Task[]): TaskStore => ({
  load: () => tasks,
  setStatus: () => {
    throw new Error("the queue server must never write tasks");
  },
});

/** Counts every call, so tests can assert nothing but reads happened. */
const fakeAttempts = () => {
  const calls = { write: 0, sync: 0 };
  const store: AttemptsStore = {
    get: () => undefined,
    record: () => {
      calls.write++;
    },
    exceeded: () => false,
    flagForHuman: async () => {
      calls.write++;
    },
    sync: () => {
      calls.sync++;
    },
  };
  return { store, calls };
};

const fakePrs = (prs: PullRequest[] | Error) => {
  const state = { calls: 0 };
  const source: PrSource = {
    list: async () => {
      state.calls++;
      if (prs instanceof Error) throw prs;
      return prs;
    },
  };
  return { source, state };
};

const tasks = [
  task("b-task", { createdAt: "2026-10-30T00:00:00Z" }),
  task("a-task", { createdAt: "2026-10-28T00:00:00Z" }),
  task("running-task", { status: "in_progress" }),
];

let servers: Array<{ stop(force?: boolean): unknown }> = [];
afterEach(() => {
  for (const s of servers) s.stop(true);
  servers = [];
});

function start(opts: { prs: PrSource; attempts?: AttemptsStore; now?: () => Date }) {
  const server = startQueueServer({
    port: 0,
    store: fakeStore(tasks),
    prs: opts.prs,
    attempts: opts.attempts ?? fakeAttempts().store,
    now: opts.now,
  });
  servers.push(server);
  return { server, url: `http://127.0.0.1:${server.port}` };
}

describe("startQueueServer", () => {
  test("GET / returns HTML with the queued items in loop order", async () => {
    const { source } = fakePrs([pr(7, { createdAt: "2026-10-29T00:00:00Z" })]);
    const { url } = start({ prs: source });
    const res = await fetch(`${url}/`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    const html = await res.text();
    const order = ["a-task", "#7", "b-task"].map((ref) => html.indexOf(`<code>${ref}</code>`));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  test("GET /api/queue returns the same items as JSON", async () => {
    const { source } = fakePrs([pr(7, { createdAt: "2026-10-29T00:00:00Z" })]);
    const { url } = start({ prs: source });
    const res = await fetch(`${url}/api/queue`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    const body = (await res.json()) as { running: Task[]; queue: Array<{ position: number; ref: string; kind: string }>; error?: string };
    expect(body.queue.map((q) => [q.position, q.kind, q.ref])).toEqual([
      [1, "dev-task", "a-task"],
      [2, "review", "#7"],
      [3, "dev-task", "b-task"],
    ]);
    expect(body.running.map((t) => t.id)).toEqual(["running-task"]);
    expect(body.error).toBeUndefined();
  });

  test("an unknown path returns 404", async () => {
    const { url } = start({ prs: fakePrs([]).source });
    expect((await fetch(`${url}/nope`)).status).toBe(404);
    expect((await fetch(`${url}/api/queue/extra`)).status).toBe(404);
  });

  test("a failing PR source still returns 200 with the banner and tasks only", async () => {
    const { url } = start({ prs: fakePrs(new Error("gh exploded")).source });
    const page = await fetch(`${url}/`);
    expect(page.status).toBe(200);
    const html = await page.text();
    expect(html).toContain("gh exploded");
    expect(html).toContain("a-task");

    const api = await fetch(`${url}/api/queue`);
    expect(api.status).toBe(200);
    const body = (await api.json()) as { queue: Array<{ ref: string }>; error?: string };
    expect(body.error).toContain("gh exploded");
    expect(body.queue.map((q) => q.ref)).toEqual(["a-task", "b-task"]);
  });

  test("a second request within the cache window does not call the PR source again", async () => {
    const { source, state } = fakePrs([pr(7)]);
    let t = Date.parse("2026-11-11T12:00:00Z");
    const { url } = start({ prs: source, now: () => new Date(t) });
    await fetch(`${url}/`);
    t += 5_000;
    await fetch(`${url}/api/queue`);
    expect(state.calls).toBe(1);
    t += 6_000; // 11s after the first listing: expired
    await fetch(`${url}/`);
    expect(state.calls).toBe(2);
  });

  test("a failed listing is also cached for the window", async () => {
    const { source, state } = fakePrs(new Error("boom"));
    const { url } = start({ prs: source, now: () => new Date("2026-11-11T12:00:00Z") });
    await fetch(`${url}/`);
    await fetch(`${url}/`);
    expect(state.calls).toBe(1);
  });

  test("requests never write or sync the attempts store", async () => {
    const { store, calls } = fakeAttempts();
    const { url } = start({ prs: fakePrs([pr(7)]).source, attempts: store });
    await fetch(`${url}/`);
    await fetch(`${url}/api/queue`);
    await fetch(`${url}/nope`);
    expect(calls).toEqual({ write: 0, sync: 0 });
  });

  test("listens on 127.0.0.1 only", () => {
    const { server } = start({ prs: fakePrs([]).source });
    expect(server.hostname).toBe("127.0.0.1");
  });
});
