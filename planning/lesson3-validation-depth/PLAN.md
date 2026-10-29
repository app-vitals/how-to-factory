# Plan: lesson3-validation-depth (prefix LVR)

Repo: app-vitals/how-to-factory. Design and task list approved by Dan, 2026-10-29. Lesson material, research and one
pre-filming scorer only: **no `factory/` changes** (the factory builds `factory/` live, per playbook section 0).
Spec: [PRODUCT-SPEC.md](PRODUCT-SPEC.md).

## Direction (Dan, Slack)
- Lesson 3 felt like "we tell the agent to test its code over and over". Add real learnings (different kinds of
  validation), slide count is fine.
- Build live only what is already proven and autonomous; mention new concepts, do not build them live.
- Frame the extra concepts as agentic engineering: why they matter more when an agent writes the code and the checks.
- Show roughly how much quality improves, as a small before/after with one honest number.
- dev-task is upgraded live from short self-contained prompts, one per capability, not "read the slides".

## Design
- **One idea:** a check is only as strong as its independence from the builder.
- **Built live (4):** A2 red-first tests with layer choice; A1+A8 run checks and an evidence table (bounded loop as a
  line); A4 guard against weakened tests; A5 fresh-context check (A6 run-the-app as its step).
- **Mentioned (3):** held-out tests, mutation, property-based testing. Our Stryker run on lesson 1's suite (68%, 65
  survivors, five hand-verified) is a recorded result.
- **A9** is a short human-gate beat (a person sets branch protection), not a capability.
- **Field comparison:** two slides, re-researched for hidden tests and test-quality checks across the six products.
- **Measurement:** v1 vs v2, about 4 tasks x 3 runs, scored by mutation score of tests the agent wrote (scoped
  Stryker). Small and noisy; one conditional follow-up if the signal is unclear.

### Reuse
Existing verify-grid and per-product files, `capability-priorities.md`, the lesson-2 and current lesson-3 deck and
script formats, `decks/_template`, the Stryker spike findings.

### Complexity risks
- `check-decks.ts` constrains deck shape (3 bullets, 8 words, 8-word titles, one diagram).
- Stryker needs TypeScript 5; the repo pins TS 7, so the scorer lives in `experiments/lesson3/` with its own deps.
- Full mutation runs take about 9 minutes; the scorer scopes to changed files.
- Playbook section 0: nothing under `factory/` is queued. LVR-1.13 runs on throwaway checkouts.
- The six per-product research tasks are similar; the playbook prefers one per product.

### Breaking-change scan
Rewriting lesson 3 in place changes files lesson 4 may reference (hand-off wording, `docs/components.md`,
`lessons/README.md`). LVR-3.1 checks and fixes those after the rewrite. No other consumers; additions to
`landscape/matrix.json` are additive.

### Assumptions
1. "Genetic engineering" in the discussion meant agentic engineering.
2. Lesson 3 is being redone in place; the earlier version is not final.
3. The 24-run experiment is token-costly, so LVR-1.13 is `hitl: true` (Dan's go-ahead).
4. TypeScript 5 for the scorer is acceptable as an isolated dependency.

## Tasks

| Task | Title | Depends on | HITL | Safe alone |
|---|---|---|---|---|
| LVR-1.1 | docs: research agentic-verification evidence | none | | yes |
| LVR-1.2 to 1.7 | docs: research Devin, Factory, OpenHands, Cursor, Copilot, Claude Code (one each) | none | | yes |
| LVR-1.8 | docs: assemble the verify grid additions with a cross-check | 1.2 to 1.7 | | yes |
| LVR-1.9 | feat: add the new dimensions to the landscape matrix | 1.8 | | yes |
| LVR-1.10 | docs: re-rank verification capabilities | 1.1, 1.8 | | yes |
| LVR-1.11 | docs: write the four per-capability upgrade prompts | none | | yes |
| LVR-1.12 | feat: build the before/after scorer | none | | yes |
| LVR-1.13 | docs: run the v1 vs v2 before/after and record results | 1.11, 1.12 | ⚠ HITL | yes |
| LVR-2.1 | docs: rewrite the lesson 3 brief | 1.1, 1.10 | | yes |
| LVR-2.2 | docs: sketch the new deck for review (Dan's gate) | 2.1 | | yes |
| LVR-2.3 | docs: rewrite options with two field slides | 2.1, 1.9 | | yes |
| LVR-2.4 | docs: rewrite deck, script, exercise, run-of-show, checklist | 2.2, 2.3, 1.13, 1.11 | | yes |
| LVR-3.1 | docs: check lesson 4 hand-off, reset taught flags | 2.4 | | yes |

```
[START] ├─ 1.1 ─────────────────────────┐
        ├─ 1.2..1.7 (six parallel) → 1.8 ┬─ 1.9 ──────────┐
        │                                └─ 1.10 (+1.1) → 2.1 → 2.2 (Dan sketch review) ┐
        │                                                         └─ 2.3 (+1.9) ───────────┤
        ├─ 1.11 ──┐                                                                        ├→ 2.4 → 3.1
        └─ 1.12 ──┴→ 1.13 (HITL) ───────────────────────────────────────────────────────┘
```

## Decision Log
- Prefix: VDR was taken, LVR probed free (404 on 1.1, 1.2, 2.1, 3.1).
- LVR-1.13 marked HITL for token spend, not because it cannot run autonomously.
