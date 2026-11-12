/** Phase 2G-2A: read-only reconciliation of the canonical equipment catalog
 * with legacy Quick Entity armor presets. No silent stat merging.
 */
import { listPersonalEquipment, getPersonalEquipment } from '../data/personal-equipment.js';
import { ENTITY_ARMOR_PACKAGES } from '../data/entity-templates/armor-packages.js';

// Only explicit aliases are permitted; labels alone must not imply equivalence.
export const LEGACY_ARMOR_CATALOG_IDS = Object.freeze({
  standard_battle_dress: 'standard_battle_dress',
  advanced_battle_dress: 'advanced_battle_dress',
  armored_combat_eva: 'armored_combat_eva',
  juggernaut: 'juggernaut_class_armor',
});

export function reconcileArmorCatalog() {
  const catalog = listPersonalEquipment({ category: 'armor' });
  const covered = new Set();
  const presets = Object.values(ENTITY_ARMOR_PACKAGES).map(preset => {
    const catalogId = LEGACY_ARMOR_CATALOG_IDS[preset.id] ?? null;
    const definition = catalogId ? getPersonalEquipment(catalogId) : null;
    if (definition) covered.add(catalogId);
    const differences = [];
    if (catalogId && !definition) differences.push('missing_catalog_definition');
    if (definition && typeof definition.profile?.av === 'number' && definition.profile.av !== preset.defense.av) {
      differences.push('av_mismatch');
    }
    // The canonical catalog currently provides descriptive tags and AV, while
    // legacy presets also encode DR, dampening, and combat flags. Preserve both.
    return Object.freeze({ presetId: preset.id, catalogId, matched: !!definition,
      classification: !catalogId ? 'legacy_only' : definition ? 'mapped' : 'missing',
      differences: Object.freeze(differences),
      legacyDefense: structuredClone(preset.defense),
      catalogAv: definition?.profile?.av ?? null });
  });
  const catalogOnly = catalog.filter(entry => !covered.has(entry.id)).map(entry => entry.id);
  return Object.freeze({ presets: Object.freeze(presets), catalogOnly: Object.freeze(catalogOnly),
    catalogArmorCount: catalog.length, legacyPresetCount: presets.length });
}

export function listQuickEntityArmorChoices() {
  return Object.freeze([
    Object.freeze({ id: 'none', label: 'No armor / suit', catalogId: null, legacyPresetId: null }),
    ...listPersonalEquipment({ category: 'armor' }).map(entry => Object.freeze({
      id: entry.id, label: entry.label, catalogId: entry.id,
      legacyPresetId: Object.keys(LEGACY_ARMOR_CATALOG_IDS).find(key => LEGACY_ARMOR_CATALOG_IDS[key] === entry.id) ?? null,
    })),
  ]);
}
