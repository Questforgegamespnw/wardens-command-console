import { TAC_SEVERITY_ORDER, TAC_SEVERITY_WEIGHTS, shiftTacSeverity } from "../data/tac-severity-bands.js";
import {
  VEHICLE_TAC_CATEGORIES,
  VEHICLE_TAC_SEVERITIES,
  VEHICLE_SUBSYSTEM_CONDITIONS,
  VEHICLE_PLATFORM_TYPES,
  VEHICLE_PLATFORM_RULES,
  getVehicleTacTable,
  getVehicleTacOutcome,
} from "../data/vehicle-tac/index.js";

const CONDITION_BY_SEVERITY = Object.freeze({
  light: "degraded",
  moderate: "compromised",
  severe: "failing",
  catastrophic: "destroyed",
});

const CONDITION_RANK = Object.freeze({
  operational: 0, degraded: 1, compromised: 2, failing: 3, destroyed: 4,
});

const VEHICLE_SEVERITY_ORDER = Object.freeze(["light", "moderate", "severe", "catastrophic"]);
const VEHICLE_SEVERITY_RANK = Object.freeze({ light: 0, moderate: 1, severe: 2, catastrophic: 3 });

export function resolveVehicleTac({
  tacCount = 1,
  severityShift = 0,
  forcedSeverity = null,
  categoryMode = "random",
  preferredCategory = null,
  preferredCategorySource = null,
  forcedCategoryRoll = null,
  forcedOutcomeRoll = null,
  platformType = "light_vehicle",
  subsystemId = null,
  subsystemLabel = null,
  existingSubsystem = null,
  random = Math.random,
} = {}) {
  validatePlatform(platformType);
  const normalizedTacCount = clampTacCount(tacCount);
  const rolledSeverity = forcedSeverity ? validateSeverity(forcedSeverity) : rollBaseSeverity(normalizedTacCount, random);
  const shiftedSeverity = shiftVehicleSeverity(rolledSeverity, Number(severityShift) || 0);
  const escalation = applyExistingSubsystemEscalation(shiftedSeverity, existingSubsystem);
  const finalSeverity = escalation.finalSeverity;
  const categoryResult = chooseCategory({ categoryMode, preferredCategory, preferredCategorySource, forcedCategoryRoll, random });
  const tableCategory = finalSeverity === "catastrophic" ? "catastrophic" : categoryResult.id;
  const table = getVehicleTacTable(tableCategory);
  const outcomeRoll = forcedOutcomeRoll === null || forcedOutcomeRoll === undefined || forcedOutcomeRoll === ""
    ? Math.floor(random() * table.length) + 1
    : Number(forcedOutcomeRoll);
  const outcome = getVehicleTacOutcome(tableCategory, outcomeRoll);
  const effect = finalSeverity === "catastrophic"
    ? { text: outcome.effectText, tags: outcome.tags ?? [], handoffs: outcome.handoffs ?? {} }
    : outcome.effects[finalSeverity];
  const resolvedSubsystemId = subsystemId || `${categoryResult.id}_${outcome.id}`;
  const previousCondition = existingSubsystem?.condition ?? "operational";
  const proposedCondition = CONDITION_BY_SEVERITY[finalSeverity];
  const nextCondition = worseCondition(previousCondition, proposedCondition);
  const nextSubsystem = Object.freeze({
    id: resolvedSubsystemId,
    label: subsystemLabel || outcome.label,
    category: categoryResult.id,
    condition: nextCondition,
    lastSeverity: finalSeverity,
    resultId: outcome.id,
    tags: Object.freeze([...(effect.tags ?? [])]),
    effectText: effect.text,
  });
  return Object.freeze({
    resolverId: "vehicle_tac",
    tacCount: normalizedTacCount,
    platformType,
    platformGuidance: VEHICLE_PLATFORM_RULES[platformType],
    rolledSeverity,
    shiftedSeverity,
    finalSeverity,
    severityShift: Number(severityShift) || 0,
    escalation,
    category: Object.freeze(categoryResult),
    outcomeRoll,
    outcome: Object.freeze({ id: outcome.id, label: outcome.label, effectText: effect.text, tags: Object.freeze([...(effect.tags ?? [])]) }),
    subsystem: Object.freeze({
      id: resolvedSubsystemId,
      label: subsystemLabel || outcome.label,
      previousState: existingSubsystem ? Object.freeze({ ...existingSubsystem }) : null,
      nextState: nextSubsystem,
    }),
    handoffs: Object.freeze(normalizeHandoffs(effect.handoffs)),
    stateChanges: Object.freeze([{
      operation: existingSubsystem ? "replace_vehicle_subsystem" : "add_vehicle_subsystem",
      category: categoryResult.id,
      subsystemId: resolvedSubsystemId,
      value: nextSubsystem,
    }]),
  });
}

