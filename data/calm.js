/**
 * Calm Runtime Data
 *
 * Source:
 * calm_for_mothership_adaptation.md
 *
 * This file contains declarative Calm rules and table data.
 * It should not roll dice, mutate character state, or resolve outcomes.
 */

export const CALM_SCHEMA_VERSION = 1;

export const CALM_RULES = Object.freeze({
  id: "calm",
  label: "Calm",
  schemaVersion: CALM_SCHEMA_VERSION,

  defaults: Object.freeze({
    startingCalm: 85,
    maximumCalm: 85,
    absoluteMaximumCalm: 85
  }),

  panicCheck: Object.freeze({
    die: "1d100",
    method: "roll_under",
    successComparison: "less_than_or_equal",

    success: Object.freeze({
      outcome: "no_panic",
      description: "No Panic Effect occurs."
    }),

    criticalSuccess: Object.freeze({
      outcome: "recover_calm",
      calmRecovery: "1d10",
      clampToMaximum: true,
      description:
        "Recover 1d10 Calm, up to the character's Maximum Calm."
    }),

    failure: Object.freeze({
      outcome: "panic_effect",
      tableLookup: "failed_roll",
      description:
        "Consult the Calm Panic Effects table using the failed d100 result."
    }),

    criticalFailure: Object.freeze({
      outcome: "panic_effect_and_calm_loss",
      tableLookup: "failed_roll",
      calmLoss: "1d10",
      description:
        "Suffer the Panic Effect and lose an additional 1d10 Calm."
    })
  }),

  stressConversion: Object.freeze({
    singleStress: Object.freeze({
      source: "1 Stress",
      calmLoss: "1d10"
    }),

    stressDie: Object.freeze({
      source: "1d10 Stress",
      calmLoss: "2d10"
    }),

    extremeStress: Object.freeze({
      source: "Heavy or extreme Stress",
      calmLoss: "warden_set"
    }),

    existingCharacterFormula: Object.freeze({
      expression: "85 - (stress * 3)",
      baseCalm: 85,
      calmPerStress: 3,
      clampMinimum: 0,
      clampMaximum: 85
    })
  }),

  resolveOptions: Object.freeze({
    activeMethod: null,

    methods: Object.freeze({
      tableShift: Object.freeze({
        id: "table_shift",
        label: "Shift Panic Table Result",
        status: "optional",
        description:
          "Add Resolve to the failed d100 result when higher table results are less severe."
      }),

      consequenceReduction: Object.freeze({
        id: "consequence_reduction",
        label: "Reduce or Delay Consequence",
        status: "optional",
        description:
          "Spend Resolve to reduce Calm loss, downgrade a Panic Effect, or delay it for one scene."
      })
    })
  })
});

export const CALM_LOSS_BANDS = Object.freeze([
  Object.freeze({
    id: "minor_shock",
    label: "Minor Shock",
    calmLoss: "1d5",
    severity: 1,
    examples: [
      "brief fear",
      "minor helplessness",
      "disturbing discovery",
      "near miss"
    ]
  }),

  Object.freeze({
    id: "standard_horror",
    label: "Standard Horror Beat",
    calmLoss: "1d10",
    severity: 2,
    examples: [
      "body trauma",
      "crew death",
      "failed Fear Save",
      "alien contact",
      "sustained danger"
    ]
  }),

  Object.freeze({
    id: "major_trauma",
    label: "Major Trauma",
    calmLoss: "2d10",
    severity: 3,
    examples: [
      "severe injury",
      "major betrayal",
      "shipboard disaster",
      "contamination",
      "prolonged isolation"
    ]
  }),

  Object.freeze({
    id: "catastrophic_realization",
    label: "Catastrophic Realization",
    calmLoss: "3d10",
    severity: 4,
    variable: true,
    minimumDice: 3,
    dieSize: 10,
    examples: [
      "reality-breaking revelation",
      "mass casualty event",
      "inescapable existential threat",
      "complete loss of safety"
    ]
  })
]);

