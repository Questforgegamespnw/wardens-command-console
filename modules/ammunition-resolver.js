import { AMMUNITION } from "../data/ammunition.js";
import { advancePersonalPenetration } from "../data/personal-penetration.js";

export function resolveAmmunitionProfile({
  weapon,
  ammunitionId,
} = {}) {
  if (!weapon) throw new TypeError("weapon profile is required");
  const ammo = AMMUNITION[ammunitionId];
  if (!ammo) throw new RangeError(`Unknown ammunition: ${ammunitionId}`);

  const weaponTags = new Set(weapon.tags || []);
  for (const tag of ammo.incompatibleTags || []) {
    if (weaponTags.has(tag)) {
      throw new Error(`${ammo.label} is incompatible with weapon tag: ${tag}`);
    }
  }

  let penetration = weapon.basePenetration || "none";

  if (ammo.penetrationBehavior?.mode === "advance") {
    penetration = advancePersonalPenetration(
      penetration,
      ammo.penetrationBehavior.steps,
      weapon.penetrationCeiling || "siege",
    );
  }

  if (ammo.armorInteraction?.forbiddenPenetrationTags?.includes(penetration)) {
    penetration = "none";
  }

  let woundType = weapon.defaultWoundType;
  if (ammo.woundBehavior?.mode === "replace") {
    woundType = ammo.woundBehavior.woundType;
  }

  return Object.freeze({
    ...weapon,
    ammunitionId,
    effectivePenetration: penetration,
    effectiveWoundType: woundType,
    woundComplicationTable:
      ammo.woundBehavior?.mode === "add_complication"
        ? ammo.woundBehavior.complicationTable
        : null,
    collateralProfile: ammo.collateralProfile || null,
    tacPreferences: ammo.tacPreferences || [],
    onHit: ammo.onHit || [],
    onWound: ammo.onWound || [],
  });
}
