---
name: dev-task
description: Implement one todo from factory/todos.json in a worktree and open a PR (illustrative name; rename freely)
---

# Dev Task

Illustrative skill name — other factories call this `feature-dev`, `implement`, etc. Rename freely.

Input: one todo `id` from `factory/todos.json`.

1. Load the todo. Stop if it is missing, not `pending`, or any dependency is not `done`.
2. Set its status to `in_progress`.
3. Create a worktree and branch from the latest main:
   `git worktree add ../<repo>-<branch-slug> origin/main -b <todo.branch>`. Work only there.
4. Implement against the description and acceptance criteria. Write tests first where practical.
5. Run the project's tests, typecheck and lint; fix failures.
6. Commit, push, and open a PR (`gh pr create`) whose body lists the acceptance criteria.
7. Set the todo's status to `pr_open` (`done` once merged). If you cannot finish, set `blocked`
   and say why.
