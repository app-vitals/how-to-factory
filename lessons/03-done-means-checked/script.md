# Script (outline): Done means checked

Outline only. Each beat below is a heading, its job, and the points to hit; the words are written in a later pass. Same
format as the [lesson 2 script](../02-a-plan-that-looks-first/script.md): narrated by Dan over the slides (face cam in a
screen corner), slides carry labels, this file carries the words. Beat numbers will match the build steps in the README
and the beats in the run-of-show, both drafted after this outline.

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beat is pre-queued in `factory/`: the factory
is asked, plans it, and builds it during the run.

Field claims: every claim about another product names the section of this lesson's field comparison file (the sources
file in this folder) it comes from, in the form "Field: <section name>". That section holds the first-party URL and the
as-of date. Say only what the cell says; "not in their docs" means the pages checked do not say, never that the product
lacks it. Name the surface when you name the product.

Examples marked _(illustration)_ are constructed for the lesson and are not a claim about any product. Say so each time.

Ids: the A-numbers are stable ids from the [brief](brief.md), not the order. Capabilities are walked by stage, Define,
Run, Gate.

## Running time

Estimates for the finished video, narration plus the demo. The live build is the variable part.

| Part | Beat | Estimate |
|---|---|---|
| Opening: what "done" means today | 1 | 3 min |
| Concept: three stages, Define, Run, Gate | 2 | 3 min |
| Define: A2 (live) | 3 | 3 min |
| Run, built live: A1, A4, A7 | 4 | 6 min |
| Run, walked through: A5, A6, A8 | 5 | 5 min |
| Gate: A9 | 6 | 3 min |
| How the field differs | 7 | 5 min |
| Live: the factory upgrades its own dev-task | 8 | 12 min |
| Finished output for the walked-through capabilities | 9 | 4 min |
| Names, and where factories take it | 10 | 3 min |
| Exercise | 11 | 2 min |
| **Total** | | **about 49 min** |

If the cut runs long, A6 (run the app) moves first from a talk-through to a single slide in beat 5, then trim beat 9 to
the criteria table alone. Do not trim beat 8.

## Beats

1. **Opening: what "done" means today** (about 3 min).
   - Hand-off from lesson 2: every task now carries acceptance criteria; this lesson is what they are for.
   - Lesson 1's dev-task runs the repo's commands once and the PR says it is finished. The person reviewing cannot tell a
     checked "done" from a claimed one.
   - The one idea: done should mean something a machine checked, not the agent's say-so.
   - Where this sits: the Verification component, Work done band (show the factory map, component highlighted).
   - Say what is left for later up front: coverage limits, canary suites and designing a whole test system are named in
     beat 10, not taught.
2. **Concept: three stages** (about 3 min). Tool-neutral.
   - Define: each task says what proves it, and the proof is written first.
   - Run: the agent runs the repo's own checks, fixes failures within a bound, and shows the outcome.
   - Gate: a check the agent cannot talk past decides.
   - New vocabulary to land: evidence instead of a claim; a check that does not trust the builder.
3. **Define** (about 3 min). One stage slide, then one beat per capability. Each capability: concept, one line on why or
   prevents, two or three spoken examples _(illustration)_, what it takes to build, then "in our demo we use..." and
   "yours can be anything". Built live in beat 8.
   - **A2. Define: criteria become tests, written first.** The input is the task's 2 to 5 acceptance criteria from
     lesson 2; one names the test layer and the tests added or retired, and why. Each criterion gets a test; run it; it
     must fail before any production code exists. A test that passes first time is rewritten. Today's dev-task only
     instructs red-first and keeps no proof of the red run; the live upgrade adds that proof. Build: one rule in the
     brief and a step that records the red run. Demo: a rule in the dev-task prompt. Yours: any test runner and any agent.
4. **Run, built live** (about 6 min). One stage slide, then one beat per capability, same pattern as beat 3.
   - **A1. The repo's own checks before done.** Install, lint, typecheck, test, named in the repo's instructions;
     each outcome reported. Note the person must list the commands. Build: list the commands, tell the agent to run them.
   - **A4. Never weaken a test to get green.** A failing test is fixed in the code; a test changes only with a stated
     reason that the criterion changed. Say the field claim carefully (Field: A4): none of the pages checked describe a
     built-in guard, never "no product has one". Build: a diff rule in the criteria check. Small to state, judgement to
     enforce.
   - **A7. A bounded loop until checks pass.** Failure log plus a one-line history of earlier attempts, up to a cap, then
     stop and ask. Build: a counter and a history list in the prompt.
