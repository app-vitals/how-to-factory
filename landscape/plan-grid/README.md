# Plan grid: spec to plan (lesson 2)

**As of 2026-10-20** (the five original columns were fetched 2026-10-19; the twelve depth dimensions 2026-10-20). Every product cell below is a short pointer to the matching cell in that product's own file, which holds
the full wording, the first-party URLs, the pages read and the pages ruled out. This README adds no claim that the per-product
files do not source; the cross-check and observations are counts and comparisons computed from those files. The twelve depth dimensions were added in
the depth-reset pass (task LDR-3.x) and do not change the five original columns.

Scope is the lesson 2 step only: a request or spec becomes a plan. Test and verification planning, how specs are written,
standards files, estimates, model tiers, and bundling or PR shaping are left out on purpose (see each product file).

## The grid

Each product row shows the one surface closest to the sample's flow (read the code, write a design, wait for approval, then
slice). Every product has other surfaces, each its own row in its file, and they differ; the counts further down cover all of them.
"Approval before work starts" uses only **Human**, **Human approves** or **Automated**, and only where a page says so. Names are
each product's own, not canonical.

| Product (surface shown) | Reads the code before proposing | Design output and form | Names reuse, risks or breaking changes | Approval before work starts | How it becomes tasks |
| --- | --- | --- | --- | --- | --- |
| [Devin](devin.md) (CLI Plan mode) | Yes: read-only tool set | Plan written to a file; heading and summary only documented | Not documented | **Human approves** | Not documented |
| [Factory](factory.md) (Spec Mode) | Yes: read-only until approved | Plan for review; optional Markdown file, no template | Only if the person asks | **Human approves** | Not documented; same session builds |
| [OpenHands](openhands.md) (planning agent, then execution agent; SDK example) | Yes: read and write-`PLAN.md`-only tools | `PLAN.md` to a fixed outline: objective, context, approach, steps | Partly: components, constraints, rationale | Not documented; example runs straight on | `PLAN.md` is the handoff; its step list only |
| [Cursor](cursor.md) (Plan Mode) | Yes: asks, then researches | Editable plan file; no template | Not documented | **Human approves** (Build click) | One plan, one Build; parallel for independent steps |
| [Copilot](copilot.md) (Plan mode in the IDE) | Yes: read-only research | Summary, steps, open questions; Markdown | Constraints named; reuse, breaking changes not documented | **Human approves** (Start Implementation) | Plan steps are the units; no task store |
| [Claude Code](claude-code.md) (Plan mode) | Yes: read-only until approved | Plan file you can edit; no required sections | Not built in; only if the prompt asks | **Human approves** | Not documented; same session edits |
| **This sample** (the upgraded plan skill) | Reads the repo first | Design with reuse and breaking changes | Names both | Waits for human approval | Then slices into tasks |

The "This sample" row is the target in the lesson 2 plan (`planning/lesson2-spec-to-plan/PLAN.md`): our own design, not a
sourced claim about anyone else.

## The depth grid

Twelve more dimensions for the same surface shown above, in the same product order. Each cell is a short pointer to the cell of
the same name in that product's file, under its "Depth dimensions" section. "Not documented" is the product file's own finding and
names the pages checked there. Read-only enforcement uses only **Tool restriction** or **Instruction only**, and only where the
page says which; otherwise the cell says so. Names are each product's own, not canonical.

**Clarify, assumptions, editing, saving, ordering, splitting**

