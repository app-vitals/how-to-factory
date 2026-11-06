# Lesson 5 deck flow cleanup: product spec

Deck: `lessons/05-see-what-the-factory-is-doing/deck/index.html`, plus the lesson docs that cite its slide numbers.

## Decisions

1. Views are not workflow steps. Remove every Web view / Upcoming page / Past page / Completed page / human page node from the flow diagrams. Views appear only in captions and bullets. Slide 3's human question nodes stay.
2. Slide 3 (three questions) stays. The Log answers them: filter to skipped, read the reason. `run-of-show.md` row 12 and the script payoff line change from Queue to Log.
3. Slide 4: four labelled boxes (Record, Queue, Log, History), no arrows. History is a store node.
4. Slide 5: Tick -> Pick or skip -> Run record. Caption: "One record. Queue, Log and History read it."
5. Stage slides stay for Record and History (two capabilities each). The Queue and Log stage slides (old 11 and 14) are dropped; capability slides keep a "Queue: ..." / "Log: ..." title prefix. Slide references are renumbered.
6. Slide 7 (Record stage): Outcome and Reason feed Run record. Slide 8 (A1) is the line; slide 9 (A2) is a reason on every run record.
7. Queue: pickable work only, oldest first, no reason column; no "Add reason" node. Blocked work is a later destination, not built.
8. The "Examples are illustrations, not product claims." caption appears once, on slide 8.
9. Lesson identity: keep the title and "explains itself" (After slide, exercise slide). One idea: every tick says what it did and why, so read the record before you debug the code.
10. History is read-only: A5 reads finished work from the task file; A6 links are a render helper.

## Out of scope

`factory/`; the sourced field-comparison slides (old 23-24) and their citations; `brief.md`, `README.md`, `options.md` keep describing the pages as deliverables.
