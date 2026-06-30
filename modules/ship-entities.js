import { getShipEntityTemplate } from "../data/ship-entity-templates.js";
import { SHIP_TAC_CATEGORIES } from "../data/ship-tac/categories.js";
import { getShipClass } from "../data/ship-classes.js";

function createId(prefix = "ship") {
  if (globalThis.crypto?.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function defaultSystems() {
  return Object.fromEntries(
    SHIP_TAC_CATEGORIES.map((entry) => [
      entry.id,
      {
        condition: "operational",
        lastSeverity: null,
        locations: {},
      },
    ])
  );
}

export function createShipEntity(input = {}) {
  const classId = Number(input.scale?.classId ?? input.classId ?? 1);
  const shipClass = getShipClass(classId);
  const maximumHull = Math.max(0, Number(input.scale?.maximumHull ?? input.maximumHull ?? shipClass.hullRange?.[0] ?? 1));
  const currentHull = Math.max(0, Math.min(maximumHull, Number(input.scale?.currentHull ?? input.currentHull ?? maximumHull)));

  return {
    id: input.id ?? createId(),
    label: String(input.label ?? "Unnamed Ship").trim() || "Unnamed Ship",
    identity: {
      registry: input.identity?.registry ?? "",
      makeModel: input.identity?.makeModel ?? "",
      classType: input.identity?.classType ?? `${shipClass.label} ${shipClass.name}`,
      templateId: input.identity?.templateId ?? null,
      family: input.identity?.family ?? "custom",
      ownership: input.identity?.ownership ?? "",
      role: input.identity?.role ?? "",
      baseChassis: input.identity?.baseChassis ?? "",
      identityLine: input.identity?.identityLine ?? "",
      sourceType: input.identity?.sourceType ?? "custom",
    },
    stats: {
      thrusters: Number(input.stats?.thrusters ?? 25),
      battle: Number(input.stats?.battle ?? 20),
      systems: Number(input.stats?.systems ?? 25),
    },
    scale: {
      classId,
      damageModel: shipClass.damageModel,
      protectionRating: Math.max(0, Number(input.scale?.protectionRating ?? input.protectionRating ?? shipClass.prRange?.[0] ?? 0)),
      currentHull,
      maximumHull,
      currentMegadamage: Math.max(0, Number(input.scale?.currentMegadamage ?? input.currentMegadamage ?? 0)),
      weaponSizeLimit: Number(input.scale?.weaponSizeLimit ?? shipClass.weaponSizeRange?.[1] ?? 1),
      hardpoints: Number(input.scale?.hardpoints ?? shipClass.hardpointRange?.[0] ?? 0),
    },
    systems: {
      ...defaultSystems(),
      ...(input.systems ?? {}),
    },
    activeTac: Array.isArray(input.activeTac) ? input.activeTac : [],
    activeHazards: Array.isArray(input.activeHazards) ? input.activeHazards : [],
    loadout: {
      defaultWeapons: Array.isArray(input.loadout?.defaultWeapons) ? input.loadout.defaultWeapons : [],
    },
    operations: {
      crewScale: input.operations?.crewScale ?? "",
      damageControlBias: input.operations?.damageControlBias ?? "",
      escapeCapacity: input.operations?.escapeCapacity ?? "",
      disablementProfile: input.operations?.disablementProfile ?? "",
    },
    tags: Array.isArray(input.tags) ? input.tags : [],
    notes: input.notes ?? "",
    createdAt: input.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getShipEntity(ships, id) {
  return ships.find((entry) => entry.id === id) ?? null;
}

export function replaceShipEntity(ships, ship) {
  return ships.map((entry) => entry.id === ship.id ? ship : entry);
}

export function removeShipEntity(ships, id) {
  return ships.filter((entry) => entry.id !== id);
}

export function duplicateShipEntity(ship) {
  return createShipEntity({
    ...ship,
    id: null,
    label: `${ship.label} Copy`,
    createdAt: null,
  });
}

export function applyShipCombatResult(ship, result, choice = "hull") {
  if (!ship || !result?.preview) return ship;

  let hullLoss = Number(result.effect?.hullLoss ?? 0);
  let pendingShipTac = result.handoffs?.shipTac ?? null;

  // Solid results apply both 1 Hull and Minor Ship TAC.
  // The choice argument is retained for backward compatibility with older saved results.

  return {
    ...ship,
    scale: {
      ...ship.scale,
      currentHull: Math.max(0, ship.scale.currentHull - hullLoss),
      currentMegadamage:
        result.preview.megadamageAfter
        ?? ship.scale.currentMegadamage,
    },
    pendingShipTac,
    updatedAt: new Date().toISOString(),
  };
}

export function applyShipTacResult(ship, result) {
  if (!ship || !result?.preview || result.redirected) return ship;

  const categoryId = result.preview.categoryId;
  const locationId = result.preview.locationId;
  const currentCategory = ship.systems?.[categoryId] ?? {
    condition: "operational",
    lastSeverity: null,
    locations: {},
  };

  const activeHazards = [
    ...(ship.activeHazards ?? []),
    ...(result.handoffs?.hazards ?? []),
  ];

  return {
    ...ship,
    systems: {
      ...ship.systems,
      [categoryId]: {
        ...currentCategory,
        condition: result.preview.conditionAfter,
        lastSeverity: result.severity,
        locations: {
          ...(currentCategory.locations ?? {}),
          [locationId]: {
            condition: result.preview.conditionAfter,
            lastSeverity: result.severity,
            label: result.location.label,
          },
        },
      },
    },
    activeTac: [
      ...(ship.activeTac ?? []),
      result.preview.activeTacEntry,
    ],
    activeHazards,
    updatedAt: new Date().toISOString(),
  };
}

export function countUnresolvedSevereShipTac(ship) {
  return (ship.activeTac ?? []).filter(
    (entry) =>
      entry.resolved !== true
      && ["severe", "broken"].includes(entry.severity)
  ).length;
}

export function createShipEntityFromTemplate(templateId, overrides = {}) {
  const template = getShipEntityTemplate(templateId);
  if (!template) {
    throw new RangeError(`Unknown ship entity template: ${templateId}`);
  }

  return createShipEntity({
    ...template,
    ...overrides,
    label: overrides.label ?? template.label,
    identity: {
      templateId: template.id,
      family: template.family,
      ownership: template.ownership,
      role: template.role,
      baseChassis: template.baseChassis,
      identityLine: template.identityLine,
      sourceType: template.sourceType,
      makeModel: template.label,
      ...(overrides.identity ?? {}),
    },
    stats: { ...template.stats, ...(overrides.stats ?? {}) },
    scale: { ...template.scale, ...(overrides.scale ?? {}) },
    loadout: {
      defaultWeapons: template.defaultWeapons,
      ...(overrides.loadout ?? {}),
    },
    operations: {
      crewScale: template.crewScale,
      damageControlBias: template.damageControlBias,
      escapeCapacity: template.escapeCapacity,
      disablementProfile: template.disablementProfile,
      ...(overrides.operations ?? {}),
    },
    tags: overrides.tags ?? template.tags,
  });
}
