# Options: how the field plans

Names are not canonical. Every claim below is a paraphrase of a first-party page, taken from the lesson 2 plan grid
([`landscape/plan-grid/`](../../landscape/plan-grid/README.md)) and from [`landscape/matrix.json`](../../landscape/matrix.json)
(rendered in [landscape/README.md](../../landscape/README.md)). Each claim carries its source URL and the date that page was
fetched. Re-check before filming. These appear on slides only; the lesson does not run other products live.

Scope is the lesson 2 step only: a request becomes a plan. Test and verification planning, how specs are written, standards
files, estimates, model tiers, and bundling or PR shaping are left out on purpose (see [brief.md](brief.md)).

## How the field differs

One table per dimension of the plan grid: the five original columns, then one for each depth dimension that
matches a Tier A step of the lesson (asking first, assumptions, changing the plan, where it is saved, ordering, person-only
tasks). The five original tables carry the 2026-10-19 date; the depth tables were fetched on 2026-10-20. In each cell the bold text names the surface the claim is about, because most products
have several (a plan mode, a ticket flow, a coordinator), then a paraphrase of the first-party page, the source URL and the
as-of date. The surface shown is the one closest to the sample's flow: read the code, write a design, wait for approval, then
slice. A cell reads "not in their docs" when the pages checked do not say, and lists the pages checked. The last row of each
table is the target for this lesson's sample. It comes from the [brief](brief.md) and is our own design, not a claim about
anyone else. Task-queue products (Linear, Jira, GitHub Issues) are not compared here; they are where a queue lives, not a
planner.

### Reads the code before proposing

