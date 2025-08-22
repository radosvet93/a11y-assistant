import { JSDOM } from "jsdom";
import { h1Single } from './rules';
import { type CustomViolation } from "./types";

export function runCustomChecks(html: string): CustomViolation[] {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const violations: CustomViolation[] = [];

  violations.push(...h1Single(document));

  return violations;
}
