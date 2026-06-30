/**
 * Warden Command Console
 * Canonical Character Record Schema
 *
 * Owns:
 * - character record shape
 * - fresh nested record factories
 * - stable schema enums
 * - lightweight structural helpers
 *
 * Does not own:
 * - character creation rolls
 * - Origin / Background / Career / Specialty application
 * - skill-choice validation
 * - doctrine derivation
 * - import migration
 * - session-entity projection
 * - UI rendering
 */

export const CHARACTER_SCHEMA_VERSION = 1;
export const CHARACTER_RECORD_TYPE = "character";

export const CHARACTER_CREATION_MODES = Object.freeze([
  "quick",
  "campaign",
  "imported",
  "custom",
]);

export const CHARACTER_PROFILE_LAYER_IDS = Object.freeze([
  "origin",
  "background",
  "career",
  "specialty",
]);

export const CHARACTER_STAT_IDS = Object.freeze([
  "strength",
  "speed",
  "intellect",
  "combat",
]);

export const CHARACTER_SAVE_IDS = Object.freeze([
  "sanity",
  "fear",
  "body",
]);

export const CHARACTER_SKILL_RANKS = Object.freeze([
  "untrained",
  "trained",
  "expert",
  "master",
]);

export const CHARACTER_DOCTRINE_STATES = Object.freeze([
  "available",
  "inactive",
  "suppressed",
  "custom",
]);

export const CHARACTER_MODIFIER_SOURCE_TYPES = Object.freeze([
  "origin",
  "background",
  "career",
  "specialty",
  "advancement",
  "wound",
  "ailment",
  "condition",
  "armor",
  "equipment",
  "cybermod",
  "slickware",
  "drug",
  "hazard",
  "faction",
  "custom",
]);

export const CHARACTER_DURATION_TYPES = Object.freeze([
  "instant",
  "scene",
  "rounds",
  "hours",
  "days",
  "sessions",
  "until_rest",
  "until_treated",
  "until_repaired",
  "until_trigger_resolved",
  "while_equipped",
  "while_installed",
  "while_overclocked",
  "permanent",
  "recurring",
  "custom",
]);

export const CHARACTER_WOUND_STATUSES = Object.freeze([
  "active",
  "stabilized",
  "healing",
  "resolved",
  "permanent",
]);

export const CHARACTER_TREATMENT_STATUSES = Object.freeze([
  "untreated",
  "stabilized",
  "in_treatment",
  "treated",
  "resolved",
]);

export const CHARACTER_AILMENT_CATEGORIES = Object.freeze([
  "physical",
  "medical",
  "environmental",
  "psychological",
  "neurological",
  "chemical",
  "radiological",
  "cybernetic",
  "withdrawal",
  "unknown",
]);

export const CHARACTER_VISIBILITY = Object.freeze([
  "public",
  "warden",
]);

export const CHARACTER_ITEM_TYPES = Object.freeze([
  "tool",
  "gear",
  "consumable",
  "medical",
  "ammunition",
  "document",
  "key",
  "mission_asset",
  "other",
]);

export const CHARACTER_ITEM_LOCATIONS = Object.freeze([
  "carried",
  "worn",
  "stowed",
  "ship_storage",
  "locker",
  "offsite",
  "lost",
  "unknown",
]);

export const CHARACTER_OWNERSHIP_STATUSES = Object.freeze([
  "personal",
  "employer_issued",
  "ship_issued",
  "loaned",
  "leased",
  "debt_financed",
  "stolen",
  "salvaged",
  "contested",
  "unknown",
]);

export const CHARACTER_OWNER_TYPES = Object.freeze([
  "character",
  "faction",
  "ship",
  "employer",
  "creditor",
  "contact",
  "unknown",
]);

export const CHARACTER_LEGAL_STATUSES = Object.freeze([
  "legal",
  "licensed",
  "restricted",
  "illegal",
  "stolen",
  "contested",
  "unknown",
]);

export const CHARACTER_PROCUREMENT_CHANNELS = Object.freeze([
  "civilian_retail",
  "surplus",
  "corporate_procurement",
  "military_issue",
  "contract_issue",
  "black_market",
  "salvage",
  "theft",
  "gift",
  "unknown",
]);

