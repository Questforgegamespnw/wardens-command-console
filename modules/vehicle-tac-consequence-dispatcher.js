/** Classify Vehicle TAC handoffs without executing their consequences. */
const ROUTES = Object.freeze({
  wound: "personnel_wound",
  crewSave: "standard_test",
  hazard: "environmental_hazard",
  countdown: "crisis_countdown",
  secondaryTac: "vehicle_tac",
  bailout: "crew_decision",
});

/**
 * Event IDs are allocated ONCE by the caller when a TAC result is created.
 * The same resolutionId must be reused for redisplay, reload, and retries.
 * Legacy callers may omit it; their old action ID shape is retained.
 */
export function collectVehicleTacPendingActions(vehicleTac, {
  vehicleId = null,
  resolutionId = null,
  parentResolutionId = null,
  attackId = null,
} = {}) {
  if (!vehicleTac || vehicleTac.resolverId !== "vehicle_tac") {
    throw new TypeError("Expected a Vehicle TAC resolution result.");
  }
  if (resolutionId != null && (typeof resolutionId !== "string" || !resolutionId.trim())) {
    throw new TypeError("resolutionId must be a nonempty string.");
  }
  const origin = {
    resolverId: "vehicle_tac",
    vehicleId,
    resolutionId,
    parentResolutionId,
    attackId,
    outcomeId: vehicleTac.outcome?.id ?? null,
    subsystemId: vehicleTac.subsystem?.id ?? null,
    category: vehicleTac.category?.id ?? null,
    severity: vehicleTac.finalSeverity ?? null,
  };
  const actions = [];
  for (const [key, route] of Object.entries(ROUTES)) {
    const details = vehicleTac.handoffs?.[key];
    if (details == null || details === false) continue;
    actions.push({
      id: resolutionId != null
        ? `${resolutionId}:${key}`
        : `${origin.outcomeId ?? "unknown"}:${origin.subsystemId ?? "unknown"}:${key}`,
      status: "pending",
      type: key,
      route,
      origin: { ...origin },
      details: JSON.parse(JSON.stringify(details)),
    });
  }
  return actions;
}

/**
 * Returns the actions not previously applied, without executing any of them.
 * The caller must persist applied IDs after successful execution; merely
 * displaying/queuing an action is NOT application.
 */
export function filterUnappliedVehicleTacActions(actions, appliedConsequenceIds) {
  const applied = new Set(appliedConsequenceIds);
  return actions.filter((action) => !applied.has(action.id));
}
