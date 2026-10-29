# Options: how the field checks that work is done

Names are not canonical. Every claim below is a paraphrase of a first-party page, taken from the lesson 3 verify grid
([`landscape/verify-grid/`](../../landscape/verify-grid/README.md)) and from [`landscape/matrix.json`](../../landscape/matrix.json)
(rendered in [landscape/README.md](../../landscape/README.md)). Each claim carries its source URL and the date that page was
fetched. Re-check before filming. These appear on slides only; the lesson does not run other products live.

Scope is the lesson 3 step only: finished work is checked before it counts as done, and the check is only as strong as its
independence from the builder (see [brief.md](brief.md)). Plan making (lesson 2), ticket selection, and review as a general
activity are left out on purpose.

## How the field differs

Two field slides, and two tables here, one per slide. The slide shows a mark or a chip per product and nothing else; every
qualifier lives in this file. Marks: ✓ documented, ◐ partly, – not in their docs. A chip is the matrix cell's chip, copied
from `landscape/matrix.json`. Where a slide shows more than one dimension, each dimension has its own column.

In each cell the bold text names the surface the claim is about, because most products have several (a cloud session, a goal
loop, a mission), then a paraphrase of the first-party page, the source URL and the as-of date. The surface shown is the one
closest to the sample's flow: an agent finishes a task and something decides it is done. "Who decides" was fetched on
2026-10-13, "CI gating" on 2026-10-21, and the hidden-test and test-quality dimensions on 2026-10-29. A cell reads "not in
their docs" when the pages checked do not say, and lists the pages checked. That is a statement about those pages, not about
what the product does: the fetch tool returned condensed extractions, so a gap can also be a page the extraction left out. The
last row of each table is the target for this lesson's sample. It comes from the [brief](brief.md) and is our own design, not
a claim about anyone else.

### Field slide 1. Who decides done, who keeps checks hidden, who measures test quality

Three columns on one slide. Chips: "who decides" uses the matrix chip (Check, Model, Agent, Person, joined with " + ");
hidden tests and test quality use a mark.

| Product | Who decides | Hidden or held-out tests | Test quality measured |
|---|---|---|---|
| Devin | **Check** | – | ◐ |
| Factory (Droid) | **Agent** | – | – |
| GitHub Copilot | **Check** | – | – |
| OpenHands | **Model** | – | – |
| Cursor | **Check** | ◐ | – |
| Claude Code | **Check + Model** | – | ◐ |
| This sample | Agent (a fresh one, from criteria and diff) | – (recorded one-off only) | – (recorded one-off only) |

#### Who decides it is done

| Product | Chip | What decides the work is done |
|---|---|---|
| Devin | Check | **Cloud session**: Devin runs existing tests, lint and type checks in its own environment before submitting a PR. Which checks run is set by the prompt, playbook or repo skill, not by a fixed pipeline. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-13) |
| Factory (Droid) | Agent | **Validation workers**: Validation workers run at the end of each milestone, verifying its work, and Missions validate their own work by exercising the running application. ([source](https://docs.factory.com/missions/planning), as of 2026-10-13) |
| GitHub Copilot | Check | **Cloud agent session**: The agent works in its own GitHub Actions environment, where it runs tests and linters to validate changes. How the results decide whether it keeps going before opening the PR is not documented. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-13) |
| OpenHands | Model | **Goal Completion Loop**: In the SDK, a second judge LLM audits the transcript for evidence, such as test output, that proves the objective is complete. The Issue to PR automation lists running tests as a step but does not document what happens when they fail. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-13) |
| Cursor | Check | **CI auto-fix**: Cloud agents automatically try to fix CI failures in PRs they create, and the repository's own CI checks are the judge. A fixed pre-delivery gate that always runs is not documented. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-13) |
| Claude Code | Check + Model | **/goal**: After every turn a separate small model checks the condition. The evaluator runs no commands and reads no files, so the condition must be something the transcript shows, such as a test result the agent's own check produced. ([source](https://code.claude.com/docs/en/goal.md), as of 2026-10-13) |
| This sample | Agent | Target: a fresh agent given only the criteria and the diff marks each criterion MET, PARTIAL or NOT MET ([source](brief.md)) |

