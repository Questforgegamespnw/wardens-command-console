/**
 * Warden Command Console
 * Character Builder option catalog.
 *
 * Responsibility:
 * - Defines selectable Origins, Backgrounds, Careers, Specialties,
 *   Scientist focus suggestions, and Agent overlay profiles.
 * - Exposes lookup, filtering, and display helpers for builder UI.
 *
 * This file does NOT apply mechanics, calculate derived values,
 * validate complete records, render HTML, or mutate character records.
 */

export const CHARACTER_BUILDER_OPTIONS_VERSION = 1;

export const BUILDER_OPTION_STATUSES = Object.freeze([
  "active",
  "draft",
  "deferred",
  "restricted",
]);

export const BUILDER_MECHANICS_STATUSES = Object.freeze([
  "locked",
  "provisional",
  "pending",
]);

export const BUILDER_APPROVAL_LEVELS = Object.freeze([
  "standard",
  "warden_review",
  "warden_required",
]);

export const BUILDER_VISIBILITY = Object.freeze([
  "public",
  "hidden_by_default",
  "warden_only",
]);

export const BUILD_MODES = Object.freeze([
  Object.freeze({
    id: "quick",
    label: "Quick Build",
    description:
      "Uses suggested packages and minimal ownership, debt, and legal detail.",
    status: "active",
  }),
  Object.freeze({
    id: "campaign",
    label: "Campaign Build",
    description:
      "Exposes full ownership, legality, debt, faction, and hidden-data controls.",
    status: "active",
  }),
]);

export const ANDROID_PROTOCOL_HOOKS = Object.freeze([
  Object.freeze({
    id: "fts_handshake",
    label: "FTS Handshake",
    description:
      "A compatible machine, suit, weapon, door, drone, ship system, medical rig, or corporate network recognizes and attempts to exchange data with the Android.",
    status: "active",
    approval: "standard",
    selectionMode: "origin_capability",
    possibleModes: Object.freeze([
      "voluntary",
      "automatic",
      "hostile",
      "corrupted",
      "outdated",
      "legally_mandatory",
      "spoofed",
      "partial",
    ]),
    possibleOutputs: Object.freeze([
      "identification",
      "authorization",
      "diagnostics",
      "biometric_data",
      "threat_analysis",
      "location_data",
      "damage_reports",
      "mission_logs",
      "ownership_claims",
      "command_conflicts",
      "hidden_corporate_metadata",
    ]),
    risks: Object.freeze([
      "unwanted_recognition",
      "tracking_ping",
      "legacy_permissions",
      "hostile_query",
      "dormant_directive",
      "ownership_record",
    ]),
    tags: Object.freeze(["android", "protocol_hook", "handshake", "diagnostics"]),
  }),

  Object.freeze({
    id: "trauma_response",
    label: "Trauma Response Protocol",
    description:
      "Crisis-response architecture for casualty recovery, triage, battlefield medicine, and high-risk extraction. Compatible systems may provide immediate biometric and threat data.",
    status: "active",
    approval: "warden_review",
    selectionMode: "optional_protocol",
    possibleOutputs: Object.freeze([
      "suit_biometrics",
      "injury_type",
      "time_since_trauma",
      "aid_rendered",
      "aid_withheld",
      "life_support_state",
      "ammunition_state",
      "motion_history",
      "environmental_readings",
      "cause_of_death_estimate",
      "triage_priority",
      "threat_analytics",
      "insurance_flags",
    ]),
    tags: Object.freeze([
      "android",
      "protocol_hook",
      "medical",
      "triage",
      "biometric_dump",
    ]),
  }),
]);



/* -------------------------------------------------------------------------- */
/* Structured Stat and Save Generation                                        */
/* -------------------------------------------------------------------------- */

export const CHARACTER_STAT_GENERATION = Object.freeze({
  baselineDice: 4,
  backgroundDice: 2,
  careerDice: 3,
  specialtyDice: 2,
  poolCap: 8,
  scoreCap: 60,
});

export const CHARACTER_SAVE_GENERATION = Object.freeze({
  baselineDice: 5,
  backgroundDice: 1,
  careerDice: 2,
  specialtyDice: 1,
  poolCap: 8,
  scoreCap: 60,
});

export const BACKGROUND_GENERATION_ELIGIBILITY = Object.freeze({
  military_service: Object.freeze({ stats: Object.freeze(["strength", "speed", "combat"]), saves: Object.freeze(["body", "fear"]) }),
  science_education: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "fear"]) }),
  medical_training: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "body"]) }),
  industrial_labor: Object.freeze({ stats: Object.freeze(["strength", "speed", "intellect"]), saves: Object.freeze(["body", "fear"]) }),
  ship_crew: Object.freeze({ stats: Object.freeze(["speed", "intellect", "strength"]), saves: Object.freeze(["fear", "body"]) }),
  corporate_security: Object.freeze({ stats: Object.freeze(["combat", "speed", "intellect"]), saves: Object.freeze(["fear", "body"]) }),
  frontier_colony: Object.freeze({ stats: Object.freeze(["strength", "speed", "intellect"]), saves: Object.freeze(["body", "fear"]) }),
  rimwise_underworld: Object.freeze({ stats: Object.freeze(["speed", "intellect", "combat"]), saves: Object.freeze(["fear", "sanity"]) }),
  academic_cultural: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "fear"]) }),
  android_corporate_service: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "fear"]) }),
  android_scientific_assistant: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "fear"]) }),
  android_industrial_service: Object.freeze({ stats: Object.freeze(["strength", "speed", "intellect"]), saves: Object.freeze(["body", "fear"]) }),
  android_security_service: Object.freeze({ stats: Object.freeze(["combat", "speed", "strength"]), saves: Object.freeze(["body", "fear"]) }),
  android_shipboard_service: Object.freeze({ stats: Object.freeze(["speed", "intellect", "strength"]), saves: Object.freeze(["fear", "body"]) }),
  android_free_unassigned: Object.freeze({ stats: Object.freeze(["speed", "intellect", "combat"]), saves: Object.freeze(["fear", "sanity"]) }),
});

export const CAREER_GENERATION_ELIGIBILITY = Object.freeze({
  marine: Object.freeze({ stats: Object.freeze(["strength", "speed", "combat"]), saves: Object.freeze(["body", "fear"]) }),
  scientist: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "fear"]) }),
  teamster: Object.freeze({ stats: Object.freeze(["strength", "speed", "intellect"]), saves: Object.freeze(["body", "fear"]) }),
  medical: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["sanity", "body"]) }),
  security: Object.freeze({ stats: Object.freeze(["combat", "speed", "intellect"]), saves: Object.freeze(["fear", "body"]) }),
  diplomat: Object.freeze({ stats: Object.freeze(["intellect", "speed", "strength"]), saves: Object.freeze(["fear", "sanity"]) }),
});

