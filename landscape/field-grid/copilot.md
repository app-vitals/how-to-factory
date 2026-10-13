# GitHub Copilot cloud agent: lesson 1 field grid

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its
URL and the date it was fetched. "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`. Names are the product's own, not canonical.

## PLAN

Surface: Copilot cloud agent, started from the agents panel, a conversation, or an issue or pull request on GitHub.com.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt in the panel or chat, or an assigned issue or PR; security-campaign code scanning alerts can also be assigned | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | 2026-10-13 |
| step | The page says the agent can research a repository, plan changes and implement them. A separate plan artifact, or a split into tasks with acceptance criteria and dependencies: not documented | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | 2026-10-13 |
| output | not documented as a distinct plan output | n/a | 2026-10-13 |
| who drives | not documented for planning | n/a | 2026-10-13 |

## DEV-TASK

Surface: an issue assigned to Copilot, or a prompt in the agents panel / chat.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | The guidance says a good task has a clear problem description, acceptance criteria (for example whether unit tests are expected) and pointers to the files to change | https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-13 |
| step | The agent can edit files and run tests and linters; the guidance says it builds, tests and runs linters to validate its changes | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent ; https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-13 |
| output | A branch or a pull request; the person can review and request changes before a PR is created, or ask for a PR in the first prompt. Feedback via @copilot comments adds commits and updates the PR title and body | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent ; https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-13 |
| who drives | Human (the page describes the person chatting, steering and requesting refinements while it runs) | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | 2026-10-13 |

Second surface, chat in the agents panel versus an assigned issue: the pages above treat both as ways to start the same agent; per-surface differences beyond that: not documented.

## LOOP

Surface: automations for the cloud agent.

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A task defined once, with a schedule or a repository event as the trigger | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | 2026-10-13 |
| step | The agent runs the saved task when the schedule or event fires. Moving to a next task by itself: not documented | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | 2026-10-13 |
| output | not documented on this page | n/a | 2026-10-13 |
| who drives | Automated for the start (schedule or event); the dedicated automations page was not fetched | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | 2026-10-13 |

## Not documented

- PLAN: a standalone plan output, task splitting, acceptance criteria and dependencies produced by the agent, who drives.
- DEV-TASK: nothing further found on the fetched pages. The 'best practices' URL given in the task was not used; the live guidance page found was the get-the-best-results tutorial.
- LOOP: outputs of an automation run, and continuing to a next task unprompted; detail beyond one sentence (dedicated automations page not fetched).
