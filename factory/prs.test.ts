import { expect, test } from "bun:test";
import { type GhRunner, ghPrSource, type PullRequest } from "./prs.ts";

const base = {
  number: 7,
  title: "feat: x",
  headRefName: "feat/x",
  createdAt: "2026-10-29T10:00:00Z",
  isDraft: false,
  headRefOid: "abc123",
  statusCheckRollup: [{ status: "COMPLETED", conclusion: "SUCCESS" }],
  mergeable: "MERGEABLE",
  reviewDecision: "",
  labels: [],
};

const source = (pr: object) => {
  const calls: string[][] = [];
  const gh: GhRunner = async (args) => {
    calls.push(args);
    return { exitCode: 0, stdout: JSON.stringify([{ ...base, ...pr }]), stderr: "" };
  };
  return { src: ghPrSource(gh), calls };
};
const one = async (pr: object): Promise<PullRequest> => {
  const [first] = await source(pr).src.list();
  if (!first) throw new Error("expected one PR");
  return first;
};

test("normalizes the base fields and asks gh for open PRs", async () => {
  const { src, calls } = source({});
  expect(await src.list()).toEqual([
    {
      number: 7,
      title: "feat: x",
      branch: "feat/x",
      createdAt: "2026-10-29T10:00:00Z",
      isDraft: false,
      headSha: "abc123",
      ci: "pass",
      mergeable: "clean",
      reviewDecision: "none",
      labels: [],
    },
  ]);
  expect(calls[0]).toContain("open");
  expect(calls[0]).toContain("--json");
});

test("all checks green -> pass", async () => {
  const pr = await one({
    statusCheckRollup: [
      { status: "COMPLETED", conclusion: "SUCCESS" },
      { status: "COMPLETED", conclusion: "SKIPPED" },
      { state: "SUCCESS" },
    ],
  });
  expect(pr.ci).toBe("pass");
});

test("any check failed -> fail, even with others still running", async () => {
  const pr = await one({
    statusCheckRollup: [
      { status: "IN_PROGRESS", conclusion: "" },
      { status: "COMPLETED", conclusion: "FAILURE" },
    ],
  });
  expect(pr.ci).toBe("fail");
});

test("checks still running -> pending", async () => {
  const pr = await one({
    statusCheckRollup: [
      { status: "COMPLETED", conclusion: "SUCCESS" },
      { status: "IN_PROGRESS", conclusion: "" },
    ],
  });
  expect(pr.ci).toBe("pending");
  expect((await one({ statusCheckRollup: [{ state: "PENDING" }] })).ci).toBe("pending");
});

test("CONFLICTING -> conflicting, UNKNOWN -> unknown", async () => {
  expect((await one({ mergeable: "CONFLICTING" })).mergeable).toBe("conflicting");
  expect((await one({ mergeable: "UNKNOWN" })).mergeable).toBe("unknown");
});

test("CHANGES_REQUESTED, APPROVED and no review", async () => {
  expect((await one({ reviewDecision: "CHANGES_REQUESTED" })).reviewDecision).toBe("changes_requested");
  expect((await one({ reviewDecision: "APPROVED" })).reviewDecision).toBe("approved");
  expect((await one({ reviewDecision: "" })).reviewDecision).toBe("none");
  expect((await one({ reviewDecision: "REVIEW_REQUIRED" })).reviewDecision).toBe("none");
});

test("labels become names; draft flag is kept", async () => {
  const pr = await one({ labels: [{ name: "needs-human" }, { name: "bug" }], isDraft: true });
  expect(pr.labels).toEqual(["needs-human", "bug"]);
  expect(pr.isDraft).toBe(true);
});

test("a non-zero gh exit throws an error naming the cause", async () => {
  const gh: GhRunner = async () => ({ exitCode: 4, stdout: "", stderr: "authentication required\n" });
  await expect(ghPrSource(gh).list()).rejects.toThrow(/gh pr list failed \(exit 4\): authentication required/);
});

test("invalid JSON throws an error naming the cause", async () => {
  const gh: GhRunner = async () => ({ exitCode: 0, stdout: "not json", stderr: "" });
  await expect(ghPrSource(gh).list()).rejects.toThrow(/invalid JSON/);
});

test("a malformed entry throws naming the PR and field", async () => {
  const gh: GhRunner = async () => ({ exitCode: 0, stdout: JSON.stringify([{ number: 3 }]), stderr: "" });
  await expect(ghPrSource(gh).list()).rejects.toThrow(/PR #3 has no string "title"/);
});
