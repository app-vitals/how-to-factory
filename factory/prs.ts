// Read open pull requests through a PrSource. Read-only: no decisions here, no writes to PRs.

export type CiState = "pass" | "fail" | "pending";
export type Mergeable = "clean" | "conflicting" | "unknown";
export type ReviewDecision = "approved" | "changes_requested" | "none";

export interface PullRequest {
  number: number;
  title: string;
  branch: string;
  createdAt: string;
  isDraft: boolean;
  headSha: string;
  ci: CiState;
  mergeable: Mergeable;
  reviewDecision: ReviewDecision;
  labels: string[];
}

export interface PrSource {
  list(): Promise<PullRequest[]>;
}

export interface GhResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

/** Runs `gh` with the given args. Injectable so tests never call GitHub. */
export type GhRunner = (args: string[]) => Promise<GhResult>;

export const PR_JSON_FIELDS =
  "number,title,headRefName,createdAt,isDraft,headRefOid,statusCheckRollup,mergeable,reviewDecision,labels";

export const bunGh: GhRunner = async (args) => {
  const proc = Bun.spawn(["gh", ...args], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  return { exitCode, stdout, stderr };
};

type Check = { status?: string; conclusion?: string; state?: string };

const FAILED = new Set(["FAILURE", "ERROR", "TIMED_OUT", "CANCELLED", "STARTUP_FAILURE", "ACTION_REQUIRED"]);

/** Any failed check -> fail; else any unfinished check -> pending; else pass (no checks counts as pass). */
function normalizeCi(rollup: unknown): CiState {
  if (!Array.isArray(rollup)) return "pass";
  let pending = false;
  for (const c of rollup as Check[]) {
    // CheckRun carries status/conclusion; a legacy StatusContext carries only state.
    const verdict = c.status === undefined ? c.state : c.status === "COMPLETED" ? c.conclusion : undefined;
    if (verdict === undefined || verdict === "PENDING" || verdict === "EXPECTED" || verdict === "") pending = true;
    else if (FAILED.has(verdict)) return "fail";
  }
  return pending ? "pending" : "pass";
}

function normalizeMergeable(v: unknown): Mergeable {
  if (v === "MERGEABLE") return "clean";
  if (v === "CONFLICTING") return "conflicting";
  return "unknown";
}

function normalizeReview(v: unknown): ReviewDecision {
  if (v === "APPROVED") return "approved";
  if (v === "CHANGES_REQUESTED") return "changes_requested";
  return "none";
}

function normalizePr(raw: unknown, index: number): PullRequest {
  if (typeof raw !== "object" || raw === null) throw new Error(`gh pr list: entry ${index} is not an object`);
  const r = raw as Record<string, unknown>;
  if (typeof r.number !== "number") throw new Error(`gh pr list: entry ${index} has no numeric "number"`);
  const str = (k: string): string => {
    if (typeof r[k] !== "string") throw new Error(`gh pr list: PR #${r.number} has no string "${k}"`);
    return r[k] as string;
  };
  const labels = Array.isArray(r.labels) ? (r.labels as { name?: unknown }[]) : [];
  return {
    number: r.number,
    title: str("title"),
    branch: str("headRefName"),
    createdAt: str("createdAt"),
    isDraft: r.isDraft === true,
    headSha: str("headRefOid"),
    ci: normalizeCi(r.statusCheckRollup),
    mergeable: normalizeMergeable(r.mergeable),
    reviewDecision: normalizeReview(r.reviewDecision),
    labels: labels.map((l) => l.name).filter((n): n is string => typeof n === "string"),
  };
}

/** Lists open PRs of the current repo via `gh pr list`. Throws a descriptive error on gh failure or bad JSON. */
export function ghPrSource(gh: GhRunner = bunGh): PrSource {
  return {
    async list() {
      const { exitCode, stdout, stderr } = await gh([
        "pr",
        "list",
        "--state",
        "open",
        "--limit",
        "200",
        "--json",
        PR_JSON_FIELDS,
      ]);
      if (exitCode !== 0) throw new Error(`gh pr list failed (exit ${exitCode}): ${stderr.trim() || "no output"}`);
      let parsed: unknown;
      try {
        parsed = JSON.parse(stdout);
      } catch (e) {
        throw new Error(`gh pr list returned invalid JSON: ${(e as Error).message}`);
      }
      if (!Array.isArray(parsed)) throw new Error("gh pr list returned invalid JSON: expected an array");
      return parsed.map(normalizePr);
    },
  };
}
