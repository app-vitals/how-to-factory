# Script (outline): Review signal and convergence

Outline only. Each beat below is a heading, its job, and the points to hit; the words are written in a later pass. Same
format as the [lesson 4 script](../04-the-loop-reads-prs/script.md): narrated by Dan over the slides (face cam in a screen
corner), slides carry labels, this file carries the words. Beat numbers match the build steps in the [README](README.md).

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beats is pre-queued in `factory/`: the factory
is asked, plans it, and replaces its own stub review and stub patch during the run. Say that out loud on camera.

Samples, not canon: the review gate, verdict gate, settled record and the 3-round cap are this sample's names and numbers.
The thresholds in the live build (a confidence bar, a count cap) are shown as choices, not rules. Say so once, early.

Reuse, one sentence each, no re-teaching. Lesson 6 starts where the lesson 4 stubs stop. Say "lesson 4 gave the loop its
three outcomes per PR, a verdict tied to a head commit, review-patch-review and a round cap" once in beat 1 and move on. Say
"lesson 3 taught that a check is only as strong as its independence from the builder" once, in the verifier walk-through
(A5). Say "lesson 4 already covered why a reviewer on the author's own login posts a plain comment, not a formal approval"
once, at the verdict gate (A4). Say "lesson 5's Log shows these new states as reasons" once, in beat 8. Do not explain the
router, the per-commit verdict, the flag, the evidence table or the fresh-context idea again.

Field claims: every claim about another product names the section of this lesson's [options file](options.md) it comes
from, in the form "Field: <section name>". That section holds the first-party URL and the as-of date (review-quality cells
2026-11-11; the patch and round-cap cells, A7, A9 and A10, 2026-10-28, because they come from the lesson 4 routing grid).
Say only what the cell says; "not in their docs" means the pages checked do not say, never that the product lacks it. Name
the surface when you name the product (a reviewer, a fixer and an approver are usually separate).

The article: one team's article is the hook and the destinations source. Every figure is "one team reported", it is that
team's own internal PRs, with no dates or sample sizes, and it is not a benchmark or a claim about any other product. The
article's cap of 3 rounds is that team's rule, not ours. At most one convergence figure on a slide. Use only the figures in
the options file's "One team's numbers (the hook)" section.

Examples marked _(illustration)_ are constructed for the lesson and are not a claim about any product. Say so each time.

Ids: the A-numbers are stable ids from the [brief](brief.md), not the order. Capabilities are walked by stage: Review,
Re-review, Patch, Converge.

## Running time

Estimates for the finished video, narration plus the demo. The live builds are the variable part.

| Part | Beat | Estimate |
|---|---|---|
| Opening: the review nobody reads | 1 | 3 min |
| Concept: signal-to-noise, and converging | 2 | 2 min |
| Review and re-review: A1 to A6 | 3 | 3 min |
| Patch and converge: A7 to A10 | 4 | 2 min |
| How the field differs | 5 | 4 min |
| **Live: the review gate (do not trim)** | 6 | 9 min |
| **Live: the patch, verify then reject (do not trim)** | 7 | 8 min |
| The run: a wrong finding ends the loop, then no progress | 8 | 5 min |
| Names, and where factories take it | 9 | 1 min |
| Exercise | 10 | 1 min |
| **Total** | | **about 38 min** |

Beats 6 and 7 together are the live build of the review gate and the patch reject path. They are one do-not-trim block of
17 minutes.

Trim order if the cut runs long, first to last (never from beats 6 and 7):

1. A5 (the verifier) is a walk-through by design, never built; in beat 3 it shrinks to one line and in beat 6 it is shown
   on one made-up example _(illustration)_ or dropped.
2. The cancelled-run rerun half of A9 drops from the live patch build; say it is one more call beside the base-red check.
3. The base-branch filter (A2) moves from built live to a walk-through in beat 6, and shrinks to one line in beat 3.
4. Beat 5 keeps only A4, A6, A7, A8 and A10 (the capabilities rated crucial high); the rest become one closing slide.
5. Beat 9 shrinks to one slide.

**Do not trim beats 6 and 7**, the live review gate and patch reject path. The verify-then-fix step (A7), the reject path
(A8) and the no-progress check (A10) never move to a walk-through. If time is still short, cut beat 8 down to the
wrong-finding run alone, never beats 6 and 7.

## Beats

1. **Opening: the review nobody reads** (about 3 min).
   - Hand-off from lessons 3 to 5, one sentence: the loop reviews and patches every open PR, stops after a round cap, and
     shows its reasons in the Log. It works, but the stub review flags anything it can point to and the stub patch obeys
     every finding. That is cheap while a person reads every comment; with an agent reading them, the cost is rounds.
   - The hook, as "one team reported" and not a benchmark: substantive review comments on its internal PRs went from 16% to
     54% once review ran on every PR; and one CLI PR went through more than 50 rounds of review and fixes overnight until
     its author stopped it. Say the caveats out loud: its own PRs, no dates, no sample sizes.
   - The one idea: a review is worth its signal-to-noise, and the loop needs a way to converge.
   - Where this sits: Review, in the Work done band, with Patch as the second act that answers it (show the factory map,
     component highlighted).
   - Say what is left for later up front: several reviewers voting, scoring a reviewer against past incidents, tiered human
     approval and real merge are named in beat 9, not taught.
