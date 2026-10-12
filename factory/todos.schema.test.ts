import { describe, expect, test } from "bun:test";
import { parseTodos, validateTodos } from "./todos.schema.ts";

const todo = (over: Record<string, unknown> = {}) => ({
  id: "T-1",
  title: "Do a thing",
  description: "Details",
  acceptanceCriteria: ["it works"],
  status: "pending",
  dependencies: [],
  ...over,
});

describe("validateTodos", () => {
  test("accepts a valid list", () => {
    expect(validateTodos([todo(), todo({ id: "T-2", dependencies: ["T-1"] })])).toEqual([]);
    expect(parseTodos([todo()])).toHaveLength(1);
  });

  test("rejects a missing field", () => {
    const { title: _omit, ...rest } = todo();
    const errors = validateTodos([rest]);
    expect(errors.some((e) => e.includes('"title"'))).toBe(true);
  });

  test("ignores an extra branch key", () => {
    expect(validateTodos([todo({ branch: "feat/t-1" })])).toEqual([]);
  });

  test("rejects a bad status", () => {
    const errors = validateTodos([todo({ status: "finished" })]);
    expect(errors.some((e) => e.includes('"status"'))).toBe(true);
  });

  test("rejects a dependency on an unknown id", () => {
    const errors = validateTodos([todo({ dependencies: ["NOPE"] })]);
    expect(errors.some((e) => e.includes('"NOPE"'))).toBe(true);
  });

  test("rejects duplicate ids and non-arrays", () => {
    expect(validateTodos([todo(), todo()]).some((e) => e.includes("duplicate"))).toBe(true);
    expect(validateTodos({})).toEqual(["todos must be an array"]);
    expect(() => parseTodos([todo({ status: "x" })])).toThrow();
  });
});
