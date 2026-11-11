# Plan: lesson6-review-patch (prefix LRV)

Repo: app-vitals/how-to-factory. Design and task list approved by Dan, 2026-11-11. Lesson material only: **no `factory/` changes** (the factory builds `factory/` live). Mirrors [`planning/lesson4-pr-routing`](../lesson4-pr-routing/PLAN.md) and the sequence in [`docs/lesson-creation.md`](../../docs/lesson-creation.md).

## Direction (Dan, Slack)
- Next lesson is a deep dive on review, the same pattern as earlier lessons: what Shipwright does, what other factories do.
- Look at patch in the same pass; a full lesson on it may not be needed. Compare what the sample factory has with what Shipwright has.
- Reference and discuss the article "Solving code review at Anthropic" (https://claude.dev/blog/solving-code-review-at-anthropic/), which is making the rounds.
- Do not repeat lessons 1, 3 and 4 on review and patch; mostly go deeper.

## Design
- **Topic (assumption, confirmed by approval): Review** (`docs/components.md` section 5, Work done band), with Patch as the second act. Tier 1, "Make the output trustworthy". Directory `lessons/06-review-signal-and-convergence` (renameable until the lesson ships).
- **One idea:** a review is worth its signal-to-noise, and the loop needs a way to converge.
- **Not repeated (owned by earlier lessons):** lesson 4 taught the router, the verdict comment tied to a head commit, review, patch, review, and the blunt round cap with the stub skills; lesson 3 taught independence of the check from the builder. Lesson 6 starts where the lesson 4 stubs stop. LRV-1.2 builds the overlap map; the brief carries a "Reused / Not re-taught" section and the script points back in one sentence.
- **Review, Tier A:** (1) grade findings by severity and confidence, post only above a threshold, cap the count, filter problems already on the base branch; (2) judge against the repo's own rules (a guidance file) with file and line evidence; (3) a mechanical verdict function plus a gate so the label cannot disagree with the review, with the self-review limit and no request-changes; (4) a fresh-context verifier that drops findings it can disprove; (5) diff-only re-review that does not repost prior findings and attests per prior finding.
- **Patch, Tier A (about 8 minutes):** (6) verify-then-fix: accept, modify or reject each finding before touching code; (7) the reject path: a rebuttal plus a settled record so a wrong finding ends the loop; (8) CI triage: rerun cancelled runs first, check whether the base branch is red too; (9) converge: a same-state no-progress check next to the round cap.
- **Tier B (named with owners, not built):** multi-reviewer voting, an incident-based eval set, risk-tiered human approval, noise metrics, real approval and merge (release lesson), author allowlist (governance lesson).
- **Anthropic article:** the opening hook and the source for the destinations slide. LRV-1.3 fetches the raw page and verifies each number; an unverifiable claim is left out. Figures to check: 16% to 54% substantive comments, 65% to 78% passing after one round, 8.9% to 1.5% needing five or more rounds, round cap of 3, diff-only re-review, a review guidance file, the incident eval set, risk-tiered approval.
- **Research focus (six products, one task each):** review quality only. Grading and thresholds, noise control, a verification pass, repo guidance files, re-review dedupe, how a wrong finding is dismissed. Patch and fix-back facts come from the existing `landscape/routing-grid`.
- **Shipwright fact to keep straight:** Shipwright has no review-round cap, only counters; it converges through a shared mechanical "settled" definition, a no-progress check and streak blocks. The lesson must not present a production round cap as Shipwright's.
- **Length:** 30 to 40 minutes, with the live build of the review gate and patch reject path as the do-not-trim beat.

### Reuse
Lessons 3 and 4's research shape (inventory, six product files, assembled grid, matrix dimensions, ranking), brief, options, deck, script and run-of-show formats; `decks/_template`; `landscape/routing-grid`, `landscape/verify-grid` and `planning/lesson4-pr-routing/shipwright-inventory.md` as starting notes; the `Reused / New this time` brief section.

### Complexity risks
- Matrix edits (LRV-1.11) share `landscape/matrix.json` and the vendor allowlist; run `check:landscape` and re-render the README.
- The deck must pass `scripts/check-decks.ts` (3 bullets, 8 words, one diagram, 8 node max, forbidden viewer words).
- Drift into the release lesson (approval and merge) or the governance lesson (author allowlist); every such item is Tier B with its owner.
- The demo needs real PRs, and a reviewer that cannot formally approve its own PR; the checklist (LRV-2.4) plans the fallback.
- Public repo: scrub rules apply to every file including `planning/`; Shipwright is one example, no internal names or task ids.

### Breaking-change scan
Additions only: new grid directory, new matrix columns, a new lesson directory, backlog and components wording for Review. No renames or removals; lessons 1 to 5 keep their files.

### Assumptions
1. Component is Review with Patch as the second act, in one lesson, numbered 6 (lesson 5 is written, not yet filmed).
2. Six-product research on review quality; patch facts reuse the routing grid.
3. No sketch review gate (changed 2026-11-11, Dan): the factory makes the design calls itself and Dan reviews the finished lesson and iterates. LRV-2.1 is cancelled; the deck and script depend on the brief and options directly.
4. Length target 30 to 40 minutes.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| LRV-1.1 | docs: inventory Shipwright review and patch internals and the reason for each capability | none | | yes |
| LRV-1.2 | docs: map what lessons 1, 3, 4 and 5 already teach about review and patch | none | | yes |
| LRV-1.3 | docs: verify the Anthropic code review article against the page and extract sourced claims | none | | yes |
| LRV-1.4 to 1.9 | docs: research review quality for Devin, Factory, OpenHands, Cursor, Copilot, Claude Code (one each) | none | | yes |
| LRV-1.10 | docs: assemble the review-quality grid with a cross-check | 1.4 to 1.9 | | yes |
| LRV-1.11 | feat: add the review-quality dimensions to the landscape matrix | 1.10 | | yes |
| LRV-1.12 | docs: rank review and patch capabilities on expected, common and crucial | 1.1, 1.2, 1.3, 1.10 | | yes |
| LRV-1.13 | docs: add the lesson 6 brief | 1.12 | | yes |
| LRV-1.14 | docs: write lesson 6 options from the grid and article | 1.13, 1.11 | | yes |
| LRV-1.15 | docs: update the lesson backlog and components map for lesson 6 | 1.13 | | yes |
| LRV-2.1 | ~~docs: sketch the lesson 6 deck for review~~ cancelled, no sketch gate | none | | yes |
| LRV-2.2 | docs: build the lesson 6 deck | 1.13, 1.14 | | yes |
| LRV-2.3 | docs: write the lesson 6 script and README | 1.13, 1.14 | | yes |
| LRV-2.4 | docs: write the lesson 6 exercise, run-of-show and checklist | 2.2, 2.3 | | yes |

```
[START] ├─ LRV-1.1 ──────────────────────────────────┐
        ├─ LRV-1.2 ──────────────────────────────────┤
        ├─ LRV-1.3 ──────────────────────────────────┤
        └─ LRV-1.4..1.9 (parallel) → 1.10 ─┬─ 1.11 ──────────────┐
                                            └─ 1.12 (+1.1,1.2,1.3) → 1.13 ─┬─ 1.15
                                                                              └─ 1.14 (+1.11) → 2.2, 2.3 → 2.4
```

HITL scan: no tasks require human steps (no `.claude/**` files, no CI workflow secrets).

## Open items
- Lesson 5 is not yet filmed; the backlog update (LRV-1.15) must not mark it taught.
- No human gate before the deck and script. Dan reviews the finished lesson and iterates; the deck and script PR descriptions list the design calls made (Decisions section).
- Lesson 6 video URL is added after filming; not invented.

## Decision Log
- Component: Review with Patch as a second act in one lesson, per Dan's direction and approval.
- Added an overlap-map task (LRV-1.2) so the lesson goes deeper instead of repeating lessons 1, 3, 4 and 5.
- Added an article-verification task (LRV-1.3): numbers are quoted only after checking the raw page.
- Research limited to review quality; patch facts come from the existing routing grid.
- Length target 30 to 40 minutes, as the filmed lessons.
- Sketch review gate removed on Dan's request (2026-11-11), a deliberate departure from lesson-creation recipe step 5: the factory decides, Dan reviews the finished product.
