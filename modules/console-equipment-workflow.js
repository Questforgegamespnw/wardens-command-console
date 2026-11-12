/** Pure Quick Entity registration and attack orchestration; no browser storage. */
import { linkQuickEntityOccupant, changeQuickEntityEquipment, commitQuickEntitySuitAttack } from './quick-entity-suit-adapter.js';
import { planVehiclePersonnelImpact } from './vehicle-personnel-impact.js';
import { resolveVehiclePersonnelSequence } from './vehicle-personnel-sequence.js';
import { resolveVehiclePersonnelWounds } from './vehicle-personnel-wounds.js';
import { createVehiclePersonnelCommit } from './vehicle-personnel-persistence.js';
import { validateOccupantSuitRegistry } from './occupant-suit-registry.js';
import { createSuitInstance, hasArmorCapability } from './suit-capabilities.js';

const copy = v => structuredClone(v);
export function registerQuickEntity({registry, quickEntity}) {
  if (!quickEntity?.id || !quickEntity.health) throw new TypeError('Quick Entity with Health required');
  return linkQuickEntityOccupant({quickEntity, registry});
}
export function registerQuickEntitySuit({registry, suitId, quickEntity, label}) {
  validateOccupantSuitRegistry(registry);
  if (!suitId || registry.suits.some(s => s.id === suitId)) throw new RangeError('Unique suit ID required');
  if (!quickEntity?.defense) throw new TypeError('Quick Entity armor template required');
  const d = quickEntity.defense, damp = quickEntity.armorSystems?.traumaDampening;
  if (!Number.isFinite(d.av) || d.av < 0 || !Number.isFinite(d.dr) || d.dr < 0) throw new RangeError('Invalid armor values');
  const next = copy(registry);
  next.suits.push({id:suitId, label:label || `${quickEntity.label} suit`, originalAv:d.av, dr:d.dr,
    armored:Boolean(d.armored), armorState:'intact',
    traumaDampening:damp ? {id:damp.id, chargesRemaining:damp.usesRemaining ?? damp.maximumUses ?? 0} : null,
    appliedVehiclePersonnelResolutionIds:[]});
  validateOccupantSuitRegistry(next);
  return next;
}
export function registerEnvironmentalSuit({registry,suitId,label,templateId='standard_eva',environment={}}={}) {
  validateOccupantSuitRegistry(registry);
  if (registry.suits.some(s => s.id === suitId)) throw new RangeError('Duplicate suit ID');
  const next=copy(registry);
  next.suits.push(createSuitInstance({id:suitId,label,templateId,environment}));
  validateOccupantSuitRegistry(next);
  return next;
}
export function resolveQuickEntitySuitAttack({registry, occupantId, weapon, profileId, exposureId, resolutionId, random=Math.random, attackContext={}, tacOptions={}}) {
  validateOccupantSuitRegistry(registry);
  const occupant = registry.occupants.find(o => o.id === occupantId);
  const suit = registry.suits.find(s => s.id === occupant?.equippedSuitId);
  if (!occupant || !suit) throw new RangeError('An equipped occupant and suit are required');
  if (!hasArmorCapability(suit)) throw new RangeError('Suit has no armor capability; environmental hazard resolution is not yet connected');
  if (!resolutionId) throw new TypeError('Stable resolution ID required');
  const plan = planVehiclePersonnelImpact({weapon, profileId, exposureId, targetKind:'powered_suit'});
  if (!plan.supported || !['personnel_damage','powered_suit_direct_wounds'].includes(plan.route)) throw new RangeError('Unsupported attack route');
  if (plan.route === 'powered_suit_direct_wounds' && !/direct|impact|projectile/.test(exposureId)) throw new RangeError('Direct vehicle wounds require an explicitly direct exposure');
  const person = {woundsTaken:occupant.woundsTaken,
    currentHealth:occupant.health?.currentHealth, healthPerWound:occupant.health?.healthPerWound,
    maximumWounds:occupant.health?.maximumWounds, woundsRemaining:occupant.health?.woundsRemaining};
  const sequence = resolveVehiclePersonnelSequence({plan,suit,occupant:person,attackContext,random,tacOptions});
  const damp = suit.traumaDampening;
  const kind = damp?.id === 'trauma_dampening_plus' ? 'plus' : damp?.id === 'trauma_dampening' ? 'standard' : null;
  const wounds = resolveVehiclePersonnelWounds({sequence,occupant:person,dampening:kind,
    usesRemaining:damp?.chargesRemaining ?? 0,random});
  const commit = createVehiclePersonnelCommit({resolutionId,sequence,wounds,suitId:suit.id,occupantId});
  return {plan,sequence,wounds,commit};
}
export function commitQuickEntityAttackToSession({registry,quickEntities,pendingActions=[],commit}) {
  const result = commitQuickEntitySuitAttack({registry,commit,pendingActions});
  if (result.status !== 'applied') return {...result,quickEntities:copy(quickEntities)};
  const occupant = result.registry.occupants.find(o => o.id === commit.occupantId);
  const updatedEntities = quickEntities.map(e => e.id !== occupant.id ? copy(e) : {
    ...copy(e),health:{...copy(occupant.health), woundsRemaining: Math.max(0,(occupant.health?.maximumWounds ?? 0) - occupant.woundsTaken)},
  });
  // Keep Quick Entity Health a display mirror; registry occupant is authoritative.
  return {...result,quickEntities:updatedEntities};
}
export {changeQuickEntityEquipment};
