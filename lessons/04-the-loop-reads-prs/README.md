# Lesson 4: The loop reads PRs

**Component taught:** [Coordination / loop](../../docs/components.md), at the boundary with the Work done band: what the loop does between "a PR is open" and "a PR is ready for a person to merge"
**Video:** _placeholder, link added when the lesson is published_ (playlist: [How to Build a Software Factory](https://www.youtube.com/playlist?list=PLEtnpY4_ARns))

`factory/` in this repo is our demo. This lesson teaches the concept; Bun and Claude Code are what the demo happens to
use, never what you need. Each part below goes concept first, then "in our demo we use...", then "yours can be
anything".

## Names for this

In this lesson the two skills the loop calls are `review` and `patch`, and both are small stubs built live to give the
loop something to run; they are samples, not canonical, and deeper review and patch lessons come later. Other factories
call the part that reviews a PR Devin Review, Droid Review, Copilot code review, Automated Code Review, Bugbot or Code
Review. Each term is sourced and dated in [options.md](options.md#what-other-factories-call-it). Call yours whatever you
like.

## The concept

A PR is not finished work. Lesson 1's loop picks a task, builds it, opens a PR and stops, and nothing looks at that PR
again. This lesson teaches the loop to look at every open PR each tick and choose one outcome for it: **review** it,
**patch** it, or leave it for a person. A review belongs to a commit, so a patch sends the PR back to review, and a round
cap stops a PR that will not converge and flags a person.

## What changes in the loop

Before, a person had to notice every verdict, red check and new push. After, the loop's work no longer ends at an open PR:
a PR that reaches "reviewed clean, CI green, no conflict" is ready for a person to merge. Merging stays with the person.

## The stages

Four stages, with a [brief](brief.md) that ranks each capability by expected, common and crucial.

- **See:** read every open PR's state from GitHub each tick (A1), skip drafts and the agent's own PRs (A2), and let the
  review leave a verdict the loop can read (A8).
- **Decide:** a review is needed when no verdict covers the current head commit (A3); a patch is needed when there are
  findings, red CI or a conflict (A4); otherwise wait for a human (A5).
- **Reassess:** a patch invalidates the old review, so review again (A6).
- **Stop:** cap the rounds, then flag a human and leave the PR alone (A7). The lesson shows 3 rounds as a choice, not a
  rule.

- **In our demo we use:** the existing factory's loop, extended live, plus two stub skills. Nothing is pre-queued in
  `factory/`; the factory is asked, plans it, and builds it during the run.
- **Yours can be anything:** any agent, any language, any scheduler, and any way of reading a PR's state.

## The live beat

The existing factory is asked to teach its own loop to read PRs, on camera. It plans the work, the loop picks the tasks,
and the factory builds the three code beats: list and read the PRs, decide, and stop. The review and patch stubs are
built live. The run then shows a patch, a re-review and the round cap.

## Build steps

Numbers match [script.md](script.md).

1. Opening: a PR is not finished work (beat 1).
2. Concept: the four stages (beat 2).
3. See: read every open PR, skip what is not ready, read the verdict (beat 3).
4. Decide: review, patch, or wait for a human (beat 4).
5. Reassess and Stop: review again after a patch, cap the rounds (beat 5).
6. How the field differs (beat 6).
7. Live: the factory teaches its loop to read PRs, and builds the review and patch stubs (beat 7).
8. The run: patch, re-review, cap (beat 8).
9. Names, and where factories take it (beat 9).
10. Exercise (beat 10).

## How the field does it

Details, sources and as-of dates live in [options.md](options.md); product-by-product cells live in the
[landscape matrix](../../landscape/README.md). Most of the six products surveyed are event-driven reviewers started by a
push or a comment; none of the pages checked describe a loop that polls every open PR. That is "not documented", never
"no product has one".

## Where factories take it

Described, not prescribed. Out of scope here, each owned by another lesson and named as a destination, never built: review
depth and real approval, patch depth, merge and release, many agents at once, scheduling the tick, an author allowlist and a
queue snapshot. Order stays open. See [options.md](options.md#where-it-goes-from-here).

## Files

- [brief.md](brief.md): the one-page lesson brief
- [script.md](script.md), [options.md](options.md)
- [deck/index.html](deck/index.html): the lesson deck
