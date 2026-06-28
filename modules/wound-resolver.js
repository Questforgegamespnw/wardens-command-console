import {
  WOUND_THRESHOLD_RULES,
} from "../data/wound-rules.js";
import {
  getWoundTable,
  getWoundEntries,
} from "../data/wounds/index.js";

const SEVERITY_ORDER = Object.freeze([
  "light",
  "moderate",
  "severe",
  "deadly",
]);

function assertSeverity(severity, fieldName = "severity") {
  if (!SEVERITY_ORDER.includes(severity)) {
    throw new RangeError(
      `Unknown ${fieldName}: ${severity}`,
    );
  }

  return severity;
}

function clampSeverityToAllowed(
  severity,
  allowed,
) {
  if (allowed.includes(severity)) {
    return severity;
  }

  const requestedIndex =
    SEVERITY_ORDER.indexOf(severity);

  const candidates = allowed
    .map((id) => [
      id,
      SEVERITY_ORDER.indexOf(id),
    ])
    .filter(
      ([, index]) =>
        index >= 0
        && index <= requestedIndex,
    )
    .sort((a, b) => b[1] - a[1]);

  return candidates[0]?.[0]
    ?? allowed[0]
    ?? "light";
}

function getAllowedSeverities({
  thresholdRule,
  deadlyAuthorized,
}) {
  const allowed = [
    ...(thresholdRule.allowedSeverities ?? []),
  ].filter((severity) =>
    SEVERITY_ORDER.includes(severity),
  );

  if (
    deadlyAuthorized
    && !allowed.includes("deadly")
  ) {
    allowed.push("deadly");
  }

  return allowed;
}


function getThresholdSeverityWeights(
  thresholdRule,
) {
  const source =
    thresholdRule.severityWeights
    ?? thresholdRule.weights
    ?? thresholdRule.severityChances
    ?? thresholdRule.chances
    ?? thresholdRule.distribution
    ?? null;

  if (!source) {
    return null;
  }

  if (Array.isArray(source)) {
    const weights = {};

    for (const item of source) {
      if (
        item
        && typeof item === "object"
        && SEVERITY_ORDER.includes(
          item.severity ?? item.id
        )
      ) {
        weights[item.severity ?? item.id] =
          Number(
            item.weight
            ?? item.chance
            ?? item.value
            ?? 0
          );
      }
    }

    return weights;
  }

  if (typeof source === "object") {
    return Object.fromEntries(
      Object.entries(source)
        .filter(([severity]) =>
          SEVERITY_ORDER.includes(severity)
        )
        .map(([severity, value]) => [
          severity,
          Number(value) || 0,
        ]),
    );
  }

  return null;
}

function rollSeverityFromThreshold({
  thresholdRule,
  deadlyAuthorized,
  random,
}) {
  const allowedSeverities =
    getAllowedSeverities({
      thresholdRule,
      deadlyAuthorized,
    });

  if (!allowedSeverities.length) {
    throw new RangeError(
      "Wound threshold has no allowed severities.",
    );
  }

  const configuredWeights =
    getThresholdSeverityWeights(
      thresholdRule,
    );

  const weightedBands =
    allowedSeverities.map(
      (severity) => ({
        severity,

        weight:
          configuredWeights
            ? Math.max(
                0,
                Number(
                  configuredWeights[severity]
                  ?? 0,
                ),
              )
            : 1,
      }),
    );

  let totalWeight =
    weightedBands.reduce(
      (total, band) =>
        total + band.weight,
      0,
    );

  // If the rule defines weights but every eligible
  // value is zero, fall back to an even roll across
  // the allowed threshold bands.
  if (totalWeight <= 0) {
    for (const band of weightedBands) {
      band.weight = 1;
    }

    totalWeight =
      weightedBands.length;
  }

  const severityRoll =
    random() * totalWeight;

  let cursor = 0;

  for (const band of weightedBands) {
    cursor += band.weight;

    if (severityRoll < cursor) {
      return Object.freeze({
        severity: band.severity,
        roll: severityRoll,
        totalWeight,
        weights: Object.freeze(
          Object.fromEntries(
            weightedBands.map(
              (entry) => [
                entry.severity,
                entry.weight,
              ],
            ),
          ),
        ),
      });
    }
  }

  const fallback =
    weightedBands[
      weightedBands.length - 1
    ];

  return Object.freeze({
    severity: fallback.severity,
    roll: severityRoll,
    totalWeight,
    weights: Object.freeze(
      Object.fromEntries(
        weightedBands.map(
          (entry) => [
            entry.severity,
            entry.weight,
          ],
        ),
      ),
    ),
  });
}

