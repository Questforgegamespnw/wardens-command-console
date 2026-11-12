import test from 'node:test';
import assert from 'node:assert/strict';
import { listWeapons, getCompatibleAttachments, getCompatibleAmmunition } from '../data/personal-equipment.js';
import { createWeaponInstance, createWeaponRegistry, addWeapon, assignWeapon, configureWeapon, getWeaponInstance } from '../modules/weapon-instance-registry.js';
import { reconcileArmorCatalog, listQuickEntityArmorChoices } from '../modules/equipment-catalog-reconciliation.js';
const weapon = listWeapons().find(w => getCompatibleAmmunition(w).length && getCompatibleAttachments(w).length);
const ammo = getCompatibleAmmunition(weapon)[0];
const attachment = getCompatibleAttachments(weapon)[0];
test('catalog reconciliation preserves legacy-only presets and exposes all canonical armor', () => {
  const report = reconcileArmorCatalog();
  assert.equal(report.legacyPresetCount, 7);
  assert.equal(report.catalogArmorCount, 9);
  assert.equal(report.presets.find(p => p.presetId === 'juggernaut').catalogId, 'juggernaut_class_armor');
  assert.equal(listQuickEntityArmorChoices().length, 10);
  assert.ok(report.catalogOnly.includes('eva_suit'));
});
test('weapon instance snapshots catalog reference and independent mutable state', () => {
  const instance = createWeaponInstance({ id: 'weapon_1', catalogId: weapon.id, ownerId: 'marine', attachmentIds: [attachment.id], ammunitionId: ammo.id, ammunitionRemaining: 20 });
  assert.equal(instance.catalogId, weapon.id);
  assert.equal(instance.ammunitionRemaining, 20);
  assert.equal(instance.attachmentIds[0], attachment.id);
});
test('transfer and configuration preserve independent weapon identity without mutating prior registry', () => {
  const start = createWeaponRegistry();
  const added = addWeapon(start, { id: 'w1', catalogId: weapon.id, ownerId: 'p1', ammunitionId: ammo.id, ammunitionRemaining: 12 });
  const transferred = assignWeapon(added, 'w1', 'p2');
  const configured = configureWeapon(transferred, 'w1', { ammunitionRemaining: 7, condition: 'damaged' });
  assert.equal(getWeaponInstance(configured, 'w1').ownerId, 'p2');
  assert.equal(getWeaponInstance(configured, 'w1').ammunitionRemaining, 7);
  assert.equal(getWeaponInstance(added, 'w1').ownerId, 'p1');
  assert.equal(getWeaponInstance(added, 'w1').ammunitionRemaining, 12);
  assert.deepEqual(start.weapons, []);
});
test('reject duplicate IDs, invalid attachments, and incompatible ammunition', () => {
  const added = addWeapon(createWeaponRegistry(), { id: 'w1', catalogId: weapon.id });
  assert.throws(() => addWeapon(added, { id: 'w1', catalogId: weapon.id }), /duplicate/i);
  assert.throws(() => createWeaponInstance({ id: 'bad', catalogId: weapon.id, attachmentIds: ['nonexistent'] }), /Unknown attachment/i);
  assert.throws(() => createWeaponInstance({ id: 'bad', catalogId: 'unarmed', ammunitionId: ammo.id }), /Incompatible ammunition/);
});
test('registry round-trips through JSON without losing ammunition and attachments', () => {
  const registry = addWeapon(createWeaponRegistry(), { id: 'w1', catalogId: weapon.id, attachmentIds: [attachment.id], ammunitionId: ammo.id, ammunitionRemaining: 5 });
  assert.deepEqual(createWeaponRegistry(JSON.parse(JSON.stringify(registry))), registry);
});
