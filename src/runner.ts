import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import { runCustomChecks } from "./helpers/customChecks";

export async function runChecks(fullPath: string) {
  const html = fs.readFileSync(fullPath, "utf-8");
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const config = {
    rules: {
      'color-contrast': { enabled: false },
      'link-in-text-block': { enabled: false }
    }
  };

  const { violations } = await axe.run(document.documentElement, config);

  const axeViolations = violations.map((violation) => ({
    valid: false,
    message: violation.help,
    explanation: violation.description,
    suggestion: violation.help,
    helpUrl: violation.helpUrl,
    file: path.resolve(fullPath),
    nodes: violation.nodes.map((n) => n.html)
  }));

  const customViolations = runCustomChecks(document);

  return [...axeViolations, ...customViolations];
}
