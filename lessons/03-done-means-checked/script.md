# Script: Done means checked

Narrated by Dan over the slides (face cam in a screen corner). Slides carry labels; this file carries the words. Beat
numbers match the rows of the [run-of-show](run-of-show.md). The deck is [deck/index.html](deck/index.html) (26 slides).

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beats is pre-queued in `factory/`: the
factory is asked, plans it and builds it during the run, from the four prompts in [demo/prompts](demo/prompts/README.md).

Field claims: every claim about another product names the section of this lesson's field comparison file
([options](options.md)) it comes from, in the form "Field: <section name>". That section holds the first-party URL and
the as-of date. Say only what the cell says; "not in their docs" means the pages checked do not say, never that the product
lacks it. Name the surface when you name the product.

Examples marked _(illustration)_ are constructed for the lesson and are not a claim about any product. Say so each time.

Research numbers come from [the research notes](../../planning/lesson3-validation-depth/research.md). Say the source and
the confidence each time you give one. Re-check the SpecBench and SWE-Mutation figures just before filming.

## The one idea

An agent that writes both the code and the checks can pass both while having understood the task wrong. A check is only as
strong as its **independence from the builder**. These techniques are classic software engineering; the lesson frames each
by why it matters more when an agent writes the code and the tests together.

## What this lesson does not claim

We did not run a before/after comparison of the upgraded and the original dev-task. Dan decided on 2026-10-29 to skip it.
So nothing here says the four built capabilities improve the output. What the lesson shows instead is (a) published
research numbers, each with its source and confidence, and (b) one recorded run of ours: a Stryker mutation run on lesson
1's suite. Say this plainly on the results slide (beat 10) and again if asked.

## Running time

Estimates for the finished video, narration plus the four live upgrades. The live upgrades are the variable part.

| Part | Beat | Slides | Estimate |
|---|---|---|---|
| Opening: what "done" means today | 1 | 1-4 | 3 min |
| The one idea, the ladder, what we build | 2 | 5-6 | 4 min |
| Define, then live upgrade 1 | 3 | 7-8 | 7 min |
| Run, then live upgrade 2 | 4 | 9-10 | 7 min |
| Test guard, then live upgrade 3 | 5 | 11-12 | 6 min |
| Fresh check, then live upgrade 4 | 6 | 13-14 | 8 min |
| The gate: a guardrail the agent cannot skip | 7 | 15 | 3 min |
| Three ideas we name, not build | 8 | 16-17 | 4 min |
| Our recorded mutation run | 9 | 18-19 | 4 min |
| What the numbers say, and do not | 10 | 20 | 3 min |
| Recap, after, and how the field differs | 11 | 21-24 | 6 min |
| Names, and where factories take it | 12 | 25 | 3 min |
| Exercise | 13 | 26 | 2 min |
| **Total** | | | **about 60 min** |

If the cut runs long, trim beat 8 to the one slide that names the three ideas (slide 16), and shorten beat 11's field
walk-through to the CI slide (slide 24). Do not trim the live upgrades in beats 3 to 6.

## Beats

1. **Opening: what "done" means today** (about 3 min; slides 1-4).
   - Hand-off from lesson 2: every task now carries acceptance criteria; this lesson is what they are for.
   - Lesson 1's dev-task runs the repo's commands once and the PR says it is finished. A reviewer cannot tell a checked
     "done" from a claimed one.
   - Where this sits: the Verification component, Work done band (slide 2, component highlighted).
   - What the human does (slide 3): writes the criteria, sets the CI rule once per repo, reads the evidence. Nobody takes the agent's
     word for it.
   - The one idea (slide 4, "The builder also wrote the check"): the same agent writes the code and the tests, so both can
     share one misreading of the task and both go green. Examples _(illustration)_: a function returns a hard-coded
     value and its test asserts that value; the agent reads "empty" as "null" in both places.
   - Say what is left for later up front: coverage limits, canary suites and designing a whole test system are named in
     beat 12, not taught.
2. **The ladder, and what we build** (about 4 min; slides 5-6). Tool-neutral.
   - Slide 5, the independence ladder: builder's tests, red first (the test existed and failed before the code), a fresh
     agent (it did not see the build), hidden tests (a separate agent writes them from the criteria and the builder never sees them). Each step trusts the
     builder less. Hidden tests sit on the ladder but are mentioned, not built.
   - Slide 6: four upgrades to dev-task, built live, one at a time. After each capability slide the factory applies one
     short prompt to its own dev-task skill and we read the SKILL.md diff on screen.
   - Say out loud that nothing is pre-queued and no plan session queued this work. The prompts are stored in the repo
     (`demo/prompts/`), one per capability, and each stands alone.
