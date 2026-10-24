// The factory loop: pick one ready task, hand it to Claude Code running the dev-task skill, repeat.
// The loop owns status: pending -> in_progress -> pr. `pr` is terminal.

import type { Task } from "./tasks.schema.ts";
import { fileStore, type TaskStore } from "./tasks.store.ts";

/** Claude Code headless, running the dev-task skill for one task. `{id}` is substituted. */
export const ALLOWED_TOOLS: string[] = [
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

export const AGENT_CMD: string[] = ["claude", "-p", "/dev-task {id}", "--allowedTools", ALLOWED_TOOLS.join(",")];

/** First pending task whose dependencies have all reached `pr`, else null. */
export function pickNext(tasks: Task[]): Task | null {
  const done = new Set(tasks.filter((t) => t.status === "pr").map((t) => t.id));
  return tasks.find((t) => t.status === "pending" && t.dependencies.every((d) => done.has(d))) ?? null;
}

/** Runs the agent for one task; resolves to the process exit code. */
export type Runner = (task: Task) => Promise<number>;

interface LoopResult {
  ran: string[];
  /** Id of the task that stopped the loop, or null when it was stopped by the signal. */
  stoppedOn: string | null;
}

/** How long the loop sleeps before re-polling when no task is ready. */
export const LOOP_IDLE_MS = 60_000;

export interface LoopOptions {
  /** Defaults to Bun.sleep; tests inject a fake so they never wait real time. */
  sleep?: (ms: number) => Promise<unknown>;
  /** Aborting stops the loop: immediately when idle, after the current task otherwise. */
  signal?: AbortSignal;
}

/** Resolves after `ms` via `sleep`, or as soon as the signal aborts. */
async function idleWait(sleep: (ms: number) => Promise<unknown>, ms: number, signal?: AbortSignal): Promise<void> {
  if (!signal) return void (await sleep(ms));
  if (signal.aborted) return;
  let onAbort = () => {};
  const aborted = new Promise<void>((resolve) => {
    onAbort = resolve;
    signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    await Promise.race([sleep(ms), aborted]);
  } finally {
    signal.removeEventListener("abort", onAbort);
  }
}

/**
 * One task at a time. Exit 0 means a PR was opened; anything else returns the task to pending and stops.
 * When no task is ready the loop sleeps LOOP_IDLE_MS and polls again, until the signal aborts.
 */
export async function runLoop(
  store: TaskStore,
  run: Runner,
  log: (msg: string) => void = () => {},
  { sleep = Bun.sleep, signal }: LoopOptions = {},
): Promise<LoopResult> {
  const ran: string[] = [];
  let stuckKey = "";
  let idle = false;

  while (!signal?.aborted) {
    const tasks = store.load();
    const next = pickNext(tasks);

    if (!next) {
      const stuck = tasks.filter((t) => t.status === "in_progress").map((t) => t.id);
      const key = stuck.join(", ");
      if (key !== stuckKey) {
        stuckKey = key;
        if (stuck.length > 0) log(`warning: still in_progress from an earlier run: ${key}`);
      }
      if (!idle) log(`nothing ready; polling every ${LOOP_IDLE_MS / 1000}s`);
      idle = true;
      await idleWait(sleep, LOOP_IDLE_MS, signal);
      continue;
    }
    idle = false;

    log(`starting ${next.id}: ${next.title}`);
    store.setStatus(next.id, "in_progress");
    ran.push(next.id);

    let code: number;
    try {
      code = await run(next);
    } catch (err) {
      log(`${next.id} runner threw: ${err instanceof Error ? err.message : String(err)}`);
      code = -1;
    }

    if (code !== 0) {
      store.setStatus(next.id, "pending");
      log(`${next.id} failed (exit ${code}); returned to pending, stopping`);
      return { ran, stoppedOn: next.id };
    }
    store.setStatus(next.id, "pr");
    log(`${next.id} -> pr`);
  }

  log("stopped by signal");
  return { ran, stoppedOn: null };
}

/** Builds a runner that spawns the given argv template with `{id}` substituted in each arg. */
export function agentRunner(template: string[]): Runner {
  return async (task) => {
    const cmd = template.map((a) => a.replaceAll("{id}", task.id));
    const proc = Bun.spawn(cmd, { stdin: "inherit", stdout: "inherit", stderr: "inherit" });
    return proc.exited;
  };
}

export async function main(
  store: TaskStore = fileStore(),
  agentCmd: string[] = AGENT_CMD,
  { sleep, signal }: LoopOptions = {},
): Promise<number> {
  store.load(); // validate up front
  const controller = new AbortController();
  const stop = () => controller.abort();
  if (signal?.aborted) stop();
  signal?.addEventListener("abort", stop, { once: true });
  process.once("SIGINT", stop);
  process.once("SIGTERM", stop);
  try {
    const { stoppedOn } = await runLoop(store, agentRunner(agentCmd), (m) => console.log(`[loop] ${m}`), {
      sleep,
      signal: controller.signal,
    });
    return stoppedOn ? 1 : 0;
  } finally {
    process.off("SIGINT", stop);
    process.off("SIGTERM", stop);
    signal?.removeEventListener("abort", stop);
  }
}

if (import.meta.main) process.exit(await main());
