/** Shared helpers for protection with limited duration or capacity. */

export const PROTECTION_TIMER_UNITS = Object.freeze([
  "rounds",
  "minutes",
  "hours",
  "intervals",
]);

export const PROTECTION_TIMER_RULES = Object.freeze({
  minimumRemaining: 0,

  requiredFields: Object.freeze([
    "remaining",
    "unit",
    "depletionRate",
  ]),

  validUnits: PROTECTION_TIMER_UNITS,

  leavingHazardStopsDepletionByDefault: true,
  intensityMayIncreaseDepletion: true,
  systemDamageMayIncreaseDepletion: true,

  timerExpirationDoesNotAlwaysRemoveAllProtection: true,
  timerFailureRoutingIsProfileDefined: true,
});

export function validateProtectionTimer(timer = {}) {
  const missingFields =
    PROTECTION_TIMER_RULES.requiredFields.filter(
      (field) =>
        timer[field] === undefined
        || timer[field] === null,
    );

  const errors = [];

  const remaining = Number(timer.remaining);
  const depletionRate = Number(timer.depletionRate);

  if (missingFields.length > 0) {
    errors.push(
      `Missing required field(s): ${missingFields.join(", ")}`,
    );
  }

  if (
    timer.remaining !== undefined
    && (
      !Number.isFinite(remaining)
      || remaining < 0
    )
  ) {
    errors.push(
      "remaining must be a non-negative number",
    );
  }

  if (
    timer.depletionRate !== undefined
    && (
      !Number.isFinite(depletionRate)
      || depletionRate < 0
    )
  ) {
    errors.push(
      "depletionRate must be a non-negative number",
    );
  }

  if (
    timer.unit !== undefined
    && !PROTECTION_TIMER_UNITS.includes(timer.unit)
  ) {
    errors.push(
      `unit must be one of: ${PROTECTION_TIMER_UNITS.join(", ")}`,
    );
  }

  return Object.freeze({
    valid: errors.length === 0,
    missingFields: Object.freeze(missingFields),
    errors: Object.freeze(errors),
  });
}

export function normalizeProtectionTimer(timer = {}) {
  const validation = validateProtectionTimer(timer);

  if (!validation.valid) {
    return Object.freeze({
      valid: false,
      errors: validation.errors,
      timer: null,
    });
  }

  return Object.freeze({
    valid: true,
    errors: Object.freeze([]),

    timer: Object.freeze({
      id: timer.id ?? null,
      type: timer.type ?? null,

      remaining: Math.max(
        0,
        Number(timer.remaining),
      ),

      unit: timer.unit,

      depletionRate: Math.max(
        0,
        Number(timer.depletionRate),
      ),

      expiresInto:
        timer.expiresInto ?? null,

      depletesOutsideHazard:
        timer.depletesOutsideHazard ?? false,
    }),
  });
}

export function calculateProtectionDepletion({
  depletionRate = 1,
  intervals = 1,
  intensityMultiplier = 1,
  damageModifier = 0,
} = {}) {
  const safeRate = Math.max(
    0,
    Number(depletionRate) || 0,
  );

  const safeIntervals = Math.max(
    0,
    Number(intervals) || 0,
  );

  const safeIntensityMultiplier = Math.max(
    0,
    Number(intensityMultiplier) || 0,
  );

  const safeDamageModifier = Math.max(
    0,
    Number(damageModifier) || 0,
  );

  return Math.max(
    0,
    (
      safeRate
      * safeIntervals
      * safeIntensityMultiplier
    ) + safeDamageModifier,
  );
}

export function depleteProtectionTimer({
  remaining,
  depletionRate = 1,
  intervals = 1,
  intensityMultiplier = 1,
  damageModifier = 0,
} = {}) {
  const previousRemaining = Math.max(
    0,
    Number(remaining) || 0,
  );

  const depletedBy =
    calculateProtectionDepletion({
      depletionRate,
      intervals,
      intensityMultiplier,
      damageModifier,
    });

  const nextRemaining = Math.max(
    0,
    previousRemaining - depletedBy,
  );

  const expiredThisInterval =
    previousRemaining > 0
    && nextRemaining === 0;

  return Object.freeze({
    previousRemaining,
    depletedBy,
    remaining: nextRemaining,

    active: nextRemaining > 0,
    expiredThisInterval,
    wasAlreadyExpired: previousRemaining === 0,

    overflowDepletion: Math.max(
      0,
      depletedBy - previousRemaining,
    ),
  });
}

export function resolveProtectionTimerInterval({
  timer,
  intervals = 1,
  intensityMultiplier = 1,
  damageModifier = 0,
  currentlyExposed = true,
} = {}) {
  const normalized =
    normalizeProtectionTimer(timer);

  if (!normalized.valid) {
    return Object.freeze({
      valid: false,
      errors: normalized.errors,
      timer: null,

      depletedBy: 0,
      expiredThisInterval: false,
      routeTo: null,
    });
  }

  const currentTimer = normalized.timer;

  const shouldDeplete =
    currentlyExposed
    || currentTimer.depletesOutsideHazard;

  if (!shouldDeplete) {
    return Object.freeze({
      valid: true,
      errors: Object.freeze([]),

      timer: currentTimer,

      depletedBy: 0,
      overflowDepletion: 0,

      active: currentTimer.remaining > 0,
      expiredThisInterval: false,
      wasAlreadyExpired:
        currentTimer.remaining === 0,

      routeTo: null,
    });
  }

  const result = depleteProtectionTimer({
    remaining: currentTimer.remaining,
    depletionRate: currentTimer.depletionRate,
    intervals,
    intensityMultiplier,
    damageModifier,
  });

  return Object.freeze({
    valid: true,
    errors: Object.freeze([]),

    timer: Object.freeze({
      ...currentTimer,
      remaining: result.remaining,
    }),

    depletedBy: result.depletedBy,
    overflowDepletion:
      result.overflowDepletion,

    active: result.active,
    expiredThisInterval:
      result.expiredThisInterval,

    wasAlreadyExpired:
      result.wasAlreadyExpired,

    routeTo:
      result.expiredThisInterval
        ? currentTimer.expiresInto
        : null,
  });
}