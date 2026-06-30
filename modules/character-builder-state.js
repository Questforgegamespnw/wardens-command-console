import {
  createCharacterRecord,
  cloneCharacterRecord,
  touchCharacterRecord,
} from "../data/character-record-schema.js";

import {
  getOrigin,
  getBackground,
  getCareer,
  getSpecialty,
  getSuggestedFocus,
  getAgentOverlayProfile,
  getAgentOverlayState,
  formatSpecialtyDisplayLabel,
} from "../data/character-builder-options.js";

import {
  normalizeGenerationForProfile,
  adjustGenerationAllocation,
  rollStructuredGeneration,
  applyGenerationToRecord,
  applyDurabilityFromStrength,
} from "./character-generation-rules.js";

import {
  normalizeSkillGeneration,
  setSkillSelection,
  applySkillGenerationToRecord,
} from "./character-skill-rules.js";

export const CHARACTER_BUILDER_STEPS = Object.freeze([
  Object.freeze({ id: "identity", label: "Identity" }),
  Object.freeze({ id: "origin", label: "Origin" }),
  Object.freeze({ id: "background", label: "Background" }),
  Object.freeze({ id: "career", label: "Career" }),
  Object.freeze({ id: "specialty", label: "Specialty" }),
  Object.freeze({ id: "generation", label: "Stats & Saves" }),
  Object.freeze({ id: "skills", label: "Skills" }),
  Object.freeze({ id: "agent", label: "Agent Overlay" }),
  Object.freeze({ id: "review", label: "Review" }),
]);

export function createCharacterBuilderState({
  record = null,
  creationMode = "campaign",
  now = () => new Date().toISOString(),
} = {}) {
  const character = record
    ? cloneCharacterRecord(record)
    : createCharacterRecord({ creationMode, now });

  return {
    activeStepId: "identity",
    record: initializeGenerationRecord(character),
    dirty: false,
    errors: [],
    notices: [],
  };
}

function initializeGenerationRecord(character) {
  const normalizedCore = normalizeGenerationForProfile(character);
  const normalizedSkills = normalizeSkillGeneration(character);
  const { skillGeneration: _legacySkillGeneration, ...withoutLegacy } = character;

  return applyDurabilityFromStrength({
    ...withoutLegacy,
    generation: {
      ...normalizedCore,
      skills: normalizedSkills,
    },
  });
}

export function setBuilderStep(state, stepId) {
  if (!CHARACTER_BUILDER_STEPS.some((step) => step.id === stepId)) {
    return withError(state, `Unknown builder step: ${String(stepId)}`);
  }

  return {
    ...state,
    activeStepId: stepId,
    errors: [],
  };
}

export function updateIdentityField(state, field, value) {
  if (!Object.hasOwn(state.record.identity, field)) {
    return withError(state, `Unknown identity field: ${String(field)}`);
  }

  return updateRecord(state, {
    ...state.record,
    identity: {
      ...state.record.identity,
      [field]: String(value ?? ""),
    },
  });
}

export function selectOrigin(state, originId) {
  const option = originId ? getOrigin(originId) : null;

  if (originId && !option) {
    return withError(state, `Unknown Origin: ${originId}`);
  }

  const origin = option
    ? snapshotProfileLayer("origin", option)
    : emptyProfileLayer("origin");

  const backgroundIsAllowed = option
    ? state.record.profile.background.definitionId === null
      || option.id === null
    : false;

  return updateRecord(state, {
    ...state.record,
    profile: {
      ...state.record.profile,
      origin,
      background: backgroundIsAllowed
        ? state.record.profile.background
        : emptyProfileLayer("background"),
    },
  });
}

export function selectBackground(state, backgroundId) {
  const option = backgroundId ? getBackground(backgroundId) : null;

  if (backgroundId && !option) {
    return withError(state, `Unknown Background: ${backgroundId}`);
  }

  return updateRecord(state, {
    ...state.record,
    profile: {
      ...state.record.profile,
      background: option
        ? snapshotProfileLayer("background", option)
        : emptyProfileLayer("background"),
    },
  });
}

export function selectCareer(state, careerId) {
  const option = careerId ? getCareer(careerId) : null;

  if (careerId && !option) {
    return withError(state, `Unknown Career: ${careerId}`);
  }

  const currentSpecialtyId = state.record.profile.specialty.definitionId;
  const currentSpecialty = currentSpecialtyId
    ? getSpecialty(currentSpecialtyId)
    : null;

  const specialtyStillFits = Boolean(
    option
    && currentSpecialty
    && (option.specialtyIds ?? []).includes(currentSpecialty.id),
  );

  return updateRecord(state, {
    ...state.record,
    profile: {
      ...state.record.profile,
      career: option
        ? {
            ...snapshotProfileLayer("career", option),
            obligation: "",
            traumaResponse: "",
            mode: null,
          }
        : emptyCareerLayer(),
      specialty: specialtyStillFits
        ? state.record.profile.specialty
        : emptySpecialtyLayer(),
    },
  });
}

