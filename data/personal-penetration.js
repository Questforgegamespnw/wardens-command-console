export const PERSONAL_PENETRATION_ORDER = Object.freeze([
  "none",
  "piercing",
  "anti_armor",
  "siege",
]);

export const PERSONAL_PENETRATION = Object.freeze({
  none: {
    id: "none",
    label: "None",
    ignoresArmoredHalving: false,
  },
  piercing: {
    id: "piercing",
    label: "Piercing",
    ignoresArmoredHalving: true,
    affectsHeavyDr: false,
  },
  anti_armor: {
    id: "anti_armor",
    label: "Anti-Armor",
    ignoresArmoredHalving: true,
    canChallengeHeavyPersonalArmor: true,
  },
  siege: {
    id: "siege",
    label: "Siege",
    ignoresArmoredHalving: true,
    canChallengeJuggernautWalkerVehicleDr: true,
  },
});

export function advancePersonalPenetration(baseId, steps = 1, ceilingId = "siege") {
  const baseIndex = PERSONAL_PENETRATION_ORDER.indexOf(baseId);
  const ceilingIndex = PERSONAL_PENETRATION_ORDER.indexOf(ceilingId);
  if (baseIndex < 0 || ceilingIndex < 0) throw new RangeError("Unknown penetration");
  return PERSONAL_PENETRATION_ORDER[Math.min(ceilingIndex, baseIndex + Number(steps))];
}
