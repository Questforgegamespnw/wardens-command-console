export const ARMOR_STATE_ORDER = Object.freeze({
  intact: 0,
  light: 1,
  moderate: 2,
  severe: 3,
  broken: 4,
});

export const ARMOR_STATES = Object.freeze({
  intact: {
    id: "intact",
    label: "Intact",
    avLossFromOriginal: 0,
  },
  light: {
    id: "light",
    label: "Light Damage",
    avLossFromOriginal: 4,
  },
  moderate: {
    id: "moderate",
    label: "Moderate Damage",
    avLossFromOriginal: 6,
  },
  severe: {
    id: "severe",
    label: "Severe Damage",
    avLossFromOriginal: 10,
  },
  broken: {
    id: "broken",
    label: "Broken",
    avLossFromOriginal: null,
    effectiveAv: 0,
    allArmorSystemsOffline: true,
  },
});

export const PERSONAL_ARMOR_DOCTRINE = Object.freeze({
  armorHasHealth: false,
  armorHasWounds: false,
  wearerTakesExcessDamage: true,
  vehiclesMayHaveIndependentHealth: true,
  walkersMayHaveIndependentHealth: true,
});

export const DEFAULT_BROKEN_STATE = Object.freeze({
  speedModifier: -10,
  speedDisadvantage: true,
  movementRestricted: false,
  requiresRemovalOrMajorRepair: true,
  sealedLost: true,
  armorSystemsOffline: true,
});

export function getArmorState(id) {
  const state = ARMOR_STATES[id];
  if (!state) throw new RangeError(`Unknown armor state: ${id}`);
  return state;
}

export function worsenArmorState(currentState, incomingState) {
  const currentRank = ARMOR_STATE_ORDER[currentState];
  const incomingRank = ARMOR_STATE_ORDER[incomingState];
  if (currentRank === undefined || incomingRank === undefined) {
    throw new RangeError("Unknown armor state");
  }
  return currentRank >= incomingRank ? currentState : incomingState;
}

export function calculateEffectiveAv(originalAv, armorState) {
  const state = getArmorState(armorState);
  if (state.id === "broken") return 0;
  return Math.max(0, Number(originalAv) - Number(state.avLossFromOriginal || 0));
}
