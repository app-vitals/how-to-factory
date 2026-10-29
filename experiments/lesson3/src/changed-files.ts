import { spawnSync } from "node:child_process";

const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs)$/;
const NOT_MUTATED = [
  /\.d\.ts$/,
  /(^|\/)[^/]*\.(test|spec)\.[^/]+$/,
  /(^|\/)(__tests__|node_modules|\.stryker-tmp|reports)\//,
  /(^|\/)\.[^/]+\//, // dot-directories such as .claude
];

/** Keep only source files worth mutating: no tests, declarations, config dirs or non-code. */
export function selectMutateFiles(changed: string[]): string[] {
  const picked = changed
    .map((f) => f.trim().replace(/^\.\//, ""))
    .filter((f) => f !== "" && SOURCE_EXT.test(f) && !NOT_MUTATED.some((re) => re.test(f)));
  return [...new Set(picked)].sort();
}

function git(cwd: string, args: string[]): string[] {
  const res = spawnSync("git", args, { cwd, encoding: "utf8" });
  if (res.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${res.stderr}`);
  return res.stdout.split("\n").filter(Boolean);
}

/** Files a run changed: committed since `base`, uncommitted edits, and untracked files. */
export function changedFiles(worktree: string, base: string): string[] {
  const committed = git(worktree, ["diff", "--name-only", "--diff-filter=d", `${base}...HEAD`]);
  const dirty = git(worktree, ["diff", "--name-only", "--diff-filter=d", "HEAD"]);
  const untracked = git(worktree, ["ls-files", "--others", "--exclude-standard"]);
  return [...committed, ...dirty, ...untracked];
}
