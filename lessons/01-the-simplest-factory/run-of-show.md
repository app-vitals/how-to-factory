# Run of show: Lesson 1, The simplest factory

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html). Every demo beat names the [script.md](script.md) step it performs. Every demo is
build-only: write the skill or the loop on camera, run nothing.

**Pre-filming:** run the plan skill, the dev-task skill and the loop end to end once on a scratch repo, so you know
they work and what they produce. Re-check the as-of dates in [options.md](options.md). Do not run any of it on camera;
the end-to-end run is lesson 2.

| # | Slides | Demo beat | Script step | Notes |
|---|---|---|---|---|
| 1 | 1-4 | | 1-3 | Title, factory map (plan, dev-task and loop glow), what the human does, what we build. Say `factory/` is our demo, not the standard |
| 2 | 5-6 | | 4 | Plan concept (inputs, steps, outputs), then "how the field differs". Say "no planning stage found", never "has none" |
| 3 | 7-8 | | 4 | Task-card slide (title, description, acceptance criteria, depends on; size is one PR each), then why each part. Say dependencies are our choice, not the field's. Slides, not a demo |
| 4 | 9 | DEMO write the plan skill | 4 | Write `factory/skills/plan/SKILL.md` on camera. Do not run it |
| 5 | 10-11 | | 5 | Dev-task concept (claim, code, verify, deliver, record; the PR opens only after verification passes), then how the field differs |
| 6 | 12 | DEMO write the dev-task skill | 5 | Write `factory/skills/dev-task/SKILL.md` on camera. Do not run it on a task |
| 7 | 13-14 | | 6 | Loop concept (introduces status: pending, in_progress, pr_open as the queue's state), then how the field differs (what starts a run) |
| 8 | 15 | DEMO write the loop | 6 | Write `factory/loop.ts` on camera. Do not run it |
| 9 | 16 | | 7 | Why we loop: say it is our opinion, not a standard |
| 10 | 17 | | 8 | How it works together: our flow vs a human or event starting each session. Slide only |
| 11 | 18-19 | | 9 | Names table, then where factories take it. Say what is deliberately missing |
| 12 | 20 | | 10 | Exercise hand-off and next lesson (run it end to end) |
