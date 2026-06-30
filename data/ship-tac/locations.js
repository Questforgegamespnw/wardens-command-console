export const SHIP_TAC_LOCATIONS = Object.freeze([
  {
    "id": "sensors_targeting",
    "label": "Sensors / Targeting",
    "category": "sensors_fire_control",
    "sortOrder": 10
  },
  {
    "id": "navigation_sensors",
    "label": "Navigation Sensors",
    "category": "sensors_fire_control",
    "sortOrder": 20
  },
  {
    "id": "fire_control_computer",
    "label": "Fire-Control Computer",
    "category": "sensors_fire_control",
    "sortOrder": 30
  },
  {
    "id": "communications_iff",
    "label": "Communications / IFF",
    "category": "sensors_fire_control",
    "sortOrder": 40
  },
  {
    "id": "maneuvering_thrusters",
    "label": "Maneuvering Thrusters",
    "category": "mobility_thrusters",
    "sortOrder": 10
  },
  {
    "id": "main_drive",
    "label": "Main Drive / Burn Control",
    "category": "mobility_thrusters",
    "sortOrder": 20
  },
  {
    "id": "jump_drive",
    "label": "Jump Drive",
    "category": "mobility_thrusters",
    "sortOrder": 30
  },
  {
    "id": "navigation_core",
    "label": "Navigation Core",
    "category": "mobility_thrusters",
    "sortOrder": 40
  },
  {
    "id": "landing_docking",
    "label": "Landing / Docking Systems",
    "category": "mobility_thrusters",
    "sortOrder": 50
  },
  {
    "id": "hull_plating",
    "label": "Hull Plating",
    "category": "armor_structure",
    "sortOrder": 10
  },
  {
    "id": "structural_frame",
    "label": "Structural Frame",
    "category": "armor_structure",
    "sortOrder": 20
  },
  {
    "id": "bulkhead_compartment",
    "label": "Bulkhead / Compartment",
    "category": "armor_structure",
    "sortOrder": 30
  },
  {
    "id": "hardpoint_mount",
    "label": "Hardpoint Mount",
    "category": "armor_structure",
    "sortOrder": 40
  },
  {
    "id": "external_radiator",
    "label": "External Radiator",
    "category": "armor_structure",
    "sortOrder": 50
  },
  {
    "id": "docking_spine",
    "label": "Docking Spine",
    "category": "armor_structure",
    "sortOrder": 60
  },
  {
    "id": "reactor",
    "label": "Reactor",
    "category": "power_systems",
    "sortOrder": 10
  },
  {
    "id": "power_routing",
    "label": "Power Routing",
    "category": "power_systems",
    "sortOrder": 20
  },
  {
    "id": "batteries_capacitors",
    "label": "Batteries / Capacitors",
    "category": "power_systems",
    "sortOrder": 30
  },
  {
    "id": "cooling",
    "label": "Cooling",
    "category": "power_systems",
    "sortOrder": 40
  },
  {
    "id": "computer_core",
    "label": "Computer Core",
    "category": "power_systems",
    "sortOrder": 50
  },
  {
    "id": "control_bus",
    "label": "Control Bus",
    "category": "power_systems",
    "sortOrder": 60
  },
  {
    "id": "bridge_cockpit",
    "label": "Bridge / Cockpit",
    "category": "crew_habitation",
    "sortOrder": 10
  },
  {
    "id": "crew_compartment",
    "label": "Crew Compartment",
    "category": "crew_habitation",
    "sortOrder": 20
  },
  {
    "id": "medbay",
    "label": "Medbay",
    "category": "crew_habitation",
    "sortOrder": 30
  },
  {
    "id": "gravity",
    "label": "Gravity",
    "category": "crew_habitation",
    "sortOrder": 40
  },
  {
    "id": "access_corridor",
    "label": "Access Corridor",
    "category": "crew_habitation",
    "sortOrder": 50
  },
  {
    "id": "crew_station",
    "label": "Crew Station",
    "category": "crew_habitation",
    "sortOrder": 60
  },
  {
    "id": "weapon_mount",
    "label": "Weapon Mount",
    "category": "weapons",
    "sortOrder": 10
  },
  {
    "id": "ammunition_feed",
    "label": "Ammunition Feed",
    "category": "weapons",
    "sortOrder": 20
  },
  {
    "id": "weapon_capacitor",
    "label": "Capacitor",
    "category": "weapons",
    "sortOrder": 30
  },
  {
    "id": "missile_rack",
    "label": "Missile Rack",
    "category": "weapons",
    "sortOrder": 40
  },
  {
    "id": "turret_traverse",
    "label": "Turret Traverse",
    "category": "weapons",
    "sortOrder": 50
  },
  {
    "id": "point_defense",
    "label": "Point Defense",
    "category": "weapons",
    "sortOrder": 60
  },
  {
    "id": "atmosphere",
    "label": "Atmosphere",
    "category": "life_support_seal",
    "sortOrder": 10
  },
  {
    "id": "pressure_seal",
    "label": "Pressure Seal",
    "category": "life_support_seal",
    "sortOrder": 20
  },
  {
    "id": "oxygen",
    "label": "Oxygen",
    "category": "life_support_seal",
    "sortOrder": 30
  },
  {
    "id": "scrubbers",
    "label": "Scrubbers",
    "category": "life_support_seal",
    "sortOrder": 40
  },
  {
    "id": "thermal_control",
    "label": "Thermal Control",
    "category": "life_support_seal",
    "sortOrder": 50
  },
  {
    "id": "radiation_shielding",
    "label": "Radiation Shielding",
    "category": "life_support_seal",
    "sortOrder": 60
  },
  {
    "id": "contamination_control",
    "label": "Contamination Control",
    "category": "life_support_seal",
    "sortOrder": 70
  },
  {
    "id": "cargo_bay",
    "label": "Cargo Bay",
    "category": "cargo_mission_asset",
    "sortOrder": 10
  },
  {
    "id": "hangar",
    "label": "Hangar",
    "category": "cargo_mission_asset",
    "sortOrder": 20
  },
  {
    "id": "mission_payload",
    "label": "Mission Payload",
    "category": "cargo_mission_asset",
    "sortOrder": 30
  },
  {
    "id": "passenger_module",
    "label": "Passenger Module",
    "category": "cargo_mission_asset",
    "sortOrder": 40
  },
  {
    "id": "cryo",
    "label": "Cryo",
    "category": "cargo_mission_asset",
    "sortOrder": 50
  },
  {
    "id": "escape_system",
    "label": "Escape System",
    "category": "cargo_mission_asset",
    "sortOrder": 60
  },
  {
    "id": "salvage_vip_objective",
    "label": "Salvage / VIP / Objective",
    "category": "cargo_mission_asset",
    "sortOrder": 70
  }
]);

export function listShipTacLocations(categoryId) {
  return SHIP_TAC_LOCATIONS.filter((entry) => entry.category === categoryId);
}

export function getShipTacLocation(id) {
  const result = SHIP_TAC_LOCATIONS.find((entry) => entry.id === id);
  if (!result) throw new RangeError(`Unknown Ship TAC location: ${id}`);
  return result;
}
