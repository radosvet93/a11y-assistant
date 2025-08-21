import { CheerioAPI } from "cheerio";
import { CheckResult } from "../runner";

export function checkImgAlt($: CheerioAPI): CheckResult[] {
  const results: CheckResult[] = [];
  if ($("img").length === 0) {
    results.push({
      ok: true,
      message: "No <img> elements found, skipping alt text check",
    });
  }

  $("img").each((_, el) => {
    const alt = $(el).attr("alt");
    const line = el.sourceCodeLocation?.startLine;
    if (!alt || alt.trim() === "") {
      results.push({
        ok: false,
        message: `<img> missing alt attribute on line ${line}`,
        explanation:
          "Screen reader users rely on alt text to understand images.",
        suggestion: '<img src="example.png" alt="Describe the image here">',
      });
    }
  });


  if (results.length === 0) {
    results.push({ ok: true, message: "All images have alt text" });
  }
  return results;
}
