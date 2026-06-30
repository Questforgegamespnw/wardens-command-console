/**
 * Warden Command Console
 * Canonical skill catalog and character-generation skill packages.
 *
 * Skills have fixed tiers. Selecting a skill more than once never upgrades it.
 * Duplicate fixed grants create a replacement selection from the same package.
 */

export const CHARACTER_SKILL_OPTIONS_VERSION = 1;

const T = "trained";
const E = "expert";

function skill(id, label, tier, branch) {
  return Object.freeze({
    id,
    label,
    tier,
    bonus: tier === E ? 15 : 10,
    branch,
  });
}

export const SKILL_DEFINITIONS = Object.freeze([
  // Martial
  skill("athletics", "Athletics", T, "martial"),
  skill("firearms", "Firearms", T, "martial"),
  skill("hand_to_hand_combat", "Hand-to-Hand Combat", T, "martial"),
  skill("less_lethal_riot_suppression", "Less-Lethal / Riot Suppression", T, "martial"),
  skill("military_conditioning", "Military Conditioning", T, "martial"),
  skill("military_training", "Military Training", T, "martial"),
  skill("stealth", "Stealth", T, "martial"),
  skill("zero_g", "Zero-G", T, "martial"),
  skill("explosives", "Explosives", E, "martial"),
  skill("gunnery", "Gunnery", E, "martial"),
  skill("heavy_weapons", "Heavy Weapons", E, "martial"),
  skill("powered_platform_training", "Powered Platform Training", E, "martial"),
  skill("specialized_weapons", "Specialized Weapons", E, "martial"),
  skill("tactics", "Tactics", E, "martial"),

  // Technical
  skill("computers", "Computers", T, "technical"),
  skill("mechanical_repair", "Mechanical Repair", T, "technical"),
  skill("electronics", "Electronics", T, "technical"),
  skill("industrial_equipment", "Industrial Equipment", T, "technical"),
  skill("engineering", "Engineering", T, "technical"),
  skill("jury_rigging", "Jury Rigging", T, "technical"),
  skill("hacking", "Hacking", E, "technical"),
  skill("cybernetics", "Cybernetics", E, "technical"),
  skill("robotics", "Robotics", E, "technical"),
  skill("ship_systems", "Ship Systems", E, "technical"),

  // Science
  skill("biology", "Biology", T, "science"),
  skill("chemistry", "Chemistry", T, "science"),
  skill("physics", "Physics", T, "science"),
  skill("geology", "Geology", T, "science"),
  skill("botany", "Botany", T, "science"),
  skill("zoology", "Zoology", T, "science"),
  skill("mathematics", "Mathematics", T, "science"),
  skill("genetics", "Genetics", E, "science"),
  skill("pathology", "Pathology", E, "medical"),
  skill("ecology", "Ecology", E, "science"),
  skill("asteroid_mining", "Asteroid Mining", E, "science"),
  skill("hydroponics", "Hydroponics", E, "science"),

  // Medical
  skill("field_medicine", "Field Medicine", T, "medical"),
  skill("diagnostics", "Diagnostics", T, "medical"),
  skill("psychology", "Psychology", E, "medical"),
  skill("surgery", "Surgery", E, "medical"),
  skill("pharmacology", "Pharmacology", E, "medical"),
  skill("epidemiology", "Epidemiology", E, "medical"),
  skill("xenomedicine", "Xenomedicine", E, "medical"),
  skill("medical_research", "Medical Research", E, "medical"),

  // Exploration
  skill("survival", "Survival", T, "exploration"),
  skill("scavenging", "Scavenging", T, "exploration"),
  skill("archaeology", "Archaeology", T, "exploration"),
  skill("survey", "Survey", T, "exploration"),
  skill("planetary_survey", "Planetary Survey", E, "exploration"),

  // Operations
  skill("piloting", "Piloting", T, "operations"),
  skill("astrogation", "Astrogation", T, "operations"),
  skill("communications", "Communications", T, "operations"),
  skill("command", "Command", E, "operations"),

  // Social / culture / esoteric
  skill("linguistics", "Linguistics", T, "social"),
  skill("rimwise", "Rimwise", T, "social"),
  skill("theology", "Theology", T, "social"),
  skill("art", "Art", T, "social"),
  skill("security_procedures", "Security Procedures", T, "social"),
  skill("mysticism", "Mysticism", E, "esoteric"),
  skill("xenoesotericism", "Xenoesotericism", E, "esoteric"),
  skill("sophontology", "Sophontology", E, "esoteric"),
]);

