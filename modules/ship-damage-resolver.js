import {
  SHIP_FINAL_SEVERITY_EFFECTS,
  SHIP_SEVERITY_RANK,
  getShipDistanceBand,
  getShipPenetration,
  shiftShipSeverity,
} from "../data/ship-rules.js";
import { getShipClass, isEnvironmentScaleShip } from "../data/ship-classes.js";
import { getShipWeapon } from "../data/ship-weapons.js";

export function resolveWeaponSizeBand({ weaponSize, targetClass }) {
  const difference = Number(weaponSize) - Number(targetClass);
  if (!Number.isFinite(difference)) throw new TypeError("weaponSize and targetClass must be finite numbers");

  if (difference >= 3) return Object.freeze({ id: "overmatch", difference, minimumCleanHitSeverity: "breaching" });
  if (difference === 2) return Object.freeze({ id: "oversized", difference, severityShift: 1, alternativePrReduction: 2 });
  if (difference <= -3) return Object.freeze({ id: "severely_undersized", difference, protectedHullNormallyInvalid: true });
  if (difference === -2) return Object.freeze({ id: "undersized", difference, severityShift: -1 });
  return Object.freeze({ id: "matched", difference, severityShift: 0 });
}

export function resolveEffectivePr({
  basePr = 0,
  penetrationId = "none",
  targetClass,
  extraPrReduction = 0,
}) {
  const penetration = getShipPenetration(penetrationId);
  const numericPr = Math.max(0, Number(basePr));
  let ignored = false;
  let reduction = Number(extraPrReduction);

  if (typeof penetration.prReduction === "number") reduction += penetration.prReduction;
  if (penetrationId === "siege" && Number(targetClass) <= 3) ignored = true;
  if (penetrationId === "capital" && Number(targetClass) <= 4) ignored = true;
  if (penetrationId === "anti_capital") ignored = true;

  return Object.freeze({
    basePr: numericPr,
    penetrationId,
    ignored,
    reduction,
    effectivePr: ignored ? 0 : Math.max(0, numericPr - reduction),
  });
}

function applyMinimumSeverity(current, minimum) {
  if (!minimum) return current;
  return SHIP_SEVERITY_RANK[current] >= SHIP_SEVERITY_RANK[minimum] ? current : minimum;
}

export function resolveShipAttack(input = {}) {
  const {
    weaponId,
    weaponProfile,
    targetClass,
    targetPr = 0,
    hitQuality = "clean",
    rangeBand = "medium",
    targetExposed = false,
    targetAlreadyCompromised = false,
    defenseInvalidatedShot = false,
    calledShotLocation = null,
    calledShotForSeverity = false,
    useOversizedAsPrReduction = false,
    extraSeverityShift = 0,
    extraPrReduction = 0,
  } = input;

  const weapon = weaponProfile ? Object.freeze({ ...weaponProfile }) : getShipWeapon(weaponId);
  const shipClass = getShipClass(targetClass);
  const distance = getShipDistanceBand(rangeBand);

  if (defenseInvalidatedShot || distance.normalAttack === false) {
    return Object.freeze({
      outcome: "shot_invalidated",
      finalSeverity: "no_effect",
      effect: SHIP_FINAL_SEVERITY_EFFECTS.no_effect,
    });
  }

  if (!weapon.baseSeverity) {
    return Object.freeze({
      outcome: "non_damage_system",
      weapon,
      targetClass: shipClass,
      finalSeverity: null,
    });
  }

  const qualityShift = hitQuality === "weak" ? -1 : hitQuality === "strong" ? 1 : 0;
  const sizeBand = resolveWeaponSizeBand({ weaponSize: weapon.weaponSize, targetClass: shipClass.classId });

  if (sizeBand.protectedHullNormallyInvalid && !targetExposed && !targetAlreadyCompromised) {
    return Object.freeze({
      outcome: "protected_hull_invalid",
      weapon,
      targetClass: shipClass,
      sizeBand,
      finalSeverity: "no_effect",
      effect: SHIP_FINAL_SEVERITY_EFFECTS.no_effect,
    });
  }

  let severity = shiftShipSeverity(weapon.baseSeverity, qualityShift);
  if (sizeBand.severityShift && !useOversizedAsPrReduction) severity = shiftShipSeverity(severity, sizeBand.severityShift);
  if (calledShotForSeverity) severity = shiftShipSeverity(severity, 1);
  if (extraSeverityShift) severity = shiftShipSeverity(severity, extraSeverityShift);

  const pr = resolveEffectivePr({
    basePr: targetPr,
    penetrationId: weapon.penetration || "none",
    targetClass: shipClass.classId,
    extraPrReduction:
      Number(extraPrReduction) +
      (useOversizedAsPrReduction && sizeBand.id === "oversized" ? sizeBand.alternativePrReduction : 0),
  });

  severity = shiftShipSeverity(severity, -pr.effectivePr);

  if (sizeBand.id === "overmatch" && hitQuality !== "weak") {
    severity = applyMinimumSeverity(severity, sizeBand.minimumCleanHitSeverity);
  }

  if (severity === "no_effect") severity = "glancing";

  const effect = SHIP_FINAL_SEVERITY_EFFECTS[severity];
  const environmentScale = isEnvironmentScaleShip(shipClass.classId);
  const handoffs = [];

  if (environmentScale && SHIP_SEVERITY_RANK[severity] >= SHIP_SEVERITY_RANK.solid) {
    handoffs.push({
      type: "environment_damage",
      instruction: "Apply district integrity loss, system failure, route closure, alert increase, or crisis-clock advance.",
    });
  } else if (effect.stacSeverity) {
    handoffs.push({
      type: "ship_stac",
      severity: effect.stacSeverity,
      locationId: calledShotForSeverity ? null : calledShotLocation,
    });
  }

  if (effect.criticalEligible) handoffs.push({ type: "critical_or_megadamage" });

  return Object.freeze({
    outcome: environmentScale ? "environment_scale_hit" : "ship_scale_hit",
    weapon,
    targetClass: shipClass,
    sizeBand,
    pr,
    finalSeverity: severity,
    effect,
    handoffs: Object.freeze(handoffs),
  });
}
