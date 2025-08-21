import { CheerioAPI } from "cheerio";
import { CheckResult } from "../runner";

export function checkHeadingOrder($: CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  const headings = $("h1, h2, h3, h4, h5, h6").toArray();
  let expectedLevel = 1;
  let firstHeading = true;

  headings.forEach((el) => {
    const line = el.sourceCodeLocation?.startLine;
    const level = parseInt(el.tagName[1]);

    if (firstHeading) {
      if (level !== 1) {
        results.push({
          ok: false,
          message: `First heading should be <h1>, found <h${level}> on line ${line}`,
          explanation: "The first heading on the page should be <h1> for proper document structure.",
          suggestion: `Change <h${level}> to <h1> or adjust your heading order.`,
        });
        expectedLevel = 1;
      }
      firstHeading = false;
    } else {

      if (level !== expectedLevel + 1 && level !== expectedLevel) {
        results.push({
          ok: false,
          message: `Incorrect heading order: expected <h${expectedLevel + 1}> or <h${expectedLevel}>, found <h${level}> on line ${line}`,
          explanation: "Headings must follow a strict, logical order (e.g., <h1> → <h2> → <h3>), without skipping levels.",
          suggestion: `Change <h${level}> to <h${expectedLevel + 1}> or <h${expectedLevel}> as appropriate.`,
        });
        expectedLevel = level;
      } else {
        expectedLevel = level;
      }

      if (level === 1) {
        results.push({
          ok: false,
          message: `Multiple <h1> headings found on line ${line}`,
          explanation: "Page should have only one <h1> heading.",
          suggestion: "Use <h2> or lower for subsequent headings.",
        });
        return;
      }
    }
  });

  if (results.length === 0) {
    results.push({ ok: true, message: "Heading order is logical" });
  }
  return results;
}
