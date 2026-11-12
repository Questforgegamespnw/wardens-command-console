import test from 'node:test';
import assert from 'node:assert/strict';
import {createSuitInstance,hasArmorCapability,describeSuitCapabilities,validateSuitCapabilities} from '../modules/suit-capabilities.js';
import {registerEnvironmentalSuit,resolveQuickEntitySuitAttack} from '../modules/console-equipment-workflow.js';
import {equipSuit,unequipSuit} from '../modules/occupant-suit-registry.js';
test('EVA suit has independent ID and no implied ballistic armor',()=>{
 const s=createSuitInstance({id:'eva1',templateId:'standard_eva',environment:{seals:{status:'intact'},air:{remaining:60,capacity:90}}});
 assert.equal(hasArmorCapability(s),false);
 assert.equal(describeSuitCapabilities(s).armor,null);
 assert.equal(s.originalAv,0);
});
test('unconfigured EVA does not invent air capacity or seal integrity',()=>{
 const s=createSuitInstance({id:'eva1',templateId:'standard_eva',environment:{}});
 assert.deepEqual(s.capabilities.environment,{});
});
test('environmental suit follows its ID across doff and transfer without resetting air',()=>{
 let r={occupants:[{id:'a',health:{currentHealth:4},equippedSuitId:null},{id:'b',health:{currentHealth:9},equippedSuitId:null}],suits:[]};
 r=registerEnvironmentalSuit({registry:r,suitId:'eva1',environment:{air:{remaining:12,capacity:90},seals:{status:'compromised'}}});
 r=equipSuit(r,'a','eva1');r=unequipSuit(r,'a');r=equipSuit(r,'b','eva1');
 assert.equal(r.suits[0].capabilities.environment.air.remaining,12);
 assert.equal(r.occupants[0].health.currentHealth,4);
 assert.equal(r.occupants[1].health.currentHealth,9);
});
test('environmental suit cannot silently use ballistic suit TAC workflow',()=>{
 let r={occupants:[{id:'a',health:{currentHealth:10},woundsTaken:0,equippedSuitId:null}],suits:[]};
 r=registerEnvironmentalSuit({registry:r,suitId:'eva1'});r=equipSuit(r,'a','eva1');
 assert.throws(()=>resolveQuickEntitySuitAttack({registry:r,occupantId:'a',weapon:{},profileId:'x',exposureId:'x',resolutionId:'r'}),/no armor capability/);
});
test('rejects impossible air reserve and preserves legacy armored suit support',()=>{
 assert.throws(()=>createSuitInstance({id:'e',templateId:'eva',environment:{air:{remaining:100,capacity:40}}}),/Invalid air reserve/);
 assert.equal(hasArmorCapability({id:'legacy',originalAv:15,dr:10,armorState:'intact'}),true);
});
