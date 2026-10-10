import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { checkReadmeFresh, validateLandscape } from "./check-landscape.ts";
import { renderLandscape } from "./render-landscape.ts";
import type { Cell, Landscape } from "./landscape-types.ts";

const TODAY = "2026-10-10";

const cell = (over: Partial<Cell> = {}): Cell => ({
  name: "Thing",
  summary: "Does a thing.",
  sourceUrl: "https://docs.example.com/thing",
  asOf: "2026-10-10",
  ...over,
});

const make = (over: Partial<Cell> = {}): Landscape => ({
  components: [
    { id: "intake", label: "Intake" },
    { id: "planning", label: "Planning / task queue" },
    { id: "execution", label: "Execution" },
  ],
  products: [
    {
      id: "ex",
      name: "Example",
      kind: "factory",
      allowedHosts: ["example.com"],
      cells: {
        intake: cell(over),
        planning: { omitted: "no first-party page found" },
        execution: cell(),
      },
      demoable: { kind: "unknown" },
      destination: { summary: "unknown" },
    },
  ],
});

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
    for (const asOf of ["10/10/2026", "2026-1-5", "2026-02-31", "2026-10-11"]) {
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
    delete (d.products[0]!.cells as Record<string, unknown>).execution;
    expect(validateLandscape(d, TODAY).join()).toContain("execution");
    const e = make();
    e.products[0]!.cells.planning = { omitted: "" };
    expect(validateLandscape(e, TODAY).join()).toContain("planning");
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
    expect(out).toContain("no first-party page found");
    expect(out).toContain("https://docs.example.com/thing");
  });
});

describe("real data", () => {
  const data = JSON.parse(readFileSync("landscape/matrix.json", "utf8")) as Landscape;
  test("is valid", () => {
    expect(validateLandscape(data, TODAY)).toEqual([]);
  });
  test("README is up to date", () => {
    expect(checkReadmeFresh(data, readFileSync("landscape/README.md", "utf8"))).toEqual([]);
  });
  test("covers lesson-1 products", () => {
    expect(data.products.map((p) => p.id).sort()).toEqual(
      ["claude-code", "codegen", "copilot", "cursor", "devin", "factory", "github-issues", "jira", "linear", "openhands"].sort(),
    );
  });
});
