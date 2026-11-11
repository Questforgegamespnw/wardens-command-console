/**
 * Warden Command Console
 * Career and Specialty gear recommendation registry.
 *
 * Recommendations are discovery guidance only. They never grant equipment,
 * impose a fixed loadout, enforce a budget, or represent Warden approval.
 * Every item reference resolves against personal-equipment.js.
 */

import {
  PERSONAL_EQUIPMENT,
  STARTING_GEAR_SOURCE_IDS,
  getPersonalEquipment,
} from "./personal-equipment.js";

export const CHARACTER_GEAR_RECOMMENDATIONS_VERSION = 1;

export const GEAR_RECOMMENDATION_DISPOSITIONS = Object.freeze([
  "commonly_issued",
  "recommended",
  "situational",
  "requires_authorization",
  "normally_ship_shared",
  "normally_personal_purchase",
]);

export const GEAR_RECOMMENDATION_ORIGIN_TYPES = Object.freeze([
  "career",
  "specialty",
  "focus",
]);

export const GEAR_RECOMMENDATION_SOURCE_HINTS = Object.freeze([
  "normally_personal_purchase",
  "normally_ship_shared",
]);

export const SPECIALTY_PARENT_CAREER_IDS = Object.freeze({
  "heavy_weapons": "marine",
  "eva_assault": "marine",
  "recon_pathfinder": "marine",
  "military_pilot": "marine",
  "combat_medic": "marine",
  "combat_engineer": "marine",
  "analyst": "scientist",
  "researcher": "scientist",
  "field_technician": "scientist",
  "applied_scientist": "scientist",
  "boatswain": "teamster",
  "heavy_operator": "teamster",
  "quartermaster": "teamster",
  "foreman": "teamster",
  "infrastructure_engineer": "teamster",
  "extraction_specialist": "teamster",
  "trauma_surgeon": "medical",
  "general_physician": "medical",
  "behavioral_health_specialist": "medical",
  "hazardous_exposure_specialist": "medical",
  "medical_investigator": "medical",
  "facility_station_security": "security",
  "asset_security": "security",
  "crisis_liaison": "security",
  "investigator": "security",
  "customs_inspector": "security",
  "counterintelligence": "security",
  "ambassador_envoy": "diplomat",
  "conflict_resolution_specialist": "diplomat",
  "broker": "diplomat",
  "administrator": "diplomat",
  "legal_representative": "diplomat"
} );

