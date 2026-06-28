import { BLUNT_FORCE_WOUNDS } from "./blunt-force.js";
import { BLEEDING_WOUNDS } from "./bleeding.js";
import { GUNSHOT_WOUNDS } from "./gunshot.js";
import { FIRE_EXPLOSIVE_WOUNDS } from "./fire-explosive.js";
import { MASSIVE_GORE_WOUNDS } from "./massive-gore.js";
import { LESS_LETHAL_WOUNDS } from "./less-lethal.js";
import { ASPHYXIATION_WOUNDS } from "./asphyxiation.js";
import { VACUUM_DECOMPRESSION_WOUNDS } from "./vacuum-decompression.js";
import { ELECTRICAL_WOUNDS } from "./electrical.js";
import { TOXIC_CHEMICAL_WOUNDS } from "./toxic-chemical.js";
import { PRESSURE_BAROTRAUMA_WOUNDS } from "./pressure-barotrauma.js";

export const WOUND_TABLES = Object.freeze({
  blunt_force: BLUNT_FORCE_WOUNDS,
  bleeding: BLEEDING_WOUNDS,
  gunshot: GUNSHOT_WOUNDS,
  fire_explosive: FIRE_EXPLOSIVE_WOUNDS,
  massive_gore: MASSIVE_GORE_WOUNDS,
  less_lethal: LESS_LETHAL_WOUNDS,
  asphyxiation: ASPHYXIATION_WOUNDS,
  vacuum_decompression: VACUUM_DECOMPRESSION_WOUNDS,
  electrical: ELECTRICAL_WOUNDS,
  toxic_chemical: TOXIC_CHEMICAL_WOUNDS,
  pressure_barotrauma: PRESSURE_BAROTRAUMA_WOUNDS,
});
export function getWoundTable(tableId) {
  return WOUND_TABLES[tableId] ?? null;
}

export function getWoundEntries(tableId, severity) {
  const woundTable = getWoundTable(tableId);
  if (!woundTable) return [];

  if (woundTable.mode === "compact_d10") {
    return woundTable.entries.filter((item) => item.severity === severity);
  }

  // Supports both the recovered d5 format (`tables`) and the legacy split format (`bands`).
  return woundTable.tables?.[severity] ?? woundTable.bands?.[severity]?.entries ?? [];
}

export function getWoundEntry(tableId, severity, roll) {
  const numericRoll = Number(roll);
  return (
    getWoundEntries(tableId, severity).find(
      (item) => item.roll === numericRoll,
    ) ?? null
  );
}

export {
  BLUNT_FORCE_WOUNDS,
  BLEEDING_WOUNDS,
  GUNSHOT_WOUNDS,
  FIRE_EXPLOSIVE_WOUNDS,
  MASSIVE_GORE_WOUNDS,
  LESS_LETHAL_WOUNDS,
  ASPHYXIATION_WOUNDS,
  VACUUM_DECOMPRESSION_WOUNDS,
  ELECTRICAL_WOUNDS,
  TOXIC_CHEMICAL_WOUNDS,
  PRESSURE_BAROTRAUMA_WOUNDS,
};
