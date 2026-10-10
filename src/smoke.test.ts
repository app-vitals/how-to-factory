import { expect, test } from "bun:test";
import { repoName } from "./index";

test("exposes the repo name", () => {
  expect(repoName).toBe("how-to-factory");
});
