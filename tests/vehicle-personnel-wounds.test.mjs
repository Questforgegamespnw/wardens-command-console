import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveVehiclePersonnelWounds } from '../modules/vehicle-personnel-wounds.js';

const occupant = { woundsTaken: 0, currentHealth: 30 };
const makeSequence = (count, { armorFunctioning = true, policy = { mode: 'minimum', minimum: 'severe' }, categoryWeights = { gunshot: 100 } } = {}) => ({
  route: 'powered_suit_sequence', suitStateAfter: armorFunctioning ? 'light' : 'broken',
  occupantEvents: Array.from({ length: count }, (_, i) => ({ type: 'personnel_wound_pending', threshold: ['first','second','third'][i], categoryWeights, severityPolicy: policy, armorFunctioning })),
});
const constant = value => () => value;

test('weapon floor respects first wound cap; plus dampening consumes only on actual reduction', () => {
  const r = resolveVehiclePersonnelWounds({ sequence: makeSequence(2), occupant, dampening: 'plus', random: constant(0) });
  assert.deepEqual(r.events.map(e => e.cappedSeverity), ['moderate', 'severe']);
  assert.deepEqual(r.events.map(e => e.wound.severity), ['light', 'light']);
  assert.equal(r.dampeningUsesAfter, 0);
  assert.equal(r.woundsTakenAfter, 2);
  assert.equal(occupant.woundsTaken, 0);
});
test('already-light wounds do not consume a charge', () => {
  const r = resolveVehiclePersonnelWounds({ sequence: makeSequence(1, { policy: { mode: 'normal' } }), occupant, dampening: 'standard', random: constant(0) });
  assert.equal(r.events[0].wound.severity, 'light');
  assert.equal(r.events[0].wound.traumaDampeningUseConsumed, false);
  assert.equal(r.dampeningUsesAfter, 1);
});
test('broken suit disables dampening without consuming charges', () => {
  const r = resolveVehiclePersonnelWounds({ sequence: makeSequence(2, { armorFunctioning: false }), occupant, dampening: 'plus', random: constant(0) });
  assert.deepEqual(r.events.map(e => e.wound.severity), ['moderate','severe']);
  assert.equal(r.dampeningUsesAfter, 2);
});
test('third wound is unrestricted and weighted deadly floor applies before dampening', () => {
  const prior = { ...occupant, woundsTaken: 2 };
  const sequence = makeSequence(1, { policy: { mode: 'weighted_minimum', minimum: 'severe', weights: { severe: 15, deadly: 85 } } });
  sequence.occupantEvents[0].threshold = 'third';
  const r = resolveVehiclePersonnelWounds({ sequence, occupant: prior, random: constant(0.9) });
  assert.equal(r.events[0].weaponSeverity, 'deadly');
  assert.equal(r.events[0].wound.severity, 'deadly');
  assert.equal(r.woundsTakenAfter, 3);
});
test('standard dampening has only one charge for sequential wounds', () => {
  const r = resolveVehiclePersonnelWounds({ sequence: makeSequence(2), occupant, dampening: 'standard', random: constant(0) });
  assert.deepEqual(r.events.map(e => e.wound.severity), ['light', 'severe']);
  assert.equal(r.dampeningUsesAfter, 0);
});
test('fails closed on stale thresholds or missing category tables', () => {
  const stale = makeSequence(1); stale.occupantEvents[0].threshold = 'second';
  assert.throws(() => resolveVehiclePersonnelWounds({ sequence: stale, occupant }), /Stale/);
  assert.throws(() => resolveVehiclePersonnelWounds({ sequence: makeSequence(1, { categoryWeights: { nonexistent: 100 } }), occupant }), /No authored/);
});
