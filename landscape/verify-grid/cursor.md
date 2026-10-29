# Cursor: verification grid

Scope: how Cursor verifies work, meaning what checks run, who decides a task is done, whether the product runs the app
itself, what keeps it going, and what evidence the person sees. Left out on purpose: how plans are made (see
`landscape/plan-grid/cursor.md`), sandbox and permission design, and review policy beyond what it says about verifying.
Every filled cell is a paraphrase of a first-party page, with its URL and the date I fetched it (**2026-10-23**). Names
are Cursor's own (Cloud Agents, Bugbot, Hooks, Subagents), not canonical. Several surfaces are used because no single one
covers every dimension; each row names its surface.

Method: fetched the docs index (https://cursor.com/docs/llms.txt, 2026-10-23), listed every page that could touch
verification (cloud agents, capabilities, best practices, hooks, subagents, skills, Agent Review, Bugbot, Security Agents,
PR Routing & Approval, Debug Mode, the browser and terminal tools, Automations, CLI headless and GitHub Actions), then
fetched the raw Markdown (`<url>.md`) of each with a plain HTTP download and read it. The page-summarising fetch tool
returned 404 for these URLs, so nothing here rests on a model-written summary; quoted phrases are verbatim from the page
text. Started from `landscape/field-grid/cursor.md` (2026-10-13) but every page was fetched again; its notes are not
carried over unchecked.

## The grid

Surfaces: **Cloud agent** (isolated VM, started from the Agents Window, web, Slack, GitHub, Linear or the API),
**Interactive Agent** (editor or Agents Window, with the browser and terminal tools), **Verifier subagent** (a
person-written pattern), **Hooks** (`stop`, `subagentStop`, `preToolUse`, `beforeShellExecution`, `afterFileEdit`),
**`/goal`** (long-lived objective), **Agent Review** (local review), **Bugbot** (PR review and Autofix), **Security
Agents and PR Routing & Approval**, **Automation** (triggered cloud agents), **CLI print mode** (`agent -p`).

| Surface | Dimension | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Cloud agent | what runs | The agent can "build, test, and interact with the changed software" in its own VM. Which checks run is the agent's choice from the prompt, skills, `agents.md` and rules; the best-practices page says to commit skills and `agents.md` that explain how to test and debug services if the agent struggles to test. A fixed set of commands that always runs before a PR: not documented (checked: cloud-agent, capabilities, best-practices) | https://cursor.com/docs/cloud-agent.md ; https://cursor.com/docs/cloud-agent/best-practices.md | 2026-10-23 |
| Cloud agent | runs the app itself | Yes: a full desktop VM where the agent uses mouse and keyboard on the desktop and browser; it can "start dev servers, open the app in a browser, click through UI flows, and verify their changes work before pushing a PR". The docs call environment setup the most important step because an agent that cannot run tests "cannot close the loop on its work" | https://cursor.com/docs/cloud-agent/capabilities.md ; https://cursor.com/docs/cloud-agent.md | 2026-10-23 |
| Cloud agent | who decides done | Not stated as a gate. The agent produces a "merge-ready" PR with artifacts, and the person validates from them or takes over the agent's desktop to test it; the page names no pass rule the agent must meet before it opens the PR | https://cursor.com/docs/cloud-agent.md ; https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| Cloud agent | evidence shown to the person | Artifacts (screenshots, videos, log references) attached to the PR "so you can quickly validate changes without checking out the branch locally". Embedding them in the GitHub PR description is an opt-in setting and uses public, unguessable URLs. A teammate in the same Cursor team who has connected source control and has access to the repository can open the run to see the conversation, changes and artifacts (viewing is read-only) | https://cursor.com/docs/cloud-agent/capabilities.md ; https://cursor.com/docs/cloud-agent.md | 2026-10-23 |
| Cloud agent | how it keeps going | It tries to fix CI failures on PRs it created (GitHub Actions only; the page says Teams plans). It skips when a person pushed a new commit, when a follow-up message was sent, when the same check already fails on the base commit, and after 10 CI-failure follow-ups. `@cursor autofix off` / `on` on a PR, or a dashboard setting, toggles it | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| Cloud agent | CI required or branch protection | Subscriptions wait until every check on the commit completes and return one result (success, or the failed check names). For slow checks the page advises finishing them with GitHub's `action_required` conclusion, which still blocks merge when the check is required. Whether Cursor requires CI before opening a PR: not documented (same pages) | https://cursor.com/docs/cloud-agent/capabilities.md | 2026-10-23 |
| Cloud agent | coverage or speed limits | Not documented as limits. The best-practices page advises a repo that "runs well locally without requiring external services that cannot be reached from a VM", and egress restrictions can block URLs the tests need | https://cursor.com/docs/cloud-agent/best-practices.md | 2026-10-23 |
| Cloud agent | acceptance criteria turned into checks | Not documented (checked: cloud-agent, capabilities, best-practices, skills). The prompt, a skill or a rule is where the person states them | https://cursor.com/docs/cloud-agent/best-practices.md | 2026-10-23 |
| Cloud agent | guard against weakening tests | Not documented as a built-in (same pages). Hooks run in cloud agents and could be written to do it; see the Hooks rows | https://cursor.com/docs/cloud-agent.md | 2026-10-23 |
| Interactive Agent | runs the app itself | The browser tool lets Agent control a browser to test applications, with screenshots shown in chat, console logs and (in the Agent panel) network traffic. The page's example prompts ask it to fill forms, click through workflows and watch the console for errors | https://cursor.com/docs/agent/tools/browser.md ; https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| Interactive Agent | what runs | Agent runs shell commands in the terminal under the person's Run Mode, which decides when commands run or ask. No built-in test step is named | https://cursor.com/docs/agent/tools/terminal.md | 2026-10-23 |
| Interactive Agent | who decides done | The person, turn by turn; Checkpoints let them restore files if a turn went wrong. A pass rule: not documented (checked: agent/overview, browser, terminal) | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| Verifier subagent | what runs | Not built in. The Subagents page gives a `verifier` example the person saves as `.cursor/agents/verifier.md`: a "skeptical validator" that identifies what was claimed done, checks the implementation exists and works, runs relevant tests or verification steps, looks for missed edge cases, and reports what passed, what is incomplete and the issues | https://cursor.com/docs/subagents.md | 2026-10-23 |
| Verifier subagent | who decides done | The verifier reports; the parent agent or person acts on the report. Nothing forces it to run: the person calls it (`/verifier ...`) or the parent chooses it from the description ("use after tasks are marked done") | https://cursor.com/docs/subagents.md | 2026-10-23 |
| Hooks | how it keeps going | `stop` runs when the agent loop ends and can return `followup_message`, which Cursor submits as the next user message ("iterate until a goal is met"). Default cap is 5 automatic follow-ups per script (`loop_limit`; `null` removes it); the hook receives `loop_count` and a status of completed, aborted or error. The same limit applies to `subagentStop`. This is how a project can force a final check, but the script is the person's | https://cursor.com/docs/hooks.md | 2026-10-23 |
| Hooks | who decides done | The hook script, i.e. the person's own check. The hooks page documents no default test hook | https://cursor.com/docs/hooks.md | 2026-10-23 |
| Hooks | guard against weakening tests | Possible, not provided. `preToolUse` and `beforeShellExecution` can return deny (exit code 2 also blocks), and `afterFileEdit` observes edits; the page's worked examples guard git commands and Kubernetes manifests, none protects test files. Failures fail open by default; `failClosed: true` makes a crash or timeout block the action | https://cursor.com/docs/hooks.md | 2026-10-23 |
| Hooks | CI required or branch protection | Cloud agents run command-based hooks from the repo's `.cursor/hooks.json` (not user-level hooks; none run in the early read-only turns). Enterprise team hooks can be pushed from the dashboard | https://cursor.com/docs/hooks.md ; https://cursor.com/docs/cloud-agent.md | 2026-10-23 |
| `/goal` | how it keeps going | A long-lived objective worked "until it's fully complete", example `/goal fix all flaky tests and make CI green`; Ctrl+C pauses it in the CLI; "rolling out". The stopping test, retry limit and judge: not documented (agent/overview checked) | https://cursor.com/docs/agent/overview.md | 2026-10-23 |
| Built-in skills | how it keeps going | `/autopilot` "monitors a pull request and addresses feedback, conflicts, failing checks, and follow-up work"; `/loop` repeats a prompt or skill on an interval. Limits for either: not documented (skills checked) | https://cursor.com/docs/skills.md | 2026-10-23 |
| Agent Review | what runs | A dedicated code review of local changes, run automatically after each commit, with `/agent-review`, or from the Source Control tab against the main branch; Quick or Deep depth. It reads repository rules from `BUGBOT.md`. Whether it runs tests: not documented (agent-review read in full) | https://cursor.com/docs/agent/agent-review.md | 2026-10-23 |
| Agent Review | who decides done | Not stated; the page describes running a review and picking a depth, nothing about gating | https://cursor.com/docs/agent/agent-review.md | 2026-10-23 |
| Bugbot | what runs | Analyzes PR diffs and leaves comments with explanations and fix suggestions, on each PR update or manually. Running tests or the app: not documented (bugbot read in full). Rules come from team rules, `.cursor/BUGBOT.md` files and learned rules; `.cursor/rules/*.mdc` project rules do not apply to Bugbot | https://cursor.com/docs/bugbot.md | 2026-10-23 |
| Bugbot | acceptance criteria turned into checks | A written rule can turn a standard into a blocking finding. The page's example: if backend files change with no test files changed, add a blocking Bug "Missing tests for backend changes". That is a rubric over the diff, not a test run | https://cursor.com/docs/bugbot.md | 2026-10-23 |
| Bugbot | CI required or branch protection | Publishes a check named `Cursor Bugbot` (success, neutral or failure). Findings default to `neutral`, so requiring the check "does not block merges on findings"; only a fail-on-unresolved-issues option, where available to the organization, makes findings produce a failing status | https://cursor.com/docs/bugbot.md | 2026-10-23 |
| Bugbot | post-PR auto-fix | Autofix spawns a cloud agent to fix reported bugs, pushing to a new branch (recommended) or the existing one, then comments on the PR. Commit to Existing Branch is capped at 3 attempts per PR "to prevent loops". Its own check, `Cursor Bugbot Autofix`, is only success or neutral | https://cursor.com/docs/bugbot.md | 2026-10-23 |
| Security Agents | what runs | A Security Reviewer checks PRs before merge and a Vulnerability Scanner scans the code at rest; both run on Automations and need Cloud Agents. How they decide, whether they block merges: not documented on the overview page read | https://cursor.com/docs/security-agents.md | 2026-10-23 |
| PR Routing & Approval | who decides done | An agent can approve low-risk PRs when the person's approval criteria are met, using risk scoring, `APPROVAL_POLICY.md` files, and optionally Bugbot and Security Agent findings (it waits for those checks). If they report findings needing human review, it will not approve. The page says it does not replace a full code review | https://cursor.com/docs/approval-agents.md | 2026-10-23 |
| Automation | what runs | A trigger starts a cloud agent with a saved prompt; triggers include a pull-request event and "CI completed" (a GitHub check finishing on a PR or branch). What the run verifies is whatever the prompt asks. Memories keep notes between runs | https://cursor.com/docs/cloud-agent/automations.md | 2026-10-23 |
| CLI print mode | who decides done | The script. Output formats are text, JSON and stream-JSON, and the headless page's examples check results in shell and exit non-zero themselves. A built-in "until a check passes" option: not documented (headless, github-actions read) | https://cursor.com/docs/cli/headless.md | 2026-10-23 |
| CLI print mode | evidence shown to the person | Whatever the script prints or posts. The GitHub Actions page recommends giving the agent file edits only and keeping commits, pushes and PR comments in deterministic workflow steps, and also shows a fully autonomous variant | https://cursor.com/docs/cli/github-actions.md | 2026-10-23 |
| Debug Mode | evidence shown to the person | The agent adds log statements, asks the person to reproduce the bug, reads the logs, makes a targeted fix, then the person re-runs the reproduction to verify; the agent removes the instrumentation once confirmed. Human in the loop by design | https://cursor.com/docs/agent/debug-mode.md | 2026-10-23 |

## Not documented (with pages checked)

- A fixed set of checks (tests, lint, typecheck) that a cloud agent always runs before opening a PR, and a pass rule for
  "done": cloud-agent, cloud-agent/capabilities, cloud-agent/best-practices, skills.
- Acceptance criteria turned into tests or checks, and per-task test planning: the same pages, plus agent/overview and
  bugbot. The nearest items are the verifier example and Bugbot's written-rule example above.
- A guard against an agent weakening or deleting tests (any surface): hooks, cloud-agent, subagents, bugbot,
  cloud-agent/best-practices. Hooks could be written to do it, but no page says so.
- `/goal`'s stopping test, retry limit and judge, and `/autopilot` and `/loop` limits: agent/overview, skills.
- Whether Agent Review or Bugbot runs tests or the app: agent/agent-review, bugbot.
- Coverage or speed budgets for any surface: cloud-agent/best-practices, hooks, bugbot.
- Whether Security Agents or PR Routing & Approval findings are enforced as required checks: security-agents,
  approval-agents.
- A retry-until-green option in CLI print mode: cli/headless, cli/github-actions.

## Pages read

Fetched 2026-10-23 as raw Markdown (`<url>.md`). Read in full unless noted.

- https://cursor.com/docs/llms.txt (the docs index)
- https://cursor.com/docs/cloud-agent.md, cloud-agent/capabilities.md (MCP tool tables skimmed), cloud-agent/best-practices.md,
  cloud-agent/automations.md (trigger and tool sections)
- https://cursor.com/docs/hooks.md (overview, cloud agent support, config options, `stop`, `subagentStop`, permission hooks;
  the per-hook payload reference was searched)
