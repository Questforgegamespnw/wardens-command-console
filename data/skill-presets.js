/**
 * Canonical skill selector data.
 *
 * Skill bonuses do not stack. Use the highest relevant skill bonus.
 * Doctrine pairings remain contextual and are not resolved here.
 */

function skill({
  id,
  label,
  branch,
  branchLabel,
  rank,
  bonus,
  sortOrder,
}) {
  return Object.freeze({
    id,
    label,
    branch,
    branchLabel,
    rank,
    bonus,
    sortOrder,
  });
}

export const SKILL_PRESETS = Object.freeze([
  // Martial Training — Trained
  skill({ id: "athletics", label: "Athletics", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "firearms", label: "Firearms", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),
  skill({ id: "hand_to_hand_combat", label: "Hand-to-Hand Combat", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 30 }),
  skill({ id: "less_lethal_riot_suppression", label: "Less-Lethal / Riot Suppression", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 40 }),
  skill({ id: "military_conditioning", label: "Military Conditioning", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 50 }),
  skill({ id: "military_training", label: "Military Training", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 60 }),
  skill({ id: "stealth", label: "Stealth", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 70 }),
  skill({ id: "zero_g", label: "Zero-G", branch: "martial_trained", branchLabel: "Martial Training — Trained +10", rank: "trained", bonus: 10, sortOrder: 80 }),

  // Martial Training — Expert
  skill({ id: "explosives", label: "Explosives", branch: "martial_expert", branchLabel: "Martial Training — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),
  skill({ id: "heavy_weapons", label: "Heavy Weapons", branch: "martial_expert", branchLabel: "Martial Training — Expert +15", rank: "expert", bonus: 15, sortOrder: 20 }),
  skill({ id: "powered_platform_training", label: "Powered Platform Training", branch: "martial_expert", branchLabel: "Martial Training — Expert +15", rank: "expert", bonus: 15, sortOrder: 30 }),
  skill({ id: "specialized_weapons", label: "Specialized Weapons", branch: "martial_expert", branchLabel: "Martial Training — Expert +15", rank: "expert", bonus: 15, sortOrder: 40 }),
  skill({ id: "tactics", label: "Tactics", branch: "martial_expert", branchLabel: "Martial Training — Expert +15", rank: "expert", bonus: 15, sortOrder: 50 }),

  // Technical — Trained
  skill({ id: "computers", label: "Computers", branch: "technical_trained", branchLabel: "Technical — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "mechanical_repair", label: "Mechanical Repair", branch: "technical_trained", branchLabel: "Technical — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),
  skill({ id: "electronics", label: "Electronics", branch: "technical_trained", branchLabel: "Technical — Trained +10", rank: "trained", bonus: 10, sortOrder: 30 }),
  skill({ id: "industrial_equipment", label: "Industrial Equipment", branch: "technical_trained", branchLabel: "Technical — Trained +10", rank: "trained", bonus: 10, sortOrder: 40 }),
  skill({ id: "engineering", label: "Engineering", branch: "technical_trained", branchLabel: "Technical — Trained +10", rank: "trained", bonus: 10, sortOrder: 50 }),
  skill({ id: "jury_rigging", label: "Jury Rigging", branch: "technical_trained", branchLabel: "Technical — Trained +10", rank: "trained", bonus: 10, sortOrder: 60 }),

  // Technical — Expert
  skill({ id: "hacking", label: "Hacking", branch: "technical_expert", branchLabel: "Technical — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),
  skill({ id: "cybernetics", label: "Cybernetics", branch: "technical_expert", branchLabel: "Technical — Expert +15", rank: "expert", bonus: 15, sortOrder: 20 }),
  skill({ id: "robotics", label: "Robotics", branch: "technical_expert", branchLabel: "Technical — Expert +15", rank: "expert", bonus: 15, sortOrder: 30 }),
  skill({ id: "ship_systems", label: "Ship Systems", branch: "technical_expert", branchLabel: "Technical — Expert +15", rank: "expert", bonus: 15, sortOrder: 40 }),

  // Science — Trained
  skill({ id: "biology", label: "Biology", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "chemistry", label: "Chemistry", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),
  skill({ id: "physics", label: "Physics", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 30 }),
  skill({ id: "geology", label: "Geology", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 40 }),
  skill({ id: "botany", label: "Botany", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 50 }),
  skill({ id: "zoology", label: "Zoology", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 60 }),
  skill({ id: "mathematics", label: "Mathematics", branch: "science_trained", branchLabel: "Science — Trained +10", rank: "trained", bonus: 10, sortOrder: 70 }),

  // Science — Expert
  skill({ id: "genetics", label: "Genetics", branch: "science_expert", branchLabel: "Science — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),
  skill({ id: "ecology", label: "Ecology", branch: "science_expert", branchLabel: "Science — Expert +15", rank: "expert", bonus: 15, sortOrder: 20 }),
  skill({ id: "asteroid_mining", label: "Asteroid Mining", branch: "science_expert", branchLabel: "Science — Expert +15", rank: "expert", bonus: 15, sortOrder: 30 }),
  skill({ id: "hydroponics", label: "Hydroponics", branch: "science_expert", branchLabel: "Science — Expert +15", rank: "expert", bonus: 15, sortOrder: 40 }),

  // Medical — Trained
  skill({ id: "field_medicine", label: "Field Medicine", branch: "medical_trained", branchLabel: "Medical — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "diagnostics", label: "Diagnostics", branch: "medical_trained", branchLabel: "Medical — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),

  // Medical — Expert
  skill({ id: "surgery", label: "Surgery", branch: "medical_expert", branchLabel: "Medical — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),
  skill({ id: "pathology", label: "Pathology", branch: "medical_expert", branchLabel: "Medical — Expert +15", rank: "expert", bonus: 15, sortOrder: 20 }),
  skill({ id: "pharmacology", label: "Pharmacology", branch: "medical_expert", branchLabel: "Medical — Expert +15", rank: "expert", bonus: 15, sortOrder: 30 }),
  skill({ id: "epidemiology", label: "Epidemiology", branch: "medical_expert", branchLabel: "Medical — Expert +15", rank: "expert", bonus: 15, sortOrder: 40 }),
  skill({ id: "xenomedicine", label: "Xenomedicine", branch: "medical_expert", branchLabel: "Medical — Expert +15", rank: "expert", bonus: 15, sortOrder: 50 }),
  skill({ id: "medical_research", label: "Medical Research", branch: "medical_expert", branchLabel: "Medical — Expert +15", rank: "expert", bonus: 15, sortOrder: 60 }),

  // Exploration / Field — Trained
  skill({ id: "survival", label: "Survival", branch: "exploration_trained", branchLabel: "Exploration / Field — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "scavenging", label: "Scavenging", branch: "exploration_trained", branchLabel: "Exploration / Field — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),
  skill({ id: "archaeology", label: "Archaeology", branch: "exploration_trained", branchLabel: "Exploration / Field — Trained +10", rank: "trained", bonus: 10, sortOrder: 30 }),
  skill({ id: "survey", label: "Survey", branch: "exploration_trained", branchLabel: "Exploration / Field — Trained +10", rank: "trained", bonus: 10, sortOrder: 40 }),

  // Exploration / Field — Expert
  skill({ id: "planetary_survey", label: "Planetary Survey", branch: "exploration_expert", branchLabel: "Exploration / Field — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),

  // Social / Culture — Trained
  skill({ id: "linguistics", label: "Linguistics", branch: "social_trained", branchLabel: "Social / Culture — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "rimwise", label: "Rimwise", branch: "social_trained", branchLabel: "Social / Culture — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),
  skill({ id: "theology", label: "Theology", branch: "social_trained", branchLabel: "Social / Culture — Trained +10", rank: "trained", bonus: 10, sortOrder: 30 }),
  skill({ id: "art", label: "Art", branch: "social_trained", branchLabel: "Social / Culture — Trained +10", rank: "trained", bonus: 10, sortOrder: 40 }),
  skill({ id: "security_procedures", label: "Security Procedures", branch: "social_trained", branchLabel: "Social / Culture — Trained +10", rank: "trained", bonus: 10, sortOrder: 50 }),

  // Social / Culture — Expert
  skill({ id: "psychology", label: "Psychology", branch: "social_expert", branchLabel: "Social / Culture — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),

  // Operations — Trained
  skill({ id: "piloting", label: "Piloting", branch: "operations_trained", branchLabel: "Operations — Trained +10", rank: "trained", bonus: 10, sortOrder: 10 }),
  skill({ id: "astrogation", label: "Astrogation", branch: "operations_trained", branchLabel: "Operations — Trained +10", rank: "trained", bonus: 10, sortOrder: 20 }),
  skill({ id: "communications", label: "Communications", branch: "operations_trained", branchLabel: "Operations — Trained +10", rank: "trained", bonus: 10, sortOrder: 30 }),

  // Operations — Expert
  skill({ id: "command", label: "Command", branch: "operations_expert", branchLabel: "Operations — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),
  skill({ id: "gunnery", label: "Gunnery", branch: "operations_expert", branchLabel: "Operations — Expert +15", rank: "expert", bonus: 15, sortOrder: 20 }),

  // Esoteric / Fringe — Expert
  skill({ id: "mysticism", label: "Mysticism", branch: "esoteric_expert", branchLabel: "Esoteric / Fringe — Expert +15", rank: "expert", bonus: 15, sortOrder: 10 }),
  skill({ id: "xenoesotericism", label: "Xenoesotericism", branch: "esoteric_expert", branchLabel: "Esoteric / Fringe — Expert +15", rank: "expert", bonus: 15, sortOrder: 20 }),
  skill({ id: "sophontology", label: "Sophontology", branch: "esoteric_expert", branchLabel: "Esoteric / Fringe — Expert +15", rank: "expert", bonus: 15, sortOrder: 30 }),
]);

export function getActiveSkillPresets() {
  return [...SKILL_PRESETS];
}

export function getSkillPreset(skillId) {
  return (
    SKILL_PRESETS.find(
      (entry) => entry.id === skillId
    ) ?? null
  );
}
