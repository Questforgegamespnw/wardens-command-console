/** Phase 2G-2F: immutable assembly for groups and duplicate Quick Entities.
 * No catalog statistics are duplicated here. An invalid member aborts the batch.
 */
import { createOccupantSuitRegistry } from './occupant-suit-registry.js';
import { createWeaponRegistry } from './weapon-instance-registry.js';
import { createVehicleRegistry, assembleVehicle } from './vehicle-instance-registry.js';
import { assemblePersonnel } from './quick-entity-assembly.js';
import { resolveInfantryLoadout } from './infantry-loadout-catalog.js';
import { getEntityTemplate } from '../data/entity-templates.js';
const copy = value => structuredClone(value);

export function assembleQuickEntityBatch({entities, sourceEntities=[], occupantSuitRegistry, weaponRegistry,
  vehicleRegistry, idFactory}={}) {
  if (!Array.isArray(entities) || typeof idFactory !== 'function') throw new TypeError('Entities and ID factory required');
  let suits=createOccupantSuitRegistry(occupantSuitRegistry);
  let weapons=createWeaponRegistry(weaponRegistry);
  let vehicles=createVehicleRegistry(vehicleRegistry);
  const completed=[];
  const occupied=new Set([...suits.occupants.map(o=>o.id), ...vehicles.vehicles.map(v=>v.entityId)]);
  for (let i=0;i<entities.length;i++) {
    const entity=entities[i];
    if (!entity?.id || occupied.has(entity.id) || completed.some(e=>e.id===entity.id)) throw new RangeError('Duplicate or invalid Quick Entity identity');
    const source=sourceEntities[i] ?? null;
    if (entity.type==='vehicle') {
      const chassis=getEntityTemplate(entity.templateId);
      const existing=source && vehicles.vehicles.find(v=>v.entityId===source.id);
      const mounts=existing ? vehicles.mounts.filter(m=>m.vehicleId===existing.id) : [];
      const stations=existing ? vehicles.stations.filter(s=>s.vehicleId===existing.id) : [];
      const loadout=chassis?.type==='vehicle' ? chassis.profile?.loadout ?? [] : [];
      // For duplicates, preserve authored mount labels and station names, never crew assignments.
      const assembled=assembleVehicle({entity,registry:vehicles,chassisId:chassis?.type==='vehicle'?chassis.id:'',
        vehicleId:idFactory('vehicle'),mountIds:(existing?mounts:loadout).map(()=>idFactory('mount')),
        crewStations:stations.map(s=>s.label),stationIds:stations.map(()=>idFactory('station'))});
      vehicles=assembled.vehicleRegistry;
      completed.push(assembled.entity);
    } else {
      const loadout=resolveInfantryLoadout(entity.templateId);
      const sourceSuit=source && suits.suits.find(s=>s.id===source.equippedSuitId);
      const sourceWeapons=source ? weapons.weapons.filter(w=>w.ownerId===source.id) : [];
      const primary=sourceWeapons.find(w=>w.id===source?.equippedWeaponId);
      const secondary=sourceWeapons.filter(w=>w.id!==source?.equippedWeaponId);
      const armorCatalogId=sourceSuit?.templateId ?? loadout?.armorCatalogId ?? 'none';
      const weaponCatalogId=primary?.catalogId ?? loadout?.primary.catalogId ?? 'none';
      const secondaryCatalogIds=source ? secondary.map(w=>w.catalogId) :
        (loadout?.secondary.catalogId ? [loadout.secondary.catalogId] : []);
      const assembled=assemblePersonnel({entity,armorCatalogId,weaponCatalogId,
        armorOverrides:sourceSuit?.armor ? copy(sourceSuit.armor) : {},
        suitId:armorCatalogId==='none'?null:idFactory('suit'),
        weaponId:weaponCatalogId==='none'?null:idFactory('weapon'),
        attachmentIds:primary?.attachmentIds ?? [],ammunitionId:primary?.ammunitionId ?? null,
        ammunitionRemaining:primary?.ammunitionRemaining ?? null,weaponOverrides:primary?.overrides ?? {},
        carriedWeapons:secondaryCatalogIds.map((catalogId,j)=>({id:idFactory('weapon'),catalogId,
          attachmentIds:secondary[j]?.attachmentIds ?? [],ammunitionId:secondary[j]?.ammunitionId ?? null,
          ammunitionRemaining:secondary[j]?.ammunitionRemaining ?? null,overrides:secondary[j]?.overrides ?? {}})),
        occupantSuitRegistry:suits,weaponRegistry:weapons});
      suits=assembled.occupantSuitRegistry;
      weapons=assembled.weaponRegistry;
      completed.push(assembled.entity);
    }
  }
  return {entities:completed,occupantSuitRegistry:suits,weaponRegistry:weapons,vehicleRegistry:vehicles};
}