const skillMap = new Map(SKILL_DEFINITIONS.map((entry) => [entry.id, entry]));

export function getSkillDefinition(id) {
  return skillMap.get(id) ?? null;
}

export function listSkillDefinitions({ tier = null, branch = null } = {}) {
  return SKILL_DEFINITIONS.filter((entry) => (
    (!tier || entry.tier === tier) && (!branch || entry.branch === branch)
  ));
}

function group(id, label, count, skillIds) {
  return Object.freeze({ id, label, count, skillIds: Object.freeze([...skillIds]) });
}

function packageEntry({ fixedSkillIds = [], choiceGroups = [], replacementSkillIds = [] }) {
  return Object.freeze({
    fixedSkillIds: Object.freeze([...fixedSkillIds]),
    choiceGroups: Object.freeze(choiceGroups),
    replacementSkillIds: Object.freeze([...replacementSkillIds]),
  });
}

const union = (...lists) => [...new Set(lists.flat())];

/* Background packages ------------------------------------------------------ */

export const BACKGROUND_SKILL_PACKAGES = Object.freeze({
  military_service: packageEntry({
    fixedSkillIds: ["military_training", "firearms"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, [
      "athletics", "military_conditioning", "zero_g", "less_lethal_riot_suppression",
      "stealth", "field_medicine", "mechanical_repair", "tactics", "ship_systems",
    ])],
    replacementSkillIds: ["athletics", "military_conditioning", "zero_g", "less_lethal_riot_suppression", "stealth", "field_medicine", "mechanical_repair", "tactics", "ship_systems"],
  }),
  science_education: packageEntry({
    choiceGroups: [
      group("foundational", "Choose 2 foundational skills", 2, ["biology", "chemistry", "physics", "geology", "botany", "zoology", "mathematics", "survey", "computers"]),
      group("advanced", "Choose 1 advanced skill", 1, ["genetics", "ecology", "asteroid_mining", "hydroponics", "planetary_survey", "medical_research", "pathology", "robotics", "cybernetics", "xenomedicine"]),
    ],
    replacementSkillIds: ["biology", "chemistry", "physics", "geology", "botany", "zoology", "mathematics", "survey", "computers", "genetics", "ecology", "asteroid_mining", "hydroponics", "planetary_survey", "medical_research", "pathology", "robotics", "cybernetics", "xenomedicine"],
  }),
  medical_training: packageEntry({
    fixedSkillIds: ["field_medicine", "diagnostics"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["psychology", "surgery", "pathology", "pharmacology", "epidemiology", "xenomedicine", "medical_research", "zero_g"])],
    replacementSkillIds: ["psychology", "surgery", "pathology", "pharmacology", "epidemiology", "xenomedicine", "medical_research", "zero_g", "biology", "chemistry"],
  }),
  industrial_labor: packageEntry({
    fixedSkillIds: ["industrial_equipment", "athletics"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["mechanical_repair", "jury_rigging", "piloting", "scavenging", "zero_g", "survival", "asteroid_mining", "ship_systems"])],
    replacementSkillIds: ["mechanical_repair", "jury_rigging", "piloting", "scavenging", "zero_g", "survival", "asteroid_mining", "ship_systems", "electronics", "engineering"],
  }),
  ship_crew: packageEntry({
    fixedSkillIds: ["ship_systems", "zero_g"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["piloting", "astrogation", "mechanical_repair", "electronics", "computers", "communications", "field_medicine", "military_training"])],
    replacementSkillIds: ["piloting", "astrogation", "mechanical_repair", "electronics", "computers", "communications", "field_medicine", "military_training"],
  }),
  corporate_security: packageEntry({
    fixedSkillIds: ["less_lethal_riot_suppression", "security_procedures"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["firearms", "hand_to_hand_combat", "stealth", "field_medicine", "psychology", "tactics", "hacking"])],
    replacementSkillIds: ["firearms", "hand_to_hand_combat", "stealth", "field_medicine", "psychology", "tactics", "hacking", "communications", "computers"],
  }),
  frontier_colony: packageEntry({
    fixedSkillIds: ["survival", "jury_rigging"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["survey", "field_medicine", "mechanical_repair", "botany", "geology", "scavenging", "piloting", "rimwise", "planetary_survey"])],
    replacementSkillIds: ["survey", "field_medicine", "mechanical_repair", "botany", "geology", "scavenging", "piloting", "rimwise", "planetary_survey"],
  }),
  rimwise_underworld: packageEntry({
    fixedSkillIds: ["rimwise", "scavenging"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["stealth", "firearms", "hand_to_hand_combat", "jury_rigging", "piloting", "security_procedures", "psychology", "hacking"])],
    replacementSkillIds: ["stealth", "firearms", "hand_to_hand_combat", "jury_rigging", "piloting", "security_procedures", "psychology", "hacking"],
  }),
  academic_cultural: packageEntry({
    choiceGroups: [
      group("foundational", "Choose 2 foundational skills", 2, ["linguistics", "theology", "archaeology", "art", "mathematics", "computers", "communications"]),
      group("advanced", "Choose 1 advanced skill", 1, ["psychology", "mysticism", "sophontology", "xenoesotericism"]),
    ],
    replacementSkillIds: ["linguistics", "theology", "archaeology", "art", "mathematics", "computers", "communications", "psychology", "mysticism", "sophontology", "xenoesotericism"],
  }),

  android_corporate_service: packageEntry({
    fixedSkillIds: ["computers", "security_procedures"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["electronics", "psychology", "hacking", "cybernetics", "medical_research", "command"])],
    replacementSkillIds: ["electronics", "psychology", "hacking", "cybernetics", "medical_research", "command", "communications"],
  }),
  android_scientific_assistant: packageEntry({
    fixedSkillIds: ["computers", "survey"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["biology", "chemistry", "physics", "genetics", "pathology", "robotics", "cybernetics", "medical_research"])],
    replacementSkillIds: ["biology", "chemistry", "physics", "genetics", "pathology", "robotics", "cybernetics", "medical_research", "mathematics"],
  }),
  android_industrial_service: packageEntry({
    fixedSkillIds: ["industrial_equipment", "mechanical_repair"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["electronics", "jury_rigging", "engineering", "ship_systems", "asteroid_mining", "powered_platform_training", "robotics"])],
    replacementSkillIds: ["electronics", "jury_rigging", "engineering", "ship_systems", "asteroid_mining", "powered_platform_training", "robotics"],
  }),
  android_security_service: packageEntry({
    fixedSkillIds: ["military_training", "less_lethal_riot_suppression"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["firearms", "hand_to_hand_combat", "military_conditioning", "stealth", "security_procedures", "tactics", "heavy_weapons"])],
    replacementSkillIds: ["firearms", "hand_to_hand_combat", "military_conditioning", "stealth", "security_procedures", "tactics", "heavy_weapons"],
  }),
  android_shipboard_service: packageEntry({
    fixedSkillIds: ["ship_systems", "computers"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["zero_g", "electronics", "mechanical_repair", "astrogation", "piloting", "communications", "robotics"])],
    replacementSkillIds: ["zero_g", "electronics", "mechanical_repair", "astrogation", "piloting", "communications", "robotics"],
  }),
  android_free_unassigned: packageEntry({
    fixedSkillIds: ["rimwise", "scavenging"],
    choiceGroups: [group("additional", "Choose 1 additional skill", 1, ["stealth", "jury_rigging", "computers", "mechanical_repair", "security_procedures", "psychology", "hacking"])],
    replacementSkillIds: ["stealth", "jury_rigging", "computers", "mechanical_repair", "security_procedures", "psychology", "hacking"],
  }),
});

