import {
  TAC_SEVERITY_ORDER,
  TAC_SEVERITY_WEIGHTS,
  dampenTacSeverity,
  shiftTacSeverity,
} from "../data/tac-severity-bands.js";

import {
  PERSONNEL_TAC_CATEGORIES,
  getPersonnelTacSeverity,
  getPersonnelTacOutcome,
} from "../data/personnel-tac.js";

import {
  worsenArmorState,
  calculateEffectiveAv,
  DEFAULT_BROKEN_STATE,
} from "../data/personal-armor.js";

export function resolvePersonnelTac({
  tacCount = 1,
  currentArmorState = "intact",
  originalAv = 0,
  dampeningActive = false,
  severityShift = 0,
  forcedSeverity = null,
  categoryMode = "random",
  preferredCategory = null,
  forcedRoll = null,
  sealWarningActive = false,
  hostileEnvironment = false,
  random = Math.random,
} = {}) {
  const normalizedTacCount = clampTacCount(tacCount);

  const rolledSeverity = forcedSeverity
    ? validateSeverity(forcedSeverity)
    : rollTacSeverity(normalizedTacCount, random);

  const shiftedSeverity = shiftTacSeverity(
    rolledSeverity,
    Number(severityShift) || 0,
  );

  const dampenedSeverity = dampeningActive
    ? dampenTacSeverity(shiftedSeverity)
    : shiftedSeverity;

  const categoryResult = chooseCategory({
    severity: dampenedSeverity,
    categoryMode,
    preferredCategory,
    forcedRoll,
    random,
  });

  const sealWarningApplied =
    sealWarningActive &&
    categoryResult.category === "seal_life_support";

  const finalSeverity = sealWarningApplied
    ? shiftTacSeverity(dampenedSeverity, 1)
    : dampenedSeverity;

  const outcome = finalSeverity === "complete"
    ? getPersonnelTacOutcome("complete")
    : getPersonnelTacOutcome(finalSeverity, {
        category: categoryResult.category,
      });

  const severityData = getPersonnelTacSeverity(finalSeverity);

  const nextArmorState = worsenArmorState(
    currentArmorState,
    severityData.armorState,
  );

  const previousEffectiveAv = calculateEffectiveAv(
    originalAv,
    currentArmorState,
  );

  const effectiveAv = calculateEffectiveAv(
    originalAv,
    nextArmorState,
  );

  const exposureRequired = Boolean(
    hostileEnvironment &&
    outcome.effects?.exposureIfHostile,
  );

  return Object.freeze({
    resolverId: "personnel_tac",
    tacCount: normalizedTacCount,
    currentArmorState,
    nextArmorState,
    originalAv: Number(originalAv) || 0,
    previousEffectiveAv,
    effectiveAv,
    rolledSeverity,
    shiftedSeverity,
    dampenedSeverity,
    finalSeverity,
    forcedSeverity: forcedSeverity ?? null,
    severityShift: Number(severityShift) || 0,
    dampeningActive: Boolean(dampeningActive),
    categoryMode: categoryResult.mode,
    category: categoryResult.category,
    categoryRoll: categoryResult.roll,
    preferredCategory:
      categoryResult.mode === "preferred"
        ? categoryResult.category
        : null,
    sealWarningActive: Boolean(sealWarningActive),
    sealWarningApplied,
    sealWarningConsumed: sealWarningApplied,
    hostileEnvironment: Boolean(hostileEnvironment),
    exposureRequired,
    outcome,
    systemChanges: buildSystemChanges(outcome, finalSeverity),
    brokenState:
      nextArmorState === "broken"
        ? DEFAULT_BROKEN_STATE
        : null,
  });
}

function rollTacSeverity(tacCount, random) {
  const weights = TAC_SEVERITY_WEIGHTS[tacCount];
  const roll = random() * 100;
  let cursor = 0;

  for (const severity of TAC_SEVERITY_ORDER) {
    cursor += Number(weights[severity] ?? 0);

    if (roll < cursor) {
      return severity;
    }
  }

  return "complete";
}

function chooseCategory({
  severity,
  categoryMode,
  preferredCategory,
  forcedRoll,
  random,
}) {
  if (severity === "complete") {
    return {
      mode: "automatic",
      category: "complete_failure",
      roll: null,
    };
  }

  if (categoryMode === "preferred") {
    validateCategory(preferredCategory);

    return {
      mode: "preferred",
      category: preferredCategory,
      roll: null,
    };
  }

  const roll =
    forcedRoll === null ||
    forcedRoll === undefined ||
    forcedRoll === ""
      ? Math.floor(random() * 4) + 1
      : Number(forcedRoll);

  if (!Number.isInteger(roll) || roll < 1 || roll > 4) {
    throw new RangeError(
      "Personnel TAC category roll must be an integer from 1 to 4.",
    );
  }

  const outcome = getPersonnelTacOutcome(
    severity,
    { roll },
  );

  return {
    mode: "random",
    category: outcome.category,
    roll,
  };
}

function buildSystemChanges(outcome, finalSeverity) {
  const effects = outcome.effects ?? {};

  if (
    finalSeverity === "complete" ||
    effects.disableAllArmorSystems
  ) {
    return {
      disableAllArmorSystems: true,
      disabled: ["all_armor_systems"],
      suppressed: [],
    };
  }

  return {
    disableAllArmorSystems: false,
    disabled: effects.systemsDisabled ?? [],
    suppressed: effects.systemsSuppressed ?? [],
  };
}

function clampTacCount(value) {
  const numeric = Math.trunc(Number(value));

  if (!Number.isFinite(numeric)) {
    return 1;
  }

  return Math.max(1, Math.min(3, numeric));
}

function validateSeverity(value) {
  if (!TAC_SEVERITY_ORDER.includes(value)) {
    throw new RangeError(
      `Unknown TAC severity: ${value}`,
    );
  }

  return value;
}

function validateCategory(value) {
  if (!PERSONNEL_TAC_CATEGORIES.includes(value)) {
    throw new RangeError(
      `Unknown personnel TAC category: ${value}`,
    );
  }

  return value;
}