export const CALM_RECOVERY_BANDS = Object.freeze([
  Object.freeze({
    id: "unsafe_breather",
    label: "Short Breather in Unsafe Conditions",
    calmRecovery: 1,
    safetyRequired: "unsafe_but_not_immediate",
    description:
      "A brief pause while danger remains nearby."
  }),

  Object.freeze({
    id: "semi_safe_rest",
    label: "Meaningful Rest in Semi-Safe Conditions",
    calmRecovery: "1d5",
    safetyRequired: "semi_safe",
    description:
      "Food, sleep, comfort, or connection with some remaining risk."
  }),

  Object.freeze({
    id: "safe_full_rest",
    label: "Full Rest in Safe Conditions",
    calmRecovery: "1d10",
    safetyRequired: "safe",
    description:
      "Meaningful rest without active danger."
  }),

  Object.freeze({
    id: "proper_downtime",
    label: "Proper Downtime",
    calmRecovery: "2d10",
    safetyRequired: "downtime",
    variable: true,
    minimumDice: 2,
    dieSize: 10,
    description:
      "Shore leave, therapy, sustained recovery, or comparable downtime."
  })
]);

export const CALM_RECOVERY_SOURCES = Object.freeze([
  "rest in safe conditions",
  "successful shore leave",
  "therapy",
  "good food and sleep",
  "successful mission resolution",
  "medical sedation",
  "religious or personal ritual",
  "crew bonding",
  "comfort facilities",
  "corporate wellness systems"
]);

export const CALM_LOSS_TRIGGERS = Object.freeze([
  "horror",
  "helplessness",
  "body trauma",
  "crew death",
  "contamination",
  "shipboard disaster",
  "major betrayal",
  "isolation",
  "alien contact",
  "failed Fear Save",
  "sustained exhaustion"
]);

export const CALM_CONDITION_RECOVERY_METHODS = Object.freeze([
  "leveling",
  "therapy",
  "downtime",
  "medical care",
  "significant character milestones",
  "Warden-approved recovery scenes"
]);

