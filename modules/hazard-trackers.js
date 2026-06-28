/**
 * Warden Resolution Console
 * Hazard state and progression helpers.
 *
 * Responsibilities:
 * - create temporary hazard tracker state
 * - advance protection timers
 * - track Air-Loss save difficulty
 * - advance radiation, heat, and cold stages
 * - resolve vacuum exposure state
 * - track ship-side radiation protection
 * - create toxin exposure scaffolding
 * - return structured handoffs to other resolvers
 *
 * Does not:
 * - apply Health damage
 * - calculate Wound thresholds or Overflow
 * - roll Wound-table results
 * - resolve TAC results
 * - mutate character or ship records
 */

import {
  AIR_LOSS_HAZARD,
  VACUUM_HAZARD,
  PERSONNEL_RADIATION_HAZARD,
  SHIP_RADIATION_HAZARD,
  THERMAL_HAZARDS,
  TOXIN_PROFILE_SCHEMA,
  getRadiationStage,
  getThermalStage,
  getAirLossDisadvantageSteps,
  depleteProtectionTimer
} from "../data/hazards.js";

export const HAZARD_TRACKER_TYPES = Object.freeze({
  PROTECTION: "protection",
  AIR_LOSS: "air_loss",
  PERSONNEL_RADIATION: "personnel_radiation",
  HEAT: "heat",
  COLD: "cold",
  VACUUM: "vacuum",
  SHIP_RADIATION: "ship_radiation",
  TOXIN: "toxin"
});

export const HAZARD_TRACKER_STATUS = Object.freeze({
  PROTECTED: "protected",
  ACTIVE: "active",
  EXPOSED: "exposed",
  STABILIZED: "stabilized",
  RECOVERING: "recovering",
  RESOLVED: "resolved",
  FATAL: "fatal"
});

export const VACUUM_PROTECTION_STATES = Object.freeze({
  FULLY_EXPOSED: "fully_exposed",
  SUIT_PROTECTED: "suit_protected",
  HABITAT_PROTECTED: "habitat_protected"
});

export const SHIP_RADIATION_MODES = Object.freeze({
  EXTERNAL: "external_irradiation",
  INTERNAL: "internal_contamination"
});

/**
 * Create a generic protection timer.
 */
export function createProtectionTracker({
  hazardType,
  protectionSource,
  remaining,
  unit = "minutes",
  depletionRate = 1,
  failureConsequence = "direct_exposure",
  metadata = {}
} = {}) {
  const errors = [];

  if (!hazardType || typeof hazardType !== "string") {
    errors.push("A valid hazardType is required.");
  }

  if (
    !protectionSource ||
    typeof protectionSource !== "string"
  ) {
    errors.push("A valid protectionSource is required.");
  }

  const safeRemaining = normalizeNonNegativeNumber(
    remaining,
    0
  );

  const safeRate = normalizeNonNegativeNumber(
    depletionRate,
    1
  );

  if (errors.length > 0) {
    return failureResult(errors);
  }

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      type: HAZARD_TRACKER_TYPES.PROTECTION,
      hazardType,
      protectionSource,

      status:
        safeRemaining > 0
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED,

      remaining: safeRemaining,
      maximum: safeRemaining,
      unit,
      depletionRate: safeRate,
      failureConsequence,

      elapsedIntervals: 0,
      depleted: safeRemaining <= 0,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance a generic protection timer.
 */
export function advanceProtectionTracker(
  tracker,
  {
    intervals = 1,
    depletionRate = null,
    leaveHazard = false
  } = {}
) {
  const validation = validateTracker(
    tracker,
    HAZARD_TRACKER_TYPES.PROTECTION
  );

  if (!validation.ok) {
    return validation;
  }

  if (leaveHazard) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...tracker,
        status: HAZARD_TRACKER_STATUS.RESOLVED
      },

      consequences: {
        protectionDepleted: false,
        directExposureBegins: false
      },

      handoffs: emptyHandoffs()
    };
  }

  if (
    tracker.status ===
      HAZARD_TRACKER_STATUS.RESOLVED ||
    tracker.depleted
  ) {
    return {
      ok: true,
      errors: [],
      warnings: [
        "Protection tracker is already depleted or resolved."
      ],

      tracker: { ...tracker },

      consequences: {
        protectionDepleted: tracker.depleted,
        directExposureBegins: tracker.depleted
      },

      handoffs: emptyHandoffs()
    };
  }

  const safeIntervals = normalizeNonNegativeNumber(
    intervals,
    1
  );

  const safeRate =
    depletionRate === null
      ? tracker.depletionRate
      : normalizeNonNegativeNumber(
          depletionRate,
          tracker.depletionRate
        );

  const nextRemaining = depleteProtectionRemaining({
    remaining: tracker.remaining,
    depletionRate: safeRate,
    intervals: safeIntervals
  });

  const depleted =
    tracker.remaining > 0 &&
    nextRemaining <= 0;

  const nextTracker = {
    ...tracker,

    remaining: nextRemaining,
    depletionRate: safeRate,

    elapsedIntervals:
      tracker.elapsedIntervals + safeIntervals,

    depleted: nextRemaining <= 0,

    status:
      nextRemaining > 0
        ? HAZARD_TRACKER_STATUS.PROTECTED
        : HAZARD_TRACKER_STATUS.EXPOSED
  };

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: nextTracker,

    consequences: {
      protectionLost:
        tracker.remaining - nextRemaining,

      protectionDepleted: depleted,

      directExposureBegins:
        nextRemaining <= 0,

      failureConsequence:
        nextRemaining <= 0
          ? tracker.failureConsequence
          : null
    },

    handoffs: emptyHandoffs()
  };
}

/**
 * Create an Air-Loss tracker.
 */
