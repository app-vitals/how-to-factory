# Run of show: Lesson 2, A plan that looks first

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html) (35 slides). Every demo beat names the [script.md](script.md) step it performs, and
the time column is that step's estimate from the script's running time table. Unlike lesson 1, this lesson runs things
on camera: the opening loop run and the live self-extension are real runs, not build-only.

**Pre-filming:** work through [checklist.md](checklist.md). Run the loop on a small task and the plan skill on the
upgrade request once on a scratch repo, so you know what each produces. Re-check the as-of dates in
the field comparison file ([options](options.md)). Nothing for either demo is pre-queued in `factory/`.

| # | Slides | Demo beat | Script step | Time | Notes |
|---|---|---|---|---|---|
| 1 | 1-4 | | 1 | 5 min (with row 2) | Title, factory map (planning glows), what the human does (brief, approve design, review PRs), what we build (look, design, approve, slice). Say lesson 1 built the loop but ran nothing |
| 2 | 5 | DEMO run lesson 1's loop | 1 | (in row 1) | Give the loop one small task (for example `greet(name)`) and run it. You may talk over the loop starting up. Nothing pre-queued. Show it pick the task, dev-task branch and work, and an open PR; a person reviews and merges. Say what to notice: a task goes in, a PR comes out, nobody typed the steps between. Cut when the PR opens |
| 3 | 6 | | 2 | 2 min | "What a skimming plan gets wrong": rebuilds what exists, names files that are not there, breaks something nobody checked. The loop is only as good as its tasks |
| 4 | 7 | | 3 | 3 min | Concept: look, design, approve, slice. Input is a brief, output is tasks. Three groups: Understand, Decide, Slice. Say what is left out on purpose; it is named again in row 12 |
| 5 | 8-14 | | 4 | 15 min (rows 5-7) | The short design first (slide 8: approach, rejected, risks, breaking changes with consumers; someone can say no before work exists). Then Understand, a concept slide and a failure slide each: 1 clarify and assumptions (9-10), 2 layered exploration and reuse (11-12), 3 complexity risks (13-14). Per capability: concept, why, failure, build; close with "in our demo we use..." and "yours can be anything". Say each failure is an _(illustration)_ |
| 6 | 15-20 | | 4 | (in row 5) | Decide: 4 breaking-change scan (15-16), 5 saved design linked from every task (17-18), 6 hard approval before tasks (19-20). For 6, say the reason is likely and not every source states it |
| 7 | 21-26 | | 4 | (in row 5) | Slice: 7 add, migrate, remove (21-22; the failure is also constructed for the lesson, say so), 8 queue awareness (23-24), 9 human-only task flag (25-26). 1, 2, 3, 4, 6 and 7 are built live in row 9; 5, 8 and 9 are shown as finished output in row 10. If the cut runs long, trim the finished-output capabilities (5, 8, 9) to one minute each; never the live beat |
| 8 | 27-30 | | 5 | 5 min | How the field differs, four slides: reads code first ("All six read the code first"), approval ("Most wait for approval; OpenHands does not say"), saved plans and reuse ("Plans are saved; reuse and risks are rare"), slicing and order ("Slicing and order vary most"). Marks and chips only. Say "not in their docs" for a "–", never "has none". Do not claim any product cannot do something. Name the surface with the product. Queue awareness and person-only tasks are not in the grid: say so. Takeaway: none documents design, approval and slicing in one step; ours is one way, not the standard. Links go in the video description |
| 9 | 31 | DEMO the factory plans its own upgrade | 6 | 10 min | The live beat. Say out loud that nothing is pre-queued and no plan session queued this. Ask the existing factory to upgrade its plan skill so the design names risks and breaking changes with consumers and stops for approval before tasks. Show it list the queue, ask only what code cannot answer, state assumptions, explore by layer and note reuse, flag risks, scan consumers, and propose a short design with a rejected alternative. It stops: point at no tasks existing. Read the design and assumptions aloud and approve it |
| 10 | 32 | | 7 | 8 min | After approval: slice into tasks that name real files; show those files exist, and that each says whether it is safe to deploy alone and carries a dependency line. The loop runs dev-task on each; the PRs are the upgraded plan skill. A person reviews and merges. Then walk the finished output for capabilities 5, 8 and 9 (design path on every task, the queue read and a skipped duplicate, a task flagged for a person). Presenter may talk over the loop running |
| 11 | 33 | | 8 | 3 min (rows 11-12) | Names ("Same job, different names"; `plan` is this sample's name) |
| 12 | 34 | | 8 | (in row 11) | Where factories take it (coordinator, tracker, task list, check): destinations described, not prescribed. Say what is out of scope: per-task test planning, how specs are written, a shared standards file, bundling, scoring and model tier, and the other later items. Each has its own lesson, order open; promise nothing |
| 13 | 35 | | 9 | 2 min | Exercise hand-off: give your own planning step the same behaviours, any agent and language. Outcomes only, no required tool |

Timing: about 53 minutes in total, matching the script. The two demos are the variable parts. Keep the opening loop run
short (talk over startup, cut when the PR opens) and let the live beat run through the stop, the approval and the first
slice.
