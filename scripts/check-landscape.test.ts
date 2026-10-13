import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
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
  ...over,
});

const make = (over: Partial<Cell> = {}): Landscape => ({
  components: [
    { id: "plan-output", label: "Plan output" },
    { id: "plan-drive", label: "Plan: who drives" },
    { id: "verify", label: "Verify" },
    { id: "loop-across", label: "Loop across" },
    { id: "loop-drive", label: "Loop: who drives" },
  ],
  products: [
    {
      id: "ex",
      name: "Example",
      kind: "factory",
      allowedHosts: ["example.com"],
      cells: {
        "plan-output": cell(over),
        "plan-drive": cell(),
        verify: { omitted: "no page found; checked docs index and quickstart" },
        "loop-across": cell(),
        "loop-drive": cell(),
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
    delete (factory(d).cells as Record<string, unknown>)["loop-drive"];
    expect(validateLandscape(d, TODAY).join()).toContain("cell loop-drive: missing");
    const e = make();
    factory(e).cells.verify = { omitted: "" };
    expect(validateLandscape(e, TODAY).join()).toContain("cell verify");
  });
  test("every component cell is required for a factory", () => {
    for (const id of ["plan-output", "plan-drive", "verify", "loop-across", "loop-drive"]) {
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
});
