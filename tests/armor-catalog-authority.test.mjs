import test from 'node:test';
import assert from 'node:assert/strict';
import { getPersonalEquipment, listPersonalEquipment } from '../data/personal-equipment.js';
import { ENTITY_ARMOR_PACKAGES } from '../data/entity-templates/armor-packages.js';
import { LEGACY_ARMOR_CATALOG_IDS } from '../modules/equipment-catalog-reconciliation.js';
import { ARMOR_MECHANICS_SUPPLEMENTS } from '../data/armor-mechanics.js';
import { armorDefaults } from '../modules/quick-entity-assembly.js';

test('mechanics supplements refer only to canonical armor definitions', () => {
 for (const id of Object.keys(ARMOR_MECHANICS_SUPPLEMENTS)) {
  assert.equal(getPersonalEquipment(id)?.category,'armor',id);
 }
});
test('catalog AV always wins over legacy preset AV', () => {
 for (const entry of listPersonalEquipment({category:'armor'})) {
  const defaults=armorDefaults(entry.id);
  assert.equal(defaults.av,entry.profile?.av ?? 0,entry.id);
 }
});
test('explicit mechanics supplements preserve mapped legacy armor mechanics', () => {
 for (const [legacyId,catalogId] of Object.entries(LEGACY_ARMOR_CATALOG_IDS)) {
  const legacy=ENTITY_ARMOR_PACKAGES[legacyId];
  const resolved=armorDefaults(catalogId);
  assert.equal(resolved.dr,legacy.defense.dr,legacyId);
  assert.equal(resolved.armored,legacy.defense.armored,legacyId);
  assert.equal(resolved.traumaDampening?.id ?? null,legacy.armorSystems.traumaDampening?.id ?? null,legacyId);
  assert.equal(resolved.traumaDampening?.usesRemaining ?? null,legacy.armorSystems.traumaDampening?.usesRemaining ?? null,legacyId);
 }
});
test('undefined mechanics remain conservative, not inferred from tags', () => {
 const eva=armorDefaults('eva_suit');
 assert.equal(eva.av,5);
 assert.equal(eva.dr,0);
 assert.equal(eva.armored,false);
 assert.equal(eva.traumaDampening,null);
});