export function createAirLossTracker({
  source = "low_oxygen",
  interval = null,
  protection = null,
  protectedBy = null,
  protectionRemaining = null,
  protectionUnit = "rounds",
  metadata = {}
} = {}) {
  const resolvedInterval =
    interval ??
    AIR_LOSS_HAZARD.defaultIntervals[source] ??
    "profile_defined";

  const normalizedProtection =
    normalizeProtectionInput({
      protection,
      source: protectedBy,
      remaining: protectionRemaining,
      unit: protectionUnit,
      defaultExpirationRoute: "air_loss"
    });

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      type: HAZARD_TRACKER_TYPES.AIR_LOSS,
      hazardId: AIR_LOSS_HAZARD.id,
      source,

      status:
        normalizedProtection?.effective
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.ACTIVE,

      interval: resolvedInterval,

      checkNumber: 0,
      lastSaveSucceeded: null,

      conscious: true,
      fatalTimer: null,
      unconsciousRecoveryTimer: null,

      protection: normalizedProtection,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance an Air-Loss tracker.
 *
 * saveSucceeded may be:
 * - true
 * - false
 * - null, which returns the required save without resolving it
 */
export function advanceAirLossTracker(
  tracker,
  {
    saveSucceeded = null,
    breathingRestored = false,
    protectionIntervals = 1,
    protectionDepletionRate = null
  } = {}
) {
  const validation = validateTracker(
    tracker,
    HAZARD_TRACKER_TYPES.AIR_LOSS
  );

  if (!validation.ok) {
    return validation;
  }

  if (breathingRestored) {
    const wasUnconscious =
      tracker.conscious === false;

    const unconsciousRecoveryTimer =
      wasUnconscious
        ? {
            ...AIR_LOSS_HAZARD
              .breathingRestored
              .unconsciousRecovery,

            remaining:
              AIR_LOSS_HAZARD
                .breathingRestored
                .unconsciousRecovery
                .duration
          }
        : null;

    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...tracker,

        status:
          wasUnconscious
            ? HAZARD_TRACKER_STATUS.STABILIZED
            : HAZARD_TRACKER_STATUS.RESOLVED,

        fatalTimer: null,
        unconsciousRecoveryTimer
      },

      consequences: {
        breathingRestored: true,
        airLossProgressionStopped: true,
        fatalTimerStopped:
          tracker.fatalTimer !== null,

        remainsUnconscious:
          wasUnconscious,

        unconsciousRecoveryTimer,

        existingWoundsRemain: true,
        asphyxiationWoundsRemain: true,

        stabilizationRequired:
          wasUnconscious
      },

      handoffs: emptyHandoffs()
    };
  }

  let workingTracker = { ...tracker };

  const protectionResult =
    advanceOptionalProtection(
      workingTracker.protection,
      {
        intervals:
          protectionIntervals,

        depletionRate:
          protectionDepletionRate
      }
    );

  if (protectionResult.protection) {
    workingTracker = {
      ...workingTracker,

      protection:
        protectionResult.protection,

      status:
        protectionResult.effective
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.ACTIVE
    };

    if (protectionResult.effective) {
      return {
        ok: true,
        errors: [],
        warnings: [],

        tracker: workingTracker,

        consequences: {
          bodySaveRequired: false,
          protectionEffective: true,
          protectionRemaining:
            protectionResult.remaining,
          timerExpiredThisInterval:
            false
        },

        handoffs: emptyHandoffs()
      };
    }
  }

  if (workingTracker.conscious === false) {
    return {
      ok: true,
      errors: [],
      warnings: [
        "Target is already unconscious from Air Loss."
      ],

      tracker: workingTracker,

      consequences: {
        bodySaveRequired: false,
        fatalTimerActive:
          workingTracker.fatalTimer !== null
      },

      handoffs: {
        ...emptyHandoffs(),

        fatalTimer:
          workingTracker.fatalTimer
      }
    };
  }

  const nextCheckNumber =
    workingTracker.checkNumber + 1;

  const disadvantageSteps =
    getAirLossDisadvantageSteps(
      nextCheckNumber
    );

  if (
    saveSucceeded === null ||
    saveSucceeded === undefined
  ) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...workingTracker,
        status: HAZARD_TRACKER_STATUS.ACTIVE
      },

      consequences: {
        bodySaveRequired: true,
        checkNumber: nextCheckNumber,
        disadvantageSteps,
        interval: workingTracker.interval
      },

      handoffs: emptyHandoffs()
    };
  }

  if (saveSucceeded === true) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...workingTracker,

        status:
          HAZARD_TRACKER_STATUS.ACTIVE,

        checkNumber:
          nextCheckNumber,

        lastSaveSucceeded: true
      },

      consequences: {
        bodySaveRequired: false,
        remainedConscious: true,
        checkNumber: nextCheckNumber,
        disadvantageSteps
      },

      handoffs: emptyHandoffs()
    };
  }

  const fatalTimerDefinition =
    AIR_LOSS_HAZARD
      .save
      .onFailure
      .fatalTimer;

  const fatalTimer = {
    ...fatalTimerDefinition,

    remaining:
      fatalTimerDefinition.duration
  };

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      ...workingTracker,

      status:
        HAZARD_TRACKER_STATUS.FATAL,

      checkNumber:
        nextCheckNumber,

      lastSaveSucceeded: false,
      conscious: false,
      fatalTimer,
      unconsciousRecoveryTimer: null
    },

    consequences: {
      bodySaveRequired: false,
      remainedConscious: false,
      unconscious: true,
      fatalTimer,
      checkNumber: nextCheckNumber,
      disadvantageSteps
    },

    handoffs: {
      ...emptyHandoffs(),
      fatalTimer
    }
  };
}

/**
 * Create a personnel radiation tracker.
 */
