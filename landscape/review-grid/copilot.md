# GitHub Copilot (code review): review grid

Scope: how Copilot code review decides which findings to show, meaning how findings are graded, how many post, what
filters run before posting, what repository files steer it, what evidence a finding carries, how a re-review behaves, how a
person pushes back, how its own noise is measured, and whether it states a verdict. Left out on purpose: how the cloud agent
or CLI verifies work before a PR (see `landscape/verify-grid/copilot.md`), plans (see `landscape/plan-grid/copilot.md`),
billing detail, and sandbox or permission design.
Every filled cell is a paraphrase of a first-party page, with its URL and the date I fetched it (**2026-11-11**). Names are
GitHub's own (Copilot code review, review effort level, Copilot approvals, `REVIEW.md`), not canonical.

Method: fetched the docs index (https://docs.github.com/llms.txt, 2026-11-11). It lists a single Copilot review page, so I
followed the links from the review pages themselves and listed every page that could touch review quality (the concept page,
the how-to, the configuration page, the excluded-files reference, the custom-instructions pages and tutorial, Copilot Memory,
the responsible-use card). I fetched the raw Markdown of each (`<url>.md`) with `curl` and read it in full, so the text was
read directly and not through a summary. Started from `landscape/routing-grid/copilot.md` and
`landscape/verify-grid/copilot.md`, but every page was fetched again; their notes are not carried over unchecked.

## The grid

Surfaces: **PR review on GitHub.com** (Copilot as a reviewer on a pull request, manual or automatic), **IDE review**
(selection or uncommitted changes in VS Code, Visual Studio, Xcode, JetBrains), **Admin configuration** (rulesets and
settings at repository, organization and enterprise level).

| Surface | Dimension | Value | Source | As of |
| --- | --- | --- | --- | --- |
| PR review on GitHub.com | severity grading | Each comment is labelled High, Medium or Low so the person can order the work by importance | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| IDE review | severity grading | Not documented for the IDE flows (checked: use-code-review, tabs for VS Code, Visual Studio, Xcode and JetBrains). The label is described only in the GitHub.com steps | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| PR review on GitHub.com | confidence grading | Not documented as a score or label (checked: concept page, use-code-review, configure-code-review, responsible-use agents card) | https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| PR review on GitHub.com | threshold or cap on posted comments | No count cap or severity threshold is documented (checked: concept page, use-code-review, configure-code-review). What is documented is a cap on effort, not on comments: Lite, Balanced (default) or Max, and a "maximum review effort" setting at repository, organization and enterprise level that lower levels cannot exceed. A review of an IDE selection or of uncommitted changes can come back with no comments (Visual Studio says "Copilot did not comment on any files") | https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| PR review on GitHub.com | what it looks at and what it skips | Reads the diff plus the pull request title and body and any custom instructions. With the agentic capabilities (on by default, run through GitHub Actions) it also gathers context from the whole repository. If Actions is unavailable or the workflow fails, a review is still produced without those extras. Some files are never reviewed: dependency manifests and lock files, logs, SVG, minified or bundled output, `dist`, `node_modules`, `vendor`, `generated` and coverage folders, `*.d.ts` and several config files (the page says the list is an example, not the full set) | https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review ; https://docs.github.com/en/copilot/reference/review-excluded-files ; https://docs.github.com/en/copilot/responsible-use/agents | 2026-11-11 |
| Admin configuration | review depth and model | Three effort levels. Lite is a fast pass for common bugs, security holes and style problems. Balanced (default) sends the work to a higher-reasoning model for longer analysis of complex logic, security-sensitive code and cross-service changes. Max (public preview) uses several high-reasoning models. The overview comment records the level used for each run. Switching the model is not supported, and the page says it would likely hurt reliability | https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review | 2026-11-11 |
| PR review on GitHub.com | verification or filter pass before posting | Not documented (checked: concept page, use-code-review, configure-code-review, responsible-use agents card). The card describes four steps: build a prompt from the diff, context and instructions; the model analyses it; it generates a response; the response is formatted as line-linked feedback. No separate check step is named. The same card lists false positives (comments about problems that do not exist) as a known risk | https://docs.github.com/en/copilot/responsible-use/agents | 2026-11-11 |
| PR review on GitHub.com | filter for problems that existed before the PR | Not documented (checked: concept page, use-code-review, configure-code-review, responsible-use agents card, customize-code-review tutorial). The card says the reviewer reads "pull request diffs and metadata", which is the only scope statement | https://docs.github.com/en/copilot/responsible-use/agents ; https://docs.github.com/en/copilot/tutorials/customize-code-review | 2026-11-11 |
| PR review on GitHub.com | repo guidance files it reads | `.github/copilot-instructions.md` (repository-wide), `.github/instructions/**/*.instructions.md` with an `applyTo` glob (path-specific), and agent files at the repository root: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` and `REVIEW.md`. Organization-level instructions apply too. Skills under `.github/skills` are used when relevant; a review-focused directory name such as `code-review` makes that more likely. All of it is read from the pull request's head branch, so a change to the instructions can be tried in the same PR. A repository switch turns custom instructions off for reviews | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review ; https://docs.github.com/en/copilot/reference/custom-instructions-support ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions | 2026-11-11 |
| PR review on GitHub.com | how it is told what to ignore | Three documented routes. A path-specific instructions file can carry `excludeAgent: "code-review"` to keep it away from the reviewer (and the reverse for the cloud agent). Instructions can say which patterns are intentional or which areas need closer scrutiny (the how-to's wording for `AGENTS.md`). The built-in excluded-files list cannot be edited on the pages read. A path or severity filter on what gets commented: not documented (checked: use-code-review, customize-code-review, review-excluded-files) | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review ; https://docs.github.com/en/copilot/reference/review-excluded-files | 2026-11-11 |
| PR review on GitHub.com | what instructions cannot do | The tutorial lists instruction types the reviewer does not support: changing comment formatting or the overview comment, blocking a merge until its comments are resolved, following external links (copy the text in instead) and vague asks such as "be more accurate". It warns that the reviewer is non-deterministic and that very long files (the guide says about 1,000 lines) may be partly overlooked | https://docs.github.com/en/copilot/tutorials/customize-code-review | 2026-11-11 |
| PR review on GitHub.com | evidence required (file and line) | Feedback is tied to specific lines of specific files, and where possible carries a suggested change that applies in a couple of clicks (one suggestion or a batch in one commit). A rule that a finding must show proof beyond that: not documented. Comments can carry an attribution naming the skill or MCP server that shaped them, and a linked review session shows the tools called | https://docs.github.com/en/copilot/responsible-use/agents ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| PR review on GitHub.com | re-review behaviour | Off by default: a reviewed PR is not reviewed again on a push unless "Review new pushes" is selected in the ruleset (or the author's settings), and otherwise a person clicks the re-request button next to Copilot in the Reviewers menu. A draft is reviewed only when "Review draft pull requests" is on. The page states that a re-review may repeat comments that were resolved or downvoted. Whether it limits itself to the new commits: not documented (checked: use-code-review, concept page, configure-code-review) | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review ; https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review | 2026-11-11 |
| PR review on GitHub.com | how a person dismisses a finding or teaches it | Comments behave like a human's: react, reply, resolve or hide them. Thumbs up or down on a comment is sent to GitHub to improve the product. Replies written under a Copilot comment are seen by people but not by Copilot, and it does not answer. So the documented teaching lever is the instruction files, and a thumbs-down or resolve does not stop a repeat on re-review (see the row above) | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| IDE review | how a person dismisses a finding | A per-comment control: Discard and Go to Next (VS Code), a downward arrow (Visual Studio), Dismiss (Xcode), Discard (JetBrains). Thumbs up and down also exist in VS Code. Whether a dismissal teaches the reviewer: not documented | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| PR review on GitHub.com | what it learns over time | Copilot Memory can store facts about a repository (for example that two settings must stay in step) and the reviewer uses them. The reviewer applies repository-level facts only, never personal preferences. Whether it is on follows repository settings. Unlike some surfaces, the reviewer does not ask for approval before storing a memory | https://docs.github.com/en/copilot/concepts/prompting-and-context/copilot-memory ; https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review | 2026-11-11 |
| PR review on GitHub.com | how its own noise is measured | Not documented for review specifically (checked: concept page, use-code-review, configure-code-review, responsible-use agents card). The card says Copilot overall is evaluated with public benchmarks such as SWE-Bench and internal suites, with metrics of resolution rate, token efficiency, latency and tool-call reliability, and no comment-acceptance or false-positive figure. Its only statement about noise is the risk list: false positives and missed problems, and a tip to add human review. The thumbs up or down is the only feedback signal described | https://docs.github.com/en/copilot/responsible-use/agents ; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review | 2026-11-11 |
| PR review on GitHub.com | states a verdict or approves | Every review carries an approval assessment in the overview comment saying whether Copilot thinks the PR is ready to approve. By default the review type is "Comment", which does not count toward required approvals. If an administrator turns approvals on (off by default; enterprise, organization and repository controls) Copilot can submit an approving review that satisfies the required-approval rule, optionally only on PRs whose changed files all match up to 15 globs. A new push dismisses that approval. A "Request changes" review: the how-to names it only to say it is not the default | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review | 2026-11-11 |
| PR review on GitHub.com | handing a finding to a fixer | "Fix with Copilot" on a review comment opens a draft comment where the person says what to fix, then chooses a new PR against the branch or a commit on the same PR. Passing suggestions to the cloud agent is in public preview | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review ; https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review | 2026-11-11 |
| PR review on GitHub.com | check beyond the model | The concept page points to a separate product, GitHub Code Quality, for rules-based CodeQL analysis, coverage metrics and optional merge gating through rulesets. That is not part of Copilot code review itself | https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review | 2026-11-11 |

## Not documented (with pages checked)

- A confidence score or label on a finding: concept page, use-code-review, configure-code-review, responsible-use agents.
- A count cap or severity threshold on posted comments (effort level is the only documented dial): concept page,
  use-code-review, configure-code-review.
- A separate verification or false-positive filter before comments post: concept page, use-code-review,
  configure-code-review, responsible-use agents.
- A pre-existing-problem filter: the same four pages plus the customize-code-review tutorial.
- Whether a re-review reviews only new commits: use-code-review, concept page, configure-code-review.
- Whether a thumbs-down, a resolve or an IDE dismissal teaches the reviewer: use-code-review, customize-code-review.
- A severity label in IDE reviews: use-code-review IDE tabs.
- A measured acceptance rate or false-positive rate for code review: responsible-use agents, concept page, use-code-review.
- Whether the full excluded-file list can be changed by a repository: review-excluded-files, configure-code-review.

## Pages read

Fetched 2026-11-11 from the index https://docs.github.com/llms.txt and the links on the review pages, as raw Markdown
(`<url>.md`) with `curl`, read in full.

- copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review (concept page)
- copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review (all tabs: GitHub.com, VS Code, Visual Studio,
  Mobile, Xcode, JetBrains, CLI)
- copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review
- copilot/reference/review-excluded-files
- copilot/concepts/prompting-and-context/custom-instructions
- copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- copilot/reference/custom-instructions-support
- copilot/tutorials/customize-code-review
- copilot/concepts/prompting-and-context/copilot-memory
- copilot/responsible-use/agents (application card)

## Ruled out (why)

- **Copilot CLI built-in Code review agent**: covered in `landscape/verify-grid/copilot.md`; it reviews local changes in a
  terminal session, not a pull request, and its pages were not re-read for this grid.
- **GitHub Code Quality (`code-security`)**: a separate product; named here only because the concept page points to it.
- **Billing, budgets, runners and firewall pages**: cost and infrastructure, not review quality (the cost figures per effort
  level are on the concept page and are not recorded as quality evidence).
- **REST API pages for review requests and comments**: how to call the reviewer, not how it grades findings.
- **github.com repositories (`awesome-copilot` instruction examples)**: on the allowlist, but community examples, not a
  statement of product behaviour.
- **Blog and changelog posts**: not read; the docs pages above were enough to fill or honestly empty each row. First place to
  look if a "not documented" row matters.
