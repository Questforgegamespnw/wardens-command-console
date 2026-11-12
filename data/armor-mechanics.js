/**
 * Explicit mechanics supplements for personal-equipment armor entries.
 * The canonical personal-equipment catalog owns labels, AV and descriptive tags.
 * These values are not inferred from prose. They preserve the reviewed legacy
 * Quick Entity armor rules until they can be incorporated into the catalog.
 */
export const ARMOR_MECHANICS_SUPPLEMENTS = Object.freeze({
  standard_battle_dress: Object.freeze({ dr: 0, armored: true, traumaDampening: null }),
  advanced_battle_dress: Object.freeze({ dr: 0, armored: true, traumaDampening: Object.freeze({ id: 'trauma_dampening', charges: 1 }) }),
  armored_combat_eva: Object.freeze({ dr: 0, armored: true, traumaDampening: Object.freeze({ id: 'trauma_dampening', charges: 1 }) }),
  juggernaut_class_armor: Object.freeze({ dr: 10, armored: true, traumaDampening: Object.freeze({ id: 'trauma_dampening_plus', charges: 2 }) }),
});

export function getArmorMechanicsSupplement(catalogId) {
  return ARMOR_MECHANICS_SUPPLEMENTS[catalogId] ?? null;
}
