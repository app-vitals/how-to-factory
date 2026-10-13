# Devin: lesson 1 field grid (redo)

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its URL and the
date I fetched it (2026-10-13). "Who drives" is one of Human, Human approves, Automated, and only when a page says so;
otherwise `not documented`, followed by the index pages checked. Names are the product's own, not canonical. Several
surfaces per grid are used where one surface does not cover the concept; each is named in its table.

Method: started from the docs index (https://docs.devin.ai/llms.txt, fetched 2026-10-13), listed the Cloud pages on
planning, tickets, verification and automation, and read the pages under "Pages read" in full. This replaces an earlier,
shallower draft of this file.

Index pages checked for any `not documented` below: Ask Devin, Creating Playbooks, Using Playbooks, Automations, Auto-triage,
Scheduled Sessions, Testing & Video Recordings, Dynamic Workflows, Advanced Capabilities, Devin Review, Linear, GitHub,
Jira, Instructing Devin Effectively, When to Use Devin, and How does Devin fit into my existing SDLC (URLs under "Pages read").

## PLAN

### Surface 1: Ask Devin (plan mode)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A question or goal about a repository that has been indexed (repositories set up in Devin's environment are indexed automatically; others can be added in settings) | https://docs.devin.ai/work-with-devin/ask-devin.md | 2026-10-13 |
| step | The person works with Devin in conversation to scope and plan the implementation and break the task down, backed by code search over the indexed repository. The page does not say the breakdown carries acceptance criteria or dependencies | https://docs.devin.ai/work-with-devin/ask-devin.md | 2026-10-13 |
| output | A context-rich prompt that Devin writes from the conversation, ready to start an Agent session; once started, the session's status shows inside the Ask Devin conversation | https://docs.devin.ai/work-with-devin/ask-devin.md | 2026-10-13 |
| who drives | not documented. The page describes the person working with Devin and then starting the session, but does not label either step. Checked: Ask Devin, When to Use Devin, SDLC integration | n/a | 2026-10-13 |

The "When to Use Devin" page also advises scoping with Ask Devin before implementation, and for large work splitting it into
focused sessions (https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, 2026-10-13).

### Surface 2: ticket-driven planning (Linear `!plan` default playbook; Jira)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A Linear ticket. A session starts when the ticket is assigned to Devin (default playbook), tagged with a playbook label such as `!plan`, or Devin is @mentioned in a comment (the comment is the instruction, no playbook) | https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| step | The default playbook for a new Linear connection is `!plan`; what that playbook does is whatever its text says, and the page does not show its contents. The SDLC page says that with Jira or Linear connected, Devin analyzes tickets and gives confidence scores. For Jira, the page says Devin plans the work, writes the code, opens a PR and reports back, in one sentence, with no separate planning stage described | https://docs.devin.ai/integrations/linear.md ; https://docs.devin.ai/essential-guidelines/sdlc-integration.md ; https://docs.devin.ai/integrations/jira.md | 2026-10-13 |
| output | Devin's todo list syncs to Linear's plan view, with an activity feed of commands, edits and progress. Contents of a finished plan beyond the todo list: not documented (checked: Linear, Using Playbooks, SDLC integration) | https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| who drives | Human for assign, label or @mention. Automated when a Linear automation trigger (team, label, status filters, edge-detected) starts the work without manual assignment or labeling | https://docs.devin.ai/integrations/linear.md | 2026-10-13 |

## DEV-TASK

### Surface 1: a Devin session started from written instructions or a playbook

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt written by a person: repo and purpose, ordered tasks, success criteria, pointers to existing code and docs. For repeated work, a playbook: an outcome plus a procedure (setup, the task, delivery), postconditions ("specifications"), advice, forbidden actions, and what is needed from the user. Via Linear or Jira the input is the ticket or work item (Jira: summary and description) | https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md ; https://docs.devin.ai/product-guides/creating-playbooks.md ; https://docs.devin.ai/integrations/jira.md | 2026-10-13 |
| step | The guide says to tell Devin to test its own work before opening a PR (run the app, drive the browser, take screenshots, record) and to name the checks (run the tests, keep CI green, pass lint). The SDLC page says Devin runs existing tests, lint and type checks and iterates until tests pass before submitting a PR. Which checks run is set by the prompt, playbook or repo skill, not by a fixed pipeline | https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md ; https://docs.devin.ai/essential-guidelines/sdlc-integration.md | 2026-10-13 |
| step (testing mode, after the PR) | After a PR is created Devin can enter a testing mode: set up the environment (following any repo skill under `.agents/skills/`), write a short test plan for the one most important end-to-end flow and send it to the person, then, once CI is green and review comments are addressed, record a video of itself running the plan in the browser. The page says recordings are a quick sanity check, and that exhaustive coverage belongs in the existing test suites and CI | https://docs.devin.ai/work-with-devin/testing-and-recordings.md | 2026-10-13 |
| output | A pull request (opened under Devin's identity, or the user's when linked and configured) plus, from testing mode, a video attached to a session message. Linear: PR URL and session link added to the agent session. Jira: PR link in the agent panel or as a remote link and comment | https://docs.devin.ai/integrations/gh.md ; https://docs.devin.ai/work-with-devin/testing-and-recordings.md ; https://docs.devin.ai/integrations/linear.md ; https://docs.devin.ai/integrations/jira.md | 2026-10-13 |
| who drives | Human for starting the session (prompt, assign, label or @mention). Testing mode: Human approves (Devin offers a "Test the app" button after the PR), or Automated if the person turned on "Pre-approve testing". The page does not label the building step itself, beyond the SDLC page's description of delegating work to run asynchronously | https://docs.devin.ai/work-with-devin/testing-and-recordings.md ; https://docs.devin.ai/essential-guidelines/sdlc-integration.md | 2026-10-13 |

### Surface 2: a person comments `/devin` on an open GitHub PR

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A PR comment starting with `/devin` and a prompt, from someone with write access whose GitHub account is linked to Devin; open PRs only. If a session is already working on the PR, the comment goes to that session | https://docs.devin.ai/integrations/gh.md | 2026-10-13 |
| step | Starts a session with the PR as context (taking the PR over where appropriate) | https://docs.devin.ai/integrations/gh.md | 2026-10-13 |
| output | A reply on the PR linking the session; changes land on the PR | https://docs.devin.ai/integrations/gh.md | 2026-10-13 |
| who drives | Human (the commenter starts it) | https://docs.devin.ai/integrations/gh.md | 2026-10-13 |

## LOOP-WITHIN-A-TASK

### Surface 1: self-driven test loop in the session

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, as described on the SDLC page: Devin runs tests in its own environment and iterates until they pass, including lint and type checks, before submitting a PR. The instructing guide tells the person to set the loop up in the prompt ("run the tests after each iteration", "pass the linters before pushing", "keep the pipeline green") | https://docs.devin.ai/essential-guidelines/sdlc-integration.md ; https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md | 2026-10-13 |
| what judges it | The project's own tests, linters, type checks and CI named in the prompt; in testing mode, the recorded run of the test plan. A stopping rule or retry cap: not documented (checked: SDLC integration, Instructing Devin, Testing & Recordings) | https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md ; https://docs.devin.ai/work-with-devin/testing-and-recordings.md | 2026-10-13 |
| who drives | not documented as a label. Checked: SDLC integration, Instructing Devin, When to Use Devin | n/a | 2026-10-13 |

### Surface 2: Devin Review Auto-Fix on Devin's own PRs

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | On a PR opened by a running Devin session, review findings go to that session first; with "Auto-fix review findings" on, the session fixes what it can, and only the findings it could not fix are posted as comments. Two other pages say Auto-Fix also lets Devin respond to review comments and iterate on CI failures until the PR is merge-ready; the Devin Review page itself describes only review findings | https://docs.devin.ai/work-with-devin/devin-review.md ; https://docs.devin.ai/essential-guidelines/when-to-use-devin.md ; https://docs.devin.ai/essential-guidelines/sdlc-integration.md | 2026-10-13 |
| what judges it | Devin Review's own findings (bug catcher, confidence levels) and CI; the page notes that "no issues found" summary comments are ignored and only real findings trigger a fix | https://docs.devin.ai/work-with-devin/devin-review.md | 2026-10-13 |
| who drives | Automated once an admin has turned on the Auto-fix setting; the page says the rollout is gradual, so the setting may be missing | https://docs.devin.ai/work-with-devin/devin-review.md | 2026-10-13 |

### Surface 3: Dynamic Workflows, loop pattern

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | Yes, if asked for: the page's loop example has Devin write a script that runs a flaky suite, fixes what failed and repeats until three runs in a row pass or a round fixes nothing new. The script is plain Python run on Devin's machine; each step is an agent session | https://docs.devin.ai/work-with-devin/dynamic-workflows.md | 2026-10-13 |
| what judges it | The stop condition written into the script and the check it runs (the example judges by the suite results) | https://docs.devin.ai/work-with-devin/dynamic-workflows.md | 2026-10-13 |
| who drives | Automated by default (runs are auto-approved); Human approves if the person turns off "Auto-approve workflows". Enterprise accounts: off until an admin enables it | https://docs.devin.ai/work-with-devin/dynamic-workflows.md | 2026-10-13 |

## LOOP-ACROSS-TASKS

### Surface 1: Automations (schedule, ticket, GitHub and webhook triggers)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | An automation fires on a trigger and starts a session with a saved prompt (optionally a playbook), with the event payload as context. Triggers: schedules (recurring or run-once), Linear (issue created, label added, status changed, assigned and more), Jira (created, updated, label, status, assigned, comment), GitHub (issues, comments, PRs, CI check runs, pushes), GitLab, Slack, PagerDuty, Pylon and webhooks. Several triggers on one automation act as OR. A Linear trigger fires only when a ticket changes from not matching to matching, so existing matches are not picked up | https://docs.devin.ai/product-guides/automations.md ; https://docs.devin.ai/integrations/linear.md | 2026-10-13 |
| queue / pacing | An optional Preflight script runs before the action; it can poll an external service, keep a small cursor between runs, and emit work items so that one session starts per new item, with duplicates prevented by item id; at most 10 items per run by default (max 50), and items past the cap are not queued for later. Separate controls: per-automation concurrent runs plus a queue depth (events beyond the depth are dropped), an invocation rate limit (default 50 per hour), and an ACU cap per session. The page lists a "Fix CI Failures" template and a "Weekly Dependency Update" template among others | https://docs.devin.ai/product-guides/automations.md | 2026-10-13 |
| output | One new session per fired event or item, listed in the automation's activity tab; for Jira, the session's final message is posted back on the work item as a comment; an email can be sent per run | https://docs.devin.ai/product-guides/automations.md ; https://docs.devin.ai/integrations/jira.md | 2026-10-13 |
| next piece of work after a run finishes | A finished session starting the next ticket by itself: not documented as a feature. Checked: Automations, Linear, Jira, Scheduled Sessions, Advanced Capabilities, When to Use Devin. What the pages do document is that new events (a schedule tick, a ticket reaching a status, a CI failure) start the next run | n/a | 2026-10-13 |
| who drives | Automated (the page says events start sessions automatically, without a person tagging Devin) | https://docs.devin.ai/product-guides/automations.md | 2026-10-13 |

Scheduled Sessions is a legacy page: new scheduled work is created as an automation with a Schedule trigger, and old
schedules keep running (https://docs.devin.ai/product-guides/scheduled-sessions.md, 2026-10-13). Playbooks can be attached
to a schedule, so the same procedure is applied on every run.

### Surface 2: Dynamic Workflows, staged pipeline

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A script passes each item through stages (for example audit, then fix, then verify) with no barrier between stages, so one item can be in a later stage while another is still in the first; each stage's structured output builds the next stage's prompt. Failed agents are handled by the script (skip, default, retry, or fail), and an interrupted run resumes from its recorded results (default and maximum budget: seven days) | https://docs.devin.ai/work-with-devin/dynamic-workflows.md | 2026-10-13 |
| output | Structured results per stage, branches pushed by agents on separate VMs, and a progress panel in the session | https://docs.devin.ai/work-with-devin/dynamic-workflows.md | 2026-10-13 |
| who drives | Automated by default (auto-approved runs); Human approves if that setting is off | https://docs.devin.ai/work-with-devin/dynamic-workflows.md | 2026-10-13 |

## Pages read

All fetched 2026-10-13 and read in full.

- https://docs.devin.ai/llms.txt (the docs index)
- https://docs.devin.ai/work-with-devin/ask-devin.md
- https://docs.devin.ai/product-guides/creating-playbooks.md
- https://docs.devin.ai/product-guides/using-playbooks.md
- https://docs.devin.ai/product-guides/automations.md
- https://docs.devin.ai/product-guides/scheduled-sessions.md
- https://docs.devin.ai/product-guides/auto-triage.md
- https://docs.devin.ai/work-with-devin/testing-and-recordings.md
- https://docs.devin.ai/work-with-devin/dynamic-workflows.md
- https://docs.devin.ai/work-with-devin/advanced-capabilities.md
- https://docs.devin.ai/work-with-devin/devin-review.md (read in full; only the Auto-Fix and own-PR sections feed a cell)
- https://docs.devin.ai/integrations/linear.md
- https://docs.devin.ai/integrations/gh.md
- https://docs.devin.ai/integrations/jira.md
- https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md
- https://docs.devin.ai/essential-guidelines/when-to-use-devin.md
- https://docs.devin.ai/essential-guidelines/sdlc-integration.md

## Ruled out (why)

- **Auto-triage** (https://docs.devin.ai/product-guides/auto-triage.md): read in full. A long-running Devin watches a Slack
  channel, filters noise and duplicates, and spawns child sessions that post a root-cause diagnosis in the thread. Ruled out
  of the grids because its output is a diagnosis in Slack, not a plan or a PR, so it does not answer the lesson 1 concepts.
  It is the same Automations mechanism (a "Triage Devin" action type) and shares their limits.
- **Stacked PRs, Devin MCP, Computer Use, Session Insights, Skills, Memory, Devin CLI and handoff
  pages, Slack and Teams integrations, tutorials and use-case gallery pages** (all in the index): listed in the index, not
  read in full for this grid; they cover surfaces other than the ones used here (CLI, chat entry points, post-task analysis)
  or the repo-skills mechanism that testing mode only references. Open for a later pass if lesson 1 widens.
- **Managed Devins** (Advanced Capabilities, read in full): parallel child sessions with a coordinator that is woken when a
  child finishes. Ruled out because lesson 1 leaves out parallel runs and isolation.
- **Devin Review as a reviewer** (review policy, posting, approvals): left out of scope; only its Auto-Fix loop is used.
- **Environment setup, blueprints, secrets, security profiles, Outposts, billing, ACU limits as cost control**: ops and
  sandboxing, out of scope for lesson 1.
- **Shipwright marketing pages** (`site/src/pages/compare.astro`, `vs/*.astro`): not consulted; no wording or claims reused.
