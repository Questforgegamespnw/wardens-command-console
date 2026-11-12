import test from 'node:test';
import assert from 'node:assert/strict';
import {createEntityFromTemplate,duplicateQuickEntity} from '../modules/quick-entities.js';
import {addQuickEntitiesToState} from '../modules/quick-entity-state-operations.js';
let n=0;
const idFactory=prefix=>`${prefix}-operation-${++n}`;
const empty=()=>({quickEntities:[],occupantSuitRegistry:{occupants:[],suits:[]},weaponRegistry:{weapons:[]},vehicleRegistry:{vehicles:[],mounts:[],stations:[]},selectedEntityId:null,editingEntityId:null,quickEntityErrors:[]});
test('group orchestration adds linked records and preserves input',()=>{
 const initial=empty();const entity=createEntityFromTemplate('orion_gunner');
 const next=addQuickEntitiesToState({state:initial,entities:[entity],idFactory});
 assert.equal(initial.quickEntities.length,0);
 assert.equal(next.quickEntities.length,1);
 assert.equal(next.selectedEntityId,entity.id);
 assert.ok(next.quickEntities[0].equippedWeaponId);
 assert.equal(next.weaponRegistry.weapons.length>=1,true);
});
test('duplicate orchestration allocates new independent equipment identities',()=>{
 const first=addQuickEntitiesToState({state:empty(),entities:[createEntityFromTemplate('orion_gunner')],idFactory});
 const source=first.quickEntities[0];
 const second=addQuickEntitiesToState({state:first,entities:[duplicateQuickEntity(source)],sourceEntities:[source],idFactory});
 assert.equal(second.quickEntities.length,2);
 assert.notEqual(second.quickEntities[1].equippedSuitId,source.equippedSuitId);
 assert.notEqual(second.quickEntities[1].equippedWeaponId,source.equippedWeaponId);
 assert.equal(first.quickEntities.length,1);
});
test('duplicate identity aborts without changing state or registries',()=>{
 const first=addQuickEntitiesToState({state:empty(),entities:[createEntityFromTemplate('orion_gunner')],idFactory});
 const before=structuredClone(first);
 assert.throws(()=>addQuickEntitiesToState({state:first,entities:[first.quickEntities[0]],idFactory}),/Duplicate/);
 assert.deepEqual(first,before);
});
