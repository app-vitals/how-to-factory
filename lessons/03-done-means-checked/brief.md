# Lesson brief: Done means checked

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds a first version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson is ONE component, taught deep and built
> in that lesson, prioritized by expected, common and crucial; deeper dives come later. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

[Verification](../../docs/components.md), in the **Work done** band. The lesson zooms into what stands between "the agent
says it is finished" and "something independent of the agent checked that it is".

## The one idea

An agent that writes both the code and the checks can pass both while having understood the task wrong, so a check is
only as strong as its **independence from the builder**.

This is an agentic-engineering point. The techniques are classic software engineering; the lesson frames each by why it
matters more when an agent writes the code and the tests together.

## Scope test

Does a single agent need it for a single flow? Yes. Any agent that opens a pull request can report success that did not
happen, and the tests it wrote itself encode its own reading of the task, so a green run proves less than it looks.
Independence is the core of the component, not an extra. The heavier forms (held-out tests, mutation testing,
property-based testing, coverage thresholds, speed budgets, canary suites, designing a whole test system) are
destinations: the first three are mentioned with a reason, the rest only named.

Source for the choice and ranking: the capabilities ranked by expected, common and crucial in
`planning/lesson3-verification/capability-priorities-v2.md`, built from the Shipwright inventory, the six-product verify
grid (`landscape/verify-grid/README.md`) and the research in `planning/lesson3-validation-depth/research.md`
(internal notes, not published in the lesson). Counts are of the six surveyed products' documentation, as of 2026-10-21
(re-checked 2026-10-23); the hidden-test and test-quality dimensions as of 2026-10-29. Each count carries its
first-party URLs in the grid.

## In scope

Built live: four capabilities, each a short upgrade to the existing dev-task step.

- **Define:** each acceptance criterion becomes a test written first and seen failing, and the task picks the test layer
  that proves it (one criterion names the layer and the tests added or retired).
- **Run:** run the repo's own checks and show an evidence table of what ran; a fix loop is bounded (one line); no test is
  weakened to get green.
- **Check:** a fresh agent, given only the criteria and the diff, marks each criterion; running the app is the step it
  uses to exercise a path.

Mentioned, not built: held-out tests, mutation testing and property-based testing, each as a classic technique and why
it matters more with agents. Our own mutation run on lesson 1's suite is shown as a recorded result.

One beat, not a capability: **the gate, a guardrail the agent cannot skip.** CI as the arbiter, made binding by a
branch-protection rule that is set once per repo, not per task. It is what makes every other check binding.

## Out of scope

Named on one slide, each with the lesson that owns it. None is built here.

- Building held-out tests, mutation testing or property-based testing live: owned by a later verification lesson (a
  deeper dive on this component; not yet scheduled).
- A coverage threshold that blocks merges (the warn-only first stage is named): owned by the release lesson, where merge
  rights are decided.
- Speed budgets per test layer: owned by the test-readiness destination (not a lesson yet).
- A canary suite after deploy, with a safety lint: owned by the release lesson.
- Testing principles used as review criteria: owned by the review lesson.
- Post-PR auto-fix without a person asking, and the review-feedback half of it: owned by the review lesson.
- Recording every check outcome and skipping a check that has failed to run before; flake handling: owned by the
  feedback and maintenance lesson.
- A required-step list with proof signals: owned by the governance lesson.
- A pipeline that designs the whole test system before features are built: owned by the test-readiness destination.

## The sample's concrete steps

1. Take a task from the plan with its acceptance criteria, one of which names the test layer and the tests added or
   retired (or says none are needed and why) (Define).
2. Choose the layer that proves each criterion, turn it into a test, run it, and confirm it fails before any production
   code exists (Define).
3. Implement until the new tests pass, running the repo's install, lint, typecheck and test commands. A failing check
   goes back to the agent with the log and its earlier attempts, up to a cap; then it stops and asks (Run).
4. Guard the tests: a diff rule fails the work if a test was removed or an assertion loosened without a stated reason
   (Run).
5. A fresh agent, given only the criteria and the diff, marks each criterion MET, PARTIAL or NOT MET, and starts the app
   to exercise a user-facing path; anything not met goes back (Check).
6. Print a table in the PR of each criterion and each check with its outcome (Run).
7. Open the PR. CI runs the repo's validate command, and a branch-protection rule (set once per repo) makes it
   required before merge (the gate beat).
