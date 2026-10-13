# Plan: lesson1-field-grid-redo (prefix FGX)

Repo: app-vitals/how-to-factory. Redo of lesson1-field-grid-research (FGR), which is merged to main (#38, #39, #42) with conclusions that do not hold. Research only: no slide or matrix changes.

## What went wrong in FGR
Each per-product task was briefed with a few starting URLs (mostly from the Shipwright site's comparison pages) and picked one surface per product, never reading the vendor's docs index. Dan questioned the OpenHands row ("not documented" for plan). A re-check found, from first-party pages (fetched 2026-10-13, summaries to be re-read in full by the redo):
- OpenHands: Software Factory (docs.openhands.dev/openhands/usage/use-cases/software-factory.md): triage automation "prioritizes issues, checks dependencies, and establishes acceptance criteria"; developer opens PRs; reviewer runs tests; watchdog merges when checks pass. Issue-to-PR automation (.../agent-canvas/prebuilt/issue-to-pr.md): implements, runs tests, opens a draft PR for review, polls on a schedule so it keeps going. SDK goal completion loop (docs.openhands.dev/sdk/guides/convo-goal.md): a judge model re-prompts until the objective is verified.
- Copilot: cloud agent can research, produce a plan you review and iterate, then implement (docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/research-plan-iterate); the grid had plan output/who-drives as not documented.
- Devin: Dynamic Workflows (docs.devin.ai/work-with-devin/dynamic-workflows.md) run staged pipelines (audit, fix, verify) with each stage consuming the previous output; Testing (.../testing-and-recordings.md) is a documented plan-test-run-record flow, semi-automatic; Auto-triage (.../product-guides/auto-triage.md) spawns child sessions. The grid said Devin's next-task-by-itself was not documented.
- Claude Code: /goal and Stop hooks keep it working until a check passes (code.claude.com/docs/en/best-practices); the grid had it as plainly human-driven.
Consequences: the draft's headline ("only Factory Missions moves on by itself", "plan is always Human approves") is wrong, and it blurs two different loops: a verify-and-retry loop inside one task, and a loop that moves across tasks.

## Design
- **Method change:** every per-product task first reads the vendor's docs index (llms.txt or sitemap if one exists), lists the pages relevant to planning, issue/task workflows, verification and automation, reads them, then chooses the surface(s) per concept. Several surfaces per product are allowed, each named in the cell. Each file records "Pages read" and "Ruled out (why)". A "not documented" cell is allowed only after naming the index pages checked.
- **Grid changes:** LOOP splits into two sub-grids: within a task (verify-and-retry until a check passes) and across tasks (what moves on to the next piece of work by itself). Columns stay input / step / output / who drives (Human / Human approves / Automated, only when a page states it).
- **Scope** stays lesson 1: no sandboxes, isolation, claims, parallel runs, sizing, design approval, review policy, release, ops.
- **Interim safety:** a one-paragraph "superseded draft, under rework" note on landscape/field-grid/README.md goes on main right away so nobody uses the old conclusions.
- **Assembly** re-generates README.md, cross-checks products against each other (flags any blank for a product whose index lists a relevant page), and lists the corrections to the superseded draft.
- Shipwright site pages remain context only; re-fetch everything; never restate their "No"/"lacks" claims about competitors.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| FGX-1.1 | docs: mark field grid draft as superseded | none | haiku | docs/fgx-1-1-grid-superseded-note |
| FGX-1.2 | docs: redo Devin research against the docs index | none | sonnet | docs/fgx-1-2-redo-devin |
| FGX-1.3 | docs: redo Factory research against the docs index | none | sonnet | docs/fgx-1-3-redo-factory |
| FGX-1.4 | docs: redo OpenHands research against the docs index | none | sonnet | docs/fgx-1-4-redo-openhands |
| FGX-1.5 | docs: redo Cursor research against the docs index | none | sonnet | docs/fgx-1-5-redo-cursor |
| FGX-1.6 | docs: redo Copilot research against the docs index | none | sonnet | docs/fgx-1-6-redo-copilot |
| FGX-1.7 | docs: redo Claude Code research against the docs index | none | sonnet | docs/fgx-1-7-redo-claude-code |
| FGX-2.1 | docs: reassemble the field grid with a cross-check | 1.1-1.7 | sonnet | docs/fgx-2-1-reassemble-field-grid |

```
[START] ├─ FGX-1.1 ─┐
        ├─ FGX-1.2..1.7 (six parallel, one file each) ─┴─ FGX-2.1
```

## Breaking Change Safety
Rewrites existing draft files under landscape/field-grid/; nothing outside that directory is read by tooling (verified: the only repo reference to landscape/field-grid is the FGR plan file). The six per-product tasks touch separate files; FGX-1.1 and FGX-2.1 touch README.md and are ordered. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Six parallel per-product tasks plus an assembly task: a single task cannot read six vendors' full docs indexes in one pass, and separate files avoid conflicts.
- Interim note as its own small task: the incorrect draft is on main now, so the correction should not wait for the full redo.
- LOOP split into within-task and across-task: the re-check showed vendors document both and the old grid blurred them.
