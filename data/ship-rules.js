export const SHIP_SEVERITIES = Object.freeze([
  "no_effect", "glancing", "solid", "breaching", "catastrophic",
]);

export const SHIP_SEVERITY_RANK = Object.freeze(
  Object.fromEntries(SHIP_SEVERITIES.map((id, index) => [id, index])),
);

export const SHIP_PENETRATION = Object.freeze({
  none: { id: "none", label: "None", mode: "fixed", prReduction: 0 },
  piercing: { id: "piercing", label: "Piercing", mode: "fixed", prReduction: 1 },
  anti_armor: { id: "anti_armor", label: "Anti-Armor", mode: "fixed", prReduction: 2 },
  systems_bypass: { id: "systems_bypass", label: "Systems Bypass", mode: "systems_bypass", prReduction: 0 },
  siege: { id: "siege", label: "Siege", mode: "class_sensitive" },
  capital: { id: "capital", label: "Capital", mode: "class_sensitive" },
  anti_capital: { id: "anti_capital", label: "Anti-Capital / Sovereign", mode: "scenario" },
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
  no_effect: {
    hullLoss: 0,
    shipTacSeverity: null,
  },
  glancing: {
    hullLoss: 0,
    shipTacSeverity: null,
    temporaryConsequence: true,
  },
  solid: {
    hullLoss: 1,
    shipTacSeverity: "minor",
  },
  breaching: {
    hullLoss: 1,
    shipTacSeverity: "moderate",
  },
  catastrophic: {
    hullLoss: 2,
    shipTacSeverity: "severe",
    megadamageEligible: true,
  },
});

export function shiftShipSeverity(severityId, steps = 0) {
  const rank = SHIP_SEVERITY_RANK[severityId];
  if (rank === undefined) {
    throw new RangeError(`Unknown ship severity: ${severityId}`);
  }

  const next = Math.max(
    0,
    Math.min(SHIP_SEVERITIES.length - 1, rank + Number(steps)),
  );

  return SHIP_SEVERITIES[next];
}

export function getShipDistanceBand(id) {
  const result = SHIP_DISTANCE_BANDS.find((entry) => entry.id === id);
  if (!result) throw new RangeError(`Unknown ship distance band: ${id}`);
  return result;
}

export function getShipPenetration(id) {
  const result = SHIP_PENETRATION[id];
  if (!result) throw new RangeError(`Unknown ship penetration: ${id}`);
  return result;
}

export function getMinimumMeaningfulWeaponSize(classId) {
  return Math.max(1, Number(classId) - 2);
}

export function hasShipWeaponOvermatch(weaponSize, classId) {
  return Number(weaponSize) >= Number(classId) + 2;
}

export function resolveShipEffectivePr({
  basePr = 0,
  penetrationId = "none",
  targetClass = 0,
  peerScaleSiege = false,
}) {
  const penetration = getShipPenetration(penetrationId);
  const classId = Number(targetClass);
  const numericPr = Math.max(0, Number(basePr) || 0);

  if (penetration.mode === "systems_bypass") {
    return {
      basePr: numericPr,
      effectivePr: 0,
      ignored: true,
      systemsBypass: true,
      districtOnly: false,
      scenarioScale: false,
    };
  }

  if (penetration.mode === "scenario") {
    return {
      basePr: numericPr,
      effectivePr: 0,
      ignored: true,
      systemsBypass: false,
      districtOnly: classId >= 7,
      scenarioScale: true,
    };
  }

  if (penetration.mode === "fixed") {
    const reduction = Number(penetration.prReduction ?? 0);
    return {
      basePr: numericPr,
      effectivePr: Math.max(0, numericPr - reduction),
      ignored: false,
      reduction,
      systemsBypass: false,
      districtOnly: false,
      scenarioScale: false,
    };
  }

  if (penetrationId === "siege") {
    if (classId <= 3) {
      return { basePr: numericPr, effectivePr: 0, ignored: true, reduction: numericPr, districtOnly: false, scenarioScale: false };
    }
    if (classId <= 5) {
      return { basePr: numericPr, effectivePr: Math.max(0, numericPr - 3), ignored: false, reduction: 3, districtOnly: false, scenarioScale: false };
    }
    if (classId === 6) {
      const reduction = peerScaleSiege ? numericPr : 2;
      return { basePr: numericPr, effectivePr: peerScaleSiege ? 0 : Math.max(0, numericPr - reduction), ignored: peerScaleSiege, reduction, districtOnly: false, scenarioScale: false };
    }
    return { basePr: numericPr, effectivePr: numericPr, ignored: false, reduction: 0, districtOnly: true, scenarioScale: false };
  }

  if (penetrationId === "capital") {
    if (classId <= 5) {
      return { basePr: numericPr, effectivePr: 0, ignored: true, reduction: numericPr, districtOnly: false, scenarioScale: false };
    }
    if (classId === 6) {
      return { basePr: numericPr, effectivePr: Math.max(0, numericPr - 3), ignored: false, reduction: 3, districtOnly: false, scenarioScale: false };
    }
    return { basePr: numericPr, effectivePr: numericPr, ignored: false, reduction: 0, districtOnly: true, scenarioScale: false };
  }

  throw new RangeError(`Unsupported ship penetration: ${penetrationId}`);
}
