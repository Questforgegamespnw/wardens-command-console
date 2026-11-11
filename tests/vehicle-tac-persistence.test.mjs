import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveVehicleTac } from '../modules/vehicle-tac-resolver.js';
import { createQuickEntity, getVehicleSubsystem, applyVehicleTacResultToEntity } from '../modules/quick-entities.js';

const context = { now: () => '2026-11-11T00:00:00.000Z', idFactory: () => 'vehicle-test' };
function vehicle(id = 'tank-a') {
  return createQuickEntity({ id, label: 'Test tank', type: 'vehicle', health: { currentHealth: 8, healthPerWound: 10, maximumWounds: 5, woundsRemaining: 5 }, vehicle: { platformType: 'tank_heavy_ifv', condition: 'operational', heatClock: { current: 2, maximum: 4 }, activeCountdowns: [{ id: 'old-clock', current: 2 }] } }, context);
}
function hit(entity, { subsystemId = 'left-track', category = 'mobility', severity = 'light', roll = 1 } = {}) {
  const existingSubsystem = getVehicleSubsystem(entity, category, subsystemId);
  return resolveVehicleTac({ platformType: 'tank_heavy_ifv', categoryMode: 'preferred', preferredCategory: category, forcedSeverity: severity, forcedOutcomeRoll: roll, subsystemId, existingSubsystem });
}
function apply(entity, result) {
  const next = applyVehicleTacResultToEntity(entity, result, context);
  assert.notEqual(next.ok, false, JSON.stringify(next.errors));
  return next;
}
test('first hit persists a named subsystem without changing vehicle Health or unrelated state', () => {
  const original = vehicle();
  const result = hit(original);
  const updated = apply(original, result);
  assert.equal(getVehicleSubsystem(original, 'mobility', 'left-track'), null);
  assert.equal(getVehicleSubsystem(updated, 'mobility', 'left-track').condition, 'degraded');
  assert.equal(updated.health.currentHealth, 8);
  assert.deepEqual(updated.vehicle.heatClock, original.vehicle.heatClock);
  assert.deepEqual(updated.vehicle.activeCountdowns, original.vehicle.activeCountdowns);
});
test('repeat hit escalates Light to Moderate, then Severe, then Catastrophic', () => {
  let current = vehicle();
  for (const [severity, condition] of [['light','degraded'], ['moderate','compromised'], ['severe','failing'], ['catastrophic','destroyed']]) {
    const result = hit(current);
    assert.equal(result.finalSeverity, severity);
    current = apply(current, result);
    assert.equal(getVehicleSubsystem(current, 'mobility', 'left-track').condition, condition);
    assert.equal(current.vehicle.systems.mobility.length, 1);
  }
});
test('separate named subsystems do not escalate each other', () => {
  let current = apply(vehicle(), hit(vehicle(), { subsystemId: 'left-track' }));
  const right = hit(current, { subsystemId: 'right-track' });
  assert.equal(right.finalSeverity, 'light');
  current = apply(current, right);
  assert.equal(current.vehicle.systems.mobility.length, 2);
  assert.equal(getVehicleSubsystem(current, 'mobility', 'left-track').condition, 'degraded');
  assert.equal(getVehicleSubsystem(current, 'mobility', 'right-track').condition, 'degraded');
});
test('different vehicle instances remain independent', () => {
  const a = vehicle('tank-a');
  const b = vehicle('tank-b');
  const damagedA = apply(a, hit(a));
  assert.equal(getVehicleSubsystem(b, 'mobility', 'left-track'), null);
  assert.equal(hit(b).finalSeverity, 'light');
  assert.equal(hit(damagedA).finalSeverity, 'moderate');
});
test('reapplying an already resolved result replaces rather than duplicates subsystem entry', () => {
  const original = vehicle();
  const result = hit(original);
  const once = apply(original, result);
  const twice = apply(once, result);
  assert.equal(twice.vehicle.systems.mobility.length, 1);
  assert.deepEqual(getVehicleSubsystem(twice, 'mobility', 'left-track'), getVehicleSubsystem(once, 'mobility', 'left-track'));
});
