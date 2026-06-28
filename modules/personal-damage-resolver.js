import { calculateEffectiveAv } from "../data/personal-armor.js";
import { PERSONAL_PENETRATION } from "../data/personal-penetration.js";

export function resolvePersonalDamage({
  incomingDamage,
  originalAv,
  armorState = "intact",
  armoredHalving = false,
  heavyDr = 0,
  effectivePenetration = "none",
} = {}) {
  const penetration = PERSONAL_PENETRATION[effectivePenetration];
  if (!penetration) throw new RangeError(`Unknown penetration: ${effectivePenetration}`);

  let resolvedDamage = Math.max(0, Number(incomingDamage || 0));

  if (armoredHalving && !penetration.ignoresArmoredHalving) {
    resolvedDamage = Math.floor(resolvedDamage / 2);
  }

  if (heavyDr > 0 && !penetration.canChallengeJuggernautWalkerVehicleDr) {
    resolvedDamage = Math.max(0, resolvedDamage - Number(heavyDr));
  }

  const effectiveAv = calculateEffectiveAv(originalAv, armorState);
  const penetratingDamage = Math.max(0, resolvedDamage - effectiveAv);

  return Object.freeze({
    incomingDamage: Number(incomingDamage || 0),
    resolvedDamage,
    effectiveAv,
    penetratingDamage,
    wearerHealthDamage: penetratingDamage,
    tacEligible: penetratingDamage > 0,
    woundEligible: penetratingDamage > 0,
    noPenetration: penetratingDamage <= 0,
  });
}
