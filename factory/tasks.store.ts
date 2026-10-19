// File-backed task store. Re-reads before every write so tasks appended by the plan skill are never clobbered.

import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { parseTasks, type Task, type TaskStatus } from "./tasks.schema.ts";

export const TASKS_PATH = new URL("./tasks.json", import.meta.url).pathname;

export interface TaskStore {
  load(): Task[];
  setStatus(id: string, status: TaskStatus): void;
}

export function fileStore(path: string = TASKS_PATH): TaskStore {
  const load = () => parseTasks(JSON.parse(readFileSync(path, "utf8")));
  return {
    load,
    setStatus(id, status) {
      const tasks = load();
      const task = tasks.find((t) => t.id === id);
      if (!task) throw new Error(`cannot set status: no task "${id}"`);
      task.status = status;
      const tmp = `${path}.tmp`;
      writeFileSync(tmp, `${JSON.stringify(tasks, null, 2)}\n`);
      renameSync(tmp, path); // atomic: readers never see a half-written file
    },
  };
}
