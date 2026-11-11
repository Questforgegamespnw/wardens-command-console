/**
 * Warden Command Console
 * Character gear instance and compatibility rules.
 *
 * Responsibility:
 * - turns canonical equipment definitions into character-owned instances
 * - validates starting gear source, ownership, attachment, and ammunition state
 * - updates equipment collections without rendering HTML
 *
 * Does not own:
 * - catalog definitions
 * - recommendation generation
 * - UI state or DOM behavior
 * - purchasing or credit calculations
 */

import {
  STARTING_GEAR_SOURCE_IDS,
  getPersonalEquipment,
  canInstallAttachment,
  getCompatibleAmmunition,
} from "../data/personal-equipment.js";

import {
  CHARACTER_OWNERSHIP_STATUSES,
  CHARACTER_ITEM_LOCATIONS,
  createArmorInstance,
  createWeaponInstance,
  createAttachmentInstance,
  createInventoryItem,
} from "../data/character-record-schema.js";

export const CHARACTER_GEAR_RULES_VERSION = 1;

export function createEquipmentInstanceFromDefinition(definitionOrId, {
  instanceId = null,
  quantity = 1,
  gearSource = null,
  ownershipStatus = null,
  ownerType = null,
  location = "carried",
  notes = "",
} = {}) {
  const definition = resolveDefinition(definitionOrId);
  assertStartingGearSource(gearSource);
  const ownershipDefaults = getOwnershipDefaultsForGearSource(gearSource);
  const resolvedOwnershipStatus = ownershipStatus ?? ownershipDefaults.status;
  const resolvedOwnerType = ownerType ?? ownershipDefaults.ownerType;
  assertOwnershipStatus(resolvedOwnershipStatus);
  assertLocation(location);

  if (definition.category === "weapons") {
    const instance = createWeaponInstance({
      id: instanceId,
      definitionId: definition.id,
      label: definition.label,
      gearSource,
      notes,
    });

    applyOwnershipDefaults(instance, {
      ...ownershipDefaults,
      status: resolvedOwnershipStatus,
      ownerType: resolvedOwnerType,
    });
    instance.tags = [...(definition.tags ?? [])];
    instance.attachments = createIntegratedAttachmentInstances(definition, instance.id);
    applyWeaponDefinitionDefaults(instance, definition);
    applySourceMetadataDefaults(instance, gearSource);
    return instance;
  }

  if (definition.category === "armor") {
    const instance = createArmorInstance({
      id: instanceId,
      definitionId: definition.id,
      label: definition.label,
      gearSource,
      notes,
    });

    applyOwnershipDefaults(instance, {
      ...ownershipDefaults,
      status: resolvedOwnershipStatus,
      ownerType: resolvedOwnerType,
    });
    instance.tags = [...(definition.tags ?? [])];
    applyArmorDefinitionDefaults(instance, definition);
    return instance;
  }

  const instance = createInventoryItem({
    id: instanceId,
    definitionId: definition.id,
    label: definition.label,
    itemType: inferInventoryItemType(definition),
    quantity: normalizeQuantity(quantity),
    unit: inferInventoryUnit(definition),
    location,
    gearSource,
    notes,
  });

  applyOwnershipDefaults(instance, {
    ...ownershipDefaults,
    status: resolvedOwnershipStatus,
    ownerType: resolvedOwnerType,
  });
  instance.tags = [...(definition.tags ?? [])];
  applySourceMetadataDefaults(instance, gearSource);
  return instance;
}

export function installAttachmentOnWeapon(weaponInstance, attachmentDefinitionOrId, {
  instanceId = null,
  notes = "",
} = {}) {
  const next = structuredClone(weaponInstance);
  const weaponDefinition = requireWeaponDefinition(next.definitionId);
  const attachment = resolveDefinition(attachmentDefinitionOrId);
  const installedIds = (next.attachments ?? [])
    .filter((entry) => entry.intrinsic !== true)
    .map((entry) => entry.definitionId)
    .filter(Boolean);

  const compatibility = canInstallAttachment(
    weaponDefinition,
    attachment,
    installedIds,
  );

  if (!compatibility.allowed) {
    throw new Error(compatibility.reason);
  }

  next.attachments ??= [];
  next.attachments.push(createAttachmentInstance({
    id: instanceId,
    definitionId: attachment.id,
    label: attachment.label,
    slot: attachment.profile?.compatibility?.requiredSlot
      ?? attachment.profile?.slot
      ?? null,
    integrated: false,
    intrinsic: false,
    removable: true,
    notes,
  }));

  return next;
}