8. Mentioned beats, shown not built: the same tests would still pass for code that is wrong in a way the builder
   shares, which held-out tests, mutation testing and property-based testing each probe.

## What the factory builds in this lesson

The existing factory upgrades its own dev-task step live on camera, from one short, self-contained prompt per built
capability (about eight lines of intent, stored in the repo), each producing a small change to the skill. Nothing is
pre-queued in `factory/`, and no plan session queues this work: the factory is asked, plans it, and builds it during the
lesson run. The four upgrades are red-first tests with layer choice, the run-the-checks step with its evidence table,
the weakened-test guard, and the fresh-context check with running the app. The held-out, mutation and property-based
material is shown as recorded results, not built. The CI rule is shown, not built; it is set once per repo.

## Reused from earlier lessons / New this time

**Reused from earlier lessons**

- Lesson 1: the plan and dev-task skills and the task loop that ends at open PRs.
- Lesson 2: the stage vocabulary (capabilities grouped by stage, one stage slide, then one slide per capability).
- Lesson 2: the capability slide pattern (title `Stage: capability`, one why-or-prevents bullet, two "e.g." bullets, one
  diagram, the illustration caption) and the run-of-show format.
- Lesson 2: a plan whose tasks carry acceptance criteria, taken here as the Define input (see the hand-off below).
- The deck rules, and the expected / common / crucial ranking.

**New this time**

- One idea that organizes the lesson: independence of the check from the builder.
- Kinds of validation, not just "run the tests": a test layer chosen per criterion, a fresh-context check, and three
  mentioned techniques that test the tests.
- Evidence instead of a claim: a table the person can read, in place of "tested".
- A guard on the checks themselves: no test is weakened to get green.
- A small recorded measurement from lesson 1's suite (a mutation score), stated as one run, not a rate.
- A short gate beat: the guardrail that makes every check binding, set once per repo.

**Criteria hand-off from lesson 2.** Lesson 2's plan gives each task a title, a description and 2 to 5 acceptance
criteria, one of which carries the test guidance (layers affected, tests added, tests retired and why), plus a layer tag.
It teaches nothing about test design; it names this lesson as the owner. Here those criteria are the input to Define:
each becomes a test the failing-test step starts from, and a task that adds or retires no tests must say why.

## Capabilities

Grouped by stage and prioritized by expected, common and crucial, from the v2 ranking. Examples marked (illustration) are
constructed for the lesson and are not a claim about any product. Counts are of the six surveyed products'
documentation (Devin, Factory, OpenHands, Cursor, Copilot, Claude Code); "not documented" means the pages checked do not
say so, not that the product lacks it, so say "none of the shown docs describe one", never "no product has one". Crucial
is "high" only where the Shipwright reason is documented; where it is partly documented or inferred it is capped at
medium, and outside research (preprints, papers) is context, not a documented reason. Four built live, three mentioned
(M1 to M3) and one human-gate beat (G1). The weakest on evidence are the guard against weakened tests (0 of 6, no
Shipwright rule) and held-out tests (no first-party result of ours); the guard is the first to cut if time is short.
From lessons 1 to 3, revisit after lesson 4.

