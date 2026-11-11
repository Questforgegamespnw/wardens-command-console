import test from 'node:test';
import assert from 'node:assert/strict';
import { planConventionalSuitHit } from '../modules/vehicle-personnel-conventional.js';
const suit = { originalAv:15, armorState:'intact', armored:true, dr:10 };
const occupant = { currentHealth:30, maximumHealth:30, healthPerWound:10, woundsRemaining:3 };
const plan = (penetration='standard') => ({ route:'personnel_damage', mode:'dice', profileId:'test', diceCount:5, dieSize:10, penetration, coverInteraction:'normal' });
const randomFrom = arr => {let i=0;return ()=> (arr[i++]-1)/10};
test('per-die halving, AV breach and DR stops occupant damage but queues suit TAC',()=>{
 const r=planConventionalSuitHit({plan:plan(),suit,occupant,random:randomFrom([9,8,7,6,5])});
 assert.deepEqual(r.result.rolls.afterArmored,[4,4,3,3,2]);
 assert.equal(r.result.defense.armorBreached,true);
 assert.equal(r.suitTacPending,true);
 assert.equal(r.occupantDamageCalculated,0);
 assert.equal(r.occupantHandoff.woundCount,0);
});
test('anti armor bypasses Armored and halves DR, with first-band hard stop',()=>{
 const r=planConventionalSuitHit({plan:plan('anti_armor'),suit,occupant,random:randomFrom([9,8,7,6,5])});
 assert.equal(r.result.damage.adjustedTotal,35);
 assert.equal(r.result.defense.effectiveDr,5);
 assert.equal(r.result.defense.finalDamage,15); // AV is also subtracted by current general resolver
 assert.equal(r.occupantHandoff.healthAfter,20);
 assert.equal(r.occupantHandoff.woundCount,1);
 assert.equal(r.stateChangesApplied,false);
});
test('broken suit loses AV, DR and Armored',()=>{
 const r=planConventionalSuitHit({plan:plan(),suit:{...suit,armorState:'broken'},occupant,random:randomFrom([9,8,7,6,5])});
 assert.equal(r.effectiveAv,0);
 assert.equal(r.result.damage.adjustedTotal,35);
 assert.equal(r.result.defense.effectiveDr,0);
 assert.equal(r.occupantHandoff.healthAfter,20);
 assert.equal(r.occupantHandoff.woundCount,1);
});
test('nonconventional plans rejected',()=>assert.throws(()=>planConventionalSuitHit({plan:{route:'powered_suit_direct_wounds'},suit,occupant}),TypeError));
