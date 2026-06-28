export const LESS_LETHAL_WOUNDS = Object.freeze({
  id: "less_lethal",
  label: "Less-Lethal Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  tables: Object.freeze({
    light: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Bruised Hard",
        effectText: "The next action is [-].",
        effects: Object.freeze({
          disadvantage: Object.freeze({
            targets: Object.freeze(["next_action"]),
            steps: 1,
            duration: "next_action",
          }),
        }),
        tags: Object.freeze(["disadvantage", "blunt_force"]),
      }),

      Object.freeze({
        roll: 2,
        label: "Knocked Off Balance",
        effectText: "Make a Body Save or fall prone.",
        effects: Object.freeze({
          bodySave: Object.freeze({
            required: true,
            onFailure: Object.freeze({
              conditionsAdded: Object.freeze(["prone"]),
            }),
          }),
        }),
        tags: Object.freeze(["body_save", "prone"]),
      }),

      Object.freeze({
        roll: 3,
        label: "Staggered",
        effectText: "Lose 1 major action during your next turn.",
        effects: Object.freeze({
          actionLoss: Object.freeze({
            majorActions: 1,
            duration: "next_turn",
          }),
        }),
        tags: Object.freeze(["action_loss"]),
      }),

      Object.freeze({
        roll: 4,
        label: "Pain Compliance",
        effectText: "The next physical action is [-].",
        effects: Object.freeze({
          disadvantage: Object.freeze({
            targets: Object.freeze(["physical_actions"]),
            steps: 1,
            duration: "next_action",
          }),
        }),
        tags: Object.freeze(["disadvantage", "pain"]),
      }),

      Object.freeze({
        roll: 5,
        label: "Rattled",
        effectText: "Lose 1d5 Calm and drop one held item.",
        effects: Object.freeze({
          calmLoss: "1d5",
          dropHeldItem: true,
        }),
        tags: Object.freeze(["calm", "drop_item"]),
      }),
    ]),

    moderate: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Cracked Rib",
        effectText: "Strength is reduced by 5 until treated.",
        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "strength",
            amount: -5,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze(["strength", "treatment"]),
      }),

      Object.freeze({
        roll: 2,
        label: "Concussed",
        effectText: "Intellect is reduced by 5 until treated.",
        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "intellect",
            amount: -5,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze([
          "intellect",
          "concussion",
          "treatment",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Joint Impact",
        effectText: "Speed is reduced by 5 until treated.",
        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "speed",
            amount: -5,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze(["speed", "limb", "treatment"]),
      }),

      Object.freeze({
        roll: 4,
        label: "Dropped Hard",
        effectText:
          "Fall prone and lose 1 major action during your next turn.",
        effects: Object.freeze({
          conditionsAdded: Object.freeze(["prone"]),

          actionLoss: Object.freeze({
            majorActions: 1,
            duration: "next_turn",
          }),
        }),
        tags: Object.freeze(["prone", "action_loss"]),
      }),

      Object.freeze({
        roll: 5,
        label: "Stunned",
        effectText: "Make a Body Save or fall unconscious.",
        effects: Object.freeze({
          bodySave: Object.freeze({
            required: true,
            onFailure: Object.freeze({
              conditionsAdded: Object.freeze(["unconscious"]),
            }),
          }),
        }),
        tags: Object.freeze(["body_save", "unconscious"]),
      }),
    ]),

    severe: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Broken Rib",
        effectText: "Strength is reduced by 10 until treated.",
        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "strength",
            amount: -10,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze(["strength", "treatment"]),
      }),

      Object.freeze({
        roll: 2,
        label: "Serious Concussion",
        effectText: "Intellect is reduced by 10 until treated.",
        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "intellect",
            amount: -10,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze([
          "intellect",
          "concussion",
          "treatment",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Knee or Shoulder Trauma",
        effectText: "Speed is reduced by 10 until treated.",
        effects: Object.freeze({
          attributeModifier: Object.freeze({
            attribute: "speed",
            amount: -10,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze(["speed", "limb", "treatment"]),
      }),

      Object.freeze({
        roll: 4,
        label: "Blunt Force Collapse",
        effectText: "Lose 1 major action each turn until treated.",
        effects: Object.freeze({
          actionLoss: Object.freeze({
            majorActions: 1,
            duration: "until_treated",
          }),
        }),
        tags: Object.freeze(["action_loss", "treatment"]),
      }),

      Object.freeze({
        roll: 5,
        label: "Knocked Unconscious",
        effectText: "Make a Body Save or fall unconscious.",
        effects: Object.freeze({
          bodySave: Object.freeze({
            required: true,
            onFailure: Object.freeze({
              conditionsAdded: Object.freeze(["unconscious"]),
            }),
          }),
        }),
        tags: Object.freeze(["body_save", "unconscious"]),
      }),
    ]),

    deadly: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Skull Fracture",
        effectText:
          "Fall unconscious and begin a 1d10-round fatal timer.",
        effects: Object.freeze({
          conditionsAdded: Object.freeze(["unconscious"]),

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "medical_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "unconscious",
          "fatal_timer",
          "stabilization",
        ]),
      }),

      Object.freeze({
        roll: 2,
        label: "Ruptured Organ",
        effectText: "Begin a 1d10-round fatal timer.",
        effects: Object.freeze({
          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "medical_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "fatal_timer",
          "stabilization",
          "organ_injury",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Spinal Impact",
        effectText:
          "You are immobile until intensive medical intervention determines recovery.",
        effects: Object.freeze({
          conditionsAdded: Object.freeze(["immobile"]),
          recoveryDeterminedBy:
            "intensive_medical_intervention",
        }),
        tags: Object.freeze([
          "immobile",
          "spinal_injury",
          "intensive_care",
        ]),
      }),

      Object.freeze({
        roll: 4,
        label: "Cardiac Shock",
        effectText:
          "Fall unconscious and begin a 1d10-round fatal timer.",
        effects: Object.freeze({
          conditionsAdded: Object.freeze(["unconscious"]),

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "medical_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "unconscious",
          "fatal_timer",
          "stabilization",
        ]),
      }),

      Object.freeze({
        roll: 5,
        label: "Point-Blank Catastrophe",
        effectText: "Death is immediate.",
        effects: Object.freeze({
          death: true,
        }),
        tags: Object.freeze(["death"]),
      }),
    ]),
  }),
});