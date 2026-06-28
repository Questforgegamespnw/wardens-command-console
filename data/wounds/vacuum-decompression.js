import { entry } from "./helpers.js";

export const VACUUM_DECOMPRESSION_WOUNDS = Object.freeze({
  id: "vacuum_decompression",
  label: "Vacuum / Decompression Injury",
  mode: "compact_d10",
  die: "d10",
  traumaDampeningEligible: false,

  doctrine: Object.freeze({
    triggeredByUnprotectedVacuumExposure: true,
    airLossContinuesUntilBreathingRestored: true,
  }),

  entries: Object.freeze([
    entry(
      "vacuum_decompression",
      "light",
      1,
      "Pressure Trauma",
      "Lose 1d5 Calm. The next hearing, Intellect, or precision action is [-]. Continue Air-Loss checks.",
      {
        calmLoss: "1d5",

        disadvantage: {
          targets: [
            "hearing_actions",
            "intellect_actions",
            "precision_actions",
          ],
          steps: 1,
          duration: "next_action",
        },

        continueAirLossChecks: true,
      },
      [
        "calm",
        "hearing",
        "disadvantage",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "light",
      2,
      "Forced Exhalation",
      "Lose your next Reaction and immediately make an Air-Loss Body Save.",
      {
        loseReaction: true,
        duration: "next_reaction",
        forceAirLossSave: true,
        continueAirLossChecks: true,
      },
      [
        "reaction",
        "body_save",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "moderate",
      3,
      "Capillary Rupture",
      "Bleeding +2 and lose 1d10 Calm. Continue Air-Loss checks.",
      {
        bleedingDelta: 2,
        calmLoss: "1d10",
        continueAirLossChecks: true,
      },
      [
        "bleeding",
        "calm",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "moderate",
      4,
      "Loss of Coordination",
      "Speed is reduced by 5 until treated. Immediately make an Air-Loss Body Save.",
      {
        attributeModifier: {
          attribute: "speed",
          amount: -5,
          duration: "until_treated",
        },

        forceAirLossSave: true,
        continueAirLossChecks: true,
      },
      [
        "speed",
        "treatment",
        "body_save",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "moderate",
      5,
      "Lung Strain",
      "Strength is reduced by 5 until treated. Lose 1 major action during your next turn and continue Air-Loss checks.",
      {
        attributeModifier: {
          attribute: "strength",
          amount: -5,
          duration: "until_treated",
        },

        actionLoss: {
          majorActions: 1,
          duration: "next_turn",
        },

        continueAirLossChecks: true,
      },
      [
        "strength",
        "action_loss",
        "breathing",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "severe",
      6,
      "Lung Rupture",
      "Bleeding +3. Strength is reduced by 10 until surgically treated. Continue Air-Loss checks.",
      {
        bleedingDelta: 3,

        attributeModifier: {
          attribute: "strength",
          amount: -10,
          duration: "until_surgically_treated",
        },

        breathingImpaired: true,
        surgeryRequired: true,
        continueAirLossChecks: true,
      },
      [
        "bleeding",
        "strength",
        "breathing",
        "surgery",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "severe",
      7,
      "Pulmonary Hemorrhage",
      "Bleeding +4. Lose 1d10 Calm, then make a Panic Check. Lose 1 major action each turn until medically stabilized.",
      {
        bleedingDelta: 4,
        calmLoss: "1d10",
        panicCheck: true,

        actionLoss: {
          majorActions: 1,
          duration: "until_medically_stabilized",
        },

        continueAirLossChecks: true,
      },
      [
        "bleeding",
        "calm",
        "panic",
        "action_loss",
        "stabilization",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "severe",
      8,
      "Gas Embolism",
      "Fall unconscious and begin a 1d10-round fatal timer. Air-Loss checks continue.",
      {
        conditionsAdded: [
          "unconscious",
        ],

        fatalTimer: {
          duration: "1d10",
          unit: "rounds",
          stoppedBy: [
            "medical_stabilization",
          ],
        },

        continueAirLossChecks: true,
      },
      [
        "unconscious",
        "fatal_timer",
        "stabilization",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "deadly",
      9,
      "Catastrophic Pulmonary Trauma",
      "Bleeding +6. Fall unconscious. Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.",
      {
        bleedingDelta: 6,
        calmLoss: "2d10",
        panicCheck: true,

        conditionsAdded: [
          "unconscious",
        ],

        fatalTimer: {
          duration: "1d5",
          unit: "rounds",
          stoppedBy: [
            "intensive_stabilization",
          ],
        },

        continueAirLossChecks: true,
      },
      [
        "bleeding",
        "unconscious",
        "calm",
        "panic",
        "fatal_timer",
        "air_loss",
      ],
    ),

    entry(
      "vacuum_decompression",
      "deadly",
      10,
      "Explosive Decompression Fatality",
      "Death is immediate.",
      {
        death: true,
      },
      [
        "death",
      ],
    ),
  ]),
});