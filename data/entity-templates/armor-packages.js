function dampening(
  id,
  maximumUses,
) {
  return Object.freeze({
    id,
    maximumUses,
    usesRemaining: maximumUses,
    functioning: true,
  });
}

export const ENTITY_ARMOR_PACKAGES = Object.freeze({
  unarmored: Object.freeze({
    id: "unarmored",
    label: "Unarmored",

    defense: Object.freeze({
      av: 0,
      dr: 0,
      coverAv: 0,
      armored: false,
      tags: Object.freeze([]),
    }),

    armorSystems: Object.freeze({}),
    tags: Object.freeze([]),
  }),

  pilot_suit: Object.freeze({
    id: "pilot_suit",
    label: "Pilot Suit",

    defense: Object.freeze({
      av: 0,
      dr: 0,
      coverAv: 0,
      armored: false,
      tags: Object.freeze([]),
    }),

    armorSystems: Object.freeze({}),
    tags: Object.freeze([
      "pilot_suit",
    ]),
  }),

  command_harness: Object.freeze({
    id: "command_harness",
    label: "Command Harness",

    defense: Object.freeze({
      av: 0,
      dr: 0,
      coverAv: 0,
      armored: false,
      tags: Object.freeze([]),
    }),

    armorSystems: Object.freeze({}),
    tags: Object.freeze([
      "command_harness",
      "comms",
    ]),
  }),

  standard_battle_dress: Object.freeze({
    id: "standard_battle_dress",
    label: "Standard Battle Dress",

    defense: Object.freeze({
      av: 7,
      dr: 0,
      coverAv: 0,
      armored: true,
      tags: Object.freeze([
        "armored",
      ]),
    }),

    armorSystems: Object.freeze({}),
    tags: Object.freeze([
      "hud",
      "tac_link",
      "comms",
    ]),
  }),

  advanced_battle_dress: Object.freeze({
    id: "advanced_battle_dress",
    label: "Advanced Battle Dress",

    defense: Object.freeze({
      av: 10,
      dr: 0,
      coverAv: 0,
      armored: true,
      tags: Object.freeze([
        "armored",
        "powered",
      ]),
    }),

    armorSystems: Object.freeze({
      traumaDampening: dampening(
        "trauma_dampening",
        1,
      ),
    }),

    tags: Object.freeze([
      "heavy",
      "exoskeleton",
      "hud",
      "tac_link",
      "comms",
    ]),
  }),

  armored_combat_eva: Object.freeze({
    id: "armored_combat_eva",
    label: "Armored Combat EVA",

    defense: Object.freeze({
      av: 10,
      dr: 0,
      coverAv: 0,
      armored: true,
      tags: Object.freeze([
        "armored",
        "sealed",
      ]),
    }),

    armorSystems: Object.freeze({
      traumaDampening: dampening(
        "trauma_dampening",
        1,
      ),
    }),

    tags: Object.freeze([
      "o2",
      "pressurized",
      "vacuum_rated",
      "zero_g",
      "powered",
    ]),
  }),

  juggernaut: Object.freeze({
    id: "juggernaut",
    label: "Juggernaut-Class Armor",

    defense: Object.freeze({
      av: 15,
      dr: 10,
      coverAv: 0,
      armored: true,
      tags: Object.freeze([
        "armored",
        "juggernaut",
        "reinforced",
      ]),
    }),

    armorSystems: Object.freeze({
      traumaDampening: dampening(
        "trauma_dampening_plus",
        2,
      ),
    }),

    tags: Object.freeze([
      "powered",
      "heavy",
      "cumbersome",
      "resilient",
    ]),
  }),
});
