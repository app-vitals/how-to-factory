---
name: plan
description: Turn the conversation context into todos in factory/todos.json (illustrative name; rename freely)
---

# Plan

Illustrative skill name — other factories call this `feature-dev`, `breakdown`, etc. Rename freely.

Run by a human, interactively; it is not part of the loop. The input is the conversation context (what the human
and agent just explored together), or a file if the human points at one. Produce task entries in `factory/todos.json`.

The output is tasks. Each task has:

- `id` (unique) and `title`.
- `description`: what to build, why, and what is out of scope.
- `acceptanceCriteria`: statements written as checks the agent can run or inspect, not as intentions.
- `dependencies`: ids of tasks that must finish first.

Each task must be small enough to deliver as one PR. Write `status` as `pending`; it is bookkeeping the
factory updates as the task moves, not a planning decision. Do not set a branch; the dev-task skill
derives it. Schema: `factory/README.md`.

1. Read the conversation context (or the file the human named) and skim the repo enough to know where the work lands.
2. Split the work into small tasks, each deliverable as one PR.
3. Write each task's fields as above.
4. Append to the existing array if `factory/todos.json` exists; never change existing ids or statuses.
5. Validate: `validateTodos` from `factory/todos.schema.ts` must return no errors.
6. Summarize the tasks created and their dependency order.