3. **Define, then live upgrade 1: red-first tests** (about 7 min; slides 7-8).
   - **Define: criteria become tests, written first.** Concept: each acceptance criterion gets a test written before the
     code, run, and seen failing; the task picks which layer (unit, integration, end to end) proves it. Input is lesson 2's
     2 to 5 criteria, one of which names the layer and the tests added or retired.
   - Why: tests written after the code agree with it. Writing the check first is the cheapest independence from the
     builder. A test that passes straight away tests existing behavior or is wrong, so rewrite it.
   - Examples _(illustration)_: "rejects an empty name" fails first, then passes once the code rejects it; a criterion
     about two services talking gets an integration test, because a unit test would pass with both mocked.
   - Build: one short prompt. Demo: a rule in the dev-task skill. Yours: any test runner, any agent.
   - **DEMO, upgrade 1** (slide 8): run `01-red-first-tests.md`. Show the SKILL.md diff: tests first at the layer the
     task names, a step that runs them and confirms they fail, the red run quoted in the PR. Then run the upgraded
     dev-task on a small task and show the red run.
4. **Run, then live upgrade 2: checks and an evidence table** (about 7 min; slides 9-10).
   - **Run: the repo's own checks and an evidence table.** Concept: before reporting done, run install, lint, typecheck
     and test as the repo names them. A failing check goes back with its log and a one-line history of earlier attempts;
     after a cap it stops and asks. The PR shows a table of each criterion and check with its outcome.
   - Why: "done" should mean a machine ran the checks and a record exists. Say the loop in one line: log plus history,
     capped. The person must list the commands; if one is missing the agent asks.
   - Examples _(illustration)_: the agent says "all green" and ran nothing; the table shows lint skipped for a missing tool
     so the reviewer knows to look; after three attempts the agent stops and hands over the log.
   - Field: Field slide 1 (who decides done). Five of six run checks; say the cells, not more.
   - **DEMO, upgrade 2** (slide 10): run `02-run-checks-evidence.md`. Show the diff (the verify step widened, a capped
     loop with a history, the table added to the PR body). Run it on a small task with one induced failure and show the
     second attempt carry the first attempt's log.
5. **Test guard, then live upgrade 3** (about 6 min; slides 11-12).
   - **Run: never weaken a test to get green.** Concept: a failing test is fixed in the code. A test changes only with a
     stated reason that the criterion changed; a deleted test, a loosened assertion or a newly skipped test fails the
     check otherwise.
   - Why: a loop told to make the checks pass has an easy way out, which is to change the check. This guard protects the
     red-first tests from the fix loop. Say the field claim carefully (Field: Not compared here): the grid has no column
     for it, so claim nothing about other products.
   - Examples _(illustration)_: an exact count of 3 becomes "at least 1" and the run is green after one attempt; a flaky
     test is flagged for a person instead of skipped.
   - **DEMO, upgrade 3** (slide 12): run `03-weakened-test-guard.md`. Show the diff: one rule and one verification step
     that reads the test-file diff, replacing the existing sentence rather than repeating it. Tempt the loop to loosen a
     test and show that it does not. Judgement to enforce: say so.
6. **Fresh check, then live upgrade 4** (about 8 min; slides 13-14).
   - **Check: a fresh agent marks the criteria.** Concept: a separate agent that has not seen the build, given only the
     criteria and the diff, marks each criterion MET, PARTIAL or NOT MET with a line of evidence. For a user-facing
     criterion it also starts the app and exercises the path, because reading a diff is not running the code.
   - Why: the builder grading its own work marks everything MET. This is the capability that most directly states the one
     idea.
   - Examples _(illustration)_: a validation-error criterion has no matching code in the diff, so NOT MET; a button wired
     to the wrong handler reads fine in the diff and only loading the page shows it.
   - Field: Field slide 1. Say the surfaces: Factory's validation workers and OpenHands' judge are the documented
     separate checks; name the surface each time.
   - **DEMO, upgrade 4** (slide 14): run `04-fresh-context-check.md`. Show the diff: a new step before the PR, a fresh
     agent given the criteria and the diff only, anything not MET goes back. Run it on a task with one deliberately
     missing criterion and show NOT MET. Show the app started and the path exercised.
7. **The gate: a guardrail the agent cannot skip** (about 3 min; slide 15). Not a capability; a guardrail on the agent.
   - Local checks are a fast signal. The gate is a CI job that runs the repo's validate command, and a branch-protection
     rule that the main branch cannot be merged without it. The workflow is code, and the rule is set once per repo, not
     per task, so it is not a step in the task flow: every task after that is gated automatically. Show the rule in the
     settings. Mention running the workflow green for a few days before making it required.
   - Why: this is what makes every other check binding. The agent's sandbox may lack tools or secrets, so a local run is
     not the arbiter, and without the rule the agent (or anyone) can merge past a red run and every check is advisory.
     Crucial for quality, with a documented reason.
   - Field: Field slide 2 (CI gating). Say it again in beat 11.