- https://cursor.com/docs/subagents.md (verifier and isolation sections), skills.md (built-in skills table), agent/overview.md
- https://cursor.com/docs/agent/agent-review.md, agent/debug-mode.md, agent/tools/browser.md (searched), agent/tools/terminal.md
- https://cursor.com/docs/bugbot.md (check statuses, rules, autofix, examples; API reference skimmed)
- https://cursor.com/docs/security-agents.md (overview), approval-agents.md
- https://cursor.com/docs/cli/headless.md, cli/github-actions.md

## Ruled out (why)

- **Rules, Plan Mode, Projects**: conventions and planning, not checks; Rules was only searched for test enforcement.
- **Bugbot and cloud-agent API endpoints, webhooks, admin and analytics APIs**: programmatic wrappers and reporting.
- **Sandbox, Run Modes, security and network, OIDC, self-hosted machines**: where work runs and what it may touch.
- **Pricing and billing pages, Origin, other source-control integrations**: not verification content.
- **Help-centre pages**: repeat the docs pages read above.

## Added dimensions: hidden tests and test quality (fetched 2026-10-29)

Two new dimensions, plus property-based and fuzz testing where documented. The dimensions above are not repeated. Method: the
docs index (https://cursor.com/docs/llms.txt, 2026-10-29) was fetched first and its 326 page links scanned; the pages that could
touch tests, checks, review, hooks, subagents, evals or security verification were then downloaded as raw Markdown
(`<url>.md`, plain HTTP, no summarising tool) and read, and the whole set was searched for held-out, hidden, mutation,
property-based, fuzz, coverage and flaky-test wording. The index now lists an Agent SDK section with an Evals page and a
Hillclimbing page that the first grid did not cover; both were read. Surfaces covered: Subagents (verifier example),
Security Agents (remediation agents), Bugbot, Agent Review, Approval agents, Hooks, Cloud agents, Agent SDK evals.

| Surface | HIDDEN OR HELD-OUT TESTS | TEST-QUALITY MEASURE (mutation score or similar) | PROPERTY-BASED OR FUZZ TESTING |
| --- | --- | --- | --- |
| **Verifier subagent** | Partly, as isolation and not as hidden tests. A subagent "start[s] with a clean context" and gets only what the parent puts in the prompt, and the page recommends a verifier for "independent verification of work". Nothing says the verifier holds checks the writing agent cannot see, and the parent can hand it the same tests. ([Subagents](https://cursor.com/docs/subagents.md), 2026-10-29) | Not documented. The verifier example runs "relevant tests" and looks for missed edge cases; it does not judge whether the existing tests are any good (checked: subagents). | Not documented (checked: subagents). |
| **Security Agents, remediation** | Closest design found, and still not hidden. A verification agent writes exploit tests against the real code path, and a separate patch agent then writes the fix and "checks it against the tests". The writer of the tests and the writer of the fix are different agents, but the tests are opened first as a draft PR, so the patch agent and the person can read them. Nothing is withheld. ([Security Agents](https://cursor.com/docs/security-agents.md), 2026-10-29) | Not documented as a measure of tests. The verdicts are Confirmed, Refuted or Inconclusive per finding; the tests are meant to fail until the fix lands (checked: security-agents). | Not documented (checked: security-agents). The tests are exploit tests for one finding. |
| **Bugbot** | Not documented (checked: bugbot). | Not a quality measure. A written rule can raise a blocking finding when backend files change and no test files do ("Missing tests for backend changes"); that checks that tests exist in the diff, not that they would catch a fault. Mutation score or similar: not documented (checked: bugbot). ([Bugbot](https://cursor.com/docs/bugbot.md), 2026-10-29) | Not documented (checked: bugbot). |
| **Agent Review** | Not documented (checked: agent/agent-review). | Not documented (checked: agent/agent-review). ([Agent Review](https://cursor.com/docs/agent/agent-review.md), 2026-10-29) | Not documented (checked: agent/agent-review). |
| **PR Routing & Approval** | Not documented (checked: approval-agents). | Not documented. Approval rests on risk scoring, the person's `APPROVAL_POLICY.md` and Bugbot and Security Agent findings, with no check on how good the PR's tests are (checked: approval-agents). ([Approval agents](https://cursor.com/docs/approval-agents.md), 2026-10-29) | Not documented (checked: approval-agents). |
| **Hooks** | Not documented. No page mentions hiding or protecting test files; hooks could be written to do it, but the page does not say so (checked: hooks). ([Hooks](https://cursor.com/docs/hooks.md), 2026-10-29) | Not documented (checked: hooks). The only "coverage" wording is a sample hook output string, not a feature. | Not documented (checked: hooks). |
| **Cloud agent and Automations** | Not documented. The cloud-agent pages describe the agent testing its own work in its VM, and an Automation runs a saved prompt; nothing keeps checks from the agent (checked: cloud-agent, capabilities, best-practices, automations). ([Cloud agents](https://cursor.com/docs/cloud-agent.md), 2026-10-29) | Not documented (checked: the same four pages). | Not documented (checked: the same four pages). |
| **Agent SDK evals and Hillclimbing** | Not about tests of the agent's code, but it is the only place a fixed hidden-looking set appears. Evals run fixed cases against an agent a team builds with the SDK and check tool calls and answers, from files in `evals/`. The agent under test is not described as being kept from them, and the Hillclimbing page says to hold fixtures fixed and never loosen an existing eval to make a change pass. ([Evals](https://cursor.com/docs/agent-sdk/evals.md), [Hillclimbing](https://cursor.com/docs/agent-sdk/hillclimbing.md), 2026-10-29) | Evals have gate, soft and `atLeast` scoring and a judge model for answer quality. These score an agent's answers, not tests it wrote. Mutation score or similar: not documented (checked: agent-sdk/evals, reference/evals, hillclimbing, guides/improve). ([Evals reference](https://cursor.com/docs/agent-sdk/reference/evals.md), 2026-10-29) | Not documented (checked: agent-sdk/evals, reference/evals). Datasets are fixed JSON, JSONL or YAML rows. |

Takeaways for the lesson, all from the cells above:

- No page documents held-out tests. The nearest design is the Security Agents split, where one agent writes the tests and another writes the fix, but the tests are published first and nothing is hidden. The verifier subagent gives a clean context, not hidden checks.
- Test quality is checked only as presence (Bugbot's missing-tests rule). No page documents mutation score or a check that new tests would fail on a broken change.
- Property-based and fuzz testing are not documented on any page read.

### Pages read (added dimensions)

All fetched 2026-10-29 as raw Markdown, index first (https://cursor.com/docs/llms.txt). Read in full unless noted.

- https://cursor.com/docs/subagents.md
- https://cursor.com/docs/security-agents.md
- https://cursor.com/docs/bugbot.md (searched for test, coverage and quality wording; rules and examples read)
- https://cursor.com/docs/agent/agent-review.md
- https://cursor.com/docs/approval-agents.md
- https://cursor.com/docs/hooks.md (searched)
- https://cursor.com/docs/cloud-agent.md, cloud-agent/capabilities.md, cloud-agent/best-practices.md, cloud-agent/automations.md (searched)
- https://cursor.com/docs/agent-sdk/evals.md, agent-sdk/reference/evals.md, agent-sdk/hillclimbing.md, agent-sdk/guides/improve.md
- https://cursor.com/docs/skills.md, rules.md, agent/overview.md, agent/prompting.md, agent/plan-mode.md (searched)
- https://cursor.com/docs/cli/headless.md, cli/github-actions.md, agent/debug-mode.md, agent/tools/browser.md, agent/tools/terminal.md (searched)

### Ruled out (why), added dimensions

- **`/docs/agent-review.md`**: returned 404; the page is `agent/agent-review.md`.
- **Agent SDK guides and templates (jev, reviews, github, slack, webhooks and the rest)**: jev and the reviews template were read and are about building review agents, with no test content. The others are integrations and were not fetched, so a test remark there would be missed.
- **Cloud-agent API endpoints, webhooks, builds, identity, self-hosted pages, security and network pages**: programmatic wrappers and where work runs, not verification.
- **CLI changelog and Agent SDK changelog**: not searched; a newer entry could announce a held-out or test-quality feature the pages above do not describe. That is a gap, not a finding.
- **Pricing, account, admin and analytics APIs, Origin, enterprise pages, Grok bot pages**: not verification content.
