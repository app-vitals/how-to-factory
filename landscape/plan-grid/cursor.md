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
changelog entries carry no dates in the page text, so they are cited as "undated changelog entries".

## The grid

| Surface | READS THE CODE BEFORE PROPOSING | DESIGN OUTPUT AND ITS FORM | NAMES REUSE, RISKS OR BREAKING CHANGES | APPROVAL BEFORE WORK STARTS | HOW IT BECOMES TASKS |
| --- | --- | --- | --- | --- | --- |
| **Plan Mode** (Agent in the editor or Agents Window; Shift+Tab to switch) | Yes. The agent asks clarifying questions, then researches the codebase before it writes the plan. Under the hood Agent has file-name search, directory reading and exact-pattern search, and may hand broad searches to an Explore subagent that runs in its own context. ([Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Agent overview](https://cursor.com/docs/agent/overview.md), [Search](https://cursor.com/docs/agent/tools/search.md), 2026-10-19) | A plan that opens as a virtual file you can read and edit, through chat or as markdown. It is saved to the home directory by default; "Save to workspace" moves it into the repo for sharing. The pages give no fixed template for its sections. ([Plan mode help](https://cursor.com/help/ai-features/plan-mode.md), [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), 2026-10-19) | Not documented (checked: Plan Mode, Plan mode help, Agent overview, Prompting agents, Using Agent in CLI). The pages say Plan Mode suits tasks with several valid approaches and architectural choices you want to review, but do not say the plan lists reused code, risks or breaking changes. | **Human approves**. The person reviews and edits the plan, then clicks Build; the page frames the mode as approving the approach first. ([Plan mode help](https://cursor.com/help/ai-features/plan-mode.md), [Plan Mode](https://cursor.com/docs/agent/plan-mode.md), 2026-10-19) | One plan, one Build click. From a plan, "Build in Parallel" runs independent steps at once and keeps dependent steps in order. A plan can be revised and re-run after reverting the changes, which the docs prefer to patching a bad build. No separate task records are described. ([Plan Mode](https://cursor.com/docs/agent/plan-mode.md), [Multi-agent coding](https://cursor.com/help/ai-features/multi-agent.md), 2026-10-19) |
| **Ask mode** (read-only exploration before planning) | Yes, by design: Ask mode answers questions about the code and edits nothing. Example questions are how a flow works and where something is configured. ([Ask mode](https://cursor.com/help/ai-features/ask-mode.md), 2026-10-19) | Answers in chat only. Not a plan; the page tells you to switch back to Agent mode for questions that lead to code changes. ([Ask mode](https://cursor.com/help/ai-features/ask-mode.md), 2026-10-19) | Not documented (checked: Ask mode, Using Agent in CLI). | Not documented (checked: Ask mode, Using Agent in CLI). Nothing is built in this mode. | Not documented (checked: Ask mode, Using Agent in CLI). |
| **Cursor CLI, Plan mode** (terminal; `/plan`, `--plan`, `--mode=plan`) | Yes, as the mode's stated purpose: design the approach before coding, with clarifying questions. The CLI agent has file, search, shell and web tools. A prompt such as "do not write any code" is suggested to keep an agent from editing while it plans. ([Using Agent in CLI](https://cursor.com/docs/cli/using.md), [CLI overview](https://cursor.com/docs/cli/overview.md), 2026-10-19) | Plans are saved to disk and shown in a native plan-review screen. Section layout: not documented (checked: Using Agent in CLI, CLI overview, Slash commands, undated CLI changelog entries). ([CLI changelog](https://cursor.com/docs/cli/changelog.md), 2026-10-19) | Not documented (checked: Using Agent in CLI, CLI overview, Slash commands, Headless, CLI changelog). | **Human approves**. A changelog entry describes a persistent plan menu with Build Locally and Build in Cloud choices, and a native plan-review screen. ([CLI changelog](https://cursor.com/docs/cli/changelog.md), 2026-10-19) | One plan, built locally or sent to a Cloud Agent, with the plan content carried over to the cloud run. Prepending `&` to a message also sends the conversation to the cloud. Splitting into tasks: not documented (checked: Using Agent in CLI, CLI changelog). ([CLI changelog](https://cursor.com/docs/cli/changelog.md), [Using Agent in CLI](https://cursor.com/docs/cli/using.md), 2026-10-19) |
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
- CLI changelog: https://cursor.com/docs/cli/changelog.md (searched for plan entries; entries are undated)
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
