/** Pure orchestration of Quick Entity batch creation and registry updates.
 * UI navigation, notifications, rendering and persistence belong to the host.
 */
import { assembleQuickEntityBatch } from './quick-entity-batch-assembly.js';

export function addQuickEntitiesToState({state, entities, sourceEntities=[], idFactory}={}) {
  if (!state || !Array.isArray(state.quickEntities)) throw new TypeError('Quick Entity state required');
  if (!Array.isArray(entities) || !entities.length) throw new TypeError('At least one entity required');
  const existing = new Set(state.quickEntities.map(entity => entity.id));
  for (const entity of entities) {
    if (!entity?.id || existing.has(entity.id)) throw new RangeError('Duplicate or invalid Quick Entity identity');
    existing.add(entity.id);
  }
  const batch = assembleQuickEntityBatch({
    entities, sourceEntities,
    occupantSuitRegistry:state.occupantSuitRegistry,
    weaponRegistry:state.weaponRegistry,
    vehicleRegistry:state.vehicleRegistry,
    idFactory
  });
  return {
    ...state,
    quickEntities:[...state.quickEntities, ...batch.entities],
    occupantSuitRegistry:batch.occupantSuitRegistry,
    weaponRegistry:batch.weaponRegistry,
    vehicleRegistry:batch.vehicleRegistry,
    selectedEntityId:batch.entities[0].id,
    editingEntityId:batch.entities[0].id,
    quickEntityErrors:[]
  };
}
