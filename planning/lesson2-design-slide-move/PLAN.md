# Plan: lesson 2 design-slide move

Session: `lesson2-design-slide-move`. Repo: `app-vitals/how-to-factory`. Scope: `lessons/02-a-plan-that-looks-first` only (deck, run-of-show, script). Nothing under `factory/` changes.

Origin: Dan's review of the lesson 2 deck. Slide 8, "The design is short, and names consumers", sits before the four Look slides, but slide 7 has just said the order is Look, Design, Approve, Slice. Its "Breaking" box also previews the breaking-change scan before anyone has seen it. Dan approved moving it.

## Design

1. **Move the slide** to the start of the Design stage, immediately before "Design: scan for breaking changes". It keeps its options-grid content (Approach, Rejected, Risks, Breaking) and caption.
2. **Retitle** to "The design: four short sections" (5 words, within the title limit). Drops the "names consumers" jargon, which the breaking-change slide explains.
3. **Slide numbers.** Moving slide 8 to position 12 shifts only slides 8-12: queue awareness 9 to 8, clarify 10 to 9, explore 11 to 10, complexity 12 to 11, design shape 8 to 12. Slides 1-7 and 13-26 keep their numbers, so rows 1-4 and 7-13 of the run-of-show, the checklist's "slides 18-21" and the total of 26 are unchanged.
4. **run-of-show.md.** Row 5 becomes slides 8-11 (Look, queue awareness first). Row 6 becomes slides 12-15: the design shape (12), the breaking-change scan (13), the saved design (14), approval (15). Drop "The short design first" from row 5.
5. **script.md step 4.** Remove "Show the design slide first..." from the opening of the step and place the same beat (short, names consumers so someone can say no before work exists) at the start of the Design stage bullet, before the breaking-change scan.
6. **Out of scope.** README.md and brief.md are already organised by stage and do not mention the slide order. No change to the slide's content beyond the title.
7. **Checks.** `scripts/check-decks.ts` reads limits from `decks/deck.config.json` and does not check ordering; run it and its test to confirm.

## Tasks

| Task | Title | Depends on |
|---|---|---|
| DSM-1.1 | docs: move lesson 2 design slide to the start of the Design stage | none |

Safe to deploy standalone: yes (docs only, no renames or removals with outside consumers).
