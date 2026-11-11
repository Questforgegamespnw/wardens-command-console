import { resolvePersonnelTac } from './personnel-tac-resolver.js';
import { planConventionalSuitHit } from './vehicle-personnel-conventional.js';

/** Phase 2C: sequential, immutable suit-TAC resolution and explicit occupant handoff.
 * Does not mutate the caller's suit/occupant or silently execute wound tables.
 * All conventional damage math delegates to the authoritative general resolver via 2B.
 */
export function resolveVehiclePersonnelSequence({ plan, suit, occupant, attackContext = {}, random = Math.random, tacOptions = {} } = {}) {
  if (!plan || !suit || !occupant || !Number.isFinite(suit.originalAv) || !suit.armorState) {
    throw new TypeError('An authored plan, suit, and occupant are required');
  }
  const direct = plan.route === 'powered_suit_direct_wounds';
  const conventional = plan.route === 'personnel_damage' && ['dice', 'fixed'].includes(plan.mode);
  if (!direct && !conventional) throw new TypeError('Unsupported powered suit damage route');
  if (direct && (!Number.isInteger(plan.suitTacCount) || plan.suitTacCount < 1 || plan.suitTacCount !== plan.occupantWoundCount)) {
    throw new RangeError('Direct-wound suit and occupant event counts must match');
  }
  const hit = conventional ? planConventionalSuitHit({ plan, suit, occupant, attackContext, random }) : null;
  const tacCount = direct ? plan.suitTacCount : Number(hit.suitTacPending);
  let armorState = suit.armorState;
  const tacEvents = [];
  for (let index = 0; index < tacCount; index++) {
    const event = resolvePersonnelTac({
      ...tacOptions,
      tacCount: 1,
      currentArmorState: armorState,
      originalAv: suit.originalAv,
      random,
    });
    tacEvents.push(Object.freeze({ index: index + 1, ...event }));
    armorState = event.nextArmorState;
  }
  const woundCount = direct ? plan.occupantWoundCount : hit.occupantHandoff.woundCount;
  const occupantEvents = Object.freeze(Array.from({ length: woundCount }, (_, index) => Object.freeze({
    index: index + 1,
    type: 'personnel_wound_pending',
    threshold: ['first', 'second', 'third'][Math.min(index + (occupant.woundsTaken ?? 0), 2)],
    categoryWeights: plan.categoryWeights,
    severityPolicy: plan.severityPolicy,
    armorFunctioning: armorState !== 'broken',
  })));
  return Object.freeze({
    route: 'powered_suit_sequence',
    execution: 'manual_handoff',
    directWounds: direct,
    conventionalHit: hit,
    suitTacEvents: Object.freeze(tacEvents),
    suitStateBefore: suit.armorState,
    suitStateAfter: armorState,
    occupantEvents,
    occupantHandoff: hit?.occupantHandoff ?? null,
    stateChangesApplied: false,
  });
}