export const SPECIALTY_GENERATION_ELIGIBILITY = Object.freeze({
  heavy_weapons: Object.freeze({ stats: Object.freeze(["strength", "combat"]), saves: Object.freeze(["body", "fear"]) }),
  eva_assault: Object.freeze({ stats: Object.freeze(["strength", "speed"]), saves: Object.freeze(["body", "fear"]) }),
  recon_pathfinder: Object.freeze({ stats: Object.freeze(["speed", "intellect"]), saves: Object.freeze(["fear", "sanity"]) }),
  military_pilot: Object.freeze({ stats: Object.freeze(["speed", "intellect"]), saves: Object.freeze(["fear", "sanity"]) }),
  combat_medic: Object.freeze({ stats: Object.freeze(["speed", "intellect"]), saves: Object.freeze(["sanity", "body"]) }),
  combat_engineer: Object.freeze({ stats: Object.freeze(["strength", "intellect"]), saves: Object.freeze(["body", "fear"]) }),
  analyst: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "fear"]) }),
  researcher: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["sanity", "body"]) }),
  field_technician: Object.freeze({ stats: Object.freeze(["speed", "strength"]), saves: Object.freeze(["body", "fear"]) }),
  applied_scientist: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "fear"]) }),
  boatswain: Object.freeze({ stats: Object.freeze(["strength", "intellect"]), saves: Object.freeze(["body", "fear"]) }),
  heavy_operator: Object.freeze({ stats: Object.freeze(["speed", "strength"]), saves: Object.freeze(["fear", "body"]) }),
  quartermaster: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "fear"]) }),
  foreman: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["body", "fear"]) }),
  infrastructure_engineer: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["sanity", "body"]) }),
  extraction_specialist: Object.freeze({ stats: Object.freeze(["strength", "speed"]), saves: Object.freeze(["body", "fear"]) }),
  trauma_surgeon: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "body"]) }),
  general_physician: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["sanity", "body"]) }),
  behavioral_health_specialist: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "fear"]) }),
  hazardous_exposure_specialist: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["body", "sanity"]) }),
  medical_investigator: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "fear"]) }),
  facility_station_security: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["fear", "body"]) }),
  asset_security: Object.freeze({ stats: Object.freeze(["combat", "speed"]), saves: Object.freeze(["fear", "body"]) }),
  crisis_liaison: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["fear", "sanity"]) }),
  investigator: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["sanity", "fear"]) }),
  customs_inspector: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["fear", "sanity"]) }),
  counterintelligence: Object.freeze({ stats: Object.freeze(["intellect", "combat"]), saves: Object.freeze(["sanity", "fear"]) }),
  ambassador_envoy: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["fear", "sanity"]) }),
  conflict_resolution_specialist: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["fear", "sanity"]) }),
  broker: Object.freeze({ stats: Object.freeze(["intellect", "speed"]), saves: Object.freeze(["fear", "sanity"]) }),
  administrator: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["sanity", "body"]) }),
  legal_representative: Object.freeze({ stats: Object.freeze(["intellect", "strength"]), saves: Object.freeze(["sanity", "fear"]) }),
});

export function getBackgroundGenerationEligibility(id) {
  return BACKGROUND_GENERATION_ELIGIBILITY[id] ?? null;
}

export function getCareerGenerationEligibility(id) {
  return CAREER_GENERATION_ELIGIBILITY[id] ?? null;
}

