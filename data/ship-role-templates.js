export const SHIP_ROLE_TEMPLATES = Object.freeze({
  light_civilian: { id: "light_civilian", label: "Light Civilian", hullBias: 0, prBias: -1, thrustersBias: 0, battleBias: -2, systemsBias: 0, hardpointFocus: "defensive" },
  heavy_commercial: { id: "heavy_commercial", label: "Heavy Commercial", hullBias: 1, prBias: -1, thrustersBias: -1, battleBias: -2, systemsBias: 1, hardpointFocus: "utility_defense" },
  independent_operator: { id: "independent_operator", label: "Independent Operator", hullBias: 0, prBias: 0, thrustersBias: 1, battleBias: 0, systemsBias: 0, hardpointFocus: "flexible_limited" },
  science_survey: { id: "science_survey", label: "Science / Survey", hullBias: 0, prBias: -1, thrustersBias: 0, battleBias: -2, systemsBias: 2, hardpointFocus: "sensors_mission" },
  colony_ark: { id: "colony_ark", label: "Colony / Ark", hullBias: 2, prBias: -1, thrustersBias: -2, battleBias: -2, systemsBias: 1, hardpointFocus: "defensive_infrastructure" },
  patrol_enforcement: { id: "patrol_enforcement", label: "Patrol / Enforcement", hullBias: 0, prBias: 1, thrustersBias: 1, battleBias: 1, systemsBias: 1, hardpointFocus: "disabling_boarding" },
  naval_combatant: { id: "naval_combatant", label: "Naval Combatant", hullBias: 1, prBias: 2, thrustersBias: 0, battleBias: 2, systemsBias: 1, hardpointFocus: "military" },
  carrier_tender: { id: "carrier_tender", label: "Carrier / Tender", hullBias: 1, prBias: 1, thrustersBias: -1, battleBias: 0, systemsBias: 2, hardpointFocus: "wings_defense" },
  corporate_recovery: { id: "corporate_recovery", label: "Corporate Recovery", hullBias: 0, prBias: 1, thrustersBias: 0, battleBias: 0, systemsBias: 2, hardpointFocus: "disabling_recovery" },
  quorum_sovereign: { id: "quorum_sovereign", label: "Quorum / Sovereign", hullBias: null, prBias: 2, thrustersBias: -1, battleBias: 2, systemsBias: 3, hardpointFocus: "distributed_batteries_strategic" },
});

export function getShipRoleTemplate(id) {
  const result = SHIP_ROLE_TEMPLATES[id];
  if (!result) throw new RangeError(`Unknown role template: ${id}`);
  return result;
}
