# Pre-filming checklist: Lesson 3, Done means checked

> Copy of [lessons/_template/checklist.md](../_template/checklist.md) filled in for this lesson. Definition of done from [docs/lesson-playbook.md](../../docs/lesson-playbook.md). Tick every box before filming.

- [x] Brief ([brief.md](brief.md)) agreed before work was queued
- [x] Sketch reviewed by Dan before the script, README and deck: brief, one stage slide and one capability slide (PR 246 merged before the review; Dan's decisions on its five open questions were recorded on 2026-10-29 and applied in a follow-up)
- [x] Brief capability table complete and grouped by stage: every capability has concept, why it exists or what it prevents, examples, and what it takes to build
- [x] Brief has a "Reused from earlier lessons / New this time" section
- [ ] `bun test` passes
- [ ] `bun scripts/check-decks.ts` passes
- [ ] `bun scripts/check-landscape.ts` passes
- [ ] Forbidden-words grep is clean in the deck, script and run-of-show: "matrix", "options.md", "sourced", "not documented" (a blank reads "not in their docs"). Links to the field file by filename in the script and run-of-show are fine; the deck's viewer-facing text must not contain them
- [ ] Every claim about another product has a first-party URL and an as-of date; dates re-checked (grid says "Checked 10/2026")
- [ ] Every research number on a slide or in the script carries its source and confidence ([research notes](../../planning/lesson3-validation-depth/research.md)); SpecBench (27 vs 28 points) and SWE-Mutation definitions re-checked just before filming; no "42% fewer defects" anywhere
- [ ] The results slide (20) says plainly that the four built capabilities were not measured, and nothing in the deck, script or description claims they improve output
- [ ] All links resolve
- [ ] Factory map slide highlights the component taught (verification)
- [ ] Slide count is in line with the lesson's capabilities (guidance, not a target) (26); same vendors in the same order on both field slides, plus a "This sample" row; field slides cut to two
- [ ] All four prompts in [demo/prompts](demo/prompts/README.md) run in order on a scratch repo: each diff is small and confined to the skill's steps and rules; the induced failure (upgrade 2), the loosened-test temptation (upgrade 3) and the missing criterion (upgrade 4) behave as the script says
- [ ] Nothing for the demos is pre-queued in `factory/`; each live upgrade is asked, planned and built during the run
- [ ] Recorded Stryker result (68% score, 273 mutants, 65 survivors, five hand-checked survivors) matches the [product spec](../../planning/lesson3-validation-depth/PRODUCT-SPEC.md) and is shown as one run, not a rate
- [ ] Exercise run by following only its text; outcomes listed, no required tool
- [ ] Every changed slide rendered at 1920x1080; no wrapped rows, overflow or face-cam intrusion (the results slide and the survivors slide have the most rows)
- [ ] Differs slides (23-24) contain only marks and chips (no sentences)
- [ ] Script and run-of-show agree on beat order, slide ranges and timing (about 60 min)
- [ ] The recap slide (21) shows the ladder with the three built steps ticked and hidden tests greyed out; nothing in the per-task flow is a recommended human step, and the gate slide (15) reads as a once-per-repo guardrail