/* Career packages ---------------------------------------------------------- */

export const CAREER_SKILL_PACKAGES = Object.freeze({
  marine: packageEntry({
    fixedSkillIds: ["military_training"],
    choiceGroups: [
      group("trained", "Choose 1 Trained skill", 1, ["firearms", "athletics", "military_conditioning", "hand_to_hand_combat", "less_lethal_riot_suppression", "stealth", "zero_g", "field_medicine"]),
      group("expert", "Choose 1 Expert skill", 1, ["tactics", "specialized_weapons", "heavy_weapons", "explosives", "gunnery", "powered_platform_training"]),
    ],
    replacementSkillIds: ["firearms", "athletics", "military_conditioning", "hand_to_hand_combat", "less_lethal_riot_suppression", "stealth", "zero_g", "field_medicine", "tactics", "specialized_weapons", "heavy_weapons", "explosives", "gunnery", "powered_platform_training"],
  }),
  scientist: packageEntry({
    choiceGroups: [
      group("core", "Choose 1 core skill", 1, ["survey", "computers"]),
      group("trained", "Choose 1 Trained skill", 1, ["biology", "chemistry", "physics", "geology", "botany", "zoology", "mathematics", "archaeology"]),
      group("expert", "Choose 1 Expert skill", 1, ["genetics", "ecology", "hydroponics", "planetary_survey", "robotics", "cybernetics", "medical_research", "pathology", "xenomedicine"]),
    ],
    replacementSkillIds: ["survey", "computers", "biology", "chemistry", "physics", "geology", "botany", "zoology", "mathematics", "archaeology", "genetics", "ecology", "hydroponics", "planetary_survey", "robotics", "cybernetics", "medical_research", "pathology", "xenomedicine"],
  }),
  teamster: packageEntry({
    fixedSkillIds: ["industrial_equipment"],
    choiceGroups: [
      group("trained", "Choose 1 Trained skill", 1, ["mechanical_repair", "electronics", "engineering", "jury_rigging", "athletics", "piloting", "zero_g", "scavenging", "survival"]),
      group("expert", "Choose 1 Expert skill", 1, ["ship_systems", "asteroid_mining", "robotics", "powered_platform_training", "gunnery", "command"]),
    ],
    replacementSkillIds: ["mechanical_repair", "electronics", "engineering", "jury_rigging", "athletics", "piloting", "zero_g", "scavenging", "survival", "ship_systems", "asteroid_mining", "robotics", "powered_platform_training", "gunnery", "command"],
  }),
  medical: packageEntry({
    fixedSkillIds: ["field_medicine"],
    choiceGroups: [
      group("trained", "Choose 1 Trained skill", 1, ["diagnostics", "biology", "chemistry", "zero_g", "communications"]),
      group("expert", "Choose 1 Expert skill", 1, ["surgery", "pathology", "pharmacology", "epidemiology", "xenomedicine", "medical_research", "psychology", "cybernetics"]),
    ],
    replacementSkillIds: ["diagnostics", "biology", "chemistry", "zero_g", "communications", "surgery", "pathology", "pharmacology", "epidemiology", "xenomedicine", "medical_research", "psychology", "cybernetics"],
  }),
  security: packageEntry({
    fixedSkillIds: ["security_procedures"],
    choiceGroups: [
      group("trained", "Choose 1 Trained skill", 1, ["firearms", "hand_to_hand_combat", "less_lethal_riot_suppression", "stealth", "communications", "computers", "field_medicine"]),
      group("expert", "Choose 1 Expert skill", 1, ["tactics", "psychology", "hacking", "command", "specialized_weapons"]),
    ],
    replacementSkillIds: ["firearms", "hand_to_hand_combat", "less_lethal_riot_suppression", "stealth", "communications", "computers", "field_medicine", "tactics", "psychology", "hacking", "command", "specialized_weapons"],
  }),
  diplomat: packageEntry({
    fixedSkillIds: ["communications"],
    choiceGroups: [
      group("trained", "Choose 1 Trained skill", 1, ["linguistics", "rimwise", "theology", "art", "security_procedures", "computers", "archaeology"]),
      group("expert", "Choose 1 Expert skill", 1, ["psychology", "command", "mysticism", "sophontology", "xenoesotericism"]),
    ],
    replacementSkillIds: ["linguistics", "rimwise", "theology", "art", "security_procedures", "computers", "archaeology", "psychology", "command", "mysticism", "sophontology", "xenoesotericism"],
  }),
});

