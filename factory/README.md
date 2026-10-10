# factory

The sample software factory, grown lesson by lesson. Deliberately minimal.

## Skills

- `skills/plan/SKILL.md` — turns a short spec into entries in `factory/todos.json`.
- `skills/dev-task/SKILL.md` — takes one todo id, works it in a git worktree, opens a PR, marks the todo.

> **The names are illustrative.** `plan` and `dev-task` are sample names only. Other factories
> call these skills different things (`feature-dev`, `build`, `implement`, ...). Nothing in this
> repo hard-codes them as required; a harness takes the skill name as configuration.

The skills are plain markdown with no dependency on any particular harness or workflow tool.

## `todos.json` schema

A JSON array of todos:

| Field | Type | Notes |
|---|---|---|
| `id` | string | unique, e.g. `T-1` |
| `title` | string | short summary |
| `description` | string | what to build and why |
| `acceptanceCriteria` | string[] | checkable statements |
| `status` | `pending` \| `in_progress` \| `pr_open` \| `done` \| `blocked` | |
| `dependencies` | string[] | ids of other todos that must be `done` first; each must exist |
| `branch` | string | git branch for the work, e.g. `feat/t-1` |

`todos.schema.ts` exports `validateTodos(input): string[]` (empty = valid) and `parseTodos(input): Todo[]`
(throws). Tests: `bun test factory`.
