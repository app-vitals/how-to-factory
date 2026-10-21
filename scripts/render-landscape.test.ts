import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import type { Landscape } from "./landscape-types.ts";
import { renderLandscape } from "./render-landscape.ts";

describe("CLI", () => {
  const CLI = resolve(import.meta.dir, "render-landscape.ts");
  const matrixText = readFileSync(resolve(import.meta.dir, "../landscape/matrix.json"), "utf8");

  const run = () => {
    const cwd = mkdtempSync(join(tmpdir(), "render-landscape-cli-"));
    mkdirSync(join(cwd, "landscape"));
    writeFileSync(join(cwd, "landscape/matrix.json"), matrixText);
    const proc = Bun.spawnSync(["bun", CLI], { cwd });
    return { cwd, code: proc.exitCode, out: proc.stdout.toString(), err: proc.stderr.toString() };
  };

  test("writes landscape/README.md equal to renderLandscape(matrix)", () => {
    const r = run();
    expect(r.code).toBe(0);
    const written = readFileSync(join(r.cwd, "landscape/README.md"), "utf8");
    expect(written).toBe(renderLandscape(JSON.parse(matrixText) as Landscape));
  });
  test("prints the wrote message on stdout and exits 0", () => {
    const r = run();
    expect(r.code).toBe(0);
    expect(r.out.trim()).toBe("wrote landscape/README.md");
    expect(r.err).toBe("");
  });
});