export function selectSpecialty(state, specialtyId) {
  const option = specialtyId ? getSpecialty(specialtyId) : null;

  if (specialtyId && !option) {
    return withError(state, `Unknown Specialty: ${specialtyId}`);
  }

  const careerId = state.record.profile.career.definitionId;
  const career = careerId ? getCareer(careerId) : null;

  if (option && (!career || !(career.specialtyIds ?? []).includes(option.id))) {
    return withError(
      state,
      `${option.label} is not available for the selected Career.`,
    );
  }

  const specialty = option
    ? {
        ...snapshotProfileLayer("specialty", option),
        edge: "",
        limit: "",
        doctrineIds: [],
        suggestedLoadoutId: null,
        choices: {
          focus: null,
        },
      }
    : emptySpecialtyLayer();

  return updateRecord(state, {
    ...state.record,
    profile: {
      ...state.record.profile,
      specialty,
    },
  });
}

export function selectSpecialtyFocus(state, {
  focusId = null,
  customLabel = "",
} = {}) {
  const specialtyId = state.record.profile.specialty.definitionId;
  const specialty = specialtyId ? getSpecialty(specialtyId) : null;

  if (!specialty?.focus?.required) {
    return withError(state, "The selected Specialty does not use a Focus.");
  }

  const focusOption = focusId ? getSuggestedFocus(focusId) : null;
  const trimmedCustomLabel = String(customLabel ?? "").trim();

  if (focusId && !focusOption) {
    return withError(state, `Unknown Specialty Focus: ${focusId}`);
  }

  if (!focusOption && !trimmedCustomLabel) {
    return withError(state, "Choose a suggested Focus or enter a custom Focus.");
  }

  const focus = focusOption
    ? {
        definitionId: focusOption.id,
        label: focusOption.label,
        custom: false,
        tags: [...(focusOption.tags ?? [])],
      }
    : {
        definitionId: null,
        label: trimmedCustomLabel,
        custom: true,
        tags: [],
      };

  const displayLabel = formatSpecialtyDisplayLabel({
    specialtyId,
    focusLabel: focus.label,
  });

  return updateRecord(state, {
    ...state.record,
    profile: {
      ...state.record.profile,
      specialty: {
        ...state.record.profile.specialty,
        label: displayLabel,
        choices: {
          ...state.record.profile.specialty.choices,
          focus,
        },
      },
    },
  });
}

export function adjustBuilderGenerationAllocation(state, payload = {}) {
  try {
    const generation = adjustGenerationAllocation(state.record, payload);
    return updateRecord(state, {
      ...state.record,
      generation,
    });
  } catch (error) {
    return withError(state, error.message);
  }
}

export function rollBuilderGeneration(state) {
  try {
    const generation = rollStructuredGeneration(state.record);
    const record = applyGenerationToRecord(state.record, generation);
    return updateRecord(state, record);
  } catch (error) {
    return withError(state, error.message);
  }
}

export function resetBuilderGeneration(state) {
  const skills = state.record.generation?.skills
    ?? normalizeSkillGeneration(state.record);
  const resetCore = normalizeGenerationForProfile({
    ...state.record,
    generation: null,
  });

  return updateRecord(state, {
    ...state.record,
    generation: {
      ...resetCore,
      skills,
    },
  });
}


export function setBuilderSkillSelection(state, payload = {}) {
  try {
    const skillGeneration = setSkillSelection(state.record, payload);
    const record = applySkillGenerationToRecord(state.record, skillGeneration);
    return updateRecord(state, record);
  } catch (error) {
    return withError(state, error.message);
  }
}

export function setAgentOverlayEnabled(state, enabled) {
  return updateRecord(state, {
    ...state.record,
    hiddenWardenData: {
      ...state.record.hiddenWardenData,
      agentOverlay: enabled
        ? createAgentOverlayRecord()
        : null,
    },
  });
}

