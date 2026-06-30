export const SHIP_DAMAGE_MODELS = Object.freeze({
  pooled_hull: "pooled_hull",
  pooled_hull_sections: "pooled_hull_sections",
  sectional_capital: "sectional_capital",
  district_environment: "district_environment",
});

export const SHIP_CLASSES = Object.freeze([
  { classId: 0, label: "Class-0", name: "Small Craft", hullRange: [1,3], prRange: [0,1], weaponSizeRange: [0,1], hardpointRange: [0,1], damageModel: "pooled_hull", meaning: "A room with engines." },
  { classId: 1, label: "Class-I", name: "Light Ship", hullRange: [2,5], prRange: [0,2], weaponSizeRange: [1,2], hardpointRange: [0,2], damageModel: "pooled_hull", meaning: "Small crew scale." },
  { classId: 2, label: "Class-II", name: "Medium Working Ship", hullRange: [4,8], prRange: [1,3], weaponSizeRange: [1,3], hardpointRange: [1,3], damageModel: "pooled_hull", meaning: "Campaign ship scale." },
  { classId: 3, label: "Class-III", name: "Heavy Commercial / Light Strategic", hullRange: [8,15], prRange: [1,4], weaponSizeRange: [2,4], hardpointRange: [2,5], damageModel: "pooled_hull", meaning: "Organizational asset." },
  { classId: 4, label: "Class-IV", name: "Light Military / Strategic", hullRange: [12,25], prRange: [2,5], weaponSizeRange: [3,5], hardpointRange: [4,8], damageModel: "pooled_hull_sections", meaning: "Real institutional power." },
  { classId: 5, label: "Class-V", name: "Medium Military / Heavy Strategic", hullRange: [20,40], prRange: [3,6], weaponSizeRange: [4,6], hardpointRange: [6,12], damageModel: "pooled_hull_sections", meaning: "Strategic approval required." },
  { classId: 6, label: "Class-VI", name: "Capital Ship", hullRange: [40,80], prRange: [4,7], weaponSizeRange: [5,7], hardpointRange: [12,30], damageModel: "sectional_capital", meaning: "Changes the local situation." },
  { classId: 7, label: "Class-VII", name: "Heavy Capital / Megastructure", hullRange: null, strategicIntegrityRange: [6,12], prRange: [5,8], weaponSizeRange: [6,8], hardpointRange: null, damageModel: "district_environment", meaning: "A ship that is also a place." },
  { classId: 8, label: "Class-VIII", name: "Sovereign / City-Scale", hullRange: null, strategicIntegrityRange: [8,16], prRange: [6,10], weaponSizeRange: [7,8], hardpointRange: null, damageModel: "district_environment", meaning: "Mobile civilization." },
]);

export const DEFAULT_MAJOR_SHIP_SECTIONS = Object.freeze([
  "command", "drive", "power", "weapons", "life_support", "hangar_cargo", "habitation",
]);

export const DEFAULT_ENVIRONMENT_DISTRICTS = Object.freeze([
  "command_spire", "security_court", "grand_concourse", "habitation_stacks",
  "transit_core", "cargo_spine", "engineering_depths", "docking_gallery",
  "outer_hull_access",
]);

export function getShipClass(classId) {
  const result = SHIP_CLASSES.find((entry) => entry.classId === Number(classId));
  if (!result) throw new RangeError(`Unknown ship class: ${classId}`);
  return result;
}

export function isEnvironmentScaleShip(classId) {
  return getShipClass(classId).damageModel === SHIP_DAMAGE_MODELS.district_environment;
}


export const STANDARD_MINIMUM_SHIP_WEAPON_SIZE = 1;
export const SPECIAL_MINIMUM_SHIP_WEAPON_SIZE = 0;

export function getShipDamageModel(classId) {
  return getShipClass(classId).damageModel;
}

export function usesPooledHull(classId) {
  return ["pooled_hull", "pooled_hull_sections"].includes(
    getShipDamageModel(classId)
  );
}

export function requiresMajorSection(classId) {
  return ["pooled_hull_sections", "sectional_capital"].includes(
    getShipDamageModel(classId)
  );
}

export function usesDistrictIntegrity(classId) {
  return getShipDamageModel(classId) === SHIP_DAMAGE_MODELS.district_environment;
}
