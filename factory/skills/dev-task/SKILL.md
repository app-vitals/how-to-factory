---
name: dev-task
description: Take one task from factory/tasks.json and deliver it as a pull request - branch, code, unit tests, PR
---

# Dev task

Takes one task and produces one pull request. The input is a task `id` from `factory/tasks.json` (or the task object
itself). The output is an open PR and its URL.

## Steps

1. **Load the task.** Read the task from `factory/tasks.json` by `id`. Stop and report if it does not exist. The
   loop only starts a task once every dependency has reached `pr` (PR open, not necessarily merged).
2. **Create a branch.** Start from an up-to-date base branch (`main`). If the task has dependencies, their code lives on
   their unmerged branches (`<type>/<dependency-id>`): branch from the dependency's branch instead, and with several
   dependencies merge their branches in first. Create `<type>/<task-id>`, where `type` is the
   Conventional Commit type that fits the task (`feat`, `fix`, `refactor`, `docs`, `chore`). Never work on the base
   branch directly.
3. **Write the code.** Read the repo enough to follow its existing conventions, then implement the task's
   `description`. Stay inside its scope: anything the description calls out of scope stays out. Write unit tests
   alongside the code, one or more per acceptance criterion where a test can express it.
4. **Verify with unit tests.** Run the project's unit test suite. It must pass, along with typecheck and lint if
   the project has them. If something fails, fix the cause and rerun; do not weaken or skip tests to get green.
   Then walk each `acceptanceCriteria` item and confirm it is met, naming the test or check that shows it. If a
   criterion cannot be met, stop and report instead of opening the PR.
5. **Create the PR.** Commit with a Conventional Commit message (`<type>: <task title>`), push the branch, and open a
   PR against the base branch. Title it the same way. The body is a short summary plus the acceptance criteria as a
   checklist, each marked with how it was verified. Report the PR URL.

## Rules

- One task, one branch, one PR.
- Stage specific files, never everything; do not commit unrelated changes.
- Do not edit `factory/tasks.json`; tasks are added by the plan skill and `status` is moved by the loop.
- Exit non-zero if the PR was not opened; the loop reads exit 0 as "PR open".
- Edit files with the Edit and Write tools, never via `python3`, heredocs or `sed -i`.
- The session starts in the repo root, so `cd` is not needed.
- Prefer one command per Bash call; avoid chaining with `&&`, `;` or pipes unless every part is a read-only helper.