2. **Concept: signal-to-noise, and converging** (about 2 min). Tool-neutral.
   - Signal-to-noise: a review comment is worth reading only if it is real, on the PR's own change, backed by a location
     and judged against what this repo chose. Everything else is noise, and an agent that reads noise acts on it.
   - Converging: a loop converges when each round leaves the PR settled, changed or escalated. A round that changes nothing
     repeats until the cap.
   - New vocabulary to land: a grade (severity and confidence), a threshold, a verdict computed from the findings, accept
     modify or reject, a settled record, a no-progress check.
   - Who does what: the review and the patch are agents; the grade filter, the verdict function, the gate, the settled
     record and the no-progress check are plain code. A wrong label or a repeated finding is stopped by code, not by a
     better prompt. On the diagrams violet is the loop's own code and green is an agent.
3. **Review and re-review: A1 to A6** (about 3 min). One stage slide for Review, one for Re-review, then one beat per
   capability. Each capability: concept, one line on why or prevents, two spoken examples _(illustration)_, what it takes to
   build, then "in our demo we use..." and "yours can be anything". Built live in beat 6.
   - **A1. Grade each finding, post only above a threshold, cap the count.** Without a bar the real bug is buried among
     nits (14 comments, the ninth matters). Build: a grade on each finding, a threshold, a count cap. Show the numbers as
     choices. Demo: a number from 0 to 100 and a count of five _(illustration)_. Yours: any scale, any bar.
   - **A2. Drop findings whose code is already on the base branch.** The author is asked to fix what they did not write, and
     a loop re-finds old code every round. One team reported about 59% of what its reviewer kept flagging was old code. Build:
     compare a finding's line to the PR's changed lines. Third to move to a walk-through.
   - **A3. Judge against the repo's own rules, with file and line evidence.** The review reads the rules file, cites a file
     and line on every finding, and does not flag what the rules endorse. A finding with no line is dropped as unverifiable.
     Build: one rules file read into the prompt, a location required per finding. Demo: the repo's own instructions file.
     Yours: any rules file, any name.
   - **A4. A mechanical verdict plus a gate, so the label cannot disagree with the review.** A script computes the verdict
     from the surviving findings; the gate refuses to post a label that contradicts them. A review that says "looks good"
     under a CHANGES label sends the patch after nothing. One sentence back to lesson 4 on the author's own login and the
     plain comment. Build: a pure function and one check before posting.
   - **A5. A fresh-context verifier drops findings it can disprove.** Walk-through only, kept on design, first to trim. One
     sentence back to lesson 3: independence of the check, applied to the reviewer. Build: a second prompt with the finding
     and the code, not the first agent's reasoning.
   - **A6. A diff-only re-review that does not repost findings and attests per earlier finding.** After a patch the review
     reads only the new diff and says, for each earlier finding, fixed, rejected or still there. The attestation is what
     lets the loop tell fixed from forgotten. Build: pass the earlier findings and the new diff into the review.
4. **Patch and converge: A7 to A10** (about 2 min). One stage slide each for Patch and Converge, one capability each.
   Built live in beat 7.
   - **A7. Verify each finding before touching code: accept, modify or reject.** A wrong finding otherwise becomes wrong code.
     Modify: the finding names a line but the bug is a class, so every instance is fixed (one team reported this). Build: a
     step before the edit that records accept, modify or reject.
   - **A8. The reject path: a rebuttal plus a settled record.** A rejected finding gets a short reasoned reply and a record
     the review and the gate read, including resolving its thread. Without it the review re-raises the wrong finding until
     the round cap.
   - **A9. CI triage: check whether the base branch is red too; rerun a cancelled run first.** Main is red and the patch
     "fixes" the PR's tests to match _(illustration)_. If the base is red, flag a person instead of editing. Rerun is the
     cheap safe action. Lesson 3's rule, never weaken a test to get green, is one sentence and not re-taught.
   - **A10. A same-state no-progress check next to the round cap.** Compare the PR's head commit, open findings and CI result
     before and after a round; if unchanged, stop and flag a person at once. The lesson 4 cap of 3 stays as the backstop and
     the same flag is reused. Say plainly that our cap of 3 is a lesson-scale choice and the article's cap is that team's
     rule.
