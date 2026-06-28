/** Shared guidance for toxin and chemical exposure profiles. */

export const TOXIN_EXPOSURE_ROUTES = Object.freeze([
  "contact",
  "inhaled",
  "ingested",
  "injected",
  "ocular",
  "wound_contamination",
  "environmental",
]);

export const TOXIN_SEVERITIES = Object.freeze({
  light: Object.freeze({
    id: "light",
    description:
      "Minor exposure or low dose. Usually causes temporary impairment.",
  }),

  moderate: Object.freeze({
    id: "moderate",
    description:
      "Meaningful exposure. Causes persistent impairment until treated or cleared.",
  }),

  severe: Object.freeze({
    id: "severe",
    description:
      "Dangerous dose. May cause unconsciousness, organ damage, or ongoing deterioration.",
  }),

  deadly: Object.freeze({
    id: "deadly",
    description:
      "Overwhelming dose. Fatal timer, organ shutdown, or immediate death may result.",
  }),
});

export const TOXIN_EFFECT_FAMILIES = Object.freeze({
  irritant: Object.freeze({
    id: "irritant",
    label: "Irritant",

    commonRoutes: Object.freeze([
      "contact",
      "inhaled",
      "ocular",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "coughing",
        "eye_irritation",
        "next_action_disadvantage",
      ]),

      moderate: Object.freeze([
        "vision_actions_disadvantaged_until_treated",
        "physical_actions_disadvantaged_until_treated",
        "lose_one_major_action_next_turn",
      ]),

      severe: Object.freeze([
        "respiratory_distress",
        "body_save_or_unconscious",
        "air_loss_checks",
      ]),

      deadly: Object.freeze([
        "respiratory_arrest",
        "fatal_timer",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "remove_from_exposure",
      "flush_eyes_or_skin",
      "fresh_air",
      "respiratory_support",
    ]),
  }),

  sedative: Object.freeze({
    id: "sedative",
    label: "Sedative / Depressant",

    commonRoutes: Object.freeze([
      "ingested",
      "inhaled",
      "injected",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "intellect_reduced_by_5",
        "next_action_disadvantage",
        "drowsiness",
      ]),

      moderate: Object.freeze([
        "speed_reduced_by_5",
        "intellect_reduced_by_5",
        "body_saves_to_resist_unconsciousness",
      ]),

      severe: Object.freeze([
        "unconscious",
        "respiratory_depression",
        "air_loss_checks",
      ]),

      deadly: Object.freeze([
        "respiratory_arrest",
        "fatal_timer",
        "overdose",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "antidote",
      "stimulant_counteragent",
      "respiratory_support",
      "medical_monitoring",
      "evacuation",
    ]),
  }),

  neurotoxin: Object.freeze({
    id: "neurotoxin",
    label: "Neurotoxin",

    commonRoutes: Object.freeze([
      "contact",
      "inhaled",
      "ingested",
      "injected",
      "wound_contamination",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "tremors",
        "next_precision_action_disadvantage",
        "lose_reaction",
      ]),

      moderate: Object.freeze([
        "speed_reduced_by_5",
        "intellect_reduced_by_5",
        "motor_impairment",
      ]),

      severe: Object.freeze([
        "speed_reduced_by_10",
        "intellect_reduced_by_10",
        "body_save_or_unconscious",
        "seizure",
      ]),

      deadly: Object.freeze([
        "immobile",
        "unconscious",
        "respiratory_arrest",
        "fatal_timer",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "specific_antidote",
      "neural_stabilizer",
      "gene_treatment",
      "intensive_care",
      "life_support",
    ]),
  }),

  respiratory: Object.freeze({
    id: "respiratory",
    label: "Respiratory Toxin",

    commonRoutes: Object.freeze([
      "inhaled",
      "environmental",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "coughing",
        "lose_1d5_calm",
        "next_physical_action_disadvantage",
      ]),

      moderate: Object.freeze([
        "strength_reduced_by_5",
        "lose_one_major_action_next_turn",
        "air_loss_checks",
      ]),

      severe: Object.freeze([
        "lose_one_major_action_until_treated",
        "body_save_or_unconscious",
        "air_loss_checks",
      ]),

      deadly: Object.freeze([
        "respiratory_arrest",
        "unconscious",
        "fatal_timer",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "remove_from_exposure",
      "fresh_air",
      "oxygen",
      "antidote",
      "respiratory_support",
    ]),
  }),

  hemotoxin: Object.freeze({
    id: "hemotoxin",
    label: "Hemotoxin",

    commonRoutes: Object.freeze([
      "ingested",
      "injected",
      "wound_contamination",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "bleeding_plus_1",
        "weakness",
        "lose_1d5_calm",
      ]),

      moderate: Object.freeze([
        "bleeding_plus_2",
        "strength_reduced_by_5",
        "speed_reduced_by_5",
      ]),

      severe: Object.freeze([
        "bleeding_plus_4",
        "strength_reduced_by_10",
        "internal_bleeding",
      ]),

      deadly: Object.freeze([
        "bleeding_plus_6",
        "organ_failure",
        "fatal_timer",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "antidote",
      "clotting_agents",
      "blood_replacement",
      "gene_treatment",
      "intensive_care",
    ]),
  }),

  corrosive: Object.freeze({
    id: "corrosive",
    label: "Corrosive",

    commonRoutes: Object.freeze([
      "contact",
      "ingested",
      "ocular",
      "environmental",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "surface_burn",
        "next_affected_area_action_disadvantage",
      ]),

      moderate: Object.freeze([
        "ongoing_damage_until_decontaminated",
        "physical_actions_disadvantaged_until_treated",
        "equipment_degradation",
      ]),

      severe: Object.freeze([
        "ongoing_damage",
        "strength_or_speed_reduced_by_10",
        "suit_or_seal_damage",
      ]),

      deadly: Object.freeze([
        "catastrophic_tissue_damage",
        "fatal_timer",
        "death",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "immediate_decontamination",
      "flush_exposed_area",
      "neutralizing_agent",
      "surgical_debridement",
      "gene_treatment",
    ]),

    tacRouting: Object.freeze([
      "armor_suit",
      "seal_life_support",
    ]),
  }),

  hallucinogen: Object.freeze({
    id: "hallucinogen",
    label: "Hallucinogen / Psychoactive",

    commonRoutes: Object.freeze([
      "inhaled",
      "ingested",
      "injected",
      "contact",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "lose_1d5_calm",
        "next_intellect_action_disadvantage",
        "sensory_distortion",
      ]),

      moderate: Object.freeze([
        "intellect_reduced_by_5",
        "panic_check",
        "confusion",
      ]),

      severe: Object.freeze([
        "intellect_reduced_by_10",
        "panic_check",
        "unable_to_distinguish_threats",
      ]),

      deadly: Object.freeze([
        "catatonia",
        "unconscious",
        "permanent_psychological_injury_possible",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "remove_from_exposure",
      "sedation",
      "counteragent",
      "protected_observation",
      "neural_treatment",
    ]),
  }),

  biological: Object.freeze({
    id: "biological",
    label: "Biological Toxin",

    commonRoutes: Object.freeze([
      "contact",
      "inhaled",
      "ingested",
      "injected",
      "wound_contamination",
    ]),

    suggestedEffects: Object.freeze({
      light: Object.freeze([
        "fever",
        "fatigue",
        "physical_actions_disadvantaged",
      ]),

      moderate: Object.freeze([
        "strength_reduced_by_5",
        "speed_reduced_by_5",
        "ongoing_symptoms",
      ]),

      severe: Object.freeze([
        "ongoing_damage",
        "organ_injury",
        "unconsciousness_possible",
      ]),

      deadly: Object.freeze([
        "organ_failure",
        "fatal_timer",
        "contagious_exposure_possible",
      ]),
    }),

    typicalTreatment: Object.freeze([
      "antitoxin",
      "antibiotic_or_antiviral",
      "isolation",
      "gene_treatment",
      "intensive_care",
    ]),
  }),
});