export function updateAgentOverlay(state, patch = {}) {
  const current = state.record.hiddenWardenData.agentOverlay;

  if (!current) {
    return withError(state, "Enable the Agent overlay before editing it.");
  }

  const next = { ...current };

  if (Object.hasOwn(patch, "profileId")) {
    const profile = patch.profileId
      ? getAgentOverlayProfile(patch.profileId)
      : null;

    if (patch.profileId && !profile) {
      return withError(state, `Unknown Agent profile: ${patch.profileId}`);
    }

    next.profileId = profile?.id ?? null;
    next.profileLabel = profile?.label ?? "";
  }

  if (Object.hasOwn(patch, "stateId")) {
    const overlayState = patch.stateId
      ? getAgentOverlayState(patch.stateId)
      : null;

    if (patch.stateId && !overlayState) {
      return withError(state, `Unknown Agent state: ${patch.stateId}`);
    }

    next.state = overlayState?.id ?? "dormant";
  }

  for (const field of [
    "trueAllegianceFactionId",
    "secretObjective",
    "revealTrigger",
    "notes",
  ]) {
    if (Object.hasOwn(patch, field)) {
      next[field] = String(patch[field] ?? "");
    }
  }

  return updateRecord(state, {
    ...state.record,
    hiddenWardenData: {
      ...state.record.hiddenWardenData,
      agentOverlay: next,
    },
  });
}

export function createCharacterExportEnvelope(record, {
  now = () => new Date().toISOString(),
} = {}) {
  return {
    schemaVersion: record.schemaVersion,
    recordType: "character",
    source: "warden_command_console",
    exportedAt: now(),
    record: cloneCharacterRecord(record),
  };
}

export function serializeCharacterExport(record, options = {}) {
  return JSON.stringify(
    createCharacterExportEnvelope(record, options),
    null,
    2,
  );
}

export function parseCharacterImport(text) {
  let parsed;

  try {
    parsed = JSON.parse(String(text ?? ""));
  } catch (error) {
    throw new TypeError(`Invalid JSON: ${error.message}`);
  }

  const record = parsed?.recordType === "character" && parsed?.record
    ? parsed.record
    : parsed;

  if (record?.recordType !== "character") {
    throw new TypeError("Imported JSON is not a character record.");
  }

  return cloneCharacterRecord(record);
}

export function getBuilderCompletion(state) {
  const profile = state.record.profile;
  const specialtyOption = profile.specialty.definitionId
    ? getSpecialty(profile.specialty.definitionId)
    : null;

  const focusComplete = !specialtyOption?.focus?.required
    || Boolean(profile.specialty.choices?.focus?.label);

  return {
    identity: Boolean(state.record.identity.name.trim()),
    origin: Boolean(profile.origin.definitionId),
    background: Boolean(profile.background.definitionId),
    career: Boolean(profile.career.definitionId),
    specialty: Boolean(profile.specialty.definitionId) && focusComplete,
    generation: Boolean(state.record.generation?.rolled),
    skills: Boolean(state.record.generation?.skills?.complete),
    agent: true,
    review: false,
  };
}

function createAgentOverlayRecord() {
  return {
    enabled: true,
    revealed: false,
    profileId: null,
    profileLabel: "",
    state: "dormant",
    trueAllegianceFactionId: "",
    secretObjective: "",
    covertActions: [],
    codewords: [],
    revealTrigger: "",
    notes: "",
  };
}

function snapshotProfileLayer(layerId, option) {
  return {
    ...emptyProfileLayer(layerId),
    definitionId: option.id,
    label: option.label,
    tags: [...(option.tags ?? [])],
    custom: false,
  };
}

function emptyProfileLayer(layerId) {
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

function emptyCareerLayer() {
  return {
    ...emptyProfileLayer("career"),
    obligation: "",
    traumaResponse: "",
    mode: null,
  };
}

function emptySpecialtyLayer() {
  return {
    ...emptyProfileLayer("specialty"),
    edge: "",
    limit: "",
    doctrineIds: [],
    suggestedLoadoutId: null,
  };
}

function updateRecord(state, record) {
  const profileChanged = ["origin", "background", "career", "specialty"].some(
    (layer) => state.record.profile?.[layer]?.definitionId !== record.profile?.[layer]?.definitionId,
  );

  const nextRecord = profileChanged
    ? {
        ...record,
        generation: {
          ...normalizeGenerationForProfile(record),
          rolled: false,
          skills: normalizeSkillGeneration({
            ...record,
            generation: {
              ...(record.generation ?? {}),
              skills: null,
            },
            skillGeneration: null,
          }),
        },
        skills: [],
      }
    : record;

  return {
    ...state,
    record: touchCharacterRecord(nextRecord),
    dirty: true,
    errors: [],
  };
}

function withError(state, message) {
  return {
    ...state,
    errors: [String(message)],
  };
}
