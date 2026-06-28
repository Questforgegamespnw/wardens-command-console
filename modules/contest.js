/**
 * Warden Resolution Console
 * Contested percentile test resolver.
 *
 * Contest doctrine:
 * 1. Resolve both sides against their own final targets.
 * 2. Compare degree bands.
 * 3. Better degree band wins.
 * 4. If both sides occupy the same band and both outcomes can occur,
 *    resolve simultaneously.
 * 5. If simultaneous resolution is not possible, compare distance
 *    from each side's own target.
 * 6. If both distances are equal, preserve the status quo or treat
 *    the result as an exact tie.
 *
 * Raw percentile rolls are never compared directly.
 */

import {
  getDegreeFromMargin,
  resolvePercentileRoll,
  sumModifiers
} from "./standard-test.js";

const SUPPORTED_ROLL_MODES = new Set([
  "normal",
  "advantage",
  "disadvantage"
]);

const DEGREE_LABELS = Object.freeze({
  highest_success: "Highest Success",
  strong_success: "Strong Success",
  success: "Success",
  narrow_success: "Narrow Success",
  narrow_failure: "Narrow Failure",
  failure: "Failure",
  severe_failure: "Severe Failure",
  highest_failure: "Highest Failure"
});

/**
 * Higher rank means a better Contest result.
 */
const DEGREE_RANKS = Object.freeze({
  highest_success: 8,
  strong_success: 7,
  success: 6,
  narrow_success: 5,
  narrow_failure: 4,
  failure: 3,
  severe_failure: 2,
  highest_failure: 1
});

/**
 * Resolve a contested percentile test.
 *
 * @param {object} input
 * @param {object} context
 * @returns {object}
 */
export function resolveContest(input, context = {}) {
  const services = normalizeContext(context);
  const validation = validateContestInput(input);

  if (!validation.valid) {
    return createErrorResult(input, validation.errors, services);
  }

  const normalized = normalizeContestInput(input);

  const sideA = resolveContestSide(
    normalized.sideA,
    services.rng
  );

  const sideB = resolveContestSide(
    normalized.sideB,
    services.rng
  );

  const comparison = compareContestSides({
    sideA,
    sideB,
    simultaneousAllowed:
      normalized.simultaneousAllowed
  });

  return {
    id: services.idFactory("result"),
    resolverId: "contest",
    resolverType: "contest",
    label: normalized.label,
    status: getContestStatus(comparison),
    degree: null,
    severity: null,
    summary: buildContestSummary(
      comparison,
      sideA,
      sideB
    ),
    ruling: buildContestRuling(
      comparison,
      sideA,
      sideB,
      normalized
    ),
    consequence: buildContestConsequence(
      comparison,
      sideA,
      sideB
    ),
    repairCondition: null,

    inputs: {
      resolverId: "contest",
      label: normalized.label,
      sideA: cloneContestSideInput(normalized.sideA),
      sideB: cloneContestSideInput(normalized.sideB),
      simultaneousAllowed:
        normalized.simultaneousAllowed,
      simultaneousOutcome:
        normalized.simultaneousOutcome,
      notes: normalized.notes
    },

    calculation: buildContestCalculation(
      sideA,
      sideB,
      comparison
    ),

    roll: {
      sideA: sideA.roll,
      sideB: sideB.roll
    },

    tags: [
      "percentile",
      "roll_under",
      "contest",
      comparison.outcome
    ],

    notes: normalized.notes,
    timestamp: services.now(),

    metadata: {
      outcome: comparison.outcome,
      comparisonMethod:
        comparison.comparisonMethod,
      winner: comparison.winner,
      sameDegreeBand:
        comparison.sameDegreeBand,
      simultaneousAllowed:
        normalized.simultaneousAllowed,
      simultaneousOutcome:
        normalized.simultaneousOutcome,
      bothSucceeded:
        sideA.succeeded && sideB.succeeded,
      bothFailed:
        !sideA.succeeded && !sideB.succeeded,

      sideA: buildSideMetadata(sideA),
      sideB: buildSideMetadata(sideB)
    }
  };
}