function applyTraumaDampening({
  severity,
  woundType,
  family,
  dampening,
  armorFunctioning,
  usesRemaining,
}) {
  const maximumUses =
    dampening
      ? Math.max(
          0,
          Math.trunc(
            Number(
              dampening.maximumUses ?? 0,
            ),
          ),
        )
      : 0;

  const requestedUses =
    usesRemaining === null
    || usesRemaining === undefined
      ? maximumUses
      : Number(usesRemaining);

  const normalizedUsesRemaining =
    dampening
      ? Math.max(
          0,
          Math.min(
            maximumUses,
            Number.isFinite(requestedUses)
              ? Math.trunc(requestedUses)
              : 0,
          ),
        )
      : 0;

  function createResult({
    nextSeverity = severity,
    applied = false,
    reason = null,
    useConsumed = false,
  }) {
    return Object.freeze({
      severity: nextSeverity,
      applied,
      dampeningId:
        dampening?.id ?? null,
      mode:
        dampening?.mode ?? null,
      reason,

      maximumUses,
      usesBefore:
        normalizedUsesRemaining,

      usesAfter:
        useConsumed
          ? Math.max(
              0,
              normalizedUsesRemaining - 1,
            )
          : normalizedUsesRemaining,

      useConsumed,
    });
  }

  if (!dampening) {
    return createResult({
      reason: "not_selected",
    });
  }

  if (
    dampening.mode !== "charges"
  ) {
    return createResult({
      reason:
        "unsupported_dampening_mode",
    });
  }

  if (
    family.traumaDampeningEligible
      === false
  ) {
    return createResult({
      reason:
        "wound_table_ineligible",
    });
  }

  if (
    dampening.requiresArmorFunctioning
    && !armorFunctioning
  ) {
    return createResult({
      reason:
        "armor_not_functioning",
    });
  }

  if (
    Array.isArray(
      dampening.qualifyingWoundTypes,
    )
    && !dampening
      .qualifyingWoundTypes
      .includes(woundType)
  ) {
    return createResult({
      reason:
        "wound_type_not_eligible",
    });
  }

  if (severity === "light") {
    return createResult({
      reason:
        "already_light",
    });
  }

  if (
    normalizedUsesRemaining <= 0
  ) {
    return createResult({
      reason:
        "no_uses_remaining",
    });
  }

  const fixedSeverity =
    dampening.fixedSeverity
    ?? "light";

  assertSeverity(
    fixedSeverity,
    "fixed trauma-dampening severity",
  );

  return createResult({
    nextSeverity:
      fixedSeverity,

    applied: true,
    reason: null,

    useConsumed: true,
  });
}

function rollFromEntries({
  entries,
  forcedRoll,
  random,
}) {
  if (!entries.length) {
    throw new RangeError(
      "Cannot roll from an empty wound table.",
    );
  }

  if (
    forcedRoll !== null
    && forcedRoll !== undefined
  ) {
    const numericRoll = Number(forcedRoll);

    const result = entries.find(
      (entry) =>
        entry.roll === numericRoll,
    );

    if (!result) {
      throw new RangeError(
        `Invalid wound roll: ${forcedRoll}`,
      );
    }

    return Object.freeze({
      roll: numericRoll,
      result,
    });
  }

  const selectedIndex = Math.floor(
    random() * entries.length,
  );

  const result = entries[selectedIndex];

  return Object.freeze({
    roll: result.roll,
    result,
  });
}