/* Specialty packages ------------------------------------------------------- */

const specialty = (defining, support) => packageEntry({
  choiceGroups: [
    group("defining", "Defining skill", 1, defining),
    group("support", "Choose 1 support skill", 1, support),
  ],
  replacementSkillIds: union(defining, support),
});

export const SPECIALTY_SKILL_PACKAGES = Object.freeze({
  heavy_weapons: specialty(["heavy_weapons"], ["firearms", "athletics", "military_conditioning", "tactics", "specialized_weapons", "gunnery"]),
  eva_assault: specialty(["zero_g"], ["athletics", "military_conditioning", "firearms", "stealth", "ship_systems", "tactics"]),
  recon_pathfinder: specialty(["stealth"], ["survey", "survival", "communications", "military_training", "tactics", "planetary_survey"]),
  military_pilot: specialty(["piloting"], ["astrogation", "zero_g", "communications", "gunnery", "ship_systems", "tactics"]),
  combat_medic: specialty(["field_medicine"], ["diagnostics", "zero_g", "military_training", "psychology", "pharmacology", "surgery"]),
  combat_engineer: specialty(["explosives"], ["engineering", "mechanical_repair", "electronics", "jury_rigging", "military_training", "ship_systems"]),

  analyst: specialty(["mathematics"], ["computers", "communications", "survey", "psychology", "hacking", "sophontology"]),
  researcher: specialty([], ["computers", "mathematics", "survey", "medical_research", "robotics", "cybernetics"]),
  field_technician: specialty(["survey"], ["survival", "electronics", "computers", "zero_g", "field_medicine", "planetary_survey"]),
  applied_scientist: specialty([], ["engineering", "computers", "diagnostics", "jury_rigging", "survey", "medical_research", "robotics", "cybernetics"]),

  boatswain: specialty(["ship_systems"], ["mechanical_repair", "electronics", "zero_g", "communications", "engineering", "command"]),
  heavy_operator: specialty(["industrial_equipment", "piloting"], ["athletics", "mechanical_repair", "zero_g", "gunnery", "powered_platform_training", "asteroid_mining"]),
  quartermaster: specialty(["computers", "communications"], ["mathematics", "rimwise", "security_procedures", "scavenging", "command", "hacking"]),
  foreman: specialty(["command"], ["industrial_equipment", "athletics", "military_conditioning", "communications", "psychology", "tactics"]),
  infrastructure_engineer: specialty(["engineering"], ["mechanical_repair", "electronics", "survey", "ship_systems", "robotics", "planetary_survey"]),
  extraction_specialist: specialty(["asteroid_mining"], ["industrial_equipment", "geology", "zero_g", "scavenging", "explosives", "powered_platform_training"]),

  trauma_surgeon: specialty(["surgery"], ["field_medicine", "diagnostics", "zero_g", "pharmacology", "psychology", "medical_research"]),
  general_physician: specialty(["diagnostics"], ["field_medicine", "biology", "chemistry", "psychology", "pharmacology", "epidemiology", "medical_research", "cybernetics"]),
  behavioral_health_specialist: specialty(["psychology"], ["diagnostics", "communications", "linguistics", "theology", "command", "pharmacology"]),
  hazardous_exposure_specialist: specialty(["epidemiology"], ["diagnostics", "field_medicine", "biology", "chemistry", "pharmacology", "ship_systems", "xenomedicine"]),
  medical_investigator: specialty(["pathology"], ["diagnostics", "biology", "psychology", "epidemiology", "medical_research", "xenomedicine", "cybernetics"]),

  facility_station_security: specialty(["security_procedures"], ["communications", "computers", "electronics", "less_lethal_riot_suppression", "hacking", "ship_systems", "command"]),
  asset_security: specialty(["military_training"], ["firearms", "athletics", "stealth", "field_medicine", "psychology", "tactics", "specialized_weapons"]),
  crisis_liaison: specialty(["communications"], ["security_procedures", "field_medicine", "less_lethal_riot_suppression", "psychology", "command", "tactics"]),
  investigator: specialty(["psychology"], ["security_procedures", "computers", "linguistics", "hacking", "pathology", "sophontology"]),
  customs_inspector: specialty(["security_procedures"], ["communications", "rimwise", "computers", "linguistics", "psychology", "hacking"]),
  counterintelligence: specialty(["psychology"], ["security_procedures", "communications", "stealth", "linguistics", "rimwise", "hacking", "tactics"]),

  ambassador_envoy: specialty(["communications"], ["linguistics", "theology", "art", "security_procedures", "psychology", "command", "sophontology"]),
  conflict_resolution_specialist: specialty(["psychology"], ["communications", "rimwise", "theology", "less_lethal_riot_suppression", "command", "sophontology"]),
  broker: specialty(["rimwise"], ["communications", "linguistics", "computers", "security_procedures", "psychology", "hacking"]),
  administrator: specialty(["command"], ["communications", "computers", "mathematics", "security_procedures", "psychology", "ship_systems"]),
  legal_representative: specialty(["security_procedures"], ["communications", "linguistics", "computers", "psychology", "command"]),
});

