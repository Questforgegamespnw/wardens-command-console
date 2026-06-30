import {
  CHARACTER_STAT_GENERATION,
  CHARACTER_SAVE_GENERATION,
  getBackgroundGenerationEligibility,
  getCareerGenerationEligibility,
  getSpecialtyGenerationEligibility,
} from "../data/character-builder-options.js";

export const STAT_IDS = Object.freeze(["strength", "speed", "intellect", "combat"]);
export const SAVE_IDS = Object.freeze(["body", "fear", "sanity"]);
export const GENERATION_LAYERS = Object.freeze(["background", "career", "specialty"]);

export const CHARACTER_DURABILITY_RULES = Object.freeze({
  healthMaximum: 15,
  woundDivisor: 10,
  woundMaximum: 5,
});

export function createStructuredGenerationSnapshot(record) {
  const stats = buildSection(STAT_IDS, CHARACTER_STAT_GENERATION.baselineDice);
  const saves = buildSection(SAVE_IDS, CHARACTER_SAVE_GENERATION.baselineDice);

  return {
    method: "structured",
    stats,
    saves,
    rolled: false,
    eligibility: getGenerationEligibility(record),
  };
}

export function getGenerationEligibility(record) {
  const backgroundId = record?.profile?.background?.definitionId ?? null;
  const careerId = record?.profile?.career?.definitionId ?? null;
  const specialtyId = record?.profile?.specialty?.definitionId ?? null;

  return {
    background: getBackgroundGenerationEligibility(backgroundId),
    career: getCareerGenerationEligibility(careerId),
    specialty: getSpecialtyGenerationEligibility(specialtyId),
  };
}

export function normalizeGenerationForProfile(record) {
  const current = record.generation?.method === "structured"
    ? structuredClone(record.generation)
    : createStructuredGenerationSnapshot(record);

  current.eligibility = getGenerationEligibility(record);
  current.stats = normalizeSection({
    section: current.stats,
    ids: STAT_IDS,
    baselineDice: CHARACTER_STAT_GENERATION.baselineDice,
    rules: CHARACTER_STAT_GENERATION,
    eligibility: current.eligibility,
    isSave: false,
  });
  current.saves = normalizeSection({
    section: current.saves,
    ids: SAVE_IDS,
    baselineDice: CHARACTER_SAVE_GENERATION.baselineDice,
    rules: CHARACTER_SAVE_GENERATION,
    eligibility: current.eligibility,
    isSave: true,
  });
  current.rolled = Boolean(current.rolled);
  return current;
}

export function adjustGenerationAllocation(record, {
  section,
  layer,
  id,
  delta,
} = {}) {
  if (!GENERATIONS.has(section)) {
    throw new Error(`Unknown generation section: ${String(section)}`);
  }
  if (!GENERATION_LAYERS.includes(layer)) {
    throw new Error(`Unknown generation layer: ${String(layer)}`);
  }

  const ids = section === "stats" ? STAT_IDS : SAVE_IDS;
  if (!ids.includes(id)) {
    throw new Error(`Unknown ${section} id: ${String(id)}`);
  }

  const generation = normalizeGenerationForProfile(record);
  const rules = section === "stats" ? CHARACTER_STAT_GENERATION : CHARACTER_SAVE_GENERATION;
  const eligibility = generation.eligibility[layer]?.[section] ?? [];

  if (!eligibility.includes(id)) {
    throw new Error(`${formatId(id)} is not eligible for the selected ${formatId(layer)}.`);
  }

  const allocations = generation[section].allocations[layer];
  const nextValue = Math.max(0, (allocations[id] ?? 0) + Number(delta || 0));
  const layerBudget = rules[`${layer}Dice`];

  if (nextValue > layerLimit(section, layer)) {
    throw new Error(`${formatId(layer)} cannot assign more dice to ${formatId(id)}.`);
  }

  const nextLayerTotal = sumValues({ ...allocations, [id]: nextValue });
  if (nextLayerTotal > layerBudget) {
    throw new Error(`${formatId(layer)} only provides ${layerBudget} allocation dice.`);
  }

  const projectedPool = generation[section].pools[id] - (allocations[id] ?? 0) + nextValue;
  if (projectedPool > rules.poolCap) {
    throw new Error(`${formatId(id)} cannot exceed ${rules.poolCap}d10 during generation.`);
  }

  allocations[id] = nextValue;
  generation[section] = recalculateSection(generation[section], ids, rules.baselineDice);
  generation.rolled = false;
  return generation;
}

export function validateStructuredGeneration(record) {
  const generation = normalizeGenerationForProfile(record);
  const errors = [];

  validateSection(errors, generation.stats, CHARACTER_STAT_GENERATION, "stats");
  validateSection(errors, generation.saves, CHARACTER_SAVE_GENERATION, "saves");

  return { valid: errors.length === 0, errors, generation };
}

export function rollStructuredGeneration(record, random = Math.random) {
  const validation = validateStructuredGeneration(record);
  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }

  const generation = structuredClone(validation.generation);
  rollSection(generation.stats, STAT_IDS, CHARACTER_STAT_GENERATION.scoreCap, random);
  rollSection(generation.saves, SAVE_IDS, CHARACTER_SAVE_GENERATION.scoreCap, random);
  generation.rolled = true;
  return generation;
}

