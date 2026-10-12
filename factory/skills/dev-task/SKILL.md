---
name: dev-task
description: Implement one todo from factory/todos.json in a worktree and open a PR (illustrative name; rename freely)
---

# Dev Task

Illustrative skill name — other factories call this `feature-dev`, `implement`, etc. Rename freely.

Input: one todo `id` from `factory/todos.json`.

1. **Claim.** Load the todo. Stop if it is missing, not `pending`, or any dependency is not `done`. Set its
   status to `in_progress`, then isolate the work in a worktree on a branch derived from the id as
   `feat/<id-lowercase>`: `git worktree add ../<repo>-<branch-slug> origin/main -b feat/<id-lowercase>`.
   Work only there.
2. **Code.** Implement against the description and acceptance criteria. Write tests first where practical.
3. **Verify.** Run the todo's acceptance checks plus the project's tests, typecheck and lint. Fix until they pass.
4. **Deliver.** Commit, push, and open a PR (`gh pr create`) whose body lists the acceptance criteria.
5. **Record.** Set status to `pr_open` only after verification passes (`done` once merged). If you cannot
   finish, set `blocked` and say why.
