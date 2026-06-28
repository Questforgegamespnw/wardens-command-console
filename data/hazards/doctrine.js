/** Shared doctrine for environmental hazard resolution. */

export const HAZARD_NOTATION = Object.freeze({
  disadvantage: "[-]",
  doubleDisadvantage: "[-][-]",
});

export const PROTECTION_STATES = Object.freeze({
  none: "none",
  effective: "effective",
  degrading: "degrading",
  failed: "failed",
});

export const HAZARD_RESOLUTION_MODES = Object.freeze({
  direct: "direct",
  staged: "staged",
  woundTable: "wound_table",
  protectionOnly: "protection_only",
  system: "system",
});

export const ENVIRONMENTAL_HAZARD_DOCTRINE = Object.freeze({
  firstQuestion:
    "Is the target meaningfully protected from this effect?",

  meaningfulProtectionExamples: Object.freeze([
    "sealed_suit",
    "breathing_supply",
    "radiation_shielding",
    "thermal_regulation",
    "pressure_protection",
    "electrical_insulation",
    "vehicle_protection",
    "habitat_protection",
    "ship_hull_and_systems",
    "distance_or_physical_barrier",
  ]),

  protectionQuestions: Object.freeze([
    "does_the_protection_apply_to_this_hazard",
    "is_the_protection_functioning",
    "does_the_protection_have_a_timer_or_capacity",
    "has_the_protection_been_damaged_or_bypassed",
  ]),

  protectionStates: PROTECTION_STATES,

  resolutionModes: HAZARD_RESOLUTION_MODES,

  resolutionSequence: Object.freeze([
    "identify_hazard",
    "identify_exposure_source_and_intensity",
    "check_meaningful_protection",
    "determine_protection_state",
    "resolve_protection_timer_or_system",
    "resolve_exposure_if_protection_is_absent_or_fails",
    "apply_health_damage_and_overflow",
    "resolve_secondary_consequences",
    "check_whether_exposure_continues",
  ]),

  protectedResolution: Object.freeze({
    directBodilyExposureByDefault: false,

    possibleConsequences: Object.freeze([
      "deplete_protection",
      "damage_protection_system",
      "trigger_tac",
      "force_movement",
      "damage_equipment",
      "create_time_pressure",
    ]),
  }),

  unprotectedResolution: Object.freeze({
    useHazardProfile: true,

    possibleRoutes: Object.freeze([
      "direct_effects",
      "stage_progression",
      "wound_table",
      "air_loss",
      "fatal_timer",
      "death",
    ]),
  }),

  continuingExposure: Object.freeze({
    resolveAtProfileInterval: true,
    mayWorsenSaves: true,
    mayAdvanceStages: true,
    mayRepeatWoundResolution: true,
    mayIncreaseProtectionDepletion: true,
  }),

  leavingHazard: Object.freeze({
    stopsNewEnvironmentalExposureByDefault: true,
    stopsProtectionDepletionByDefault: true,

    doesNotAutomaticallyRemove: Object.freeze([
      "existing_wounds",
      "bleeding",
      "contamination",
      "embedded_toxins",
      "radiation_stage",
      "thermal_injury",
      "fatal_timer",
      "equipment_damage",
    ]),
  }),

  recovery: Object.freeze({
    restoringProtectionStopsNewExposureByDefault: true,
    restoringProtectionDoesNotEraseExistingEffects: true,
    hazardProfileDefinesTreatment: true,
  }),

  healthDamage: Object.freeze({
    contributesToOverflow: true,
  }),
});