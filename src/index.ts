import fs from "fs";
import path from "path";
import { analyseFile } from "./lib";
import { logReport } from "./helpers/log";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: a11y-assistant <html-file>");
  process.exit(1);
}

const fullPath = path.resolve(filePath);

if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

(async () => {
  try {
    const report = await analyseFile(fullPath);

    logReport(report, fullPath);

  } catch (err) {
    if (err instanceof Error) {
      console.error(`Failed to run checks: ${(err).message}`);
    }

    process.exit(1);
  }
})();
