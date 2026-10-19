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
