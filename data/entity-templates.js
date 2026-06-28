/**
 * Warden Resolution Console
 * Quick Entity template facade.
 *
 * Expanded definitions live in data/entity-templates/.
 * Runtime modules import this file so the public path remains stable.
 */

import {
  ENTITY_BASE_BODIES
} from "./entity-templates/base-bodies.js";

import {
  ENTITY_ARMOR_PACKAGES
} from "./entity-templates/armor-packages.js";

import {
  ENTITY_ROLE_TEMPLATES
} from "./entity-templates/roles.js";

import {
  ENTITY_GROUP_TEMPLATES
} from "./entity-templates/groups.js";

const LEGACY_TEMPLATES = Object.freeze([
  template({
    id: "unarmored_human",
    label: "Unarmored Human",
    type: "enemy",
    description:
      "A baseline human-scale target without meaningful armor.",
    baseBodyId: "trained_human",
    armorPackageId: "unarmored",
    tags: [
      "human",
      "unarmored",
    ],
  }),

  template({
    id: "armored_trooper",
    label: "Armored Trooper",
    type: "enemy",
    description:
      "A trained combatant in conventional personal armor.",
    baseBodyId: "trained_human",
    armorPackageId:
      "standard_battle_dress",
    tags: [
      "human",
      "combatant",
      "armored",
    ],
  }),

  template({
    id: "juggernaut",
    label: "Juggernaut",
    type: "enemy",
    description:
      "A heavily protected powered-armor target.",
    baseBodyId: "trained_human",
    armorPackageId: "juggernaut",
    tags: [
      "human",
      "heavy",
      "juggernaut",
    ],
  }),

  Object.freeze({
    id: "creature",
    label: "Creature",
    type: "creature",
    description:
      "A durable biological threat without conventional armor.",

    defaults: Object.freeze({
      defense: Object.freeze({
        av: 3,
        dr: 0,
        coverAv: 0,
        armored: false,
        tags: Object.freeze([
          "natural_armor",
        ]),
      }),

      health: Object.freeze({
        healthPerWound: 18,
        currentHealth: 18,
        maximumWounds: 3,
        woundsRemaining: 3,
      }),

      conditions: emptyConditions(),
      armorSystems: Object.freeze({}),
    }),

    profile: Object.freeze({}),

    tags: Object.freeze([
      "creature",
      "biological",
    ]),

    status: "active",
  }),

  Object.freeze({
    id: "vehicle",
    label: "Vehicle",
    type: "vehicle",
    description:
      "A generic light vehicle or machine-scale target.",

    defaults: Object.freeze({
      defense: Object.freeze({
        av: 15,
        dr: 5,
        coverAv: 0,
        armored: true,
        tags: Object.freeze([
          "armored",
          "vehicle",
        ]),
      }),

      health: Object.freeze({
        healthPerWound: 25,
        currentHealth: 25,
        maximumWounds: 4,
        woundsRemaining: 4,
      }),

      conditions: emptyConditions(),
      armorSystems: Object.freeze({}),
    }),

    profile: Object.freeze({}),

    tags: Object.freeze([
      "vehicle",
      "machine",
      "armored",
    ]),

    status: "active",
  }),

  Object.freeze({
    id: "object",
    label: "Object",
    type: "object",
    description:
      "A door, machine, or other destructible object.",

    defaults: Object.freeze({
      defense: Object.freeze({
        av: 8,
        dr: 0,
        coverAv: 0,
        armored: false,
        tags: Object.freeze([
          "object",
        ]),
      }),

      health: Object.freeze({
        healthPerWound: 12,
        currentHealth: 12,
        maximumWounds: 2,
        woundsRemaining: 2,
      }),

      conditions: emptyConditions(),
      armorSystems: Object.freeze({}),
    }),

    profile: Object.freeze({}),

    tags: Object.freeze([
      "object",
      "destructible",
    ]),

    status: "active",
  }),

  Object.freeze({
    id: "custom",
    label: "Custom",
    type: "custom",
    description:
      "A neutral starting point for manual configuration.",

    defaults: Object.freeze({
      defense: Object.freeze({
        av: 0,
        dr: 0,
        coverAv: 0,
        armored: false,
        tags: Object.freeze([]),
      }),

      health: Object.freeze({
        healthPerWound: 10,
        currentHealth: 10,
        maximumWounds: 1,
        woundsRemaining: 1,
      }),

      conditions: emptyConditions(),
      armorSystems: Object.freeze({}),
    }),

    profile: Object.freeze({}),

    tags: Object.freeze([
      "custom",
    ]),

    status: "active",
  }),
]);

