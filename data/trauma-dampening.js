const TRAUMA_DAMPENING_BASE = Object.freeze({
  mode: "charges",
  trigger: "automatic",

  fixedSeverity: "light",
  consumesUseOnlyWhenSeverityReduced: true,

  damageStillApplies: true,
  woundThresholdStillAdvances: true,

  requiresArmorFunctioning: true,
  lostWhenArmorBroken: true,

  qualifyingWoundTypes: Object.freeze([
    "gunshot",
    "bleeding",
    "less_lethal",
    "blunt_force",
    "massive_gore",
    "fire_explosive",
    "impact",
    "crushing",
    "puncture",
    "cutting",
  ]),

  excludedHazards: Object.freeze([
    "suffocation",
    "toxins",
    "disease",
    "radiation",
    "direct_decompression",
    "psychic",
    "internal_bypass",
  ]),
});

export const TRAUMA_DAMPENING = Object.freeze({
  ...TRAUMA_DAMPENING_BASE,

  id: "trauma_dampening",
  maximumUses: 1,
});

export const TRAUMA_DAMPENING_PLUS = Object.freeze({
  ...TRAUMA_DAMPENING_BASE,

  id: "trauma_dampening_plus",
  maximumUses: 2,
});