import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveInfantryLoadout, auditInfantryLoadouts} from '../modules/infantry-loadout-catalog.js';
import {assemblePersonnel} from '../modules/quick-entity-assembly.js';
import {createQuickEntity, createEntityFromTemplate} from '../modules/quick-entities.js';
import {createOccupantSuitRegistry} from '../modules/occupant-suit-registry.js';
import {createWeaponRegistry} from '../modules/weapon-instance-registry.js';

test('anti-armor specialist selects canonical anti-armor launcher, not a placeholder',()=>{
 const x=resolveInfantryLoadout('marine_anti_armor_specialist');
 assert.equal(x.primary.catalogId,'disposable_anti_armor_launcher');
 assert.equal(x.armorCatalogId,'advanced_battle_dress');
 assert.equal(x.secondary.catalogId,'pistol');
});
test('Orion gunner receives canonical Orion rifle and separate sidearm',()=>{
 const x=resolveInfantryLoadout('orion_gunner');
 assert.equal(x.primary.catalogId,'orion_anti_material_rifle');
 assert.equal(x.secondary.catalogId,'pistol');
});
test('unresolved utility references are never fabricated as weapons',()=>{
 const x=resolveInfantryLoadout('marine_medic');
 assert.equal(x.secondary.kind,'unresolved');
 assert.equal(x.secondary.catalogId,null);
 assert.equal(auditInfantryLoadouts().length>10,true);
});
test('one personnel assembly owns two distinct weapon instances and equips only primary',()=>{
 const entity=createEntityFromTemplate('orion_gunner');
 assert.ok(!entity.errors);
 const x=resolveInfantryLoadout('orion_gunner');
 const result=assemblePersonnel({entity,armorCatalogId:x.armorCatalogId,weaponCatalogId:x.primary.catalogId,
  suitId:'suit-one',weaponId:'rifle-one',carriedWeapons:[{id:'pistol-one',catalogId:x.secondary.catalogId}],
  occupantSuitRegistry:createOccupantSuitRegistry(),weaponRegistry:createWeaponRegistry()});
 assert.equal(result.entity.equippedWeaponId,'rifle-one');
 assert.deepEqual(result.entity.carriedWeaponIds,['pistol-one']);
 assert.equal(result.weaponRegistry.weapons.length,2);
 assert.ok(result.weaponRegistry.weapons.every(w=>w.ownerId===entity.id));
 assert.equal(result.occupantSuitRegistry.suits.length,1);
});
test('duplicate secondary IDs fail atomically',()=>{
 const entity=createEntityFromTemplate('orion_gunner');
 assert.throws(()=>assemblePersonnel({entity,weaponCatalogId:'pistol',weaponId:'same',carriedWeapons:[{id:'same',catalogId:'pistol'}],
  occupantSuitRegistry:createOccupantSuitRegistry(),weaponRegistry:createWeaponRegistry()}));
});
