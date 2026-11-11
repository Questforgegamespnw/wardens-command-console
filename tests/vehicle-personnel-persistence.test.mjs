import test from 'node:test';
import assert from 'node:assert/strict';
import { createVehiclePersonnelCommit, applyVehiclePersonnelCommit } from '../modules/vehicle-personnel-persistence.js';
const suit = () => ({ id: 'suit-1', armorState: 'intact', originalAv: 15, dr: 10, armored: true, extra: { marker: 1 } });
const occupant = () => ({ id: 'person-1', currentHealth: 30, woundsTaken: 0, dampeningUsesRemaining: 2, conditions: [] });
function envelope(id = 'hit-1', { state = 'intact', after = 'light', beforeWounds = 0, afterWounds = 2, charges = 2, chargesAfter = 0, health = 30, healthAfter = 30 } = {}) {
  const events = Array.from({ length: afterWounds - beforeWounds }, (_, i) => ({ threshold: i === 0 ? 'first' : 'second', category: 'gunshot', wound: { woundThresholdStillAdvances: true, result: { id: 'test' } } }));
  return createVehiclePersonnelCommit({ resolutionId: id, suitId: 'suit-1', occupantId: 'person-1', sequence: { route: 'powered_suit_sequence', suitStateBefore: state, suitStateAfter: after, suitTacEvents: [{ nextArmorState: after }], occupantEvents: events, occupantHandoff: { healthBefore: health } }, wounds: { route: 'powered_suit_occupant_wounds', suitStateAfter: after, woundsTakenBefore: beforeWounds, woundsTakenAfter: afterWounds, dampeningUsesBefore: charges, dampeningUsesAfter: chargesAfter, occupantHealthAfter: healthAfter, events } });
}
test('two-wound strike updates suit and occupant immutably with pending consequences', () => {
  const s = suit(), o = occupant(), result = applyVehiclePersonnelCommit({ commit: envelope(), suit: s, occupant: o });
  assert.equal(result.status, 'applied'); assert.equal(result.suit.armorState, 'light'); assert.equal(result.occupant.woundsTaken, 2); assert.equal(result.occupant.dampeningUsesRemaining, 0);
  assert.equal(result.pendingActions.length, 3); assert.ok(result.pendingActions.every(a => a.status === 'pending'));
  assert.equal(s.armorState, 'intact'); assert.equal(o.woundsTaken, 0); assert.deepEqual(result.suit.extra, s.extra);
});
test('replay does not double-consume charges or duplicate pending actions', () => {
  const c = envelope(), first = applyVehiclePersonnelCommit({ commit: c, suit: suit(), occupant: occupant() });
  const second = applyVehiclePersonnelCommit({ commit: c, suit: first.suit, occupant: first.occupant });
  assert.equal(second.status, 'already_applied'); assert.equal(second.pendingActions.length, 0); assert.equal(second.occupant.woundsTaken, 2);
});
test('two distinct attacks use updated armor and remaining charges', () => {
  const first = applyVehiclePersonnelCommit({ commit: envelope(), suit: suit(), occupant: occupant() });
  const secondCommit = envelope('hit-2', { state: 'light', after: 'moderate', beforeWounds: 2, afterWounds: 3, charges: 0, chargesAfter: 0 });
  const second = applyVehiclePersonnelCommit({ commit: secondCommit, suit: first.suit, occupant: first.occupant });
  assert.equal(second.status, 'applied'); assert.equal(second.suit.armorState, 'moderate'); assert.equal(second.occupant.woundsTaken, 3);
  assert.deepEqual(second.suit.appliedVehiclePersonnelResolutionIds, ['hit-1','hit-2']);
});
test('stale snapshots and mismatched targets fail without mutation', () => {
  const c = envelope(), s = suit(), o = occupant();
  assert.throws(() => applyVehiclePersonnelCommit({ commit: c, suit: { ...s, armorState: 'severe' }, occupant: o }), /Stale/);
  assert.throws(() => applyVehiclePersonnelCommit({ commit: c, suit: s, occupant: { ...o, id: 'wrong' } }), /identity/);
  assert.equal(s.armorState, 'intact'); assert.equal(o.woundsTaken, 0);
});
test('partially applied record is rejected for reconciliation', () => {
  assert.throws(() => applyVehiclePersonnelCommit({ commit: envelope(), suit: { ...suit(), appliedVehiclePersonnelResolutionIds: ['hit-1'] }, occupant: occupant() }), /Partial/);
});
test('invalid resolution event counts and wound advancement fail closed', () => {
  assert.throws(() => createVehiclePersonnelCommit({ resolutionId: 'x', suitId: 'suit-1', occupantId: 'person-1', sequence: { route: 'powered_suit_sequence', suitStateBefore: 'intact', suitStateAfter: 'light', suitTacEvents: [], occupantEvents: [] }, wounds: { route: 'powered_suit_occupant_wounds', suitStateAfter: 'light', woundsTakenBefore: 0, woundsTakenAfter: 1, dampeningUsesBefore: 0, dampeningUsesAfter: 0, events: [] } }), /advancement/);
});
