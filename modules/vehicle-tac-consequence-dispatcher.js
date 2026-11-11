/** Classify Vehicle TAC handoffs without executing their consequences. */
const ROUTES = Object.freeze({
  wound: "personnel_wound",
  crewSave: "standard_test",
  hazard: "environmental_hazard",
  countdown: "crisis_countdown",
  secondaryTac: "vehicle_tac",
  bailout: "crew_decision",
});

/** Pure function: caller owns persistence, UI and any later execution. */
export function collectVehicleTacPendingActions(vehicleTac, { vehicleId = null } = {}) {
  if (!vehicleTac || vehicleTac.resolverId !== "vehicle_tac") {
    throw new TypeError("Expected a Vehicle TAC resolution result.");
  }
  const origin = {
    resolverId: "vehicle_tac",
    vehicleId,
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
      id: `${origin.outcomeId ?? "unknown"}:${origin.subsystemId ?? "unknown"}:${key}`,
      status: "pending",
      type: key,
      route,
      origin: { ...origin },
      details: JSON.parse(JSON.stringify(details)),
    });
  }
  return actions;
}
