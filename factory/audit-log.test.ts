import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { appendFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AUDIT_LOG_PATH, type AuditEntry, auditStore } from "./audit-log.ts";

let dir: string;
let path: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "audit-log-"));
  path = join(dir, "audit-log.jsonl");
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

function entry(over: Partial<AuditEntry> = {}): AuditEntry {
  return {
    at: "2026-11-11T12:00:00.000Z",
    action: "dev-task",
    target: "audit-log-store",
    title: "Add an append-only audit log store",
    outcome: "success",
    exitCode: 0,
    durationMs: 1234,
    ...over,
  };
}

describe("auditStore", () => {
  test("defaults to factory/audit-log.jsonl", () => {
    expect(AUDIT_LOG_PATH.endsWith("/factory/audit-log.jsonl")).toBe(true);
  });

  test("record then list round-trips an entry", () => {
    const store = auditStore(path);
    const e = entry();
    store.record(e);
    expect(store.list()).toEqual([e]);
  });

  test("lists entries in append order", () => {
    const store = auditStore(path);
    store.record(entry({ target: "a" }));
    store.record(entry({ action: "review", target: 12, outcome: "failure", exitCode: 1 }));
    store.record(entry({ action: "patch", target: 12 }));
    expect(store.list().map((e) => e.target)).toEqual(["a", 12, 12]);
  });

  test("a missing file lists as []", () => {
    expect(auditStore(path).list()).toEqual([]);
  });

  test("a corrupt line raises an error naming the file", () => {
    const store = auditStore(path);
    store.record(entry());
    appendFileSync(path, "{not json\n");
    expect(() => store.list()).toThrow(path);
    expect(() => store.list()).toThrow(/line 2/);
  });

  test("record appends exactly one line per call without rewriting earlier lines", () => {
    const store = auditStore(path);
    store.record(entry({ target: "a" }));
    const first = readFileSync(path, "utf8");
    expect(first.split("\n").filter(Boolean)).toHaveLength(1);
    store.record(entry({ target: "b" }));
    const second = readFileSync(path, "utf8");
    expect(second.startsWith(first)).toBe(true);
    expect(second.split("\n").filter(Boolean)).toHaveLength(2);
    expect(second.endsWith("\n")).toBe(true);
  });

  test("record leaves earlier lines byte-for-byte untouched", () => {
    writeFileSync(path, `${JSON.stringify(entry({ target: "old" }))}   \n`);
    auditStore(path).record(entry({ target: "new" }));
    const after = readFileSync(path, "utf8");
    expect(after.startsWith(`${JSON.stringify(entry({ target: "old" }))}   \n`)).toBe(true);
    expect(after.split("\n").filter(Boolean)).toHaveLength(2);
  });

  test("rejects an unknown action and writes nothing", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ action: "deploy" as never }))).toThrow(/action/);
    expect(store.list()).toEqual([]);
  });

  test("rejects an unknown outcome and writes nothing", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ outcome: "maybe" as never }))).toThrow(/outcome/);
    expect(store.list()).toEqual([]);
  });

  test("rejects a bad timestamp, target, exit code or duration", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ at: "yesterday" }))).toThrow(/at/);
    expect(() => store.record(entry({ target: "" }))).toThrow(/target/);
    expect(() => store.record(entry({ exitCode: 1.5 }))).toThrow(/exitCode/);
    expect(() => store.record(entry({ durationMs: -1 }))).toThrow(/durationMs/);
    expect(store.list()).toEqual([]);
  });

  test("accepts exitCode -1 (runner threw)", () => {
    const store = auditStore(path);
    store.record(entry({ outcome: "failure", exitCode: -1 }));
    expect(store.list()[0]?.exitCode).toBe(-1);
  });
});
