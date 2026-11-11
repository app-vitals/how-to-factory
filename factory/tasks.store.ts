// File-backed task store. Re-reads before every write so tasks appended by the plan skill are never clobbered.

import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { parseTasks, type Task, type TaskStatus } from "./tasks.schema.ts";

export const TASKS_PATH = new URL("./tasks.json", import.meta.url).pathname;

export interface TaskStore {
  load(): Task[];
  setStatus(id: string, status: TaskStatus): void;
  /** Shallow-merges the patch into the task; writes only when the task changes. */
  update(id: string, patch: Partial<Omit<Task, "id">>): void;
}

export function fileStore(path: string = TASKS_PATH): TaskStore {
  const load = () => parseTasks(JSON.parse(readFileSync(path, "utf8")));
  const write = (tasks: Task[]) => {
    const tmp = `${path}.tmp`;
    writeFileSync(tmp, `${JSON.stringify(tasks, null, 2)}\n`);
    renameSync(tmp, path); // atomic: readers never see a half-written file
  };
  return {
    load,
    setStatus(id, status) {
      const tasks = load();
      const task = tasks.find((t) => t.id === id);
      if (!task) throw new Error(`cannot set status: no task "${id}"`);
      task.status = status;
      write(tasks);
    },
    update(id, patch) {
      const tasks = load();
      const i = tasks.findIndex((t) => t.id === id);
      const task = tasks[i];
      if (!task) throw new Error(`cannot update: no task "${id}"`);
      const merged = { ...task, ...patch };
      if (JSON.stringify(merged) === JSON.stringify(task)) return; // nothing changed: skip the write
      tasks[i] = merged;
      parseTasks(tasks); // reject a patch that would make the file invalid
      write(tasks);
    },
  };
}
