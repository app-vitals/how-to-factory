# Script (outline): The loop reads PRs

Outline only. Each beat below is a heading, its job, and the points to hit; the words are written in a later pass. Same
format as the [lesson 3 script](../03-done-means-checked/script.md): narrated by Dan over the slides (face cam in a screen
corner), slides carry labels, this file carries the words. Beat numbers match the build steps in the [README](README.md).

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beat is pre-queued in `factory/`: the factory
is asked, plans it, and builds it during the run, including the two stub skills.

Samples, not canon: the review and patch skills are small stubs built live so the loop has something to call. Name them as
samples, say plainly that real review and real patching are later lessons, and do not spend time on how either works inside.

Field claims: every claim about another product names the section of this lesson's [options file](options.md) it comes
from, in the form "Field: <section name>". That section holds the first-party URL and the as-of date (all 2026-10-28).
Say only what the cell says; "not in their docs" means the pages checked do not say, never that the product lacks it.
Name the surface when you name the product (a reviewer, a fixer and an approver are usually separate).

Examples marked _(illustration)_ are constructed for the lesson and are not a claim about any product. Say so each time.

Ids: the A-numbers are stable ids from the [brief](brief.md), not the order. Capabilities are walked by stage: See,
Decide, Reassess, Stop.

## Running time

Estimates for the finished video, narration plus the demo. The live build is the variable part.

| Part | Beat | Estimate |
|---|---|---|
| Opening: a PR is not finished work | 1 | 3 min |
| Concept: four stages, See, Decide, Reassess, Stop | 2 | 3 min |
| See: A1, A2, A8 | 3 | 2 min |
| Decide: A3, A4, A5 | 4 | 3 min |
| Reassess and Stop: A6, A7 | 5 | 2 min |
| How the field differs | 6 | 4 min |
| **Live: the factory teaches its loop to read PRs (do not trim)** | 7 | 14 min |
| The run: patch, re-review, cap | 8 | 4 min |
| Names, and where factories take it | 9 | 2 min |
| Exercise | 10 | 1 min |
| **Total** | | **about 38 min** |

Trim order if the cut runs long, first to last:

