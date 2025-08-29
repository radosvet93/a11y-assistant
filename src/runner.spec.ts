import { describe, it, expect } from "vitest";
import path from "path";
import { runChecks } from "./runner";
import type { CustomViolation } from "./types";

const testFilesDir = path.resolve(__dirname, "test-files");

describe("runChecks", () => {
  it("should return no violations for an accessible HTML file", async () => {
    const filePath = path.resolve(testFilesDir, "no-violations.html");
    const violations: CustomViolation[] = await runChecks(filePath);
    expect(violations).toHaveLength(0);
  });

  it("should return violations for an inaccessible HTML file", async () => {
    const filePath = path.join(testFilesDir, "inaccessible.html");
    const violations: CustomViolation[] = await runChecks(filePath);
    expect(violations.length).toBeGreaterThan(0);
  });

  it("should return the correct axe and custom violations", async () => {
    const filePath = path.join(testFilesDir, "inaccessible.html");
    const violations: CustomViolation[] = await runChecks(filePath);

    // Should return the violation structure from axe-core and custom rules
    expect(violations[0]).toHaveProperty("valid", false);
    expect(violations[0]).toHaveProperty("message", "Buttons must have discernible text");
    expect(violations[0]).toHaveProperty("explanation", "Ensure buttons have discernible text");
    expect(violations[0]).toHaveProperty("suggestion", "Buttons must have discernible text");
    expect(violations[0]).toHaveProperty("helpUrl", "https://dequeuniversity.com/rules/axe/4.10/button-name?application=axeAPI");
    expect(violations[0]).toHaveProperty("nodes",);

    expect(violations[1]).toHaveProperty("id", "h1-missing");
    expect(violations[1]).toHaveProperty("valid", false);
    expect(violations[1]).toHaveProperty("message", 'No <h1> heading found');
    expect(violations[1]).toHaveProperty("explanation", "Every page should have one <h1> heading to define its main topic.");
    expect(violations[1]).toHaveProperty("suggestion", 'Add a single <h1> element that describes the main content of the page.');
    expect(violations[1]).toHaveProperty("helpUrl", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements");
    expect(violations[1]).toHaveProperty("nodes", [{ html: '', line: 0, column: 0 }]);
  })
});
