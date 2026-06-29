import { VEHICLE_TAC_CATEGORIES, VEHICLE_TAC_CATEGORY_LABELS } from "./categories.js";
import { VEHICLE_TAC_MOBILITY } from "./mobility.js";
import { VEHICLE_TAC_WEAPONS } from "./weapons.js";
import { VEHICLE_TAC_SENSORS_FIRE_CONTROL } from "./sensors-fire-control.js";
import { VEHICLE_TAC_CREW_COCKPIT } from "./crew-cockpit.js";
import { VEHICLE_TAC_POWER_SYSTEMS } from "./power-systems.js";
import { VEHICLE_TAC_ARMOR_STRUCTURE } from "./armor-structure.js";
import { VEHICLE_TAC_CATASTROPHIC } from "./catastrophic.js";
import { VEHICLE_PLATFORM_TYPES, VEHICLE_PLATFORM_RULES } from "./platform-rules.js";

export const VEHICLE_TAC_SEVERITIES = Object.freeze([
  "light",
  "moderate",
  "severe",
  "catastrophic",
]);

export const VEHICLE_SUBSYSTEM_CONDITIONS = Object.freeze([
  "operational",
  "degraded",
  "compromised",
  "failing",
  "destroyed",
]);

export const VEHICLE_TAC_TABLES = Object.freeze({
  mobility: VEHICLE_TAC_MOBILITY,
  weapons: VEHICLE_TAC_WEAPONS,
  sensors_fire_control: VEHICLE_TAC_SENSORS_FIRE_CONTROL,
  crew_cockpit: VEHICLE_TAC_CREW_COCKPIT,
  power_systems: VEHICLE_TAC_POWER_SYSTEMS,
  armor_structure: VEHICLE_TAC_ARMOR_STRUCTURE,
  catastrophic: VEHICLE_TAC_CATASTROPHIC,
});

export {
  VEHICLE_TAC_CATEGORIES,
  VEHICLE_TAC_CATEGORY_LABELS,
  VEHICLE_TAC_CATASTROPHIC,
  VEHICLE_PLATFORM_TYPES,
  VEHICLE_PLATFORM_RULES,
};

export function getVehicleTacTable(category) {
  return VEHICLE_TAC_TABLES[category] ?? null;
}

export function getVehicleTacOutcome(category, roll) {
  const table = getVehicleTacTable(category);
  if (!table) throw new RangeError(`Unknown Vehicle TAC category: ${category}`);
  const entry = table.find((candidate) => candidate.roll === Number(roll));
  if (!entry) throw new RangeError(`No Vehicle TAC result for ${category} roll ${roll}`);
  return entry;
}