export function removeAttachmentFromWeapon(weaponInstance, attachmentInstanceId) {
  const next = structuredClone(weaponInstance);
  const target = (next.attachments ?? []).find((entry) => entry.id === attachmentInstanceId);

  if (!target) {
    throw new Error(`Unknown attachment instance: ${String(attachmentInstanceId)}`);
  }
  if (target.intrinsic === true || target.removable === false) {
    throw new Error(`${target.label || "This attachment"} cannot be removed.`);
  }

  next.attachments = next.attachments.filter((entry) => entry.id !== attachmentInstanceId);
  return next;
}

export function setWeaponAmmunition(weaponInstance, ammunitionDefinitionOrId, {
  currentShots = null,
  maximumShots = null,
  spareUnits = 0,
  notes = "",
} = {}) {
  const next = structuredClone(weaponInstance);
  const weaponDefinition = requireWeaponDefinition(next.definitionId);
  const ammunition = resolveDefinition(ammunitionDefinitionOrId);

  if (ammunition.category !== "ammunition") {
    throw new Error(`${ammunition.label} is not ammunition.`);
  }

  const compatibleIds = new Set(
    getCompatibleAmmunition(weaponDefinition).map((entry) => entry.id),
  );

  if (!compatibleIds.has(ammunition.id)) {
    throw new Error(`${ammunition.label} is not compatible with ${weaponDefinition.label}.`);
  }

  next.ammo = {
    ammunitionDefinitionId: ammunition.id,
    currentShots: normalizeNullableCount(currentShots),
    maximumShots: normalizeNullableCount(maximumShots),
    spareUnits: normalizeCount(spareUnits),
    notes: String(notes ?? ""),
  };

  return next;
}

export function clearWeaponAmmunition(weaponInstance) {
  const next = structuredClone(weaponInstance);
  next.ammo = {
    ammunitionDefinitionId: null,
    currentShots: null,
    maximumShots: null,
    spareUnits: 0,
    notes: "",
  };
  return next;
}

