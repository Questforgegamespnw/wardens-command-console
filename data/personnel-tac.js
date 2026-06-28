export const PERSONNEL_TAC_CATEGORIES = Object.freeze([
  "electronics",
  "mobility",
  "structural",
  "seal_life_support",
]);

export const PERSONNEL_TAC = Object.freeze({
  light: {
    id: "light",
    armorState: "light",
    avLossFromOriginal: 4,
    die: "1d4",
    outcomes: [
      {
        roll: 1,
        id: "electronics_glitch",
        category: "electronics",
        label: "Electronics Glitch",
        text:
          "Lose Tac-Link or HUD bonus until the end of the next action cycle.",

        effects: {
          systemsSuppressed: [
            "tac_link",
            "hud",
          ],

          duration:
            "next_action_cycle",
        },
      },
      {
        roll: 2,
        id: "mobility_stutter",
        category: "mobility",
        label: "Mobility Stutter",
        text:
          "-5 Speed until the end of the next action cycle.",

        effects: {
          attributeModifiers: [
            {
              attribute: "speed",
              amount: -5,
              duration:
                "next_action_cycle",
            },
          ],
        },
      },
      {
        roll: 3,
        id: "structural_strain",
        category: "structural",
        label: "Structural Strain",
        text:
          "-5 Strength until the end of the next action cycle.",

        effects: {
          attributeModifiers: [
            {
              attribute: "strength",
              amount: -5,
              duration:
                "next_action_cycle",
            },
          ],
        },
      },
      {
        roll: 4,
        id: "seal_warning",
        category: "seal_life_support",
        label: "Seal Warning",
        text:
          "[Sealed] remains active. The next Seal / Life Support TAC is upgraded one severity.",

        effects: {
          conditionsAdded: [
            "seal_warning",
          ],
        },
      },
    ],
  },

  moderate: {
    id: "moderate",
    armorState: "moderate",
    avLossFromOriginal: 6,
    die: "1d4",
    outcomes: [
      {
        roll: 1,
        id: "electronics_failure",
        category: "electronics",
        label: "Electronics Failure",
        text:
          "Lose Tac-Link or HUD bonus until repaired.",

        effects: {
          systemsDisabled: [
            "tac_link",
            "hud",
          ],

          duration:
            "until_repaired",
        },
      },
      {
        roll: 2,
        id: "mobility_damage",
        category: "mobility",
        label: "Mobility Damage",
        text:
          "-5 Speed and lose one suit-provided Speed bonus grade until repaired.",

        effects: {
          attributeModifiers: [
            {
              attribute: "speed",
              amount: -5,
              duration:
                "until_repaired",
            },
          ],

          bonusGradeLoss: {
            speed: 1,
          },
        },
      },
      {
        roll: 3,
        id: "structural_damage",
        category: "structural",
        label: "Structural Damage",
        text:
          "-5 Strength and lose one suit-provided Strength bonus grade until repaired.",

        effects: {
          attributeModifiers: [
            {
              attribute: "strength",
              amount: -5,
              duration:
                "until_repaired",
            },
          ],

          bonusGradeLoss: {
            strength: 1,
          },
        },
      },
      {
        roll: 4,
        id: "seal_breach",
        category: "seal_life_support",
        label: "Seal Breach",
        text:
          "Lose [Sealed] until patched or repaired.",

        effects: {
          systemsDisabled: [
            "sealed",
          ],

          conditionsAdded: [
            "seal_breach",
          ],
        },
      },
    ],
  },

  severe: {
    id: "severe",
    armorState: "severe",
    avLossFromOriginal: 10,
    die: "1d4",
    outcomes: [
      {
        roll: 1,
        id: "electronics_collapse",
        category: "electronics",
        label: "Electronics Collapse",
        text:
          "Tac-Link, HUD, smart systems, and medical monitoring fail until repaired.",

        effects: {
          systemsDisabled: [
            "tac_link",
            "hud",
            "smart_systems",
            "medical_monitoring",
          ],

          duration:
            "until_repaired",
        },
      },
      {
        roll: 2,
        id: "mobility_collapse",
        category: "mobility",
        label: "Mobility Collapse",
        text:
          "-10 Speed and suffer [-] on Speed rolls until repaired.",

        effects: {
          attributeModifiers: [
            {
              attribute: "speed",
              amount: -10,
              duration:
                "until_repaired",
            },
          ],

          disadvantage: {
            targets: [
              "speed_rolls",
            ],
            steps: 1,
            duration:
              "until_repaired",
          },
        },
      },
      {
        roll: 3,
        id: "structural_collapse",
        category: "structural",
        label: "Structural Collapse",
        text:
          "-10 Strength and lose all suit-provided Strength assistance until repaired.",

        effects: {
          attributeModifiers: [
            {
              attribute: "strength",
              amount: -10,
              duration:
                "until_repaired",
            },
          ],

          systemsDisabled: [
            "strength_assistance",
          ],

          duration:
            "until_repaired",
        },
      },
      {
        roll: 4,
        id: "critical_seal_failure",
        category: "seal_life_support",
        label: "Critical Seal Failure",
        text:
          "Lose [Sealed] and integrated environmental protection. In a hostile environment, the wearer is immediately exposed.",

        effects: {
          systemsDisabled: [
            "sealed",
            "oxygen_supply",
            "chemical_filtration",
            "biohazard_protection",
            "temperature_control",
          ],

          conditionsAdded: [
            "critical_seal_failure",
          ],

          exposureIfHostile:
            true,
        },
      },
    ],
  },

  complete: {
    id: "complete",
    armorState: "broken",
    avLossFromOriginal: null,
    die: null,
    outcomes: [
      {
        id: "armor_destroyed",
        category:
          "complete_failure",
        label:
          "Armor Destroyed",

        text:
          "Set AV to 0. Lose all armor-derived tags, protection, assistance, and integrated systems. Apply the armor profile's Broken mobility effect.",

        effects: {
          effectiveAv: 0,
          disableAllArmorSystems:
            true,

          exposureIfHostile:
            true,
        },
      },
    ],
  },
});

export function getPersonnelTacSeverity(id) {
  const result =
    PERSONNEL_TAC[id];

  if (!result) {
    throw new RangeError(
      `Unknown TAC severity: ${id}`,
    );
  }

  return result;
}

export function getPersonnelTacOutcome(
  severityId,
  {
    roll = null,
    category = null,
  } = {},
) {
  const severity =
    getPersonnelTacSeverity(
      severityId,
    );

  if (severityId === "complete") {
    return severity.outcomes[0];
  }

  if (category) {
    const outcome =
      severity.outcomes.find(
        (item) =>
          item.category === category,
      );

    if (!outcome) {
      throw new RangeError(
        `No ${category} outcome exists for ${severityId} TAC.`,
      );
    }

    return outcome;
  }

  const outcome =
    severity.outcomes.find(
      (item) =>
        item.roll === Number(roll),
    );

  if (!outcome) {
    throw new RangeError(
      `No TAC outcome exists for roll ${roll} at ${severityId} severity.`,
    );
  }

  return outcome;
}
