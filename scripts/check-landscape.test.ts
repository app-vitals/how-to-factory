import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { checkReadmeFresh, validateLandscape } from "./check-landscape.ts";
import { renderLandscape } from "./render-landscape.ts";
import type { Cell, FactoryProduct, Landscape, TaskQueueProduct } from "./landscape-types.ts";

const TODAY = "2026-10-12";

const cell = (over: Partial<Cell> = {}): Cell => ({
  name: "Thing",
  summary: "Does a thing.",
  sourceUrl: "https://docs.example.com/thing",
  asOf: "2026-10-12",
  short: "Does a thing",
  chip: "Thing",
  ...over,
});

const make = (over: Partial<Cell> = {}): Landscape => ({
  components: [
    { id: "plan-name", label: "What they call the planning step" },
    { id: "execute-name", label: "What they call the working step" },
    { id: "plan-hitl", label: "Plan: person approves" },
    { id: "plan-persist", label: "Plan: tasks outlive chat" },
    { id: "plan-contents", label: "Plan: criteria and dependencies" },
    { id: "verify-judge", label: "Who decides it's done" },
    { id: "verify-runs-app", label: "Runs the app itself" },
    { id: "verify-keeps-going", label: "How it keeps going until it passes" },
    { id: "loop-starts-next", label: "What starts the next task" },
    { id: "loop-includes-plan", label: "Plan runs inside the loop?" },
    { id: "design-reads", label: "Reads the code before proposing" },
    { id: "design-form", label: "Design output and its form" },
    { id: "design-reuse", label: "Names reuse, risks or breaking changes" },
    { id: "design-approval", label: "Approval before work starts" },
    { id: "design-tasks", label: "How it becomes tasks" },
    { id: "plan-clarify", label: "plan-clarify" },
    { id: "plan-assumptions", label: "plan-assumptions" },
    { id: "plan-editable", label: "plan-editable" },
    { id: "plan-saved", label: "plan-saved" },
    { id: "plan-ordering", label: "plan-ordering" },
    { id: "plan-parallel", label: "plan-parallel" },
    { id: "plan-replan", label: "plan-replan" },
    { id: "plan-critique", label: "plan-critique" },
    { id: "plan-readonly", label: "plan-readonly" },
    { id: "plan-tracker", label: "plan-tracker" },
    { id: "plan-human-only", label: "plan-human-only" },
    { id: "plan-rollout", label: "plan-rollout" },
    { id: "verify-checks", label: "verify-checks" },
    { id: "verify-criteria", label: "verify-criteria" },
    { id: "verify-test-plan", label: "verify-test-plan" },
    { id: "verify-ci-gate", label: "verify-ci-gate" },
    { id: "verify-limits", label: "verify-limits" },
    { id: "verify-test-guard", label: "verify-test-guard" },
    { id: "verify-evidence", label: "verify-evidence" },
    { id: "verify-pr-fix", label: "verify-pr-fix" },
    { id: "verify-hidden-tests", label: "verify-hidden-tests" },
    { id: "verify-test-quality", label: "verify-test-quality" },
    { id: "route-trigger", label: "route-trigger" },
    { id: "route-rereview", label: "route-rereview" },
    { id: "route-approve", label: "route-approve" },
    { id: "route-fix-comments", label: "route-fix-comments" },
    { id: "route-fix-ci", label: "route-fix-ci" },
    { id: "route-fix-conflicts", label: "route-fix-conflicts" },
    { id: "route-limits", label: "route-limits" },
    { id: "route-state", label: "route-state" },
    { id: "act-list", label: "act-list" },
    { id: "act-status", label: "act-status" },
    { id: "act-reason", label: "act-reason" },
    { id: "act-log", label: "act-log" },
    { id: "act-history", label: "act-history" },
    { id: "act-pr-link", label: "act-pr-link" },
    { id: "act-why", label: "act-why" },
    { id: "act-cost", label: "act-cost" },
    { id: "act-local", label: "act-local" },
  ],
  products: [
    {
      id: "ex",
      name: "Example",
      kind: "factory",
      allowedHosts: ["example.com"],
      cells: {
        "plan-name": cell(),
        "execute-name": cell(),
        "plan-hitl": cell({ chip: "✓", ...over }),
        "plan-persist": cell({ chip: "✗" }),
        "plan-contents": cell({ chip: "◐" }),
        "verify-judge": cell({ chip: "Check + Model" }),
        "verify-runs-app": { omitted: "no page found; checked docs index and quickstart" },
        "verify-keeps-going": cell({ chip: "Goal" }),
        "loop-starts-next": cell({ chip: "Finished run" }),
        "loop-includes-plan": cell({ chip: "✓" }),
        "design-reads": cell({ chip: "✓" }),
        "design-form": cell({ chip: "File" }),
        "design-reuse": cell({ chip: "◐" }),
        "design-approval": cell({ chip: "Human approves" }),
        "design-tasks": cell({ chip: "Plan steps + Parallel" }),
        "plan-clarify": cell({ chip: "✓" }),
        "plan-assumptions": cell({ chip: "◐" }),
        "plan-editable": cell({ chip: "✓" }),
        "plan-saved": cell({ chip: "File + Chat" }),
        "plan-ordering": cell({ chip: "◐" }),
        "plan-parallel": cell({ chip: "✗" }),
        "plan-replan": cell({ chip: "◐" }),
        "plan-critique": cell({ chip: "✗" }),
        "plan-readonly": cell({ chip: "Tool restriction + Instruction only" }),
        "plan-tracker": cell({ chip: "✗" }),
        "plan-human-only": cell({ chip: "✗" }),
        "plan-rollout": cell({ chip: "✗" }),
        "verify-checks": cell({ chip: "✓" }),
        "verify-criteria": cell({ chip: "✓" }),
        "verify-test-plan": cell({ chip: "✓" }),
        "verify-ci-gate": cell({ chip: "✓" }),
        "verify-limits": cell({ chip: "✓" }),
        "verify-test-guard": cell({ chip: "✓" }),
        "verify-evidence": cell({ chip: "Logs + Visual" }),
        "verify-pr-fix": cell({ chip: "✓" }),
        "verify-hidden-tests": cell({ chip: "✓" }),
        "verify-test-quality": cell({ chip: "✓" }),
        "route-trigger": cell({ chip: "✓" }),
        "route-rereview": cell({ chip: "✓" }),
        "route-approve": cell({ chip: "✓" }),
        "route-fix-comments": cell({ chip: "✓" }),
        "route-fix-ci": cell({ chip: "✓" }),
        "route-fix-conflicts": cell({ chip: "✓" }),
        "route-limits": cell({ chip: "✓" }),
        "route-state": cell({ chip: "GitHub" }),
        "act-list": cell({ chip: "✓" }),
        "act-status": cell({ chip: "✓" }),
        "act-reason": cell({ chip: "✓" }),
        "act-log": cell({ chip: "✓" }),
        "act-history": cell({ chip: "✓" }),
        "act-pr-link": cell({ chip: "✓" }),
        "act-why": cell({ chip: "✓" }),
        "act-cost": cell({ chip: "✓" }),
        "act-local": cell({ chip: "✓" }),
      },
      demoable: { kind: "unknown" },
      destination: { summary: "unknown" },
    },
    {
      id: "q",
      name: "Queue",
      kind: "task-queue",
      allowedHosts: ["example.com"],
      queue: cell(),
      demoable: { kind: "unknown" },
      destination: { summary: "unknown" },
    },
  ],
});

