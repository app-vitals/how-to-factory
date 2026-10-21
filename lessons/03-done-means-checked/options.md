# Options: how the field checks that work is done

Names are not canonical. Every claim below is a paraphrase of a first-party page, taken from the lesson 3 verify grid
([`landscape/verify-grid/`](../../landscape/verify-grid/README.md)) and from [`landscape/matrix.json`](../../landscape/matrix.json)
(rendered in [landscape/README.md](../../landscape/README.md)). Each claim carries its source URL and the date that page was
fetched. Re-check before filming. These appear on slides only; the lesson does not run other products live.

Scope is the lesson 3 step only: finished work is checked before it counts as done. Plan making (lesson 2), ticket selection,
and review as a general activity are left out on purpose (see [brief.md](brief.md)).

## How the field differs

One table per Tier A capability of the [brief](brief.md), in the brief's own ids (A1 to A9). Where a table's dimension is
the same as a column of the verify grid, the cell is that grid cell, in fewer words. In each cell the bold text names the
surface the claim is about, because most products have several (a cloud session, a goal loop, a mission), then a paraphrase of
the first-party page, the source URL and the as-of date. The surface shown is the one closest to the sample's flow: an agent
finishes a task and something decides it is done. Dates differ by cell: "who decides", "starts the app" and "keeps going" were
fetched on 2026-10-13, the rest on 2026-10-21. A cell reads "not in their docs" when the pages checked do not say, and lists
the pages checked. That is a statement about those pages, not about what the product can do: the fetch tool returned condensed
extractions, so a gap can also be a page the extraction left out. The last row of each table is the target for this lesson's
sample. It comes from the [brief](brief.md) and is our own design, not a claim about anyone else.

### A1. The repo's own checks before done

