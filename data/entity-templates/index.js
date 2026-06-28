import {
  ENTITY_BASE_BODIES
} from "./base-bodies.js";

import {
  ENTITY_ARMOR_PACKAGES
} from "./armor-packages.js";

import {
  ENTITY_ROLE_TEMPLATES
} from "./roles.js";

import {
  ENTITY_GROUP_TEMPLATES
} from "./groups.js";

export {
  ENTITY_BASE_BODIES,
  ENTITY_ARMOR_PACKAGES,
  ENTITY_ROLE_TEMPLATES,
  ENTITY_GROUP_TEMPLATES,
};

export function createQuickEntityFromTemplate(
  templateId,
  {
    id = null,
    label = null,
    armorPackageId = null,
  } = {},
) {
  const role =
    ENTITY_ROLE_TEMPLATES[templateId];

  if (!role) {
    throw new Error(
      `Unknown entity template: ${templateId}`,
    );
  }

  const base =
    ENTITY_BASE_BODIES[
      role.baseTemplateId
    ];

  if (!base) {
    throw new Error(
      `Unknown base template: ${role.baseTemplateId}`,
    );
  }

  const resolvedArmorPackageId =
    armorPackageId
    ?? role.armorPackageId
    ?? "unarmored";

  const armor =
    ENTITY_ARMOR_PACKAGES[
      resolvedArmorPackageId
    ];

  if (!armor) {
    throw new Error(
      `Unknown armor package: ${resolvedArmorPackageId}`,
    );
  }

  const entityId =
    id
    ?? `${templateId}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 7)}`;

  return {
    id: entityId,
    label: label ?? role.label,
    type: base.type,

    templateId,
    baseTemplateId: base.id,
    armorPackageId:
      resolvedArmorPackageId,

    role: role.role,
    threatLevel: role.threatLevel,

    currentHealth:
      base.durability
        .currentWoundHealth,

    maximumHealth:
      base.durability
        .healthPerWound,

    currentWoundHealth:
      base.durability
        .currentWoundHealth,

    healthPerWound:
      base.durability
        .healthPerWound,

    woundsRemaining:
      base.durability
        .woundsRemaining,

    maximumWounds:
      base.durability
        .maximumWounds,

    av: armor.defense.av,
    dr: armor.defense.dr,

    defense: {
      armored:
        armor.defense.armored,
      av: armor.defense.av,
      dr: armor.defense.dr,
    },

    armorSystems:
      cloneValue(
        armor.armorSystems
        ?? {},
      ),

    primaryWeapon:
      role.primaryWeapon,

    secondaryWeapon:
      role.secondaryWeapon,

    skills: cloneValue(
      role.skills
      ?? {},
    ),

    tags: unique([
      ...(base.tags ?? []),
      ...(armor.tags ?? []),
      ...(role.tags ?? []),
    ]),

    notes: "",
  };
}

export function createQuickEntitiesFromGroup(
  groupId,
  options = {},
) {
  const group =
    ENTITY_GROUP_TEMPLATES[groupId];

  if (!group) {
    throw new Error(
      `Unknown entity group: ${groupId}`,
    );
  }

  const entities = [];

  for (const member of group.members) {
    for (
      let index = 0;
      index < member.quantity;
      index += 1
    ) {
      entities.push(
        createQuickEntityFromTemplate(
          member.templateId,
          {
            label:
              member.quantity > 1
                ? `${
                    ENTITY_ROLE_TEMPLATES[
                      member.templateId
                    ].label
                  } ${index + 1}`
                : undefined,

            ...options,
          },
        ),
      );
    }
  }

  return entities;
}

function cloneValue(value) {
  return JSON.parse(
    JSON.stringify(value),
  );
}

function unique(values) {
  return [...new Set(values)];
}
