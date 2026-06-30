export const SHIP_SYSTEM_CONDITIONS = Object.freeze([
  "operational",
  "degraded",
  "compromised",
  "failing",
  "destroyed",
]);

export const SHIP_SYSTEM_CONDITION_RANK = Object.freeze(
  Object.fromEntries(SHIP_SYSTEM_CONDITIONS.map((id, index) => [id, index])),
);

export const SHIP_TAC_SEVERITIES = Object.freeze([
  "minor", "moderate", "severe", "broken",
]);

export const SHIP_TAC_SEVERITY_RANK = Object.freeze(
  Object.fromEntries(SHIP_TAC_SEVERITIES.map((id, index) => [id, index])),
);

export const SHIP_TAC_MINIMUM_BY_CONDITION = Object.freeze({
  operational: "minor",
  degraded: "moderate",
  compromised: "severe",
  failing: "broken",
  destroyed: "redirect",
});

export const SHIP_CONDITION_BY_SEVERITY = Object.freeze({
  minor: "degraded",
  moderate: "compromised",
  severe: "failing",
  broken: "destroyed",
});

export const SHIP_PAPER_STATUS_BY_CONDITION = Object.freeze({
  operational: "OK",
  degraded: "Strained",
  compromised: "Damaged",
  failing: "Dangerous",
  destroyed: "Offline",
});

export function escalateShipTacSeverity(requestedSeverity, existingCondition = "operational") {
  const minimum = SHIP_TAC_MINIMUM_BY_CONDITION[existingCondition];
  if (!minimum || minimum === "redirect") {
    return { severity: requestedSeverity, redirected: minimum === "redirect" };
  }

  const requestedRank = SHIP_TAC_SEVERITY_RANK[requestedSeverity];
  const minimumRank = SHIP_TAC_SEVERITY_RANK[minimum];

  if (requestedRank === undefined || minimumRank === undefined) {
    throw new RangeError("Unknown Ship TAC severity or condition.");
  }

  return {
    severity: requestedRank >= minimumRank ? requestedSeverity : minimum,
    minimumSeverity: minimum,
    escalated: requestedRank < minimumRank,
    redirected: false,
  };
}

export function getNextShipCondition(severity) {
  const result = SHIP_CONDITION_BY_SEVERITY[severity];
  if (!result) throw new RangeError(`Unknown Ship TAC severity: ${severity}`);
  return result;
}

export function getShipCrisisState({ classId, unresolvedSevereOrBroken }) {
  const count = Math.max(0, Number(unresolvedSevereOrBroken) || 0);
  const id = Number(classId);

  if (id === 0) {
    if (count >= 2) return "loss_likely";
    if (count >= 1) return "probably_disabled";
    return "stable";
  }

  if ([1, 2].includes(id)) {
    if (count >= 3) return "abandon_surrender_or_die";
    if (count >= 2) return "probably_disabled";
    if (count >= 1) return "active_crisis";
  }

  return count > 0 ? "active_crisis" : "stable";
}