export function getSpecialtyGenerationEligibility(id) {
  return SPECIALTY_GENERATION_ELIGIBILITY[id] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Origins                                                                    */
/* -------------------------------------------------------------------------- */

export const ORIGINS = Object.freeze([
  Object.freeze({
    id: "human",
    label: "Human",
    description:
      "A biological person using the standard treatment, bleeding, disease, poison, infection, Calm, and Wound rules.",
    status: "active",
    approval: "standard",
    visibility: "public",
    mechanics: Object.freeze({
      status: "provisional",
      bodyType: "biological",
      treatmentMode: "biological",
      standardBleeding: true,
      standardDisease: true,
      standardPoison: true,
      standardInfection: true,
      calmModel: "standard",
      woundModel: "standard",
    }),
    tags: Object.freeze([
      "human",
      "biological_person",
      "standard_treatment",
    ]),
  }),

  Object.freeze({
    id: "android",
    label: "Android",
    description:
      "A synthetic or artificial person whose body, repair needs, legal status, diagnostics, and protocol liabilities differ from the human baseline.",
    status: "active",
    approval: "standard",
    visibility: "public",
    mechanics: Object.freeze({
      status: "provisional",
      bodyType: "synthetic",
      treatmentMode: "repair",
      standardBleeding: false,
      standardDisease: false,
      standardPoison: false,
      standardInfection: false,
      biologicalExceptionAllowed: true,
      calmModel: "standard",
      fearSaveMode: "standard",
      panicNarrativeModel: "directive_conflict",
      woundModel: "synthetic",
    }),
    traits: Object.freeze([
      Object.freeze({
        id: "synthetic_body",
        label: "Synthetic Body",
        description:
          "Normally unaffected by biological disease, poison, bleeding, or infection unless an effect targets synthetic organisms or bio-synthetic tissue.",
      }),
      Object.freeze({
        id: "repair_instead_of_medicine",
        label: "Repair Instead of Medicine",
        description:
          "Normally repaired with Mechanical Repair, Electronics, Robotics, Cybernetics, and appropriate tools rather than ordinary Field Medicine.",
      }),
      Object.freeze({
        id: "diagnostic_exposure",
        label: "Diagnostic Exposure",
        description:
          "Synthetic scanners, locators, ownership systems, and security networks may identify, interrogate, track, or challenge the Android.",
      }),
      Object.freeze({
        id: "social_liability",
        label: "Social Liability",
        description:
          "Depending on jurisdiction, the Android may be distrusted, licensed, tracked, owned, inherited, restricted, or treated as property.",
      }),
      Object.freeze({
        id: "fear_difference",
        label: "Fear Difference",
        description:
          "Fear Saves remain normal, but panic may appear as directive conflict, memory fragmentation, shutdown impulse, loyalty failure, or self-preservation override.",
      }),
    ]),
    protocolHookIds: Object.freeze(["fts_handshake"]),
    tags: Object.freeze([
      "android",
      "synthetic",
      "artificial_person",
      "cybernetic",
      "repair_based_treatment",
      "protocol_hooks",
      "legal_liability",
    ]),
  }),
]);

/* -------------------------------------------------------------------------- */
/* Backgrounds                                                                */
/* -------------------------------------------------------------------------- */

export const BACKGROUNDS = Object.freeze([
  Object.freeze({
    id: "military_service",
    label: "Military Service",
    description:
      "Prior service shaped the character through doctrine, hierarchy, readiness, and exposure to dangerous operations.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["marine", "security", "teamster"]),
    suggestedSpecialtyIds: Object.freeze([
      "heavy_weapons",
      "eva_assault",
      "recon_pathfinder",
      "military_pilot",
      "combat_medic",
      "combat_engineer",
      "asset_security",
      "counterintelligence",
    ]),
    tags: Object.freeze(["military", "operations", "discipline"]),
  }),

  Object.freeze({
    id: "science_education",
    label: "Science Education",
    description:
      "Formal education or apprenticeship in analytical, experimental, or applied scientific practice.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["scientist", "medical", "teamster"]),
    suggestedSpecialtyIds: Object.freeze([
      "analyst",
      "researcher",
      "field_technician",
      "applied_scientist",
      "hazardous_exposure_specialist",
      "infrastructure_engineer",
    ]),
    tags: Object.freeze(["science", "education", "analysis"]),
  }),

  Object.freeze({
    id: "medical_training",
    label: "Medical Training",
    description:
      "Prior clinical, emergency, therapeutic, or diagnostic training.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["medical", "scientist", "security"]),
    suggestedSpecialtyIds: Object.freeze([
      "trauma_surgeon",
      "general_physician",
      "behavioral_health_specialist",
      "hazardous_exposure_specialist",
      "medical_investigator",
      "combat_medic",
    ]),
    tags: Object.freeze(["medical", "clinical", "care"]),
  }),

  Object.freeze({
    id: "industrial_labor",
    label: "Teamster / Industrial Labor",
    description:
      "A working background in industrial labor, maintenance, logistics, heavy machinery, or infrastructure.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["teamster", "marine", "security"]),
    suggestedSpecialtyIds: Object.freeze([
      "boatswain",
      "heavy_operator",
      "quartermaster",
      "foreman",
      "infrastructure_engineer",
      "extraction_specialist",
      "combat_engineer",
    ]),
    tags: Object.freeze(["industrial", "labor", "maintenance", "logistics"]),
  }),

  Object.freeze({
    id: "ship_crew",
    label: "Ship Crew",
    description:
      "Life aboard working vessels taught the character shipboard routines, confined-space operations, and practical crew culture.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["teamster", "marine", "security"]),
    suggestedSpecialtyIds: Object.freeze([
      "boatswain",
      "heavy_operator",
      "quartermaster",
      "eva_assault",
      "military_pilot",
      "facility_station_security",
    ]),
    tags: Object.freeze(["shipboard", "crew", "operations"]),
  }),

  Object.freeze({
    id: "corporate_security",
    label: "Corporate Security",
    description:
      "Prior service protecting corporate property, personnel, facilities, information, or access.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["security", "marine", "diplomat"]),
    suggestedSpecialtyIds: Object.freeze([
      "facility_station_security",
      "asset_security",
      "investigator",
      "customs_inspector",
      "counterintelligence",
      "legal_representative",
    ]),
    tags: Object.freeze(["corporate", "security", "procedure"]),
  }),

  Object.freeze({
    id: "frontier_colony",
    label: "Frontier / Colony",
    description:
      "The character was shaped by a remote settlement where practical competence, scarcity, and local responsibility mattered.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze([
      "teamster",
      "scientist",
      "medical",
      "security",
      "diplomat",
    ]),
    suggestedSpecialtyIds: Object.freeze([
      "field_technician",
      "general_physician",
      "infrastructure_engineer",
      "extraction_specialist",
      "administrator",
    ]),
    tags: Object.freeze(["frontier", "colony", "survival", "community"]),
  }),

  Object.freeze({
    id: "rimwise_underworld",
    label: "Rimwise / Underworld",
    description:
      "The character learned to survive through informal systems, criminal networks, favors, and practical street knowledge.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["security", "diplomat", "teamster"]),
    suggestedSpecialtyIds: Object.freeze([
      "broker",
      "investigator",
      "quartermaster",
      "asset_security",
      "extraction_specialist",
    ]),
    tags: Object.freeze(["rimwise", "underworld", "informal_networks"]),
  }),

  Object.freeze({
    id: "academic_cultural",
    label: "Academic / Cultural",
    description:
      "The character comes from an academic, historical, linguistic, institutional, or cultural tradition.",
    originIds: Object.freeze(["human", "android"]),
    status: "active",
    approval: "standard",
    mechanics: createPendingMechanics(),
    suggestedCareerIds: Object.freeze(["scientist", "diplomat", "medical"]),
    suggestedSpecialtyIds: Object.freeze([
      "researcher",
      "analyst",
      "ambassador_envoy",
      "conflict_resolution_specialist",
      "administrator",
      "behavioral_health_specialist",
    ]),
    tags: Object.freeze(["academic", "culture", "institutional"]),
  }),

  ...createAndroidBackgrounds(),
]);

/* -------------------------------------------------------------------------- */
/* Careers                                                                    */
/* -------------------------------------------------------------------------- */

export const CAREERS = Object.freeze([
  createCareer({
    id: "marine",
    label: "Marine",
    description:
      "People trained to organize, endure, and carry out dangerous operations under hostile conditions.",
    specialtyIds: [
      "heavy_weapons",
      "eva_assault",
      "recon_pathfinder",
      "military_pilot",
      "combat_medic",
      "combat_engineer",
    ],
    tags: ["military", "combat", "operations", "unit_cohesion"],
  }),

  createCareer({
    id: "scientist",
    label: "Scientist",
    description:
      "People who investigate, interpret, test, and apply specialized knowledge about the universe and its systems.",
    specialtyIds: [
      "analyst",
      "researcher",
      "field_technician",
      "applied_scientist",
    ],
    tags: ["science", "analysis", "research", "specialized_knowledge"],
  }),

  createCareer({
    id: "teamster",
    label: "Teamster",
    description:
      "People who operate, repair, move, and sustain the machinery civilization depends on.",
    specialtyIds: [
      "boatswain",
      "heavy_operator",
      "quartermaster",
      "foreman",
      "infrastructure_engineer",
      "extraction_specialist",
    ],
    tags: ["industrial", "machinery", "logistics", "infrastructure"],
  }),

  createCareer({
    id: "medical",
    label: "Medical",
    description:
      "People who preserve, restore, and manage biological or psychological function.",
    specialtyIds: [
      "trauma_surgeon",
      "general_physician",
      "behavioral_health_specialist",
      "hazardous_exposure_specialist",
      "medical_investigator",
    ],
    tags: ["medical", "treatment", "recovery", "diagnosis"],
  }),

  createCareer({
    id: "security",
    label: "Security",
    description:
      "People who control access, investigate threats, protect assets, and maintain order.",
    specialtyIds: [
      "facility_station_security",
      "asset_security",
      "crisis_liaison",
      "investigator",
      "customs_inspector",
      "counterintelligence",
    ],
    tags: ["security", "protection", "investigation", "containment"],
  }),

  createCareer({
    id: "diplomat",
    label: "Diplomat",
    description:
      "People who manage relationships, institutions, access, and negotiated outcomes.",
    specialtyIds: [
      "ambassador_envoy",
      "conflict_resolution_specialist",
      "broker",
      "administrator",
      "legal_representative",
    ],
    tags: ["diplomacy", "institutions", "negotiation", "access"],
  }),
]);

