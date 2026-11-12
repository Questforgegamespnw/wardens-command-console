/** Phase 2G-2E: resolve infantry role loadouts without duplicating weapon stats. */
import { ENTITY_ROLE_TEMPLATES } from '../data/entity-templates/roles.js';
import { getPersonalEquipment } from '../data/personal-equipment.js';
import { LEGACY_ARMOR_CATALOG_IDS } from './equipment-catalog-reconciliation.js';

// Only explicit, reviewed equivalences; unknown role labels remain unresolved.
export const INFANTRY_WEAPON_ALIASES = Object.freeze({
  lmg: 'lmg_saw',
  anti_armor_launcher: 'disposable_anti_armor_launcher',
  compact_smg: 'smg',
  precision_rifle: 'sniper_rifle',
  precision_carbine: 'smart_rifle',
  sidearm: 'pistol',
});

export function resolveInfantryWeapon(reference) {
  if (!reference) return Object.freeze({reference:null, catalogId:null, kind:'none'});
  const direct = getPersonalEquipment(reference);
  if (direct?.category === 'weapons') return Object.freeze({reference,catalogId:reference,kind:'exact'});
  const alias = INFANTRY_WEAPON_ALIASES[reference];
  if (alias && getPersonalEquipment(alias)?.category === 'weapons')
    return Object.freeze({reference,catalogId:alias,kind:'alias'});
  return Object.freeze({reference,catalogId:null,kind:direct ? 'non_weapon' : 'unresolved'});
}

export function resolveInfantryLoadout(templateId) {
  const role = ENTITY_ROLE_TEMPLATES[templateId];
  if (!role) return null;
  return Object.freeze({templateId,armorCatalogId:LEGACY_ARMOR_CATALOG_IDS[role.armorPackageId] ?? null,
    primary:resolveInfantryWeapon(role.primaryWeapon),secondary:resolveInfantryWeapon(role.secondaryWeapon),
    armorPackageId:role.armorPackageId});
}

export function auditInfantryLoadouts() {
  return Object.freeze(Object.values(ENTITY_ROLE_TEMPLATES).map(role=>resolveInfantryLoadout(role.id)));
}