export function createPersonnelRadiationTracker({
  intensity = "low",
  protection = null,
  protectionSource = null,
  protectionEffective = null,
  protectionRemaining = null,
  protectionUnit = null,
  stageId = "protected",
  exposureInterval = "profile_defined",
  metadata = {}
} = {}) {
  const stage = getRadiationStage(stageId);

  if (!stage) {
    return failureResult([
      `Unknown radiation stage: "${stageId}".`
    ]);
  }

  const defaultProtection =
    PERSONNEL_RADIATION_HAZARD
      .protection
      .defaultDurationsByIntensity[
        intensity
      ];

  if (!defaultProtection) {
    return failureResult([
      `Unknown radiation intensity: "${intensity}".`
    ]);
  }

  const normalizedProtection =
    normalizeProtectionInput({
      protection,
      source: protectionSource,
      effective:
        protectionEffective,
      remaining:
        protectionRemaining,
      unit:
        protectionUnit ??
        defaultProtection.unit,
      defaultRemaining:
        defaultProtection.remaining,
      defaultExpirationRoute:
        "direct_radiation_exposure"
    });

  const isProtected =
    normalizedProtection?.effective === true;

  const resolvedStage =
    isProtected
      ? getRadiationStage("protected")
      : stageId === "protected"
        ? getRadiationStage("irradiated")
        : stage;

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      type:
        HAZARD_TRACKER_TYPES
          .PERSONNEL_RADIATION,

      hazardId:
        PERSONNEL_RADIATION_HAZARD.id,

      intensity,

      status:
        isProtected
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED,

      stageId: resolvedStage.id,
      stageIndex: resolvedStage.index,

      exposureInterval,
      exposureCount: 0,

      protection:
        normalizedProtection,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance personnel radiation.
 */
export function advancePersonnelRadiationTracker(
  tracker,
  {
    intervals = 1,
    protectionDepletionRate = 1,
    bodySaveSucceeded = null,
    forcedStageId = null,
    leaveHazard = false
  } = {}
) {
  const validation = validateTracker(
    tracker,
    HAZARD_TRACKER_TYPES
      .PERSONNEL_RADIATION
  );

  if (!validation.ok) {
    return validation;
  }

  if (leaveHazard) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...tracker,
        status:
          HAZARD_TRACKER_STATUS.RECOVERING
      },

      consequences: {
        exposureStopped: true,
        currentStage:
          getRadiationStage(
            tracker.stageId
          )
      },

      handoffs: emptyHandoffs()
    };
  }

  let workingTracker = { ...tracker };

  if (
    workingTracker.protection &&
    workingTracker.protection.remaining > 0
  ) {
    const nextRemaining =
      depleteProtectionRemaining({
        remaining:
          workingTracker.protection
            .remaining,

        depletionRate:
          protectionDepletionRate,

        intervals
      });

    workingTracker = {
      ...workingTracker,

      protection: {
        ...workingTracker.protection,
        remaining: nextRemaining
      },

      status:
        nextRemaining > 0
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED
    };

    if (nextRemaining > 0) {
      return {
        ok: true,
        errors: [],
        warnings: [],

        tracker: workingTracker,

        consequences: {
          directExposure: false,
          protectionRemaining:
            nextRemaining
        },

        handoffs: emptyHandoffs()
      };
    }
  }

  if (forcedStageId) {
    const forcedStage =
      getRadiationStage(forcedStageId);

    if (!forcedStage) {
      return failureResult([
        `Unknown radiation stage: "${forcedStageId}".`
      ]);
    }

    workingTracker = {
      ...workingTracker,
      stageId: forcedStage.id,
      stageIndex: forcedStage.index,
      status:
        forcedStage.id === "fatal"
          ? HAZARD_TRACKER_STATUS.FATAL
          : HAZARD_TRACKER_STATUS.EXPOSED
    };

    return buildStageAdvanceResult(
      workingTracker,
      forcedStage,
      {
        forced: true,
        source:
          "personnel_radiation"
      }
    );
  }

  if (
    bodySaveSucceeded === null ||
    bodySaveSucceeded === undefined
  ) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...workingTracker,
        status:
          HAZARD_TRACKER_STATUS.EXPOSED
      },

      consequences: {
        directExposure: true,
        bodySaveRequired: true,
        interval:
          workingTracker.exposureInterval
      },

      handoffs: emptyHandoffs()
    };
  }

  if (bodySaveSucceeded === true) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...workingTracker,

        status:
          HAZARD_TRACKER_STATUS.EXPOSED,

        exposureCount:
          workingTracker.exposureCount +
          intervals
      },

      consequences: {
        bodySaveRequired: false,
        stageAdvanced: false,
        currentStage:
          getRadiationStage(
            workingTracker.stageId
          )
      },

      handoffs: emptyHandoffs()
    };
  }

  const nextStage =
    getNextStage(
      PERSONNEL_RADIATION_HAZARD
        .stages,
      workingTracker.stageId
    );

  const nextTracker = {
    ...workingTracker,

    exposureCount:
      workingTracker.exposureCount +
      intervals,

    stageId:
      nextStage.id,

    stageIndex:
      nextStage.index,

    status:
      nextStage.id === "fatal"
        ? HAZARD_TRACKER_STATUS.FATAL
        : HAZARD_TRACKER_STATUS.EXPOSED
  };

  return buildStageAdvanceResult(
    nextTracker,
    nextStage,
    {
      forced: false,
      source:
        "personnel_radiation"
    }
  );
}

/**
 * Create a Heat or Cold tracker.
 */