export const CALM_PANIC_EFFECTS = Object.freeze([
  Object.freeze({
    id: "heart_races",
    rollMin: 100,
    rollMax: 100,
    label: "Heart Races",
    category: "immediate",
    effect: "Lose 1 Calm.",
    calmLoss: 1
  }),

  Object.freeze({
    id: "moment_of_panic",
    rollMin: 97,
    rollMax: 99,
    label: "Moment of Panic",
    category: "immediate",
    effect: "Lose 1d5 Calm.",
    calmLoss: "1d5"
  }),

  Object.freeze({
    id: "overwhelmed",
    rollMin: 93,
    rollMax: 96,
    label: "Overwhelmed",
    category: "immediate",
    effect: "Lose 1d10 Calm.",
    calmLoss: "1d10"
  }),

  Object.freeze({
    id: "nervous_twitch",
    rollMin: 90,
    rollMax: 92,
    label: "Nervous Twitch",
    category: "group",
    effect:
      "Lose 1d10 Calm. The nearest crew member also loses 1d5 Calm.",
    calmLoss: "1d10",
    secondaryCalmLoss: "1d5",
    secondaryTarget: "nearest_crew_member"
  }),

  Object.freeze({
    id: "hallucinations",
    rollMin: 89,
    rollMax: 89,
    label: "Hallucinations",
    category: "temporary_condition",
    effect:
      "For the next 1d10 hours, determined secretly, you have trouble distinguishing reality from fantasy.",
    duration: "1d10 hours",
    secretDuration: true
  }),

  Object.freeze({
    id: "cowardice",
    rollMin: 88,
    rollMax: 88,
    label: "Cowardice",
    category: "session_condition",
    effect:
      "Lose 1d10 Calm. For the rest of the session, make a Fear Save to engage in combat.",
    calmLoss: "1d10",
    duration: "rest_of_session",
    requiredCheck: "Fear Save",
    trigger: "engage_in_combat"
  }),

  Object.freeze({
    id: "rattled",
    rollMin: 87,
    rollMax: 87,
    label: "Rattled",
    category: "session_condition",
    effect:
      "Disadvantage on all rolls for the rest of the session.",
    duration: "rest_of_session",
    rollModifier: "disadvantage",
    scope: "all_rolls"
  }),

  Object.freeze({
    id: "outburst",
    rollMin: 86,
    rollMax: 86,
    label: "Outburst",
    category: "group",
    effect:
      "Make a loud emotional outburst. Nearby crew members lose 1d10 Calm.",
    secondaryCalmLoss: "1d10",
    secondaryTarget: "nearby_crew"
  }),

  Object.freeze({
    id: "psychotic_break",
    rollMin: 85,
    rollMax: 85,
    label: "Psychotic Break",
    category: "forced_behavior",
    effect:
      "Attack the closest crew member until you deal at least 2d10 damage or 1 Hit. If no crew member is nearby, attack the environment.",
    forcedTarget: "closest_crew_member_or_environment",
    endCondition: "2d10_damage_or_1_hit"
  }),

  Object.freeze({
    id: "crippling_fear",
    rollMin: 84,
    rollMax: 84,
    label: "Crippling Fear",
    category: "long_term_condition",
    effect:
      "Gain a new Phobia. When encountered, make a Fear Save at Disadvantage or lose 1d10 Calm.",
    condition: "phobia",
    requiredCheck: "Fear Save",
    rollModifier: "disadvantage",
    failureCalmLoss: "1d10"
  }),

  Object.freeze({
    id: "mild_anxiety",
    rollMin: 83,
    rollMax: 83,
    label: "Mild Anxiety",
    category: "maximum_calm_loss",
    effect: "Maximum Calm decreases by 2.",
    maximumCalmChange: -2
  }),

  Object.freeze({
    id: "general_anxiety",
    rollMin: 82,
    rollMax: 82,
    label: "General Anxiety",
    category: "maximum_calm_loss",
    effect: "Maximum Calm decreases by 1d10.",
    maximumCalmChange: "-1d10"
  }),

  Object.freeze({
    id: "hypervigilance",
    rollMin: 81,
    rollMax: 81,
    label: "Hypervigilance",
    category: "long_term_condition",
    effect:
      "Gain Advantage on surprise rolls, but lose 1d10 Calm every day.",
    rollModifier: "advantage",
    scope: "surprise_rolls",
    recurringCalmLoss: "1d10",
    recurrence: "daily"
  }),

  Object.freeze({
    id: "escapism",
    rollMin: 80,
    rollMax: 80,
    label: "Escapism",
    category: "long_term_condition",
    effect:
      "Disadvantage on Body Saves made to prevent Addiction.",
    requiredCheck: "Body Save",
    rollModifier: "disadvantage",
    trigger: "prevent_addiction"
  }),

  Object.freeze({
    id: "social_anxiety",
    rollMin: 79,
    rollMax: 79,
    label: "Social Anxiety",
    category: "long_term_condition",
    effect:
      "Lose 1d10 Calm whenever you converse with someone new.",
    calmLoss: "1d10",
    trigger: "converse_with_new_person"
  }),

  Object.freeze({
    id: "emotional_detachment",
    rollMin: 78,
    rollMax: 78,
    label: "Emotional Detachment",
    category: "class_interaction",
    effect:
      "Lose half the normal Calm from all sources, rounded up, but also gain an additional class Panic Effect.",
    calmLossMultiplier: 0.5,
    rounding: "up",
    additionalPanicClass: Object.freeze({
      default: "android",
      android: "marine"
    })
  }),

  Object.freeze({
    id: "recurring_nightmares",
    rollMin: 77,
    rollMax: 77,
    label: "Recurring Nightmares",
    category: "long_term_condition",
    effect:
      "Whenever you rest, make a Fear Save. On failure, lose 1d10 Calm and do not heal.",
    requiredCheck: "Fear Save",
    trigger: "rest",
    failureCalmLoss: "1d10",
    failurePreventsHealing: true
  }),

  Object.freeze({
    id: "the_shakes",
    rollMin: 76,
    rollMax: 76,
    label: "The Shakes",
    category: "long_term_condition",
    effect:
      "Disadvantage on ranged attacks and tasks requiring fine motor skills.",
    rollModifier: "disadvantage",
    scope: [
      "ranged_attacks",
      "fine_motor_tasks"
    ]
  }),

  Object.freeze({
    id: "panicky",
    rollMin: 75,
    rollMax: 75,
    label: "Panicky",
    category: "save_restriction",
    effect:
      "Fear Saves must roll under Fear or Calm, whichever is lower.",
    affectedCheck: "Fear Save",
    targetRule: "lower_of_fear_or_calm"
  }),

  Object.freeze({
    id: "losing_your_grip",
    rollMin: 74,
    rollMax: 74,
    label: "Losing Your Grip",
    category: "save_restriction",
    effect:
      "Sanity Saves must roll under Sanity or Calm, whichever is lower.",
    affectedCheck: "Sanity Save",
    targetRule: "lower_of_sanity_or_calm"
  }),

  Object.freeze({
    id: "anhedonia",
    rollMin: 73,
    rollMax: 73,
    label: "Anhedonia",
    category: "recovery_penalty",
    effect:
      "Recover half as much Calm from all sources.",
    calmRecoveryMultiplier: 0.5,
    rounding: "unspecified"
  }),

  Object.freeze({
    id: "severe_anxiety",
    rollMin: 72,
    rollMax: 72,
    label: "Severe Anxiety",
    category: "loss_multiplier",
    effect:
      "Lose double Calm from all sources.",
    calmLossMultiplier: 2
  }),

  Object.freeze({
    id: "broken",
    rollMin: 71,
    rollMax: 71,
    label: "Broken",
    category: "panic_trigger",
    effect:
      "Make a Panic roll whenever a nearby crew member fails a Save.",
    trigger: "nearby_crew_member_fails_save"
  }),

  Object.freeze({
    id: "psychotic_episodes",
    rollMin: 70,
    rollMax: 70,
    label: "Psychotic Episodes",
    category: "warden_control",
    effect:
      "Once per session, the Warden may control the character for one round. The first episode occurs immediately.",
    usesPerSession: 1,
    duration: "1_round",
    immediateTrigger: true
  }),

  Object.freeze({
    id: "heart_attack",
    rollMin: 65,
    rollMax: 69,
    label: "Heart Attack",
    category: "fatal_timer",
    effect:
      "Death in 1d10 minutes without medical attention. Apply -1d10 to the Body Save.",
    fatalTimer: "1d10 minutes",
    requiredCheck: "Body Save",
    checkModifier: "-1d10",
    preventableWithMedicalAttention: true
  }),

  Object.freeze({
    id: "temporary_insanity",
    rollMin: 60,
    rollMax: 64,
    label: "Temporary Insanity",
    category: "warden_control",
    effect:
      "The character becomes insane until they sleep at least 6 hours and succeed on a Sanity Save.",
    minimumRest: "6 hours",
    recoveryCheck: "Sanity Save"
  }),

  Object.freeze({
    id: "severe_heart_attack",
    rollMin: 40,
    rollMax: 59,
    label: "Severe Heart Attack",
    category: "death",
    effect:
      "The character dies after taking one final action.",
    finalActionAllowed: true
  }),

  Object.freeze({
    id: "psychological_collapse",
    rollMin: 1,
    rollMax: 39,
    label: "Psychological Collapse",
    category: "character_loss",
    effect:
      "The character becomes permanently and irreparably insane and is controlled by the Warden. Nearby player characters immediately make Panic Checks.",
    permanent: true,
    characterControl: "warden",
    secondaryEffect: "nearby_player_characters_make_panic_checks"
  })
]);

