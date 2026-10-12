# factory

The sample software factory, grown lesson by lesson. Deliberately minimal.

**`factory/` is the demo; the lessons stay tool-neutral.** Bun and Claude Code are what this demo uses, not what you
need. Each lesson part goes concept first, then "in our demo we use...", then "yours can be anything".

## Skills

- `skills/plan/SKILL.md` — turns the conversation context (or a file the human points at) into entries in `factory/todos.json`; a human triggers it interactively, it is not part of the loop.
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

## Claude Code discovery

`.claude/skills` is a relative symlink to `../factory/skills`, so the `plan` and `dev-task` skills
load in a Claude Code session opened in this repo. On systems without symlink support (e.g. Windows
without developer mode), replace the link with a copy: `rm .claude/skills && cp -r factory/skills .claude/skills`.

## The loop

`bun factory/loop.ts` runs the todo loop: validate `todos.json`, pick the first `pending` todo whose
dependencies are all `done` (`pickNext`), run the coding agent headlessly on it, re-read the file, and
repeat until nothing is ready. One todo at a time. It stops (exit 1) on the first todo that does not end
`pr_open` or `done`; exit 0 means nothing was left ready.

This is one implementation of a six-line idea (`while todo = next(); do agent(todo); done`) and the agent
can be swapped. The loop is the demo, not the standard.

### Agent command is configuration

`FACTORY_AGENT_CMD` is a JSON array of args; `{skill}` and `{id}` are substituted in each arg.
`FACTORY_SKILL` (default `dev-task`) sets the skill name. Default:

```json
["claude","-p","/{skill} {id}","--allowedTools","Read,Edit,Write,Glob,Grep,Bash(git *),Bash(gh *),Bash(bun *)"]
```

Any headless agent works, e.g. `FACTORY_AGENT_CMD='["my-agent","--task","{id}"]'`.

### Default agent flags: sources

Verified against Claude Code's first-party headless docs, https://code.claude.com/docs/en/headless,
as of 2026-10-11:

- `-p` / `--print` runs non-interactively; `/skill-name` in the prompt string is expanded before running.
- `--allowedTools` auto-approves the listed tools using permission rule syntax; `Bash(git diff *)`
  prefix-matches (the space before `*` matters). The allow-list is passed on the CLI, so no
  `.claude/**` settings are edited.
- Exit code is 0 on success and non-zero on failure. The loop does not rely on it: it re-reads
  `todos.json` and judges by the todo's status.