const factory = (d: Landscape) => d.products[0] as FactoryProduct;
const queue = (d: Landscape) => d.products[1] as TaskQueueProduct;

describe("validateLandscape", () => {
  test("accepts valid data", () => {
    expect(validateLandscape(make(), TODAY)).toEqual([]);
  });
  test("rejects missing source URL", () => {
    expect(validateLandscape(make({ sourceUrl: "" }), TODAY).join()).toContain("sourceUrl");
  });
  test("rejects missing date", () => {
    expect(validateLandscape(make({ asOf: "" }), TODAY).join()).toContain("asOf");
  });
  test("rejects malformed and impossible and future dates", () => {
    for (const asOf of ["10/10/2026", "2026-1-5", "2026-02-31", "2026-10-13"]) {
      expect(validateLandscape(make({ asOf }), TODAY).join()).toContain("asOf");
    }
  });
  test("rejects non-https and off-domain sources", () => {
    expect(validateLandscape(make({ sourceUrl: "http://docs.example.com/x" }), TODAY).join()).toContain("https");
    expect(validateLandscape(make({ sourceUrl: "https://evil.com/x" }), TODAY).join()).toContain("allowed");
    expect(validateLandscape(make({ sourceUrl: "https://notexample.com/x" }), TODAY).join()).toContain("allowed");
    expect(validateLandscape(make({ sourceUrl: "not a url" }), TODAY).join()).toContain("sourceUrl");
  });
  test("name must be non-empty; explicit unknown allowed", () => {
    expect(validateLandscape(make({ name: "  " }), TODAY).join()).toContain("name");
    expect(validateLandscape(make({ name: "unknown" }), TODAY)).toEqual([]);
  });
  test("missing summary fails", () => {
    expect(validateLandscape(make({ summary: "" }), TODAY).join()).toContain("summary");
  });
  test("component must be cell or omitted with reason", () => {
    const d = make();
    delete (factory(d).cells as Record<string, unknown>)["loop-includes-plan"];
    expect(validateLandscape(d, TODAY).join()).toContain("cell loop-includes-plan: missing");
    const e = make();
    factory(e).cells["verify-runs-app"] = { omitted: "" };
    expect(validateLandscape(e, TODAY).join()).toContain("cell verify-runs-app");
  });
  test("every component cell is required for a factory", () => {
    for (const id of ["plan-name", "execute-name", "plan-hitl", "plan-persist", "plan-contents", "verify-judge", "verify-runs-app", "verify-keeps-going", "loop-starts-next", "loop-includes-plan", "design-reads", "design-form", "design-reuse", "design-approval", "design-tasks", "plan-clarify", "plan-assumptions", "plan-editable", "plan-saved", "plan-ordering", "plan-parallel", "plan-replan", "plan-critique", "plan-readonly", "plan-tracker", "plan-human-only", "plan-rollout", "verify-checks", "verify-criteria", "verify-test-plan", "verify-ci-gate", "verify-limits", "verify-test-guard", "verify-evidence", "verify-pr-fix", "verify-hidden-tests", "verify-test-quality", "route-trigger", "route-rereview", "route-approve", "route-fix-comments", "route-fix-ci", "route-fix-conflicts", "route-limits", "route-state", "act-list", "act-status", "act-reason", "act-log", "act-history", "act-pr-link", "act-why", "act-cost", "act-local"]) {
      const d = make();
      delete (factory(d).cells as Record<string, unknown>)[id];
      expect(validateLandscape(d, TODAY).join()).toContain(`cell ${id}: missing`);
    }
  });
  test("retired components are rejected", () => {
    const d = make();
    d.components = [{ id: "intake" as never, label: "Intake" }];
    expect(validateLandscape(d, TODAY).join()).toContain("components must be");
  });
  test("short is required and at most 8 words", () => {
    expect(validateLandscape(make({ short: "" }), TODAY).join()).toContain("missing short");
    expect(validateLandscape(make({ short: "one two three four five six seven eight" }), TODAY)).toEqual([]);
    expect(validateLandscape(make({ short: "one two three four five six seven eight nine" }), TODAY).join()).toContain(
      "9 words",
    );
  });
  test("chip is required on every populated cell", () => {
    expect(validateLandscape(make({ chip: "" }), TODAY).join()).toContain("missing chip");
    const d = make();
    delete (factory(d).cells["plan-name"] as Partial<Cell>).chip;
    expect(validateLandscape(d, TODAY).join()).toContain("plan-name: missing chip");
    const e = make();
    queue(e).queue = cell({ chip: "" });
    expect(validateLandscape(e, TODAY).join()).toContain("q queue: missing chip");
  });
  test("mark chips must be one of ✓ ✗ ◐", () => {
    for (const chip of ["✓", "✗", "◐"]) expect(validateLandscape(make({ chip }), TODAY)).toEqual([]);
    for (const chip of ["Yes", "✓✓", "✓ + ✗", "x"])
      expect(validateLandscape(make({ chip }), TODAY).join()).toContain("plan-hitl: chip");
  });
  test("label chips must come from the component's set, at most two", () => {
    const withJudge = (chip: string) => {
      const d = make();
      factory(d).cells["verify-judge"] = cell({ chip });
      return validateLandscape(d, TODAY).join();
    };
    expect(withJudge("Person")).toBe("");
    expect(withJudge("Check + Agent")).toBe("");
    expect(withJudge("Goal")).toContain('label "Goal" must be one of');
    expect(withJudge("Check + Model + Agent")).toContain("3 labels (max 2)");
    const d = make();
    factory(d).cells["loop-starts-next"] = cell({ chip: "Hook" });
    expect(validateLandscape(d, TODAY).join()).toContain("loop-starts-next: chip label");
  });
  test("name chips are at most 3 words", () => {
    const withName = (chip: string) => {
      const d = make();
      factory(d).cells["execute-name"] = cell({ chip });
      return validateLandscape(d, TODAY).join();
    };
    expect(withName("Issue to PR")).toBe("");
    expect(withName("Issue to PR automation")).toContain("4 words (max 3)");
    const d = make();
    queue(d).queue = cell({ chip: "one two three four" });
    expect(validateLandscape(d, TODAY).join()).toContain("q queue: chip is 4 words");
  });
  test("task-queue product needs a sourced queue cell", () => {
    const d = make();
    delete (queue(d) as Partial<TaskQueueProduct>).queue;
    expect(validateLandscape(d, TODAY).join()).toContain("q queue: missing");
    const e = make();
    queue(e).queue = cell({ short: "" });
    expect(validateLandscape(e, TODAY).join()).toContain("q queue: missing short");
    const g = make();
    queue(g).queue = cell({ sourceUrl: "https://evil.com/x" });
    expect(validateLandscape(g, TODAY).join()).toContain("allowed");
  });
  test("demoable non-unknown needs source and date; bad kind fails", () => {
    const d = make();
    d.products[0]!.demoable = { kind: "free-tier", summary: "Free plan." };
    const msg = validateLandscape(d, TODAY).join();
    expect(msg).toContain("demoable");
    expect(msg).toContain("sourceUrl");
    expect(msg).toContain("asOf");
    d.products[0]!.demoable = { kind: "bogus" as never };
    expect(validateLandscape(d, TODAY).join()).toContain("kind");
    d.products[0]!.demoable = undefined as never;
    expect(validateLandscape(d, TODAY).join()).toContain("demoable");
  });
  test("destination non-unknown needs source and date", () => {
    const d = make();
    d.products[0]!.destination = { summary: "Goes somewhere." };
    expect(validateLandscape(d, TODAY).join()).toContain("destination");
  });
});

