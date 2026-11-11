import { resolveDamage } from './damage-resolver.js';
import { calculateEffectiveAv } from '../data/personal-armor.js';

/**
 * Phase 2B conventional attack adapter. No state mutation or TAC execution.
 * All damage, per-die Armored, AV, DR and penetration math belongs to resolveDamage.
 * The caller must apply the suit TAC and personnel consequences separately.
 */
export function planConventionalSuitHit({ plan, suit, occupant, attackContext = {}, random = Math.random } = {}) {
  if (!plan || plan.route !== 'personnel_damage' || !['dice', 'fixed'].includes(plan.mode)) {
    throw new TypeError('A conventional authored personnel damage plan is required');
  }
  if (!suit || !occupant || !Number.isFinite(suit.originalAv) || !suit.armorState) {
    throw new TypeError('Suit original AV, armor state, and occupant are required');
  }
  const effectiveAv = calculateEffectiveAv(suit.originalAv, suit.armorState);
  const armorFunctioning = suit.armorState !== 'broken';
  const result = resolveDamage({
    mode: plan.mode,
    attack: {
      id: plan.profileId,
      penetration: plan.penetration,
      coverInteraction: plan.coverInteraction,
      dice: { count: plan.diceCount, sides: plan.dieSize },
      fixedDamage: plan.fixedDamage,
      tacEligible: true,
    },
    target: {
      ...occupant,
      type: 'personnel',
      av: effectiveAv,
      dr: armorFunctioning ? (suit.dr ?? 0) : 0,
      armored: armorFunctioning && Boolean(suit.armored),
      tacEligible: true,
      tacResolverId: 'personal_armor',
    },
    attackContext,
    random,
  });
  const band = occupant.healthPerWound;
  const healthBefore = occupant.currentHealth;
  const crossed = result.woundHandoff.triggered && healthBefore > 0;
  const firstThreshold = Number.isFinite(band) && band > 0
    ? Math.max(0, (Math.ceil(healthBefore / band) - 1) * band)
    : null;
  const cappedHealth = crossed && firstThreshold !== null
    ? Math.max(firstThreshold, result.durability.valueAfter)
    : result.durability.valueAfter;
  const cappedWoundCount = crossed ? 1 : 0;
  return Object.freeze({
    route: 'conventional_suit_hit',
    execution: 'manual_handoff',
    effectiveAv,
    armorStateBefore: suit.armorState,
    result,
    suitTacPending: result.tacHandoff.triggered,
    occupantDamageCalculated: result.defense.finalDamage,
    occupantHandoff: Object.freeze({
      healthBefore,
      healthAfter: cappedHealth,
      woundCount: cappedWoundCount,
      woundPending: cappedWoundCount > 0,
      damageDiscardedAtThreshold: Math.max(0, result.durability.valueAfter < cappedHealth ? cappedHealth - result.durability.valueAfter : 0),
    }),
    // General resolver stateChanges are NOT authoritative for this capped personnel handoff.
    requiresWoundBandHardStop: result.durability.thresholdsCrossed > 1,
    stateChangesApplied: false,
  });
}