| Product (surface shown) | Clarify or interview mode | Assumptions or open questions surfaced | Plan editable before approval | Where the plan is saved | Dependencies or ordering | Parallel split |
| --- | --- | --- | --- | --- | --- | --- |
| [Devin](devin.md) (CLI Plan mode) | Question tool; a `megaplan` keyword always asks at least one question | Not documented | Send back for changes; editing the file directly not documented | A file with a heading and summary; path not documented | Not documented | Not documented for plans |
| [Factory](factory.md) (Spec Mode) | Partly: may ask while researching; no interview step | Not documented | Reject and iterate; editing the text directly not documented | Optional Markdown file, off by default | Not documented | Not documented for the plan |
| [OpenHands](openhands.md) (planning agent, then execution agent; SDK example) | No interview step; the example task forbids questions | Not documented; the outline has no such part | Not documented; no approval point | `PLAN.md` in the workspace folder | Partly: ordered step list, no explicit dependencies | Not documented for the plan |
| [Cursor](cursor.md) (Plan Mode) | Yes: questions come first | Partly: questions yes, plan section not documented | Yes: edit the plan file, then Build | File in the home directory; "Save to workspace" moves it | Partly: Build in Parallel keeps order; how marked not documented | Yes: Build in Parallel |
| [Copilot](copilot.md) (Plan mode in the IDE) | Partly: questions arrive with the draft | Open questions yes; assumptions not documented | Yes, by conversation; editor view read-back not documented | Chat by default; Markdown via Open in Editor | Not documented | Not documented for the plan |
| [Claude Code](claude-code.md) (Plan mode) | Yes: multiple-choice question tool | Partly: questions yes, plan section not documented | Yes: `Ctrl+G` opens the plan in your editor | A file; `plansDirectory` moves it into the project | Not documented as a plan feature | Not documented for the plan |
| **This sample** (the upgraded plan skill; **target**) | Clarifies | States assumptions | Iterates until approved | Saved design linked from every task | Slicing rules, incl. add, migrate, remove | Named, not built |

**Re-planning, critique, read-only, tracker, human-only, rollout**

| Product (surface shown) | Re-plan after a blocked build | Second-model plan critique | Read-only enforcement | Tracker or ticket output | Human-only step flag | Rollout or rollback section |
| --- | --- | --- | --- | --- | --- | --- |
| [Devin](devin.md) (CLI Plan mode) | Not documented; `/plan` switches back, not described as a re-plan | Not documented for plans | **Tool restriction** | Not documented | Not documented | Not documented |
| [Factory](factory.md) (Spec Mode) | Not documented | No critique step; planning model is a choice | Not stated for the main session; real restriction only for subagents | Not documented | Not documented | Not documented |
| [OpenHands](openhands.md) (planning agent, then execution agent; SDK example) | Not documented; one planning run, one execution run | Not in the planning flow; optional separate tool | **Tool restriction** | Not documented | Not documented | Not documented |
| [Cursor](cursor.md) (Plan Mode) | By restart, not a documented step | Not documented | Mechanism not documented | Not documented | Not documented | Not documented; the Rollouts feature is a separate post-code artifact |
| [Copilot](copilot.md) (Plan mode in the IDE) | Not documented | Not documented | **Tool restriction**, as the page states it | Not documented | Not documented | Not documented |
| [Claude Code](claude-code.md) (Plan mode) | By hand, not a documented step | Not documented for the plan; advisor is session-wide | **Tool restriction** mostly; **Instruction only** in an interactive session with bypass available | Not documented | Not documented | Not documented |
| **This sample** (the upgraded plan skill; **target**) | Not in the target | Named, not built | Not in the target | Tasks to the queue; tracker sync named, not built | Flags human-only tasks | Not in the target |

The "This sample" rows are the target set in the depth-reset plan (`planning/lesson-depth-reset/PLAN.md` on branch
`docs/plan-lesson-depth-reset`, "Tier A (built and exercised)" and "Tier B (named, not built)"): our own design, not a sourced claim
about anyone else. Where the plan is silent on a dimension the cell says "Not in the target".

## CROSS-CHECK

Method: every row of every "The grid" table (37 surface rows, 5 cells each, 185 cells) and every row of every "Depth dimensions"
table (the same 37 surfaces, 12 dimensions each, 444 cells) in the six product files was parsed, 629 cells in all, and each cell
that says a thing is not documented was checked for the pages it names. Every file's method line names the docs index it listed
first (Devin `https://docs.devin.ai/llms.txt`, Factory `https://docs.factory.com/llms.txt`, OpenHands
`https://docs.openhands.dev/llms.txt`, Cursor `https://cursor.com/docs/llms.txt`, Copilot `https://docs.github.com/en/copilot`
plus `https://docs.github.com/llms.txt`, Claude Code `https://code.claude.com/docs/llms.txt`). The depth tables have six
dimension-by-surface blocks with no gaps: every surface carries all 12 dimensions.

