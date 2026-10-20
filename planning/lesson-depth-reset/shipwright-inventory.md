# Shipwright plan-session inventory

Internal management doc. Input to the lesson 2 priorities. Not published in the lesson.

## Provenance

- Repo: `app-vitals/shipwright`
- **Commit SHA read at: `5d01e2b380ffd49d295c9cc7b2ae829710434c79`** (2026-10-20, `chore(plugin): sync version to 1.416.0`)
- Files read, fetched at that SHA via the GitHub contents API:
  - `plugins/shipwright/commands/plan-session.md` (873 lines) — cited below as **PS**, with line numbers
  - `plugins/shipwright/references/methodology-contracts/plan-session.md` (169 lines) — cited as **MC**
  - `plugins/shipwright/references/principles.md` (546 lines) — cited as **PR**
- The agent workspace had no `repos/shipwright` clone, so the pinned fetch replaced it. All three files were byte-identical to the plugin copy (v1.416.0) installed on the agent.
- Scope: these three files only. Other plugin commands (`prd`, `refresh-plan`, `dev-task`, `review`) were not read. Anything described as absent is absent from these files, not necessarily from Shipwright.

## How to read the "why" column

- **documented** — the source states the reason itself. The source location is given.
- **inferred** — the source states the behavior but not the reason. The reason is my reading, not Shipwright's claim. Do not repeat it as fact.

## Capabilities

### 1. Context load
- **What:** reads the repo's `CLAUDE.md`, globs the layout, and reads `planning/{session}/PRODUCT-SPEC.md` as the primary input. If there is no spec it asks "What are we building?".
- **Source:** PS Step 1, items 1, 2, 5 (L56-L78, L115).
- **Why:** *inferred.* Grounds the plan in the repo's own conventions and in the spec. The file never says why. It does say the session is "an engineering session, not a discovery session" (L115), which explains the brief fallback question.

### 2. Queue awareness
- **What:** (a) lists existing tasks in this session to skip duplicates; (b) lists open tasks from other sessions and prints them as a warning, since new tasks may depend on them. Their IDs become valid `dependencies`.
- **Source:** PS Step 1.3 (L58-L63), Step 1.4 (L64-L77).
- **Why:** *documented.* "to avoid duplicates" (L58); "Keep these in mind when designing the dependency map... new tasks may depend on them" (L75). The originating PRD task is filtered out of the duplicate scan because it is the session's input, not a duplicate (L63).

### 3. Layered exploration
- **What:** maps the spec onto four layers: business logic, views/UX, APIs, DB. For each it reads the likely files, looks for patterns to reuse, and marks what is new versus modified. If the spec has a Source Map, exploration starts there. Test layer definitions come from `docs/test-readiness/test-system.md`, or from four defaults (unit, integration, smoke, e2e).
- **Source:** PS Step 2 (L149-L170).
- **Why:** *partly documented.* The Source Map shortcut: "avoids re-deriving what the PRD session already identified" (L158). Why these four layers, and why test layers are loaded first, is *inferred* (the plan needs per-layer test decisions in Step 5, L151).

### 4. Complexity flags
- **What:** while exploring, calls out coupled code, missing abstractions, simple-looking spec items that are hard in code, cross-layer ordering constraints, and unjustified complexity (with a simpler alternative). Printed as `⚠` lines before any design.
- **Source:** PS Step 2 (L172-L182).
- **Why:** *inferred.* Surfacing risk before design is the evident intent. The file gives example flags but no rationale. The same step carries one stated reason in the neighboring Step 3: "Bias toward the simplest solution that fits existing patterns" (L208).

### 5. Backfill live-data check
- **What:** if a task migrates existing rows by pattern-matching a column, the acceptance criteria must require querying the live table for its actual distinct values and confirming every group is covered. Test fixtures must be seeded from the same query.
- **Source:** PS Step 2 (L184); the task is then treated as likely HITL (L186, L396).
- **Why:** *documented.* "A mapping that looks complete against documentation can still miss a real data shape that only a live query would surface" (L184). The HITL link is also documented: the agent's normal environment may not reach production databases (L396).

