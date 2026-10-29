import { describe, expect, test } from "bun:test";
import { decidePr } from "./pr-state";
import type { PullRequest } from "./prs";

const pr = (over: Partial<PullRequest> = {}): PullRequest => ({
  number: 1,
  title: "t",
  branch: "feat/x",
  createdAt: "2026-10-29T00:00:00Z",
  isDraft: false,
  headSha: "sha-new",
  ci: "pass",
  mergeable: "clean",
  reviewDecision: "none",
  labels: [],
  ...over,
});

describe("decidePr", () => {
  test("draft -> none, even with failed CI", () => {
    expect(decidePr(pr({ isDraft: true, ci: "fail" }), {})).toBe("none");
  });

  test("needs-human label -> none, even with failed CI", () => {
    expect(decidePr(pr({ labels: ["needs-human"], ci: "fail" }), {})).toBe("none");
  });

  test("CI fail -> patch", () => {
    expect(decidePr(pr({ ci: "fail" }), { reviewedSha: "sha-new" })).toBe("patch");
  });

  test("merge conflict -> patch", () => {
    expect(decidePr(pr({ mergeable: "conflicting" }), {})).toBe("patch");
  });

  test("changes requested -> patch", () => {
    expect(decidePr(pr({ reviewDecision: "changes_requested" }), {})).toBe("patch");
  });

  test("approved with CI pass -> none, even on an unreviewed head", () => {
    expect(decidePr(pr({ reviewDecision: "approved" }), {})).toBe("none");
  });

  test("unreviewed head with CI pass -> review", () => {
    expect(decidePr(pr(), {})).toBe("review");
  });

  test("head differs from reviewedSha, CI pending -> review", () => {
    expect(decidePr(pr({ ci: "pending" }), { reviewedSha: "sha-old" })).toBe("review");
  });

  test("already-reviewed head with CI pass -> none", () => {
    expect(decidePr(pr(), { reviewedSha: "sha-new" })).toBe("none");
  });

  test("failed CI on an unreviewed head -> patch, not review", () => {
    expect(decidePr(pr({ ci: "fail", headSha: "sha-new" }), { reviewedSha: undefined })).toBe("patch");
  });

  test("patched PR (new head, CI pass, previously reviewed) -> review", () => {
    expect(decidePr(pr({ headSha: "sha-patched" }), { reviewedSha: "sha-old" })).toBe("review");
  });

  test("pending CI on an already-reviewed head -> none", () => {
    expect(decidePr(pr({ ci: "pending" }), { reviewedSha: "sha-new" })).toBe("none");
  });
});