| Product | Runs the checks before done |
|---|---|
| Devin | **Self-check before PR**: In a cloud session Devin runs existing test suites, linting and type checks before it opens the PR, and iterates until the tests pass. Which checks run is set by the prompt, playbook, AGENTS.md or a skill. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-21) |
| Factory (Droid) | **Validation workers**: Validation workers run at the end of each milestone, in scrutiny and user-testing kinds: tests, regressions and integration. Which exact commands run is not named; it follows the project. ([source](https://docs.factory.com/missions/planning), as of 2026-10-21) |
| GitHub Copilot | **Cloud agent session**: The agent works in its own Actions-powered environment, where it can run automated tests and linters before it pushes. Which commands run comes from the repo's custom instructions. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-21) |
| OpenHands | **Goal loop**: The agent runs whatever command the objective names (the example is a pytest run); a separate judge model audits the output from the transcript. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-21) |
| Cursor | **Cloud agent**: The cloud agent can build, test and interact with the changed software in its own VM. Which checks run is its choice from the prompt, skills, agents.md and rules. ([source](https://cursor.com/docs/cloud-agent.md), as of 2026-10-21) |
| Claude Code | Claude runs whatever check the person or project instructions name. A built-in test, lint or typecheck step is not in their docs. ([source](https://code.claude.com/docs/en/best-practices.md), as of 2026-10-21) |
| This sample | Target: runs the install, lint, typecheck and test commands named in the repo's instructions, and reports each outcome ([source](brief.md)) |

### A2. Acceptance criteria become checks

| Product | Criteria turned into checks |
|---|---|
| Devin | The guide tells the person to state success in measurable terms, and a playbook's Specifications section lists what must be true when the work is done. A product step that turns criteria into checks is not in their docs. ([source](https://docs.devin.ai/product-guides/creating-playbooks.md), as of 2026-10-21) |
| Factory (Droid) | **Validation criteria**: Each feature carries validation criteria, visible with its commits in the Factory App. How they map to test files is not documented. ([source](https://docs.factory.com/missions/running-app), as of 2026-10-21) |
| GitHub Copilot | **Task acceptance criteria**: A well-scoped task carries acceptance criteria Copilot can use to verify its work. Conversion into test files is not described. ([source](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results), as of 2026-10-21) |
| OpenHands | **Goal objective**: The written objective is the check: the judge tests each run against it, and the page's pattern is an objective that names the command that must pass. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-21) |
| Cursor | Not in their docs. Pages checked: cloud-agent, capabilities, best-practices, skills (cursor.com/docs). Not documented; the person states criteria in the prompt, a skill or a rule. (as of 2026-10-21) |
| Claude Code | Criteria are given by the person in the prompt (example inputs, expected outputs, a failing test first). Automatic conversion of criteria into tests is not in their docs. ([source](https://code.claude.com/docs/en/best-practices.md), as of 2026-10-21) |
| This sample | Target: each acceptance criterion becomes a test that is written first and seen failing ([source](brief.md)) |

### A3. A test line on every task

| Product | Per-task test planning |
|---|---|
| Devin | **Testing mode**: Testing mode, run after the PR, picks the most important flow and sends a concrete step plan before running it. The plain cloud session plans tests only as the prompt asks. ([source](https://docs.devin.ai/work-with-devin/testing-and-recordings.md), as of 2026-10-21) |
| Factory (Droid) | **Mission planning**: Planning names how work is validated and milestones set how often validation runs. Per-feature test lists are not documented. ([source](https://docs.factory.com/missions/planning), as of 2026-10-21) |
| GitHub Copilot | Not in their docs. Pages checked: get-the-best-results, research-plan-iterate (docs.github.com). A product-made per-task test plan is not documented; testing expectations go in the task and repository instructions. (as of 2026-10-21) |
| OpenHands | Not in their docs. Pages checked: Goal Completion Loop (docs.openhands.dev). Per-task test planning is not documented. (as of 2026-10-21) |
| Cursor | Not in their docs. Pages checked: cloud-agent, capabilities, best-practices (cursor.com/docs). Per-task test planning is not documented. (as of 2026-10-21) |
| Claude Code | Plan mode is optional, and the guide says to skip it if the diff fits in one sentence. The example prompt asks for tests; a required test list is not in their docs. ([source](https://code.claude.com/docs/en/best-practices.md), as of 2026-10-21) |
| This sample | Target: every task states which test proves it, and at which layer, before building starts ([source](brief.md)) |

### A4. Never weaken a test to get green

| Product | A guard against weakened tests |
|---|---|
| Devin | The gallery test playbook forbids changing source modules to ease testing; it is not shown forbidding deleting or loosening existing tests. A built-in guard is not in their docs. ([source](https://docs.devin.ai/use-cases/gallery/test-coverage-playbook.md), as of 2026-10-21) |
| Factory (Droid) | Not in their docs. Pages checked: Missions overview, planning, reference, running-cli, running-app, factory.com/news/missions. Not documented; the pages only say validators start in a fresh session with clean context. (as of 2026-10-21) |
| GitHub Copilot | Not in their docs. Pages checked: get-the-best-results, review-copilot-output, use-cloud-agent-on-github, copilot-on-github, build-guardrails (docs.github.com). Not documented; weakened tests are left to the person's review. (as of 2026-10-21) |
| OpenHands | Not in their docs. Pages checked: Goal Completion Loop (docs.openhands.dev). Not documented as a rule; the judge reads real output, which covers false claims, not edited tests. (as of 2026-10-21) |
| Cursor | Not in their docs. Pages checked: cloud-agent, capabilities, best-practices (cursor.com/docs). Not documented as a built-in; hooks run in cloud agents and could be written to do it. (as of 2026-10-21) |
| Claude Code | Advice only: ask for the root cause and not to suppress the error, or have one session write tests and another the code. A built-in protection for test files is not in their docs. ([source](https://code.claude.com/docs/en/best-practices.md), as of 2026-10-21) |
| This sample | Target: a diff rule in the criteria check; no removed or weakened assertions in test files unless the task says the criterion changed ([source](brief.md)) |

### A5. Who decides done, and with what

| Product | What decides the work is done |
|---|---|
| Devin | **Cloud session**: Devin runs existing tests, lint and type checks in its own environment before submitting a PR. Which checks run is set by the prompt, playbook or repo skill. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-13) |
| Factory (Droid) | **Validation workers**: Validation workers run at the end of each milestone, verifying its work, and Missions validate their own work by exercising the running application. ([source](https://docs.factory.com/missions/planning), as of 2026-10-13) |
| GitHub Copilot | **Cloud agent session**: The agent works in its own GitHub Actions environment, where it runs tests and linters to validate changes. How the results decide whether it keeps going before opening the PR is not documented. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-13) |
| OpenHands | **Goal Completion Loop**: In the SDK, a second judge LLM audits the transcript for evidence, such as test output, that proves the objective is complete. The Issue to PR automation lists running tests as a step; what happens when they fail is not in their docs. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-13) |
| Cursor | **CI auto-fix**: Cloud agents automatically try to fix CI failures in PRs they create, and the repository's own CI checks are the judge. A fixed pre-delivery gate that always runs is not documented. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-13) |
| Claude Code | **/goal**: After every turn a separate small model checks the condition. The page says the condition must be something the transcript shows, such as a test result the agent's own check produced. ([source](https://code.claude.com/docs/en/goal.md), as of 2026-10-13) |
| This sample | Target: a fresh agent given only the criteria and the diff marks each criterion MET, PARTIAL or NOT MET ([source](brief.md)) |

### A6. Runs the app where it matters

| Product | Starts the app itself |
|---|---|
| Devin | **Testing mode**: After a PR is created Devin can enter a testing mode: it writes a test plan for the main end-to-end flow, then once CI is green records a video of itself running the plan in the browser. The page calls the recording a quick sanity check. ([source](https://docs.devin.ai/work-with-devin/testing-and-recordings.md), as of 2026-10-13) |
| Factory (Droid) | **User-testing validation**: Missions validate their own work by exercising the running application; each feature is checked by user-facing QA against the running app, which needs a script that can start or mock the app. ([source](https://docs.factory.com/missions/planning), as of 2026-10-13) |
| GitHub Copilot | Not in their docs. Pages checked: Managing agent sessions, Using cloud agent on GitHub, Best practices for the cloud agent (docs.github.com). They say the agent runs tests and linters and can build and validate in its environment, but none says it starts the app or drives it as a user. (as of 2026-10-21) |
| OpenHands | **QA agent**: The QA agent (a GitHub Actions plugin, or the /qa-changes skill) runs the changed software rather than the test suite and posts a PASS, FAIL or PARTIAL report as a PR comment. It works from the PR after it is open. ([source](https://docs.openhands.dev/openhands/usage/use-cases/qa-changes.md), as of 2026-10-13) |
| Cursor | **Cloud Agents**: The cloud agent works in a cloud VM and can build, test and interact with the changed software, controlling a desktop and browser. ([source](https://cursor.com/docs/cloud-agent), as of 2026-10-13) |
| Claude Code | Not in their docs. Pages checked: Best practices, Common workflows, Run Claude Code programmatically, Use Claude Code in the cloud (code.claude.com). They advise asking for evidence such as test output or a screenshot but do not document Claude Code starting the app and driving it as a built-in step. (as of 2026-10-21) |
| This sample | Target: for a user-facing criterion, starts the app and exercises the path, with the output attached ([source](brief.md)) |

### A7. A bounded loop until checks pass

| Product | How it keeps going |
|---|---|
| Devin | **Auto-Fix**: Devin iterates in its own environment until tests pass before submitting a PR, and the page says Auto-Fix lets it respond to review comments and CI failures until the PR is merge-ready. The in-session loop is set up by the prompt; a retry cap is not documented. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-13) |
| Factory (Droid) | **Stop hook**: A user-written hook runs when Droid is about to finish; a block decision with a reason keeps it working, so a script can require a check before it stops. A built-in retry loop for plain sessions and droid exec is not in their docs. ([source](https://docs.factory.com/harness/hooks), as of 2026-10-13) |
| GitHub Copilot | **agentStop hook**: An agentStop hook fires when the agent finishes; its output can set decision block with a reason, which forces another agent turn. A built-in rule that the cloud agent keeps retrying until a check passes is not documented. ([source](https://docs.github.com/en/copilot/reference/hooks-reference), as of 2026-10-13) |
| OpenHands | **Goal Completion Loop**: After each agent run the judge decides whether the objective is provably complete; if not, the agent is re-prompted with what is missing and runs again, up to a cap, after which the result is capped. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-13) |
| Cursor | **stop hook**: Cloud agents run the stop and subagentStop hooks, which the help page says let you build self-correcting loops, and automatically try to fix CI failures in PRs they create (switch off with @cursor autofix off). ([source](https://cursor.com/help/ai-features/cloud-agents.md), as of 2026-10-13) |
| Claude Code | **/goal**: After every turn a model checks the condition; if it is not met, Claude starts another turn using the evaluator's reason as guidance. The loop ends when the condition is met, judged impossible, or cleared by the person. ([source](https://code.claude.com/docs/en/goal.md), as of 2026-10-13) |
| This sample | Target: a failing check sends the agent back with the failure log and earlier attempts, up to a cap, then it stops and asks ([source](brief.md)) |

### A8. Evidence, not a claim

| Product | Evidence shown to the person |
|---|---|
| Devin | **Session Tools**: Browser screenshots and videos can be sent back as proof of testing, and a Progress tab shows command history and output. Testing mode attaches a processed recording. ([source](https://docs.devin.ai/work-with-devin/devin-session-tools.md), as of 2026-10-21) |
| Factory (Droid) | **Mission Control**: Mission Control lists every worker and milestone in a live progress log, shows each worker's terminal output and reasoning, and opens a feature's validation criteria and commits. Screenshots from Mission QA are not documented. ([source](https://docs.factory.com/missions/running-app), as of 2026-10-21) |
| GitHub Copilot | **Session log**: The person sees the session log of reasoning and tools used, commit messages linking back to it, and the PR diff. Screenshots or recordings are not documented. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-21) |
| OpenHands | **Goal loop outcome**: Command output, test results and file contents sit in the conversation history the judge reads, and the outcome object carries the judge's last verdict. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-21) |
| Cursor | **Artifacts**: Artifacts (screenshots, videos and log references) are attached to the PR so the person can validate without checking out the branch. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-21) |
| Claude Code | **Show evidence**: The guide says to have Claude show test output, the command and its result, or a screenshot. This is advice for the prompt; automatic evidence is not in their docs. ([source](https://code.claude.com/docs/en/best-practices.md), as of 2026-10-21) |
| This sample | Target: a table in the PR of each criterion and each check with its outcome ([source](brief.md)) |

### A9. CI is the arbiter, required by branch protection

| Product | CI or branch gating |
|---|---|
| Devin | **Branch protections**: Devin is bound by the same branch protections and policies as a human engineer. Specific required checks are not named on the page. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-21) |
| Factory (Droid) | Not in their docs. Pages checked: Missions overview, planning, reference, running-cli, running-app, Software Factory overview, Droid Exec overview (docs.factory.com). Not documented for Missions. (as of 2026-10-21) |
| GitHub Copilot | **Rulesets and approval**: Workflows do not run on Copilot's pushes until a person approves them, and the agent is blocked from default branches and subject to rulesets like a human. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output), as of 2026-10-21) |
| OpenHands | Not in their docs. Pages checked: Goal Completion Loop (docs.openhands.dev). CI or branch gating is not documented for the goal loop. (as of 2026-10-21) |
| Cursor | **CI subscriptions**: Subscriptions wait until every check on the commit completes and return one result. Whether CI is required before a PR opens is not documented. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-21) |
| Claude Code | Not in their docs. Pages checked: github-actions, code-review, code-review-pull-requests (code.claude.com). CI or branch gating is not documented. (as of 2026-10-21) |
| This sample | Target: a CI job runs the repo's validate command, and branch protection requires it before merge ([source](brief.md)) |

## Not compared here

Some Tier A steps have no column in the verify grid, so nothing is said about the field for them: the red-first step (a test
seen failing before the code exists), a fresh agent that sees only the criteria and the diff (the grid records who decides
done, not the checker's inputs), and a table of every check with its outcome (the evidence column records what the person
sees, not a per-check record). Where the grid is silent, the lesson says so rather than guessing.

## What other factories call it

Each product's own term for the part that checks the work. The term comes from the matrix cell for that product; `dev-task`
and its spec check are only this sample's names.

| Product | What it calls the check |
|---|---|
| Devin | Self-check before the PR, in a cloud session ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-21) |
| Factory | Validation workers, at each Mission milestone ([source](https://docs.factory.com/missions/planning), as of 2026-10-21) |
| GitHub Copilot | Cloud agent session, running tests and linters in its Actions environment ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-21) |
| OpenHands | Goal Completion Loop, with a judge model ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-21) |
| Cursor | Cloud agent, with CI auto-fix ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-13) |
| Claude Code | `/goal`, a condition checked by a separate model after each turn ([source](https://code.claude.com/docs/en/goal.md), as of 2026-10-13) |

## Other factories at a glance (a sourced slide, not a live demo)

| Product | Access, as stated by the vendor | Source |
|---|---|---|
| OpenHands | the repo states an MIT license and says agents can run locally, in Docker, on VMs, or anywhere an agent server backend runs | [GitHub](https://github.com/OpenHands/OpenHands), as of 2026-10-10 |
| Devin | the Free self-serve plan lists limited Devin usage, plus access to Devin Review and DeepWiki | [billing](https://docs.devin.ai/admin/billing/self-serve.md), as of 2026-10-10 |
| Cursor | Cloud Agents need a paid plan, charged at API pricing for the selected model | [docs](https://cursor.com/docs/background-agent), as of 2026-10-10 |

## Where it goes from here

Destinations only, not a recommendation. These are the Tier B items of the brief; each is named, not built, and each lesson
that owns one is named in the brief. Each item below is one product's own surface.

- **Limits that block.** A coverage threshold that blocks merges belongs to the release lesson; speed budgets per test layer
  belong to the test-readiness destination. In the field, Devin's coverage targets appear as playbook and AGENTS.md examples
  (90% or 80%) that a team copies, and enforcement by the product is not in their docs
  ([playbook](https://docs.devin.ai/use-cases/gallery/test-coverage-playbook.md), as of 2026-10-21). OpenHands' goal loop
  ends as capped after a default of 10 rounds ([goal loop](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of
  2026-10-21). Copilot's cloud agent session is capped at 59 minutes
  ([about Copilot on GitHub](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github), as of
  2026-10-21). Factory's Missions list a cost floor of about one run per feature plus two per milestone, and validation can
  be turned off in Mission Control settings ([planning](https://docs.factory.com/missions/planning), as of 2026-10-21).
- **Fixes after the PR opens.** Fixing a PR after CI fails or a reviewer comments belongs to the review lesson.
  Devin's Auto-Fix pushes commits for CI failures and review feedback on PRs its sessions work on
  ([SDLC integration](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-21). Cursor's cloud
  agent tries to fix CI failures on PRs it created, skipping in set cases and after 10 follow-ups
  ([capabilities](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-21). Copilot's documented paths are
  each started by a person: an @copilot comment, Fix with Copilot on review comments, and a button on a failing Actions job
  ([use the cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github),
  as of 2026-10-21). For Claude Code, a cloud session with the GitHub App and a per-PR toggle receives CI failures and
  review comments and pushes a fix when one is clear; the interactive session is not described doing this
  ([Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web.md), as of 2026-10-21).
- **Not compared.** A canary suite after deploy (release lesson), testing principles as review criteria (review lesson),
  recording every check outcome and skipping a check that has failed to run before, and measuring test quality (feedback and
  maintenance lesson), required-step lists with proof signals (governance lesson), and designing the whole test system
  before features are built (test-readiness destination) have no column in the verify grid, so nothing is claimed about the
  field for them.
