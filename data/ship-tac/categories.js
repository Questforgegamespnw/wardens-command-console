export const SHIP_TAC_CATEGORIES = Object.freeze([
  { id: "sensors_fire_control", label: "Sensors / Fire Control", sortOrder: 10 },
  { id: "mobility_thrusters", label: "Mobility / Thrusters", sortOrder: 20 },
  { id: "armor_structure", label: "Armor / Structure", sortOrder: 30 },
  { id: "power_systems", label: "Power / Systems", sortOrder: 40 },
  { id: "crew_habitation", label: "Crew / Habitation", sortOrder: 50 },
  { id: "weapons", label: "Weapons", sortOrder: 60 },
  { id: "life_support_seal", label: "Life Support / Seal", sortOrder: 70 },
  { id: "cargo_mission_asset", label: "Cargo / Mission Asset", sortOrder: 80 },
]);

export function getShipTacCategory(id) {
  const result = SHIP_TAC_CATEGORIES.find((entry) => entry.id === id);
  if (!result) throw new RangeError(`Unknown Ship TAC category: ${id}`);
  return result;
}