#### Hidden or held-out tests

A hidden test is a check the builder is not shown. The chip is – where the pages checked do not describe one.

| Product | Mark | Checks kept from the builder |
|---|---|---|
| Devin | – | **Cloud session**: Not in their docs. Pages checked: SDLC integration, Instructing Devin Effectively, Best Practices, Code Coverage tutorial, Testing & Refactoring prompts (docs.devin.ai); every page has the same session write and run its own tests. ([SDLC integration](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-29) |
| Factory (Droid) | – | **Validation workers**: Not in their docs as a hidden check. The workers are a different worker from the builder, but whether criteria are kept from the builder is not stated. Pages checked: Missions overview, planning, reference, running-app, the Missions news post. ([planning](https://docs.factory.com/missions/planning.md), as of 2026-10-29) |
| GitHub Copilot | – | **Cloud agent session**: Not in their docs. Pages checked: get-the-best-results, improve-a-project, configuring-agent-settings (docs.github.com). The agent runs the repo's own tests, so nothing says any check is withheld. ([get the best results](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results), as of 2026-10-29) |
| OpenHands | – | **Goal Completion Loop**: Not in their docs as a hidden check. The judge reads the same transcript the agent produced. Page checked: Goal Completion Loop. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-29) |
| Cursor | ◐ | **Verifier subagent**: Partly, as isolation and not as hidden tests: a subagent starts with a clean context and gets only what the parent puts in the prompt. Nothing says the verifier holds checks the writing agent is kept from seeing. ([source](https://cursor.com/docs/subagents.md), as of 2026-10-29) |
| Claude Code | – | **Interactive session**: Not in their docs as a feature. Pages checked: best-practices, common-workflows, prompt-library. On another surface, plugin evals hide their cases from the agent under test, but they test a plugin, not code Claude wrote. ([plugin evals](https://code.claude.com/docs/en/plugin-evals.md), as of 2026-10-29) |
| This sample | – | Not part of the flow. Held-out tests are mentioned, not built ([source](brief.md)) |

#### Test quality measured

Test quality here means whether the tests an agent wrote would fail on a broken change (a mutation score or similar). Coverage
is not that: it counts lines the tests run, not whether they notice a change.

| Product | Mark | What measures the tests |
|---|---|---|
| Devin | ◐ | **Code coverage tutorial**: Only coverage and assertion style. The tutorial measures the share of functions covered; no page checked documents a check that the new tests would catch a bug. ([source](https://docs.devin.ai/use-cases/tutorials/code-coverage.md), as of 2026-10-29) |
| Factory (Droid) | – | **Validation workers**: Not in their docs. The workers run tests and look for regressions; nothing checked measures the tests. Pages checked: Missions overview, planning, reference, running-app, the Missions news post. ([planning](https://docs.factory.com/missions/planning.md), as of 2026-10-29) |
| GitHub Copilot | – | **Cloud agent session**: Not in their docs. Pages checked: get-the-best-results, improve-a-project. On another surface, Code Quality shows line coverage and rulesets can set thresholds: coverage, not strength. ([about Code Quality](https://docs.github.com/en/code-security/code-quality/concepts/about-code-quality), as of 2026-10-29) |
| OpenHands | – | **Goal Completion Loop**: Not in their docs. Nothing grades the tests. Page checked: Goal Completion Loop. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-29) |
| Cursor | – | **Cloud agent**: Not in their docs. Pages checked: cloud-agent, capabilities, best-practices, automations, subagents. On another surface, a Bugbot rule can require that tests exist in a diff: presence, not strength. ([Bugbot](https://cursor.com/docs/bugbot.md), as of 2026-10-29) |
| Claude Code | ◐ | **Coverage prompts**: Coverage and edge cases only as prompts: ask Claude to find untested functions and add edge-case tests, with a coverage target as the goal. No tool checked measures whether the new tests catch a broken change. ([source](https://code.claude.com/docs/en/common-workflows.md), as of 2026-10-29) |
| This sample | – | Not part of the flow. A recorded one-off Stryker run on lesson 1's suite: 68% score, 65 surviving mutants, five checked by hand ([source](../../planning/lesson3-validation-depth/PRODUCT-SPEC.md)) |

### Field slide 2. CI gating

One column. The chip is a mark: ✓ the pages document the gate, ◐ they document part of it, – not in their docs.

| Product | Mark | CI or branch gating |
|---|---|---|
| Devin | ◐ | **Branch protections**: Devin is bound by the same branch protections and policies as a human engineer. The page names no specific required checks. ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-21) |
| Factory (Droid) | – | **Missions**: Not in their docs. Pages checked: Missions overview, planning, reference, running-cli, running-app, Software Factory overview, Droid Exec overview (docs.factory.com). ([planning](https://docs.factory.com/missions/planning.md), as of 2026-10-21) |
| GitHub Copilot | ✓ | **Rulesets and approval**: Workflows do not run on Copilot's pushes until a person approves them, and the agent is blocked from default branches and subject to rulesets like a human. ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output), as of 2026-10-21) |
| OpenHands | – | **Goal Completion Loop**: Not in their docs. CI or branch gating is not documented for the goal loop. Page checked: Goal Completion Loop. ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-21) |
| Cursor | ◐ | **CI subscriptions**: Subscriptions wait until every check on the commit completes and return one result. Whether CI is required before a PR opens is not documented. ([source](https://cursor.com/docs/cloud-agent/capabilities.md), as of 2026-10-21) |
| Claude Code | – | **GitHub Actions and Code Review**: Not in their docs as a default gate. Pages checked: github-actions, code-review, code-review-pull-requests. The Code Review page does show gating from your own CI by reading the severity counts, and notes that branch protection can require conversation resolution. ([source](https://code.claude.com/docs/en/code-review-pull-requests.md), as of 2026-10-21) |
| This sample | ✓ | Target: a CI job runs the repo's validate command, and a branch-protection rule, set once per repo, requires it before merge ([source](brief.md)) |

## Not compared here

Some Tier A steps have no column in the verify grid, so nothing is said about the field for them: the red-first step (a test
seen failing before the code exists), the guard against weakened tests as a slide, running the app, evidence shown, and a
table of every check with its outcome. Property-based and fuzz testing were looked for on the same pages as the hidden-test
dimension; the grid lists them with the pages checked, and this lesson mentions the technique without comparing products.
Where the grid is silent, the lesson says so rather than guessing.

## What other factories call it

Each product's own term for the part that checks the work. The term comes from the matrix cell for that product; `dev-task`
and its spec check are only this sample's names.

| Product | What it calls the check |
|---|---|
| Devin | Self-check before the PR, in a cloud session ([source](https://docs.devin.ai/essential-guidelines/sdlc-integration.md), as of 2026-10-13) |
| Factory | Validation workers, at each Mission milestone ([source](https://docs.factory.com/missions/planning), as of 2026-10-13) |
| GitHub Copilot | Cloud agent session, running tests and linters in its Actions environment ([source](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents), as of 2026-10-13) |
| OpenHands | Goal Completion Loop, with a judge model ([source](https://docs.openhands.dev/sdk/guides/convo-goal.md), as of 2026-10-13) |
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
  recording every check outcome and skipping a check that has failed to run before (feedback and maintenance lesson),
  required-step lists with proof signals (governance lesson), and designing the whole test system before features are built
  (test-readiness destination) have no column in the verify grid, so nothing is claimed about the field for them.