describe("README freshness", () => {
  test("detects stale README", () => {
    const d = make();
    expect(checkReadmeFresh(d, renderLandscape(d))).toEqual([]);
    expect(checkReadmeFresh(d, "stale").length).toBe(1);
  });
  test("renders omitted cells and sources", () => {
    const out = renderLandscape(make());
    expect(out).toContain("no page found; checked docs index and quickstart");
    expect(out).toContain("https://docs.example.com/thing");
    expect(out).toContain("◐ **Thing**");
  });
});

describe("real data", () => {
  const data = JSON.parse(readFileSync("landscape/matrix.json", "utf8")) as Landscape;
  test("is valid", () => {
    expect(validateLandscape(data, new Date().toISOString().slice(0, 10))).toEqual([]);
  });
  test("README is up to date", () => {
    expect(checkReadmeFresh(data, readFileSync("landscape/README.md", "utf8"))).toEqual([]);
  });
  test("covers lesson-1 products", () => {
    expect(data.products.map((p) => p.id).sort()).toEqual(
      ["claude-code", "copilot", "cursor", "devin", "factory", "github-issues", "jira", "linear", "openhands"].sort(),
    );
  });
  test("plan-design cells need chip, short, sourceUrl and asOf", () => {
    for (const id of ["design-reads", "design-form", "design-reuse", "design-approval", "design-tasks"] as const) {
      for (const [field, msg] of [["chip", "missing chip"], ["short", "missing short"], ["sourceUrl", "missing sourceUrl"], ["asOf", "missing asOf"]] as const) {
        const d = make();
        factory(d).cells[id] = cell({ chip: "✓", [field]: "" });
        expect(validateLandscape(d, TODAY).join()).toContain(`cell ${id}: ${msg}`);
      }
    }
  });
  test("plan-design chips follow their format", () => {
    const withCell = (id: "design-reads" | "design-form" | "design-approval" | "design-tasks", chip: string) => {
      const d = make();
      factory(d).cells[id] = cell({ chip });
      return validateLandscape(d, TODAY).join();
    };
    expect(withCell("design-reads", "Yes")).toContain("must be one of");
    expect(withCell("design-form", "File + Chat")).toBe("");
    expect(withCell("design-form", "Essay")).toContain("chip label");
    expect(withCell("design-approval", "Human")).toBe("");
    expect(withCell("design-approval", "Sometimes")).toContain("chip label");
    expect(withCell("design-tasks", "Tickets")).toBe("");
    expect(withCell("design-tasks", "Plan steps + Parallel + Tickets")).toContain("3 labels (max 2)");
  });
  test("plan-design cell may be omitted with a reason", () => {
    const d = make();
    factory(d).cells["design-reuse"] = { omitted: "not documented; checked Plan Mode page" };
    expect(validateLandscape(d, TODAY)).toEqual([]);
  });
  test("depth dimension chips follow their format", () => {
    const withCell = (id: "plan-clarify" | "plan-saved" | "plan-readonly", chip: string) => {
      const d = make();
      factory(d).cells[id] = cell({ chip });
      return validateLandscape(d, TODAY).join();
    };
    expect(withCell("plan-clarify", "◐")).toBe("");
    expect(withCell("plan-clarify", "Yes")).toContain("must be one of");
    expect(withCell("plan-saved", "Chat + File")).toBe("");
    expect(withCell("plan-saved", "Database")).toContain("chip label");
    expect(withCell("plan-readonly", "Tool restriction + Instruction only")).toBe("");
    expect(withCell("plan-readonly", "Honor system")).toContain("chip label");
  });
  test("depth dimension cells need chip, short, sourceUrl and asOf", () => {
    for (const id of ["plan-clarify", "plan-readonly"] as const) {
      for (const [field, msg] of [["chip", "missing chip"], ["short", "missing short"], ["sourceUrl", "missing sourceUrl"], ["asOf", "missing asOf"]] as const) {
        const d = make();
        factory(d).cells[id] = cell({ chip: "✓", [field]: "" });
        expect(validateLandscape(d, TODAY).join()).toContain(`cell ${id}: ${msg}`);
      }
    }
  });
  test("depth dimension cell may be omitted with a reason", () => {
    const d = make();
    factory(d).cells["plan-rollout"] = { omitted: "not documented; checked Plan Mode page" };
    expect(validateLandscape(d, TODAY)).toEqual([]);
  });
  test("verify depth dimension chips follow their format", () => {
    const withCell = (id: "verify-checks" | "verify-evidence", chip: string) => {
      const d = make();
      factory(d).cells[id] = cell({ chip });
      return validateLandscape(d, TODAY).join();
    };
    expect(withCell("verify-checks", "◐")).toBe("");
    expect(withCell("verify-checks", "Yes")).toContain("must be one of");
    expect(withCell("verify-evidence", "Logs + Visual")).toBe("");
    expect(withCell("verify-evidence", "Video")).toContain("chip label");
    expect(withCell("verify-evidence", "Logs + Visual + Logs")).toContain("labels (max 2)");
  });
  test("verify depth dimension cells need chip, short, sourceUrl and asOf", () => {
    for (const id of ["verify-checks", "verify-pr-fix"] as const) {
      for (const [field, msg] of [["chip", "missing chip"], ["short", "missing short"], ["sourceUrl", "missing sourceUrl"], ["asOf", "missing asOf"]] as const) {
        const d = make();
        factory(d).cells[id] = cell({ chip: "✓", [field]: "" });
        expect(validateLandscape(d, TODAY).join()).toContain(`cell ${id}: ${msg}`);
      }
    }
  });
  test("verify depth dimension cell may be omitted with a reason", () => {
    const d = make();
    factory(d).cells["verify-test-guard"] = { omitted: "not documented; checked the best-practices page" };
    expect(validateLandscape(d, TODAY)).toEqual([]);
  });
});

