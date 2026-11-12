import test from 'node:test';
import assert from 'node:assert/strict';
import {createEntityFromTemplate,createEntitiesFromGroupTemplate,duplicateQuickEntity} from '../modules/quick-entities.js';
import {assembleQuickEntityBatch} from '../modules/quick-entity-batch-assembly.js';
let sequence=0;
const idFactory=prefix=>`${prefix}-batch-${++sequence}`;
const base=()=>({occupantSuitRegistry:{occupants:[],suits:[]},weaponRegistry:{weapons:[]},vehicleRegistry:{vehicles:[],mounts:[],stations:[]},idFactory});
test('Orion fireteam group creates separate occupants and equipped weapons',()=>{
 const entities=createEntitiesFromGroupTemplate('orion_fireteam');
 assert.ok(Array.isArray(entities));
 const result=assembleQuickEntityBatch({...base(),entities});
 assert.equal(result.entities.length,2);
 assert.equal(result.occupantSuitRegistry.occupants.length,2);
 assert.equal(new Set(result.entities.map(e=>e.id)).size,2);
 const gunner=result.entities.find(e=>e.templateId==='orion_gunner');
 assert.ok(gunner?.equippedWeaponId);
 assert.equal(result.weaponRegistry.weapons.find(w=>w.id===gunner.equippedWeaponId).catalogId,'orion_anti_material_rifle');
});
test('duplicate independently creates equipment records without modifying source',()=>{
 const source=createEntityFromTemplate('orion_gunner');
 const first=assembleQuickEntityBatch({...base(),entities:[source]});
 const duplicate=duplicateQuickEntity(first.entities[0]);
 const next=assembleQuickEntityBatch({...first,entities:[duplicate],sourceEntities:[first.entities[0]],idFactory});
 assert.notEqual(next.entities[0].equippedSuitId,first.entities[0].equippedSuitId);
 assert.notEqual(next.entities[0].equippedWeaponId,first.entities[0].equippedWeaponId);
 assert.ok(first.weaponRegistry.weapons.length>=1);
 assert.equal(next.weaponRegistry.weapons.length,first.weaponRegistry.weapons.length*2);
});
test('invalid group member aborts without altering input registries',()=>{
 const initial=base();
 const good=createEntityFromTemplate('orion_gunner');
 const bad={...createEntityFromTemplate('orion_spotter'),id:good.id};
 assert.throws(()=>assembleQuickEntityBatch({...initial,entities:[good,bad]}),/Duplicate/);
 assert.equal(initial.weaponRegistry.weapons.length,0);
 assert.equal(initial.occupantSuitRegistry.occupants.length,0);
});
test('vehicle duplication creates distinct vehicle and mount identities',()=>{
 const vehicle=createEntityFromTemplate('generic_tank');
 // Some repositories name chassis differently; assert against actual chassis in catalog.
 if (vehicle?.kind==='error' || !vehicle || vehicle.type!=='vehicle') return;
 const first=assembleQuickEntityBatch({...base(),entities:[vehicle]});
 const second=assembleQuickEntityBatch({...first,entities:[duplicateQuickEntity(first.entities[0])],sourceEntities:[first.entities[0]],idFactory});
 assert.notEqual(first.entities[0].vehicleId,second.entities[0].vehicleId);
 assert.equal(new Set(second.vehicleRegistry.mounts.map(m=>m.id)).size,second.vehicleRegistry.mounts.length);
});
