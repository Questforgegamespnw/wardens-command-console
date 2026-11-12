/** Phase 2H-2: validate an entire saved session before restoring any fields.
 * Pure and host-independent; the caller commits the returned snapshot once.
 */
import { createOccupantSuitRegistry } from './occupant-suit-registry.js';
import { createWeaponRegistry } from './weapon-instance-registry.js';
import { createVehicleRegistry } from './vehicle-instance-registry.js';

const validId = value => typeof value === 'string' && value.trim().length > 0;
const assert = (ok, message) => { if (!ok) throw new RangeError(`Invalid session: ${message}`); };
const unique = (items, label) => {
  assert(Array.isArray(items), `${label} must be an array`);
  const ids = new Set();
  for (const item of items) {
    assert(validId(item?.id) && !ids.has(item.id), `duplicate or invalid ${label} ID`);
    ids.add(item.id);
  }
  return ids;
};

export function validateSessionSnapshot(stored) {
  assert(stored && typeof stored === 'object' && !Array.isArray(stored), 'object required');
  const snapshot = structuredClone(stored);
  const entities = snapshot.quickEntities ?? [];
  const entityIds = unique(entities, 'Quick Entity');
  const occupantSuitRegistry = createOccupantSuitRegistry(snapshot.occupantSuitRegistry ?? {});
  const weaponRegistry = createWeaponRegistry(snapshot.weaponRegistry ?? {});
  const vehicleRegistry = createVehicleRegistry(snapshot.vehicleRegistry ?? {});
  const occupants = new Map(occupantSuitRegistry.occupants.map(o => [o.id, o]));
  const suits = new Set(occupantSuitRegistry.suits.map(s => s.id));
  const weapons = new Map(weaponRegistry.weapons.map(w => [w.id, w]));
  const vehicles = new Map(vehicleRegistry.vehicles.map(v => [v.id, v]));
  const mounts = new Map(vehicleRegistry.mounts.map(m => [m.id, m]));
  const stations = new Map(vehicleRegistry.stations.map(s => [s.id, s]));
  const entityMap = new Map(entities.map(e => [e.id, e]));

  for (const occupant of occupants.values()) {
    assert(entityIds.has(occupant.id), `orphan occupant ${occupant.id}`);
    assert(entityMap.get(occupant.id)?.type !== 'vehicle', `vehicle used as occupant ${occupant.id}`);
  }
  for (const weapon of weapons.values()) {
    assert(weapon.ownerId === null || occupants.has(weapon.ownerId), `orphan weapon owner ${weapon.id}`);
  }
  for (const vehicle of vehicles.values()) {
    assert(entityIds.has(vehicle.entityId), `orphan vehicle ${vehicle.id}`);
    assert(entityMap.get(vehicle.entityId)?.type === 'vehicle', `nonvehicle chassis link ${vehicle.id}`);
  }
  for (const station of stations.values()) {
    assert(station.occupantId === null || occupants.has(station.occupantId), `orphan crew assignment ${station.id}`);
  }
  // The entity suit field is a creation-time snapshot; live equipment state is
  // authoritative on the occupant. Doff/transfer may legitimately leave it stale.
  for (const entity of entities) {
    const occupant = occupants.get(entity.id);
    if (entity.equippedSuitId != null) {
      assert(occupant && suits.has(entity.equippedSuitId),
        `invalid historical suit reference on ${entity.id}`);
    }
    if (entity.equippedWeaponId != null) {
      assert(occupant && weapons.get(entity.equippedWeaponId)?.ownerId === entity.id,
        `inconsistent equipped weapon on ${entity.id}`);
    }
    if (entity.carriedWeaponIds != null) {
      assert(Array.isArray(entity.carriedWeaponIds), `invalid carried weapons on ${entity.id}`);
      assert(new Set(entity.carriedWeaponIds).size === entity.carriedWeaponIds.length, `duplicate carried weapons on ${entity.id}`);
      for (const id of entity.carriedWeaponIds) assert(weapons.get(id)?.ownerId === entity.id, `orphan carried weapon ${id}`);
    }
    if (entity.vehicleId != null) {
      assert(vehicles.get(entity.vehicleId)?.entityId === entity.id, `inconsistent vehicle link on ${entity.id}`);
    }
    if (entity.weaponMountIds != null) {
      assert(Array.isArray(entity.weaponMountIds), `invalid mounts on ${entity.id}`);
      for (const id of entity.weaponMountIds) assert(mounts.get(id)?.vehicleId === entity.vehicleId, `orphan entity mount ${id}`);
    }
    if (entity.crewStationIds != null) {
      assert(Array.isArray(entity.crewStationIds), `invalid stations on ${entity.id}`);
      for (const id of entity.crewStationIds) assert(stations.get(id)?.vehicleId === entity.vehicleId, `orphan entity station ${id}`);
    }
  }
  if (snapshot.selectedEntityId != null) assert(entityIds.has(snapshot.selectedEntityId), 'selected entity missing');
  return { ...snapshot, quickEntities: entities, occupantSuitRegistry, weaponRegistry, vehicleRegistry };
}
