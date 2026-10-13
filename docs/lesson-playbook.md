# Lesson playbook

How we make a lesson in this repo. This is a process doc: it covers how to scope, research, compare, build and ship a
lesson. Where it describes lessons it stays tool-neutral. It names the Shipwright pipeline only in the work-queue
rules (section 7), because that is how this repo's work gets queued and merged. It states process rules and facts
about lesson 1 from this repo; it makes no claims about other products. Anything said about another product belongs
in a lesson's `options.md` or the [landscape](../landscape/README.md), with a first-party URL and an as-of date.

## 0. Scoping rule

Agreed at the start of the project, and it applies to every lesson:

- **Lesson 1** explains what `plan` and `dev-task` do, builds the most basic version of each live, and runs a simple
  loop that ends at open pull requests. A person reviews and merges.
- **Every later lesson adds ONE component to the loop that already exists** and ends with the loop doing a little
  more than it did before.
- **Each lesson stays about the size of lesson 1:** explain the thing, build the most basic version live, students
  build their own.
- **Lesson order stays open.** Lessons are chosen one at a time from the [backlog](../lessons/README.md).
- **`factory/` is our demo; lessons stay tool-neutral.** No required language, runner or agent. Concept first, then
  "in our demo we use...", then "yours can be anything".

## 1. The lesson brief

Before any work is queued, fill in [`lessons/_template/brief.md`](../lessons/_template/brief.md) and get it agreed.
One page. It holds:

1. **Component taught and band.** Which component from [`docs/components.md`](components.md), and which band.
2. **The one idea.** One sentence.
3. **Scope test.** Does a single agent need it for a single flow? If not, it is a destination: mention it, do not
   teach it.
4. **In scope / out of scope.** For each out-of-scope item, name the later lesson that owns it.
5. **The sample's concrete steps.** What the sample does, step by step.
6. **What the factory builds in this lesson.** The factory builds itself from lesson 2 on, so say which parts of
   `factory/` are written by the factory.
7. **Prerequisites.**
8. **Exercise outcomes.**
9. **Loop delta and size.** What does the loop do after this lesson that it could not before? Is this about the size
   of lesson 1?

## 2. Research protocol

Learned from building the field grid. For every vendor or product the lesson compares:

1. Read the vendor's docs index first and list the pages that could be relevant.
2. Read those pages in full, not just the search snippet.
3. Choose the surfaces that cover each concept. Several surfaces are allowed (for example a CLI and an IDE); name
   each one.
4. Record **Pages read** and **Ruled out (why)** for each product.
5. A cell may say "not documented" only after you have named the pages you checked.
6. Write per-product files first, then assemble the grid, then cross-check the grid against the per-product files.
7. Every claim carries a first-party URL and a fetch date.
8. Never reuse a competitor's marketing wording. Describe what the product does in our own words.

## 3. Comparison design

- Compare the lesson's own **inputs, steps and outputs**, plus **how human-in-the-loop** it is.
- Two or three simple columns per slide.
- Categorical answers are labels, not yes/no.
- Each matrix cell has a `short` text of at most 8 words; that is what the slide shows. Detail stays in the repo.
- The same vendors in the same order on every slide, plus a "This sample" row.
- One takeaway per slide.
- Names are a product's own term, never a docs page title. The column header matches the sample's component (for
  example Planning | Execution).

## 4. Deck outline and slide budget

Taken from lesson 1. The deck follows the rules in [CLAUDE.md](../CLAUDE.md) and
[`decks/DIAGRAMS.md`](../decks/DIAGRAMS.md).

1. Factory map with the taught component highlighted.
2. What the human does.
3. What we build.
4. Per piece: concept, how the field differs, demo.
5. Why (our opinion, said as opinion).
6. How it works together.
7. Names.
8. Destinations.
9. Exercise.

Budget: about 18 to 20 slides.

**Viewer-facing wording.** Slides and narration never say "matrix", "options.md", "sourced" or "not documented". A
blank cell reads "not in their docs".

## 5. Demo policy

Demos are build-only unless the lesson is about running: write the skill or the loop on camera and run nothing. Before
filming, run the skills and the loop once yourself on a scratch repo so you know they work and what they produce.

## 6. Exercise rules

Exercises list outcomes. They name no required tool, language or runner.

## 7. Work-queue rules

These apply to the Shipwright pipeline that queues and ships this repo's work.

- The brief is approved before any task is queued.
- Edit a queued task only while it is `pending`.
- Never edit merged PRs; fix forward in a new task.
- Chain tasks on the last pending editor of a shared file, so two tasks never edit the same file in parallel.
- Batch edits per file: one task per file or file group, not one per tweak.
- PRs authored by the agent identity or the second reviewer agent are reviewed and merged by the pipeline. Do not ask
  a person to merge them, and do not merge by hand, unless the pipeline has actually stalled on them.

## 8. Pre-filming checklist (definition of done)

The fill-in version is [`lessons/_template/checklist.md`](../lessons/_template/checklist.md). A lesson is done when:

- `bun scripts/check-decks.ts` passes.
- `bun scripts/check-landscape.ts` passes.
- `bun test` passes.
- A grep for the forbidden viewer-facing words (section 4) finds nothing in the deck or script.
- Every claim about another product has a first-party URL and an as-of date, and the dates are current.
- All links resolve.
- The demo has been run through once (section 5).
- The exercise has been run by someone following only the exercise text.

## 9. What lesson 1 taught us

- Scope was pinned late, so work was redone. The brief now comes first.
- The first research pass was shallow; the field grid had to be redone with the protocol in section 2.
- Some comparison columns were the wrong shape (yes/no instead of labels, columns that did not match the sample's
  component). Section 3 fixes that.
- One lesson drifted into a later lesson's territory. The in/out-of-scope list in the brief names the owner of each
  out-of-scope part.
- Names and column headers did not match: a docs page title was used as a product's term.
- Chains of tasks were serialized more than needed. Section 7 asks for chaining only on a shared file.