/* -------------------------------------------------------------------------- */
/* Focus Suggestions                                                          */
/* -------------------------------------------------------------------------- */

export const SCIENTIST_FOCUS_SUGGESTIONS = Object.freeze([
  ...createFocusGroup("analyst", [
    ["signals", "Signals", ["signals", "analysis"]],
    ["systems", "Systems", ["systems", "analysis"]],
    ["networks", "Networks", ["networks", "analysis"]],
    ["behavior", "Behavior", ["behavior", "analysis"]],
    ["statistics", "Statistics", ["statistics", "modeling"]],
    ["threat_modeling", "Threat Modeling", ["threats", "modeling"]],
    ["anomaly_analysis", "Anomaly Analysis", ["anomaly", "analysis"]],
    ["intelligence", "Intelligence", ["intelligence", "analysis"]],
  ]),

  ...createFocusGroup("researcher", [
    ["robotics", "Robotics", ["robotics"]],
    ["cybernetics", "Cybernetics", ["cybernetics"]],
    ["synthetic_cognition", "Synthetic Cognition", ["synthetics", "cognition"]],
    ["xenobiology", "Xenobiology", ["xenobiology"]],
    ["medicine", "Medicine", ["medical_research"]],
    ["materials", "Materials", ["materials_science"]],
    ["artifact_studies", "Artifact Studies", ["artifacts", "xeno"]],
    ["physics", "Physics", ["physics"]],
    ["astrophysics", "Astrophysics", ["astrophysics"]],
  ]),

  ...createFocusGroup("field_technician", [
    ["planetary_survey", "Planetary Survey", ["survey", "planetary"]],
    ["environmental_sampling", "Environmental Sampling", ["environmental", "sampling"]],
    ["remote_sensing", "Remote Sensing", ["sensors", "remote"]],
    ["specimen_recovery", "Specimen Recovery", ["specimens", "recovery"]],
    ["archaeological_fieldwork", "Archaeological Fieldwork", ["archaeology", "fieldwork"]],
    ["contamination_monitoring", "Contamination Monitoring", ["contamination", "monitoring"]],
    ["expedition_science", "Expedition Science", ["expedition", "fieldwork"]],
  ]),

  ...createFocusGroup("applied_scientist", [
    ["chemistry", "Chemistry", ["chemistry"]],
    ["genetics", "Genetics", ["genetics", "life_science"]],
    ["ecology", "Ecology", ["ecology", "environmental"]],
    ["materials_science", "Materials Science", ["materials_science"]],
    ["physics", "Physics", ["physics"]],
    ["microbiology", "Microbiology", ["microbiology", "life_science"]],
    ["environmental_science", "Environmental Science", ["environmental"]],
    ["planetary_science", "Planetary Science", ["planetary"]],
    ["robotics", "Robotics", ["robotics"]],
    ["cybernetics", "Cybernetics", ["cybernetics"]],
    ["systems_science", "Systems Science", ["systems_science"]],
  ]),
]);

/* -------------------------------------------------------------------------- */
/* Specialties                                                                */
/* -------------------------------------------------------------------------- */

