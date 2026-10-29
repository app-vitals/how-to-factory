# Run of show: Lesson 4, The loop reads PRs

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html) (28 slides). Every row names the [script.md](script.md) beat it performs, and the
time column is that beat's estimate from the script's running time table. Like lessons 2 and 3, this lesson runs things
on camera: the live beat is a real run, not build-only.

**Pre-filming:** work through [checklist.md](checklist.md). Run the live beat once on a scratch repo: ask the factory to
teach its loop to read PRs as in beat 7, and see what it plans, whether the stub review posts a verdict the loop can read
and where the round cap lands. Stage the open PRs for beat 8 (see the checklist). Re-check the as-of dates in the field
comparison file. Nothing for the demo is pre-queued in `factory/`.

| # | Slides | Demo beat | Script beat | Time | Notes |
|---|---|---|---|---|---|
| 1 | 1-3 | | 1 | 3 min | Title, factory map (the loop gets a closer look), a PR is not finished work. Hand-off from lesson 1 (the loop opens a PR and stops) and lesson 3 (the PR carries an evidence table and a required CI result). The one idea: each tick the loop looks at every open PR and picks review, patch, or a person. Say what is left for later up front: review quality, patch quality, merge and release, many agents at once and the schedule itself are named in row 10, not taught |
| 2 | 4-5 | | 2 | 3 min | Concept: See, Decide, Reassess, Stop, tool-neutral. Land the new vocabulary: a review belongs to a commit, state is read live and not remembered, three outcomes for every PR. Slide 5 lists what we build |
| 3 | 6-8 | DEMO the factory teaches its loop to read PRs | 7 | 14 min | The live beat. Say out loud that nothing is pre-queued and no plan session queued this. Ask the factory to list open PRs and read their state, decide review, patch or wait, send a patched PR back to review, and flag a person after the round cap. Show the plan run on that request, then the loop picking the tasks. Slide 6 list and read (A1, A2), slide 7 decide (A3 to A5, A8), slide 8 stop (A6, A7). Build the two stub skills live and call them samples: review posts `APPROVED` or `FINDINGS` on the head commit, patch makes a small change and pushes. Show the decision function on made-up PR facts _(illustration)_ before it touches a real PR. A person reviews and merges the factory's own PR. Never trim this beat |
| 4 | 9-12 | | 3 | 2 min | See: A1 list every open PR (10), A2 skip drafts and its own PRs (11), A8 the review leaves a readable verdict (12). Per capability: concept, one line on why it exists, spoken examples (each an _(illustration)_), what it takes to build, then "in our demo we use..." and "yours can be anything". Point back at the code from row 3. First to shrink to one line each if time is short |
| 5 | 13-16 | | 4 | 3 min | Decide: A3 no verdict on the head commit means review (14), A4 findings, red CI or a conflict means patch (15), A5 otherwise wait for a human (16). The verdict names a commit; compare it with the head. The conflict trigger is the first to drop if time is short |
| 6 | 17-18 | | 5 | 2 min | Reassess and Stop: A6 a patch means review again (17), A7 cap the rounds, flag a person, leave the PR alone (18). Show 3 rounds as a choice, not a rule |
| 7 | 19 | DEMO patch, re-review, cap | 8 | 4 min | The new loop on the open PRs staged in the checklist. PR one has no verdict: it gets a review and `FINDINGS`, the next tick patches it, the head moves, the tick after reviews the new head. PR two keeps failing: it hits the round cap, the loop flags a person and then skips it. PR three is clean: it is left alone and shows as "waiting for a human" in the tick's summary. If the stub reviewer misbehaves, use the fallback in the checklist. If time is short, cut to the cap alone, never beat 7 |
| 8 | 20 | | 8 | (in row 7) | After: a PR gets one outcome. Walk the finished tick summary from row 7 with one outcome per PR. Say it is shown, not rebuilt |
| 9 | 21-24 | | 6 | 4 min | How the field differs, four slides: where PR state lives (21, A1), re-review after a push (22, A3 and A6), conflict repair (23, A4), a numeric round cap (24, A7). Marks and chips only. Say "not in their docs" for a "–", never "has none". Do not claim any product cannot do something. Name the surface with the product (a reviewer, a fixer and an approver are usually separate). Takeaway: the stages appear in different places and under different names; ours is one way, not the standard. Links go in the video description |
| 10 | 25-27 | | 9 | 2 min | Names ("Same job, different names"; `review`, `patch` and the loop's decision are this sample's names), then where factories take it and what comes around the loop later: destinations described, not prescribed. Out of scope: review depth and real approval, patch depth, merge and release, many agents at once, the tick itself and cooldowns, an author allowlist, a queue snapshot. Each has its own lesson, order open; promise nothing. Shrinks to one slide if the cut runs long |
| 11 | 28 | | 10 | 1 min | Exercise hand-off: give your own loop the same behaviours, any agent and language. Outcomes only, no required tool. Close on the loop delta: the loop's work no longer ends at an open PR, and a PR that reaches "reviewed clean, CI green, no conflict" is ready for a person to merge |

Timing: about 38 minutes in total, matching the script. The live beat is the variable part: let it run through the
plan, the decision function on made-up facts and the stubs.

**Open item for the cut:** the deck puts the three DEMO slides at positions 6 to 8, but the script's live beat (beat 7)
is narrated after the field comparison, and beats 3 to 5 say "built live in beat 7". This sheet follows the deck order,
so the live beat is filmed early and the capabilities in rows 4 to 6 are then explained against a build the viewer has
already seen. If you would rather film in script order, move slides 6 to 8 to follow slide 24 and reorder rows 3 and 9;
the rest is unchanged.
