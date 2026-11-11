// Append-only audit log of factory runs, one JSON object per line (JSONL).
// record() only ever appends; earlier lines are never rewritten.

import { appendFileSync, existsSync, readFileSync } from "node:fs";

export const AUDIT_LOG_PATH = new URL("./audit-log.jsonl", import.meta.url).pathname;
export const AUDIT_ACTIONS = ["dev-task", "review", "patch"] as const;
export const AUDIT_OUTCOMES = ["success", "failure", "skip"] as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[number];
export type AuditOutcome = (typeof AUDIT_OUTCOMES)[number];

export interface AuditEntry {
  /** ISO 8601 timestamp. */
  at: string;
  action: AuditAction;
  /** Task id (dev-task) or PR number (review, patch). */
  target: string | number;
  title: string;
  outcome: AuditOutcome;
  /** The agent's exit code, when there was one. */
  exitCode?: number;
  /** Why the run failed or was skipped. Required and non-empty for those outcomes, absent on success. */
  reason?: string;
  durationMs: number;
}

export interface AuditStore {
  /** Validates the entry, then appends exactly one line. Throws, writing nothing, on an invalid entry. */
  record(entry: AuditEntry): void;
  /** All entries in append order; [] when the log does not exist yet. */
  list(): AuditEntry[];
}

function validate(entry: AuditEntry): void {
  const e = entry as unknown as Record<string, unknown>;
  if (typeof e.at !== "string" || Number.isNaN(Date.parse(e.at))) throw new Error(`invalid audit entry: at must be an ISO 8601 timestamp, got ${JSON.stringify(e.at)}`);
  if (!AUDIT_ACTIONS.includes(e.action as AuditAction)) throw new Error(`invalid audit entry: unknown action ${JSON.stringify(e.action)}`);
  const targetOk = (typeof e.target === "string" && e.target !== "") || (typeof e.target === "number" && Number.isFinite(e.target));
  if (!targetOk) throw new Error(`invalid audit entry: target must be a task id or PR number, got ${JSON.stringify(e.target)}`);
  if (typeof e.title !== "string") throw new Error("invalid audit entry: title must be a string");
  if (!AUDIT_OUTCOMES.includes(e.outcome as AuditOutcome)) throw new Error(`invalid audit entry: unknown outcome ${JSON.stringify(e.outcome)}`);
  if (e.exitCode !== undefined && !Number.isInteger(e.exitCode)) {
    throw new Error(`invalid audit entry: exitCode must be an integer when given, got ${JSON.stringify(e.exitCode)}`);
  }
  if (e.outcome === "success") {
    if (e.reason !== undefined) throw new Error("invalid audit entry: reason is not allowed on a success");
  } else if (typeof e.reason !== "string" || e.reason.trim() === "") {
    throw new Error(`invalid audit entry: reason is required and non-empty for ${e.outcome}, got ${JSON.stringify(e.reason)}`);
  }
  if (typeof e.durationMs !== "number" || !Number.isFinite(e.durationMs) || e.durationMs < 0) {
    throw new Error(`invalid audit entry: durationMs must be a non-negative number, got ${JSON.stringify(e.durationMs)}`);
  }
}

export function auditStore(path: string = AUDIT_LOG_PATH): AuditStore {
  return {
    record(entry) {
      validate(entry);
      appendFileSync(path, `${JSON.stringify(entry)}\n`);
    },
    list() {
      if (!existsSync(path)) return [];
      const entries: AuditEntry[] = [];
      readFileSync(path, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (line.trim() === "") return;
          try {
            entries.push(JSON.parse(line) as AuditEntry);
          } catch (e) {
            throw new Error(`${path} line ${i + 1} is not valid JSON: ${(e as Error).message}`);
          }
        });
      return entries;
    },
  };
}