export const TOXIN_DURATION_TYPES = Object.freeze([
  "next_action",
  "next_turn",
  "fixed_rounds",
  "fixed_minutes",
  "fixed_hours",
  "until_exposure_ends",
  "until_decontaminated",
  "until_antidote",
  "until_treated",
  "persistent",
]);

export const TOXIN_TREATMENT_METHODS = Object.freeze([
  "remove_from_exposure",
  "fresh_air",
  "skin_decontamination",
  "eye_irrigation",
  "induced_vomiting",
  "gastric_pumping",
  "activated_charcoal",
  "antidote",
  "counteragent",
  "respiratory_support",
  "blood_replacement",
  "surgical_debridement",
  "organ_support",
  "gene_treatment",
  "cryo_support",
  "intensive_care",
]);

export const TOXIN_PROFILE_SCHEMA = Object.freeze({
  requiredFields: Object.freeze([
    "id",
    "label",
    "family",
    "exposureRoutes",
    "severity",
    "effects",
    "duration",
    "treatment",
  ]),

  optionalFields: Object.freeze([
    "dose",
    "onset",
    "save",
    "interval",
    "antidote",
    "contagious",
    "equipmentEffects",
    "tacRouting",
    "recovery",
    "notes",
  ]),

  exposureRoutes: TOXIN_EXPOSURE_ROUTES,
  severities: TOXIN_SEVERITIES,
  families: TOXIN_EFFECT_FAMILIES,
  durationTypes: TOXIN_DURATION_TYPES,
  treatmentMethods: TOXIN_TREATMENT_METHODS,
});