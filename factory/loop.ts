// The factory loop: pick one ready task, hand it to Claude Code running the dev-task skill, repeat.
// The loop owns status: pending -> in_progress -> pr. `pr` is terminal.

import type { Task } from "./tasks.schema.ts";
import { fileStore, type TaskStore } from "./tasks.store.ts";

/** Claude Code headless, running the dev-task skill for one task. `{id}` is substituted. */
const AGENT_CMD: string[] = [
  "claude",
  "-p",
  "/dev-task {id}",
  "--allowedTools",
  "Read,Edit,Write,Glob,Grep,Bash(git *),Bash(gh *),Bash(bun *)",
];

/** First pending task whose dependencies have all reached `pr`, else null. */
export function pickNext(tasks: Task[]): Task | null {
  const done = new Set(tasks.filter((t) => t.status === "pr").map((t) => t.id));
  return tasks.find((t) => t.status === "pending" && t.dependencies.every((d) => done.has(d))) ?? null;
}

/** Runs the agent for one task; resolves to the process exit code. */
export type Runner = (task: Task) => Promise<number>;

interface LoopResult {
  ran: string[];
  /** Id of the task that stopped the loop, or null when nothing was left ready. */
  stoppedOn: string | null;
}

/** One task at a time. Exit 0 means a PR was opened; anything else returns the task to pending and stops. */
export async function runLoop(
  store: TaskStore,
  run: Runner,
  log: (msg: string) => void = () => {},
): Promise<LoopResult> {
  const ran: string[] = [];
  for (let next = pickNext(store.load()); next; next = pickNext(store.load())) {
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

  const stuck = store.load().filter((t) => t.status === "in_progress");
  if (stuck.length > 0) log(`warning: still in_progress from an earlier run: ${stuck.map((t) => t.id).join(", ")}`);
  log("nothing ready; done");
  return { ran, stoppedOn: null };
}

/** Builds a runner that spawns the given argv template with `{id}` substituted in each arg. */
function agentRunner(template: string[]): Runner {
  return async (task) => {
    const cmd = template.map((a) => a.replaceAll("{id}", task.id));
    const proc = Bun.spawn(cmd, { stdin: "inherit", stdout: "inherit", stderr: "inherit" });
    return proc.exited;
  };
}

export async function main(): Promise<number> {
  const store = fileStore();
  store.load(); // validate up front
  const { stoppedOn } = await runLoop(store, agentRunner(AGENT_CMD), (m) => console.log(`[loop] ${m}`));
  return stoppedOn ? 1 : 0;
}

if (import.meta.main) process.exit(await main());
