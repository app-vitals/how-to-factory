# Lesson 5 deck node roles: product spec

Deck: `lessons/05-see-what-the-factory-is-doing/deck/index.html`. Follow-up to `l05-deck-flow-cleanup`.

## Decisions

1. Node colors show who does the work. The factory (loop, a job node) picks work and hands the next item to the agent; picking is not an agent step.
2. Slide 4: `Record` is a store node. The outcome is the agent's output; it stays an agent node on slide 7.
3. Slide 5: Tick (job) -> Pick or skip (job) -> Agent (agent) -> Run record (store).
4. Slide 8 (A1): `Pick item` is a job node, with an `Agent` step before `Outcome`.
5. Slide 11 (A3): `Sort by pick` becomes `Sort by age`; the slide title already says oldest first.
6. Slide 16 (A5): `Restart` is not a flow step. The flow is Task file -> Finished only -> History. The restart stays in the title and bullets, which are the failure mode being prevented.
7. Sweep the rest of the deck for the same pick-as-agent coloring (slide 9, the exercise slide) and fix it.

## Out of scope

Renumbering slides, `factory/`, the field-comparison slides, and the restart beats in `run-of-show.md`, `script.md`, `exercise.md` and `checklist.md`.
