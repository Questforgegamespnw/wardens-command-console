/**
 * Editable Damage Resolver weapon presets.
 *
 * These entries only prefill the existing Damage form. They do not lock
 * fields, track ammunition, perform attack rolls, or replace Warden judgment.
 */

function profile({
  id,
  label,
  mode = "dice",
  diceCount = 1,
  dieSize = 10,
  fixedDamage = 0,
  directWounds = 1,
  penetration = "standard",
  woundType = "gunshot",
  coverInteraction = "normal",
  tacEligible = true,
  preferredTacCategory = null,
  notes = "",
}) {
  return Object.freeze({
    id,
    label,
    mode,
    diceCount,
    dieSize,
    fixedDamage,
    directWounds,
    penetration,
    woundType,
    coverInteraction,
    tacEligible,
    preferredTacCategory,
    notes,
  });
}

function weapon({
  id,
  label,
  category,
  categoryLabel,
  sortOrder,
  profiles,
}) {
  return Object.freeze({
    id,
    label,
    category,
    categoryLabel,
    sortOrder,
    profiles: Object.freeze([...profiles]),
  });
}

export const DAMAGE_WEAPON_PRESETS = Object.freeze([
  weapon({
    id: "pistol",
    label: "Pistol",
    category: "small_arms",
    categoryLabel: "Small Arms",
    sortOrder: 10,
    profiles: [
      profile({
        id: "standard",
        label: "Standard — 1d10",
        diceCount: 1,
        dieSize: 10,
        notes:
          "Close-range sidearm. AP ammunition may improve penetration to Piercing.",
      }),
    ],
  }),

  weapon({
    id: "revolver",
    label: "Revolver",
    category: "small_arms",
    categoryLabel: "Small Arms",
    sortOrder: 20,
    profiles: [
      profile({
        id: "standard",
        label: "Heavy Slug — 2d10",
        diceCount: 2,
        dieSize: 10,
        penetration: "piercing",
        notes:
          "Heavy sidearm. AP slugs may improve penetration to Anti-Armor at Warden discretion.",
      }),
    ],
  }),

  weapon({
    id: "machine_pistol",
    label: "Machine Pistol",
    category: "small_arms",
    categoryLabel: "Small Arms",
    sortOrder: 30,
    profiles: [
      profile({
        id: "burst",
        label: "Burst — 3d5",
        diceCount: 3,
        dieSize: 5,
        notes:
          "Compact automatic sidearm. AP ammunition generally caps at Piercing.",
      }),
    ],
  }),

  weapon({
    id: "combat_shotgun",
    label: "Combat Shotgun",
    category: "longarms",
    categoryLabel: "Longarms",
    sortOrder: 10,
    profiles: [
      profile({
        id: "nearby",
        label: "Nearby — 3d10",
        diceCount: 3,
        dieSize: 10,
        notes:
          "Normal nearby profile. Buckshot falls off quickly against armor, cover, or distance.",
      }),
      profile({
        id: "close",
        label: "Close — 1 Direct Wound",
        mode: "direct_wounds",
        directWounds: 1,
        notes:
          "Close-range direct-Wound profile. Use the dice profile instead when armor or fiction prevents the direct Wound.",
      }),
    ],
  }),

  weapon({
    id: "pulse_rifle",
    label: "Pulse Rifle",
    category: "longarms",
    categoryLabel: "Longarms",
    sortOrder: 20,
    profiles: [
      profile({
        id: "standard",
        label: "Standard — 2d10",
        diceCount: 2,
        dieSize: 10,
        notes:
          "Military rifle. AP ammunition may improve penetration to Piercing.",
      }),
    ],
  }),

  weapon({
    id: "sniper_rifle",
    label: "Sniper Rifle",
    category: "longarms",
    categoryLabel: "Longarms",
    sortOrder: 30,
    profiles: [
      profile({
        id: "standard",
        label: "Other Valid Shot — 3d10",
        diceCount: 3,
        dieSize: 10,
        notes:
          "Precision rifle outside its ideal braced firing solution.",
      }),
      profile({
        id: "ideal_braced",
        label: "Ideal Braced Range — 1 Direct Wound",
        mode: "direct_wounds",
        directWounds: 1,
        notes:
          "Best profile requires bracing, setup, or a stable firing position.",
      }),
    ],
  }),

  weapon({
    id: "smg",
    label: "SMG",
    category: "longarms",
    categoryLabel: "Longarms",
    sortOrder: 40,
    profiles: [
      profile({
        id: "standard",
        label: "Standard — 3d10",
        diceCount: 3,
        dieSize: 10,
        notes:
          "Compact automatic weapon. AP ammunition may improve penetration to Piercing.",
      }),
    ],
  }),

  weapon({
    id: "lmg_saw",
    label: "LMG / SAW",
    category: "longarms",
    categoryLabel: "Longarms",
    sortOrder: 50,
    profiles: [
      profile({
        id: "standard",
        label: "Standard — 3d10",
        diceCount: 3,
        dieSize: 10,
        notes:
          "Squad automatic weapon for suppression, pinning, overwatch, and lane control. AP belts may improve penetration to Piercing.",
      }),
    ],
  }),

  weapon({
    id: "minigun_rotary",
    label: "Minigun / Rotary Weapon",
    category: "longarms",
    categoryLabel: "Longarms",
    sortOrder: 60,
    profiles: [
      profile({
        id: "standard",
        label: "Sustained Fire — 3d10",
        diceCount: 3,
        dieSize: 10,
        notes:
          "Strong suppression and a deeper ammunition reserve than an LMG / SAW. Usually mounted, braced, or powered-carried. AP belts may improve penetration to Piercing.",
      }),
    ],
  }),

  weapon({
    id: "disposable_anti_armor_launcher",
    label: "Disposable Anti-Armor Launcher",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 10,
    profiles: [
      profile({
        id: "standard",
        label: "One-Shot — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "One-shot launcher for light and medium vehicles. Against tanks or walkers, seek weak arcs, exposed systems, or setup.",
      }),
    ],
  }),

  weapon({
    id: "heavy_anti_armor_launcher",
    label: "Heavy Anti-Armor Launcher",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 20,
    profiles: [
      profile({
        id: "standard",
        label: "Tank / Walker Killer — 8d10",
        diceCount: 8,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Heavy squad weapon. Two operators are recommended; solo use may suffer setup, reload, handling, or aiming penalties.",
      }),
    ],
  }),

  weapon({
    id: "handheld_railgun",
    label: "Infantry Railgun",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 30,
    profiles: [
      profile({
        id: "combat_charge",
        label: "Combat Charge — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "massive_gore",
        preferredTacCategory: "armor_structure",
        notes:
          "Braced anti-armor weapon usable inside the active engagement. Mobile firing generally requires powered armor or actuator assistance.",
      }),
      profile({
        id: "quick_charge",
        label: "Quick Charge — 3d10",
        diceCount: 3,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "massive_gore",
        preferredTacCategory: "armor_structure",
        notes:
          "Short charge for a faster firing window. Edit the dice to match actual charge time: roughly 1d10 per second.",
      }),
      profile({
        id: "full_charge",
        label: "Full Charge — 10d10",
        diceCount: 10,
        dieSize: 10,
        penetration: "siege",
        woundType: "massive_gore",
        preferredTacCategory: "armor_structure",
        notes:
          "Maximum battery charge. Creates major heat, noise, signature, recoil, and collateral risk.",
      }),
    ],
  }),

  weapon({
    id: "anti_armor_grenade",
    label: "Anti-Armor Grenade / Shaped Charge",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 40,
    profiles: [
      profile({
        id: "thrown",
        label: "Thrown / Poor Placement — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Close anti-armor charge. Best effect requires weak-angle targeting or precise placement.",
      }),
      profile({
        id: "placed",
        label: "Properly Placed — 1 Vehicle Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Use only when properly placed against a vehicle weak point or exposed anatomy.",
      }),
    ],
  }),

  weapon({
    id: "mag_mine",
    label: "Mag-Mine / Limpet Charge",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 50,
    profiles: [
      profile({
        id: "attached",
        label: "Attached — 1 Vehicle Wound",
        mode: "direct_wounds",
        directWounds: 1,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Must be attached or placed. Best against undersides, hatches, joints, tracks, actuators, mounts, or armor seams.",
      }),
    ],
  }),

  weapon({
    id: "satchel_charge",
    label: "Satchel Charge",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 60,
    profiles: [
      profile({
        id: "thrown",
        label: "Thrown / Poor Placement — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "standard",
        woundType: "fire_explosive",
        notes:
          "Portable demolition charge used as ordinary explosive damage when thrown or poorly placed.",
      }),
      profile({
        id: "placed",
        label: "Properly Placed — 1 Vehicle Wound",
        mode: "direct_wounds",
        directWounds: 1,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Placed against a vehicle weak point, hatch, track, actuator, engine bay, power system, or structural seam.",
      }),
    ],
  }),

  weapon({
    id: "demolition_charge",
    label: "Demolition Charge",
    category: "anti_tank_tactical",
    categoryLabel: "Anti-Tank — Tactical",
    sortOrder: 70,
    profiles: [
      profile({
        id: "placed",
        label: "Placed Siege Charge — 8d10",
        diceCount: 8,
        dieSize: 10,
        penetration: "siege",
        woundType: "fire_explosive",
        coverInteraction: "breach",
        preferredTacCategory: "armor_structure",
        notes:
          "Heavy placed charge for vehicles, fortifications, bunkers, hardened doors, and static platforms.",
      }),
    ],
  }),

  weapon({
    id: "orion_anti_material_rifle",
    label: "Orion Anti-Material Rifle",
    category: "anti_tank_siege",
    categoryLabel: "Anti-Tank — Extreme Range / Siege",
    sortOrder: 10,
    profiles: [
      profile({
        id: "hard_target",
        label: "Hard Target Penetrator — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "massive_gore",
        coverInteraction: "breach",
        preferredTacCategory: "crew_cockpit",
        notes:
          "Extreme-range crew-served siege sniper, normally emplaced outside the engagement zone. Plasma stage breaches armor or cover.",
      }),
      profile({
        id: "biological_or_interior",
        label: "Exposed Target / Occupied Interior — 2 Wounds",
        mode: "direct_wounds",
        directWounds: 2,
        penetration: "anti_armor",
        woundType: "massive_gore",
        preferredTacCategory: "crew_cockpit",
        notes:
          "Chaser payload against an exposed biological target or after penetration into an occupied compartment.",
      }),
    ],
  }),

  weapon({
    id: "frag_grenade",
    label: "Frag Grenade",
    category: "damaging_grenades",
    categoryLabel: "Grenades and Explosives",
    sortOrder: 10,
    profiles: [
      profile({
        id: "edge",
        label: "Edge / Partial Cover — 3d10",
        diceCount: 3,
        dieSize: 10,
        woundType: "fire_explosive",
        preferredTacCategory: "sensors_fire_control",
        notes:
          "Cover matters. Poor exposure may instead cause reposition, knockdown, Stress, or a lesser effect.",
      }),
      profile({
        id: "near",
        label: "Near Blast — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "fire_explosive",
        notes:
          "Near-blast or partial-exposure direct-Wound profile.",
      }),
      profile({
        id: "center",
        label: "Center Blast — 2 Wounds",
        mode: "direct_wounds",
        directWounds: 2,
        woundType: "fire_explosive",
        notes:
          "Center-blast or direct-exposure profile.",
      }),
    ],
  }),

  weapon({
    id: "concussion_grenade",
    label: "Concussion / Breach Grenade",
    category: "damaging_grenades",
    categoryLabel: "Grenades and Explosives",
    sortOrder: 20,
    profiles: [
      profile({
        id: "normal",
        label: "Normal Exposure — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "blunt_force",
        preferredTacCategory: "mobility",
        notes:
          "Shock explosive. May also stun, knock down, or disrupt enclosed crew.",
      }),
      profile({
        id: "confined",
        label: "Confined Space / Direct Breach — 2 Wounds",
        mode: "direct_wounds",
        directWounds: 2,
        woundType: "fire_explosive",
        preferredTacCategory: "crew_cockpit",
        notes:
          "Stronger in sealed rooms, corridors, vehicles, bunkers, elevators, vents, and other confined spaces.",
      }),
    ],
  }),

  weapon({
    id: "incendiary_grenade",
    label: "Incendiary Grenade",
    category: "damaging_grenades",
    categoryLabel: "Grenades and Explosives",
    sortOrder: 30,
    profiles: [
      profile({
        id: "ignition",
        label: "Hit / Ignition — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "fire_explosive",
        preferredTacCategory: "power_systems",
        notes:
          "Creates a lingering fire hazard and threatens exposed fuel, ammunition, optics, wiring, seals, and soft cargo.",
      }),
    ],
  }),

  weapon({
    id: "unarmed",
    label: "Unarmed",
    category: "melee",
    categoryLabel: "Melee Weapons",
    sortOrder: 10,
    profiles: [
      profile({
        id: "current_wounds",
        label: "Current Wounds as Damage",
        mode: "fixed",
        fixedDamage: 3,
        woundType: "blunt_force",
        tacEligible: false,
        notes:
          "Edit Fixed Damage to equal the attacker's current Wounds remaining. Best for grappling, shoving, disarming, pinning, and control.",
      }),
    ],
  }),

  weapon({
    id: "crowbar",
    label: "Crowbar",
    category: "melee",
    categoryLabel: "Melee Weapons",
    sortOrder: 20,
    profiles: [
      profile({
        id: "standard",
        label: "Strike — 1d5",
        diceCount: 1,
        dieSize: 5,
        woundType: "blunt_force",
        tacEligible: false,
        notes:
          "Utility and prying tool. Poor against armor unless exploiting an exposed joint or damaged component.",
      }),
    ],
  }),

  weapon({
    id: "scalpel",
    label: "Scalpel",
    category: "melee",
    categoryLabel: "Melee Weapons",
    sortOrder: 30,
    profiles: [
      profile({
        id: "standard",
        label: "Precision Cut — 1d10",
        diceCount: 1,
        dieSize: 10,
        woundType: "bleeding",
        tacEligible: false,
        notes:
          "Poor reach and durability. Stronger when paired with medical knowledge, surprise, restraint, or precise anatomical targeting.",
      }),
    ],
  }),

  weapon({
    id: "stun_baton",
    label: "Stun Baton",
    category: "melee",
    categoryLabel: "Melee Weapons",
    sortOrder: 40,
    profiles: [
      profile({
        id: "standard",
        label: "Shock Strike — 1d5",
        diceCount: 1,
        dieSize: 5,
        woundType: "less_lethal",
        tacEligible: false,
        notes:
          "After a hit, the target makes a Body Save. Sealed, insulated, armored, or powered targets may resist the stun effect.",
      }),
    ],
  }),

  weapon({
    id: "breaching_axe",
    label: "Breaching Axe",
    category: "melee",
    categoryLabel: "Melee Weapons",
    sortOrder: 50,
    profiles: [
      profile({
        id: "blade",
        label: "Blade — 2d10 Bleeding",
        diceCount: 2,
        dieSize: 10,
        woundType: "bleeding",
        tacEligible: false,
        notes:
          "Heavy forced-entry tool. Useful against light doors, damaged panels, debris, restraints, and soft targets.",
      }),
      profile({
        id: "blunt",
        label: "Back / Pry — 2d10 Blunt",
        diceCount: 2,
        dieSize: 10,
        woundType: "blunt_force",
        tacEligible: false,
        notes:
          "Blunt, hook, smash, or prying use.",
      }),
    ],
  }),

  weapon({
    id: "vibechete",
    label: "Vibechete",
    category: "melee",
    categoryLabel: "Melee Weapons",
    sortOrder: 60,
    profiles: [
      profile({
        id: "standard",
        label: "Powered Cut — 3d10",
        diceCount: 3,
        dieSize: 10,
        woundType: "bleeding",
        tacEligible: false,
        notes:
          "Powered blade for organic material, vegetation, and brutal close combat. Ineffective against reinforced metal or vehicle armor.",
      }),
      profile({
        id: "severe_trauma",
        label: "Severe Trauma — 3d10 Massive Gore",
        diceCount: 3,
        dieSize: 10,
        woundType: "massive_gore",
        tacEligible: false,
        notes:
          "Use when the fiction supports catastrophic cutting or limb-severing trauma.",
      }),
    ],
  }),

  weapon({
    id: "pintle_gun",
    label: "Pintle Gun / Roof Gun",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 10,
    profiles: [
      profile({
        id: "standard",
        label: "Mounted Fire — 3d10",
        diceCount: 3,
        dieSize: 10,
        woundType: "gunshot",
        preferredTacCategory: "sensors_fire_control",
        notes:
          "Anti-infantry and suppression mount. Not an anti-armor weapon. AP belts may improve penetration to Piercing.",
      }),
      profile({
        id: "exposed_infantry",
        label: "Exposed Infantry — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "gunshot",
        notes:
          "Use against clearly exposed infantry where the mounted fire has decisive effect.",
      }),
    ],
  }),

  weapon({
    id: "door_gun",
    label: "Door Gun / Gunship Mount",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 20,
    profiles: [
      profile({
        id: "standard",
        label: "Suppressive Fire — 3d10",
        diceCount: 3,
        dieSize: 10,
        woundType: "gunshot",
        preferredTacCategory: "crew_cockpit",
        notes:
          "Landing-zone and extraction suppression. Weak against sealed armor, tanks, and walkers.",
      }),
      profile({
        id: "exposed_infantry",
        label: "Exposed Infantry — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "gunshot",
        notes:
          "Use against exposed infantry or unprotected crews.",
      }),
    ],
  }),

  weapon({
    id: "riot_cannon",
    label: "Riot Cannon / Foam Projector",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 30,
    profiles: [
      profile({
        id: "impact",
        label: "Dangerous Impact — 1d10",
        diceCount: 1,
        dieSize: 10,
        woundType: "less_lethal",
        preferredTacCategory: "mobility",
        notes:
          "Primarily a control and mobility-denial system. Use damage only when the impact or misuse is dangerous.",
      }),
    ],
  }),

  weapon({
    id: "light_autocannon",
    label: "Light Autocannon / 20–30mm",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 40,
    profiles: [
      profile({
        id: "standard",
        label: "Anti-Light Armor — 4d10",
        diceCount: 4,
        dieSize: 10,
        penetration: "piercing",
        woundType: "massive_gore",
        preferredTacCategory: "sensors_fire_control",
        notes:
          "Shreds light vehicles, drones, aircraft, barricades, and exposed systems. Against heavy armor, seek weak angles or external components.",
      }),
    ],
  }),

  weapon({
    id: "autocannon_60mm",
    label: "60mm Autocannon",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 50,
    profiles: [
      profile({
        id: "vehicle",
        label: "Vehicle / Walker — 4d10",
        diceCount: 4,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "massive_gore",
        preferredTacCategory: "armor_structure",
        notes:
          "Repeated anti-armor pressure, armor spalling, actuator damage, sensor destruction, and hardpoint stripping.",
      }),
      profile({
        id: "exposed_infantry",
        label: "Exposed Infantry — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "massive_gore",
        notes:
          "A meaningful hit against exposed infantry is catastrophic.",
      }),
    ],
  }),

  weapon({
    id: "tactical_missile",
    label: "Tactical Missile Box",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 60,
    profiles: [
      profile({
        id: "single",
        label: "Single Missile — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Single anti-armor missile. Locks, countermeasures, point defense, and terrain may matter.",
      }),
      profile({
        id: "full_volley",
        label: "Full Volley — 8d10",
        diceCount: 8,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Four-missile volley for burst anti-armor or area effect.",
      }),
      profile({
        id: "vulnerable_target",
        label: "Vulnerable Target — 2 Vehicle Wounds",
        mode: "direct_wounds",
        directWounds: 2,
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Use only against a vulnerable target when the full volley has a decisive firing solution.",
      }),
    ],
  }),

  weapon({
    id: "main_gun_120mm",
    label: "120mm Main Gun",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 70,
    profiles: [
      profile({
        id: "standard",
        label: "Main Gun — 8d10",
        diceCount: 8,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "massive_gore",
        preferredTacCategory: "armor_structure",
        notes:
          "Tank and walker killer. Slow fire creates a meaningful reload and reposition window.",
      }),
    ],
  }),

  weapon({
    id: "heavy_mortar",
    label: "Heavy Mortar System",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 80,
    profiles: [
      profile({
        id: "high_explosive",
        label: "High Explosive — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "standard",
        woundType: "fire_explosive",
        preferredTacCategory: "mobility",
        notes:
          "Indirect fire and area denial. Other payloads should be adjusted manually.",
      }),
      profile({
        id: "exposed_target",
        label: "Exposed Target — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "fire_explosive",
        notes:
          "Direct or near exposure where the payload justifies a Wound.",
      }),
    ],
  }),

  weapon({
    id: "siege_cannon",
    label: "Heavy Cannon / Siege Cannon",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 90,
    profiles: [
      profile({
        id: "standard",
        label: "Heavy Direct Fire — 8d10",
        diceCount: 8,
        dieSize: 10,
        penetration: "siege",
        woundType: "fire_explosive",
        coverInteraction: "breach",
        preferredTacCategory: "armor_structure",
        notes:
          "Armor-overmatch and fortification-breach profile. Increase to 10d10 for the heaviest models.",
      }),
      profile({
        id: "decisive_breach",
        label: "Decisive Breach — 2 Vehicle Wounds",
        mode: "direct_wounds",
        directWounds: 2,
        penetration: "siege",
        woundType: "fire_explosive",
        preferredTacCategory: "armor_structure",
        notes:
          "Use when a clean siege hit decisively breaches a heavy target.",
      }),
    ],
  }),

  weapon({
    id: "walker_rail_package",
    label: "Walker Rail Package",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 100,
    profiles: [
      profile({
        id: "full_charge",
        label: "Full Charge — 10d10",
        diceCount: 10,
        dieSize: 10,
        penetration: "siege",
        woundType: "massive_gore",
        coverInteraction: "breach",
        preferredTacCategory: "armor_structure",
        notes:
          "Mounted armor-overmatch line shot. Requires charge time, cooling, power, and a stable firing window.",
      }),
    ],
  }),

  weapon({
    id: "rocket_pod",
    label: "Air-to-Ground Rocket Pod",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 110,
    profiles: [
      profile({
        id: "area",
        label: "Area Saturation — 4d10",
        diceCount: 4,
        dieSize: 10,
        penetration: "standard",
        woundType: "fire_explosive",
        preferredTacCategory: "mobility",
        notes:
          "Blunt aircraft saturation strike against infantry positions, light vehicles, and exposed logistics.",
      }),
      profile({
        id: "exposed_cluster",
        label: "Exposed Cluster — 1 Wound",
        mode: "direct_wounds",
        directWounds: 1,
        woundType: "fire_explosive",
        notes:
          "Use against an exposed cluster where the saturation strike has decisive effect.",
      }),
    ],
  }),

  weapon({
    id: "gunship_chin_cannon",
    label: "Gunship Chin Cannon",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 120,
    profiles: [
      profile({
        id: "light_model",
        label: "Light Model — 4d10",
        diceCount: 4,
        dieSize: 10,
        penetration: "piercing",
        woundType: "massive_gore",
        preferredTacCategory: "sensors_fire_control",
        notes:
          "Stabilized air-support cannon for infantry, light armor, and exposed ground targets.",
      }),
      profile({
        id: "heavy_model",
        label: "Heavy Model — 6d10",
        diceCount: 6,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "massive_gore",
        preferredTacCategory: "armor_structure",
        notes:
          "Heavier anti-light-armor gunship cannon model.",
      }),
    ],
  }),

  weapon({
    id: "air_defense_missile",
    label: "Air-Defense Missile / Interceptor Rack",
    category: "vehicle_weapons",
    categoryLabel: "Vehicle Weapons",
    sortOrder: 130,
    profiles: [
      profile({
        id: "standard",
        label: "Interceptor — 5d10",
        diceCount: 5,
        dieSize: 10,
        penetration: "anti_armor",
        woundType: "fire_explosive",
        preferredTacCategory: "mobility",
        notes:
          "Heavy mission-kill threat against aircraft, drones, missiles, and low-orbit insertion craft.",
      }),
    ],
  }),
]);

export function getActiveDamageWeaponPresets() {
  return [...DAMAGE_WEAPON_PRESETS];
}

export function getDamageWeaponPreset(presetId) {
  return (
    DAMAGE_WEAPON_PRESETS.find(
      (preset) => preset.id === presetId,
    ) ?? null
  );
}

export function getDamageWeaponProfile(
  presetOrId,
  profileId = null,
) {
  const preset =
    typeof presetOrId === "string"
      ? getDamageWeaponPreset(presetOrId)
      : presetOrId;

  if (!preset) {
    return null;
  }

  return (
    preset.profiles.find(
      (entry) => entry.id === profileId,
    )
    ?? preset.profiles[0]
    ?? null
  );
}
