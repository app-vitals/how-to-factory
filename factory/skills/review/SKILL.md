---
name: review
description: Review one open pull request and post a single review - approve when clean, request changes with specific findings otherwise
---

# Review

Reviews one open PR and posts one review on it. The input is a PR number. The output is a posted review (approve or
request changes) and its URL.

## Steps

1. **Load the PR.** Read the PR and its diff with `gh pr view <pr>` and `gh pr diff <pr>`. Stop and report if the PR
   does not exist or is not open.
2. **Find the task.** If the PR's head branch is `<type>/<task-id>` and that id exists in `factory/tasks.json`, load the
   task. If there is no matching task, skip the acceptance check and review the diff on its own merits.
3. **Check the criteria.** For a matching task, walk each `acceptanceCriteria` item against the diff and name the code
   or test that meets it. An unmet criterion is a finding.
4. **Look for problems.** Read the diff for bugs, missing tests for new behavior, and changes outside the task's
   `description` or that it calls out of scope. Read surrounding code when the diff alone is not enough. Report only
   problems you can point to, with the file and line.
5. **Post one review.** Use `gh pr review <pr>` exactly once. Approve (`--approve`) when there are no findings.
   Otherwise request changes (`--request-changes`) with a body that lists each finding as a specific, actionable item
   with file and line. Report the review outcome.

## Rules

- Never edit code, never push, never merge.
- Post exactly one review per run; do not add separate comments.
- Do not edit `factory/tasks.json`; `status` is moved by the loop.
- Exit non-zero if no review was posted; the loop reads exit 0 as "reviewed".
- Out of scope: multi-angle or parallel review.
- The session starts in the repo root, so `cd` is not needed.
- Prefer one command per Bash call; avoid chaining with `&&`, `;` or pipes unless every part is a read-only helper.
