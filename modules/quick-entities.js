/**
 * Warden Resolution Console
 * Quick Entity state helpers.
 *
 * Quick Entities are temporary, session-scoped combat records.
 *
 * This module:
 * - validates entity data
 * - creates entities
 * - creates entities from templates
 * - updates entities immutably
 * - duplicates entities
 * - removes entities
 * - applies committed damage projections
 *
 * This module does not own application state or browser persistence.
 */

import {
  getEntityTemplate,
  getEntityGroupTemplate,
  cloneTemplateDefaults
} from "../data/entity-templates.js";

const SUPPORTED_ENTITY_TYPES = new Set([
  "enemy",
  "ally",
  "creature",
  "vehicle",
  "object",
  "custom"
]);

export function createQuickEntity(
  input,
  context = {}
) {
  const services = normalizeContext(context);
  const normalized = normalizeQuickEntityInput(input);

  const validation = validateQuickEntityInput(normalized);

  if (!validation.valid) {
    return createEntityError(
      "create",
      validation.errors
    );
  }

  const timestamp = services.now();

  return {
    id: normalized.id ||
      services.idFactory("entity"),

    label: normalized.label,
    type: normalized.type,
    templateId: normalized.templateId,

    defense: cloneDefense(normalized.defense),
    health: cloneHealth(normalized.health),
    conditions: cloneConditions(
      normalized.conditions
    ),

    armorSystems: cloneValue(
      normalized.armorSystems
    ),

    profile: cloneValue(
      normalized.profile
    ),

    tags: [
      ...normalized.tags
    ],

    notes: normalized.notes,
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

export function createEntityFromTemplate(
  templateOrId,
  overrides = {},
  context = {}
) {
  const template =
    typeof templateOrId === "string"
      ? getEntityTemplate(templateOrId)
      : templateOrId;

  if (!template) {
    return createEntityError(
      "create_from_template",
      [
        createValidationError(
          "templateId",
          "template_not_found",
          "The selected entity template does not exist."
        )
      ]
    );
  }

  const defaults = cloneTemplateDefaults(template);

  const input = {
    label:
      typeof overrides.label === "string" &&
      overrides.label.trim() !== ""
        ? overrides.label.trim()
        : template.label,

    type:
      overrides.type ??
      template.type ??
      "custom",

    templateId: template.id,

    defense: mergeDefense(
      defaults.defense,
      overrides.defense
    ),

    health: mergeHealth(
      defaults.health,
      overrides.health
    ),

    conditions: mergeConditions(
      defaults.conditions,
      overrides.conditions
    ),

    armorSystems:
      overrides.armorSystems
      ?? defaults.armorSystems
      ?? {},

    profile: {
      ...(defaults.profile ?? {}),
      ...(overrides.profile ?? {})
    },

    tags: [
      ...(
        overrides.tags
        ?? defaults.tags
        ?? template.tags
        ?? []
      )
    ],

    notes:
      typeof overrides.notes === "string"
        ? overrides.notes
        : ""
  };

  return createQuickEntity(input, context);
}

export function createEntitiesFromGroupTemplate(
  groupOrId,
  context = {}
) {
  const group =
    typeof groupOrId === "string"
      ? getEntityGroupTemplate(groupOrId)
      : groupOrId;

  if (!group) {
    return createEntityError(
      "create_group_from_template",
      [
        createValidationError(
          "groupId",
          "group_not_found",
          "The selected entity group does not exist."
        )
      ]
    );
  }

  const entities = [];

  for (const member of group.members) {
    for (
      let index = 0;
      index < member.quantity;
      index += 1
    ) {
      const result =
        createEntityFromTemplate(
          member.templateId,
          member.quantity > 1
            ? {
                label:
                  `${getEntityTemplate(
                    member.templateId
                  )?.label ?? "Entity"} ${
                    index + 1
                  }`
              }
            : {},
          context
        );

      if (isQuickEntityError(result)) {
        return result;
      }

      entities.push(result);
    }
  }

  return entities;
}

export function updateQuickEntity(
  entity,
  changes,
  context = {}
) {
  if (!isPlainObject(entity)) {
    return createEntityError(
      "update",
      [
        createValidationError(
          "entity",
          "invalid_type",
          "Entity must be an object."
        )
      ]
    );
  }

  const services = normalizeContext(context);

  const candidate = normalizeQuickEntityInput({
    ...entity,

    ...changes,

    defense: mergeDefense(
      entity.defense,
      changes?.defense
    ),

    health: mergeHealth(
      entity.health,
      changes?.health
    ),

    conditions: mergeConditions(
      entity.conditions,
      changes?.conditions
    ),

    id: entity.id,
    createdAt: entity.createdAt
  });

  const validation = validateQuickEntityInput(
    candidate
  );

  if (!validation.valid) {
    return createEntityError(
      "update",
      validation.errors
    );
  }

  return {
    ...entity,

    label: candidate.label,
    type: candidate.type,
    templateId: candidate.templateId,

    defense: cloneDefense(candidate.defense),
    health: cloneHealth(candidate.health),
    conditions: cloneConditions(
      candidate.conditions
    ),

    armorSystems: cloneValue(
      candidate.armorSystems
    ),

    profile: cloneValue(
      candidate.profile
    ),

    tags: [
      ...candidate.tags
    ],

    notes: candidate.notes,
    updatedAt: services.now()
  };
}

export function duplicateQuickEntity(
  entity,
  overrides = {},
  context = {}
) {
  if (!isPlainObject(entity)) {
    return createEntityError(
      "duplicate",
      [
        createValidationError(
          "entity",
          "invalid_type",
          "Entity must be an object."
        )
      ]
    );
  }

  const defaultLabel =
    typeof entity.label === "string"
      ? `${entity.label} Copy`
      : "Entity Copy";

  return createQuickEntity(
    {
      label:
        typeof overrides.label === "string" &&
        overrides.label.trim() !== ""
          ? overrides.label.trim()
          : defaultLabel,

      type: overrides.type ?? entity.type,
      templateId:
        overrides.templateId ??
        entity.templateId ??
        null,

      defense: mergeDefense(
        entity.defense,
        overrides.defense
      ),

      health: mergeHealth(
        entity.health,
        overrides.health
      ),

      conditions: mergeConditions(
        entity.conditions,
        overrides.conditions
      ),

      armorSystems:
        overrides.armorSystems
        ?? entity.armorSystems
        ?? {},

      profile:
        overrides.profile
        ?? entity.profile
        ?? {},

      tags:
        overrides.tags
        ?? entity.tags
        ?? [],

      notes:
        typeof overrides.notes === "string"
          ? overrides.notes
          : entity.notes ?? ""
    },
    context
  );
}

export function removeQuickEntity(
  entities,
  entityId
) {
  if (!Array.isArray(entities)) {
    return [];
  }

  return entities.filter(
    (entity) => entity.id !== entityId
  );
}

export function getQuickEntity(
  entities,
  entityId
) {
  if (!Array.isArray(entities)) {
    return null;
  }

  return (
    entities.find(
      (entity) => entity.id === entityId
    ) ?? null
  );
}

export function replaceQuickEntity(
  entities,
  updatedEntity
) {
  if (!Array.isArray(entities)) {
    return [];
  }

  return entities.map((entity) =>
    entity.id === updatedEntity.id
      ? updatedEntity
      : entity
  );
}

export function applyDamageResultToEntity(
  entity,
  result,
  context = {}
) {
  const errors = [];

  if (!isPlainObject(entity)) {
    errors.push(
      createValidationError(
        "entity",
        "invalid_type",
        "Entity must be an object."
      )
    );
  }

  if (!isPlainObject(result)) {
    errors.push(
      createValidationError(
        "result",
        "invalid_type",
        "Damage result must be an object."
      )
    );
  }

  if (
    isPlainObject(result) &&
    result.resolverId !== "damage"
  ) {
    errors.push(
      createValidationError(
        "result.resolverId",
        "invalid_resolver",
        "Only Damage Resolver results may be applied."
      )
    );
  }

  const metadata = result?.metadata;

  if (
    !isPlainObject(metadata?.proposedState)
  ) {
    errors.push(
      createValidationError(
        "result.metadata.proposedState",
        "missing_projection",
        "The Damage result does not contain a proposed state."
      )
    );
  }

  if (
    metadata?.commitStatus !== "pending"
  ) {
    errors.push(
      createValidationError(
        "result.metadata.commitStatus",
        "invalid_commit_status",
        "Only pending Damage projections may be committed."
      )
    );
  }

  if (
    metadata?.entityId &&
    entity?.id &&
    metadata.entityId !== entity.id
  ) {
    errors.push(
      createValidationError(
        "result.metadata.entityId",
        "entity_mismatch",
        "The Damage result belongs to a different entity."
      )
    );
  }

  if (errors.length > 0) {
    return createEntityError(
      "apply_damage",
      errors
    );
  }

  const proposed =
    metadata.proposedState;

  const changes = {
    health: {
      currentHealth:
        proposed.currentHealth,
      woundsRemaining:
        proposed.woundsRemaining
    },

    conditions: {
      bleeding:
        proposed.bleeding,
      activeTac:
        proposed.activeTac,
      statuses:
        proposed.statuses ??
        entity.conditions?.statuses ??
        []
    }
  };

  return updateQuickEntity(
    entity,
    changes,
    context
  );
}

export function createQuickEntityFromDamageResult(
  result,
  overrides = {},
  context = {}
) {
  if (!isPlainObject(result)) {
    return createEntityError(
      "create_from_damage",
      [
        createValidationError(
          "result",
          "invalid_type",
          "Damage result must be an object."
        )
      ]
    );
  }

  const source =
    result.metadata?.proposedState ??
    result.inputs?.target ??
    null;

  if (!source) {
    return createEntityError(
      "create_from_damage",
      [
        createValidationError(
          "result",
          "missing_target_state",
          "The Damage result does not contain target state."
        )
      ]
    );
  }

  return createQuickEntity(
    {
      label:
        overrides.label ??
        result.inputs?.targetLabel ??
        result.label ??
        "Quick Entity",

      type:
        overrides.type ??
        result.inputs?.targetType ??
        "enemy",

      templateId:
        overrides.templateId ??
        null,

      defense:
        overrides.defense ??
        result.inputs?.target?.defense ??
        source.defense ??
        {},

      health:
        overrides.health ?? {
          healthPerWound:
            source.healthPerWound ??
            result.inputs?.target?.health
              ?.healthPerWound ??
            10,

          currentHealth:
            source.currentHealth ??
            result.inputs?.target?.health
              ?.currentHealth ??
            10,

          maximumWounds:
            source.maximumWounds ??
            result.inputs?.target?.health
              ?.maximumWounds ??
            1,

          woundsRemaining:
            source.woundsRemaining ??
            result.inputs?.target?.health
              ?.woundsRemaining ??
            1
        },

      conditions:
        overrides.conditions ?? {
          bleeding:
            source.bleeding ??
            result.inputs?.target?.conditions
              ?.bleeding ??
            0,

          activeTac:
            source.activeTac ??
            result.inputs?.target?.conditions
              ?.activeTac ??
            [],

          statuses:
            source.statuses ??
            result.inputs?.target?.conditions
              ?.statuses ??
            []
        },

      notes:
        overrides.notes ?? ""
    },
    context
  );
}

export function validateQuickEntityInput(input) {
  const errors = [];

  if (!isPlainObject(input)) {
    return {
      valid: false,
      errors: [
        createValidationError(
          "input",
          "invalid_type",
          "Quick Entity input must be an object."
        )
      ]
    };
  }

  if (
    typeof input.label !== "string" ||
    input.label.trim() === ""
  ) {
    errors.push(
      createValidationError(
        "label",
        "required",
        "Entity label is required."
      )
    );
  }

  if (!SUPPORTED_ENTITY_TYPES.has(input.type)) {
    errors.push(
      createValidationError(
        "type",
        "unsupported_value",
        `Unsupported entity type: ${String(
          input.type
        )}`
      )
    );
  }

  validateDefense(
    input.defense,
    errors
  );

  validateHealth(
    input.health,
    errors
  );

  validateConditions(
    input.conditions,
    errors
  );

  return {
    valid: errors.length === 0,
    errors
  };
}

export function isQuickEntityError(value) {
  return (
    isPlainObject(value) &&
    value.ok === false &&
    Array.isArray(value.errors)
  );
}

export function createQuickEntitySummary(entity) {
  if (!isPlainObject(entity)) {
    return null;
  }

  return {
    id: entity.id,
    label: entity.label,
    currentHealth:
      entity.health?.currentHealth ?? 0,
    healthPerWound:
      entity.health?.healthPerWound ?? 0,
    woundsRemaining:
      entity.health?.woundsRemaining ?? 0,
    maximumWounds:
      entity.health?.maximumWounds ?? 0,
    av: entity.defense?.av ?? 0,
    dr: entity.defense?.dr ?? 0,
    bleeding:
      entity.conditions?.bleeding ?? 0,
    tacCount:
      entity.conditions?.activeTac?.length ?? 0,
    majorStatuses: [
      ...(entity.conditions?.statuses ?? [])
    ]
  };
}

function normalizeQuickEntityInput(input = {}) {
  return {
    id:
      typeof input.id === "string"
        ? input.id
        : null,

    label:
      typeof input.label === "string"
        ? input.label.trim()
        : "",

    type:
      typeof input.type === "string"
        ? input.type
        : "custom",

    templateId:
      typeof input.templateId === "string"
        ? input.templateId
        : null,

    defense: mergeDefense(
      {
        av: 0,
        dr: 0,
        coverAv: 0,
        armored: false,
        tags: []
      },
      input.defense
    ),

    health: mergeHealth(
      {
        healthPerWound: 10,
        currentHealth: 10,
        maximumWounds: 1,
        woundsRemaining: 1
      },
      input.health
    ),

    conditions: mergeConditions(
      {
        bleeding: 0,
        activeTac: [],
        statuses: []
      },
      input.conditions
    ),

    armorSystems:
      isPlainObject(input.armorSystems)
        ? cloneValue(
            input.armorSystems
          )
        : {},

    profile:
      isPlainObject(input.profile)
        ? cloneValue(input.profile)
        : {},

    tags:
      Array.isArray(input.tags)
        ? [...input.tags]
        : [],

    notes:
      typeof input.notes === "string"
        ? input.notes
        : ""
  };
}

function validateDefense(defense, errors) {
  if (!isPlainObject(defense)) {
    errors.push(
      createValidationError(
        "defense",
        "invalid_type",
        "Defense must be an object."
      )
    );
    return;
  }

  for (const field of ["av", "dr", "coverAv"]) {
    const value = Number(defense[field]);

    if (
      !Number.isFinite(value) ||
      value < 0
    ) {
      errors.push(
        createValidationError(
          `defense.${field}`,
          "invalid_number",
          `${field} must be a non-negative number.`
        )
      );
    }
  }

  if (typeof defense.armored !== "boolean") {
    errors.push(
      createValidationError(
        "defense.armored",
        "invalid_type",
        "armored must be a boolean."
      )
    );
  }

  if (!Array.isArray(defense.tags)) {
    errors.push(
      createValidationError(
        "defense.tags",
        "invalid_type",
        "Defense tags must be an array."
      )
    );
  }
}

function validateHealth(health, errors) {
  if (!isPlainObject(health)) {
    errors.push(
      createValidationError(
        "health",
        "invalid_type",
        "Health must be an object."
      )
    );
    return;
  }

  const healthPerWound =
    Number(health.healthPerWound);

  const currentHealth =
    Number(health.currentHealth);

  const maximumWounds =
    Number(health.maximumWounds);

  const woundsRemaining =
    Number(health.woundsRemaining);

  if (
    !Number.isFinite(healthPerWound) ||
    healthPerWound <= 0
  ) {
    errors.push(
      createValidationError(
        "health.healthPerWound",
        "invalid_number",
        "Health per Wound must be greater than 0."
      )
    );
  }

  if (
    !Number.isFinite(currentHealth) ||
    currentHealth < 0 ||
    currentHealth > healthPerWound
  ) {
    errors.push(
      createValidationError(
        "health.currentHealth",
        "outside_range",
        "Current Health must be between 0 and Health per Wound."
      )
    );
  }

  if (
    !Number.isInteger(maximumWounds) ||
    maximumWounds <= 0
  ) {
    errors.push(
      createValidationError(
        "health.maximumWounds",
        "invalid_integer",
        "Maximum Wounds must be a positive integer."
      )
    );
  }

  if (
    !Number.isInteger(woundsRemaining) ||
    woundsRemaining < 0 ||
    woundsRemaining > maximumWounds
  ) {
    errors.push(
      createValidationError(
        "health.woundsRemaining",
        "outside_range",
        "Remaining Wounds must be between 0 and Maximum Wounds."
      )
    );
  }
}

function validateConditions(
  conditions,
  errors
) {
  if (!isPlainObject(conditions)) {
    errors.push(
      createValidationError(
        "conditions",
        "invalid_type",
        "Conditions must be an object."
      )
    );
    return;
  }

  const bleeding =
    Number(conditions.bleeding);

  if (
    !Number.isFinite(bleeding) ||
    bleeding < 0
  ) {
    errors.push(
      createValidationError(
        "conditions.bleeding",
        "invalid_number",
        "Bleeding must be a non-negative number."
      )
    );
  }

  if (!Array.isArray(conditions.activeTac)) {
    errors.push(
      createValidationError(
        "conditions.activeTac",
        "invalid_type",
        "Active TAC must be an array."
      )
    );
  }

  if (!Array.isArray(conditions.statuses)) {
    errors.push(
      createValidationError(
        "conditions.statuses",
        "invalid_type",
        "Statuses must be an array."
      )
    );
  }
}

function mergeDefense(base = {}, overrides = {}) {
  return {
    av: Number(
      overrides?.av ??
      base?.av ??
      0
    ),

    dr: Number(
      overrides?.dr ??
      base?.dr ??
      0
    ),

    coverAv: Number(
      overrides?.coverAv ??
      base?.coverAv ??
      0
    ),

    armored:
      overrides?.armored ??
      base?.armored ??
      false,

    tags: [
      ...(
        overrides?.tags ??
        base?.tags ??
        []
      )
    ]
  };
}

function mergeHealth(base = {}, overrides = {}) {
  return {
    healthPerWound: Number(
      overrides?.healthPerWound ??
      base?.healthPerWound ??
      10
    ),

    currentHealth: Number(
      overrides?.currentHealth ??
      base?.currentHealth ??
      10
    ),

    maximumWounds: Number(
      overrides?.maximumWounds ??
      base?.maximumWounds ??
      1
    ),

    woundsRemaining: Number(
      overrides?.woundsRemaining ??
      base?.woundsRemaining ??
      1
    )
  };
}

function mergeConditions(
  base = {},
  overrides = {}
) {
  return {
    bleeding: Number(
      overrides?.bleeding ??
      base?.bleeding ??
      0
    ),

    activeTac: [
      ...(
        overrides?.activeTac ??
        base?.activeTac ??
        []
      )
    ],

    statuses: [
      ...(
        overrides?.statuses ??
        base?.statuses ??
        []
      )
    ]
  };
}

function cloneDefense(defense) {
  return mergeDefense({}, defense);
}

function cloneHealth(health) {
  return mergeHealth({}, health);
}

function cloneConditions(conditions) {
  return mergeConditions({}, conditions);
}

function createEntityError(
  operation,
  errors
) {
  return {
    ok: false,
    operation,
    errors
  };
}

function createValidationError(
  field,
  code,
  message
) {
  return {
    field,
    code,
    message
  };
}

function normalizeContext(context) {
  return {
    now:
      typeof context.now === "function"
        ? context.now
        : () => new Date().toISOString(),

    idFactory:
      typeof context.idFactory === "function"
        ? context.idFactory
        : createEntityId
  };
}

function createEntityId(prefix = "entity") {
  const time = Date.now().toString(36);
  const random = Math.random()
    .toString(36)
    .slice(2, 8);

  return `${prefix}_${time}_${random}`;
}

function cloneValue(value) {
  return JSON.parse(
    JSON.stringify(value ?? {}),
  );
}

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}
