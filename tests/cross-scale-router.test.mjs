import test from 'node:test';
import assert from 'node:assert/strict';
import { planCrossScaleAttack } from '../modules/cross-scale-router.js';
import { resolveDamage } from '../modules/damage-resolver.js';

const route = (options = {}) => planCrossScaleAttack({attackerScale:'personnel',targetScale:'vehicle',mode:'dice',...options});
test('ordinary gunfire routes to conventional vehicle damage', () => {
  const plan=route({attack:{penetration:'standard'}});
  assert.equal(plan.resolverId,'damage'); assert.equal(plan.mode,'dice');
});
test('anti-armor preserves conventional damage and existing penetration math', () => {
  const plan=route({attack:{penetration:'anti_armor'}});
  assert.equal(plan.mode,'dice');
  const result=resolveDamage({mode:plan.mode,attack:{dice:{count:1,sides:10,rolls:[10]},penetration:'anti_armor'},target:{type:'vehicle',av:0,dr:4,armored:true,currentHealth:10,maximumHealth:10,healthPerWound:10,woundsRemaining:2}});
  assert.equal(result.defense.finalDamage,8);
});
test('authored direct wounds preserve their selected mode', () => {
  const plan=route({mode:'direct_wounds',attack:{directWounds:1}});
  assert.equal(plan.mode,'direct_wounds');
});
test('called subsystem attack bypasses vehicle Health resolution', () => {
  const plan=route({subsystemAttack:{subsystemId:'left_track'}});
  assert.equal(plan.route,'vehicle_subsystem'); assert.equal(plan.healthDamage,false);
  assert.equal(plan.execution,'manual_handoff');
});
test('notes cannot silently turn a dice attack into direct wounds', () => {
  const plan=route({attack:{notes:'Proper placement inflicts one direct wound',directWounds:3}});
  assert.equal(plan.mode,'dice');
});
test('unsupported scale pairs fail closed', () => {
  assert.equal(planCrossScaleAttack({attackerScale:'ship',targetScale:'personnel'}).supported,false);
});
test('invalid direct wound and subsystem specifications are rejected', () => {
  assert.throws(()=>route({mode:'direct_wounds',attack:{directWounds:0}}),RangeError);
  assert.throws(()=>route({subsystemAttack:{}}),TypeError);
});
