# Anthropic code review article: verified claims for lesson 6

- **Source:** "How the Claude Code team does code review", claude.dev Blog, by Addy Osmani, Morgan Westlee Lunt and Qing Wang. Published Oct 15, 2026.
- **URL:** https://claude.dev/blog/solving-code-review-at-anthropic/
- **Fetched:** 2026-11-11, raw HTML via `curl` (HTTP 200, about 219 KB), tags stripped to text and read in full. Not a model summary.
- **Method:** each figure below was searched for in the stripped page text. "Location" names the article section and, where it applies, the Fig. that carries the number. Short quotes only; everything else is our own wording.

## Verification table

| # | Claim to check | Result | Location | What the article says (short quote / own words) |
|---|---|---|---|---|
| 1 | Substantive review comments 16% to 54% of PRs | **verified** | "2. AI review on every pull request" | Quote: "went from 16% to 54%". It is the share of internal PRs getting substantive comments, measured when the research preview launched. |
| 2 | Passing after one review and fix round 65% to 78% | **verified** | "How we make the reviewer better", Fig. D | 65% before, 78% after the convergence work. Internal PRs. |
| 3 | Five or more rounds 8.9% to 1.5% | **verified** | same, Fig. D | 8.9% before, 1.5% after. |
| 4 | Mean reviews to pass 2.08 to 1.32 | **verified** | same, Fig. D | 2.08 before, 1.32 after. |
| 5 | One PR over 50 rounds | **verified** | same, "Review has to converge" | One CLI PR went through "more than fifty rounds" of review and fixes overnight until its author stopped it. Say "more than 50", not "exactly 50". |
| 6 | 59% of repeated findings on pre-existing code | **verified, with a wording caveat** | same | Running `git blame` on what the reviewer kept flagging, "about 59%" was code present since the reviewer's first pass. Say "about 59% of what it kept flagging was old code". It is not stated as a share of "repeated findings" in those words. |
| 7 | Round cap of 3 | **verified** | same, list of re-review changes | After three rounds the reviewer asks the author to step back and rethink the approach. The cap hands control back to the author; it does not stop the loop by itself. |
| 8 | Diff-only re-review after the first rounds | **verified** | same; also "How you can adopt this process" | "Diff-only re-review after the first few passes." Adoption list: after the first few, re-review only the new diff. |
| 9 | Flag bug classes, not lines | **verified** | same | Flag the class of bug so the author fixes every instance, not one line. |
| 10 | No repeated findings | **verified** | same | No repeats of findings already posted. |
| 11 | The review guidance file | **verified** | "1. The work is verified...", "How you can adopt this process" | `REVIEW.md`, written by code owners, tells the reviewer what matters in their part of the code. Good ones are short, name what failure looks like, cap nits, list paths to skip and ask for file-and-line evidence. They also check separately that the reviewer follows it. `CLAUDE.md` is the project-level companion that every review loads. |
| 12 | Incident eval set scored daily | **verified** | "How we make the reviewer better", Fig. C | Past incident and revert PRs, each bug confirmed by engineers who know the code, form the set. The reviewer runs against it daily and every reviewer change is scored against all of it. |
| 13 | Risk-tiered human approval | **verified** | "5. Human approval, scaled by risk" | Three tiers: low needs no person once automated review and security checks are green, medium one person, high two. The change sets the tier, not the author. Only authors on a trusted list get the lighter paths. |
| 14 | Agent approval never counts as human approval | **verified** | same | Quote: "An agent's approval never counts as a person's". Automated review can clear a low-risk change but cannot fill a slot that needs a human. |
| 15 | The merge queue | **verified** | "6. Merge queue, flags and a gradual release" | The queue re-runs every check against main with the change applied, so two PRs that pass separately cannot combine into a broken main. |

All 15 items were found on the page. **Not to be used: none outright.** Two need the wording care noted in rows 5 and 6.

## Context that affects how we use the numbers

- The figures are Anthropic's own internal PRs on the Claude Code repos; they are not a benchmark and not about any other product. Present them as "one team reported".
- Row 1 describes the launch of the research preview. Rows 2 to 4 compare "before" and "after the convergence work"; the article gives no dates or sample sizes for either side.
- The article's headline result is a different measure: merged PRs more than doubled from June to September while the share reverted fell by more than 40 percent. We can use that for the hook, but it is not on the verify list, so the wording must stay close to the page.
- The article says its stated priority is "catching real bugs first and cutting review rounds second". That ordering matters for the lesson: a round cap is a cost control, not the quality goal.
- The article does **not** describe a patch or fix-back mechanism beyond "often an agent picks up the fix overnight". Patch facts for lesson 6 must come from the routing grid, not from this page.
- Shipwright does not have a round cap, only counters and a settled check. Do not present the article's cap of 3 as ours.

## Sourced claims and where lesson 6 may use them

Use tags: **hook** (opening), **Tier A support** (backs a taught beat), **destination (Tier B)** (named on the destinations slide with an owner, not built).

| Claim (our wording) | Source row | Use in lesson 6 | Why |
|---|---|---|---|
| Substantive review comments on internal PRs rose from 16% to 54% once review ran on every PR | 1 | **hook** | A concrete jump that shows why a review gate is worth building. |
| PRs passing after one review and fix round rose from 65% to 78%; PRs needing five or more rounds fell from 8.9% to 1.5%; mean reviews to pass fell from 2.08 to 1.32 | 2, 3, 4 | **hook** (one figure at most) and **Tier A support** for the converge beat | Shows that review without convergence rules wastes rounds, which is the problem the converge step solves. |
| One CLI PR went through more than 50 review and fix rounds overnight | 5 | **hook** | Memorable failure that motivates a round cap and a no-progress check. |
| About 59% of what the reviewer kept flagging was old code that had been there since its first pass | 6 | **Tier A support** (converge) | Explains why more rounds find fewer new bugs: the loop re-finds old ones. |
| After three rounds the reviewer asks the author to rethink the approach | 7 | **Tier A support** (converge) | Matches the round cap taught next to the no-progress check. State it as Anthropic's rule, not Shipwright's. |
| Re-review only the new diff after the first passes | 8 | **Tier A support** (converge) | Keeps later rounds cheap and focused. |
| Flag the bug class so every instance is fixed, not one line | 9 | **Tier A support** (verify-then-fix) | Reduces repeat rounds on the same root cause. |
| Do not repeat findings already posted | 10 | **Tier A support** (converge, dedupe) | Pairs with the settled record on the reject path. |
| A short code-owner guidance file tells the reviewer what matters, caps nits and asks for file-and-line evidence | 11 | **Tier A support** (review gate) | Backs the idea of repo guidance steering review quality. |
| The reviewer is scored daily against an eval set built from past incidents | 12 | **destination (Tier B)** | Incident-based eval set is named, not built, in lesson 6. |
| Human approval is tiered by risk, set by the change and not the author | 13 | **destination (Tier B)** | Risk-tiered human approval belongs to the release lesson. |
| An agent's approval never counts as a person's approval | 14 | **destination (Tier B)**; may also support the demo fallback note | Real approval is Tier B. It also explains why the demo reviewer cannot formally approve its own PR. |
| A merge queue re-checks every PR against the latest main | 15 | **destination (Tier B)** | Merge belongs to the release lesson. |

## Left out

Nothing was dropped for failing verification. Also left out on purpose, because they are outside review quality or the verify list: the security-review layer, flags and gradual release, the context-sharing and "you land it, you own it" sections, and the voting-verifiers design (multiple reviewer voting is already Tier B in the plan).