const RAW_CAREER_GEAR_RECOMMENDATIONS = {
  "marine": [
    {
      "itemId": "standard_battle_dress",
      "labelSnapshot": "Standard Battle Dress",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Baseline protection for dangerous operations."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Unit coordination in active operations."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Command feed, accountability, and incident record."
    },
    {
      "itemId": "heads_up_display",
      "labelSnapshot": "Heads-Up Display",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Smart-link, tactical awareness, and shared feeds."
    },
    {
      "itemId": "flashlight",
      "labelSnapshot": "Flashlight",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Basic low-light utility."
    },
    {
      "itemId": "first_aid_kit",
      "labelSnapshot": "First Aid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Immediate stabilization until medical support arrives."
    },
    {
      "itemId": "pistol",
      "labelSnapshot": "Pistol",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Compact defensive sidearm."
    },
    {
      "itemId": "pulse_rifle",
      "labelSnapshot": "Pulse Rifle",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Standard military longarm when the campaign supports armed deployment."
    },
    {
      "itemId": "frag_grenade",
      "labelSnapshot": "Frag Grenade",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Mission-specific explosive capability."
    },
    {
      "itemId": "restraints",
      "labelSnapshot": "Restraints",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Detention, transport, and control tasks."
    },
    {
      "itemId": "emergency_beacon",
      "labelSnapshot": "Emergency Beacon",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Recovery and location after separation or mission failure."
    }
  ],
  "scientist": [
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "General-purpose sample, observation, and research documentation."
    },
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Field analysis, records, models, and technical interfaces."
    },
    {
      "itemId": "sample_case",
      "labelSnapshot": "Sample Case",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Preserves specimens and evidence."
    },
    {
      "itemId": "bioscanner",
      "labelSnapshot": "Bioscanner",
      "disposition": "situational",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Locates biological activity during fieldwork."
    },
    {
      "itemId": "atmospheric_analyzer",
      "labelSnapshot": "Atmospheric Analyzer",
      "disposition": "situational",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Environmental assessment and expedition safety."
    },
    {
      "itemId": "survey_kit",
      "labelSnapshot": "Survey Kit",
      "disposition": "situational",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Broad planetary and site assessment."
    },
    {
      "itemId": "hazard_suit",
      "labelSnapshot": "Hazard Suit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Protection during contaminated or alien-environment research."
    },
    {
      "itemId": "flashlight",
      "labelSnapshot": "Flashlight",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Basic field utility."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Team coordination during field or laboratory work."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Preserves research history and incident evidence."
    }
  ],
  "teamster": [
    {
      "itemId": "assorted_tools",
      "labelSnapshot": "Assorted Tools",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "General repair and improvised maintenance."
    },
    {
      "itemId": "electronic_tool_set",
      "labelSnapshot": "Electronic Tool Set",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Detailed electronics repair and construction."
    },
    {
      "itemId": "flashlight",
      "labelSnapshot": "Flashlight",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Routine inspection and emergency work."
    },
    {
      "itemId": "crowbar",
      "labelSnapshot": "Crowbar",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Prying, access, lifting, and improvised leverage."
    },
    {
      "itemId": "tether_kit",
      "labelSnapshot": "Tether Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Safe work in unstable, elevated, or zero-g environments."
    },
    {
      "itemId": "magnetic_boots",
      "labelSnapshot": "Magnetic Boots",
      "disposition": "situational",
      "suggestedSources": [
        "ship_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Ship exterior and zero-g work."
    },
    {
      "itemId": "emergency_sealant_kit",
      "labelSnapshot": "Emergency Sealant Kit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "ship_issued",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Immediate response to leaks and punctures."
    },
    {
      "itemId": "portable_power_cell",
      "labelSnapshot": "Portable Power Cell",
      "disposition": "situational",
      "suggestedSources": [
        "ship_issued",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Field power for tools and damaged systems."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "ship_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Crew coordination during maintenance and cargo operations."
    },
    {
      "itemId": "standard_crew_attire",
      "labelSnapshot": "Standard Crew Attire",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Ordinary working clothing and utility wear."
    }
  ],
  "medical": [
    {
      "itemId": "trauma_kit",
      "labelSnapshot": "Trauma Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Broad emergency treatment capability."
    },
    {
      "itemId": "medscanner",
      "labelSnapshot": "Medscanner",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Rapid non-invasive diagnosis."
    },
    {
      "itemId": "first_aid_kit",
      "labelSnapshot": "First Aid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Compact immediate-care backup."
    },
    {
      "itemId": "automed",
      "labelSnapshot": "Automed",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "General treatment and recovery support."
    },
    {
      "itemId": "foldable_stretcher",
      "labelSnapshot": "Foldable Stretcher",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Patient movement and casualty extraction."
    },
    {
      "itemId": "portable_iv_fluid_kit",
      "labelSnapshot": "Portable IV / Fluid Kit",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Stabilization and sustained care."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Coordination with responders and treatment teams."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Treatment history and forensic continuity."
    },
    {
      "itemId": "portable_quarantine_hood",
      "labelSnapshot": "Portable Quarantine Hood",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Immediate isolation during unknown exposure."
    },
    {
      "itemId": "hazard_suit",
      "labelSnapshot": "Hazard Suit",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Treatment in contaminated environments."
    }
  ],
  "security": [
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Evidence, command visibility, and accountability."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Patrol and response coordination."
    },
    {
      "itemId": "restraints",
      "labelSnapshot": "Restraints",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Detention and controlled transport."
    },
    {
      "itemId": "stun_baton",
      "labelSnapshot": "Stun Baton",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Less-lethal control."
    },
    {
      "itemId": "flashlight",
      "labelSnapshot": "Flashlight",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Inspection and low-light response."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Personnel tracking and dispatch."
    },
    {
      "itemId": "heads_up_display",
      "labelSnapshot": "Heads-Up Display",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Shared feeds, alerts, and tactical overlays."
    },
    {
      "itemId": "standard_battle_dress",
      "labelSnapshot": "Standard Battle Dress",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Armed response and high-risk assignments."
    },
    {
      "itemId": "pistol",
      "labelSnapshot": "Pistol",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Armed security assignments."
    },
    {
      "itemId": "door_wedge_lock_bar_kit",
      "labelSnapshot": "Door Wedge / Lock Bar Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Access denial, room security, and emergency lockdown."
    },
    {
      "itemId": "motion_alarm",
      "labelSnapshot": "Motion Alarm",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Temporary perimeter and unattended-area monitoring."
    }
  ],
  "diplomat": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Briefings, agreements, records, and communications."
    },
    {
      "itemId": "long_range_communications",
      "labelSnapshot": "Long-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Contact with institutions, patrons, and command."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Local delegation and staff coordination."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Official record, security, and accountability."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Protective tracking during travel and negotiations."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Verifiable record of meetings and incidents."
    },
    {
      "itemId": "signal_scrambler_spoof_tag",
      "labelSnapshot": "Signal Scrambler / Spoof Tag",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Secure or deniable movement in politically sensitive work."
    },
    {
      "itemId": "standard_crew_attire",
      "labelSnapshot": "Standard Crew Attire",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Practical travel and shipboard clothing."
    },
    {
      "itemId": "medpack_drug_kit",
      "labelSnapshot": "Medpack / Drug Kit",
      "disposition": "situational",
      "suggestedSources": [
        "career_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Sustaining long travel and crisis negotiations."
    }
  ]
};

