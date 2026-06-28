export const FIRE_EXPLOSIVE_WOUNDS = Object.freeze({
  id: "fire_explosive",
  label: "Fire & Explosive Wounds",
  mode: "severity_banded",
  die: "d5",
  traumaDampeningEligible: true,

  tables: Object.freeze({
    light: Object.freeze([
      { roll: 1, label: "Clothing Scorched", effectText: "Lose 1d5 Calm.", effects: { calmLoss: "1d5" }, tags: ["calm", "burn"] },
      { roll: 2, label: "Singed", effectText: "The next action is [-].", effects: { disadvantage: { targets: ["next_action"], steps: 1, duration: "next_action" } }, tags: ["disadvantage", "burn"] },
      { roll: 3, label: "Flash Burn", effectText: "The next vision-related action is [-].", effects: { disadvantage: { targets: ["vision_actions"], steps: 1, duration: "next_action" } }, tags: ["vision", "disadvantage", "burn"] },
      { roll: 4, label: "Blast Knockdown", effectText: "Make a Body Save or fall prone.", effects: { bodySave: { required: true, onFailure: { conditionsAdded: ["prone"] } } }, tags: ["body_save", "prone"] },
      { roll: 5, label: "Temporary Deafness", effectText: "Lose your next Reaction.", effects: { loseReaction: true, duration: "next_reaction" }, tags: ["hearing", "reaction"] },
    ]),

    moderate: Object.freeze([
      { roll: 1, label: "Large Burn", effectText: "Physical actions are [-] until treated.", effects: { disadvantage: { targets: ["physical_actions"], steps: 1, duration: "until_treated" } }, tags: ["burn", "disadvantage", "treatment"] },
      { roll: 2, label: "Shrapnel Wound", effectText: "Bleeding +2.", effects: { bleedingDelta: 2 }, tags: ["bleeding", "shrapnel"] },
      { roll: 3, label: "Concussive Blast", effectText: "Intellect is reduced by 5 until treated.", effects: { attributeModifier: { attribute: "intellect", amount: -5, duration: "until_treated" } }, tags: ["intellect", "concussion", "treatment"] },
      { roll: 4, label: "Burned Hands or Face", effectText: "Choose Strength or Speed; the selected attribute is reduced by 5 until treated.", effects: { attributeModifierChoice: { options: ["strength", "speed"], amount: -5, duration: "until_treated" } }, tags: ["burn", "choice", "treatment"] },
      { roll: 5, label: "Smoke and Heat Injury", effectText: "Make a Body Save or begin Air-Loss checks.", effects: { bodySave: { required: true, onFailure: { airLossRelevant: true } } }, tags: ["body_save", "air_loss"] },
    ]),

    severe: Object.freeze([
      { roll: 1, label: "Third-Degree Burns", effectText: "Strength is reduced by 10 until surgically treated.", effects: { attributeModifier: { attribute: "strength", amount: -10, duration: "until_surgically_treated" } }, tags: ["burn", "strength", "surgery"] },
      { roll: 2, label: "Embedded Shrapnel", effectText: "Bleeding +4. Surgery is required.", effects: { bleedingDelta: 4, surgeryRequired: true }, tags: ["bleeding", "shrapnel", "surgery"] },
      { roll: 3, label: "Blast Trauma", effectText: "Lose 1 major action each turn until treated. Make a Panic Check.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" }, panicCheck: true }, tags: ["action_loss", "panic", "treatment"] },
      { roll: 4, label: "Airway Burn", effectText: "Lose 1 major action each turn and begin Air-Loss checks until treated.", effects: { actionLoss: { majorActions: 1, duration: "until_treated" }, airLossRelevant: true }, tags: ["action_loss", "air_loss", "burn"] },
      { roll: 5, label: "Body on Fire", effectText: "Suffer 2d10 damage each round until extinguished. Lose 1d10 Calm, then make a Panic Check.", effects: { ongoingDamage: { amount: "2d10", interval: "round", stoppedBy: ["extinguished"] }, calmLoss: "1d10", panicCheck: true }, tags: ["ongoing_damage", "calm", "panic", "fire"] },
    ]),

    deadly: Object.freeze([
      { roll: 1, label: "Engulfed in Flame", effectText: "Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["calm", "panic", "fatal_timer", "fire"] },
      { roll: 2, label: "Catastrophic Blast Injury", effectText: "Bleeding +6. Lose 2d10 Calm, then make a Panic Check. Begin a 1d5-round fatal timer.", effects: { bleedingDelta: 6, calmLoss: "2d10", panicCheck: true, fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["bleeding", "calm", "panic", "fatal_timer"] },
      { roll: 3, label: "Incinerating Burns", effectText: "Fall unconscious and begin a 1d5-round fatal timer.", effects: { conditionsAdded: ["unconscious"], fatalTimer: { duration: "1d5", unit: "rounds", stoppedBy: ["intensive_stabilization"] } }, tags: ["unconscious", "fatal_timer", "burn"] },
      { roll: 4, label: "Dismembering Explosion", effectText: "You are immobile. Lose 2d10 Calm, then make a Panic Check.", effects: { conditionsAdded: ["immobile"], calmLoss: "2d10", panicCheck: true }, tags: ["immobile", "calm", "panic"] },
      { roll: 5, label: "Vaporized", effectText: "Death is immediate.", effects: { death: true }, tags: ["death"] },
    ]),
  }),
});
