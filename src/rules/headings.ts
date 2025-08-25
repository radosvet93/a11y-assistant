import type { CustomViolation } from "../types";

export const h1Single = (document: Document): CustomViolation[] => {
  const results: CustomViolation[] = [];
  const h1s = document.querySelectorAll("h1");

  if (h1s.length > 1) {
    results.push({
      id: "h1-single",
      valid: false,
      message: `Multiple <h1> headings found`,
      explanation: "Page should have only one <h1> heading.",
      suggestion: "Use <h2> or lower for subsequent headings.",
      helpUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
      nodes: Array.from(h1s).map((heading) => heading.outerHTML)
    });
  } else if (h1s.length === 0) {
    results.push({
      id: "h1-missing",
      valid: false,
      message: `No <h1> heading found`,
      explanation: "Every page should have one <h1> heading to define its main topic.",
      suggestion: "Add a single <h1> element that describes the main content of the page.",
      helpUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
      nodes: []
    });
  }

  return results;
}

export const headingHierarchy = (document: Document): CustomViolation[] => {
  const results: CustomViolation[] = [];
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));

  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName[1], 10);

    if (index === 0 && currentLevel !== 1) {
      results.push({
        id: "heading-hierarchy",
        valid: false,
        message: `First heading is <h${currentLevel}> instead of <h1>.`,
        explanation: "The page should start with a single <h1> heading to define the main title.",
        suggestion: "Change this heading to <h1>.",
        helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
        nodes: [heading.outerHTML],
      });
    }
  });

  return results;
};
