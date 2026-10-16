import { afterEach, beforeEach, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

test("setStatus throws for an unknown id; load throws for invalid json content", () => {
  writeFileSync(path, JSON.stringify([t("a")]));
  expect(() => fileStore(path).setStatus("nope", "pr")).toThrow("no task");
  writeFileSync(path, JSON.stringify([{ id: "a" }]));
  expect(() => fileStore(path).load()).toThrow("invalid tasks.json");
});
