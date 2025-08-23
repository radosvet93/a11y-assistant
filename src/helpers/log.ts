import chalk from 'chalk';
import boxen from 'boxen';

import { CustomViolation } from '../types';

const success = chalk.green;
const warning = chalk.yellow;
const info = chalk.cyan;
const highlight = chalk.bold;
const title = chalk.bold.underline;

export const logReport = (a11yReport: CustomViolation[], fullPath: string) => {
  if (a11yReport.length === 0) {
    console.log(success(`\n🎉 No accessibility issues found in: ${fullPath}\n`));
    process.exit(0);
  }

  console.log(success(`\nAccessibility checks completed for: ${fullPath}\n`));
  console.log(title("🔎 A11y Assistant Report\n"));

  a11yReport.forEach(({ valid, message, explanation, suggestion, helpUrl, nodes }, index) => {
    const header = `${valid ? "✅ PASSED" : "❌ ISSUE"} ${index + 1}: ${message}`;

    const content = [
      warning(`Why:`) + ` ${explanation}`,
      highlight(`Fix:`) + ` ${suggestion}`,
      info(`Link:`) + ` ${helpUrl}`,
      info(`File:`) + ` ${fullPath}`,
      nodes?.length
        ? info(`Nodes:`) +
        `\n${nodes.map((node, i) => `  ${i + 1}. ${node.trim()}`).join("\n")}`
        : ""
    ].filter(Boolean).join("\n");

    const box = boxen(`${header}\n\n${content}`, {
      padding: 1,
      margin: 1,
      borderColor: valid ? "green" : "red",
      borderStyle: "single",
    });

    console.log(box);
  });

  console.log(success(`\nFound ${a11yReport.length} accessibility issue(s) in total.`));
}