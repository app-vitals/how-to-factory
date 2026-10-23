# Cursor: lesson 2 plan grid (spec to plan)

Scope: lesson 2 only, the step where a spec or request becomes a plan. Left out on purpose: test and verification planning
(verification lesson), how specs are written (intake lesson), standards files, estimates and model tiers, and bundling or
PR shaping. Every filled field is a paraphrase of a first-party page, with its URL and the date I fetched it
(**2026-10-19**). Nothing here is carried over from the 2026-10-13 notes in `lessons/README.md` or
`landscape/field-grid/cursor.md`; every page below was fetched again.

"Approval before work starts" uses exactly one of **Human**, **Human approves** or **Automated**, and only where a page
states it. Where a page does not, the cell says `not documented` and names the index pages checked. Names are Cursor's own,
not canonical. Several surfaces are used because no single one covers every column; each row names its surface.

Method: fetched the docs index (https://cursor.com/docs/llms.txt, 2026-10-19), listed every Agent, customizing,
cloud-agents, integrations, CLI, API and Help Center page that could touch planning, design before coding, code
exploration, plan review or approval, and turning a plan into tasks, then fetched the raw markdown of those pages. The short
planning pages were read in full; the long reference pages (subagents, skills, rules, Slack, Jira, Cloud Agent
capabilities, Automations, grok-bot) were searched for plan, approval, clarification and dependency wording and the matching
sections read, not read end to end. The pages are under "Pages read"; the rest are under "Ruled out (why)". The CLI
changelog entries are headed by version numbers or month labels, not exact dates, and are cited as "changelog entries".

## The grid

| Surface | READS THE CODE BEFORE PROPOSING | DESIGN OUTPUT AND ITS FORM | NAMES REUSE, RISKS OR BREAKING CHANGES | APPROVAL BEFORE WORK STARTS | HOW IT BECOMES TASKS |
| --- | --- | --- | --- | --- | --- |
| **Plan Mode** (Agent in the editor or Agents Window; Shift+Tab to switch) | Yes. The agent asks clarifying questions, then researches the codebase before it writes the plan. Under the hood Agent has file-name search, directory reading and exact-pattern search, and may hand broad searches to an Explore subagent that runs in its own context. ([Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Agent overview](https://cursor.com/docs/agent/overview.md), [Search](https://cursor.com/docs/agent/tools/search.md), 2026-10-19) | A plan that opens as a virtual file you can read and edit, through chat or as markdown. It is saved to the home directory by default; "Save to workspace" moves it into the repo for sharing. The pages give no fixed template for its sections. ([Plan mode help](https://cursor.com/help/ai-features/plan-mode.md), [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), 2026-10-19) | Not documented (checked: Plan Mode, Plan mode help, Agent overview, Prompting agents, Using Agent in CLI). The pages say Plan Mode suits tasks with several valid approaches and architectural choices you want to review, but do not say the plan lists reused code, risks or breaking changes. | **Human approves**. The person reviews and edits the plan, then clicks Build; the page frames the mode as approving the approach first. ([Plan mode help](https://cursor.com/help/ai-features/plan-mode.md), [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), 2026-10-19) | One plan, one Build click. From a plan, "Build in Parallel" runs independent steps at once and keeps dependent steps in order. A plan can be revised and re-run after reverting the changes, which the docs prefer to patching a bad build. No separate task records are described. ([Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Multi-agent coding](https://cursor.com/help/ai-features/multi-agent.md), 2026-10-19) |
| **Ask mode** (read-only exploration before planning) | Yes, by design: Ask mode answers questions about the code and edits nothing. Example questions are how a flow works and where something is configured. ([Ask mode](https://cursor.com/help/ai-features/ask-mode.md), 2026-10-19) | Answers in chat only. Not a plan; the page tells you to switch back to Agent mode for questions that lead to code changes. ([Ask mode](https://cursor.com/help/ai-features/ask-mode.md), 2026-10-19) | Not documented (checked: Ask mode, Using Agent in CLI). | Not documented (checked: Ask mode, Using Agent in CLI). Nothing is built in this mode. | Not documented (checked: Ask mode, Using Agent in CLI). |
| **Cursor CLI, Plan mode** (terminal; `/plan`, `--plan`, `--mode=plan`) | Yes, as the mode's stated purpose: design the approach before coding, with clarifying questions. The CLI agent has file, search, shell and web tools. A prompt such as "do not write any code" is suggested to keep an agent from editing while it plans. ([Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI overview](https://cursor.com/docs/cli/overview.md), 2026-10-19) | Plans are saved to disk and shown in a native plan-review screen. Section layout: not documented (checked: Using Agent in CLI, CLI overview, Slash commands, CLI changelog entries). ([CLI changelog](https://cursor.com/docs/cli/changelog.md), 2026-10-19) | Not documented (checked: Using Agent in CLI, CLI overview, Slash commands, Headless, CLI changelog). | **Human approves**. A changelog entry describes a persistent plan menu with Build Locally and Build in Cloud choices, and a native plan-review screen. ([CLI changelog](https://cursor.com/docs/cli/changelog.md), 2026-10-19) | One plan, built locally or sent to a Cloud Agent, with the plan content carried over to the cloud run. Prepending `&` to a message also sends the conversation to the cloud. Splitting into tasks: not documented (checked: Using Agent in CLI, CLI changelog). ([CLI changelog](https://cursor.com/docs/cli/changelog.md), [Using Agent in CLI](https://cursor.com/docs/cli/using.md), 2026-10-19) |
| **Projects** (coordinator agent in the Agents Window, runs on Cloud Agents) | The page says the coordinator plans the work; how it examines the code first is not described. Not documented (checked: Projects, Agents Window, Cloud Agents). Its agents share a set of context files that they add codebase findings to. ([Projects](https://cursor.com/docs/agent/projects.md), 2026-10-19) | Not documented as an artifact (checked: Projects, Agents Window, Cloud Agents). The coordinator is described as a chat that plans and delegates. ([Projects](https://cursor.com/docs/agent/projects.md), 2026-10-19) | Not documented (checked: Projects, Agents Window, Cloud Agents). | Not documented (checked: Projects, Agents Window, Cloud Agents). The page says you direct the coordinator by chat and that it brings finished work back for you to check, but states no gate before work starts. ([Projects](https://cursor.com/docs/agent/projects.md), 2026-10-19) | The coordinator splits the work and hands it to agents that run in parallel; you can open any of them. Subscriptions let it start delegating from a Slack message, a schedule or PR activity. How tasks are recorded: not documented (checked: Projects, Agents Window). ([Projects](https://cursor.com/docs/agent/projects.md), 2026-10-19) |
| **Slack, Linear and Jira hand-offs** (Cloud Agent started from a thread or an issue) | The Slack page says the agent reads the whole thread for context. For Linear and Jira, how the agent looks at the code before acting is not described. Not documented for Linear and Jira (checked: Linear, Jira). ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md), 2026-10-19) | In Slack, a short plan is posted in the thread before code changes, for bug fixes or when details help; simple requests skip it. Linear and Jira show live status and a PR at the end, with no plan artifact described. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-19) | Not documented (checked: Slack, Linear, Jira). | Slack, Linear and Jira: **Human** starts the work by mentioning or assigning Cursor; Linear triage rules can instead assign issues automatically (the page notes a human assignee is still required for them). No gate between the posted Slack plan and the code changes is stated. ([Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-19) | The issue or thread is the unit of work: one delegated issue becomes one Cloud Agent and one PR. Splitting an issue: not documented (checked: Linear, Jira, Slack). ([Linear](https://cursor.com/docs/integrations/linear.md), 2026-10-19) |
| **Custom subagents** (a planner you define in `.cursor/agents/`) | As the subagent's prompt says. Each subagent starts with a clean context and only what the parent passes it; the built-in Explore subagent exists for context-heavy code searches. ([Subagents](https://cursor.com/docs/subagents.md), 2026-10-19) | Whatever you tell it to return. The docs' example planner has the one-line job of breaking a task into a clear, ordered implementation plan; the orchestrator pattern has handoffs carry structured output. ([Subagents](https://cursor.com/docs/subagents.md), 2026-10-19) | Not documented (checked: Subagents, Skills). | Not documented (checked: Subagents, Skills, Prompting agents). The orchestrator pattern lists planner, implementer and verifier in sequence but names no approval between them. ([Subagents](https://cursor.com/docs/subagents.md), 2026-10-19) | Planner output feeds an implementer, then a verifier, in sequence. Subagents can also run in the background in parallel. ([Subagents](https://cursor.com/docs/subagents.md), 2026-10-19) |
| **Cloud Agents API** (programmatic start in plan mode) | The `mode` option makes the first run explore and draft a plan before coding. The endpoint page gives no more detail. ([Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md), 2026-10-19) | A plan, as the Plan mode help describes it. The API page does not describe the response shape of the plan. ([Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md), 2026-10-19) | Not documented (checked: Cloud Agents API endpoints). | Not documented (checked: Cloud Agents API endpoints). A follow-up run can switch between plan and agent mode, so a caller can send the go-ahead as a second run. ([Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md), 2026-10-19) | Not documented (checked: Cloud Agents API endpoints). |

## Pages read

Fetched 2026-10-19 as raw markdown from the docs index at https://cursor.com/docs/llms.txt. "In full" means every line read;
"searched" means searched for plan, approval, clarification, dependency and spec wording with the matching sections read.

- Plan Mode: https://cursor.com/docs/agent/plan-mode.md (in full)
- Plan mode (help): https://cursor.com/help/ai-features/plan-mode.md (in full)
- Ask mode (help): https://cursor.com/help/ai-features/ask-mode.md (in full)
- Cursor Agent: https://cursor.com/docs/agent/overview.md (in full)
- Prompting agents: https://cursor.com/docs/agent/prompting.md (in full)
- Search: https://cursor.com/docs/agent/tools/search.md (in full)
- Projects: https://cursor.com/docs/agent/projects.md (in full)
- Agents Window: https://cursor.com/docs/agent/agents-window.md (in full)
- Agent Review: https://cursor.com/docs/agent/agent-review.md (in full; checked for plan content, found none)
- What is agentic coding? (help): https://cursor.com/help/ai-features/agentic-coding.md (in full)
- What is multi-agent coding? (help): https://cursor.com/help/ai-features/multi-agent.md (in full)
- Using Agent in CLI: https://cursor.com/docs/cli/using.md (in full)
- CLI overview: https://cursor.com/docs/cli/overview.md (searched)
- CLI slash commands: https://cursor.com/docs/cli/reference/slash-commands.md (searched)
- CLI headless: https://cursor.com/docs/cli/headless.md (searched)
- CLI changelog: https://cursor.com/docs/cli/changelog.md (searched for plan entries; entries are headed by version or month labels)
- Subagents: https://cursor.com/docs/subagents.md (searched; opening, built-in subagents, planner example and common-patterns sections read)
- Skills: https://cursor.com/docs/skills.md (searched; built-in skills table read)
- Cloud Agents: https://cursor.com/docs/cloud-agent.md (searched)
- Cloud Agent best practices: https://cursor.com/docs/cloud-agent/best-practices.md (in full)
- Cloud Agent capabilities: https://cursor.com/docs/cloud-agent/capabilities.md (searched)
- Cloud Agents API endpoints: https://cursor.com/docs/cloud-agent/api/endpoints.md (searched for plan; the `mode` parameters read)
- Slack integration: https://cursor.com/docs/integrations/slack.md (searched; thread context and status sections read)
- Linear integration: https://cursor.com/docs/integrations/linear.md (in full)
- Jira integration: https://cursor.com/docs/integrations/jira.md (setup section read, rest searched)
- Rules: https://cursor.com/docs/rules.md (searched)

## Ruled out (why)

Pages from the same index that I set aside for this lesson. Reasons come from the page's index position and a keyword search
for plan, approval and spec on the pages I also fetched.

- Rollouts (https://cursor.com/docs/rollouts.md): writes a rollout plan when a pull request opens, then checks the change against telemetry after deploy. That is post-code release monitoring, not planning before code. Searched.
- PR Routing & Approval (https://cursor.com/docs/approval-agents.md): approval of pull requests after code exists, not of plans. Searched.
- Agent Review, Bugbot (https://cursor.com/docs/bugbot.md), Security Agents (https://cursor.com/docs/security-agents.md): reviewing code and changes, not plans.
- Automations (https://cursor.com/docs/cloud-agent/automations.md): triggers for recurring or event-driven work; the pull-request approval entries there are about code review. Searched.
- grok-bot pages (https://cursor.com/docs/grok-bot/work.md, https://cursor.com/docs/grok-bot/use-cases.md): a general-purpose bot for non-coding work such as recruiting and marketing; approvals there concern outside actions, not code plans. Searched; the rest of the grok-bot section (settings, teams, deployment, identity, proxies, private networks, computers, security, FAQ) not opened.
- Rules (read), Plugins, Hooks, MCP, Skills (read in part), Customize Cursor: standards and instruction files, owned by a later lesson. Skills' built-in `/split-to-prs` splits finished changes into pull requests, which is bundling and PR shaping, so it is not used.
- Design Mode (https://cursor.com/docs/agent/design-mode.md): UI design in the browser; searched, no plan or approval wording.
- Debug Mode, Terminal and Browser tools, Canvas: debugging and execution tools, not planning.
- Worktrees (https://cursor.com/docs/configuration/worktrees.md): isolated checkouts for running agents; searched, no planning content.
- Models and pricing pages, Cursor Router, Account, Teams, Enterprise, Origin, SDK (TypeScript, Python, bridge), Admin, Analytics and AI Code Tracking APIs: pricing, administration, hosting and measurement. The Analytics API has a "plans adoption" metric, which counts usage and says nothing about how plans work.
- Cloud Agent setup, builds, security, identity, network, self-hosted and mobile pages: environment and security setup, not planning.
- Help Center pages outside the AI features section (getting started, customization, models and usage, security and privacy), plus its Tab, inline edit, vibe coding, side chats and conversation search pages: not planning.
- Estimates and model choice: Cursor's pages on model selection and effort settings are left out on purpose, as is `/multitask`, which is parallel running rather than planning.

## Depth dimensions

Added in the depth-reset pass. Twelve extra dimensions for each of the seven surfaces above, with the same surface names. Every
page below was fetched again on **2026-10-20**: the docs index (https://cursor.com/docs/llms.txt) first, then each page as raw Markdown,
read or searched for the dimension's terms. Nothing here changes the grid above, and the fetch dates in the grid stay as they
were. Names are Cursor's own. "Not documented" always names the pages checked. Where a page states an intention and not a
mechanism, the entry says so and does not guess which one it is. The read-only row uses the labels **Tool restriction** and
**Instruction only**; where the docs name no mechanism the entry says that instead. The CLI changelog entries are headed by version numbers or month labels, not exact dates. The index lists no page titled spec or design for planning beyond Plan Mode (the
Design Mode page is UI design in the browser), so the headline finding above holds for these dimensions too.


### Plan Mode (Agent in the editor or Agents Window; Shift+Tab to switch)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Yes. Step one of the documented flow is the agent asking clarifying questions; the Agent tool list also has an ask-questions tool that lets the agent keep reading and editing while it waits for the answer. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md), [Cursor Agent](https://cursor.com/docs/agent/overview.md) |
| Assumptions or open questions surfaced | Partly. Unclear requirements are named as a reason to use the mode, and the questions are the documented route for surfacing them. A plan section for assumptions or open questions: not documented (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Plan editable before approval | Yes. The plan opens as a virtual file you can read and edit, through chat or as markdown, and work starts only when you click Build. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Where the plan is saved | Home directory by default. "Save to workspace" moves it into the repo for later reference, team sharing and documentation. It is not saved in chat only. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Dependencies or ordering between steps | Partly. From a plan, Build in Parallel keeps dependent steps in order, so the product tracks ordering; how a plan marks the dependency: not documented (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). | [Multi-agent help](https://cursor.com/help/ai-features/multi-agent.md) |
| Parallel split of independent work | Yes. Build in Parallel runs the plan's independent steps at once. A separate `/multitask` command runs async subagents in parallel instead of queuing requests; that is parallel running, not plan splitting. | [Multi-agent help](https://cursor.com/help/ai-features/multi-agent.md) |
| Re-plan after execution is blocked | By restart, not by a documented re-plan step. If the build goes wrong, revert the files (or roll back to an earlier chat message), make the plan more specific and run it again; the docs prefer this to patching a bad build with follow-ups. Whether a blocked build triggers this on its own: not documented. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Second-model plan critique | Not documented (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). The plan is reviewed by the person. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Read-only enforcement | Not documented as a mechanism (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). The pages say a plan is made "before writing any code" but do not say whether edit tools are withheld or the agent is only told not to edit, so no label is given. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Tracker or ticket output | Not documented (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). The plan is a file, not a ticket. | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Human-only step flag | Not documented (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md) |
| Rollout or rollback section | Not documented (checked: Plan Mode, Plan mode help, Cursor Agent, Multi-agent help). The product's separate Rollouts feature writes a rollout plan when a pull request opens, which is a different artifact from this plan (see the Rollouts note below). | [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Plan mode help](https://cursor.com/help/ai-features/plan-mode.md), [Rollouts](https://cursor.com/docs/rollouts.md) |

### Ask mode (read-only exploration before planning)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | No interview; the mode answers the questions you ask it. Whether it asks you anything back: not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Assumptions or open questions surfaced | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Plan editable before approval | Not applicable: no plan is produced (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Where the plan is saved | Chat only. No file is described (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Dependencies or ordering between steps | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Parallel split of independent work | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Re-plan after execution is blocked | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Second-model plan critique | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Read-only enforcement | Read-only by definition, but the mechanism is not described (checked: Ask mode help, CLI slash commands, CLI overview), so no tool-restriction or instruction-only label is given. The page says the agent explores code "without making any edits"; the CLI lists the mode as read-only exploration without making changes. | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md), [CLI overview](https://cursor.com/docs/cli/overview.md), [CLI slash commands](https://cursor.com/docs/cli/reference/slash-commands.md) |
| Tracker or ticket output | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Human-only step flag | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |
| Rollout or rollback section | Not documented (checked: Ask mode help, CLI slash commands, CLI overview). | [Ask mode help](https://cursor.com/help/ai-features/ask-mode.md) |

### Cursor CLI, Plan mode (terminal; `/plan`, `--plan`, `--mode=plan`)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Yes. The mode's stated purpose is to design the approach before coding, and the agent asks clarifying questions to refine the plan. A changelog entry says questions are shown one at a time with a free-text "Other" answer. | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Assumptions or open questions surfaced | Not documented as a plan section (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Plan editable before approval | Partly. A native plan-review screen exists and a changelog entry mentions pressing Esc to return to Vim normal mode "while you revise a plan", so revising is possible; how edits are made beyond that: not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). A persistent menu offers Build Locally or Build in Cloud. | [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Where the plan is saved | On disk. A changelog entry says plans are saved to disk; the path and any move into the repo: not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). `/plan` with no prompt shows the current plan. | [CLI changelog](https://cursor.com/docs/cli/changelog.md), [CLI slash commands](https://cursor.com/docs/cli/reference/slash-commands.md) |
| Dependencies or ordering between steps | Not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Parallel split of independent work | Not documented for the plan (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). Separately, the CLI can run the agent in a new git worktree (`--worktree`), which isolates a run and does not split a plan. | [Using Agent in CLI](https://cursor.com/docs/cli/using.md) |
| Re-plan after execution is blocked | Not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). The CLI's rule is to state intent and resume a thread (`--resume`), not to re-plan. | [Using Agent in CLI](https://cursor.com/docs/cli/using.md) |
| Second-model plan critique | Not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Read-only enforcement | **Instruction only**, as the docs suggest it: tell the agent "do not write any code" to keep it from editing while it plans. The Plan mode entry itself does not say whether edit tools are withheld, so no tool-restriction label is given. By contrast, non-interactive mode (`-p`) is stated to have full write access; a changelog entry says plan mode works with `-p`, and the page does not say how the two combine. | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Tracker or ticket output | Not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Human-only step flag | Not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |
| Rollout or rollback section | Not documented (checked: Using Agent in CLI, CLI overview, CLI slash commands, CLI changelog). | [Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI changelog](https://cursor.com/docs/cli/changelog.md) |

### Projects (coordinator agent in the Agents Window, runs on Cloud Agents)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented (checked: Projects, Multi-agent help, Cloud Agents). You describe what you want built and the coordinator takes it from there; no question step is described. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Assumptions or open questions surfaced | Not documented (checked: Projects, Multi-agent help, Cloud Agents). | [Projects](https://cursor.com/docs/agent/projects.md) |
| Plan editable before approval | Not documented (checked: Projects, Multi-agent help, Cloud Agents). You direct the coordinator by chat, which is the only documented way to change course. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Where the plan is saved | Not documented as a plan (checked: Projects, Multi-agent help, Cloud Agents). What is stored is a set of shared context files that agents add research, artifacts and codebase learnings to; they sync across the machines the Project's agents use. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Dependencies or ordering between steps | Not documented (checked: Projects, Multi-agent help, Cloud Agents). The page says the coordinator plans the work and does not describe how steps are ordered. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Parallel split of independent work | Yes, as the main idea. The coordinator delegates tasks to many agents in parallel and runs as many as the work needs; you can open any of them. How it decides which work is independent: not documented (checked: Projects, Multi-agent help, Cloud Agents). | [Projects](https://cursor.com/docs/agent/projects.md), [Multi-agent help](https://cursor.com/help/ai-features/multi-agent.md) |
| Re-plan after execution is blocked | Partly. The Project keeps context over months and the coordinator stays responsive to direction, so a person can redirect it. A documented re-plan after a blocked agent: not documented (checked: Projects, Multi-agent help, Cloud Agents). | [Projects](https://cursor.com/docs/agent/projects.md) |
| Second-model plan critique | Not documented (checked: Projects, Multi-agent help, Cloud Agents). | [Projects](https://cursor.com/docs/agent/projects.md) |
| Read-only enforcement | Not documented (checked: Projects, Multi-agent help, Cloud Agents). The coordinator is said not to write code itself, which is a stated role, not a described restriction. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Tracker or ticket output | Not documented (checked: Projects, Multi-agent help, Cloud Agents). Subscriptions can start work from a Slack channel, PR activity, CI runs or a schedule; that is input, not output. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Human-only step flag | Not documented (checked: Projects, Multi-agent help, Cloud Agents). The coordinator brings finished work back for you to check. | [Projects](https://cursor.com/docs/agent/projects.md) |
| Rollout or rollback section | Not documented (checked: Projects, Multi-agent help, Cloud Agents). | [Projects](https://cursor.com/docs/agent/projects.md) |

### Slack, Linear and Jira hand-offs (Cloud Agent started from a thread or an issue)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented (checked: Slack, Linear, Jira). Jira advises delegating only when the ticket already describes the task clearly, so the questions are meant to be answered up front in the ticket. | [Jira](https://cursor.com/docs/integrations/jira.md) |
| Assumptions or open questions surfaced | Not documented (checked: Slack, Linear, Jira). | [Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md) |
| Plan editable before approval | Not documented (checked: Slack, Linear, Jira). In Slack the short plan is posted before code changes; no page says it can be edited or held. | [Slack](https://cursor.com/docs/integrations/slack.md) |
| Where the plan is saved | In Slack, the thread: a short plan is posted there before code changes when the task is a bug fix or the detail would help, and simple requests skip it. For Linear and Jira no plan location is described (checked: Linear, Jira). | [Slack](https://cursor.com/docs/integrations/slack.md) |
| Dependencies or ordering between steps | Not documented (checked: Slack, Linear, Jira). | [Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md) |
| Parallel split of independent work | Not documented (checked: Slack, Linear, Jira). Slack, Linear and Jira each start one Cloud Agent per delegation; the Cloud Agents page says you can run as many agents in parallel as you want. | [Cloud Agents](https://cursor.com/docs/cloud-agent.md), [Slack](https://cursor.com/docs/integrations/slack.md) |
| Re-plan after execution is blocked | Partly. A person can send follow-up instructions to a running agent: by mentioning `@Cursor` in a Linear comment, from Rovo chat in Jira, or with an Add follow-up action in Slack. A documented re-plan on a block: not documented (checked: Slack, Linear, Jira). | [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md), [Slack](https://cursor.com/docs/integrations/slack.md) |
| Second-model plan critique | Not documented (checked: Slack, Linear, Jira). | [Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md) |
| Read-only enforcement | Not documented (checked: Slack, Linear, Jira). The documented outcome is a pull request, so a run is not read-only. | [Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md) |
| Tracker or ticket output | The issue is the input. Linear shows real-time status in the issue and a PR at the end; Slack gets status updates under the thread, then a completion notice with a PR link. Whether Jira receives a write-back: not documented (checked: Jira, Linear, Slack). | [Linear](https://cursor.com/docs/integrations/linear.md), [Slack](https://cursor.com/docs/integrations/slack.md), [Jira](https://cursor.com/docs/integrations/jira.md) |
| Human-only step flag | Not documented (checked: Slack, Linear, Jira). Linear automation rules need a human assignee to fire (Jira: not documented), which is a trigger condition and not a mark on a plan step. | [Linear](https://cursor.com/docs/integrations/linear.md) |
| Rollout or rollback section | Not documented (checked: Slack, Linear, Jira). | [Slack](https://cursor.com/docs/integrations/slack.md), [Linear](https://cursor.com/docs/integrations/linear.md), [Jira](https://cursor.com/docs/integrations/jira.md) |

### Custom subagents (a planner you define in `.cursor/agents/`)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | As the planner's prompt says; the product has no built-in interview. The SKILL.md format template on the Skills page includes the line "Use the ask questions tool if you need to clarify requirements with the user", which shows the tool can be called from custom instructions. Not documented as a subagent setting (checked: Subagents, Plan Mode, Skills). | [Subagents](https://cursor.com/docs/subagents.md), [Skills](https://cursor.com/docs/skills.md) |
| Assumptions or open questions surfaced | Whatever the prompt asks for. Not documented as a feature (checked: Subagents, Plan Mode). | [Subagents](https://cursor.com/docs/subagents.md) |
| Plan editable before approval | Not documented (checked: Subagents, Plan Mode). The orchestrator pattern hands structured output from planner to implementer and names no point where a person edits it. | [Subagents](https://cursor.com/docs/subagents.md) |
| Where the plan is saved | Not documented (checked: Subagents, Plan Mode). The planner's output returns to the parent conversation; background subagents write their state as they run so they can be resumed. | [Subagents](https://cursor.com/docs/subagents.md) |
| Dependencies or ordering between steps | Partly. The orchestrator pattern runs planner, implementer and verifier in sequence, so order is by role. Ordering between plan steps: not documented (checked: Subagents, Plan Mode). | [Subagents](https://cursor.com/docs/subagents.md) |
| Parallel split of independent work | Yes. Subagents can run in the foreground or in the background, and the page lists running multiple workstreams in parallel as a reason to use them. Each runs in its own context window, so five in parallel cost about five times the tokens. How a plan marks the independent steps: not documented (checked: Subagents). | [Subagents](https://cursor.com/docs/subagents.md) |
| Re-plan after execution is blocked | Partly. A background subagent can be resumed after it finishes with its context preserved, and a verification agent checks whether claimed work was really completed. Neither is described as re-planning (checked: Subagents, Plan Mode). | [Subagents](https://cursor.com/docs/subagents.md) |
| Second-model plan critique | Possible, by configuration, not as a plan step. A subagent's `model` field can name a model other than the parent's, and a verifier subagent is a documented pattern for checking completed work. A plan critique is not described (checked: Subagents, Plan Mode). | [Subagents](https://cursor.com/docs/subagents.md) |
| Read-only enforcement | **Tool restriction.** A subagent with `readonly: true` runs with restricted write permissions: no file edits and no state-changing shell commands. The default is `false`, so a planner is read-only only if its file sets it. | [Subagents](https://cursor.com/docs/subagents.md) |
| Tracker or ticket output | Not documented (checked: Subagents, Plan Mode). The verifier pattern mentions confirming work before tickets are marked complete, with no ticket integration described. | [Subagents](https://cursor.com/docs/subagents.md) |
| Human-only step flag | Not documented (checked: Subagents, Plan Mode). | [Subagents](https://cursor.com/docs/subagents.md) |
| Rollout or rollback section | Not documented (checked: Subagents, Plan Mode). | [Subagents](https://cursor.com/docs/subagents.md) |

### Cloud Agents API (programmatic start in plan mode)

| Dimension | What the docs say | Sources (fetched 2026-10-20) |
| --- | --- | --- |
| Clarify or interview mode | Not documented (checked: Cloud Agents API endpoints). The first run in plan mode "explores and drafts a plan before coding"; whether it asks questions through the API: not documented. | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Assumptions or open questions surfaced | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Plan editable before approval | Not documented (checked: Cloud Agents API endpoints). A follow-up run takes a mode override, `agent` or `plan`, so a caller can switch from planning to building by sending a second run. | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Where the plan is saved | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Dependencies or ordering between steps | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Parallel split of independent work | Not documented for the plan (checked: Cloud Agents API endpoints). The Cloud Agents page says many agents can run in parallel. | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md), [Cloud Agents](https://cursor.com/docs/cloud-agent.md) |
| Re-plan after execution is blocked | Partly. The follow-up run's mode can be set back to `plan`, and omitting it keeps the conversation's current mode. A documented trigger for that after a blocked build: not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Second-model plan critique | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Read-only enforcement | Not documented as a mechanism (checked: Cloud Agents API endpoints). The `mode` option names plan as exploring and drafting before coding; no restriction is described, so no label is given. | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Tracker or ticket output | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Human-only step flag | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |
| Rollout or rollback section | Not documented (checked: Cloud Agents API endpoints). | [Cloud Agents API endpoints](https://cursor.com/docs/cloud-agent/api/endpoints.md) |

### Pages read (depth pass)

Fetched 2026-10-20 as raw Markdown from https://cursor.com/docs/llms.txt. "In full" means every line read; "searched" means searched for
plan, clarify, assumption, dependency, parallel, read-only, critique, ticket, human and rollback wording with the matching sections read.

- Plan Mode: https://cursor.com/docs/agent/plan-mode.md (in full)
- Plan mode (help): https://cursor.com/help/ai-features/plan-mode.md (in full)
- Ask mode (help): https://cursor.com/help/ai-features/ask-mode.md (in full)
- What is multi-agent coding? (help): https://cursor.com/help/ai-features/multi-agent.md (in full)
- What is agentic coding? (help): https://cursor.com/help/ai-features/agentic-coding.md (searched)
- Cursor Agent: https://cursor.com/docs/agent/overview.md (in full)
- Prompting agents: https://cursor.com/docs/agent/prompting.md (searched)
- Search: https://cursor.com/docs/agent/tools/search.md (searched)
- Projects: https://cursor.com/docs/agent/projects.md (in full)
- Agents Window: https://cursor.com/docs/agent/agents-window.md (searched)
- Using Agent in CLI: https://cursor.com/docs/cli/using.md (in full)
- CLI overview: https://cursor.com/docs/cli/overview.md (searched)
- CLI slash commands: https://cursor.com/docs/cli/reference/slash-commands.md (searched)
- CLI headless: https://cursor.com/docs/cli/headless.md (searched)
- CLI changelog: https://cursor.com/docs/cli/changelog.md (searched for plan, question, review and mode entries; headed by version or month labels)
- Subagents: https://cursor.com/docs/subagents.md (searched; configuration fields, model configuration, verification-agent and orchestrator sections read)
- Skills: https://cursor.com/docs/skills.md (searched)
- Cloud Agents: https://cursor.com/docs/cloud-agent.md (searched)
- Cloud Agent best practices: https://cursor.com/docs/cloud-agent/best-practices.md (searched)
- Cloud Agent capabilities: https://cursor.com/docs/cloud-agent/capabilities.md (searched)
- Cloud Agents API endpoints: https://cursor.com/docs/cloud-agent/api/endpoints.md (searched; the `mode` parameters on launch and follow-up read)
- Slack integration: https://cursor.com/docs/integrations/slack.md (searched; status updates and hand-off section read)
- Linear integration: https://cursor.com/docs/integrations/linear.md (in full)
- Jira integration: https://cursor.com/docs/integrations/jira.md (searched; delegating, mentioning and follow-up sections read)
- Rules: https://cursor.com/docs/rules.md (searched)
- Rollouts: https://cursor.com/docs/rollouts.md (opening and rollout-plans sections read)

### Ruled out (depth pass)

- Rollouts (https://cursor.com/docs/rollouts.md): writes a rollout plan as a pull-request comment when the PR opens, listing risks, expected effect, signals to check and instrumentation gaps, and checks telemetry after deploy. It is a post-code release artifact made by a separate product feature, not a section of the pre-code plan, so it is not used as the Rollout or rollback entry for any surface. It does show the vendor has a rollout-plan concept; a person can ask for the plan to be revised in a PR comment.
- Rules, Plugins, Hooks, MCP: standards and instruction files, owned by a later lesson; searched for plan-related wording, none found for these dimensions.
- Design Mode (https://cursor.com/docs/agent/design-mode.md), Debug Mode, Terminal and Browser tools, Canvas: UI design and debugging tools, not planning.
- Agent Review, Bugbot, PR Routing & Approval (https://cursor.com/docs/approval-agents.md): review of code and pull requests, so they cannot supply a plan critique.
- Automations and grok-bot pages: triggers and non-coding work, as in the earlier pass.
- Worktrees: isolated checkouts for running agents; the CLI `--worktree` flag was noted under Parallel split and is not a plan feature.
- Estimates, model tiers and pricing pages: left out on purpose, as in the earlier pass.
