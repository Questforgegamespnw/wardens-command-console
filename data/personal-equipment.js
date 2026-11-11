/**
 * Warden Command Console
 * Canonical personal equipment runtime catalog.
 *
 * Generated from CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md, then normalized
 * for attachment-slot and ammunition-delivery compatibility. Costs are
 * intentionally excluded: this is a character equipment catalog, not a shop.
 */

export const PERSONAL_EQUIPMENT_CATALOG_VERSION = 1;

export const PERSONAL_EQUIPMENT_CATEGORIES = Object.freeze([
  "weapons",
  "ammunition",
  "attachments",
  "armor",
  "shields",
  "tools",
  "medical_survival",
  "security_tactical",
  "sensors_communications",
  "personal_effects",
  "patches"
]);

export const STARTING_GEAR_SOURCE_IDS = Object.freeze([
  "career_gear",
  "specialty_gear",
  "employer_issued",
  "ship_issued",
  "personal_keepsake",
  "restricted_item",
  "debt_financed"
]);

export const ATTACHMENT_SLOT_IDS = Object.freeze(["ammo", "underbarrel", "barrel", "stock", "scope"]);

export const WEAPON_FIRE_MODES = Object.freeze([
  Object.freeze({ id: "burst_b", label: "Burst [B]", behavior: "Controlled multi-shot fire." }),
  Object.freeze({ id: "full_auto_fa", label: "Full Auto [FA]", behavior: "Sustained automatic fire." }),
  Object.freeze({ id: "single_s", label: "Single [S]", behavior: "Standard controlled fire." }),
]);

export function getWeaponFireMode(id) {
  return WEAPON_FIRE_MODES.find((entry) => entry.id === id) ?? null;
}