export const SPECIALTIES = Object.freeze([
  // Marine
  createSpecialty({
    id: "heavy_weapons",
    label: "Heavy Weapons",
    description:
      "Crew-served weapons, anti-armor systems, suppression, emplacement work, and ammunition discipline.",
    primaryCareerIds: ["marine"],
    compatibleCareerIds: ["security", "teamster"],
    tags: ["combat", "heavy_weapons", "suppression"],
  }),
  createSpecialty({
    id: "eva_assault",
    label: "EVA Assault",
    description:
      "Hostile boarding, zero-gravity combat, hull approaches, breaching under vacuum, and tactical life-support discipline.",
    primaryCareerIds: ["marine"],
    compatibleCareerIds: ["security", "teamster"],
    tags: ["eva", "boarding", "combat", "hostile_environment"],
  }),
  createSpecialty({
    id: "recon_pathfinder",
    label: "Recon / Pathfinder",
    description:
      "Observation, route finding, concealment, forward positioning, target identification, and establishing safe approaches.",
    primaryCareerIds: ["marine"],
    compatibleCareerIds: ["security", "scientist", "teamster"],
    tags: ["recon", "pathfinding", "observation", "positioning"],
  }),
  createSpecialty({
    id: "military_pilot",
    label: "Military Pilot",
    description:
      "Insertion, extraction, pursuit, combat maneuver, evasive movement, and formation discipline under hostile conditions.",
    primaryCareerIds: ["marine"],
    compatibleCareerIds: ["teamster", "security"],
    tags: ["pilot", "military", "mobility", "vehicle_operations"],
  }),
  createSpecialty({
    id: "combat_medic",
    label: "Combat Medic",
    description:
      "Battlefield stabilization, casualty movement, and immediate care under fire without the full breadth of clinical medicine.",
    primaryCareerIds: ["marine"],
    compatibleCareerIds: ["medical", "security"],
    tags: ["medical", "stabilization", "combat_support"],
  }),
  createSpecialty({
    id: "combat_engineer",
    label: "Combat Engineer",
    description:
      "Tactical construction, demolition, breaching, fortification, obstacle clearance, and field expediency.",
    primaryCareerIds: ["marine"],
    compatibleCareerIds: ["teamster"],
    tags: ["engineering", "breaching", "demolition", "field_operations"],
  }),

  // Scientist
  createScientistSpecialty({
    id: "analyst",
    label: "Analyst",
    description:
      "Interprets incomplete data, patterns, systems, and evidence to reduce uncertainty and support decisions.",
    tags: ["analysis", "patterns", "decision_support"],
  }),
  createScientistSpecialty({
    id: "researcher",
    label: "Researcher",
    description:
      "Creates, tests, and advances new knowledge through experimentation, theory, and sustained investigation.",
    tags: ["research", "experimentation", "knowledge_generation"],
  }),
  createScientistSpecialty({
    id: "field_technician",
    label: "Field Technician",
    description:
      "Conducts scientific work in uncontrolled environments through sampling, instrumentation, evidence preservation, and rapid assessment.",
    compatibleCareerIds: ["teamster"],
    tags: ["fieldwork", "instruments", "sampling", "expedition"],
  }),
  createScientistSpecialty({
    id: "applied_scientist",
    label: "Applied Scientist",
    description:
      "Uses an established scientific discipline to solve immediate practical problems and reduce technical or medical risk.",
    compatibleCareerIds: ["teamster", "medical"],
    tags: ["applied_science", "problem_solving", "specialized_knowledge"],
  }),

  // Teamster
  createSpecialty({
    id: "boatswain",
    label: "Boatswain",
    description:
      "Shipboard maintenance, repair, inspection, crew work assignments, damage control, and practical vessel operations.",
    primaryCareerIds: ["teamster"],
    compatibleCareerIds: ["marine"],
    tags: ["shipboard", "maintenance", "damage_control", "crew_operations"],
  }),
  createSpecialty({
    id: "heavy_operator",
    label: "Heavy Operator",
    description:
      "Operates ships, vehicles, industrial machinery, cargo systems, and mobile platforms under difficult conditions.",
    primaryCareerIds: ["teamster"],
    compatibleCareerIds: ["marine", "security", "scientist"],
    optionalFocus: true,
    focusLabel: "Operational Focus",
    tags: ["pilot", "heavy_equipment", "vehicle_operations", "machinery"],
  }),
  createSpecialty({
    id: "quartermaster",
    label: "Quartermaster",
    description:
      "Supply, stores, cargo, procurement, inventory, rationing, equipment issue, and logistical planning.",
    primaryCareerIds: ["teamster"],
    compatibleCareerIds: ["marine", "security", "diplomat"],
    tags: ["logistics", "cargo", "procurement", "inventory"],
  }),
  createSpecialty({
    id: "foreman",
    label: "Foreman",
    description:
      "Organizes labor, allocates work, enforces safety, and keeps crews productive under pressure.",
    primaryCareerIds: ["teamster"],
    compatibleCareerIds: ["diplomat"],
    tags: ["labor", "supervision", "safety", "coordination"],
  }),
  createSpecialty({
    id: "infrastructure_engineer",
    label: "Infrastructure Engineer",
    description:
      "Designs, evaluates, repairs, and adapts large-scale built environments and settlement systems.",
    primaryCareerIds: ["teamster"],
    compatibleCareerIds: ["scientist"],
    tags: ["infrastructure", "engineering", "construction", "systems"],
  }),
  createSpecialty({
    id: "extraction_specialist",
    label: "Extraction Specialist",
    description:
      "Mining, drilling, cutting, rigging, excavation, salvage recovery, and hazardous industrial removal.",
    primaryCareerIds: ["teamster"],
    compatibleCareerIds: ["scientist", "marine"],
    tags: ["extraction", "mining", "salvage", "rigging", "excavation"],
  }),

  // Medical
  createSpecialty({
    id: "trauma_surgeon",
    label: "Trauma Surgeon",
    description:
      "Severe injury treatment, surgery, emergency stabilization, and catastrophic Wound management under time pressure.",
    primaryCareerIds: ["medical"],
    compatibleCareerIds: [],
    tags: ["surgery", "trauma", "emergency_care"],
  }),
  createSpecialty({
    id: "general_physician",
    label: "General Physician",
    description:
      "Broad treatment, preventive care, crew health, rehabilitation oversight, and long-term patient management.",
    primaryCareerIds: ["medical"],
    compatibleCareerIds: [],
    optionalFocus: true,
    focusLabel: "Practice Focus",
    tags: ["general_medicine", "preventive_care", "long_term_care"],
  }),
  createSpecialty({
    id: "behavioral_health_specialist",
    label: "Behavioral Health Specialist",
    description:
      "Psychology, therapy, trauma counseling, addiction treatment, cognitive rehabilitation, and crew mental health.",
    primaryCareerIds: ["medical"],
    compatibleCareerIds: ["diplomat", "security"],
    tags: ["psychology", "therapy", "calm", "recovery"],
  }),
  createSpecialty({
    id: "hazardous_exposure_specialist",
    label: "Hazardous Exposure Specialist",
    description:
      "Treats radiation, toxins, contamination, infectious exposure, burns, vacuum complications, and decompression injury.",
    primaryCareerIds: ["medical"],
    compatibleCareerIds: ["scientist", "teamster"],
    tags: ["radiation", "toxins", "contamination", "environmental_medicine"],
  }),
  createSpecialty({
    id: "medical_investigator",
    label: "Medical Investigator",
    description:
      "Diagnosis, pathology, cause-of-death analysis, outbreak tracing, and reconstruction of unusual medical events.",
    primaryCareerIds: ["medical"],
    compatibleCareerIds: ["scientist", "security"],
    optionalFocus: true,
    focusLabel: "Investigative Focus",
    tags: ["diagnostics", "forensics", "pathology", "epidemiology"],
  }),

  // Security
  createSpecialty({
    id: "facility_station_security",
    label: "Facility & Station Security",
    description:
      "Access control, patrol routes, lockdowns, alarms, evacuation paths, station traffic, and security infrastructure.",
    primaryCareerIds: ["security"],
    compatibleCareerIds: ["teamster"],
    tags: ["facility_security", "station_security", "access_control"],
  }),
  createSpecialty({
    id: "asset_security",
    label: "Asset Security",
    description:
      "Protects a person, small group, sensitive object, or mobile asset through route planning and threat management.",
    primaryCareerIds: ["security"],
    compatibleCareerIds: ["marine", "diplomat"],
    tags: ["close_protection", "vip", "asset_protection"],
  }),
  createSpecialty({
    id: "crisis_liaison",
    label: "Crisis Liaison",
    description:
      "Coordinates civilians, responders, command staff, medical teams, and security forces during an active incident.",
    primaryCareerIds: ["security"],
    compatibleCareerIds: ["diplomat", "medical"],
    tags: ["crisis_response", "coordination", "deescalation"],
  }),
  createSpecialty({
    id: "investigator",
    label: "Investigator",
    description:
      "Conducts interviews, reviews evidence, builds timelines, and reconstructs theft, fraud, violence, disappearance, or misconduct.",
    primaryCareerIds: ["security"],
    compatibleCareerIds: ["scientist", "medical", "diplomat"],
    tags: ["investigation", "evidence", "interviews", "forensics"],
  }),
  createSpecialty({
    id: "customs_inspector",
    label: "Customs Inspector",
    description:
      "Controls entry, cargo, manifests, restricted movement, quarantine rules, and contraband interdiction.",
    primaryCareerIds: ["security"],
    compatibleCareerIds: ["diplomat", "teamster"],
    tags: ["customs", "inspection", "contraband", "port_security"],
  }),
  createSpecialty({
    id: "counterintelligence",
    label: "Counterintelligence",
    description:
      "Detects infiltration, information leakage, compromised personnel, false identities, sabotage, and hostile intelligence activity.",
    primaryCareerIds: ["security"],
    compatibleCareerIds: ["diplomat"],
    tags: ["counterintelligence", "insider_threat", "information_security"],
  }),

  // Diplomat
  createSpecialty({
    id: "ambassador_envoy",
    label: "Ambassador / Envoy",
    description:
      "Formal representation, official contact, negotiated access, political legitimacy, ceremony, and protocol.",
    primaryCareerIds: ["diplomat"],
    compatibleCareerIds: [],
    tags: ["representation", "protocol", "formal_diplomacy"],
  }),
  createSpecialty({
    id: "conflict_resolution_specialist",
    label: "Conflict Resolution Specialist",
    description:
      "Mediates grievances, de-escalates faction conflict, supports ceasefires, and preserves damaged relationships.",
    primaryCareerIds: ["diplomat"],
    compatibleCareerIds: ["security", "medical"],
    tags: ["mediation", "deescalation", "conflict_resolution"],
  }),
  createSpecialty({
    id: "broker",
    label: "Broker",
    description:
      "Builds transactional relationships and arranges favors, procurement, trade, introductions, and informal agreements.",
    primaryCareerIds: ["diplomat"],
    compatibleCareerIds: ["teamster", "security"],
    tags: ["trade", "access", "favors", "procurement"],
  }),
  createSpecialty({
    id: "administrator",
    label: "Administrator",
    description:
      "Coordinates institutions, policy, procedure, permits, departments, and resource allocation.",
    primaryCareerIds: ["diplomat"],
    compatibleCareerIds: ["teamster", "security"],
    tags: ["administration", "policy", "bureaucracy", "governance"],
  }),
  createSpecialty({
    id: "legal_representative",
    label: "Legal Representative",
    description:
      "Advocacy, contracts, liability, jurisdiction, custody, ownership disputes, salvage claims, and formal legal exposure.",
    primaryCareerIds: ["diplomat"],
    compatibleCareerIds: ["security"],
    tags: ["law", "contracts", "liability", "ownership"],
  }),
]);

