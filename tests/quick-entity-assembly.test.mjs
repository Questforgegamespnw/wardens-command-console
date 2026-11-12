import test from 'node:test';
import assert from 'node:assert/strict';
import { assemblePersonnel, armorDefaults } from '../modules/quick-entity-assembly.js';
import { listWeapons, getCompatibleAmmunition } from '../data/personal-equipment.js';
const person=(id='marine_1')=>({id,label:'Marine',type:'enemy',health:{healthPerWound:15,currentHealth:15,maximumWounds:3,woundsRemaining:3},defense:{av:15,dr:10,armored:true}});
const empty=()=>({occupantSuitRegistry:{occupants:[],suits:[]},weaponRegistry:{weapons:[]}});
test('one action creates separate occupant, suit, and weapon with links',()=>{
 const w=listWeapons()[0];const out=assemblePersonnel({...empty(),entity:person(),armorCatalogId:'juggernaut_class_armor',suitId:'suit_1',weaponCatalogId:w.id,weaponId:'weapon_1'});
 assert.equal(out.occupantSuitRegistry.occupants[0].equippedSuitId,'suit_1');
 assert.equal(out.entity.equippedWeaponId,'weapon_1');
 assert.equal(out.weaponRegistry.weapons[0].ownerId,'marine_1');
 assert.equal(out.occupantSuitRegistry.occupants[0].health.currentHealth,15);
 assert.equal(out.occupantSuitRegistry.suits[0].originalAv,15);
 assert.equal(out.occupantSuitRegistry.suits[0].dr,10);
 assert.equal(out.occupantSuitRegistry.suits[0].traumaDampening.chargesRemaining,2);
});
test('unarmed unarmored person needs no equipment IDs',()=>{
 const out=assemblePersonnel({...empty(),entity:person(),armorCatalogId:'none',weaponCatalogId:'none'});
 assert.equal(out.occupantSuitRegistry.suits.length,0);assert.equal(out.weaponRegistry.weapons.length,0);
 assert.equal(out.entity.equippedSuitId,null);assert.equal(out.entity.equippedWeaponId,null);
});
test('invalid weapon configuration does not mutate registries',()=>{
 const state=empty();const snapshot=structuredClone(state);
 assert.throws(()=>assemblePersonnel({...state,entity:person(),weaponCatalogId:'unknown',weaponId:'weapon_1'}));
 assert.deepEqual(state,snapshot);
});
test('duplicate occupant identity is rejected',()=>{
 const state=empty();state.occupantSuitRegistry.occupants.push({id:'marine_1',equippedSuitId:null});
 assert.throws(()=>assemblePersonnel({...state,entity:person()}),/already exists/);
});
test('catalog armor values remain available without legacy preset',()=>{
 const d=armorDefaults('juggernaut_class_armor');assert.equal(d.av,15);
});
