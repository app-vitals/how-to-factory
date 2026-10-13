# Lesson deck rules and diagram vocabulary

Every lesson ships a deck (`lessons/<lesson>/deck/index.html`) that the presenter talks over on video, mixed with live
demos. The deck is a single HTML file using `decks/deck.css` and `decks/deck.js`. Start from `decks/_template/index.html`
(it shows every pattern below). Open any deck with `?guides` (or press `g`) to overlay the face-cam safe zone.

`scripts/check-decks.ts` enforces the rules below in CI. All limits live in `decks/deck.config.json`.

## Why the rules exist

The presenter narrates, so on-screen text is labels and keywords, never a transcript.

- Mayer's multimedia principles, as summarized by Lucidea: coherence (exclude extraneous material), signaling (cues that
  highlight the organization), segmenting (small chunks), redundancy (graphics + narration beats graphics + narration +
  on-screen text). <https://lucidea.com/blog/mayers-12-principles-of-multimedia-learning>
- UC San Diego presentation guidance: at most four bullets per slide with at most four units of information each, and if
  an image can represent the content, use it with no on-screen text.
  <https://multimedia.ucsd.edu/best-practices/presentation-design.html>

**The defaults below are deliberately stricter than those sources, and they are tunable in `decks/deck.config.json`.**
They are guidelines from general presentation research, not video-specific findings.

## Text rules (checked)

| Rule | Default | Config key |
|---|---|---|
| Bullets per slide | 3 | `maxBullets` |
| Words per bullet | 8 | `maxBulletWords` |
| Words in a slide title | 8 | `maxTitleWords` |
| Prose paragraphs on content slides | none (a `p.caption` of up to 12 words is allowed) | `maxCaptionWords` |
| Visual blocks (`.visual`) per slide | 2 | `maxVisualBlocks` |
| Content slides without a visual | not allowed (title and DEMO slides are exempt) | `visualExemptKinds` |
| Forbidden viewer-facing words (case-insensitive, whole phrase, visible slide text only; comments, scripts, styles and attributes are ignored) | `matrix`, `options.md`, `sourced`, `not documented` | `forbiddenWords` |
| Face-cam safe zone (bottom-right) | 22% wide x 30% tall, kept clear | `safeZone`, `--facecam-w`, `--facecam-h` |

One idea per slide. Word counts exclude table cells, code and text inside diagram nodes.
Mark a slide's type with `data-kind="title|content|demo|exercise"` (default `content`).

## Diagram rules (checked)

Diagrams carry the content: at most 8 nodes (`maxDiagramNodes`), node labels of at most 3 words
(`maxNodeLabelWords`), one diagram per slide (`maxDiagramsPerSlide`), one question per diagram. Inline SVG or HTML/CSS
only; no diagram libraries. Mark the diagram element with `data-diagram` and every node with class `node`.

## Vocabulary: when to use each

1. **Flow / pipeline** (`.flow` with `.arrow`): sequential stages.
2. **Loop / cycle** (SVG): feedback, or a scheduled loop.
3. **Architecture diagram**: how components connect, at C4 zoom levels: context first, then containers; component level
   only when a lesson needs it; skip the code level. <https://icepanel.io/blog/what-is-the-c4-model>
4. **Swimlane / sequence**: handoffs between human, agent, task store and GitHub.
5. **Layered stack** (`.grid-stack`): things that sit on top of each other.
6. **Comparison table** (`.comp-table`) and **options grid** (`.options-grid`, "pick this if"): how other factories do it.
   - **Marks and chips, not sentences.** Comparison cells hold only a mark (✓ yes, ✗ no, ◐ partly, – not in their docs),
     a chip label from the landscape matrix's `chip` field (e.g. Check, Model, Schedule + Event) or a short own-term name
     (at most 3 words). No sentences or parenthetical qualifiers; those stay in `options.md` and the script.
   - **Header and legend.** Header column 1 reads `Checked MM/YYYY`, the month and year of the latest `asOf` among the
     table's cells (the data keeps ISO dates). A table that uses marks gets a one-line `.legend` under it:
     `✓ yes  ✗ no  ◐ partly  – not in their docs`.
   - **Takeaway titles.** Title states what to notice (at most 8 words) and is checked against the chips before it ships.
   - **Adaptive options grid.** `.options-grid` uses `repeat(auto-fit, minmax(8em, 1fr))`, so 1-4 boxes share one row at
     any option count (at most 4). Each box is a short heading plus one short phrase, no repeated text.
7. **2x2 matrix** (`.matrix`): trade-offs between two axes.
8. **Before / after** (`.ba`).

Also available: stat tiles (`.stat-tiles`), the DEMO cue (`data-kind="demo"`, one large label only) and the exercise slide.

## One legend, every deck

| Kind | Class | Style |
|---|---|---|
| Human | `node-human` | pill, amber |
| Agent | `node-agent` | rounded box, green |
| Store / queue | `node-store` | tall-radius box, blue |
| External service | `node-external` | dashed grey |
| Scheduled job | `node-job` | thick left bar, violet |

Include the `.legend` strip on any diagram where more than one kind appears.

## The factory map

One architecture diagram of the whole factory reappears in every lesson with the component being taught highlighted
(signaling). Previously built components are solid (`is-built`), the current one glows (`is-active`), later ones are
faded (`is-planned`). Later lessons grow the map by adding nodes (keep within 8; split into containers if it grows).

Node labels use the component names from [docs/components.md](../docs/components.md) (Intake, Planning, Execution,
Verification, Review, Release, Loop, Chat). The grid reads left to right in the doc's bands: work in (Intake, Planning),
work done (Execution, Verification, Review, Release), keeps it moving (Loop, Chat); the grouping is by order only, with no
extra CSS or diagram pattern. Governance, feedback and memory support every node, so they are not nodes: a caption of at
most 12 words says so ("Governance, feedback and memory support all of these."). Skill names from the sample (Plan,
Dev-task) belong on the build-flow slide, not the map.