| Product | Reads the code before it proposes |
|---|---|
| Devin | **Devin CLI, Plan mode**: The mode has only read-only tools (search, read, a todo tool, a question tool and an exit-plan tool), so it can look at the code but not change it. Later changelog entries add read-only web and MCP tools for research. ([source](https://docs.devin.ai/cli/reference/commands.md), [changelog](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-19) |
| Factory (Droid) | **Spec Mode**: The mode is read-only. Droid searches the repo, reads files, inspects linked artifacts and asks clarifying questions, and must not edit files, change config, commit, start services or write to outside systems until the plan is approved. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-19) |
| GitHub Copilot | **Plan mode in the IDE**: The plan agent researches with read-only tools and codebase analysis to find requirements and constraints, and makes no code change until the plan is approved. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-19) |
| OpenHands | **Planning agent (SDK example)**: The planning agent gets only file-pattern search, content search and an editor that can write `PLAN.md` and nothing else, so it can look at the code but not change it. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-19) |
| Cursor | **Plan Mode**: The agent asks clarifying questions, then researches the codebase before it writes the plan. ([source](https://cursor.com/docs/agent/plan-mode.md), as of 2026-10-19) |
| Claude Code | **Plan mode**: Claude reads files and runs shell commands to explore and does not edit source; edits stay blocked until a plan is approved. The exception is an interactive terminal session with bypass permissions available, where the block is not enforced and Claude is only told to plan. ([source](https://code.claude.com/docs/en/permission-modes), as of 2026-10-19) |
| This sample | Target: reads the repo first, asking only what the code cannot answer ([source](brief.md)) |

### Design output and its form

| Product | What the plan looks like |
|---|---|
| Devin | **Devin CLI, Plan mode**: The plan is written to a file that always opens with a heading and a summary paragraph. Anything beyond those two is not in their docs (pages checked: Commands & Flags, Essential Commands, Changelog). ([source](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-19) |
| Factory (Droid) | **Spec Mode**: A concrete implementation plan is shown for review. It can optionally be saved as a dated Markdown file, by default under `.factory/docs`, once a setting is on. No fixed template for its sections is shown. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-19) |
| GitHub Copilot | **Plan mode in the IDE**: A plan draft in a standard format, shown in the chat: a high-level summary, a breakdown of steps and open questions on anything ambiguous. It can be opened as a Markdown file in an editor tab. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-19) |
| OpenHands | **Planning agent (SDK example)**: A file, `PLAN.md`, written to a fixed outline set in the planning agent's system prompt: objective, context summary (relevant components and constraints), approach overview with rationale, and step-by-step implementation steps. The example's testing section is left out here. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-19) |
| Cursor | **Plan Mode**: The plan opens as a virtual file the person can read and edit, through chat or as markdown. It is saved to the home directory by default; Save to workspace moves it into the repo for sharing. No fixed template is given. ([source](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-19) |
| Claude Code | **Plan mode**: The plan is written to a file (a folder under the user's Claude directory by default; a setting moves it into the project) and shown for review. The person can open it in an editor with Ctrl+G and change it before approving. Required sections are not in their docs. ([source](https://code.claude.com/docs/en/permission-modes), [settings](https://code.claude.com/docs/en/settings-reference), as of 2026-10-19) |
| This sample | Target: a short design with the approach, rejected alternatives, risks, and breaking changes with their consumers ([source](brief.md)) |

### Names reuse, risks or breaking changes

| Product | Whether the plan names them |
|---|---|
| Devin | not in their docs. Pages checked: Commands & Flags, Essential Commands, Changelog (docs.devin.ai). The one related entry is a "megaplan" keyword that makes the agent plan more thoroughly and ask at least one clarifying question before writing the plan. ([source](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-19) |
| Factory (Droid) | **Spec Mode**: Only if the person asks. The docs advise putting the relevant existing patterns in the request, but no page says the plan itself must list reuse, risks or breaking changes. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-19) |
| GitHub Copilot | **Plan mode in the IDE**: Constraints are named as part of the research and ambiguity becomes open questions. Reuse and breaking changes are not in their docs (pages checked: Using plan mode in your IDE, Using agent mode in your IDE). ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-19) |
| OpenHands | **Planning agent (SDK example)**: The outline asks for the relevant components and constraints and for the rationale behind the approach. Reuse of existing code and breaking changes to consumers are not in their docs (pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents). ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-19) |
| Cursor | not in their docs. Pages checked: Plan Mode, Plan mode help, Agent overview, Prompting agents, Using Agent in CLI (cursor.com). They do not say the plan lists reused code, risks or breaking changes. |
| Claude Code | **Plan mode**: Not built in. The docs' own example prompt asks which files need to change, and the guidance tells the person to point Claude at an existing pattern to follow, so reuse and file impact come from what the person asks for. Risks and breaking changes are not in their docs (pages checked: Permission modes, Best practices, Common workflows, Prompt library, Large codebases). ([source](https://code.claude.com/docs/en/best-practices), as of 2026-10-19) |
| This sample | Target: names what it reuses and what it could break, with the consumers of each breaking change ([source](brief.md)) |

### Approval before work starts

Only the grid's three labels are used, **Human**, **Human approves** and **Automated**, and only where a page states it.

| Product | Who approves before work starts |
|---|---|
| Devin | **Devin CLI, Plan mode**: **Human approves**. Leaving Plan mode shows an approval prompt with three choices: implement and accept edits, implement and bypass permissions, or plan needs changes. ([source](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-19) |
| Factory (Droid) | **Spec Mode**: **Human approves**. When the plan is ready Droid calls a tool to ask for approval; the person then proceeds or keeps iterating. Headless `droid exec` has no stated approval step in the pages read. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-19) |
| GitHub Copilot | **Plan mode in the IDE**: **Human approves**. Nothing changes until the person reviews and approves the plan; they can answer its questions and iterate any number of times, then click Start Implementation. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-19) |
| OpenHands | not in their docs. Pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents, Ask Oracle (docs.openhands.dev). The example script runs the execution agent straight after the planning agent finishes, with no pause for a person; that is how the sample is written, not a stated policy. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-19) |
| Cursor | **Plan Mode**: **Human approves**. The person reviews and edits the plan, then clicks Build; the page frames the mode as approving the approach first. ([source](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-19) |
| Claude Code | **Plan mode**: **Human approves**. When the plan is ready Claude presents it and offers to approve and continue in auto mode, approve and review each edit, or keep planning. ([source](https://code.claude.com/docs/en/permission-modes), as of 2026-10-19) |
| This sample | Target: waits for a human to approve the design before any task is written ([source](brief.md)) |

### How it becomes tasks

The shown plan modes mostly hand the plan to the same session. Splitting into tasks happens on other surfaces; see
[Where it goes from here](#where-it-goes-from-here).

| Product | How the plan becomes tasks |
|---|---|
| Devin | **Devin CLI, Plan mode**: not in their docs. The plan profile has a todo tool, but no page says the plan is split into tasks or stored anywhere but the plan file (pages checked: Commands & Flags, Essential Commands, Changelog, Subagents). ([source](https://docs.devin.ai/cli/reference/commands.md), as of 2026-10-19) |
| Factory (Droid) | **Spec Mode**: not in their docs. After approval the same session implements the plan; no page says it is split into stored tasks (pages checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Custom droids). ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-19) |
| GitHub Copilot | **Plan mode in the IDE**: The plan's steps are the units of work and there is no separate task store. Start Implementation hands the plan to an agent session; the other choice saves it as Markdown to work through by hand or share. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-19) |
| OpenHands | **Planning agent (SDK example)**: `PLAN.md` is the handoff: the second agent is told to read it and implement every component in it. There is no task list beyond the plan's own step list. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-19) |
| Cursor | **Plan Mode**: One plan, one Build click. Build in Parallel runs independent steps at once and keeps dependent steps in order. No separate task records are described. ([source](https://cursor.com/docs/agent/plan-mode.md), [multi-agent](https://cursor.com/help/ai-features/multi-agent.md), as of 2026-10-19) |
| Claude Code | **Plan mode**: not in their docs as a conversion. Approving ends plan mode and Claude starts editing in the same session; Claude keeps its own to-do checklist for multi-step work, but no page says the plan is split into it (pages checked: Permission modes, Best practices, Common workflows, Tools reference, Interactive mode). ([source](https://code.claude.com/docs/en/best-practices), as of 2026-10-19) |
| This sample | Target: slices into tasks after approval, as lesson 1's plan does today ([source](brief.md)) |

### Asks before it designs

| Product | Whether it questions the person first |
|---|---|
| Devin | **Devin CLI, Plan mode**: The mode carries a question tool. A changelog entry says a keyword such as `megaplan` makes the agent plan more widely and always ask at least one clarifying question before it writes. ([source](https://docs.devin.ai/cli/reference/commands.md), [changelog](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-20) |
| Factory (Droid) | **Spec Mode**: Partly. Droid may ask clarifying questions while it researches, and the person can keep iterating before approving. There is no separate interview step that questions the person first (pages checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids). ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-20) |
| GitHub Copilot | **Plan mode in the IDE**: Partly. There is no question round before the draft; the questions arrive with it as open questions, and the person answers them and can iterate any number of times. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-20) |
| OpenHands | **Planning agent (SDK example)**: No interview step. The example's task text tells the planning agent not to ask clarifying questions and to write the plan straight away; that line belongs to the example, not to a stated setting of the planning preset. Whether the preset can question a person otherwise is not in their docs (pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents, Ask Oracle). ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-20) |
| Cursor | **Plan Mode**: Yes. Step one of the documented flow is the agent asking clarifying questions, and its ask-questions tool lets it keep reading while it waits for the answer. ([source](https://cursor.com/docs/agent/plan-mode.md), [help](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-20) |
| Claude Code | **Plan mode**: Yes. Claude asks multiple-choice questions with its question tool while it plans; the person picks an option or types their own. ([source](https://code.claude.com/docs/en/tools-reference), as of 2026-10-20) |
| This sample | Target: asks only the questions the code cannot answer ([source](brief.md)) |

### Assumptions or open questions in the plan

| Product | Whether the plan shows what it assumed |
|---|---|
| Devin | not in their docs. Pages checked: Commands & Flags, Essential Commands, Changelog (docs.devin.ai). |
| Factory (Droid) | not in their docs. Pages checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids (docs.factory.com). The docs only advise the person to state constraints and how to verify in the request. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-20) |
| GitHub Copilot | **Plan mode in the IDE**: Open questions are part of the standard plan. Assumptions as a named part are not in their docs (pages checked: Using plan mode in your IDE, Using agent mode in your IDE). ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-20) |
| OpenHands | not in their docs. Pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents, Ask Oracle (docs.openhands.dev). The fixed outline has no assumptions or open-questions part. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-20) |
| Cursor | **Plan Mode**: Partly. Unclear requirements are named as a reason to use the mode, and the questions are the route for surfacing them. A plan section for assumptions or open questions is not in their docs (pages checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). ([source](https://cursor.com/docs/agent/plan-mode.md), as of 2026-10-20) |
| Claude Code | **Plan mode**: Partly. The question tool is the route for surfacing what Claude is unsure of. A plan section for assumptions or open questions is not in their docs (pages checked: Permission modes, Best practices, Common workflows, Tools reference, Large codebases). ([source](https://code.claude.com/docs/en/tools-reference), [permission modes](https://code.claude.com/docs/en/permission-modes), as of 2026-10-20) |
| This sample | Target: writes what is still ambiguous into the design as assumptions, and the approval step shows them ([source](brief.md)) |

### Changing the plan before approval

| Product | Whether the person can change the plan first |
|---|---|
| Devin | **Devin CLI, Plan mode**: The exit prompt offers "No, plan needs changes", which sends it back for revision. Editing the plan file directly is not in their docs (pages checked: Commands & Flags, Essential Commands, Changelog). ([source](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-20) |
| Factory (Droid) | **Spec Mode**: The person can reject the plan and keep iterating. Editing the proposed plan text directly is not in their docs (pages checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference). ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-20) |
| GitHub Copilot | **Plan mode in the IDE**: Yes, by conversation: iterate on the draft before approving. Open in Editor shows the plan as Markdown in an editor tab; whether the agent reads back text edited there is not in their docs. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-20) |
| OpenHands | not in their docs. Pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents, Ask Oracle (docs.openhands.dev). There is no approval point: the example script starts the execution agent as soon as the planning run ends. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-20) |
| Cursor | **Plan Mode**: Yes. The plan opens as a file the person can read and edit, through chat or as markdown, and work starts only on Build. ([source](https://cursor.com/docs/agent/plan-mode.md), [help](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-20) |
| Claude Code | **Plan mode**: Yes. `Ctrl+G` opens the proposed plan in the person's editor to change before Claude proceeds, and "No, keep planning" lets them say what to change. ([source](https://code.claude.com/docs/en/permission-modes), as of 2026-10-20) |
| This sample | Target: iterates on the design until a person approves it ([source](brief.md)) |

### Where the plan is saved

| Product | Where the plan lives |
|---|---|
| Devin | **Devin CLI, Plan mode**: A file that always has a heading and a summary paragraph. The path is not in their docs (pages checked: Commands & Flags, Essential Commands, Changelog). On exit a plan can be handed to a cloud session. ([source](https://docs.devin.ai/cli/changelog/stable.md), as of 2026-10-20) |
| Factory (Droid) | **Spec Mode**: Optional. With "Save spec as Markdown" on, an approved plan is written as a dated Markdown file, by default under `.factory/docs`; a setting can point it at a project folder or any path. With the setting off, the page describes the plan only in the session. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-20) |
| GitHub Copilot | **Plan mode in the IDE**: In the chat view by default. Open in Editor produces a Markdown document in an editor tab that the person can save; the page names no folder or file name. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-20) |
| OpenHands | **Planning agent (SDK example)**: A file named `PLAN.md` in the conversation's workspace folder; the planning agent's editor tool can write that one file only. ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-20) |
| Cursor | **Plan Mode**: The home directory by default. Save to workspace moves it into the repo for reference and team sharing. It is not chat only. ([source](https://cursor.com/docs/agent/plan-mode.md), [help](https://cursor.com/help/ai-features/plan-mode.md), as of 2026-10-20) |
| Claude Code | **Plan mode**: A file, by default under the user's Claude directory in the home folder; the `plansDirectory` setting moves it into the project. ([source](https://code.claude.com/docs/en/settings-reference), [large codebases](https://code.claude.com/docs/en/large-codebases), as of 2026-10-20) |
| This sample | Target: one saved design file that every task links to ([source](brief.md)) |

None of the six shown surfaces is documented as linking the saved plan from each task. OpenHands' `PLAN.md` is the handoff to
the second agent, but its tasks are the plan's own step list.

### Order and dependencies between steps

| Product | Whether steps are ordered or marked dependent |
|---|---|
| Devin | not in their docs. Pages checked: Commands & Flags, Essential Commands, Changelog, Subagents (docs.devin.ai). |
| Factory (Droid) | not in their docs. Pages checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids (docs.factory.com). The page says only that the plan is concrete and shows no step graph. ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-20) |
| GitHub Copilot | not in their docs. Pages checked: Using plan mode in your IDE, Using agent mode in your IDE. The plan is a breakdown into actionable steps, with no mention of dependencies between them. ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-20) |
| OpenHands | **Planning agent (SDK example)**: Partly. The outline asks for step-by-step implementation steps, so order is implied by the list. Explicit dependencies are not in their docs (pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents, Ask Oracle). ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-20) |
| Cursor | **Plan Mode**: Partly. Build in Parallel keeps dependent steps in order, so the product tracks ordering; how a plan marks a dependency is not in their docs (pages checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). ([source](https://cursor.com/help/ai-features/multi-agent.md), as of 2026-10-20) |
| Claude Code | **Plan mode**: not in their docs as a plan feature. Pages checked: Permission modes, Best practices, Common workflows, Large codebases, Tools reference. The large-codebase guidance advises handing Claude a shared change and all its call sites in one session, which is advice to the person, not ordering marked in the plan. ([source](https://code.claude.com/docs/en/large-codebases), as of 2026-10-20) |
| This sample | Target: slices each change as one atomic task or as add, migrate, remove, with a dependency table and a "safe to deploy alone" line per task ([source](brief.md)) |

Slicing rules (how a rename or removal is cut so no merge leaves production broken) are not in the docs of any shown surface;
the closest entries are the ordering cells above.

### Tasks only a person can do

| Product | Whether the plan flags person-only work |
|---|---|
| Devin | not in their docs. Pages checked: Commands & Flags, Essential Commands, Changelog (docs.devin.ai). |
| Factory (Droid) | not in their docs. Pages checked: Interaction Modes, Droid CLI Quickstart, Droid CLI Reference, Droid Exec, Custom droids (docs.factory.com). |
| GitHub Copilot | not in their docs. Pages checked: Using plan mode in your IDE, Using agent mode in your IDE (docs.github.com). |
| OpenHands | not in their docs. Pages checked: Creating Custom Agent, Task Tool Set, File-Based Agents, Ask Oracle (docs.openhands.dev). |
| Cursor | not in their docs. Pages checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help (cursor.com). |
| Claude Code | not in their docs. Pages checked: Permission modes, Best practices, Common workflows, Tools reference (code.claude.com). |
| This sample | Target: marks tasks that need a person and writes their steps as instructions for a person ([source](brief.md)) |

"Not in their docs" is about these planning pages only. Across all 37 surfaces in the grid, two entries mention a human marker
that is not a plan step (Devin's mark on a ticket, OpenHands' `HUMAN:` line on a pull request); see the
[plan grid](../../landscape/plan-grid/README.md).

### Not compared here

Two Tier A steps have no column in the grid, so nothing is said about the field for them: checking the open queue for
duplicates before tasks are filed, and the release-pipeline and live-data checks inside the breaking-change scan (the
"Names reuse, risks or breaking changes" table above records only what the plan names). Where the grid is silent, the lesson
says so rather than guessing.

## What other factories call it

Each product's own term for the planning step and the working step. The planning term comes from the plan grid; the working
term is the `execute-name` cell of [`landscape/matrix.json`](../../landscape/matrix.json). `plan` and `dev-task` are only
this sample's names.

| Product | Planning | Execution |
|---|---|---|
| Devin | Plan mode, in the Devin CLI ([source](https://docs.devin.ai/cli/reference/commands.md), as of 2026-10-19) | Devin session ([source](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively.md), as of 2026-10-13) |
| Factory | Spec Mode ([source](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-19) | Worker session ([source](https://factory.com/news/missions), as of 2026-10-13) |
| GitHub Copilot | Plan mode, in the IDE ([source](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-plan-mode), as of 2026-10-19) | Copilot cloud agent ([source](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent), as of 2026-10-13) |
| OpenHands | Planning agent, in an SDK example ([source](https://docs.openhands.dev/sdk/guides/agent-custom.md), as of 2026-10-19) | GitHub Issue to PR ([source](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-13) |
| Cursor | Plan Mode ([source](https://cursor.com/docs/agent/plan-mode.md), as of 2026-10-19) | Cloud Agents ([source](https://cursor.com/docs/cloud-agent), as of 2026-10-13) |
| Claude Code | Plan mode ([source](https://code.claude.com/docs/en/permission-modes), as of 2026-10-19) | Session ([source](https://code.claude.com/docs/en/how-claude-code-works.md), as of 2026-10-13) |

OpenHands is the one product whose planning term here comes from an example in its docs rather than a named product feature:
the SDK guide builds a planning agent and an execution agent as sample code, so the name is the example's own.

## Other factories at a glance (a sourced slide, not a live demo)

| Product | Access, as stated by the vendor | Source |
|---|---|---|
| OpenHands | the repo states an MIT license and says agents can run locally, in Docker, on VMs, or anywhere an agent server backend runs | [GitHub](https://github.com/OpenHands/OpenHands), as of 2026-10-10 |
| Devin | the Free self-serve plan lists limited Devin usage, plus access to Devin Review and DeepWiki | [billing](https://docs.devin.ai/admin/billing/self-serve.md), as of 2026-10-10 |
| Cursor | Cloud Agents need a paid plan, charged at API pricing for the selected model | [docs](https://cursor.com/docs/background-agent), as of 2026-10-10 |

## Where it goes from here

Destinations only, not a recommendation. In the grid, splitting a plan into tasks mostly lives on a different surface from
the plan mode, and the approval step moves with it. Each item is one product's own surface.

- **A coordinator splits the work and children run it.** Devin's managed sessions: a coordinator proposes work packages (each
  group with its files, plus which must go first because of a dependency), then starts one child session per package, each on
  its own machine and opening its own PR. By default the coordinator starts children without asking; turning off an
  auto-approve preference makes it ask ([migration walkthrough](https://docs.devin.ai/use-cases/gallery/parallelize-migration.md),
  [advanced capabilities](https://docs.devin.ai/work-with-devin/advanced-capabilities.md), as of 2026-10-19). Factory's
  Missions: a plan of features grouped into milestones, with an orchestrator handing each feature to a worker; in the
  interactive flow a person approves the plan first, while the headless mode shows no approval step
  ([planning](https://docs.factory.com/missions/planning.md), [overview](https://docs.factory.com/missions/overview.md),
  as of 2026-10-19). Cursor's Projects: a coordinator plans the work and hands it to agents that run in parallel; how tasks
  are recorded is not in their docs ([Projects](https://cursor.com/docs/agent/projects.md), as of 2026-10-19).
- **The plan is cut into independent units.** Claude Code's `/batch` skill researches the codebase, splits a large change into
  5 to 30 independent units, and starts one background subagent per unit in its own isolated worktree; the page says work
  starts once the plan is approved but not who approves ([commands](https://code.claude.com/docs/en/commands), as of
  2026-10-19). Copilot CLI's `/fleet`: the main agent splits large work into subtasks, works out their dependencies and runs
  independent ones in parallel on subagents ([fleet](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/speed-up-task-completion),
  as of 2026-10-19).
- **The tasks live in a tracker.** Devin's PRD-to-tickets recipe writes one Linear ticket per independent work package with
  a description, acceptance criteria and likely files, names dependencies between tickets, and leaves a person to review the
  tickets after they exist ([recipe](https://docs.devin.ai/use-cases/gallery/prd-to-tickets.md), as of 2026-10-19). Copilot
  Chat drafts a parent issue with sub-issues, and nothing is published until the person reviews the draft and creates the
  issues ([issue creation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/copilot-for-github-tasks/use-copilot-to-create-or-update-issues),
  as of 2026-10-19). An OpenHands prompt can ask for implementation tasks, with sub-tasks and dependencies, to be created in
  Linear ([SDLC guide](https://docs.openhands.dev/openhands/usage/essential-guidelines/sdlc-integration.md), as of 2026-10-19).
- **A shared task list.** Claude Code's agent teams (experimental): the lead creates tasks, teammates claim them, and a task
  with unfinished dependencies cannot be claimed until they complete. The page says a teammate's plan approval is **Automated**,
  approved in the lead's session as soon as it arrives, and does not say a teammate's plan becomes those tasks
  ([agent teams](https://code.claude.com/docs/en/agent-teams), as of 2026-10-19).
- **Approval handed to a check.** OpenHands' Software Factory triage automation decides readiness and applies a label that
  starts the developer automation (**Automated**); people supply the issues and their acceptance criteria
  ([Software Factory](https://docs.openhands.dev/openhands/usage/use-cases/software-factory.md), as of 2026-10-19).
  Copilot's rubber duck agent can critique a plan on a different model than the session and sort findings into blocking,
  non-blocking and suggestions; it is off unless asked ([second opinion](https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/getting-a-second-opinion),
  as of 2026-10-19).

- **Named in the lesson, not compared across products.** These Tier B steps were not surveyed, so they carry no product claim
  and no source: bundling tightly coupled tasks, scoring tasks and choosing a model tier per task, the unattended variant of
  approval with a decision log, per-task test planning, and configuring the planning method itself. Each is a destination for a
  later planning deep dive or for the lesson that owns it (per-task test planning belongs to the verification lesson); none is
  built or recommended here.
- **A second model reads the plan.** The grid shows no shown surface with a plan-review step. The nearest entries are
  Factory's choice of a different model for the planning phase, which writes the plan rather than reviewing it
  ([Spec Mode](https://docs.factory.com/autonomy-and-safety/specification-mode.md), as of 2026-10-20), OpenHands' optional
  tool for a one-off second opinion from a differently configured model, outside the planning agent's tool list
  ([Ask Oracle](https://docs.openhands.dev/sdk/guides/agent-ask-oracle.md), as of 2026-10-20), and Claude Code's advisor, a
  session-wide setting Claude decides when to call ([advisor](https://code.claude.com/docs/en/advisor), as of 2026-10-20).

No product in the grid documents all of these in one step: a design that names reuse and breaking changes, an approval, then
slicing into tasks. The grid supports saying products slice in different places, not that one way is standard.
