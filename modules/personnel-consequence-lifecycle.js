/** Phase 2H-1: acknowledge separately adjudicated suit TAC and wound consequences.
 * Attack damage, wound advancement, armor state and dampening charges are committed
 * upstream exactly once. This module only changes pending-action lifecycle status;
 * it never reapplies those mechanical effects or invents TAC outcomes.
 */
const clone = value => structuredClone(value);
const ROUTES = new Set(['suit_tac_consequence', 'personnel_wound_consequence']);
const isId = value => typeof value === 'string' && value.trim().length > 0;

export function validatePersonnelPendingActions(actions) {
  if (!Array.isArray(actions)) throw new TypeError('Pending actions must be an array');
  const ids = new Set();
  for (const action of actions) {
    if (!action || !isId(action.id) || ids.has(action.id)) throw new RangeError('Missing or duplicate consequence ID');
    ids.add(action.id);
    if (!ROUTES.has(action.route) || !['pending', 'resolved'].includes(action.status)) throw new RangeError('Invalid consequence route or status');
    if (!action.origin || !isId(action.origin.resolutionId) || !isId(action.origin.suitId) || !isId(action.origin.occupantId) || !Number.isInteger(action.origin.eventIndex) || action.origin.eventIndex < 1) throw new RangeError('Invalid consequence provenance');
    if (!action.id.startsWith(`${action.origin.resolutionId}:`)) throw new RangeError('Consequence ID does not match attack');
  }
  return true;
}

/** Marks an explicitly adjudicated consequence as resolved, without executing it.
 * The caller must separately apply any authored consequence through its own resolver.
 */
export function acknowledgePersonnelConsequence({pendingActions, consequenceId} = {}) {
  validatePersonnelPendingActions(pendingActions);
  if (!isId(consequenceId)) throw new TypeError('Consequence ID required');
  const index = pendingActions.findIndex(action => action.id === consequenceId);
  if (index < 0) throw new RangeError('Unknown consequence ID');
  const next = clone(pendingActions);
  if (next[index].status === 'resolved') return {status:'already_resolved',pendingActions:next};
  next[index].status = 'resolved';
  return {status:'resolved',pendingActions:next};
}