function resolveCompactWound({
  family,
  woundType,
  threshold,
  thresholdRule,
  deadlyAuthorized,
  traumaDampening,
  traumaDampeningUsesRemaining,
  armorFunctioning,
  forcedRoll,
  random,
  ignoreThresholdLimits,
}) {
  const allEntries = family.entries ?? [];

  if (!allEntries.length) {
    throw new RangeError(
      `No compact entries for ${woundType}`,
    );
  }

  let eligibleEntries = allEntries;

  if (!ignoreThresholdLimits) {
    const allowedSeverities =
      getAllowedSeverities({
        thresholdRule,
        deadlyAuthorized,
      });

    eligibleEntries = allEntries.filter(
      (entry) =>
        allowedSeverities.includes(
          entry.severity,
        ),
    );
  } else if (!deadlyAuthorized) {
    eligibleEntries = allEntries.filter(
      (entry) =>
        entry.severity !== "deadly",
    );
  }

  if (!eligibleEntries.length) {
    throw new RangeError(
      `No eligible compact entries for ${woundType}`,
    );
  }

  const { roll, result } =
    rollFromEntries({
      entries:
        forcedRoll === null
        || forcedRoll === undefined
          ? eligibleEntries
          : allEntries,
      forcedRoll,
      random,
    });

  if (
    !ignoreThresholdLimits
    && !eligibleEntries.includes(result)
  ) {
    throw new RangeError(
      `Roll ${roll} is not allowed at wound threshold "${threshold}".`,
    );
  }

  if (
    result.severity === "deadly"
    && !deadlyAuthorized
  ) {
    throw new RangeError(
      "Deadly wound result is not authorized.",
    );
  }

  const dampeningResult =
    applyTraumaDampening({
      severity: result.severity,
      woundType,
      family,
      dampening: traumaDampening,
      armorFunctioning,
      usesRemaining:
        traumaDampeningUsesRemaining,
    });

  // Compact tables store severity on each result.
  // If dampening is ever enabled for one, reroll from the
  // eligible entries matching the dampened severity rather
  // than relabeling a mismatched narrative result.
  if (
    dampeningResult.applied
    && dampeningResult.severity
      !== result.severity
  ) {
    const dampenedEntries =
      allEntries.filter(
        (entry) =>
          entry.severity
          === dampeningResult.severity,
      );

    const dampenedRoll =
      rollFromEntries({
        entries: dampenedEntries,
        forcedRoll: null,
        random,
      });

    return Object.freeze({
      woundType,
      mode: family.mode,
      requestedSeverity: null,
      severity:
        dampenedRoll.result.severity,
      originalSeverity:
        result.severity,
      threshold,
      deadlyAuthorized,
      ignoreThresholdLimits,
      traumaDampeningApplied: true,
      traumaDampeningId:
        dampeningResult.dampeningId,
      traumaDampeningMode:
        dampeningResult.mode,
      traumaDampeningReason: null,
      traumaDampeningMaximumUses:
        dampeningResult.maximumUses,
      traumaDampeningUsesBefore:
        dampeningResult.usesBefore,
      traumaDampeningUsesAfter:
        dampeningResult.usesAfter,
      traumaDampeningUseConsumed:
        dampeningResult.useConsumed,
      damageStillApplies:
        traumaDampening
          .damageStillApplies !== false,
      woundThresholdStillAdvances:
        traumaDampening
          .woundThresholdStillAdvances
          !== false,
      originalRoll: roll,
      roll: dampenedRoll.roll,
      result: dampenedRoll.result,
    });
  }

  return Object.freeze({
    woundType,
    mode: family.mode,
    requestedSeverity: null,
    severity: result.severity,
    originalSeverity: result.severity,
    threshold,
    deadlyAuthorized,
    ignoreThresholdLimits,
    traumaDampeningApplied:
      dampeningResult.applied,
    traumaDampeningId:
      dampeningResult.dampeningId,
    traumaDampeningMode:
      dampeningResult.mode,
    traumaDampeningReason:
      dampeningResult.reason,
    traumaDampeningMaximumUses:
      dampeningResult.maximumUses,
    traumaDampeningUsesBefore:
      dampeningResult.usesBefore,
    traumaDampeningUsesAfter:
      dampeningResult.usesAfter,
    traumaDampeningUseConsumed:
      dampeningResult.useConsumed,
    damageStillApplies:
      !dampeningResult.applied
      || traumaDampening
        .damageStillApplies !== false,
    woundThresholdStillAdvances:
      !dampeningResult.applied
      || traumaDampening
        .woundThresholdStillAdvances
        !== false,
    roll,
    result,
  });
}

