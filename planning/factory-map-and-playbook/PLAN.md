# Plan: factory-map-and-playbook (prefix FMP)

Repo: app-vitals/how-to-factory. Sanity-checks the component map, sorts the lesson backlog into tentative tiers, adds what the field research showed was missing, and captures a lesson playbook so future lessons are cheaper. Docs plus one small CI check.

## Direction (Dan, Slack)
- Sanity check the factory map / components, and the upcoming lessons: start sorting them so there is an idea of where we are going and the ordering, without finalizing the order. Check whether we are missing something based on what we learned in the field. We learned a lot about what a lesson should look like and what it takes to get there; be more prepared for future lessons (we expect to get better each time).
- Dan after the analysis: "this is all great. let's go with your instincts for now so we don't lose anything and we'll iron out as we go."

## Findings (from docs/components.md, lessons/README.md, decks/DIAGRAMS.md, the deck, and the field research)
- The doc has 11 components; the deck's factory map has 8 (Intake, Plan, Dev-task, Verification, Review, Release, Loop, Chat) because of the 8-node diagram cap, renames Planning to Plan, Execution to Dev-task and Coordination/loop to Loop, and omits Governance, Feedback and Memory. The backlog also has a twelfth heading, Observability / ops, that the doc folds into Feedback (#8).
- Bands fit the cap and match DIAGRAMS.md's C4 guidance (context first, then containers): Work in (Intake, Planning); Work done (Execution, Verification, Review, Release); Keeps it moving (Coordination/loop, Chat); Keeps it safe and healthy (Governance, Feedback/ops, Memory).
- Gaps the field research surfaced (vendor-neutral wording only; no product claims go in components.md): instructions and standards as a day-one input (today buried in Memory #9); the execution environment (sandbox, VM, worktree; today one bullet in Execution's range); triage and readiness between Intake and Planning; multi-agent coordination (delegation, claims, parallel runs) separate from the loop; security and access as a sub-topic of Governance.
- Sort rule: a trust ladder - the factory builds its own next parts (lesson 1's foundation), so earlier lessons make unattended building safer; scale and operations come later. Order within a tier is open.
- Process lessons from lesson 1 (it took roughly a dozen re-scoping sessions): scope was not pinned before work started; the first field research was shallow (one surface per product); comparison columns were first the wrong shape (yes/no for a categorical answer) and then drifted into a later lesson (verification); names must be a product's own term and the header must match the sample's component; viewer-facing wording rules were enforced by memory; edits chained on shared files serialized for hours.

## Design (Dan: go with instincts; candidates are marked, not final)
1. **docs/components.md:** add the four bands; add the candidates as clearly marked *proposed* entries or splits (instructions and standards split out of Memory; execution environment; triage and readiness; multi-agent coordination split from the loop; security and access noted under Governance) - each in the doc's existing format (also called, what it is, why it exists, simplest version, range, Shipwright example) with no claims about named commercial products; align Observability/ops with the backlog (either a component or an explicit Feedback sub-heading, consistently in both files); update 'Notes on the map' to say the list is living and the proposed entries are not final.
2. **lessons/README.md backlog:** reorder under four tentative tiers (Make the output trustworthy; Make the work better and easier to feed; Scale it; Run it for real) with one-line dependency notes (Release after Review and Verification; Governance after Review and Release; parallel runs after the environment lesson; Feedback after Observability) and the trust-ladder rule, marked 'order not final; lessons are chosen one at a time'; keep every existing backlog entry (nothing is dropped) and add entries for the new candidates.
3. **Lesson playbook** (docs/lesson-playbook.md, linked from CLAUDE.md and lessons/README.md): the one-page lesson brief (component; the one idea; scope test 'does a single agent need it for a single flow?'; in and out of scope; the sample's concrete steps; what the factory builds in this lesson; prerequisites; exercise outcomes; agreed with Dan before work is queued); the research protocol (docs index first, pages read and ruled out, per-product files, cross-check, 'not documented' only after naming pages, surfaces named, fetch dates); comparison design (inputs/steps/outputs plus human-in-the-loop, two or three simple columns, categorical vs yes/no, `short` text of at most 8 words, same vendors in the same order, one takeaway per slide, detail stays in the repo, names are a product's own term, column header matches the sample's component); the deck outline and slide budget (lesson 1's shape: map, human, build, per piece concept then differs then demo, why/opinion, together, names, destinations, exercise; about 18 to 20 slides); viewer-facing wording rules; the demo policy (build-only unless the lesson is about running; pre-filming run-through); work-queue rules (brief approved first; edit a queued task only while pending; never edit merged PRs; chain tasks on the last editor of a shared file; batch edits per file); a pre-filming checklist / definition of done; and a short 'what lesson 1 taught us'.
4. **lessons/_template:** add brief.md (the brief template) and checklist.md; point README.md/script.md/run-of-show.md templates at them; keep the existing sections.
5. **CI check:** extend scripts/check-decks.ts (config in decks/deck.config.json) to fail on viewer-facing forbidden words in slide text ('matrix', 'options.md', 'sourced', 'not documented'), with unit tests; it must pass on main when it lands, so it depends on the last lesson-1 deck editor.
6. **Lesson-1 map slide:** relabel the factory map's nodes to the doc's component names (Intake, Planning, Execution, Verification, Review, Release, Loop, Chat; highlight Planning, Execution, Loop) with a caption that governance, feedback and memory support all of these; group by band visually only if the existing CSS allows; update decks/DIAGRAMS.md's factory-map section. The 'What we build' slide keeps the sample's skill names.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| FMP-1.1 | docs: revise the component map with bands and proposed additions | none | sonnet | docs/fmp-1-1-component-map |
| FMP-1.2 | docs: sort the lesson backlog into tentative tiers | FMP-1.1, SPB-3.1 | sonnet | docs/fmp-1-2-sort-backlog |
| FMP-1.3 | docs: add the lesson playbook and template updates | none | sonnet | docs/fmp-1-3-lesson-playbook |
| FMP-1.4 | feat: fail check-decks on viewer-facing forbidden words | NXA-1.1 | sonnet | feat/fmp-1-4-forbidden-words-check |
| FMP-2.1 | docs: align the lesson 1 factory map with the component doc | NXA-1.1, FMP-1.1 | haiku | docs/fmp-2-1-factory-map-slide |

```
[PRIOR SESSIONS] SPB-3.1 ─┐   NXA-1.1 ─┐
[START] FMP-1.1 ─ FMP-1.2 (needs 1.1, SPB-3.1)
        FMP-1.3 (no deps)
        FMP-1.4 (needs NXA-1.1)
        FMP-2.1 (needs NXA-1.1, FMP-1.1)
```

## Breaking Change Safety
Docs are additive reorderings (no backlog entry or component is deleted; renamed headings are mirrored in both files in the same task chain). FMP-1.4 adds a CI failure mode; it depends on NXA-1.1 so lesson 1's deck is clean when it lands, and the task must verify `bun scripts/check-decks.ts` passes on main with the new rule. FMP-2.1 changes one slide's node labels. Edits to shared files are chained on the last pending editor (SPB-3.1 for lessons/README.md; NXA-1.1 for the deck). Safe to deploy standalone: yes.

## HITL
None. (CLAUDE.md is edited, not .claude/**.)

## Decision Log
- Candidates are added as clearly marked 'proposed' (Dan: go with instincts, iron out as we go; nothing is lost).
- Trust ladder drives the tentative sort; order stays open and lessons are still chosen one at a time.
- Brief-before-work is the first rule of the playbook.
- The forbidden-words check lands after NXA-1.1 so it cannot break CI for in-flight lesson-1 tasks.