export function createThermalTracker({
  trackId,
  protection = null,
  protectionSource = null,
  protectionEffective = null,
  protectionRemaining = null,
  protectionUnit = "minutes",
  stageId = "protected",
  exposureInterval = "profile_defined",
  metadata = {}
} = {}) {
  const normalizedTrackId =
    normalizeThermalTrackId(trackId);

  if (!normalizedTrackId) {
    return failureResult([
      `Unknown thermal track: "${trackId}".`
    ]);
  }

  const stage = getThermalStage(
    normalizedTrackId,
    stageId
  );

  if (!stage) {
    return failureResult([
      `Unknown ${normalizedTrackId} stage: "${stageId}".`
    ]);
  }

  const normalizedProtection =
    normalizeProtectionInput({
      protection,
      source: protectionSource,
      effective:
        protectionEffective,
      remaining:
        protectionRemaining,
      unit:
        protectionUnit,
      defaultExpirationRoute:
        `${normalizedTrackId}_exposure`
    });

  const isProtected =
    normalizedProtection?.effective === true;

  const firstExposedStage =
    normalizedTrackId === "heat"
      ? "heat_stress"
      : "cold_stress";

  const resolvedStage =
    isProtected
      ? getThermalStage(
          normalizedTrackId,
          "protected"
        )
      : stageId === "protected"
        ? getThermalStage(
            normalizedTrackId,
            firstExposedStage
          )
        : stage;

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      type:
        normalizedTrackId === "heat"
          ? HAZARD_TRACKER_TYPES.HEAT
          : HAZARD_TRACKER_TYPES.COLD,

      hazardId:
        normalizedTrackId === "heat"
          ? "heat_exposure"
          : "cold_exposure",

      trackId:
        normalizedTrackId,

      status:
        isProtected
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED,

      stageId:
        resolvedStage.id,

      stageIndex:
        resolvedStage.index,

      exposureInterval,
      exposureCount: 0,

      protection:
        normalizedProtection,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance Heat or Cold exposure.
 */
export function advanceThermalTracker(
  tracker,
  {
    intervals = 1,
    protectionDepletionRate = 1,
    bodySaveSucceeded = null,
    forcedStageId = null,
    leaveHazard = false
  } = {}
) {
  const allowedTypes = [
    HAZARD_TRACKER_TYPES.HEAT,
    HAZARD_TRACKER_TYPES.COLD
  ];

  if (
    !tracker ||
    !allowedTypes.includes(tracker.type)
  ) {
    return failureResult([
      "Tracker is not a valid thermal tracker."
    ]);
  }

  if (leaveHazard) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...tracker,
        status:
          HAZARD_TRACKER_STATUS.RECOVERING
      },

      consequences: {
        exposureStopped: true,
        currentStage:
          getThermalStage(
            tracker.trackId,
            tracker.stageId
          )
      },

      handoffs: emptyHandoffs()
    };
  }

  let workingTracker = { ...tracker };

  if (
    workingTracker.protection &&
    workingTracker.protection.remaining > 0
  ) {
    const nextRemaining =
      depleteProtectionRemaining({
        remaining:
          workingTracker.protection
            .remaining,

        depletionRate:
          protectionDepletionRate,

        intervals
      });

    workingTracker = {
      ...workingTracker,

      protection: {
        ...workingTracker.protection,
        remaining: nextRemaining
      },

      status:
        nextRemaining > 0
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED
    };

    if (nextRemaining > 0) {
      return {
        ok: true,
        errors: [],
        warnings: [],

        tracker: workingTracker,

        consequences: {
          directExposure: false,
          protectionRemaining:
            nextRemaining
        },

        handoffs: emptyHandoffs()
      };
    }
  }

  if (forcedStageId) {
    const forcedStage =
      getThermalStage(
        workingTracker.trackId,
        forcedStageId
      );

    if (!forcedStage) {
      return failureResult([
        `Unknown thermal stage: "${forcedStageId}".`
      ]);
    }

    const forcedTracker = {
      ...workingTracker,

      stageId:
        forcedStage.id,

      stageIndex:
        forcedStage.index,

      status:
        forcedStage.id === "fatal"
          ? HAZARD_TRACKER_STATUS.FATAL
          : HAZARD_TRACKER_STATUS.EXPOSED
    };

    return buildStageAdvanceResult(
      forcedTracker,
      forcedStage,
      {
        forced: true,
        source:
          workingTracker.trackId
      }
    );
  }

  if (
    bodySaveSucceeded === null ||
    bodySaveSucceeded === undefined
  ) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...workingTracker,
        status:
          HAZARD_TRACKER_STATUS.EXPOSED
      },

      consequences: {
        directExposure: true,
        bodySaveRequired: true,
        interval:
          workingTracker.exposureInterval
      },

      handoffs: emptyHandoffs()
    };
  }

  if (bodySaveSucceeded === true) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...workingTracker,

        status:
          HAZARD_TRACKER_STATUS.EXPOSED,

        exposureCount:
          workingTracker.exposureCount +
          intervals
      },

      consequences: {
        stageAdvanced: false,
        currentStage:
          getThermalStage(
            workingTracker.trackId,
            workingTracker.stageId
          )
      },

      handoffs: emptyHandoffs()
    };
  }

  const track =
    THERMAL_HAZARDS[
      workingTracker.trackId
    ];

  const nextStage =
    getNextStage(
      track.stages,
      workingTracker.stageId
    );

  const nextTracker = {
    ...workingTracker,

    exposureCount:
      workingTracker.exposureCount +
      intervals,

    stageId:
      nextStage.id,

    stageIndex:
      nextStage.index,

    status:
      nextStage.id === "fatal"
        ? HAZARD_TRACKER_STATUS.FATAL
        : HAZARD_TRACKER_STATUS.EXPOSED
  };

  return buildStageAdvanceResult(
    nextTracker,
    nextStage,
    {
      forced: false,
      source:
        workingTracker.trackId
    }
  );
}

/**
 * Create a vacuum tracker.
 */
