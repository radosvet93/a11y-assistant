import { duplicateIds, h1Single } from '../rules';
import type { CustomViolation } from "../types";

export function runCustomChecks(document: Document): CustomViolation[] {
  const violations: CustomViolation[] = [];

  violations.push(...h1Single(document), ...duplicateIds(document));

  return violations;
}
