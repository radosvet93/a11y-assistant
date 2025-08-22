import fs from "fs";
import path from "path";
import ora from "ora";
import { runChecks } from "./runner";
import { logReport } from "./helpers/log";

const filePath = process.argv[2];
const fullPath = path.resolve(filePath);

if (!filePath) {
  console.error("Usage: tsx src/index.ts <html-file>");
  process.exit(1);
}

if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

(async () => {
  const spinner = ora("Running accessibility checks...").start();

  try {
    const a11yReport = await runChecks(fullPath);

    spinner.stop();

    logReport(a11yReport, fullPath);

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Failed to run checks: ${err.message}`);
    }
    spinner.stop();
    process.exit(1);
  }
})();
