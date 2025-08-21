import { load } from "cheerio";
import { checkImgAlt } from "./rules/img-alt";
import { checkFormLabels } from "./rules/form-label";
import { checkHeadingOrder } from "./rules/heading-order";

export type CheckResult = {
  ok: boolean;
  message: string;
  explanation?: string;
  suggestion?: string;
};

export function runChecks(html: string): CheckResult[] {
  const $ = load(html, { sourceCodeLocationInfo: true });
  return [
    ...checkImgAlt($),
    ...checkFormLabels($),
    ...checkHeadingOrder($),
  ];
}
