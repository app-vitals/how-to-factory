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
    store.record(entry({ action: "review", target: 12, outcome: "failure", exitCode: 1, reason: "exited with code 1" }));
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

  test("accepts a skip with a reason", () => {
    const store = auditStore(path);
    const e = entry({ outcome: "skip", reason: "nothing to do" });
    store.record(e);
    expect(store.list()).toEqual([e]);
  });

  test("accepts a skip without an exitCode", () => {
    const store = auditStore(path);
    const { exitCode: _omitted, ...rest } = entry({ outcome: "skip", reason: "nothing to do" });
    store.record(rest);
    expect(store.list()[0]?.exitCode).toBeUndefined();
  });

  test("rejects a failure without a reason", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ outcome: "failure", exitCode: 1 }))).toThrow(/reason/);
    expect(store.list()).toEqual([]);
  });

  test("rejects a skip without a reason", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ outcome: "skip" }))).toThrow(/reason/);
    expect(store.list()).toEqual([]);
  });

  test("rejects a success with a reason", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ outcome: "success", reason: "because" }))).toThrow(/reason/);
    expect(store.list()).toEqual([]);
  });

  test("rejects an empty reason", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ outcome: "failure", exitCode: 1, reason: "" }))).toThrow(/reason/);
    expect(() => store.record(entry({ outcome: "skip", reason: "" }))).toThrow(/reason/);
    expect(store.list()).toEqual([]);
  });

  test("still rejects a non-integer exitCode when one is given", () => {
    const store = auditStore(path);
    expect(() => store.record(entry({ outcome: "skip", reason: "x", exitCode: 1.5 }))).toThrow(/exitCode/);
  });

  describe("repo and url", () => {
    const pr = { action: "review" as const, target: 7, repo: "acme/widgets", url: "https://github.com/acme/widgets/pull/7" };

    test("accepts repo and url together and round-trips them", () => {
      const store = auditStore(path);
      store.record(entry(pr));
      expect(store.list()[0]).toMatchObject({ repo: "acme/widgets", url: "https://github.com/acme/widgets/pull/7" });
    });

    test("still accepts entries with neither", () => {
      const store = auditStore(path);
      store.record(entry());
      expect(store.list()).toHaveLength(1);
      expect(store.list()[0]).not.toHaveProperty("repo");
      expect(store.list()[0]).not.toHaveProperty("url");
    });

    test("rejects repo without url, and url without repo", () => {
      const store = auditStore(path);
      expect(() => store.record(entry({ ...pr, url: undefined }))).toThrow(/repo and url/);
      expect(() => store.record(entry({ ...pr, repo: undefined }))).toThrow(/repo and url/);
      expect(store.list()).toEqual([]);
    });

    test("rejects a repo that is not owner/name", () => {
      const store = auditStore(path);
      for (const repo of ["widgets", "acme/", "/widgets", "a/b/c", "acme widgets/x", "", 5]) {
        expect(() => store.record(entry({ ...pr, repo: repo as string }))).toThrow(/repo/);
      }
      expect(store.list()).toEqual([]);
    });

    test("rejects a url that is not https", () => {
      const store = auditStore(path);
      for (const url of ["http://github.com/a/b/pull/1", "javascript:alert(1)", "github.com/a/b/pull/1", "https://", "", 5]) {
        expect(() => store.record(entry({ ...pr, url: url as string }))).toThrow(/url/);
      }
      expect(store.list()).toEqual([]);
    });
  });
});
