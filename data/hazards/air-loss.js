/** Air deprivation caused by vacuum, drowning, choking, smoke, or similar hazards. */

export const AIR_LOSS_HAZARD = Object.freeze({
  id: "air_loss",
  label: "Air Loss / Suffocation",
  mode: "repeating_save",

  sources: Object.freeze([
    "vacuum",
    "drowning",
    "smoke",
    "choking",
    "low_oxygen",
    "gas_displacement",
    "respiratory_paralysis",
  ]),

  save: Object.freeze({
    type: "body",

    progression: Object.freeze([
      Object.freeze({
        check: 1,
        disadvantageSteps: 0,
      }),

      Object.freeze({
        check: 2,
        disadvantageSteps: 1,
      }),

      Object.freeze({
        check: 3,
        disadvantageSteps: 2,
        appliesThereafter: true,
      }),
    ]),

    onSuccess: "continue_air_loss_sequence",

    onFailure: Object.freeze({
      conditionsAdded: Object.freeze([
        "unconscious",
      ]),

      fatalTimer: Object.freeze({
        duration: "1d5",
        unit: "rounds",

        stoppedBy: Object.freeze([
          "breathing_restored",
          "medical_stabilization",
        ]),
      }),
    }),
  }),

  defaultIntervals: Object.freeze({
    vacuum: "round",
    drowning: "round",
    choking: "round",
    dense_smoke: "round",
    respiratory_paralysis: "round",
    low_oxygen: "profile_defined",
    gas_displacement: "profile_defined",
    slow_atmospheric_depletion:
      "minute_or_profile_defined",
  }),

  breathingRestored: Object.freeze({
    stopFurtherChecks: true,
    stopActiveFatalTimer: true,

    unconsciousRecovery: Object.freeze({
      duration: "1d10",
      unit: "rounds",
      beginsWhen: "breathing_restored",
    }),

    existingWoundsRemain: true,
    asphyxiationWoundsRemain: true,
    stabilizationMayStillBeRequired: true,
  }),

  sourceRiders: Object.freeze({
    drowning: Object.freeze([
      "aspiration",
      "cold_exposure",
      "post_rescue_respiratory_injury",
    ]),

    smoke: Object.freeze([
      "toxic_exposure",
      "sight_impairment",
      "airway_burn",
    ]),

    choking: Object.freeze([
      "obstruction_must_be_removed",
      "cannot_speak",
      "airway_trauma",
    ]),

    low_oxygen: Object.freeze([
      "confusion",
      "poor_judgment",
      "motor_impairment",
    ]),
  }),
});

export function getAirLossDisadvantageSteps(
  checkNumber,
) {
  const numericCheck = Math.max(
    1,
    Math.floor(Number(checkNumber) || 1),
  );

  if (numericCheck === 1) {
    return 0;
  }

  if (numericCheck === 2) {
    return 1;
  }

  return 2;
}

export function getAirLossSaveProfile(
  checkNumber,
) {
  return Object.freeze({
    type: AIR_LOSS_HAZARD.save.type,

    disadvantage: Object.freeze({
      steps:
        getAirLossDisadvantageSteps(
          checkNumber,
        ),
    }),

    onSuccess:
      AIR_LOSS_HAZARD.save.onSuccess,

    onFailure:
      AIR_LOSS_HAZARD.save.onFailure,
  });
}