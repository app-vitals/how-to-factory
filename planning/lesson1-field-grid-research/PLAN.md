# Plan: lesson1-field-grid-research (prefix FGR)

Repo: app-vitals/how-to-factory. Research only: no slide or matrix changes. Follows lesson1-devtask-four-steps.

## Direction (Dan, Slack)
- The "how the field differs" slides are not very interesting: compare the same factories on every slide, and compare things that relate to lesson content (the inputs, steps and outputs taught per concept), not generic things like subagents, cloud agents, sandboxes. If something is covered in a later lesson, leave that concept out.
- Add how human-in-the-loop vs automated each step is.
- Field to cover: Devin, Factory, OpenHands (the core) plus Cursor, GitHub Copilot, Claude Code. Look at the Shipwright site comparisons (shipwright/site/src/pages/compare.astro and vs/{devin,factory,openhands}.astro) as context only: they are Shipwright marketing pages. Reuse their URLs as starting points, not their wording or their "No" claims about competitors. This repo stays tool-neutral and sources every claim itself.
- Dan confirmed: go with the six.

## Design
- Three grids (plan, dev-task, loop) x six products. Columns per grid: input, step, output, who drives it (Human / Human approves / Automated, only if a first-party page states it). "Not documented" is allowed, but a column with more than two of them across the six is a signal to rework that column.
- Scope per concept is lesson 1 only: plan = what the plan starts from, whether it splits work into tasks with criteria/dependencies, what it produces and where it lives; dev-task = what the task is, how it verifies, what comes out; loop = what starts the next run and whether it continues on its own. Leave out sandboxes, isolation, claims, parallel runs, sizing, design approval, review policy, release, ops.
- Surfaces matter: Cursor Plan Mode vs cloud agents/automations; Claude Code interactive session vs headless/scheduled; Copilot assigned issue vs chat. Each cell names the surface it describes.
- Output is draft research for Dan to review before any slide/matrix restructure. A second round decides which columns hold signal.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| FGR-1.1 | docs: research Devin, Factory and OpenHands against the lesson grid | none | sonnet | docs/fgr-1-1-research-devin-factory-openhands |
| FGR-1.2 | docs: research Cursor, Copilot and Claude Code against the lesson grid | none | sonnet | docs/fgr-1-2-research-cursor-copilot-claude-code |
| FGR-2.1 | docs: assemble the field grid draft and observations | 1.1, 1.2 | sonnet | docs/fgr-2-1-field-grid-draft |

```
[START]
  ├─ FGR-1.1 ─┐
  └─ FGR-1.2 ─┴─ FGR-2.1
```

## Breaking Change Safety
New files only under `landscape/field-grid/`; nothing renamed or removed; check-landscape.ts and check-decks.ts do not read this directory. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Split research by product halves into two parallel tasks writing separate files, then one assembly task: avoids a single very large fetch-heavy task and merge conflicts.
- Output location: defaulted to `landscape/field-grid/` as markdown drafts - reviewable in a PR, not wired into the checked matrix until Dan decides which columns survive.
- Kiro/Spec Kit: defaulted to a one-line mention in the assembly observations, not rows - per Dan's six-product call.
