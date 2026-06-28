export const SHIP_SEVERITIES = Object.freeze([
  "no_effect", "glancing", "solid", "breaching", "catastrophic",
]);

export const SHIP_SEVERITY_RANK = Object.freeze(
  Object.fromEntries(SHIP_SEVERITIES.map((id, index) => [id, index])),
);

export const SHIP_PENETRATION = Object.freeze({
  none: { id: "none", label: "None", prReduction: 0 },
  piercing: { id: "piercing", label: "Piercing", prReduction: 1 },
  anti_armor: { id: "anti_armor", label: "Anti-Armor", prReduction: 2 },
  siege: {
    id: "siege", label: "Siege", prReduction: null,
    special: "Ignore PR from small/medium ships when applicable.",
  },
  capital: {
    id: "capital", label: "Capital", prReduction: null,
    special: "Small ships normally cannot meaningfully apply PR.",
  },
  anti_capital: {
    id: "anti_capital", label: "Anti-Capital / Sovereign", prReduction: null,
    special: "Resolve against strategic sections, districts, or world-scale targets.",
  },
});

export const SHIP_DISTANCE_BANDS = Object.freeze([
  { id: "close", rank: 0, label: "Close", normalAttack: true, boarding: true },
  { id: "short", rank: 1, label: "Short", normalAttack: true, boarding: "requires_close" },
  { id: "medium", rank: 2, label: "Medium", normalAttack: true, boarding: false },
  { id: "long", rank: 3, label: "Long", normalAttack: true, boarding: false, disadvantage: true },
  { id: "out_of_reach", rank: 4, label: "Out of Reach", normalAttack: false, boarding: false },
]);

export const SHIP_HIT_QUALITY = Object.freeze({
  weak: { id: "weak", label: "Weak / Partial Lock", severityShift: -1 },
  clean: { id: "clean", label: "Clean Hit", severityShift: 0 },
  strong: { id: "strong", label: "Strong / Full Lock / Critical", severityShift: 1 },
});

export const SHIP_FINAL_SEVERITY_EFFECTS = Object.freeze({
  no_effect: { hullLoss: 0, stacSeverity: null },
  glancing: { hullLoss: 0, stacSeverity: null, temporaryConsequence: true },
  solid: { hullLoss: 1, hullOrStacChoice: true, stacSeverity: "minor" },
  breaching: { hullLoss: 1, stacSeverity: "moderate" },
  catastrophic: {
    hullLoss: 2, hullLossOpenEnded: true, stacSeverity: "severe",
    criticalEligible: true,
  },
});

export function shiftShipSeverity(severityId, steps = 0) {
  const rank = SHIP_SEVERITY_RANK[severityId];
  if (rank === undefined) throw new RangeError(`Unknown severity: ${severityId}`);
  const next = Math.max(0, Math.min(SHIP_SEVERITIES.length - 1, rank + Number(steps)));
  return SHIP_SEVERITIES[next];
}

export function getShipDistanceBand(id) {
  const result = SHIP_DISTANCE_BANDS.find((entry) => entry.id === id);
  if (!result) throw new RangeError(`Unknown distance band: ${id}`);
  return result;
}

export function getShipPenetration(id) {
  const result = SHIP_PENETRATION[id];
  if (!result) throw new RangeError(`Unknown penetration: ${id}`);
  return result;
}
