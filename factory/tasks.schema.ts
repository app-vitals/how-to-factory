// The task shape written by the plan skill and advanced by the loop.

export const TASK_STATUSES = ["pending", "in_progress", "pr"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  dependencies: string[];
  /** Owned by the loop: pending -> in_progress -> pr (terminal). */
  status: TaskStatus;
}

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

/** Returns human-readable problems; empty means valid. */
export function validateTasks(raw: unknown): string[] {
  if (!Array.isArray(raw)) return ["tasks.json must be an array"];
  const errors: string[] = [];
  const ids = new Set<string>();
  raw.forEach((t: unknown, i) => {
    const o = (typeof t === "object" && t !== null ? t : {}) as Record<string, unknown>;
    const at = `task[${i}]${typeof o.id === "string" ? ` (${o.id})` : ""}`;
    if (typeof o.id !== "string" || o.id === "") errors.push(`${at}: id must be a non-empty string`);
    else if (ids.has(o.id)) errors.push(`${at}: duplicate id`);
    else ids.add(o.id);
    for (const f of ["title", "description"]) {
      if (typeof o[f] !== "string" || o[f] === "") errors.push(`${at}: ${f} must be a non-empty string`);
    }
    if (!isStringArray(o.acceptanceCriteria)) errors.push(`${at}: acceptanceCriteria must be an array of strings`);
    if (!isStringArray(o.dependencies)) errors.push(`${at}: dependencies must be an array of strings`);
    if (!TASK_STATUSES.includes(o.status as TaskStatus)) {
      errors.push(`${at}: status must be one of ${TASK_STATUSES.join(", ")}`);
    }
  });
  if (errors.length > 0) return errors;

  const tasks = raw as Task[];
  for (const t of tasks) {
    for (const d of t.dependencies) {
      if (!ids.has(d)) errors.push(`${t.id}: unknown dependency "${d}"`);
      if (d === t.id) errors.push(`${t.id}: depends on itself`);
    }
  }
  if (errors.length === 0) errors.push(...findCycles(tasks));
  return errors;
}

function findCycles(tasks: Task[]): string[] {
  const deps = new Map(tasks.map((t) => [t.id, t.dependencies]));
  const state = new Map<string, "visiting" | "done">();
  const errors: string[] = [];
  const visit = (id: string): void => {
    if (state.get(id) === "done") return;
    if (state.get(id) === "visiting") {
      errors.push(`dependency cycle through "${id}"`);
      return;
    }
    state.set(id, "visiting");
    for (const d of deps.get(id) ?? []) visit(d);
    state.set(id, "done");
  };
  for (const t of tasks) visit(t.id);
  return errors;
}

export function parseTasks(raw: unknown): Task[] {
  const errors = validateTasks(raw);
  if (errors.length > 0) throw new Error(`invalid tasks.json:\n- ${errors.join("\n- ")}`);
  return raw as Task[];
}