### 6. Breaking-change scan, including the release pipeline
- **What:** for any rename or removal, grep all current callers before proposing tasks. Covers DB tables and columns, API endpoints and fields, client types and methods. Constraint additions (`NOT NULL`, foreign key, unique) on populated tables are treated like breaking changes and need a backfill check against live data. The release/deploy pipeline is treated as an interface: changes to how artifacts are built, packaged, published, signaled, or triggered must identify downstream dependents.
- **Source:** PS Step 2, "Breaking Change Scan" (L188-L198).
- **Why:** *documented.* Pipeline consumers "won't appear in a local grep and won't error loudly; they'll just stop running" (L194). Dropping the old interface while consumers remain "creates a broken intermediate state that cannot be deployed safely" (L196). Constraint-before-backfill "will fail on (or corrupt) existing rows" (L191).

### 7. Research
- **What:** if the approach is unclear from the codebase, runs a web search on common approaches and libraries, then summarizes before design.
- **Source:** PS Step 3 (L202-L208).
- **Why:** *partly documented.* Trigger and goal are stated ("if the implementation approach isn't clear from the codebase"). The bias is stated: "simplest solution that fits existing patterns" (L208). No stated reason for why research is conditional rather than always on (*inferred:* cost).

### 8. Design
- **What:** a technical design organized by the four layers, naming the files that change, how it fits existing patterns, how Step 2 risks are addressed or accepted, and per-layer test reasoning. If the spec has a Testing Strategy it is adopted rather than re-derived. When two approaches exist, one is recommended with a reason.
- **Source:** PS Step 4 (L212-L227).
- **Why:** *partly documented.* Adopting the spec's Testing Strategy is the stated rule (L225); the reason is *inferred* (avoid re-deriving what the spec already decided, same logic as the Source Map). "Keep it simple" (L227) is stated without a reason.

### 9. Assumption flagging
- **What:** when the spec is ambiguous or silent on something that affects the design, state the assumption and flag it for confirmation in the feedback loop.
- **Source:** PS Step 4 (L228).
- **Why:** *documented as intent.* "don't pick an interpretation silently" (L228). The consequence it prevents is not spelled out.

### 10. Hard approval
- **What:** interactive runs do not move to task breakdown until the design is approved, and iterate on the task list until it is approved. Nothing is written until then.
- **Source:** PS Step 4 (L230), Step 5 (L350), Interactive Approval (L654-L674).
- **Why:** *inferred.* The file states the gate and re-establishes it on the custom-subagent path ("a subagent... has no channel back to the user", L668). It does not say why a human gate is wanted. The likely reason is that tasks become autonomous work, so errors are expensive downstream.

### 11. Task shape
- **What:** each task has: ID `{PREFIX}-{N}.{M}`, a Conventional-Commit title, a description of what (not how), 2-5 testable acceptance criteria, dependencies, branch, layer, hours (1-8, split above 8), HITL flag, complexity, model. Every task needs at least one test-decision bullet: layers affected, tests added, tests retired and why. If no test change is needed, say so and justify it.
- **Source:** PS Step 5 (L264-L275); MC `tasks[]` field list (L100-L139).
- **Why:** *partly documented.*
  - Title format: dev-task uses the title verbatim as the PR title, which the repo's `pr-title-lint` checks (PS L266) — *documented.*
  - Test-decision bullet and 1-8h cap: no reason stated — *inferred* (explicit test intent; PRs small enough to review).
  - Principles inform scope and criteria (PS L256-L262); PR lists the entries.

### 12. Complexity and model scoring
- **What:** a 1-5 score maps to a model tier: 1-2 haiku, 3-4 sonnet, 5 opus. A new abstraction bumps one tier. Pure modification of existing code stays put. When uncertain, take the lower tier.
- **Source:** PS Step 5, "Complexity and Model Scoring" (L277-L294).
- **Why:** *partly documented.* The lower-tier default has a stated escape: "the planner can escalate in a follow-up plan revision if execution is blocked" (L292). The dev-task side of this (escalating on a blocked run) is not in these files. Why the tier boundaries sit where they do is *inferred* (spend by difficulty).

### 13. Bundles
- **What:** tightly coupled tasks can share one branch and one PR. A downstream bundle-mate needs the upstream one only at `pr_open`, not `merged`. Bundle members all run at the highest model tier among them. The deploy cron holds a bundle PR until every sibling is at `pr_open` or beyond. Same-branch tasks never run concurrently, enforced by the ready-filter, so no dependency edge is needed.
- **Source:** PS Step 5, "Bundles" (L296-L310); Bundle Model Inheritance (L698-L706).
- **Why:** *documented.* Used where "splitting into separate PRs would produce unreviewable intermediate states or create unnecessary ceremony" (L298). The deploy gate "prevents shipping a PR that only contains half the bundle's work" (L306). Includes a dated incident: on 2026-06-16 a bundle shipped incomplete because `allow_auto_merge` was on (L308). Serialization reason: see L310. Why highest-tier inheritance: *inferred* (the hardest task in the PR sets the bar).