/* -------------------------------------------------------------------------- */
/* Agent Overlay                                                              */
/* -------------------------------------------------------------------------- */

export const AGENT_OVERLAY = Object.freeze({
  id: "agent",
  label: "Agent Overlay",
  description:
    "An advanced hidden overlay representing covert allegiance, secret objectives, and reveal-based play.",
  status: "restricted",
  approval: "warden_required",
  visibility: "hidden_by_default",
  revealBased: true,
  mechanics: Object.freeze({
    status: "provisional",
    publicCareerRemainsReal: true,
    usesHiddenWardenData: true,
    grantsSecretObjective: true,
    grantsCovertActions: true,
    usesCodewords: true,
  }),
  tags: Object.freeze(["agent", "covert", "hidden_overlay", "reveal"]),
});

export const AGENT_OVERLAY_PROFILES = Object.freeze([
  createAgentProfile({
    id: "wet_work",
    label: "Wet Work Specialist",
    description:
      "Deniable targeted violence, elimination, cleanup, evidence minimization, and constrained combat.",
    commonCoverCareerIds: ["marine", "security", "medical"],
    tags: ["assassination", "violence", "cleanup"],
  }),
  createAgentProfile({
    id: "acquisitions",
    label: "Acquisitions Specialist",
    description:
      "Obtains restricted people, objects, data, technology, samples, or access through covert retrieval and removal.",
    commonCoverCareerIds: ["teamster", "scientist", "security", "diplomat"],
    tags: ["retrieval", "theft", "procurement", "extraction"],
  }),
  createAgentProfile({
    id: "handler",
    label: "Handler",
    description:
      "Recruits, directs, protects, and controls assets while maintaining compartmentalization and cover stories.",
    commonCoverCareerIds: ["diplomat", "security", "scientist"],
    tags: ["assets", "recruitment", "direction", "compartmentalization"],
  }),
  createAgentProfile({
    id: "deep_cover",
    label: "Deep Cover",
    description:
      "Maintains a long-term false identity, embeds inside institutions, survives scrutiny, and earns operational trust.",
    commonCoverCareerIds: [
      "marine",
      "scientist",
      "teamster",
      "medical",
      "security",
      "diplomat",
    ],
    tags: ["infiltration", "false_identity", "long_term_cover"],
  }),
  createAgentProfile({
    id: "double_agent_sleeper",
    label: "Double Agent / Sleeper",
    description:
      "Represents conflicted, dormant, conditioned, concealed, or competing allegiance.",
    commonCoverCareerIds: [
      "marine",
      "scientist",
      "teamster",
      "medical",
      "security",
      "diplomat",
    ],
    modeChoices: ["double_agent", "sleeper"],
    tags: ["double_agent", "sleeper", "trigger", "conflicted_allegiance"],
  }),
]);

export const AGENT_OVERLAY_STATES = Object.freeze([
  Object.freeze({ id: "dormant", label: "Dormant" }),
  Object.freeze({ id: "active", label: "Active" }),
  Object.freeze({ id: "compromised", label: "Compromised" }),
  Object.freeze({ id: "revealed", label: "Revealed" }),
  Object.freeze({ id: "defected", label: "Defected" }),
  Object.freeze({ id: "burned", label: "Burned" }),
]);

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

export function getCharacterBuilderOptions() {
  return Object.freeze({
    version: CHARACTER_BUILDER_OPTIONS_VERSION,
    buildModes: BUILD_MODES,
    statGeneration: CHARACTER_STAT_GENERATION,
    saveGeneration: CHARACTER_SAVE_GENERATION,
    backgroundGenerationEligibility: BACKGROUND_GENERATION_ELIGIBILITY,
    careerGenerationEligibility: CAREER_GENERATION_ELIGIBILITY,
    specialtyGenerationEligibility: SPECIALTY_GENERATION_ELIGIBILITY,
    origins: ORIGINS,
    backgrounds: BACKGROUNDS,
    careers: CAREERS,
    specialties: SPECIALTIES,
    scientistFocusSuggestions: SCIENTIST_FOCUS_SUGGESTIONS,
    agentOverlay: AGENT_OVERLAY,
    agentOverlayProfiles: AGENT_OVERLAY_PROFILES,
    agentOverlayStates: AGENT_OVERLAY_STATES,
  });
}