const RAW_SPECIALTY_GEAR_RECOMMENDATIONS = {
  "heavy_weapons": [
    {
      "itemId": "lmg_saw",
      "labelSnapshot": "LMG / SAW",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Standard suppression and lane-control weapon."
    },
    {
      "itemId": "minigun_rotary_weapon",
      "labelSnapshot": "Minigun / Rotary Weapon",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Powered or braced sustained-fire platform."
    },
    {
      "itemId": "heavy_anti_armor_launcher",
      "labelSnapshot": "Heavy Anti-Armor Launcher",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Squad anti-vehicle capability."
    },
    {
      "itemId": "disposable_anti_armor_launcher",
      "labelSnapshot": "Disposable Anti-Armor Launcher",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Portable one-shot anti-armor response."
    },
    {
      "itemId": "heads_up_display",
      "labelSnapshot": "Heads-Up Display",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Fire coordination and weapon telemetry."
    },
    {
      "itemId": "bipod",
      "labelSnapshot": "Bipod",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Stable firing position for heavy weapons."
    },
    {
      "itemId": "portable_power_cell",
      "labelSnapshot": "Portable Power Cell",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Supports powered weapons and field systems."
    },
    {
      "itemId": "advanced_battle_dress",
      "labelSnapshot": "Advanced Battle Dress",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Carry assistance, protection, and heavy-weapon integration."
    }
  ],
  "eva_assault": [
    {
      "itemId": "armored_combat_eva",
      "labelSnapshot": "Armored Combat EVA",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Core protection and maneuver support for hostile EVA."
    },
    {
      "itemId": "magnetic_boots",
      "labelSnapshot": "Magnetic Boots",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Controlled movement on hulls and metal structures."
    },
    {
      "itemId": "tether_kit",
      "labelSnapshot": "Tether Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Prevents separation and supports boarding movement."
    },
    {
      "itemId": "jetpack",
      "labelSnapshot": "Jetpack",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Active maneuvering where suits lack integrated thrust."
    },
    {
      "itemId": "rigging_gun",
      "labelSnapshot": "Rigging Gun",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Boarding, anchoring, and forced tethering."
    },
    {
      "itemId": "breaching_collar",
      "labelSnapshot": "Breaching Collar",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Controlled hull or airlock entry."
    },
    {
      "itemId": "emergency_sealant_kit",
      "labelSnapshot": "Emergency Sealant Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Field response to suit and hull punctures."
    },
    {
      "itemId": "oxygen_tank",
      "labelSnapshot": "Oxygen Tank",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Mission life support reserve."
    }
  ],
  "recon_pathfinder": [
    {
      "itemId": "binoculars",
      "labelSnapshot": "Binoculars",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Long-range observation and target identification."
    },
    {
      "itemId": "recon_drone",
      "labelSnapshot": "Recon Drone",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Remote route and threat assessment."
    },
    {
      "itemId": "portable_lidar_mapper",
      "labelSnapshot": "Portable LIDAR Mapper",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Interior mapping and route planning."
    },
    {
      "itemId": "motion_alarm",
      "labelSnapshot": "Motion Alarm",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Temporary security and rear warning."
    },
    {
      "itemId": "infrared_goggles",
      "labelSnapshot": "Infrared Goggles",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Low-light and thermal observation."
    },
    {
      "itemId": "signal_relay_node",
      "labelSnapshot": "Signal Relay Node",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Extends communications across difficult terrain."
    },
    {
      "itemId": "survey_kit",
      "labelSnapshot": "Survey Kit",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Environmental and terrain assessment."
    },
    {
      "itemId": "emergency_beacon",
      "labelSnapshot": "Emergency Beacon",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Recovery if isolated from the unit."
    }
  ],
  "military_pilot": [
    {
      "itemId": "heads_up_display",
      "labelSnapshot": "Heads-Up Display",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Flight telemetry and tactical overlays."
    },
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Mission plans, navigation data, and craft status."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Flight record and recovery evidence."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Ground and crew coordination."
    },
    {
      "itemId": "emergency_beacon",
      "labelSnapshot": "Emergency Beacon",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Rescue following ejection or crash."
    },
    {
      "itemId": "oxygen_tank",
      "labelSnapshot": "Oxygen Tank",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Emergency breathing reserve."
    },
    {
      "itemId": "eva_suit",
      "labelSnapshot": "EVA Suit",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Survival around depressurized or space-capable craft."
    },
    {
      "itemId": "flare_gun",
      "labelSnapshot": "Flare Gun",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Visual signaling after forced landing."
    }
  ],
  "combat_medic": [
    {
      "itemId": "trauma_kit",
      "labelSnapshot": "Trauma Kit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Primary battlefield treatment kit."
    },
    {
      "itemId": "medscanner",
      "labelSnapshot": "Medscanner",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Rapid triage under pressure."
    },
    {
      "itemId": "stimpack",
      "labelSnapshot": "StimPack",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Emergency performance and survival intervention."
    },
    {
      "itemId": "foldable_stretcher",
      "labelSnapshot": "Foldable Stretcher",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Casualty movement."
    },
    {
      "itemId": "hardpoint_casevac_stretcher",
      "labelSnapshot": "Hardpoint CASEVAC Stretcher",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Powered or vehicle-supported extraction."
    },
    {
      "itemId": "portable_iv_fluid_kit",
      "labelSnapshot": "Portable IV / Fluid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Stabilization during delayed evacuation."
    },
    {
      "itemId": "standard_battle_dress",
      "labelSnapshot": "Standard Battle Dress",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Protection while treating casualties under fire."
    },
    {
      "itemId": "smg",
      "labelSnapshot": "SMG",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Compact defensive weapon that leaves room for medical equipment."
    }
  ],
  "combat_engineer": [
    {
      "itemId": "breaching_axe",
      "labelSnapshot": "Breaching Axe",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Forced entry, obstacle removal, and utility cutting."
    },
    {
      "itemId": "breaching_collar",
      "labelSnapshot": "Breaching Collar",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Controlled structural entry."
    },
    {
      "itemId": "explosives_and_detonator",
      "labelSnapshot": "Explosives & Detonator",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "General demolition work."
    },
    {
      "itemId": "demolition_charge",
      "labelSnapshot": "Demolition Charge",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Heavy placed breaching and destruction."
    },
    {
      "itemId": "electronic_tool_set",
      "labelSnapshot": "Electronic Tool Set",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Access, bypass, repair, and field modification."
    },
    {
      "itemId": "door_wedge_lock_bar_kit",
      "labelSnapshot": "Door Wedge / Lock Bar Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Rapid fortification and route control."
    },
    {
      "itemId": "cutting_torch",
      "labelSnapshot": "Cutting Torch",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Cutting structural material and damaged access points."
    },
    {
      "itemId": "tactical_breaching_shield",
      "labelSnapshot": "Tactical Breaching Shield",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Protected approach during forced entry."
    }
  ],
  "analyst": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Core data analysis and records access."
    },
    {
      "itemId": "signal_analyzer",
      "labelSnapshot": "Signal Analyzer",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Pattern and transmission analysis."
    },
    {
      "itemId": "data_tap_packet_sniffer",
      "labelSnapshot": "Data Tap / Packet Sniffer",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Network and systems intelligence."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Preserves source data and analytical history."
    },
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Captures observations and evidence."
    },
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Presents conclusions to operational teams."
    }
  ],
  "researcher": [
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Experiment and observation record."
    },
    {
      "itemId": "sample_case",
      "labelSnapshot": "Sample Case",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Specimen and material preservation."
    },
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Models, literature, analysis, and research control."
    },
    {
      "itemId": "bioscanner",
      "labelSnapshot": "Bioscanner",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Biological research focus."
    },
    {
      "itemId": "cybernetic_diagnostic_scanner",
      "labelSnapshot": "Cybernetic Diagnostic Scanner",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Synthetic, robotics, or cybernetics focus."
    },
    {
      "itemId": "field_fabricator_parts_printer",
      "labelSnapshot": "Field Fabricator / Parts Printer",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [
        "normally_ship_shared"
      ],
      "reason": "Prototype and apparatus support."
    },
    {
      "itemId": "hazard_suit",
      "labelSnapshot": "Hazard Suit",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Hazardous experiments and unknown specimens."
    }
  ],
  "field_technician": [
    {
      "itemId": "survey_kit",
      "labelSnapshot": "Survey Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Broad site and planetary assessment."
    },
    {
      "itemId": "portable_lidar_mapper",
      "labelSnapshot": "Portable LIDAR Mapper",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Field mapping and spatial documentation."
    },
    {
      "itemId": "atmospheric_analyzer",
      "labelSnapshot": "Atmospheric Analyzer",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Environmental safety and sample context."
    },
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "On-site analysis and documentation."
    },
    {
      "itemId": "sample_case",
      "labelSnapshot": "Sample Case",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Preserves collected material."
    },
    {
      "itemId": "recon_drone",
      "labelSnapshot": "Recon Drone",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Remote inspection and sample-site scouting."
    },
    {
      "itemId": "hazard_suit",
      "labelSnapshot": "Hazard Suit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Protection in uncontrolled environments."
    },
    {
      "itemId": "tether_kit",
      "labelSnapshot": "Tether Kit",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Safe access to difficult terrain and structures."
    }
  ],
  "applied_scientist": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Converts domain knowledge into immediate decisions."
    },
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Tests and documents practical solutions."
    },
    {
      "itemId": "electronic_tool_set",
      "labelSnapshot": "Electronic Tool Set",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Robotics, cybernetics, electronics, and instrumentation focuses."
    },
    {
      "itemId": "chemical_sniffer",
      "labelSnapshot": "Chemical Sniffer",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Chemistry, materials, or environmental focuses."
    },
    {
      "itemId": "atmospheric_analyzer",
      "labelSnapshot": "Atmospheric Analyzer",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Environmental and planetary focuses."
    },
    {
      "itemId": "bioscanner",
      "labelSnapshot": "Bioscanner",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Biological, ecological, and medical focuses."
    },
    {
      "itemId": "field_fabricator_parts_printer",
      "labelSnapshot": "Field Fabricator / Parts Printer",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [
        "normally_ship_shared"
      ],
      "reason": "Produces practical components and experimental fixes."
    }
  ],
  "boatswain": [
    {
      "itemId": "assorted_tools",
      "labelSnapshot": "Assorted Tools",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Routine shipboard maintenance."
    },
    {
      "itemId": "emergency_sealant_kit",
      "labelSnapshot": "Emergency Sealant Kit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "ship_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Immediate hull and compartment response."
    },
    {
      "itemId": "patch_plate_kit",
      "labelSnapshot": "Patch Plate Kit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Structural repair after puncture or damage."
    },
    {
      "itemId": "portable_air_pump_pressure_equalizer",
      "labelSnapshot": "Portable Air Pump / Pressure Equalizer",
      "disposition": "normally_ship_shared",
      "suggestedSources": [
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Compartment pressure and atmosphere recovery."
    },
    {
      "itemId": "tether_kit",
      "labelSnapshot": "Tether Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Safe exterior and zero-g work."
    },
    {
      "itemId": "magnetic_boots",
      "labelSnapshot": "Magnetic Boots",
      "disposition": "recommended",
      "suggestedSources": [
        "ship_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Hull and zero-g footing."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Crew coordination through the vessel."
    },
    {
      "itemId": "eva_suit",
      "labelSnapshot": "EVA Suit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Exterior inspection and emergency decompression response."
    }
  ],
  "heavy_operator": [
    {
      "itemId": "exoloader",
      "labelSnapshot": "ExoLoader",
      "disposition": "normally_ship_shared",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Heavy cargo and machinery handling."
    },
    {
      "itemId": "cargo_net_load_restraint_kit",
      "labelSnapshot": "Cargo Net / Load Restraint Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Secures loads and stabilizes work sites."
    },
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Machine status, task plans, and safety checks."
    },
    {
      "itemId": "heads_up_display",
      "labelSnapshot": "Heads-Up Display",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Equipment telemetry and hazard warning."
    },
    {
      "itemId": "climbing_harness",
      "labelSnapshot": "Climbing Harness",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Safe work around elevated machinery."
    },
    {
      "itemId": "portable_winch_come_along",
      "labelSnapshot": "Portable Winch / Come-Along",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Controlled movement and recovery of heavy loads."
    },
    {
      "itemId": "flashlight",
      "labelSnapshot": "Flashlight",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Inspection and machine access."
    }
  ],
  "quartermaster": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Inventory, manifests, requisitions, and routing."
    },
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Mobile issue and logistics control."
    },
    {
      "itemId": "cargo_net_load_restraint_kit",
      "labelSnapshot": "Cargo Net / Load Restraint Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Cargo security and movement."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Tracks personnel, containers, or issued equipment."
    },
    {
      "itemId": "signal_scrambler_spoof_tag",
      "labelSnapshot": "Signal Scrambler / Spoof Tag",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Contraband, disputed cargo, or covert logistics."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Dock, cargo, and crew coordination."
    },
    {
      "itemId": "rucksack",
      "labelSnapshot": "Rucksack",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Carries issued supplies and field inventory."
    }
  ],
  "foreman": [
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Work orders, staffing, safety, and progress tracking."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Coordinates crews across an active site."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Incident record and worksite accountability."
    },
    {
      "itemId": "marker_tape",
      "labelSnapshot": "Marker Tape",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Marks hazards, routes, tasks, and completed work."
    },
    {
      "itemId": "portable_floodlight",
      "labelSnapshot": "Portable Floodlight",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [
        "normally_ship_shared"
      ],
      "reason": "Keeps crews productive in damaged or dark sites."
    },
    {
      "itemId": "first_aid_kit",
      "labelSnapshot": "First Aid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "career_gear"
      ],
      "sourceHints": [],
      "reason": "Basic worksite emergency response."
    },
    {
      "itemId": "motion_alarm",
      "labelSnapshot": "Motion Alarm",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Warns crews around restricted or dangerous zones."
    }
  ],
  "infrastructure_engineer": [
    {
      "itemId": "electronic_tool_set",
      "labelSnapshot": "Electronic Tool Set",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Controls, power, diagnostics, and systems work."
    },
    {
      "itemId": "field_fabricator_parts_printer",
      "labelSnapshot": "Field Fabricator / Parts Printer",
      "disposition": "normally_ship_shared",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Produces replacement parts and structural components."
    },
    {
      "itemId": "portable_power_cell",
      "labelSnapshot": "Portable Power Cell",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Temporary power and commissioning."
    },
    {
      "itemId": "portable_lidar_mapper",
      "labelSnapshot": "Portable LIDAR Mapper",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Surveying built environments and damage."
    },
    {
      "itemId": "cutting_torch",
      "labelSnapshot": "Cutting Torch",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Structural alteration and repair."
    },
    {
      "itemId": "patch_plate_kit",
      "labelSnapshot": "Patch Plate Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Rapid structural reinforcement."
    },
    {
      "itemId": "portable_air_pump_pressure_equalizer",
      "labelSnapshot": "Portable Air Pump / Pressure Equalizer",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [
        "normally_ship_shared"
      ],
      "reason": "Atmosphere and pressure infrastructure."
    },
    {
      "itemId": "survey_kit",
      "labelSnapshot": "Survey Kit",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Site assessment and construction planning."
    }
  ],
  "extraction_specialist": [
    {
      "itemId": "cutting_torch",
      "labelSnapshot": "Cutting Torch",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Cuts salvage, ore, and damaged structure."
    },
    {
      "itemId": "industrial_saw_rescue_saw",
      "labelSnapshot": "Industrial Saw / Rescue Saw",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Rapid material removal and casualty access."
    },
    {
      "itemId": "portable_winch_come_along",
      "labelSnapshot": "Portable Winch / Come-Along",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Controlled extraction of heavy objects."
    },
    {
      "itemId": "salvage_drone",
      "labelSnapshot": "Salvage Drone",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Remote recovery and inspection."
    },
    {
      "itemId": "rigging_gun",
      "labelSnapshot": "Rigging Gun",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Anchoring, hauling, and securing salvage."
    },
    {
      "itemId": "sample_case",
      "labelSnapshot": "Sample Case",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Preserves valuable or hazardous recovered material."
    },
    {
      "itemId": "seismic_thumper_ground_sonar",
      "labelSnapshot": "Seismic Thumper / Ground Sonar",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Locates voids, deposits, and buried structures."
    },
    {
      "itemId": "eva_suit",
      "labelSnapshot": "EVA Suit",
      "disposition": "situational",
      "suggestedSources": [
        "ship_issued",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Derelict and exterior recovery."
    }
  ],
  "trauma_surgeon": [
    {
      "itemId": "trauma_kit",
      "labelSnapshot": "Trauma Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Severe injury treatment."
    },
    {
      "itemId": "medscanner",
      "labelSnapshot": "Medscanner",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Rapid injury localization and operative planning."
    },
    {
      "itemId": "portable_iv_fluid_kit",
      "labelSnapshot": "Portable IV / Fluid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Stabilizes shock and blood loss."
    },
    {
      "itemId": "medpack_drug_kit",
      "labelSnapshot": "Medpack / Drug Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Anesthesia, antibiotics, analgesia, and surgical drugs."
    },
    {
      "itemId": "foldable_stretcher",
      "labelSnapshot": "Foldable Stretcher",
      "disposition": "situational",
      "suggestedSources": [
        "ship_issued",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Patient transport to treatment."
    },
    {
      "itemId": "automed",
      "labelSnapshot": "Automed",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Supports recovery and post-operative care."
    },
    {
      "itemId": "scalpel",
      "labelSnapshot": "Scalpel",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Precision surgical instrument."
    }
  ],
  "general_physician": [
    {
      "itemId": "medscanner",
      "labelSnapshot": "Medscanner",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Broad diagnostic work."
    },
    {
      "itemId": "first_aid_kit",
      "labelSnapshot": "First Aid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Routine injury treatment."
    },
    {
      "itemId": "medpack_drug_kit",
      "labelSnapshot": "Medpack / Drug Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "General pharmaceutical support."
    },
    {
      "itemId": "automed",
      "labelSnapshot": "Automed",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Disease, poison, healing, and recovery support."
    },
    {
      "itemId": "portable_iv_fluid_kit",
      "labelSnapshot": "Portable IV / Fluid Kit",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Sustained and emergency care."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Longitudinal patient and incident record."
    },
    {
      "itemId": "water_filter",
      "labelSnapshot": "Water Filter",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Public health and survival support."
    }
  ],
  "behavioral_health_specialist": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Records, assessment tools, and treatment plans."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Event reconstruction and behavioral review."
    },
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Interviews, observations, and environmental context."
    },
    {
      "itemId": "pain_pills",
      "labelSnapshot": "Pain Pills",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Crisis medication with addiction and impairment risks."
    },
    {
      "itemId": "automed",
      "labelSnapshot": "Automed",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Recovery and Fear-support medication."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Crisis-team and patient coordination."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Locates patients at risk of wandering or self-endangerment."
    }
  ],
  "hazardous_exposure_specialist": [
    {
      "itemId": "hazard_suit",
      "labelSnapshot": "Hazard Suit",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Core contaminated-environment protection."
    },
    {
      "itemId": "decontamination_kit",
      "labelSnapshot": "Decontamination Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Removes or contains hazardous exposure."
    },
    {
      "itemId": "geiger_counter",
      "labelSnapshot": "Geiger Counter",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Radiation detection."
    },
    {
      "itemId": "chemical_sniffer",
      "labelSnapshot": "Chemical Sniffer",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Toxin and chemical detection."
    },
    {
      "itemId": "atmospheric_analyzer",
      "labelSnapshot": "Atmospheric Analyzer",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Air-quality and environmental assessment."
    },
    {
      "itemId": "radiation_dosimeter_patch",
      "labelSnapshot": "Radiation Dosimeter Patch",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Tracks accumulated exposure."
    },
    {
      "itemId": "radiation_pills",
      "labelSnapshot": "Radiation Pills",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Exposure mitigation where medically appropriate."
    },
    {
      "itemId": "portable_quarantine_hood",
      "labelSnapshot": "Portable Quarantine Hood",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Immediate patient or specimen isolation."
    }
  ],
  "medical_investigator": [
    {
      "itemId": "medscanner",
      "labelSnapshot": "Medscanner",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Forensic and diagnostic examination."
    },
    {
      "itemId": "evidence_collection_kit",
      "labelSnapshot": "Evidence Collection Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Preserves medical and biological evidence."
    },
    {
      "itemId": "sample_case",
      "labelSnapshot": "Sample Case",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Maintains specimen chain of custody."
    },
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Documents scenes, bodies, and environmental context."
    },
    {
      "itemId": "bioscanner",
      "labelSnapshot": "Bioscanner",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Locates hidden or residual biological activity."
    },
    {
      "itemId": "chemical_sniffer",
      "labelSnapshot": "Chemical Sniffer",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Poison, contamination, and exposure investigations."
    },
    {
      "itemId": "quarantine_bag_body_bag",
      "labelSnapshot": "Quarantine Bag / Body Bag",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "ship_issued"
      ],
      "sourceHints": [],
      "reason": "Safe recovery and transport of remains or contaminated subjects."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Preserves investigative continuity."
    }
  ],
  "facility_station_security": [
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Access logs, patrols, alarms, and lockdown controls."
    },
    {
      "itemId": "motion_alarm",
      "labelSnapshot": "Motion Alarm",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Temporary perimeter and restricted-zone monitoring."
    },
    {
      "itemId": "door_wedge_lock_bar_kit",
      "labelSnapshot": "Door Wedge / Lock Bar Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Rapid lockdown and access denial."
    },
    {
      "itemId": "lockpick_suite",
      "labelSnapshot": "Lockpick Suite",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Authorized bypass and emergency access."
    },
    {
      "itemId": "heads_up_display",
      "labelSnapshot": "Heads-Up Display",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Camera, alert, and patrol overlays."
    },
    {
      "itemId": "tactical_breaching_shield",
      "labelSnapshot": "Tactical Breaching Shield",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Protected response to barricaded threats."
    },
    {
      "itemId": "foam_gun",
      "labelSnapshot": "Foam Gun",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Access denial, restraint, and fire suppression."
    }
  ],
  "asset_security": [
    {
      "itemId": "standard_battle_dress",
      "labelSnapshot": "Standard Battle Dress",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Protection while escorting exposed people or cargo."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Continuous protective record."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Tracks principal, team, or protected item."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Close-protection coordination."
    },
    {
      "itemId": "stun_baton",
      "labelSnapshot": "Stun Baton",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Less-lethal intervention."
    },
    {
      "itemId": "pistol",
      "labelSnapshot": "Pistol",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Compact armed protection."
    },
    {
      "itemId": "tactical_breaching_shield",
      "labelSnapshot": "Tactical Breaching Shield",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Mobile cover during extraction."
    },
    {
      "itemId": "emergency_beacon",
      "labelSnapshot": "Emergency Beacon",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Recovery after route compromise."
    }
  ],
  "crisis_liaison": [
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Shared incident picture and task coordination."
    },
    {
      "itemId": "long_range_communications",
      "labelSnapshot": "Long-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Connects command, institutions, and responders."
    },
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "On-scene responder coordination."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Incident documentation and command visibility."
    },
    {
      "itemId": "portable_floodlight",
      "labelSnapshot": "Portable Floodlight",
      "disposition": "situational",
      "suggestedSources": [
        "ship_issued",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Establishes an emergency command or treatment area."
    },
    {
      "itemId": "first_aid_kit",
      "labelSnapshot": "First Aid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Immediate aid before medical teams arrive."
    },
    {
      "itemId": "signal_relay_node",
      "labelSnapshot": "Signal Relay Node",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Maintains communications through damaged facilities."
    }
  ],
  "investigator": [
    {
      "itemId": "evidence_collection_kit",
      "labelSnapshot": "Evidence Collection Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Scene processing and chain of custody."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Interview and scene record."
    },
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Timelines, records, and case analysis."
    },
    {
      "itemId": "field_recorder",
      "labelSnapshot": "Field Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Environmental and physical evidence capture."
    },
    {
      "itemId": "acoustic_sensor_contact_mic",
      "labelSnapshot": "Acoustic Sensor / Contact Mic",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Covert listening and structural sound analysis."
    },
    {
      "itemId": "data_tap_packet_sniffer",
      "labelSnapshot": "Data Tap / Packet Sniffer",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Digital evidence and unauthorized-network investigation."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Preserves case continuity."
    }
  ],
  "customs_inspector": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Manifests, credentials, permits, and routing."
    },
    {
      "itemId": "chemical_sniffer",
      "labelSnapshot": "Chemical Sniffer",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Detects chemical contraband and hazardous cargo."
    },
    {
      "itemId": "bioscanner",
      "labelSnapshot": "Bioscanner",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Detects concealed organisms or passengers."
    },
    {
      "itemId": "cybernetic_diagnostic_scanner",
      "labelSnapshot": "Cybernetic Diagnostic Scanner",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Verifies synthetic identity and concealed modifications."
    },
    {
      "itemId": "evidence_collection_kit",
      "labelSnapshot": "Evidence Collection Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Seizes and documents contraband."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Tracks inspected personnel or released cargo."
    },
    {
      "itemId": "restraints",
      "labelSnapshot": "Restraints",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Detention during inspection incidents."
    },
    {
      "itemId": "hazard_suit",
      "labelSnapshot": "Hazard Suit",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Quarantine and hazardous-cargo inspection."
    }
  ],
  "counterintelligence": [
    {
      "itemId": "signal_analyzer",
      "labelSnapshot": "Signal Analyzer",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Finds suspicious transmissions and patterns."
    },
    {
      "itemId": "data_tap_packet_sniffer",
      "labelSnapshot": "Data Tap / Packet Sniffer",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Detects leakage, intrusion, and covert traffic."
    },
    {
      "itemId": "signal_scrambler_spoof_tag",
      "labelSnapshot": "Signal Scrambler / Spoof Tag",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Tests or defeats tracking and identity systems."
    },
    {
      "itemId": "radio_jammer",
      "labelSnapshot": "Radio Jammer",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Communications denial during active operations."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Preserves sensitive investigative history."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Controlled evidence and oversight."
    },
    {
      "itemId": "lockpick_suite",
      "labelSnapshot": "Lockpick Suite",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Covert or emergency access."
    },
    {
      "itemId": "pistol",
      "labelSnapshot": "Pistol",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Defensive capability during hostile investigations."
    }
  ],
  "ambassador_envoy": [
    {
      "itemId": "long_range_communications",
      "labelSnapshot": "Long-Range Communications",
      "disposition": "commonly_issued",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Contact with the represented institution."
    },
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Credentials, agreements, briefs, and official record."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Verifiable diplomatic record."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Protective tracking during travel."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Formal record in volatile negotiations."
    },
    {
      "itemId": "emergency_beacon",
      "labelSnapshot": "Emergency Beacon",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Recovery during remote travel."
    },
    {
      "itemId": "medpack_drug_kit",
      "labelSnapshot": "Medpack / Drug Kit",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Sustains delegation during prolonged travel or crisis."
    }
  ],
  "conflict_resolution_specialist": [
    {
      "itemId": "short_range_communications",
      "labelSnapshot": "Short-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Coordinates separate parties and response teams."
    },
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Tracks commitments, timelines, and active concerns."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Transparent record where trust is low."
    },
    {
      "itemId": "first_aid_kit",
      "labelSnapshot": "First Aid Kit",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Immediate support during volatile incidents."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Preserves agreements and disputed interactions."
    },
    {
      "itemId": "foam_gun",
      "labelSnapshot": "Foam Gun",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Nonlethal control option for violent escalation."
    }
  ],
  "broker": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Contacts, market data, contracts, and transaction records."
    },
    {
      "itemId": "long_range_communications",
      "labelSnapshot": "Long-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Maintains a wide network of buyers, sellers, and patrons."
    },
    {
      "itemId": "signal_scrambler_spoof_tag",
      "labelSnapshot": "Signal Scrambler / Spoof Tag",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "restricted_item"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Conceals sensitive meetings or cargo links."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Tracks couriers, cargo, or arranged exchanges."
    },
    {
      "itemId": "rucksack",
      "labelSnapshot": "Rucksack",
      "disposition": "recommended",
      "suggestedSources": [],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Samples, documents, and portable trade goods."
    },
    {
      "itemId": "pistol",
      "labelSnapshot": "Pistol",
      "disposition": "situational",
      "suggestedSources": [
        "restricted_item"
      ],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Personal protection in informal markets."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [],
      "sourceHints": [
        "normally_personal_purchase"
      ],
      "reason": "Insurance against disputed arrangements."
    }
  ],
  "administrator": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Policy, records, approvals, and resource allocation."
    },
    {
      "itemId": "portable_command_slate",
      "labelSnapshot": "Portable Command Slate",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Mobile operational oversight."
    },
    {
      "itemId": "long_range_communications",
      "labelSnapshot": "Long-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Coordinates departments and distant authorities."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Personnel and asset accountability."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Inspections and incident oversight."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Auditable decision and incident record."
    },
    {
      "itemId": "signal_relay_node",
      "labelSnapshot": "Signal Relay Node",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [
        "normally_ship_shared"
      ],
      "reason": "Supports temporary administration during outages."
    }
  ],
  "legal_representative": [
    {
      "itemId": "portable_computer_terminal",
      "labelSnapshot": "Portable Computer Terminal",
      "disposition": "recommended",
      "suggestedSources": [
        "specialty_gear",
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Statutes, contracts, filings, claims, and evidence."
    },
    {
      "itemId": "personal_blackbox_recorder",
      "labelSnapshot": "Personal Blackbox Recorder",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued",
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Preserves statements, agreements, and custody events."
    },
    {
      "itemId": "body_cam",
      "labelSnapshot": "Body Cam",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Formal record during inspections or disputes."
    },
    {
      "itemId": "long_range_communications",
      "labelSnapshot": "Long-Range Communications",
      "disposition": "recommended",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Access to courts, institutions, clients, and authorities."
    },
    {
      "itemId": "evidence_collection_kit",
      "labelSnapshot": "Evidence Collection Kit",
      "disposition": "situational",
      "suggestedSources": [
        "specialty_gear"
      ],
      "sourceHints": [],
      "reason": "Handles disputed property and evidentiary material."
    },
    {
      "itemId": "locator",
      "labelSnapshot": "Locator",
      "disposition": "situational",
      "suggestedSources": [
        "employer_issued"
      ],
      "sourceHints": [],
      "reason": "Tracks protected clients or contested assets."
    },
    {
      "itemId": "lockpick_suite",
      "labelSnapshot": "Lockpick Suite",
      "disposition": "requires_authorization",
      "suggestedSources": [
        "employer_issued",
        "restricted_item"
      ],
      "sourceHints": [],
      "reason": "Authorized access during seizure, salvage, or custody disputes."
    }
  ]
};

