/** Heat, cold, and cryogenic exposure tracks. */

export const THERMAL_HAZARDS = Object.freeze({
  id: "thermal",
  label: "Thermal Exposure",
  mode: "staged_exposure",

  protection: Object.freeze({
    requiresEffectiveProtection: true,
    timerIsOptional: true,

    examples: Object.freeze([
      Object.freeze({
        type: "thermal_regulation",
        remaining: 30,
        unit: "minutes",
        expiresInto: "thermal_exposure",
      }),

      Object.freeze({
        type: "cryogenic_protection",
        remaining: 10,
        unit: "minutes",
        expiresInto: "cold_exposure",
      }),

      Object.freeze({
        type: "fireproofing",
        remaining: 3,
        unit: "rounds",
        expiresInto: "heat_exposure",
      }),
    ]),
  }),

  exposureIntervals: Object.freeze({
    mild: "hour_or_scene",
    serious: "10_minutes",
    extreme: "round_or_minute",

    directFlameOrWeapon:
      "use_fire_explosive_wound_table",

    cryogenicRound:
      "profile_defined_round_interval",
  }),

  heat: Object.freeze({
    id: "heat_exposure",
    label: "Heat Exposure",

    stages: Object.freeze([
      Object.freeze({
        id: "protected",
        index: 0,
        label: "Protected",
        effects: Object.freeze({}),
      }),

      Object.freeze({
        id: "heat_stress",
        index: 1,
        label: "Heat Stress",

        effects: Object.freeze({
          disadvantage: Object.freeze({
            targets: Object.freeze([
              "physical_actions",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),
        }),
      }),

      Object.freeze({
        id: "heat_exhaustion",
        index: 2,
        label: "Heat Exhaustion",

        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "speed",
            amount: -5,
            duration: "while_at_stage",
          }),

          disadvantage: Object.freeze({
            targets: Object.freeze([
              "body_saves",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),

          movementReduced: true,
        }),
      }),

      Object.freeze({
        id: "heat_stroke",
        index: 3,
        label: "Heat Stroke",

        effects: Object.freeze({
          conditionsAdded: Object.freeze([
            "confused",
          ]),

          bodySave: Object.freeze({
            required: true,

            onFailure: Object.freeze({
              conditionsAdded:
                Object.freeze([
                  "prone",
                ]),
            }),
          }),

          ongoingDamage: Object.freeze({
            amount: "1d10",
            interval: "exposure_interval",
          }),
        }),
      }),

      Object.freeze({
        id: "organ_failure",
        index: 4,
        label: "Organ Failure",

        effects: Object.freeze({
          conditionsAdded: Object.freeze([
            "unconscious",
          ]),

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "intervals",

            stoppedBy: Object.freeze([
              "intensive_medical_stabilization",
              "active_cooling",
            ]),
          }),
        }),
      }),

      Object.freeze({
        id: "fatal",
        index: 5,
        label: "Fatal",

        effects: Object.freeze({
          death: true,
        }),
      }),
    ]),
  }),

  cold: Object.freeze({
    id: "cold_exposure",
    label: "Cold Exposure",

    stages: Object.freeze([
      Object.freeze({
        id: "protected",
        index: 0,
        label: "Protected",
        effects: Object.freeze({}),
      }),

      Object.freeze({
        id: "cold_stress",
        index: 1,
        label: "Cold Stress",

        effects: Object.freeze({
          disadvantage: Object.freeze({
            targets: Object.freeze([
              "fine_manipulation_actions",
              "precision_actions",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),
        }),
      }),

      Object.freeze({
        id: "hypothermia",
        index: 2,
        label: "Hypothermia",

        effects: Object.freeze({
          attributeModifiers:
            Object.freeze([
              Object.freeze({
                attribute: "speed",
                amount: -5,
                duration: "while_at_stage",
              }),

              Object.freeze({
                attribute: "intellect",
                amount: -5,
                duration: "while_at_stage",
              }),
            ]),

          disadvantage: Object.freeze({
            targets: Object.freeze([
              "combat_actions",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),
        }),
      }),

      Object.freeze({
        id: "severe_hypothermia",
        index: 3,
        label: "Severe Hypothermia",

        effects: Object.freeze({
          movementReduced: true,

          disadvantage: Object.freeze({
            targets: Object.freeze([
              "body_saves",
            ]),
            steps: 1,
            duration: "while_at_stage",
          }),

          conditionsAdded: Object.freeze([
            "confused",
          ]),
        }),
      }),

      Object.freeze({
        id: "organ_impairment",
        index: 4,
        label: "Organ Impairment",

        effects: Object.freeze({
          conditionsAdded: Object.freeze([
            "unconscious",
          ]),

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "intervals",

            stoppedBy: Object.freeze([
              "intensive_medical_stabilization",
              "controlled_rewarming",
            ]),
          }),
        }),
      }),

      Object.freeze({
        id: "fatal",
        index: 5,
        label: "Fatal",

        effects: Object.freeze({
          death: true,
        }),
      }),
    ]),
  }),

  cryogenic: Object.freeze({
    id: "cryogenic_exposure",
    label: "Cryogenic Exposure",

    usesTrack: "cold",

    intervalGuidance: Object.freeze({
      controlled_cryo:
        "profile_defined",

      failed_cryo_system:
        "round_or_minute",

      direct_cryogenic_contact:
        "round",
    }),

    riders: Object.freeze([
      "rapid_stage_advancement",
      "brittle_tissue",
      "equipment_freezing",
      "seal_or_suit_damage",
      "thermal_shock_during_rewarming",
    ]),

    directContactMayRouteTo:
      "cold_or_specialized_wound_resolution",
  }),

  recovery: Object.freeze({
    returningToSafeTemperatureStopsProgression:
      true,

    restoringThermalProtectionStopsNewStageChecks:
      true,

    existingHighStageInjuriesRemain:
      true,

    highStageInjuriesRequireTreatment:
      true,

    rapidRewarmingMayCauseComplications:
      true,
  }),

  allHealthDamageContributesToOverflow: true,
});

export function getThermalStage(
  trackId,
  stageId,
) {
  const track = THERMAL_HAZARDS[trackId];

  return (
    track?.stages?.find(
      (stage) => stage.id === stageId,
    ) ?? null
  );
}