/**
 * Resolve one Contest participant against their own target.
 *
 * @param {object} side
 * @param {Function} rng
 * @returns {object}
 */
export function resolveContestSide(
  side,
  rng = Math.random
) {
  const skillValue = side.skill?.value ?? 0;
  const totalModifier =
    sumModifiers(side.modifiers);

  const finalTarget =
    side.base.value +
    skillValue +
    totalModifier;

  const roll = resolvePercentileRoll(
    {
      rollMode: side.rollMode,
      manualRoll: side.manualRoll,
      manualRolls: side.manualRolls
    },
    rng
  );

  const selectedRoll = roll.selected.total;
  const margin = finalTarget - selectedRoll;
  const degree = getDegreeFromMargin(margin);
  const degreeRank = DEGREE_RANKS[degree];
  const succeeded = margin >= 0;
  const distanceFromTarget = Math.abs(margin);

  return {
    label: side.label,
    base: { ...side.base },
    skill: side.skill
      ? { ...side.skill }
      : null,
    modifiers: side.modifiers.map(
      (modifier) => ({ ...modifier })
    ),
    rollMode: side.rollMode,
    roll,
    skillValue,
    totalModifier,
    finalTarget,
    selectedRoll,
    margin,
    degree,
    degreeRank,
    degreeLabel: DEGREE_LABELS[degree],
    succeeded,
    distanceFromTarget
  };
}

/**
 * Compare two already-resolved Contest sides.
 *
 * @param {object} input
 * @returns {object}
 */
export function compareContestSides({
  sideA,
  sideB,
  simultaneousAllowed = false
}) {
  if (sideA.degreeRank > sideB.degreeRank) {
    return {
      outcome: "side_a_wins",
      winner: "sideA",
      comparisonMethod: "degree_band",
      sameDegreeBand: false
    };
  }

  if (sideB.degreeRank > sideA.degreeRank) {
    return {
      outcome: "side_b_wins",
      winner: "sideB",
      comparisonMethod: "degree_band",
      sameDegreeBand: false
    };
  }

  const bothSucceeded =
    sideA.succeeded && sideB.succeeded;

  const bothFailed =
    !sideA.succeeded && !sideB.succeeded;

  if (simultaneousAllowed && bothSucceeded) {
    return {
      outcome: "simultaneous",
      winner: null,
      comparisonMethod:
        "same_degree_band_simultaneous",
      sameDegreeBand: true
    };
  }

  if (simultaneousAllowed && bothFailed) {
    return {
      outcome: "mutual_failure",
      winner: null,
      comparisonMethod:
        "same_degree_band_mutual_failure",
      sameDegreeBand: true
    };
  }

  if (
    sideA.distanceFromTarget <
    sideB.distanceFromTarget
  ) {
    return {
      outcome: "side_a_wins",
      winner: "sideA",
      comparisonMethod:
        "distance_from_target",
      sameDegreeBand: true
    };
  }

  if (
    sideB.distanceFromTarget <
    sideA.distanceFromTarget
  ) {
    return {
      outcome: "side_b_wins",
      winner: "sideB",
      comparisonMethod:
        "distance_from_target",
      sameDegreeBand: true
    };
  }

  if (bothFailed) {
    return {
      outcome: "mutual_failure",
      winner: null,
      comparisonMethod:
        "exact_tie_mutual_failure",
      sameDegreeBand: true
    };
  }

  return {
    outcome: "exact_tie",
    winner: null,
    comparisonMethod: "exact_tie",
    sameDegreeBand: true
  };
}

/**
 * Validate Contest input.
 *
 * @param {unknown} input
 * @returns {{ valid: boolean, errors: Array<object> }}
 */
