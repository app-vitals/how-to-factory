# OpenHands: lesson 1 field grid (redo)

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its URL and the
date I last re-fetched and verified it (2026-10-23). "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`, followed by the index pages checked. Names are the product's own, not canonical. Several
surfaces per grid are used where one surface does not cover the concept; each is named in its table.

Method: started from the docs index (https://docs.openhands.dev/llms.txt, re-fetched 2026-10-23), listed the pages on use cases,
Agent Canvas automations, automations, issue workflows and the SDK conversation guides, and read the pages under "Pages read"
in full. This replaces an earlier, shallower draft of this file, which recorded the whole PLAN column as `not documented`
from the Slack page alone.

Index pages checked for any `not documented` below: Software Factory, Issue to Pull Request Automation, Issue Triage and the
ready-for-dev Gate, Agent-Driven Daily Workflow, Automated QA Testing, Automated Code Review, Automations Overview, Creating
Automations, Event-Based Automations, Managing Automations (both the Cloud and the Agent Canvas page), Agent Canvas Overview,
GitHub Repository Monitor, Goal Completion Loop, Critic (SDK and Agent Canvas), Iterative Refinement, and the Slack Integration
(URLs under "Pages read").

## PLAN

### Surface 1: Software Factory, triage automation (Agent Canvas)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A GitHub issue in a repository the automation is pointed at. The setup page says the person supplies issues and acceptance criteria. The triage automation runs under its own agent profile and a token limited to issues read/write and contents read | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| step | A triage agent prioritizes issues, checks their dependencies and establishes acceptance criteria, and only then applies the `ready-for-dev` label. The page gives these three actions in one sentence and does not show the triage prompt, so how acceptance criteria are written (drafted by the agent, or checked against what the person wrote) is not documented (checked: Software Factory, Issue to Pull Request Automation, Managing Automations in Agent Canvas) | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| output | The issue carrying the `ready-for-dev` label, which is the trigger label the developer automation watches. A separate task list or plan file: not documented (checked: Software Factory, Issue to Pull Request Automation) | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| who drives | Automated for the triage step: the page has you create it as an automation that checks every 5 minutes, and a "Run now" button starts it immediately. Human for writing the issue | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |

### Surface 2: ready-for-dev gate in the OpenHands repositories (their own issue workflow, not a product feature)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | An issue filed through a web form or by CLI/API. A bot adds topic and priority labels; the type label comes from the form or from the bot | https://docs.openhands.dev/overview/issue-lifecycle.md | 2026-10-23 |
| step | A readiness workflow reads the issue body by its `###` headings and checks the sections for the issue type. Enhancements need a filled Desired Behavior and at least one checklist item under Acceptance Criteria. Bugs need runnable reproduction evidence plus an acceptance checklist, with different evidence rules in the monorepo and the SDK repo. When the checks pass the workflow adds `ready-for-dev` within about a minute | https://docs.openhands.dev/overview/issue-lifecycle.md | 2026-10-23 |
| output | The `ready-for-dev` label on the issue. A PR description check (monorepo only) later requires the PR to link an issue that carries that label | https://docs.openhands.dev/overview/issue-lifecycle.md | 2026-10-23 |
| who drives | Automated for labeling and the readiness check; Human when the bot declines to type an issue and a triager has to. The page documents how OpenHands runs its own repositories, so it is an example of a gate rather than a setup step for users | https://docs.openhands.dev/overview/issue-lifecycle.md | 2026-10-23 |

### Surface 3: Agent Canvas daily-workflow conversation (a person plans their own day)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt the person sends in an Agent Canvas conversation, with GitHub (and optionally Slack, Linear or Jira) connected as MCP servers: pull requests, assigned issues, notifications, failing CI, Slack mentions | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| step | The agent gathers the items, groups them by urgency with a link and a reason for each, and ends with the single highest-priority task. For a task the person picks, the guide has them ask for investigation and a proposed plan with a rule that nothing is edited, pushed or posted until approved | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| output | A prioritized report in the conversation (immediate action, PRs waiting, review requests, assigned issues, Slack, notifications) with a recommended first task. Acceptance criteria or dependencies in it: not documented (checked: Daily Workflow) | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| who drives | Human approves: the person sends the prompt and sets the rule that the agent must ask before acting | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |

## DEV-TASK

### Surface 1: Issue to Pull Request automation (Agent Canvas prebuilt automation, used as the developer step of the Software Factory)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A GitHub, GitLab, Jira or Linear issue carrying the trigger label (default `openhands`; `ready-for-dev` in the Software Factory walkthrough) or an implementation-ready state. The agent reads the title, description, acceptance criteria and linked dependencies | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md ; https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| step | A fresh agent conversation per issue clones the repository, creates a branch from the configured prefix and issue number, implements the change, runs the project's test suite, commits and pushes, opens the PR and posts the PR link on the issue. The page lists "runs tests" as a step but does not say what happens when the tests fail, or that the agent retries. Checked again on 2026-10-13 in the gap-closing pass: TODO Management, Dependency Upgrades, Vulnerability Remediation, Headless Mode, Automated Code Review and GitHub Repository Monitor; none describes the Issue to PR run's failure path | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md | 2026-10-23 |
| output | A pull request titled `[#42] <issue title>` with a summary and `Closes #42` in the body, as a draft by default or ready for review by setting; a progress comment and the PR link on the issue | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md | 2026-10-23 |
| who drives | Automated: the automation polls on a schedule (every 15 minutes by default; 5 minutes in the Software Factory walkthrough) and a person only applies the label. To retry an issue, a person removes and re-applies the label | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md ; https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |

### Surface 2: SDK conversation driven to a verifiable objective (`run_goal`, `/goal`)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A written objective whose completion can be shown by evidence, for example "create the module and a test; complete only when `python -m pytest -q` passes" | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |
| step | The agent works until it calls its finish action, then a second judge LLM audits the transcript for file contents, command output or test results that prove the objective. The page frames this as the way to make the agent unable to finish by claiming success. The verification is part of the same loop (see LOOP-WITHIN) | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |
| output | A `GoalOutcome` with status `complete` or `capped`, the number of audit rounds and the judge's last verdict (score, complete flag, what is missing). Everything stays in one conversation history. A PR from this surface: not documented (checked: Goal Completion Loop) | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |
| who drives | Automated once code calls `run_goal`; a person (the developer who writes the code) chooses the objective | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |

### Surface 3: Agent Canvas conversation, one task at a time (daily workflow)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | The task the agent recommended or one the person picks, with a statement of whether the agent may investigate, implement or only summarize, and what it may push or post | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| step | After the person approves the plan the agent implements the change, runs the relevant checks and reports what changed. A separate agent can be dispatched for independent work, with limits stated in the prompt | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| output | Changes in the conversation's workspace and a summary; pushing or posting depends on the permissions granted and the confirmation policy | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| who drives | Human approves | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |

### Surface 4: TODO Management (SDK GitHub Actions workflow, a developer run for `TODO(openhands)` comments)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A `TODO(openhands): ...` comment in the code (the identifier is configurable). A scanner finds the matches and extracts the description; the number processed per run is capped (`MAX_TODOS`, default 3 in the reference workflow; the page advises starting at 1) | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |
| step | For each TODO the workflow checks out the repository, creates a branch named from the description, runs the OpenHands agent with the TODO's file, line and description, and, if the agent changed anything, commits, pushes and opens a PR. If the agent process exits with an error the job exits with that error and no PR is made; if the working tree has no diff it skips PR creation. The reference workflow contains no test or lint step of its own, and the page does not show what the agent's prompt says about tests (the prompt file is linked, not shown) | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |
| output | A branch and a PR per TODO, with a title "Implement TODO: ..." and a body naming the file, line and description; the page's feature description says the workflow "picks most relevant reviewers", but no mechanism is shown. The page's own advice: "Always review the generated PRs before merging" | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |
| who drives | Human to add the TODO and to review. Automated once started: a manual dispatch, or the `automatic-todo` label added to a PR; the schedule trigger is commented out by default | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |

Headless Mode (CLI `openhands --headless -t "<task>"` or `-f task.txt`) is the way to run one task without the UI, for scripts
and CI. It always runs in `always-approve` mode (no confirmation, not changeable), and `--json` streams the agent's events as
JSON lines so a pipeline can parse them "to determine success/failure". The page defines no success condition, no test step and
no retry (https://docs.openhands.dev/openhands/usage/cli/headless.md, 2026-10-23). So it is a way to run a developer task, not a
second developer flow; it adds no cell.

The Dependency Upgrades and Vulnerability Remediation pages are use-case pages of example prompts, not Agent Canvas prebuilt
automations (the prebuilts index lists Issue to Pull Request, GitHub PR Review Assistant, GitHub Repository Monitor and Slack
Channel Monitor). Their prompts tell the agent to run the tests ("Run the test suite", "Verify all tests pass", "Run tests,
Create a PR with ... Test results") and the Vulnerability page sketches a pipeline prompt that ends "Auto-merge low-risk fixes
after tests pass". These are prompts a person writes, not documented behavior of the product, and none says what the agent does
when a test fails. The Vulnerability page's example app shows a person reviewing and merging
(https://docs.openhands.dev/openhands/usage/use-cases/dependency-upgrades.md ;
https://docs.openhands.dev/openhands/usage/use-cases/vulnerability-remediation.md, 2026-10-23).

Verification before delivery on a separate surface: the QA agent (a GitHub Actions plugin or a skill invoked as `/qa-changes`)
runs the changed software, not the test suite, and posts a PASS, FAIL or PARTIAL report as a PR comment. It works from the PR
after it is open, so it is a check on delivered work, not a step inside the developer's run
(https://docs.openhands.dev/openhands/usage/use-cases/qa-changes.md, 2026-10-23).

## LOOP-WITHIN-A-TASK

### Surface 1: judge-driven goal loop (SDK `run_goal`)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes. After each agent run a judge LLM decides whether the objective is provably complete. If not, the agent is re-prompted with the judge's list of what is missing and runs again, up to `max_iterations` (default 10), after which the result is `capped`. An unparseable judge reply counts as not complete, so the loop continues | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |
| what judges it | A second, separate LLM that reads the transcript and returns a score, a complete flag and what is missing. It looks for evidence such as test output, so the actual check (for example pytest) is run by the agent and the judge reads the result | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |
| who drives | Automated | https://docs.openhands.dev/sdk/guides/convo-goal.md | 2026-10-23 |

### Surface 2: critic with iterative refinement (SDK, and the Verification settings in Agent Canvas)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, if enabled. When the agent finishes and the critic's predicted success score is under the threshold (default 0.6), a follow-up prompt goes to the agent, which keeps working until the score passes or the maximum number of iterations (default 3) is reached. The page labels the feature experimental | https://docs.openhands.dev/sdk/guides/critic.md ; https://docs.openhands.dev/openhands/usage/agent-canvas/critic.md | 2026-10-23 |
| what judges it | A critic model that scores the work as a probability of success, not a test run. In Agent Canvas it applies to OpenHands agent conversations; third-party ACP agents run their own loop and may not expose it | https://docs.openhands.dev/sdk/guides/critic.md ; https://docs.openhands.dev/openhands/usage/agent-canvas/critic.md | 2026-10-23 |
| who drives | Automated once a person turns it on in settings (new conversations only) | https://docs.openhands.dev/openhands/usage/agent-canvas/critic.md | 2026-10-23 |

The two compose: the critic governs each inner run and the goal loop governs the whole objective
(https://docs.openhands.dev/sdk/guides/convo-goal.md, 2026-10-23).

### Surface 3: multi-agent iterative refinement (SDK example)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, in the example script: a refactoring agent does the work, a separate critique agent scores it against four dimensions (0-25 points each), and the loop repeats with the critique file until the score reaches the threshold (90 in the example) or the iteration limit (5) | https://docs.openhands.dev/sdk/guides/iterative-refinement.md | 2026-10-23 |
| what judges it | A critique agent scoring correctness, quality, completeness and best practices; the loop is plain script code the developer writes | https://docs.openhands.dev/sdk/guides/iterative-refinement.md | 2026-10-23 |
| who drives | Automated once the script runs; the person writes the script and picks the thresholds | https://docs.openhands.dev/sdk/guides/iterative-refinement.md | 2026-10-23 |

### Surface 4: Issue to PR developer agent (Agent Canvas)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Not documented as a loop inside the developer run. The page lists running tests as one step. Checked: Issue to Pull Request Automation, Software Factory, Managing Automations in Agent Canvas, Critic, and (gap-closing pass) TODO Management, Headless Mode, Dependency Upgrades, Vulnerability Remediation, Automated Code Review, GitHub Repository Monitor. The Software Factory page does describe revision after failed review checks, which happens across runs (see LOOP-ACROSS) | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md ; https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| what judges it | not documented for the developer run (same pages checked, including the six read in the gap-closing pass). The TODO Management workflow has no judge either: an agent exit error fails the job, otherwise any diff becomes a PR | n/a | 2026-10-23 |
| who drives | not documented (same pages checked) | n/a | 2026-10-23 |

## LOOP-ACROSS-TASKS

### Surface 1: Software Factory (four scheduled automations sharing GitHub labels and statuses)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | Four independent automations, each checking every 5 minutes. Triage labels an issue `ready-for-dev`; the developer automation picks up labeled issues and opens PRs; the reviewer automation, triggered by the `openhands-review` label, checks out the exact PR head, runs tests, posts a review and records review and test statuses; the watchdog, which starts no agent, merges a branch whose acceptance statuses and Actions runs pass. Work passes from one stage to the next through labels, PRs and commit statuses on GitHub | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| queue / pacing | The GitHub issue labels and statuses are the queue. The recorded run triaged six issues and ran six developers concurrently. Failed checks lead to revisions, and a new commit needs a fresh review of that exact commit; when earlier merges made an accepted branch stale, the watchdog updated it and waited for a fresh review before merging | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| output | Merged PRs, plus automation activity per automation in the Automate view | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| next piece of work after a run finishes | Yes, by label and schedule, not by one run starting another: the next issue is taken at the next poll. The page says the toggle on each automation pauses new scheduling | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |
| who drives | Automated (after a person turns on all four automations and files the issues) | https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md | 2026-10-23 |

### Surface 2: Issue to Pull Request automation, polling

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A scheduled run polls the issue tracker (GitHub, GitLab, Jira or Linear) for issues with the trigger label or state, skips the ones already processed using stored state, and starts one conversation per new issue | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md | 2026-10-23 |
| queue / pacing | Default check every 15 minutes; a cap on conversations started per poll; repositories chosen in setup. Removing and re-adding the label makes the issue count as new | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md | 2026-10-23 |
| output | One conversation, branch and PR per issue, listed in the automation's activity with a status of pending, running, completed, failed, cancelled or skipped (skipped can happen at the backend's concurrency limit) | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md ; https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md | 2026-10-23 |
| next piece of work after a run finishes | Handled by the next poll picking up the next unprocessed labeled issue; the page does not describe a finished run starting the next one directly | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md | 2026-10-23 |
| who drives | Automated | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md | 2026-10-23 |

### Surface 3: Automations on a schedule or on events (Cloud)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A cron schedule (described in plain language such as "every weekday at 9 AM" or "hourly" and converted to cron) starts a fresh sandbox and runs a saved prompt as a conversation. Event automations run when GitHub sends an event such as `pull_request.labeled`, `issues.opened` or `issue_comment.created`, narrowed by a filter expression; custom webhooks (for example Linear) work after a one-time registration. Event delivery needs the GitHub App installed, a team organization, and the GitHub organization claimed, or events are silently dropped | https://docs.openhands.dev/openhands/usage/automations/overview.md ; https://docs.openhands.dev/openhands/usage/automations/creating-automations.md ; https://docs.openhands.dev/openhands/usage/automations/event-automations.md | 2026-10-23 |
| queue / pacing | Run timeout (default 10 minutes, up to 30 requested); runs listed as pending, running, completed or failed; an automation can be disabled, edited, or run manually. A queue depth or item-by-item work list: not documented (checked: Automations Overview, Creating Automations, Event-Based Automations, Managing Automations) | https://docs.openhands.dev/openhands/usage/automations/creating-automations.md ; https://docs.openhands.dev/openhands/usage/automations/managing-automations.md | 2026-10-23 |
| output | One saved conversation per run, which the person can review or continue; results go where the prompt says (Slack, a file, a GitHub issue) | https://docs.openhands.dev/openhands/usage/automations/overview.md | 2026-10-23 |
| next piece of work after a run finishes | Not documented as a feature; the next run starts at the next tick or event. Checked: the four Automations pages above and the GitHub Repository Monitor page | n/a | 2026-10-23 |
| who drives | Automated after a person creates it | https://docs.openhands.dev/openhands/usage/automations/overview.md | 2026-10-23 |

### Surface 4: person works down a queue in one conversation (daily workflow)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | Nothing by itself: when the person finishes a task they ask the agent to re-check remaining work and give the next highest-priority item | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| queue / pacing | The agent's prioritized report is the queue, rebuilt on request | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| output | The next recommended task | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| next piece of work after a run finishes | Next item on request | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |
| who drives | Human | https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md | 2026-10-23 |

### Surface 5: TODO Management workflow (SDK GitHub Actions)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | After a scan job lists the matching TODOs (up to the cap), a matrix job processes them with `max-parallel: 1`, "one TODO at a time to avoid conflicts", each getting its own branch and PR | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |
| next piece of work after a run finishes | Yes within one workflow run (the next TODO in the list); the next run needs a manual dispatch or an `automatic-todo` label, since the schedule is commented out | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |
| who drives | Automated within a run; Human to start it (default) | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | 2026-10-23 |

Automated Code Review triggers (read in full): a PR opened non-draft, a draft marked ready, the `review-this` label, or
`openhands-agent` requested as reviewer. It does not re-run when commits are pushed (`synchronize` is excluded on purpose); a
follow-up review needs the label re-added or the reviewer re-requested
(https://docs.openhands.dev/openhands/usage/use-cases/code-review.md, 2026-10-23). This refines the Software Factory note that a
new commit needs a fresh review: on this page that fresh review is triggered by a person or a label, not by the push.

The GitHub Repository Monitor page, read in full, ends after "Verify the Automation". Beyond setup it only says the setup agent
interviews the person (repository, events, frequency, action, where to report) and creates an automation, with an example of
"watch for failed workflow runs, summarize the failure, and open a pull request when the fix is straightforward". It documents
no queue and no chaining (https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/github-repo-monitor.md, 2026-10-23).

## Pages read

All re-fetched 2026-10-23 and read in full.

- https://docs.openhands.dev/llms.txt (the docs index)
- https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/issue-to-pr.md
- https://docs.openhands.dev/sdk/guides/convo-goal.md
- https://docs.openhands.dev/openhands/usage/use-cases/daily-workflow.md
- https://docs.openhands.dev/openhands/usage/use-cases/qa-changes.md
- https://docs.openhands.dev/overview/issue-lifecycle.md
- https://docs.openhands.dev/openhands/usage/automations/overview.md
- https://docs.openhands.dev/openhands/usage/automations/creating-automations.md
- https://docs.openhands.dev/openhands/usage/automations/event-automations.md
- https://docs.openhands.dev/openhands/usage/automations/managing-automations.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/overview.md
- https://docs.openhands.dev/openhands/usage/agent-canvas/managing-automations.md (read to the "run manually" section)
- https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/github-repo-monitor.md (read in full in the gap-closing pass)
- https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md (gap-closing pass, in full)
- https://docs.openhands.dev/openhands/usage/cli/headless.md (gap-closing pass, in full)
- https://docs.openhands.dev/openhands/usage/use-cases/dependency-upgrades.md (gap-closing pass, in full)
- https://docs.openhands.dev/openhands/usage/use-cases/vulnerability-remediation.md (gap-closing pass, in full)
- https://docs.openhands.dev/openhands/usage/use-cases/code-review.md (gap-closing pass, in full)
- https://docs.openhands.dev/openhands/usage/agent-canvas/critic.md
- https://docs.openhands.dev/sdk/guides/critic.md
- https://docs.openhands.dev/sdk/guides/iterative-refinement.md
- https://docs.openhands.dev/openhands/usage/cloud/slack-installation.md

## Ruled out (why)

- **Automated Code Review** (https://docs.openhands.dev/openhands/usage/use-cases/code-review.md): read in full in the gap-closing pass.
  It is a PR reviewer, so review policy and posting are out of lesson 1 scope; only its triggers are used (LOOP-ACROSS, Surface 5 note).
- **Reviewer and watchdog stages of the Software Factory** (read on the Software Factory page): used only to show how work moves
  between stages in LOOP-ACROSS. Review policy and the merge decision (release) are left out of the grids.
- **Slack Integration** (read in full): `@openhands` in a channel or thread starts a conversation, with a repository named in
  the message, and thread replies are follow-ups. It is a way to start a task conversation, not a plan, a verify loop or a
  queue; it gives no planning or looping behavior, which is why the earlier draft's `not documented` PLAN column was wrong to
  rest on it alone.
- **GitHub Repository Monitor** (read in full): a prebuilt workflow that watches a repository and triggers an agent on
  matching activity. The page opens a prefilled setup prompt and does not say what the agent then does with the work, so it is
  not used in a grid.
- **Pages in the index not read**: Incident Triage, COBOL
  Modernization, Spark Migrations, Slack Channel Monitor and GitHub PR Review Assistant prebuilts, ACP Agents, Agent Profiles, plugin and extension pages, the Agent Canvas release notes, Jira Cloud and GitHub Cloud
  integration pages, and the Enterprise pages. They cover other use cases, setup, or integrations; open for a later pass if
  lesson 1 widens.
- **Sandboxes, Docker execution, backends, secrets and token scopes, parallel runs, Enterprise sharing**: isolation and ops,
  out of scope for lesson 1.
- **Shipwright marketing pages** (`site/src/pages/compare.astro`, `vs/*.astro`): not consulted; no wording or claims reused.

## Gap-closing pass (2026-10-13)

All pages fetched in full on 2026-10-13. Flags are from the CROSS-CHECK in README.md.

| Flag | Page read | Changed a cell? |
| --- | --- | --- |
| TODO Management | https://docs.openhands.dev/sdk/guides/github-workflows/todo-management.md | Added DEV-TASK Surface 4 and LOOP-ACROSS Surface 5. No contradiction with an existing cell. Does not answer the Issue to PR failed-tests question |
| Headless Mode | https://docs.openhands.dev/openhands/usage/cli/headless.md | No cell. Always-approve, JSON event stream; no success condition, test step or retry (note under DEV-TASK) |
| Dependency Upgrades "prebuilt" | https://docs.openhands.dev/openhands/usage/use-cases/dependency-upgrades.md | No cell. It is a use-case page of example prompts, not a prebuilt automation; "run tests" is in the person's prompt |
| Vulnerability Remediation "prebuilt" | https://docs.openhands.dev/openhands/usage/use-cases/vulnerability-remediation.md | No cell. Same as above; a sketched pipeline prompt says "Auto-merge low-risk fixes after tests pass", a prompt not documented behavior |
| Automated Code Review (triggers) | https://docs.openhands.dev/openhands/usage/use-cases/code-review.md | Note added under LOOP-ACROSS: no re-review on push |
| GitHub Repository Monitor past setup | https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt/github-repo-monitor.md | No cell. Nothing past "Verify the Automation"; LOOP-ACROSS Surface 3 "not documented" stands |

Answer to the open question: what the Issue to Pull Request developer run does when tests fail is **not documented**. Pages
checked: Issue to Pull Request Automation, Software Factory, Managing Automations (Agent Canvas), Critic, TODO Management,
Headless Mode, Dependency Upgrades, Vulnerability Remediation, Automated Code Review, GitHub Repository Monitor. The only
documented consequence of failure is at the stage level in the Software Factory: failed review checks lead to revisions, and a
person can remove and re-apply the label to retry.
