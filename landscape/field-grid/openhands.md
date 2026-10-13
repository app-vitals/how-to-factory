# OpenHands: lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its
URL and the date it was fetched. "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`. Names are the product's own, not canonical.

## PLAN

Surface: OpenHands Cloud Slack conversation.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | not documented | n/a | 2026-10-13 |
| step | not documented (the Slack page describes no plan or preview step) | n/a | 2026-10-13 |
| output | not documented | n/a | 2026-10-13 |
| who drives | not documented | n/a | 2026-10-13 |

## DEV-TASK

Surface: OpenHands Cloud Slack conversation.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A request written in a Slack message or thread that mentions @openhands, optionally naming a repository; thread replies that mention it continue the same conversation | https://docs.openhands.dev/openhands/usage/cloud/slack-installation.md | 2026-10-13 |
| step | not documented (the page does not say what the agent runs or checks before replying) | n/a | 2026-10-13 |
| output | An agent reply in the thread; whether a PR or diff comes out: not documented | https://docs.openhands.dev/openhands/usage/cloud/slack-installation.md | 2026-10-13 |
| who drives | Human (a person starts and follows up each conversation) | https://docs.openhands.dev/openhands/usage/cloud/slack-installation.md | 2026-10-13 |

## LOOP

Surface: OpenHands Automations.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A natural-language prompt plus a schedule and timezone (for example daily, weekly or every few hours) | https://docs.openhands.dev/openhands/usage/automations/overview | 2026-10-13 |
| step | At each scheduled time the agent runs the prompt using the configured model, secrets, integrations and git credentials; the QA-changes page also lists event-driven automations (a PR opened, ready for review, or labeled) | https://docs.openhands.dev/openhands/usage/automations/overview ; https://docs.openhands.dev/openhands/usage/use-cases/qa-changes | 2026-10-13 |
| output | Whatever the prompt asks for (a Slack post, a saved report, a GitHub issue); the conversation is saved to review later. The page says there is no automatic chaining into a following task | https://docs.openhands.dev/openhands/usage/automations/overview | 2026-10-13 |
| who drives | Automated for the start; each run is a separate execution | https://docs.openhands.dev/openhands/usage/automations/overview | 2026-10-13 |

## Not documented

- PLAN: everything; none of the pages fetched describes a planning step or plan artifact.
- DEV-TASK: what the agent verifies before replying and what it delivers (PR, diff or branch) from a Slack conversation.
- LOOP: moving to a next task on its own (the automations page says runs are not chained).
