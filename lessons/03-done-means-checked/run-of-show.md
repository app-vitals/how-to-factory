# Run of show: Lesson 3, Done means checked

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html) (27 slides). Every row names the [script.md](script.md) beat it performs, and the time
column is that beat's estimate from the script's running time table. This lesson runs things on camera: each of the four
live upgrades is a real run of one prompt from [demo/prompts](demo/prompts/README.md), with the SKILL.md diff on screen.

**Pre-filming:** work through [checklist.md](checklist.md). Run all four prompts once, in order, on a scratch repo: apply
each to the factory's dev-task, read the diff (small, confined to the skill's steps and rules; otherwise discard and run
again), and run the upgraded dev-task on a small task. Prepare two things for the demos: a task with one induced failing
check (upgrade 2) and a task with one deliberately missing criterion (upgrade 4). Re-check the as-of dates in the field
comparison file ([options](options.md)), and the SpecBench and SWE-Mutation figures in
[the research notes](../../planning/lesson3-validation-depth/research.md). Nothing for the demos is pre-queued in
`factory/`.

| # | Slides | Demo beat | Script beat | Time | Notes |
|---|---|---|---|---|---|
| 1 | 1-4 | | 1 | 3 min | Title, factory map (verification glows), what the human does (write criteria, set the CI rule, read the evidence), "The builder also wrote the check" (the one idea; examples are illustrations, say so). Say lesson 1's dev-task ran the repo's commands once and the PR said it was finished, and that coverage limits, canary suites and designing a whole test system are named in row 13, not taught |
| 2 | 5-6 | | 2 | 4 min | The independence ladder (builder's tests, red first, fresh agent, hidden tests; each trusts the builder less), then what we build: four upgrades to dev-task, one prompt each, the SKILL.md diff on screen. Say out loud that nothing is pre-queued and no plan session queued this |
| 3 | 7 | | 3 | 2 min | Define: criteria become red-first tests (concept, why, the two spoken examples, what it takes to build; "in our demo we use..." and "yours can be anything") |
| 4 | 8 | DEMO upgrade 1: red-first tests | 3 | 5 min | Run `01-red-first-tests.md` against the factory's dev-task. Read the diff: tests first at the layer the task names, a step that confirms they fail, the red run quoted in the PR. Run the upgraded dev-task on a small task and show the red run before any code |
| 5 | 9 | | 4 | 2 min | Run: the repo's checks and an evidence table. The person must list the commands; the loop in one line (log plus history, capped, then ask). Examples are illustrations |
| 6 | 10 | DEMO upgrade 2: run and show evidence | 4 | 5 min | Run `02-run-checks-evidence.md`. Read the diff: widened verify step, capped loop with a history, the table in the PR body. Run a task with one induced failure and show the second attempt carry the first attempt's log; a skipped check shows as skipped |
| 7 | 11 | | 5 | 2 min | Never weaken a test to get green. The guard protects the red-first tests from the fix loop. Say "the grid has no column for this", claim nothing about other products |
| 8 | 12 | DEMO upgrade 3: the test guard | 5 | 4 min | Run `03-weakened-test-guard.md`. Read the diff: one rule and one step over the test-file diff, replacing the old sentence. Tempt the loop to loosen a test and show that it does not. Say it is judgement to enforce |
| 9 | 13 | | 6 | 2 min | Check: a fresh agent marks the criteria, and runs the app for a user-facing path. This is the capability that most directly states the one idea. Name the surface when naming the field (Factory validation workers, OpenHands judge) |
| 10 | 14 | DEMO upgrade 4: fresh-context check | 6 | 6 min | Run `04-fresh-context-check.md`. Read the diff: a new step before the PR, a fresh agent given the criteria and the diff only, anything not MET goes back. Run a task with one deliberately missing criterion and show NOT MET; show the app started and the path exercised. Then end the demo run: a person reviews and merges, as before |
| 11 | 15 | | 7 | 3 min | Gate: where a person comes in. The workflow is code; a person sets the branch-protection rule. Show the rule in the settings. Mention running the workflow green for a few days before making it required |
| 12 | 16-19 | | 8 | 6 min | Three ideas we name, not build: the overview (16), held-out tests (17), mutation testing (18), property-based testing (19). Per idea: the classic technique, then why it matters more with an agent. Give each source and its confidence; SpecBench is a preprint at medium confidence, and the Anthropic write-up is an agent finding bugs in libraries, not checking its own code. Not built, owned by a later verification lesson, not yet scheduled |
| 13 | 20-21 | | 9 | 4 min | Our recorded Stryker run on lesson 1's suite (68% score, 273 mutants, 65 survivors; one run, not a rate), then the five survivors checked by hand. A survivor is a question, not always a missing test: one fix is to delete code |
| 14 | 22 | | 10 | 3 min | The results slide: published numbers each with source and confidence, plus our one run. Say plainly that the four built capabilities were not measured: we skipped the before/after comparison, so there is no number for how much they improve the output. Never quote "42% fewer defects" |
| 15 | 23-25 | | 11 | 5 min | After (23: done means a check ran, each PR carries criteria and outcomes), then two field slides: hidden tests and test quality (24), CI gating (25). Marks and chips only. Say "not in their docs" for a "–", never "has none". Do not claim any product cannot do something. Name the surface with the product. Takeaway: ours is one way, not the standard. Links go in the video description |
| 16 | 26 | | 12 | 3 min | Names (spoken: `dev-task` and its spec check are this sample's names), then where factories take it (release, review, feedback, test system): destinations described, not prescribed. Say what is out of scope: blocking coverage limits, canary suites, testing principles as review criteria, post-PR fixes, check history, required-step lists, speed budgets, designing the whole test system, and building held-out, mutation or property-based testing. Each has its own lesson, order open; promise nothing |
| 17 | 27 | | 13 | 2 min | Exercise hand-off: give your own build step the same behaviours, any agent and language. Outcomes only, no required tool. Close on the loop delta: "done" now means a check ran and a record exists |

Timing: about 61 minutes in total, matching the script. The four demos are the variable parts: let each run through the
diff and one run of the upgraded skill. If the cut runs long, trim row 12 to the overview slide and shorten row 15 to the
CI slide; do not trim rows 4, 6, 8 or 10.

**Order note:** unlike the earlier cut, there is no single demo slide near the start. The four DEMO slides (8, 10, 12, 14)
each close the capability beat before them, so the viewer sees the concept, then the diff, then a run, four times.
