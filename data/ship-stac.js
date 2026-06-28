export const SHIP_STAC_SEVERITIES = Object.freeze({
  minor: { id: "minor", label: "Minor S-TAC", effects: ["-10 to one relevant ship check", "Disadvantage on one immediate action", "One damage-control action clears it"] },
  moderate: { id: "moderate", label: "Moderate S-TAC", effects: ["Reduce one Stat by 5–10", "Disable one system until repaired", "Force nearby crew to Save", "Immediate damage control required"] },
  severe: { id: "severe", label: "Severe S-TAC", effects: ["Create an urgent countdown", "Apply a specific fictional location", "Consider Critical or Megadamage"] },
  broken: { id: "broken", label: "Broken / Offline", effects: ["System destroyed, vented, burned, or unrecoverable in scene"] },
});

export const SHIP_STAC_LOCATIONS = Object.freeze([
  { id: "thrusters", label: "Thrusters / Maneuvering", section: "drive" },
  { id: "main_drive", label: "Main Drive / Burn Control", section: "drive" },
  { id: "weapons", label: "Weapons / Hardpoint", section: "weapons" },
  { id: "sensors", label: "Sensors / Targeting", section: "command" },
  { id: "power", label: "Power / Reactor", section: "power" },
  { id: "life_support", label: "Life Support / Pressure", section: "life_support" },
  { id: "cargo_structure", label: "Cargo / Internal Structure", section: "hangar_cargo" },
  { id: "command", label: "Command / Bridge / Cockpit", section: "command" },
  { id: "jump_nav", label: "Jump Drive / Nav Core", section: "drive" },
  { id: "crew_compartment", label: "Crew Compartment / Random Room", section: "habitation" },
  { id: "hangar_payload", label: "Hangar / Mission Payload", section: "hangar_cargo" },
]);

export const SMALL_SHIP_SEVERE_STAC_RULE = Object.freeze({
  appliesToClasses: [1,2],
  one: "A crisis.",
  twoUnresolved: "Probably disabled.",
  threeUnresolved: "Abandon ship, surrender, or die.",
});

export function getShipStacLocation(id) {
  const result = SHIP_STAC_LOCATIONS.find((entry) => entry.id === id);
  if (!result) throw new RangeError(`Unknown S-TAC location: ${id}`);
  return result;
}
