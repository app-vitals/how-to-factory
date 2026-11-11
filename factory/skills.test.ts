import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SKILLS = ["dev-task", "review", "patch"] as const;

function readSkill(name: string): string {
  return readFileSync(join(import.meta.dir, "skills", name, "SKILL.md"), "utf8");
}

/** Text of the `## Result` section, up to the next `## ` heading or the end of the file. */
function resultSection(text: string): string | null {
  const match = text.match(/^## Result\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m);
  return match?.[1] ?? null;
}

describe.each(SKILLS)("%s skill", (name) => {
  const text = readSkill(name);

  test("has a Result section naming both outcomes and when to use skipped", () => {
    const section = resultSection(text);
    expect(section).not.toBeNull();
    expect(section).toMatch(/processed/i);
    expect(section).toMatch(/skipped/i);
    expect(section).toMatch(/one-sentence reason/i);
    expect(section).toMatch(/deliberately did nothing/i);
  });

  test("asks for no result file and no hand-written JSON", () => {
    expect(text).not.toMatch(/result file/i);
    expect(resultSection(text) ?? "").not.toMatch(/json/i);
  });

  test("keeps the exit non-zero rule", () => {
    expect(text).toMatch(/Exit non-zero/);
  });
});
