import { describe, expect, test } from "bun:test";
import { parseTasks, validateTasks, type Task } from "./tasks.schema.ts";

const valid = (over: Partial<Task> = {}): Task => ({
  id: "a",
  title: "T",
  description: "D",
  acceptanceCriteria: ["c"],
  dependencies: [],
  status: "pending",
  ...over,
});

describe("validateTasks", () => {
  test("accepts a valid list, including an empty one", () => {
    expect(validateTasks([])).toEqual([]);
    expect(validateTasks([valid(), valid({ id: "b", dependencies: ["a"] })])).toEqual([]);
  });

  test("rejects non-arrays and malformed entries", () => {
    expect(validateTasks({})).toHaveLength(1);
    expect(validateTasks([null])).not.toEqual([]);
    expect(validateTasks([valid({ status: "done" as never })])[0]).toContain("status");
    expect(validateTasks([valid({ acceptanceCriteria: "x" as never })])[0]).toContain("acceptanceCriteria");
  });

  test("rejects duplicate ids, unknown dependencies and self-dependencies", () => {
    expect(validateTasks([valid(), valid()])[0]).toContain("duplicate");
    expect(validateTasks([valid({ dependencies: ["zzz"] })])[0]).toContain("unknown dependency");
    expect(validateTasks([valid({ dependencies: ["a"] })]).join()).toContain("depends on itself");
  });

  test("rejects dependency cycles", () => {
    const errors = validateTasks([valid({ dependencies: ["b"] }), valid({ id: "b", dependencies: ["a"] })]);
    expect(errors.join()).toContain("cycle");
  });
});

describe("parseTasks", () => {
  test("returns the tasks or throws with every problem listed", () => {
    expect(parseTasks([valid()])).toHaveLength(1);
    expect(() => parseTasks([valid({ id: "" })])).toThrow("invalid tasks.json");
  });
});
