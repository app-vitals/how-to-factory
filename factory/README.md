# factory

The sample software factory, grown lesson by lesson. It starts empty; each lesson builds its component here.

**`factory/` is the demo; the lessons stay tool-neutral.** Bun and Claude Code are what this demo uses, not what you
need.

## PR routing

Each iteration the loop lists open PRs and picks the single oldest candidate across ready tasks and PRs (by
`createdAt`; tasks without one go last). A task runs `AGENT_CMD` (`{id}`); a PR that needs work runs `REVIEW_CMD` or
`PATCH_CMD` (`{pr}` is the PR number). PRs on a task's own `<type>/<task-id>` branch are left to that task.

- A failing task returns to `pending` and stops the loop. A failing review or patch is logged and the loop continues.
- Every review or patch run counts as an attempt, pass or fail. After `MAX_PR_ATTEMPTS` (3) the PR is stuck: the loop
  labels it `needs-human`, comments once, and never runs it again. Removing the label resets the count.
- If listing PRs fails, the loop logs it and carries on with tasks only.
- The loop sleeps `LOOP_IDLE_MS` only when there is nothing to do. Attempt counts live in `pr-attempts.json` (gitignored).
- Merging is not part of the loop.

## Audit log

Every run the loop makes is appended as one JSON line to `factory/audit-log.jsonl` (gitignored): a `dev-task`, `review`
or `patch` entry with the target, outcome (`success`, `failure` or `skip`), exit code and duration. `failure` and `skip`
entries carry a `reason` (a non-zero exit records `exited with code N`). The log holds only what the agent did when it
ran: a runner that throws, attempt limits, flag failures and idle polls are logged to the console, not recorded. A
failing task is recorded before the loop stops, and a failed audit write is logged without stopping the loop. Without
an `audit` option the loop records nothing.

## Queue view

`bun run queue` starts a separate, read-only process that shows what the loop will do next: `GET /` is an HTML page
(running tasks, then the ranked queue) and `GET /api/queue` is the same data as JSON. Anything else is a 404. It binds
to `127.0.0.1` only, on `QUEUE_PORT` (default `4040`). It reads tasks, open PRs and attempt counts, and never writes or
calls `attempts.sync`. The PR listing is cached for about 10 seconds; if `gh` fails, the page still returns 200 with
tasks only and an error banner (and an `error` field in the JSON).

## Lessons

Lesson 1 builds the `plan` and `dev-task` skills (`skills/`) and the loop (`loop.ts`). A finished copy is tagged
`factory-lesson-1-reference`.