export const CHARACTER_DEBT_CATEGORIES = Object.freeze([
  "financial",
  "body_debt",
  "contractual",
  "legal",
  "social",
  "other",
]);

export const CHARACTER_RECORD_STATUSES = Object.freeze([
  "active",
  "inactive",
  "resolved",
  "lost",
  "destroyed",
  "unknown",
]);

export const CHARACTER_CONTACT_RELATIONSHIPS = Object.freeze([
  "contact",
  "ally",
  "rival",
  "enemy",
  "creditor",
  "employer",
  "dependent",
  "family",
  "unknown",
]);

export const CHARACTER_CONTRACT_STATUSES = Object.freeze([
  "open",
  "active",
  "completed",
  "failed",
  "breached",
  "cancelled",
  "unknown",
]);

export const CHARACTER_TRAINING_STATUSES = Object.freeze([
  "planned",
  "in_progress",
  "paused",
  "completed",
  "abandoned",
]);

export const CHARACTER_AUGMENTATION_TYPES = Object.freeze([
  "cyberware",
  "slickware",
  "hybrid",
]);

export const CHARACTER_INSTALLATION_QUALITIES = Object.freeze([
  "professional",
  "amateur",
  "field",
  "black_market",
  "unknown",
]);

export const CHARACTER_ARMOR_STATES = Object.freeze([
  "intact",
  "light",
  "moderate",
  "severe",
  "broken",
]);

