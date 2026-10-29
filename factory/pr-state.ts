// Decide what a PR needs next. Pure: no I/O, no attempt limits.
//
// Rules, first match wins:
//   1. draft, or labelled `needs-human`                  -> none
//   2. CI failed, merge conflict, or changes requested   -> patch
//   3. approved with CI passing                          -> none
//   4. head SHA differs from reviewedSha, CI not failing -> review
//   5. anything else                                     -> none

import type { PullRequest } from "./prs";

export type PrAction = "review" | "patch" | "none";

export interface PrHistory {
  /** Head SHA of the last review we ran on this PR, if any. */
  reviewedSha?: string;
}

export function decidePr(
  pr: Pick<PullRequest, "isDraft" | "labels" | "ci" | "mergeable" | "reviewDecision" | "headSha">,
  history: PrHistory,
): PrAction {
  if (pr.isDraft || pr.labels.includes("needs-human")) return "none";
  if (pr.ci === "fail" || pr.mergeable === "conflicting" || pr.reviewDecision === "changes_requested") return "patch";
  if (pr.reviewDecision === "approved" && pr.ci === "pass") return "none";
  if (pr.headSha !== history.reviewedSha) return "review";
  return "none";
}
