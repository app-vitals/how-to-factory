---
name: plan
description: Design a feature with the engineer, break it into tasks, and append the approved tasks to factory/tasks.json
---

# Plan

Run by a human, interactively; it is not part of the loop. The input is a brief description of what the engineer wants
to build. The output is a reviewed set of tasks appended to `factory/tasks.json`.

## Task schema

Each task is an object with:

- `id`: unique kebab-case slug (e.g. `add-login-route`). Needed so other tasks can depend on it.
- `title`: short, imperative.
- `description`: what to build, why, and what is out of scope.
- `acceptanceCriteria`: array of statements written as checks that can be run or inspected, not as intentions.
- `dependencies`: array of task `id`s that must finish first (`[]` if none).
- `status`: always `"pending"` when you write it. The loop owns it from there (`pending` -> `in_progress` -> `pr`).

Each task must be small enough to deliver as one PR.

## Steps

1. **Understand.** Read the engineer's brief. Skim the repo enough to know where the work lands and what already
   exists. Ask clarifying questions one at a time, only for things you cannot resolve from the brief or the code.
2. **Design.** Propose the approach in a few short paragraphs: the shape of the solution, key decisions and the
   alternatives you rejected, and what is out of scope. Iterate with the engineer until they agree on the design.
3. **Break down.** Split the design into tasks following the schema. Order them so dependencies point backwards,
   and avoid dependencies that are not real (independent tasks should be able to run in parallel).
4. **Present.** Show the engineer the full task list (titles, descriptions, criteria, dependencies) and the
   dependency order. Revise until they approve. **Do not write to `tasks.json` before explicit approval.**
5. **Append.** After approval, add the tasks to the array in `factory/tasks.json` (create it as `[]` first if it
   does not exist). Never modify or remove existing tasks. If an id collides with an existing one, rename the new task.
   New tasks may depend on existing ids.
6. **Validate.** Re-read the file and confirm: it is valid JSON, ids are unique, every dependency id exists, and
   there are no dependency cycles. Fix anything that fails before reporting.
7. **Summarize.** List the tasks added and their dependency order.
