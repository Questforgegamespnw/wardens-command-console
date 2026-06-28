export const ASPHYXIATION_WOUNDS = Object.freeze({
  id: "asphyxiation",
  label: "Asphyxiation Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: false,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Violent Coughing", effectText: "The next action is [-].", effects: { disadvantage: { targets: ["next_action"], steps: 1, duration: "next_action" } }, tags: ["disadvantage", "breathing"] },
      { roll: 2, label: "Dizziness", effectText: "Lose your next Reaction.", effects: { loseReaction: true, duration: "next_reaction" }, tags: ["reaction"] },
      { roll: 3, label: "Air Hunger", effectText: "Lose 1d5 Calm.", effects: { calmLoss: "1d5" }, tags: ["calm", "breathing"] },
      { roll: 4, label: "Chest Pain", effectText: "The next physical action is [-].", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "next_action" } }, tags: ["disadvantage", "breathing"] },
      { roll: 5, label: "Collapse", effectText: "Make a Body Save or fall prone.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["prone"] } } }, tags: ["body_save", "prone"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Brief Blackout", effectText: "Make a Body Save or fall unconscious.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["unconscious"] } } }, tags: ["body_save", "unconscious"] },
      { roll: 2, label: "Aspiration", effectText: "Strength is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "strength", amount: -5, duration: "until_treated" } }, tags: ["strength", "breathing", "treatment"] },
      { roll: 3, label: "Airway Trauma", effectText: "Physical actions are [-] until treated.", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "until_treated" } }, tags: ["disadvantage", "breathing", "treatment"] },
      { roll: 4, label: "Severe Confusion", effectText: "Intellect is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -5, duration: "until_treated" } }, tags: ["intellect", "treatment"] },
      { roll: 5, label: "Respiratory Injury", effectText: "Lose 1 major action during your next turn.", effects: { actionLoss: { majorActions: 1, duration: "next_turn" } }, tags: ["action_loss", "breathing"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Pulmonary Injury", effectText: "Strength is reduced by 10 until surgically treated.", effects: { attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["strength", "breathing", "surgery"] },
      { roll: 2, label: "Cerebral Hypoxia", effectText: "Intellect is reduced by 10 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -10, duration: "until_treated" } }, tags: ["intellect", "neurological", "treatment"] },
      { roll: 3, label: "Respiratory Paralysis", effectText: "Lose 1 major action each turn until treated.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" } }, tags: ["action_loss", "breathing", "treatment"] },
      { roll: 4, label: "Aspiration Crisis", effectText: "Fall unconscious and begin a 1d10-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d10", unit: "rounds", stoppedBy: ["medical_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
      { roll: 5, label: "Organ Hypoxia", effectText: "Lose 1d10 Calm, then make a Panic Check.", effects: { calmLoss: "1d10", panicCheck: true }, tags: ["calm", "panic"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Respiratory Arrest", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
      { roll: 2, label: "Cardiac Arrest", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
      { roll: 3, label: "Catastrophic Hypoxic Injury", effectText: "You are immobile and unconscious. Lose 2d10 Calm, then make a Panic Check.", effects: { conditionsAdded: ["immobile", "unconscious"], calmLoss: "2d10", panicCheck: true }, tags: ["immobile", "unconscious", "calm", "panic"] },
      { roll: 4, label: "Irreversible Asphyxiation", effectText: "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["calm", "panic", "fatal_timer"] },
      { roll: 5, label: "Anoxic Death", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
