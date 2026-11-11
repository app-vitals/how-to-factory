# Pre-filming checklist: Lesson 6, Review signal and convergence

> Copy of [lessons/_template/checklist.md](../_template/checklist.md) filled in for this lesson. Definition of done from [docs/lesson-playbook.md](../../docs/lesson-playbook.md). Tick every box before filming.

- [ ] Brief ([brief.md](brief.md)) agreed before work was queued
- [ ] No sketch gate for this lesson (removed on Dan's request, a deliberate departure from the usual recipe): Dan reviews the finished lesson and iterates
- [ ] Brief capability table complete and grouped by stage: every capability has concept, why it exists or what it prevents, examples, and what it takes to build
- [ ] Brief has a "Reused from earlier lessons / New this time" section
- [ ] `bun test` passes
- [ ] `bun scripts/check-decks.ts` passes
- [ ] `bun scripts/check-landscape.ts` passes
- [ ] `bun run pre-public` passes (banned internal names, paths and hosts, plus the full-history gitleaks scan)
- [ ] Forbidden-words grep is clean in the deck, script and run-of-show: "matrix", "options.md", "sourced", "not documented" (a blank reads "not in their docs")
- [ ] Every claim about another product has a first-party URL and an as-of date; dates re-checked (review-quality cells say 2026-11-11, patch and round-cap cells say 2026-10-28)
- [ ] Every figure from the article is "one team reported", appears in the options file's "One team's numbers (the hook)" section, and no slide carries more than one convergence figure
- [ ] All links resolve
- [ ] Factory map slide highlights the component taught (Review, with Patch as the second act)
- [ ] Slide count is in line with the lesson's capabilities (guidance, not a target) (33); same vendors in the same order on every comparison slide, plus a "This sample" row
- [ ] Demo run through once on a scratch repo (see the dry run below; this lesson runs things on camera, so it is not build-only)
- [ ] Nothing for the demo is pre-queued in `factory/`; the live beats are planned and built during the run
- [ ] Exercise run by following only its text; outcomes listed, no required tool
- [ ] Every changed slide rendered at 1920x1080; no wrapped rows, overflow or face-cam intrusion
- [ ] Differs slides (22-26) contain only marks and chips (no sentences)
- [ ] Open item in [run-of-show.md](run-of-show.md) settled: the DEMO slides' positions (deck slides 12, 19 and 21) against the script's order (beats 6 to 8 after the field comparison)
- [ ] Lesson 5 is not yet marked taught anywhere, and the video link in the README stays a placeholder until publishing

## Pre-filming dry run (playbook section 5)

Run the whole lesson's demo once yourself, start to finish, on a scratch repo, before the real take. The point is to learn
what the factory plans and builds, what the gate does on a bad label, where the no-progress check lands and what the
staged PRs look like, so nothing on camera is a surprise. Delete or keep the scratch repo private afterwards; check that
nothing in it names a client or an internal host, since this repo is public.

- [ ] a fresh scratch repo (not the course repo) with a copy of the factory as it stands after lesson 5, the stub review and stub patch still in place, and CI that runs the repo's validate command
- [ ] a rules file in the scratch repo (any name) with at least two rules: one the review should enforce and one that endorses a pattern a generic review would flag
- [ ] ask the factory, in the words you will use on camera, to replace the stub review (beat 6) and note the plan, the grade scale and threshold it picks, and how long the live build takes
- [ ] ask it to replace the stub patch (beat 7) and note the same; time both against the 9 and 8 minute budgets
- [ ] show the grade filter and verdict function on the made-up findings you will use on camera, including a mismatched label that the gate refuses
- [ ] run the loop over the staged PRs below and watch each outcome land; note any PR that did not behave and fix the staging
- [ ] run the exercise from its text alone on the same repo, to confirm every outcome can be checked
- [ ] write down the factory's own PRs for the two builds and confirm a person (not the loop) reviews and merges them

## Demo PR setup

The run (beat 8) needs real PRs on GitHub that exercise each outcome. Settle all of this on the scratch repo before
filming, and check that nothing in it names a client or an internal host.

**Pre-staged on GitHub (before filming):**

- [ ] the loop's account and token can read PRs, comment, push to PR branches, rerun workflow runs and set the marker; nothing beyond that
- [ ] the "needs a person" marker (a label or comment) exists in the repo, and the round cap in the loop is set to the number shown in the deck (3)
- [ ] PR one, **a false positive**: opened by a different account than the loop's, a change where a generic review will flag a guard, null check or fallback that the next function depends on (the review raises a finding the patch should reject). Confirm the review actually raises it on the scratch run; if it does not, change the change until it does
- [ ] PR two, **a pre-existing finding**: opened by a different account, a change that moves or reformats a long-standing function with an obvious smell the PR did not introduce, so the base-branch filter has something to drop. The PR also carries one real finding on a line it did change, so the review still has something to post
- [ ] PR three, **a cancelled CI run**: opened by a different account, green on its code, with the latest CI run cancelled (cancel it by hand, or use a workflow concurrency setting), so the patch reruns it instead of editing
- [ ] PR four, **a PR that will not converge**: opened by a different account, with a flaky or always-failing check the patch cannot fix (a test that fails on every second run, or a check that always fails), so round two changes nothing and the no-progress check fires well before the cap of 3
- [ ] PR five, **a base-red PR**: the scratch repo's base branch has a failing check that predates the PR; the PR's own change is fine. The patch should flag a person and leave the PR's files alone. Because this breaks the base branch, do it on the scratch repo only and fix it again afterwards
- [ ] a clean PR for contrast, green CI, no findings: its review posts the clean verdict and the PR is left for a person
- [ ] a reset note for reusing the PRs: delete the review and rebuttal comments, the settled records and the marker, resolve or reopen the threads, restore the head commits of PRs one to four, re-cancel the run on PR three and re-break the base for PR five, so a retake starts clean
- [ ] a spare set of PRs staged the same way, in case a take loses the state (a PR closed or a head moved by mistake)

**Built live on camera:**

- [ ] the plan run on each request, the loop picking the tasks, and the code beats (review: grade, rules and location, base filter, verdict gate, re-review; patch: verify-then-fix, reject path, base-red check, no-progress check)
- [ ] the grade filter and the verdict function shown on made-up findings _(illustration)_ before they touch a real PR
- [ ] the wrong-finding decision shown on a made-up example _(illustration)_ before it touches a real PR
- [ ] the factory's own PRs reviewed and merged by a person

**Self-review limitation and fallback.** The agent cannot formally approve a PR it authored, and a review from the account
that opened the PR is not a real review. The demo avoids the problem on purpose: the review posts a plain comment that
names the head commit, the demo PRs are opened by a different account than the loop's, and the verdict gate never asks for
changes on its own author's PR. Real approval and merge belong to the release lesson.

- [ ] on the scratch repo, confirm the loop's account can post a plain comment on a PR it did not author, and that it cannot formally approve (or request changes on) its own PR, so the script's claim is true on camera
- [ ] confirm the loop skips a PR opened by its own account, and that the factory's own PRs are opened by the loop's account and so are reviewed by a person
- [ ] fallback if the reviewer on camera cannot formally approve a PR (the platform refuses the approval or the account is the author): do not fight it. Say the verdict is a plain comment on purpose, show the comment naming the head commit, and move on; the gate and the label are the lesson, not the platform's approve button
- [ ] fallback if a second reviewer account is available: have it post the formal approval by hand on one clean PR to show what real approval looks like, and say plainly that an agent's approval never counts as a person's, which is a destination (the release lesson)
- [ ] fallback if the reviewer misbehaves on camera (wrong format, no commit named, no comment, a false positive that does not appear): stop the take, post the intended comment on the PR by hand in the same format, and let the loop read it. Say plainly that the review is the sample being built
- [ ] fallback if the patch does not reject the wrong finding on camera: stop the take, restore the PR with the reset note, and rerun; if it still accepts, show the prepared rejection from the dry run and keep the gate and the no-progress check live
- [ ] fallback if the live builds run long: show the prepared build from the dry run for the base-branch filter and the rerun first, then the verifier (a walk-through already), in that order; never the grade-and-gate beat, the verify-then-fix step, the reject path or the no-progress check
- [ ] fallback if a take loses the PR state: use the reset note above, or switch to the spare set of PRs