describe("CLI", () => {
  const CLI = resolve(import.meta.dir, "check-landscape.ts");

  const run = (data: Landscape, readme: string) => {
    const cwd = mkdtempSync(join(tmpdir(), "landscape-cli-"));
    mkdirSync(join(cwd, "landscape"));
    writeFileSync(join(cwd, "landscape/matrix.json"), JSON.stringify(data));
    writeFileSync(join(cwd, "landscape/README.md"), readme);
    const proc = Bun.spawnSync(["bun", CLI], { cwd });
    return { code: proc.exitCode, out: proc.stdout.toString(), err: proc.stderr.toString() };
  };

  test("valid matrix with fresh README exits 0 and prints ok", () => {
    const d = make();
    const r = run(d, renderLandscape(d));
    expect(r.code).toBe(0);
    expect(r.out.trim()).toBe("landscape: ok");
  });
  test("invalid matrix exits 1 with a landscape error on stderr", () => {
    const r = run(make({ sourceUrl: "" }), renderLandscape(make()));
    expect(r.code).toBe(1);
    expect(r.err).toContain("landscape: ");
    expect(r.err).toContain("missing sourceUrl");
    expect(r.out).toBe("");
  });
  test("valid matrix with stale README exits 1 with the stale message", () => {
    const r = run(make(), "stale");
    expect(r.code).toBe(1);
    expect(r.err).toContain("landscape: landscape/README.md is stale");
    expect(r.out).toBe("");
  });
  test("routing dimension chips follow their format", () => {
    const withCell = (id: "route-rereview" | "route-state", chip: string) => {
      const d = make();
      factory(d).cells[id] = cell({ chip });
      return validateLandscape(d, TODAY).join();
    };
    expect(withCell("route-rereview", "◐")).toBe("");
    expect(withCell("route-rereview", "Yes")).toContain("must be one of");
    expect(withCell("route-state", "GitHub + Own app")).toBe("");
    expect(withCell("route-state", "Slack")).toContain("chip label");
    expect(withCell("route-state", "GitHub + Own app + GitHub")).toContain("labels (max 2)");
  });
  test("routing dimension cells need chip, short, sourceUrl and asOf", () => {
    for (const id of ["route-trigger", "route-fix-ci"] as const) {
      for (const [field, msg] of [["chip", "missing chip"], ["short", "missing short"], ["sourceUrl", "missing sourceUrl"], ["asOf", "missing asOf"]] as const) {
        const d = make();
        factory(d).cells[id] = cell({ chip: "✓", [field]: "" });
        expect(validateLandscape(d, TODAY).join()).toContain(`cell ${id}: ${msg}`);
      }
    }
  });
  test("routing dimension cell may be omitted with a reason", () => {
    const d = make();
    factory(d).cells["route-fix-conflicts"] = { omitted: "not documented; checked the cloud agent page" };
    expect(validateLandscape(d, TODAY)).toEqual([]);
  });
});

describe("committed matrix", () => {
  test("every factory product carries the hidden-test and test-quality dimensions", () => {
    const data = JSON.parse(readFileSync(resolve(import.meta.dir, "../landscape/matrix.json"), "utf8")) as Landscape;
    const factories = data.products.filter((p): p is FactoryProduct => p.kind === "factory");
    expect(factories.length).toBe(6);
    for (const id of ["verify-hidden-tests", "verify-test-quality"] as const) {
      expect(data.components.map((c) => c.id)).toContain(id);
      for (const p of factories) expect(p.cells[id]).toBeDefined();
    }
  });
});
