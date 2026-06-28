/**
 * Warden Resolution Console
 * Standard percentile test resolver.
 *
 * Handles:
 * - Saves
 * - Character actions using a base stat and optional skill
 * - Situational modifiers
 * - Normal, advantage, and disadvantage rolls
 * - Manual percentile results
 * - Roll-under success
 * - Margin-based degree bands
 *
 * Percentile doctrine:
 * - Roll equal to or under the final target: success
 * - Roll over the final target: failure
 * - margin = finalTarget - roll
 * - Matching digits have no automatic critical effect
 */

import { rollD100 } from "./dice.js";

const SUPPORTED_TEST_TYPES = new Set(["save", "action"]);
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
 * Resolve a Standard Test.
 *
 * Preferred input:
 *
 * {
 *   resolverId: "standard_test",
 *   testType: "action",
 *   label: "Override Reactor Lockout",
 *   base: {
 *     label: "Intellect",
 *     value: 35
 *   },
 *   skill: {
 *     label: "Computers",
 *     value: 15
 *   },
 *   modifiers: [
 *     {
 *       id: "damaged_controls",
 *       label: "Damaged Controls",
 *       value: -10
 *     }
 *   ],
 *   rollMode: "normal",
 *   manualRoll: null,
 *   notes: ""
 * }
 *
 * Legacy-compatible input:
 *
 * {
 *   resolverId: "standard_test",
 *   baseTarget: 55,
 *   modifiers: [],
 *   rollMode: "normal"
 * }
 *
 * @param {object} input
 * @param {object} context
 * @returns {object}
 */
export function resolveStandardTest(input, context = {}) {
  const services = normalizeContext(context);
  const validation = validateStandardTestInput(input);

  if (!validation.valid) {
    return createErrorResult(input, validation.errors, services);
  }

  const normalized = normalizeStandardTestInput(input);
  const totalModifier = sumModifiers(normalized.modifiers);
  const skillValue = normalized.skill?.value ?? 0;
  const finalTarget =
    normalized.base.value +
    skillValue +
    totalModifier;

  const rollResolution = resolvePercentileRoll(
    {
      rollMode: normalized.rollMode,
      manualRoll: normalized.manualRoll,
      manualRolls: normalized.manualRolls
    },
    services.rng
  );

  const margin = finalTarget - rollResolution.selected.total;
  const status = margin >= 0 ? "success" : "failure";
  const degree = getDegreeFromMargin(margin);
  const distanceFromTarget = Math.abs(margin);

  const calculation = buildCalculation({
    normalized,
    totalModifier,
    finalTarget,
    selectedRoll: rollResolution.selected.total,
    margin
  });

  return {
    id: services.idFactory("result"),
    resolverId: "standard_test",
    resolverType: "test",
    label: normalized.label,
    status,
    degree,
    severity: null,
    summary: buildSummary(status, margin),
    ruling: buildRuling(status, degree),
    consequence:
      status === "failure"
        ? "Apply or choose the consequence that follows from the failed test."
        : null,
    repairCondition: null,

    inputs: {
      resolverId: "standard_test",
      testType: normalized.testType,
      label: normalized.label,
      base: { ...normalized.base },
      skill: normalized.skill ? { ...normalized.skill } : null,
      modifiers: normalized.modifiers.map((modifier) => ({ ...modifier })),
      rollMode: normalized.rollMode,
      manualRoll: normalized.manualRoll,
      manualRolls: normalized.manualRolls
        ? [...normalized.manualRolls]
        : null,
      notes: normalized.notes
    },

    calculation,
    roll: rollResolution,
    tags: [
      "percentile",
      "roll_under",
      normalized.testType
    ],
    notes: normalized.notes,
    timestamp: services.now(),

    metadata: {
      testType: normalized.testType,
      baseLabel: normalized.base.label,
      baseTarget: normalized.base.value,
      skillLabel: normalized.skill?.label ?? null,
      skillValue,
      totalModifier,
      finalTarget,
      margin,
      distanceFromTarget,
      degreeLabel: DEGREE_LABELS[degree],
      exactTarget: margin === 0,
      doubles: hasMatchingDigits(rollResolution.selected.total),
      doublesCriticalApplied: false
    }
  };
}

/**
 * Validate raw Standard Test input without throwing UI-facing errors.
 *
 * @param {unknown} input
 * @returns {{ valid: boolean, errors: Array<object> }}
 */
