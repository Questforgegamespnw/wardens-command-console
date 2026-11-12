/** Phase 2G-2C: independent vehicle, mount and crew-station identities.
 * Chassis loadout entries are descriptive strings, NOT catalog weapon IDs.
 * No invented weapon statistics or automatically generated people.
 */
import { getEntityTemplate } from '../data/entity-templates.js';
const clone = value => structuredClone(value);
const validId = id => typeof id === 'string' && id.trim().length > 0;
const check = (ok, message) => { if (!ok) throw new RangeError(message); };
export function createVehicleRegistry({ vehicles = [], mounts = [], stations = [] } = {}) {
  const next = clone({ vehicles, mounts, stations });
  const unique = (items, label) => {
    const seen = new Set();
    for (const item of items) {
      check(validId(item?.id) && !seen.has(item.id), `Invalid or duplicate ${label} ID`);
      seen.add(item.id);
    }
  };
  unique(next.vehicles, 'vehicle'); unique(next.mounts, 'mount'); unique(next.stations, 'station');
  const vehicleIds = new Set(next.vehicles.map(v => v.id));
  for (const vehicle of next.vehicles) {
    check(validId(vehicle.entityId), 'Vehicle Quick Entity link required');
    check(typeof vehicle.chassisId === 'string', 'Vehicle chassis ID required');
  }
  check(new Set(next.vehicles.map(v => v.entityId)).size === next.vehicles.length, 'Vehicle entity linked twice');
  for (const mount of next.mounts) {
    check(vehicleIds.has(mount.vehicleId), 'Orphaned vehicle mount');
    check(typeof mount.label === 'string' && mount.label.trim(), 'Mount label required');
    check(mount.catalogId === null || validId(mount.catalogId), 'Invalid mount catalog ID');
  }
  for (const station of next.stations) {
    check(vehicleIds.has(station.vehicleId), 'Orphaned crew station');
    check(station.occupantId === null || validId(station.occupantId), 'Invalid crew occupant ID');
    check(typeof station.label === 'string' && station.label.trim(), 'Station label required');
  }
  const occupied = next.stations.filter(s => s.occupantId !== null).map(s => s.occupantId);
  check(new Set(occupied).size === occupied.length, 'Crew occupant assigned to multiple stations');
  return next;
}
export function assembleVehicle({ entity, chassisId = entity?.templateId ?? '', registry, vehicleId,
  mountIds = [], stationIds = [], crewStations = [] } = {}) {
  check(entity?.type === 'vehicle' && validId(entity.id), 'Vehicle Quick Entity required');
  check(validId(vehicleId), 'Stable vehicle ID required');
  const chassis = chassisId ? getEntityTemplate(chassisId) : null;
  check(!chassisId || chassis?.type === 'vehicle', 'Unknown vehicle chassis');
  const old = createVehicleRegistry(registry);
  check(!old.vehicles.some(v => v.id === vehicleId || v.entityId === entity.id), 'Vehicle already registered');
  const loadout = chassis?.profile?.loadout ?? [];
  check(mountIds.length === loadout.length, 'One unique mount ID required per chassis loadout entry');
  check(Array.isArray(crewStations), 'Crew stations must be an array');
  check(stationIds.length === crewStations.length, 'One station ID required per crew station');
  const used = new Set([...old.vehicles, ...old.mounts, ...old.stations].map(x => x.id));
  for (const id of [vehicleId, ...mountIds, ...stationIds]) {
    check(validId(id) && !used.has(id), 'Duplicate or invalid vehicle component ID'); used.add(id);
  }
  const next = clone(old);
  next.vehicles.push({ id:vehicleId, entityId:entity.id, chassisId:chassisId || '', condition: 'operational' });
  loadout.forEach((label, i) => next.mounts.push({id:mountIds[i], vehicleId, label, catalogId:null,
    condition:'operational', ammunitionRemaining:null, overrides:{}}));
  crewStations.forEach((entry, i) => next.stations.push({id:stationIds[i],vehicleId,
    label: typeof entry === 'string' ? entry : entry.label,
    occupantId: typeof entry === 'string' ? null : (entry.occupantId ?? null)}));
  return {entity:clone({...entity,vehicleId,weaponMountIds:[...mountIds],crewStationIds:[...stationIds]}),
    vehicleRegistry:createVehicleRegistry(next)};
}
export function assignVehicleCrew(registry, stationId, occupantId = null) {
  const next=createVehicleRegistry(registry);
  const station=next.stations.find(s=>s.id===stationId);
  check(station, 'Crew station not found');
  check(occupantId===null || validId(occupantId), 'Invalid occupant ID');
  if (occupantId!==null) check(!next.stations.some(s=>s.id!==stationId && s.occupantId===occupantId), 'Occupant already assigned');
  station.occupantId=occupantId;
  return createVehicleRegistry(next);
}