export function validateCharacterEquipment(record) {
  const errors = [];
  const seenInstanceIds = new Set();

  validateCollection(record?.inventory, "inventory", errors, seenInstanceIds);
  validateCollection(record?.weaponInstances, "weapon", errors, seenInstanceIds);
  validateCollection(record?.armor?.instances, "armor", errors, seenInstanceIds);

  for (const weapon of record?.weaponInstances ?? []) {
    validateWeaponInstance(weapon, errors);
  }

  const equippedArmorId = record?.armor?.equippedInstanceId ?? null;
  if (
    equippedArmorId
    && !(record?.armor?.instances ?? []).some((entry) => entry.id === equippedArmorId)
  ) {
    errors.push(`Equipped armor instance does not exist: ${equippedArmorId}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateWeaponInstance(weaponInstance, errors = []) {
  const definition = getPersonalEquipment(weaponInstance?.definitionId);
  if (!definition || definition.category !== "weapons") {
    errors.push(`Weapon instance references an unknown weapon: ${weaponInstance?.definitionId ?? "null"}`);
    return errors;
  }

  const occupiedSlots = new Map();
  for (const attachment of weaponInstance.attachments ?? []) {
    if (attachment.intrinsic === true) continue;

    const attachmentDefinition = getPersonalEquipment(attachment.definitionId);
    if (!attachmentDefinition || attachmentDefinition.category !== "attachments") {
      errors.push(`${weaponInstance.label || definition.label} references an unknown attachment: ${attachment.definitionId ?? "null"}`);
      continue;
    }

    const slot = attachment.slot
      ?? attachmentDefinition.profile?.compatibility?.requiredSlot
      ?? attachmentDefinition.profile?.slot
      ?? null;

    if (!slot) {
      errors.push(`${attachmentDefinition.label} has no attachment slot.`);
      continue;
    }

    if (occupiedSlots.has(slot)) {
      errors.push(`${weaponInstance.label || definition.label} has multiple attachments in its ${slot} slot.`);
    } else {
      occupiedSlots.set(slot, attachmentDefinition.id);
    }
  }

  const ammunitionId = weaponInstance?.ammo?.ammunitionDefinitionId ?? null;
  if (ammunitionId) {
    const compatibleIds = new Set(getCompatibleAmmunition(definition).map((entry) => entry.id));
    if (!compatibleIds.has(ammunitionId)) {
      errors.push(`${weaponInstance.label || definition.label} uses incompatible ammunition: ${ammunitionId}`);
    }
  }

  return errors;
}

export function changeEquipmentSource(instance, gearSource) {
  assertStartingGearSource(gearSource);
  const next = structuredClone(instance);
  next.gearSource = gearSource;
  applyOwnershipDefaults(next, getOwnershipDefaultsForGearSource(gearSource));
  applySourceMetadataDefaults(next, gearSource);
  return next;
}

export function changeEquipmentOwnership(instance, {
  status,
  ownerType = null,
  ownerId = null,
  returnRequired = null,
} = {}) {
  assertOwnershipStatus(status);
  const next = structuredClone(instance);
  next.ownership ??= {};
  next.ownership.status = status;
  if (ownerType !== null) next.ownership.ownerType = ownerType;
  if (ownerId !== null) next.ownership.ownerId = ownerId;
  if (returnRequired !== null) next.ownership.returnRequired = Boolean(returnRequired);
  return next;
}

function validateCollection(collection, kind, errors, seenIds) {
  if (!Array.isArray(collection)) return;

  for (const instance of collection) {
    if (!instance?.id) {
      errors.push(`${kind} instance is missing an id.`);
    } else if (seenIds.has(instance.id)) {
      errors.push(`Duplicate equipment instance id: ${instance.id}`);
    } else {
      seenIds.add(instance.id);
    }

    const definition = getPersonalEquipment(instance?.definitionId);
    if (!definition) {
      errors.push(`${kind} instance references unknown equipment: ${instance?.definitionId ?? "null"}`);
    }

    if (
      instance?.gearSource !== null
      && !STARTING_GEAR_SOURCE_IDS.includes(instance.gearSource)
    ) {
      errors.push(`${kind} instance has invalid gear source: ${instance.gearSource}`);
    }

    if (!CHARACTER_OWNERSHIP_STATUSES.includes(instance?.ownership?.status ?? "unknown")) {
      errors.push(`${kind} instance has invalid ownership status: ${instance?.ownership?.status}`);
    }
  }
}

function createIntegratedAttachmentInstances(weaponDefinition, weaponInstanceId) {
  return (weaponDefinition.profile?.integratedAttachments ?? []).map((entry, index) => {
    const definition = getPersonalEquipment(entry.attachmentId ?? entry.definitionId ?? entry.id);
    const definitionId = definition?.id ?? entry.attachmentId ?? entry.definitionId ?? null;
    const stableSuffix = definitionId ?? `attachment_${index + 1}`;
    return createAttachmentInstance({
      id: weaponInstanceId
        ? `${weaponInstanceId}_integrated_${stableSuffix}`
        : `integrated_${weaponDefinition.id}_${stableSuffix}_${index + 1}`,
      definitionId,
      label: definition?.label ?? entry.label ?? "Integrated Attachment",
      slot: entry.slot ?? definition?.profile?.slot ?? null,
      integrated: true,
      intrinsic: false,
      removable: entry.removable !== false,
    });
  });
}

function applyWeaponDefinitionDefaults(instance, definition) {
  const capacity = definition.profile?.capacity ?? definition.profile?.ammoCapacity ?? null;
  if (Number.isFinite(Number(capacity))) {
    instance.ammo.maximumShots = Number(capacity);
    instance.ammo.currentShots = Number(capacity);
  }
}

function applyArmorDefinitionDefaults(instance, definition) {
  const profile = definition.profile ?? {};
  const tags = new Set((definition.tags ?? []).map(normalizeTag));
  const av = profile.av ?? profile.armorValue ?? 0;

  instance.defense.originalAv = Number(av) || 0;
  instance.defense.currentAv = Number(av) || 0;
  instance.defense.dr = Number(profile.dr ?? 0) || 0;
  instance.defense.armored =
    profile.armored === true
    || tags.has("armored");

  instance.environment.sealed =
    profile.sealed === true
    || tags.has("sealed");

  const oxygenMaximum = firstFiniteNumber(
    profile.oxygenMaximum,
    profile.oxygenCapacity,
    profile.oxygenHours,
  );
  if (oxygenMaximum !== null) {
    instance.environment.oxygenMaximum = oxygenMaximum;
    instance.environment.oxygenCurrent = oxygenMaximum;
  }

  const powerMaximum = firstFiniteNumber(
    profile.powerMaximum,
    profile.powerCapacity,
    profile.powerUnits,
  );
  if (powerMaximum !== null) {
    instance.environment.powerMaximum = powerMaximum;
    instance.environment.powerCurrent = powerMaximum;
  }

  if (profile.traumaDampening === true || tags.has("trauma dampening")) {
    const maximumUses = Math.max(
      1,
      firstFiniteNumber(
        profile.traumaDampeningUses,
        profile.traumaDampeningMaximumUses,
      ) ?? 1,
    );
    instance.systems.traumaDampening = {
      definitionId: profile.traumaDampeningDefinitionId ?? "trauma_dampening",
      maximumUses,
      usesRemaining: maximumUses,
      functioning: true,
    };
  }

  applySourceMetadataDefaults(instance, instance.gearSource);
}

export function getOwnershipDefaultsForGearSource(gearSource) {
  switch (gearSource) {
    case "employer_issued":
      return {
        status: "employer_issued",
        ownerType: "employer",
        returnRequired: true,
      };
    case "ship_issued":
      return {
        status: "ship_issued",
        ownerType: "ship",
        returnRequired: true,
      };
    case "debt_financed":
      return {
        status: "debt_financed",
        ownerType: "creditor",
        returnRequired: false,
      };
    default:
      return {
        status: "personal",
        ownerType: "character",
        returnRequired: false,
      };
  }
}

function applyOwnershipDefaults(instance, defaults) {
  instance.ownership ??= {};
  instance.ownership.status = defaults.status;
  instance.ownership.ownerType = defaults.ownerType;
  instance.ownership.returnRequired = Boolean(defaults.returnRequired);
}

function applySourceMetadataDefaults(instance, gearSource) {
  instance.procurement ??= {};
  if (gearSource === "restricted_item") {
    instance.procurement.authorizationRequired = true;
    instance.procurement.legalStatus = "restricted";
    if ("legalStatus" in instance) instance.legalStatus = "restricted";
  }
}

function normalizeTag(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function firstFiniteNumber(...values) {
  for (const value of values) {
    if (value === null || value === undefined || value === "") continue;
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function inferInventoryItemType(definition) {
  if (definition.category === "ammunition") return "ammunition";
  if (definition.category === "medical_survival") return "medical";
  if (definition.category === "personal_effects" || definition.category === "patches") return "gear";
  if (definition.category === "tools" || definition.category === "sensors_communications") return "tool";
  if (definition.category === "security_tactical" || definition.category === "shields") return "gear";
  if (definition.category === "attachments") return "gear";
  return "other";
}

function inferInventoryUnit(definition) {
  if (definition.category === "ammunition") return "unit";
  if (definition.subcategory?.includes("dose")) return "dose";
  if (definition.subcategory?.includes("ration")) return "ration";
  return "item";
}

function resolveDefinition(definitionOrId) {
  const definition = typeof definitionOrId === "string"
    ? getPersonalEquipment(definitionOrId)
    : definitionOrId;

  if (!definition?.id) {
    throw new Error(`Unknown equipment definition: ${String(definitionOrId)}`);
  }
  return definition;
}

function requireWeaponDefinition(id) {
  const definition = getPersonalEquipment(id);
  if (!definition || definition.category !== "weapons") {
    throw new Error(`Unknown weapon definition: ${String(id)}`);
  }
  return definition;
}

function assertStartingGearSource(value) {
  if (value === null) return;
  if (!STARTING_GEAR_SOURCE_IDS.includes(value)) {
    throw new Error(`Unknown starting gear source: ${String(value)}`);
  }
}

function assertOwnershipStatus(value) {
  if (!CHARACTER_OWNERSHIP_STATUSES.includes(value)) {
    throw new Error(`Unknown ownership status: ${String(value)}`);
  }
}

function assertLocation(value) {
  if (!CHARACTER_ITEM_LOCATIONS.includes(value)) {
    throw new Error(`Unknown equipment location: ${String(value)}`);
  }
}

function normalizeQuantity(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 1;
}

function normalizeCount(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : 0;
}

function normalizeNullableCount(value) {
  if (value === null || value === undefined || value === "") return null;
  return normalizeCount(value);
}
