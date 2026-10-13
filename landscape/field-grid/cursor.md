# Cursor: lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its
URL and the date it was fetched. "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`. Names are the product's own, not canonical.

## PLAN

Surface: Plan Mode in the interactive agent (Shift+Tab or the mode picker). Cloud agents started from Slack are noted under DEV-TASK.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A request typed by the person in the agent; the agent then asks clarifying questions and researches the codebase | https://cursor.com/docs/agent/planning | 2026-10-13 |
| step | Clarify, research, write an implementation plan, let the person review and edit it, then build. Whether the plan is split into tasks with acceptance criteria or dependencies: not documented | https://cursor.com/docs/agent/planning | 2026-10-13 |
| output | An editable implementation plan, saved by default in the person's home directory; it can be moved into the workspace for sharing | https://cursor.com/docs/agent/planning | 2026-10-13 |
| who drives | Human approves (the person reviews the plan and chooses to start the build) | https://cursor.com/docs/agent/planning | 2026-10-13 |

## DEV-TASK

Surface A: cloud agents, started from Cursor (desktop, web, iOS), Slack, GitHub or Bitbucket PR comments, Linear, or the API.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt describing the work, sent from one of those entry points | https://cursor.com/docs/background-agent | 2026-10-13 |
| step | The agent builds, tests and interacts with the changed software, and the docs say good environments let it test and verify its own work. Which specific checks run: not documented | https://cursor.com/docs/background-agent | 2026-10-13 |
| output | A PR on a separate branch, with screenshots, videos or logs of the change | https://cursor.com/docs/background-agent | 2026-10-13 |
| who drives | Automated once started (the person can take over, hand back, or send follow-ups) | https://cursor.com/docs/background-agent | 2026-10-13 |

Surface B: cloud agent started by @cursor in Slack. Input is the Slack message plus the thread; the agent posts a short implementation plan in the thread before making changes, posts status updates, and on completion notifies with a link to the PR. Source: https://cursor.com/docs/integrations/slack (as of 2026-10-13). Who drives: not documented beyond the person starting it.

Surface C: interactive agent in the editor: not fetched for this grid, so no cells.

## LOOP

Surface: Automations (cloud agents run in the background).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A trigger: a recurring schedule (preset or cron), a source-control event (PR opened, pushed, merged, commented), a Slack event, a webhook POST, or a Linear, Sentry or PagerDuty event; plus a natural-language prompt | https://cursor.com/docs/cloud-agent/automations | 2026-10-13 |
| step | The triggered agent follows the prompt; it can review code, comment, open a PR, message Slack. Each automation runs independently and does not chain to a next task; agents can keep notes across runs | https://cursor.com/docs/cloud-agent/automations | 2026-10-13 |
| output | PR comments, new PRs, Slack messages, depending on the prompt | https://cursor.com/docs/cloud-agent/automations | 2026-10-13 |
| who drives | Automated (a trigger starts it; outputs such as PRs are for a person to act on) | https://cursor.com/docs/cloud-agent/automations | 2026-10-13 |

## Not documented

- PLAN: whether Plan Mode splits work into tasks with acceptance criteria and dependencies.
- DEV-TASK: the exact checks a cloud agent runs before delivering; who drives the Slack surface beyond the initial mention.
- LOOP: moving on to a next task by itself (the page says automations do not chain).