export const CAREER_GEAR_RECOMMENDATIONS = freezeRecommendationRegistry(
  RAW_CAREER_GEAR_RECOMMENDATIONS,
  "career",
);

export const SPECIALTY_GEAR_RECOMMENDATIONS = freezeRecommendationRegistry(
  RAW_SPECIALTY_GEAR_RECOMMENDATIONS,
  "specialty",
);

export function getCareerGearRecommendations(careerId) {
  return CAREER_GEAR_RECOMMENDATIONS[careerId] ?? Object.freeze([]);
}

export function getSpecialtyGearRecommendations(specialtyId) {
  return SPECIALTY_GEAR_RECOMMENDATIONS[specialtyId] ?? Object.freeze([]);
}

export function getCharacterGearRecommendations({
  careerId = null,
  specialtyId = null,
} = {}) {
  const career = careerId
    ? getCareerGearRecommendations(careerId)
    : [];
  const specialty = specialtyId
    ? getSpecialtyGearRecommendations(specialtyId)
    : [];

  return mergeGearRecommendations([
    ...career,
    ...specialty,
  ]);
}

export function mergeGearRecommendations(recommendations = []) {
  const merged = new Map();

  for (const recommendation of recommendations) {
    if (!recommendation?.itemId) continue;

    const current = merged.get(recommendation.itemId);
    if (!current) {
      merged.set(recommendation.itemId, {
        itemId: recommendation.itemId,
        item: getPersonalEquipment(recommendation.itemId),
        dispositions: [recommendation.disposition],
        suggestedSources: [...recommendation.suggestedSources],
        sourceHints: [...recommendation.sourceHints],
        origins: [{
          type: recommendation.originType,
          id: recommendation.originId,
          parentCareerId: recommendation.parentCareerId ?? null,
          reason: recommendation.reason,
          disposition: recommendation.disposition,
        }],
      });
      continue;
    }

    current.dispositions = unique([
      ...current.dispositions,
      recommendation.disposition,
    ]);
    current.suggestedSources = unique([
      ...current.suggestedSources,
      ...recommendation.suggestedSources,
    ]);
    current.sourceHints = unique([
      ...current.sourceHints,
      ...recommendation.sourceHints,
    ]);
    current.origins.push({
      type: recommendation.originType,
      id: recommendation.originId,
      parentCareerId: recommendation.parentCareerId ?? null,
      reason: recommendation.reason,
      disposition: recommendation.disposition,
    });
  }

  return Object.freeze(
    [...merged.values()].map((entry) => Object.freeze({
      ...entry,
      dispositions: Object.freeze(entry.dispositions),
      suggestedSources: Object.freeze(entry.suggestedSources),
      sourceHints: Object.freeze(entry.sourceHints),
      origins: Object.freeze(entry.origins.map((origin) => Object.freeze(origin))),
    })),
  );
}

