# Plan: lesson1-next-arc (prefix NXA)

Repo: app-vitals/how-to-factory. Reframes what comes after lesson 1 and sharpens the "Where factories take it" slide. Follows lesson1-scope-pullback (SPB).

## Direction (Dan, Slack)
- On "Where factories take it": are those the right things to point to? It is a tease for where we are going or what is next; does it fit the lesson?
- Dan: "the next lesson is not really the end to end run, but we will have what we built so we'll be using our simple software factory to continue to build itself now that we have this foundation." Then "ok go" on the combined proposal.

## Findings
- Seven places in the lesson materials still say lesson 2 is the end-to-end run: script.md line 5 and step 10 ("Next lesson we run it end to end, then the loop builds the next feature"); README.md lines 38 and 107; exercise.md line 35 ("For a guided end-to-end run, see lesson 2"); run-of-show.md lines 9 and 24; the deck's exercise slide bullet "Next lesson: run it end to end". Two other "end to end" mentions are correct and stay: the pre-filming note (run the skills and loop yourself once before recording) and the scope test in README.md ("turn one conversation into reviewed PRs end to end").
- The arc matches the repo's original product intent ("the factory eventually builds the factory"): lesson 1 is the foundation (plan, dev-task, loop); later lessons add components from the factory map and build them with this factory. The order is left open.
- The destinations slide today: Tracker queue (Linear, Jira or GitHub Issues hold the work), Cloud sandboxes (each task runs in an isolated VM), Parallel agents (several tasks run at once); caption "Destinations, not a recommendation." Each is sourced in options.md. They are exactly the topics pulled out of the field comparisons, and each is the deeper version of one thing built in lesson 1 (plan's queue, dev-task's environment, the loop's concurrency) - but the slide does not say which piece each extends, and it ignores the faded components on the factory map (verification, review, release, intake, chat), which are the real "what's next".

## Design
- **Replace the "next lesson is the end-to-end run" framing everywhere** with: from here, each lesson adds a component from the factory map and builds it with the factory from this lesson (plan the feature, the loop runs dev-task on the tasks, a person reviews the PRs); the exercise is how viewers get the same foundation so they can follow along with their own factory; the order is left open and nothing is promised. Keep the pre-filming note and the scope-test sentence.
- **Exercise slide bullet:** 'Next: our factory builds its own next parts.' (at most 8 words per bullet, 3 bullets).
- **Destinations slide:** keep it, label each option with the piece it extends - 'Plan: a tracker holds the queue' (Linear, Jira or GitHub Issues hold the work), 'Dev-task: each task in its own environment' (each task runs in an isolated VM), 'Loop: several at once, or on a schedule' (parallel agents; scheduled runs) - and include one option for the faded map components: 'Checks: another model or a script judges done' (the independent-checks pointer; if SPB-3.1 already added it, relabel it, do not duplicate). Caption at most 12 words: 'Later, not next. From here our factory builds its own parts.' Every destination keeps a first-party source in options.md's 'Where it goes from here' (add the scheduled-runs and independent-checks sources there from files already in the repo: Claude Code overview for routines/background agents, and the verify-judge cells of landscape/matrix.json); no new unsourced claims.
- Scope: wording and one slide. No new slides.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| NXA-1.1 | docs: reframe the next-lesson arc and the destinations slide | SPB-3.1 | sonnet | docs/nxa-1-1-next-arc-and-destinations |

```
[PRIOR SESSION lesson1-scope-pullback] SPB-3.1 (last editor of script.md and the deck)
[START] NXA-1.1 (needs SPB-3.1)
```

## Breaking Change Safety
Wording and one slide; nothing renamed or removed externally. Consumers of the strings changed: lessons/01-the-simplest-factory/{script,README,exercise,run-of-show,options}.md and the deck. No CI check reads them beyond check-decks.ts (deck rules). Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Combined Dan's correction with the earlier destinations-slide proposal into one task; the pending SPB tasks do not mention lesson 2 and are left alone.
- Kept the destinations slide (the repo rules ask for 'where other factories take the concept') and reframed it, instead of replacing it with the end-state factory map.
- Next-lesson wording promises no order, per the original plan and the backlog ('lessons are chosen one at a time').
