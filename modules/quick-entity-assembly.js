/** Phase 2G-2B: pure, atomic personnel assembly. Existing records are not modified. */
import { getPersonalEquipment } from '../data/personal-equipment.js';
import { ENTITY_ARMOR_PACKAGES } from '../data/entity-templates/armor-packages.js';
import { LEGACY_ARMOR_CATALOG_IDS } from './equipment-catalog-reconciliation.js';
import { createSuitInstance } from './suit-capabilities.js';
import { createOccupantSuitRegistry } from './occupant-suit-registry.js';
import { addWeapon, createWeaponRegistry } from './weapon-instance-registry.js';
const copy = value => structuredClone(value);
const validId = id => typeof id === 'string' && id.trim().length > 0;
export function armorDefaults(catalogId) {
  if (!catalogId || catalogId === 'none') return null;
  const catalog = getPersonalEquipment(catalogId);
  if (catalog?.category !== 'armor') throw new RangeError('Unknown armor catalog ID');
  const legacyId = Object.keys(LEGACY_ARMOR_CATALOG_IDS).find(id => LEGACY_ARMOR_CATALOG_IDS[id] === catalogId);
  const legacy = legacyId ? ENTITY_ARMOR_PACKAGES[legacyId] : null;
  return {catalogId, label:catalog.label, av:catalog.profile?.av ?? legacy?.defense?.av ?? 0,
    dr:legacy?.defense?.dr ?? 0, armored:legacy?.defense?.armored ?? false,
    traumaDampening:legacy?.armorSystems?.traumaDampening ?? null};
}
export function assemblePersonnel({entity, armorCatalogId='none', armorOverrides={}, weaponCatalogId='none',
  attachmentIds=[], ammunitionId=null, ammunitionRemaining=null, weaponOverrides={},
  suitId=null, weaponId=null, carriedWeapons=[], occupantSuitRegistry, weaponRegistry}={}) {
  if (!validId(entity?.id) || entity.type === 'vehicle' || !entity.health) throw new TypeError('Personnel Quick Entity required');
  const oldSuit = createOccupantSuitRegistry(occupantSuitRegistry);
  const oldWeapons = createWeaponRegistry(weaponRegistry);
  if (oldSuit.occupants.some(o=>o.id===entity.id)) throw new RangeError('Occupant ID already exists');
  let nextSuit=copy(oldSuit), nextWeapons=copy(oldWeapons);
  const defaults=armorDefaults(armorCatalogId);
  const equippedSuitId=defaults ? suitId : null;
  if (defaults && (!validId(suitId) || nextSuit.suits.some(s=>s.id===suitId))) throw new RangeError('Unique suit ID required');
  if (defaults) {
    const av=armorOverrides.av ?? defaults.av;
    const dr=armorOverrides.dr ?? defaults.dr;
    const armored=armorOverrides.armored ?? defaults.armored;
    const suit=createSuitInstance({id:suitId,label:`${entity.label} — ${defaults.label}`,templateId:armorCatalogId,
      armor:{av,dr,armored}});
    if (defaults.traumaDampening) suit.traumaDampening={id:defaults.traumaDampening.id,
      chargesRemaining:defaults.traumaDampening.usesRemaining ?? defaults.traumaDampening.maximumUses};
    nextSuit.suits.push(suit);
  }
  const hasWeapon=weaponCatalogId && weaponCatalogId !== 'none';
  if (hasWeapon) {
    if (!validId(weaponId) || nextWeapons.weapons.some(w=>w.id===weaponId)) throw new RangeError('Unique weapon ID required');
    nextWeapons=addWeapon(nextWeapons,{id:weaponId,catalogId:weaponCatalogId,ownerId:entity.id,
      attachmentIds,ammunitionId,ammunitionRemaining,overrides:weaponOverrides});
  }
  if (!Array.isArray(carriedWeapons)) throw new TypeError('Carried weapons must be an array');
  for (const carried of carriedWeapons) {
    if (!validId(carried?.id)) throw new RangeError('Carried weapon requires unique ID');
    nextWeapons=addWeapon(nextWeapons,{id:carried.id,catalogId:carried.catalogId,ownerId:entity.id,
      attachmentIds:carried.attachmentIds ?? [],ammunitionId:carried.ammunitionId ?? null,
      ammunitionRemaining:carried.ammunitionRemaining ?? null,overrides:carried.overrides ?? {}});
  }
  nextSuit.occupants.push({id:entity.id,health:copy(entity.health),
    woundsTaken:Math.max(0,entity.health.maximumWounds-entity.health.woundsRemaining),
    equippedSuitId,appliedVehiclePersonnelResolutionIds:[]});
  nextSuit=createOccupantSuitRegistry(nextSuit);
  return {entity:copy({...entity,equippedSuitId,equippedWeaponId:hasWeapon?weaponId:null,carriedWeaponIds:carriedWeapons.map(w=>w.id)}),
    occupantSuitRegistry:nextSuit,weaponRegistry:nextWeapons};
}
