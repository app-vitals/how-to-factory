# Plan: lesson1-loop-columns (prefix LPL)

Repo: app-vitals/how-to-factory. Gives the loop "how the field differs" slide the same simple-concept treatment as the plan and dev-task slides. Follows lesson1-verify-columns (VRF), lesson1-branch-step (DTB) and lesson1-plan-columns (PTC), which are still merging.

## Direction (Dan, Slack)
- The loop slide "feels like it's all automated". Is there a difference for whether or not plan runs in the loop, or what are the differentiators for the loop? Dan chose all three proposed columns.

## Findings that shaped the design (field-grid, 2026-10-13)
- "Who drives" is flat for the loop: every product's loop across tasks is automated once set up. Two products add an optional gate (Claude Code Projects can be told to confirm first; Devin Dynamic Workflows can require approval before each run), so it separates almost nothing as a column.
- Whether plan runs inside the loop is the best differentiator and ties to the plan slide's first column: OpenHands (the Software Factory triage automation prioritizes issues, checks dependencies and sets acceptance criteria before labeling them ready for the developer automation), Claude Code agent teams (the lead creates a shared task list with dependencies and teammates claim tasks) and Cursor Projects (a coordinator plans and delegates) run plan inside; Factory Missions have a person approve the plan before the Mission runs, then the orchestrator starts each feature and adds follow-ups; Devin can start with the !plan playbook through a Linear trigger but the docs do not describe that as part of a loop; Copilot is not documented. Our sample runs plan outside the loop.
- What starts the next task is categorical: a finished run (Factory's orchestrator, Claude Code team self-claim, /goal over a backlog, a shell loop, our script), a schedule or event or label poll (OpenHands, Cursor and Copilot automations, Devin automations), a work-item emitter (Devin Preflight), or a person (Cursor /loop, which a person stops).
- Whether a person can step in between tasks is partial: Claude Code Projects (confirm first), Devin Dynamic Workflows (approval setting), Factory (pause), Cursor /loop (human stops).
- Left to later lessons: pacing and caps (OpenHands per-poll limit, Factory pausing after five failed scheduled runs), running several at once, and what stops the loop (ours stops on the first failed todo).

## Design
- **Three loop columns replace `loop-across` and `loop-drive` in landscape/matrix.json:**
  1. `loop-starts-next` ("What starts the next task"): one or two of **A finished run**, **A schedule**, **An event or label**, **A person**, joined with " + ", surface in parentheses (e.g. 'A finished run (Missions)').
  2. `loop-includes-plan` ("Plan runs inside the loop?"): starts with Yes or No and names the surface (e.g. 'Yes: triage automation', 'No: plan approved before it runs'); a cell no page supports is omitted.
  3. `loop-person-between` ("A person can step in between tasks?"): starts with Yes and says how (confirm first, approval setting, pause); a cell no page supports is omitted.
- Each cell keeps name / summary / sourceUrl / asOf / `short` (at most 8 words). Cells are filled from landscape/field-grid/*.md (LOOP-across grids) re-reading cited pages where unsure; never from memory; "No" only where a page states it; an unsupported cell is { omitted: reason } naming the pages checked.
- **Sample row:** starts next = A finished run (the script loops); plan inside the loop = No: you run plan first; a person between tasks = No: it runs until none is ready or one fails.
- **Slide:** same rules as the other differs slides - six vendors in the same order plus "This sample", as-of date in the header, never "matrix", "options.md", "sourced" or "not documented", blanks read "not in their docs", caption at most 12 words ("Once set up, most run without a person starting each task."). "Who drives" goes: it is flat.
- Scope: loop slide only; loop-within-a-task data already feeds the dev-task columns.

## Tasks
| ID | Title | Deps | Model | Branch |
|---|---|---|---|---|
| LPL-1.1 | feat: replace loop columns in the landscape matrix with three questions | VRF-1.1 | sonnet | feat/lpl-1-1-loop-columns-matrix |
| LPL-2.1 | docs: rebuild loop tables and the loop beat from the new columns | LPL-1.1, VRF-2.1 | sonnet | docs/lpl-2-1-loop-tables-and-beat |
| LPL-3.1 | docs: rebuild the loop differs slide with three columns | LPL-2.1, VRF-3.1 | haiku | docs/lpl-3-1-loop-slide |

```
[PRIOR SESSION lesson1-verify-columns] VRF-1.1 ─┐  VRF-2.1 ─┐  VRF-3.1 ─┐
[START] LPL-1.1 (needs VRF-1.1) ─ LPL-2.1 (needs 1.1, VRF-2.1) ─ LPL-3.1 (needs 2.1, VRF-3.1)
```

## Breaking Change Safety
Removes components `loop-across` and `loop-drive` and adds three. Consumers (grep): scripts/landscape-types.ts (ComponentId), check-landscape.test.ts fixtures, matrix.json, landscape/README.md (generated), options.md, README.md, script.md, the deck's loop differs slide, run-of-show.md. LPL-1.1 changes types, test fixtures, matrix.json and regenerates landscape/README.md atomically (CI check-landscape passes). The lesson docs (LPL-2.1) and slide (LPL-3.1) follow; until then they cite the earlier snapshot with their own inline URLs and dates (stale, not broken). All three tasks wait for the matching VRF tasks because they edit the same matrix, tooling, docs and deck files. Safe to deploy standalone: yes.

## HITL
None.

## Decision Log
- Three columns per Dan: what starts the next task (categorical), plan inside the loop (yes/no), a person can step in between tasks (yes/no).
- "Who drives" dropped: automated for every product once set up; the optional-gate nuance lives in the third column and the caption says "most".
- Pacing/caps, concurrency and stop conditions left to later lessons.
- Cross-session dependencies on VRF-1.1/2.1/3.1 to avoid editing the same matrix, docs and deck files concurrently.
