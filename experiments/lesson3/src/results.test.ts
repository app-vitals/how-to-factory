import { describe, expect, test } from "bun:test";
import { aggregate, median, renderTable, type RunResult } from "./results.ts";

const r = (variant: string, task: string, run: number, score: number | null): RunResult => ({ variant, task, run, score });

describe("median", () => {
  test("odd, even and unsorted input", () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 3, 2])).toBe(2.5);
    expect(median([7])).toBe(7);
  });
  test("throws on empty", () => {
    expect(() => median([])).toThrow();
  });
});

describe("aggregate", () => {
  test("computes median and range per variant x task, dropping null scores", () => {
    const agg = aggregate([
      r("v1", "t1", 1, 40), r("v1", "t1", 2, 60), r("v1", "t1", 3, 50),
      r("v1", "t2", 1, 10), r("v1", "t2", 2, null),
      r("v2", "t1", 1, 80), r("v2", "t1", 2, 90),
    ]);
    expect(agg.get("v1")?.get("t1")).toEqual({ n: 3, median: 50, min: 40, max: 60 });
    expect(agg.get("v1")?.get("t2")).toEqual({ n: 1, median: 10, min: 10, max: 10 });
    expect(agg.get("v2")?.get("t1")).toEqual({ n: 2, median: 85, min: 80, max: 90 });
  });
});

describe("aggregate keeps all-null variants", () => {
  test("a variant with only null scores stays in the aggregate with no cells", () => {
    const agg = aggregate([r("v1", "t1", 1, null), r("v2", "t1", 1, 50)]);
    expect(agg.get("v1")?.size).toBe(0);
  });
  test("failed runs recorded as score 0 count toward the median", () => {
    const agg = aggregate([r("v1", "t1", 1, 0), r("v1", "t1", 2, 80), r("v1", "t1", 3, 0)]);
    expect(agg.get("v1")?.get("t1")?.median).toBe(0);
  });
});

describe("renderTable", () => {
  test("shows a row of — for a variant whose runs are all null", () => {
    const out = renderTable([r("v1", "a", 1, null), r("v2", "a", 1, 50)]);
    expect(out.split("\n")).toContain("| v1 | — |");
  });
  test("renders a variant x task markdown table with — for missing cells", () => {
    const out = renderTable([r("v1", "a", 1, 50), r("v1", "a", 2, 70), r("v2", "b", 1, 90)]);
    expect(out.split("\n")).toEqual([
      "| variant | a | b |",
      "|---|---|---|",
      "| v1 | 60.0 (50.0–70.0, n=2) | — |",
      "| v2 | — | 90.0 (90.0–90.0, n=1) |",
      "",
    ]);
  });
});
