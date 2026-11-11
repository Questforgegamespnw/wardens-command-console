/**
 * Pure routing contract for personnel-scale attacks against vehicles.
 * Returns a plan; never rolls dice or mutates target state.
 * Descriptive weapon notes are intentionally not interpreted as rules.
 */
export function planCrossScaleAttack({ attackerScale, targetScale, mode = 'dice', attack = {}, subsystemAttack = null } = {}) {
  if (attackerScale !== 'personnel' || targetScale !== 'vehicle') {
    return Object.freeze({ supported: false, route: 'unsupported', reason: 'scale_pair_not_implemented' });
  }
  if (subsystemAttack != null) {
    if (typeof subsystemAttack !== 'object' || !subsystemAttack.subsystemId || typeof subsystemAttack.subsystemId !== 'string') {
      throw new TypeError('Subsystem attacks require a subsystemId');
    }
    return Object.freeze({ supported: true, route: 'vehicle_subsystem', resolverId: 'vehicle_tac', subsystemId: subsystemAttack.subsystemId, healthDamage: false, execution: 'manual_handoff' });
  }
  if (!['dice', 'fixed', 'direct_wounds'].includes(mode)) {
    return Object.freeze({ supported: false, route: 'unsupported', reason: 'damage_mode_not_implemented' });
  }
  if (mode === 'direct_wounds' && (!Number.isInteger(attack.directWounds) || attack.directWounds < 1)) {
    throw new RangeError('Direct wounds must be a positive integer');
  }
  return Object.freeze({ supported: true, route: 'vehicle_damage', resolverId: 'damage', mode, healthDamage: true, execution: 'resolve_damage', tacExecution: 'manual_handoff' });
}
