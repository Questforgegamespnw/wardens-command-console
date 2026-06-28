/**
 * Calm Resolver
 *
 * Resolves:
 * - Panic Checks
 * - Calm loss
 * - Calm recovery
 * - legacy Stress conversion
 *
 * Resolve is exposed as an optional player-facing intervention.
 * It is never spent or applied automatically.
 */

import {
  rollD100,
  rollNotation
} from "./dice.js";

import {
  CALM_RULES,
  getCalmPanicEffect,
  getCalmLossBand,
  getCalmRecoveryBand,
  convertStressToCalm
} from "../data/calm.js";

const RESOLVER_ID = "calm";

const CALM_OPERATION_TYPES = Object.freeze({
  PANIC_CHECK: "panic_check",
  LOSS: "loss",
  RECOVERY: "recovery",
  STRESS_CONVERSION: "stress_conversion"
});

const ROLL_MODES = Object.freeze({
  NORMAL: "normal",
  ADVANTAGE: "advantage",
  DISADVANTAGE: "disadvantage"
});

/* -------------------------------------------------------------------------- */
/* Public Resolver                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Main Calm resolver.
 *
 * @param {object} input
 * @returns {object}
 */
export function resolveCalm(input = {}) {
  const normalized = normalizeCalmInput(input);
  const errors = validateCalmInput(normalized);

  if (errors.length > 0) {
    return createCalmErrorResult(
      normalized,
      errors
    );
  }

  switch (normalized.operation) {
    case CALM_OPERATION_TYPES.PANIC_CHECK:
      return resolvePanicCheck(normalized);

    case CALM_OPERATION_TYPES.LOSS:
      return resolveCalmLoss(normalized);

    case CALM_OPERATION_TYPES.RECOVERY:
      return resolveCalmRecovery(normalized);

    case CALM_OPERATION_TYPES.STRESS_CONVERSION:
      return resolveStressConversion(normalized);

    default:
      return createCalmErrorResult(
        normalized,
        [
          createValidationError(
            "operation",
            "unknown_operation",
            `Unknown Calm operation: ${normalized.operation}`
          )
        ]
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Panic Check                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Resolves a d100 roll-under Panic Check.
 *
 * Critical doctrine:
 * - matching digits on a success = critical success
 * - matching digits on a failure = critical failure
 * - 100 is represented as 100, not 00
 *
 * @param {object} input
 * @returns {object}
 */
export function resolvePanicCheck(input = {}) {
  const normalized =
    input.__normalized === true
      ? input
      : normalizeCalmInput({
          ...input,
          operation:
            CALM_OPERATION_TYPES.PANIC_CHECK
        });

  const errors =
    input.__normalized === true
      ? []
      : validateCalmInput(normalized);

  if (errors.length > 0) {
    return createCalmErrorResult(
      normalized,
      errors
    );
  }

  const rollResolution =
    resolvePercentileRoll({
      target: normalized.currentCalm,
      rollMode: normalized.rollMode,
      manualRoll: normalized.manualRoll
    });

  const panicEffect =
    rollResolution.success
      ? null
      : getCalmPanicEffect(
          rollResolution.finalRoll
        );

  const automaticCalmChange =
    resolvePanicAutomaticCalmChange({
      rollResolution,
      panicEffect
    });

  const proposedState =
    calculateProposedCalmState({
      currentCalm: normalized.currentCalm,
      maximumCalm: normalized.maximumCalm,
      calmChange:
        automaticCalmChange.totalChange
    });

  const resolveOptions =
    buildResolveInterventionOptions({
      input: normalized,
      rollResolution,
      panicEffect,
      automaticCalmChange
    });

  const outcome =
    getPanicOutcomeType(rollResolution);

  return {
    id: createResultId("calm"),
    resolverId: RESOLVER_ID,
    operation:
      CALM_OPERATION_TYPES.PANIC_CHECK,
    status:
      rollResolution.success
        ? "success"
        : "failure",

    label:
      normalized.label ||
      "Panic Check",

    summary:
      createPanicSummary({
        rollResolution,
        panicEffect
      }),

    ruling:
      createPanicRuling({
        rollResolution,
        panicEffect,
        automaticCalmChange
      }),

    outcome,

    input: {
      currentCalm:
        normalized.currentCalm,

      maximumCalm:
        normalized.maximumCalm,

      rollMode:
        normalized.rollMode,

      manualRoll:
        normalized.manualRoll,

      resolveAvailable:
        normalized.resolveAvailable,

      resolveAmount:
        normalized.resolveAmount,

      notes:
        normalized.notes
    },

    roll: rollResolution,

    panicEffect,

    calmChange:
      automaticCalmChange,

    previousState: {
      currentCalm:
        normalized.currentCalm,

      maximumCalm:
        normalized.maximumCalm
    },

    proposedState,

    stateDelta: {
      calm:
        proposedState.currentCalm -
        normalized.currentCalm,

      maximumCalm:
        proposedState.maximumCalm -
        normalized.maximumCalm
    },

    commitStatus: "uncommitted",

    resolveIntervention:
      resolveOptions,

    metadata: {
      schemaVersion:
        CALM_RULES.schemaVersion,

      criticalDoctrine:
        "matching_digits",

      exactTarget:
        rollResolution.exactTarget,

      panicTableRoll:
        panicEffect
          ? rollResolution.finalRoll
          : null,

      requiresPanicEffect:
        !rollResolution.success,

      requiresManualFollowUp:
        requiresManualPanicFollowUp(
          panicEffect
        ),

      generatedAt:
        new Date().toISOString()
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Calm Loss                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Resolves Calm loss from either:
 * - a guideline band
 * - explicit notation
 * - a fixed numeric amount
 *
 * @param {object} input
 * @returns {object}
 */
export function resolveCalmLoss(input = {}) {
  const normalized =
    input.__normalized === true
      ? input
      : normalizeCalmInput({
          ...input,
          operation:
            CALM_OPERATION_TYPES.LOSS
        });

  const errors =
    input.__normalized === true
      ? []
      : validateCalmInput(normalized);

  if (errors.length > 0) {
    return createCalmErrorResult(
      normalized,
      errors
    );
  }

  const band =
    normalized.bandId
      ? getCalmLossBand(
          normalized.bandId
        )
      : null;

  const sourceAmount =
    normalized.amount ??
    band?.calmLoss ??
    null;

  const amountResolution =
    resolveCalmAmount(sourceAmount);

  if (amountResolution.status === "error") {
    return createCalmErrorResult(
      normalized,
      amountResolution.errors
    );
  }

  const lossAmount =
    Math.abs(amountResolution.total);

  const proposedState =
    calculateProposedCalmState({
      currentCalm:
        normalized.currentCalm,

      maximumCalm:
        normalized.maximumCalm,

      calmChange:
        -lossAmount
    });

  return {
    id: createResultId("calm_loss"),
    resolverId: RESOLVER_ID,
    operation:
      CALM_OPERATION_TYPES.LOSS,
    status: "success",

    label:
      normalized.label ||
      band?.label ||
      "Calm Loss",

    summary:
      `Lose ${lossAmount} Calm.`,

    ruling:
      `${normalized.currentCalm} Calm becomes ${proposedState.currentCalm} Calm.`,

    outcome: "calm_loss",

    band,

    amount: {
      source: sourceAmount,
      rolls: amountResolution.rolls,
      total: lossAmount
    },

    previousState: {
      currentCalm:
        normalized.currentCalm,

      maximumCalm:
        normalized.maximumCalm
    },

    proposedState,

    stateDelta: {
      calm:
        proposedState.currentCalm -
        normalized.currentCalm,

      maximumCalm: 0
    },

    commitStatus: "uncommitted",

    metadata: {
      schemaVersion:
        CALM_RULES.schemaVersion,

      notes:
        normalized.notes,

      generatedAt:
        new Date().toISOString()
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Calm Recovery                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Resolves Calm recovery from either:
 * - a recovery guideline band
 * - explicit notation
 * - a fixed numeric amount
 *
 * Recovery is clamped to Maximum Calm.
 *
 * @param {object} input
 * @returns {object}
 */
export function resolveCalmRecovery(input = {}) {
  const normalized =
    input.__normalized === true
      ? input
      : normalizeCalmInput({
          ...input,
          operation:
            CALM_OPERATION_TYPES.RECOVERY
        });

  const errors =
    input.__normalized === true
      ? []
      : validateCalmInput(normalized);

  if (errors.length > 0) {
    return createCalmErrorResult(
      normalized,
      errors
    );
  }

  const band =
    normalized.bandId
      ? getCalmRecoveryBand(
          normalized.bandId
        )
      : null;

  const sourceAmount =
    normalized.amount ??
    band?.calmRecovery ??
    null;

  const amountResolution =
    resolveCalmAmount(sourceAmount);

  if (amountResolution.status === "error") {
    return createCalmErrorResult(
      normalized,
      amountResolution.errors
    );
  }

  const recoveryAmount =
    Math.abs(amountResolution.total);

  const proposedState =
    calculateProposedCalmState({
      currentCalm:
        normalized.currentCalm,

      maximumCalm:
        normalized.maximumCalm,

      calmChange:
        recoveryAmount
    });

  const actualRecovery =
    proposedState.currentCalm -
    normalized.currentCalm;

  const lostToMaximum =
    recoveryAmount -
    actualRecovery;

  return {
    id: createResultId(
      "calm_recovery"
    ),

    resolverId: RESOLVER_ID,
    operation:
      CALM_OPERATION_TYPES.RECOVERY,
    status: "success",

    label:
      normalized.label ||
      band?.label ||
      "Calm Recovery",

    summary:
      `Recover ${actualRecovery} Calm.`,

    ruling:
      lostToMaximum > 0
        ? `${recoveryAmount} Calm was rolled, but recovery was capped at Maximum Calm.`
        : `${normalized.currentCalm} Calm becomes ${proposedState.currentCalm} Calm.`,

    outcome: "calm_recovery",

    band,

    amount: {
      source: sourceAmount,
      rolls: amountResolution.rolls,
      rolledTotal:
        recoveryAmount,
      appliedTotal:
        actualRecovery,
      lostToMaximum
    },

    previousState: {
      currentCalm:
        normalized.currentCalm,

      maximumCalm:
        normalized.maximumCalm
    },

    proposedState,

    stateDelta: {
      calm: actualRecovery,
      maximumCalm: 0
    },

    commitStatus: "uncommitted",

    metadata: {
      schemaVersion:
        CALM_RULES.schemaVersion,

      notes:
        normalized.notes,

      generatedAt:
        new Date().toISOString()
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Stress Conversion                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Converts legacy Stress to Calm.
 *
 * @param {object} input
 * @returns {object}
 */
export function resolveStressConversion(
  input = {}
) {
  const normalized =
    input.__normalized === true
      ? input
      : normalizeCalmInput({
          ...input,
          operation:
            CALM_OPERATION_TYPES
              .STRESS_CONVERSION
        });

  const errors =
    input.__normalized === true
      ? []
      : validateCalmInput(normalized);

  if (errors.length > 0) {
    return createCalmErrorResult(
      normalized,
      errors
    );
  }

  const convertedCalm =
    convertStressToCalm(
      normalized.stress
    );

  if (convertedCalm === null) {
    return createCalmErrorResult(
      normalized,
      [
        createValidationError(
          "stress",
          "invalid_stress",
          "Stress must be a non-negative number."
        )
      ]
    );
  }

  return {
    id: createResultId(
      "stress_conversion"
    ),

    resolverId: RESOLVER_ID,
    operation:
      CALM_OPERATION_TYPES
        .STRESS_CONVERSION,

    status: "success",

    label:
      normalized.label ||
      "Stress Conversion",

    summary:
      `${normalized.stress} Stress converts to ${convertedCalm} Calm.`,

    ruling:
      `Calm = 85 - (${normalized.stress} × 3).`,

    outcome: "stress_converted",

    input: {
      stress:
        normalized.stress
    },

    result: {
      currentCalm:
        convertedCalm,

      maximumCalm:
        CALM_RULES.defaults.maximumCalm
    },

    metadata: {
      schemaVersion:
        CALM_RULES.schemaVersion,

      generatedAt:
        new Date().toISOString()
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Percentile Resolution                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Resolves normal, Advantage, or Disadvantage d100 rolling.
 *
 * Advantage keeps the lower roll for roll-under tests.
 * Disadvantage keeps the higher roll.
 *
 * @param {object} options
 * @returns {object}
 */
export function resolvePercentileRoll({
  target,
  rollMode = ROLL_MODES.NORMAL,
  manualRoll = null
}) {
  const numericTarget = Number(target);

  const rolls =
    manualRoll !== null &&
    manualRoll !== undefined &&
    manualRoll !== ""
      ? [Number(manualRoll)]
      : generatePercentileRolls(
          rollMode
        );

  const finalRoll =
    selectPercentileRoll(
      rolls,
      rollMode
    );

  const success =
    finalRoll <= numericTarget;

  const exactTarget =
    finalRoll === numericTarget;

  const matchingDigits =
    hasMatchingPercentileDigits(
      finalRoll
    );

  const criticalSuccess =
    success && matchingDigits;

  const criticalFailure =
    !success && matchingDigits;

  return {
    target: numericTarget,
    rollMode,
    rolls,
    finalRoll,
    success,
    failure: !success,
    exactTarget,
    matchingDigits,
    criticalSuccess,
    criticalFailure,
    margin:
      numericTarget - finalRoll
  };
}

function generatePercentileRolls(
  rollMode
) {
  if (
    rollMode === ROLL_MODES.ADVANTAGE ||
    rollMode === ROLL_MODES.DISADVANTAGE
  ) {
    return [
      rollD100(),
      rollD100()
    ];
  }

  return [rollD100()];
}

function selectPercentileRoll(
  rolls,
  rollMode
) {
  if (
    rollMode ===
    ROLL_MODES.ADVANTAGE
  ) {
    return Math.min(...rolls);
  }

  if (
    rollMode ===
    ROLL_MODES.DISADVANTAGE
  ) {
    return Math.max(...rolls);
  }

  return rolls[0];
}

/**
 * Returns true for:
 * 11, 22, 33, 44, 55, 66, 77, 88, 99
 *
 * 100 is not treated as matching digits.
 *
 * @param {number} roll
 * @returns {boolean}
 */
export function hasMatchingPercentileDigits(
  roll
) {
  const numericRoll = Number(roll);

  if (
    !Number.isInteger(numericRoll) ||
    numericRoll < 1 ||
    numericRoll > 99
  ) {
    return false;
  }

  const tens =
    Math.floor(numericRoll / 10);

  const ones =
    numericRoll % 10;

  return tens === ones;
}

/* -------------------------------------------------------------------------- */
/* Panic Consequences                                                         */
/* -------------------------------------------------------------------------- */

function resolvePanicAutomaticCalmChange({
  rollResolution,
  panicEffect
}) {
  const components = [];

  if (
    rollResolution.criticalSuccess
  ) {
    const recovery =
      resolveCalmAmount(
        CALM_RULES.panicCheck
          .criticalSuccess
          .calmRecovery
      );

    components.push({
      id: "critical_success_recovery",
      label:
        "Critical Success Recovery",
      type: "recovery",
      notation:
        CALM_RULES.panicCheck
          .criticalSuccess
          .calmRecovery,
      rolls: recovery.rolls,
      amount: recovery.total
    });
  }

  if (
    panicEffect?.calmLoss !==
      undefined &&
    panicEffect?.calmLoss !== null
  ) {
    const loss =
      resolveCalmAmount(
        panicEffect.calmLoss
      );

    components.push({
      id: "panic_effect_loss",
      label:
        panicEffect.label,
      type: "loss",
      notation:
        panicEffect.calmLoss,
      rolls: loss.rolls,
      amount:
        -Math.abs(loss.total)
    });
  }

  if (
    rollResolution.criticalFailure
  ) {
    const extraLoss =
      resolveCalmAmount(
        CALM_RULES.panicCheck
          .criticalFailure
          .calmLoss
      );

    components.push({
      id: "critical_failure_loss",
      label:
        "Critical Failure Calm Loss",
      type: "loss",
      notation:
        CALM_RULES.panicCheck
          .criticalFailure
          .calmLoss,
      rolls: extraLoss.rolls,
      amount:
        -Math.abs(extraLoss.total)
    });
  }

  const totalChange =
    components.reduce(
      (total, component) =>
        total + component.amount,
      0
    );

  return {
    components,
    totalChange,
    direction:
      totalChange > 0
        ? "recovery"
        : totalChange < 0
          ? "loss"
          : "none"
  };
}

function getPanicOutcomeType(
  rollResolution
) {
  if (
    rollResolution.criticalSuccess
  ) {
    return "critical_success";
  }

  if (
    rollResolution.success
  ) {
    return "success";
  }

  if (
    rollResolution.criticalFailure
  ) {
    return "critical_failure";
  }

  return "failure";
}

function createPanicSummary({
  rollResolution,
  panicEffect
}) {
  if (
    rollResolution.criticalSuccess
  ) {
    return (
      `Critical success: ${rollResolution.finalRoll} ` +
      `under ${rollResolution.target}.`
    );
  }

  if (rollResolution.success) {
    return (
      `${rollResolution.finalRoll} succeeds ` +
      `against Calm ${rollResolution.target}.`
    );
  }

  if (
    rollResolution.criticalFailure
  ) {
    return (
      `Critical failure: ${rollResolution.finalRoll}. ` +
      `${panicEffect?.label ?? "Panic Effect"}.`
    );
  }

  return (
    `${rollResolution.finalRoll} fails ` +
    `against Calm ${rollResolution.target}. ` +
    `${panicEffect?.label ?? "Panic Effect"}.`
  );
}

function createPanicRuling({
  rollResolution,
  panicEffect,
  automaticCalmChange
}) {
  if (
    rollResolution.criticalSuccess
  ) {
    const recovery =
      Math.max(
        0,
        automaticCalmChange.totalChange
      );

    return (
      `No Panic Effect occurs. ` +
      `Recover ${recovery} Calm, up to Maximum Calm.`
    );
  }

  if (rollResolution.success) {
    return "No Panic Effect occurs.";
  }

  const baseEffect =
    panicEffect?.effect ??
    "Apply a Warden-selected Panic Effect.";

  if (
    rollResolution.criticalFailure
  ) {
    const extraLoss =
      automaticCalmChange.components
        .find(
          (component) =>
            component.id ===
            "critical_failure_loss"
        );

    return (
      `${baseEffect} ` +
      `Critical failure also causes ` +
      `${Math.abs(extraLoss?.amount ?? 0)} Calm loss.`
    );
  }

  return baseEffect;
}

/* -------------------------------------------------------------------------- */
/* Resolve Intervention                                                       */
/* -------------------------------------------------------------------------- */

function buildResolveInterventionOptions({
  input,
  rollResolution,
  panicEffect,
  automaticCalmChange
}) {
  const available =
    input.resolveAvailable === true &&
    input.resolveAmount > 0 &&
    !rollResolution.success;

  if (!available) {
    return {
      available: false,
      applied: false,
      amountAvailable:
        input.resolveAmount,
      methods: []
    };
  }

  const methods = [];

  const tableShiftMethod =
    CALM_RULES.resolveOptions
      .methods.tableShift;

  if (tableShiftMethod) {
    const shiftedRoll =
      clamp(
        rollResolution.finalRoll +
          input.resolveAmount,
        1,
        100
      );

    methods.push({
      id: tableShiftMethod.id,
      label:
        tableShiftMethod.label,

      description:
        tableShiftMethod.description,

      resolveCost:
        input.resolveAmount,

      originalTableRoll:
        rollResolution.finalRoll,

      proposedTableRoll:
        shiftedRoll,

      proposedPanicEffect:
        getCalmPanicEffect(
          shiftedRoll
        ),

      applied: false
    });
  }

  const consequenceMethod =
    CALM_RULES.resolveOptions
      .methods
      .consequenceReduction;

  if (consequenceMethod) {
    methods.push({
      id: consequenceMethod.id,
      label:
        consequenceMethod.label,

      description:
        consequenceMethod.description,

      resolveCost:
        input.resolveAmount,

      originalPanicEffect:
        panicEffect,

      originalCalmChange:
        automaticCalmChange.totalChange,

      requiresPlayerChoice: true,

      applied: false
    });
  }

  return {
    available: true,
    applied: false,
    amountAvailable:
      input.resolveAmount,
    methods
  };
}

/**
 * Applies the table-shift Resolve option to an existing Panic result.
 *
 * This returns a new result object.
 * It does not mutate the original result or character state.
 *
 * @param {object} result
 * @param {number} resolveSpent
 * @returns {object}
 */
export function applyResolveTableShift(
  result,
  resolveSpent = 1
) {
  if (
    !result ||
    result.resolverId !== RESOLVER_ID ||
    result.operation !==
      CALM_OPERATION_TYPES.PANIC_CHECK
  ) {
    return createInterventionError(
      result,
      "The supplied result is not a Calm Panic Check."
    );
  }

  if (result.roll?.success) {
    return createInterventionError(
      result,
      "Resolve cannot shift a successful Panic Check."
    );
  }

  const numericResolve =
    Number(resolveSpent);

  if (
    !Number.isInteger(numericResolve) ||
    numericResolve < 1
  ) {
    return createInterventionError(
      result,
      "Resolve spent must be a positive integer."
    );
  }

  const shiftedRoll =
    clamp(
      result.roll.finalRoll +
        numericResolve,
      1,
      100
    );

  const shiftedEffect =
    getCalmPanicEffect(
      shiftedRoll
    );

  return {
    ...result,

    panicEffect:
      shiftedEffect,

    ruling:
      shiftedEffect?.effect ??
      result.ruling,

    resolveIntervention: {
      ...result.resolveIntervention,
      available: false,
      applied: true,
      method: "table_shift",
      resolveSpent:
        numericResolve,
      originalTableRoll:
        result.roll.finalRoll,
      finalTableRoll:
        shiftedRoll,
      originalPanicEffect:
        result.panicEffect,
      finalPanicEffect:
        shiftedEffect
    },

    metadata: {
      ...result.metadata,
      panicTableRoll:
        shiftedRoll,
      resolveApplied: true
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Amount Resolution                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Resolves either a fixed number or supported dice notation.
 *
 * @param {number|string} amount
 * @returns {object}
 */
export function resolveCalmAmount(
  amount
) {
  if (
    typeof amount === "number" &&
    Number.isFinite(amount)
  ) {
    return {
      status: "success",
      notation: null,
      rolls: [],
      total: Math.round(amount),
      fixed: true
    };
  }

  if (
    typeof amount !== "string" ||
    amount.trim() === ""
  ) {
    return {
      status: "error",
      errors: [
        createValidationError(
          "amount",
          "missing_amount",
          "A Calm amount or dice notation is required."
        )
      ]
    };
  }

  const notation =
    amount.trim().toLowerCase();

  if (
    !/^\d+d(5|10|100)([+-]\d+)?$/.test(
      notation
    )
  ) {
    return {
      status: "error",
      errors: [
        createValidationError(
          "amount",
          "unsupported_notation",
          `Unsupported Calm notation: ${amount}`
        )
      ]
    };
  }

  try {
    const rolled =
      rollNotation(notation);

    return normalizeNotationResult(
      notation,
      rolled
    );
  } catch (error) {
    return {
      status: "error",
      errors: [
        createValidationError(
          "amount",
          "roll_failed",
          error instanceof Error
            ? error.message
            : "Unable to roll Calm notation."
        )
      ]
    };
  }
}

function normalizeNotationResult(
  notation,
  rolled
) {
  if (
    typeof rolled === "number"
  ) {
    return {
      status: "success",
      notation,
      rolls: [],
      total: rolled,
      fixed: false
    };
  }

  if (
    rolled &&
    typeof rolled === "object"
  ) {
    return {
      status: "success",
      notation,
      rolls:
        rolled.rolls ??
        rolled.results ??
        [],
      total:
        Number(
          rolled.total ??
          rolled.value ??
          0
        ),
      fixed: false
    };
  }

  return {
    status: "error",
    errors: [
      createValidationError(
        "amount",
        "invalid_roll_result",
        `Dice notation ${notation} returned an invalid result.`
      )
    ]
  };
}

/* -------------------------------------------------------------------------- */
/* State Calculation                                                          */
/* -------------------------------------------------------------------------- */

function calculateProposedCalmState({
  currentCalm,
  maximumCalm,
  calmChange
}) {
  const nextCurrent =
    clamp(
      currentCalm + calmChange,
      0,
      maximumCalm
    );

  return {
    currentCalm:
      nextCurrent,

    maximumCalm
  };
}

/* -------------------------------------------------------------------------- */
/* Validation and Normalization                                               */
/* -------------------------------------------------------------------------- */

export function normalizeCalmInput(
  input = {}
) {
  const operation =
    input.operation ??
    CALM_OPERATION_TYPES
      .PANIC_CHECK;

  return {
    __normalized: true,

    resolverId: RESOLVER_ID,
    operation,

    label:
      String(
        input.label ?? ""
      ).trim(),

    currentCalm:
      toFiniteNumber(
        input.currentCalm,
        CALM_RULES.defaults.startingCalm
      ),

    maximumCalm:
      toFiniteNumber(
        input.maximumCalm,
        CALM_RULES.defaults.maximumCalm
      ),

    rollMode:
      normalizeRollMode(
        input.rollMode
      ),

    manualRoll:
      normalizeOptionalNumber(
        input.manualRoll
      ),

    bandId:
      input.bandId
        ? String(input.bandId)
        : null,

    amount:
      normalizeAmountInput(
        input.amount
      ),

    stress:
      normalizeOptionalNumber(
        input.stress
      ),

    resolveAvailable:
      input.resolveAvailable === true,

    resolveAmount:
      Math.max(
        0,
        Math.floor(
          toFiniteNumber(
            input.resolveAmount,
            input.resolveAvailable
              ? 1
              : 0
          )
        )
      ),

    notes:
      String(
        input.notes ?? ""
      ).trim()
  };
}

export function validateCalmInput(
  input
) {
  const errors = [];

  if (
    !Object.values(
      CALM_OPERATION_TYPES
    ).includes(input.operation)
  ) {
    errors.push(
      createValidationError(
        "operation",
        "invalid_operation",
        "Select a valid Calm operation."
      )
    );
  }

  if (
    input.operation !==
      CALM_OPERATION_TYPES
        .STRESS_CONVERSION
  ) {
    if (
      !Number.isFinite(
        input.currentCalm
      ) ||
      input.currentCalm < 0
    ) {
      errors.push(
        createValidationError(
          "currentCalm",
          "invalid_current_calm",
          "Current Calm must be zero or greater."
        )
      );
    }

    if (
      !Number.isFinite(
        input.maximumCalm
      ) ||
      input.maximumCalm < 1
    ) {
      errors.push(
        createValidationError(
          "maximumCalm",
          "invalid_maximum_calm",
          "Maximum Calm must be at least 1."
        )
      );
    }

    if (
      input.currentCalm >
      input.maximumCalm
    ) {
      errors.push(
        createValidationError(
          "currentCalm",
          "calm_above_maximum",
          "Current Calm cannot exceed Maximum Calm."
        )
      );
    }
  }

  if (
    input.operation ===
      CALM_OPERATION_TYPES
        .PANIC_CHECK &&
    input.manualRoll !== null
  ) {
    if (
      !Number.isInteger(
        input.manualRoll
      ) ||
      input.manualRoll < 1 ||
      input.manualRoll > 100
    ) {
      errors.push(
        createValidationError(
          "manualRoll",
          "invalid_manual_roll",
          "Manual d100 rolls must be whole numbers from 1 to 100."
        )
      );
    }
  }

  if (
    input.operation ===
      CALM_OPERATION_TYPES.LOSS ||
    input.operation ===
      CALM_OPERATION_TYPES.RECOVERY
  ) {
    if (
      !input.bandId &&
      (
        input.amount === null ||
        input.amount === ""
      )
    ) {
      errors.push(
        createValidationError(
          "amount",
          "missing_amount",
          "Select a guideline band or enter a Calm amount."
        )
      );
    }

    if (
      input.operation ===
        CALM_OPERATION_TYPES.LOSS &&
      input.bandId &&
      !getCalmLossBand(
        input.bandId
      )
    ) {
      errors.push(
        createValidationError(
          "bandId",
          "unknown_loss_band",
          `Unknown Calm loss band: ${input.bandId}`
        )
      );
    }

    if (
      input.operation ===
        CALM_OPERATION_TYPES.RECOVERY &&
      input.bandId &&
      !getCalmRecoveryBand(
        input.bandId
      )
    ) {
      errors.push(
        createValidationError(
          "bandId",
          "unknown_recovery_band",
          `Unknown Calm recovery band: ${input.bandId}`
        )
      );
    }
  }

  if (
    input.operation ===
      CALM_OPERATION_TYPES
        .STRESS_CONVERSION
  ) {
    if (
      input.stress === null ||
      !Number.isFinite(
        input.stress
      ) ||
      input.stress < 0
    ) {
      errors.push(
        createValidationError(
          "stress",
          "invalid_stress",
          "Stress must be a non-negative number."
        )
      );
    }
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/* Error Results                                                              */
/* -------------------------------------------------------------------------- */

function createCalmErrorResult(
  input,
  errors
) {
  return {
    id: createResultId(
      "calm_error"
    ),

    resolverId: RESOLVER_ID,
    operation:
      input?.operation ??
      null,

    status: "error",

    label:
      input?.label ||
      "Calm Resolution Error",

    summary:
      errors[0]?.message ??
      "Calm resolution failed.",

    ruling:
      "Correct the listed input errors and try again.",

    metadata: {
      errors,
      generatedAt:
        new Date().toISOString()
    }
  };
}

function createInterventionError(
  result,
  message
) {
  return {
    ...result,

    status: "error",

    summary: message,

    metadata: {
      ...(result?.metadata ?? {}),
      errors: [
        createValidationError(
          "resolve",
          "resolve_intervention_failed",
          message
        )
      ]
    }
  };
}

function createValidationError(
  field,
  code,
  message
) {
  return {
    field,
    code,
    message
  };
}

/* -------------------------------------------------------------------------- */
/* Utility Helpers                                                            */
/* -------------------------------------------------------------------------- */

function requiresManualPanicFollowUp(
  panicEffect
) {
  if (!panicEffect) {
    return false;
  }

  return [
    "temporary_condition",
    "long_term_condition",
    "forced_behavior",
    "class_interaction",
    "save_restriction",
    "panic_trigger",
    "warden_control",
    "fatal_timer",
    "death",
    "character_loss"
  ].includes(
    panicEffect.category
  );
}

function normalizeRollMode(
  rollMode
) {
  if (
    Object.values(
      ROLL_MODES
    ).includes(rollMode)
  ) {
    return rollMode;
  }

  return ROLL_MODES.NORMAL;
}

function normalizeOptionalNumber(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const numericValue =
    Number(value);

  return Number.isFinite(
    numericValue
  )
    ? numericValue
    : null;
}

function normalizeAmountInput(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  if (
    typeof value === "number"
  ) {
    return value;
  }

  const trimmed =
    String(value).trim();

  const numeric =
    Number(trimmed);

  if (
    Number.isFinite(numeric) &&
    trimmed !== ""
  ) {
    return numeric;
  }

  return trimmed;
}

function toFiniteNumber(
  value,
  fallback
) {
  const numericValue =
    Number(value);

  return Number.isFinite(
    numericValue
  )
    ? numericValue
    : fallback;
}

function clamp(
  value,
  minimum,
  maximum
) {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      value
    )
  );
}

function createResultId(
  prefix
) {
  if (
    globalThis.crypto &&
    typeof globalThis.crypto
      .randomUUID === "function"
  ) {
    return `${prefix}_${globalThis.crypto.randomUUID()}`;
  }

  return (
    `${prefix}_` +
    `${Date.now()}_` +
    `${Math.random()
      .toString(36)
      .slice(2, 10)}`
  );
}

export {
  CALM_OPERATION_TYPES,
  ROLL_MODES
};