export function createVacuumTracker({
  protectionState =
    VACUUM_PROTECTION_STATES
      .FULLY_EXPOSED,

  suitSealIntact = false,
  breathingSupply = null,
  breathingUnit = "rounds",
  collisionRisk = false,
  explosiveDecompression = false,
  metadata = {}
} = {}) {
  const validProtectionState =
    Object.values(
      VACUUM_PROTECTION_STATES
    ).includes(protectionState);

  if (!validProtectionState) {
    return failureResult([
      `Unknown vacuum protection state: "${protectionState}".`
    ]);
  }

  const sealEffective =
    protectionState !==
      VACUUM_PROTECTION_STATES
        .FULLY_EXPOSED
    && suitSealIntact;

  const breathingTimer =
    breathingSupply === null
      ? null
      : {
          remaining:
            normalizeNonNegativeNumber(
              breathingSupply,
              0
            ),

          maximum:
            normalizeNonNegativeNumber(
              breathingSupply,
              0
            ),

          unit:
            breathingUnit,

          depletionRate: 1,
          expiresInto: "air_loss"
        };

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      type:
        HAZARD_TRACKER_TYPES.VACUUM,

      hazardId:
        VACUUM_HAZARD.id,

      status:
        sealEffective
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED,

      protectionState,
      suitSealIntact,

      breathingSupply:
        breathingTimer,

      exposureRounds: 0,
      directExposureResolved: false,

      collisionRisk,
      explosiveDecompression,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance vacuum exposure.
 */
export function advanceVacuumTracker(
  tracker,
  {
    intervals = 1,
    suitSealFailed = false,
    breathingDepletionRate = null,
    collisionOccurred = false
  } = {}
) {
  const validation = validateTracker(
    tracker,
    HAZARD_TRACKER_TYPES.VACUUM
  );

  if (!validation.ok) {
    return validation;
  }

  let workingTracker = {
    ...tracker
  };

  const warnings = [];
  const handoffs = emptyHandoffs();

  if (suitSealFailed) {
    workingTracker = {
      ...workingTracker,
      suitSealIntact: false,

      protectionState:
        VACUUM_PROTECTION_STATES
          .FULLY_EXPOSED,

      status:
        HAZARD_TRACKER_STATUS.EXPOSED
    };
  }

  if (
    collisionOccurred ||
    (
      workingTracker.collisionRisk &&
      workingTracker
        .explosiveDecompression
    )
  ) {
    handoffs.woundResolver = {
      tableId: "blunt_force",
      severity: null,
      reason: "vacuum_collision"
    };
  }

  const sealEffective =
    workingTracker.suitSealIntact
    && workingTracker.protectionState
      !== VACUUM_PROTECTION_STATES
        .FULLY_EXPOSED;

  if (sealEffective) {
    if (workingTracker.breathingSupply) {
      const timerResult =
        depleteProtectionTimer({
          remaining:
            workingTracker
              .breathingSupply
              .remaining,

          depletionRate:
            breathingDepletionRate
            ?? workingTracker
              .breathingSupply
              .depletionRate
            ?? 1,

          intervals
        });

      const nextRemaining =
        getTimerRemaining(timerResult);

      workingTracker = {
        ...workingTracker,

        breathingSupply: {
          ...workingTracker
            .breathingSupply,

          remaining:
            nextRemaining
        },

        status:
          nextRemaining > 0
            ? HAZARD_TRACKER_STATUS.PROTECTED
            : HAZARD_TRACKER_STATUS.ACTIVE
      };

      if (nextRemaining > 0) {
        return {
          ok: true,
          errors: [],
          warnings,

          tracker: workingTracker,

          consequences: {
            directVacuumExposure: false,
            sealEffective: true,
            breathingSupplyRemaining:
              nextRemaining
          },

          handoffs
        };
      }

      return {
        ok: true,
        errors: [],
        warnings,

        tracker: workingTracker,

        consequences: {
          directVacuumExposure: false,
          sealEffective: true,
          breathingSupplyRemaining: 0,
          breathingSupplyExpired: true
        },

        handoffs: {
          ...handoffs,

          personnelHazard: {
            hazardId: "air_loss",
            source: "vacuum",
            reason:
              "breathing_supply_expired"
          }
        }
      };
    }

    return {
      ok: true,
      errors: [],
      warnings,

      tracker: workingTracker,

      consequences: {
        directVacuumExposure: false,
        sealEffective: true,
        breathingSupplyRemaining: null
      },

      handoffs
    };
  }

  const nextExposureRounds =
    workingTracker.exposureRounds
    + normalizeNonNegativeNumber(
        intervals,
        1
      );

  const woundHandoff = {
    tableId:
      "vacuum_decompression",

    mode:
      "compact_d10",

    forcedRoll:
      null,

    ignoreThresholdLimits:
      true,

    reason:
      workingTracker
        .directExposureResolved
        ? "continued_direct_vacuum_exposure"
        : "initial_direct_vacuum_exposure"
  };

  return {
    ok: true,
    errors: [],
    warnings,

    tracker: {
      ...workingTracker,

      status:
        HAZARD_TRACKER_STATUS.EXPOSED,

      exposureRounds:
        nextExposureRounds,

      directExposureResolved:
        true
    },

    consequences: {
      directVacuumExposure: true,
      sealEffective: false,
      woundRollRequired: true,
      airLossBegins: true,
      exposureRounds:
        nextExposureRounds
    },

    handoffs: {
      ...handoffs,

      woundResolver:
        woundHandoff,

      personnelHazard: {
        hazardId: "air_loss",
        source: "vacuum",
        reason:
          "direct_vacuum_exposure"
      }
    }
  };
}

/**
 * Create a ship-side radiation tracker.
 */
export function createShipRadiationTracker({
  mode =
    SHIP_RADIATION_MODES.EXTERNAL,

  intensity = "hazardous",
  protectionRemaining = 60,
  protectionUnit = "minutes",
  affectedCompartments = [],
  metadata = {}
} = {}) {
  const intensityProfile =
    SHIP_RADIATION_HAZARD
      .intensity[intensity];

  if (!intensityProfile) {
    return failureResult([
      `Unknown ship radiation intensity: "${intensity}".`
    ]);
  }

  if (
    !Object.values(
      SHIP_RADIATION_MODES
    ).includes(mode)
  ) {
    return failureResult([
      `Unknown ship radiation mode: "${mode}".`
    ]);
  }

  const safeProtection =
    normalizeNonNegativeNumber(
      protectionRemaining,
      0
    );

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      type:
        HAZARD_TRACKER_TYPES
          .SHIP_RADIATION,

      hazardId:
        SHIP_RADIATION_HAZARD.id,

      mode,
      intensity,

      status:
        safeProtection > 0
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED,

      protection: {
        remaining:
          safeProtection,
        maximum:
          safeProtection,
        unit:
          protectionUnit
      },

      affectedCompartments: [
        ...affectedCompartments
      ],

      exposureIntervals: 0,
      failureBand: null,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance ship-side radiation protection.
 */
export function advanceShipRadiationTracker(
  tracker,
  {
    intervals = 1,
    intensity = null,
    customDrainRate = null,
    forcedFailureBand = null,
    leaveHazard = false
  } = {}
) {
  const validation = validateTracker(
    tracker,
    HAZARD_TRACKER_TYPES
      .SHIP_RADIATION
  );

  if (!validation.ok) {
    return validation;
  }

  if (leaveHazard) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...tracker,

        status:
          tracker.mode ===
            SHIP_RADIATION_MODES
              .INTERNAL
            ? HAZARD_TRACKER_STATUS.ACTIVE
            : HAZARD_TRACKER_STATUS.RESOLVED
      },

      consequences: {
        externalExposureEnded:
          tracker.mode ===
            SHIP_RADIATION_MODES
              .EXTERNAL,

        contaminationPersists:
          tracker.mode ===
            SHIP_RADIATION_MODES
              .INTERNAL
      },

      handoffs: emptyHandoffs()
    };
  }

  const resolvedIntensity =
    intensity ??
    tracker.intensity;

  const intensityProfile =
    SHIP_RADIATION_HAZARD
      .intensity[
        resolvedIntensity
      ];

  if (!intensityProfile) {
    return failureResult([
      `Unknown ship radiation intensity: "${resolvedIntensity}".`
    ]);
  }

  if (
    resolvedIntensity ===
      "catastrophic" &&
    customDrainRate === null
  ) {
    const failureBand =
      forcedFailureBand ??
      "broken";

    return buildShipRadiationFailureResult(
      {
        ...tracker,

        intensity:
          resolvedIntensity,

        protection: {
          ...tracker.protection,
          remaining: 0
        },

        status:
          HAZARD_TRACKER_STATUS.EXPOSED,

        failureBand
      },

      failureBand,
      true
    );
  }

  const drainRate =
    customDrainRate === null
      ? normalizeNonNegativeNumber(
          intensityProfile.drainRate,
          0
        )
      : normalizeNonNegativeNumber(
          customDrainRate,
          0
        );

  const safeIntervals =
    normalizeNonNegativeNumber(
      intervals,
      1
    );

  const previousRemaining =
    tracker.protection.remaining;

  const nextRemaining =
    depleteProtectionRemaining({
      remaining:
        previousRemaining,

      depletionRate:
        drainRate,

      intervals:
        safeIntervals
    });

  const loss =
    previousRemaining -
    nextRemaining;

  const percentageRemaining =
    tracker.protection.maximum > 0
      ? nextRemaining /
        tracker.protection.maximum
      : 0;

  const failureBand =
    forcedFailureBand ??
    deriveShipRadiationFailureBand(
      percentageRemaining,
      nextRemaining
    );

  const nextTracker = {
    ...tracker,

    intensity:
      resolvedIntensity,

    protection: {
      ...tracker.protection,
      remaining:
        nextRemaining
    },

    exposureIntervals:
      tracker.exposureIntervals +
      safeIntervals,

    failureBand,

    status:
      nextRemaining > 0
        ? HAZARD_TRACKER_STATUS.PROTECTED
        : HAZARD_TRACKER_STATUS.EXPOSED
  };

  if (!failureBand) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker:
        nextTracker,

      consequences: {
        protectionLost:
          loss,

        protectionRemaining:
          nextRemaining,

        failureBand:
          null,

        personnelExposureBegins:
          false
      },

      handoffs:
        emptyHandoffs()
    };
  }

  return buildShipRadiationFailureResult(
    nextTracker,
    failureBand,
    nextRemaining <= 0
  );
}

