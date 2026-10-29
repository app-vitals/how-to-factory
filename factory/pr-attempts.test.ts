import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { attemptsStore, MAX_PR_ATTEMPTS, NEEDS_HUMAN_LABEL } from "./pr-attempts.ts";
import type { GhRunner, PullRequest } from "./prs.ts";

let dir: string;
let path: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "pr-attempts-"));
  path = join(dir, "pr-attempts.json");
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

function fakeGh(exitCode = 0) {
  const calls: string[][] = [];
  const gh: GhRunner = async (args) => {
    calls.push(args);
    return { exitCode, stdout: "", stderr: exitCode ? "boom" : "" };
  };
  return { gh, calls };
}

function pr(number: number, labels: string[] = []): PullRequest {
  return {
    number,
    title: "t",
    branch: "feat/x",
    createdAt: "2026-10-29T00:00:00Z",
    isDraft: false,
    headSha: "abc",
    ci: "pass",
    mergeable: "clean",
    reviewDecision: "none",
    labels,
  };
}

describe("counts", () => {
  test("a PR with no entry is not exceeded", () => {
    const s = attemptsStore(path);
    expect(s.exceeded(1)).toBe(false);
    expect(s.get(1)).toBeUndefined();
    expect(existsSync(path)).toBe(false);
  });

  test("counts and reviewedSha persist across store reloads", () => {
    attemptsStore(path).record(7, "review", "sha1");
    attemptsStore(path).record(7, "patch", "sha2");
    expect(attemptsStore(path).get(7)).toEqual({ reviews: 1, patches: 1, reviewedSha: "sha1" });
  });

  test("a failed review counts but does not set reviewedSha", () => {
    const s = attemptsStore(path);
    s.record(7, "review", "sha1", false);
    expect(s.get(7)).toEqual({ reviews: 1, patches: 0 });
    s.record(7, "review", "sha1", true);
    expect(s.get(7)?.reviewedSha).toBe("sha1");
  });

  test("exceeded flips exactly at the 3rd recorded attempt", () => {
    expect(MAX_PR_ATTEMPTS).toBe(3);
    const s = attemptsStore(path);
    s.record(5, "review", "a");
    expect(s.exceeded(5)).toBe(false);
    s.record(5, "patch", "a");
    expect(s.exceeded(5)).toBe(false);
    s.record(5, "patch", "b");
    expect(s.exceeded(5)).toBe(true);
    expect(attemptsStore(path).exceeded(5)).toBe(true);
  });

  test("PRs are counted independently", () => {
    const s = attemptsStore(path);
    for (let i = 0; i < 3; i++) s.record(1, "patch", "a");
    expect(s.exceeded(1)).toBe(true);
    expect(s.exceeded(2)).toBe(false);
  });

  test("writes are atomic: no tmp file left behind", () => {
    attemptsStore(path).record(1, "review", "a");
    expect(existsSync(`${path}.tmp`)).toBe(false);
    expect(JSON.parse(readFileSync(path, "utf8"))["1"].reviews).toBe(1);
  });

  test("a corrupt file throws a descriptive error", async () => {
    await Bun.write(path, "{nope");
    expect(() => attemptsStore(path).exceeded(1)).toThrow(/not valid JSON/);
  });
});

describe("flagForHuman", () => {
  test("labels and comments once; a second call makes no gh calls", async () => {
    const s = attemptsStore(path);
    const { gh, calls } = fakeGh();
    await s.flagForHuman(9, gh);
    const edit = calls.filter((c) => c[0] === "pr" && c[1] === "edit");
    const comment = calls.filter((c) => c[0] === "pr" && c[1] === "comment");
    expect(edit).toHaveLength(1);
    expect(edit[0]).toEqual(["pr", "edit", "9", "--add-label", NEEDS_HUMAN_LABEL]);
    expect(comment).toHaveLength(1);
    const before = calls.length;
    await s.flagForHuman(9, gh);
    await attemptsStore(path).flagForHuman(9, gh); // also after a reload
    expect(calls.length).toBe(before);
  });

  test("a gh failure throws, and the PR is not marked flagged so it is retried", async () => {
    const s = attemptsStore(path);
    await expect(s.flagForHuman(9, fakeGh(1).gh)).rejects.toThrow(/failed \(exit 1\): boom/);
    const { gh, calls } = fakeGh();
    await s.flagForHuman(9, gh);
    expect(calls.some((c) => c[1] === "comment")).toBe(true);
  });
});

describe("sync", () => {
  test("removing the label clears the count", async () => {
    const s = attemptsStore(path);
    for (let i = 0; i < 3; i++) s.record(4, "patch", "a");
    await s.flagForHuman(4, fakeGh().gh);
    s.sync([pr(4, [NEEDS_HUMAN_LABEL])]);
    expect(s.exceeded(4)).toBe(true); // label still there: kept
    s.sync([pr(4)]);
    expect(s.get(4)).toBeUndefined();
    expect(s.exceeded(4)).toBe(false);
  });

  test("an unflagged PR without the label keeps its count", () => {
    const s = attemptsStore(path);
    s.record(4, "review", "a");
    s.sync([pr(4)]);
    expect(s.get(4)?.reviews).toBe(1);
  });

  test("a closed PR's entry is pruned", () => {
    const s = attemptsStore(path);
    s.record(1, "review", "a");
    s.record(2, "review", "a");
    s.sync([pr(2)]);
    expect(s.get(1)).toBeUndefined();
    expect(s.get(2)?.reviews).toBe(1);
  });

  test("a flagged PR can be flagged again after its label reset", async () => {
    const s = attemptsStore(path);
    await s.flagForHuman(3, fakeGh().gh);
    s.sync([pr(3)]);
    const { gh, calls } = fakeGh();
    await s.flagForHuman(3, gh);
    expect(calls.length).toBeGreaterThan(0);
  });
});
