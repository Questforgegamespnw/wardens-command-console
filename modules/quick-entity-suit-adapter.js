/** Phase 2F: ID-based Quick Entity bridge. Pure; no UI or storage writes.
 * A Quick Entity's id identifies the occupant. Health is never read from a suit.
 * The registry is authoritative for linked occupant and suit state.
 */
import { validateOccupantSuitRegistry, equipSuit, unequipSuit, transferSuit } from './occupant-suit-registry.js';
import { applyVehiclePersonnelCommit } from './vehicle-personnel-persistence.js';

const clone = value => structuredClone(value);
const requireId = id => { if (typeof id !== 'string' || !id.trim()) throw new TypeError('Stable ID required'); };
function locate(registry, occupantId) {
  validateOccupantSuitRegistry(registry);
  requireId(occupantId);
  const occupant = registry.occupants.find(o => o.id === occupantId);
  if (!occupant) throw new RangeError('Occupant record not found');
  const suit = occupant.equippedSuitId ? registry.suits.find(s => s.id === occupant.equippedSuitId) : null;
  return { occupant, suit };
}
/** Non-destructive view: never mixes suit durability with occupant Health. */
export function viewQuickEntityEquipment({ quickEntity, registry } = {}) {
  if (!quickEntity || typeof quickEntity !== 'object') throw new TypeError('Quick Entity required');
  const { occupant, suit } = locate(registry, quickEntity.id);
  return clone({ quickEntityId: quickEntity.id, occupantId: occupant.id,
    equippedSuitId: occupant.equippedSuitId ?? null,
    occupant: { health: occupant.health ?? null, woundsTaken: occupant.woundsTaken ?? null },
    suit: suit ? { id: suit.id, armorState: suit.armorState, originalAv: suit.originalAv,
      dr: suit.dr, armored: suit.armored, traumaDampening: suit.traumaDampening ?? null } : null });
}
/** Linking an existing Quick Entity never recreates its Health or wound state. */
export function linkQuickEntityOccupant({ quickEntity, registry } = {}) {
  if (!quickEntity || typeof quickEntity !== 'object') throw new TypeError('Quick Entity required');
  requireId(quickEntity.id);
  validateOccupantSuitRegistry(registry);
  if (registry.occupants.some(o => o.id === quickEntity.id)) throw new RangeError('Occupant already linked; use existing record');
  const next = clone(registry);
  next.occupants.push({ id: quickEntity.id, health: clone(quickEntity.health ?? {}),
    woundsTaken: Math.max(0, (quickEntity.health?.maximumWounds ?? 0) - (quickEntity.health?.woundsRemaining ?? 0)),
    equippedSuitId: null, appliedVehiclePersonnelResolutionIds: [] });
  validateOccupantSuitRegistry(next);
  return next;
}
/** Existing registry operations preserve independent record ownership. */
export function changeQuickEntityEquipment({ registry, action, occupantId, suitId, toOccupantId } = {}) {
  if (action === 'equip') return equipSuit(registry, occupantId, suitId);
  if (action === 'doff') return unequipSuit(registry, occupantId);
  if (action === 'transfer') return transferSuit(registry, occupantId, toOccupantId);
  throw new RangeError('Unknown equipment action');
}
/** Commit against the currently equipped suit only; transfer charges to suit ownership.
 * The Phase 2E projection carries charges on its temporary occupant record.
 * This adapter removes that temporary field before returning persistent records.
 */
export function commitQuickEntitySuitAttack({ registry, commit, pendingActions = [] } = {}) {
  if (!commit || !Array.isArray(pendingActions)) throw new TypeError('Commit and pending actions required');
  const { occupant, suit } = locate(registry, commit.occupantId);
  if (!suit || suit.id !== commit.suitId) throw new RangeError('Suit no longer equipped by target occupant');
  const charges = suit.traumaDampening?.chargesRemaining ?? 0;
  const temporaryOccupant = { ...clone(occupant),
    currentHealth: occupant.health?.currentHealth ?? occupant.currentHealth,
    dampeningUsesRemaining: charges };
  const result = applyVehiclePersonnelCommit({ commit, suit, occupant: temporaryOccupant });
  if (result.status === 'already_applied') return { status: result.status, registry: clone(registry), pendingActions: clone(pendingActions) };
  const next = clone(registry);
  const nextSuit = clone(result.suit);
  if (nextSuit.traumaDampening) nextSuit.traumaDampening.chargesRemaining = result.occupant.dampeningUsesRemaining;
  else if (result.occupant.dampeningUsesRemaining !== 0) throw new RangeError('Suit lacks dampening system for committed charges');
  const nextOccupant = clone(result.occupant);
  delete nextOccupant.dampeningUsesRemaining;
  if (nextOccupant.health && commit.occupantHealthAfter != null) nextOccupant.health.currentHealth = commit.occupantHealthAfter;
  delete nextOccupant.currentHealth;
  next.suits = next.suits.map(s => s.id === nextSuit.id ? nextSuit : s);
  next.occupants = next.occupants.map(o => o.id === nextOccupant.id ? nextOccupant : o);
  const existing = new Set(pendingActions.map(a => a.id));
  const added = result.pendingActions.filter(a => !existing.has(a.id));
  validateOccupantSuitRegistry(next);
  return { status: 'applied', registry: next, pendingActions: clone([...pendingActions, ...added]) };
}
