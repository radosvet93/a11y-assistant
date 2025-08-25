import * as rules from '../rules';
import type { CustomViolation } from "../types";
import type { JSDOM } from "jsdom";

export function runCustomChecks(document: Document, dom: JSDOM): CustomViolation[] {
  const violations: CustomViolation[] = [];

  Object.values(rules).forEach(rule => {
    violations.push(...rule(document, dom));
  });

  return violations;
}
