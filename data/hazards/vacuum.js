/** Vacuum routing and protection behavior. */

export const VACUUM_HAZARD = Object.freeze({
  id: "vacuum",
  label: "Vacuum / Decompression",
  mode: "protection_gate",

  protection: Object.freeze({
    appliesWhen: Object.freeze([
      "sealed_suit",
      "sealed_vehicle",
      "sealed_habitat",
      "sealed_ship_compartment",
    ]),

    requiresEffectiveSeal: true,

    directVacuumInjuryWhileSealEffective:
      false,

    optionalTimers: Object.freeze([
      "breathing_supply",
    ]),

    sealFailure: Object.freeze({
      protectionEffective: false,

      routeTo: Object.freeze([
        "vacuum_decompression",
        "air_loss",
      ]),
    }),

    breathingSupplyExpiration:
      Object.freeze({
        sealMayRemainEffective: true,

        routeTo: Object.freeze([
          "air_loss",
        ]),
      }),
  }),

  directExposure: Object.freeze({
    triggeredWhen: Object.freeze([
      "no_meaningful_protection",
      "seal_failed",
      "protection_bypassed",
    ]),

    woundResolution: Object.freeze({
      table: "vacuum_decompression",
      die: "d10",
      severityStoredOnEntry: true,
    }),

    alsoBegins: Object.freeze([
      "air_loss",
    ]),

    repeatInterval: "round",
    repeatedExposureMayRollAgain: true,
  }),

  protectedExposure: Object.freeze({
    resolve: Object.freeze([
      "breathing_supply",
      "suit_seal",
      "life_support_status",
      "forced_movement",
      "collision_blunt_force",
      "unsecured_equipment",
    ]),

    possibleConsequences: Object.freeze([
      "air_supply_depletion",
      "seal_damage",
      "suit_tac",
      "forced_movement",
      "collision_injury",
      "lost_equipment",
    ]),
  }),

  explosiveDecompression: Object.freeze({
    possibleConsequences: Object.freeze([
      "forced_movement",
      "collision_blunt_force",
      "suit_or_seal_tac",
      "lost_equipment",
      "vacuum_exposure_if_seal_fails",
    ]),

    intactSealAutomaticallyCausesVacuumWound:
      false,
  }),

  recovery: Object.freeze({
    enteringPressurizedAreaStopsNewVacuumExposure:
      true,

    breathingMustStillBeRestoredToStopAirLoss:
      true,

    existingVacuumWoundsRemain: true,
  }),
});