function rollBaseSeverity(tacCount, random) {
  const weights = TAC_SEVERITY_WEIGHTS[tacCount];
  const roll = Math.max(0, Math.min(0.999999, Number(random()))) * 100;
  let cursor = 0;
  for (const severity of TAC_SEVERITY_ORDER) {
    cursor += Number(weights[severity] ?? 0);
    if (roll < cursor) return severity === "complete" ? "catastrophic" : severity;
  }
  return "catastrophic";
}

function chooseCategory({ categoryMode, preferredCategory, preferredCategorySource, forcedCategoryRoll, random }) {
  if (categoryMode === "preferred") {
    validateCategory(preferredCategory);
    return { mode: "preferred", id: preferredCategory, roll: null, source: preferredCategorySource || "manual" };
  }
  if (categoryMode !== "random") throw new RangeError(`Unknown Vehicle TAC category mode: ${categoryMode}`);
  const roll = forcedCategoryRoll === null || forcedCategoryRoll === undefined || forcedCategoryRoll === ""
    ? Math.floor(random() * VEHICLE_TAC_CATEGORIES.length) + 1
    : Number(forcedCategoryRoll);
  if (!Number.isInteger(roll) || roll < 1 || roll > VEHICLE_TAC_CATEGORIES.length) {
    throw new RangeError(`Vehicle TAC category roll must be 1-${VEHICLE_TAC_CATEGORIES.length}.`);
  }
  return { mode: "random", id: VEHICLE_TAC_CATEGORIES[roll - 1], roll, source: null };
}

function applyExistingSubsystemEscalation(severity, existingSubsystem) {
  if (!existingSubsystem || !existingSubsystem.lastSeverity) {
    return Object.freeze({ applied: false, fromSeverity: null, minimumSeverity: null, finalSeverity: severity, reason: null });
  }
  const previous = validateSeverity(existingSubsystem.lastSeverity);
  const minimum = previous === "light" ? "moderate" : previous === "moderate" ? "severe" : "catastrophic";
  const finalSeverity = VEHICLE_SEVERITY_RANK[severity] >= VEHICLE_SEVERITY_RANK[minimum] ? severity : minimum;
  return Object.freeze({ applied: finalSeverity !== severity, fromSeverity: previous, minimumSeverity: minimum, finalSeverity, reason: "existing_subsystem_damage" });
}

function shiftVehicleSeverity(severity, amount) {
  validateSeverity(severity);
  const rank = Math.max(0, Math.min(VEHICLE_SEVERITY_ORDER.length - 1, VEHICLE_SEVERITY_RANK[severity] + Math.trunc(amount)));
  return VEHICLE_SEVERITY_ORDER[rank];
}

function worseCondition(a, b) {
  validateCondition(a); validateCondition(b);
  return CONDITION_RANK[a] >= CONDITION_RANK[b] ? a : b;
}

function normalizeHandoffs(source = {}) {
  return {
    wound: source.wound ?? null,
    hazard: source.hazard ?? null,
    crewSave: source.crewSave ?? null,
    secondaryTac: source.secondaryTac ?? null,
    countdown: source.countdown ?? null,
    bailout: source.bailout ?? null,
  };
}

function clampTacCount(value) {
  const numeric = Math.trunc(Number(value));
  return Number.isFinite(numeric) ? Math.max(1, Math.min(3, numeric)) : 1;
}
function validateSeverity(value) { if (!VEHICLE_TAC_SEVERITIES.includes(value)) throw new RangeError(`Unknown Vehicle TAC severity: ${value}`); return value; }
function validateCategory(value) { if (!VEHICLE_TAC_CATEGORIES.includes(value)) throw new RangeError(`Unknown Vehicle TAC category: ${value}`); return value; }
function validateCondition(value) { if (!VEHICLE_SUBSYSTEM_CONDITIONS.includes(value)) throw new RangeError(`Unknown vehicle subsystem condition: ${value}`); return value; }
function validatePlatform(value) { if (!VEHICLE_PLATFORM_TYPES.includes(value)) throw new RangeError(`Unknown vehicle platform type: ${value}`); return value; }
