# Plan: lesson1-field-slides (prefix FGS)

Repo: app-vitals/how-to-factory. Follows lesson1-field-grid-redo (FGX): the per-product research and the assembled grid (`landscape/field-grid/`) are merged. This session turns that research into the checked matrix and the three "how the field differs" slides.

## Direction (Dan, Slack)
- The old "how the field differs" slides compare product features (sessions, sandboxes) that do not relate to the lesson. Compare the same six factories on every slide: Devin, Factory, OpenHands (the core) plus Cursor, GitHub Copilot, Claude Code. Compare what the lesson teaches (inputs/steps/outputs per concept) plus how human-in-the-loop vs automated each step is. Leave out concepts that belong to later lessons.
- Dan approved the columns below ("Go") and the order: re-read the flagged research gaps, restructure the matrix, then rebuild the slides.

## What the grid found (field-grid README, 2026-10-13)
- Loop across tasks is the clearest split: Factory, OpenHands, Claude Code document moving on to the next piece of work by themselves; Devin, Cursor, Copilot document event/schedule starts only.
- Plan splits into a plan you approve in a session (Cursor Plan Mode, Copilot, Claude Code plan mode, Factory Spec Mode) vs tasks in a queue with dependencies/criteria (OpenHands triage, Claude Code agent teams, Factory Missions criteria).
- Within a task everyone retries; what judges "done" differs (tests/CI, a person's hook script, a separate judge model, the agent itself). Dev-task step/output is mostly the same everywhere.
- Flagged gaps (pages the docs indexes list but the researchers did not read in full): Copilot hooks / Dynamic workflows how-to / Agentic Workflows (gh-aw); Cursor CLI reference pages and help pages; OpenHands TODO Management, Headless Mode, Dependency Upgrades and Vulnerability Remediation prebuilts; Devin Skills and use-case gallery pages; Factory changelog and parts of software-factory/overview, harness/skills, automated-qa; Claude Code sub-agents, Slack and cross-session messaging pages.

## Design
- **Slide columns (as approved):** PLAN = output + who drives; DEV-TASK = what judges a task done (and a one-line "same shape in every factory" caption for the prompt-to-PR flow); LOOP = moves on to the next task by itself? + who drives it. Input columns and loop pacing/triggers are dropped (later lessons). No dev-task "who drives" column.
- **Matrix restructure:** replace the components intake/planning/execution/loop with `plan-output`, `plan-drive`, `verify`, `loop-across`, `loop-drive`. Factories (the six; Codegen dropped) get all five cells. Every cell keeps `name` (the product's own term or "unknown"), `summary`, `sourceUrl`, `asOf`, plus a new required `short` (at most 8 words; the text a slide cell shows). Where a product has two surfaces, `short` names the surface. A "not documented" cell stays `{ "omitted": reason }` and the reason must name the pages checked. Task-queue products (Linear, Jira, GitHub Issues) leave the component grid: each keeps one top-level sourced `queue` cell (their existing planning cell) rendered in the task-queue table. demoable and destination are unchanged. Checker and renderer remain generic over `data.components`; `ComponentId` and the per-kind cell rules change.
- **Viewer wording:** slides never say "matrix", "options.md", "sourced" or "not documented". A blank shows as "not in their docs". As-of date stays in the table header; links go in the video description.
- **Slide structure unchanged:** three "how the field differs" slides (plan, dev-task, loop) as comp-tables of six rows plus a "This sample" row, short cell text, caption at most 12 words. The "Names are your choice" slide's OpenHands planning cell ("none found") is now wrong (triage exists) and is updated from the matrix.
- Shipwright site pages stay context only.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| FGS-1.1 | docs: close flagged research gaps for Copilot, Cursor and Claude Code | none | sonnet | docs/fgs-1-1-close-gaps-copilot-cursor-claude-code |
| FGS-1.2 | docs: close flagged research gaps for Devin, Factory and OpenHands | none | sonnet | docs/fgs-1-2-close-gaps-devin-factory-openhands |
| FGS-2.1 | feat: restructure landscape matrix around the lesson columns | 1.1, 1.2 | sonnet | feat/fgs-2-1-restructure-matrix |
| FGS-3.1 | docs: rebuild options tables from the restructured matrix | 2.1 | sonnet | docs/fgs-3-1-options-from-matrix |
| FGS-3.2 | docs: rebuild the field-comparison slides and names row | 3.1 | sonnet | docs/fgs-3-2-field-slides |

```
[START] ├─ FGS-1.1 ─┐
        └─ FGS-1.2 ─┴─ FGS-2.1 ─ FGS-3.1 ─ FGS-3.2
```

## Breaking Change Safety
- Matrix: removing components intake/planning/execution/loop, product codegen, and the task-queue products' component cells is a removal. Consumers (grep): scripts/landscape-types.ts, check-landscape.ts (+test), render-landscape.ts, landscape/README.md (generated), lessons/01-the-simplest-factory/options.md and README.md (tables copied from the matrix), landscape/field-grid/README.md (links only), lessons/_template (check for component-specific text), the deck's differs and names slides. FGS-2.1 changes types, checker, renderer, tests, matrix.json and regenerates landscape/README.md atomically (CI check-landscape passes). options.md/README/deck are updated in FGS-3.1/3.2; between 2.1 and 3.1 those docs cite an older matrix snapshot with their own inline URLs and dates, which is stale but not broken (no CI check reads them).
- FGS-1.1/1.2 edit only their own per-product files under landscape/field-grid/ (no overlap); the README cross-check in landscape/field-grid/README.md is updated once, in FGS-2.1.
Safe to deploy standalone: yes for each task.

## HITL
None.

## Decision Log
- Order research-gap pass before restructure: Dan wants no "not documented" quoted as fact on a slide until the flagged pages are read.
- Added a required `short` field to matrix cells: slide text should be derived from the checked matrix, not hand-written into the deck.
- Task-queue products moved to a single `queue` cell: they are not agents and have no plan/verify/loop cells.
- Dropped Codegen: Dan's field is the six named products.
- Dev-task slide gets no "who drives" column (Dan approved the column set as proposed).
