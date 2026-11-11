import { chooseWeightedCategory, applyWeaponSeverityPolicy } from './vehicle-personnel-impact.js';
import { resolveWound } from './wound-resolver.js';
import { getWoundTable } from '../data/wounds/index.js';
import { WOUND_THRESHOLD_RULES } from '../data/wound-rules.js';
import { TRAUMA_DAMPENING, TRAUMA_DAMPENING_PLUS } from '../data/trauma-dampening.js';

const ORDER = Object.freeze(['light', 'moderate', 'severe', 'deadly']);
const THRESHOLDS = Object.freeze(['first', 'second', 'third']);

function roll(random) {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError('Random must return a value in [0,1)');
  return value;
}

/**
 * Phase 2D. Execute 2C occupant wound handoffs without modifying suit, occupant,
 * sequence or persistence. The wound resolver owns table outcomes and dampening.
 * Weapon severity floors are applied before threshold caps, then dampening.
 * A weapon floor never silently bypasses first/second wound restrictions.
 */
export function resolveVehiclePersonnelWounds({ sequence, occupant, dampening = null, usesRemaining = null, random = Math.random } = {}) {
  if (!sequence || sequence.route !== 'powered_suit_sequence' || !Array.isArray(sequence.occupantEvents) || !occupant) {
    throw new TypeError('Phase 2C sequence and occupant are required');
  }
  if (!Number.isInteger(occupant.woundsTaken ?? 0) || (occupant.woundsTaken ?? 0) < 0) throw new RangeError('Invalid occupant woundsTaken');
  const definition = dampening === 'standard' ? TRAUMA_DAMPENING
    : dampening === 'plus' ? TRAUMA_DAMPENING_PLUS : dampening;
  if (definition && (definition.mode !== 'charges' || !Number.isInteger(definition.maximumUses) || definition.maximumUses < 0)) {
    throw new TypeError('Expected a charge-based trauma dampening definition');
  }
  let charges = definition ? (usesRemaining ?? definition.maximumUses) : 0;
  if (!Number.isInteger(charges) || charges < 0 || (definition && charges > definition.maximumUses)) throw new RangeError('Invalid dampening usesRemaining');
  let woundsTaken = occupant.woundsTaken ?? 0;
  const events = [];
  for (const [index, pending] of sequence.occupantEvents.entries()) {
    if (pending.type !== 'personnel_wound_pending') throw new TypeError('Unrecognized occupant event');
    const threshold = THRESHOLDS[Math.min(woundsTaken, 2)];
    if (pending.threshold !== threshold) throw new RangeError(`Stale wound threshold at event ${index + 1}`);
    const category = chooseWeightedCategory(pending.categoryWeights, roll(random));
    const family = getWoundTable(category);
    if (!family) throw new RangeError(`No authored wound table for ${category}`);
    if (family.mode !== 'severity_banded') throw new RangeError(`Cannot apply weapon severity policy to compact wound table ${category}`);
    const allowed = WOUND_THRESHOLD_RULES[threshold].allowedSeverities;
    // Draw a baseline severity using the canonical wound resolver's threshold logic.
    // A separate normal-severity roll avoids rolling a narrative result prematurely.
    const baseRoll = roll(random);
    const normalSeverity = allowed[Math.min(allowed.length - 1, Math.floor(baseRoll * allowed.length))];
    const policy = pending.severityPolicy ?? { mode: 'normal' };
    const weaponSeverity = applyWeaponSeverityPolicy(normalSeverity, policy,
      policy.mode === 'weighted_minimum' ? roll(random) : null);
    const allowedMax = ORDER.indexOf(allowed.at(-1));
    const cappedSeverity = ORDER[Math.min(ORDER.indexOf(weaponSeverity), allowedMax)];
    const wound = resolveWound({
      woundType: category,
      requestedSeverity: cappedSeverity,
      threshold,
      deadlyAuthorized: threshold === 'third',
      traumaDampening: definition,
      traumaDampeningUsesRemaining: charges,
      armorFunctioning: pending.armorFunctioning === true,
      random,
    });
    charges = wound.traumaDampeningUsesAfter;
    woundsTaken += wound.woundThresholdStillAdvances ? 1 : 0;
    events.push(Object.freeze({
      index: index + 1, threshold, category,
      normalSeverity, weaponSeverity, cappedSeverity,
      wound,
      dampeningUsesAfter: charges,
      woundsTakenAfter: woundsTaken,
    }));
  }
  return Object.freeze({
    route: 'powered_suit_occupant_wounds', execution: 'pure_resolution',
    woundsTakenBefore: occupant.woundsTaken ?? 0,
    woundsTakenAfter: woundsTaken,
    dampeningUsesBefore: definition ? (usesRemaining ?? definition.maximumUses) : 0,
    dampeningUsesAfter: charges,
    events: Object.freeze(events),
    suitStateAfter: sequence.suitStateAfter,
    occupantHealthAfter: sequence.occupantHandoff?.healthAfter ?? occupant.currentHealth ?? null,
    stateChangesApplied: false,
  });
}