/**
 * Create a lightweight toxin exposure tracker.
 */
export function createToxinTracker({
  profile,
  protection = null,
  protectedBy = null,
  protectionEffective = null,
  protectionRemaining = null,
  protectionUnit = "rounds",
  metadata = {}
} = {}) {
  const validation =
    validateToxinProfile(profile);

  if (!validation.ok) {
    return validation;
  }

  const normalizedProtection =
    normalizeProtectionInput({
      protection,
      source: protectedBy,
      effective:
        protectionEffective,
      remaining:
        protectionRemaining,
      unit:
        protectionUnit,
      defaultExpirationRoute:
        "toxin_exposure"
    });

  return {
    ok: true,
    errors: [],
    warnings:
      validation.warnings,

    tracker: {
      type:
        HAZARD_TRACKER_TYPES.TOXIN,

      hazardId:
        profile.id,

      family:
        profile.family,

      severity:
        profile.severity,

      status:
        normalizedProtection?.effective
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED,

      exposureCount: 0,
      onsetReached: false,
      effectsActive: false,

      profile: {
        ...profile,

        exposureRoutes: [
          ...(profile.exposureRoutes ?? [])
        ],

        effects: [
          ...(profile.effects ?? [])
        ],

        treatment: [
          ...(profile.treatment ?? [])
        ]
      },

      protection:
        normalizedProtection,

      metadata: { ...metadata }
    }
  };
}

/**
 * Advance a lightweight toxin exposure tracker.
 */
