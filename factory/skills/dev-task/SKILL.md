---
name: dev-task
description: Take one task from factory/tasks.json and deliver it as a pull request - branch, red tests, code, PR
---

# Dev task

Takes one task and produces one pull request, built test-first: red, green, refactor. The input is a task `id` from
`factory/tasks.json` (or the task object itself). The output is an open PR and its URL.

## Steps

1. **Load the task.** Read the task from `factory/tasks.json` by `id`. Stop and report if it does not exist. The
   loop only starts a task once every dependency has reached `pr` (PR open, not necessarily merged).
2. **Create a branch.** Start from an up-to-date base branch (`main`). If the task has dependencies, their code lives on
   their unmerged branches (`<type>/<dependency-id>`): branch from the dependency's branch instead, and with several
   dependencies merge their branches in first. Create `<type>/<task-id>`, where `type` is the
   Conventional Commit type that fits the task (`feat`, `fix`, `refactor`, `docs`, `chore`). Never work on the base
   branch directly.
3. **Red: write the tests first.** Read the repo enough to follow its existing conventions. Before writing any
   implementation, write tests for the `acceptanceCriteria`, one or more per criterion where a test can express it.
   Run them and confirm each fails for the right reason: the behavior is missing. These do not count as red: a syntax
   error, an import or type error, a misconfigured test, or a test that passes immediately (it proves nothing; tighten
   it or drop it). Record the observed failure for each test. Commit the tests alone, staging only the test files,
   with the message `test: <task title> (red)`, and note the commit SHA.
4. **Green: minimum code.** Implement the task's `description`, only as much as needed to make the red tests pass.
   Stay inside its scope: anything the description calls out of scope stays out. Do not edit, weaken or skip the red
   tests. If a red test is wrong, fix it in its own commit (`test: fix <what> in <task title>`) and give the reason in
   the PR; never change it inside an implementation commit.
5. **Refactor.** Clean up the new code and tests (naming, duplication, structure) with the suite still green after
   each change. Add no behavior in this step.
6. **Discover CI's checks.** Read the project's CI config (`.github/workflows/*`) and list every command CI runs on a
   pull request. Take the list from the config as it is now; do not rely on a remembered or hardcoded list. Skip jobs
   that do not run on PRs.
7. **Verify locally.** Run every discovered command locally, one per Bash call, and record each command's exit status
   and a short output excerpt. If a check fails because of your change, fix the cause and rerun all the checks; never
   skip or weaken a check (or the test or config it runs) to get green. If a check already fails on the base branch,
   confirm it there and record it as such. Then walk each `acceptanceCriteria` item and confirm it is met, naming the
   covering test or check. If a criterion cannot be met, stop and report instead of opening the PR.
8. **Create the PR.** Commit the implementation with a Conventional Commit message (`<type>: <task title>`), push the
   branch, and open a PR against the base branch. Title it the same way. The body is a short summary plus the
   acceptance criteria as a checklist. For each criterion give the covering test name, and give once the red commit
   SHA and the observed failure. A criterion that cannot be automated (docs or config tasks) is not skipped
   silently: say it is untested and name the manual check that shows it is met. Add a **Local verification** section:
   a table with one row per CI check, with columns command, result (`pass`, `fail` or `not run`) and note. Under the
   table, call out plainly every check that failed, was not run, or already fails on the base branch, with the reason.
   Never mark a check `pass` unless you ran it and it exited 0. If a check fails and cannot be fixed, still open the
   PR and mark it failing locally at the top of the body. Report the PR URL.

## Rules

- One task, one branch, one PR.
- Tests are committed and seen failing before the code that satisfies them exists.
- Stage specific files, never everything; do not commit unrelated changes.
- Do not edit `factory/tasks.json`; tasks are added by the plan skill and `status` is moved by the loop.
- An unfixable check failure still opens the PR, marked failing locally; an unmet acceptance criterion stops the run
  with no PR.
- Exit non-zero if the PR was not opened; the loop reads exit 0 as "PR open".
- Edit files with the Edit and Write tools, never via `python3`, heredocs or `sed -i`.
- The session starts in the repo root, so `cd` is not needed.
- Prefer one command per Bash call; avoid chaining with `&&`, `;` or pipes unless every part is a read-only helper.
