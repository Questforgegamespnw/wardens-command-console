export const TOXIC_CHEMICAL_WOUNDS = Object.freeze({
  id: "toxic_chemical",
  label: "Toxic / Chemical Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: false,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Nausea", effectText: "The next physical action is [-].", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "next_action" } }, tags: ["disadvantage", "nausea"] },
      { roll: 2, label: "Dizziness", effectText: "Lose your next Reaction.", effects: { loseReaction: true, duration: "next_reaction" }, tags: ["reaction"] },
      { roll: 3, label: "Eye Irritation", effectText: "The next vision-related action is [-].", effects: { disadvantage: { targets: ["vision_actions"], steps: 1, duration: "next_action" } }, tags: ["vision", "disadvantage"] },
      { roll: 4, label: "Coughing Fit", effectText: "Lose 1d5 Calm and concealment is broken.", effects: { calmLoss: "1d5", concealmentBroken: true }, tags: ["calm", "concealment"] },
      { roll: 5, label: "Skin Reaction", effectText: "The next action involving the exposed area is [-].", effects: { disadvantage: { targets: ["affected_area_actions"], steps: 1, duration: "next_action" } }, tags: ["disadvantage", "decontamination"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Vomiting", effectText: "Lose 1 major action during your next turn.", effects: { actionLoss: { majorActions: 1, duration: "next_turn" } }, tags: ["action_loss"] },
      { roll: 2, label: "Temporary Blindness", effectText: "Make a Body Save or lose 1 major action during your next turn.", effects: { bodySave: { required: true, onFailure: { actionLoss: { majorActions: 1, duration: "next_turn" } } } }, tags: ["body_save", "action_loss", "vision"] },
      { roll: 3, label: "Motor Impairment", effectText: "Speed is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["speed", "treatment"] },
      { roll: 4, label: "Respiratory Distress", effectText: "Strength is reduced by 5 and Air-Loss checks begin until treated.", effects: { attributeModifier: { attribute: "strength", amount: -5, duration: "until_treated" }, airLossRelevant: true }, tags: ["strength", "air_loss", "treatment"] },
      { roll: 5, label: "Disorientation", effectText: "Intellect is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -5, duration: "until_treated" } }, tags: ["intellect", "treatment"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Seizure", effectText: "Make a Body Save or fall unconscious.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["unconscious"] } } }, tags: ["body_save", "unconscious"] },
      { roll: 2, label: "Organ Injury", effectText: "Strength is reduced by 10 until surgically treated.", effects: { attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["strength", "organ_injury", "surgery"] },
      { roll: 3, label: "Neurological Damage", effectText: "Intellect is reduced by 10 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -10, duration: "until_treated" } }, tags: ["intellect", "neurological", "treatment"] },
      { roll: 4, label: "Systemic Collapse", effectText: "Lose 1 major action each turn until treated.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" } }, tags: ["action_loss", "treatment"] },
      { roll: 5, label: "Respiratory Failure", effectText: "Lose 1d10 Calm, then make a Panic Check. Begin Air-Loss checks.", effects: { calmLoss: "1d10", panicCheck: true, airLossRelevant: true }, tags: ["calm", "panic", "air_loss"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Systemic Poisoning", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["antidote", "intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer", "antidote"] },
      { roll: 2, label: "Organ Shutdown", effectText: "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["antidote", "intensive_stabilization"] } }, tags: ["calm", "panic", "fatal_timer", "antidote"] },
      { roll: 3, label: "Respiratory Arrest", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["antidote", "intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer", "antidote"] },
      { roll: 4, label: "Catastrophic Neurotoxicity", effectText: "You are immobile and unconscious. Lose 2d10 Calm, then make a Panic Check.", effects: { conditionsAdded: ["immobile", "unconscious"], calmLoss: "2d10", panicCheck: true }, tags: ["immobile", "unconscious", "calm", "panic"] },
      { roll: 5, label: "Fatal Overdose", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
