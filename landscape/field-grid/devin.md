# Devin: lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its
URL and the date it was fetched. "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`. Names are the product's own, not canonical.

## PLAN

Surface: Linear integration with the `!plan` playbook label (and the default playbook when no label is set).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | The content of a Linear ticket; a session starts when the ticket is assigned to Devin, labeled with a playbook, or Devin is @mentioned in a comment | https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| step | With no label, the page says Devin applies a default playbook, typically `!plan`. Whether it splits work into tasks with acceptance criteria or dependencies: not documented | https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| output | Devin's todo list syncs to Linear's plan view. What a finished plan contains beyond that: not documented | https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| who drives | not documented | n/a | 2026-10-13 |

## DEV-TASK

Surface: a Devin session working from written instructions (the "instructing Devin effectively" guidance).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A task or sub-task written by a person: repo scope and purpose, ordered steps, success criteria, and pointers to existing code, docs or designs; the guide advises small tasks with clear checkpoints | https://docs.devin.ai/essential-guidelines/instructing-devin-effectively | 2026-10-13 |
| step | The guide tells the person to ask Devin to test its own work before opening a PR: run the test command, run the app, drive it in a browser, take screenshots, and watch that CI does not fail | https://docs.devin.ai/essential-guidelines/instructing-devin-effectively | 2026-10-13 |
| output | A pull request or a branch; with the Linear integration the PR link is attached to the session and activity (commands, edits, progress) is posted back to the ticket | https://docs.devin.ai/essential-guidelines/instructing-devin-effectively ; https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| who drives | not documented (the guide describes a person writing the instructions; it does not label the step) | n/a | 2026-10-13 |

## LOOP

Surface: Devin Automations (as described in the 2026 release notes).

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | An automation trigger: the notes list schedules (recurring or single-run), Slack channels, Linear, Jira status changes and GitLab events (issues, notes, pushes, pipelines) | https://docs.devin.ai/release-notes/2026 | 2026-10-13 |
| step | After a trigger fires, an automation can run a validation script before the agent starts, and a limit and queue depth for concurrent runs can be set per automation. A Linear-triggered automation session can start and manage child sessions | https://docs.devin.ai/release-notes/2026 | 2026-10-13 |
| output | A started Devin session per trigger; automations can ask the person structured questions in a session | https://docs.devin.ai/release-notes/2026 | 2026-10-13 |
| who drives | Automated for the start (the trigger starts the run). Whether it moves on to the next task by itself beyond child sessions and queued runs: not documented | https://docs.devin.ai/release-notes/2026 | 2026-10-13 |

## Not documented

- PLAN: whether Devin splits a ticket into tasks with acceptance criteria and dependencies; where a plan lives besides the synced todo list; who drives.
- DEV-TASK: who drives the step.
- LOOP: whether a run continues to the next task unprompted; detail beyond the release-note one-liners (the dedicated automations page was not fetched for this grid).
