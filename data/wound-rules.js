export const WOUND_SEVERITIES = Object.freeze([
  "light",
  "moderate",
  "severe",
  "deadly",
]);

export const PERSONNEL_WOUND_CAPACITY = Object.freeze({
  sourceStat: "strength",
  formula: "floor(strength / 10)",
  minimumWounds: 1,
  typicalMaximumWounds: 3,
  maximumHumanWounds: 5,
  healthPerWound: 15,
});

export const WOUND_THRESHOLD_RULES = Object.freeze({
  first: {
    allowedSeverities: ["light", "moderate"],
  },
  second: {
    allowedSeverities: ["light", "moderate", "severe"],
  },
  third: {
    allowedSeverities: ["light", "moderate", "severe", "deadly"],
    ordinaryRestrictionsRemoved: true,
  },
});

export const TRAUMA_DAMPENING_RULES = Object.freeze({
  standard: "shift_down_one_band",
  plus: "force_light",
});

export const OVERFLOW_RULES = Object.freeze({
  thresholdPerAdditionalWound: 10,
  allHealthDamageContributes: true,
  ongoingDamageContributes: true,
  bleedingContributes: true,
});

export const BLEEDING_RULES = Object.freeze({
  stacks: true,
  tickTiming: "end_of_turn",
  damagePerTick: "current_bleeding",
  persistsUntilStopped: true,
  contributesToOverflow: true,
});

export const TERMINAL_STATE_RULES = Object.freeze({
  deathCheck: "Resolve immediately. Failure means death.",
  fatalTimer:
    "Countdown to death. Stabilization stops the timer unless stated otherwise.",
  overwhelmingDestruction:
    "If the fiction establishes an unsurvivable end, no roll is required.",
});

export const DEADLY_AUTHORIZATION_REASONS = Object.freeze([
  "direct_wound_weapon",
  "lethal_weapon_property",
  "execution",
  "extreme_overflow",
  "catastrophic_position",
  "expired_severe_countdown",
  "third_or_later_wound",
  "warden_authorized",
]);

export const WOUND_STATES = Object.freeze([
  "active",
  "stabilized",
  "treated",
  "recovering",
  "permanent",
]);

export function derivePersonnelMaximumWounds(strength) {
  const numericStrength = Number(strength);
  if (!Number.isFinite(numericStrength)) {
    return PERSONNEL_WOUND_CAPACITY.minimumWounds;
  }

  return Math.max(
    PERSONNEL_WOUND_CAPACITY.minimumWounds,
    Math.min(
      PERSONNEL_WOUND_CAPACITY.maximumHumanWounds,
      Math.floor(numericStrength / 10),
    ),
  );
}

export function resolvePersonnelMaximumWounds({
  maximumWounds,
  strength,
  allowExceptionalCapacity = false,
} = {}) {
  if (Number.isFinite(Number(maximumWounds))) {
    const requested = Math.max(1, Math.floor(Number(maximumWounds)));
    return allowExceptionalCapacity
      ? requested
      : Math.min(requested, PERSONNEL_WOUND_CAPACITY.maximumHumanWounds);
  }

  return derivePersonnelMaximumWounds(strength);
}

export function getAllowedWoundSeverities(woundNumber) {
  const numeric = Math.max(1, Math.floor(Number(woundNumber) || 1));
  if (numeric === 1) return [...WOUND_THRESHOLD_RULES.first.allowedSeverities];
  if (numeric === 2) return [...WOUND_THRESHOLD_RULES.second.allowedSeverities];
  return [...WOUND_THRESHOLD_RULES.third.allowedSeverities];
}

export function shiftWoundSeverity(severity, steps = 0) {
  const index = WOUND_SEVERITIES.indexOf(severity);
  if (index < 0) return null;

  const shifted = Math.max(
    0,
    Math.min(WOUND_SEVERITIES.length - 1, index + Number(steps || 0)),
  );

  return WOUND_SEVERITIES[shifted];
}

export function capWoundSeverity(severityId, capId) {
  const severityIndex = WOUND_SEVERITIES.indexOf(severityId);
  const capIndex = WOUND_SEVERITIES.indexOf(capId);
  if (severityIndex < 0 || capIndex < 0) {
    throw new RangeError("Unknown wound severity");
  }
  return WOUND_SEVERITIES[Math.min(severityIndex, capIndex)];
}