export function resolveWound({
  woundType,
  requestedSeverity = null,
  threshold = "first",
  deadlyAuthorized = false,

  traumaDampening = null,
  traumaDampeningUsesRemaining = null,
  armorFunctioning = true,

  forcedRoll = null,
  random = Math.random,
  ignoreThresholdLimits = false,
} = {}) {
  const family = getWoundTable(woundType);

  if (!family) {
    throw new RangeError(
      `Unknown wound type: ${woundType}`,
    );
  }

  const thresholdRule =
    WOUND_THRESHOLD_RULES[threshold];

  if (!thresholdRule) {
    throw new RangeError(
      `Unknown wound threshold: ${threshold}`,
    );
  }

  if (family.mode === "compact_d10") {
    return resolveCompactWound({
      family,
      woundType,
      threshold,
      thresholdRule,
      deadlyAuthorized,
      traumaDampening,
      traumaDampeningUsesRemaining,
      armorFunctioning,
      forcedRoll,
      random,
      ignoreThresholdLimits,
    });
  }

  const hasRequestedSeverity =
    requestedSeverity !== null
    && requestedSeverity !== undefined
    && requestedSeverity !== "";

  let severitySource =
    "threshold_roll";

  let severityRoll = null;

  let severity;

  if (hasRequestedSeverity) {
    assertSeverity(
      requestedSeverity,
      "requested wound severity",
    );

    severity =
      requestedSeverity;

    severitySource =
      "manual_override";

    if (
      severity === "deadly"
      && !deadlyAuthorized
    ) {
      severity = "severe";
    }

    if (!ignoreThresholdLimits) {
      severity = clampSeverityToAllowed(
        severity,
        getAllowedSeverities({
          thresholdRule,
          deadlyAuthorized,
        }),
      );
    }
  } else {
    const rolledSeverity =
      rollSeverityFromThreshold({
        thresholdRule,
        deadlyAuthorized,
        random,
      });

    severity =
      rolledSeverity.severity;

    severityRoll =
      rolledSeverity;
  }

  const originalSeverity = severity;

  const dampeningResult =
    applyTraumaDampening({
      severity,
      woundType,
      family,
      dampening: traumaDampening,
      armorFunctioning,
      usesRemaining:
        traumaDampeningUsesRemaining,
    });

  severity = dampeningResult.severity;

  const entries =
    getWoundEntries(
      woundType,
      severity,
    );

  if (!entries.length) {
    throw new RangeError(
      `No ${severity} table for ${woundType}`,
    );
  }

  const { roll, result } =
    rollFromEntries({
      entries,
      forcedRoll,
      random,
    });

  return Object.freeze({
    woundType,
    mode: family.mode,
    requestedSeverity:
      hasRequestedSeverity
        ? requestedSeverity
        : null,

    severity,
    originalSeverity,
    severitySource,
    severityRoll,
    threshold,
    deadlyAuthorized,
    ignoreThresholdLimits,

    traumaDampeningApplied:
      dampeningResult.applied,

    traumaDampeningId:
      dampeningResult.dampeningId,

    traumaDampeningMode:
      dampeningResult.mode,

    traumaDampeningReason:
      dampeningResult.reason,

    traumaDampeningMaximumUses:
      dampeningResult.maximumUses,

    traumaDampeningUsesBefore:
      dampeningResult.usesBefore,

    traumaDampeningUsesAfter:
      dampeningResult.usesAfter,

    traumaDampeningUseConsumed:
      dampeningResult.useConsumed,

    damageStillApplies:
      !dampeningResult.applied
      || traumaDampening
        .damageStillApplies !== false,

    woundThresholdStillAdvances:
      !dampeningResult.applied
      || traumaDampening
        .woundThresholdStillAdvances
        !== false,

    roll,
    result,
  });
}
