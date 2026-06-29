export const VEHICLE_PLATFORM_TYPES = Object.freeze([
  "light_vehicle",
  "apc_armored_truck",
  "tank_heavy_ifv",
  "walker",
  "aircraft_vtol",
  "drone",
  "super_heavy",
]);

export const VEHICLE_PLATFORM_RULES = Object.freeze({
  light_vehicle: Object.freeze({
    label: "Light Vehicle",
    guidance: "A Moderate TAC may mission-kill the platform; Severe usually disables or destroys it.",
  }),
  apc_armored_truck: Object.freeze({
    label: "APC / Armored Truck",
    guidance: "Favor mobility, hatch, troop-bay, roof-weapon, and cabin consequences.",
  }),
  tank_heavy_ifv: Object.freeze({
    label: "Tank / Heavy IFV",
    guidance: "A mobility kill or sensor loss changes the tactical problem without requiring destruction.",
  }),
  walker: Object.freeze({
    label: "Walker",
    guidance: "Favor posture, limb, stabilizer, carried-weapon, sensor-head, and cockpit consequences.",
  }),
  aircraft_vtol: Object.freeze({
    label: "Aircraft / VTOL",
    guidance: "Moderate Mobility TAC should create a landing problem; Severe usually creates a crash emergency.",
  }),
  drone: Object.freeze({
    label: "Drone",
    guidance: "Favor disabling sensors, relays, movement, weapon mounts, or batteries over long durability tracking.",
  }),
  super_heavy: Object.freeze({
    label: "Super-Heavy Platform",
    guidance: "Apply TAC to a named section or subsystem rather than treating the whole platform as one system.",
  }),
});
