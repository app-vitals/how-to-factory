# GitHub Copilot (cloud agent, CLI, code review): verification grid

Scope: how Copilot verifies work, meaning what checks run, who decides a task is done, whether the product runs the app
itself, what keeps it going, and what evidence the person sees. Left out on purpose: how plans are made (see
`landscape/plan-grid/copilot.md`), sandbox and permission design, custom agents and skills, and review policy beyond what
it says about verifying. Every filled cell is a paraphrase of a first-party page, with its URL and the date I fetched it
(**2026-10-23**). Names are GitHub's own (cloud agent, autopilot, `agentStop` hook, validation tools, Agentic Workflows),
not canonical. Several surfaces are used because no single one covers every dimension; each row names its surface.

Method: fetched the docs index (https://docs.github.com/llms.txt, 2026-10-21). It lists only a handful of Copilot pages, so
the usable index is the docs' own section index pages, read as Markdown (append `.md`): the cloud agent how-to index
(https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent), the agents how-to index
(https://docs.github.com/en/copilot/how-tos/use-copilot-agents), the cloud agent tutorials index
(https://docs.github.com/en/copilot/tutorials/cloud-agent) and the customize-cloud-agent index
(https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent). From those I listed
every page that could touch verification, then fetched each. The fetch tool returns a model-written summary of a page, not
raw text, so quoted phrases below are short and were checked against that summary; a claim that rests on a thinly
summarised page is marked "(summary)". Started from `landscape/field-grid/copilot.md` (2026-10-13) but every page was
fetched again; its notes are not carried over unchecked.

## The grid

Surfaces: **Cloud agent session** (assigned issue, `/task`, agents tab), **Cloud agent hooks** (`.github/hooks`),
**PR follow-up** (`@copilot`, fix-the-failing-run button), **Copilot CLI** (task agent, autopilot, plan mode),
**Code review** (Copilot reviewer on a pull request), **Automation** (cloud agent on a trigger), **Agentic Workflows /
dynamic workflows** (public preview), **Repository settings and guardrails** (rulesets, validation tools, workflow approval).

| Surface | Dimension | Value | Source | As of |
| --- | --- | --- | --- | --- |
| Cloud agent session | what runs | The agent works in its own short-lived development environment powered by GitHub Actions, where it can run automated tests and linters to validate changes before it pushes. The session log shows its reasoning and the tools it used to understand the repo, change it and validate it. Which commands run is not fixed by the product; the best-practices page has the repo say so in custom instructions (its example lists `make fmt`, `make build`, `make test`, `make ci`) and pre-install dependencies in a `copilot-setup-steps.yml` workflow | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment | 2026-10-23 |
| Cloud agent session | who decides done | The person. When the agent finishes it adds the person as reviewer; the tutorial says to review the changes yourself and that Copilot does not replace you as a developer. A session started from a plain prompt does not open a PR unless the prompt asks, and the person decides after reviewing the diff whether to iterate more or create one; the improve-a-project tutorial has the person click Ready for review on the PR and then merge by their usual process | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github ; https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate | 2026-10-23 |
| Cloud agent session | runs the app itself | Not documented as a feature. The pages say it runs tests and linters; none read says it starts the app, drives a browser or takes screenshots (checked: manage-and-track-agents, copilot-on-github, get-the-best-results, customize-the-agent-environment, configuring-agent-settings, use-cloud-agent-on-github) | https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents | 2026-10-23 |
| Cloud agent session | how it keeps going | Not documented as a retry-until-green rule: the pages say it can run tests and linters before pushing, not that it loops until they pass (checked: manage-and-track-agents, use-cloud-agent-on-github, get-the-best-results, troubleshoot-cloud-agent). A person can steer mid-session (applied after the current tool call; each steering message uses AI credits) or stop it, which keeps commits already pushed. The hard limit is 59 minutes per session, which "cannot be extended or bypassed" (summary); the troubleshooting page says a stuck session times out after an hour and can be retried by unassigning and reassigning the issue | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent | 2026-10-23 |
| Cloud agent session | acceptance criteria turned into checks | In the task text, not automatic. The best-practices page says a well-scoped task has complete acceptance criteria (its example: should there be unit tests?); the improve-a-project tutorial says to check each issue has acceptance criteria Copilot can use to verify its work. No conversion into test files is described | https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results ; https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project | 2026-10-23 |
| Cloud agent session | per-task test planning | Only through the task and the repository instructions: the best-practices page says to state whether unit tests are required and to put testing expectations in custom instructions (its examples include a Go instruction to use table-driven unit tests and a path-specific Playwright instructions file). A per-task test plan produced by the product: not documented (checked: research-plan-iterate, get-the-best-results) | https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate | 2026-10-23 |
| Cloud agent session | coverage or speed limits | The 59-minute session cap above; `timeout-minutes` in the setup workflow is capped at 59 as well. If a setup step fails with a non-zero exit code, Copilot skips the remaining setup steps and starts with the current state, so a broken setup can leave the agent without its build and test dependencies. Coverage thresholds: not documented (checked: get-the-best-results, customize-the-agent-environment) | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment ; https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github | 2026-10-23 |
| Cloud agent session | evidence shown to the person | The session log (reasoning and tools used, token usage, session length), commit messages that link back to the log, and the PR diff. Screenshots or recordings: not documented (manage-and-track-agents, copilot-on-github) | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents ; https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results | 2026-10-23 |
| Cloud agent session | guard against weakening tests | Not documented. The best-practices summary says the page does not address whether Copilot changes or weakens existing tests and leaves it to the person's review (checked: get-the-best-results, review-copilot-output, use-cloud-agent-on-github, copilot-on-github, build-guardrails) | https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output | 2026-10-23 |
| Cloud agent session | CI required or branch protection | Workflows do not run on Copilot's pushes until a person clicks "Approve and run workflows" in the merge box, and the pages warn that workflows can be privileged and may touch secrets, so the person should inspect the changes (especially `.github/workflows/`). A person's own approval of a Copilot PR does not count toward required approvals. The cloud agent is blocked from pushing to default branches and from merging its own PRs, and is subject to rulesets like a human; the limitations page adds that an incompatible ruleset or branch protection rule can block the agent's access. Whether a CI check is required for merge is repository configuration, not something Copilot sets | https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output ; https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails ; https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github | 2026-10-23 |
| Cloud agent hooks | how it keeps going | A person-written `agentStop` hook can return `decision: "block"` with a required `reason`, which forces another agent turn using the reason as the prompt; `subagentStop` does the same for a sub-agent. The input carries `stop_hook_active`, true when the turn was already forced to continue, so a script can avoid looping. For the cloud agent a forced turn still counts against the job's timeout. The 8-consecutive-block override is stated for the CLI only (summary). Hook files load from `.github/hooks/*.json` in the cloned repo; the cloud agent does not load user-level or plugin hooks | https://docs.github.com/en/copilot/reference/hooks-reference | 2026-10-23 |
| Cloud agent hooks | who decides done | The hook script, i.e. the person's own check. Copilot ships no default test or lint hook; the hooks how-to's examples only log (no lint or test example), and its event list names six events without `agentStop`, so the stop behaviour is on the reference page alone | https://docs.github.com/en/copilot/reference/hooks-reference ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/use-hooks | 2026-10-23 |
| Cloud agent hooks | what runs | `postToolUse` fires after a tool finishes and can replace the tool result or append context (capped at 10 KB across hooks); `preToolUse` can approve or deny a tool call, which the concepts page describes as the way to block dangerous commands and enforce policies. The customize-cloud-agent index describes the hooks page as a place for checks such as linting, formatting or security scans, but the page's own examples are logging only | https://docs.github.com/en/copilot/reference/hooks-reference ; https://docs.github.com/en/copilot/concepts/agents/hooks ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent | 2026-10-23 |
| PR follow-up | post-PR auto-fix | Three documented paths, each started by a person: an `@copilot` comment (context from earlier sessions on the same PR is kept); "Fix with Copilot" on review comments; and, on a failing Actions job page, a button that asks Copilot to investigate, find the cause and push a fix to the branch. For merge conflicts it resolves them and verifies that build, tests and linter still pass, then requests the person's review. The troubleshooting page points to a `.github/copilot-instructions.md` file when Copilot pushes changes that fail CI | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review | 2026-10-23 |
| PR follow-up | who decides done | The person: each round starts from a comment, button click or run selection, and the PR is merged only after the person reviews it. Because the agent's pushes do not trigger workflows until approved (see above), a CI result for a follow-up commit also waits for a person | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output | 2026-10-23 |
| Copilot CLI | what runs | A built-in Task agent "executes commands such as tests and builds", with a brief summary on success and full output on failure; there is also a Code review agent that reviews changes while skipping noise (summary). Copilot asks before using tools that modify or execute files unless the person approves them for the session | https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview | 2026-10-23 |
| Copilot CLI | who decides done | In autopilot, the agent itself: the page says Copilot determines when the task is complete. The person is involved up front (grants permissions, gives the instruction) and can press Ctrl+C; the page advises a specific prompt that includes the outcome and checks expected | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot | 2026-10-23 |
| Copilot CLI | how it keeps going | Autopilot continues without per-step approval and stops when the task is complete, a problem occurs, the person interrupts, or the continuation limit is reached. `--max-autopilot-continues=COUNT` caps automatic continuations (the page does not state a default value or an example count). The page recommends running the relevant tests, linters and security checks before committing or pushing, but gives no procedure for CI failures: not documented there. The same `agentStop` block hook as the cloud agent applies in the CLI, with the 8-consecutive-block override | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot ; https://docs.github.com/en/copilot/reference/hooks-reference | 2026-10-23 |
| Copilot CLI | per-task test planning | Plan mode (cycle in and out with Shift+Tab) builds a plan before code, but the pages read do not say a plan names tests (checked: cli overview, autopilot) | https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview | 2026-10-23 |
| Code review | what runs | Copilot reads the pull request and gives feedback with suggested changes that can be applied in a couple of clicks. The page does not mention it running tests, linters or CodeQL (summary of use-code-review) | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review | 2026-10-23 |
| Code review | who decides done | By default Copilot leaves a "Comment" review, not Approve or Request changes, so it does not count toward merge requirements; when enabled it can submit an approving review that satisfies the required-approval rule. Reviews are by request unless automatic review is set up by rulesets, with a "Review new pushes" option; otherwise a re-review has to be requested after new commits | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review | 2026-10-23 |
| Code review | post-PR auto-fix | "Fix with Copilot" on a review comment invokes the cloud agent to implement the suggested change | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review | 2026-10-23 |
| Automation | what runs | A saved task started by a trigger: a schedule (hourly, daily, weekly), issue created, PR opened, or PR synchronized (new commits pushed), with optional filters. One example is a nightly check for failing tests on `main` that attempts a fix and opens a draft PR | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations | 2026-10-23 |
| Automation | post-PR auto-fix | The PR-synchronized trigger lets an automation react to new commits on a PR; the page does not describe a review-comment fixer or a CI-failure fixer as such (summary) | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations | 2026-10-23 |
| Automation | CI required or branch protection | PRs and pushes from an automation are attributed to the person who created it, who then cannot approve them; workflows on those PRs do not run until someone with write access approves | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations | 2026-10-23 |
| Agentic Workflows (public preview) | what runs | Markdown-defined workflows on Actions; the page lists investigating CI failures with suggested fixes and improving test coverage among use cases. Write actions go only through declared safe outputs, and proposed outputs are scanned for unsafe changes before they apply. Outputs are issues, comments and PRs; the person controls approvals and merges | https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows | 2026-10-23 |
| Dynamic workflows (public preview) | how it keeps going | A workflow is code: steps, when to involve agents and how to use their results are defined by its author. It can have sub-agents verify each other's findings (the page's example reports a finding only when two models agree) and pause at a checkpoint so the person can review results and resume the run. Limits can be set on concurrent and total sub-agents, running time and AI credits; new work stops when the credit total is reached | https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows | 2026-10-23 |
| Repository settings and guardrails | what runs | Validation tools are on by default: the cloud agent checks the code it generates for security issues and gets a second opinion on it with Copilot code review; the checks cover problems such as hardcoded secrets and insecure dependencies. They can be switched off under Settings > Copilot > Cloud agent > Validation tools. The page does not list individual tools | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings | 2026-10-23 |
| Repository settings and guardrails | CI required or branch protection | The guardrails tutorial says to consider code scanning or Code Quality checks as required checks where agents work, a "Require review from Code Owners" rule for critical configuration files, and notes that restrictions on commit metadata may be unmet by the agent. Workflows are blocked on agent PRs until write-access approval by default; a repository admin can turn off "Require approval for workflow runs", with a warning that this lets unreviewed code reach secrets, and the guardrails tutorial says policies set a baseline at enterprise level that organization owners can restrict further | https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings | 2026-10-23 |

## Not documented (with pages checked)

- Whether the cloud agent starts the app, drives a browser or captures screenshots or recordings: copilot-on-github,
  manage-and-track-agents, get-the-best-results, customize-the-agent-environment, configuring-agent-settings,
  use-cloud-agent-on-github. (The MCP customization page returned 404 at the path tried, so MCP-provided browser tools were
  not checked.)
- A built-in rule that the cloud agent keeps going until a named check passes: manage-and-track-agents,
  use-cloud-agent-on-github, get-the-best-results, troubleshoot-cloud-agent. Only the person-written `agentStop` hook
  (hooks-reference) forces another turn.
- Any guard against an agent weakening or deleting tests: get-the-best-results, review-copilot-output,
  use-cloud-agent-on-github, copilot-on-github, build-guardrails, hooks-reference. Hooks could be written to do it
  (`preToolUse` can deny a tool call), but no page says so for tests.
- A product-made per-task test plan, or a conversion of acceptance criteria into tests: research-plan-iterate,
  get-the-best-results, improve-a-project, Copilot CLI overview.
- Coverage thresholds or per-run test limits: get-the-best-results, customize-the-agent-environment.
- Whether Copilot code review runs tests, linters or CodeQL, and whether it is a required check by default: use-code-review
  (it can approve only when that is enabled).
- A CI-failure auto-fix that starts without a person (cloud agent): use-cloud-agent-on-github, troubleshoot-cloud-agent,
  about-automations. The only documented routes are person-started, or an automation or Agentic Workflow the person builds.
- How the CLI's default continuation count and its 8-block hook cap interact: autopilot, hooks-reference.
- Whether the 8-block runaway cap also applies to the cloud agent: hooks-reference states it for the CLI only.
- Names of the individual validation tools (for example CodeQL or secret scanning): configuring-agent-settings,
  copilot-on-github, build-guardrails. Only the collective toggle is documented.
- `agentStop` in the cloud-agent hooks how-to: this page's event list has no `agentStop`; the field grid of 2026-10-13 had
  the same finding. The reference page is the only source for blocking.

## Pages read

First fetched 2026-10-21 as Markdown (`.md` suffix) except where the `.md` form returned 404 and the plain URL was used
(about-automations, hooks concepts, Agentic Workflows concepts, dynamic workflows concepts, autopilot). The tool returns a
summary; none of the pages was seen as verbatim text. Every page below except the four index pages and pilot-cloud-agent was fetched again on 2026-10-23 and each cell was re-checked against it.

- Index pages: https://docs.github.com/llms.txt ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent ; https://docs.github.com/en/copilot/tutorials/cloud-agent ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate
- https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results
- https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project
- https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
- https://docs.github.com/en/copilot/tutorials/cloud-agent/pilot-cloud-agent (no verification content beyond pointing to the guardrails page)
- https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/use-hooks
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review
- https://docs.github.com/en/copilot/reference/hooks-reference
- https://docs.github.com/en/copilot/concepts/agents/hooks
- https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot
- https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations
- https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows
- https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows

## Ruled out (why)

- **404 at the path tried**: `.../concepts/agents.md`, `.../concepts/agents/code-review`, `.../concepts/agents/cloud-agent/about-cloud-agent`,
  `.../concepts/agents/cloud-agent/risks-and-mitigations`, `.../concepts/agents/cloud-agent/agent-management`,
  `.../how-tos/.../customize-cloud-agent/extend-cloud-agent-with-mcp`, and the `.md` forms of the concepts pages for hooks,
  automations, Agentic Workflows and dynamic workflows (the plain URLs worked). Code review was read from the how-to
  instead; the other 404 pages were not retried.
- **gh-aw site (github.github.com/gh-aw)**: not docs.github.com and not Copilot product docs; the field grid used it for
  queueing, which is not verification. Not re-read.
- **Custom agents, skills, MCP, Copilot Memory, plugins**: shape what an agent knows or can call, not how its work is checked.
- **Other session entry points (mobile, API, GitHub CLI, MCP server, Raycast, agent apps)**: start the same agent.
- **Model selection, billing, policy and enterprise pages, give-access-to-resources, secrets and variables**: not verification.
- **Third-party agents and partner agent apps**: other agents, not Copilot's own flow.
- **Shipwright site pages and any third-party comparison**: marketing for other products; no wording or claims used.

## Added dimensions: hidden tests and test quality (fetched 2026-10-29)

Two new dimensions, plus property-based and fuzz testing where documented. The dimensions above are not repeated. Method: the docs
index (https://docs.github.com/llms.txt, 2026-10-29) was fetched first. It lists few Copilot pages and no page for Code Quality,
agent hooks, Agentic Workflows or autopilot, so candidates came from the page set in "Pages read" above plus two code-security pages
(Code Quality and code scanning concepts) that the guardrails tutorial points to. Each was fetched again and asked about these topics
only. As above, the fetch tool returns a condensed extraction, so each "not documented" rests on that tool reporting the topic absent
from the page. Surfaces covered: cloud agent session, cloud agent hooks, PR follow-up, Copilot CLI (including autopilot and its code
review agent), code review, automation, Agentic Workflows, dynamic workflows, and repository guardrails with Code Quality and code
scanning.

| Surface | HIDDEN OR HELD-OUT TESTS | TEST-QUALITY MEASURE (mutation score or similar) | PROPERTY-BASED OR FUZZ TESTING |
| --- | --- | --- | --- |
| **Cloud agent session** | Not documented (checked: get-the-best-results, improve-a-project, configuring-agent-settings). The agent runs the repo's own tests and linters in its environment, so nothing says any check is withheld from it. ([Best practices](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results), [Agent settings](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings), 2026-10-29) | Not documented (checked: get-the-best-results, improve-a-project). No grading of the tests the agent writes. The only second look is the built-in validation, where the agent asks Copilot code review for an opinion on its own code and tries to resolve what comes back; the page frames this around security issues such as hardcoded secrets and insecure dependencies, not test quality. ([Agent settings](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings), 2026-10-29) | Not documented (checked: get-the-best-results, improve-a-project, configuring-agent-settings). |
| **Cloud agent hooks** | Not documented (checked: hooks-reference, use-hooks, hooks concepts). The how-to says the hooks configuration file must be on the repository's default branch, under `.github/hooks/`. No page says whether this keeps the agent from editing it or treats hook scripts as held-out checks; reference and concepts pages are silent on agent permission to change hook config. ([Use hooks](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/use-hooks), [Hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference), [Hooks concepts](https://docs.github.com/en/copilot/concepts/agents/hooks), 2026-10-29) | Not documented (checked: use-hooks, hooks-reference, hooks concepts). A person-written hook could run any script, but no page offers a test-grading one. | Not documented (checked: use-hooks, hooks-reference, hooks concepts). |
| **PR follow-up** | Not documented (checked: use-cloud-agent-on-github, as read for the grid above; code scanning concepts). Code scanning findings appear as alerts in the repository, so authors see them; no withheld checks are mentioned. ([Code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/about-code-scanning), 2026-10-29) | Not documented (checked: code scanning concepts, use-cloud-agent-on-github). | Not documented (checked: code scanning concepts). |
| **Copilot CLI** | Not documented (checked: CLI overview, autopilot). The overview lists a code review agent that reports only genuine issues; nothing says it sees material the coding agent does not, or the reverse. ([CLI overview](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview), [Autopilot](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot), 2026-10-29) | Not documented (checked: CLI overview, autopilot). Autopilot's page only advises the person to run relevant tests, linters and security checks before committing. | Not documented (checked: CLI overview, autopilot). |
| **Code review** | Not documented (checked: use-code-review). The page does not say what the reviewer is given or withheld, nor whether it can see the full test suite. ([Use code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review), 2026-10-29) | Not documented (checked: use-code-review). No assessment of the quality or coverage of the tests in a PR is described. | Not documented (checked: use-code-review). |
| **Automation** | Not documented (checked: about-automations). The page covers triggers, tools, billing and security, and no withheld checks. ([About automations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations), 2026-10-29) | Not documented (checked: about-automations). | Not documented (checked: about-automations). |
| **Agentic Workflows (public preview)** | Not documented (checked: about-github-agentic-workflows). ([Agentic Workflows](https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows), 2026-10-29) | Not documented as a measure. The page lists improving test coverage as a use case but, per the extraction, does not say how a workflow would judge whether the added tests are any good (checked: about-github-agentic-workflows). | Not documented (checked: about-github-agentic-workflows). |
| **Dynamic workflows (public preview)** | Not documented (checked: dynamic-workflows). The page's cross-checking example has two models judge whether review comments still matter and reports a finding only when both agree, but the extraction does not say what the second model is shown versus the first. ([Dynamic workflows](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows), 2026-10-29) | Not documented (checked: dynamic-workflows). | Not documented (checked: dynamic-workflows). |
| **Repository guardrails, Code Quality, code scanning** | Closest thing, and not a hidden-test design: the agent is subject to rulesets like a human developer, so a required result (the tutorial names code scanning or Code Quality) can block its PR. Nothing says the agent cannot see or run those checks. ([Build guardrails](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails), 2026-10-29) | Partly, as coverage only. Code Quality shows line coverage on a PR, whether the change raises or lowers it against the default branch, and rulesets can enforce quality and coverage thresholds to block PRs. It does not grade whether tests would catch a broken change; the page describes no mutation or similar measure, and the extraction did not tie coverage to the cloud agent's own PRs. Its other checks are CodeQL rules and AI analysis of changed files, which look at code, not at test strength. ([About Code Quality](https://docs.github.com/en/code-security/code-quality/concepts/about-code-quality), 2026-10-29) | Not documented (checked: About Code Quality, code scanning concepts, build-guardrails). |

Takeaways for the lesson, all from the cells above:

- No page read documents held-out or hidden tests. The only nearby design is the guardrail route: rulesets and required checks apply to the agent's PR, and hook config is read from the default branch, but no page says either is meant to keep checks out of the agent's view.
- The nearest test-quality measure is Code Quality's line coverage with threshold rules. That is coverage, not mutation score; nothing documented checks that the tests an agent wrote would fail on broken code.
- Property-based and fuzz testing are not documented on any page read.

### Pages read (added dimensions)

All fetched 2026-10-29, index first (https://docs.github.com/llms.txt). Condensed extraction, see Method above.

- https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results
- https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
- https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review
- https://docs.github.com/en/copilot/reference/hooks-reference
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/use-hooks
- https://docs.github.com/en/copilot/concepts/agents/hooks
- https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot
- https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview
- https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows
- https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations
- https://docs.github.com/en/code-security/code-quality/concepts/about-code-quality
- https://docs.github.com/en/code-security/concepts/code-scanning/about-code-scanning

### Ruled out (why), added dimensions

- **use-cloud-agent-on-github, manage-and-track-agents, review-copilot-output, research-plan-iterate, customize-the-agent-environment, troubleshoot-cloud-agent, copilot-on-github**: read for the grid above on 2026-10-23; not fetched again on 2026-10-29 for these dimensions, so the PR follow-up row leans on the earlier reading plus the code scanning page.
- **Release notes and GitHub changelog**: not searched; a newer entry could announce a held-out-test or test-quality feature the docs pages do not describe. A gap, not a finding.
- **Copilot Autofix and other code scanning sub-pages, Code Quality setup and ruleset pages**: not fetched; they may say more about coverage thresholds for agent PRs.
- **gh-aw site (github.github.com/gh-aw)**: not docs.github.com; not read, so Agentic Workflows internals beyond the concepts page are unchecked.
- **Custom agents, skills, MCP, plugins, models, billing, policy and enterprise pages**: shape what an agent knows or costs, not how its tests are hidden or graded.
- **Third-party agents, benchmark papers and any comparison or marketing page**: other products or not first-party docs; no wording or claims used.
