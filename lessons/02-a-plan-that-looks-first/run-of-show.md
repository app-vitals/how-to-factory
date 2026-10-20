# Run of show: Lesson 2, A plan that looks first

The single filming sequence: slide range, then demo, then slide range. Slide numbers are 1-based positions in
[deck/index.html](deck/index.html). Every demo beat names the [script.md](script.md) step it performs. Unlike lesson 1,
this lesson runs things on camera: the opening loop run and the live self-extension are real runs, not build-only.

**Pre-filming:** work through [checklist.md](checklist.md). Run the loop on a small task and the plan skill on the
upgrade request once on a scratch repo, so you know what each produces. Re-check the as-of dates in
[options.md](options.md). Nothing for either demo is pre-queued in `factory/`.

| # | Slides | Demo beat | Script step | Notes |
|---|---|---|---|---|
| 1 | 1-4 | | 1 | Title, factory map (planning glows), what the human does (brief, approve design, review PRs), what we build (look, design, approve, slice). Say lesson 1 built the loop but ran nothing |
| 2 | 5 | DEMO run lesson 1's loop | 1 | Give the loop one small task (for example `greet(name)`) and run it. You may talk over the loop starting up. Nothing pre-queued. Show it pick the task, dev-task branch and work, and an open PR; a person reviews and merges. Say what to notice: a task goes in, a PR comes out, nobody typed the steps between |
| 3 | 6 | | 2 | "What a skimming plan gets wrong": rebuilds what exists, names files that are not there, breaks something nobody checked. The loop is only as good as its tasks |
| 4 | 7-8 | | 3 | Concept (understand, decide, approve, slice; input is a brief, output is tasks), then Understand (ask only what code cannot answer, explore, find reuse, place the change) |
| 5 | 9-10 | | 4 | The short design (approach, rejected, risks, breaking changes with consumers; say someone can say no before work exists), then the hard stop (a rejected design goes back to Design, no tasks yet). Say "in our demo we use a markdown skill; yours can be anything" |
| 6 | 11-13 | | 5 | How the field differs, three slides: reads code first and who approves (titled "All look first; most wait for approval"), reuse and risks ("No plan fully names reuse and risks"), becoming tasks ("Half hand the plan over as steps"). Marks and chips only. Say "not in their docs" for a "–", never "has none". Do not claim any product cannot do something. Takeaway: none documents design, approval and slicing in one step; ours is one way, not the standard. Links go in the video description |
| 7 | 14 | DEMO the factory plans its own upgrade | 6 | The live beat. Ask the existing factory to upgrade its plan skill so the design names risks and breaking changes with consumers and stops for approval before tasks. Show it skim, find reuse, propose a short design with a rejected alternative. It stops: point at no tasks existing. Read the design aloud and approve it. Not pre-queued |
| 8 | 15 | | 7 | After approval: slice into tasks that name real files; show those files exist. The loop runs dev-task on each; the PRs are the upgraded plan skill. A person reviews and merges. Presenter may talk over the loop running |
| 9 | 16-17 | | 7 | Why approve the design (say it is our opinion, not a standard), then how it works together. Slides only |
| 10 | 18-19 | | 8 | Names ("Same job, different names"; plan is this sample's name), then where factories take it (destinations described, not prescribed). Say what is out of scope: proving and test planning, how specs are written, a shared standards file, estimates and bundling. Each has its own lesson, order open; promise nothing |
| 11 | 20 | | 9 | Exercise hand-off: give your own planning step the same four behaviours, any agent and language |

Timing: the two demos are the variable parts. Keep the opening loop run short (talk over startup, cut when the PR
opens) and let the live beat run through the stop, the approval and the first slice.
