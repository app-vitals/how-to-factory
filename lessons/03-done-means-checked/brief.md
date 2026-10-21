# Lesson brief: Done means checked

> Agreed before any work is queued. One page. See [docs/lesson-playbook.md](../../docs/lesson-playbook.md).
> Scoping rule: lesson 1 explains plan and dev-task, builds a first version of each live, and runs a simple
> loop that ends at open PRs (a person reviews and merges). Every later lesson is ONE component, taught deep and built
> in that lesson, prioritized by expected, common and crucial; deeper dives come later. Order stays open. `factory/`
> is our demo; the lesson stays tool-neutral. The lesson's plan session queues lesson material only (brief, script,
> deck, exercise, options, run-of-show), never `factory/` changes: the factory builds `factory/` live.

## Component taught and band

[Verification](../../docs/components.md), in the **Work done** band. The lesson zooms into what stands between "the agent
says it is finished" and "a machine checked that it is".

## The one idea

Done should mean something a machine checked, not the agent's say-so: each task states what proves it, the agent runs
those checks and shows the outcome, and a gate the agent cannot talk past decides.

## Scope test

Does a single agent need it for a single flow? Yes. Any agent that opens a pull request can report success that did not
happen, and the person reviewing cannot tell a checked "done" from a claimed one. This is the core of the component, not
an extra. The heavier forms (coverage thresholds, speed budgets, canary suites, designing a whole test system) are
destinations: named, not taught.

Source for the choice and ranking: the verification capabilities ranked by expected, common and crucial, from the
Shipwright inventory and the six-product verify grid (internal notes in `planning/lesson3-verification/`, not published
in the lesson). Counts below are of the six surveyed products' documentation, as of 2026-10-21.

## In scope

Tier A: built and exercised. Every row of the capability table below.

- **Define:** every task carries a test line (the lesson 2 hand-off), and each acceptance criterion becomes a test that
  is written first and seen failing.
- **Run:** run the repo's own checks and report each outcome; fix failures in a bounded loop; never weaken a test to get
  green; check the criteria against the diff with a fresh agent; run the app where it matters; show evidence, not a claim.
- **Gate:** CI is the arbiter, and branch protection makes it binding.

## Out of scope

Tier B: named on one slide, each with the lesson that owns it. None is built here.

- A coverage threshold that blocks merges (the warn-only first stage is named): owned by the release lesson, where merge
  rights are decided.
- Speed budgets per test layer: owned by the test-readiness destination (not a lesson yet).
- A canary suite after deploy, with a safety lint: owned by the release lesson.
- Testing principles used as review criteria: owned by the review lesson.
- Post-PR auto-fix without a person asking, and the review-feedback half of it: owned by the review lesson.
- Recording every check outcome and skipping a check that has failed to run before: owned by the feedback and
  maintenance lesson.
- Measuring test quality (mutation testing, flake handling): owned by the feedback and maintenance lesson.
- A required-step list with proof signals: owned by the governance lesson.
- A pipeline that designs the whole test system before features are built: owned by the test-readiness destination.

## The sample's concrete steps

1. Take a task from the plan with its test line (the tests it adds or retires, or none needed and why) and its acceptance
   criteria (Define).
2. Turn each criterion into a test, run it, and confirm it fails before any production code exists (Define).
3. Implement until the new tests pass, running the repo's install, lint, typecheck and test commands; no test is loosened
   to get there (Run).
4. On a failing check, fix and re-run, with the failure log and a list of earlier attempts, up to a cap; then stop and ask
   (Run).
5. A fresh agent, given only the criteria and the diff, marks each criterion MET, PARTIAL or NOT MET; anything else goes
   back (Run).
6. For a user-facing criterion, start the app and exercise the path (Run).
7. Print a table of each criterion and each check with its outcome, in the PR (Run).
8. Open the PR. CI runs the repo's validate command; branch protection requires it before merge (Gate).

## What the factory builds in this lesson

The existing factory upgrades its own dev-task step to verify its work, live on camera, from a brief given in the lesson.
Nothing is pre-queued in `factory/`, and no plan session queues this work: the factory is asked, plans it, and builds it
during the lesson run. The live build covers the spine, steps 2 to 4 (failing tests first, the repo's checks, no
weakened tests, the bounded fix loop). The rest of Tier A is walked through as finished output.

## Reused from earlier lessons / New this time

**Reused from earlier lessons**

- Lesson 1: the plan and dev-task skills and the task loop that ends at open PRs.
- Lesson 2: the stage vocabulary (capabilities grouped by stage, one stage slide, then one slide per capability).
- Lesson 2: the capability slide pattern (title `Stage: capability`, one why-or-prevents bullet, two "e.g." bullets, one
  diagram, the illustration caption) and the run-of-show format.
- Lesson 2: the test line on every task, taken here as the Define input (see the hand-off below).
- The deck rules, the expected / common / crucial ranking, and the Tier A / Tier B split.

**New this time**

