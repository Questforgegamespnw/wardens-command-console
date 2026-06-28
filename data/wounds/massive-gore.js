export const MASSIVE_GORE_WOUNDS = Object.freeze({
  id: "massive_gore",
  label: "Massive Gore Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Torn Skin", effectText: "Bleeding +1.", effects: { bleedingDelta: 1 }, tags: ["bleeding"] },
      { roll: 2, label: "Mangled Digit", effectText: "Bleeding +1. The next action involving the affected digit is [-].", effects: { bleedingDelta: 1, disadvantage: { targets: ["affected_digit_actions"], steps: 1, duration: "next_action" } }, tags: ["bleeding", "limb", "disadvantage"] },
      { roll: 3, label: "Crushed Muscle", effectText: "Bleeding +2. The next physical action is [-].", effects: { bleedingDelta: 2, disadvantage: { targets: ["physical_actions"], steps: 1, duration: "next_action" } }, tags: ["bleeding", "disadvantage"] },
      { roll: 4, label: "Horrific Bruising", effectText: "Lose 1d5 Calm.", effects: { calmLoss: "1d5" }, tags: ["calm"] },
      { roll: 5, label: "Ripped Flesh", effectText: "Bleeding +2. Drop one held item.", effects: { bleedingDelta: 2, dropHeldItem: true }, tags: ["bleeding", "drop_item"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Deep Tissue Damage", effectText: "Bleeding +2. Strength is reduced by 5 until treated.", effects: { bleedingDelta: 2, attributeModifier: { attribute: "strength", amount: -5, duration: "until_treated" } }, tags: ["bleeding", "strength", "treatment"] },
      { roll: 2, label: "Digit Destroyed", effectText: "Bleeding +2. A finger or toe is destroyed.", effects: { bleedingDelta: 2, limbLoss: "finger_or_toe", permanentConsequence: true }, tags: ["bleeding", "amputation", "permanent"] },
      { roll: 3, label: "Chunk of Flesh Removed", effectText: "Bleeding +3. Lose 1d10 Calm.", effects: { bleedingDelta: 3, calmLoss: "1d10" }, tags: ["bleeding", "calm"] },
      { roll: 4, label: "Crushed Hand or Foot", effectText: "Bleeding +3. Speed is reduced by 5 until treated.", effects: { bleedingDelta: 3, attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["bleeding", "speed", "limb", "treatment"] },
      { roll: 5, label: "Eye Destroyed", effectText: "Lose 1d10 Calm. Vision-related actions are [-] until treated.", effects: { calmLoss: "1d10", disadvantage: { targets: ["vision_actions"], steps: 1, duration: "until_treated" }, permanentConsequence: true }, tags: ["calm", "vision", "disadvantage", "permanent"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Limb Severed", effectText: "Bleeding +4. Make a Panic Check.", effects: { bleedingDelta: 4, limbLoss: "major_limb", panicCheck: true, permanentConsequence: true }, tags: ["bleeding", "amputation", "panic", "permanent"] },
      { roll: 2, label: "Impaled", effectText: "Bleeding +4. Lose 1d10 Calm, then make a Panic Check.", effects: { bleedingDelta: 4, calmLoss: "1d10", panicCheck: true, conditionsAdded: ["embedded_object"] }, tags: ["bleeding", "calm", "panic", "impalement"] },
      { roll: 3, label: "Paralysed from the Waist Down", effectText: "You are immobile. Make a Panic Check.", effects: { conditionsAdded: ["immobile"], panicCheck: true, permanentConsequence: true }, tags: ["immobile", "panic", "permanent"] },
      { roll: 4, label: "Massive Tissue Loss", effectText: "Bleeding +4. Strength is reduced by 10 until surgically treated.", effects: { bleedingDelta: 4, attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["bleeding", "strength", "surgery"] },
      { roll: 5, label: "Crushed Torso", effectText: "Lose 1 major action each turn until treated and begin a 1d10-round fatal timer.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" }, fatalTimer: { duration: "1d10", unit: "rounds", stoppedBy: ["medical_stabilization"] } }, tags: ["action_loss", "fatal_timer"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Guts Spilled", effectText: "Bleeding +6. Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { bleedingDelta: 6, calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["bleeding", "calm", "panic", "fatal_timer"] },
      { roll: 2, label: "Catastrophic Dismemberment", effectText: "Bleeding +6. You are immobile. Lose 2d10 Calm, then make a Panic Check.", effects: { bleedingDelta: 6, conditionsAdded: ["immobile"], calmLoss: "2d10", panicCheck: true }, tags: ["bleeding", "immobile", "calm", "panic"] },
      { roll: 3, label: "Body Torn Open", effectText: "Bleeding +6. Fall unconscious and begin a 1d5-round fatal timer.", effects: { bleedingDelta: 6, conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["bleeding", "unconscious", "fatal_timer"] },
      { roll: 4, label: "Head Partially Destroyed", effectText: "Fall unconscious. Lose 2d10 Calm and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], calmLoss: "2d10", fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "calm", "fatal_timer"] },
      { roll: 5, label: "Body Torn Apart", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
