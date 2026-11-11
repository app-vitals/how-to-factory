# Lesson 6 overlap map: what lessons 1 to 5 already teach about review and patch

Internal planning doc (LRV-1.2). Input to the lesson 6 brief. Not published in the lesson.

Sources, all read on main: `lessons/01..05` (brief, script, deck, checklist, exercise), `factory/skills/review/SKILL.md`,
`factory/skills/patch/SKILL.md`, `factory/pr-state.ts`, `factory/pr-attempts.ts`, and the callers in `factory/candidates.ts`
and `factory/loop.ts`. Lessons 1, 2 and 5 teach nothing about review or patch internals (lesson 1 names "no automated
review" as missing, lesson 5 only explains the reasons lesson 4 produced), so every "taught" or "stub" cell below comes
from lesson 3 or 4. Slides are cited by title because the decks carry no slide numbers; script slide numbers are given
only where the script states them.

Key: **taught** = a lesson builds or explains it. **stub** = touched briefly or in stub-skill form, or only half of the
idea. **new** = no lesson covers it.

## Tier A candidates

| Candidate | Status | Lesson evidence | Factory evidence (what it already does) |
|---|---|---|---|
| Grading and threshold | new | Lesson 4 names it and hands it off: `lessons/04-the-loop-reads-prs/brief.md` Out of scope, line 52 ("finding grading, inline comments, posting policy ... owned by the review lesson"). No lesson grades findings. | None. `review/SKILL.md` step 4 reports "only problems you can point to, with the file and line"; step 5 is binary (approve with no findings, else request changes). No severity, no threshold. |
| Repo-rules judgment | new | Lesson 3 hands off "testing principles used as review criteria" to the review lesson (`03-done-means-checked/brief.md` line 65); lesson 4 hands off "reviewing against principles" (`04-the-loop-reads-prs/brief.md` line 52). Neither teaches it. | None. `review/SKILL.md` steps 3 and 4 judge against the task's `acceptanceCriteria`, `description` and stated scope only; no read of repo rules files. |
| Mechanical verdict | stub | Format only: A8 "The review leaves a verdict the loop can read", a plain `APPROVED` or `FINDINGS` comment naming the head commit (`04.../brief.md` line 128; `04.../script.md` line 80; deck slide "See: the review leaves a readable verdict"). How the verdict follows from the findings is not taught. | `review/SKILL.md` step 5: no findings means `--approve`, any finding means `--request-changes`. On a shared `gh` login it posts `--comment` starting `Verdict: APPROVE` or `Verdict: CHANGES`. `pr-state.ts` line 100 reads `reviewDecision === "changes_requested"` to choose patch. |
| Verifier pass | new | Nearest is lesson 3 capability 4, a fresh agent checking the builder's work against criteria and diff (`03.../brief.md` line 142; `03.../script.md` lines 115-122; deck "Check: a fresh agent marks the criteria"). That verifies a build, not a reviewer's findings. | None. `review/SKILL.md` posts exactly one review; "Out of scope: multi-angle or parallel review" (line 35). |
| Diff-only re-review | stub | The trigger is taught: a patch moves the head, the old verdict expires, review again (A6, `04.../brief.md` line 132; `04.../script.md` line 92; deck "Reassess: a patch means review again"). Scoping the re-review to what the patch changed is not taught. | Trigger yes: `pr-state.ts` rule 4 reviews when `headSha !== reviewedSha`; `pr-attempts.ts` line 74 stores `reviewedSha` only on a successful review. Scope no: `review/SKILL.md` step 1 always reads the full `gh pr diff`. |
| Verify-then-fix | new | Lesson 4 hands "how a finding becomes a commit" to the patch lesson (`04.../brief.md` line 56). Lesson 3's red-first and fix-loop steps apply to building, not to checking a review finding is real (`03.../brief.md` lines 139-141). | None. `patch/SKILL.md` step 2 lists comments, step 3 fixes all three kinds in order, with no step that checks a finding before acting. Step 4 only verifies after (tests, typecheck, lint). |
| Reject and settle | new | Lesson 4 hands "a second-round disagreement" to the patch lesson (`04.../brief.md` line 56). | None. `patch/SKILL.md` step 3 fixes every unresolved comment; the only pushback is step 4's "if a test is wrong, say why in the report". No way to decline a finding or close a thread. |
| CI triage | stub | Red CI routes to patch (A4, `04.../brief.md` line 130; deck "Decide: findings, red CI or conflict, patch"). Lesson 3 gives the fix loop (log plus a history of earlier attempts, then a cap, `03.../script.md` lines 93-98) and "a flaky test is flagged for a person instead of skipped" (line 110, labelled illustration). Reading CI logs and rerunning cancelled CI are handed to the patch lesson (`04.../brief.md` line 56). | Partial. `patch/SKILL.md` step 2 reads `gh pr checks` and `gh run view <id> --log-failed`; step 4 forbids weakening, skipping or deleting tests. No sorting of failures into flaky, infra or real. |
| No-progress convergence | stub | The round cap and flag-a-person are taught (A7, `04.../brief.md` line 133; `04.../script.md` line 95; deck "Stop: cap the rounds, flag a person"). Lesson 3 supplies the history of earlier attempts and bounded fix loop (`03.../brief.md` line 78). Detecting that rounds are not changing anything (same finding returns) is not taught. | Cap yes: `pr-attempts.ts` `MAX_PR_ATTEMPTS = 3` (line 8), `exceeded` sums reviews and patches (line 82), `flagForHuman` adds the `needs-human` label and one comment (lines 84-98); `pr-state.ts` rule 1 skips labelled PRs; `candidates.ts` line 49 and `loop.ts` line 126 call it. Progress check no: it counts attempts, not whether findings repeat. `patch/SKILL.md` line 73 leaves the limit to the loop. |

## Not re-taught

Paste into the lesson 6 brief: lesson 6 must not re-teach these.

- The loop's three outcomes per PR (review, patch, wait for a human) and the routing rules behind them (lesson 4 A3 to A5).
- Reading PR state live from GitHub each tick, and skipping drafts and the agent's own PRs (lesson 4 A1, A2).
- Review, patch, review: a patch moves the head, so the PR is reviewed again (lesson 4 A6).
- The round cap and the `needs-human` flag, including that a flagged PR is skipped (lesson 4 A7; `pr-attempts.ts`).
- Why a reviewer on the author's own login posts a plain comment, not a formal approval (lesson 4 A8; `lessons/04.../checklist.md` lines 47-52).
- Red-first tests, the evidence table, the bounded fix loop with log and attempt history, and "never weaken a test to get green" (lesson 3 capabilities 1 to 3).
- The idea that a check is only as strong as its independence from the builder, and the fresh-context check as the example (lesson 3, slide 5 ladder, capability 4).
- CI as the arbiter, made binding by a branch-protection rule set once per repo (lesson 3 G1).
- Why the field comparison is "not documented", never "no product has one" (lessons 3 and 4 briefs).

## Reuse by reference

Vocabulary and slides lesson 6 can point back to in one sentence.

- **Per-commit verdict:** a verdict names the head commit it covers and expires when the head moves (lesson 4, slides "See: the review leaves a readable verdict" and "Decide: no verdict on the head, review").
- **Review-patch-review:** lesson 4, slide "Reassess: a patch means review again".
- **Round cap:** lesson 4, slide "Stop: cap the rounds, flag a person"; the lesson 6 no-progress rule extends it, so say "the cap is the backstop".
- **Independence of the check:** lesson 3's one idea and the ladder on slide 5 (`03.../script.md` line 72); the review is a second checker, and a verifier pass is the same idea applied to the reviewer.
- **Fresh context:** lesson 3, slide "Check: a fresh agent marks the criteria" (reviewer sees criteria and diff, not the build).
- **Evidence table and MET / PARTIAL / NOT MET:** lesson 3 capability 2 and 4; reuse the marks when findings cite criteria.
- **Fix loop with log and earlier attempts, then a cap:** lesson 3, slide "Run: the repo's checks and an evidence table", the base for CI triage.
- **Tier A / Tier B split, stage slide plus one slide per capability, "Examples are illustrations" caption:** lesson 2 pattern, reused by lessons 3 and 4.
- **Stage vocabulary See, Decide, Reassess, Stop:** lesson 4, slide "Loop: see, decide, reassess, stop".
- **Stub skills:** lesson 4 built review and patch as stubs; lesson 6 replaces the stubs, so say "the stubs from lesson 4 become real here".
- **Three questions (no PR, no review, no patch):** lesson 5, slide "Three questions the loop cannot answer"; lesson 6's new states should show up as reasons in the Log.