const RAW_PERSONAL_EQUIPMENT = [
  {
    "id": "standard_ammunition",
    "label": "Standard Ammunition",
    "aliases": [],
    "category": "ammunition",
    "subcategory": "weapon_ammunition",
    "scale": "personal",
    "description": "Default compatible ammunition with no special modifier. Uses the weapon’s normal damage, Wound Type, penetration, and collateral profile.",
    "tags": [
      "Ammo",
      "Standard"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "ammunition",
      "deliveryTypes": [
        "ballistic"
      ],
      "allowedWeaponIds": [],
      "forbiddenWeaponIds": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "ap_ammunition",
    "label": "AP / Piercing Ammunition",
    "aliases": [],
    "category": "ammunition",
    "subcategory": "weapon_ammunition",
    "scale": "personal",
    "description": "Uses normal weapon damage. Uses weapon default Wound Type. Improves penetration by one step within weapon limits. Tags: [Ammo] [AP] [Piercing]",
    "tags": [
      "Ammo",
      "AP",
      "Piercing"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "ammunition",
      "deliveryTypes": [
        "ballistic"
      ],
      "allowedWeaponIds": [],
      "forbiddenWeaponIds": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "cryo_ammunition",
    "label": "Cryo Ammunition",
    "aliases": [],
    "category": "ammunition",
    "subcategory": "weapon_ammunition",
    "scale": "personal",
    "description": "Uses normal weapon damage. Tags: [Ammo] [Cryo] [Thermal Shock] [Slow] [Brittle] [Specialty]",
    "tags": [
      "Ammo",
      "Cryo",
      "Thermal Shock",
      "Slow",
      "Brittle",
      "Specialty"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "ammunition",
      "deliveryTypes": [
        "ballistic"
      ],
      "allowedWeaponIds": [],
      "forbiddenWeaponIds": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "less_lethal_ammunition",
    "label": "Less-Lethal / Rubberized Ammunition",
    "aliases": [],
    "category": "ammunition",
    "subcategory": "weapon_ammunition",
    "scale": "personal",
    "description": "Uses normal weapon damage. Wound Type: [Less-Lethal] Tags: [Ammo] [Less-Lethal] [Rubberized] [Blunt Force] [Nonlethal] [Knockdown]",
    "tags": [
      "Less-Lethal",
      "Ammo",
      "Rubberized",
      "Blunt Force",
      "Nonlethal",
      "Knockdown"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "ammunition",
      "deliveryTypes": [
        "ballistic"
      ],
      "allowedWeaponIds": [],
      "forbiddenWeaponIds": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "phosphorus_dragon_ammunition",
    "label": "Phosphorus / Dragon Rounds",
    "aliases": [],
    "category": "ammunition",
    "subcategory": "weapon_ammunition",
    "scale": "personal",
    "description": "Uses normal weapon damage. Wound Type: [Fire/Explosive] if Wound occurs. Tags: [Ammo] [Phosphorus] [Dragon Rounds] [Fire/Explosive] [Ignition] [Burning] [Smoke] [Hazardous]",
    "tags": [
      "Fire/Explosive",
      "Ammo",
      "Phosphorus",
      "Dragon Rounds",
      "Ignition",
      "Burning",
      "Smoke",
      "Hazardous"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "ammunition",
      "deliveryTypes": [
        "ballistic"
      ],
      "allowedWeaponIds": [],
      "forbiddenWeaponIds": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "ship_safe_ammunition",
    "label": "Ship-Safe Ammunition",
    "aliases": [],
    "category": "ammunition",
    "subcategory": "weapon_ammunition",
    "scale": "personal",
    "description": "Uses normal weapon damage. Uses weapon default Wound Type. Tags: [Ammo] [Ship-Safe] [Low-Penetration] [Reduced Overpenetration] [Security]",
    "tags": [
      "Ammo",
      "Ship-Safe",
      "Low-Penetration",
      "Reduced Overpenetration",
      "Security"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "ammunition",
      "deliveryTypes": [
        "ballistic"
      ],
      "allowedWeaponIds": [],
      "forbiddenWeaponIds": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "advanced_battle_dress",
    "label": "Advanced Battle Dress",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "Current codex mechanics are canonical: AV 10 with expanded systems. Vanilla +15 Armor Save is legacy metadata; 1,500-credit price retained provisionally.",
    "tags": [
      "Armored",
      "Powered",
      "Heavy",
      "Exoskeleton",
      "HUD",
      "Tac Link",
      "Comms",
      "AutoInjector",
      "Med Suite",
      "Trauma Dampening",
      "Targeting",
      "Ammo Rig",
      "Utility Mounts",
      "Powered Carry",
      "Optional: Sealed",
      "Optional: O2"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 10 Tags: [Armored] [Powered] [Heavy] [Exoskeleton] [HUD] [Tac Link] [Comms] [AutoInjector] [Med Suite] [Trauma Dampening] [Targeting] [Ammo Rig] [Utility Mounts] [Powered Carry] [Optional: Sealed] [Optional: O2]",
      "av": 10
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "aegis_advanced_battle_suit",
    "label": "Aegis Advanced Battle Suit",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal_supported",
    "description": "Armor definition also embeds shield mechanics; keep links to shield and armor registries.",
    "tags": [
      "Armored",
      "Powered",
      "Prototype",
      "Aegis",
      "Kinetic"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "[Reactive Armor] [Projectile Defense] [Fast] [Mobility Assist] [HUD] [Tac Link] [Comms] [Targeting] [AutoInjector] [Med Suite] [Trauma Dampening] [Restricted] [Corporate Supertech]"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "armored_combat_eva",
    "label": "Armored Combat EVA",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "",
    "tags": [
      "Armored",
      "Sealed",
      "O2",
      "Pressurized",
      "Vacuum Rated",
      "Zero-G",
      "Maneuver Jets",
      "Mag",
      "Tether",
      "HUD",
      "Tac Link",
      "Comms",
      "AutoInjector",
      "Med Suite",
      "Trauma Dampening",
      "Targeting",
      "Powered",
      "Cumbersome",
      "Boarding",
      "Utility Mounts"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 10 Tags: [Armored] [Sealed] [O2] [Pressurized] [Vacuum Rated] [Zero-G] [Maneuver Jets] [Mag] [Tether] [HUD] [Tac Link] [Comms] [AutoInjector] [Med Suite] [Trauma Dampening] [Targeting] [Powered] [Cumbersome] [Boarding] [Utility Mounts]",
      "av": 10
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "combat_hazard_suit",
    "label": "Combat Hazard Suit",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "",
    "tags": [],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "Treat as Standard Battle Dress or Advanced Battle Dress plus a Hazard Package."
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "eva_suit",
    "label": "EVA Suit",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "Canonical name: EVA Suit. Vaccsuit retained as vanilla alias. Current codex AV 5 and environmental systems are canonical; vanilla price retained provisionally.",
    "tags": [
      "Sealed",
      "O2",
      "Pressurized",
      "Vacuum Rated",
      "Mag",
      "Lights",
      "Comms",
      "Utility",
      "Cumbersome"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 5 Tags: [Sealed] [O2] [Pressurized] [Vacuum Rated] [Mag] [Lights] [Comms] [Utility] [Cumbersome]",
      "av": 5
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "hazard_suit",
    "label": "Hazard Suit",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "Same item across sources. Codex AV 5 and protection tags are canonical; vanilla source supplies provisional price and baseline description.",
    "tags": [
      "Sealed",
      "Filter",
      "Resistant",
      "Chemical Protection",
      "Biohazard Protection",
      "Utility",
      "Comms",
      "Cumbersome"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 5 Tags: [Sealed] [Filter] [Resistant] [Chemical Protection] [Biohazard Protection] [Utility] [Comms] [Cumbersome]",
      "av": 5
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "juggernaut_class_armor",
    "label": "Juggernaut-Class Armor",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal_supported",
    "description": "",
    "tags": [
      "Armored",
      "Powered",
      "Heavy",
      "Cumbersome",
      "Exoskeleton+",
      "HUD",
      "Tac Link",
      "Comms",
      "AutoInjector",
      "Med Suite",
      "Trauma Dampening+",
      "Targeting",
      "Powered Carry",
      "Hardpoint",
      "Ammo Rig",
      "Utility Mounts",
      "Reinforced",
      "Resilient",
      "Sealed: Optional",
      "O2: Optional",
      "Mag: Optional"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 15 DR: 10 Tags: [Armored] [Powered] [Heavy] [Cumbersome] [Exoskeleton+] [HUD] [Tac Link] [Comms] [AutoInjector] [Med Suite] [Trauma Dampening+] [Targeting] [Powered Carry] [Hardpoint] [Ammo Rig] [Utility Mounts] [Reinforced] [Resilient] [Sealed: Optional] [O2: Optional] [Mag: Optional]",
      "av": 15
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "standard_battle_dress",
    "label": "Standard Battle Dress",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "Current codex AV 7 mechanics are canonical. Vanilla +10 Armor Save is legacy metadata; 750-credit price retained provisionally.",
    "tags": [
      "Armored",
      "HUD",
      "Tac Link",
      "Comms",
      "Ammo Rig",
      "Utility Mounts",
      "Marine Issue"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 7 Tags: [Armored] [HUD] [Tac Link] [Comms] [Ammo Rig] [Utility Mounts] [Marine Issue]",
      "av": 7
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "standard_crew_attire",
    "label": "Standard Crew Attire",
    "aliases": [],
    "category": "armor",
    "subcategory": "armor_or_suit",
    "scale": "personal",
    "description": "Source enrichment resolved. Codex AV 0 and clothing/crew/utility tags are canonical; vanilla 20-credit price retained provisionally.",
    "tags": [
      "Clothing",
      "Crew",
      "Utility"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "armor",
      "summary": "AV: 0 Tags: [Clothing] [Crew] [Utility]",
      "av": 0
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "handheld_aegis",
    "label": "Handheld Aegis",
    "aliases": [],
    "category": "shields",
    "subcategory": "personal_defensive_system",
    "scale": "personal_supported",
    "description": "Base AV: 5 Max AV: 20 Integrity: 30 DR: 5 vs eligible projectile overflow Tags: [Shield] [Ballistic Shield] [Kinetic] [Reactive Armor] [Projectile Defense] [Directional] [Integrity] [2-Handed] [1-Handed: Exoskeleton] [Cumbersome]",
    "tags": [
      "Shield",
      "Ballistic Shield",
      "Kinetic",
      "Reactive Armor",
      "Projectile Defense",
      "Directional",
      "Integrity",
      "2-Handed",
      "1-Handed: Exoskeleton",
      "Cumbersome"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "shield",
      "summary": "Base AV: 5 Max AV: 20 Integrity: 30 DR: 5 vs eligible projectile overflow Tags: [Shield] [Ballistic Shield] [Kinetic] [Reactive Armor] [Projectile Defense] [Directional] [Integrity] [2-Handed] [1-Handed: Exoskeleton] [Cumbersome]"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "unarmed",
    "label": "Unarmed",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Melee / Natural Attack",
    "scale": "personal",
    "description": "Current Wounds as damage",
    "tags": [
      "Blunt Force",
      "melee",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Melee / Natural Attack",
      "damage": "Current Wounds as damage",
      "woundTypes": [
        "Blunt Force"
      ],
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "anti_armor_grenade_shaped_charge_grenade",
    "label": "Anti-Armor Grenade / Shaped Charge Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Anti-Armor Charge",
    "scale": "personal",
    "description": "5d10 or 1 Vehicle Wound if properly placed against a weak point; Thrown / Close; placed for best effect",
    "tags": [
      "Anti-Armor",
      "anti_armor",
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Anti-Armor Charge",
      "damage": "5d10 or 1 Vehicle Wound if properly placed against a weak point",
      "range": "Thrown / Close; placed for best effect",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "[Anti-Armor]",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "breaching_axe",
    "label": "Breaching Axe",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Melee / Breaching Tool",
    "scale": "personal",
    "description": "2d10",
    "tags": [
      "Bleeding",
      "Blunt Force",
      "melee",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Melee / Breaching Tool",
      "damage": "2d10",
      "woundTypes": [
        "Bleeding",
        "Blunt Force"
      ],
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "combat_shotgun",
    "label": "Combat Shotgun",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Longarm / Close-Quarters Weapon",
    "scale": "personal",
    "description": "Close: 1 Wound; Nearby: 3d10; Close / Nearby",
    "tags": [
      "Gunshot",
      "ballistic",
      "longarm",
      "shotgun",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Longarm / Close-Quarters Weapon",
      "damage": "Close: 1 Wound; Nearby: 3d10",
      "range": "Close / Nearby",
      "capacity": "4 loaded + 4 side saddle",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "underbarrel",
        "barrel"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "shotgun",
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "concussion_breach_grenade",
    "label": "Concussion / Breach Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Shock Explosive",
    "scale": "personal",
    "description": "1 Wound; 2 Wounds in confined spaces or direct breach placement; Thrown / Close",
    "tags": [
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Shock Explosive",
      "damage": "1 Wound; 2 Wounds in confined spaces or direct breach placement",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "crowbar",
    "label": "Crowbar",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Melee / Utility Tool",
    "scale": "personal",
    "description": "1d5",
    "tags": [
      "Blunt Force",
      "melee",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Melee / Utility Tool",
      "damage": "1d5",
      "woundTypes": [
        "Blunt Force"
      ],
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "demolition_charge",
    "label": "Demolition Charge",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Heavy Demolition / Siege Charge",
    "scale": "personal",
    "description": "8d10; Placed / Timed / Remote Detonated",
    "tags": [
      "Siege",
      "heavy_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Heavy Demolition / Siege Charge",
      "damage": "8d10",
      "range": "Placed / Timed / Remote Detonated",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "[Siege]",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "disposable_anti_armor_launcher",
    "label": "Disposable Anti-Armor Launcher",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Infantry Anti-Armor / One-Shot Launcher",
    "scale": "personal",
    "description": "5d10; Nearby / Far",
    "tags": [
      "Anti-Armor",
      "anti_armor",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Infantry Anti-Armor / One-Shot Launcher",
      "damage": "5d10",
      "range": "Nearby / Far",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "[Anti-Armor]",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "e_smoke_chaff_grenade",
    "label": "E-Smoke / Chaff Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Electronic Smoke / Sensor Chaff",
    "scale": "personal",
    "description": "None; Thrown / Close",
    "tags": [
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Electronic Smoke / Sensor Chaff",
      "damage": "None",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "emp_disruption_grenade",
    "label": "EMP / Disruption Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Electronic Disruption",
    "scale": "personal",
    "description": "None or 1d10 to fragile electronics; Thrown / Close",
    "tags": [
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Electronic Disruption",
      "damage": "None or 1d10 to fragile electronics",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "flamethrower",
    "label": "Flamethrower",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Heavy Utility Weapon / Area Denial",
    "scale": "personal",
    "description": "1 Wound; Nearby cone or stream",
    "tags": [
      "heavy_weapon",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Heavy Utility Weapon / Area Denial",
      "damage": "1 Wound",
      "range": "Nearby cone or stream",
      "capacity": "Canister",
      "woundTypes": [],
      "penetration": "Standard; ignores some cover if flame can reach around, through, or into it",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "flare_gun",
    "label": "Flare Gun",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Utility Weapon / Signal Launcher",
    "scale": "personal",
    "description": "1d5; Nearby shot; Far visual signal",
    "tags": [
      "Fire/Explosive",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Utility Weapon / Signal Launcher",
      "damage": "1d5",
      "range": "Nearby shot; Far visual signal",
      "capacity": "1 flare loaded",
      "woundTypes": [
        "Fire/Explosive"
      ],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "flashbang_stun_grenade",
    "label": "Flashbang / Stun Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Disorientation",
    "scale": "personal",
    "description": "None or 1d10 in dangerous proximity; Thrown / Close",
    "tags": [
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Disorientation",
      "damage": "None or 1d10 in dangerous proximity",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "foam_grenade",
    "label": "Foam Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Restraint Foam / Area Control",
    "scale": "personal",
    "description": "None, or 1d10 [Blunt Force] if impact-hardened or used dangerously; Thrown / Close",
    "tags": [
      "Blunt Force",
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Restraint Foam / Area Control",
      "damage": "None, or 1d10 [Blunt Force] if impact-hardened or used dangerously",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "foam_gun",
    "label": "Foam Gun",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Utility Weapon / Restraint Foam Projector",
    "scale": "personal",
    "description": "None; 1d10 [Blunt Force] if impact-hardened or misused; Close / Nearby",
    "tags": [
      "Blunt Force",
      "Less-Lethal",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Utility Weapon / Restraint Foam Projector",
      "damage": "None; 1d10 [Blunt Force] if impact-hardened or misused",
      "range": "Close / Nearby",
      "capacity": "Foam canister",
      "woundTypes": [
        "Less-Lethal",
        "Blunt Force"
      ],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "frag_grenade",
    "label": "Frag Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Fragmentation Explosive",
    "scale": "personal",
    "description": "2 Wounds at center blast; 1 Wound near blast; 3d10 through partial cover or poor exposure; Thrown / Close",
    "tags": [
      "Piercing",
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Fragmentation Explosive",
      "damage": "2 Wounds at center blast; 1 Wound near blast; 3d10 through partial cover or poor exposure",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard; fragments may count as `[Piercing]` against exposed soft targets at GM discretion",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "gas_grenade",
    "label": "Gas Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Chemical Area Denial",
    "scale": "personal",
    "description": "None, 1d10, or 1 Wound depending payload; Thrown / Close",
    "tags": [
      "Filter",
      "Sealed",
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Chemical Area Denial",
      "damage": "None, 1d10, or 1 Wound depending payload",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Ignores worn AV unless the target has [Sealed], [Filter], or appropriate protection",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "hand_welder",
    "label": "Hand Welder",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Utility Weapon / Industrial Welder",
    "scale": "personal",
    "description": "1d10; Close",
    "tags": [
      "Fire/Explosive",
      "Piercing",
      "industrial_weapon",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Utility Weapon / Industrial Welder",
      "damage": "1d10",
      "range": "Close",
      "capacity": "Power cell / fuel feed",
      "woundTypes": [
        "Fire/Explosive"
      ],
      "penetration": "[Piercing] against soft armor, seals, and material with contact time",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "handheld_railgun",
    "label": "Handheld Railgun",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Special / Variable-Charge Rail Weapon",
    "scale": "personal",
    "description": "Variable, up to 10d10 per battery; Far / Extreme, line shot",
    "tags": [
      "Anti-Armor",
      "Siege",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Special / Variable-Charge Rail Weapon",
      "damage": "Variable, up to 10d10 per battery",
      "range": "Far / Extreme, line shot",
      "capacity": "1 battery; charge determines damage",
      "woundTypes": [],
      "penetration": "[Siege] at high charge; [Anti-Armor] at lower combat charges",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "heavy_anti_armor_launcher",
    "label": "Heavy Anti-Armor Launcher",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Squad Anti-Armor Weapon",
    "scale": "personal",
    "description": "8d10; Far / Extreme with lock, spotter, or clear firing line",
    "tags": [
      "Anti-Armor",
      "anti_armor",
      "heavy_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Squad Anti-Armor Weapon",
      "damage": "8d10",
      "range": "Far / Extreme with lock, spotter, or clear firing line",
      "capacity": "Single loaded round; reload requires setup or loader",
      "woundTypes": [],
      "penetration": "[Anti-Armor]",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "incendiary_grenade",
    "label": "Incendiary Grenade",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Throwable / Fire Payload",
    "scale": "personal",
    "description": "1 Wound on hit or ignition; lingering fire hazard; Thrown / Close",
    "tags": [
      "grenade",
      "throwable",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Throwable / Fire Payload",
      "damage": "1 Wound on hit or ignition; lingering fire hazard",
      "range": "Thrown / Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "laser_cutter",
    "label": "Laser Cutter",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Utility Weapon / Industrial Cutter",
    "scale": "personal",
    "description": "5d10 line in beam mode; Close / Nearby line",
    "tags": [
      "Anti-Armor",
      "Fire/Explosive",
      "Piercing",
      "industrial_weapon",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Utility Weapon / Industrial Cutter",
      "damage": "5d10 line in beam mode",
      "range": "Close / Nearby line",
      "capacity": "Battery / charge cycle",
      "woundTypes": [
        "Fire/Explosive"
      ],
      "penetration": "[Piercing]; may count as [Anti-Armor] against material or structure with time and setup",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "lmg_saw",
    "label": "LMG / SAW",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Longarm / Squad Automatic Weapon",
    "scale": "personal",
    "description": "3d10; Nearby / Far",
    "tags": [
      "Gunshot",
      "automatic",
      "ballistic",
      "burst",
      "full_auto",
      "heavy_recoil",
      "longarm",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Longarm / Squad Automatic Weapon",
      "damage": "3d10",
      "range": "Nearby / Far",
      "capacity": "Belt, box, or drum feed",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "underbarrel"
      ],
      "integratedAttachments": [
        {
          "attachmentId": "bipod",
          "slot": "underbarrel",
          "removable": true
        }
      ],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "machine_pistol",
    "label": "Machine Pistol",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Small Arm / Automatic Sidearm",
    "scale": "personal",
    "description": "3d5; Close",
    "tags": [
      "Gunshot",
      "automatic",
      "ballistic",
      "burst",
      "full_auto",
      "heavy_recoil",
      "sidearm",
      "small_arm",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Small Arm / Automatic Sidearm",
      "damage": "3d5",
      "range": "Close",
      "capacity": "20-30 rounds, depending magazine",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "underbarrel",
        "barrel",
        "stock"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "mag_mine_limpet_charge",
    "label": "Mag-Mine / Limpet Charge",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Attached Anti-Vehicle Charge",
    "scale": "personal",
    "description": "1 Vehicle Wound; Placed / Attached / Thrown Close",
    "tags": [
      "Anti-Armor",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Attached Anti-Vehicle Charge",
      "damage": "1 Vehicle Wound",
      "range": "Placed / Attached / Thrown Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "[Anti-Armor]",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "minigun_rotary_weapon",
    "label": "Minigun / Rotary Weapon",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Heavy Automatic Weapon / Rotary Weapon",
    "scale": "personal",
    "description": "3d10; Nearby",
    "tags": [
      "automatic",
      "burst",
      "full_auto",
      "heavy_recoil",
      "heavy_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Heavy Automatic Weapon / Rotary Weapon",
      "damage": "3d10",
      "range": "Nearby",
      "capacity": "Backpack feed or mounted belt",
      "woundTypes": [],
      "penetration": "Standard",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "nail_gun",
    "label": "Nail Gun",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Industrial Tool / Improvised Small Arm",
    "scale": "personal",
    "description": "1d5; Close",
    "tags": [
      "Bleeding",
      "Gunshot",
      "ballistic",
      "industrial_weapon",
      "small_arm",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Industrial Tool / Improvised Small Arm",
      "damage": "1d5",
      "range": "Close",
      "capacity": "32 shots",
      "woundTypes": [
        "Gunshot",
        "Bleeding"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "orion_anti_material_rifle",
    "label": "Orion Anti-Material Rifle",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Special / Siege Sniper",
    "scale": "personal",
    "description": "2 Wounds / 5d10; Far / Extreme, braced or emplaced",
    "tags": [
      "Anti-Armor",
      "precision",
      "rifle",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Special / Siege Sniper",
      "damage": "2 Wounds / 5d10",
      "range": "Far / Extreme, braced or emplaced",
      "capacity": "Single heavy round or limited magazine, model dependent",
      "woundTypes": [],
      "penetration": "[Anti-Armor]",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "pistol",
    "label": "Pistol",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Small Arm / Sidearm",
    "scale": "personal",
    "description": "1d10; Close",
    "tags": [
      "Gunshot",
      "ballistic",
      "sidearm",
      "small_arm",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Small Arm / Sidearm",
      "damage": "1d10",
      "range": "Close",
      "capacity": "12 rounds",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "underbarrel",
        "barrel",
        "scope"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "pulse_rifle",
    "label": "Pulse Rifle",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Longarm / Military Rifle",
    "scale": "personal",
    "description": "2d10; Nearby / Far",
    "tags": [
      "Gunshot",
      "ballistic",
      "burst",
      "longarm",
      "rifle",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Longarm / Military Rifle",
      "damage": "2d10",
      "range": "Nearby / Far",
      "capacity": "Standard magazine or power-cell magazine, model dependent",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "scope",
        "underbarrel",
        "barrel",
        "stock"
      ],
      "integratedAttachments": [
        {
          "attachmentId": "g_launcher",
          "slot": "underbarrel",
          "removable": true
        }
      ],
      "intrinsicSystems": [
        "smart-link system"
      ],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "revolver",
    "label": "Revolver",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Small Arm / Heavy Sidearm",
    "scale": "personal",
    "description": "2d10; Close / Nearby",
    "tags": [
      "Gunshot",
      "Piercing",
      "ballistic",
      "heavy_weapon",
      "sidearm",
      "small_arm",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Small Arm / Heavy Sidearm",
      "damage": "2d10",
      "range": "Close / Nearby",
      "capacity": "6 rounds",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "[Piercing]",
      "attachmentSlots": [
        "ammo",
        "underbarrel"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "rigging_gun",
    "label": "Rigging Gun",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Utility Weapon / Harpoon and Tether Launcher",
    "scale": "personal",
    "description": "1d10; +2d10 if forcibly removed; Nearby / Far",
    "tags": [
      "Bleeding",
      "Gunshot",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Utility Weapon / Harpoon and Tether Launcher",
      "damage": "1d10; +2d10 if forcibly removed",
      "range": "Nearby / Far",
      "capacity": "1 tethered harpoon loaded",
      "woundTypes": [
        "Gunshot",
        "Bleeding"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "harpoon"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "satchel_charge",
    "label": "Satchel Charge",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Portable Demolition / Breach Charge",
    "scale": "personal",
    "description": "5d10 or 1 Vehicle Wound if placed well; Placed / Thrown Close",
    "tags": [
      "Anti-Armor",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Portable Demolition / Breach Charge",
      "damage": "5d10 or 1 Vehicle Wound if placed well",
      "range": "Placed / Thrown Close",
      "capacity": "Single-use",
      "woundTypes": [],
      "penetration": "[Anti-Armor] when placed; Standard as thrown explosive damage",
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "scalpel",
    "label": "Scalpel",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Melee / Medical Tool",
    "scale": "personal",
    "description": "1d10",
    "tags": [
      "Bleeding",
      "melee",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Melee / Medical Tool",
      "damage": "1d10",
      "woundTypes": [
        "Bleeding"
      ],
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "smart_rifle",
    "label": "Smart Rifle",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Longarm / Precision Smart Rifle",
    "scale": "personal",
    "description": "1d10; triple damage on critical hit; Far / Extreme",
    "tags": [
      "ballistic",
      "longarm",
      "rifle",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Longarm / Precision Smart Rifle",
      "damage": "1d10; triple damage on critical hit",
      "range": "Far / Extreme",
      "capacity": "12 rounds",
      "woundTypes": [],
      "penetration": "Piercing",
      "attachmentSlots": [
        "ammo",
        "scope"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [
        "smart-link system"
      ],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "smg",
    "label": "SMG",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Longarm / Compact Automatic Weapon",
    "scale": "personal",
    "description": "3d10; Close / Nearby",
    "tags": [
      "Gunshot",
      "automatic",
      "ballistic",
      "burst",
      "full_auto",
      "heavy_recoil",
      "longarm",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Longarm / Compact Automatic Weapon",
      "damage": "3d10",
      "range": "Close / Nearby",
      "capacity": "30 rounds",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "underbarrel",
        "barrel",
        "stock"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "sniper_rifle",
    "label": "Sniper Rifle",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Longarm / Precision Rifle",
    "scale": "personal",
    "description": "Ideal braced range: 1 Wound; other valid shots: 3d10; Far / Extreme when braced",
    "tags": [
      "Gunshot",
      "ballistic",
      "longarm",
      "precision",
      "rifle",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Longarm / Precision Rifle",
      "damage": "Ideal braced range: 1 Wound; other valid shots: 3d10",
      "range": "Far / Extreme when braced",
      "capacity": "5-10 rounds, model dependent",
      "woundTypes": [
        "Gunshot"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo",
        "scope",
        "underbarrel"
      ],
      "integratedAttachments": [
        {
          "attachmentId": "bipod",
          "slot": "underbarrel",
          "removable": true
        }
      ],
      "intrinsicSystems": [
        "smart-link system"
      ],
      "ammoDeliveryTypes": [
        "ballistic"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "stun_baton",
    "label": "Stun Baton",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Melee / Security Weapon",
    "scale": "personal",
    "description": "1d5 + Body Save effect",
    "tags": [
      "Less-Lethal",
      "melee",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Melee / Security Weapon",
      "damage": "1d5 + Body Save effect",
      "woundTypes": [
        "Less-Lethal"
      ],
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "tranquilizer_pistol",
    "label": "Tranquilizer Pistol",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Utility Weapon / Less-Lethal Sidearm",
    "scale": "personal",
    "description": "1 damage + Body Save; Close / Nearby",
    "tags": [
      "Less-Lethal",
      "sidearm",
      "utility_weapon",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Utility Weapon / Less-Lethal Sidearm",
      "damage": "1 damage + Body Save",
      "range": "Close / Nearby",
      "capacity": "6 darts",
      "woundTypes": [
        "Less-Lethal"
      ],
      "penetration": "Standard",
      "attachmentSlots": [
        "ammo"
      ],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": [
        "dart"
      ]
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "vibechete",
    "label": "Vibechete",
    "aliases": [],
    "category": "weapons",
    "subcategory": "Melee / Powered Blade",
    "scale": "personal",
    "description": "3d10",
    "tags": [
      "Bleeding",
      "Gore/Massive",
      "melee",
      "weapon"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "weapon",
      "weaponClass": "Melee / Powered Blade",
      "damage": "3d10",
      "woundTypes": [
        "Bleeding",
        "Gore/Massive"
      ],
      "attachmentSlots": [],
      "integratedAttachments": [],
      "intrinsicSystems": [],
      "ammoDeliveryTypes": []
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "choke",
    "label": "Choke",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "A choke modifies shotgun spread.",
    "tags": [
      "attachment",
      "barrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "barrel",
      "effect": "A choke modifies shotgun spread.",
      "compatibility": {
        "requiredSlot": "barrel",
        "requiredWeaponTags": [
          "shotgun"
        ],
        "anyWeaponTags": [],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Shotgun + barrel slot"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "muzzle_brake",
    "label": "Muzzle Brake",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Reduces recoil and muzzle climb by redirecting gases.",
    "tags": [
      "attachment",
      "barrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "barrel",
      "effect": "Reduces recoil and muzzle climb by redirecting gases.",
      "compatibility": {
        "requiredSlot": "barrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "ballistic",
          "heavy_recoil",
          "automatic"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "ship_safe_barrel",
    "label": "Ship-Safe Barrel",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "A ship-safe barrel modifies weapon pressure, velocity, or projectile behavior to reduce the risk of penetrating hulls, pressure systems, internal bulkheads, or critical ship components.",
    "tags": [
      "attachment",
      "barrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "barrel",
      "effect": "A ship-safe barrel modifies weapon pressure, velocity, or projectile behavior to reduce the risk of penetrating hulls, pressure systems, internal bulkheads, or critical ship components.",
      "compatibility": {
        "requiredSlot": "barrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "ballistic"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Barrel slot; incompatible with some AP configurations"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "stabilizer",
    "label": "Stabilizer",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Improves barrel control and shot consistency.",
    "tags": [
      "attachment",
      "barrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "barrel",
      "effect": "Improves barrel control and shot consistency.",
      "compatibility": {
        "requiredSlot": "barrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "ballistic",
          "heavy_recoil",
          "automatic",
          "precision"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "subsonic_barrel_subsonic_kit",
    "label": "Subsonic Barrel / Subsonic Kit",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "A subsonic kit is tuned to fire low-velocity rounds quietly and safely in enclosed spaces.",
    "tags": [
      "attachment",
      "barrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "barrel",
      "effect": "A subsonic kit is tuned to fire low-velocity rounds quietly and safely in enclosed spaces.",
      "compatibility": {
        "requiredSlot": "barrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "ballistic"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Barrel slot; best with subsonic ammunition"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "suppressor_silencer",
    "label": "Suppressor / Silencer",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Reduces weapon report and makes shots harder to locate.",
    "tags": [
      "attachment",
      "barrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "barrel",
      "effect": "Reduces weapon report and makes shots harder to locate.",
      "compatibility": {
        "requiredSlot": "barrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "ballistic"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "collapsible_stock",
    "label": "Collapsible Stock",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Better in tight quarters and easier to carry.",
    "tags": [
      "attachment",
      "stock"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "stock",
      "effect": "Better in tight quarters and easier to carry.",
      "compatibility": {
        "requiredSlot": "stock",
        "requiredWeaponTags": [],
        "anyWeaponTags": [],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "extended_stock",
    "label": "Extended Stock",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Better control and accuracy when braced, stationary, or firing at range.",
    "tags": [
      "attachment",
      "stock"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "stock",
      "effect": "Better control and accuracy when braced, stationary, or firing at range.",
      "compatibility": {
        "requiredSlot": "stock",
        "requiredWeaponTags": [],
        "anyWeaponTags": [],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "standard_stock",
    "label": "Standard Stock",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Balanced default with no special advantage or drawback.",
    "tags": [
      "attachment",
      "stock"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "stock",
      "effect": "Balanced default with no special advantage or drawback.",
      "compatibility": {
        "requiredSlot": "stock",
        "requiredWeaponTags": [],
        "anyWeaponTags": [],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "bipod",
    "label": "Bipod",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Allows braced fire.",
    "tags": [
      "attachment",
      "underbarrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "underbarrel",
      "effect": "Allows braced fire.",
      "compatibility": {
        "requiredSlot": "underbarrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "longarm",
          "rifle",
          "precision",
          "heavy_weapon",
          "automatic"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Underbarrel slot; requires braced setup to benefit"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "g_launcher",
    "label": "G-Launcher",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Allows the weapon to fire compatible grenades. Capacity depends on model.",
    "tags": [
      "attachment",
      "underbarrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "underbarrel",
      "effect": "Allows the weapon to fire compatible grenades. Capacity depends on model.",
      "compatibility": {
        "requiredSlot": "underbarrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [
          "longarm",
          "rifle",
          "shotgun",
          "heavy_weapon"
        ],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Underbarrel slot; compatible grenade ammunition"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "grip",
    "label": "Grip",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Helps control recoil.",
    "tags": [
      "attachment",
      "underbarrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "underbarrel",
      "effect": "Helps control recoil.",
      "compatibility": {
        "requiredSlot": "underbarrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "tac_light",
    "label": "Tac-Light",
    "aliases": [],
    "category": "attachments",
    "subcategory": "weapon_attachment",
    "scale": "personal",
    "description": "Illuminates a nearby area or target lane.",
    "tags": [
      "attachment",
      "underbarrel"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "attachment",
      "slot": "underbarrel",
      "effect": "Illuminates a nearby area or target lane.",
      "compatibility": {
        "requiredSlot": "underbarrel",
        "requiredWeaponTags": [],
        "anyWeaponTags": [],
        "forbiddenWeaponTags": [],
        "allowedWeaponIds": [],
        "forbiddenWeaponIds": [],
        "recommendationOnly": false
      },
      "sourceCompatibilityText": "Matching slot required"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "assorted_tools",
    "label": "Assorted Tools",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool Kit / Industrial Utility",
    "scale": "personal",
    "description": "A basic set of practical hand tools: wrenches, spanners, screwdrivers, pliers, clamps, measuring tools, fastener kits, and other general-use maintenance gear.",
    "tags": [
      "Blunt Force"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "breaching_collar",
    "label": "Breaching Collar",
    "aliases": [],
    "category": "tools",
    "subcategory": "Special / Boarding Tool",
    "scale": "squad_support",
    "description": "A portable sealing frame used to cut into pressurized ships, stations, vehicles, and sealed structures without causing immediate uncontrolled decompression.",
    "tags": [
      "Breaching",
      "Micro-Airlock",
      "Seal",
      "Setup",
      "Boarding",
      "Industrial",
      "Forced Entry"
    ],
    "access": "Commercial Restricted / MilSpec / Salvage Professional",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "breaching_frame",
    "label": "Breaching Frame",
    "aliases": [],
    "category": "tools",
    "subcategory": "Special / Boarding Tool",
    "scale": "squad_support",
    "description": "A larger, heavier version of the breaching collar.",
    "tags": [
      "Breaching",
      "Seal",
      "Micro-Airlock",
      "Setup",
      "Boarding",
      "Industrial",
      "Squad Entry"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "cargo_net_load_restraint_kit",
    "label": "Cargo Net / Load Restraint Kit",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Load Restraint / Field Utility",
    "scale": "personal",
    "description": "A bundle of cargo nets, restraint straps, magnetic tie-downs, smart buckles, load hooks, and compression webbing.",
    "tags": [
      "Tool",
      "Cargo Control",
      "Load Restraint",
      "Anchoring",
      "Shipboard",
      "Salvage",
      "Utility"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "chemlights",
    "label": "Chemlights",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Disposable Light / Route Marker",
    "scale": "personal",
    "description": "Chemlights are disposable chemical light sticks used for marking routes, identifying hazards, signaling, low-light navigation, tagging cleared rooms, and leaving visible trail markers.",
    "tags": [],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "cutter_clamp",
    "label": "Cutter Clamp",
    "aliases": [],
    "category": "tools",
    "subcategory": "Special / Breaching Accessory",
    "scale": "personal",
    "description": "A clamp-mounted cutting guide for laser cutters, plasma torches, or saws.",
    "tags": [
      "Breaching",
      "Cutting",
      "Guided Tool",
      "Setup",
      "Industrial"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "cutting_torch",
    "label": "Cutting Torch",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Industrial Cutter",
    "scale": "personal",
    "description": "A portable torch used to cut locks, bars, bolts, restraints, panels, vents, light doors, and damaged structural material.",
    "tags": [
      "Fire/Explosive",
      "Bleeding"
    ],
    "access": "Common to Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "electronic_tool_set",
    "label": "Electronic Tool Set",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool Kit / Electronics",
    "scale": "personal",
    "description": "A full set of precision tools for detailed repair, diagnostics, construction, and modification of electronic systems.",
    "tags": [
      "Tool",
      "Electronics",
      "Repair",
      "Construction",
      "Technical",
      "Specialized"
    ],
    "access": "Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "emergency_sealant_kit",
    "label": "Emergency Sealant Kit",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Emergency Repair / Hull Patch",
    "scale": "personal",
    "description": "A compact emergency repair kit containing pressure patches, expanding sealant foam, adhesive plating, quick-cure hull tape, clamp strips, and emergency gasket material.",
    "tags": [
      "Tool",
      "Sealant",
      "Hull Patch",
      "Pressure Patch",
      "Emergency Repair",
      "Shipboard",
      "Utility"
    ],
    "access": "Common aboard ships and stations",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "entrenching_tool",
    "label": "Entrenching Tool",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Field Shovel / Improvised Weapon",
    "scale": "personal",
    "description": "A compact folding shovel used for digging, scraping, trenching, burying, clearing debris, preparing camp, collecting samples, making fire pits, and field survival work.",
    "tags": [
      "Blunt Force",
      "Bleeding"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "exoloader",
    "label": "ExoLoader",
    "aliases": [],
    "category": "tools",
    "subcategory": "Industrial Exoskeleton / Heavy Loader",
    "scale": "personal_supported",
    "description": "An open-frame mechanical exoskeleton designed for heavy lifting, cargo movement, loading operations, construction work, and industrial handling.",
    "tags": [],
    "access": "Commercial / Industrial Site Equipment",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "explosives_and_detonator",
    "label": "Explosives & Detonator",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Demolition Charge",
    "scale": "squad_support",
    "description": "A prepared explosive charge with a compatible detonator, powerful enough to breach heavy doors, blast open an airlock, destroy machinery, or collapse vulnerable structures.",
    "tags": [
      "Tool",
      "Explosive",
      "Demolition",
      "Breaching",
      "Remote Detonator",
      "Radio Trigger",
      "Hazardous",
      "Loud"
    ],
    "access": "Restricted",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "field_fabricator_parts_printer",
    "label": "Field Fabricator / Parts Printer",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Portable Fabricator / Repair Support",
    "scale": "personal",
    "description": "A rugged field fabricator used to print or machine small replacement parts from material feedstock.",
    "tags": [
      "Tool",
      "Fabrication",
      "Parts Printer",
      "Repair",
      "Feedstock",
      "Technical",
      "Utility"
    ],
    "access": "Commercial / Industrial / Corporate",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "flashlight",
    "label": "Flashlight",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Illumination",
    "scale": "personal",
    "description": "A handheld or shoulder-mounted light source used for navigation, search, repair, and combat visibility.",
    "tags": [
      "Tool",
      "Light",
      "Utility",
      "Handheld",
      "Shoulder Mount"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "grapple_launcher",
    "label": "Grapple Launcher",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Mobility Launcher",
    "scale": "personal",
    "description": "A compact launcher that fires a grappling hook, smart anchor, magnetic clamp, or spike tether to a distant surface.",
    "tags": [
      "Tool",
      "Grapple",
      "Climbing",
      "Tether",
      "Mobility",
      "Rescue",
      "Launcher"
    ],
    "access": "Commercial to Restricted depending model",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "industrial_saw_rescue_saw",
    "label": "Industrial Saw / Rescue Saw",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Powered Saw / Rescue Cutter",
    "scale": "personal",
    "description": "A rugged powered saw designed to cut wreckage, polymer panels, roots, bone, light bulkheads, vehicle panels, cargo containers, and collapsed structures.",
    "tags": [
      "Bleeding",
      "Gore/Massive"
    ],
    "access": "Commercial / Rescue / Industrial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "magnetic_boots",
    "label": "Magnetic Boots",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Mobility Gear",
    "scale": "personal",
    "description": "Magnetic Boots allow the wearer to grip ferrous metal surfaces, ship hulls, station exteriors, metal-based asteroids, docking frames, and other compatible surfaces.",
    "tags": [
      "Tool",
      "Magnetic",
      "Zero-G",
      "Shipboard",
      "Surface Grip",
      "Mobility"
    ],
    "access": "Common aboard ships and stations",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "marker_tape",
    "label": "Marker Tape",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Route Marker / Field Utility",
    "scale": "personal",
    "description": "Bright adhesive tape, reflective strips, glow markers, or peel-off hazard tags used to mark routes, rooms, doors, samples, bodies, hazards, extraction paths, and searched areas.",
    "tags": [
      "Tool",
      "Marker",
      "Route Marking",
      "Hazard Marking",
      "Utility",
      "Disposable"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_plate_kit",
    "label": "Patch Plate Kit",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Hull Patch / Structural Brace",
    "scale": "squad_support",
    "description": "A rugged emergency repair kit containing magnetic patch plates, clamp braces, rivet strips, expanding gasket rope, pressure tape, and quick-lock hull anchors.",
    "tags": [
      "Tool",
      "Repair",
      "Hull Patch",
      "Structural Brace",
      "Seal",
      "Shipboard",
      "Emergency Repair"
    ],
    "access": "Common aboard ships, stations, salvage rigs, and industrial sites",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_air_pump_pressure_equalizer",
    "label": "Portable Air Pump / Pressure Equalizer",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Air Pump / Pressure Management",
    "scale": "personal",
    "description": "A deployable pump and regulator used to move, vent, pressurize, depressurize, or equalize atmosphere in small spaces.",
    "tags": [
      "Tool",
      "Air Pump",
      "Pressure Equalizer",
      "Environmental Control",
      "Shipboard",
      "Breaching Support",
      "Hazard Control"
    ],
    "access": "Commercial / Shipboard",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_floodlight",
    "label": "Portable Floodlight",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Deployable Illumination",
    "scale": "personal",
    "description": "A portable high-output light used to illuminate rooms, work sites, landing zones, tunnels, crash sites, dig areas, or defensive perimeters.",
    "tags": [
      "Tool",
      "Light",
      "Deployable",
      "Area Illumination",
      "Power",
      "Utility"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_power_cell",
    "label": "Portable Power Cell",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Portable Power Supply",
    "scale": "personal",
    "description": "A rugged field battery used to recharge or power drones, lights, scanners, comms, suits, terminals, tools, and small powered systems.",
    "tags": [
      "Tool",
      "Battery",
      "Power",
      "Recharge",
      "Utility",
      "Hazardous"
    ],
    "access": "Common to Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_winch_come_along",
    "label": "Portable Winch / Come-Along",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Mechanical Puller / Recovery Gear",
    "scale": "squad_support",
    "description": "A portable hand-cranked, powered, or ratcheting winch used to pull, drag, recover, lift, or force heavy objects.",
    "tags": [
      "Tool",
      "Winch",
      "Recovery",
      "Heavy Pull",
      "Anchoring",
      "Salvage",
      "Utility"
    ],
    "access": "Common / Industrial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "rucksack",
    "label": "Rucksack",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Storage",
    "scale": "personal",
    "description": "A large, durable, waterproof backpack designed for field operations, travel, salvage, military patrols, and expedition work.",
    "tags": [
      "Tool",
      "Storage",
      "Waterproof",
      "Durable",
      "Field Gear"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "salvage_drone",
    "label": "Salvage Drone",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Remote Drone / Industrial Support",
    "scale": "personal",
    "description": "A remote-controlled salvage drone used for inspection, retrieval, scouting, light lifting, and hazardous access work.",
    "tags": [
      "Tool",
      "Drone",
      "Remote Operated",
      "Salvage",
      "Camera",
      "Transmission",
      "Battery",
      "Cargo Lift",
      "Optional: Laser Cutter"
    ],
    "access": "Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "sealant_shroud",
    "label": "Sealant Shroud",
    "aliases": [],
    "category": "tools",
    "subcategory": "Special / Emergency Breaching Tool",
    "scale": "personal",
    "description": "A flexible emergency version of the breaching collar.",
    "tags": [
      "Breaching",
      "Seal",
      "Emergency Repair",
      "Flexible",
      "Rescue"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "survey_kit",
    "label": "Survey Kit",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool Kit / Exploration / Field Science",
    "scale": "personal",
    "description": "A compact field survey kit used for planetary exploration, colony scouting, environmental checks, and terrain assessment.",
    "tags": [
      "Tool",
      "Survey",
      "Mapping",
      "Atmospheric Testing",
      "Gravity Testing",
      "Field Science",
      "Exploration",
      "Sensor"
    ],
    "access": "Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "tether_kit",
    "label": "Tether Kit",
    "aliases": [],
    "category": "tools",
    "subcategory": "Tool / Field Utility / Rescue Gear",
    "scale": "squad_support",
    "description": "A compact kit of high-strength rope, smart cable, clamps, carabiners, anchor spikes, quick-lock hooks, and harness connectors.",
    "tags": [
      "Tool",
      "Tether",
      "Climbing",
      "Rescue",
      "Anchoring",
      "Zero-G",
      "Utility"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "automed",
    "label": "Automed",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Consumable Nanotech",
    "scale": "personal",
    "description": "Automed capsules contain short-lived medical nanotech and biochemical repair agents designed to assist the body's own recovery systems.",
    "tags": [
      "Consumable",
      "Medical",
      "Nanotech",
      "Recovery",
      "Disease",
      "Poison",
      "Stress Reduction"
    ],
    "access": "Medical / Commercial Restricted / Corporate",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "camping_gear",
    "label": "Camping Gear",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "medical_or_survival",
    "scale": "personal",
    "description": "Tent, canteen, stove, backpack, sleeping bag.",
    "tags": [],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "climbing_harness",
    "label": "Climbing Harness",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Tool / Mobility Gear / Rescue Gear",
    "scale": "personal",
    "description": "A field harness with reinforced attachment points for rope, tethers, rescue hooks, cargo clips, and evacuation lines.",
    "tags": [
      "Tool",
      "Harness",
      "Climbing",
      "Rescue",
      "Tether Compatible",
      "Fall Protection",
      "CASEVAC"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "decontamination_kit",
    "label": "Decontamination Kit",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical and Survival Tool / Decontamination",
    "scale": "squad_support",
    "description": "A field decontamination kit containing neutralizer wipes, spray bottles, disposable gloves, sealable waste pouches, filter masks, contamination tags, absorbent pads, and emergency rinse packs.",
    "tags": [
      "Tool",
      "Medical",
      "Decontamination",
      "Hazard Control",
      "Biohazard",
      "Chemical",
      "Containment"
    ],
    "access": "Medical / Industrial / Rescue / Military",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "fire_extinguisher",
    "label": "Fire Extinguisher",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Tool / Fire Suppression",
    "scale": "personal",
    "description": "A compact extinguisher or suppressant canister used to put out small fires, suppress burning gear, reduce smoke spread, or prevent an equipment fire from becoming a shipboard disaster.",
    "tags": [
      "Tool",
      "Fire Suppression",
      "Shipboard",
      "Emergency",
      "Hazard Control"
    ],
    "access": "Common aboard ships, stations, vehicles, habitats, and industrial sites",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "first_aid_kit",
    "label": "First Aid Kit",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "medical_or_survival",
    "scale": "personal",
    "description": "+10% to bandage wounds and stop bleeding.",
    "tags": [],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "foldable_stretcher",
    "label": "Foldable Stretcher",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Patient Transport",
    "scale": "squad_support",
    "description": "A compact foldable stretcher designed for field evacuation and patient transport.",
    "tags": [
      "Tool",
      "Medical",
      "Patient Transport",
      "Foldable",
      "Rucksack Portable",
      "Stabilization",
      "CASEVAC"
    ],
    "access": "Common medical, rescue, and field operations equipment",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "hardpoint_casevac_stretcher",
    "label": "Hardpoint CASEVAC Stretcher",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Patient Transport / Armored CASEVAC",
    "scale": "squad_support",
    "description": "Some military or rescue models are reinforced for extraction under fire.",
    "tags": [
      "Armored",
      "Hardpoint Carry",
      "CASEVAC",
      "Patient Shielding"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "medpack_drug_kit",
    "label": "Medpack / Drug Kit",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Drug Kit",
    "scale": "personal",
    "description": "A compact medical drug kit containing painkillers, antibiotics, anti-rads, stimulants, sedatives, anti-toxins, antiemetics, hydration salts, and emergency injectors.",
    "tags": [
      "Tool",
      "Medical",
      "Drug Kit",
      "Pharmacology",
      "Pain Control",
      "Anti-Toxin",
      "Restricted"
    ],
    "access": "Medical / Restricted depending contents",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "mohab_unit",
    "label": "MoHab Unit",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical / Survival Shelter / Mobile Habitat",
    "scale": "squad_support",
    "description": "A MoHab Unit, or Mobile Habitat Unit, is a compact field survival package designed to create a basic rest site in hostile or undeveloped environments.",
    "tags": [
      "Tool",
      "Medical",
      "Survival",
      "Shelter",
      "Rest",
      "Comfort",
      "Field Camp",
      "Expedition"
    ],
    "access": "Commercial / Expeditionary",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "mre",
    "label": "MRE",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Survival Tool / Ration",
    "scale": "personal",
    "description": "MREs are shelf-stable field meals used by marines, security teams, survey crews, colonists, miners, and anyone operating away from proper food supply.",
    "tags": [
      "Consumable",
      "Food",
      "Survival",
      "Ration",
      "Shelf-Stable"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "oxygen_tank",
    "label": "Oxygen Tank",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical / EVA Support / Life Support",
    "scale": "personal",
    "description": "A portable oxygen tank compatible with vaccsuits and other life-support systems.",
    "tags": [
      "Tool",
      "Medical",
      "O2",
      "Life Support",
      "EVA",
      "Pressurized",
      "Explosive",
      "Hazardous"
    ],
    "access": "Common aboard ships, stations, EVA lockers, rescue kits, and med bays",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "pain_pills",
    "label": "Pain Pills",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Pain Management",
    "scale": "personal",
    "description": "Pain pills reduce pain, panic, tremors, and physical distress.",
    "tags": [
      "Consumable",
      "Medical",
      "Painkiller",
      "Stress Reduction",
      "Impairing",
      "Addictive"
    ],
    "access": "Common Medical / Restricted depending strength",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_iv_fluid_kit",
    "label": "Portable IV / Fluid Kit",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Fluid Support",
    "scale": "personal",
    "description": "A compact field kit containing IV lines, fluid bags, pressure infusers, electrolyte packs, blood substitute, sterile ports, and vascular access tools.",
    "tags": [
      "Tool",
      "Medical",
      "IV",
      "Fluid Support",
      "Stabilization",
      "Shock",
      "Emergency"
    ],
    "access": "Medical / Rescue / Shipboard",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_quarantine_hood",
    "label": "Portable Quarantine Hood",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Patient Isolation Hood",
    "scale": "personal",
    "description": "A collapsible isolation hood placed over a patient’s head and upper torso to reduce droplet spread, airborne contamination, or unknown respiratory exposure.",
    "tags": [
      "Tool",
      "Medical",
      "Quarantine",
      "Breathing Gear",
      "Biohazard",
      "Patient Isolation",
      "Containment"
    ],
    "access": "Medical / Shipboard / Rescue",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "quarantine_bag_body_bag",
    "label": "Quarantine Bag / Body Bag",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Body Containment / Biohazard Control",
    "scale": "personal",
    "description": "A sealable body or quarantine bag designed to contain corpses, infected crew, contaminated clothing, alien residue, or large biological samples too big for a Sample Case.",
    "tags": [
      "Tool",
      "Medical",
      "Containment",
      "Biohazard",
      "Body Bag",
      "Quarantine",
      "CASEVAC"
    ],
    "access": "Medical / Rescue / Shipboard",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "radiation_dosimeter_patch",
    "label": "Radiation Dosimeter Patch",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Radiation Exposure Monitor",
    "scale": "personal",
    "description": "A wearable patch, badge, or clip that tracks accumulated radiation exposure on a person.",
    "tags": [
      "Tool",
      "Medical",
      "Radiation",
      "Dosimeter",
      "Exposure Tracking",
      "Disposable",
      "Hazard Control"
    ],
    "access": "Common in industrial, medical, military, and shipboard environments",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "radiation_pills",
    "label": "Radiation Pills",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Radiation Countermeasure",
    "scale": "personal",
    "description": "Radiation pills are prophylactic and emergency medical countermeasures used before or shortly after radiation exposure.",
    "tags": [
      "Consumable",
      "Medical",
      "Radiation",
      "Countermeasure",
      "Exposure",
      "Preventative"
    ],
    "access": "Medical / Industrial / Shipboard / Military",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "rebreather",
    "label": "Rebreather",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical / Survival Breathing Gear",
    "scale": "personal",
    "description": "A compact breathing device that filters air and allows limited underwater operation.",
    "tags": [
      "Tool",
      "Medical",
      "Breathing Gear",
      "Filter",
      "Underwater",
      "Survival",
      "Compact"
    ],
    "access": "Commercial / Rescue / Expeditionary",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "sample_case",
    "label": "Sample Case",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Tool / Sample Storage / Containment",
    "scale": "personal",
    "description": "A sealed field case with sterile vials, swabs, sample tubes, cryo-packets, contamination sleeves, specimen bags, and small secure storage cells.",
    "tags": [
      "Tool",
      "Sample Storage",
      "Biohazard",
      "Containment",
      "Field Science",
      "Research"
    ],
    "access": "Commercial / Research Issue",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "water_filter",
    "label": "Water Filter",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Survival Tool / Water Filter",
    "scale": "personal",
    "description": "A compact field filtration system designed to make questionable water safer to drink.",
    "tags": [
      "Consumable",
      "Survival",
      "Water",
      "Filter",
      "Utility",
      "Field Gear"
    ],
    "access": "Common / Expeditionary",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "stimpack",
    "label": "StimPack",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Combat Drug / Emergency Enhancer",
    "scale": "personal",
    "description": "A StimPack is an emergency combat stimulant and trauma-response injector designed to keep a body moving after it should have stopped.",
    "tags": [],
    "access": "Restricted / MilSpec / Corporate Medical / Black Market",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "suit_medical_staunching_systems",
    "label": "Suit Medical Staunching Systems",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Suit System / Proactive Medical Stabilization",
    "scale": "personal",
    "description": "Some advanced suits include proactive medical staunching systems designed to keep the wearer alive and operational during combat.",
    "tags": [
      "Suit System",
      "Medical",
      "Auto-Staunching",
      "Wound Closure",
      "Disinfectant",
      "Nanowebbing",
      "Combat Stabilization"
    ],
    "access": "Advanced Armor / MilSpec / Corporate Security / Specialist EVA",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "thermal_blanket_emergency_cocoon",
    "label": "Thermal Blanket / Emergency Cocoon",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical and Survival Tool / Exposure Protection",
    "scale": "personal",
    "description": "A compact insulating blanket, thermal wrap, or emergency cocoon used to reduce heat loss, stabilize shock, protect exposed patients, and improve survival during extraction.",
    "tags": [
      "Tool",
      "Medical",
      "Survival",
      "Thermal",
      "Exposure Protection",
      "Shock",
      "CASEVAC"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trauma_kit",
    "label": "Trauma Kit",
    "aliases": [],
    "category": "medical_survival",
    "subcategory": "Medical Tool / Consumable Field Medical Kit",
    "scale": "squad_support",
    "description": "A robust field-service medical kit containing bandages, wound sealant, disinfectants, trauma foam, clotting agents, injectors, splints, surgical tools, pain management, airway tools, pressure dressings, and emergency stabilization supplies.",
    "tags": [
      "Consumable",
      "Medical",
      "Trauma Care",
      "Bleeding Control",
      "Wound Treatment",
      "Stress Reduction",
      "Requires Training"
    ],
    "access": "Medical / Rescue / MilSpec / Shipboard",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "body_cam",
    "label": "Body Cam",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Recording Device",
    "scale": "personal",
    "description": "A compact camera worn on clothing, armor, helmet, or tactical webbing.",
    "tags": [
      "Tool",
      "MilSpec",
      "Camera",
      "Body Cam",
      "Transmission",
      "Comms",
      "Command Feed",
      "Evidence"
    ],
    "access": "Commercial Security / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "door_wedge_lock_bar_kit",
    "label": "Door Wedge / Lock Bar Kit",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Door Control",
    "scale": "personal",
    "description": "A compact kit of reinforced wedges, lock bars, magnetic blocks, hinge clamps, and access braces used to hold doors open, hold doors shut, or prevent automated movement.",
    "tags": [
      "Tool",
      "MilSpec",
      "Door Control",
      "Lock Bar",
      "Area Denial",
      "Security",
      "Entry"
    ],
    "access": "Common / Security / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "e_smoke_grenade",
    "label": "E-Smoke Grenade",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Tactical Grenade / Sensor Denial",
    "scale": "personal",
    "description": "An E-Smoke grenade disperses a dense cloud of obscuring smoke mixed with electromagnetic chaff and sensor-scrambling particulate.",
    "tags": [
      "Consumable",
      "Grenade",
      "Smoke",
      "E-Smoke",
      "Obscuring",
      "Sensor Scramble",
      "EM Chaff",
      "Area Denial",
      "Tactical"
    ],
    "access": "Restricted / MilSpec / Corporate Security",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "evidence_collection_kit",
    "label": "Evidence Collection Kit",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Evidence Handling",
    "scale": "personal",
    "description": "A compact kit containing sample bags, print lift film, tamper tags, chain-of-custody seals, evidence markers, swabs, disposable tools, labels, and portable documentation supplies.",
    "tags": [
      "Tool",
      "MilSpec",
      "Evidence",
      "Forensics",
      "Chain of Custody",
      "Sample Storage",
      "Investigation"
    ],
    "access": "Law Enforcement / Corporate Security / Research",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "flashbang_stun_charge",
    "label": "Flashbang / Stun Charge",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Stun Device",
    "scale": "personal",
    "description": "A tactical distraction charge that produces a blinding flash, concussive report, and sensory overload.",
    "tags": [
      "Less-Lethal",
      "Blunt Force"
    ],
    "access": "Restricted / Law Enforcement / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "heads_up_display",
    "label": "Heads-Up Display",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Tactical Interface",
    "scale": "personal",
    "description": "A tactical visual interface commonly used by marines, security response teams, and advanced combat units.",
    "tags": [
      "Tool",
      "MilSpec",
      "HUD",
      "Tac-Link",
      "Smart-Link",
      "Squad Feed",
      "Targeting",
      "Comms"
    ],
    "access": "MilSpec / Corporate Security / Restricted Civilian Tactical",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "infrared_goggles",
    "label": "Infrared Goggles",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Optics",
    "scale": "personal",
    "description": "Infrared Goggles allow the wearer to see heat signatures, warm bodies, hot machinery, recent footprints, engine heat, fired weapons, and other thermal traces.",
    "tags": [
      "Tool",
      "MilSpec",
      "Infrared",
      "Thermal Vision",
      "Optics",
      "Tracking",
      "Night Operations"
    ],
    "access": "Commercial Tactical / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "jetpack",
    "label": "Jetpack",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Mobility System",
    "scale": "personal",
    "description": "A fuel-operated personal flight system used for vertical movement, rapid repositioning, battlefield access, EVA maneuvering where appropriate, and hazardous terrain traversal.",
    "tags": [
      "Tool",
      "MilSpec",
      "Jetpack",
      "Flight",
      "Fuel",
      "Explosive",
      "Hazardous",
      "Mobility",
      "Cumbersome"
    ],
    "access": "Restricted / MilSpec / Corporate Rescue or Assault Issue",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "locator",
    "label": "Locator",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Tracking Beacon",
    "scale": "personal",
    "description": "A worn tracking beacon that allows crew members at a control center, command post, or ship bridge to monitor the wearer’s location.",
    "tags": [
      "Tool",
      "MilSpec",
      "Locator",
      "Tracking",
      "Beacon",
      "Comms",
      "Command Feed"
    ],
    "access": "Commercial Security / MilSpec / Expeditionary",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "lockpick_suite",
    "label": "Lockpick Suite",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Electronic Entry Kit",
    "scale": "personal",
    "description": "A highly advanced set of electronic intrusion tools designed to bypass basic airlocks, electronic doors, access panels, and commercial security locks.",
    "tags": [
      "Tool",
      "MilSpec",
      "Lockpick",
      "Electronic Entry",
      "Hacking",
      "Airlock",
      "Door Systems",
      "Security Bypass"
    ],
    "access": "Restricted / Security / Corporate Issue / Black Market",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_command_slate",
    "label": "Portable Command Slate",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Tactical Coordination Device",
    "scale": "personal",
    "description": "A rugged command slate used to monitor squad cams, locators, objectives, sensor pings, drone feeds, and tactical overlays.",
    "tags": [
      "Tool",
      "MilSpec",
      "Command Feed",
      "Tac-Link",
      "Squad Feed",
      "Comms",
      "Interface",
      "Coordination"
    ],
    "access": "Corporate Security / MilSpec / Restricted",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_computer_terminal",
    "label": "Portable Computer Terminal",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Computer Interface",
    "scale": "personal",
    "description": "A flat portable computer terminal with monitor, keyboard, interface ports, diagnostic software, and network access tools.",
    "tags": [
      "Tool",
      "MilSpec",
      "Computer",
      "Terminal",
      "Hacking",
      "Network Access",
      "Interface",
      "Portable",
      "Technical"
    ],
    "access": "Commercial Technical / MilSpec / Corporate Issue",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "restraints",
    "label": "Restraints",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "Tool / Security Gear / Capture Gear",
    "scale": "personal",
    "description": "Flex cuffs, magnetic cuffs, zip restraints, locking bands, or security ties used to restrain prisoners, suspects, infected crew, panicking civilians, captured targets, or compromised personnel.",
    "tags": [
      "Tool",
      "Security",
      "Restraint",
      "Capture",
      "Disposable",
      "Law Enforcement"
    ],
    "access": "Common to Restricted depending model",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "signal_scrambler_spoof_tag",
    "label": "Signal Scrambler / Spoof Tag",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Signal Spoofing Device",
    "scale": "personal",
    "description": "A compact signal device used to confuse locators, fake a tag identity, delay scanner handshakes, or throw off command feed.",
    "tags": [
      "Tool",
      "MilSpec",
      "Signal Spoofing",
      "Counter-Surveillance",
      "Tracking",
      "Electronic Warfare",
      "Deception"
    ],
    "access": "Restricted / Black Market / Corporate Security",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "tactical_breaching_shield",
    "label": "Tactical Breaching Shield",
    "aliases": [],
    "category": "security_tactical",
    "subcategory": "MilSpec Tool / Breaching Shield",
    "scale": "squad_support",
    "description": "A directional carried shield used during forced entry, hallway crossing, rescue movement, riot control, and close protection.",
    "tags": [
      "Tool",
      "MilSpec",
      "Shield",
      "Breaching",
      "Cover",
      "Entry",
      "Patient Shielding",
      "Cumbersome"
    ],
    "access": "Restricted / Law Enforcement / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "acoustic_sensor_contact_mic",
    "label": "Acoustic Sensor / Contact Mic",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Listening Device / Contact Microphone",
    "scale": "personal",
    "description": "A sensitive microphone or vibration sensor used to listen through walls, doors, hull plates, pipes, vents, and structural members.",
    "tags": [
      "Tool",
      "Sensor",
      "Acoustic",
      "Contact Mic",
      "Detection",
      "Recon",
      "Surveillance"
    ],
    "access": "Commercial Security / Rescue / MilSpec / Black Market",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "atmospheric_analyzer",
    "label": "Atmospheric Analyzer",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Atmosphere Scanner",
    "scale": "personal",
    "description": "A handheld scanner used to assess atmosphere composition, pressure, oxygen levels, flammability, toxic gases, corrosive vapors, and breathable safety.",
    "tags": [
      "Tool",
      "Scanner",
      "Atmospheric Testing",
      "Chemical",
      "Environmental Analysis",
      "Hazard",
      "Detection"
    ],
    "access": "Commercial / Survey / Shipboard",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "binoculars",
    "label": "Binoculars",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Optics / Field Scanner",
    "scale": "personal",
    "description": "High-powered binoculars used for scouting, surveillance, navigation, target identification, and long-distance observation.",
    "tags": [
      "Tool",
      "Optics",
      "Magnification",
      "Field Gear",
      "Optional: Thermal Vision",
      "Optional: Night Vision"
    ],
    "access": "Common to Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "bioscanner",
    "label": "Bioscanner",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Life Sign Scanner",
    "scale": "personal",
    "description": "A Bioscanner detects biological life signs in the immediate area.",
    "tags": [
      "Tool",
      "Scanner",
      "Bioscanner",
      "Life Signs",
      "Detection",
      "Field Science"
    ],
    "access": "Commercial / Medical / Survey",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "chemical_sniffer",
    "label": "Chemical Sniffer",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Chemical Trace Scanner",
    "scale": "personal",
    "description": "A chemical trace scanner used to detect residue, vapor, contamination, propellant, explosives, narcotics, solvents, cleaning agents, decomposition gases, and industrial leaks.",
    "tags": [
      "Tool",
      "Scanner",
      "Chemical",
      "Trace Detection",
      "Forensics",
      "Hazard",
      "Detection"
    ],
    "access": "Security / Industrial / Survey / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "cybernetic_diagnostic_scanner",
    "label": "Cybernetic Diagnostic Scanner",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Cybernetic Scanner / Synthetic Diagnostic",
    "scale": "personal",
    "description": "A diagnostic scanner designed to identify, evaluate, and troubleshoot androids, cyborgs, cybernetic organisms, prosthetic systems, neural implants, and synthetic biological interfaces.",
    "tags": [
      "Tool",
      "Scanner",
      "Cybernetic",
      "Synthetic",
      "Diagnostics",
      "Locating",
      "Technical"
    ],
    "access": "Commercial Restricted / Corporate / Blacksite / Technical",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "data_tap_packet_sniffer",
    "label": "Data Tap / Packet Sniffer",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Data Tap / Network Sniffer",
    "scale": "personal",
    "description": "A small device clipped onto a cable, terminal line, door controller, camera feed, drone dock, or network port to monitor traffic without fully taking control of the system.",
    "tags": [
      "Tool",
      "Data Tap",
      "Packet Sniffer",
      "Network Access",
      "Interface",
      "Monitoring",
      "Technical"
    ],
    "access": "Technical / Security / Black Market",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "emergency_beacon",
    "label": "Emergency Beacon",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Emergency Signal Device",
    "scale": "personal",
    "description": "A small emergency device used to mark position and call for rescue.",
    "tags": [
      "Tool",
      "Beacon",
      "Emergency",
      "Signal",
      "Radio",
      "Flare",
      "Locator",
      "Rescue"
    ],
    "access": "Common aboard ships, stations, vehicles, rescue kits, and field packs",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "field_recorder",
    "label": "Field Recorder",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Field Science / Biological Survey",
    "scale": "personal",
    "description": "A field research device used to document, sample, and analyze alien flora, fauna, biological residue, and foreign materials.",
    "tags": [
      "Tool",
      "Field Recorder",
      "Field Science",
      "Research",
      "DNA Sampling",
      "Material Analysis",
      "Biology"
    ],
    "access": "Commercial / Research / Survey",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "geiger_counter",
    "label": "Geiger Counter",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Radiation Detector",
    "scale": "personal",
    "description": "A handheld radiation detector that measures and displays radiation levels.",
    "tags": [
      "Tool",
      "Scanner",
      "Radiation",
      "Detection",
      "Hazard",
      "Field Gear"
    ],
    "access": "Common to Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "long_range_communications",
    "label": "Long-Range Communications",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Communications System",
    "scale": "ship",
    "description": "A long-range communications package designed for ship-to-surface contact, expedition coordination, orbital support, remote base communication, and high-power transmissions across difficult environments.",
    "tags": [
      "Tool",
      "Comms",
      "Long-Range Comms",
      "Ship-to-Surface",
      "Transmission",
      "Command Feed"
    ],
    "access": "Commercial / Expeditionary / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "medscanner",
    "label": "Medscanner",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Medical Scanner",
    "scale": "personal",
    "description": "A medical scanner used to examine living or dead bodies without requiring immediate biopsy or autopsy.",
    "tags": [
      "Tool",
      "Medical",
      "Scanner",
      "Diagnostics",
      "Disease Detection",
      "Forensics",
      "Non-Invasive"
    ],
    "access": "Medical / Commercial / Research",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "motion_alarm",
    "label": "Motion Alarm",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Deployable Sensor",
    "scale": "personal",
    "description": "A small deployable motion sensor used to monitor corridors, vents, doors, campsites, blind approaches, cave mouths, stairwells, or perimeter lines.",
    "tags": [
      "Tool",
      "Sensor",
      "Motion Detection",
      "Alarm",
      "Perimeter",
      "Security",
      "Deployable"
    ],
    "access": "Common to Commercial",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "personal_blackbox_recorder",
    "label": "Personal Blackbox Recorder",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Personal Event Recorder",
    "scale": "personal",
    "description": "A rugged personal recorder that tracks vitals, position, audio, suit events, atmosphere warnings, trauma markers, and last-known telemetry.",
    "tags": [
      "Tool",
      "Recorder",
      "Telemetry",
      "Forensics",
      "Life Signs",
      "Evidence",
      "Personal Data"
    ],
    "access": "Commercial / Shipboard / MilSpec / Corporate",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "portable_lidar_mapper",
    "label": "Portable LIDAR Mapper",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / LIDAR Mapper / 3D Scanner",
    "scale": "personal",
    "description": "A portable light detection and ranging scanner used to build local 3D maps of corridors, caves, derelicts, ruins, facilities, and terrain.",
    "tags": [
      "Tool",
      "Scanner",
      "LIDAR",
      "Mapping",
      "Spatial Analysis",
      "Recon",
      "Detection"
    ],
    "access": "Survey / Industrial / Security / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "radio_jammer",
    "label": "Radio Jammer",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Electronic Warfare",
    "scale": "personal",
    "description": "A radio interference device that disrupts radio communication within its area of effect.",
    "tags": [
      "Tool",
      "Jammer",
      "Radio Jammer",
      "Electronic Warfare",
      "Signal Denial",
      "Comms Disruption",
      "Area Denial"
    ],
    "access": "Restricted / MilSpec / Black Market",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "recon_drone",
    "label": "Recon Drone",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Remote Drone / Reconnaissance",
    "scale": "personal",
    "description": "A remote-controlled reconnaissance drone designed for scouting, surveillance, mapping, overwatch, and remote sensor deployment.",
    "tags": [
      "Tool",
      "Drone",
      "Recon",
      "Remote Operated",
      "Camera",
      "Transmission",
      "Battery",
      "Sensor Platform",
      "Modular"
    ],
    "access": "Commercial / Survey / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "seismic_thumper_ground_sonar",
    "label": "Seismic Thumper / Ground Sonar",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Seismic Scanner / Ground Sonar",
    "scale": "personal",
    "description": "A deployable thumper and receiver system used to map voids, tunnels, buried structures, unstable ground, and heavy movement through terrain.",
    "tags": [
      "Tool",
      "Scanner",
      "Seismic",
      "Ground Sonar",
      "Mapping",
      "Subsurface",
      "Detection"
    ],
    "access": "Industrial / Survey / Mining / Military",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "short_range_communications",
    "label": "Short-Range Communications",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Communications System",
    "scale": "personal",
    "description": "A compact communications system used for local operations, surface teams, convoy coordination, ship-to-ship contact, and field command.",
    "tags": [
      "Tool",
      "Comms",
      "Short-Range Comms",
      "Surface Comms",
      "Ship-to-Ship",
      "Transmission"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "signal_analyzer",
    "label": "Signal Analyzer",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Signal Detection and Analysis",
    "scale": "personal",
    "description": "A passive signal analysis device used to detect, classify, and direction-find active transmissions.",
    "tags": [
      "Tool",
      "Scanner",
      "Signal Analysis",
      "Comms",
      "Detection",
      "Electronic Warfare",
      "Technical"
    ],
    "access": "Commercial Technical / MilSpec / Corporate",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "signal_flare",
    "label": "Signal Flare",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Emergency Signal / Light Source",
    "scale": "personal",
    "description": "A handheld flare used to signal aircraft, mark extraction zones, illuminate an area, frighten animals, start fires, or identify a location in bad visibility.",
    "tags": [
      "Tool",
      "Signal",
      "Flare",
      "Light",
      "Emergency",
      "Ignition",
      "Disposable"
    ],
    "access": "Common",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "signal_relay_node",
    "label": "Signal Relay Node",
    "aliases": [],
    "category": "sensors_communications",
    "subcategory": "Tool / Communications Relay",
    "scale": "personal",
    "description": "A deployable relay used to extend radio range, route signals around terrain, maintain drone links, or keep ship-to-surface communication alive in difficult environments.",
    "tags": [
      "Tool",
      "Comms",
      "Signal Relay",
      "Beacon",
      "Network Support",
      "Deployable"
    ],
    "access": "Commercial / Expeditionary / MilSpec",
    "relevantSkills": [],
    "suggestedGearSources": [],
    "profile": {
      "kind": "equipment"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_00",
    "label": "Preserved Insectile Aberration",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "00"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_01",
    "label": "Faded Green Poker Chip",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "01"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_02",
    "label": "Antique Company Script (Asteroid Mine)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "02"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_03",
    "label": "Dessicated Husk Doll",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "03"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_04",
    "label": "Alien Pressed Flower (common)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "04"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_05",
    "label": "Necklace of Shell Casings",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "05"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_06",
    "label": "Corroded Android Logic Core",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "06"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_07",
    "label": "Pamphlet: Signs of Parasitical Infection",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "07"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_08",
    "label": "Manual: Treat Your Rifle Like A Lady",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "08"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_09",
    "label": "Bone Knife",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "09"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_10",
    "label": "Calendar: Alien Pin-Up Art",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "10"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_11",
    "label": "Dog Tags (Heirloom)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "11"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_12",
    "label": "Holographic Serpentine Dancer",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "12"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_13",
    "label": "Snake Whiskey",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "13"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_14",
    "label": "Medical Container, Purple Powder",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "14"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_15",
    "label": "Pills: Male Enhancement, Shoddy",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "15"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_16",
    "label": "Casino Playing Cards",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "16"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_17",
    "label": "Lagomorph Foot",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "17"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_18",
    "label": "Moonstone Ring",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "18"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_19",
    "label": "Manual: Mining Safety and You",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "19"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_20",
    "label": "Pamphlet: Against Human Simulacrum",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "20"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_21",
    "label": "Animal Skull, 3 Eyes, Curled Horns",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "21"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_22",
    "label": "Bartender’s Certification (Expired)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "22"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_23",
    "label": "Bent Wrench",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "23"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_24",
    "label": "Prospecting Mug, Dented",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "24"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_25",
    "label": "Eerie Mask",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "25"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_26",
    "label": "Vantablack Marble",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "26"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_27",
    "label": "Ivory Dice",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "27"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_28",
    "label": "Tarot Cards, Worn, Pyrite Gilded edges",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "28"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_29",
    "label": "Bag of Assorted Teeth",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "29"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_30",
    "label": "Ashes (A Relative)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "30"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_31",
    "label": "DNR Beacon Necklace",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "31"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_32",
    "label": "Cigarettes (Grinning Skull)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "32"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_33",
    "label": "Pills: Areca Nut",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "33"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_34",
    "label": "Rejected Application (Colony Ship)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "34"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_35",
    "label": "Pamphlet: Android Overlords",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "35"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_36",
    "label": "Smut (Seditious): The Captain, Ordered",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "36"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_37",
    "label": "Key (Childhood Home)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "37"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_38",
    "label": "Manual: Panic: Harbinger of Catastrophe",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "38"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_39",
    "label": "Token: “Is Your Morale Improving?”",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "39"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_40",
    "label": "Phosphorescent Sticks, Neon",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "40"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_41",
    "label": "Pamphlet: The Indifferent Stars",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "41"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_42",
    "label": "Calendar: Military Battles",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "42"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_43",
    "label": "Manual: Rich Captain, Poor Captain",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "43"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_44",
    "label": "Campaign Poster (Home Planet)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "44"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_45",
    "label": "Pendant: Shell Fragments Suspended in Plastic",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "45"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_46",
    "label": "Titanium Toothpick",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "46"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_47",
    "label": "Gloves, Leather (Xenomorph Hide)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "47"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_48",
    "label": "Pamphlet: Zen and the Art of Cargo Arrangement",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "48"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_49",
    "label": "Pictorial Pornography, Dogeared, Well Thumbed",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "49"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_50",
    "label": "Brass Knuckles",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "50"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_51",
    "label": "Fuzzy Handcuffs",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "51"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_52",
    "label": "Journal of Grudges",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "52"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_53",
    "label": "Stylized Cigarette Case",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "53"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_54",
    "label": "Ball of Assorted Gauge Wire",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "54"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_55",
    "label": "Spanner",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "55"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_56",
    "label": "Switchblade, Ornamental",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "56"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_57",
    "label": "Powdered Xenomorph Horn",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "57"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_58",
    "label": "Bonsai Tree",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "58"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_59",
    "label": "Golf Club (Putter)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "59"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_60",
    "label": "Trilobite Fossil",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "60"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_61",
    "label": "Pamphlet: A Girl In Every Port",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "61"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_62",
    "label": "Patched Overalls, Personalized",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "62"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_63",
    "label": "Fleshy Thing Sealed in a Murky Jar",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "63"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_64",
    "label": "Spiked Bracelet",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "64"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_65",
    "label": "Harmonica",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "65"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_66",
    "label": "Manual: Spacefarer’s Almanac (out of date)",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "66"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_67",
    "label": "Faded Photograph, A Windswept Heath",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "67"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_68",
    "label": "Stress Ball reads: Zero Stress in Zero G",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "68"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_69",
    "label": "Manual: Moonshining With Gun Oil & Fuel",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "69"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_70",
    "label": "Gyroscope, Bent, Tin",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "70"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_71",
    "label": "Coffee Cup, Chipped, HAPPINESS IS MANDATORY",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "71"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_72",
    "label": "Darts, Magnetic",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "72"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_73",
    "label": "Spray Paint",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "73"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_74",
    "label": "Wanted Poster, Weathered",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "74"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_75",
    "label": "Locket, Hair Braid",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "75"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_76",
    "label": "Pick, Miniature",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "76"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_77",
    "label": "Blanket, Fire Retardant",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "77"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_78",
    "label": "Hooded Parka, Fleece-Lined",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "78"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_79",
    "label": "BB Gun",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "79"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_80",
    "label": "Flint Hatchet",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "80"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_81",
    "label": "Pendant: Two Astronauts form a Skull",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "81"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_82",
    "label": "Rubik's Cube",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "82"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_83",
    "label": "Manual: Survival: Eat Soup With a Knife",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "83"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_84",
    "label": "Sputnik Pin",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "84"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_85",
    "label": "Ushanka",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "85"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_86",
    "label": "Trucker Cap, Mesh, Grey Alien Logo",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "86"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_87",
    "label": "Menthol Balm",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "87"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_88",
    "label": "Pith Helmet",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "88"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_89",
    "label": "10x10 Tarp",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "89"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_90",
    "label": "I Ching, Missing Sticks",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "90"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_91",
    "label": "Kukri",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "91"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_92",
    "label": "Trench Shovel",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "92"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_93",
    "label": "Shiv, Sharpened Butter Knife",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "93"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_94",
    "label": "Taxidermied Cat",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "94"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_95",
    "label": "Pamphlet: Interpreting Sheep Dreams",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "95"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_96",
    "label": "Pair of Shot Glasses, Spent Shotgun Shells",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "96"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_97",
    "label": "Opera Glasses",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "97"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_98",
    "label": "Pamphlet: The Relic of Flesh",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "98"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "trinket_99",
    "label": "Miniature Chess Set, Bone, Pieces Missing",
    "aliases": [],
    "category": "personal_effects",
    "subcategory": "trinket",
    "scale": "personal",
    "description": "A character identity object with no fixed numeric bonus.",
    "tags": [
      "personal_effect",
      "trinket"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "trinket",
      "d100": "99"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_00",
    "label": "“#1 Worker”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "00"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_01",
    "label": "Security Guard patch",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "01"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_02",
    "label": "Blood Type (Reference Patch)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "02"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_03",
    "label": "Red Shirt Logo",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "03"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_04",
    "label": "“Don’t Run You’ll Only Die Tired” Backpatch",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "04"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_05",
    "label": "Poker Hand: Dead Mans Hand",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "05"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_06",
    "label": "Biohazard Symbol",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "06"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_07",
    "label": "Mr. Yuck",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "07"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_08",
    "label": "Nuclear Symbol",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "08"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_09",
    "label": "“Eat The Rich”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "09"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_10",
    "label": "“Be Sure: Doubletap”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "10"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_11",
    "label": "Flame Emoji",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "11"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_12",
    "label": "Smiley Face (Glow in the Dark)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "12"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_13",
    "label": "“Smile: Big Brother is Watching”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "13"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_14",
    "label": "Jolly Roger",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "14"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_15",
    "label": "Viking Skull",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "15"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_16",
    "label": "“APEX PREDATOR” (Sabertooth Skull)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "16"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_17",
    "label": "Pin-Up (Ace of Spades)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "17"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_18",
    "label": "Queen of Hearts",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "18"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_19",
    "label": "Pin-Up (Mechanic)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "19"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_20",
    "label": "BOHICA",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "20"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_21",
    "label": "Front Towards Enemy (Claymore Mine)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "21"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_22",
    "label": "Pin-Up (Riding Missile)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "22"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_23",
    "label": "FUBAR",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "23"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_24",
    "label": "“I’m A (Love) Machine”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "24"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_25",
    "label": "Medic Patch (Skull and Crossbones on Logo)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "25"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_26",
    "label": "HELLO MY NAME IS:",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "26"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_27",
    "label": "“Powered By Coffee”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "27"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_28",
    "label": "“Take Me To Your Leader” (UFO)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "28"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_29",
    "label": "“DO YOUR JOB”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "29"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_30",
    "label": "“Take My Life (Please)”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "30"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_31",
    "label": "“All Out of Fucks To Give” (Astronaut with Turned Out Pockets)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "31"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_32",
    "label": "Allergic To Bullshit (Medical Style Patch)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "32"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_33",
    "label": "“Fix Me First” (Caduceus)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "33"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_34",
    "label": "“Upstanding Citizen”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "34"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_35",
    "label": "NASA Logo",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "35"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_36",
    "label": "“Cowboy Up” (Crossed Revolvers)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "36"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_37",
    "label": "Dove in Crosshairs",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "37"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_38",
    "label": "Chibi Cthulhu",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "38"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_39",
    "label": "“Welcome to the DANGER ZONE”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "39"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_40",
    "label": "Skull and Crossed Wrenches",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "40"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_41",
    "label": "Pin-Up (Succubus)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "41"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_42",
    "label": "“DILLIGAF?”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "42"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_43",
    "label": "“DRINK / FIGHT / FUCK”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "43"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_44",
    "label": "“Work Hard / Party Harder”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "44"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_45",
    "label": "Mudflap Girl",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "45"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_46",
    "label": "Fun Meter (reading: bad time)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "46"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_47",
    "label": "“GAME OVER” (Bride & Groom)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "47"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_48",
    "label": "Heart",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "48"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_49",
    "label": "“IMPROVE / ADAPT / OVERCOME”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "49"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_50",
    "label": "“SUCK IT UP”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "50"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_51",
    "label": "HMFIC",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "51"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_52",
    "label": "“Troubleshooter”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "52"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_53",
    "label": "“IF I’M RUNNING KEEP UP” Backpatch",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "53"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_54",
    "label": "Crossed Hammers with Wings",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "54"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_55",
    "label": "“Keep Well Lubricated”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "55"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_56",
    "label": "Soviet Hammer & Sickle",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "56"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_57",
    "label": "“Plays Well With Others”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "57"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_58",
    "label": "“Live Free and Die”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "58"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_59",
    "label": "Pin-Up (Nurse): “The Louder You Scream the Faster I Come”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "59"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_60",
    "label": "“Meat Bag”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "60"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_61",
    "label": "“I Am Not A Robot”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "61"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_62",
    "label": "Red Gear",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "62"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_63",
    "label": "“I Can’t Fix Stupid”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "63"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_64",
    "label": "“Space IS My Home” (Sad Astronaut)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "64"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_65",
    "label": "All Seeing Eye",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "65"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_66",
    "label": "“Do I LOOK Like An Expert”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "66"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_67",
    "label": "“NOMAD”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "67"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_68",
    "label": "“I’m Not A Rocket Scientist / But You’re An Idiot”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "68"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_69",
    "label": "“LONER”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "69"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_70",
    "label": "“I Am My Brothers Keeper”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "70"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_71",
    "label": "“Mama Tried”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "71"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_72",
    "label": "Black Widow Spider",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "72"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_73",
    "label": "“My Other Ride Married You”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "73"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_74",
    "label": "“One Size Fits All” (Grenade)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "74"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_75",
    "label": "Grim Reaper Backpatch",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "75"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_76",
    "label": "трахаться (Get Fucked, Russian)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "76"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_77",
    "label": "“Smooth Operator”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "77"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_78",
    "label": "Atom Symbol",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "78"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_79",
    "label": "“For Science!”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "79"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_80",
    "label": "“Actually, I Am A Rocket Scientist”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "80"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_81",
    "label": "“Help Wanted”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "81"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_82",
    "label": "Princess",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "82"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_83",
    "label": "“I Like My Tools Clean / And My Lovers Dirty”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "83"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_84",
    "label": "“GOOD BOY”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "84"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_85",
    "label": "Dice (Snake Eyes)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "85"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_86",
    "label": "“Travel To Distant Exotic Places / Meet Unusual Things / Get Eaten”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "86"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_87",
    "label": "“Good” (Brain)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "87"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_88",
    "label": "“Bad Bitch”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "88"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_89",
    "label": "“Too Pretty To Die”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "89"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_90",
    "label": "“Fuck Forever” (Roses)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "90"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_91",
    "label": "Icarus",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "91"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_92",
    "label": "“Girls Best Friend” (Diamond)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "92"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_93",
    "label": "Risk of Electrocution Symbol",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "93"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_94",
    "label": "Inverted Cross",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "94"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_95",
    "label": "“Do You Sign My Paychecks?” Backpatch",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "95"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_96",
    "label": "“I ♥ Myself”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "96"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_97",
    "label": "Double Cherry",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "97"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_98",
    "label": "“Volunteer”",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "98"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  },
  {
    "id": "patch_99",
    "label": "“Solve Et Coagula” (Baphomet)",
    "aliases": [],
    "category": "patches",
    "subcategory": "patch",
    "scale": "personal",
    "description": "A character identity patch that may be attached to clothing or gear.",
    "tags": [
      "personal_effect",
      "patch"
    ],
    "relevantSkills": [],
    "suggestedGearSources": [
      "personal_keepsake"
    ],
    "profile": {
      "kind": "patch",
      "d100": "99"
    },
    "sourceProvenance": [
      "CANONICAL_PERSONAL_EQUIPMENT_CATALOG.md"
    ]
  }
];

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach(deepFreeze);
  return value;
}

export const PERSONAL_EQUIPMENT = deepFreeze(RAW_PERSONAL_EQUIPMENT);

const equipmentMap = new Map(PERSONAL_EQUIPMENT.map((entry) => [entry.id, entry]));

export function getPersonalEquipment(id) {
  return equipmentMap.get(id) ?? null;
}

export function listPersonalEquipment({
  category = null,
  subcategory = null,
  scale = null,
  tag = null,
  search = "",
  includeIdentityItems = true,
} = {}) {
  const needle = String(search ?? "").trim().toLowerCase();
  return PERSONAL_EQUIPMENT.filter((entry) => {
    if (category && entry.category !== category) return false;
    if (subcategory && entry.subcategory !== subcategory) return false;
    if (scale && entry.scale !== scale) return false;
    if (tag && !(entry.tags ?? []).includes(tag)) return false;
    if (!includeIdentityItems && ["personal_effects", "patches"].includes(entry.category)) return false;
    if (!needle) return true;
    const haystack = [entry.id, entry.label, entry.description, ...(entry.aliases ?? []), ...(entry.tags ?? [])]
      .join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export function listWeapons() {
  return listPersonalEquipment({ category: "weapons" });
}

export function listWeaponAttachments() {
  return listPersonalEquipment({ category: "attachments" });
}

export function listAmmunition() {
  return listPersonalEquipment({ category: "ammunition" });
}

export function getCompatibleAttachments(weaponOrId, { includeOccupied = false } = {}) {
  const weapon = typeof weaponOrId === "string" ? getPersonalEquipment(weaponOrId) : weaponOrId;
  if (!weapon || weapon.category !== "weapons") return [];
  const slots = new Set(weapon.profile?.attachmentSlots ?? []);
  const occupied = new Set((weapon.profile?.integratedAttachments ?? []).map((entry) => entry.slot));
  return listWeaponAttachments().filter((attachment) => {
    const compatibility = attachment.profile?.compatibility ?? {};
    const slot = compatibility.requiredSlot ?? attachment.profile?.slot;
    if (!slots.has(slot)) return false;
    if (!includeOccupied && occupied.has(slot)) return false;
    return matchesWeaponCompatibility(weapon, compatibility);
  });
}

export function canInstallAttachment(weaponOrId, attachmentOrId, installedAttachmentIds = []) {
  const weapon = typeof weaponOrId === "string" ? getPersonalEquipment(weaponOrId) : weaponOrId;
  const attachment = typeof attachmentOrId === "string" ? getPersonalEquipment(attachmentOrId) : attachmentOrId;
  if (!weapon || weapon.category !== "weapons") return { allowed: false, reason: "Unknown weapon." };
  if (!attachment || attachment.category !== "attachments") return { allowed: false, reason: "Unknown attachment." };

  const compatibility = attachment.profile?.compatibility ?? {};
  const slot = compatibility.requiredSlot ?? attachment.profile?.slot;
  if (!(weapon.profile?.attachmentSlots ?? []).includes(slot)) {
    return { allowed: false, reason: `${weapon.label} does not provide a ${slot} slot.` };
  }
  if (!matchesWeaponCompatibility(weapon, compatibility)) {
    return { allowed: false, reason: `${attachment.label} is not compatible with ${weapon.label}.` };
  }

  const occupiedByIntegrated = (weapon.profile?.integratedAttachments ?? []).find((entry) => entry.slot === slot);
  if (occupiedByIntegrated) {
    return { allowed: false, reason: `${weapon.label}'s ${slot} slot is occupied by an integrated attachment.` };
  }

  const occupiedByInstalled = installedAttachmentIds
    .map(getPersonalEquipment)
    .find((entry) => entry?.profile?.slot === slot);
  if (occupiedByInstalled) {
    return { allowed: false, reason: `${weapon.label}'s ${slot} slot is already occupied.` };
  }

  return { allowed: true, reason: "Compatible." };
}

export function getCompatibleAmmunition(weaponOrId) {
  const weapon = typeof weaponOrId === "string" ? getPersonalEquipment(weaponOrId) : weaponOrId;
  if (!weapon || weapon.category !== "weapons") return [];
  const deliveryTypes = new Set(weapon.profile?.ammoDeliveryTypes ?? []);
  if (!deliveryTypes.size) return [];
  return listAmmunition().filter((ammo) => {
    const compatibility = ammo.profile ?? {};
    const ammoTypes = compatibility.deliveryTypes ?? [];
    if (!ammoTypes.some((type) => deliveryTypes.has(type))) return false;
    if ((compatibility.allowedWeaponIds ?? []).length && !compatibility.allowedWeaponIds.includes(weapon.id)) return false;
    if ((compatibility.forbiddenWeaponIds ?? []).includes(weapon.id)) return false;
    return true;
  });
}

export function validatePersonalEquipmentCatalog() {
  const errors = [];
  const seen = new Set();
  for (const entry of PERSONAL_EQUIPMENT) {
    if (!entry.id) errors.push("Equipment record is missing an id.");
    if (seen.has(entry.id)) errors.push(`Duplicate equipment id: ${entry.id}`);
    seen.add(entry.id);
    if (!PERSONAL_EQUIPMENT_CATEGORIES.includes(entry.category)) {
      errors.push(`${entry.id} has unknown category ${String(entry.category)}.`);
    }
    if (entry.category === "weapons") {
      for (const slot of entry.profile?.attachmentSlots ?? []) {
        if (!ATTACHMENT_SLOT_IDS.includes(slot)) errors.push(`${entry.id} has unknown attachment slot ${slot}.`);
      }
      for (const integrated of entry.profile?.integratedAttachments ?? []) {
        if (!(entry.profile?.attachmentSlots ?? []).includes(integrated.slot)) {
          errors.push(`${entry.id} has integrated ${integrated.attachmentId} without its ${integrated.slot} slot.`);
        }
        if (!equipmentMap.has(integrated.attachmentId)) {
          errors.push(`${entry.id} references missing integrated attachment ${integrated.attachmentId}.`);
        }
      }
    }
  }
  return Object.freeze({ valid: errors.length === 0, errors: Object.freeze(errors) });
}

function matchesWeaponCompatibility(weapon, compatibility) {
  const tags = new Set(weapon.tags ?? []);
  const required = compatibility.requiredWeaponTags ?? [];
  const any = compatibility.anyWeaponTags ?? [];
  const forbidden = compatibility.forbiddenWeaponTags ?? [];
  const allowedIds = compatibility.allowedWeaponIds ?? [];
  const forbiddenIds = compatibility.forbiddenWeaponIds ?? [];
  if (allowedIds.length && !allowedIds.includes(weapon.id)) return false;
  if (forbiddenIds.includes(weapon.id)) return false;
  if (!required.every((tag) => tags.has(tag))) return false;
  if (any.length && !any.some((tag) => tags.has(tag))) return false;
  if (forbidden.some((tag) => tags.has(tag))) return false;
  return true;
}