export function advanceToxinTracker(
  tracker,
  {
    intervals = 1,
    protectionDepletionRate = null,
    onsetReached = null,
    exposureEnded = false,
    treatmentsApplied = []
  } = {}
) {
  const validation = validateTracker(
    tracker,
    HAZARD_TRACKER_TYPES.TOXIN
  );

  if (!validation.ok) {
    return validation;
  }

  const appliedTreatments =
    Array.isArray(treatmentsApplied)
      ? treatmentsApplied
      : [treatmentsApplied];

  const validTreatments =
    tracker.profile.treatment ?? [];

  const effectiveTreatment =
    appliedTreatments.find(
      (method) =>
        validTreatments.includes(method)
    ) ?? null;

  if (
    exposureEnded ||
    effectiveTreatment
  ) {
    return {
      ok: true,
      errors: [],
      warnings: [],

      tracker: {
        ...tracker,

        status:
          HAZARD_TRACKER_STATUS.RECOVERING,

        effectsActive:
          effectiveTreatment
            ? false
            : tracker.profile.duration
              === "persistent"
      },

      consequences: {
        exposureStopped:
          exposureEnded,

        treatmentApplied:
          effectiveTreatment,

        effectsRemoved:
          effectiveTreatment !== null,

        remainingDuration:
          effectiveTreatment
            ? null
            : tracker.profile.duration
      },

      handoffs: emptyHandoffs()
    };
  }

  let workingTracker = { ...tracker };

  const protectionResult =
    advanceOptionalProtection(
      workingTracker.protection,
      {
        intervals,
        depletionRate:
          protectionDepletionRate
      }
    );

  if (protectionResult.protection) {
    workingTracker = {
      ...workingTracker,

      protection:
        protectionResult.protection,

      status:
        protectionResult.effective
          ? HAZARD_TRACKER_STATUS.PROTECTED
          : HAZARD_TRACKER_STATUS.EXPOSED
    };

    if (protectionResult.effective) {
      return {
        ok: true,
        errors: [],
        warnings: [],

        tracker:
          workingTracker,

        consequences: {
          directExposure: false,
          protectionEffective: true,
          protectionRemaining:
            protectionResult.remaining
        },

        handoffs:
          emptyHandoffs()
      };
    }
  }

  const nextExposureCount =
    workingTracker.exposureCount
    + normalizeNonNegativeNumber(
        intervals,
        1
      );

  const resolvedOnset =
    onsetReached === null
      ? true
      : Boolean(onsetReached);

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker: {
      ...workingTracker,

      status:
        HAZARD_TRACKER_STATUS.ACTIVE,

      exposureCount:
        nextExposureCount,

      onsetReached:
        resolvedOnset,

      effectsActive:
        resolvedOnset
    },

    consequences: {
      directExposure: true,
      onsetReached:
        resolvedOnset,

      severity:
        workingTracker.profile.severity,

      effects:
        resolvedOnset
          ? workingTracker.profile.effects
          : [],

      duration:
        workingTracker.profile.duration,

      treatment:
        workingTracker.profile.treatment
    },

    handoffs:
      emptyHandoffs()
  };
}

/**
 * Validate a toxin profile against the runtime schema.
 */