export const SCIENTIST_FOCUS_SKILL_MAP = Object.freeze({
  signals: ["communications", "computers"],
  systems: ["computers", "engineering"],
  networks: ["computers", "hacking"],
  behavior: ["psychology"],
  statistics: ["mathematics"],
  threat_modeling: ["mathematics", "tactics"],
  anomaly_analysis: ["physics", "mathematics"],
  intelligence: ["psychology", "communications"],
  robotics: ["robotics"],
  cybernetics: ["cybernetics"],
  synthetic_cognition: ["robotics", "psychology"],
  xenobiology: ["biology", "xenomedicine"],
  medicine: ["medical_research", "diagnostics"],
  materials: ["chemistry", "engineering"],
  artifact_studies: ["archaeology"],
  physics: ["physics"],
  astrophysics: ["physics", "astrogation"],
  planetary_survey: ["planetary_survey"],
  environmental_sampling: ["survey", "ecology"],
  remote_sensing: ["survey", "electronics"],
  archaeological_fieldwork: ["archaeology", "survey"],
  specimen_recovery: ["survey", "biology"],
  contamination_monitoring: ["survey", "chemistry"],
  drone_survey: ["survey", "robotics"],
  expedition_science: ["survey", "survival"],
  chemistry: ["chemistry"],
  genetics: ["genetics"],
  ecology: ["ecology"],
  materials_science: ["chemistry", "engineering"],
  microbiology: ["biology", "pathology"],
  environmental_science: ["ecology", "survey"],
  planetary_science: ["planetary_survey", "geology"],
  systems_science: ["engineering", "mathematics"],
});

export function getBackgroundSkillPackage(id) {
  return BACKGROUND_SKILL_PACKAGES[id] ?? null;
}

export function getCareerSkillPackage(id) {
  return CAREER_SKILL_PACKAGES[id] ?? null;
}

export function getSpecialtySkillPackage(id, { focusId = null } = {}) {
  const base = SPECIALTY_SKILL_PACKAGES[id] ?? null;
  if (!base) return null;

  if (!["researcher", "applied_scientist"].includes(id)) return base;

  const focusSkills = SCIENTIST_FOCUS_SKILL_MAP[focusId] ?? [];
  const defining = focusSkills.length ? focusSkills : ["computers", "survey", "mathematics"];
  const support = base.choiceGroups.find((entry) => entry.id === "support")?.skillIds ?? [];

  return packageEntry({
    choiceGroups: [
      group("defining", focusSkills.length ? "Choose a Focus skill" : "Choose a provisional defining skill", 1, defining),
      group("support", "Choose 1 support skill", 1, support),
    ],
    replacementSkillIds: union(defining, support),
  });
}