export function createCharacterRecord({
  id = null,
  now = () => new Date().toISOString(),
  creationMode = "campaign",
} = {}) {
  const timestamp = now();

  return {
    schemaVersion: CHARACTER_SCHEMA_VERSION,
    recordType: CHARACTER_RECORD_TYPE,
    id,

    identity: createIdentityRecord(),
    profile: createProfileRecord(),

    stats: createStatsRecord(),
    saves: createSavesRecord(),
    generation: createCharacterGenerationRecord(),
    skills: [],
    doctrines: [],

    durability: createDurabilityRecord(),
    calm: createCalmRecord(),
    resolve: createResolveRecord(),

    armor: createArmorCollection(),
    weaponInstances: [],
    loadoutCards: [],
    inventory: [],

    augmentations: createAugmentationRecord(),
    debts: [],
    factionNotice: [],
    contacts: [],
    contracts: [],

    advancement: createAdvancementRecord(),
    provenance: createProvenanceRecord({ creationMode }),

    publicNotes: "",
    hiddenWardenData: createHiddenWardenData(),

    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createIdentityRecord() {
  return {
    name: "",
    pronouns: "",
    callsign: "",
    rank: "",
    playerName: "",

    crewName: "",
    shipName: "",
    employer: "",
    currentContract: "",

    portraitAssetId: null,
    tags: [],
  };
}

export function createProfileRecord() {
  return {
    origin: createProfileLayerRecord("origin"),
    background: createProfileLayerRecord("background"),
    career: createCareerProfileRecord(),
    specialty: createSpecialtyProfileRecord(),
  };
}

export function createProfileLayerRecord(layerId = null) {
  return {
    layerId,
    definitionId: null,
    label: "",
    benefit: "",
    limitation: "",
    hook: "",
    cost: "",
    hooks: [],
    tags: [],
    choices: {},
    overrides: {},
    custom: false,
    notes: "",
  };
}

export function createCareerProfileRecord() {
  return {
    ...createProfileLayerRecord("career"),
    obligation: "",
    traumaResponse: "",
    mode: null,
  };
}

export function createSpecialtyProfileRecord() {
  return {
    ...createProfileLayerRecord("specialty"),
    edge: "",
    limit: "",
    doctrineIds: [],
    suggestedLoadoutId: null,
  };
}

export function createCharacterGenerationRecord() {
  return {
    method: "structured",
    stats: createGenerationSection(["strength", "speed", "intellect", "combat"], 4),
    saves: createGenerationSection(["body", "fear", "sanity"], 5),
    skills: null,
    rolled: false,
  };
}

function createGenerationSection(ids, baselineDice) {
  return {
    allocations: {
      background: Object.fromEntries(ids.map((id) => [id, 0])),
      career: Object.fromEntries(ids.map((id) => [id, 0])),
      specialty: Object.fromEntries(ids.map((id) => [id, 0])),
    },
    pools: Object.fromEntries(ids.map((id) => [id, baselineDice])),
    rolls: Object.fromEntries(ids.map((id) => [id, []])),
    uncappedTotals: Object.fromEntries(ids.map((id) => [id, null])),
    cappedTotals: Object.fromEntries(ids.map((id) => [id, null])),
  };
}

export function createStatsRecord() {
  return Object.fromEntries(
    CHARACTER_STAT_IDS.map((statId) => [
      statId,
      createNumericTrackRecord(),
    ]),
  );
}

export function createSavesRecord() {
  return Object.fromEntries(
    CHARACTER_SAVE_IDS.map((saveId) => [
      saveId,
      createNumericTrackRecord(),
    ]),
  );
}

export function createNumericTrackRecord({
  base = null,
  override = null,
} = {}) {
  return {
    base,
    modifiers: [],
    override,
    notes: "",
  };
}

export function createCharacterModifier({
  id = null,
  sourceType = "custom",
  sourceId = null,
  label = "",
  value = 0,
  active = true,
  temporary = false,
  duration = null,
  notes = "",
} = {}) {
  return {
    id,
    sourceType,
    sourceId,
    label,
    value,
    active,
    temporary,
    duration:
      duration === null
        ? null
        : {
            ...createDurationRecord(),
            ...duration,
          },
    notes,
  };
}

export function createDurationRecord({
  type = "custom",
  value = null,
  unit = null,
  remaining = null,
  trigger = null,
} = {}) {
  return {
    type,
    value,
    unit,
    remaining,
    trigger,
  };
}

export function createSkillRecord({
  id = null,
  definitionId = null,
  label = "",
  familyId = null,
  rank = "untrained",
  bonus = 0,
  sources = [],
  custom = false,
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,
    familyId,
    rank,
    bonus,
    sources: sources.map((source) => ({ ...source })),
    custom,
    notes,
  };
}

export function createDoctrineRecord({
  definitionId = null,
  label = "",
  state = "available",
  pinned = false,
  requirementSnapshot = null,
  custom = false,
  notes = "",
} = {}) {
  return {
    definitionId,
    label,
    state,
    pinned,
    requirementSnapshot:
      requirementSnapshot === null
        ? {
            skillIds: [],
            equipmentTags: [],
          }
        : {
            skillIds: [
              ...(requirementSnapshot.skillIds ?? []),
            ],
            equipmentTags: [
              ...(requirementSnapshot.equipmentTags ?? []),
            ],
          },
    custom,
    notes,
  };
}

export function createDurabilityRecord() {
  return {
    health: {
      current: null,
      maximum: null,
    },

    woundCapacity: {
      currentWounds: 0,
      maximumWounds: null,
    },

    wounds: [],
    ailments: [],
    conditions: [],
  };
}

export function createWoundRecord({
  id = null,
  sequence = null,
  source = null,
  woundType = null,
  severity = null,
  label = "",
  bodyLocation = null,
  immediateEffects = [],
  persistentEffects = [],
  permanent = false,
  status = "active",
  notes = "",
} = {}) {
  return {
    id,
    sequence,
    source: createRecordReference(source),
    woundType,
    severity,
    label,
    bodyLocation,

    immediateEffects: immediateEffects.map(cloneLooseRecord),
    persistentEffects: persistentEffects.map(cloneLooseRecord),

    bleeding: {
      active: false,
      rate: 0,
      notes: "",
    },

    treatment: createTreatmentRecord({
      status: "untreated",
      mode: "until_treated",
    }),

    permanent,
    status,
    notes,
  };
}

export function createAilmentRecord({
  id = null,
  label = "",
  category = "unknown",
  severity = null,
  source = null,
  duration = null,
  triggers = [],
  effects = [],
  treatment = null,
  status = "active",
  visibility = "public",
  recurring = false,
  permanent = false,
  notes = "",
} = {}) {
  return {
    id,
    label,
    category,
    severity,
    source: createRecordReference(source),
    duration: {
      ...createDurationRecord({ type: "until_treated" }),
      ...(duration ?? {}),
    },
    triggers: triggers.map(cloneLooseRecord),
    effects: effects.map(cloneLooseRecord),
    treatment: {
      ...createTreatmentRecord({
        status: "untreated",
        mode: "progress",
      }),
      ...(treatment ?? {}),
      validApproaches: [
        ...(treatment?.validApproaches ?? []),
      ],
    },
    status,
    visibility,
    recurring,
    permanent,
    notes,
  };
}

export function createConditionRecord({
  id = null,
  definitionId = null,
  label = "",
  category = "physical",
  source = null,
  effects = [],
  duration = null,
  status = "active",
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,
    category,
    source: createRecordReference(source),
    effects: effects.map(cloneLooseRecord),
    duration: {
      ...createDurationRecord({ type: "scene" }),
      ...(duration ?? {}),
    },
    status,
    notes,
  };
}

export function createTreatmentRecord({
  status = "untreated",
  mode = "until_treated",
  progress = 0,
  target = null,
  validApproaches = [],
  treatedBy = null,
  treatedAt = null,
  notes = "",
} = {}) {
  return {
    status,
    mode,
    progress,
    target,
    validApproaches: [...validApproaches],
    treatedBy,
    treatedAt,
    notes,
  };
}

export function createCalmRecord() {
  return {
    current: null,
    baseMaximum: null,
    maximumModifiers: [],
    overrideMaximum: null,
    panicEffects: [],
    dependencies: [],
    notes: "",
  };
}

export function createResolveRecord() {
  return {
    enabled: true,
    current: 0,
    maximum: 0,
    spent: 0,
    modifiers: [],
    notes: "",
  };
}

export function createArmorCollection() {
  return {
    equippedInstanceId: null,
    instances: [],
  };
}

export function createArmorInstance({
  id = null,
  definitionId = null,
  label = "",
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,

    ownership: createOwnershipRecord(),
    procurement: createProcurementRecord(),

    defense: {
      originalAv: 0,
      currentAv: 0,
      dr: 0,
      armored: false,
    },

    condition: {
      state: "intact",
      integrity: null,
      maximumIntegrity: null,
    },

    environment: {
      sealed: false,
      oxygenCurrent: null,
      oxygenMaximum: null,
      powerCurrent: null,
      powerMaximum: null,
    },

    systems: {
      traumaDampening: {
        definitionId: null,
        maximumUses: 0,
        usesRemaining: 0,
        functioning: false,
      },
      disabledSystemIds: [],
      suppressedSystemIds: [],
    },

    tags: [],
    modifications: [],
    notes,
  };
}

export function createWeaponInstance({
  id = null,
  definitionId = null,
  label = "",
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,

    ownership: createOwnershipRecord(),
    procurement: createProcurementRecord(),
    legalStatus: "unknown",
    condition: "functional",

    ammo: {
      ammunitionDefinitionId: null,
      currentShots: null,
      maximumShots: null,
      spareUnits: 0,
      notes: "",
    },

    attachments: [],
    modifications: [],
    tags: [],
    notes,
  };
}

export function createLoadoutCard({
  id = null,
  label = "Current Loadout",
  primaryWeaponInstanceId = null,
  secondaryWeaponInstanceId = null,
  equipped = true,
  notes = "",
} = {}) {
  return {
    id,
    label,
    primaryWeaponInstanceId,
    secondaryWeaponInstanceId,
    equipped,
    notes,
  };
}

export function createInventoryItem({
  id = null,
  definitionId = null,
  label = "",
  itemType = "other",
  quantity = 1,
  unit = "item",
  location = "carried",
  readied = false,
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,
    itemType,
    quantity,
    unit,
    location,
    readied,

    ownership: createOwnershipRecord(),
    procurement: createProcurementRecord(),
    condition: "functional",

    charges: {
      current: null,
      maximum: null,
    },

    tags: [],
    notes,
  };
}

export function createOwnershipRecord({
  ownerType = "character",
  ownerId = null,
  status = "personal",
  acquiredFrom = null,
  returnRequired = false,
  returnTerms = "",
  notes = "",
} = {}) {
  return {
    ownerType,
    ownerId,
    status,
    acquiredFrom,
    returnRequired,
    returnTerms,
    notes,
  };
}

export function createProcurementRecord({
  channel = "unknown",
  accessClass = "common",
  estimatedCost = null,
  currencyBand = "credits",
  authorizationRequired = false,
  traceable = false,
  legalStatus = "unknown",
} = {}) {
  return {
    channel,
    accessClass,
    estimatedCost,
    currencyBand,
    authorizationRequired,
    traceable,
    legalStatus,
  };
}

export function createAugmentationRecord() {
  return {
    cyberware: {
      installedSlots: 0,
      slotOverride: null,
    },

    slickware: {
      slicksocketInstalled: false,
      installedSlots: 0,
      slotOverride: null,
    },

    overclockLevel: 0,
    installedMods: [],
    malfunctions: [],
  };
}

export function createInstalledMod({
  id = null,
  definitionId = null,
  label = "",
  type = "cyberware",
  slots = 1,
  status = "functional",
  installationQuality = "unknown",
  installedAt = null,
  installedBy = null,
  debtId = null,
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,
    type,
    slots,
    status,
    installationQuality,
    installedAt,
    installedBy,
    ownership: createOwnershipRecord(),
    debtId,
    malfunctionIds: [],
    tags: [],
    notes,
  };
}

export function createMalfunctionRecord({
  id = null,
  definitionId = null,
  label = "",
  band = null,
  status = "active",
  sourceModId = null,
  effects = [],
  notes = "",
} = {}) {
  return {
    id,
    definitionId,
    label,
    band,
    status,
    sourceModId,
    effects: effects.map(cloneLooseRecord),
    notes,
  };
}

export function createDebtRecord({
  id = null,
  category = "financial",
  creditorType = "faction",
  creditorId = null,
  creditorLabel = "",
  terms = "",
  collateral = "",
  defaultConsequence = "",
  status = "active",
  visibility = "public",
  notes = "",
} = {}) {
  return {
    id,
    category,
    creditorType,
    creditorId,
    creditorLabel,

    principal: {
      amount: null,
      unit: "credits",
      display: "",
    },

    terms,
    collateral,
    defaultConsequence,
    linkedRecordIds: [],
    status,
    visibility,
    notes,
  };
}

export function createFactionNoticeRecord({
  factionId = null,
  factionLabel = "",
  notice = 0,
  lastIncident = "",
  publicPosture = "",
  notes = "",
} = {}) {
  return {
    factionId,
    factionLabel,
    notice,
    lastIncident,
    openFavors: [],
    openGrudges: [],
    publicPosture,
    notes,
  };
}

export function createContactRecord({
  id = null,
  name = "",
  relationship = "contact",
  factionId = null,
  capability = "",
  leverage = "",
  status = "active",
  visibility = "public",
  notes = "",
} = {}) {
  return {
    id,
    name,
    relationship,
    factionId,
    capability,
    leverage,
    status,
    visibility,
    notes,
  };
}

export function createContractRecord({
  id = null,
  label = "",
  employerFactionId = null,
  status = "open",
  objective = "",
  compensation = "",
  notes = "",
} = {}) {
  return {
    id,
    label,
    employerFactionId,
    status,
    objective,
    compensation,
    obligations: [],
    linkedDebtIds: [],
    linkedFactionIds: [],
    notes,
  };
}

export function createAdvancementRecord() {
  return {
    level: 0,
    experience: 0,
    training: [],
    history: [],
  };
}

export function createTrainingRecord({
  id = null,
  targetType = "skill",
  targetId = null,
  status = "planned",
  progress = 0,
  target = null,
  timeRemaining = null,
  notes = "",
} = {}) {
  return {
    id,
    targetType,
    targetId,
    status,
    progress,
    target,
    timeRemaining,
    notes,
  };
}

export function createProvenanceRecord({
  creationMode = "campaign",
} = {}) {
  return {
    creationMode,
    originDefinitionId: null,
    backgroundDefinitionId: null,
    careerDefinitionId: null,
    specialtyDefinitionId: null,
    startingLoadoutTemplateId: null,

    sourceVersions: {
      characterRules: null,
      skillRegistry: null,
      equipmentLibrary: null,
    },

    importedFrom: null,
    migratedFromSchemaVersion: null,
  };
}

export function createHiddenWardenData() {
  return {
    secretCareer: null,
    secretObjective: null,
    covertActions: [],
    codewords: [],
    hiddenFactionLinks: [],
    androidDirectives: [],
    sleeperProtocols: [],
    hiddenSystems: [],
    privateNotes: "",
  };
}

export function createHiddenSystemRecord({
  id = null,
  linkedRecordType = null,
  linkedRecordId = null,
  type = null,
  controllerFactionId = null,
  active = true,
  notes = "",
} = {}) {
  return {
    id,
    linkedRecordType,
    linkedRecordId,
    type,
    controllerFactionId,
    active,
    notes,
  };
}

export function createRecordReference(reference = null) {
  return {
    type: reference?.type ?? null,
    id: reference?.id ?? null,
    label: reference?.label ?? "",
    note: reference?.note ?? "",
  };
}

export function cloneCharacterRecord(record) {
  if (typeof structuredClone === "function") {
    return structuredClone(record);
  }

  return JSON.parse(JSON.stringify(record));
}

export function touchCharacterRecord(
  record,
  now = () => new Date().toISOString(),
) {
  return {
    ...cloneCharacterRecord(record),
    updatedAt: now(),
  };
}

export function getEffectiveNumericTrackValue(track) {
  if (!track || typeof track !== "object") {
    return null;
  }

  if (isFiniteNumber(track.override)) {
    return Number(track.override);
  }

  if (!isFiniteNumber(track.base)) {
    return null;
  }

  const modifierTotal = Array.isArray(track.modifiers)
    ? track.modifiers.reduce((sum, modifier) => {
        if (
          modifier?.active !== false
          && isFiniteNumber(modifier?.value)
        ) {
          return sum + Number(modifier.value);
        }

        return sum;
      }, 0)
    : 0;

  return Number(track.base) + modifierTotal;
}

export function getEffectiveCalmMaximum(calm) {
  if (!calm || typeof calm !== "object") {
    return null;
  }

  if (isFiniteNumber(calm.overrideMaximum)) {
    return Number(calm.overrideMaximum);
  }

  if (!isFiniteNumber(calm.baseMaximum)) {
    return null;
  }

  const modifierTotal = Array.isArray(calm.maximumModifiers)
    ? calm.maximumModifiers.reduce((sum, modifier) => {
        if (
          modifier?.active !== false
          && isFiniteNumber(modifier?.value)
        ) {
          return sum + Number(modifier.value);
        }

        return sum;
      }, 0)
    : 0;

  return Math.max(0, Number(calm.baseMaximum) + modifierTotal);
}

export function getRemainingWounds(recordOrDurability) {
  const durability =
    recordOrDurability?.durability
    ?? recordOrDurability;

  const capacity = durability?.woundCapacity;

  if (
    !isFiniteNumber(capacity?.maximumWounds)
    || !isFiniteNumber(capacity?.currentWounds)
  ) {
    return null;
  }

  return Math.max(
    0,
    Number(capacity.maximumWounds)
      - Number(capacity.currentWounds),
  );
}

export function getCyberwareSlotCapacity(character) {
  const override =
    character?.augmentations?.cyberware?.slotOverride;

  if (isFiniteNumber(override)) {
    return Math.max(0, Math.floor(Number(override)));
  }

  const strength = getEffectiveNumericTrackValue(
    character?.stats?.strength,
  );

  return isFiniteNumber(strength)
    ? Math.max(0, Math.floor(Number(strength) / 10))
    : null;
}

export function getSlickwareSlotCapacity(character) {
  const slickware = character?.augmentations?.slickware;

  if (slickware?.slicksocketInstalled !== true) {
    return 0;
  }

  if (isFiniteNumber(slickware?.slotOverride)) {
    return Math.max(
      0,
      Math.floor(Number(slickware.slotOverride)),
    );
  }

  const intellect = getEffectiveNumericTrackValue(
    character?.stats?.intellect,
  );

  return isFiniteNumber(intellect)
    ? Math.max(0, Math.floor(Number(intellect) / 10))
    : null;
}

function cloneLooseRecord(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(cloneLooseRecord);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      cloneLooseRecord(entry),
    ]),
  );
}

function isFiniteNumber(value) {
  if (
    value === null
    || value === undefined
    || value === ""
    || typeof value === "boolean"
  ) {
    return false;
  }

  return Number.isFinite(Number(value));
}
