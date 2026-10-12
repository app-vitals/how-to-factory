// Plain-TS validator for factory/todos.json. No dependencies.

export const TODO_STATUSES = ["pending", "in_progress", "pr_open", "done", "blocked"] as const;
export type TodoStatus = (typeof TODO_STATUSES)[number];

export interface Todo {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  status: TodoStatus;
  dependencies: string[];
}

const isString = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

/** Returns a list of human-readable errors; empty means valid. */
export function validateTodos(input: unknown): string[] {
  if (!Array.isArray(input)) return ["todos must be an array"];
  const errors: string[] = [];
  const ids = new Set<string>();

  input.forEach((raw, i) => {
    const at = `todos[${i}]`;
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      errors.push(`${at}: must be an object`);
      return;
    }
    const t = raw as Record<string, unknown>;
    for (const f of ["id", "title", "description"]) {
      if (!isString(t[f])) errors.push(`${at}: "${f}" must be a non-empty string`);
    }
    if (!isStringArray(t.acceptanceCriteria)) errors.push(`${at}: "acceptanceCriteria" must be an array of strings`);
    if (!isStringArray(t.dependencies)) errors.push(`${at}: "dependencies" must be an array of strings`);
    if (!(TODO_STATUSES as readonly unknown[]).includes(t.status)) {
      errors.push(`${at}: "status" must be one of ${TODO_STATUSES.join(", ")}`);
    }
    if (isString(t.id)) {
      if (ids.has(t.id)) errors.push(`${at}: duplicate id "${t.id}"`);
      ids.add(t.id);
    }
  });

  input.forEach((raw, i) => {
    const deps = (raw as { dependencies?: unknown } | null)?.dependencies;
    if (!isStringArray(deps)) return;
    for (const d of deps) {
      if (!ids.has(d)) errors.push(`todos[${i}]: dependency "${d}" is not a known todo id`);
    }
  });

  return errors;
}

export function parseTodos(input: unknown): Todo[] {
  const errors = validateTodos(input);
  if (errors.length) throw new Error(`Invalid todos:\n${errors.join("\n")}`);
  return input as Todo[];
}
