export const GUNSHOT_WOUNDS = Object.freeze({
  id: "gunshot",
  label: "Gunshot Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Grazed", effectText: "Bleeding +1. Fall prone or lose cover.", effects: { bleedingDelta: 1, choice: ["fall_prone", "lose_cover"] }, tags: ["bleeding", "choice", "prone", "cover"] },
      { roll: 2, label: "Flesh Wound", effectText: "Bleeding +1.", effects: { bleedingDelta: 1 }, tags: ["bleeding"] },
      { roll: 3, label: "Bullet Crease", effectText: "Bleeding +1. The next action is [-].", effects: { bleedingDelta: 1, disadvantage: { targets: ["next_action"], steps: 1, duration: "next_action" } }, tags: ["bleeding", "disadvantage"] },
      { roll: 4, label: "Shallow Penetration", effectText: "Bleeding +2.", effects: { bleedingDelta: 2 }, tags: ["bleeding"] },
      { roll: 5, label: "Shock Impact", effectText: "Lose 1d5 Calm and lose your next Reaction.", effects: { calmLoss: "1d5", loseReaction: true, duration: "next_reaction" }, tags: ["calm", "reaction"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Broken Rib", effectText: "Bleeding +2. Strength is reduced by 5 until treated.", effects: { bleedingDelta: 2, attributeModifier: { attribute: "strength", amount: -5, duration: "until_treated" } }, tags: ["bleeding", "strength", "treatment"] },
      { roll: 2, label: "Fractured Extremity", effectText: "Bleeding +2. Speed is reduced by 5 until treated.", effects: { bleedingDelta: 2, attributeModifier: { attribute: "speed", amount: -5, duration: "until_treated" } }, tags: ["bleeding", "speed", "treatment"] },
      { roll: 3, label: "Through-and-Through", effectText: "Bleeding +3. Lose 1d10 Calm.", effects: { bleedingDelta: 3, calmLoss: "1d10" }, tags: ["bleeding", "calm"] },
      { roll: 4, label: "Lodged Bullet", effectText: "Bleeding +2. Surgery is required to remove the bullet.", effects: { bleedingDelta: 2, surgeryRequired: true }, tags: ["bleeding", "surgery"] },
      { roll: 5, label: "Joint Hit", effectText: "Bleeding +3. Lose 1 major action during your next turn.", effects: { bleedingDelta: 3, actionLoss: { majorActions: 1, duration: "next_turn" } }, tags: ["bleeding", "action_loss", "limb"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Internal Bleeding", effectText: "Bleeding +3. Strength is reduced by 10 until surgically treated.", effects: { bleedingDelta: 3, attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["bleeding", "strength", "surgery"] },
      { roll: 2, label: "Neck Wound", effectText: "Bleeding +4. Lose 1d10 Calm, then make a Panic Check.", effects: { bleedingDelta: 4, calmLoss: "1d10", panicCheck: true }, tags: ["bleeding", "calm", "panic"] },
      { roll: 3, label: "Sucking Chest Wound", effectText: "Bleeding +4. Lose 1 major action each turn until treated.", effects: { bleedingDelta: 4, breathingImpaired: true, actionLoss: { majorActions: 1, duration: "until_treated" } }, tags: ["bleeding", "breathing", "action_loss"] },
      { roll: 4, label: "Abdominal Penetration", effectText: "Bleeding +4. Speed is reduced by 10 until surgically treated.", effects: { bleedingDelta: 4, surgeryRequired: true, attributeModifier: { attribute: "speed", amount: -10, duration: "until_surgically_treated" } }, tags: ["bleeding", "speed", "surgery"] },
      { roll: 5, label: "Shattered Limb", effectText: "Bleeding +4. The affected limb is unusable until surgically treated.", effects: { bleedingDelta: 4, conditionsAdded: ["immobile_limb"], surgeryRequired: true }, tags: ["bleeding", "limb", "surgery"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Headshot", effectText: "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["calm", "panic", "fatal_timer"] },
      { roll: 2, label: "Heart or Aorta Hit", effectText: "Bleeding +6. Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { bleedingDelta: 6, calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["bleeding", "calm", "panic", "fatal_timer"] },
      { roll: 3, label: "Spinal Shot", effectText: "Bleeding +5. You are immobile. Lose 2d10 Calm, then make a Panic Check.", effects: { bleedingDelta: 5, conditionsAdded: ["immobile"], calmLoss: "2d10", panicCheck: true }, tags: ["bleeding", "immobile", "calm", "panic"] },
      { roll: 4, label: "Catastrophic Organ Destruction", effectText: "Bleeding +6. Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { bleedingDelta: 6, calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["bleeding", "calm", "panic", "fatal_timer"] },
      { roll: 5, label: "Brain Destroyed", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
