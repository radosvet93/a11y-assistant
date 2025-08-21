import fs from "fs";
import path from "path";
import { runChecks } from "./runner";
import ora from 'ora';
import { log, error, success, info, warning, highlight } from './logHelpers';

const filePath = process.argv[2];

if (!filePath) {
  console.error(error("Usage: a11y-assistant <html-file>"));
  process.exit(1);
}

const fullPath = path.resolve(filePath);

if (!fs.existsSync(fullPath)) {
  console.error(error(`File not found: ${fullPath}`));
  process.exit(1);
}

const html = fs.readFileSync(fullPath, "utf-8");
const results = runChecks(html);

const spinner = ora('Running accessibility checks...').start();

setTimeout(() => {
  spinner.stop();

  log(success(`\nAccessibility checks completed for: ${fullPath}\n`));

  log(info("\n🔎 A11y Assistant Report\n"));
  results.forEach(r => {
    const status = r.ok ? "✅" : "❌";
    log(info(`${status} ${r.message}`));
    if (!r.ok && r.explanation) {
      log(warning(`   Why: ${r.explanation}`));
      log(highlight(`   Fix: ${r.suggestion}\n`));
    }
  });
}, 1000);