5. **Run, walked through** (about 5 min). Same pattern per capability; these are shown as finished output in beat 9, not
   built live.
   - **A5. A fresh-context check of the criteria against the diff.** A separate agent sees only the criteria and the
     diff and marks each MET, PARTIAL or NOT MET. Its limit: it reads the diff, not a run, which leads to A6.
   - **A6. Run the app where it matters.** For a user-facing criterion, start the app and exercise the path. Build needs a
     start script. First to cut if time is short.
   - **A8. Show evidence, not a claim.** A table of each criterion and each check with its outcome, in the PR. A skipped
     check shows as skipped.
6. **Gate** (about 3 min). One stage slide, one capability.
   - **A9. CI is the arbiter, required by branch protection.** Local runs are a fast signal; the agent's sandbox may lack
     tools or secrets. A CI job runs the validate command and a branch-protection rule makes it binding. Mention running
     the workflow green for a few days before making it required. Build: one workflow, one rule; a person sets the rule
     and the lesson shows it.
7. **How the field differs** (about 5 min; slides). One slide group per capability, in the brief's ids. Say only what
   the cells say.
   - A1: Field: A1. A2: Field: A2. A4: Field: A4.
   - A5: Field: A5 (who decides done, and with what). A6: Field: A6. A7: Field: A7. A8: Field: A8. A9: Field: A9.
   - Capabilities with no column to compare: say so (Field: Not compared here). Claim nothing about the field there.
   - Takeaway: the stages appear in different places and under different names across surfaces; ours is one way, not the
     standard. Do not claim any product cannot do something.
8. **DEMO: the factory upgrades its own dev-task** (about 12 min). The live beat. The factory built in lesson 1 is asked to
   upgrade its own dev-task to verify its work. Nothing is pre-queued in `factory/`, and no plan session queued this
   work; say that out loud on camera.
   - Ask, from the brief given in the lesson: dev-task writes failing tests first and records the red run, runs the
     repo's checks, never weakens a test (the guard is new), and fixes failures in a bounded loop. Say plainly that
     the live upgrade makes red-first provable and adds the guard; today's dev-task has neither.
   - Show the plan run on that request, then the loop picking the tasks (the steps of the spine: A2, A1, A4, A7).
   - Show the new dev-task on a small task: the test is written, run and seen failing; the code goes in; the checks run;
     one induced failure sends it round the bounded loop with the log and its history.
   - Show the guard: the loop is tempted to loosen a test and does not.
   - A person reviews and merges, as before.
9. **Finished output for the walked-through capabilities** (about 4 min). Say these are shown, not rebuilt.
   - The fresh-context criteria check and its table of MET, PARTIAL, NOT MET (A5).
   - The app started and a path exercised for a user-facing criterion (A6).
   - The PR table of criteria and checks with outcomes (A8).
   - The red CI job that branch protection will not merge past (A9).
10. **Names, and where factories take it** (about 3 min).
    - Names are not canonical: `dev-task` and its spec check are only this sample's names. Field: What other factories
      call it.
    - Destinations, described not prescribed, each with its owning lesson, order open, promising nothing (Field: Where it
      goes from here): a coverage threshold that blocks merges and a canary suite after deploy (release lesson); testing
      principles as review criteria and fixes after the PR opens (review lesson); recording every check outcome, skipping
      a check that has failed to run before, and measuring test quality (feedback and maintenance lesson); required-step
      lists with proof signals (governance lesson); speed budgets per test layer and designing the whole test system
      first (test-readiness destination).
    - Optional: the other-factories-at-a-glance slide (Field: Other factories at a glance).
11. **Exercise** (about 2 min). The [exercise](exercise.md) lists outcomes only and names no required tool, language or
    runner. Hand off: your own dev-task step, with an agent and language of your choice, gets the same behaviours. Close
    on the loop delta: "done" now means a check ran and a record exists.
