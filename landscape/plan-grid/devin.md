# Devin: lesson 2 plan grid (spec to plan)

Scope: lesson 2 only, the step where a spec or request becomes a plan. Left out on purpose: test and verification planning
(verification lesson), how specs are written (intake lesson), standards files, estimates and model tiers, and bundling or
PR shaping. Every filled field is a paraphrase of a first-party page, with its URL and the date I fetched it
(**2026-10-19**). Nothing here is carried over from the 2026-10-13 notes in `lessons/README.md` or
`landscape/field-grid/devin.md`; every page below was fetched again.

"Approval before work starts" uses exactly one of **Human**, **Human approves** or **Automated**, and only where a page
states it. Where a page does not, the cell says `not documented` and names the index pages checked. Names are Devin's own,
not canonical. Several surfaces are used because no single one covers every column; each row names its surface, and a cell
that depends on what the person types into the prompt says so.

Method: fetched the docs index (https://docs.devin.ai/llms.txt, 2026-10-19), listed every Cloud, CLI and use-case page that
could touch planning, design before coding, code exploration, plan review or approval, and turning a plan into tasks, then
read those pages in full (the CLI changelog and the 2026 release notes were searched for plan entries, not read end to end).
The pages are under "Pages read"; the rest are under "Ruled out (why)".

## The grid

| Surface | READS THE CODE BEFORE PROPOSING | DESIGN OUTPUT AND ITS FORM | NAMES REUSE, RISKS OR BREAKING CHANGES | APPROVAL BEFORE WORK STARTS | HOW IT BECOMES TASKS |
| --- | --- | --- | --- | --- | --- |
| **Ask Devin** (cloud app, Ask mode, with DeepWiki) | Yes. Answers come from code search over a repository that has been indexed, and cite the code they used. Repos in Devin's environment are indexed automatically; others are added in settings. Ask mode does not change code. ([Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin.md), [Index a Repository](https://docs.devin.ai/onboard-devin/index-repo.md), [Your First Session](https://docs.devin.ai/get-started/first-run.md), 2026-10-23) | A conversation, ending in a prompt that Devin drafts from what it learned and hands to a build session. The docs call the result a scoped plan. A gallery walkthrough also says you can ask it to outline the implementation approach. No fixed design template is shown. ([Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin.md), [Your First Session](https://docs.devin.ai/get-started/first-run.md), [Investigate a codebase](https://docs.devin.ai/use-cases/gallery/investigate-codebase-ask-devin.md), 2026-10-23) | Only if the person asks. The gallery walkthrough asks about existing retry helpers and other callers of the code being changed, and gets file and function answers. No page makes reuse, risk or breaking-change notes a built-in part of Ask mode. Not documented as a built-in step (checked: Ask Devin, Your First Session, DeepWiki, When to Use Devin, SDLC page). ([Investigate a codebase](https://docs.devin.ai/use-cases/gallery/investigate-codebase-ask-devin.md), 2026-10-23) | **Human**. The person decides when to start the build session from the conversation (the Send to Devin button, or Option+Enter in the walkthrough). No page describes a review gate on the drafted prompt. ([Your First Session](https://docs.devin.ai/get-started/first-run.md), [Investigate a codebase](https://docs.devin.ai/use-cases/gallery/investigate-codebase-ask-devin.md), 2026-10-23) | One session, with the drafted prompt as its brief; the session's status shows back in the conversation. Ask mode is described as breaking the work down in conversation, but no task records are created. For big work the guidance is several focused sessions (see the managed-sessions row). ([Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin.md), [When to Use Devin](https://docs.devin.ai/essential-guidelines/when-to-use-devin.md), 2026-10-23) |
| **Devin CLI, Plan mode** (terminal) | Yes, by tool set. Plan mode's profile has only read-only tools (grep, glob, read, a todo tool, a question tool and an exit-plan tool). Changelog entries add read-only web fetch, web search and read-only MCP tools for research. ([Commands & Flags](https://docs.devin.ai/cli/reference/commands.md), [Changelog (Stable)](https://docs.devin.ai/cli/changelog/stable.md), 2026-10-23) | A plan written to a file, which always opens with a heading and a summary paragraph. The mode page says the agent proposes changes without making them. Anything past the heading and summary: not documented (checked: Commands & Flags, Essential Commands, Changelog (Stable)). ([Changelog (Stable)](https://docs.devin.ai/cli/changelog/stable.md), [Commands & Flags](https://docs.devin.ai/cli/reference/commands.md), 2026-10-23) | Not documented (checked: Commands & Flags, Essential Commands, Changelog (Stable)). One related entry: a "megaplan" keyword makes the agent plan more thoroughly and ask at least one clarifying question before writing the plan. ([Changelog (Stable)](https://docs.devin.ai/cli/changelog/stable.md), 2026-10-23) | **Human approves**. Leaving Plan mode shows an approval prompt with three choices: implement and accept edits, implement and bypass permissions, or "plan needs changes". ([Changelog (Stable)](https://docs.devin.ai/cli/changelog/stable.md), 2026-10-23) | Not documented (checked: Commands & Flags, Essential Commands, Changelog (Stable), Subagents). The plan profile includes a todo tool, but no page says the plan is split into tasks or stored anywhere but the plan file. ([Commands & Flags](https://docs.devin.ai/cli/reference/commands.md), 2026-10-23) |
| **Ticket planning in Linear** (the `!plan` playbook, bulk use), plus Jira | Yes, in the gallery example. For each ticket Devin finds the relevant files and modules in the codebase. What the `!plan` playbook itself says is held in the app and is not on the docs pages; the gallery page only says it analyses and comments without writing code. ([Bulk-Plan Your Ticket Backlog](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), [Linear](https://docs.devin.ai/integrations/linear.md), 2026-10-23) | A comment on each ticket with four parts: a red, yellow or green confidence mark, the relevant files and modules, a step-by-step plan, and open questions for a person. The playbook can be copied and its output format changed. Separately, Devin's todo list syncs into Linear's plan view while it works. ([Bulk-Plan Your Ticket Backlog](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), [Linear](https://docs.devin.ai/integrations/linear.md), 2026-10-23) | Partly. The confidence mark and open questions are the risk signal: yellow means Devin has questions for a person, red means better given to a human. Example output also notes existing code to follow and call-site counts. No page says the playbook must name reuse or breaking changes. For Jira, the page says only that Devin plans the work, writes the code and opens a PR, with no separate planning output (checked: Jira). ([Bulk-Plan Your Ticket Backlog](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), [Jira](https://docs.devin.ai/integrations/jira.md), 2026-10-23) | **Human** to start (assign the ticket, add a label, or @mention), or **Automated** when a Linear automation fires on team, label or status. After planning, a green comment carries a link that starts a build session, so the follow-on step is also a person's click; the page notes labels could chain a second automated session. No page describes an approval gate on the plan. ([Linear](https://docs.devin.ai/integrations/linear.md), [Bulk-Plan Your Ticket Backlog](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), 2026-10-23) | The ticket is the task; the plan is a comment on it. Many tickets are planned in parallel from a multi-select or an automation. Splitting one ticket into several is not described. ([Bulk-Plan Your Ticket Backlog](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), 2026-10-23) |
| **Spec-first build session** (cloud agent, plan requested in the prompt) | Yes, as the prompt asks. The gallery's spec example has Devin explore the codebase for matching patterns; the Ask-mode investigation is suggested first. The planning itself is a prompt instruction, not a product setting. ([Implement a feature from a spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md), [Prompt Templates](https://docs.devin.ai/essential-guidelines/prompt-templates-cheat-sheet.md), 2026-10-23) | Whatever the prompt requests. The spec example asks for an outline listing files to create or change, database changes and the order of work. A cheat-sheet template says "propose an approach before implementing". Form is free text. ([Implement a feature from a spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md), [Prompt Templates](https://docs.devin.ai/essential-guidelines/prompt-templates-cheat-sheet.md), 2026-10-23) | Only as the prompt asks. The instructing guide advises naming existing patterns and files to follow, and says unspecified design choices lead to results that miss the need. Breaking changes and consumers: not documented (checked: Instructing Devin Effectively, Good vs. Bad Instructions, Prompt Templates, Implement a feature from a spec). ([Instructing Devin Effectively](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md), 2026-10-23) | **Human approves**, but only because the example prompt tells Devin to share its plan for approval before writing code. It is a prompt convention, not a documented product gate. ([Implement a feature from a spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md), 2026-10-23) | Not split. The same session builds from the approved outline in order. Advice elsewhere is to keep sessions to three hours of human effort or less and split bigger work. ([Implement a feature from a spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md), [When to Use Devin](https://docs.devin.ai/essential-guidelines/when-to-use-devin.md), 2026-10-23) |
| **Managed sessions** (a coordinator session splitting large work) | Yes, as the prompt asks. The migration walkthrough first uses Ask mode to find which files use the old client, group them by area and flag shared state, then tells the coordinator to analyse the dependency graph. ([Migrate 50 Files](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), [Advanced Capabilities](https://docs.devin.ai/work-with-devin/advanced-capabilities.md), 2026-10-23) | A proposed list of work packages: each group with its file list, plus notes on which group must go first because of a dependency. Shown in chat as text. ([Migrate 50 Files](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), 2026-10-23) | Yes, for coupling. Shared state and cross-group imports are flagged and drive ordering (the example puts auth before admin). Reuse and breaking changes for outside consumers: not documented (checked: Migrate 50 Files, Advanced Capabilities, Dynamic Workflows, Best Practices). ([Migrate 50 Files](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), 2026-10-23) | **Human approves** in the walkthrough, because its prompt says to show the grouping for approval first. By default the coordinator starts child sessions without asking; turning off the "Auto-approve child sessions" preference makes it ask before each batch, so the default is **Automated**. Dynamic workflows likewise run without asking unless "Auto-approve workflows" is turned off. ([Migrate 50 Files](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), [Advanced Capabilities](https://docs.devin.ai/work-with-devin/advanced-capabilities.md), [Dynamic Workflows](https://docs.devin.ai/work-with-devin/dynamic-workflows.md), 2026-10-23) | One child session per work package, each on its own machine, each opening its own PR; the coordinator monitors them and can message them. In the example, the dependent package starts after the one it needs merges. ([Advanced Capabilities](https://docs.devin.ai/work-with-devin/advanced-capabilities.md), [Migrate 50 Files](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), 2026-10-23) |
| **PRD to tickets** (gallery recipe: Notion document in, Linear tickets out) | Yes, as the prompt asks. Devin reads the document through a Notion connector, then searches the codebase to map the architecture before cutting work. ([PRD to Sprint Tickets](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), 2026-10-23) | One Linear ticket per independent work package, each with a description, acceptance criteria and the files likely to change, ordered by suggested sequence, plus a summary table in chat. ([PRD to Sprint Tickets](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), 2026-10-23) | Dependencies between tickets are named. Reuse, risks and breaking changes: not documented (checked: PRD to Sprint Tickets, Linear, Bulk-Plan Your Ticket Backlog). ([PRD to Sprint Tickets](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), 2026-10-23) | **Human** reviews the tickets after they exist and then assigns Devin or adds an implement label. The page does not show an approval before the tickets are written. ([PRD to Sprint Tickets](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), 2026-10-23) | Tickets in Linear are the tasks, carrying acceptance criteria and dependencies. A person can ask Devin to split a broad ticket; each ticket is later started by assignment or an implement label. ([PRD to Sprint Tickets](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), [Linear](https://docs.devin.ai/integrations/linear.md), 2026-10-23) |

## Depth dimensions

Added in the depth-reset pass. Twelve extra dimensions for each of the six surfaces above, with the same surface names.
Every page below was fetched again on **2026-10-20** (the docs index https://docs.devin.ai/llms.txt first, then each page
as raw Markdown and searched for the dimension's terms; the small gallery and integration pages were read through). A
"not documented" entry names the pages checked. Nothing here changes the grid above. Names are Devin's own. Where a
dimension is a prompt convention and not a product behaviour, the entry says so.

Source short names, all under https://docs.devin.ai and all re-fetched 2026-10-23: Ask Devin `/work-with-devin/ask-devin.md`;
First Session `/get-started/first-run.md`; Investigate `/use-cases/gallery/investigate-codebase-ask-devin.md`; Commands
`/cli/reference/commands.md`; Changelog `/cli/changelog/stable.md`; Essential `/cli/essential-commands.md`; Subagents
`/cli/subagents.md`; Linear `/integrations/linear.md`; Bulk-Plan `/use-cases/gallery/bulk-plan-backlog.md`; PRD `/use-cases/gallery/prd-to-tickets.md`;
Spec `/use-cases/gallery/implement-feature-from-spec.md`; Migrate `/use-cases/gallery/parallelize-migration.md`; Advanced
`/work-with-devin/advanced-capabilities.md`.

### Ask Devin (cloud app, Ask mode, with DeepWiki)

| Dimension | What the docs say | Sources (re-fetched 2026-10-23) |
| --- | --- | --- |
| Clarify or interview mode | Conversational: the person asks, Devin answers with code citations, and the person clarifies their goal before starting a session. No separate interview mode where Devin questions the person first. Not documented (checked: Ask Devin, First Session, Investigate). | [Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin.md), [First Session](https://docs.devin.ai/get-started/first-run.md) |
| Assumptions or open questions surfaced | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |
| Plan editable before approval | The person can type their own implementation prompt before launching the build session. Editing Devin's drafted prompt: not documented (checked: Ask Devin, First Session, Investigate). | [Investigate](https://docs.devin.ai/use-cases/gallery/investigate-codebase-ask-devin.md) |
| Where the plan is saved | In the Ask Devin conversation; the build session's status shows back in it. A plan file or other store: not documented (checked: Ask Devin, First Session). | [Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin.md) |
| Dependencies or ordering between steps | Not documented as a built-in output (checked: Ask Devin, First Session, Investigate). | same pages |
| Parallel split of independent work | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |
| Re-plan after execution is blocked | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |
| Second-model plan critique | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |
| Read-only enforcement | Stated as an outcome: the mode explores and plans "without making changes to the actual code". Whether that is a tool restriction or an instruction: not documented (checked: Ask Devin, First Session). | [First Session](https://docs.devin.ai/get-started/first-run.md) |
| Tracker or ticket output | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |
| Human-only step flag | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |
| Rollout or rollback section | Not documented (checked: Ask Devin, First Session, Investigate). | same pages |

### Devin CLI, Plan mode (terminal)

| Dimension | What the docs say | Sources (re-fetched 2026-10-23) |
| --- | --- | --- |
| Clarify or interview mode | The plan profile carries a question tool. A changelog entry says a keyword such as `megaplan` makes the agent plan more widely and always ask at least one clarifying question before writing. | [Commands](https://docs.devin.ai/cli/reference/commands.md), [Changelog](https://docs.devin.ai/cli/changelog/stable.md) |
| Assumptions or open questions surfaced | Not documented as an output (checked: Commands, Essential, Changelog). | same pages |
| Plan editable before approval | The exit prompt offers "No, plan needs changes", which sends it back for revision. Editing the plan file directly before approving: not documented (checked: Commands, Essential, Changelog). | [Changelog](https://docs.devin.ai/cli/changelog/stable.md) |
| Where the plan is saved | Written to a file that always has a heading and a summary paragraph; the session's plan files are exempt from the sensitive-path prompt. The path: not documented (checked: Commands, Essential, Changelog). On exit a plan can be handed to a cloud session. | [Changelog](https://docs.devin.ai/cli/changelog/stable.md) |
| Dependencies or ordering between steps | Not documented (checked: Commands, Essential, Changelog, Subagents). | same pages |
| Parallel split of independent work | Not documented for plans. The plan profile's tool list has no subagent tool, and the subagents page says nothing about plan mode (checked: Commands, Subagents). Subagents themselves can run in the background in parallel. | [Commands](https://docs.devin.ai/cli/reference/commands.md), [Subagents](https://docs.devin.ai/cli/subagents.md) |
| Re-plan after execution is blocked | Not documented. The mode can be switched back with `/plan` at any time, and resuming a session restores the mode; neither is described as a re-plan step (checked: Commands, Essential, Changelog). | [Commands](https://docs.devin.ai/cli/reference/commands.md), [Changelog](https://docs.devin.ai/cli/changelog/stable.md) |
| Second-model plan critique | Not documented for plans (checked: Commands, Changelog, Subagents). The subagents page shows a custom reviewer profile for code changes that the person must write. | [Subagents](https://docs.devin.ai/cli/subagents.md) |
| Read-only enforcement | **Tool restriction.** The plan profile is defined by a list of read-only tools (grep, glob, read, todo, question, exit-plan); later entries add read-only web fetch, web search and read-only MCP tools. | [Commands](https://docs.devin.ai/cli/reference/commands.md), [Changelog](https://docs.devin.ai/cli/changelog/stable.md) |
| Tracker or ticket output | Not documented (checked: Commands, Essential, Changelog). | same pages |
| Human-only step flag | Not documented (checked: Commands, Essential, Changelog). | same pages |
| Rollout or rollback section | Not documented (checked: Commands, Essential, Changelog). | same pages |

### Ticket planning in Linear (the `!plan` playbook, bulk use), plus Jira

| Dimension | What the docs say | Sources (re-fetched 2026-10-23) |
| --- | --- | --- |
| Clarify or interview mode | No live interview. Devin leaves questions in its ticket comment and, for yellow tickets, the person answers in the ticket thread and Devin re-evaluates. | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Assumptions or open questions surfaced | Yes: each comment lists open questions that need a human answer; the example flags a missing rollback decision. | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Plan editable before approval | Not documented (checked: Bulk-Plan, Linear). Follow-up messages in the ticket's agent thread are supported. | [Linear](https://docs.devin.ai/integrations/linear.md) |
| Where the plan is saved | A comment on the ticket; the working todo list also syncs to Linear's plan view. | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), [Linear](https://docs.devin.ai/integrations/linear.md) |
| Dependencies or ordering between steps | Not documented (checked: Bulk-Plan, Linear). The example notes call-site counts, not an order. | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Parallel split of independent work | Many tickets are scoped in parallel. Splitting one ticket into parallel parts: not documented (checked: Bulk-Plan, Linear). | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Re-plan after execution is blocked | Re-evaluation happens before work, after questions are answered. After a blocked build: not documented (checked: Bulk-Plan, Linear). | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Second-model plan critique | Not documented (checked: Bulk-Plan, Linear). | same pages |
| Read-only enforcement | **Instruction only.** The `!plan` playbook is described as telling Devin to analyze and comment without writing code. | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Tracker or ticket output | The tracker is the output: a structured comment on each ticket. A playbook can also have Devin set labels from its findings. New sub-tickets: not documented (checked: Bulk-Plan, Linear). | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md), [Linear](https://docs.devin.ai/integrations/linear.md) |
| Human-only step flag | Yes: a red mark means the ticket is best given to a human engineer; Devin's analysis still comes with it. | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |
| Rollout or rollback section | No such section in the documented comment format. Rollback appears only as an example open question (checked: Bulk-Plan, Linear). | [Bulk-Plan](https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md) |

### Spec-first build session (cloud agent, plan requested in the prompt)

| Dimension | What the docs say | Sources (re-fetched 2026-10-23) |
| --- | --- | --- |
| Clarify or interview mode | Not a product mode. The page suggests an optional Ask Devin scoping step first. Not documented as a built-in interview (checked: Spec, First Session). | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Assumptions or open questions surfaced | Not documented (checked: Spec, First Session). | same pages |
| Plan editable before approval | The example prompt has Devin share its plan in chat for approval before code. A revise step is not shown (checked: Spec). | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Where the plan is saved | In the session conversation; no file or store is described (checked: Spec). | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Dependencies or ordering between steps | The prompt asks for the order of implementation. No dependency graph is documented (checked: Spec). | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Parallel split of independent work | Not documented; one session builds everything (checked: Spec, First Session). | same pages |
| Re-plan after execution is blocked | Not documented (checked: Spec, First Session). | same pages |
| Second-model plan critique | Not documented for the plan. A separate Devin Review pass is suggested after the PR exists. | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Read-only enforcement | **Instruction only.** "Before writing any code" sits in the prompt; the page describes no tool restriction. | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Tracker or ticket output | Not documented; the spec may come from a ticket but the output is a PR (checked: Spec). | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |
| Human-only step flag | Not documented (checked: Spec, First Session). | same pages |
| Rollout or rollback section | Not documented. The prompt asks the plan to list database changes; no rollout, flag or rollback content (checked: Spec). | [Spec](https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md) |

### Managed sessions (a coordinator session splitting large work)

| Dimension | What the docs say | Sources (re-fetched 2026-10-23) |
| --- | --- | --- |
| Clarify or interview mode | No interview. An Ask Devin scoping step comes first, and a running child session can ask for input, which wakes the coordinator. | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), [Advanced](https://docs.devin.ai/work-with-devin/advanced-capabilities.md) |
| Assumptions or open questions surfaced | Not documented as an output. Coupling between groups is flagged, which is a finding, not an open question (checked: Migrate, Advanced). | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |
| Plan editable before approval | The grouping is shown with a start prompt and can be approved. A change step beyond yes or no: not documented (checked: Migrate, Advanced). | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |
| Where the plan is saved | Shown in the coordinator session's chat; no persisted plan is described (checked: Migrate, Advanced). | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |
| Dependencies or ordering between steps | Yes: the example marks one group "migrate first" and another as depending on it, and starts the second after the first's PR merges. | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |
| Parallel split of independent work | Yes: independent groups each get a child session on its own machine and its own PR. | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md), [Advanced](https://docs.devin.ai/work-with-devin/advanced-capabilities.md) |
| Re-plan after execution is blocked | Not documented as a re-plan. The coordinator can message children, put stuck ones to sleep or end them (checked: Migrate, Advanced). | [Advanced](https://docs.devin.ai/work-with-devin/advanced-capabilities.md) |
| Second-model plan critique | Not documented (checked: Migrate, Advanced). | same pages |
| Read-only enforcement | No read-only phase. The pre-launch gate is the "Auto-approve child sessions" preference, which is on by default; the example's approval ask is a prompt instruction. | [Advanced](https://docs.devin.ai/work-with-devin/advanced-capabilities.md), [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |
| Tracker or ticket output | PRs, one per child. Tickets: not documented (checked: Migrate, Advanced). | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |
| Human-only step flag | Not documented (checked: Migrate, Advanced). | same pages |
| Rollout or rollback section | Not a plan section. The walkthrough says merge the first group first and run full CI after each merge; rollback is not documented (checked: Migrate, Advanced). | [Migrate](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md) |

### PRD to tickets (gallery recipe: Notion document in, Linear tickets out)

| Dimension | What the docs say | Sources (re-fetched 2026-10-23) |
| --- | --- | --- |
| Clarify or interview mode | None. The person gives the ticket format and conventions up front in the prompt (checked: PRD, Linear). | [PRD](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md) |
| Assumptions or open questions surfaced | Not documented (checked: PRD, Linear). | same pages |
| Plan editable before approval | The tickets are reviewed after they are created, and a broad one can be sent back to be split. No approval before they exist. | [PRD](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md) |
| Where the plan is saved | As Linear tickets in a named project, plus a summary table posted in chat. | [PRD](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md) |
| Dependencies or ordering between steps | Yes: tickets are ordered by suggested sequence and carry a dependencies column. | [PRD](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md) |
| Parallel split of independent work | Work is cut into independent packages, several with no dependency. Running them at the same time is not stated (checked: PRD, Linear). | [PRD](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md) |
| Re-plan after execution is blocked | Not documented (checked: PRD, Linear). | same pages |
| Second-model plan critique | Not documented (checked: PRD, Linear). | same pages |
| Read-only enforcement | Not documented; the recipe writes tickets and reads the codebase (checked: PRD, Linear). | same pages |
| Tracker or ticket output | Yes: one ticket per work package, with description, acceptance criteria, a size and likely files. | [PRD](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md) |
| Human-only step flag | Not documented (checked: PRD, Linear). | same pages |
| Rollout or rollback section | Not documented (checked: PRD, Linear). | same pages |

## Pages read

Fetched 2026-10-19 from the docs index at https://docs.devin.ai/llms.txt and read in full unless noted.

- Ask Devin: https://docs.devin.ai/work-with-devin/ask-devin.md
- Your First Session: https://docs.devin.ai/get-started/first-run.md
- Index a Repository: https://docs.devin.ai/onboard-devin/index-repo.md
- DeepWiki repository wikis: https://docs.devin.ai/work-with-devin/deepwiki.md (read to the end of the effort-level section; the rest covers the wiki config file and public wikis)
- When to Use Devin: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md
- How does Devin fit into my existing SDLC?: https://docs.devin.ai/essential-guidelines/sdlc-integration.md
- Instructing Devin Effectively: https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md (first half read closely, rest skimmed)
- Prompt Templates Cheat Sheet: https://docs.devin.ai/essential-guidelines/prompt-templates-cheat-sheet.md (headings and the planning-related templates)
- Linear: https://docs.devin.ai/integrations/linear.md
- Devin Jira integration: https://docs.devin.ai/integrations/jira.md (setup and trigger sections; the end of the page is requirements and billing)
- Advanced Capabilities: https://docs.devin.ai/work-with-devin/advanced-capabilities.md
- Devin Dynamic Workflows: https://docs.devin.ai/work-with-devin/dynamic-workflows.md (through "How a run works"; the authoring model after that is script detail)
- Auto-triage: https://docs.devin.ai/product-guides/auto-triage.md
- Gallery index: https://docs.devin.ai/use-cases/gallery/index.md (searched for planning-related entries, which led to the gallery pages below)
- Gallery, Investigate a codebase with Ask Devin: https://docs.devin.ai/use-cases/gallery/investigate-codebase-ask-devin.md
- Gallery, Bulk-Plan Your Ticket Backlog: https://docs.devin.ai/use-cases/gallery/bulk-plan-backlog.md
- Gallery, PRD to Sprint Tickets: https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md
- Gallery, Migrate 50 Files from REST to GraphQL: https://docs.devin.ai/use-cases/gallery/parallelize-migration.md
- Gallery, Implement a feature from a spec: https://docs.devin.ai/use-cases/gallery/implement-feature-from-spec.md
- Gallery, Sync a playbook to a Linear label: https://docs.devin.ai/use-cases/gallery/custom-playbook-linear-macro.md
- Clear Engineering Backlogs: https://docs.devin.ai/use-cases/examples/clear-engineering-backlogs.md
- Best Practices (use cases): https://docs.devin.ai/use-cases/best-practices.md
- Stacked PRs: https://docs.devin.ai/work-with-devin/stacked-prs.md
- Devin CLI, Essential Commands: https://docs.devin.ai/cli/essential-commands.md
- Devin CLI, Commands & Flags: https://docs.devin.ai/cli/reference/commands.md (modes and profiles sections in full, rest skimmed)
- Devin CLI, Changelog (Stable): https://docs.devin.ai/cli/changelog/stable.md (searched for plan entries; entry versions and dates were not captured)
- Release notes 2026: https://docs.devin.ai/release-notes/2026.md (searched for plan entries only)

Re-fetched 2026-10-20 for the depth dimensions (raw Markdown, searched for the dimension terms; the pages marked "read" were read through):

- Ask Devin (read); First Session and Investigate a codebase (searched for plan, prompt, edit and read-only terms): same URLs as above.
- Linear, Bulk-Plan Your Ticket Backlog, PRD to Sprint Tickets (read): same URLs as above.
- Migrate 50 Files, Implement a feature from a spec (read): same URLs as above.
- Advanced Capabilities (read to the end of the managed-sessions section): same URL as above.
- Devin CLI Commands & Flags, Essential Commands, Changelog (Stable) (searched for plan, question, approval, read-only and file terms): same URLs as above.
- Devin CLI Subagents (searched for plan, parallel, background, reviewer, read-only): https://docs.devin.ai/cli/subagents.md
- Devin CLI permissions (searched for plan): https://docs.devin.ai/cli/reference/permissions.md

## Ruled out (why)

Pages from the same index that I set aside for this lesson. Each reason comes from the page's index description, plus a keyword search for plan, approve and scope on the pages I also fetched (playbooks, skills, memory, knowledge, AGENTS.md, slash commands, session tools, handoff, subagents, GitHub, Devin Review, migration, Java upgrades, Good vs. Bad Instructions). Those were searched or skimmed, not read end to end. Testing & Video Recordings, Automations, Scheduled Sessions and Devin Oncall were ruled out on their index descriptions without being opened, so nothing in the grid relies on them.

- Creating Playbooks (https://docs.devin.ai/product-guides/creating-playbooks.md) and Using Playbooks (https://docs.devin.ai/product-guides/using-playbooks.md): how to author and attach a prompt template. Useful for the `!plan` label but they say nothing about what a plan contains.
- Skills (https://docs.devin.ai/product-guides/skills.md), Knowledge Onboarding (https://docs.devin.ai/onboard-devin/knowledge-onboarding.md), AGENTS.md files (https://docs.devin.ai/onboard-devin/agents-md.md), Memory (https://docs.devin.ai/product-guides/memory.md): standards and instruction files, owned by a later lesson.
- Devin Review (https://docs.devin.ai/work-with-devin/devin-review.md): reviews pull requests after code exists, not plans.
- Testing & Video Recordings (https://docs.devin.ai/work-with-devin/testing-and-recordings.md), Good vs. Bad Instructions (https://docs.devin.ai/essential-guidelines/good-vs-bad-instructions.md): test and verification planning, and prompt-writing style, are out of scope for this lesson. The Good vs. Bad page was only checked for planning advice and added nothing.
- Automations (https://docs.devin.ai/product-guides/automations.md), Scheduled Sessions (https://docs.devin.ai/product-guides/scheduled-sessions.md), Devin Oncall (https://docs.devin.ai/product-guides/devin-oncall.md): triggers for recurring work; the planning-relevant trigger behaviour is covered by the Linear and Jira pages.
- Auto-triage (above, read): bug-report triage from Slack, not turning a spec into a plan, and marked legacy on the page.
- Slash Commands (https://docs.devin.ai/work-with-devin/slash-commands.md), Devin Session Tools (https://docs.devin.ai/work-with-devin/devin-session-tools.md): prompt shortcuts and browser tooling, no planning content.
- Hand off to Devin Cloud (https://docs.devin.ai/work-with-devin/devin-handoff.md), Devin CLI handoff and cloud pages (https://docs.devin.ai/cli/handoff.md, https://docs.devin.ai/cli/cloud.md): moving work between local and cloud, no plan step.
- Devin CLI Subagents (https://docs.devin.ai/cli/subagents.md): delegation inside a CLI session; no planning or approval content.
- Devin GitHub integration (https://docs.devin.ai/integrations/gh.md): PR comments and permissions; not a plan surface.
- Migration & Modernization (https://docs.devin.ai/use-cases/migration-modernization.md) and Java Upgrades (https://docs.devin.ai/use-cases/examples/java-upgrades.md): use-case descriptions with no planning-specific content beyond what the parallel-migration walkthrough covers.
- Stacked PRs (above, read): splits finished work into ordered pull requests. That is bundling and PR shaping, which another lesson owns, so it is not used in the grid.
- Estimates and sizes: the PRD-to-tickets and migration walkthroughs include size or complexity estimates; those are left out here on purpose.
- Enterprise, Federal, Billing, Admin, API and Desktop sections of the index, all non-English indexes, and the Outposts pages: administration, deployment, pricing and translations of the pages above, not planning behaviour.
- Depth pass, 2026-10-20: Devin Jira integration (https://docs.devin.ai/integrations/jira.md) was fetched but not re-read for the depth dimensions; the Linear and Bulk-Plan pages carry the ticket-planning entries, so Jira cells say nothing beyond the earlier row. Dynamic Workflows (https://docs.devin.ai/work-with-devin/dynamic-workflows.md) and Devin Review were not re-read; no depth entry relies on them.