export function listAndroidProtocolHooks({ includeInactive = false } = {}) {
  return ANDROID_PROTOCOL_HOOKS.filter((entry) =>
    includeInactive || entry.status === "active"
  );
}

export function getAndroidProtocolHook(id) {
  return getById(ANDROID_PROTOCOL_HOOKS, id);
}

export function listOrigins({ includeInactive = false } = {}) {
  return ORIGINS.filter((entry) => includeInactive || entry.status === "active");
}

export function getOrigin(id) {
  return getById(ORIGINS, id);
}

export function listBackgrounds({ originId = null, includeInactive = false } = {}) {
  return BACKGROUNDS.filter((entry) => {
    if (!includeInactive && entry.status !== "active") return false;
    if (!originId) return true;
    return entry.originIds.includes(originId);
  });
}

export function getBackground(id) {
  return getById(BACKGROUNDS, id);
}

export function listCareers({ includeRestricted = false, includeInactive = false } = {}) {
  return CAREERS.filter((entry) => {
    if (!includeInactive && entry.status !== "active") return false;
    if (!includeRestricted && entry.approval === "warden_required") return false;
    return true;
  });
}

export function getCareer(id) {
  return getById(CAREERS, id);
}

export function listSpecialties({
  careerId = null,
  includeCompatible = true,
  includeInactive = false,
  includeRestricted = false,
} = {}) {
  return SPECIALTIES.filter((entry) => {
    if (!includeInactive && entry.status !== "active") return false;
    if (!includeRestricted && entry.approval === "warden_required") return false;
    if (!careerId) return true;

    const primary = entry.primaryCareerIds.includes(careerId);
    const compatible =
      includeCompatible && entry.compatibleCareerIds.includes(careerId);

    return primary || compatible;
  });
}

export function getSpecialty(id) {
  return getById(SPECIALTIES, id);
}

export function listPrimarySpecialtiesForCareer(careerId) {
  const career = getCareer(careerId);
  if (!career) return [];

  return career.specialtyIds
    .map((id) => getSpecialty(id))
    .filter(Boolean);
}

export function listSuggestedFocuses(specialtyId) {
  return SCIENTIST_FOCUS_SUGGESTIONS.filter(
    (entry) => entry.specialtyId === specialtyId,
  );
}

export function getSuggestedFocus(id) {
  return getById(SCIENTIST_FOCUS_SUGGESTIONS, id);
}

export function listAgentOverlayProfiles() {
  return [...AGENT_OVERLAY_PROFILES];
}

export function getAgentOverlayProfile(id) {
  return getById(AGENT_OVERLAY_PROFILES, id);
}

export function getAgentOverlayState(id) {
  return getById(AGENT_OVERLAY_STATES, id);
}

export function formatSpecialtyDisplayLabel({
  specialtyId,
  focusLabel = "",
} = {}) {
  const specialty = getSpecialty(specialtyId);
  if (!specialty) return "Unknown Specialty";

  const normalizedFocus = String(focusLabel ?? "").trim();
  if (!normalizedFocus) return specialty.label;

  return `${specialty.label} — ${normalizedFocus}`;
}

export function isSpecialtyPrimaryForCareer(specialtyId, careerId) {
  const specialty = getSpecialty(specialtyId);
  return Boolean(specialty?.primaryCareerIds.includes(careerId));
}

export function isSpecialtyCompatibleWithCareer(specialtyId, careerId) {
  const specialty = getSpecialty(specialtyId);
  if (!specialty) return false;

  return (
    specialty.primaryCareerIds.includes(careerId)
    || specialty.compatibleCareerIds.includes(careerId)
  );
}

/* -------------------------------------------------------------------------- */
/* Factory Helpers                                                            */
/* -------------------------------------------------------------------------- */

function createPendingMechanics() {
  return Object.freeze({
    status: "pending",
    statAdjustments: Object.freeze([]),
    saveAdjustments: Object.freeze([]),
    grantedSkills: Object.freeze([]),
    skillChoices: Object.freeze([]),
    featureId: null,
    edgeId: null,
    limitId: null,
  });
}

function createCareer({ id, label, description, specialtyIds, tags }) {
  return Object.freeze({
    id,
    label,
    description,
    category: "standard",
    status: "active",
    approval: "standard",
    visibility: "public",
    specialtyIds: Object.freeze([...specialtyIds]),
    mechanics: createPendingMechanics(),
    tags: Object.freeze([...tags]),
  });
}

function createSpecialty({
  id,
  label,
  description,
  primaryCareerIds,
  compatibleCareerIds = [],
  optionalFocus = false,
  focusLabel = "Focus",
  tags = [],
}) {
  return Object.freeze({
    id,
    label,
    description,
    status: "active",
    approval: "standard",
    visibility: "public",
    primaryCareerIds: Object.freeze([...primaryCareerIds]),
    compatibleCareerIds: Object.freeze([...compatibleCareerIds]),
    mechanics: createPendingMechanics(),
    focus: optionalFocus
      ? Object.freeze({
          required: false,
          allowCustom: true,
          displayMode: "specialty_focus",
          label: focusLabel,
          suggestedFocusIds: Object.freeze([]),
        })
      : null,
    tags: Object.freeze([...tags]),
  });
}

function createScientistSpecialty({
  id,
  label,
  description,
  compatibleCareerIds = [],
  tags = [],
}) {
  return Object.freeze({
    id,
    label,
    description,
    status: "active",
    approval: "standard",
    visibility: "public",
    primaryCareerIds: Object.freeze(["scientist"]),
    compatibleCareerIds: Object.freeze([...compatibleCareerIds]),
    mechanics: createPendingMechanics(),
    focus: Object.freeze({
      required: true,
      allowCustom: true,
      displayMode: "specialty_focus",
      label: "Scientific Focus",
      suggestedFocusIds: Object.freeze(
        SCIENTIST_FOCUS_SUGGESTIONS
          .filter((entry) => entry.specialtyId === id)
          .map((entry) => entry.id),
      ),
    }),
    tags: Object.freeze([...tags]),
  });
}

function createFocusGroup(specialtyId, entries) {
  return entries.map(([id, label, tags]) =>
    Object.freeze({
      id: `${specialtyId}_${id}`,
      specialtyId,
      label,
      status: "active",
      allowCustomAlternative: true,
      tags: Object.freeze([...tags]),
    }),
  );
}

function createAgentProfile({
  id,
  label,
  description,
  commonCoverCareerIds,
  modeChoices = [],
  tags = [],
}) {
  return Object.freeze({
    id,
    label,
    description,
    status: "restricted",
    approval: "warden_required",
    visibility: "hidden_by_default",
    mechanics: createPendingMechanics(),
    commonCoverCareerIds: Object.freeze([...commonCoverCareerIds]),
    modeChoices: Object.freeze([...modeChoices]),
    tags: Object.freeze([...tags]),
  });
}

