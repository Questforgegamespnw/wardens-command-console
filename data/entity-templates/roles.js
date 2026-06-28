function role({
  id,
  label,
  armorPackageId,
  role,
  threatLevel,
  description,
  primaryWeapon = null,
  secondaryWeapon = null,
  tags = [],
  skills = {},
}) {
  return Object.freeze({
    id,
    label,
    baseBodyId: "trained_human",
    armorPackageId,
    role,
    threatLevel,
    description,
    primaryWeapon,
    secondaryWeapon,
    tags: Object.freeze([...tags]),
    skills: Object.freeze({...skills}),
    status: "active",
  });
}

export const ENTITY_ROLE_TEMPLATES = Object.freeze({
  marine_rifleman: role({
    id: "marine_rifleman",
    label: "Marine Rifleman",
    armorPackageId: "standard_battle_dress",
    role: "baseline combat infantry",
    threatLevel: "military_standard",
    description:
      "Flexible baseline marine infantry.",
    primaryWeapon: "pulse_rifle",
    secondaryWeapon: "pistol",
    tags: [
      "marine",
      "rifleman",
      "infantry",
      "combat",
    ],
  }),

  marine_breacher: role({
    id: "marine_breacher",
    label: "Marine Breacher",
    armorPackageId: "standard_battle_dress",
    role: "entry and close assault",
    threatLevel: "military_cqb",
    description:
      "Close-assault specialist for doors and rooms.",
    primaryWeapon: "combat_shotgun",
    secondaryWeapon: "breaching_axe",
    tags: [
      "marine",
      "breacher",
      "cqb",
      "entry",
    ],
  }),

  marine_combat_engineer: role({
    id: "marine_combat_engineer",
    label: "Marine Combat Engineer",
    armorPackageId: "standard_battle_dress",
    role: "demolition, repair, and breaching",
    threatLevel: "military_specialist",
    description:
      "Field systems and demolition specialist.",
    primaryWeapon: "smg",
    secondaryWeapon: "breaching_tools",
    tags: [
      "marine",
      "engineer",
      "demolition",
      "repair",
    ],
  }),

  marine_medic: role({
    id: "marine_medic",
    label: "Marine Medic",
    armorPackageId: "standard_battle_dress",
    role: "casualty recovery and stabilization",
    threatLevel: "military_support",
    description:
      "Combat casualty recovery specialist.",
    primaryWeapon: "pistol",
    secondaryWeapon: "med_kit",
    tags: [
      "marine",
      "medic",
      "support",
      "recovery",
    ],
  }),

  marine_designated_marksman: role({
    id: "marine_designated_marksman",
    label: "Marine Designated Marksman",
    armorPackageId: "standard_battle_dress",
    role: "precision fire and overwatch",
    threatLevel: "military_specialist",
    description:
      "Long-lane precision support.",
    primaryWeapon: "sniper_rifle",
    secondaryWeapon: "pistol",
    tags: [
      "marine",
      "marksman",
      "precision",
      "overwatch",
    ],
  }),

  marine_sniper: role({
    id: "marine_sniper",
    label: "Marine Sniper",
    armorPackageId: "standard_battle_dress",
    role: "reconnaissance and target removal",
    threatLevel: "military_specialist",
    description:
      "Reconnaissance and high-value target specialist.",
    primaryWeapon: "sniper_rifle",
    secondaryWeapon: "compact_smg",
    tags: [
      "marine",
      "sniper",
      "precision",
      "recon",
    ],
  }),

  marine_support_gunner: role({
    id: "marine_support_gunner",
    label: "Marine Support Gunner",
    armorPackageId: "standard_battle_dress",
    role: "suppression and lane control",
    threatLevel: "military_heavy_infantry",
    description:
      "Volume-fire and suppression specialist.",
    primaryWeapon: "lmg",
    secondaryWeapon: "pistol",
    tags: [
      "marine",
      "support_gunner",
      "suppressive",
      "pinning",
    ],
  }),

  marine_anti_armor_specialist: role({
    id: "marine_anti_armor_specialist",
    label: "Marine Anti-Armor Specialist",
    armorPackageId: "advanced_battle_dress",
    role: "hard-target response",
    threatLevel: "military_heavy_specialist",
    description:
      "Dedicated vehicle and armor threat response.",
    primaryWeapon: "anti_armor_launcher",
    secondaryWeapon: "pistol",
    tags: [
      "marine",
      "anti_armor",
      "siege",
      "hard_target",
    ],
  }),

  marine_void_boarding_specialist: role({
    id: "marine_void_boarding_specialist",
    label: "Marine Void / Boarding Specialist",
    armorPackageId: "armored_combat_eva",
    role: "zero-g breach and station assault",
    threatLevel: "military_boarding",
    description:
      "Sealed boarding and zero-g assault specialist.",
    primaryWeapon: "smg",
    secondaryWeapon: "foam_gun",
    tags: [
      "marine",
      "boarding",
      "void",
      "zero_g",
    ],
  }),

  orion_gunner: role({
    id: "orion_gunner",
    label: "Orion Gunner",
    armorPackageId: "advanced_battle_dress",
    role: "anti-material overwatch",
    threatLevel: "military_heavy_specialist",
    description:
      "Crew-served Orion anti-material operator.",
    primaryWeapon: "orion_anti_material_rifle",
    secondaryWeapon: "pistol",
    tags: [
      "marine",
      "orion",
      "gunner",
      "anti_material",
    ],
  }),

  orion_spotter: role({
    id: "orion_spotter",
    label: "Orion Spotter",
    armorPackageId: "standard_battle_dress",
    role: "target identification and firing solutions",
    threatLevel: "military_specialist",
    description:
      "Orion target identification and support operator.",
    primaryWeapon: "precision_rifle",
    secondaryWeapon: "target_painter",
    tags: [
      "marine",
      "orion",
      "spotter",
      "target_lock",
    ],
  }),

  corporate_overwatch_operator: role({
    id: "corporate_overwatch_operator",
    label: "Corporate Overwatch Operator",
    armorPackageId: "advanced_battle_dress",
    role: "hard-target deletion and breach denial",
    threatLevel: "elite_corporate_specialist",
    description:
      "Recovery-clause anti-material overwatch.",
    primaryWeapon: "orion_anti_material_rifle",
    secondaryWeapon: "compact_smg",
    tags: [
      "corporate",
      "overwatch",
      "recovery_clause",
    ],
  }),

  corporate_skywatch_officer: role({
    id: "corporate_skywatch_officer",
    label: "Corporate Comms / Skywatch Officer",
    armorPackageId: "advanced_battle_dress",
    role: "uplink and command authorization",
    threatLevel: "elite_corporate_specialist",
    description:
      "Corporate uplink and authority-chain operator.",
    primaryWeapon: "smg",
    secondaryWeapon: "command_slate",
    tags: [
      "corporate",
      "skywatch",
      "command_link",
    ],
  }),

  corporate_technical_operator: role({
    id: "corporate_technical_operator",
    label: "Corporate Technical Operations Specialist",
    armorPackageId: "advanced_battle_dress",
    role: "drone control and systems intrusion",
    threatLevel: "elite_corporate_specialist",
    description:
      "Remote systems and drone support specialist.",
    primaryWeapon: "compact_smg",
    secondaryWeapon: "drone_control_rig",
    tags: [
      "corporate",
      "technical_operations",
      "drone_control",
    ],
  }),

  reclamation_breach_lead: role({
    id: "reclamation_breach_lead",
    label: "Reclamation Breach Lead",
    armorPackageId: "juggernaut",
    role: "entry and forced compliance",
    threatLevel: "elite_corporate_intervention",
    description:
      "Heavy entry operator for a Reclamation Team.",
    primaryWeapon: "heavy_breaching_weapon",
    secondaryWeapon: "aegis_shield",
    tags: [
      "corporate",
      "reclamation",
      "breach_lead",
    ],
  }),

  reclamation_asset_handler: role({
    id: "reclamation_asset_handler",
    label: "Reclamation Asset Handler",
    armorPackageId: "advanced_battle_dress",
    role: "asset confirmation and custody",
    threatLevel: "elite_corporate_intervention",
    description:
      "Protected-asset confirmation and custody specialist.",
    primaryWeapon: "compact_smg",
    secondaryWeapon: "asset_scanner",
    tags: [
      "corporate",
      "reclamation",
      "asset_handler",
    ],
  }),

  reclamation_tactical_control: role({
    id: "reclamation_tactical_control",
    label: "Reclamation Tactical Control",
    armorPackageId: "advanced_battle_dress",
    role: "route denial and crowd shaping",
    threatLevel: "elite_corporate_intervention",
    description:
      "Foam, smoke, and movement-control specialist.",
    primaryWeapon: "foam_gun",
    secondaryWeapon: "smg",
    tags: [
      "corporate",
      "reclamation",
      "tactical_control",
    ],
  }),

  reclamation_precision_enforcer: role({
    id: "reclamation_precision_enforcer",
    label: "Reclamation Precision Enforcer",
    armorPackageId: "advanced_battle_dress",
    role: "selective disabling fire",
    threatLevel: "elite_corporate_intervention",
    description:
      "Close precision and disabling-fire specialist.",
    primaryWeapon: "precision_carbine",
    secondaryWeapon: "pistol",
    tags: [
      "corporate",
      "reclamation",
      "precision_enforcer",
    ],
  }),

  adjudicator_fire_control_specialist: role({
    id: "adjudicator_fire_control_specialist",
    label: "Adjudicator Fire-Control Specialist",
    armorPackageId: "pilot_suit",
    role: "mounted weapon targeting",
    threatLevel: "corporate_heavy_support",
    description:
      "Hardpoint, missile, and targeting specialist.",
    primaryWeapon: "sidearm",
    secondaryWeapon: "targeting_interface",
    tags: [
      "corporate",
      "fire_control",
      "gunnery",
    ],
    skills: {
      gunnery: 15,
      electronics: 10,
      survey: 10,
      tactics: 15,
    },
  }),

  adjudicator_walker_pilot: role({
    id: "adjudicator_walker_pilot",
    label: "Adjudicator Walker Pilot",
    armorPackageId: "pilot_suit",
    role: "walker operation",
    threatLevel: "corporate_heavy",
    description:
      "Adjudicator-class combat platform pilot.",
    primaryWeapon: "sidearm",
    secondaryWeapon: "platform_interface",
    tags: [
      "corporate",
      "walker_pilot",
      "powered_platform",
    ],
    skills: {
      powered_platform_training: 15,
      gunnery: 15,
      tactics: 15,
    },
  }),

  juggernaut_exosuit_operator: role({
    id: "juggernaut_exosuit_operator",
    label: "Juggernaut / Exosuit Operator",
    armorPackageId: "juggernaut",
    role: "powered armor assault",
    threatLevel: "corporate_heavy_infantry",
    description:
      "Heavy powered-armor assault operator.",
    primaryWeapon: "heavy_weapon",
    secondaryWeapon: "breaching_tool",
    tags: [
      "corporate",
      "exosuit",
      "juggernaut",
    ],
    skills: {
      powered_platform_training: 15,
      heavy_weapons: 15,
      athletics: 10,
      military_conditioning: 10,
    },
  }),

  walker_assault_team_lead: role({
    id: "walker_assault_team_lead",
    label: "Walker Assault Team Lead",
    armorPackageId: "command_harness",
    role: "walker section command",
    threatLevel: "corporate_command",
    description:
      "Walker-section tactical coordinator.",
    primaryWeapon: "sidearm",
    secondaryWeapon: "command_slate",
    tags: [
      "corporate",
      "command",
      "walker_section",
    ],
    skills: {
      command: 15,
      tactics: 15,
      gunnery: 15,
    },
  }),
});
