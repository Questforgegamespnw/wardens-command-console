export const ELECTRICAL_WOUNDS = Object.freeze({
  id: "electrical",
  label: "Electrical Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Surface Burn", effectText: "The next action involving the affected area is [-].", effects: { disadvantage: { targets: ["affected_area_actions"], steps: 1, duration: "next_action" } }, tags: ["burn", "disadvantage"] },
      { roll: 2, label: "Muscle Spasm", effectText: "Drop one held item.", effects: { dropHeldItem: true }, tags: ["drop_item"] },
      { roll: 3, label: "Temporary Numbness", effectText: "Speed is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["speed", "limb", "treatment"] },
      { roll: 4, label: "Sensory Disruption", effectText: "The next vision, hearing, or balance action is [-].", effects: { disadvantage: { targets: ["sensory_actions"], steps: 1, duration: "next_action" } }, tags: ["sensory", "disadvantage"] },
      { roll: 5, label: "Startle Shock", effectText: "Lose 1d5 Calm and lose your next Reaction.", effects: { calmLoss: "1d5", loseReaction: true, duration: "next_reaction" }, tags: ["calm", "reaction"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Deep Burn", effectText: "Physical actions are [-] until treated.", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "until_treated" } }, tags: ["burn", "disadvantage", "treatment"] },
      { roll: 2, label: "Muscle Lock", effectText: "Strength is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "strength", amount: -5, duration: "until_treated" } }, tags: ["strength", "treatment"] },
      { roll: 3, label: "Limb Dysfunction", effectText: "Speed is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["speed", "limb", "treatment"] },
      { roll: 4, label: "Electrical Confusion", effectText: "Intellect is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -5, duration: "until_treated" } }, tags: ["intellect", "treatment"] },
      { roll: 5, label: "Secondary Fall", effectText: "Make a Body Save or fall prone and lose 1 major action during your next turn.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["prone"], actionLoss: { majorActions: 1, duration: "next_turn" } } } }, tags: ["body_save", "prone", "action_loss"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Major Tissue Burn", effectText: "Strength is reduced by 10 until surgically treated.", effects: { attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["burn", "strength", "surgery"] },
      { roll: 2, label: "Neurological Damage", effectText: "Intellect is reduced by 10 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -10, duration: "until_treated" } }, tags: ["neurological", "intellect", "treatment"] },
      { roll: 3, label: "Respiratory Paralysis", effectText: "Lose 1 major action each turn and begin Air-Loss checks until treated.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" }, airLossRelevant: true }, tags: ["action_loss", "air_loss"] },
      { roll: 4, label: "Cardiac Arrhythmia", effectText: "Lose 1d10 Calm, then make a Panic Check. Begin a 1d10-round fatal timer.", effects: { calmLoss: "1d10", panicCheck: true, fatalTimer: { duration: "1d10", unit: "rounds", stoppedBy: ["medical_stabilization"] } }, tags: ["calm", "panic", "fatal_timer"] },
      { roll: 5, label: "Seizure", effectText: "Make a Body Save or fall unconscious.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["unconscious"] } } }, tags: ["body_save", "unconscious"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Cardiac Arrest", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
      { roll: 2, label: "Respiratory Arrest", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
      { roll: 3, label: "Catastrophic Neural Injury", effectText: "You are immobile and unconscious. Lose 2d10 Calm, then make a Panic Check.", effects: { conditionsAdded: ["immobile", "unconscious"], calmLoss: "2d10", panicCheck: true }, tags: ["immobile", "unconscious", "calm", "panic"] },
      { roll: 4, label: "Arc-Flash Destruction", effectText: "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["calm", "panic", "fatal_timer", "burn"] },
      { roll: 5, label: "Electrical Destruction", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
