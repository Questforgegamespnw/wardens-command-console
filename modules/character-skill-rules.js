import {
  getSkillDefinition,
  getBackgroundSkillPackage,
  getCareerSkillPackage,
  getSpecialtySkillPackage,
} from "../data/character-skill-options.js";

const LAYERS = Object.freeze(["background", "career", "specialty"]);

export function createEmptySkillGeneration(record) {
  return {
    profileKey: buildSkillProfileKey(record),
    selections: {
      background: {},
      career: {},
      specialty: {},
    },
    resolvedSkills: [],
    replacementGroups: {
      background: [],
      career: [],
      specialty: [],
    },
    complete: false,
  };
}

export function normalizeSkillGeneration(record) {
  const key = buildSkillProfileKey(record);
  // Read the canonical nested location first. The root-level field is a
  // temporary backward-compatibility bridge for early shell exports.
  const current = record.generation?.skills ?? record.skillGeneration;

  if (!current || current.profileKey !== key) {
    return resolveSkillGeneration(record, createEmptySkillGeneration(record));
  }

  return resolveSkillGeneration(record, {
    ...current,
    selections: {
      background: { ...(current.selections?.background ?? {}) },
      career: { ...(current.selections?.career ?? {}) },
      specialty: { ...(current.selections?.specialty ?? {}) },
    },
  });
}

export function setSkillSelection(record, {
  layer,
  groupId,
  index,
  skillId,
} = {}) {
  if (!LAYERS.includes(layer)) {
    throw new TypeError(`Unknown skill layer: ${String(layer)}`);
  }

  const next = normalizeSkillGeneration(record);
  const slotIndex = Number(index);

  if (!Number.isInteger(slotIndex) || slotIndex < 0) {
    throw new TypeError("Skill selection index must be a non-negative integer.");
  }

  const packageData = getPackageForLayer(record, layer);
  const groups = getRenderableGroups(next, packageData, layer);
  const group = groups.find((entry) => entry.id === groupId);

  if (!group) {
    throw new TypeError(`Unknown ${layer} skill group: ${String(groupId)}`);
  }

  if (slotIndex >= group.count) {
    throw new RangeError(`Selection index ${slotIndex} is outside ${group.label}.`);
  }

  if (skillId && !group.skillIds.includes(skillId)) {
    throw new TypeError(`${skillId} is not valid for ${group.label}.`);
  }

  const layerSelections = { ...(next.selections[layer] ?? {}) };
  const values = Array.from({ length: group.count }, (_, itemIndex) => (
    layerSelections[groupId]?.[itemIndex] ?? null
  ));
  values[slotIndex] = skillId || null;
  layerSelections[groupId] = values;

  return resolveSkillGeneration(record, {
    ...next,
    selections: {
      ...next.selections,
      [layer]: layerSelections,
    },
  });
}

export function applySkillGenerationToRecord(record, skillGeneration) {
  const normalized = resolveSkillGeneration(record, skillGeneration);

  const { skillGeneration: _legacySkillGeneration, ...recordWithoutLegacy } = record;

  return {
    ...recordWithoutLegacy,
    generation: {
      ...(record.generation ?? {}),
      skills: normalized,
    },
    skills: normalized.resolvedSkills.map((entry) => ({
      definitionId: entry.definitionId,
      label: entry.label,
      tier: entry.tier,
      bonus: entry.bonus,
      branch: entry.branch,
      sources: entry.sources.map((source) => ({ ...source })),
      notes: "",
    })),
  };
}

export function getSkillPackageView(record, skillGeneration, layer) {
  const normalized = resolveSkillGeneration(record, skillGeneration);
  const packageData = getPackageForLayer(record, layer);
  if (!packageData) return null;

  return {
    fixedSkills: packageData.fixedSkillIds
      .map((id) => getSkillDefinition(id))
      .filter(Boolean),
    groups: getRenderableGroups(normalized, packageData, layer),
    selections: normalized.selections[layer] ?? {},
  };
}

function resolveSkillGeneration(record, generation) {
  const next = {
    profileKey: buildSkillProfileKey(record),
    selections: {
      background: { ...(generation.selections?.background ?? {}) },
      career: { ...(generation.selections?.career ?? {}) },
      specialty: { ...(generation.selections?.specialty ?? {}) },
    },
    replacementGroups: {
      background: [],
      career: [],
      specialty: [],
    },
    resolvedSkills: [],
    complete: false,
  };

  const owned = new Map();
  let complete = true;

  for (const layer of LAYERS) {
    const packageData = getPackageForLayer(record, layer);
    if (!packageData) {
      complete = false;
      continue;
    }

    let duplicateFixedCount = 0;

    for (const skillId of packageData.fixedSkillIds) {
      if (owned.has(skillId)) {
        duplicateFixedCount += 1;
      } else {
        addOwnedSkill(owned, skillId, layer, "fixed");
      }
    }

    next.replacementGroups[layer] = Array.from(
      { length: duplicateFixedCount },
      (_, index) => ({
        id: `replacement_${index}`,
        label: "Choose a replacement for a duplicate fixed skill",
        count: 1,
        skillIds: packageData.replacementSkillIds,
        replacement: true,
      }),
    );

    const groups = getRenderableGroups(next, packageData, layer);

    for (const group of groups) {
      const values = Array.from({ length: group.count }, (_, index) => (
        next.selections[layer]?.[group.id]?.[index] ?? null
      ));

      next.selections[layer][group.id] = values;

      for (let index = 0; index < group.count; index += 1) {
        const skillId = values[index];
        if (!skillId) {
          complete = false;
          continue;
        }

        if (!group.skillIds.includes(skillId)) {
          values[index] = null;
          complete = false;
          continue;
        }

        if (owned.has(skillId)) {
          complete = false;
          continue;
        }

        addOwnedSkill(owned, skillId, layer, group.id);
      }
    }
  }

  next.resolvedSkills = [...owned.values()];
  next.complete = complete;
  return next;
}

function getRenderableGroups(generation, packageData, layer) {
  return [
    ...packageData.choiceGroups,
    ...(generation.replacementGroups?.[layer] ?? []),
  ];
}

function addOwnedSkill(owned, skillId, layer, sourceType) {
  const definition = getSkillDefinition(skillId);
  if (!definition) return;

  owned.set(skillId, {
    definitionId: definition.id,
    label: definition.label,
    tier: definition.tier,
    bonus: definition.bonus,
    branch: definition.branch,
    sources: [{ type: layer, id: sourceType }],
  });
}

function getPackageForLayer(record, layer) {
  if (layer === "background") {
    return getBackgroundSkillPackage(record.profile.background.definitionId);
  }

  if (layer === "career") {
    return getCareerSkillPackage(record.profile.career.definitionId);
  }

  const focusId = record.profile.specialty.choices?.focus?.definitionId ?? null;
  return getSpecialtySkillPackage(record.profile.specialty.definitionId, { focusId });
}

function buildSkillProfileKey(record) {
  return [
    record.profile.origin.definitionId ?? "",
    record.profile.background.definitionId ?? "",
    record.profile.career.definitionId ?? "",
    record.profile.specialty.definitionId ?? "",
    record.profile.specialty.choices?.focus?.definitionId ?? "",
    record.profile.specialty.choices?.focus?.label ?? "",
  ].join("|");
}
