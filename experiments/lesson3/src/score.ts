import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { changedFiles, selectMutateFiles } from "./changed-files.ts";
import { runStryker } from "./mutation.ts";
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

const result = runStryker(resolve(worktree), mutate, values["test-command"]!);
console.log(JSON.stringify(result));

if (values.variant && values.task && values.run) {
  const row: RunResult = { variant: values.variant, task: values.task, run: Number(values.run), score: result.score };
  appendFileSync(values.out!, JSON.stringify(row) + "\n");
  console.log(`appended to ${values.out}`);
}
