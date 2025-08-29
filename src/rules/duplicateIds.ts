import type { CustomViolation } from "../types";
import type { JSDOM } from "jsdom";

export const duplicateIds = (document: Document, dom: JSDOM) => {
  const results: CustomViolation[] = [];
  const ids = new Map<string, HTMLElement[]>();

  document.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
    const id = el.id;

    if (!ids.has(id)) {
      ids.set(id, []);
    }

    const elementsWithSameIds = ids.get(id);

    if (elementsWithSameIds) {
      elementsWithSameIds.push(el);
    }
  });

  for (const [id, elements] of ids.entries()) {
    if (elements.length > 1) {
      results.push({
        id: "duplicate-ids",
        valid: false,
        message: `Duplicate id "${id}" found on ${elements.length} elements`,
        explanation: "IDs must be unique in the DOM to ensure predictable behaviour for scripts and assistive tech.",
        suggestion: "Update or remove duplicate IDs to make them unique.",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id",
        severity: "warning",
        nodes: elements.map((el) => ({
          html: el.outerHTML,
          line: dom.nodeLocation(elements[0])?.startLine ?? 0,
          column: dom.nodeLocation(elements[0])?.startCol ?? 0
        }))
      });
    }
  }

  return results;
}
