import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import { runCustomChecks } from "./customChecks";

export async function runChecks(fullPath: string) {
  const html = fs.readFileSync(fullPath, "utf-8");

  const dom = new JSDOM(html);
  const { window } = dom;

  const config = {
    rules: {
      'color-contrast': { enabled: false },
      'link-in-text-block': { enabled: false }
    }
  };
  const results = await axe.run(window.document.documentElement, config);

  const axeViolations = results.violations.map((violation) => ({
    valid: false,
    message: violation.help,
    explanation: violation.description,
    suggestion: violation.help,
    helpUrl: violation.helpUrl,
    file: path.resolve(fullPath),
    nodes: violation.nodes.map((n) => n.html)
  }));

  const customViolations = runCustomChecks(html);

  return [...axeViolations, ...customViolations];
}
