export const ENTITY_BASE_BODIES = Object.freeze({
  trained_human: Object.freeze({
    id: "trained_human",
    label: "Trained Human",
    type: "enemy",

    health: Object.freeze({
      healthPerWound: 15,
      currentHealth: 15,
      maximumWounds: 3,
      woundsRemaining: 3,
    }),

    conditions: Object.freeze({
      bleeding: 0,
      activeTac: Object.freeze([]),
      statuses: Object.freeze([]),
    }),

    tags: Object.freeze([
      "human",
      "trained",
      "npc",
    ]),
  }),
});
