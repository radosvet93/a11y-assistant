import * as rules from '../rules';
import type { CustomViolation } from "../types";

export function runCustomChecks(document: Document): CustomViolation[] {
  const violations: CustomViolation[] = [];

  Object.values(rules).forEach(rule => {
    violations.push(...rule(document));
  });

  return violations;
}
