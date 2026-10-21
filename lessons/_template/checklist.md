# Pre-filming checklist: Lesson NN

> Copy next to the lesson. Definition of done from [docs/lesson-playbook.md](../../docs/lesson-playbook.md). Tick every box before filming.

- [ ] Brief ([brief.md](brief.md)) agreed before work was queued
- [ ] Sketch reviewed by Dan before the script, README and deck: brief, one stage slide and one capability slide
- [ ] Brief capability table complete and grouped by stage: every capability has concept, why it exists or what it prevents, examples, and what it takes to build
- [ ] Brief has a "Reused from earlier lessons / New this time" section
- [ ] `bun test` passes
- [ ] `bun scripts/check-decks.ts` passes
- [ ] `bun scripts/check-landscape.ts` passes
- [ ] Forbidden-words grep is clean in the deck, script and run-of-show: "matrix", "options.md", "sourced", "not documented" (a blank reads "not in their docs")
- [ ] Every claim about another product has a first-party URL and an as-of date; dates re-checked
- [ ] All links resolve
- [ ] Factory map slide highlights the component taught
- [ ] Slide count is in line with the lesson's capabilities (guidance, not a target); same vendors in the same order on every comparison slide, plus a "This sample" row
- [ ] Demo run through once on a scratch repo (skills and loop); filming demo is build-only unless the lesson is about running
- [ ] Exercise run by following only its text; outcomes listed, no required tool
- [ ] Every changed slide rendered at 1920x1080; no wrapped rows, overflow or face-cam intrusion
- [ ] Differs slides contain only marks and chips (no sentences)
