import path from "path";
import { JSDOM } from "jsdom";
import { describe, it, expect } from "vitest";
import { h1Single, headingHierarchy } from "./headings";
import { runChecks } from "../runner";
import type { CustomViolation } from "../types";

const testFilesDir = path.resolve(__dirname, '..', "test-files");

describe("Heading Rules", () => {
  describe('h1Single function', () => {
    it.each([
      {
        name: "passes with one <h1>",
        html: `<h1>Main Heading</h1><h2>Subheading</h2>`,
        expected: [],
      },
      {
        name: "violates with multiple <h1>",
        html: `<h1>Heading 1</h1><h1>Another Heading 1</h1>`,
        expected: [{ id: "h1-single", valid: false, nodes: 2 }],
      },
      {
        name: "violates with no <h1>",
        html: `<p>No H1 here</p>`,
        expected: [{ id: "h1-missing", valid: false, nodes: 0 }],
      },
    ])("should $name", ({ html, expected }) => {
      const dom = new JSDOM(`<html><body>${html}</body></html>`);
      const violations = h1Single(dom.window.document);

      if (expected.length === 0) {
        expect(violations).toHaveLength(0);
      } else {
        expect(violations[0].id).toBe(expected[0].id);
        expect(violations[0].valid).toBe(expected[0].valid);
        expect(violations[0].nodes).toHaveLength(expected[0].nodes);
      }
    });
  });

  describe("headingHierarchy function", () => {
    it.each([
      {
        name: "passes with proper hierarchy",
        html: `
          <h1>Main Heading</h1>
          <h2>Subheading</h2>
          <h3>Sub-subheading</h3>
          <h2>Another Subheading</h2>
        `,
        expected: [],
      },
      {
        name: "violates when first heading is not h1",
        html: `
          <h2>Subheading first</h2>
          <h1>Sub-subheading</h1>
        `,
        expected: [{ id: "heading-hierarchy", valid: false, nodes: 1 }],
      },
    ])("should $name", ({ html, expected }) => {
      const dom = new JSDOM(`<html><body>${html}</body></html>`);
      const violations = headingHierarchy(dom.window.document);

      if (expected.length === 0) {
        expect(violations).toHaveLength(0);
      } else {
        expect(violations[0].id).toBe(expected[0].id);
        expect(violations[0].valid).toBe(expected[0].valid);
        expect(violations[0].nodes).toHaveLength(expected[0].nodes);
      }
    });
  });

  describe("runChecks integration", () => {
    it.each([
      {
        name: "violates with multiple <h1>",
        file: "multiple-h1.html",
        id: "h1-single",
        valid: false,
        nodes: 2,
      },
      {
        name: "violates with no <h1>",
        file: "missing-h1.html",
        id: "h1-missing",
        valid: false,
        nodes: 0,
      },
      {
        name: "violates with heading hierarchy",
        file: "heading-hierarchy.html",
        id: "heading-hierarchy",
        valid: false,
        nodes: 1,
      },
    ])("should $name", async ({ file, id, valid, nodes }) => {
      const filePath = path.resolve(testFilesDir, file);
      const violations: CustomViolation[] = await runChecks(filePath);

      expect(violations[0].id).toBe(id);
      expect(violations[0].valid).toBe(valid);
      expect(violations[0].nodes).toHaveLength(nodes);
    });
  });
});