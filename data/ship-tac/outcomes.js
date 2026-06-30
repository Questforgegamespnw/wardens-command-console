export const SHIP_TAC_OUTCOMES = Object.freeze([
  {
    "id": "sensors_fire_control_minor",
    "category": "sensors_fire_control",
    "severity": "minor",
    "label": "Sensor Ghosting",
    "effectText": "One immediate Sensors or Battle action suffers -10 or Disadvantage.",
    "handoffs": []
  },
  {
    "id": "sensors_fire_control_moderate",
    "category": "sensors_fire_control",
    "severity": "moderate",
    "label": "Blind Arc",
    "effectText": "One sensor or fire-control arc is unavailable until rerouted or repaired.",
    "handoffs": []
  },
  {
    "id": "sensors_fire_control_severe",
    "category": "sensors_fire_control",
    "severity": "severe",
    "label": "Targeting Cascade",
    "effectText": "Create an urgent countdown; locks, IFF, and threat detection are unreliable.",
    "handoffs": []
  },
  {
    "id": "sensors_fire_control_broken",
    "category": "sensors_fire_control",
    "severity": "broken",
    "label": "Sensor Core Destroyed",
    "effectText": "The selected sensor or fire-control location is offline until major repair.",
    "handoffs": []
  },
  {
    "id": "mobility_thrusters_minor",
    "category": "mobility_thrusters",
    "severity": "minor",
    "label": "Thruster Lag",
    "effectText": "One immediate maneuver suffers -10 or Disadvantage.",
    "handoffs": []
  },
  {
    "id": "mobility_thrusters_moderate",
    "category": "mobility_thrusters",
    "severity": "moderate",
    "label": "Drive Cluster Offline",
    "effectText": "Reduce Thrusters by 10 and lose one movement option until repaired.",
    "handoffs": []
  },
  {
    "id": "mobility_thrusters_severe",
    "category": "mobility_thrusters",
    "severity": "severe",
    "label": "Uncontrolled Burn",
    "effectText": "Create an urgent course or collision countdown.",
    "handoffs": []
  },
  {
    "id": "mobility_thrusters_broken",
    "category": "mobility_thrusters",
    "severity": "broken",
    "label": "Drive Section Destroyed",
    "effectText": "The selected mobility system is offline; the ship may be dead in the water.",
    "handoffs": []
  },
  {
    "id": "armor_structure_minor",
    "category": "armor_structure",
    "severity": "minor",
    "label": "Buckled Plating",
    "effectText": "The section is degraded and vulnerable to repeat hits.",
    "handoffs": []
  },
  {
    "id": "armor_structure_moderate",
    "category": "armor_structure",
    "severity": "moderate",
    "label": "Compartment Damage",
    "effectText": "A bulkhead, frame, or mount is compromised and needs immediate stabilization.",
    "handoffs": []
  },
  {
    "id": "armor_structure_severe",
    "category": "armor_structure",
    "severity": "severe",
    "label": "Hull Breach",
    "effectText": "Create decompression and route-closure handoffs at the selected location.",
    "handoffs": [
      "decompression"
    ]
  },
  {
    "id": "armor_structure_broken",
    "category": "armor_structure",
    "severity": "broken",
    "label": "Structural Failure",
    "effectText": "The selected structure is destroyed; redirect future hits or advance Megadamage.",
    "handoffs": []
  },
  {
    "id": "power_systems_minor",
    "category": "power_systems",
    "severity": "minor",
    "label": "Power Fluctuation",
    "effectText": "One immediate Systems action suffers -10 or Disadvantage.",
    "handoffs": []
  },
  {
    "id": "power_systems_moderate",
    "category": "power_systems",
    "severity": "moderate",
    "label": "Power Bus Failure",
    "effectText": "Disable one powered function until rerouted.",
    "handoffs": []
  },
  {
    "id": "power_systems_severe",
    "category": "power_systems",
    "severity": "severe",
    "label": "Reactor or Grid Crisis",
    "effectText": "Create an overload, radiation, or shutdown countdown.",
    "handoffs": [
      "radiation_or_overload"
    ]
  },
  {
    "id": "power_systems_broken",
    "category": "power_systems",
    "severity": "broken",
    "label": "Power System Destroyed",
    "effectText": "The selected power location is offline until major repair.",
    "handoffs": []
  },
  {
    "id": "crew_habitation_minor",
    "category": "crew_habitation",
    "severity": "minor",
    "label": "Crew Disruption",
    "effectText": "Nearby crew must brace; one station action suffers -10.",
    "handoffs": []
  },
  {
    "id": "crew_habitation_moderate",
    "category": "crew_habitation",
    "severity": "moderate",
    "label": "Station Casualties",
    "effectText": "Require a Save and leave one operator position impaired or vacant.",
    "handoffs": [
      "crew"
    ]
  },
  {
    "id": "crew_habitation_severe",
    "category": "crew_habitation",
    "severity": "severe",
    "label": "Compartment Casualty Event",
    "effectText": "Create crew exposure and possible Wound handoffs.",
    "handoffs": [
      "crew"
    ]
  },
  {
    "id": "crew_habitation_broken",
    "category": "crew_habitation",
    "severity": "broken",
    "label": "Compartment Lost",
    "effectText": "The selected crew or habitation location is destroyed, vented, or inaccessible.",
    "handoffs": []
  },
  {
    "id": "weapons_minor",
    "category": "weapons",
    "severity": "minor",
    "label": "Weapon Fault",
    "effectText": "One immediate weapon action suffers -10 or Disadvantage.",
    "handoffs": []
  },
  {
    "id": "weapons_moderate",
    "category": "weapons",
    "severity": "moderate",
    "label": "Mount Disabled",
    "effectText": "One weapon function is unavailable until repaired or manually cleared.",
    "handoffs": []
  },
  {
    "id": "weapons_severe",
    "category": "weapons",
    "severity": "severe",
    "label": "Magazine or Capacitor Crisis",
    "effectText": "Create a fire, detonation, or overload countdown.",
    "handoffs": [
      "fire_or_detonation"
    ]
  },
  {
    "id": "weapons_broken",
    "category": "weapons",
    "severity": "broken",
    "label": "Weapon System Destroyed",
    "effectText": "The selected weapon location is offline until replacement or dock repair.",
    "handoffs": []
  },
  {
    "id": "life_support_seal_minor",
    "category": "life_support_seal",
    "severity": "minor",
    "label": "Pressure Warning",
    "effectText": "One immediate action in the affected section suffers -10 or requires manual control.",
    "handoffs": []
  },
  {
    "id": "life_support_seal_moderate",
    "category": "life_support_seal",
    "severity": "moderate",
    "label": "Atmosphere Instability",
    "effectText": "Oxygen, scrubbers, pressure, or thermal control is compromised.",
    "handoffs": []
  },
  {
    "id": "life_support_seal_severe",
    "category": "life_support_seal",
    "severity": "severe",
    "label": "Decompression Event",
    "effectText": "Create decompression, air-loss, and crew-exposure handoffs.",
    "handoffs": [
      "decompression",
      "air_loss"
    ]
  },
  {
    "id": "life_support_seal_broken",
    "category": "life_support_seal",
    "severity": "broken",
    "label": "Life Support Section Lost",
    "effectText": "The selected life-support location is offline or vented.",
    "handoffs": [
      "decompression",
      "air_loss"
    ]
  },
  {
    "id": "cargo_mission_asset_minor",
    "category": "cargo_mission_asset",
    "severity": "minor",
    "label": "Cargo Shift",
    "effectText": "A mission asset is delayed, unsecured, or difficult to access.",
    "handoffs": []
  },
  {
    "id": "cargo_mission_asset_moderate",
    "category": "cargo_mission_asset",
    "severity": "moderate",
    "label": "Mission Asset Damaged",
    "effectText": "One cargo, passenger, hangar, or objective function is disabled.",
    "handoffs": []
  },
  {
    "id": "cargo_mission_asset_severe",
    "category": "cargo_mission_asset",
    "severity": "severe",
    "label": "Payload Crisis",
    "effectText": "Create a fire, contamination, decompression, escape, or mission-loss countdown.",
    "handoffs": [
      "mission_crisis"
    ]
  },
  {
    "id": "cargo_mission_asset_broken",
    "category": "cargo_mission_asset",
    "severity": "broken",
    "label": "Mission Asset Lost",
    "effectText": "The selected cargo or mission location is destroyed or unrecoverable.",
    "handoffs": []
  }
]);

export function getShipTacOutcomes(categoryId, severity) {
  return SHIP_TAC_OUTCOMES.filter(
    (entry) => entry.category === categoryId && entry.severity === severity
  );
}