| Stage | Capability | Concept | Why it exists or what it prevents | Examples | What it takes to build |
|---|---|---|---|---|---|
| Define | 1. Criteria become red-first tests, with layer choice | Each acceptance criterion gets a test written before the code, run and seen failing; the task picks which layer (unit, integration, end to end) proves it. Expected: high. 0 of 6 turn criteria into checks; the written objective or per-feature criteria are the check in 2 (OpenHands, Factory). Crucial: high, because the RED step has a documented reason. | An agent that writes the code first writes tests that agree with it. A test that passes at once tests existing behavior or is wrongly written. Writing the check before the code is the cheapest independence from the builder. | The agent writes the function, then a test asserting whatever it returned: the test passes and the criterion was never checked. (illustration) A criterion "rejects an empty name" gets a test that fails first, then passes once the code rejects it. (illustration) An agent picks a unit test for a criterion about two services talking, which passes with both mocked. (illustration) | One short prompt added to dev-task: write failing tests per criterion, choose and name the layer, run them, record the red run, then implement. Small. |
| Run | 2. Run the repo's checks and show an evidence table | Before reporting done, run the install, lint, typecheck and test commands the repo names, fix failures in a loop with the log and a history of earlier attempts up to a cap, and print a table of each criterion and check with its outcome. Expected: high. 5 of 6 run checks (Claude Code partly); 0 of 6 pick the exact commands; logs or diffs reach the person in 6 of 6, visual evidence in 2 (Devin, Cursor); 4 keep going until checks pass, 2 state a numeric cap (OpenHands, Cursor). Crucial: medium; why they run and why passes are recorded is inferred. | Done should mean a machine ran the checks, and a record exists. A "done" with no record cannot be told apart from a skipped step; a loop with no history repeats itself and one with no cap never ends. | The agent says "all green" without running anything and the first failure shows in CI. (illustration) The table shows lint skipped for a missing tool, so the person knows to look. (illustration) After the cap the agent stops and hands the failing log to a person. (illustration) | List the commands in the repo's instructions file, one prompt to run them with a capped loop and print the table in the PR body. Small. |
| Run | 3. Guard against weakened tests | A failing test is fixed in the code. A test changes only with a stated reason that the criterion changed; a removed test or loosened assertion otherwise fails the check. Expected: high. 0 of 6; none of the 79 surfaces checked documents a built-in guard. Crucial: medium; no Shipwright file states this rule, so the failure is an illustration. | A loop told to make the checks pass has an easy way out: change the check. The guard protects capability 1 from the loop in capability 2. | The loop hits a failing test, loosens the assertion, and reports green after one attempt. (illustration) A test that expects 3 results is changed to expect "at least 1". (illustration) A flaky test is skipped and the skip is flagged for a person to decide. (illustration) | A diff rule over test files, stated in the prompt and checked at the end of the run. Small to state; judgement to enforce. |
| Check | 4. Fresh-context check of the criteria against the diff, running the app as its step | A separate agent that has not seen the build, given only the criteria and the diff, marks each criterion MET, PARTIAL or NOT MET; for a user-facing path it starts the app and exercises it. Expected: medium. 2 of 6 use a separate verifier (Factory, OpenHands); who decides done is split, automated 2, human 2, no gate stated 2; the app is run built in by 2 (Factory, Cursor), when the prompt asks by 1 (Devin), on another surface by 1 (Claude Code), not described for 2 (OpenHands, Copilot). Crucial: medium; the failure it prevents is inferred, and no documented Shipwright reason covers running the app. | The builder grading its own work marks everything MET. Reading the diff is not running the code, so a behavior criterion can be MET on code that never ran; running the app closes that gap. This is the capability that most directly states the one idea. | The implementer rates its own criteria and every one is MET. (illustration) A criterion about a validation error has no matching code in the diff, and the check reports NOT MET. (illustration) A button is wired to the wrong handler, the diff reads fine, and only loading the page shows it. (illustration) | One sub-agent call with a fixed prompt on a low-cost model, plus a start script for the app. Small to medium: the lesson supplies the start script. |
| Deepen (mentioned) | M1. Held-out tests | Tests the builder cannot see, which compose the same features the visible tests check in isolation. Expected: low. 0 of 6 documented (other surface: 2). Crucial: medium, flagged; context only. | An agent can satisfy visible tests by pattern-matching them. A preprint (SpecBench, https://arxiv.org/abs/2605.21384, fetched 2026-10-29, medium confidence) reports the visible-minus-held-out pass-rate gap growing about 28 points per tenfold code size; check the figure again before filming. | An agent hard-codes the expected values of the visible tests and the hidden test that combines them fails. (illustration) A hidden cases folder the builder is not given, run only by CI. (illustration) | Not built: needs a separate agent that writes the hidden cases from the criteria, and a place the builder cannot read. Medium to large. |
| Deepen (mentioned) | M2. Mutation testing | Change the code on purpose and see whether the tests fail; a test that does not notice is weak. Expected: low. 0 of 6, 0 of 54 surfaces; coverage is the stand-in. Crucial: medium, flagged. | When the agent writes the code and the tests, the tests carry its reading of the task, and coverage cannot see this: in Meta's report (https://arxiv.org/abs/2501.12862, fetched 2026-10-29) 49% of the mutant-killing tests added no line coverage. Our own run on lesson 1's suite scored 68% with 65 surviving mutants, five hand-checked; shown as a recorded result. | A function whose validation branch can be replaced with `false` while every test still passes. (illustration) An unreachable fallback shows up as a survivor, and the fix is to delete code, not add a test. (illustration) | Not built live: a full run took about 9 minutes, so it is scoped to changed files in a pre-filming scorer. Medium. |
| Deepen (mentioned) | M3. Property-based testing | State a rule that must hold for every input and let a tool generate the inputs. Expected: low. 0 of 6, 0 of 54 surfaces. Crucial: low to medium, flagged. | Example-based tests cover only the cases the author thought of, and an agent writes a lot of code fast. The agent can state the properties from types and docstrings: in the Anthropic Frontier Red Team write-up (https://www.anthropic.com/research/property-based-testing, fetched 2026-10-29) 56% of 50 reviewed reports were valid and 32% reportable, an agent finding bugs in existing libraries, not checking its own new code. | decode(encode(x)) equals x for every x. (illustration) Sorting twice gives the same result as sorting once. (illustration) | Not built: needs an agent to state the properties and a property-testing library. Medium. |
| Gate | G1. The gate: a guardrail the agent cannot skip (CI is the arbiter, required by branch protection) | Local checks are a fast signal; the gate is a CI job that the main branch cannot be merged without. The workflow is code and the rule is set once per repo, not per task, so this is a guardrail beat, not a capability. Expected: high. CI waits for the check in 1 (Cursor); repo rules bind the agent in 2 (Devin, Copilot); 0 require a product check before the PR. Crucial: high, because the reason is documented. | The agent's sandbox often lacks tools or secrets, so a local run is not the arbiter. Without enforcement the check is a social contract. | A local lint run is skipped for a missing tool, the PR opens, and nothing stops the merge with CI red. (illustration) CI fails on the PR and branch protection blocks the merge until it is fixed. (illustration) | A CI workflow running the repo's validate command, and one branch-protection rule requiring it. Small; set once per repo, and the lesson shows it. |

## Prerequisites

- Lesson 1: the plan and dev-task skills and the task loop.
- Lesson 2: a plan whose tasks carry acceptance criteria.

## Exercise outcomes

Outcomes only; no required tool, language or runner. Each covers one or more built capabilities.

- Each task has 2 to 5 specific, testable acceptance criteria, one naming the test layer and the tests added or retired (or why none); each criterion has a test at the layer that proves it, run and seen failing before the code that satisfies it (1).
- The repo's install, lint, typecheck and test commands are run before done, a failing check goes back with the log and earlier attempts and stops at a cap, and the PR shows a table of what ran and the outcome (2).
- No test is deleted or loosened to get green without a stated reason that the criterion changed (3).
- A separate check marks each criterion MET, PARTIAL or NOT MET from the criteria and the diff alone, and for a user-facing criterion the app is started and the path exercised, with the output attached (4).
- For one test the agent wrote, say what would make it pass for wrong code, and name which of held-out tests, mutation testing or property-based testing would catch it (M1 to M3).
- A merge is blocked while the CI job is red, and you can say who set that rule (G1).

## Loop delta

**What does the loop do after this lesson that it could not before?**

The loop's "done" now means a check that is partly independent of the builder ran, and a record exists. Before, dev-task
ran the repo's commands once and the PR said it was finished; now each criterion becomes a failing test at a chosen
layer, the checks run with their outcomes in a table, the fix loop is bounded, no test is weakened to get green, a fresh
agent checks the criteria against the diff and exercises the app, and CI behind a branch-protection rule (set once per repo)
decides whether the PR can merge. The live upgrade adds the proof of the red run, the layer choice, the guard and the
fresh-context check; today's dev-task only instructs red-first, with no recorded proof and no such guard. The mentioned
techniques change nothing in the loop yet; they show where independence runs out.

**Does it cover what is expected, common and crucial for its one component?** (and name the deeper dives left for later lessons)

Yes for a first pass. Both capabilities rated crucial and documented (capability 1 and G1) and the expected and common
run-and-evidence capability (2) are covered; the guard and the fresh-context check are kept on judgement, as the
cheapest independence checks the design needs. Only two High crucial ratings hold; the rest are medium or low. Left for
later: held-out tests, mutation testing and property-based testing built properly (a later verification lesson), coverage
thresholds that block and canary suites (release lesson), testing principles and post-PR auto-fix (review lesson), check
history, learned skips, flake handling (feedback and maintenance lesson), required-step proofs (governance lesson), and
designing the whole test system, including speed budgets (test-readiness destination).
