# GitHub Copilot cloud agent: lesson 1 field grid (redo)

Scope: lesson 1 only (plan, dev-task, loop). Every filled field is a paraphrase of a first-party page, with its URL and the
date I fetched it (2026-10-13). "Who drives" is one of Human, Human approves, Automated, and only when a page states it;
otherwise `not documented`, followed by the index pages checked. Names are the product's own, not canonical. Several
surfaces per grid are used where one surface does not cover the concept; each is named in its table.

Method: GitHub Docs publishes an `llms.txt` (https://docs.github.com/llms.txt, fetched 2026-10-13), but it lists only a
handful of Copilot pages. The usable index is the docs' own section index pages, read in their Markdown form (append `.md`
to a docs URL): the cloud agent how-to index (https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent),
the cloud agent concepts index (https://docs.github.com/en/copilot/concepts/agents/cloud-agent), the agents concepts index
(https://docs.github.com/en/copilot/concepts/agents) and the cloud agent tutorials index
(https://docs.github.com/en/copilot/tutorials/cloud-agent), all fetched 2026-10-13. From those I listed every page on
planning, issue and task workflows, verification, and automation or looping, then read them (see "Pages read"). This
replaces an earlier, shallower draft that recorded plan output and who-drives as `not documented`.

URL note: two URLs given in the task have moved. `.../concepts/agents/cloud-agent/about-cloud-agent` now redirects to
https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github, and `.../how-tos/use-copilot-agents/cloud-agent/research-plan-iterate`
now redirects to https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate.
The redirect targets are cited below.

Index pages checked for any `not documented` below: the four index pages above; Research, plan and iterate; Copilot on
GitHub.com; Best practices (get-the-best-results); Using cloud agent on GitHub; Managing agent sessions; Review output from
Copilot; Agent management; About automations; Creating automations; About and Managing rationale, confidence and approvals;
Using cloud agent to improve a project; Dynamic workflows; About GitHub Agentic Workflows; About hooks; Autopilot for Copilot CLI;
and the 2026-04-01 changelog post (URLs under "Pages read").

## PLAN

### Surface 1: research, plan and iterate in the cloud agent (agents tab, panel, dashboard, Copilot Chat)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A question about the repository for the research step, then a prompt describing the plan you want (the page's example asks for a plan to implement the most impactful performance improvements). Sessions can also start from a Copilot Chat conversation, which passes its context into the session | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate ; https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github | 2026-10-13 |
| step | Three stages on the page: research the repository by asking questions, ask for a plan before any changes are made, then ask it to implement the agreed plan. Follow-up prompts can be sent while it works to steer it | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate | 2026-10-13 |
| output | A plan shown in the conversation for review (the changelog says it is produced "before taking any action"). Splitting a plan into separate tasks with acceptance criteria and dependencies: not documented (checked: Research, plan and iterate; changelog 2026-04-01; Best practices; Copilot on GitHub.com; Dynamic workflows) | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate ; https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/ | 2026-10-13 |
| who drives | Human approves. The person reviews the plan and iterates until it matches their intent; the changelog says the person approves or gives feedback before any code is written | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate ; https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/ | 2026-10-13 |

The page notes these research and plan capabilities are only on GitHub.com (and in public preview for the Teams and Slack
integrations); Azure Boards, Jira and Linear integrations only support creating a pull request directly.

### Surface 2: plan mode, then autopilot, in Copilot CLI

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A prompt in plan mode describing what to achieve | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |
| step | The person works with Copilot in plan mode to build a detailed plan; the CLI then offers "Accept plan and continue in Autopilot execution mode" | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |
| output | A detailed implementation plan that the same session then executes. A stored, task-by-task plan file: not documented (checked: the autopilot page, Dynamic workflows, Agent management) | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |
| who drives | Human approves (the person works the plan out with Copilot and chooses to accept it before autopilot starts) | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |

### Surface 3: finding work with a prompt, then turning it into issues (improve-a-project tutorial)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | A Chat prompt asking what technical debt exists, with a prioritised list of up to five areas, each with the problem and its consequences | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |
| step | Copilot turns the findings into issues; the person then checks that each issue has acceptance criteria Copilot can use to verify its work, and edits them | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |
| output | GitHub issues the person can assign to Copilot | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |
| who drives | Human approves (the person reviews and edits the issues before assigning) | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |

## DEV-TASK

### Surface 1: assign an issue to Copilot, or send a prompt (agents tab, panel, dashboard, `/task` in Chat)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | An issue (title, description and existing comments are sent, plus an optional prompt, base branch, model and custom agent) or a prompt. The best-practices page says an ideal task has a clear problem description, acceptance criteria (for example, whether unit tests are expected) and the files to change. Comments added to the issue after assignment are not seen; extra detail goes in the PR | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github ; https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-13 |
| step | The agent works in its own short-lived development environment on GitHub Actions, where it explores code, edits it, and runs tests and linters; the session log shows the reasoning and the tools used. The best-practices page says the agent is more likely to produce a mergeable PR when it can build, test and validate in that environment, and recommends custom instructions and a `copilot-setup-steps.yml` file so it has the build and test commands and dependencies | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-13 |
| output | A `copilot/...` branch with signed commits whose messages link to the session log. Whether it becomes a pull request depends on the entry point: assigned issues and `/task` open a PR and request your review when finished; a plain session does not open one unless the prompt asks, and the person clicks Create pull request after reviewing the diff | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate | 2026-10-13 |
| who drives | Human approves. The person starts the task and reviews the result; the agent runs in the background between. Workflows on the PR do not run until a person with write access approves them, and a person's own approval of a Copilot PR does not count toward required approvals | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output | 2026-10-13 |

How it verifies before delivering: the pages say the agent can run tests and linters in its environment to validate changes
before pushing, and that merge-conflict fixes are re-checked against the build, tests and linter. How the check results decide
whether it keeps going before opening the PR: not documented (checked: Managing agent sessions, Using cloud agent on GitHub,
Best practices, Customize the agent environment description line, Review output from Copilot).

### Surface 2: follow-up work on the pull request (`@copilot` comments, review-comment batches, failing Actions run)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| input | An `@copilot` comment from someone with write access, review comments delegated with "Fix with Copilot" or a batch, a merge conflict, or a failing Actions job page | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github | 2026-10-13 |
| step | A new session starts (shown by an eyes reaction), keeps context from earlier sessions on the same PR, and for a failing run investigates the cause and pushes a fix to the branch | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github | 2026-10-13 |
| output | Commits pushed to the PR branch (or a separate PR if asked); the title and body are kept up to date | https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-13 |
| who drives | Human (each round starts from a person's comment, button click or run selection) | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github | 2026-10-13 |

## LOOP-WITHIN-A-TASK

### Surface 1: cloud agent session

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | The pages describe the agent running tests and linters to validate its work, and re-verifying build, tests and linter after resolving merge conflicts. A rule that it keeps retrying until a named check passes: not documented (checked: Managing agent sessions, Using cloud agent on GitHub, Best practices, Customize the agent environment description, Hooks, Copilot on GitHub.com limitations). A session has a hard maximum of 59 minutes, after which it stops | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github | 2026-10-13 |
| what judges it | Hooks can run custom shell commands at points such as before and after a tool call, when the main agent stops responding, and when a subagent finishes, e.g. for validation rules or approving or denying tool use. The hooks page does not say a hook can send the agent back to work, so whether a hook can act as a pass/fail gate: not documented on that page | https://docs.github.com/en/copilot/concepts/agents/hooks | 2026-10-13 |
| who drives | Human steers: a person can send steering input mid-session without stopping it (it uses AI credits), or stop the session. Who decides to retry inside a run: not documented | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents | 2026-10-13 |

### Surface 2: Copilot CLI autopilot

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | It keeps taking steps without waiting for the person until the agent decides the task is complete, a problem blocks progress, the person interrupts, or the continuation limit is reached (5 automatic continuations by default, changed with `--max-autopilot-continues`). The page suggests it for tasks such as fixing CI failures, but does not describe a named check that must pass | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |
| what judges it | The agent itself ("determines that the task is complete"); the continuation cap is the only external limit named | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |
| who drives | Automated between steps once started; the person gives the initial instruction and grants permissions, and can interrupt | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-13 |

### Surface 3: dynamic workflows (public preview; Copilot app, CLI and SDK)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| retries until a check passes? | A workflow is a program that defines the steps and checks, can have subagents verify each other's findings, and can pause at a checkpoint for the person to review and resume. Limits can be set on concurrent and total subagents, running time and approximate AI credits; a run that hits a limit is kept and can be resumed. An explicit retry-until-pass construct: not documented on this page | https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows | 2026-10-13 |
| what judges it | The workflow's own code, "defined in code" by its author, with agents used for the parts needing judgment. The page contrasts this with autopilot, where Copilot decides the next steps | https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows | 2026-10-13 |
| who drives | Automated for the run once started in the background; Human approves where a checkpoint pauses it (the page says the person reviews and resumes) | https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows | 2026-10-13 |

## LOOP-ACROSS-TASKS

### Surface 1: Copilot automations (Agents tab of a private or internal repository)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A saved task (name, prompt, triggers, model, tools) that runs when a trigger fires: a recurring schedule (hourly, daily or weekly), an issue being created, a pull request opened, or a pull request synchronized (new commits pushed). Event triggers accept a search-query filter, and PR triggers also a changed-files filter. The page's examples: label new issues, check failing tests nightly and open a draft PR, draft weekly release notes | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations | 2026-10-13 |
| step | Each run starts a cloud agent session with the saved prompt and only the tools selected for it (for example push changes, update labels, create a PR). It uses the repository's custom instructions, skills, firewall rules and secrets. It can only act inside its own repository. A "Run now" button tests it without waiting for the trigger | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations | 2026-10-13 |
| output | Actions in the repository such as labelled issues or an opened PR; the sessions it starts are visible to anyone with repository access. For issue changes (labels, fields, type, closing, assignees) each change carries a recorded reason and a high, medium or low confidence rating | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations ; https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automation-rationale-and-approvals | 2026-10-13 |
| who drives | Automated for the trigger and run. Human approves for issue changes held back: the repository's automation level (Full control, Cautious by default, Balanced, Full automation) decides which changes apply by themselves and which wait for accept or decline, and the page states this is a convenience, not a security boundary. PRs an automation opens are attributed to its creator, so the creator cannot approve them, and Actions workflows on them still need a write-access person's approval | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations ; https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automation-rationale-and-approvals | 2026-10-13 |

Picking up the next ready issue from a backlog and assigning it to Copilot by itself, or chaining one finished task into the
next: not documented for automations (checked: About automations, Creating automations, Managing rationale and approvals,
Agent management, Using cloud agent on GitHub, Dynamic workflows). The automations page lists issue triage, a nightly
test-fix and weekly release notes as the kinds of work, not backlog draining.

### Surface 2: GitHub Agentic Workflows (public preview; run as GitHub Actions)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | A Markdown file with YAML front matter (triggers, permissions, allowed write actions called safe outputs) and plain-language instructions, compiled to a `.lock.yml` Actions workflow committed to the default branch; the example runs `on: daily`. Uses Copilot by default, or Claude, Codex or Gemini | https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows | 2026-10-13 |
| step | The agent runs in a firewalled Actions environment with a read-only token by default; write actions go through declared safe outputs, which are checked by threat detection first. A per-run credit cap can be set (default 1,000 AIC) | https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows | 2026-10-13 |
| output | Issues, comments or pull requests for a person to review; the page lists triaging issues, investigating CI failures, status reports, docs updates and test-coverage work. The issue-triage guide lists `assign-to-agent` among the outputs a workflow can be given | https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/manage-rationale-confidence-approvals | 2026-10-13 |
| who drives | Automated for the trigger and run; Human approves for merging ("you control approvals and merges") | https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows | 2026-10-13 |

### Surface 3: repeating the assign-and-review cycle by hand (improve-a-project tutorial)

| Field | Value | Source | As of |
| --- | --- | --- | --- |
| what moves on by itself | Nothing in the tutorial: after one issue is done the person repeats the assign step for the next issue, and then repeats the find-debt step for another area | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |
| step | Assign an issue, review the draft PR when Copilot adds you as reviewer, merge, then go back for the next issue | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |
| output | One merged PR per issue | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |
| who drives | Human | https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-13 |

## Pages read

Read in full unless marked partial. All fetched 2026-10-13 as Markdown (`.md` suffix) except the changelog post.

- Index pages: https://docs.github.com/llms.txt ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent ; https://docs.github.com/en/copilot/concepts/agents/cloud-agent ; https://docs.github.com/en/copilot/concepts/agents ; https://docs.github.com/en/copilot/tutorials/cloud-agent
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate
- https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/
- https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
- https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/agent-management
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automation-rationale-and-approvals
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/manage-rationale-confidence-approvals (first sections and the Agentic Workflows steps only)
- https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project (steps 3 to 5 and the intro only)
- https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows
- https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows
- https://docs.github.com/en/copilot/concepts/agents/hooks (overview and hook types only)
- https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot

## Ruled out (why)

- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/kick-off-a-task: fetched; I read only its headings, which duplicate the start-a-session steps on the Using cloud agent on GitHub page.
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment: fetched and searched, but only its summary line and the validation mentions were used (it is about environment setup, which the best-practices page already summarises). Not read in full.
- Concepts for custom agents (`about-custom-agents`), agent skills, MCP, Copilot Memory, plugins: these shape what an agent knows or can call, not the plan, dev-task or loop concepts.
- Dynamic workflows how-to (`use-dynamic-workflows`): not fetched; the concepts page already answers the loop questions, and the how-to is about commands and authoring.
- GitHub Agentic Workflows site (https://github.github.com/gh-aw/) and its quickstart: not fetched; the docs.github.com overview was enough for what moves on by itself, and it is a separate site.
- Other session entry points (Mobile, IDEs, REST API, GitHub CLI, MCP server, Raycast, Jira, Slack, Teams, Azure Boards, Linear): the start-copilot-sessions page lists them as ways to start the same agent; per-surface differences beyond the research and plan note above are not needed for lesson 1.
- Third-party agents, agent apps, OpenAI Codex, Anthropic Claude pages: other agents, not the Copilot cloud agent's own flow.
- Copilot code review, `/fleet` parallel runs, sandboxes, the risks-and-mitigations page, access and enterprise policy, model selection, billing, and the settings page: review, parallelism, isolation, ops and policy, which are outside lesson 1 scope. The risks-and-mitigations URL returned 404 at the `.md` path I tried.
- The Shipwright site pages named in the task (compare.astro and vs/*.astro): marketing for another product, context only; none of their wording or claims about Copilot was used.
