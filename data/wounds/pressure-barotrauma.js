import { entry } from "./helpers.js";

export const PRESSURE_BAROTRAUMA_WOUNDS = Object.freeze({
  id: "pressure_barotrauma",
  label: "Pressure / Barotrauma Injury",
  mode: "compact_d10",
  die: "d10",
  traumaDampeningEligible: false,

  doctrine: Object.freeze({
    causedByPressureChange: true,
    breathableAtmosphereMayStillBePresent: true,
    recompressionMayBeRequired: true,
  }),

  entries: Object.freeze([
    entry(
      "pressure_barotrauma",
      "light",
      1,
      "Ear Pain",
      "The next hearing-related action is [-].",
      {
        disadvantage: {
          targets: [
            "hearing_actions",
          ],
          steps: 1,
          duration: "next_action",
        },
      },
      [
        "hearing",
        "disadvantage",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "light",
      2,
      "Sinus Injury",
      "The next Intellect or precision action is [-].",
      {
        disadvantage: {
          targets: [
            "intellect_actions",
            "precision_actions",
          ],
          steps: 1,
          duration: "next_action",
        },
      },
      [
        "disadvantage",
        "sinus",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "light",
      3,
      "Vertigo",
      "Lose your next Reaction.",
      {
        loseReaction: true,
        duration: "next_reaction",
      },
      [
        "reaction",
        "balance",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "moderate",
      4,
      "Ear Rupture",
      "Hearing-related actions are [-] until treated.",
      {
        disadvantage: {
          targets: [
            "hearing_actions",
          ],
          steps: 1,
          duration: "until_treated",
        },
      },
      [
        "hearing",
        "disadvantage",
        "treatment",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "moderate",
      5,
      "Lung Strain",
      "Strength is reduced by 5 until treated.",
      {
        attributeModifier: {
          attribute: "strength",
          amount: -5,
          duration: "until_treated",
        },

        breathingImpaired: true,
      },
      [
        "strength",
        "breathing",
        "treatment",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "moderate",
      6,
      "Decompression Sickness",
      "Speed and Intellect are reduced by 5 until recompression treatment.",
      {
        attributeModifiers: [
          {
            attribute: "speed",
            amount: -5,
            duration: "until_recompression",
          },
          {
            attribute: "intellect",
            amount: -5,
            duration: "until_recompression",
          },
        ],

        recompressionRequired: true,
      },
      [
        "speed",
        "intellect",
        "recompression",
        "treatment",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "severe",
      7,
      "Lung Damage",
      "Bleeding +3. Strength is reduced by 10 until surgically treated.",
      {
        bleedingDelta: 3,

        attributeModifier: {
          attribute: "strength",
          amount: -10,
          duration: "until_surgically_treated",
        },

        breathingImpaired: true,
        surgeryRequired: true,
      },
      [
        "bleeding",
        "strength",
        "breathing",
        "surgery",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "severe",
      8,
      "Gas Embolism",
      "Lose 1d10 Calm, then make a Panic Check. Begin a 1d10-round fatal timer.",
      {
        calmLoss: "1d10",
        panicCheck: true,

        fatalTimer: {
          duration: "1d10",
          unit: "rounds",
          stoppedBy: [
            "medical_stabilization",
            "recompression_treatment",
          ],
        },

        recompressionRequired: true,
      },
      [
        "calm",
        "panic",
        "fatal_timer",
        "recompression",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "severe",
      9,
      "Neurological Barotrauma",
      "Make a Body Save or fall unconscious. Intellect is reduced by 10 until treated.",
      {
        bodySave: {
          required: true,

          onFailure: {
            conditionsAdded: [
              "unconscious",
            ],
          },
        },

        attributeModifier: {
          attribute: "intellect",
          amount: -10,
          duration: "until_treated",
        },

        permanentConsequencePossible: true,
      },
      [
        "body_save",
        "unconscious",
        "intellect",
        "neurological",
        "treatment",
      ],
    ),

    entry(
      "pressure_barotrauma",
      "deadly",
      10,
      "Catastrophic Pressure Injury",
      "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.",
      {
        calmLoss: "2d10",
        panicCheck: true,

        fatalTimer: {
          duration: "1d5",
          unit: "rounds",
          stoppedBy: [
            "intensive_stabilization",
            "recompression_treatment",
          ],
        },

        permanentConsequence: true,
        recompressionRequired: true,
      },
      [
        "calm",
        "panic",
        "fatal_timer",
        "recompression",
        "permanent",
      ],
    ),
  ]),
});