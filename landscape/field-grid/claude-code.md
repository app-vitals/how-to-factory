# Claude Code: lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its
URL and the date it was fetched. "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`. Names are the product's own, not canonical.

## PLAN

Surface A: interactive plan mode (Shift+Tab, or `claude --permission-mode plan`).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A request typed in the session; the guide recommends exploring first, then asking for a plan. For larger features it suggests having Claude interview the person and write a spec | https://code.claude.com/docs/en/best-practices | 2026-10-13 |
| step | Claude reads files and proposes a plan without editing until the person approves. Splitting into tasks with acceptance criteria and dependencies: not documented as a built-in step (the guide only says good specs name files, scope limits and an end-to-end check) | https://code.claude.com/docs/en/common-workflows ; https://code.claude.com/docs/en/best-practices | 2026-10-13 |
| output | A plan the person can open and edit in their editor; for the interview route, a SPEC.md file | https://code.claude.com/docs/en/best-practices | 2026-10-13 |
| who drives | Human approves | https://code.claude.com/docs/en/common-workflows | 2026-10-13 |

Surface B (headless, scheduled): planning in those surfaces is not documented on the fetched pages.

## DEV-TASK

Surface A: interactive session.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt from the person; the guide advises giving a check Claude can run (tests, build, screenshot) and a clear definition of done | https://code.claude.com/docs/en/best-practices | 2026-10-13 |
| step | Claude does the work, runs the check, reads the result and iterates until it passes; the guide offers stronger gates (a /goal condition, a Stop hook, a review subagent) | https://code.claude.com/docs/en/best-practices | 2026-10-13 |
| output | Commits and a pull request on request ("commit with a descriptive message and open a PR") | https://code.claude.com/docs/en/best-practices ; https://code.claude.com/docs/en/common-workflows | 2026-10-13 |
| who drives | Human (the person prompts, watches and corrects) | https://code.claude.com/docs/en/best-practices | 2026-10-13 |

Surface B: headless `claude -p` (input: prompt text or piped data; output: text, JSON or streaming JSON; exit code 0 on success). Fan-out: a script loops `claude -p` over a task list. Who drives: Automated once the script runs it. Source: https://code.claude.com/docs/en/headless ; https://code.claude.com/docs/en/best-practices (as of 2026-10-13). What a headless run verifies by default: not documented beyond the instruction in the prompt.

Surface C: Slack: a bug report with an @Claude mention returns a pull request. Source: https://code.claude.com/docs/en/overview (as of 2026-10-13). Verification and who drives: not documented on that page.

## LOOP

Surface A: routines (cloud, saved prompt + repositories + connectors).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A trigger: a schedule (recurring or one-off), an HTTP POST to the routine's endpoint, or a GitHub event (pull request, release) | https://code.claude.com/docs/en/routines | 2026-10-13 |
| step | Each trigger starts a new session that carries out the saved prompt without stopping for approval; the prompt must say what success looks like. Sessions are not reused across events and nothing says a run continues to a next task by itself | https://code.claude.com/docs/en/routines | 2026-10-13 |
| output | A session with its changes, on a `claude/`-prefixed branch; the person can open it and create a PR | https://code.claude.com/docs/en/routines | 2026-10-13 |
| who drives | Automated | https://code.claude.com/docs/en/routines | 2026-10-13 |

Surface B: `/loop` repeats a prompt inside an open CLI session; desktop scheduled tasks and GitHub Actions are also listed as scheduling options. Source: https://code.claude.com/docs/en/common-workflows (as of 2026-10-13). Who drives for these: not documented on that page.

## Not documented

- PLAN: task splitting with acceptance criteria and dependencies as a product feature; planning in headless or scheduled runs.
- DEV-TASK: default self-checks of a headless run; Slack surface verification.
- LOOP: a routine picking up a next task on its own; who drives `/loop`, desktop scheduled tasks and GitHub Actions.