export function applyGenerationToRecord(record, generation) {
  const next = structuredClone(record);
  next.generation = structuredClone(generation);

  for (const id of STAT_IDS) {
    next.stats[id].base = generation.stats.cappedTotals[id];
  }
  for (const id of SAVE_IDS) {
    next.saves[id].base = generation.saves.cappedTotals[id];
  }

  return applyDurabilityFromStrength(next, { resetCurrent: true });
}

export function calculateMaximumWounds(strength) {
  const numericStrength = Number(strength);
  if (!Number.isFinite(numericStrength)) return null;

  return Math.max(0, Math.min(
    CHARACTER_DURABILITY_RULES.woundMaximum,
    Math.floor(numericStrength / CHARACTER_DURABILITY_RULES.woundDivisor),
  ));
}

export function applyDurabilityFromStrength(record, { resetCurrent = false } = {}) {
  const next = structuredClone(record);
  const strength = next?.stats?.strength?.base;
  const maximumWounds = calculateMaximumWounds(strength);

  next.durability ??= {};
  next.durability.health ??= {};
  next.durability.woundCapacity ??= {};
  next.durability.wounds ??= [];
  next.durability.ailments ??= [];
  next.durability.conditions ??= [];

  next.durability.health.maximum = CHARACTER_DURABILITY_RULES.healthMaximum;
  next.durability.woundCapacity.maximumWounds = maximumWounds;

  if (resetCurrent || next.durability.health.current == null) {
    next.durability.health.current = CHARACTER_DURABILITY_RULES.healthMaximum;
  }

  if (resetCurrent || next.durability.woundCapacity.currentWounds == null) {
    next.durability.woundCapacity.currentWounds = 0;
  }

  return next;
}

function buildSection(ids, baselineDice) {
  return {
    allocations: Object.fromEntries(GENERATION_LAYERS.map((layer) => [
      layer,
      Object.fromEntries(ids.map((id) => [id, 0])),
    ])),
    pools: Object.fromEntries(ids.map((id) => [id, baselineDice])),
    rolls: Object.fromEntries(ids.map((id) => [id, []])),
    uncappedTotals: Object.fromEntries(ids.map((id) => [id, null])),
    cappedTotals: Object.fromEntries(ids.map((id) => [id, null])),
  };
}

function normalizeSection({ section, ids, baselineDice, rules, eligibility, isSave }) {
  const next = section ? structuredClone(section) : buildSection(ids, baselineDice);

  for (const layer of GENERATION_LAYERS) {
    next.allocations[layer] ??= Object.fromEntries(ids.map((id) => [id, 0]));
    const allowed = eligibility[layer]?.[isSave ? "saves" : "stats"] ?? [];
    for (const id of ids) {
      const value = Number(next.allocations[layer][id] ?? 0);
      next.allocations[layer][id] = allowed.includes(id) ? Math.max(0, value) : 0;
    }
  }

  return recalculateSection(next, ids, baselineDice, rules.poolCap);
}

function recalculateSection(section, ids, baselineDice, poolCap = Infinity) {
  for (const id of ids) {
    const allocated = GENERATION_LAYERS.reduce(
      (sum, layer) => sum + Number(section.allocations[layer]?.[id] ?? 0),
      0,
    );
    section.pools[id] = Math.min(poolCap, baselineDice + allocated);
    section.rolls[id] = [];
    section.uncappedTotals[id] = null;
    section.cappedTotals[id] = null;
  }
  return section;
}

function validateSection(errors, section, rules, sectionName) {
  for (const layer of GENERATION_LAYERS) {
    const expected = rules[`${layer}Dice`];
    const actual = sumValues(section.allocations[layer]);
    if (actual !== expected) {
      errors.push(`${formatId(layer)} must allocate exactly ${expected} ${sectionName === "stats" ? "Stat" : "Save"} dice.`);
    }
  }

  for (const [id, pool] of Object.entries(section.pools)) {
    if (pool > rules.poolCap) {
      errors.push(`${formatId(id)} exceeds the ${rules.poolCap}d10 generation cap.`);
    }
  }
}

function rollSection(section, ids, scoreCap, random) {
  for (const id of ids) {
    const dice = Array.from({ length: section.pools[id] }, () => 1 + Math.floor(random() * 10));
    const total = dice.reduce((sum, value) => sum + value, 0);
    section.rolls[id] = dice;
    section.uncappedTotals[id] = total;
    section.cappedTotals[id] = Math.min(scoreCap, total);
  }
}

function layerLimit(section, layer) {
  if (section === "stats" && layer === "background") return 1;
  if (section === "stats" && layer === "career") return 2;
  if (section === "stats" && layer === "specialty") return 2;
  return 1;
}

function sumValues(record) {
  return Object.values(record ?? {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

function formatId(value) {
  return String(value ?? "")
    .split("_")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

const GENERATIONS = new Set(["stats", "saves"]);
