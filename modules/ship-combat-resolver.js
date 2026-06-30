import {
  SHIP_FINAL_SEVERITY_EFFECTS,
  SHIP_HIT_QUALITY,
  SHIP_SEVERITY_RANK,
  getShipDistanceBand,
  getMinimumMeaningfulWeaponSize,
  hasShipWeaponOvermatch,
  resolveShipEffectivePr,
  shiftShipSeverity,
} from "../data/ship-rules.js";

import {
  getShipClass,
  requiresMajorSection,
  usesDistrictIntegrity,
} from "../data/ship-classes.js";

function applyMinimumSeverity(current, minimum) {
  if (!minimum) return current;
  return SHIP_SEVERITY_RANK[current] >= SHIP_SEVERITY_RANK[minimum]
    ? current
    : minimum;
}

export function resolveShipCombat(input = {}) {
  const attack = input.attack ?? {};
  const target = input.target ?? {};
  const context = input.context ?? {};

  const shipClass = getShipClass(target.classId);
  const distance = getShipDistanceBand(context.rangeBand ?? "medium");
  const quality = SHIP_HIT_QUALITY[context.hitQuality ?? "clean"];

  if (!quality) throw new RangeError("Unknown ship hit quality.");

  if (!distance.normalAttack) {
    return {
      ok: true,
      outcome: "out_of_reach",
      finalSeverity: "no_effect",
      effect: SHIP_FINAL_SEVERITY_EFFECTS.no_effect,
      warnings: ["Target is Out of Reach for an ordinary attack."],
      calculation: [],
      handoffs: {},
      preview: null,
    };
  }

  if (attack.defensiveOnly) {
    return {
      ok: true,
      outcome: "defensive_only",
      finalSeverity: null,
      effect: null,
      warnings: ["This profile is defensive-only and does not resolve Hull damage."],
      calculation: [],
      handoffs: {},
      preview: null,
    };
  }

  let severity = attack.baseSeverity ?? "no_effect";
  const calculation = [
    { label: "Base Severity", value: severity },
  ];

  severity = shiftShipSeverity(severity, quality.severityShift);
  calculation.push({ label: "Hit Quality", value: quality.severityShift });

  const minimumMeaningfulSize = getMinimumMeaningfulWeaponSize(shipClass.classId);
  const weaponSize = Math.max(0, Number(attack.weaponSize ?? 1));
  const sizeMeaningful =
    weaponSize === 0
      ? attack.allowSizeZero === true
      : weaponSize >= minimumMeaningfulSize;

  const vulnerabilityEnabled = context.vulnerableTarget === true;
  const exposedSystem = context.exposedSystem ?? null;

  if (!sizeMeaningful && !vulnerabilityEnabled && !exposedSystem) {
    return {
      ok: true,
      outcome: "weapon_too_small",
      finalSeverity: "no_effect",
      effect: SHIP_FINAL_SEVERITY_EFFECTS.no_effect,
      warnings: [
        `Weapon Size ${weaponSize} is below the meaningful floor of ${minimumMeaningfulSize}.`,
      ],
      calculation,
      handoffs: {},
      preview: null,
    };
  }

  const overmatch = hasShipWeaponOvermatch(weaponSize, shipClass.classId);
  if (overmatch) {
    severity = shiftShipSeverity(severity, 1);
    calculation.push({ label: "Weapon Overmatch", value: 1 });
  }

  if (vulnerabilityEnabled && context.applyVulnerabilityShift === true) {
    severity = shiftShipSeverity(severity, 1);
    calculation.push({ label: "Vulnerability", value: 1 });
  }

  const pr = resolveShipEffectivePr({
    basePr: target.protectionRating ?? 0,
    penetrationId: attack.penetration ?? "none",
    targetClass: shipClass.classId,
    peerScaleSiege: context.peerScaleSiege === true,
  });

  if (pr.districtOnly && !usesDistrictIntegrity(shipClass.classId)) {
    throw new Error("District-only resolution was requested for a non-district target.");
  }

  if (!pr.systemsBypass && !pr.scenarioScale) {
    severity = shiftShipSeverity(severity, -pr.effectivePr);
    calculation.push({ label: "Effective PR", value: -pr.effectivePr });
  }

  if ((attack.penetration ?? "none") === "capital" && shipClass.classId <= 3) {
    severity = applyMinimumSeverity(severity, "breaching");
  }

  const minimumShipTacSeverity =
    context.hitQuality === "weak"
      ? null
      : attack.minimumShipTacSeverity ?? null;

  const effect = SHIP_FINAL_SEVERITY_EFFECTS[severity];
  const districtScale = usesDistrictIntegrity(shipClass.classId);
  const needsSection = requiresMajorSection(shipClass.classId);

  let hullLoss = effect.hullLoss ?? 0;
  let shipTacSeverity = effect.shipTacSeverity ?? null;
  let targetChoice = effect.targetChoice === true;

  if (attack.hullDamageMode === "none") {
    hullLoss = 0;
    targetChoice = false;
    shipTacSeverity =
      severity === "solid" ? "minor"
      : severity === "breaching" ? "moderate"
      : severity === "catastrophic" ? "severe"
      : null;
  }

  if (
    minimumShipTacSeverity
    && shipTacSeverity
    && ["minor", "moderate", "severe", "broken"].indexOf(shipTacSeverity)
      < ["minor", "moderate", "severe", "broken"].indexOf(minimumShipTacSeverity)
  ) {
    shipTacSeverity = minimumShipTacSeverity;
  }

  if (minimumShipTacSeverity && !shipTacSeverity && severity !== "no_effect") {
    shipTacSeverity = minimumShipTacSeverity;
  }

  const megadamageAdvance = Math.max(
    0,
    Number(context.megadamageAdvance ?? 0) || 0,
  );

  const currentHull = Math.max(0, Number(target.currentHull ?? 0) || 0);
  const currentMegadamage = Math.max(0, Number(target.currentMegadamage ?? 0) || 0);

  const preview = districtScale
    ? {
        mode: "district_environment",
        districtId: target.districtId ?? null,
        strategicIntegrityLoss: severity === "catastrophic" ? 2 : severity === "breaching" ? 1 : 0,
        megadamageAfter: currentMegadamage + megadamageAdvance,
      }
    : {
        mode: shipClass.damageModel,
        hullBefore: currentHull,
        hullAfter: Math.max(0, currentHull - hullLoss),
        hullLoss,
        megadamageBefore: currentMegadamage,
        megadamageAfter: currentMegadamage + megadamageAdvance,
        majorSection: target.majorSection ?? null,
      };

  const warnings = [];
  if (distance.disadvantage) warnings.push("Long range normally applies Disadvantage.");
  if (needsSection && !target.majorSection) warnings.push("This ship class should normally resolve against a major section.");
  if (pr.scenarioScale) warnings.push("Anti-Capital resolution is scenario-scale.");
  if (attack.authorization && ["executive", "scenario"].includes(attack.authorization)) {
    warnings.push(`${attack.authorization} authorization profile.`);
  }

  return {
    ok: true,
    outcome: districtScale ? "district_scale_hit" : "ship_scale_hit",
    shipClass,
    attack,
    target,
    context,
    range: distance,
    pr,
    overmatch,
    minimumMeaningfulSize,
    finalSeverity: severity,
    effect: {
      ...effect,
      hullLoss,
      shipTacSeverity,
      targetChoice,
      megadamageEligible: effect.megadamageEligible === true,
    },
    calculation,
    handoffs: {
      shipTac: shipTacSeverity
        ? {
            severity: shipTacSeverity,
            preferredCategory: context.preferredTacCategory ?? attack.preferredTacCategories?.[0] ?? null,
            preferredLocation: context.preferredTacLocation ?? null,
          }
        : null,
      temporaryConsequence: effect.temporaryConsequence === true,
      megadamageEligible: effect.megadamageEligible === true,
    },
    preview,
    warnings,
  };
}