- Three stages for verification: Define, Run, Gate.
- Evidence instead of a claim: a checked outcome the person can read, in place of "tested".
- A check that does not trust the builder: a fresh-context criteria check, and CI as the arbiter.
- A guard on the checks themselves: no test is weakened to get green.

**Test-line hand-off from lesson 2.** Lesson 2's plan states each task's test line and teaches nothing about test design;
it names this lesson as the owner. Here that line is the input to Define: it becomes the Expected Tests the failing-test
step starts from (A3 feeds A2), and a task with "none needed" must say why.

## Capabilities

Grouped by stage and prioritized by expected, common and crucial. Examples marked (illustration) are constructed for the
lesson and are not a claim about any product. Counts are of the six surveyed products' documentation (Devin, Factory,
OpenHands, Cursor, Copilot, Claude Code); "not documented" means the pages checked do not say so, not that the product
lacks it. Crucial is "high" only where the Shipwright reason is documented; where it is partly documented or inferred,
it is capped at medium. Treated live: A1, A2, A3, A4, A7. Walked through: A5, A6, A8, A9 (A6 is first to move to a
walk-through if time is short). The A-numbers are stable ids, not the order. From lessons 1 to 3, revisit after lesson 4.

| Stage | Capability | Concept | Why it exists or what it prevents | Examples | What it takes to build |
|---|---|---|---|---|---|
| Define | A2. Acceptance criteria become tests, written first | Each acceptance criterion gets a test written before the code; the test is run and must fail before any production code exists. Expected: high. 0 of 6 turn criteria into checks; the written objective or per-feature criteria are the check in 2 (OpenHands, Factory). Crucial: high, because the reason is documented. | A check written after the code can be shaped by the code. A test that passes immediately tests existing behavior or is wrongly written. | The agent writes the function, then a test that calls it and asserts whatever it returned: the test passes and the criterion was never checked. (illustration) A criterion "rejects an empty name" gets a test that fails first, then passes once the code rejects it. (illustration) A new test that passes on the first run is rewritten, because it proves nothing. (illustration) | One rule in the task brief (write failing tests for each criterion, run them, confirm red, then implement) and a step that records the red run. Small. |
| Define | A3. A test line on every task | Every task states which test proves it, and at which layer, before building starts; this is lesson 2's test line, taken as input. Expected: medium. 0 of 6 make a per-task test plan on the shown surfaces (Devin's separate Testing mode writes one). Crucial: medium. | Without it the gap is invisible: nothing marks a task as shipped untested, and the failing-test step has no starting point. | A task with no test line ships with no test and nothing marks the gap. (illustration) A task lists an integration test as its proof, so the agent writes one, not a unit test that mocks the thing under test. (illustration) A task marked "none needed: copy change only" is accepted by the person, with the reason on record. (illustration) | One bullet in the task shape, already present from lesson 2. Small. |
| Run | A1. The repo's own checks before done | Before reporting done, run the install, lint, typecheck and test commands named in the repo's instructions, and report each outcome. Expected: high. 5 of 6 run checks; Claude Code partly (whatever the person or project names). 0 of 6 pick the exact commands themselves. Crucial: medium; the Shipwright reason is partly documented. | Done should mean a machine ran the checks, not that the agent said so. | The agent says "all green" without running anything, and the first failure shows in CI. (illustration) The lint command is listed in the repo instructions, the agent runs it, and a missing import is fixed before the PR opens. (illustration) A command that is not in the instructions is never run, so the lesson has the person list them. (illustration) | List the commands in the repo's instructions file and tell the agent to run them. Small: this is lesson 1's simplest version with the outcome recorded. |
| Run | A4. Never weaken a test to get green | A failing test is fixed in the code. A test changes only with a stated reason that the criterion changed; deleting or loosening an assertion otherwise fails the check. Expected: high. 0 of 6; none of the 79 surfaces checked documents a built-in guard (say "none of these docs describe one", never "no product has one"). Crucial: medium; no Shipwright file states this rule, so the failure is an illustration. | A loop that is told to make the checks pass has an easy way out: change the check. | The loop hits a failing test, loosens the assertion, and reports green after one attempt. (illustration) A test that expects 3 results is changed to expect "at least 1". (illustration) A flaky test is skipped and the skip is flagged for a person to decide. (illustration) | A diff rule in the criteria check: no removed or weakened assertions in test files unless the task says so. Small to state; judgement to enforce. |
| Run | A7. A bounded loop until checks pass | A failing check sends the agent back to fix it with the failure log and a list of what earlier attempts tried, up to a cap; then it stops and asks. Expected: high. 4 of 6 keep going until checks pass; 2 state a numeric cap (OpenHands, 10 rounds; Cursor, 10 CI follow-ups). Crucial: medium; "bounded" is by design and the cap's value is inferred. | A fix loop with no history repeats itself, and one with no cap never ends. | With no cap the agent loops on a flaky test all night. (illustration) With no history it makes the same fix three times. (illustration) After the cap it stops and hands the failing log to a person. (illustration) | A loop in the dev-task prompt with a counter and a one-line history of each attempt. Small. |
| Run | A5. A fresh-context check of the criteria against the diff | A separate agent, given only the criteria and the diff, marks each criterion MET, PARTIAL or NOT MET; anything else goes back to be fixed. Expected: medium. 2 of 6 use a separate verifier (Factory, OpenHands). Who decides done is split: automated 2, human 2, no gate stated 2. Crucial: medium; the failure it prevents is inferred. | The builder grading its own work marks everything MET. Its limit: it reads the diff, not a run, which is why A6 exists. | The implementer rates its own criteria and every one is MET. (illustration) A criterion about a validation error has no matching code in the diff, and the check reports NOT MET. (illustration) A criterion is PARTIAL because only the happy path is covered. (illustration) | One sub-agent call with a fixed prompt, on a low-cost model. Small. |
| Run | A6. Run the app where it matters | For a user-facing criterion, start the app and exercise the path; attach the output. Expected: medium. 2 of 6 do it built in (Factory, Cursor); Devin when the prompt asks; Claude Code on another surface; OpenHands and Copilot not described. Crucial: medium; no documented Shipwright reason. | A check that reads the diff can rate behavior MET on code that never ran. | A button is wired to the wrong handler and the diff reads fine, while every test mocks the handler. (illustration) A page builds but renders blank, found only by loading it. (illustration) A criterion with no user-facing behavior skips this and says why. (illustration) | A start script plus a prompt line. Medium: the lesson must supply the start script. |
| Run | A8. Show evidence, not a claim | Print a table of each criterion, each check and its outcome, so a person can see what ran. Expected: high. Logs or diffs reach the person in 6 of 6; visual evidence in 2 (Devin, Cursor). Crucial: medium; the purpose of recording passes as well as failures is inferred. | A "done" with no record cannot be told apart from a skipped step. | The PR says "tested" and the person cannot tell which checks ran. (illustration) The table shows lint skipped for a missing tool, so the person knows to look. (illustration) A screenshot of the running page is attached for a user-facing change. (illustration) | A table in the PR body, built from the check outputs. Small. |
| Gate | A9. CI is the arbiter, required by branch protection | Local checks are a fast signal; the gate is a CI job that the main branch cannot be merged without, and branch protection requires it. Expected: high. CI is the gate in the repository's rules, not the product's: 2 of 6 are bound by repo rules (Devin, Copilot), 1 waits on every check on the commit (Cursor), 0 require a product check before the PR. Crucial: high, because the reason is documented. | The agent's sandbox often lacks tools or secrets, so a local run is not the arbiter. Without enforcement the check is a social contract. | A local lint run is skipped for a missing tool, the PR opens, and nothing stops the merge with CI red. (illustration) CI fails on the PR and branch protection blocks the merge until it is fixed. (illustration) The workflow runs green for a few days before it is made required, so the first rule does not block every PR. (illustration) | A CI workflow running the repo's validate command, and one branch-protection rule requiring it. Small; a person sets the rule and the lesson shows it. |

