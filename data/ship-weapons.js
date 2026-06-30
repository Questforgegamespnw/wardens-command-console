export const SHIP_WEAPONS = Object.freeze({
  anti_personnel_turret: { id: "anti_personnel_turret", label: "Mounted MG / Anti-Personnel Turret", weaponSize: 0, baseSeverity: "no_effect", penetration: "none", rangeBands: ["close"], tags: ["anti_personnel","suppression"] },
  point_defense_cluster: { id: "point_defense_cluster", label: "Point-Defense Cluster", weaponSize: 1, baseSeverity: "glancing", penetration: "none", rangeBands: ["close"], tags: ["point_defense","anti_missile","anti_drone"], alternateBaseSeverity: { missiles: "solid", drones: "solid", shuttles: "solid" } },
  laser_cutter: { id: "laser_cutter", label: "Laser Cutter / Utility Laser", weaponSize: 1, baseSeverity: "solid", penetration: "none", conditionalPenetration: { exposed_systems: "piercing", unarmored_hull: "piercing" }, rangeBands: ["close","short"], tags: ["laser","utility","precision","heat"] },
  rigging_gun: { id: "rigging_gun", label: "Rigging Gun / Boarding Harpoon", weaponSize: 1, baseSeverity: "solid", penetration: "piercing", penetrationScope: "attachment_only", rangeBands: ["close"], tags: ["boarding","harpoon","tether","grapple"], lowDirectDamage: true },
  decoy_ecm: { id: "decoy_ecm", label: "Decoy Launcher / Basic ECM", weaponSize: 1, baseSeverity: null, penetration: "none", rangeBands: ["self","close","medium"], tags: ["defensive","ecm","decoy","chaff"], defensiveOnly: true },
  heavy_disabling_laser: { id: "heavy_disabling_laser", label: "Heavy Disabling Laser", weaponSize: 2, baseSeverity: "solid", penetration: "piercing", rangeBands: ["close","short","medium"], tags: ["laser","disabling","precision"] },
  ion_snare: { id: "ion_snare", label: "Ion Snare / Disruptor Array", weaponSize: 2, alternateWeaponSize: 3, baseSeverity: "solid", penetration: "systems_bypass", rangeBands: ["close","short","medium"], tags: ["ion","soft_kill","systems","emp"], hullDamageByDefault: false },
  autocannon_battery: { id: "autocannon_battery", label: "Autocannon Battery", weaponSize: 3, baseSeverity: "breaching", penetration: "piercing", rangeBands: ["close","short","medium"], tags: ["autocannon","burst","sustained_fire","armor_shred"] },
  missile_rack: { id: "missile_rack", label: "Missile Rack", weaponSize: 3, baseSeverity: "breaching", penetration: "anti_armor", rangeBands: ["medium","long"], tags: ["missile","lock_on","volley"], lockDependent: true },
  light_coilgun: { id: "light_coilgun", label: "Light Coilgun / Rail Battery", weaponSize: 3, alternateWeaponSize: 4, baseSeverity: "breaching", penetration: "anti_armor", rangeBands: ["medium","long"], tags: ["rail","kinetic","precision","hardpoint_killer"] },
  particle_lance: { id: "particle_lance", label: "Particle Beam / Lance", weaponSize: 3, weaponSizeRange: [3,6], baseSeverity: "breaching", penetration: "piercing", sustainedPenetration: "anti_armor", rangeBands: ["medium","long"], tags: ["particle","beam","heat","sustained_lock"] },
  torpedo: { id: "torpedo", label: "Torpedo", weaponSize: 5, baseSeverity: "catastrophic", penetration: "anti_armor", alternatePenetration: "siege", rangeBands: ["medium","long"], tags: ["torpedo","heavy_munition","critical_threat"], minimumStacSeverityOnCleanHit: "moderate" },
  military_railgun: { id: "military_railgun", label: "Military Railgun", weaponSize: 5, weaponSizeRange: [5,7], baseSeverity: "catastrophic", penetration: "siege", peerPenetration: "anti_armor", rangeBands: ["long"], tags: ["rail","siege","spinal"] },
  spinal_lance: { id: "spinal_lance", label: "Spinal Lance / Capital Beam", weaponSize: 7, weaponSizeRange: [7,8], baseSeverity: "catastrophic", penetration: "capital", rangeBands: ["long","strategic"], tags: ["capital","spinal","overmatch"], executiveAuthorization: true },
  sovereign_planet_cracker: { id: "sovereign_planet_cracker", label: "Sovereign / Planet-Cracker Weapon", weaponSize: 8, baseSeverity: "catastrophic", penetration: "anti_capital", rangeBands: ["strategic"], tags: ["planet_cracker","strategic","authorization_required"], scenarioScale: true },
});

export function getShipWeapon(id) {
  const result = SHIP_WEAPONS[id];
  if (!result) throw new RangeError(`Unknown ship weapon: ${id}`);
  return result;
}

export function listShipWeapons() {
  return Object.values(SHIP_WEAPONS);
}


export function normalizeShipWeaponProfiles(weaponOrId) {
  const weapon = typeof weaponOrId === "string"
    ? getShipWeapon(weaponOrId)
    : weaponOrId;

  if (!weapon) return [];

  if (Array.isArray(weapon.profiles)) {
    return weapon.profiles;
  }

  const base = {
    id: "standard",
    label: "Standard",
    weaponSize: weapon.weaponSize ?? 1,
    baseSeverity: weapon.baseSeverity,
    penetration: weapon.penetration ?? "none",
    rangeBands: weapon.rangeBands ?? [],
    hullDamageMode: weapon.hullDamageByDefault === false ? "none" : "normal",
    minimumShipTacSeverity: null,
    preferredTacCategories: [],
    authorization:
      weapon.scenarioScale ? "scenario"
      : weapon.executiveAuthorization ? "executive"
      : Number(weapon.weaponSize ?? 0) >= 5 ? "military"
      : "normal",
    defensiveOnly: weapon.defensiveOnly === true,
    notes: "",
  };

  const profiles = [base];

  if (weapon.id === "point_defense_cluster") {
    profiles.push({
      ...base,
      id: "anti_missile_drone_shuttle",
      label: "Missile / Drone / Shuttle",
      baseSeverity: "solid",
    });
  }

  if (weapon.id === "ion_snare") {
    profiles[0] = {
      ...base,
      hullDamageMode: "none",
      preferredTacCategories: ["power_systems", "mobility_thrusters"],
      notes: "Bypasses ordinary Hull damage and attacks ship systems.",
    };
  }

  if (weapon.id === "torpedo") {
    profiles[0] = {
      ...base,
      minimumShipTacSeverity: "moderate",
    };
    profiles.push({
      ...profiles[0],
      id: "siege_payload",
      label: "Siege Payload",
      penetration: "siege",
    });
  }

  if (weapon.id === "military_railgun") {
    profiles.push({
      ...base,
      id: "peer_hardened_target",
      label: "Peer Hardened Target",
      penetration: "anti_armor",
    });
  }

  if (weapon.sustainedPenetration) {
    profiles.push({
      ...base,
      id: "sustained_lock",
      label: "Sustained Lock",
      penetration: weapon.sustainedPenetration,
    });
  }

  return profiles;
}

export function getShipWeaponProfile(weaponOrId, profileId = null) {
  const profiles = normalizeShipWeaponProfiles(weaponOrId);
  return profiles.find((profile) => profile.id === profileId) ?? profiles[0] ?? null;
}
