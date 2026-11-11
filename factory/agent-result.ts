// The result report an agent run ends with, and how it maps onto an audit entry.
// The runner asks Claude Code for `--output-format json --json-schema <AGENT_RESULT_SCHEMA>`;
// the schema-checked report arrives in the envelope's `structured_output` field.

import type { AuditOutcome } from "./audit-log";

export const AGENT_OUTCOMES = ["processed", "skipped"] as const;
export type AgentOutcome = (typeof AGENT_OUTCOMES)[number];

export interface AgentResult {
  outcome: AgentOutcome;
  /** Why the agent deliberately did nothing. Present and non-empty when skipped. */
  reason?: string;
}

/** JSON Schema handed to the agent CLI. `reason` is required when skipped. */
export const AGENT_RESULT_SCHEMA = {
  type: "object",
  properties: {
    outcome: { type: "string", enum: [...AGENT_OUTCOMES] },
    reason: { type: "string", minLength: 1 },
  },
  required: ["outcome"],
  anyOf: [{ properties: { outcome: { const: "processed" } } }, { properties: { outcome: { const: "skipped" } }, required: ["reason"] }],
  additionalProperties: false,
} as const;

function validateReport(value: unknown): AgentResult | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const { outcome, reason } = value as Record<string, unknown>;
  if (outcome === "processed") return { outcome };
  if (outcome === "skipped" && typeof reason === "string" && reason.trim() !== "") return { outcome, reason };
  return null;
}

/** Parses the Claude Code `--output-format json` envelope; null when there is no valid report. */
export function parseAgentResult(stdout: string): AgentResult | null {
  if (stdout.trim() === "") return null;
  let envelope: unknown;
  try {
    envelope = JSON.parse(stdout);
  } catch {
    return null;
  }
  if (typeof envelope !== "object" || envelope === null || Array.isArray(envelope)) return null;
  const { is_error, structured_output } = envelope as Record<string, unknown>;
  if (is_error === true) return null;
  return validateReport(structured_output);
}

/** Maps an exit code and the parsed report onto the audit log's outcome and reason. */
export function toAuditOutcome(exitCode: number, report: AgentResult | null): { outcome: AuditOutcome; reason?: string } {
  if (exitCode !== 0) return { outcome: "failure", reason: report?.reason ?? `exited with code ${exitCode}` };
  if (!report) return { outcome: "failure", reason: "agent returned no result report" };
  if (report.outcome === "skipped") return { outcome: "skip", reason: report.reason };
  return { outcome: "success" };
}
