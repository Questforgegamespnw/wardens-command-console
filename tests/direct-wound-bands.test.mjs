import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveDamage } from '../modules/damage-resolver.js';
const hit = (type, currentHealth, directWounds, woundsRemaining = Math.ceil(currentHealth / 10)) => resolveDamage({
  mode:'direct_wounds', attack:{directWounds,woundType:'fire_explosive'},
  target:{id:'v-1',type,currentHealth,healthPerWound:10,woundsRemaining},
});
test('one direct vehicle wound finishes partially damaged band, not a flat 10 damage',()=>{
 const r=hit('vehicle',45,1,5);
 assert.equal(r.durability.valueAfter,40);
 assert.equal(r.durability.damageApplied,5);
 assert.equal(r.durability.woundsAfter,4);
 assert.equal(r.woundHandoff.count,1);
 assert.deepEqual(r.stateChanges.map(c=>c.after),[40]);
});
test('two direct vehicle wounds from 45/50 finish at 30/50',()=>{
 const r=hit('vehicle',45,2,5);
 assert.equal(r.durability.valueAfter,30);
 assert.equal(r.durability.damageApplied,15);
 assert.equal(r.woundHandoff.count,2);
 assert.equal(r.durability.woundsAfter,3);
});
test('direct personnel wounds use the same threshold semantics',()=>{
 const r=hit('personnel',25,2,3);
 assert.equal(r.durability.valueAfter,10);
 assert.equal(r.woundHandoff.count,2);
});
test('wound at an exact boundary finishes next band',()=>{
 assert.equal(hit('vehicle',40,1,4).durability.valueAfter,30);
});
test('wounds stop at zero health and cannot overconsume bands',()=>{
 const r=hit('vehicle',5,3,1);
 assert.equal(r.durability.valueAfter,0);
 assert.equal(r.durability.woundsAfter,0);
 assert.equal(r.woundHandoff.count,1);
});
test('zero-health targets cannot generate new wound thresholds',()=>{
 const r=hit('vehicle',0,1,0);
 assert.equal(r.durability.valueAfter,0);
 assert.equal(r.woundHandoff.triggered,false);
 assert.equal(r.woundHandoff.count,0);
});
test('direct wounds require a wound band size',()=>{
 assert.throws(()=>resolveDamage({mode:'direct_wounds',attack:{directWounds:1},target:{type:'vehicle',currentHealth:40,woundsRemaining:4}}),/Health per Wound/);
});
test('direct wounds cannot be applied to a structure',()=>{
 assert.throws(()=>resolveDamage({mode:'direct_wounds',attack:{directWounds:1},target:{type:'structure',currentHealth:40,healthPerWound:10}}),/wound-banded/);
});