function createAndroidBackgrounds() {
  const backgrounds = [
    {
      id: "android_corporate_service",
      label: "Corporate Service Android",
      description:
        "Built or assigned for corporate facility work, administration, research support, security compliance, customer service, or station operations.",
      suggestedCareerIds: ["security", "diplomat", "teamster", "scientist"],
      suggestedSpecialtyIds: [
        "facility_station_security",
        "administrator",
        "analyst",
        "quartermaster",
      ],
      grantedSkills: [skillGrant("computers")],
      skillChoiceGroups: [
        skillChoice("service_system", "Choose one service-system skill.", [
          "security_procedures",
          "electronics",
        ]),
        skillChoice("corporate_specialty", "Choose one corporate-service specialty skill.", [
          "hacking",
          "diagnostics",
          "psychology",
          "command",
          "medical_research",
        ]),
      ],
      tags: ["android", "corporate", "service_history", "station_operations"],
    },
    {
      id: "android_scientific_assistant",
      label: "Scientific Assistant Android",
      description:
        "Built for lab assistance, analysis, cataloging, sample handling, research operations, or hazardous experimentation.",
      suggestedCareerIds: ["scientist", "medical", "teamster"],
      suggestedSpecialtyIds: [
        "analyst",
        "researcher",
        "field_technician",
        "applied_scientist",
        "hazardous_exposure_specialist",
      ],
      grantedSkills: [skillGrant("computers"), skillGrant("survey")],
      skillChoiceGroups: [
        skillChoice("scientific_specialty", "Choose one scientific specialty skill.", [
          "biology",
          "chemistry",
          "physics",
          "medical_research",
          "robotics",
          "genetics",
          "pathology",
        ]),
      ],
      suggestedProtocolHookIds: ["trauma_response"],
      tags: ["android", "science", "service_history", "laboratory"],
    },
    {
      id: "android_industrial_service",
      label: "Industrial Service Android",
      description:
        "Built for docks, mining, shipyards, cargo handling, hazardous maintenance, repair work, or heavy industrial support.",
      suggestedCareerIds: ["teamster", "marine"],
      suggestedSpecialtyIds: [
        "boatswain",
        "heavy_operator",
        "infrastructure_engineer",
        "extraction_specialist",
        "combat_engineer",
      ],
      grantedSkills: [
        skillGrant("industrial_equipment"),
        skillGrant("mechanical_repair"),
      ],
      skillChoiceGroups: [
        skillChoice("industrial_specialty", "Choose one industrial specialty skill.", [
          "electronics",
          "jury_rigging",
          "ship_systems",
          "asteroid_mining",
          "powered_platform_training",
          "robotics",
        ]),
      ],
      tags: ["android", "industrial", "service_history", "heavy_labor"],
    },
    {
      id: "android_security_service",
      label: "Security Android",
      description:
        "Built or assigned for facility defense, bodyguard work, crowd control, prison response, tactical support, or corporate enforcement.",
      suggestedCareerIds: ["security", "marine"],
      suggestedSpecialtyIds: [
        "facility_station_security",
        "asset_security",
        "counterintelligence",
        "heavy_weapons",
        "eva_assault",
      ],
      grantedSkills: [
        skillGrant("military_training"),
        skillGrant("less_lethal_riot_suppression"),
      ],
      skillChoiceGroups: [
        skillChoice("security_specialty", "Choose one security specialty skill.", [
          "firearms",
          "hand_to_hand_combat",
          "military_conditioning",
          "tactics",
          "stealth",
          "security_procedures",
        ]),
      ],
      suggestedProtocolHookIds: ["trauma_response"],
      tags: ["android", "security", "service_history", "enforcement"],
    },
    {
      id: "android_shipboard_service",
      label: "Shipboard Android",
      description:
        "Built for ship operations, crew support, diagnostics, navigation assistance, life-support monitoring, or emergency maintenance.",
      suggestedCareerIds: ["teamster", "security", "marine", "scientist"],
      suggestedSpecialtyIds: [
        "boatswain",
        "heavy_operator",
        "quartermaster",
        "facility_station_security",
        "military_pilot",
        "field_technician",
      ],
      grantedSkills: [skillGrant("ship_systems"), skillGrant("computers")],
      skillChoiceGroups: [
        skillChoice("shipboard_specialty", "Choose one shipboard specialty skill.", [
          "zero_g",
          "electronics",
          "mechanical_repair",
          "astrogation",
          "piloting",
          "diagnostics",
        ]),
      ],
      suggestedProtocolHookIds: ["trauma_response"],
      tags: ["android", "shipboard", "service_history", "crew_support"],
    },
    {
      id: "android_free_unassigned",
      label: "Free / Unassigned Android",
      description:
        "Escaped, abandoned, emancipated, unregistered, or otherwise separated from the purpose and owner that originally defined them.",
      suggestedCareerIds: ["teamster", "scientist", "security", "diplomat", "medical"],
      suggestedSpecialtyIds: [
        "broker",
        "heavy_operator",
        "extraction_specialist",
        "investigator",
        "analyst",
      ],
      grantedSkills: [skillGrant("rimwise"), skillGrant("scavenging")],
      skillChoiceGroups: [
        skillChoice("free_android_specialty", "Choose one survival or adaptation skill.", [
          "stealth",
          "hacking",
          "jury_rigging",
          "psychology",
          "computers",
          "mechanical_repair",
        ]),
      ],
      tags: ["android", "free", "unassigned", "service_history", "independent"],
    },
  ];

  return backgrounds.map((entry) =>
    Object.freeze({
      ...entry,
      originIds: Object.freeze(["android"]),
      status: "active",
      approval: "standard",
      mechanics: Object.freeze({
        status: "provisional",
        grantedSkills: Object.freeze(entry.grantedSkills),
        skillChoiceGroups: Object.freeze(entry.skillChoiceGroups),
      }),
      suggestedCareerIds: Object.freeze(entry.suggestedCareerIds),
      suggestedSpecialtyIds: Object.freeze(entry.suggestedSpecialtyIds),
      suggestedProtocolHookIds: Object.freeze(entry.suggestedProtocolHookIds ?? []),
      tags: Object.freeze(entry.tags),
    }),
  );
}

function skillGrant(skillId) {
  return Object.freeze({
    skillId,
    sourceType: "background",
    grantMode: "automatic",
  });
}

function skillChoice(id, label, skillIds) {
  return Object.freeze({
    id,
    label,
    choose: 1,
    skillIds: Object.freeze([...skillIds]),
  });
}

function getById(collection, id) {
  return collection.find((entry) => entry.id === id) ?? null;
}