### 1. Does every "not documented" cell name the pages checked?

422 of 629 cells carry a "not documented" statement (81 of 185 in the five-column grid, 341 of 444 in the depth tables). 418 name
the pages checked, in the form `(checked: ...)`. Four do not:

- Claude Code, "Session task list", How it becomes tasks: says whether the list comes from an approved plan is not documented, but
  names no pages. The row's other cells name Interactive mode, Tools reference and Agent SDK todo tracking.
- Claude Code, "Agent SDK plan mode", Approval: says it is not documented "as an approval label", but names no pages. The row's other
  cells name Agent SDK permissions, Handle approvals and user input, and Todo tracking.
- Devin, "Spec-first build session", Second-model plan critique: says "Not documented for the plan" with no pages named. The row's
  other "not documented" cells name Spec and First Session.
- Cursor, "Plan Mode", Re-plan after a blocked build: says whether a blocked build triggers a re-plan on its own is "not documented"
  with no pages named. The row's other "not documented" cells name Plan Mode, Plan mode help, Cursor Agent and Multi-agent help.

All four are fixable by adding a `(checked: ...)` list to those cells in the product files (`claude-code.md`, `devin.md`,
`cursor.md`). None changes an answer. Five more depth cells say the thing is "not stated" or "not described" instead, each with a
`(checked: ...)` list; they are not counted above: Devin "PRD to tickets" Parallel split, Factory "Spec Mode" Read-only
enforcement, OpenHands "Prompt-led planning" Read-only enforcement, Cursor "Ask mode" Read-only enforcement, and Cursor "Custom
subagents" Second-model plan critique. Where a depth cell's Sources column says "same pages", it points at the pages named in
that cell's own `(checked: ...)` list.

### 2. Blank counts

A **blank** is a cell that is wholly "not documented". A **partial** cell answers part of the column and says the rest is not
documented. Counts are over all surfaces of the product (rows in the file), not just the row shown above. Format: blank / partial.

| Product (surface rows) | Reads | Design | Reuse | Approval | Tasks |
| --- | --- | --- | --- | --- | --- |
| Devin (6) | 0 / 0 | 0 / 1 | 1 / 4 | 0 / 0 | 1 / 0 |
| Factory (3) | 2 / 0 | 1 / 0 | 1 / 2 | 0 / 0 | 1 / 1 |
| OpenHands (6) | 4 / 0 | 0 / 1 | 3 / 2 | 1 / 2 | 0 / 0 |
| Cursor (7) | 0 / 2 | 1 / 1 | 7 / 0 | 4 / 0 | 2 / 3 |
| Copilot (6) | 2 / 0 | 1 / 0 | 3 / 2 | 1 / 0 | 1 / 0 |
| Claude Code (9) | 1 / 0 | 1 / 4 | 7 / 2 | 3 / 1 | 3 / 1 |
| **All (37)** | **9 / 2** | **4 / 7** | **22 / 12** | **9 / 3** | **8 / 5** |

Not counted as blanks: OpenHands "Issue to Pull Request automation" design says "None" (the docs describe no plan there), and
Claude Code "Session task list" reads says "Not applicable" (bookkeeping, not exploration). Both are stated answers.

#### Depth dimensions

Counts are over the 444 depth cells, all surfaces. A cell is **wholly not documented** when, once its `(checked: ...)` list is
removed, only the "not documented" statement is left. It is **not documented, with other text** when a "not documented" statement
sits beside other text; that text can be a partial answer (for example "Partly: ...") or context that is not an answer, so this
column is a ceiling on how much is documented, not a count of answers. **Plain answer** cells contain no "not documented"
statement. **Not applicable** cells say so (for example, Cursor Ask mode produces no plan).