export function validateToxinProfile(
  profile
) {
  const errors = [];
  const warnings = [];

  if (
    !profile ||
    typeof profile !== "object"
  ) {
    return failureResult([
      "A toxin profile object is required."
    ]);
  }

  for (
    const field of
    TOXIN_PROFILE_SCHEMA.requiredFields
  ) {
    if (
      profile[field] === undefined ||
      profile[field] === null
    ) {
      errors.push(
        `Toxin profile is missing required field "${field}".`
      );
    }
  }

  const families =
    Object.keys(
      TOXIN_PROFILE_SCHEMA.families ?? {}
    );

  if (
    profile.family &&
    !families.includes(profile.family)
  ) {
    errors.push(
      `Unknown toxin family: "${profile.family}".`
    );
  }

  if (
    profile.exposureRoutes &&
    !Array.isArray(profile.exposureRoutes)
  ) {
    errors.push(
      "exposureRoutes must be an array."
    );
  }

  if (
    profile.effects &&
    !Array.isArray(profile.effects)
  ) {
    errors.push(
      "effects must be an array."
    );
  }

  if (
    profile.treatment &&
    !Array.isArray(profile.treatment)
  ) {
    errors.push(
      "treatment must be an array."
    );
  }

  if (
    profile.family === "corrosive"
  ) {
    warnings.push(
      "Corrosive exposure may also require Armor / Suit or Seal / Life Support TAC."
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Return the next stage in a hazard track.
 */
export function getNextStage(
  stages,
  currentStageId
) {
  if (
    !Array.isArray(stages) ||
    stages.length === 0
  ) {
    return null;
  }

  const currentIndex =
    stages.findIndex(
      (stage) =>
        stage.id ===
        currentStageId
    );

  if (currentIndex < 0) {
    return stages[0];
  }

  return (
    stages[
      Math.min(
        currentIndex + 1,
        stages.length - 1
      )
    ]
  );
}

/**
 * Return the previous stage in a hazard track.
 */
export function getPreviousStage(
  stages,
  currentStageId
) {
  if (
    !Array.isArray(stages) ||
    stages.length === 0
  ) {
    return null;
  }

  const currentIndex =
    stages.findIndex(
      (stage) =>
        stage.id ===
        currentStageId
    );

  if (currentIndex <= 0) {
    return stages[0];
  }

  return stages[currentIndex - 1];
}

function buildStageAdvanceResult(
  tracker,
  stage,
  {
    forced = false,
    source = null
  } = {}
) {
  const effects =
    stage.effects ?? {};

  const ongoingDamage =
    effects.ongoingDamage ?? null;

  const fatalTimer =
    effects.fatalTimer ?? null;

  const conditionsAdded =
    effects.conditionsAdded ?? [];

  const unconscious =
    Array.isArray(conditionsAdded)
    && conditionsAdded.includes(
      "unconscious"
    );

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker,

    consequences: {
      stageAdvanced: true,
      forced,
      source,

      stage,
      effects,

      ongoingDamage,

      healthDamage:
        ongoingDamage?.amount ?? null,

      damageInterval:
        ongoingDamage?.interval ?? null,

      calmLoss:
        effects.calmLoss ?? null,

      conditionsAdded,

      unconscious,

      fatalTimer,

      death:
        effects.death === true
    },

    handoffs: {
      ...emptyHandoffs(),

      damageResolver:
        ongoingDamage
          ? {
              damage:
                ongoingDamage.amount,

              interval:
                ongoingDamage.interval,

              source,

              contributesToOverflow:
                true
            }
          : false,

      fatalTimer
    }
  };
}

function buildShipRadiationFailureResult(
  tracker,
  failureBand,
  personnelExposureBegins
) {
  const effects =
    SHIP_RADIATION_HAZARD
      .failureBands[
        failureBand
      ] ?? [];

  return {
    ok: true,
    errors: [],
    warnings: [],

    tracker,

    consequences: {
      failureBand,
      effects,
      protectionRemaining:
        tracker.protection.remaining,

      personnelExposureBegins
    },

    handoffs: {
      ...emptyHandoffs(),

      tacResolver: {
        categories:
          SHIP_RADIATION_HAZARD
            .tacRouting,

        severity:
          mapShipRadiationBandToTac(
            failureBand
          ),

        reason:
          "ship_radiation"
      },

      personnelHazard:
        personnelExposureBegins
          ? {
              hazardId:
                "personnel_radiation",

              affectedCompartments:
                tracker.affectedCompartments
            }
          : false
    }
  };
}

function deriveShipRadiationFailureBand(
  percentageRemaining,
  remaining
) {
  if (remaining <= 0) {
    return "broken";
  }

  if (percentageRemaining <= 0.25) {
    return "severe";
  }

  if (percentageRemaining <= 0.5) {
    return "moderate";
  }

  if (percentageRemaining <= 0.75) {
    return "minor";
  }

  return null;
}

function mapShipRadiationBandToTac(
  failureBand
) {
  const mapping = {
    minor: "minor",
    moderate: "moderate",
    severe: "severe",
    broken: "broken"
  };

  return mapping[failureBand] ?? null;
}

function getTimerRemaining(
  result
) {
  if (
    result &&
    typeof result === "object"
    && "remaining" in result
  ) {
    return normalizeNonNegativeNumber(
      result.remaining,
      0
    );
  }

  return normalizeNonNegativeNumber(
    result,
    0
  );
}

function depleteProtectionRemaining(
  options
) {
  return getTimerRemaining(
    depleteProtectionTimer(options)
  );
}

function normalizeProtectionInput({
  protection = null,
  source = null,
  effective = null,
  remaining = null,
  unit = "intervals",
  defaultRemaining = null,
  defaultExpirationRoute = null
} = {}) {
  if (
    protection &&
    typeof protection === "object"
  ) {
    const timer =
      protection.timer
      && typeof protection.timer === "object"
        ? {
            ...protection.timer,

            remaining:
              normalizeNonNegativeNumber(
                protection.timer.remaining,
                0
              ),

            depletionRate:
              normalizeNonNegativeNumber(
                protection.timer
                  .depletionRate,
                1
              )
          }
        : null;

    return {
      source:
        protection.source
        ?? source
        ?? null,

      effective:
        protection.effective !== false,

      failureType:
        protection.failureType ?? null,

      routeTo:
        protection.routeTo
        ?? defaultExpirationRoute,

      timer
    };
  }

  if (!source) {
    return null;
  }

  const hasExplicitTimer =
    remaining !== null
    || defaultRemaining !== null;

  const timerRemaining =
    remaining !== null
      ? remaining
      : defaultRemaining;

  return {
    source,

    effective:
      effective === null
        ? true
        : Boolean(effective),

    failureType: null,

    routeTo:
      defaultExpirationRoute,

    timer:
      hasExplicitTimer
        ? {
            remaining:
              normalizeNonNegativeNumber(
                timerRemaining,
                0
              ),

            maximum:
              normalizeNonNegativeNumber(
                timerRemaining,
                0
              ),

            unit,

            depletionRate: 1,

            expiresInto:
              defaultExpirationRoute
          }
        : null
  };
}

function advanceOptionalProtection(
  protection,
  {
    intervals = 1,
    depletionRate = null
  } = {}
) {
  if (!protection) {
    return {
      protection: null,
      effective: false,
      remaining: null,
      expiredThisInterval: false
    };
  }

  if (protection.effective === false) {
    return {
      protection: {
        ...protection
      },

      effective: false,

      remaining:
        protection.timer?.remaining
        ?? null,

      expiredThisInterval: false
    };
  }

  if (!protection.timer) {
    return {
      protection: {
        ...protection
      },

      effective: true,
      remaining: null,
      expiredThisInterval: false
    };
  }

  const timerResult =
    depleteProtectionTimer({
      remaining:
        protection.timer.remaining,

      depletionRate:
        depletionRate
        ?? protection.timer.depletionRate
        ?? 1,

      intervals
    });

  const nextRemaining =
    getTimerRemaining(timerResult);

  const expiredThisInterval =
    typeof timerResult === "object"
    && timerResult !== null
      ? timerResult.expiredThisInterval
        ?? (
          protection.timer.remaining > 0
          && nextRemaining === 0
        )
      : (
        protection.timer.remaining > 0
        && nextRemaining === 0
      );

  return {
    protection: {
      ...protection,

      effective:
        nextRemaining > 0
          ? true
          : false,

      timer: {
        ...protection.timer,
        remaining:
          nextRemaining
      }
    },

    effective:
      nextRemaining > 0,

    remaining:
      nextRemaining,

    expiredThisInterval
  };
}

function normalizeThermalTrackId(
  trackId
) {
  const normalized =
    String(trackId ?? "")
      .trim()
      .toLowerCase();

  if (
    normalized === "heat" ||
    normalized === "heat_exposure"
  ) {
    return "heat";
  }

  if (
    normalized === "cold" ||
    normalized === "cold_exposure"
  ) {
    return "cold";
  }

  return null;
}

function validateTracker(
  tracker,
  expectedType
) {
  if (
    !tracker ||
    typeof tracker !== "object"
  ) {
    return failureResult([
      "A valid tracker object is required."
    ]);
  }

  if (
    tracker.type !==
    expectedType
  ) {
    return failureResult([
      `Expected tracker type "${expectedType}", received "${tracker.type}".`
    ]);
  }

  return {
    ok: true,
    errors: [],
    warnings: []
  };
}

function normalizeNonNegativeNumber(
  value,
  fallback = 0
) {
  const numeric = Number(value);

  if (
    !Number.isFinite(numeric)
  ) {
    return fallback;
  }

  return Math.max(
    0,
    numeric
  );
}

function emptyHandoffs() {
  return {
    damageResolver: false,
    woundResolver: false,
    tacResolver: false,
    fatalTimer: false,
    personnelHazard: false
  };
}

function failureResult(
  errors,
  warnings = [],
  extra = {}
) {
  return {
    ok: false,

    errors:
      Array.isArray(errors)
        ? errors
        : [String(errors)],

    warnings,
    ...extra
  };
}