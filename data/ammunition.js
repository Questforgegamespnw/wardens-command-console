export const AMMUNITION = Object.freeze({
  ap: {
    id: "ap",
    label: "AP / Piercing Ammunition",
    damageMode: "weapon_default",
    woundBehavior: { mode: "weapon_default" },
    penetrationBehavior: { mode: "advance", steps: 1, respectWeaponCeiling: true },
    incompatibleTags: ["ship_safe", "less_lethal"],
  },
  phosphorus_dragon: {
    id: "phosphorus_dragon",
    label: "Phosphorus / Dragon Rounds",
    damageMode: "weapon_default",
    woundBehavior: { mode: "replace", woundType: "fire_explosive" },
    armorInteraction: { usesNormalAv: true, penetration: "none" },
    onHit: ["may_ignite_flammable_material"],
    onWound: ["apply_burning"],
    collateralProfile: {
      ignitionRisk: "extreme",
      smokeRisk: "high",
      shipboardRisk: "extreme",
    },
    tacPreferences: ["seal_life_support", "electronics"],
  },
  ship_safe: {
    id: "ship_safe",
    label: "Ship-Safe Ammunition",
    damageMode: "weapon_default",
    woundBehavior: { mode: "weapon_default" },
    armorInteraction: {
      usesNormalAv: true,
      forbiddenPenetrationTags: ["piercing", "anti_armor", "siege"],
    },
    collateralProfile: {
      overpenetration: "reduced",
      hullBreachRisk: "reduced",
      systemCascadeRisk: "reduced",
    },
    incompatibleTags: ["ap"],
  },
  cryo: {
    id: "cryo",
    label: "Cryo Ammunition",
    damageMode: "weapon_default",
    woundBehavior: {
      mode: "add_complication",
      complicationTable: "cryo_complications",
    },
    armorInteraction: { usesNormalAv: true, penetration: "none" },
    tacPreferences: ["mobility", "seal_life_support"],
  },
  less_lethal: {
    id: "less_lethal",
    label: "Less-Lethal / Rubberized",
    damageMode: "weapon_default",
    woundBehavior: { mode: "replace", woundType: "less_lethal" },
    incompatibleTags: ["ap"],
  },
});
