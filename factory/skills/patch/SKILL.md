---
name: patch
description: Fix one open pull request - failing CI, merge conflicts and unresolved review comments - and push to the same branch
---

# Patch

Takes one open PR and fixes what is wrong with it. The input is a PR number. The output is new commits pushed to the PR's
branch and a short report of what was fixed.

## Steps

1. **Check out the PR branch.** Run `gh pr checkout <number>` and make sure the branch is up to date with its remote.
   Stop and report if the PR does not exist or is not open.
2. **List what is wrong.** Collect all three before fixing anything:
   - Failing CI: `gh pr checks <number>`, then `gh run view <run-id> --log-failed` for each failing run.
   - Merge conflicts: compare against the base branch (`git fetch`, then `git merge-base` / `git merge --no-commit`
     and abort the trial if it was only a check), or read `mergeable` from `gh pr view <number> --json mergeable`.
   - Unresolved review comments: `gh pr view <number> --comments` and the review threads on the PR.
   If nothing is wrong, stop and report; there is nothing to push.
3. **Fix in that order.** Conflicts first (merge the base branch in and resolve), then CI failures, then review
   comments. Fix the cause of each problem, stay inside what the PR is for, and make no unrelated changes.
4. **Verify.** Run the project's unit tests and typecheck (and lint if the project has it). They must pass. Do not
   weaken, skip or delete tests to get green; if a test is wrong, say why in the report.
5. **Commit and push.** Commit with a Conventional Commit message (for example `fix: resolve merge conflicts`,
   `fix: address review comments`, `fix: repair failing CI`), one commit per kind of fix, and push to the same branch
   with a plain `git push`. Report what was fixed and anything left unresolved.

## Rules

- Never force-push (no `--force`, `--force-with-lease` or `+ref`). If the push is rejected, pull and retry, or fail.
- Never merge the PR and never close it.
- No unrelated changes; stage specific files, never everything.
- Do not edit `factory/tasks.json`.
- Exit non-zero if nothing could be fixed or the push failed; the loop reads exit 0 as "patched and pushed".
- The attempt limit belongs to the loop; do not count or enforce attempts here.
- Edit files with the Edit and Write tools, never via `python3`, heredocs or `sed -i`.
- The session starts in the repo root, so `cd` is not needed.
- Prefer one command per Bash call; avoid chaining with `&&`, `;` or pipes unless every part is a read-only helper.
