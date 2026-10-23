# Run of show: Lesson 3, Done means checked

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html) (24 slides). Every row names the [script.md](script.md) step it performs, and the
time column is that step's estimate from the script's running time table. Like lesson 2, this lesson runs things on
camera: the live beat is a real run, not build-only.

**Pre-filming:** work through [checklist.md](checklist.md). Run the live beat once on a scratch repo: ask the factory to
upgrade its dev-task as in step 8, and see what it plans, where the induced failure goes and whether the guard holds.
Re-check the as-of dates in the field comparison file ([options](options.md)). Nothing for the demo is pre-queued in
`factory/`.

| # | Slides | Demo beat | Script step | Time | Notes |
|---|---|---|---|---|---|
| 1 | 1-4 | | 1 | 3 min (with row 3) | Title, factory map (verification glows), what the human does (nobody takes the agent's word), what we build (eight capabilities, three stages). Say lesson 1's dev-task ran the repo's commands once and the PR said it was finished, and that coverage limits, canary suites and designing a whole test system are named in row 11, not taught |
| 2 | 5 | DEMO the factory upgrades its own dev-task | 8 | 12 min | The live beat. Say out loud that nothing is pre-queued and no plan session queued this. Ask the factory to make dev-task write failing tests first, run the repo's checks, never weaken a test and fix failures in a bounded loop. Show the plan run on that request, then the loop picking the tasks (A2, A1, A4, A7). Then the new dev-task on a small task: the test is written, run and seen failing; the code goes in; the checks run; one induced failure sends it round the bounded loop with the log and its history. Show the guard: the loop is tempted to loosen a test and does not. A person reviews and merges. Never trim this beat |
| 3 | 6 | | 1 | (in row 1) | "What a claimed done gets wrong": says all green and ran nothing, passes by editing the test, loops on one failure forever. Examples are illustrations; say so. The one idea: done is something a machine checked, not the agent's say-so |
| 4 | 7 | | 2 | 3 min | Concept: Define, Run, Gate. Input is a task, output is checked work. Land the two new ideas: evidence instead of a claim, and a check that does not trust the builder |
| 5 | 8 | | 3 | 5 min | Define: A2 criteria become tests, written first (8). Per capability: concept, one line on why it exists or what it prevents, the spoken examples (each an _(illustration)_), what it takes to build; close with "in our demo we use..." and "yours can be anything". Point back at the failing test from row 2 |
| 6 | 9-11 | | 4 | 6 min | Run, built live: A1 the repo's own checks (9; the person must list the commands), A4 never weaken a test (10; say "none of the pages checked describe a built-in guard", never "no product has one") and A7 a bounded loop (11; the log plus a one-line history, then a cap). Same per-capability pattern as row 5 |
| 7 | 12-14 | | 5 | 5 min | Run, walked through: A5 a fresh agent checks the criteria (12; its limit is that it reads the diff, not a run), A6 start the app where it matters (13; first to cut if time is short), A8 show evidence, not a claim (14; a skipped check shows as skipped). These are shown as finished output, not rebuilt. If the cut runs long, drop A6 to a single slide and then trim row 9 to the criteria table alone |
| 8 | 15 | | 6 | 3 min | Gate: A9 CI decides, branch protection binds. Local runs are a fast signal; the agent's sandbox may lack tools or secrets. One workflow, one rule; a person sets the rule and the lesson shows it. Mention running the workflow green for a few days before making it required |
| 9 | 16 | | 9 | 4 min | After: done means a check ran. Walk the finished output for the walked-through capabilities, on the PR from row 2 or a prepared one: the criteria table of MET, PARTIAL and NOT MET (A5), the app started and a path exercised (A6), the PR table of criteria and checks with outcomes (A8), the red CI job that branch protection will not merge past (A9). Say these are shown, not rebuilt |
| 10 | 17-21 | | 7 | 5 min | How the field differs, five slides: who decides done and who runs the app (17, A5 and A6), who runs checks and keeps going (18, A1 and A7), criteria to checks (19, A2), test guards and evidence shown (20, A4 and A8), CI gates (21, A9). Marks and chips only. Say "not in their docs" for a "–", never "has none". Do not claim any product cannot do something. Name the surface with the product. Takeaway: the stages appear in different places and under different names; ours is one way, not the standard. Links go in the video description |
| 11 | 22-23 | | 10 | 3 min | Names ("Same job, different names"; `dev-task` and its spec check are this sample's names), then where factories take it (release, review, feedback, test system): destinations described, not prescribed. Say what is out of scope: blocking coverage limits, canary suites, testing principles as review criteria, post-PR fixes, check history, test-quality measurement, required-step lists, speed budgets and designing the whole test system. Each has its own lesson, order open; promise nothing |
| 12 | 24 | | 11 | 2 min | Exercise hand-off: give your own build step the same behaviours, any agent and language. Outcomes only, no required tool. Close on the loop delta: "done" now means a check ran and a record exists |

Timing: about 49 minutes in total, matching the script. The live beat is the variable part: let it run through the
failing test, the induced failure and the guard.

**Open item for the cut:** the deck puts the DEMO slide at position 5, but the script's live beat (step 8) is narrated
after the field comparison, and steps 3 and 4 say "built live in beat 8". This sheet follows the deck order, so
the live beat is filmed first and the capabilities in rows 5-6 are then explained against a run the viewer has already
seen. If you would rather film in script order, move slide 5 to follow slide 21 and reorder rows 2 and 10; the rest is
unchanged.
