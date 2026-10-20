# Script: A plan that looks before it slices

Narrated by Dan over the slides (face cam in a screen corner). Slides carry labels; this file carries the words.
Every demo beat in the run-of-show points at a numbered step here.

Framing rule: the concept first (tool-neutral), then "in our demo we use...", then "yours can be anything". Bun and
Claude Code are our demo choices, never requirements. Nothing for the live beat is pre-queued in `factory/`: the factory
is asked, plans it, and builds it during the run.

## Talking points

1. **Follow-up: run lesson 1's loop for real.** Open by saying lesson 1 built the loop but ran nothing; now we run it.
   - **DEMO.** Give the loop one small task, for example "add a `greet(name)` function", and run it. This is narration
     over a real run: the presenter may talk over getting it running, and nothing is pre-queued in `factory/`. Show the
     loop pick the task, dev-task branch and work, and an open PR at the end. A person reviews and merges, as before.
   - Say what the viewer should notice: a task goes in, an open PR comes out, and nobody typed the steps in between.
2. **What is missing.** The loop is only as good as the tasks it is fed. Lesson 1's plan slices straight from a
   conversation. Ask what happens when the plan has not looked at the code: tasks that rebuild what exists, name files
   that are not there, or break something nobody checked.
3. **Concept: look, design, approve, then slice.** Tool-neutral. Inputs are a brief or a conversation; the output is
   tasks. Three new steps sit in front of slicing.
   - **Understand:** ask only what the code cannot answer, explore the repo, find what can be reused, decide where the
     change goes.
   - **Decide:** write a short design and name risks and breaking changes with their consumers. Research only when
     something is unclear.
   - **Approve:** a human approves the design before any task is written. This is a hard stop, not a suggestion.
4. **What the design holds.** Show the design slide: approach, rejected alternatives, risks, and breaking changes with
   their consumers. Say it is short, and that the point of naming consumers is that someone can say "no, that one is
   used elsewhere" before work exists.
   - In our demo we use a markdown skill, [`factory/skills/plan/SKILL.md`](../../factory/skills/plan/SKILL.md).
   - Yours can be anything: a pasted prompt, a planning mode, a person.
5. **How the field differs** (slides, sourced and dated in [options.md](options.md)). Say only what the cells say.
   - Reading the code first: Devin, Factory, Copilot, OpenHands, Cursor and Claude Code each document a planning surface
     that can look at the code before it proposes; the surfaces differ (a read-only mode, a planning agent).
   - Naming reuse, risks or breaking changes: most pages do not say the plan must. Say "not in their docs" where the
     cell says so.
   - Approval: Devin, Factory, Copilot, Cursor and Claude Code document a human approving before work starts; OpenHands'
     example does not.
   - Becoming tasks: the shown plan modes mostly hand the plan to the same session; splitting into tasks lives on other
     surfaces. Do not claim any product cannot do something; the sources only say what they document.
   - Takeaway: products slice in different places, and no product in the grid documents all of design, approval and
     slicing in one step. Ours is one way, not the standard.
6. **DEMO the factory plans its own upgrade of the plan skill.** The live beat. The existing factory, the one built in
   lesson 1, is asked to upgrade its own plan skill to look first. Nothing is queued in `factory/` ahead of time.
   - Ask: "upgrade the plan skill so it explores the repo and writes a design before it writes tasks."
   - Show the current plan skill run: it explores the repo, finds what to reuse, and writes a short design with an
     approach, a rejected alternative, risks, and what could break and who depends on it.
   - It stops. Point at the stop: no tasks exist yet.
   - Read the design out loud and approve it. This is the human step the lesson is about.
7. **After approval: slice, then the loop builds it.** The plan slices the approved design into tasks that name real
   files. Show that the tasks point at files that exist. The loop runs dev-task on each, and the PRs are the upgraded
   plan skill. A person reviews and merges. The upgrade is the factory's own work, planned and built in this run, not
   queued by a plan session.
   - Yours can be anything: the same order works with any agent and any runner.
8. **Names, and where factories take it.** `plan` is only this sample's name; other factories say Plan mode, Spec Mode
   or planning agent (from [options.md](options.md)). Destinations, described not prescribed: a coordinator that splits
   a plan and runs pieces in parallel, tracker tickets as the output, a check standing in for the approval. Say what is
   deliberately out of scope: proving and test planning, how specs are written, a shared standards file, and estimates
   or bundling. Each has its own lesson, order open; promise nothing.
9. **Exercise.** The [exercise](exercise.md) has you give your own planning step the same four behaviours, with an agent
   and language of your choice.

## Names for this

Say out loud: the names in this lesson are the names used in this sample. Other factories call the step Plan mode, Spec
Mode or a planning agent. Students can call theirs anything.
