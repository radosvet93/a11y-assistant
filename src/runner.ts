import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import { runCustomChecks } from "./helpers/customChecks";

export type RunChecksOptions = {
  raw?: boolean;
  sourcePath?: string;
}

export async function runChecks(input: string, options?: RunChecksOptions) {
  const html = options?.raw
    ? input
    : fs.readFileSync(input, "utf-8");
  const dom = new JSDOM(html, { includeNodeLocations: true });
  const { document } = dom.window;

  const config = {
    rules: {
      'color-contrast': { enabled: false },
      'link-in-text-block': { enabled: false }
    }
  };

  const { violations } = await axe.run(document.documentElement, config);

  const filePath = options?.raw
    ? (options.sourcePath ? path.resolve(options.sourcePath) : undefined)
    : path.resolve(input);

  const axeViolations = violations.map((violation) => ({
    valid: false,
    message: violation.help,
    explanation: violation.description,
    suggestion: violation.help,
    helpUrl: violation.helpUrl,
    file: filePath,
    nodes: violation.nodes.map((n) => n.html)
  }));

  const customViolations = runCustomChecks(document, dom);

  return [...axeViolations, ...customViolations];
}