## Prerequisites

- Lesson 1: the plan and dev-task skills and the task loop.
- Lesson 2: a plan whose tasks carry a test line.

## Exercise outcomes

Outcomes only; no required tool, language or runner. Each covers one or more Tier A capabilities.

- A task's test line is read before building starts, and "none needed" carries a reason (A3).
- Each acceptance criterion has a test that was run and seen failing before the code that satisfies it (A2).
- The repo's install, lint, typecheck and test commands are run before done, and each outcome is reported (A1).
- No test is deleted or loosened to get green without a stated reason that the criterion changed (A4).
- A failing check sends the agent back with the log and the earlier attempts, and the loop stops at a cap (A7).
- A separate check marks each criterion MET, PARTIAL or NOT MET from the criteria and the diff alone (A5).
- For a user-facing criterion, the app is started and the path exercised, with the output attached (A6).
- The PR shows a table of what ran and what the outcome was, not only "tested" (A8).
- A merge is blocked while the CI job is red (A9).

## Loop delta

**What does the loop do after this lesson that it could not before?**

The loop's "done" now means a check ran and a record exists. Before, dev-task ran the repo's commands once and the PR
said it was finished; now each task's test line becomes failing tests first, the checks run with their outcomes shown, a
fix loop is bounded, a fresh agent checks the criteria against the diff, no test is weakened to get there, and CI behind
branch protection decides whether the PR can merge. The factory has upgraded its own dev-task to do this.

**Does it cover what is expected, common and crucial for its one component?** (and name the deeper dives left for later lessons)

Yes. Both capabilities rated crucial and documented (A2, A9) and every one rated expected and common (A1, A7, A8) are in
Tier A and exercised; A3 to A6 are kept on judgement, as the cheapest checks the design needs. Left for later: coverage
thresholds that block and canary suites (release lesson), testing principles and post-PR auto-fix (review lesson), check
history, learned skips and test-quality measurement (feedback and maintenance lesson), required-step proofs (governance
lesson), and designing the whole test system, including speed budgets (test-readiness destination).
