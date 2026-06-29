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

import {
  VEHICLE_ENTITY_TEMPLATES
} from "./entity-templates/vehicles.js";

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
  ).map((role) => {
    const grouping =
      getPersonnelTemplateGrouping(role);

    return template({
      id: role.id,
      label: role.label,
      type: "enemy",
      description: role.description,
      baseBodyId: role.baseBodyId,
      armorPackageId:
        role.armorPackageId,
      category: "personnel",
      categoryLabel: "Personnel",
      group: grouping.group,
      groupLabel: grouping.groupLabel,
      sortOrder: grouping.sortOrder,
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
    });
  }),
);

const GROUPED_LEGACY_TEMPLATES =
  Object.freeze(
    LEGACY_TEMPLATES.map(
      addLegacyTemplateGrouping,
    ),
  );

export const ENTITY_TEMPLATES =
  Object.freeze([
    ...GROUPED_LEGACY_TEMPLATES,
    ...ROLE_TEMPLATES,
    ...VEHICLE_ENTITY_TEMPLATES,
  ]);

export {
  ENTITY_BASE_BODIES,
  ENTITY_ARMOR_PACKAGES,
  ENTITY_ROLE_TEMPLATES,
  ENTITY_GROUP_TEMPLATES,
  VEHICLE_ENTITY_TEMPLATES,
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

    vehicle: cloneValue(
      template.defaults.vehicle
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
  category = "personnel",
  categoryLabel = "Personnel",
  group = "other_personnel",
  groupLabel = "Other Personnel",
  sortOrder = 100,
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

    category,
    categoryLabel,
    group,
    groupLabel,
    sortOrder,

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

function getPersonnelTemplateGrouping(role) {
  const id = role.id ?? "";
  const tags = new Set(role.tags ?? []);

  if (
    id.startsWith("marine_")
    || id.startsWith("orion_")
  ) {
    return {
      group: "marines",
      groupLabel: "Marines and Orion Teams",
      sortOrder: 20,
    };
  }

  if (id.startsWith("reclamation_")) {
    return {
      group: "reclamation",
      groupLabel: "Reclamation Teams",
      sortOrder: 40,
    };
  }

  if (
    tags.has("walker_pilot")
    || tags.has("fire_control")
    || tags.has("walker_section")
    || tags.has("exosuit")
  ) {
    return {
      group: "walker_crew",
      groupLabel: "Walker Crew and Operators",
      sortOrder: 50,
    };
  }

  if (
    tags.has("corporate")
    || id.startsWith("corporate_")
  ) {
    return {
      group: "corporate_specialists",
      groupLabel: "Corporate Specialists",
      sortOrder: 30,
    };
  }

  return {
    group: "other_personnel",
    groupLabel: "Other Personnel",
    sortOrder: 90,
  };
}

function addLegacyTemplateGrouping(template) {
  const groupingById = {
    unarmored_human: {
      category: "personnel",
      categoryLabel: "Personnel",
      group: "baseline",
      groupLabel: "Baseline",
      sortOrder: 10,
    },

    armored_trooper: {
      category: "personnel",
      categoryLabel: "Personnel",
      group: "baseline",
      groupLabel: "Baseline",
      sortOrder: 20,
    },

    juggernaut: {
      category: "personnel",
      categoryLabel: "Personnel",
      group: "baseline",
      groupLabel: "Baseline",
      sortOrder: 30,
    },

    creature: {
      category: "other",
      categoryLabel: "Other",
      group: "creatures",
      groupLabel: "Creatures",
      sortOrder: 10,
    },

    vehicle: {
      category: "vehicle",
      categoryLabel: "Vehicles",
      group: "generic_vehicles",
      groupLabel: "Generic Vehicles",
      sortOrder: 5,
    },

    object: {
      category: "other",
      categoryLabel: "Other",
      group: "objects",
      groupLabel: "Objects",
      sortOrder: 20,
    },

    custom: {
      category: "other",
      categoryLabel: "Other",
      group: "custom",
      groupLabel: "Custom",
      sortOrder: 30,
    },
  };

  const grouping =
    groupingById[template.id]
    ?? {
      category: "other",
      categoryLabel: "Other",
      group: "other",
      groupLabel: "Other",
      sortOrder: 100,
    };

  return Object.freeze({
    ...template,
    ...grouping,
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
