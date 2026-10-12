---
name: plan
description: Turn the conversation context into todos in factory/todos.json (illustrative name; rename freely)
---

# Plan

Illustrative skill name — other factories call this `feature-dev`, `breakdown`, etc. Rename freely.

Run by a human, interactively; it is not part of the loop. The input is the conversation context (what the human
and agent just explored together), or a file if the human points at one. Produce todo entries in `factory/todos.json`.

1. Read the conversation context (or the file the human named) and skim the repo enough to know where the work lands.
2. Split the work into small todos, each deliverable as one PR.
3. For each todo, write an entry with these fields: `id` (unique), `title`, `description`,
   `acceptanceCriteria` (checkable statements), `status` (`pending`), `dependencies` (ids of
   todos that must finish first), `branch` (e.g. `feat/<id-lowercase>`). Schema: `factory/README.md`.
4. Append to the existing array if `factory/todos.json` exists; never change existing ids or statuses.
5. Validate: `validateTodos` from `factory/todos.schema.ts` must return no errors.
6. Summarize the todos created and their dependency order.
