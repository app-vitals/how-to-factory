import { describe, expect, test } from "bun:test";
import { scoreFromReport, strykerConfig } from "./mutation.ts";

describe("scoreFromReport", () => {
  test("counts Killed+Timeout as detected; ignores CompileError and Ignored", () => {
    const s = scoreFromReport({
      files: {
        "a.ts": { mutants: [{ status: "Killed" }, { status: "Survived" }, { status: "CompileError" }] },
        "b.ts": { mutants: [{ status: "Timeout" }, { status: "NoCoverage" }, { status: "Ignored" }] },
      },
    });
    expect(s).toEqual({ score: 50, killed: 2, survived: 1, noCoverage: 1, total: 4 });
  });

  test("score is null when nothing is scoreable", () => {
    expect(scoreFromReport({ files: { "a.ts": { mutants: [{ status: "CompileError" }] } } }).score).toBeNull();
  });
});

describe("strykerConfig", () => {
  test("scopes mutate to the given files and adds the TS checker only on request", () => {
    const withChecker = strykerConfig(["a.ts"], "bun test", true);
    expect(withChecker.mutate).toEqual(["a.ts"]);
    expect(withChecker.commandRunner.command).toBe("bun test");
    expect((withChecker as { checkers?: string[] }).checkers).toEqual(["typescript"]);
    expect((strykerConfig(["a.ts"], "bun test", false) as { checkers?: string[] }).checkers).toBeUndefined();
  });
});
