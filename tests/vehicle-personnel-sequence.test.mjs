import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveVehiclePersonnelSequence } from '../modules/vehicle-personnel-sequence.js';
const suit={originalAv:15,armorState:'intact',dr:10,armored:true};
const occupant={currentHealth:30,maximumHealth:30,healthPerWound:10,woundsRemaining:3};
const dice = rolls => {let i=0;return ()=> (rolls[i++] ?? 1)/10 - 0.00001};
test('direct two-wound strike generates two sequential suit TAC events before occupant handoffs',()=>{
 const r=resolveVehiclePersonnelSequence({plan:{route:'powered_suit_direct_wounds',suitTacCount:2,occupantWoundCount:2},suit,occupant,tacOptions:{forcedSeverity:'light',categoryMode:'preferred',preferredCategory:'electronics'}});
 assert.equal(r.suitTacEvents.length,2);
 assert.equal(r.suitTacEvents[0].currentArmorState,'intact');
 assert.equal(r.suitTacEvents[1].currentArmorState,'light');
 assert.equal(r.occupantEvents.length,2);
 assert.deepEqual(r.occupantEvents.map(x=>x.threshold),['first','second']);
 assert.equal(r.conventionalHit,null);
 assert.equal(suit.armorState,'intact');
});
test('conventional AV breach with DR absorption generates suit TAC but no occupant wound',()=>{
 const r=resolveVehiclePersonnelSequence({plan:{route:'personnel_damage',mode:'dice',profileId:'test',diceCount:5,dieSize:10,penetration:'standard'},suit,occupant,random:dice([9,8,7,6,5]),tacOptions:{forcedSeverity:'light',categoryMode:'preferred',preferredCategory:'electronics'}});
 assert.equal(r.suitTacEvents.length,1);
 assert.equal(r.occupantEvents.length,0);
 assert.equal(r.suitStateAfter,'light');
});
test('anti armor queues occupant wound after suit TAC and caps health',()=>{
 const r=resolveVehiclePersonnelSequence({plan:{route:'personnel_damage',mode:'dice',profileId:'test',diceCount:5,dieSize:10,penetration:'anti_armor'},suit,occupant,random:dice([9,8,7,6,5]),tacOptions:{forcedSeverity:'light',categoryMode:'preferred',preferredCategory:'electronics'}});
 assert.equal(r.suitTacEvents.length,1);
 assert.equal(r.occupantEvents.length,1);
 assert.equal(r.occupantHandoff.healthAfter,20);
});
test('unsupported direct wound count fails closed',()=>assert.throws(()=>resolveVehiclePersonnelSequence({plan:{route:'powered_suit_direct_wounds',suitTacCount:2,occupantWoundCount:1},suit,occupant}),RangeError));
