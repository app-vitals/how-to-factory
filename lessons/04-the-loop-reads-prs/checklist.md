# Pre-filming checklist: Lesson 4, The loop reads PRs

> Copy of [lessons/_template/checklist.md](../_template/checklist.md) filled in for this lesson. Definition of done from [docs/lesson-playbook.md](../../docs/lesson-playbook.md). Tick every box before filming.

- [ ] Brief ([brief.md](brief.md)) agreed before work was queued
- [ ] Sketch reviewed by Dan before the script, README and deck: brief, one stage slide and one capability slide
- [ ] Brief capability table complete and grouped by stage: every capability has concept, why it exists or what it prevents, examples, and what it takes to build
- [ ] Brief has a "Reused from earlier lessons / New this time" section
- [ ] `bun test` passes
- [ ] `bun scripts/check-decks.ts` passes
- [ ] `bun scripts/check-landscape.ts` passes
- [ ] Forbidden-words grep is clean in the deck, script and run-of-show: "matrix", "options.md", "sourced", "not documented" (a blank reads "not in their docs")
- [ ] Every claim about another product has a first-party URL and an as-of date; dates re-checked (grid says "Checked 10/2026")
- [ ] All links resolve
- [ ] Factory map slide highlights the component taught (the loop)
- [ ] Slide count is in line with the lesson's capabilities (guidance, not a target) (28); same vendors in the same order on every comparison slide, plus a "This sample" row
- [ ] Demo run through once on a scratch repo (this lesson runs things on camera, so it is not build-only): the factory teaching its loop to read PRs, with the stub review and patch skills, a patch, a re-review and the round cap
- [ ] Nothing for the demo is pre-queued in `factory/`; the live beat is planned and built during the run
- [ ] Exercise run by following only its text; outcomes listed, no required tool
- [ ] Every changed slide rendered at 1920x1080; no wrapped rows, overflow or face-cam intrusion
- [ ] Differs slides (21-24) contain only marks and chips (no sentences)
- [ ] Open item in [run-of-show.md](run-of-show.md) settled: the DEMO slides' position (deck slides 6 to 8) against the script's live beat (beat 7)

## Demo run-through plan

This lesson's demo needs open PRs on GitHub to route. Settle all of this on the scratch repo before filming, and check
that nothing in it names a client or an internal host (the repo is public).

**Pre-staged on GitHub (before filming):**

- [ ] a scratch repo with CI that runs the repo's validate command, so each PR carries a real CI result (lesson 3)
- [ ] PR one: opened by a different account than the loop's, no verdict comment yet, with a small flaw the stub review can find
- [ ] PR two: opened by a different account, with a flaw the stub patch cannot fix (a test that always fails), so it reaches the round cap
- [ ] PR three: clean, green CI, no conflict, already carrying an `APPROVED` comment that names its current head commit
- [ ] one draft PR, to show the skip (A2)
- [ ] the "needs a person" marker (a label or comment) is created in the repo, and the round cap in the loop is set to the number shown on slide 18
- [ ] the loop's account and token can read PRs, post comments, push to the PR branches and set the marker; nothing beyond that
- [ ] a reset note for reusing the PRs: delete the verdict comments and the marker, and reset the head commits of PRs one and two, so a retake starts clean

**Built live on camera:**

- [ ] the plan run on the request, the loop picking the tasks, and the three code beats (list and read, decide, stop)
- [ ] the two stub skills, `review` and `patch`, called samples on camera
- [ ] the decision function shown on made-up PR facts _(illustration)_ before it touches a real PR
- [ ] the factory's own PR reviewed and merged by a person

**Self-review limitation and fallback.** The agent cannot formally approve a PR it authored, and a review from the account
that opened the PR is not a real review. The demo avoids the problem on purpose: the stub review posts a plain
`APPROVED` or `FINDINGS` comment that names the head commit, the demo PRs are opened by a different account than the loop's,
and the loop skips PRs its own account authored (A2).

- [ ] on the scratch repo, confirm the loop's account can post a plain comment on a PR it did not author, and that it cannot formally approve its own PR (so the script's claim is true on camera)
- [ ] confirm the loop skips a PR opened by its own account
- [ ] fallback if the stub reviewer misbehaves on camera (wrong verdict format, no commit named, or no comment at all): stop the take, post the intended `APPROVED` or `FINDINGS` comment on the PR by hand in the same format, and let the loop read it. Say plainly that the review is a stub and its quality is a later lesson
- [ ] fallback if the live build of the stubs runs long: show the prepared stubs from the scratch run and keep the decision function live, since that is the lesson
- [ ] fallback if a take loses the PR state (a PR closed or a head moved by mistake): use the reset note above, or switch to a spare set of PRs staged the same way
