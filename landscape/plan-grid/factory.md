# Factory: lesson 2 plan grid (spec to plan)

Scope: lesson 2 only, the step where a spec or request becomes a plan. Left out on purpose: test and verification planning
(verification lesson), how specs are written (intake lesson), standards files, estimates and model tiers, and bundling or
PR shaping. Every filled field is a paraphrase of a first-party page, with its URL and the date I fetched it
(**2026-10-19**). Nothing here is carried over from the 2026-10-13 notes in `lessons/README.md` or
`landscape/field-grid/factory.md`; every page below was fetched again.

"Approval before work starts" uses exactly one of **Human**, **Human approves** or **Automated**, and only where a page
states it. Where a page does not, the cell says `not documented` and names the index pages checked. Names are Factory's
own (Spec Mode, Missions, Delegations), not canonical. Several surfaces are used because no single one covers every
column; each row names its surface.

Method: fetched the docs index (https://docs.factory.com/llms.txt, 2026-10-19), listed every page that could touch
planning, design before coding, code exploration, plan review or approval, and turning a plan into tasks, then fetched
the Markdown version of each. Pages marked "in full" under "Pages read" were read end to end; pages marked "searched"
were searched for planning terms and the matching sections read. The rest of the index is under "Ruled out (why)".

## The grid

| Surface | READS THE CODE BEFORE PROPOSING | DESIGN OUTPUT AND ITS FORM | NAMES REUSE, RISKS OR BREAKING CHANGES | APPROVAL BEFORE WORK STARTS | HOW IT BECOMES TASKS |
| --- | --- | --- | --- | --- | --- |
| **Spec Mode** (Droid CLI and Factory App; `droid exec --use-spec` for headless) | Yes. The mode is read-only: Droid searches the repo, reads files, inspects linked artifacts and asks clarifying questions, and must not edit files, change config, commit, start services or write to outside systems until the plan is approved. ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), 2026-10-19) | A concrete implementation plan shown for review. It can optionally be saved as a Markdown file named `YYYY-MM-DD-slug.md`, by default under `.factory/docs`, once the "Save spec as Markdown" setting is on. The pages show no fixed template for the plan's sections. ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), 2026-10-19) | Only if the person asks. The docs advise putting the outcome, constraints, verification steps and "relevant existing patterns" in the request (their example says to follow an existing background-job pattern). No page says the plan itself must list reuse, risks or breaking changes. Not documented as a built-in part of the plan (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Overview, Droid CLI Reference, Droid Exec). ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), 2026-10-19) | **Human approves**. When the plan is ready Droid calls an exit-spec-mode tool to ask for approval; the person then proceeds (with manual approvals or a chosen autonomy level) or keeps iterating. Headless `droid exec` has no stated approval step in the pages read: by default it runs read-only and edits only with an autonomy flag. ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Droid Exec](https://docs.factory.com/droid-exec/overview.md), 2026-10-19) | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Custom droids). After approval the same session implements the plan in Normal Mode; no page says the plan is split into stored tasks. The quickstart says only that Droid proposes a plan "when the task needs one". ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Droid CLI Quickstart](https://docs.factory.com/droid-cli/quickstart.md), 2026-10-19) |
| **Missions** (`/missions` in the CLI; Mission Mode and Mission Control in the Factory App; headless `droid exec --mission`) | Not documented as a step (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). The pages describe a back-and-forth where Droid asks clarifying questions and probes constraints, but never say it reads the codebase first. Brownfield migrations are listed as a use, and the configuration page says AGENTS.md conventions and existing skills carry into the work. ([Factory Missions](https://docs.factory.com/missions/overview.md), [Missions Configuration & Reference](https://docs.factory.com/missions/reference.md), 2026-10-19) | A structured plan: features grouped into milestones, plus the skills each part needs (existing ones reused, new ones written). The docs call the planning phase where most of the value is, and say Droid pushes back and iterates until the plan is solid. Milestones also set how often validation runs. ([Factory Missions](https://docs.factory.com/missions/overview.md), [Planning & Validation](https://docs.factory.com/missions/planning.md), 2026-10-19) | Partly. Reuse is documented for skills only (existing skills are pulled in before new ones are made). Reuse of code, risks and breaking changes in the plan: not documented (checked: Factory Missions, Planning & Validation, Missions Configuration & Reference, Running in the CLI). The only risk-style guidance is a heads-up that the plan can drift on long runs, which more milestones are meant to reduce. ([Factory Missions](https://docs.factory.com/missions/overview.md), [Planning & Validation](https://docs.factory.com/missions/planning.md), 2026-10-19) | **Human approves** in the interactive flow: Mission Mode is the state Droid enters after the person approves the mission plan, and Mission Control starts once the plan is approved. For headless `droid exec --mission`, the pages require `--auto high` or the skip-permissions flag and show no plan-approval step. ([Factory Missions](https://docs.factory.com/missions/overview.md), [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Droid CLI Reference](https://docs.factory.com/droid-cli/cli-reference.md), 2026-10-19) | The plan's features are the tasks. An orchestrator hands each feature to a worker (about one worker run per feature), and each milestone gets two validator runs. The orchestrator can add fix features during the run, and a person can pause it and have it re-plan, reorder or re-scope. Where the task list is stored is not documented (checked: Planning & Validation, Running in the Factory App, Missions Configuration & Reference); the app shows a progress log of workers and milestones. ([Planning & Validation](https://docs.factory.com/missions/planning.md), [Factory Missions](https://docs.factory.com/missions/overview.md), [Running in the Factory App](https://docs.factory.com/missions/running-app.md), 2026-10-19) |
| **Delegations** (assign or mention Factory in a Linear or Jira issue, or in Slack) | Not documented as a planning step (checked: Delegations, Linear, Jira, Slack). The pages say Droid investigates, implements and tests, and that the issue title, description, labels and comments are passed in at the start; no separate read-the-code-then-propose stage is described. ([Delegations](https://docs.factory.com/delegations/index.md), [Linear](https://docs.factory.com/delegations/linear.md), 2026-10-19) | Not documented (checked: Delegations, Linear, Jira, Slack). Progress, actions and a final response appear in the agent session on the issue; for code changes Droid is told to open a pull request and return its link. No plan artifact is described. ([Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md), 2026-10-19) | Not documented (checked: Delegations, Linear, Jira, Slack). The only related advice is for the requester to put the repository, outcome, acceptance criteria and verification steps in the issue before assigning it. ([Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md), 2026-10-19) | **Human**. A person starts the work by assigning the issue or mentioning Factory. No page describes an approval of a plan before Droid begins. The docs do point to a separate gate later: Factory-authored pull requests still need review, and the delegations page shows how to require a second approver. ([Delegations](https://docs.factory.com/delegations/index.md), [Linear](https://docs.factory.com/delegations/linear.md), 2026-10-19) | The issue is the task, and one issue starts one session. Factory tries to move a backlog or to-do issue into a started state and to attach the pull-request link. Splitting an issue into several is not described (checked: Delegations, Linear, Jira). In Slack, Droid may open a dedicated channel for a substantial multi-step job; that is a place to work, not a task split. ([Linear](https://docs.factory.com/delegations/linear.md), [Slack](https://docs.factory.com/delegations/slack.md), 2026-10-19) |

## Pages read

Fetched 2026-10-19 from the docs index at https://docs.factory.com/llms.txt (Markdown version of each page).

Read in full:

- Factory Missions: https://docs.factory.com/missions/overview.md
- Planning & Validation: https://docs.factory.com/missions/planning.md
- Running in the CLI (Missions): https://docs.factory.com/missions/running-cli.md
- Running in the Factory App (Missions): https://docs.factory.com/missions/running-app.md
- Missions Configuration & Reference: https://docs.factory.com/missions/reference.md
- Interaction Modes (Spec Mode, Mission Mode): https://docs.factory.com/autonomy-and-safety/specification-mode.md
- Droid CLI: https://docs.factory.com/droid-cli/overview.md
- Droid CLI Quickstart: https://docs.factory.com/droid-cli/quickstart.md
- Factory App: https://docs.factory.com/factory-app/overview.md
- Delegations: https://docs.factory.com/delegations/index.md
- Linear (delegation): https://docs.factory.com/delegations/linear.md
- Software Factory: https://docs.factory.com/software-factory/overview.md
- Triage: https://docs.factory.com/software-factory/triage.md
- AutoWiki: https://docs.factory.com/software-factory/wiki/overview.md

Searched for planning terms, matching sections read (not read end to end):

- Jira (delegation): https://docs.factory.com/delegations/jira.md (delegate-an-issue and follow-up sections read)
- Slack (delegation): https://docs.factory.com/delegations/slack.md (code channels and commands sections read)
- Droid CLI Reference: https://docs.factory.com/droid-cli/cli-reference.md (exec flags, mission flags, modes and shortcuts)
- Droid Exec (Headless): https://docs.factory.com/droid-exec/overview.md (execution model, autonomy tiers, spec and mission flags)
- Custom droids (subagents): https://docs.factory.com/harness/subagents.md (Spec Mode and todo-tool behaviour)
- Skills: https://docs.factory.com/harness/skills.md (the create-skill command and how skills relate to missions)

## Ruled out (why)

Everything below is in the same index and was either fetched and found off-topic or judged off-topic from its title and
description.

- Triage (software-factory/triage) and Software Factory overview: read, but they cover routing and classifying inbound
  work and a coverage dashboard, not planning a change. Cited only for context; no grid cell depends on them.
- AutoWiki (software-factory/wiki/*, api-reference/wiki): read the overview; it is generated repo documentation, not a
  step the planner is documented to use. The Initialize, Browser, Automatic Refresh and API pages are setup detail.
- Custom Automations, CI Automations API, Incident Response, Release, Security Review, Automated QA, Droid Control, Local
  and Automated Code Review: validation, release and monitoring stages, not planning (verification is another lesson).
- Agent Readiness (4 pages incl. API) and Agent Effectiveness (4 pages): readiness scoring and usage analytics. Missions
  mentions a readiness level as a precondition, which is not a planning behavior.
- Microsoft Teams delegation: the index and delegations page describe it as in development; same shape as Slack.
- Droid Sessions API, Droid Python SDK, Droid TypeScript SDK, Factory API, Environments API, Droid Computers API,
  Organization Management API, Service Accounts API, Analytics API, Readiness Reports API, OpenAPI spec: programmatic
  surfaces with no planning content in their descriptions.
- Droid Computers, Cloud Templates, Environments (6 pages), Remote Control, OpenCompute, Factory Router, Custom Models
  (BYOK), Available Models: where and on what model work runs; model choice is out of scope for this grid.
- Autonomy Level, Permission rules, Droid Shield, Sandbox: what actions need approval while working, not approval of a
  plan. Autonomy Level appears only as it combines with Spec Mode, from the Interaction Modes page.
- AGENTS.md, Connectors, MCP, Hooks, Plugins, Custom Slash Commands, Output styles, Image generation, Settings, App
  settings, Worktrees in the Factory App, IDE Integrations: harness and configuration (standards files are out of scope).
- Enterprise section (about 20 pages: deployment, identity, privacy, security, audit, telemetry, personas, controls):
  administration and compliance.
- Welcome, Pricing (2 pages), Contact Support, Feature Maturity, Full Changelog, benchmark pages (Agent Arena, Legacy
  Bench, NextJS, Review Benchmark, Terminal Bench), Docs visual elements preview: marketing, billing, release history
  and benchmarks. The changelog was not searched for plan entries, so recent unreleased-to-docs behaviour may be missing.

## Depth dimensions

Added in the depth-reset pass. Twelve extra dimensions for each of the three surfaces above, with the same surface names.
Every page below was fetched again on **2026-10-20**: the docs index (https://docs.factory.com/llms.txt) first, then each
page as raw Markdown, read or searched for the dimension's terms. Nothing here changes the grid above. Names are
Factory's own. "Not documented" always names the pages checked. Where a page states an intention and not a mechanism
(for example "should not edit"), the entry says so and does not guess which one it is. The read-only row uses the
labels **Tool restriction** and **Instruction only**; where the docs name no mechanism the entry says that instead.

### Spec Mode (Droid CLI and Factory App, `--use-spec` for headless)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Partly. Droid may ask clarifying questions while it researches, and the person can keep iterating before approving. No separate interview step that questions the person first. Not documented as a distinct mode (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Assumptions or open questions surfaced | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). The docs only advise the person to state constraints and how to verify in the request. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Plan editable before approval | The person can reject the plan and keep iterating in Spec Mode. Editing the proposed plan text directly before approving: not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference). | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Where the plan is saved | Optional. With "Save spec as Markdown" on, an approved plan is written as `YYYY-MM-DD-slug.md`. The default folder is `.factory/docs` in the nearest project-level `.factory` directory, falling back to `~/.factory/docs`; a "Spec save directory" setting can point at a project folder, the home directory or any path. With the setting off, the page describes the plan only in the session. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Dependencies or ordering between steps | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). The page says only that the plan is "concrete" and shows no step graph. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Parallel split of independent work | Not documented for the plan itself (checked: Interaction Modes, Droid CLI Quickstart, Custom droids). Separately, subagents can run in the background in parallel, and when the parent is in Spec Mode they are limited to read-only work. | [Custom droids](https://docs.factory.com/harness/subagents.md), [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Re-plan after execution is blocked | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). The mode toggle works in both directions (Shift+Tab switches between Normal and Spec), but no page describes that as a re-plan step after a blocked implementation. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Droid CLI Reference](https://docs.factory.com/droid-cli/cli-reference.md) |
| Second-model plan critique | No critique step (checked: Interaction Modes, Droid Exec, Droid CLI Reference). A different model, and a different reasoning effort, can be chosen for the planning phase (`specModeModel`; `--spec-model` headless), but that is a model choice for writing the plan, not a second model reviewing it. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Droid Exec](https://docs.factory.com/droid-exec/overview.md) |
| Read-only enforcement | Which one is not stated for the main session. The page says Spec Mode "uses read-only planning behavior", says Droid "should not" edit files, commit, start services or write outside, and has Droid call an `ExitSpecMode` tool to ask for approval. Two places show a real restriction: subagents started from a Spec Mode session have edits and file creation disabled, and a custom droid cannot be given `ExitSpecMode`. Headless `droid exec` with no flags is described as allowing only read operations and blocking edits, installs and git writes, through its permission tiers. Label: **Tool restriction** for subagents; for the interactive main session the docs say what Droid should do and name no tool list, so no label is given (checked: Interaction Modes, Custom droids, Droid Exec). | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Custom droids](https://docs.factory.com/harness/subagents.md), [Droid Exec](https://docs.factory.com/droid-exec/overview.md) |
| Tracker or ticket output | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). The plan is shown in the session and optionally saved as a file. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Human-only step flag | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |
| Rollout or rollback section | Not documented (checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). The page's example request asks for tests and a link-expiry rule, not rollout or rollback. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md) |

### Missions (`/missions`, Mission Mode and Mission Control, headless `--mission`)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Yes, and it is the documented first step. The person starts with `/missions`, and Droid talks back and forth to learn the goal, asks clarifying questions and probes for constraints before any plan exists. The pages call it a conversation, not a one-shot prompt. | [Factory Missions](https://docs.factory.com/missions/overview.md), [Planning & Validation](https://docs.factory.com/missions/planning.md) |
| Assumptions or open questions surfaced | Not documented as a plan output (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). The only "open questions" on the overview page are the vendor's own research questions about Missions (parallelism, correctness, cost), not a list in the plan. | [Factory Missions](https://docs.factory.com/missions/overview.md) |
| Plan editable before approval | By conversation only: Droid "pushes back, asks questions and iterates" until the plan is solid. Direct editing of the plan before approval: not documented (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). | [Planning & Validation](https://docs.factory.com/missions/planning.md) |
| Where the plan is saved | Not documented as a file or path (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). The Factory App keeps past missions in a Mission Control tab and can resume one where it left off, which implies stored state, but no page says where. | [Running in the Factory App](https://docs.factory.com/missions/running-app.md) |
| Dependencies or ordering between steps | Ordering is part of what the plan fixes: the page lists "the features, the ordering, the milestones, the skills involved" as what to get right up front. A dependency graph between features, or how order is expressed: not documented (checked: Planning & Validation, Factory Missions, Missions Configuration & Reference). | [Planning & Validation](https://docs.factory.com/missions/planning.md) |
| Parallel split of independent work | Not documented as behaviour (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). The overview lists "is parallelization necessary?" as an open question the vendor is still testing, so no claim that features run side by side is made. | [Factory Missions](https://docs.factory.com/missions/overview.md) |
| Re-plan after execution is blocked | Yes. The person pauses the orchestrator and asks it to re-assess; it can re-plan around an obstacle, reorder features, adjust milestone scope, or take on a changed requirement and continue. The troubleshooting examples are written as prompts to type. Both the CLI and the app describe pausing and redirecting. | [Factory Missions](https://docs.factory.com/missions/overview.md), [Running in the CLI](https://docs.factory.com/missions/running-cli.md), [Running in the Factory App](https://docs.factory.com/missions/running-app.md) |
| Second-model plan critique | No plan critique (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). Models are set per role: orchestrator, workers and validators each get their own model and reasoning effort. Validators check built work at milestone ends, not the plan. | [Missions Configuration & Reference](https://docs.factory.com/missions/reference.md), [Planning & Validation](https://docs.factory.com/missions/planning.md) |
| Read-only enforcement | Not documented for the planning conversation (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference, Interaction Modes). The Interaction Modes page says Mission Mode is "not a planning toggle": starting a mission turns the session into an orchestrator workflow. Headless `--mission` needs `--auto high` or the skip-permissions flag, the opposite of read-only. | [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), [Droid Exec](https://docs.factory.com/droid-exec/overview.md) |
| Tracker or ticket output | Not documented as a plan output (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). Workers can use connected tools such as Linear, Sentry and Notion through the inherited configuration; no page says the plan is written to a tracker. | [Missions Configuration & Reference](https://docs.factory.com/missions/reference.md) |
| Human-only step flag | Not documented (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). The person's role is to pause, unblock and redirect, not a per-feature human-only mark. | [Running in the CLI](https://docs.factory.com/missions/running-cli.md) |
| Rollout or rollback section | Not documented (checked: Factory Missions, Planning & Validation, Running in the CLI, Running in the Factory App, Missions Configuration & Reference). The overview lists brownfield migration as a use and says existing behaviour should be preserved, with no rollback content. | [Factory Missions](https://docs.factory.com/missions/overview.md) |

### Delegations (Linear, Jira and Slack)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | No up-front interview. Droid takes the issue title, description, labels and comments as they stand, and docs tell the requester to make the issue self-contained. If Droid asks something mid-run, the reply goes in the same agent conversation (Jira), the same thread or code channel (Slack). A planning-time interview step: not documented (checked: Delegations, Linear, Jira, Slack). | [Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md), [Slack](https://docs.factory.com/delegations/slack.md) |
| Assumptions or open questions surfaced | Not documented (checked: Delegations, Linear, Jira, Slack). Questions Droid asks during the run are the nearest thing; no list of assumptions is described. | [Jira](https://docs.factory.com/delegations/jira.md), [Slack](https://docs.factory.com/delegations/slack.md) |
| Plan editable before approval | Not documented, because no plan is shown first (checked: Delegations, Linear, Jira, Slack). The person can send follow-up instructions in the issue or thread; in Jira only the person who started the delegation can. | [Jira](https://docs.factory.com/delegations/jira.md), [Delegations](https://docs.factory.com/delegations/index.md) |
| Where the plan is saved | No plan artifact (checked: Delegations, Linear, Jira, Slack). Progress and a final response appear in the agent session on the issue; Slack can move substantial work into a dedicated channel that shows the repository, branch and a diff. | [Linear](https://docs.factory.com/delegations/linear.md), [Slack](https://docs.factory.com/delegations/slack.md) |
| Dependencies or ordering between steps | Not documented (checked: Delegations, Linear, Jira, Slack). Jira's app can read linked issues as context; no page says ordering between issues is planned. | [Jira](https://docs.factory.com/delegations/jira.md) |
| Parallel split of independent work | Not documented as a split of one issue (checked: Delegations, Linear, Jira, Slack). The only parallelism mentioned is across sessions: an administrator can set a per-machine parallel worker limit, and more concurrent sessions share the same resources. | [Delegations](https://docs.factory.com/delegations/index.md) |
| Re-plan after execution is blocked | Not documented (checked: Delegations, Linear, Jira, Slack). Stopping or cancelling a run is possible and does not undo work done; follow-up messages can redirect the session. Neither is described as a re-plan. | [Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md) |
| Second-model plan critique | Not documented (checked: Delegations, Linear, Jira, Slack). The delegations page covers an independent human review of the pull request (two approvals for Factory-authored PRs), which comes after the work, not a critique of a plan. | [Delegations](https://docs.factory.com/delegations/index.md) |
| Read-only enforcement | Not documented (checked: Delegations, Linear, Jira, Slack). Delegated runs are meant to implement and test, with a pull request as the output, so they are not read-only. | [Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md), [Slack](https://docs.factory.com/delegations/slack.md) |
| Tracker or ticket output | The tracker is the input and the report surface, not a plan output. Factory attempts to move a backlog issue to a started state and attach the pull-request link; progress is posted in the issue's agent session. Creating sub-issues: not documented (checked: Delegations, Linear, Jira, Slack). | [Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md) |
| Human-only step flag | Not documented (checked: Delegations, Linear, Jira, Slack). Docs say delegation does not replace code review and that the person should review changes and test results before merging. | [Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md) |
| Rollout or rollback section | Not documented (checked: Delegations, Linear, Jira, Slack). | [Linear](https://docs.factory.com/delegations/linear.md), [Jira](https://docs.factory.com/delegations/jira.md) |

### Depth pass: pages read (fetched 2026-10-20)

Read in full:

- Interaction Modes: https://docs.factory.com/autonomy-and-safety/specification-mode.md
- Factory Missions: https://docs.factory.com/missions/overview.md
- Planning & Validation: https://docs.factory.com/missions/planning.md
- Running in the CLI (Missions): https://docs.factory.com/missions/running-cli.md
- Running in the Factory App (Missions): https://docs.factory.com/missions/running-app.md
- Missions Configuration & Reference: https://docs.factory.com/missions/reference.md

Searched for the dimensions' terms, matching sections read (not read end to end):

- Delegations: https://docs.factory.com/delegations/index.md (what each app does, follow-ups, review gate, troubleshooting)
- Linear (delegation): https://docs.factory.com/delegations/linear.md
- Jira (delegation): https://docs.factory.com/delegations/jira.md
- Slack (delegation): https://docs.factory.com/delegations/slack.md (code channels, commands)
- Custom droids (subagents): https://docs.factory.com/harness/subagents.md (tools, foreground and background, autonomy and Spec Mode)
- Droid Exec (Headless): https://docs.factory.com/droid-exec/overview.md (default autonomy, spec and mission flags)
- Droid CLI Reference: https://docs.factory.com/droid-cli/cli-reference.md (spec flags, mode toggle)
- Droid CLI Quickstart: https://docs.factory.com/droid-cli/quickstart.md
- Droid CLI: https://docs.factory.com/droid-cli/overview.md

### Depth pass: ruled out (why)

- Microsoft Teams delegation (https://docs.factory.com/delegations/microsoft-teams.md): not fetched in this pass; the index and delegations page describe it as in development, and it uses the same mention-based shape as Slack.
- Droid Sessions API (https://docs.factory.com/api-reference/sessions.md): not fetched; a programmatic surface for driving sessions, with no planning content in its index description.
- The other index entries listed under "Ruled out (why)" above were not re-opened in this pass; their reasons come from the earlier pass and nothing in the pages above contradicted them.