/**
 * Returns the Panic Effect matching a d100 table result.
 *
 * This performs lookup only. It does not validate whether the roll was
 * actually a failed Panic Check.
 *
 * @param {number} roll
 * @returns {object|null}
 */
export function getCalmPanicEffect(roll) {
  const numericRoll = Number(roll);

  if (
    !Number.isInteger(numericRoll) ||
    numericRoll < 1 ||
    numericRoll > 100
  ) {
    return null;
  }

  return (
    CALM_PANIC_EFFECTS.find(
      (effect) =>
        numericRoll >= effect.rollMin &&
        numericRoll <= effect.rollMax
    ) ?? null
  );
}

/**
 * Returns a Calm loss guideline by id.
 *
 * @param {string} bandId
 * @returns {object|null}
 */
export function getCalmLossBand(bandId) {
  return (
    CALM_LOSS_BANDS.find(
      (band) => band.id === bandId
    ) ?? null
  );
}

/**
 * Returns a Calm recovery guideline by id.
 *
 * @param {string} bandId
 * @returns {object|null}
 */
export function getCalmRecoveryBand(bandId) {
  return (
    CALM_RECOVERY_BANDS.find(
      (band) => band.id === bandId
    ) ?? null
  );
}

/**
 * Converts legacy Stress into Calm using the homebrew conversion formula.
 *
 * This helper is deterministic data transformation, not a dice resolver.
 *
 * @param {number} stress
 * @returns {number|null}
 */
export function convertStressToCalm(stress) {
  const numericStress = Number(stress);

  if (
    !Number.isFinite(numericStress) ||
    numericStress < 0
  ) {
    return null;
  }

  const formula =
    CALM_RULES.stressConversion
      .existingCharacterFormula;

  const converted =
    formula.baseCalm -
    numericStress * formula.calmPerStress;

  return Math.min(
    formula.clampMaximum,
    Math.max(
      formula.clampMinimum,
      Math.round(converted)
    )
  );
}