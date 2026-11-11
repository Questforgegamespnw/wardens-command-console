/** Pure, data-only personnel impact planning and wound policy selection. */
export function planVehiclePersonnelImpact({ weapon, profileId, exposureId, targetKind = 'infantry', catastrophic = false } = {}) {
  if (!weapon || !Array.isArray(weapon.profiles)) throw new TypeError('Authored weapon required');
  const attack = weapon.profiles.find(p => p.id === profileId);
  const exposure = weapon.personnelImpact?.exposures?.[exposureId];
  if (!attack || !exposure) return Object.freeze({ supported: false, route: 'unsupported', reason: 'profile_or_exposure_not_authored' });
  if (!['infantry', 'powered_suit'].includes(targetKind)) return Object.freeze({ supported: false, route: 'unsupported', reason: 'target_kind_not_supported' });
  const directVehicleWounds = attack.mode === 'direct_wounds' ? attack.directWounds : 0;
  if (directVehicleWounds && (!Number.isInteger(directVehicleWounds) || directVehicleWounds < 1)) throw new RangeError('Invalid authored direct wound count');
  // Catastrophic designation is an explicit adjudication, never inferred from dice, notes or caliber.
  if (catastrophic && targetKind === 'infantry') return Object.freeze({ supported: true, route: 'catastrophic_kia', execution: 'manual_handoff', profileId, exposureId });
  if (targetKind === 'powered_suit' && directVehicleWounds) return Object.freeze({
    supported: true, route: 'powered_suit_direct_wounds', execution: 'manual_handoff',
    profileId, exposureId, suitTacCount: directVehicleWounds, occupantWoundCount: directVehicleWounds,
    sequence: Object.freeze(['suit_tac', 'occupant_wounds']),
    categoryWeights: exposure.categoryWeights, severityPolicy: exposure.severityPolicy,
    conventionalDamage: false, additionalBlowover: false,
  });
  return Object.freeze({
    supported: true, route: 'personnel_damage', execution: 'manual_handoff',
    profileId, exposureId, mode: attack.mode, diceCount: attack.diceCount,
    dieSize: attack.dieSize, fixedDamage: attack.fixedDamage,
    directWounds: attack.mode === 'direct_wounds' ? attack.directWounds : 0,
    penetration: attack.penetration, coverInteraction: attack.coverInteraction,
    categoryWeights: exposure.categoryWeights, severityPolicy: exposure.severityPolicy,
  });
}

/** Caller supplies a 0 <= roll < 1; no random source or character mutation. */
export function chooseWeightedCategory(weights, roll) {
  if (!weights || !Number.isFinite(roll) || roll < 0 || roll >= 1) throw new RangeError('Invalid weights or roll');
  const entries = Object.entries(weights);
  if (!entries.length || entries.some(([, weight]) => !Number.isFinite(weight) || weight < 0) || Math.abs(entries.reduce((s, [,w]) => s+w, 0)-100)>1e-8) throw new RangeError('Category weights must total 100');
  let threshold = roll * 100;
  for (const [category, weight] of entries) { threshold -= weight; if (threshold < 0) return category; }
  return entries.at(-1)[0];
}

const SEVERITIES = ['light', 'moderate', 'severe', 'deadly'];
export function applyWeaponSeverityPolicy(normalSeverity, policy = {mode:'normal'}, roll = null) {
  const base = SEVERITIES.indexOf(normalSeverity);
  if (base < 0) throw new RangeError('Invalid normal severity');
  if (policy.mode === 'normal') return normalSeverity;
  if (!['minimum', 'weighted_minimum'].includes(policy.mode)) throw new RangeError('Invalid severity policy');
  const minimum = SEVERITIES.indexOf(policy.minimum);
  if (minimum < 0) throw new RangeError('Invalid minimum severity');
  let floor = minimum;
  if (policy.mode === 'weighted_minimum') {
    const selected = chooseWeightedCategory(policy.weights, roll);
    const selectedIndex = SEVERITIES.indexOf(selected);
    if (selectedIndex < minimum) throw new RangeError('Weighted severity below minimum');
    floor = Math.max(floor, selectedIndex);
  }
  return SEVERITIES[Math.max(base, floor)];
}
