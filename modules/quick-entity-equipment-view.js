/** Read-only projection of linked instance state for Quick Entity UI.
 * Legacy entities remain valid without linked records. Never infer ownership from labels.
 */
import { getPersonalEquipment } from '../data/personal-equipment.js';
const clone = value => structuredClone(value);
export function projectQuickEntityEquipment(entity, { occupantSuitRegistry = {occupants:[],suits:[]}, weaponRegistry = {weapons:[]}, vehicleRegistry = {vehicles:[],mounts:[],stations:[]} } = {}) {
  if (!entity || typeof entity.id !== 'string') throw new TypeError('Quick Entity required');
  const occupant = (occupantSuitRegistry.occupants ?? []).find(o=>o.id===entity.id);
  const suit = occupant?.equippedSuitId ? (occupantSuitRegistry.suits ?? []).find(s=>s.id===occupant.equippedSuitId) : null;
  const weapon = (weaponRegistry.weapons ?? []).find(w=>w.ownerId===entity.id && w.id===entity.equippedWeaponId) ?? null;
  const vehicle = (vehicleRegistry.vehicles ?? []).find(v=>v.entityId===entity.id) ?? null;
  const mounts = vehicle ? (vehicleRegistry.mounts ?? []).filter(m=>m.vehicleId===vehicle.id) : [];
  const stations = vehicle ? (vehicleRegistry.stations ?? []).filter(s=>s.vehicleId===vehicle.id) : [];
  const definition = weapon ? getPersonalEquipment(weapon.catalogId) : null;
  return clone({
    kind:entity.type==='vehicle'?'vehicle':'personnel',
    occupantId:occupant?.id ?? null,
    suit:suit?{id:suit.id,label:suit.label??suit.id,condition:suit.armorState??suit.condition??null,
      av:suit.originalAv??suit.armor?.av??null,dr:suit.dr??suit.armor?.dr??null,
      dampeningCharges:suit.traumaDampening?.chargesRemaining??null}:null,
    weapon:weapon?{id:weapon.id,label:definition?.label??weapon.catalogId,condition:weapon.condition,
      ammunitionId:weapon.ammunitionId,ammunitionRemaining:weapon.ammunitionRemaining,attachmentCount:weapon.attachmentIds.length}:null,
    vehicle:vehicle?{id:vehicle.id,condition:vehicle.condition,chassisId:vehicle.chassisId}:null,
    mounts:mounts.map(m=>({id:m.id,label:m.label,condition:m.condition,ammunitionRemaining:m.ammunitionRemaining})),
    stations:stations.map(s=>({id:s.id,label:s.label,occupantId:s.occupantId}))
  });
}
