import test from 'node:test';
import assert from 'node:assert/strict';
import { createOccupantSuitRegistry, equipSuit, unequipSuit, transferSuit, getEquippedSuit, validateOccupantSuitRegistry } from '../modules/occupant-suit-registry.js';
const fixture = () => createOccupantSuitRegistry({ occupants: [
  { id: 'person_001', health: { current: 8, maximum: 15 }, woundsTaken: 1, equippedSuitId: null },
  { id: 'person_002', health: { current: 10, maximum: 10 }, woundsTaken: 0, equippedSuitId: null }
], suits: [{ id: 'suit_017', armorState: 'moderate', traumaDampening: { chargesRemaining: 1 } }] });
test('equip/dof/re-equip never heals person or repairs suit', () => {
  const before = fixture();
  const after = unequipSuit(equipSuit(unequipSuit(equipSuit(before, 'person_001', 'suit_017'), 'person_001'), 'person_001', 'suit_017'), 'person_001');
  assert.deepEqual(after.occupants[0].health, before.occupants[0].health);
  assert.equal(after.occupants[0].woundsTaken, 1);
  assert.deepEqual(after.suits, before.suits);
  assert.equal(after.occupants[0].equippedSuitId, null);
  assert.deepEqual(before, fixture());
});
test('transferred damaged suit retains state and neither occupant swaps injuries', () => {
  const start = equipSuit(fixture(), 'person_001', 'suit_017');
  const result = transferSuit(start, 'person_001', 'person_002');
  assert.equal(result.occupants[0].equippedSuitId, null);
  assert.equal(result.occupants[1].equippedSuitId, 'suit_017');
  assert.equal(result.occupants[0].woundsTaken, 1);
  assert.equal(result.occupants[1].woundsTaken, 0);
  assert.equal(getEquippedSuit(result, 'person_002').armorState, 'moderate');
  assert.equal(getEquippedSuit(result, 'person_002').traumaDampening.chargesRemaining, 1);
});
test('double occupancy is rejected without modifying input', () => {
  const start = equipSuit(fixture(), 'person_001', 'suit_017');
  assert.throws(() => equipSuit(start, 'person_002', 'suit_017'), /already equipped/);
  assert.equal(start.occupants[1].equippedSuitId, null);
});
test('dangling suit references and duplicate IDs are rejected', () => {
  assert.throws(() => validateOccupantSuitRegistry({ occupants: [{ id: 'p', equippedSuitId: 'missing' }], suits: [] }), /Dangling/);
  assert.throws(() => createOccupantSuitRegistry({ occupants: [{ id: 'p' }, { id: 'p' }] }), /duplicate/);
});
test('missing records and occupied transfer destination fail closed', () => {
  const start = equipSuit(fixture(), 'person_001', 'suit_017');
  assert.throws(() => equipSuit(start, 'missing', 'suit_017'), /not found/);
  assert.throws(() => transferSuit(start, 'person_001', 'missing'), /no equipped suit/);
});
