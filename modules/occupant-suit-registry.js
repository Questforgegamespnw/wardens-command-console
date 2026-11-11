/** Phase 2F: independent occupant/suit records and ID-only equipment links.
 * Pure operations; caller saves the returned registry atomically.
 * Health and wounds belong exclusively to occupants; suit condition and
 * dampening charges belong exclusively to suits.
 */
const clone = value => structuredClone(value);
const validId = value => typeof value === 'string' && value.trim().length > 0;
function assertRecords(records, kind) {
  if (!Array.isArray(records)) throw new TypeError(`${kind} must be an array`);
  const seen = new Set();
  for (const record of records) {
    if (!record || !validId(record.id) || seen.has(record.id)) throw new TypeError(`Invalid or duplicate ${kind} id`);
    seen.add(record.id);
  }
}
export function validateOccupantSuitRegistry(registry) {
  if (!registry || typeof registry !== 'object') throw new TypeError('Registry required');
  const { occupants, suits } = registry;
  assertRecords(occupants, 'occupant'); assertRecords(suits, 'suit');
  const suitIds = new Set(suits.map(s => s.id));
  const equipped = new Set();
  for (const occupant of occupants) {
    const id = occupant.equippedSuitId ?? null;
    if (id === null) continue;
    if (!validId(id) || !suitIds.has(id)) throw new RangeError('Dangling equipped suit reference');
    if (equipped.has(id)) throw new RangeError('Suit equipped by multiple occupants');
    equipped.add(id);
  }
  return true;
}
export function createOccupantSuitRegistry({ occupants = [], suits = [] } = {}) {
  const registry = clone({ occupants, suits });
  validateOccupantSuitRegistry(registry);
  return registry;
}
export function equipSuit(registry, occupantId, suitId) {
  validateOccupantSuitRegistry(registry);
  if (!validId(occupantId) || !validId(suitId)) throw new TypeError('Stable occupant and suit IDs required');
  const next = clone(registry);
  const occupant = next.occupants.find(o => o.id === occupantId);
  if (!occupant) throw new RangeError('Occupant not found');
  if (!next.suits.some(s => s.id === suitId)) throw new RangeError('Suit not found');
  if (next.occupants.some(o => o.id !== occupantId && o.equippedSuitId === suitId)) throw new RangeError('Suit already equipped');
  occupant.equippedSuitId = suitId;
  validateOccupantSuitRegistry(next);
  return next;
}
export function unequipSuit(registry, occupantId) {
  validateOccupantSuitRegistry(registry);
  if (!validId(occupantId)) throw new TypeError('Occupant ID required');
  const next = clone(registry);
  const occupant = next.occupants.find(o => o.id === occupantId);
  if (!occupant) throw new RangeError('Occupant not found');
  occupant.equippedSuitId = null;
  return next;
}
export function transferSuit(registry, fromOccupantId, toOccupantId) {
  validateOccupantSuitRegistry(registry);
  if (!validId(fromOccupantId) || !validId(toOccupantId) || fromOccupantId === toOccupantId) throw new TypeError('Distinct occupant IDs required');
  const next = clone(registry);
  const from = next.occupants.find(o => o.id === fromOccupantId);
  const to = next.occupants.find(o => o.id === toOccupantId);
  if (!from || !to || !from.equippedSuitId) throw new RangeError('Source occupant has no equipped suit');
  if (to.equippedSuitId) throw new RangeError('Destination occupant must first unequip');
  to.equippedSuitId = from.equippedSuitId;
  from.equippedSuitId = null;
  validateOccupantSuitRegistry(next);
  return next;
}
export function getEquippedSuit(registry, occupantId) {
  validateOccupantSuitRegistry(registry);
  const occupant = registry.occupants.find(o => o.id === occupantId);
  if (!occupant) throw new RangeError('Occupant not found');
  return occupant.equippedSuitId ? clone(registry.suits.find(s => s.id === occupant.equippedSuitId)) : null;
}
