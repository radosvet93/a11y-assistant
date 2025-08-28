import { runChecks } from "./runner";

export async function analyseFile(filePath: string) {
  return await runChecks(filePath);
}

export async function analyseHtml(htmlContent: string, sourcePath?: string) {
  return await runChecks(htmlContent, { raw: true, sourcePath });
}