| Product (surface rows) | Plain answer | Not documented, with other text | Wholly not documented | Not applicable |
| --- | --- | --- | --- | --- |
| Devin (6) | 23 | 25 | 24 | 0 |
| Factory (3) | 7 | 27 | 2 | 0 |
| OpenHands (6) | 17 | 48 | 7 | 0 |
| Cursor (7) | 12 | 40 | 31 | 1 |
| Copilot (6) | 18 | 40 | 14 | 0 |
| Claude Code (9) | 22 | 44 | 38 | 4 |
| **All (37)** | **99** | **224** | **116** | **5** |

| Dimension (37 surfaces) | Plain answer | Not documented, with other text | Wholly not documented | Not applicable |
| --- | --- | --- | --- | --- |
| Clarify or interview mode | 12 | 21 | 3 | 1 |
| Assumptions or open questions surfaced | 2 | 17 | 18 | 0 |
| Plan editable before approval | 10 | 25 | 0 | 2 |
| Where the plan is saved | 21 | 12 | 3 | 1 |
| Dependencies or ordering between steps | 8 | 20 | 9 | 0 |
| Parallel split of independent work | 10 | 22 | 5 | 0 |
| Re-plan after execution is blocked | 3 | 27 | 7 | 0 |
| Second-model plan critique | 7 | 14 | 16 | 0 |
| Read-only enforcement | 18 | 18 | 0 | 1 |
| Tracker or ticket output | 4 | 26 | 7 | 0 |
| Human-only step flag | 2 | 11 | 24 | 0 |
| Rollout or rollback section | 2 | 11 | 24 | 0 |
| **All (444 cells)** | **99** | **224** | **116** | **5** |

Not applicable cells: Cursor "Ask mode" Plan editable; Claude Code "Built-in Explore and Plan subagents" Plan editable and Where the
plan is saved; Claude Code "Session task list" Clarify and Read-only enforcement.

### 3. Blanks against the docs index

Playbook rule: flag any blank for a product whose index lists a relevant page. Each file's "Ruled out (why)" list was read against
its blanks. Findings:

- **Factory: possible gap in the changelog.** The Factory file says the changelog was not searched for plan entries, so behaviour
  newer than the docs pages may be missing. This touches Factory's blanks for design detail, reuse and tasks. Devin's and Cursor's
  changelogs were searched; Factory's was not. Flagged for re-check.
- **Devin: the `!plan` playbook text is held in the app.** Devin's Linear row has no blank, but the gallery page says the
  playbook's contents are not on the docs pages, so what it must name (reuse, breaking changes) cannot be checked from the docs.
  The playbook authoring pages are ruled out as saying nothing about what a plan contains.
- **Claude Code: "Let Claude interview you"** in Best practices (question the person, write a `SPEC.md`) was ruled out as the
  intake lesson's topic. It bears on clarifying questions, not on any blank in this grid.
- **No other blank has a ruled-out page that plausibly fills it.** The ruled-out lists for OpenHands, Cursor, Copilot and
  Claude Code are standards files, review, verification, triggers, hosting, administration, pricing and model choice.

- **Depth pass, Cursor: the Rollouts page.** Cursor's Rollout or rollback dimension is wholly not documented on all 7 surfaces, yet
  the docs index lists a Rollouts page that writes a rollout plan as a pull-request comment. `cursor.md` read it and ruled it out as a
  post-code release artifact, not a section of the pre-code plan. The judgement is stated in the file; flagged because the lesson
  should not say "Cursor has no rollout plan" without that distinction.
- **Depth pass, Copilot: pages not fetched.** The VS Code planning page (linked from the IDE plan page) and the CLI pages on
  `/research`, Autopilot and steering were not fetched, so the IDE Plan-mode entries rest on the GitHub page alone, and the CLI pages
  may hold detail the cells lack. Flagged for re-check.
