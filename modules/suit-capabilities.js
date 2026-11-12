/** Phase 2G: optional suit capabilities. No inferred capacities or protection values. */
const copy = value => structuredClone(value);
const idOk = value => typeof value === 'string' && value.trim().length > 0;
const conditionStates = new Set(['intact','light','moderate','severe','broken']);
export function createSuitInstance({id,label,templateId,armor=null,environment=null}={}) {
  if (!idOk(id) || !idOk(templateId)) throw new TypeError('Suit ID and template ID required');
  if (armor !== null && (typeof armor !== 'object' || !Number.isFinite(armor.av) || armor.av < 0 || !Number.isFinite(armor.dr) || armor.dr < 0)) throw new RangeError('Invalid armor capability');
  if (environment !== null && (typeof environment !== 'object' || Array.isArray(environment))) throw new TypeError('Invalid environmental capability');
  const suit = {id,label:label || templateId,templateId,
    capabilities:{armor:armor ? {av:armor.av,dr:armor.dr,armored:Boolean(armor.armored)} : null,
      environment:environment ? copy(environment) : null},
    armorState:'intact',originalAv:armor?.av ?? 0,dr:armor?.dr ?? 0,armored:Boolean(armor?.armored),
    traumaDampening:null,appliedVehiclePersonnelResolutionIds:[]};
  validateSuitCapabilities(suit);
  return suit;
}
export function validateSuitCapabilities(suit) {
  if (!suit || !idOk(suit.id)) throw new TypeError('Suit record and ID required');
  if (!suit.capabilities) return true; // Backward-compatible Phase 2F suit
  const {armor,environment}=suit.capabilities;
  if (armor != null && (!Number.isFinite(armor.av) || armor.av < 0 || !Number.isFinite(armor.dr) || armor.dr < 0)) throw new RangeError('Invalid armor capability');
  if (environment != null) {
    if (typeof environment !== 'object' || Array.isArray(environment)) throw new TypeError('Invalid environmental capability');
    if (environment.air != null) {
      const air=environment.air;
      if (!Number.isFinite(air.remaining) || air.remaining < 0 || (air.capacity != null && (!Number.isFinite(air.capacity) || air.capacity < air.remaining))) throw new RangeError('Invalid air reserve');
    }
    if (environment.seals != null && (!environment.seals || typeof environment.seals !== 'object' || !idOk(environment.seals.status))) throw new TypeError('Invalid seal status');
  }
  if (!conditionStates.has(suit.armorState)) throw new RangeError('Invalid suit condition');
  return true;
}
export function hasArmorCapability(suit) {
  validateSuitCapabilities(suit);
  return suit.capabilities ? suit.capabilities.armor != null : true; // legacy 2F suits were armor
}
export function describeSuitCapabilities(suit) {
  validateSuitCapabilities(suit);
  const environment=suit.capabilities?.environment;
  return copy({id:suit.id,armor:hasArmorCapability(suit) ? {state:suit.armorState,av:suit.originalAv,dr:suit.dr,armored:suit.armored} : null,
    environment:environment ?? null});
}
