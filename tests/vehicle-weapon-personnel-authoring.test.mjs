import test from 'node:test';
import assert from 'node:assert/strict';
import { DAMAGE_WEAPON_PRESETS } from '../data/damage-weapon-presets.js';

const vehicles = DAMAGE_WEAPON_PRESETS.filter(w => w.category === 'vehicle_weapons');
const validCategories = new Set(['gunshot', 'massive_gore', 'fire_explosive', 'blunt_force', 'less_lethal']);
const severityRank = { light: 0, moderate: 1, severe: 2, deadly: 3 };

test('all vehicle weapons have valid, deeply frozen personnel exposure metadata', () => {
  assert.equal(vehicles.length, 13);
  for (const weapon of vehicles) {
    assert.ok(weapon.personnelImpact, weapon.id);
    assert.ok(Object.isFrozen(weapon.personnelImpact.exposures), weapon.id);
    for (const [name, exposure] of Object.entries(weapon.personnelImpact.exposures)) {
      const label = `${weapon.id}/${name}`;
      assert.ok(Object.isFrozen(exposure.categoryWeights), label);
      assert.equal(Object.values(exposure.categoryWeights).reduce((a,b) => a+b,0), 100, label);
      for (const [category, weight] of Object.entries(exposure.categoryWeights)) {
        assert.ok(validCategories.has(category), label + ' ' + category);
        assert.ok(Number.isInteger(weight) && weight > 0, label);
      }
      const policy = exposure.severityPolicy;
      assert.ok(['normal','minimum','weighted_minimum'].includes(policy.mode), label);
      if (policy.mode !== 'normal') assert.ok(policy.minimum in severityRank, label);
      if (policy.mode === 'weighted_minimum') {
        assert.equal(Object.values(policy.weights).reduce((a,b)=>a+b,0), 100, label);
        for (const [severity, weight] of Object.entries(policy.weights)) {
          assert.ok(severityRank[severity] >= severityRank[policy.minimum], label);
          assert.ok(Number.isInteger(weight) && weight > 0, label);
        }
      }
    }
  }
});

test('direct 120mm and rail profiles have severe floor and 85% deadly weighting', () => {
  for (const id of ['main_gun_120mm', 'walker_rail_package']) {
    const weapon = vehicles.find(w => w.id === id);
    const impact = weapon.personnelImpact.exposures.direct_projectile;
    assert.deepEqual(impact.severityPolicy.weights, { severe: 15, deadly: 85 });
    assert.equal(impact.severityPolicy.minimum, 'severe');
  }
});

test('original vehicle direct wound and damage attack profiles are unchanged', () => {
  const missile = vehicles.find(w => w.id === 'tactical_missile');
  const volley = missile.profiles.find(p => p.id === 'vulnerable_target');
  assert.equal(volley.mode, 'direct_wounds');
  assert.equal(volley.directWounds, 2);
  assert.equal(volley.personnelImpact, undefined);
  const gun = vehicles.find(w => w.id === 'main_gun_120mm').profiles[0];
  assert.equal(gun.diceCount, 8);
  assert.equal(gun.penetration, 'anti_armor');
});
