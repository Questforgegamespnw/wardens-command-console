/** Phase 2G-2A: pure, independent personal weapon records.
 * Definitions live in data/personal-equipment.js; instance state is mutable
 * only via returned copies. No UI or persistence side effects.
 */
import { getPersonalEquipment, canInstallAttachment, getCompatibleAmmunition } from '../data/personal-equipment.js';
const clone = value => structuredClone(value);
const validId = id => typeof id === 'string' && id.trim().length > 0;
const assert = (condition, message) => { if (!condition) throw new RangeError(message); };
function weaponDefinition(id) {
  const definition = getPersonalEquipment(id);
  assert(definition?.category === 'weapons', `Unknown personal weapon: ${id}`);
  return definition;
}
function validateConfiguration(definition, attachments, ammunitionId) {
  assert(Array.isArray(attachments) && new Set(attachments).size === attachments.length, 'Duplicate attachment');
  const installed = [];
  for (const id of attachments) {
    const check = canInstallAttachment(definition, id, installed);
    assert(check.allowed, check.reason);
    installed.push(id);
  }
  if (ammunitionId != null) {
    assert(getCompatibleAmmunition(definition).some(entry => entry.id === ammunitionId),
      `Incompatible ammunition: ${ammunitionId}`);
  }
}
export function createWeaponInstance({ id, catalogId, ownerId = null, attachmentIds = [],
  ammunitionId = null, ammunitionRemaining = null, condition = 'intact', overrides = {} } = {}) {
  assert(validId(id), 'Stable weapon ID required');
  assert(ownerId === null || validId(ownerId), 'Invalid owner ID');
  const definition = weaponDefinition(catalogId);
  validateConfiguration(definition, attachmentIds, ammunitionId);
  assert(ammunitionRemaining === null || (Number.isSafeInteger(ammunitionRemaining) && ammunitionRemaining >= 0), 'Invalid ammunition count');
  assert(overrides && typeof overrides === 'object' && !Array.isArray(overrides), 'Invalid overrides');
  return clone({ id, catalogId, ownerId, attachmentIds, ammunitionId,
    ammunitionRemaining, condition, overrides });
}
export function validateWeaponRegistry(registry) {
  assert(registry && Array.isArray(registry.weapons), 'Weapon registry requires weapons array');
  const ids = new Set();
  for (const weapon of registry.weapons) {
    assert(validId(weapon?.id) && !ids.has(weapon.id), 'Invalid or duplicate weapon ID');
    ids.add(weapon.id);
    createWeaponInstance(weapon);
  }
  return true;
}
export function createWeaponRegistry({ weapons = [] } = {}) {
  const result = clone({ weapons });
  validateWeaponRegistry(result);
  return result;
}
export function addWeapon(registry, configuration) {
  validateWeaponRegistry(registry);
  const next = clone(registry);
  next.weapons.push(createWeaponInstance(configuration));
  validateWeaponRegistry(next);
  return next;
}
export function assignWeapon(registry, weaponId, ownerId = null) {
  validateWeaponRegistry(registry);
  assert(ownerId === null || validId(ownerId), 'Invalid owner ID');
  const next = clone(registry);
  const weapon = next.weapons.find(item => item.id === weaponId);
  assert(weapon, 'Weapon not found');
  weapon.ownerId = ownerId;
  return next;
}
export function configureWeapon(registry, weaponId, { attachmentIds, ammunitionId, ammunitionRemaining, condition, overrides } = {}) {
  validateWeaponRegistry(registry);
  const next = clone(registry);
  const index = next.weapons.findIndex(item => item.id === weaponId);
  assert(index !== -1, 'Weapon not found');
  const old = next.weapons[index];
  next.weapons[index] = createWeaponInstance({ ...old,
    ...(attachmentIds !== undefined ? { attachmentIds } : {}),
    ...(ammunitionId !== undefined ? { ammunitionId } : {}),
    ...(ammunitionRemaining !== undefined ? { ammunitionRemaining } : {}),
    ...(condition !== undefined ? { condition } : {}),
    ...(overrides !== undefined ? { overrides } : {}),
  });
  return next;
}
export function getWeaponInstance(registry, weaponId) {
  validateWeaponRegistry(registry);
  const item = registry.weapons.find(weapon => weapon.id === weaponId);
  return item ? clone(item) : null;
}
export function getWeaponDefinitionForInstance(instance) {
  return weaponDefinition(instance.catalogId);
}
