// File-backed review/patch attempt counts per PR, and the hand-off to a human once a PR is stuck.
// Re-reads before every operation and writes atomically, like tasks.store.ts.

import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { bunGh, type GhRunner, type PullRequest } from "./prs.ts";

export const PR_ATTEMPTS_PATH = new URL("./pr-attempts.json", import.meta.url).pathname;
export const MAX_PR_ATTEMPTS = 3;
export const NEEDS_HUMAN_LABEL = "needs-human";

export type AttemptKind = "review" | "patch";

export interface PrAttempts {
  reviews: number;
  patches: number;
  reviewedSha?: string;
  /** Set once flagForHuman has labelled and commented; cleared with the entry when the label is removed. */
  flagged?: boolean;
}

export interface AttemptsStore {
  get(pr: number): PrAttempts | undefined;
  record(pr: number, kind: AttemptKind, sha: string): void;
  exceeded(pr: number): boolean;
  /** Adds the `needs-human` label and one comment, only if this PR has not been flagged already. */
  flagForHuman(pr: number, gh?: GhRunner): Promise<void>;
  /** Prunes entries for PRs no longer open, and resets a flagged PR whose label was removed. */
  sync(openPrs: PullRequest[]): void;
}

type Entries = Record<string, PrAttempts>;

function readEntries(path: string): Entries {
  if (!existsSync(path)) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    throw new Error(`${path} is not valid JSON: ${(e as Error).message}`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${path} must hold an object keyed by PR number`);
  }
  return parsed as Entries;
}

function writeEntries(path: string, entries: Entries): void {
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(entries, null, 2)}\n`);
  renameSync(tmp, path); // atomic: readers never see a half-written file
}

async function ghOrThrow(gh: GhRunner, args: string[]): Promise<void> {
  const { exitCode, stderr } = await gh(args);
  if (exitCode !== 0) throw new Error(`gh ${args.slice(0, 2).join(" ")} failed (exit ${exitCode}): ${stderr.trim() || "no output"}`);
}

export function attemptsStore(path: string = PR_ATTEMPTS_PATH): AttemptsStore {
  const key = (pr: number) => String(pr);
  const update = (pr: number, fn: (e: PrAttempts) => void) => {
    const entries = readEntries(path);
    const entry = entries[key(pr)] ?? { reviews: 0, patches: 0 };
    fn(entry);
    entries[key(pr)] = entry;
    writeEntries(path, entries);
  };
  return {
    get: (pr) => readEntries(path)[key(pr)],
    record(pr, kind, sha) {
      update(pr, (e) => {
        if (kind === "review") {
          e.reviews += 1;
          e.reviewedSha = sha;
        } else {
          e.patches += 1;
        }
      });
    },
    exceeded(pr) {
      const e = readEntries(path)[key(pr)];
      return e !== undefined && e.reviews + e.patches >= MAX_PR_ATTEMPTS;
    },
    async flagForHuman(pr, gh = bunGh) {
      if (readEntries(path)[key(pr)]?.flagged) return;
      await ghOrThrow(gh, ["label", "create", NEEDS_HUMAN_LABEL, "--force", "--description", "Factory gave up; a human must look"]);
      await ghOrThrow(gh, ["pr", "edit", String(pr), "--add-label", NEEDS_HUMAN_LABEL]);
      await ghOrThrow(gh, [
        "pr",
        "comment",
        String(pr),
        "--body",
        `The factory stopped after ${MAX_PR_ATTEMPTS} review/patch attempts on this PR. Remove the \`${NEEDS_HUMAN_LABEL}\` label to let it try again.`,
      ]);
      update(pr, (e) => {
        e.flagged = true;
      });
    },
    sync(openPrs) {
      const entries = readEntries(path);
      const open = new Map(openPrs.map((p) => [key(p.number), p]));
      let changed = false;
      for (const k of Object.keys(entries)) {
        const p = open.get(k);
        if (!p || (entries[k]?.flagged && !p.labels.includes(NEEDS_HUMAN_LABEL))) {
          delete entries[k];
          changed = true;
        }
      }
      if (changed) writeEntries(path, entries);
    },
  };
}
