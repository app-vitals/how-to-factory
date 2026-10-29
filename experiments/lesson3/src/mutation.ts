import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

interface MutantReport {
  files: Record<string, { mutants: { status: string }[] }>;
}

export interface MutationScore {
  score: number | null; // percent, null when nothing was scoreable
  killed: number;
  survived: number;
  noCoverage: number;
  total: number;
}

const DETECTED = new Set(["Killed", "Timeout"]);
const UNDETECTED = new Set(["Survived", "NoCoverage"]);

/** Mutation score = detected / (detected + undetected); ignored and compile-error mutants don't count. */
export function scoreFromReport(report: MutantReport): MutationScore {
  let killed = 0;
  let survived = 0;
  let noCoverage = 0;
  for (const file of Object.values(report.files)) {
    for (const m of file.mutants) {
      if (DETECTED.has(m.status)) killed++;
      else if (m.status === "Survived") survived++;
      else if (m.status === "NoCoverage") noCoverage++;
    }
  }
  const total = killed + survived + noCoverage;
  return { score: total === 0 ? null : (killed / total) * 100, killed, survived, noCoverage, total };
}

export function strykerConfig(mutate: string[], testCommand: string, useChecker: boolean) {
  return {
    testRunner: "command",
    commandRunner: { command: testCommand },
    mutate,
    coverageAnalysis: "off",
    ...(useChecker ? { checkers: ["typescript"], tsconfigFile: "tsconfig.json" } : {}),
    reporters: ["clear-text", "json"],
    jsonReporter: { fileName: "reports/mutation/mutation.json" },
    concurrency: 4,
    timeoutMS: 20000,
    ignorePatterns: [".claude", "lessons", "landscape", "planning", "state", "docs", "decks", "experiments"],
    // a fresh worktree already has its own deps; keep Stryker's sandbox out of the way
    tempDirName: ".stryker-tmp",
  };
}

/** Run Stryker (installed under experiments/lesson3) with cwd set to the worktree. */
export function runStryker(worktree: string, mutate: string[], testCommand: string): MutationScore {
  const here = resolve(import.meta.dir, "..");
  const bin = join(here, "node_modules", ".bin", "stryker");
  if (!existsSync(bin)) throw new Error(`stryker not installed; run \`bun install\` in ${here}`);
  const useChecker = existsSync(join(worktree, "tsconfig.json"));
  const cfgDir = join(worktree, ".stryker-tmp");
  mkdirSync(cfgDir, { recursive: true });
  const cfgPath = join(cfgDir, "scorer.config.json");
  writeFileSync(cfgPath, JSON.stringify(strykerConfig(mutate, testCommand, useChecker), null, 2));
  const args = ["run", cfgPath, ...mutate.flatMap((f) => ["--mutate", f])];
  const res = spawnSync(bin, args, { cwd: worktree, stdio: "inherit" });
  const reportPath = join(worktree, "reports/mutation/mutation.json");
  if (!existsSync(reportPath)) throw new Error(`stryker produced no report (exit ${res.status})`);
  return scoreFromReport(JSON.parse(readFileSync(reportPath, "utf8")));
}
