# Pre-filming checklist: Lesson 5, See what the factory is doing

> Copy of [lessons/_template/checklist.md](../_template/checklist.md) filled in for this lesson. Definition of done from [docs/lesson-playbook.md](../../docs/lesson-playbook.md) (section 8). Tick every box before filming.

- [ ] Brief ([brief.md](brief.md)) agreed before work was queued
- [ ] Sketch reviewed by Dan before the script, README and deck: brief, one stage slide and one capability slide
- [ ] Brief capability table complete and grouped by stage: every capability has concept, why it exists or what it prevents, examples, and what it takes to build
- [ ] Brief has a "Reused from earlier lessons / New this time" section
- [ ] `bun test` passes
- [ ] `bun scripts/check-decks.ts` passes
- [ ] `bun scripts/check-landscape.ts` passes
- [ ] `bun run pre-public` passes (banned internal names, paths and hosts, plus a full-history gitleaks scan); nothing in the lesson names a client or internal infrastructure
- [ ] Forbidden-words grep is clean in the deck, script and run-of-show: "matrix", "options.md", "sourced", "not documented" (a blank reads "not in their docs")
- [ ] Every claim about another product has a first-party URL and an as-of date; dates re-checked (grid says 2026-10-30)
- [ ] All links resolve (the lesson 4 video URL stays a placeholder until Dan supplies it)
- [ ] Factory map slide highlights the component taught (observability / ops)
- [ ] Slide count is in line with the lesson's capabilities (guidance, not a target) (28); same vendors in the same order on every comparison slide, plus a "This sample" row
- [ ] Demo run through once on a scratch repo (this lesson runs things on camera, so it is not build-only): the factory writing the run record, the reasons and the three pages, then the three questions and the Completed page
- [ ] Nothing for the demo is pre-queued in `factory/`; the live beat is planned and built during the run
- [ ] Exercise run by following only its text; outcomes listed, no required tool
- [ ] Every changed slide rendered at 1920x1080; no wrapped rows, overflow or face-cam intrusion
- [ ] Differs slides (23-24) contain only marks and chips (no sentences)
- [ ] Open item in [run-of-show.md](run-of-show.md) settled: the DEMO slides' position (deck slides 6, 10, 13, 16 and 20) and the field comparison's position against the script's beat order

## Demo run-through plan

This lesson's demo needs the lesson's own tasks and PRs to flow through the view, plus staged data for the three
questions. The full plan is the "Demo data plan" in [run-of-show.md](run-of-show.md). Settle all of this on the scratch
repo before filming, and check that nothing in it names a client or an internal host (the repo is public).

**Pre-staged (before filming):**

- [ ] a scratch repo with CI (lesson 3) and the lesson 4 loop already working on it
- [ ] one ready task with no PR yet (question 1: no PR)
- [ ] one PR from a different account with no verdict on its head commit (question 2: no review)
- [ ] one PR with findings that has not been patched (question 3: no patch)
- [ ] one PR already flagged after the round cap, so "waiting: round cap reached" has a row
- [ ] one draft PR, one finished task with a merged PR, so the Log has a skip and Completed has older history
- [ ] a reset note for reusing the data: restore the task file, delete the run record, remove verdict comments and the marker, reset head commits
- [ ] the loop's account and token can read PRs, post comments, push to the PR branches and set the marker; nothing beyond that
- [ ] the server binds to the local machine only, and no token or private URL appears on any page that is on camera

**Lesson 4 hand-off check (before the live beat):**

- [ ] the lesson 4 loop runs one tick on the staged data and routes each PR to review, patch or a person
- [ ] a PR flagged after the round cap is skipped, and its state is readable by the new reason function without changing lesson 4's code
- [ ] `tasks.json` still holds intent only; the new record is a separate file

**Built live on camera:**

- [ ] the plan run on the request, the loop picking the tasks, and the code beats (run record, reasons, server with the Queue, Log and Completed pages, link helper)
- [ ] the reason function shown on made-up items _(illustration)_ before the server exists
- [ ] the loop left ticking on a repeating schedule from the moment the writer lands, so the Log fills
- [ ] the Queue page open in a browser tab during the build, with the lesson's own tasks and PRs visible in it
- [ ] the factory's own PRs reviewed and merged by a person
- [ ] the Completed page at the end shows every task of the lesson with its PR, and is still full after a server restart

**Fallbacks:**

- [ ] if the outcome filter runs long: show the prepared filter as a walk-through and keep the reason strings live
- [ ] if the live build of the server runs long: show the prepared pages from the scratch run and keep the reason function live, since the reasons are the lesson
- [ ] if the Log is thin because the loop was not ticking early enough: say plainly that the record starts when the writer lands, and use the pre-recorded ticks from the scratch run for the filter
- [ ] if a take loses the staged state: use the reset note, or switch to a spare set staged the same way
