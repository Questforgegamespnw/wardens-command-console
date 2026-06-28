export const BLUNT_FORCE_WOUNDS = Object.freeze({
  id: "blunt_force",
  label: "Blunt Force Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Knocked Down", effectText: "Make a Body Save or fall prone.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["prone"] } } }, tags: ["body_save", "prone"] },
      { roll: 2, label: "Winded", effectText: "The next physical action is [-].", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "next_action" } }, tags: ["disadvantage"] },
      { roll: 3, label: "Deep Bruising", effectText: "Lose 1d5 Calm.", effects: { calmLoss: "1d5" }, tags: ["calm"] },
      { roll: 4, label: "Sprain", effectText: "Speed is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["speed", "treatment"] },
      { roll: 5, label: "Rattled", effectText: "Lose 1 major action during your next turn.", effects: { actionLoss: { majorActions: 1, duration: "next_turn" } }, tags: ["action_loss"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Concussion", effectText: "Intellect is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -5, duration: "until_treated" } }, tags: ["intellect", "concussion", "treatment"] },
      { roll: 2, label: "Broken Rib", effectText: "Strength is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "strength", amount: -5, duration: "until_treated" } }, tags: ["strength", "treatment"] },
      { roll: 3, label: "Dislocated Joint", effectText: "Speed is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["speed", "limb", "treatment"] },
      { roll: 4, label: "Severe Impact", effectText: "Fall prone and lose 1 major action during your next turn.", effects: { conditionsAdded: ["prone"], actionLoss: { majorActions: 1, duration: "next_turn" } }, tags: ["prone", "action_loss"] },
      { roll: 5, label: "Cracked Bone", effectText: "Physical actions are [-] until treated.", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "until_treated" } }, tags: ["disadvantage", "treatment"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Broken Arm or Leg", effectText: "Speed is reduced by 10 until surgically treated.", effects: { attributeModifier: { attribute: "speed", amount: -10, duration: "until_surgically_treated" } }, tags: ["speed", "limb", "surgery"] },
      { roll: 2, label: "Snapped Collarbone", effectText: "Strength is reduced by 10 until surgically treated.", effects: { attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["strength", "limb", "surgery"] },
      { roll: 3, label: "Major Concussion", effectText: "Intellect is reduced by 10 until treated. Make a Panic Check.", effects: { attributeModifier: { attribute: "intellect", amount: -10, duration: "until_treated" }, panicCheck: true }, tags: ["intellect", "concussion", "panic"] },
      { roll: 4, label: "Internal Trauma", effectText: "Lose 1 major action each turn until treated.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" } }, tags: ["action_loss", "treatment"] },
      { roll: 5, label: "Skull Fracture", effectText: "Fall unconscious and begin a 1d10-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d10", unit: "rounds", stoppedBy: ["medical_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Spine Broken", effectText: "You are immobile. Lose 2d10 Calm, then make a Panic Check.", effects: { conditionsAdded: ["immobile"], calmLoss: "2d10", panicCheck: true }, tags: ["immobile", "calm", "panic"] },
      { roll: 2, label: "Neck Broken", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer"] },
      { roll: 3, label: "Crushed Chest", effectText: "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["calm", "panic", "fatal_timer"] },
      { roll: 4, label: "Catastrophic Cranial Trauma", effectText: "Fall unconscious and begin a 1d5-round fatal timer. Permanent neurological injury is likely.", effects: { conditionsAdded: ["unconscious"], permanentConsequence: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer", "permanent"] },
      { roll: 5, label: "Head Destroyed", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
