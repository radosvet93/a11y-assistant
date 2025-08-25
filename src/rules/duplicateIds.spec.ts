import path from "path";
import { JSDOM } from "jsdom";
import { describe, it, expect } from "vitest";
import { runChecks } from "../runner";
import type { CustomViolation } from "../types";
import { duplicateIds } from "./duplicateIds";

const testFilesDir = path.resolve(__dirname, '..', "test-files");

describe("duplicateIds Rules", () => {
  describe("duplicateIds function", () => {
    it.each([
      {
        name: "passes with unique IDs",
        html: `<div id="unique">Div</div><div id="more-unique">Div</div>`,
        expected: [],
      },
      {
        name: "violates with same IDs",
        html: `<div id="not-unique">Div</div><div id="not-unique">Div</div>`,
        expected: [{ id: "duplicate-ids", valid: false, nodes: 2 }],
      },
    ])("should $name", ({ html, expected }) => {
      const dom = new JSDOM(`<html><body>${html}</body></html>`);
      const violations = duplicateIds(dom.window.document);

      if (expected.length === 0) {
        expect(violations).toHaveLength(0);
      } else {
        expect(violations[0].id).toBe(expected[0].id);
        expect(violations[0].valid).toBe(expected[0].valid);
        expect(violations[0].nodes).toHaveLength(expected[0].nodes);
      }
    });
  });

  describe('runChecks integration', () => {
    it("should violates with same IDs", async () => {
      const filePath = path.resolve(testFilesDir, "duplicate-ids.html");
      const violations: CustomViolation[] = await runChecks(filePath);

      expect(violations[0].id).toBe('duplicate-ids');
      expect(violations[0].valid).toBe(false);
      expect(violations[0].nodes).toHaveLength(2);
    });
  });
});