export function validateCharacterGearRecommendations() {
  const errors = [];
  const equipmentIds = new Set(PERSONAL_EQUIPMENT.map((entry) => entry.id));
  const validSources = new Set(STARTING_GEAR_SOURCE_IDS);
  const validDispositions = new Set(GEAR_RECOMMENDATION_DISPOSITIONS);

  for (const [originType, registry] of [
    ["career", CAREER_GEAR_RECOMMENDATIONS],
    ["specialty", SPECIALTY_GEAR_RECOMMENDATIONS],
  ]) {
    for (const [originId, recommendations] of Object.entries(registry)) {
      const seen = new Set();
      for (const recommendation of recommendations) {
        if (!equipmentIds.has(recommendation.itemId)) {
          errors.push(`${originType}:${originId} references missing item ${recommendation.itemId}.`);
        }
        if (seen.has(recommendation.itemId)) {
          errors.push(`${originType}:${originId} repeats item ${recommendation.itemId}.`);
        }
        seen.add(recommendation.itemId);
        if (!validDispositions.has(recommendation.disposition)) {
          errors.push(`${originType}:${originId} uses invalid disposition ${recommendation.disposition}.`);
        }
        for (const sourceId of recommendation.suggestedSources) {
          if (!validSources.has(sourceId)) {
            errors.push(`${originType}:${originId} uses invalid source ${sourceId}.`);
          }
        }
      }
    }
  }

  return Object.freeze({
    valid: errors.length === 0,
    errors: Object.freeze(errors),
  });
}

function freezeRecommendationRegistry(rawRegistry, originType) {
  return Object.freeze(Object.fromEntries(
    Object.entries(rawRegistry).map(([originId, recommendations]) => [
      originId,
      Object.freeze(recommendations.map((recommendation) => Object.freeze({
        ...recommendation,
        originType,
        originId,
        parentCareerId:
          originType === "specialty"
            ? SPECIALTY_PARENT_CAREER_IDS[originId] ?? null
            : null,
        suggestedSources: Object.freeze([...(recommendation.suggestedSources ?? [])]),
        sourceHints: Object.freeze([...(recommendation.sourceHints ?? [])]),
      }))),
    ]),
  ));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
