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
| 2 | 5-6 | | 4 | Plan concept (inputs, steps, outputs), then the sourced "how the field differs" slide. Say "no sourced planning stage", never "has none" |
| 3 | 7 | DEMO write the plan skill | 4 | Write `factory/skills/plan/SKILL.md` on camera. Do not run it |
| 4 | 8 | | 4 | Todo list schema slide (a slide, not a demo): one entry's fields |
| 5 | 9-10 | | 5 | Dev-task concept, then how the field differs |
| 6 | 11 | DEMO write the dev-task skill | 5 | Write `factory/skills/dev-task/SKILL.md` on camera. Do not run it on a todo |
| 7 | 12-13 | | 6 | Loop concept, then how the field differs (what starts a run) |
| 8 | 14 | DEMO write the loop | 6 | Write `factory/loop.ts` on camera. Do not run it |
| 9 | 15 | | 7 | Why we loop: say it is our opinion, not a standard |
| 10 | 16 | | 8 | How it works together: our flow vs a human or event starting each session. Slide only |
| 11 | 17-18 | | 9 | Names table (sourced), then where factories take it. Say what is deliberately missing |
| 12 | 19 | | 10 | Exercise hand-off and next lesson (run it end to end) |
