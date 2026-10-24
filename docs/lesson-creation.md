# Lesson creation

Part of the [lesson playbook](lesson-playbook.md): what lesson 1 taught us and the order a lesson is created in. "Section N" below means section N of the playbook.

## 9. What lesson 1 taught us

- Scope was pinned late, so work was redone. The brief now comes first.
- The first research pass was shallow; the field grid had to be redone with the protocol in section 2.
- Some comparison columns were the wrong shape (yes/no instead of labels, columns that did not match the sample's
  component). Section 3 fixes that.
- One lesson drifted into a later lesson's territory. The in/out-of-scope list in the brief names the owner of each
  out-of-scope part.
- Names and column headers did not match: a docs page title was used as a product's term.
- Chains of tasks were serialized more than needed. Section 7 asks for chaining only on a shared file.
- Differs-slide cells were sentences even after the columns were fixed, and a fourth option wrapped onto a second row,
  because the deck check does not test layout. Sections 3 and 4 add the marks, chips and render rules.

**Lesson 2 (spec to plan).** Settled the shape that lesson 3 reuses. *From lessons 1 and 2, revisit after lesson 3.*

- The per-capability "concrete failure without it" requirement and the failure slide are gone. Each capability now says
  why it exists or what it prevents, with two illustrated examples.
- The capability table is grouped by stage, and the deck has a stage slide, then capability slides titled
  "Stage: capability" (sections 1 and 4).
- Slide count is guidance, not a target (section 4).
- A sketch review comes first (section 1): the brief, a stage slide and a capability slide, before the rest.
- Rework passes after the first build of lesson 2: three, counted from the git history. A depth reset (#120 to #137),
  a regroup by stage that deleted the failure slides (#139 to #145), and a per-task test line (#146 and #147). The
  sketch review exists to cut that number.

## 10. Lesson creation sequence

*From lessons 1 to 3, revisit after lesson 3.* The order a new lesson is created in. Each step links to the rule that
already says how; this section only fixes the order. The brief, research, comparison, deck, exercise and checklist rules
are in sections 1 to 8 and are not repeated here.

1. **Pick the component and state the topic.** Choose the component from [`lessons/README.md`](../lessons/README.md)
   (scoping rule, section 0). State the topic to Dan as an assumption, so approval confirms it.
2. **Plan the lesson.** Run plan-session with a session slug (for example `lesson3-verification`) and a free 2 to 3
   letter task prefix. Check the task store for prefixes in use first. Queue lesson material only (section 7).
3. **Research before the brief** (protocol in section 2):
   1. Inventory what Shipwright does for the component, and why for each capability.
   2. One research task per product, for each of the six products.
   3. Assemble the grid and cross-check it against the per-product files.
   4. Add the component's depth dimensions to `landscape/matrix.json`.
   5. Rank the capabilities on expected, common and crucial.
4. **Brief, then options.** Write the brief from the ranking (section 1), get it approved, then write the options from
   the grid (section 3).
5. **Sketch review.** Dan reviews the brief, one stage slide and one capability slide before anything else is written
   (section 1).
6. **Build the lesson.** Deck (section 4), script, exercise (section 6), run-of-show and the lesson README.
7. **Filming checklist.** Fill in the checklist (section 8) and do the demo run-through (section 5).

### Task-chain template

Chain only on a shared file and batch per file or file group (section 7). Ids use the session prefix; the numbers below
are a template, not a fixed list.

| Task | Title | Depends on |
|---|---|---|
| `<P>-1.1` | docs: inventory Shipwright capabilities for the component | none |
| `<P>-1.2` to `1.7` | docs: research one product each (six tasks, parallel) | none |
| `<P>-1.8` | docs: assemble the grid with a cross-check | `1.2` to `1.7` |
| `<P>-1.9` | feat: add the depth dimensions to the landscape matrix | `1.8` |
| `<P>-1.10` | docs: rank capabilities on expected, common and crucial | `1.1`, `1.8` |
| `<P>-1.11` | docs: lesson brief | `1.10` |
| `<P>-1.12` | docs: lesson options from the grid | `1.11`, `1.9` |
| `<P>-2.1` | docs: sketch (brief, one stage slide, one capability slide), then Dan's review | `1.11`, `1.12` |
| `<P>-2.2` | docs: deck | `2.1` |
| `<P>-2.3` | docs: script and lesson README | `2.1` |
| `<P>-2.4` | docs: exercise, run-of-show and checklist | `2.2`, `2.3` |

### Worked examples

- [`planning/lesson2-spec-to-plan`](../planning/lesson2-spec-to-plan/PLAN.md): the first lesson built on this shape.
- [`planning/lesson-depth-reset`](../planning/lesson-depth-reset/PLAN.md): the rework that moved research ahead of the
  brief.
- [`planning/lesson3-verification`](../planning/lesson3-verification/PLAN.md): research first, then the brief, built
  from the start in this order.
