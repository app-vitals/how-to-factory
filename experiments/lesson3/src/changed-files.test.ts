import { afterAll, describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { changedFiles, selectMutateFiles } from "./changed-files.ts";

describe("selectMutateFiles", () => {
  test("keeps source files, drops tests, declarations, docs and dot-dirs", () => {
    const got = selectMutateFiles([
      "factory/loop.ts",
      "factory/loop.test.ts",
      "factory/types.d.ts",
      "src/__tests__/a.ts",
      "README.md",
      ".claude/skills/x.ts",
      "package.json",
      "lib/util.spec.js",
      "lib/util.js",
    ]);
    expect(got).toEqual(["factory/loop.ts", "lib/util.js"]);
  });

  test("dedupes, normalizes ./ prefix, sorts, ignores blanks", () => {
    expect(selectMutateFiles(["./b.ts", "a.ts", "b.ts", "  ", ""])).toEqual(["a.ts", "b.ts"]);
  });

  test("returns empty when nothing is mutable", () => {
    expect(selectMutateFiles(["a.md", "a.test.ts"])).toEqual([]);
  });
});

describe("changedFiles", () => {
  const dir = mkdtempSync(join(tmpdir(), "scorer-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args: string[]) => {
    const r = spawnSync("git", ["-c", "user.email=t@t", "-c", "user.name=t", ...args], { cwd: dir, encoding: "utf8" });
    if (r.status !== 0) throw new Error(r.stderr);
  };

  test("reports committed, uncommitted and untracked files relative to base", () => {
    git("init", "-q", "-b", "main");
    writeFileSync(join(dir, "base.ts"), "export const a = 1;\n");
    writeFileSync(join(dir, "gone.ts"), "export const g = 1;\n");
    git("add", "."); git("commit", "-qm", "base");
    git("checkout", "-qb", "run");
    writeFileSync(join(dir, "committed.ts"), "export const c = 1;\n");
    git("rm", "-q", "gone.ts");
    git("add", "."); git("commit", "-qm", "run");
    writeFileSync(join(dir, "base.ts"), "export const a = 2;\n");
    mkdirSync(join(dir, "sub"));
    writeFileSync(join(dir, "sub/new.ts"), "export const n = 1;\n");

    const got = changedFiles(dir, "main").sort();
    expect(got).toEqual(["base.ts", "committed.ts", "sub/new.ts"]);
  });
});
