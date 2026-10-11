// The todo loop: pick one ready todo, hand it to a coding agent, re-read, repeat.
// The agent command is configuration (FACTORY_AGENT_CMD); see factory/README.md.

import { readFileSync } from "node:fs";
import { parseTodos, type Todo } from "./todos.schema.ts";

export const TODOS_PATH = new URL("./todos.json", import.meta.url).pathname;

/** Default agent: Claude Code headless. Flags verified in factory/README.md. */
export const DEFAULT_AGENT_CMD: string[] = [
  "claude",
  "-p",
  "/{skill} {id}",
  "--allowedTools",
  "Read,Edit,Write,Glob,Grep,Bash(git *),Bash(gh *),Bash(bun *)",
];

/** First pending todo whose dependencies are all done, else null. */
export function pickNext(todos: Todo[]): Todo | null {
  const done = new Set(todos.filter((t) => t.status === "done").map((t) => t.id));
  return todos.find((t) => t.status === "pending" && t.dependencies.every((d) => done.has(d))) ?? null;
}

/** Runs the agent for one todo; resolves to the process exit code. */
export type Runner = (todo: Todo) => Promise<number>;

export interface LoopResult {
  ran: string[];
  /** Id of the todo that stopped the loop, or null when nothing was left ready. */
  stoppedOn: string | null;
}

/** One todo at a time; stops on the first todo that does not end pr_open or done. */
export async function runLoop(
  load: () => Todo[],
  run: Runner,
  log: (msg: string) => void = () => {},
): Promise<LoopResult> {
  const ran: string[] = [];
  for (let next = pickNext(load()); next; next = pickNext(load())) {
    log(`running ${next.id}: ${next.title}`);
    const code = await run(next);
    ran.push(next.id);
    const after = load().find((t) => t.id === next.id)?.status;
    if (after !== "pr_open" && after !== "done") {
      log(`${next.id} ended ${after ?? "missing"} (agent exit ${code}); stopping`);
      return { ran, stoppedOn: next.id };
    }
  }
  log("nothing ready; done");
  return { ran, stoppedOn: null };
}

/** Builds a runner from an argv template; `{id}` and `{skill}` are substituted in each arg. */
export function agentRunner(template: string[], skill: string): Runner {
  return async (todo) => {
    const cmd = template.map((a) => a.replaceAll("{id}", todo.id).replaceAll("{skill}", skill));
    const proc = Bun.spawn(cmd, { stdin: "inherit", stdout: "inherit", stderr: "inherit" });
    return proc.exited;
  };
}

function agentTemplate(env: Record<string, string | undefined>): string[] {
  const raw = env.FACTORY_AGENT_CMD;
  if (!raw) return DEFAULT_AGENT_CMD;
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every((a) => typeof a === "string")) {
    throw new Error("FACTORY_AGENT_CMD must be a JSON array of strings");
  }
  return parsed;
}

export async function main(env: Record<string, string | undefined> = process.env): Promise<number> {
  const load = () => parseTodos(JSON.parse(readFileSync(TODOS_PATH, "utf8")));
  load(); // validate up front
  const runner = agentRunner(agentTemplate(env), env.FACTORY_SKILL ?? "dev-task");
  const { stoppedOn } = await runLoop(load, runner, (m) => console.log(`[loop] ${m}`));
  return stoppedOn ? 1 : 0;
}

if (import.meta.main) process.exit(await main());