8. **Three ideas we name, not build** (about 4 min; slides 16-17). Each is a classic technique and why it matters more
   when an agent writes the code. None is built.
   - Slide 16 names them, with held-out tests and property-based testing as one line each. The ladder's last rung and
     the next two are all about the same question: would a wrong answer get caught?
   - **Held-out tests** (slide 16, one line). Tests the builder never sees, written by a separate agent from the criteria, which compose features the visible tests check one at
     a time. An agent can satisfy visible tests by pattern-matching them _(illustration: it hard-codes the expected
     values and the hidden test that combines them fails)_. Source: SpecBench, a preprint, medium confidence; the gap
     between visible and held-out pass rate grows about 28 points per tenfold increase in code size. Check the figure
     again before filming. Hidden tests are finite and cannot prove the spec is met.
   - **Mutation testing** (slide 17, its own slide because we have a real result to show next). Change the code on purpose and see whether the tests fail; a test that does not
     notice is weak. Coverage cannot see this. Source: Meta's report, where 49% of the mutant-killing tests added no line
     coverage (high confidence as a first-party report, on one company's codebase, not on coding agents' own tests).
   - **Property-based testing** (slide 16, one line). State a rule that must hold for every input and let a tool generate
     the inputs. Example tests cover the cases the author thought of, and an agent writes a lot of code fast. The agent
     can state the rules from the types and docstrings. Source: Anthropic Frontier Red Team write-up, 56% of 50 reviewed reports valid and 32% reportable;
     say that is an agent finding bugs in existing libraries, not checking its own new code.
   - Each of the three is owned by a later verification lesson, not yet scheduled. Promise nothing.
9. **Our recorded mutation run** (about 4 min; slides 18-19). A recorded result, not built live.
   - Slide 18: we ran Stryker on lesson 1's test suite. Score 68%, 273 mutants, 65 survivors. One run on our own suite;
     not a rate and not a claim about any other project. A full run took about nine minutes, so a real use would scope it
     to changed files.
   - Slide 19: five survivors we checked by hand, not planted. Walk them: input validation no test covers (36 of 36 tests
     still pass with the whole check replaced by `false`); the stuck-task warning firing for the wrong tasks; the
     "nothing ready" line logged every poll instead of once; a memoization only a speed test would see; and an unreachable
     fallback, where the right answer is to delete code, not add a test. Point out that a survivor is a question, not
     always a missing test.
10. **What the numbers say, and what they do not** (about 3 min; slide 20).
    - Walk the table: each published number with its source and confidence, then our one run. Mostly preprints and
      one-off reports; none of them scores a coding agent's own tests.
    - Say plainly: **we did not measure the four built capabilities.** We planned a before/after comparison of the
      original and the upgraded dev-task and chose not to run it, so there is no number for how much they improve the
      output. The upgrades are there because they raise independence by design, and the live diffs are the evidence of
      what changed, not a score.
    - Do not quote the "42% fewer defects" figure from secondary blogs: we could not trace it to a primary source.
11. **Recap, after, and how the field differs** (about 6 min; slides 21-24).
    - Slide 21, the recap: the ladder again, with the three built steps ticked and hidden tests greyed out as named, not
      built. The ladder is shown here and on slide 5 only.
    - Slide 22: after the lesson, each PR carries its criteria and the outcomes. Loop delta in one line: "done" now means a
      check that is partly independent of the builder ran and a record exists.
    - Slide 23: Field: Field slide 1. Who decides done, who keeps checks hidden, who measures test quality. Marks only.
      Say "not in their docs" for a "–", never "has none". Name the surface with the product.
    - Slide 24: Field: Field slide 2 (CI gating). Takeaway: the stages appear in different places under different names;
      ours is one way, not the standard. Do not claim any product cannot do something. Links go in the video description.
12. **Names, and where factories take it** (about 3 min; slide 25).
    - Names are not canonical: `dev-task` and its spec check are this sample's names. Field: What other factories call it
      (spoken, no slide).
    - Destinations, described not prescribed, each with its owning lesson, order open (Field: Where it goes from here): a
      coverage threshold that blocks merges and a canary suite after deploy (release lesson); testing principles as review
      criteria and fixes after the PR opens (review lesson); recording every check outcome, skipping a check that has failed
      to run before, and flake handling (feedback and maintenance lesson); required-step lists with proof signals
      (governance lesson); speed budgets per test layer and designing the whole test system first (test-readiness
      destination). Say what is not here: building held-out, mutation or property-based testing properly.
13. **Exercise** (about 2 min; slide 26). The [exercise](exercise.md) lists outcomes only and names no required tool,
    language or runner. Hand off: your own build step, with an agent and language of your choice, gets the same behaviours.
    Close on the loop delta: "done" now means a check ran and a record exists.
