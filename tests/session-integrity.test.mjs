import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSessionSnapshot } from '../modules/session-integrity.js';
const baseline = () => ({quickEntities:[{id:'p1',type:'personnel',equippedSuitId:'s1'}],
  occupantSuitRegistry:{occupants:[{id:'p1',equippedSuitId:'s1'}],suits:[{id:'s1'}]},
  weaponRegistry:{weapons:[]},vehicleRegistry:{vehicles:[],mounts:[],stations:[]}});
test('valid complete session restores independent copies',()=>{const input=baseline();const result=validateSessionSnapshot(input);result.occupantSuitRegistry.suits[0].id='changed';assert.equal(input.occupantSuitRegistry.suits[0].id,'s1')});
test('invalid suit relationship rejects whole snapshot',()=>{const input=baseline();input.quickEntities[0].equippedSuitId='missing';assert.throws(()=>validateSessionSnapshot(input),/invalid historical suit reference/)});
test('invalid registry rejects without modifying original session',()=>{const input=baseline();input.weaponRegistry={weapons:[{id:'broken',catalogId:'unknown'}]};const before=structuredClone(input);assert.throws(()=>validateSessionSnapshot(input));assert.deepEqual(input,before)});
test('vehicle mount and crew references must resolve',()=>{const input=baseline();input.quickEntities.push({id:'v1',type:'vehicle',vehicleId:'v1-reg',weaponMountIds:['missing']});input.vehicleRegistry.vehicles.push({id:'v1-reg',entityId:'v1',chassisId:''});assert.throws(()=>validateSessionSnapshot(input),/orphan entity mount/)});
test('missing historical registries default to empty',()=>{const result=validateSessionSnapshot({quickEntities:[{id:'old',type:'personnel'}]});assert.deepEqual(result.weaponRegistry,{weapons:[]});assert.deepEqual(result.occupantSuitRegistry,{occupants:[],suits:[]})});

test('doff and transfer can leave historical entity suit snapshot without invalidating session',()=>{const input=baseline();input.occupantSuitRegistry.occupants[0].equippedSuitId=null;assert.doesNotThrow(()=>validateSessionSnapshot(input))});