export function validateStandardTestInput(input) {
  const errors = [];

  if (!isPlainObject(input)) {
    return {
      valid: false,
      errors: [
        createValidationError(
          "input",
          "invalid_type",
          "Standard Test input must be an object."
        )
      ]
    };
  }

  if (
    input.resolverId !== undefined &&
    input.resolverId !== "standard_test"
  ) {
    errors.push(
      createValidationError(
        "resolverId",
        "invalid_value",
        'resolverId must be "standard_test".'
      )
    );
  }

  const testType = input.testType ?? "action";

  if (!SUPPORTED_TEST_TYPES.has(testType)) {
    errors.push(
      createValidationError(
        "testType",
        "unsupported_value",
        `Unsupported test type: ${String(testType)}`
      )
    );
  }

  const baseValue = readBaseValue(input);

  if (!isFiniteNumber(baseValue)) {
    errors.push(
      createValidationError(
        "base.value",
        "invalid_number",
        "A finite numeric base target is required."
      )
    );
  }

  if (
    isFiniteNumber(baseValue) &&
    (baseValue < 0 || baseValue > 99)
  ) {
    errors.push(
      createValidationError(
        "base.value",
        "outside_base_range",
        "The base target must be between 0 and 99."
      )
    );
  }

  if (input.base !== undefined && !isPlainObject(input.base)) {
    errors.push(
      createValidationError(
        "base",
        "invalid_type",
        "base must be an object."
      )
    );
  }

  if (input.skill !== undefined && input.skill !== null) {
    if (!isPlainObject(input.skill)) {
      errors.push(
        createValidationError(
          "skill",
          "invalid_type",
          "skill must be an object or null."
        )
      );
    } else if (!isFiniteNumber(Number(input.skill.value))) {
      errors.push(
        createValidationError(
          "skill.value",
          "invalid_number",
          "Skill value must be numeric."
        )
      );
    }
  }

  if (
    testType === "save" &&
    input.skill !== undefined &&
    input.skill !== null &&
    Number(input.skill.value) !== 0
  ) {
    errors.push(
      createValidationError(
        "skill",
        "skill_not_allowed",
        "Standard Saves do not use a skill modifier."
      )
    );
  }

  if (
    input.modifiers !== undefined &&
    !Array.isArray(input.modifiers)
  ) {
    errors.push(
      createValidationError(
        "modifiers",
        "invalid_type",
        "modifiers must be an array."
      )
    );
  }

  if (Array.isArray(input.modifiers)) {
    input.modifiers.forEach((modifier, index) => {
      if (!isPlainObject(modifier)) {
        errors.push(
          createValidationError(
            `modifiers[${index}]`,
            "invalid_type",
            "Each modifier must be an object."
          )
        );
        return;
      }

      if (!isFiniteNumber(Number(modifier.value))) {
        errors.push(
          createValidationError(
            `modifiers[${index}].value`,
            "invalid_number",
            "Modifier value must be numeric."
          )
        );
      }
    });
  }

  const rollMode = input.rollMode ?? "normal";

  if (!SUPPORTED_ROLL_MODES.has(rollMode)) {
    errors.push(
      createValidationError(
        "rollMode",
        "unsupported_value",
        `Unsupported roll mode: ${String(rollMode)}`
      )
    );
  }

  if (
    input.manualRoll !== undefined &&
    input.manualRoll !== null &&
    !isValidPercentile(input.manualRoll)
  ) {
    errors.push(
      createValidationError(
        "manualRoll",
        "invalid_percentile",
        "manualRoll must be an integer from 0 to 99."
      )
    );
  }

  if (
    input.manualRolls !== undefined &&
    input.manualRolls !== null
  ) {
    if (!Array.isArray(input.manualRolls)) {
      errors.push(
        createValidationError(
          "manualRolls",
          "invalid_type",
          "manualRolls must be an array or null."
        )
      );
    } else {
      const requiredCount = rollMode === "normal" ? 1 : 2;

      if (input.manualRolls.length !== requiredCount) {
        errors.push(
          createValidationError(
            "manualRolls",
            "wrong_count",
            `${rollMode} requires ${requiredCount} manual percentile roll${
              requiredCount === 1 ? "" : "s"
            }.`
          )
        );
      }

      input.manualRolls.forEach((roll, index) => {
        if (!isValidPercentile(roll)) {
          errors.push(
            createValidationError(
              `manualRolls[${index}]`,
              "invalid_percentile",
              "Each manual roll must be an integer from 0 to 99."
            )
          );
        }
      });
    }
  }

  if (
    input.manualRoll !== undefined &&
    input.manualRoll !== null &&
    input.manualRolls !== undefined &&
    input.manualRolls !== null
  ) {
    errors.push(
      createValidationError(
        "manualRoll",
        "conflicting_manual_inputs",
        "Use either manualRoll or manualRolls, not both."
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Normalize supported raw input shapes.
 *
 * @param {object} input
 * @returns {object}
 */
export function normalizeStandardTestInput(input) {
  const testType = input.testType ?? "action";
  const baseValue = Number(readBaseValue(input));

  const baseLabel =
    typeof input.base?.label === "string" &&
    input.base.label.trim() !== ""
      ? input.base.label.trim()
      : testType === "save"
        ? "Save"
        : "Base Target";

  const skill =
    testType === "action" &&
    input.skill !== undefined &&
    input.skill !== null
      ? {
          label:
            typeof input.skill.label === "string" &&
            input.skill.label.trim() !== ""
              ? input.skill.label.trim()
              : "Skill",
          value: Number(input.skill.value)
        }
      : null;

  return {
    resolverId: "standard_test",
    testType,
    label:
      typeof input.label === "string" &&
      input.label.trim() !== ""
        ? input.label.trim()
        : testType === "save"
          ? "Standard Save"
          : "Standard Action",
    base: {
      label: baseLabel,
      value: baseValue
    },
    skill,
    modifiers: normalizeModifiers(input.modifiers),
    rollMode: input.rollMode ?? "normal",
    manualRoll:
      input.manualRoll === undefined ||
      input.manualRoll === null
        ? null
        : Number(input.manualRoll),
    manualRolls: Array.isArray(input.manualRolls)
      ? input.manualRolls.map(Number)
      : null,
    notes:
      typeof input.notes === "string"
        ? input.notes
        : ""
  };
}

/**
 * Return the project's degree band for a percentile margin.
 *
 * margin = finalTarget - roll
 *
 * @param {number} margin
 * @returns {string}
 */
export function getDegreeFromMargin(margin) {
  if (!isFiniteNumber(margin)) {
    throw new TypeError("Margin must be a finite number.");
  }

  if (margin >= 30) return "highest_success";
  if (margin >= 20) return "strong_success";
  if (margin >= 10) return "success";
  if (margin >= 0) return "narrow_success";

  if (margin >= -10) return "narrow_failure";
  if (margin >= -20) return "failure";
  if (margin >= -30) return "severe_failure";

  return "highest_failure";
}

/**
 * Resolve generated or manual percentile rolls.
 *
 * For roll-under tests:
 * - Advantage keeps the lower result.
 * - Disadvantage keeps the higher result.
 *
 * A single manualRoll is treated as the already-selected final result.
 * manualRolls may be supplied when the individual advantage or
 * disadvantage rolls need to be preserved.
 *
 * @param {object} input
 * @param {() => number} rng
 * @returns {object}
 */
export function resolvePercentileRoll(input, rng = Math.random) {
  const rollMode = input.rollMode ?? "normal";

  if (!SUPPORTED_ROLL_MODES.has(rollMode)) {
    throw new RangeError(`Unsupported roll mode: ${rollMode}`);
  }

  if (input.manualRoll !== null && input.manualRoll !== undefined) {
    const selected = createManualRoll(Number(input.manualRoll));

    return {
      notation: "d100",
      mode: rollMode,
      source: "manual",
      rolls: [selected],
      selected,
      discarded: [],
      selectionRule: "manual_final_result"
    };
  }

  if (Array.isArray(input.manualRolls)) {
    const rolls = input.manualRolls.map((roll) =>
      createManualRoll(Number(roll))
    );

    return selectPercentileRolls(rolls, rollMode, "manual");
  }

  const count = rollMode === "normal" ? 1 : 2;
  const rolls = Array.from({ length: count }, () => rollD100(rng));

  return selectPercentileRolls(rolls, rollMode, "generated");
}

/**
 * Sum normalized modifier values.
 *
 * @param {Array<{ value: number }>} modifiers
 * @returns {number}
 */
export function sumModifiers(modifiers = []) {
  return modifiers.reduce(
    (total, modifier) => total + Number(modifier.value),
    0
  );
}

/**
 * Determine whether a percentile value has matching digits.
 *
 * Matching digits are preserved only as metadata.
 * They do not create automatic criticals.
 *
 * @param {number} value
 * @returns {boolean}
 */
export function hasMatchingDigits(value) {
  if (!isValidPercentile(value)) {
    return false;
  }

  const display = String(Number(value)).padStart(2, "0");
  return display[0] === display[1];
}

/**
 * Convert a numeric percentile result into two-character display text.
 *
 * @param {number} value
 * @returns {string}
 */
export function formatPercentile(value) {
  if (!isValidPercentile(value)) {
    throw new RangeError(
      "Percentile value must be an integer from 0 to 99."
    );
  }

  return String(Number(value)).padStart(2, "0");
}

function normalizeContext(context) {
  const rng =
    typeof context.rng === "function"
      ? context.rng
      : Math.random;

  const now =
    typeof context.now === "function"
      ? context.now
      : () => new Date().toISOString();

  const idFactory =
    typeof context.idFactory === "function"
      ? context.idFactory
      : createResultId;

  return {
    rng,
    now,
    idFactory
  };
}

function normalizeModifiers(modifiers) {
  if (!Array.isArray(modifiers)) {
    return [];
  }

  return modifiers.map((modifier, index) => ({
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
  }));
}

function readBaseValue(input) {
  if (
    isPlainObject(input.base) &&
    input.base.value !== undefined
  ) {
    return Number(input.base.value);
  }

  if (input.baseTarget !== undefined) {
    return Number(input.baseTarget);
  }

  return Number.NaN;
}

function selectPercentileRolls(rolls, mode, source) {
  let selectedIndex = 0;

  if (mode === "advantage") {
    selectedIndex = rolls[1].total < rolls[0].total ? 1 : 0;
  }

  if (mode === "disadvantage") {
    selectedIndex = rolls[1].total > rolls[0].total ? 1 : 0;
  }

  const selected = rolls[selectedIndex];
  const discarded = rolls.filter(
    (_, index) => index !== selectedIndex
  );

  return {
    notation: "d100",
    mode,
    source,
    rolls,
    selected,
    discarded,
    selectionRule:
      mode === "advantage"
        ? "keep_lower"
        : mode === "disadvantage"
          ? "keep_higher"
          : "single_roll"
  };
}

function createManualRoll(value) {
  if (!isValidPercentile(value)) {
    throw new RangeError(
      "Manual percentile rolls must be integers from 0 to 99."
    );
  }

  const total = Number(value);
  const display = formatPercentile(total);

  return {
    notation: "d100",
    tens: Number(display[0]),
    ones: Number(display[1]),
    rolls: [
      Number(display[0]),
      Number(display[1])
    ],
    total,
    display
  };
}

function buildCalculation({
  normalized,
  totalModifier,
  finalTarget,
  selectedRoll,
  margin
}) {
  const steps = [
    {
      id: "base_target",
      label: normalized.base.label,
      operation: "base",
      value: normalized.base.value
    }
  ];

  if (normalized.skill) {
    steps.push({
      id: "skill",
      label: normalized.skill.label,
      operation: "add",
      value: normalized.skill.value
    });
  }

  normalized.modifiers.forEach((modifier) => {
    steps.push({
      id: modifier.id,
      label: modifier.label,
      operation: modifier.value >= 0 ? "add" : "subtract",
      value: modifier.value
    });
  });

  if (normalized.modifiers.length > 1) {
    steps.push({
      id: "total_modifier",
      label: "Total Situational Modifier",
      operation: "subtotal",
      value: totalModifier
    });
  }

  steps.push(
    {
      id: "final_target",
      label: "Final Target",
      operation: "equals",
      value: finalTarget
    },
    {
      id: "roll",
      label: "Roll",
      operation: "compare",
      value: selectedRoll,
      display: formatPercentile(selectedRoll)
    },
    {
      id: "margin",
      label: "Margin",
      operation: "difference",
      value: margin
    }
  );

  return steps;
}

function buildSummary(status, margin) {
  if (margin === 0) {
    return "Narrow Success on the target";
  }

  const amount = Math.abs(margin);
  const label = status === "success" ? "Success" : "Failure";

  return `${label} by ${amount}`;
}

function buildRuling(status, degree) {
  const degreeLabel = DEGREE_LABELS[degree];

  return status === "success"
    ? `${degreeLabel}: the test succeeds.`
    : `${degreeLabel}: the test fails.`;
}

function createErrorResult(input, errors, services) {
  return {
    id: services.idFactory("result"),
    resolverId: "standard_test",
    resolverType: "error",
    label:
      isPlainObject(input) &&
      typeof input.label === "string" &&
      input.label.trim() !== ""
        ? input.label.trim()
        : "Standard Test",
    status: "error",
    degree: null,
    severity: null,
    summary: "Standard Test input is invalid.",
    ruling: "Correct the listed inputs before resolving the test.",
    consequence: null,
    repairCondition: null,
    inputs: isPlainObject(input) ? { ...input } : {},
    calculation: [],
    roll: {},
    tags: ["validation_error", "standard_test"],
    notes:
      isPlainObject(input) && typeof input.notes === "string"
        ? input.notes
        : "",
    timestamp: services.now(),
    metadata: {
      errors
    }
  };
}

function createValidationError(field, code, message) {
  return {
    field,
    code,
    message
  };
}

function createResultId(prefix = "result") {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);

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