- **Depth pass, OpenHands: critique pages not fetched.** Critic and Iterative Refinement were ruled out on their index descriptions
  (they act on finished work), so OpenHands' second-model critique entries rest on that reading, not on a read page.
- **Depth pass, Claude Code: Checkpointing.** The re-plan entry cites the Best practices page for the rewind menu; the Checkpointing page itself was not opened.
- **Depth pass, Devin and Factory.** Devin's Jira, Dynamic Workflows and Devin Review pages were not re-read for the depth
  dimensions, and the Factory changelog flag above still stands (the depth pass did not re-open Factory's ruled-out pages).
- **No other depth blank has a ruled-out page that plausibly fills it.** The remaining depth-pass lists are standards files, review
  of finished code, triggers, hosting, model choice and estimates.

### 4. Comparing products against each other

- **Reuse is blank most often, and unevenly.** Five products have at least one page that advises the person to point the agent
  at existing patterns or files in the prompt (Devin, Factory, OpenHands, Copilot, Claude Code). Cursor has none: its reuse cell is
  blank on all 7 surfaces, though its Prompting agents page was read in full. Cursor's all-blank column is the largest contrast and
  the cell most worth re-checking before the lesson says it.
- **Claude Code and Cursor have the most surfaces and the most blanks** (9 and 7 rows). Some of those rows are not planning
  surfaces in the lesson's sense (Cursor's Ask mode and Cloud Agents API, Claude Code's session task list and Agent SDK), so their
  blank counts are partly an artefact of how many rows were recorded, not a weaker docs set.
- **Approval is consistent where a plan mode exists.** The shown surface for Devin, Factory, Cursor, Copilot and Claude Code is
  **Human approves**. OpenHands' SDK example has no stated pause, and its Software Factory and ready-for-dev surfaces are
  **Automated**. Surfaces started from a ticket or message are mostly **Human** (a person starts it; no plan gate is described).
- **Several "Human approves" cells rest on a prompt, not a product gate.** Devin's spec-first session, OpenHands' prompt-led
  planning and Devin's managed sessions (walkthrough) are approvals only because the example prompt says to wait. The files mark
  each as a prompt convention.
- **No product shows the sample's full set in one documented step.** Each shown surface has read-code and approval; none documents
  all of: design with reuse and breaking changes, approval, then slicing into tasks.
- **Task-slicing is documented mostly in other surfaces.** Devin (PRD to tickets, managed sessions), Factory (Missions), Copilot
  (CLI fleet, issue creation), Cursor (Projects) and Claude Code (`/batch`, agent teams) slice in separate surfaces from the shown
  plan mode; the shown plan modes either hand the plan to the same session or leave the split undocumented.

## Observations

Counts are the all-surface blank / partial counts from the cross-check. "Same / differs / mostly undocumented" is a judgement over
the six shown rows plus the other surfaces in the files.

| Column | Verdict | Blank / partial (of 37 rows) | Notes |
| --- | --- | --- | --- |
| Reads the code before proposing | **Same** | 9 / 2 | Every shown plan mode reads the code, usually read-only, before proposing. Blanks come from surfaces started by a ticket or a coordinator, not from plan modes. |
| Design output and form | **Differs** | 4 / 7 | A file or editable plan is common; fixed outlines are rare (OpenHands `PLAN.md`, Copilot summary-steps-questions). Most say no template is shown. |
| Names reuse, risks or breaking changes | **Mostly undocumented** | 22 / 12 | The widest gap. Reuse and breaking changes appear mainly when the person's prompt asks, or in an adaptable template (Copilot's planner agent). |
| Approval before work starts | **Same** in plan modes, **differs** elsewhere | 9 / 3 | Human approves in five of six shown plan modes. Differs for ticket-driven and automated surfaces. |
| How it becomes tasks | **Differs** | 8 / 5 | Shown plan modes mostly hand the plan to the same session. Splitting into tasks lives in separate surfaces (tickets, missions, fleets, `/batch`). |

For Dan, what relates to lesson 2 and what to later lessons:

