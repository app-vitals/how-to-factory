# Plan: lesson-depth-reset (prefix LDR)

Repo: app-vitals/how-to-factory. Lesson material, research and process docs only. **No `factory/` changes**: the factory builds its own full-featured `plan` skill live on camera.

## Direction (Dan, Slack)
- Lessons go deep on each component, not minimal-size. Still one component per lesson, built in one lesson; fuller deep dives come later.
- Prioritize by what is most expected, common and crucial. Every lesson must deliver real learnings, not superficial ones.
- The playbook and CLAUDE.md scoping rules get updated. Applies to all components.
- A Shipwright inventory (what it does and why) is an internal management doc, not published in the lesson.
- Lesson 2 (planning) is the first lesson under the new standard.

## Design
- **Process docs (LDR-1.1):** replace "simple version first / size of lesson 1" with a deep-lesson standard: per capability, concept, why it exists, a concrete failure without it, and what it takes to build.
- **Inventory (LDR-2.1):** `planning/lesson-depth-reset/shipwright-inventory.md`, read at a pinned shipwright commit; each "why" marked documented or inferred.
- **Field survey (LDR-3.x):** extend `landscape/plan-grid/` for all six products with the dimensions: clarify mode, assumptions surfaced, editable plan, where saved, dependencies, parallel split, re-plan, second-model critique, read-only enforcement, tracker output, human-only flag, rollout/rollback. Playbook section 2 protocol. Assemble, cross-check, add to `matrix.json`.
- **Synthesis (LDR-4.1):** rank capabilities on expected / common / crucial with evidence; list every change from the approved proposal.
- **Lesson 2 rewrite (LDR-5.x):** brief, options, README + exercise, script, deck, run-of-show + checklist, backlog. Directory name `02-a-plan-that-looks-first` is kept so inbound links hold.
- **Tier A (built and exercised):** clarify and state assumptions; layered exploration with reuse; complexity risks; breaking-change scan (consumers, backfill, release pipeline); saved design linked from tasks; hard approval; slicing rules incl. add-migrate-remove; queue awareness; human-only task flag.
- **Tier B (named, not built):** bundling, scoring and model tier, autonomous mode and decision log, methodology config, second-model critique, parallel coordinators, tracker sync, per-task test layers (verification lesson).

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| LDR-1.1 | docs: replace the simple-version-first rules with the deep-lesson standard | none | sonnet | docs/ldr-1-1-replace-the-simple-version-first |
| LDR-2.1 | docs: inventory Shipwright plan-session capabilities and the reason for each | none | sonnet | docs/ldr-2-1-inventory-shipwright-plan-session |
| LDR-3.1 | docs: extend Devin plan research with the depth dimensions | none | sonnet | docs/ldr-3-1-extend-devin-plan |
| LDR-3.2 | docs: extend Factory plan research with the depth dimensions | none | sonnet | docs/ldr-3-2-extend-factory-plan |
| LDR-3.3 | docs: extend OpenHands plan research with the depth dimensions | none | sonnet | docs/ldr-3-3-extend-openhands-plan |
| LDR-3.4 | docs: extend Cursor plan research with the depth dimensions | none | sonnet | docs/ldr-3-4-extend-cursor-plan |
| LDR-3.5 | docs: extend Copilot plan research with the depth dimensions | none | sonnet | docs/ldr-3-5-extend-copilot-plan |
| LDR-3.6 | docs: extend Claude Code plan research with the depth dimensions | none | sonnet | docs/ldr-3-6-extend-claude-code |
| LDR-3.7 | docs: assemble the extended plan grid with a cross-check | 3.1, 3.2, 3.3, 3.4, 3.5, 3.6 | sonnet | docs/ldr-3-7-assemble-the-extended |
| LDR-3.8 | feat: add the depth dimensions to the landscape matrix | 3.7 | sonnet | docs/ldr-3-8-add-the-depth |
| LDR-4.1 | docs: prioritize planning capabilities by expected, common and crucial | 2.1, 3.7 | sonnet | docs/ldr-4-1-prioritize-planning-capabilities |
| LDR-5.1 | docs: rewrite the lesson 2 brief to the deep-lesson standard | 1.1, 4.1 | sonnet | docs/ldr-5-1-rewrite-the-lesson |
| LDR-5.2 | docs: rewrite lesson 2 options from the extended grid | 5.1, 3.8 | sonnet | docs/ldr-5-2-rewrite-lesson-2 |
| LDR-5.3 | docs: rewrite lesson 2 README and exercise | 5.2 | sonnet | docs/ldr-5-3-rewrite-lesson-2 |
| LDR-5.4 | docs: rewrite the lesson 2 script | 5.3 | sonnet | docs/ldr-5-4-rewrite-the-lesson |
| LDR-5.5 | docs: rebuild the lesson 2 deck | 5.4 | sonnet | docs/ldr-5-5-rebuild-the-lesson |
| LDR-5.6 | docs: update the lesson 2 run-of-show and checklist | 5.5 | sonnet | docs/ldr-5-6-update-the-lesson |
| LDR-5.7 | docs: update the backlog for the planning deep dive | 1.1, 5.1 | sonnet | docs/ldr-5-7-update-the-backlog |

```
[START] ├─ LDR-1.1 ─────────────────────────────┬──────────────┐
        ├─ LDR-2.1 ────────────┐                │              │
        └─ LDR-3.1..3.6 (parallel) → LDR-3.7 ───┤              │
                                  ├→ LDR-3.8 ───┼──────────┐   │
                                  └→ LDR-4.1 ←──┘ (+2.1)   │   │
                                        └→ LDR-5.1 (+1.1) ─┼───┤
                                              ├→ LDR-5.2 (+3.8)  └→ LDR-5.7 (+1.1, 5.1)
                                              │     └→ 5.3 → 5.4 → 5.5 → 5.6
```

## Breaking Change Safety
Additive or rewrite-in-place. Consumers of lesson 2 files: `lessons/README.md` (LDR-5.7), the lesson's own cross-links (options anchors kept or fixed by LDR-5.3), `matrix.json` (additive only; ids kept; check-landscape green). Lesson 2 files are rewritten in one chain; `lessons/README.md` is edited by 1.1 then 5.7 (5.7 depends on 1.1). Safe to deploy standalone: yes (each task).

## HITL
None.

## Decision Log
- Shipwright inventory lives in `planning/` of this repo, not the intel repo: defaulted, Dan approved the design with this assumption stated.
- Live build covers the spine (understand, design, approve, slice with breaking-change rule); other Tier A items walked through: defaulted, Dan approved.
- Opening segment (lesson 1 loop run for real) kept; lesson 1 unchanged: defaulted, Dan approved.
- Six per-product research tasks (matches the earlier lesson 2 grid), accepted by Dan with the breakdown.