1. A2 (skip drafts and the agent's own PRs) and A8 (the verdict format) move from built live to a walk-through in beat 7,
   and shrink to one line each in beat 3.
2. The conflict trigger of A4 drops from the live build; say it is the same shape as the other two triggers.
3. Beat 6 keeps only A3, A6 and A7 (the capabilities rated crucial or documented); the rest become one closing slide.
4. Beat 9 shrinks to one slide.

**Do not trim beat 7**, the live loop build. If time is still short, cut beat 8 down to the cap alone, never beat 7.

## Beats

1. **Opening: a PR is not finished work** (about 3 min).
   - Hand-off from lesson 1: the loop picks a task, builds it, opens a PR and stops. Lesson 3 made the PR carry its evidence: a table of each criterion and check with its outcome, and a CI result behind a branch-protection rule a person sets.
     Nothing looks at that PR again, so a verdict, a red check or a new push goes unseen until a person notices.
   - The one idea: each tick the loop looks at every open PR and decides whether it needs a review, needs a patch, or
     needs nothing but a person.
   - Where this sits: Coordination / loop, Keeps it moving band, working at the edge of Work done (show the factory map,
     component highlighted).
   - Say what is left for later up front: review quality, patch quality, merge and release, many agents at once and the
     schedule itself are named in beat 9, not taught.
2. **Concept: four stages** (about 3 min). Tool-neutral.
   - See: each tick, read every open PR's state from GitHub.
   - Decide: one outcome per PR, review, patch, or wait for a human.
   - Reassess: a patch changes the PR, so the old review no longer applies.
   - Stop: after a few rounds, hand the PR to a person and leave it alone.
   - New vocabulary to land: a review belongs to a commit; state is read live, not remembered; three outcomes for every PR.
   - Who does what: the loop is plain code and does all four stages (list, decide, count, skip). The agent is called only
     for the chosen work, the stub review or the stub patch. On the diagrams violet is the loop's own code and green is an
     agent.
3. **See** (about 2 min). One stage slide, then one beat per capability. Each capability: concept, one line on why or
   prevents, two spoken examples _(illustration)_, what it takes to build, then "in our demo we use..." and "yours can be
   anything". Built live in beat 7.
   - **A1. Read every open PR's state from GitHub each tick.** Head commit, verdict comments, CI result, mergeability.
     `tasks.json` stays intent only, so a PR a person closed or pushed to is seen as it is. Build: one function that lists
     open PRs and returns their facts. Demo: GitHub's CLI. Yours: any API client.
   - **A2. Skip PRs that are not ready for review.** Drafts, and PRs the agent itself authored. Build: two conditions in
     the list function. First to become a walk-through if time is short.
   - **A8. The review leaves a verdict the loop can read.** The stub review posts a plain `APPROVED` or `FINDINGS` comment
     that names the head commit. A plain comment is the version that always works, because an author cannot formally
     approve its own PR; real approval is a review-lesson destination. Build: one line in the stub's output format.
4. **Decide** (about 3 min). One stage slide, then one beat per capability.
   - **A3. A review is needed when no verdict covers the current head commit.** The verdict names a commit; compare it with
     the PR's head. Without that key the loop reviews the same PR every tick, or never reviews a changed one.
   - **A4. A patch is needed when there are findings, red CI or a conflict.** Three checks on the facts from A1; the patch
     itself is a stub. The conflict trigger is the first to drop if time is short.
   - **A5. Otherwise, wait for a human.** Clean verdict on the current head, green CI, no conflict: nothing to do, the
     PR is ready for a person to merge. The default branch of the decision function; without it the loop keeps spending
     agent runs on finished PRs.
5. **Reassess and Stop** (about 2 min). One stage slide for each, one capability each.
   - **A6. A patch invalidates the old review: review again.** The patch pushes a new commit, so the earlier verdict no
     longer covers the head, and the next tick reviews. Review, patch, review. Nothing to build beyond A3 once the verdict
     carries the commit.
   - **A7. Cap the rounds, then flag a human and leave the PR alone.** A counter per PR and a marker the loop reads, such
     as a label or comment. Show 3 rounds as a choice, not a rule. A flagged PR that is still a candidate gets picked
     again on every tick.
6. **How the field differs** (about 4 min; slides). One slide group per capability, in the brief's ids. Say only what the
   cells say. Most of the six products are event-driven reviewers started by a push or a comment; none of the pages
   checked describe a loop that polls every open PR. Say it as "not documented", never "no product has one".
   - A1: Field: A1 (where PR state lives). A2: Field: A2 (drafts and its own PRs). A3: Field: A3 (when a review starts).
   - A4: Field: A4 (who fixes what; the reviewer and the fixer are usually separate surfaces).
   - A5: Field: A5. A6: Field: A6. A7: Field: A7 (round and attempt caps). A8: Field: A8 (whether the reviewer approves).
   - Capabilities with no column to compare: say so (Field: Not compared here), for example a loop that lists every open
     PR, a stored record of the reviewed commit, review-patch-review as one loop, and a plain-text verdict. Claim nothing
     about the field there.
   - Takeaway: the stages appear in different places and under different names across surfaces; ours is one way, not the
     standard. Do not claim any product cannot do something.
7. **DEMO: the factory teaches its loop to read PRs** (about 14 min). The live beat, do not trim. The factory built in
   lesson 1 is asked to extend its own loop past the open PR. Nothing is pre-queued in `factory/`, and no plan session
   queued this work; say that out loud on camera.
   - Ask, from the brief given in the lesson: each tick, list open PRs and read their state; decide review, patch or
     wait; a patch sends the PR back to review; after the round cap, flag a person and skip the PR.
   - Show the plan run on that request, then the loop picking the tasks. The three code beats are list and read the PRs
     (A1, A2), decide (A3 to A5, A8), and stop (A6, A7).
   - Build the two stub skills live, and say they are samples: the review posts `APPROVED` or `FINDINGS` on the head
     commit, and the patch makes a small change and pushes. Not canonical; real versions are later lessons.
   - Show the decision function on a few made-up PR facts _(illustration)_ before it touches a real PR.
   - A person reviews and merges the factory's own PR, as before.
8. **The run: patch, re-review, cap** (about 4 min). The new loop on open PRs prepared in the checklist.
   - One PR with no verdict gets a review and a `FINDINGS` verdict; the next tick patches it; the head moves; the tick
     after reviews the new head (review, patch, review).
   - One PR that keeps failing hits the round cap: the loop flags a person and then skips it.
   - One clean PR is left alone and shows as "waiting for a human" in the tick's summary.
   - The checklist plans the fallback if the reviewer cannot formally approve its own PR; the plain comment is why the
     demo still works.
9. **Names, and where factories take it** (about 2 min).
   - Names are not canonical: `review`, `patch` and the loop's decision are only this sample's names. Field: What other
     factories call it.
   - Destinations, described not prescribed, each with its owning lesson, order open, promising nothing (Field: Where it
     goes from here): review depth and real approval (review lesson); patch depth (patch lesson); merge, canary and promote
     (release lesson); claims, ordering and starvation across many workers (multi-agent coordination deep dive); the tick
     itself, cooldowns and per-PR skip counters (a later loop lesson); an author allowlist (governance lesson); a queue
     snapshot (feedback and maintenance lesson).
10. **Exercise** (about 1 min). The exercise lists outcomes only and names no required tool, language or runner. Hand off:
    your own loop, with an agent and language of your choice, gets the same behaviours. Close on the loop delta: the loop's
    work no longer ends at an open PR; a PR that reaches "reviewed clean, CI green, no conflict" is ready for a person
    to merge.
