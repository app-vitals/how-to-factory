import { describe, expect, test } from "bun:test";
import { AGENT_RESULT_SCHEMA, parseAgentResult, toAuditOutcome } from "./agent-result";

const envelope = (over: Record<string, unknown> = {}) =>
  JSON.stringify({
    type: "result",
    subtype: "success",
    is_error: false,
    result: "done",
    structured_output: { outcome: "processed" },
    ...over,
  });

describe("toAuditOutcome", () => {
  test("non-zero exit is a failure with the agent's reason", () => {
    expect(toAuditOutcome(1, { outcome: "skipped", reason: "PR is closed" })).toEqual({ outcome: "failure", reason: "PR is closed" });
  });

  test("non-zero exit without a report is a failure with the exit code", () => {
    expect(toAuditOutcome(2, null)).toEqual({ outcome: "failure", reason: "exited with code 2" });
    expect(toAuditOutcome(3, { outcome: "processed" })).toEqual({ outcome: "failure", reason: "exited with code 3" });
  });

  test("exit 0 and skipped is a skip with the agent's reason", () => {
    expect(toAuditOutcome(0, { outcome: "skipped", reason: "task already done" })).toEqual({ outcome: "skip", reason: "task already done" });
  });

  test("exit 0 and processed is a success with no reason", () => {
    expect(toAuditOutcome(0, { outcome: "processed" })).toEqual({ outcome: "success" });
  });

  test("exit 0 with no valid report is a failure", () => {
    expect(toAuditOutcome(0, null)).toEqual({ outcome: "failure", reason: "agent returned no result report" });
  });
});

describe("parseAgentResult", () => {
  test("returns null for empty stdout", () => {
    expect(parseAgentResult("")).toBeNull();
    expect(parseAgentResult("  \n")).toBeNull();
  });

  test("returns null for non-JSON stdout", () => {
    expect(parseAgentResult("all done, nothing to report")).toBeNull();
  });

  test("returns null for JSON that is not an object", () => {
    expect(parseAgentResult("null")).toBeNull();
    expect(parseAgentResult("[1]")).toBeNull();
  });

  test("returns null when is_error is true", () => {
    expect(parseAgentResult(envelope({ is_error: true }))).toBeNull();
  });

  test("returns null when structured_output is missing", () => {
    expect(parseAgentResult(envelope({ structured_output: undefined }))).toBeNull();
  });

  test("returns null when structured_output fails the schema", () => {
    expect(parseAgentResult(envelope({ structured_output: { outcome: "done" } }))).toBeNull();
    expect(parseAgentResult(envelope({ structured_output: {} }))).toBeNull();
    expect(parseAgentResult(envelope({ structured_output: "processed" }))).toBeNull();
  });

  test("returns null for skipped without a reason, or with an empty one", () => {
    expect(parseAgentResult(envelope({ structured_output: { outcome: "skipped" } }))).toBeNull();
    expect(parseAgentResult(envelope({ structured_output: { outcome: "skipped", reason: "  " } }))).toBeNull();
  });

  test("parses a real envelope to the report", () => {
    const real = JSON.stringify({
      type: "result",
      subtype: "success",
      is_error: false,
      duration_ms: 41234,
      num_turns: 12,
      result: "Opened the PR.",
      session_id: "0b1c",
      total_cost_usd: 0.42,
      structured_output: { outcome: "skipped", reason: "the PR is already merged" },
    });
    expect(parseAgentResult(real)).toEqual({ outcome: "skipped", reason: "the PR is already merged" });
  });

  test("parses processed, dropping a stray reason", () => {
    expect(parseAgentResult(envelope())).toEqual({ outcome: "processed" });
    expect(parseAgentResult(envelope({ structured_output: { outcome: "processed", reason: "x" } }))).toEqual({ outcome: "processed" });
  });
});

describe("AGENT_RESULT_SCHEMA", () => {
  test("is a JSON Schema requiring outcome", () => {
    expect(AGENT_RESULT_SCHEMA.type).toBe("object");
    expect(AGENT_RESULT_SCHEMA.required).toEqual(["outcome"]);
    expect(AGENT_RESULT_SCHEMA.properties.outcome.enum).toEqual(["processed", "skipped"]);
  });
});
