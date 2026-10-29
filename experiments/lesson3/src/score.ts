import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { changedFiles, selectMutateFiles } from "./changed-files.ts";
import { runStryker, type MutationScore } from "./mutation.ts";
import type { RunResult } from "./results.ts";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    base: { type: "string", default: "origin/main" },
    variant: { type: "string" },
    task: { type: "string" },
    run: { type: "string" },
    out: { type: "string", default: resolve(import.meta.dir, "../results.jsonl") },
    "test-command": { type: "string", default: "bun test" },
    "dry-run": { type: "boolean", default: false },
  },
});

const worktree = positionals[0];
if (!worktree) {
  console.error("usage: bun src/score.ts <worktree> [--base ref] [--variant v --task t --run n] [--out file] [--dry-run]");
  process.exit(2);
}

const mutate = selectMutateFiles(changedFiles(resolve(worktree), values.base!));
console.log(`files to mutate (${mutate.length}):\n${mutate.map((f) => `  ${f}`).join("\n")}`);
if (values["dry-run"]) process.exit(0);
if (mutate.length === 0) {
  console.error("run changed no source files; nothing to score");
  process.exit(1);
}

let result: MutationScore | undefined;
let failure: unknown;
try {
  result = runStryker(resolve(worktree), mutate, values["test-command"]!);
  console.log(JSON.stringify(result));
} catch (err) {
  failure = err;
  console.error(`scoring failed: ${err instanceof Error ? err.message : err}`);
}

if (values.variant && values.task && values.run) {
  // A run whose code or tests don't even pass Stryker's initial run is the lowest-scoring case:
  // record it as score 0 / status "failed" so it counts instead of silently biasing the medians up.
  const row: RunResult = {
    variant: values.variant,
    task: values.task,
    run: Number(values.run),
    score: result ? result.score : 0,
    ...(result ? {} : { status: "failed" as const }),
  };
  appendFileSync(values.out!, JSON.stringify(row) + "\n");
  console.log(`appended to ${values.out}`);
}
if (failure) process.exit(1);
