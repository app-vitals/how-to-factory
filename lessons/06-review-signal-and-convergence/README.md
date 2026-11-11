# Lesson 6: Review signal and convergence

**Component taught:** [Review](../../docs/components.md) (section 5, in the Work done band), with Patch as the second act that answers a review: what makes a review worth reading, and how the loop converges
**Video:** _placeholder, link added when the lesson is published_ (playlist: [How to Build a Software Factory](https://www.youtube.com/playlist?list=PLEtnpY4_ARns))

`factory/` in this repo is our demo. This lesson teaches the concept; Bun and Claude Code are what the demo happens to
use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

In this lesson the parts are a review gate, a verdict gate and a settled record; they are this sample's names, not
canonical. Other factories call the grade on a finding a Severe / Non-severe label, P0 to P3, a severity label, priority
labels, a severity field or severity markers, and the repo file the reviewer reads REVIEW.md, review-guidelines, custom
instructions, a repo review skill or BUGBOT.md. Each term is cited and dated in
[options.md](options.md#what-other-factories-call-it). Call yours whatever you like.

## The concept

A review is worth its signal-to-noise, and the loop needs a way to converge. Lesson 4's stub review flags anything it can
point to, so it cannot tell a real bug from noise, and its stub patch obeys every finding, so a wrong finding becomes wrong
code and the loop argues with itself. That is cheap while a person reads every comment; with an agent reading them, the cost
is rounds. This lesson replaces both stubs. The review grades each finding and posts only the ones worth acting on, and its
verdict follows from them. The patch checks each finding before it edits, and can reject a wrong one with a record. A round
that changes nothing stops the loop.

## What changes in the loop

Before, the stubs flagged anything and obeyed everything, and only the round cap ended the argument. After, the review is
worth reading, the patch checks before it obeys, a wrong finding ends the loop instead of feeding it, and a round that
changes nothing stops the loop and flags a person. Merging stays with the person.

## The stages

Four stages, with a [brief](brief.md) that ranks each capability by expected, common and crucial.

- **Review:** grade each finding, post only above a threshold and cap the count (A1); drop findings on code the PR did not
  change (A2); judge against the repo's own rules with file and line evidence (A3); compute the verdict from the findings
  and gate the label (A4); a fresh-context verifier drops what it can disprove, shown as a walk-through (A5).
- **Re-review:** read only the new diff, do not repost, and say what became of each earlier finding (A6).
- **Patch:** verify each finding before touching code, accept, modify or reject (A7); answer a wrong finding with a
  rebuttal and a settled record (A8); triage red CI, base branch first (A9).
- **Converge:** a same-state no-progress check next to the round cap (A10). The lesson shows 3 rounds as a choice, not a
  rule.

- **In our demo we use:** the existing factory's loop, extended live: a real review and a real patch replacing the lesson 4
  stubs. Nothing is pre-queued in `factory/`; the factory is asked, plans it, and builds it during the run.
- **Yours can be anything:** any agent, any language, any scale for the grade, any rules file, and any way of recording a
  settled finding.

## The live beat

The existing factory is asked to replace its stub review and stub patch, on camera. The live build of the review gate and
the patch reject path is the do-not-trim block: the review gate first, then the patch, verify then reject. The run then
shows a wrong finding ending the loop, and the no-progress check stopping a PR. The verifier is a walk-through, not a build.

## Build steps

Numbers match [script.md](script.md).

1. Opening: the review nobody reads (beat 1).
2. Concept: signal-to-noise, and converging (beat 2).
3. Review and re-review: grade, filter, judge, verdict, verify, re-review (beat 3).
4. Patch and converge: verify, reject, triage, no progress (beat 4).
5. How the field differs (beat 5).
6. Live: the review gate (beat 6).
7. Live: the patch, verify then reject (beat 7).
8. The run: a wrong finding ends the loop, then no progress (beat 8).
9. Names, and where factories take it (beat 9).
10. Exercise (beat 10).

## How the field does it

Details, sources and as-of dates live in [options.md](options.md); product-by-product cells live in the
[landscape comparison](../../landscape/README.md). Five of the six products surveyed show a severity-style grade, none
documents a visible confidence score, and a numeric cap on rounds is documented by one. That is "not in their docs", never
"no product has one". One team's article is the hook, taken only as that team's own report on its own PRs.

## Where factories take it

Described, not prescribed. Out of scope here, each owned by another lesson and named as a destination, never built: several
reviewers voting, an incident eval set and noise metrics, risk-tiered and real approval and merge, an author allowlist and
staged versus auto-post, claims across many workers, second-round escalation and a post-push CI check, a same-reason skip
streak, and writing a good guidance file. Order stays open. See [options.md](options.md#where-it-goes-from-here).

## Files

- [brief.md](brief.md): the one-page lesson brief
- [script.md](script.md), [options.md](options.md)
- [exercise.md](exercise.md): the exercise, outcomes only
- [deck/index.html](deck/index.html): the lesson deck
