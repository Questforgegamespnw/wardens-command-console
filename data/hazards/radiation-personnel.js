/** Staged radiation exposure for personnel. */

export const PERSONNEL_RADIATION_HAZARD =
  Object.freeze({
    id: "personnel_radiation",
    label: "Personnel Radiation",
    mode: "staged_exposure",

    protectionLayers: Object.freeze([
      "ship",
      "compartment",
      "personal_suit",
      "direct_exposure",
    ]),

    protection: Object.freeze({
      requiresEffectiveProtection: true,
      timerIsOptional: true,

      defaultDurationsByIntensity:
        Object.freeze({
          low: Object.freeze({
            remaining: 60,
            unit: "minutes",
          }),

          high: Object.freeze({
            remaining: 30,
            unit: "minutes",
          }),

          extreme: Object.freeze({
            remaining: 10,
            unit: "minutes",
          }),

          catastrophic: Object.freeze({
            remaining: 1,
            unit: "minutes",
          }),
        }),

      durationIsProfileDefined: true,

      protectionFailureRoutesTo:
        "direct_radiation_exposure",
    }),

    directExposure: Object.freeze({
      interval: "profile_defined",

      save: Object.freeze({
        type: "body",
        onSuccess: "hold_current_stage",
        onFailure: "advance_one_stage",
      }),

      extremeExposureMayBeginAtLaterStage:
        true,

      catastrophicExposureMayBypassOrdinaryProtection:
        true,
    }),

    stages: Object.freeze([
      Object.freeze({
        id: "protected",
        index: 0,
        label: "Protected",

        effects: Object.freeze({}),

        recovery:
          "Maintain or restore effective protection.",
      }),

      Object.freeze({
        id: "irradiated",
        index: 1,
        label: "Irradiated",

        effects: Object.freeze({
          calmLoss: "1d5",
          medicallyDetectable: true,
        }),

        treatment:
          "Decontamination, anti-radiation medication, and observation.",
      }),

      Object.freeze({
        id: "radiation_sickness",
        index: 2,
        label: "Radiation Sickness",

        effects: Object.freeze({
          disadvantage: Object.freeze({
            targets: Object.freeze([
              "physical_actions",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),

          symptoms: Object.freeze([
            "nausea",
            "fatigue",
            "skin_irritation",
          ]),
        }),

        treatment:
          "Medical care, fluids, anti-radiation treatment, and protected recovery.",
      }),

      Object.freeze({
        id: "tissue_degradation",
        index: 3,
        label: "Tissue Degradation",

        effects: Object.freeze({
          ongoingDamage: Object.freeze({
            amount: "1d5",
            interval: "exposure_interval",
          }),

          disadvantage: Object.freeze({
            targets: Object.freeze([
              "strength_actions",
              "body_saves",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),

          poorHealing: true,
        }),

        treatment:
          "Advanced medical care, clean isolation, and tissue or gene repair.",
      }),

      Object.freeze({
        id: "organ_failure",
        index: 4,
        label: "Organ Failure",

        effects: Object.freeze({
          ongoingDamage: Object.freeze({
            amount: "1d10",
            interval: "exposure_interval",
          }),

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "intervals",

            stoppedBy: Object.freeze([
              "intensive_medical_stabilization",
              "cryo_support",
              "organ_support",
            ]),
          }),
        }),

        treatment:
          "Medbay, organ support, cryogenic stabilization, gene repair, or equivalent intervention.",
      }),

      Object.freeze({
        id: "fatal",
        index: 5,
        label: "Fatal",

        effects: Object.freeze({
          death: true,
        }),

        treatment:
          "Extraordinary intervention only.",
      }),
    ]),

    recovery: Object.freeze({
      leavingRadiationStopsNewExternalExposure:
        true,

      contaminationMayContinueExposure:
        true,

      restoringProtectionStopsNewStageChecks:
        true,

      existingStageDoesNotAutomaticallyClear:
        true,

      stageRegressionRequiresTreatment:
        true,
    }),

    healthDamageContributesToOverflow: true,
  });

export function getRadiationStage(
  stageId,
) {
  return (
    PERSONNEL_RADIATION_HAZARD.stages.find(
      (stage) => stage.id === stageId,
    ) ?? null
  );
}