export function validateContestInput(input) {
  const errors = [];

  if (!isPlainObject(input)) {
    return {
      valid: false,
      errors: [
        createValidationError(
          "input",
          "invalid_type",
          "Contest input must be an object."
        )
      ]
    };
  }

  if (
    input.resolverId !== undefined &&
    input.resolverId !== "contest"
  ) {
    errors.push(
      createValidationError(
        "resolverId",
        "invalid_value",
        'resolverId must be "contest".'
      )
    );
  }

  validateContestSide(
    input.sideA,
    "sideA",
    errors
  );

  validateContestSide(
    input.sideB,
    "sideB",
    errors
  );

  if (
    input.simultaneousAllowed !== undefined &&
    typeof input.simultaneousAllowed !== "boolean"
  ) {
    errors.push(
      createValidationError(
        "simultaneousAllowed",
        "invalid_type",
        "simultaneousAllowed must be a boolean."
      )
    );
  }

  if (
    input.simultaneousOutcome !== undefined &&
    input.simultaneousOutcome !== null &&
    typeof input.simultaneousOutcome !== "string"
  ) {
    errors.push(
      createValidationError(
        "simultaneousOutcome",
        "invalid_type",
        "simultaneousOutcome must be a string."
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Normalize Contest input.
 *
 * @param {object} input
 * @returns {object}
 */
export function normalizeContestInput(input) {
  return {
    resolverId: "contest",

    label:
      typeof input.label === "string" &&
      input.label.trim() !== ""
        ? input.label.trim()
        : "Contested Test",

    sideA: normalizeContestSide(
      input.sideA,
      "Side A"
    ),

    sideB: normalizeContestSide(
      input.sideB,
      "Side B"
    ),

    simultaneousAllowed:
      input.simultaneousAllowed === true,

    simultaneousOutcome:
      typeof input.simultaneousOutcome === "string"
        ? input.simultaneousOutcome.trim()
        : "",

    notes:
      typeof input.notes === "string"
        ? input.notes
        : ""
  };
}

function validateContestSide(
  side,
  fieldName,
  errors
) {
  if (!isPlainObject(side)) {
    errors.push(
      createValidationError(
        fieldName,
        "invalid_type",
        `${fieldName} must be an object.`
      )
    );

    return;
  }

  if (!isPlainObject(side.base)) {
    errors.push(
      createValidationError(
        `${fieldName}.base`,
        "invalid_type",
        `${fieldName}.base must be an object.`
      )
    );
  } else {
    const baseValue = Number(side.base.value);

    if (!isFiniteNumber(baseValue)) {
      errors.push(
        createValidationError(
          `${fieldName}.base.value`,
          "invalid_number",
          "Base value must be numeric."
        )
      );
    }

    if (
      isFiniteNumber(baseValue) &&
      (baseValue < 0 || baseValue > 99)
    ) {
      errors.push(
        createValidationError(
          `${fieldName}.base.value`,
          "outside_base_range",
          "Base value must be between 0 and 99."
        )
      );
    }
  }

  if (
    side.skill !== undefined &&
    side.skill !== null
  ) {
    if (!isPlainObject(side.skill)) {
      errors.push(
        createValidationError(
          `${fieldName}.skill`,
          "invalid_type",
          "Skill must be an object or null."
        )
      );
    } else if (
      !isFiniteNumber(Number(side.skill.value))
    ) {
      errors.push(
        createValidationError(
          `${fieldName}.skill.value`,
          "invalid_number",
          "Skill value must be numeric."
        )
      );
    }
  }

  if (
    side.modifiers !== undefined &&
    !Array.isArray(side.modifiers)
  ) {
    errors.push(
      createValidationError(
        `${fieldName}.modifiers`,
        "invalid_type",
        "Modifiers must be an array."
      )
    );
  }

  if (Array.isArray(side.modifiers)) {
    side.modifiers.forEach(
      (modifier, index) => {
        if (!isPlainObject(modifier)) {
          errors.push(
            createValidationError(
              `${fieldName}.modifiers[${index}]`,
              "invalid_type",
              "Each modifier must be an object."
            )
          );

          return;
        }

        if (
          !isFiniteNumber(Number(modifier.value))
        ) {
          errors.push(
            createValidationError(
              `${fieldName}.modifiers[${index}].value`,
              "invalid_number",
              "Modifier value must be numeric."
            )
          );
        }
      }
    );
  }

  const rollMode =
    side.rollMode ?? "normal";

  if (!SUPPORTED_ROLL_MODES.has(rollMode)) {
    errors.push(
      createValidationError(
        `${fieldName}.rollMode`,
        "unsupported_value",
        `Unsupported roll mode: ${String(
          rollMode
        )}`
      )
    );
  }

  if (
    side.manualRoll !== undefined &&
    side.manualRoll !== null &&
    !isValidPercentile(side.manualRoll)
  ) {
    errors.push(
      createValidationError(
        `${fieldName}.manualRoll`,
        "invalid_percentile",
        "Manual roll must be an integer from 0 to 99."
      )
    );
  }

  if (
    side.manualRolls !== undefined &&
    side.manualRolls !== null
  ) {
    if (!Array.isArray(side.manualRolls)) {
      errors.push(
        createValidationError(
          `${fieldName}.manualRolls`,
          "invalid_type",
          "manualRolls must be an array or null."
        )
      );
    } else {
      const requiredCount =
        rollMode === "normal" ? 1 : 2;

      if (
        side.manualRolls.length !==
        requiredCount
      ) {
        errors.push(
          createValidationError(
            `${fieldName}.manualRolls`,
            "wrong_count",
            `${rollMode} requires ${requiredCount} manual percentile roll${
              requiredCount === 1 ? "" : "s"
            }.`
          )
        );
      }

      side.manualRolls.forEach(
        (roll, index) => {
          if (!isValidPercentile(roll)) {
            errors.push(
              createValidationError(
                `${fieldName}.manualRolls[${index}]`,
                "invalid_percentile",
                "Each manual roll must be an integer from 0 to 99."
              )
            );
          }
        }
      );
    }
  }

  if (
    side.manualRoll !== undefined &&
    side.manualRoll !== null &&
    side.manualRolls !== undefined &&
    side.manualRolls !== null
  ) {
    errors.push(
      createValidationError(
        `${fieldName}.manualRoll`,
        "conflicting_manual_inputs",
        "Use either manualRoll or manualRolls, not both."
      )
    );
  }
}

function normalizeContestSide(
  side,
  fallbackLabel
) {
  return {
    label:
      typeof side.label === "string" &&
      side.label.trim() !== ""
        ? side.label.trim()
        : fallbackLabel,

    base: {
      label:
        typeof side.base.label === "string" &&
        side.base.label.trim() !== ""
          ? side.base.label.trim()
          : "Base Target",

      value: Number(side.base.value)
    },

    skill:
      side.skill !== undefined &&
      side.skill !== null
        ? {
            label:
              typeof side.skill.label === "string" &&
              side.skill.label.trim() !== ""
                ? side.skill.label.trim()
                : "Skill",

            value: Number(side.skill.value)
          }
        : null,

    modifiers: normalizeModifiers(
      side.modifiers
    ),

    rollMode:
      side.rollMode ?? "normal",

    manualRoll:
      side.manualRoll === undefined ||
      side.manualRoll === null
        ? null
        : Number(side.manualRoll),

    manualRolls:
      Array.isArray(side.manualRolls)
        ? side.manualRolls.map(Number)
        : null
  };
}

function normalizeModifiers(modifiers) {
  if (!Array.isArray(modifiers)) {
    return [];
  }

  return modifiers.map(
    (modifier, index) => ({
      id:
        typeof modifier.id === "string" &&
        modifier.id.trim() !== ""
          ? modifier.id.trim()
          : `modifier_${index + 1}`,

      label:
        typeof modifier.label === "string" &&
        modifier.label.trim() !== ""
          ? modifier.label.trim()
          : `Modifier ${index + 1}`,

      value: Number(modifier.value)
    })
  );
}

function buildContestSummary(
  comparison,
  sideA,
  sideB
) {
  switch (comparison.outcome) {
    case "side_a_wins":
      return `${sideA.label} wins the Contest.`;

    case "side_b_wins":
      return `${sideB.label} wins the Contest.`;

    case "simultaneous":
      return "Both outcomes occur simultaneously.";

    case "mutual_failure":
      return "Both participants fail.";

    case "exact_tie":
      return "The Contest ends in an exact tie.";

    default:
      return "The Contest is resolved.";
  }
}

function buildContestRuling(
  comparison,
  sideA,
  sideB,
  normalized
) {
  if (comparison.outcome === "side_a_wins") {
    if (!sideA.succeeded && !sideB.succeeded) {
      return (
        `${sideA.label} gains the better relative result, ` +
        "but both participants failed their tests."
      );
    }

    return `${sideA.label} achieves the better result.`;
  }

  if (comparison.outcome === "side_b_wins") {
    if (!sideA.succeeded && !sideB.succeeded) {
      return (
        `${sideB.label} gains the better relative result, ` +
        "but both participants failed their tests."
      );
    }

    return `${sideB.label} achieves the better result.`;
  }

  if (comparison.outcome === "simultaneous") {
    return (
      normalized.simultaneousOutcome ||
      "Both outcomes can occur. Describe the new shared state."
    );
  }

  if (comparison.outcome === "mutual_failure") {
    return (
      "Neither participant accomplishes their intended action. " +
      "Apply the shared failure, consequence, or new contested state."
    );
  }

  if (comparison.outcome === "exact_tie") {
    return (
      "Neither participant gains a decisive advantage. " +
      "Preserve the status quo or establish a tied contested state."
    );
  }

  return "Resolve the Contest according to the established fiction.";
}

function buildContestConsequence(
  comparison,
  sideA,
  sideB
) {
  if (
    comparison.outcome === "mutual_failure"
  ) {
    return (
      "Both failed. Preserve that failure even if one side " +
      "would otherwise hold a better relative position."
    );
  }

  if (comparison.outcome === "exact_tie") {
    return (
      "Do not randomly assign a winner. Preserve the status quo " +
      "or escalate into a new contested state."
    );
  }

  if (
    comparison.outcome === "side_a_wins" &&
    !sideA.succeeded &&
    !sideB.succeeded
  ) {
    return (
      `${sideA.label} receives the better relative position, ` +
      "but does not count as having succeeded."
    );
  }

  if (
    comparison.outcome === "side_b_wins" &&
    !sideA.succeeded &&
    !sideB.succeeded
  ) {
    return (
      `${sideB.label} receives the better relative position, ` +
      "but does not count as having succeeded."
    );
  }

  return null;
}

function buildContestCalculation(
  sideA,
  sideB,
  comparison
) {
  return [
    {
      id: "side_a_target",
      label: `${sideA.label} Final Target`,
      operation: "target",
      value: sideA.finalTarget
    },
    {
      id: "side_a_roll",
      label: `${sideA.label} Roll`,
      operation: "roll",
      value: sideA.selectedRoll,
      display: sideA.roll.selected.display
    },
    {
      id: "side_a_margin",
      label: `${sideA.label} Margin`,
      operation: "margin",
      value: sideA.margin
    },
    {
      id: "side_a_degree",
      label: `${sideA.label} Degree`,
      operation: "degree",
      value: sideA.degree,
      display: sideA.degreeLabel
    },
    {
      id: "side_b_target",
      label: `${sideB.label} Final Target`,
      operation: "target",
      value: sideB.finalTarget
    },
    {
      id: "side_b_roll",
      label: `${sideB.label} Roll`,
      operation: "roll",
      value: sideB.selectedRoll,
      display: sideB.roll.selected.display
    },
    {
      id: "side_b_margin",
      label: `${sideB.label} Margin`,
      operation: "margin",
      value: sideB.margin
    },
    {
      id: "side_b_degree",
      label: `${sideB.label} Degree`,
      operation: "degree",
      value: sideB.degree,
      display: sideB.degreeLabel
    },
    {
      id: "comparison",
      label: "Comparison Method",
      operation: "comparison",
      value: comparison.comparisonMethod,
      display: formatComparisonMethod(
        comparison.comparisonMethod
      )
    }
  ];
}

function buildSideMetadata(side) {
  return {
    label: side.label,
    baseLabel: side.base.label,
    baseValue: side.base.value,
    skillLabel: side.skill?.label ?? null,
    skillValue: side.skillValue,
    totalModifier: side.totalModifier,
    finalTarget: side.finalTarget,
    roll: side.selectedRoll,
    margin: side.margin,
    degree: side.degree,
    degreeLabel: side.degreeLabel,
    degreeRank: side.degreeRank,
    succeeded: side.succeeded,
    distanceFromTarget:
      side.distanceFromTarget
  };
}

function cloneContestSideInput(side) {
  return {
    label: side.label,
    base: { ...side.base },
    skill: side.skill
      ? { ...side.skill }
      : null,
    modifiers: side.modifiers.map(
      (modifier) => ({ ...modifier })
    ),
    rollMode: side.rollMode,
    manualRoll: side.manualRoll,
    manualRolls: side.manualRolls
      ? [...side.manualRolls]
      : null
  };
}

function getContestStatus(comparison) {
  switch (comparison.outcome) {
    case "side_a_wins":
    case "side_b_wins":
      return "resolved";

    case "simultaneous":
      return "simultaneous";

    case "mutual_failure":
      return "failure";

    case "exact_tie":
      return "tie";

    default:
      return "resolved";
  }
}

function formatComparisonMethod(method) {
  const labels = {
    degree_band: "Degree Band",
    same_degree_band_simultaneous:
      "Same Band: Simultaneous",
    same_degree_band_mutual_failure:
      "Same Band: Mutual Failure",
    distance_from_target:
      "Distance From Own Target",
    exact_tie:
      "Exact Tie",
    exact_tie_mutual_failure:
      "Exact Tie: Mutual Failure"
  };

  return labels[method] ?? method;
}

function createErrorResult(
  input,
  errors,
  services
) {
  return {
    id: services.idFactory("result"),
    resolverId: "contest",
    resolverType: "error",

    label:
      isPlainObject(input) &&
      typeof input.label === "string" &&
      input.label.trim() !== ""
        ? input.label.trim()
        : "Contested Test",

    status: "error",
    degree: null,
    severity: null,
    summary: "Contest input is invalid.",
    ruling:
      "Correct the listed inputs before resolving the Contest.",
    consequence: null,
    repairCondition: null,
    inputs: isPlainObject(input)
      ? { ...input }
      : {},
    calculation: [],
    roll: {},
    tags: [
      "validation_error",
      "contest"
    ],
    notes:
      isPlainObject(input) &&
      typeof input.notes === "string"
        ? input.notes
        : "",
    timestamp: services.now(),

    metadata: {
      errors
    }
  };
}

function normalizeContext(context) {
  return {
    rng:
      typeof context.rng === "function"
        ? context.rng
        : Math.random,

    now:
      typeof context.now === "function"
        ? context.now
        : () => new Date().toISOString(),

    idFactory:
      typeof context.idFactory === "function"
        ? context.idFactory
        : createResultId
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

function createResultId(prefix = "result") {
  const time = Date.now().toString(36);
  const random = Math.random()
    .toString(36)
    .slice(2, 8);

  return `${prefix}_${time}_${random}`;
}

function isValidPercentile(value) {
  const normalized = Number(value);

  return (
    Number.isInteger(normalized) &&
    normalized >= 0 &&
    normalized <= 99
  );
}

function isFiniteNumber(value) {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}