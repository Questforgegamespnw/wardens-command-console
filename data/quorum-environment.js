export const QUORUM_DEFAULT_DISTRICTS = Object.freeze([
  { id: "command_spire", label: "Command Spire / Bridge Court", type: "command" },
  { id: "security_court", label: "Security Court", type: "security" },
  { id: "corporate_offices", label: "Corporate Offices", type: "administrative" },
  { id: "grand_concourse", label: "Grand Concourse", type: "civic" },
  { id: "market_services", label: "Market / Services", type: "commerce" },
  { id: "habitation_stacks", label: "Habitation Stacks", type: "residential" },
  { id: "transit_core", label: "Transit Core", type: "transit" },
  { id: "cargo_spine", label: "Cargo Spine", type: "industrial" },
  { id: "engineering_depths", label: "Engineering Depths", type: "system" },
  { id: "docking_gallery", label: "Docking / Shuttle Bays", type: "docking" },
  { id: "outer_hull_access", label: "Outer Hull Access", type: "exterior" },
]);

export const QUORUM_ALERT_TRACK = Object.freeze([
  { value: 0, id: "quiet", label: "Quiet" },
  { value: 1, id: "watched", label: "Watched" },
  { value: 2, id: "questioned", label: "Questioned" },
  { value: 3, id: "flagged", label: "Flagged" },
  { value: 4, id: "pursued", label: "Pursued" },
  { value: 5, id: "locked_down", label: "Locked Down" },
  { value: 6, id: "kill_capture", label: "Kill / Capture Authority" },
]);

export const QUORUM_CRISIS_CLOCK = Object.freeze([
  { value: 0, id: "rumor", label: "Rumor / Early Signs" },
  { value: 1, id: "public_inconvenience", label: "Public Inconvenience" },
  { value: 2, id: "services_strain", label: "Prices Rise / Services Strain" },
  { value: 3, id: "factions_mobilize", label: "Factions Mobilize" },
  { value: 4, id: "violence_failure", label: "Violence or System Failure" },
  { value: 5, id: "lockdown_breach", label: "Lockdown / Riot / Breach" },
  { value: 6, id: "permanent_change", label: "Permanent Change" },
]);

export const QUORUM_DAMAGE_EFFECT_TYPES = Object.freeze([
  "district_integrity_loss", "system_failure", "route_closure",
  "population_casualties", "faction_shift", "alert_increase",
  "crisis_clock_advance", "external_battery_loss", "escort_capacity_loss",
]);
