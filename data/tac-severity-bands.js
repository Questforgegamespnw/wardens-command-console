export const TAC_SEVERITY_ORDER = Object.freeze([
  "light",
  "moderate",
  "severe",
  "complete",
]);

export const TAC_SEVERITY_WEIGHTS = Object.freeze({
  1: { light: 70, moderate: 15, severe: 10, complete: 5 },
  2: { light: 15, moderate: 70, severe: 10, complete: 5 },
  3: { light: 5, moderate: 10, severe: 70, complete: 15 },
});

export function dampenTacSeverity(severityId) {
  const index = TAC_SEVERITY_ORDER.indexOf(severityId);
  if (index < 0) throw new RangeError(`Unknown TAC severity: ${severityId}`);
  return TAC_SEVERITY_ORDER[Math.max(0, index - 1)];
}

export function shiftTacSeverity(severityId, steps = 0) {
  const index = TAC_SEVERITY_ORDER.indexOf(severityId);
  if (index < 0) throw new RangeError(`Unknown TAC severity: ${severityId}`);
  const next = Math.max(0, Math.min(TAC_SEVERITY_ORDER.length - 1, index + Number(steps)));
  return TAC_SEVERITY_ORDER[next];
}
