import { CheerioAPI } from "cheerio";
import { CheckResult } from "../runner";

export function checkFormLabels($: CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  $("input, textarea, select").each((_, el) => {
    const id = $(el).attr("id");
    const line = el.sourceCodeLocation?.startLine;
    const hasLabel = id && $(`label[for="${id}"]`).length > 0;
    if (!hasLabel) {
      results.push({
        ok: false,
        message: `<${el.tagName}> missing associated label in line ${line}`,
        explanation:
          "Form fields must have labels so users know what information to enter.",
        suggestion: `<label for="fieldId">Field Label</label>\n<input id="fieldId">`,
      });
    }
  });

  if (results.length === 0) {
    results.push({ ok: true, message: "All form fields have labels" });
  }
  return results;
}