### 14. Dependency map
- **What:** two forms: an ASCII graph (with prior-session tasks at the top) and a table of Depends on / Blocks / HITL.
- **Source:** PS Step 5, "Dependency Map" (L312-L335).
- **Why:** *inferred.* The file defines the format, not the purpose. Cross-session IDs are valid dependency values (L77, L269) — *documented.*

### 15. Breaking-change safety
- **What:** every task carrying a rename, removal, or constraint addition must either (1) be atomic — all consumers updated in the same task — or (2) be split add → migrate → remove. A constraint on a populated table splits into: add nullable, backfill (live-data check), add constraint only after the backfill has run and verified zero gaps — not merely merged. Otherwise the task is marked `Safe to deploy standalone: yes`.
- **Source:** PS Step 5, "Breaking Change Safety" (L337-L348).
- **Why:** *documented.* "not safe to deploy independently — that gap is a broken intermediate state in production" (L344). Combined migration+constraint "risks failing on (or silently corrupting) existing rows" (L346).

### 16. HITL detection
- **What:** scans every task for Type A (a human must act: console, secrets, privileged commands) versus neither. A keyword list (terraform, kubectl, GKE, PAT, branch protection, `.claude/`, and more) plus a judgment step. Judgment cases: web UI actions, credential provisioning, privileged approvals, non-CLI actions, live production data reads, and any `.claude/**` write. CI workflow changes are scanned for net-new `${{ secrets.* }}` names. Flagged tasks get `hitl: true` and a `## Human steps` section.
- **Source:** PS Step 5.5 (L368-L448).
- **Why:** *documented.*
  - `.claude/**`: "blocked unconditionally by the Claude Code CLI's own protection of its config/permissions/hooks directory. No amount of granted tool access changes this" (L397).
  - Net-new secrets: "requires a human to provision it" (L399).
  - Production data: the dev-task environment cannot reach production databases (L396).
  - Human steps replace "what dev-task would otherwise try to autonomously execute, since there's no code to write" (L414).

### 17. Autonomous mode with decision log
- **What:** `--autonomous {task-id}` runs with no human. The spec is materialized from the originating PRD task's description into `PRODUCT-SPEC.md`. Design and breakdown are accepted on first pass. Soft ambiguity takes a sensible default, logged as `- {decision}: defaulted to {choice} — {reason}` under `## Decision Log` in the plan. A hard contradiction, or an empty spec, patches the originating task to `blocked` with `hitl: true` and a reason, then stops.
- **Source:** PS L19, Step 1 "--autonomous Mode" (L80-L100), Step 4 (L232-L248), Step 5 (L352-L364); MC `autonomous`, `decisionLog`, `hardContradiction` (L56-L64, L144-L156).
- **Why:** *documented.* First-pass acceptance because "a flagged PRD is already trusted/complete — not a first-draft ambiguous spec — so there is no human in this loop to iterate with" (L234). The log exists to satisfy "every auto-approval decision recorded in the PLAN.md artifact" (L248). Blocking instead of guessing: "Do NOT fabricate an answer or silently pick a side" (L239).

### 18. Methodology dispatch
- **What:** a per-agent, per-phase override (`phaseMethodology["plan-session"]`) can replace Steps 2-5.5 with a custom subagent. Empty or failed lookup means the built-in path runs, unchanged. The subagent gets a fixed input set (spec, repo, session, existing and cross-session tasks, test layer defs, principles, autonomous) and returns one JSON object. A schema gate then rejects the whole batch (12 per-task checks plus non-empty `planMarkdown` and non-empty `tasks[]`). One retry on malformed output, then abandon. Under `--autonomous`, failures block the PRD task.
- **Source:** PS L117-L145, Configured Methodology Dispatch (L452-L681); MC (whole file).
- **Why:** *documented.* The contract exists so a custom subagent can be a drop-in replacement ("the caller has no other integration point", MC L16). Each validation check carries its own reason; e.g. a bad `planMarkdown` would write an empty `PLAN.md` that every task's `source` points at (PS L553-L559); a zero-task batch would let the PRD task close as done (PS L560-L571). No built-in fallback after retry because the built-in is not a dispatchable subagent (PS L136-L141).