- **Lesson 2 (this lesson):** reading the code before proposing (same everywhere), the approval gate before slicing (same in plan
  modes), and the design that names reuse and breaking changes (mostly undocumented, so the sample can show something the docs
  mostly leave to the prompt).
- **Lesson 2, handle with care:** "how it becomes tasks" differs widely, but the sample's step is just "slice as today"; the grid
  supports saying products slice in different places, not that one way is standard.
- **Later lessons:** prompt-convention approvals and the `!plan`-style playbooks touch the standards and instructions lesson;
  Missions, `/batch`, fleets and managed sessions (parallel sessions per work package) touch the unscheduled bundling lesson; and
  Devin's PRD-to-tickets and Claude Code's "interview you" touch the spec and intake lesson.

### Depth dimensions

Counts: "shown" is how many of the six shown surfaces (table above) document the dimension; "wholly" is the number of the 37 surfaces
whose cell is wholly not documented (see section 2). Facts are the product files' own; "common" and "rare" are judgements over those counts.

| Dimension | Shown (of 6) | Wholly not documented (of 37) | Verdict |
| --- | --- | --- | --- |
| Plan editable before approval | 5 let the person change it: 2 edit the plan itself (Cursor, Claude Code), 3 revise by conversation (Devin, Factory, Copilot); OpenHands has no approval point | 0 | **Common** |
| Read-only enforcement | 4 state a mechanism: **Tool restriction** (Devin, OpenHands, Copilot, Claude Code, which has one **Instruction only** exception); Factory and Cursor do not say | 0 | **Common**, but only the mechanism label differs |
| Clarify or interview mode | 5 (Devin, Cursor, Claude Code yes; Factory, Copilot partly); OpenHands none | 3 | **Common** |
| Where the plan is saved | 4 write a file by default (Devin, OpenHands, Cursor, Claude Code); Factory optional, Copilot chat unless opened in an editor | 3 | **Common** |
| Parallel split of independent work | 1 (Cursor); the other 5 do not document it for the plan | 5 | Lives mostly in other surfaces (10 plain answers across the 37) |
| Dependencies or ordering | 0 document marked dependencies; 2 partly (OpenHands step order, Cursor Build in Parallel) | 9 | **Mostly undocumented** |
| Tracker or ticket output | 0 | 7 | **Rare** in plan modes; 4 plain answers (Devin PRD to tickets, two OpenHands surfaces, Copilot issue creation) |
| Re-plan after a blocked build | 0 document a re-plan step; 2 by hand or restart (Cursor, Claude Code) | 7 | **Rare** |
| Assumptions or open questions | 0 document an assumptions part; 3 name open questions (Cursor, Copilot, Claude Code) | 18 | **Rare** |
| Second-model plan critique | 0 in the planning flow (OpenHands has an optional separate tool; Factory a planning-model choice) | 16 | **Rare** |
| Human-only step flag | 0 | 24 | **Rare**: 2 plain answers, Devin's red mark on a ticket and OpenHands' `HUMAN:` line on a pull request, neither a plan step |
| Rollout or rollback section | 0 | 24 | **Rare**: 2 surfaces state there is no such section (Devin Linear, Copilot planner agent) |

For the lesson, against the target row:

- **Expected in a plan mode (5 or 6 of 6):** reading read-only, a way to question the person, a way to change the plan, a saved file.
  The target does these.
- **Documented by at most one or two products:** parallel split, ordering, re-plan, open questions. The target names ordering and
  clarifying; parallel split is named, not built.
- **Documented by none of the shown surfaces:** assumptions as a plan part, second-model critique, tracker output, a human-only flag
  and a rollout section. The target flags human-only tasks and states assumptions, which no shown surface documents; that is a
  statement about what these docs say, not about what the products can do.

## Product files

- [Devin](devin.md)
- [Factory](factory.md)
- [OpenHands](openhands.md)
- [Cursor](cursor.md)
- [Copilot](copilot.md)
- [Claude Code](claude-code.md)
