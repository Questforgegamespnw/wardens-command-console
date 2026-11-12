import test from 'node:test';
import assert from 'node:assert/strict';
import { assemblePersonnel } from '../modules/quick-entity-assembly.js';
import { duplicateQuickEntity } from '../modules/quick-entities.js';
const entity = (id='cleanup-person') => ({id,label:'Test',type:'enemy',health:{healthPerWound:15,currentHealth:15,maximumWounds:3,woundsRemaining:3},defense:{av:0,dr:0,armored:false}});
const registries = () => ({occupantSuitRegistry:{occupants:[],suits:[]},weaponRegistry:{weapons:[]}});
test('selected armor defaults override stale baseline defense values', () => {
  const out=assemblePersonnel({...registries(),entity:entity(),armorCatalogId:'juggernaut_class_armor',suitId:'cleanup-suit'});
  assert.equal(out.occupantSuitRegistry.suits[0].originalAv,15);
  assert.equal(out.occupantSuitRegistry.suits[0].dr,10);
  assert.equal(out.occupantSuitRegistry.suits[0].armored,true);
});
test('intentional edited defense values override selected catalog defaults', () => {
  const out=assemblePersonnel({...registries(),entity:entity(),armorCatalogId:'juggernaut_class_armor',suitId:'cleanup-suit',armorOverrides:{av:18,dr:4,armored:false}});
  assert.equal(out.occupantSuitRegistry.suits[0].originalAv,18);
  assert.equal(out.occupantSuitRegistry.suits[0].dr,4);
  assert.equal(out.occupantSuitRegistry.suits[0].armored,false);
});
test('duplicate Quick Entity does not inherit linked equipment identities', () => {
  const original={...entity(),equippedSuitId:'suit-1',equippedWeaponId:'weapon-1'};
  const duplicate=duplicateQuickEntity(original);
  assert.equal(duplicate.equippedSuitId,undefined);
  assert.equal(duplicate.equippedWeaponId,undefined);
  assert.notEqual(duplicate.id,original.id);
});
