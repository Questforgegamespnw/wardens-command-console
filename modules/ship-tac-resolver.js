import { SHIP_TAC_CATEGORIES, getShipTacCategory } from "../data/ship-tac/categories.js";
import { listShipTacLocations, getShipTacLocation } from "../data/ship-tac/locations.js";
import { getShipTacOutcomes } from "../data/ship-tac/outcomes.js";
import {
  escalateShipTacSeverity,
  getNextShipCondition,
  getShipCrisisState,
} from "../data/ship-tac/conditions.js";

function randomItem(entries, forcedRoll = null) {
  if (!entries.length) throw new RangeError("No Ship TAC entries available.");
  const roll = forcedRoll == null
    ? Math.floor(Math.random() * entries.length)
    : Math.max(0, Number(forcedRoll) - 1) % entries.length;
  return entries[roll];
}

export function resolveShipTac(input = {}) {
  const requestedSeverity = input.severity ?? "minor";
  const existingCondition = input.existingCondition ?? "operational";

  const escalation = escalateShipTacSeverity(
    requestedSeverity,
    existingCondition,
  );

  if (escalation.redirected) {
    return {
      ok: true,
      redirected: true,
      severity: requestedSeverity,
      ruling: "The selected system is already Destroyed. Redirect this hit to a connected system, compartment, Hull, or Megadamage.",
      handoffs: {
        megadamageRecommended: true,
      },
    };
  }

  let category;
  if (input.categoryMode === "preferred" || input.categoryMode === "forced") {
    category = getShipTacCategory(input.preferredCategory);
  } else {
    category = randomItem(SHIP_TAC_CATEGORIES, input.forcedCategoryRoll);
  }

  const locations = listShipTacLocations(category.id);
  let location;

  if (
    (input.locationMode === "preferred" || input.locationMode === "forced")
    && input.preferredLocation
  ) {
    location = getShipTacLocation(input.preferredLocation);
    if (location.category !== category.id) {
      throw new RangeError("Preferred Ship TAC location does not belong to the selected category.");
    }
  } else {
    location = randomItem(locations, input.forcedLocationRoll);
  }

  const outcomes = getShipTacOutcomes(category.id, escalation.severity);
  const outcome = randomItem(outcomes, input.forcedOutcomeRoll);

  const nextCondition = getNextShipCondition(escalation.severity);
  const beforeCount = Math.max(0, Number(input.unresolvedSevereOrBroken ?? 0) || 0);
  const addsSevere = ["severe", "broken"].includes(escalation.severity);
  const afterCount = beforeCount + (addsSevere ? 1 : 0);

  const hazardKinds = outcome.handoffs ?? [];
  const hazards = hazardKinds.map((kind) => ({
    type: kind,
    locationId: location.id,
    locationLabel: location.label,
    categoryId: category.id,
    severity: escalation.severity,
  }));

  const crew = hazardKinds.includes("crew")
    ? [{
        stationOrCompartment: location.label,
        saveRequired: true,
        woundHandoffPossible: escalation.severity === "severe",
      }]
    : [];

  return {
    ok: true,
    redirected: false,
    requestedSeverity,
    severity: escalation.severity,
    escalation,
    category,
    location,
    subsystem: {
      previousCondition: existingCondition,
      nextCondition,
      minimumSeverityApplied: escalation.minimumSeverity ?? null,
    },
    outcome,
    handoffs: {
      hazards,
      crew,
      megadamageRecommended:
        escalation.severity === "broken"
        || hazards.some((entry) => ["radiation_or_overload", "fire_or_detonation"].includes(entry.type)),
    },
    crisis: {
      unresolvedSevereCountBefore: beforeCount,
      unresolvedSevereCountAfter: afterCount,
      state: getShipCrisisState({
        classId: input.classId ?? 1,
        unresolvedSevereOrBroken: afterCount,
      }),
    },
    preview: {
      categoryId: category.id,
      locationId: location.id,
      conditionBefore: existingCondition,
      conditionAfter: nextCondition,
      activeTacEntry: {
        id: `ship_tac_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        severity: escalation.severity,
        categoryId: category.id,
        locationId: location.id,
        label: outcome.label,
        effectText: outcome.effectText,
        resolved: false,
      },
    },
  };
}
