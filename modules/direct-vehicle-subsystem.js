/** Delivery-neutral, Warden-authorized subsystem effect. No attack roll or Health damage. */
import { VEHICLE_TAC_CATEGORIES, VEHICLE_TAC_SEVERITIES, VEHICLE_PLATFORM_TYPES, VEHICLE_PLATFORM_RULES } from "../data/vehicle-tac/index.js";

const CONDITIONS = ["operational", "degraded", "compromised", "failing", "destroyed"];
const BY_SEVERITY = { light: "degraded", moderate: "compromised", severe: "failing", catastrophic: "destroyed" };
const DELIVERIES = ["ballistic", "explosive", "sabotage", "electronic", "electromagnetic", "other"];

export function resolveDirectVehicleSubsystem({ subsystemId, subsystemLabel, category, severity = "light", delivery = "other", platformType = "light_vehicle", existingSubsystem = null } = {}) {
  if (typeof subsystemId !== "string" || !subsystemId.trim()) throw new TypeError("Direct subsystem effect requires subsystemId");
  if (!VEHICLE_TAC_CATEGORIES.includes(category)) throw new RangeError("Unknown subsystem category");
  if (!VEHICLE_TAC_SEVERITIES.includes(severity)) throw new RangeError("Unknown subsystem severity");
  if (!DELIVERIES.includes(delivery)) throw new RangeError("Unknown delivery method");
  if (!VEHICLE_PLATFORM_TYPES.includes(platformType)) throw new RangeError("Unknown platform type");
  if (existingSubsystem && existingSubsystem.id !== subsystemId) throw new RangeError("Existing subsystem ID does not match target");
  const prior = existingSubsystem?.condition ?? "operational";
  if (!CONDITIONS.includes(prior)) throw new RangeError("Unknown prior subsystem condition");
  // Repeated direct damage follows the same severity escalation doctrine as TAC.
  const priorSeverity = existingSubsystem?.lastSeverity;
  if (priorSeverity && !VEHICLE_TAC_SEVERITIES.includes(priorSeverity)) throw new RangeError("Unknown prior subsystem severity");
  const severityIndex = VEHICLE_TAC_SEVERITIES.indexOf(severity);
  const minimumIndex = priorSeverity ? Math.min(3, VEHICLE_TAC_SEVERITIES.indexOf(priorSeverity) + 1) : 0;
  const finalSeverity = VEHICLE_TAC_SEVERITIES[Math.max(severityIndex, minimumIndex)];
  const condition = CONDITIONS[Math.max(CONDITIONS.indexOf(prior), CONDITIONS.indexOf(BY_SEVERITY[finalSeverity]))];
  const label = subsystemLabel?.trim() || existingSubsystem?.label || subsystemId;
  const effectText = `${label}: ${condition} (${delivery} direct subsystem effect). Vehicle Health unchanged.`;
  const nextState = Object.freeze({ ...existingSubsystem, id: subsystemId, label, category, condition, lastSeverity: finalSeverity, resultId: "direct_subsystem", tags: Object.freeze(["direct_subsystem", delivery]), effectText });
  const handoffs = Object.freeze({ wound: null, hazard: null, crewSave: null, secondaryTac: null, countdown: null, bailout: null });
  return Object.freeze({ resolverId: "vehicle_tac", directSubsystem: true, delivery, healthDamage: 0, tacCount: 0, platformType, platformGuidance: VEHICLE_PLATFORM_RULES[platformType], rolledSeverity: severity, shiftedSeverity: severity, finalSeverity, severityShift: 0,
    escalation: Object.freeze({ applied: finalSeverity !== severity, fromSeverity: priorSeverity ?? null, minimumSeverity: priorSeverity ? VEHICLE_TAC_SEVERITIES[minimumIndex] : null, finalSeverity, reason: priorSeverity ? "existing_subsystem_damage" : null }),
    category: Object.freeze({ id: category, mode: "preferred", source: "direct_subsystem", roll: null }), outcomeRoll: null,
    outcome: Object.freeze({ id: "direct_subsystem", label: `${label} — direct effect`, effectText, tags: Object.freeze([delivery]) }),
    subsystem: Object.freeze({ id: subsystemId, label, previousState: existingSubsystem ? Object.freeze({ ...existingSubsystem }) : null, nextState }), handoffs,
    stateChanges: Object.freeze([{ operation: existingSubsystem ? "replace_vehicle_subsystem" : "add_vehicle_subsystem", category, subsystemId, value: nextState }]) });
}