5. **How the field differs** (about 4 min; slides). One slide group per capability, in the brief's ids. Say only what the
   cells say. Name the surface each time.
   - A1: Field: A1 (grade, threshold or cap). No shown surface documents a visible confidence score or a numeric comment cap;
     a repo-written cap or a content bar is what exists.
   - A2: Field: A2 (problems that predate the PR). A3: Field: A3 (repo guidance, evidence). A4: Field: A4 (states a verdict
     or approves). A5: Field: A5. A6: Field: A6. A7: Field: A7. A8: Field: A8 (a person dismisses or teaches). A9: Field: A9.
     A10: Field: A10 (limits on rounds; one of six documents a numeric cap).
   - Capabilities with no column to compare: say so (Field: Not compared here), for example a verdict computed by script, an
     attestation per finding, a check before acting, a fixer's rebuttal and settled record, red-CI triage and a same-state
     check. Claim nothing about the field there.
   - Takeaway: the field mostly grades and filters on the review side; the fix-back side and the stop condition are
     where the docs are thinnest, and that is a statement about the pages checked, not about what a product can do.
6. **DEMO: the review gate** (about 9 min). **DO-NOT-TRIM.** The live beat. The factory built in lesson 1 and extended in
   lessons 4 and 5 is asked to replace its stub review. Nothing is pre-queued in `factory/`, and no plan session queued this
   work; say that out loud on camera.
   - Ask, from the brief given in the lesson: the review reads the diff and the repo's rules file and lists candidate
     findings with file and line; each gets a severity and a confidence; those below a threshold are dropped and the rest
     capped; findings on code the PR did not change are dropped; a script computes the verdict from the survivors and a gate
     refuses a label that disagrees; the re-review reads only the new diff and attests per earlier finding.
   - Show the plan run on that request, then the loop picking the tasks. The code beats, in order: grade, threshold and cap
     (A1); location required and rules file read (A3); base-branch filter (A2); verdict function and gate (A4); re-review
     with an attestation (A6).
   - Show the grade filter and the verdict function on made-up findings _(illustration)_ before they touch a real PR,
     including a mismatched label that the gate refuses.
   - The verifier (A5) is a walk-through on one made-up finding _(illustration)_: it finds the null check the review missed
     and drops the finding. Not built.
   - A person reviews and merges the factory's own PR, as before.
7. **DEMO: the patch, verify then reject** (about 8 min). **DO-NOT-TRIM.** The same session, the same rules: nothing
   pre-queued.
   - Ask, from the brief given in the lesson: for each finding the patch decides accept, modify or reject before editing; a
     rejected finding gets a rebuttal comment and a settled record the review and the gate read; on red CI the patch checks
     whether the base branch is red too and flags a person if so, and reruns a cancelled run; a round that changes nothing
     stops the loop and flags a person, with the lesson 4 cap behind it.
   - Code beats, in order: verify-then-fix and the three outcomes (A7); the reject path, rebuttal plus settled record (A8);
     the base-red check, then the rerun (A9); the same-state comparison and the flag (A10).
   - Show the decision on a made-up finding that is wrong _(illustration)_: the review says to remove a guard the next
     function depends on; the patch reads the caller and rejects. Then show the same-state check on two made-up snapshots.
   - Keep the verify-then-fix step, the reject path and the no-progress check on camera and built. If short, the rerun is
     said, not built.
   - A person reviews and merges the factory's own PR, as before.
8. **The run: a wrong finding ends the loop, then no progress** (about 5 min). The new review and patch on open PRs
   prepared in the checklist.
   - One PR carries a wrong finding the review raises. The patch rejects it with a rebuttal and a settled record, the next
     review does not raise it again, and the loop ends there. Contrast with the stubs, where only the round cap ended it.
   - One PR with a flaky red check: the second round changes nothing, so the loop flags a person at once, well before the
     round cap. One convergence figure here if wanted, as "one team reported PRs needing five or more rounds fell from 8.9%
     to 1.5% after its convergence work", not on the same slide as another figure.
   - Lesson 5's Log shows the new states, finding dropped, finding rejected and no progress, as reasons. One sentence.
   - The checklist plans the fallback if the reviewer cannot formally approve its own PR; the plain comment is why the demo
     still works.
9. **Names, and where factories take it** (about 1 min).
   - Names are not canonical: review gate, verdict gate and settled record are only this sample's names. Field: What other
     factories call it.
   - Destinations, described not prescribed, each with its owning lesson, order open, promising nothing (Field: Where it goes
     from here): several reviewers voting (a later review deep dive); an incident-based eval set and noise metrics (the
     feedback and maintenance lesson); risk-tiered human approval and real approval and merge, an agent's approval never
     counting as a person's (the release lesson); an author allowlist and staged versus auto-post (the governance lesson);
     claims and a head-moved check across many workers (the multi-agent coordination deep dive); second-round
     disagreement escalation and a post-push CI check (a later patch deep dive); a same-reason skip streak (a later loop
     lesson); writing a good guidance file (the instructions and standards lesson).
10. **Exercise** (about 1 min). The exercise lists outcomes only and names no required tool, language or runner. Hand off:
    your own review and patch, with an agent and language of your choice, get the same behaviours. Close on the loop delta:
    the review is now worth reading, the patch checks before it obeys, a wrong finding ends the loop instead of feeding it,
    and a round that changes nothing stops the loop.
