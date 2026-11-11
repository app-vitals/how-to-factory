import { afterEach, beforeEach, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Task } from "./tasks.schema.ts";
import { fileStore } from "./tasks.store.ts";

const t = (id: string): Task => ({
  id,
  title: id,
  description: "d",
  acceptanceCriteria: ["c"],
  dependencies: [],
  status: "pending",
});

let dir: string;
let path: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "tasks-"));
  path = join(dir, "tasks.json");
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

test("setStatus persists and keeps other tasks untouched", () => {
  writeFileSync(path, JSON.stringify([t("a"), t("b")]));
  fileStore(path).setStatus("a", "in_progress");
  const saved = JSON.parse(readFileSync(path, "utf8")) as Task[];
  expect(saved.map((x) => x.status)).toEqual(["in_progress", "pending"]);
});

test("setStatus preserves tasks appended after the store last loaded", () => {
  writeFileSync(path, JSON.stringify([t("a")]));
  const store = fileStore(path);
  store.load();
  writeFileSync(path, JSON.stringify([t("a"), t("b")])); // plan skill appends
  store.setStatus("a", "pr");
  expect((JSON.parse(readFileSync(path, "utf8")) as Task[]).map((x) => x.id)).toEqual(["a", "b"]);
});

test("update merges the patch and leaves other tasks and fields intact", () => {
  const a = { ...t("a"), runs: 1 };
  writeFileSync(path, JSON.stringify([a, t("b")]));
  fileStore(path).update("a", { skips: 1, lastSkipReason: "blocked" });
  const saved = JSON.parse(readFileSync(path, "utf8")) as Task[];
  expect(saved[0]).toEqual({ ...a, skips: 1, lastSkipReason: "blocked" });
  expect(saved[1]).toEqual(t("b"));
});

test("update throws for an unknown id", () => {
  writeFileSync(path, JSON.stringify([t("a")]));
  expect(() => fileStore(path).update("nope", { runs: 1 })).toThrow("no task");
});

test("update preserves tasks appended after the store last loaded", () => {
  writeFileSync(path, JSON.stringify([t("a")]));
  const store = fileStore(path);
  store.load();
  writeFileSync(path, JSON.stringify([t("a"), t("b")]));
  store.update("a", { runs: 2 });
  const saved = JSON.parse(readFileSync(path, "utf8")) as Task[];
  expect(saved.map((x) => x.id)).toEqual(["a", "b"]);
  expect(saved[0]?.runs).toBe(2);
});

test("an update that changes nothing does not rewrite the file", () => {
  writeFileSync(path, JSON.stringify([{ ...t("a"), runs: 1 }]));
  const past = new Date(Date.now() - 60_000);
  utimesSync(path, past, past);
  const before = statSync(path);
  fileStore(path).update("a", { runs: 1 });
  fileStore(path).update("a", {});
  const after = statSync(path);
  expect(after.mtimeMs).toBe(before.mtimeMs);
  expect(after.ino).toBe(before.ino);
});

test("update writes via a temp file that is renamed away", () => {
  writeFileSync(path, JSON.stringify([t("a")]));
  fileStore(path).update("a", { runs: 1 });
  expect(existsSync(`${path}.tmp`)).toBe(false);
});

test("setStatus throws for an unknown id; load throws for invalid json content", () => {
  writeFileSync(path, JSON.stringify([t("a")]));
  expect(() => fileStore(path).setStatus("nope", "pr")).toThrow("no task");
  writeFileSync(path, JSON.stringify([{ id: "a" }]));
  expect(() => fileStore(path).load()).toThrow("invalid tasks.json");
});