const ROLE_TEMPLATES = Object.freeze(
  Object.values(
    ENTITY_ROLE_TEMPLATES,
  ).map((role) =>
    template({
      id: role.id,
      label: role.label,
      type: "enemy",
      description: role.description,
      baseBodyId: role.baseBodyId,
      armorPackageId:
        role.armorPackageId,
      tags: role.tags,
      profile: {
        role: role.role,
        threatLevel: role.threatLevel,
        primaryWeapon:
          role.primaryWeapon,
        secondaryWeapon:
          role.secondaryWeapon,
        skills: role.skills,
      },
    }),
  ),
);

export const ENTITY_TEMPLATES =
  Object.freeze([
    ...LEGACY_TEMPLATES,
    ...ROLE_TEMPLATES,
  ]);

export {
  ENTITY_BASE_BODIES,
  ENTITY_ARMOR_PACKAGES,
  ENTITY_ROLE_TEMPLATES,
  ENTITY_GROUP_TEMPLATES,
};

export function getEntityTemplate(
  templateId,
) {
  return (
    ENTITY_TEMPLATES.find(
      (template) =>
        template.id === templateId,
    ) ?? null
  );
}

export function getActiveEntityTemplates() {
  return ENTITY_TEMPLATES.filter(
    (template) =>
      template.status === "active",
  );
}

export function getEntityGroupTemplate(
  groupId,
) {
  return (
    ENTITY_GROUP_TEMPLATES.find(
      (group) => group.id === groupId,
    ) ?? null
  );
}

export function getActiveEntityGroups() {
  return ENTITY_GROUP_TEMPLATES.filter(
    (group) =>
      group.status === "active",
  );
}

export function cloneTemplateDefaults(
  template,
) {
  if (!template) {
    return null;
  }

  return {
    defense: cloneValue(
      template.defaults.defense,
    ),

    health: cloneValue(
      template.defaults.health,
    ),

    conditions: cloneValue(
      template.defaults.conditions,
    ),

    armorSystems: cloneValue(
      template.defaults.armorSystems
      ?? {},
    ),

    profile: cloneValue(
      template.profile
      ?? {},
    ),

    tags: [
      ...(template.tags ?? []),
    ],
  };
}

function template({
  id,
  label,
  type,
  description,
  baseBodyId,
  armorPackageId,
  tags = [],
  profile = {},
}) {
  const base =
    ENTITY_BASE_BODIES[baseBodyId];

  const armor =
    ENTITY_ARMOR_PACKAGES[
      armorPackageId
    ];

  return Object.freeze({
    id,
    label,
    type,
    description,

    baseBodyId,
    armorPackageId,

    defaults: Object.freeze({
      defense: armor.defense,
      health: base.health,
      conditions: base.conditions,
      armorSystems:
        armor.armorSystems,
    }),

    profile: Object.freeze({
      ...profile,
    }),

    tags: Object.freeze([
      ...(base.tags ?? []),
      ...(armor.tags ?? []),
      ...tags,
    ]),

    status: "active",
  });
}

function emptyConditions() {
  return Object.freeze({
    bleeding: 0,
    activeTac: Object.freeze([]),
    statuses: Object.freeze([]),
  });
}

function cloneValue(value) {
  return JSON.parse(
    JSON.stringify(value),
  );
}
