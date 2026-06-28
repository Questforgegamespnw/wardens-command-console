export const GROUND_TO_SHIP_SIZE_EQUIVALENTS = Object.freeze({
  infantry_small_arms: { id: "infantry_small_arms", label: "Infantry weapons / grenades", shipWeaponSizeRange: [0,0] },
  infantry_siege: { id: "infantry_siege", label: "Infantry siege / Orion / demo charge", shipWeaponSizeRange: [0,1] },
  vehicle_weapons: { id: "vehicle_weapons", label: "Vehicle autocannons / rockets / missiles", shipWeaponSizeRange: [1,2] },
  heavy_vehicle_weapons: { id: "heavy_vehicle_weapons", label: "Tank guns / heavy launchers / heavy missiles", shipWeaponSizeRange: [2,3] },
  super_heavy_ground: { id: "super_heavy_ground", label: "S.H.M.A.C. / Anvil / strategic ground weapon", shipWeaponSizeRange: [3,5] },
});

export const DIRTSIDE_VULNERABILITY_STATES = Object.freeze([
  "landed","hovering_low","taking_off","landing","docking","loading",
  "ramp_open","bay_open","gear_deployed","thrusters_exposed",
  "radiators_exposed","weapons_extended","shielding_offline",
  "shielding_directional","atmosphere_rated_posture",
  "pinned_by_terrain","pinned_by_weather","pinned_by_traffic","pinned_by_mission",
]);

export const EXPOSED_SHIP_TARGETS = Object.freeze([
  "crew","sensors","open_bays","landing_gear","thrusters","radiators",
  "external_weapons","ramps","cargo","already_damaged_sections",
]);