### 19. PLAN.md and source links
- **What:** the full plan (design, task table, dependency map, breaking-change notes, decision log) is written verbatim to `planning/{session}/PLAN.md`. Every task's `source` points at it. Tasks are bulk-posted to the task store. A plan-visualization link is surfaced when an admin base URL is set.
- **Source:** PS Step 6a (L710-L738), Step 6b (L740-L777).
- **Why:** *documented.* "Do not re-synthesize the plan from the task list — a re-synthesized plan silently drops the design rationale, the Breaking Change Safety notes, and the embedded Decision Log that the `source` link on every queued task points at" (L714).

### 20. Plan PR
- **What:** a docs-only PR (`docs/plan-{session}`) carries `PLAN.md` and `PRODUCT-SPEC.md`, built in a throwaway worktree off the default branch so the current checkout is untouched. Staged content is scanned for private-key headers and cloud/vendor token prefixes before commit. Failure never blocks the already-queued tasks.
- **Source:** PS Step 6d (L792-L849).
- **Why:** *documented.* "that file only exists in this checkout — and many repos gitignore `planning/`... the plan is lost with the pod unless it is committed" (L794). The secret scan: `--autonomous` runs "with no human present to catch it" (L823-L826, L845).

## Gaps

What Shipwright's plan-session does not do that a best-in-class planner might. First-hand observations only: each gap is an absence in the three pinned files.

**Method used to verify absence:** case-insensitive `grep -c` of the term(s) against `plugins/shipwright/commands/plan-session.md` at `5d01e2b`; a count of 0 means the file never mentions it. Where a term appears, I read the hit and noted it. Absence from this file does not prove absence from the plugin.

| # | Gap | How verified absent |
|---|-----|---------------------|
| 1 | No spike or prototype step to de-risk an unclear approach. Unknowns go to web search (Step 3), which reads, not builds. | `spike`, `prototype`: 0 hits. |
| 2 | No code-history risk signal (what changes often, what breaks often) feeding complexity flags. Flags come from reading current code only. | `git log`, `blame`, `churn`: 0 hits. |
| 3 | No rollout planning: no feature flags, staged exposure, or rollback task. Safety is the add → migrate → remove split (Breaking Change Safety). | `feature flag`, `rollback`: 0 hits. `rollout` has 1 hit, but only as a HITL keyword (L384). |
| 4 | No critical-path or parallelism analysis. The dependency map shows order, not which chain bounds total time or what can run side by side. | `critical path`, `parallel`: 0 hits. |
| 5 | No cost or token budget for executing the plan. Hours are "rough estimate" (L272). Model tier is the only spend lever. | `cost`: 0 hits. `budget` has 1 hit, unrelated (a retry budget, L673). `estimate`: 1 hit, the hours field. |
| 6 | No calibration of estimates or complexity scores against past actuals. | `calibrat`, `velocity`: 0 hits. The only feedback path mentioned is a manual "follow-up plan revision" (L292). |
| 7 | No stakeholder or user interview. The only question is "What are we building?" when the spec is missing (L115). Discovery is delegated to `/prd`. | `stakeholder`, `interview`: 0 hits. |
| 8 | No observability or monitoring tasks, no operational-readiness checks (runbooks, alerts). | `observab`, `monitor`, `runbook`: 0 hits. |
| 9 | No threat-model step. Security enters only through principles-file entries cited in acceptance criteria and the HITL secret scan. | `threat`: 0 hits. `security`: 1 hit, the principles reference (L262). |
| 10 | Built-in path has no mechanical validation of its own output. The 12-check schema gate (unknown dependency IDs, ID collisions, bad model or layer values) runs only on the custom-subagent path. Nothing checks for dependency cycles on either path. | Gate is under "Configured Methodology Dispatch" only (L541-L652). `cycle`, `circular`: 0 hits. |
| 11 | Plan is ASCII only. No rendered graph in the plan itself; a viz link exists only if an admin URL is configured. | `diagram`, `mermaid`: 0 hits. Viz is Step 6a (L718-L738). |
| 12 | No traceability from each spec requirement to the tasks that cover it. Criteria are written per task; nothing checks that every spec item is covered. | `traceab`: 0 hits. No coverage-of-spec step in Steps 4-5. |

Not a gap, to avoid a false claim: a plan-refresh capability exists as a separate command (`refresh-plan.md` is in the plugin's `commands/` directory at v1.416.0). It was not read, so its behavior is out of scope here.
