export const BLEEDING_WOUNDS = Object.freeze({
  id: "bleeding",
  label: "Bleeding Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  doctrine: Object.freeze({
    bleedingPersistsUntilAddressed: true,

    aidTiers: Object.freeze({
      improvised:
        "Direct pressure, improvised dressing, or basic first aid can stop the bleeding.",

      first_aid:
        "Requires proper bandages, a first-aid kit, automed foam, or equivalent field treatment.",

      medical:
        "Requires medical intervention to stabilize. Surgery or advanced treatment may be required afterward.",

      intensive_care:
        "Requires immediate intensive care, surgical intervention, and potentially prosthetic or ambulatory support.",
    }),
  }),

  tables: Object.freeze({
    light: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Shallow Scratch",
        effectText: "Bleeding +1.",
        effects: Object.freeze({
          bleedingDelta: 1,
          aidRequired: "improvised",
        }),
        tags: Object.freeze([
          "bleeding",
          "surface_injury",
        ]),
      }),

      Object.freeze({
        roll: 2,
        label: "Long Graze",
        effectText: "Bleeding +1. Lose 1d5 Calm.",
        effects: Object.freeze({
          bleedingDelta: 1,
          calmLoss: "1d5",
          aidRequired: "improvised",
        }),
        tags: Object.freeze([
          "bleeding",
          "calm",
          "graze",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Light Puncture",
        effectText:
          "Bleeding +1. The next physical action is [-].",
        effects: Object.freeze({
          bleedingDelta: 1,
          aidRequired: "improvised",

          disadvantage: Object.freeze({
            targets: Object.freeze([
              "physical_actions",
            ]),
            steps: 1,
            duration: "next_action",
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "puncture",
          "disadvantage",
        ]),
      }),

      Object.freeze({
        roll: 4,
        label: "Torn Skin",
        effectText: "Bleeding +2.",
        effects: Object.freeze({
          bleedingDelta: 2,
          aidRequired: "improvised",
        }),
        tags: Object.freeze([
          "bleeding",
          "surface_injury",
        ]),
      }),

      Object.freeze({
        roll: 5,
        label: "Slippery Grip",
        effectText:
          "Bleeding +2. Drop one held item or lose your next Reaction.",
        effects: Object.freeze({
          bleedingDelta: 2,
          aidRequired: "improvised",

          choice: Object.freeze([
            Object.freeze({
              id: "drop_held_item",
              dropHeldItem: true,
            }),

            Object.freeze({
              id: "lose_next_reaction",
              loseReaction: true,
              duration: "next_reaction",
            }),
          ]),
        }),
        tags: Object.freeze([
          "bleeding",
          "choice",
          "drop_item",
          "reaction",
        ]),
      }),
    ]),

    moderate: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Deep Laceration",
        effectText:
          "Bleeding +2. Lose 1d10 Calm.",
        effects: Object.freeze({
          bleedingDelta: 2,
          calmLoss: "1d10",
          aidRequired: "first_aid",
        }),
        tags: Object.freeze([
          "bleeding",
          "calm",
        ]),
      }),

      Object.freeze({
        roll: 2,
        label: "Muscle Cut",
        effectText:
          "Bleeding +2. Strength is reduced by 5 until the wound receives first aid.",
        effects: Object.freeze({
          bleedingDelta: 2,
          aidRequired: "first_aid",

          attributeModifier: Object.freeze({
            attribute: "strength",
            amount: -5,
            removedBy: "first_aid",
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "strength",
          "first_aid",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Tendon Nicked",
        effectText:
          "Bleeding +2. Speed is reduced by 5 until the wound receives first aid.",
        effects: Object.freeze({
          bleedingDelta: 2,
          aidRequired: "first_aid",

          attributeModifier: Object.freeze({
            attribute: "speed",
            amount: -5,
            removedBy: "first_aid",
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "speed",
          "first_aid",
        ]),
      }),

      Object.freeze({
        roll: 4,
        label: "Open Wound",
        effectText:
          "Bleeding +3. Lose 1d10 Calm.",
        effects: Object.freeze({
          bleedingDelta: 3,
          calmLoss: "1d10",
          aidRequired: "first_aid",
        }),
        tags: Object.freeze([
          "bleeding",
          "calm",
        ]),
      }),

      Object.freeze({
        roll: 5,
        label: "Heavy Blood Loss",
        effectText:
          "Bleeding +3. You are limited to 1 major action during your next turn.",
        effects: Object.freeze({
          bleedingDelta: 3,
          aidRequired: "first_aid",

          actionLimit: Object.freeze({
            majorActions: 1,
            duration: "next_turn",
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "action_limit",
        ]),
      }),
    ]),

    severe: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Severed Tendon",
        effectText:
          "Bleeding +3. Choose Strength or Speed; the selected attribute is reduced by 10 until surgically repaired.",
        effects: Object.freeze({
          bleedingDelta: 3,
          aidRequired: "medical",

          attributeModifierChoice: Object.freeze({
            options: Object.freeze([
              "strength",
              "speed",
            ]),
            amount: -10,
            removedBy: "surgical_repair",
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "stat_loss",
          "surgery",
        ]),
      }),

      Object.freeze({
        roll: 2,
        label: "Deep Stab",
        effectText:
          "Bleeding +4. Lose 1d10 Calm. You are limited to 1 major action each turn until medically stabilized.",
        effects: Object.freeze({
          bleedingDelta: 4,
          calmLoss: "1d10",
          aidRequired: "medical",

          actionLimit: Object.freeze({
            majorActions: 1,
            removedBy: "medical_stabilization",
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "calm",
          "action_limit",
          "stabilization",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Hand or Foot Severed",
        effectText:
          "Bleeding +4. A hand or foot is severed. Make a Panic Check.",
        effects: Object.freeze({
          bleedingDelta: 4,
          aidRequired: "medical",
          limbLoss: "hand_or_foot",
          panicCheck: true,
          permanentConsequence: true,
        }),
        tags: Object.freeze([
          "bleeding",
          "amputation",
          "panic",
          "permanent",
        ]),
      }),

      Object.freeze({
        roll: 4,
        label: "Arterial Spray",
        effectText:
          "Bleeding +4. Make a Panic Check. Begin a 1d10-round fatal timer; medical stabilization stops the timer.",
        effects: Object.freeze({
          bleedingDelta: 4,
          aidRequired: "medical",
          panicCheck: true,

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "medical_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "panic",
          "fatal_timer",
          "stabilization",
        ]),
      }),

      Object.freeze({
        roll: 5,
        label: "Abdominal Rupture",
        effectText:
          "Bleeding +4. Lose 1d10 Calm and make a Panic Check. You are limited to 1 major action each turn until medically stabilized.",
        effects: Object.freeze({
          bleedingDelta: 4,
          calmLoss: "1d10",
          panicCheck: true,
          aidRequired: "medical",

          actionLimit: Object.freeze({
            majorActions: 1,
            removedBy: "medical_stabilization",
          }),

          surgeryRequired: true,
        }),
        tags: Object.freeze([
          "bleeding",
          "calm",
          "panic",
          "action_limit",
          "surgery",
        ]),
      }),
    ]),

    deadly: Object.freeze([
      Object.freeze({
        roll: 1,
        label: "Limb Severed",
        effectText:
          "Bleeding +5. A major limb is severed. Lose 2d10 Calm and make a Panic Check. Begin a 1d10-round fatal timer.",
        effects: Object.freeze({
          bleedingDelta: 5,
          calmLoss: "2d10",
          panicCheck: true,
          aidRequired: "intensive_care",
          limbLoss: "major_limb",
          permanentConsequence: true,

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "intensive_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "amputation",
          "calm",
          "panic",
          "fatal_timer",
          "permanent",
        ]),
      }),

      Object.freeze({
        roll: 2,
        label: "Major Artery Severed",
        effectText:
          "Bleeding +6. Lose 2d10 Calm and make a Panic Check. Begin a 1d10-round fatal timer.",
        effects: Object.freeze({
          bleedingDelta: 6,
          calmLoss: "2d10",
          panicCheck: true,
          aidRequired: "intensive_care",

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "intensive_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "calm",
          "panic",
          "fatal_timer",
        ]),
      }),

      Object.freeze({
        roll: 3,
        label: "Impaled",
        effectText:
          "Bleeding +5. Lose 2d10 Calm and make a Panic Check. The object remains embedded; removing it before stabilization begins a 1d10-round fatal timer.",
        effects: Object.freeze({
          bleedingDelta: 5,
          calmLoss: "2d10",
          panicCheck: true,
          aidRequired: "intensive_care",

          conditionsAdded: Object.freeze([
            "embedded_object",
          ]),

          conditionalFatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",

            startsWhen: Object.freeze([
              "embedded_object_removed",
              "not_stabilized",
            ]),

            stoppedBy: Object.freeze([
              "intensive_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "impalement",
          "embedded_object",
          "calm",
          "panic",
          "fatal_timer",
        ]),
      }),

      Object.freeze({
        roll: 4,
        label: "Throat Torn Open",
        effectText:
          "Bleeding +6. You cannot speak. Lose 2d10 Calm and make a Panic Check. Begin a 1d10-round fatal timer.",
        effects: Object.freeze({
          bleedingDelta: 6,
          calmLoss: "2d10",
          panicCheck: true,
          aidRequired: "intensive_care",

          restrictions: Object.freeze([
            "cannot_speak",
          ]),

          fatalTimer: Object.freeze({
            duration: "1d10",
            unit: "rounds",
            stoppedBy: Object.freeze([
              "intensive_stabilization",
            ]),
          }),
        }),
        tags: Object.freeze([
          "bleeding",
          "speech",
          "calm",
          "panic",
          "fatal_timer",
        ]),
      }),

      Object.freeze({
        roll: 5,
        label: "Heart Pierced",
        effectText:
          "The heart is destroyed. Death is immediate.",
        effects: Object.freeze({
          death: true,
        }),
        tags: Object.freeze([
          "death",
        ]),
      }),
    ]),
  }),
});