/** Phase 2E: immutable, idempotent commit of already-resolved powered-suit attacks.
 * This adapter owns NO damage, TAC, wound or dampening arithmetic.
 * Records are explicit projections; an application may map these into Quick Entities.
 */
const STATES = new Set(['intact','light','moderate','severe','broken']);
const copy = value => structuredClone(value);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
function checkRecord(record, label) {
  if (!record || !nonempty(record.id)) throw new TypeError(`${label} must have a stable id`);
}
function checkCount(value, label) {
  if (!Number.isInteger(value) || value < 0) throw new RangeError(`Invalid ${label}`);
}
function ledgerFor(record) {
  const ledger = record.appliedVehiclePersonnelResolutionIds ?? [];
  if (!Array.isArray(ledger) || ledger.some(id => !nonempty(id))) throw new TypeError('Invalid resolution ledger');
  return ledger;
}
/** Build a stable commit envelope. Allocate resolutionId once when attack is resolved. */
export function createVehiclePersonnelCommit({ resolutionId, sequence, wounds, suitId, occupantId } = {}) {
  if (!nonempty(resolutionId) || !nonempty(suitId) || !nonempty(occupantId)) throw new TypeError('Stable resolution, suit and occupant IDs required');
  if (!sequence || sequence.route !== 'powered_suit_sequence' || !wounds || wounds.route !== 'powered_suit_occupant_wounds') throw new TypeError('Phase 2C and 2D results required');
  if (!STATES.has(sequence.suitStateBefore) || !STATES.has(sequence.suitStateAfter) || wounds.suitStateAfter !== sequence.suitStateAfter) throw new RangeError('Suit state mismatch');
  checkCount(wounds.woundsTakenBefore, 'woundsTakenBefore');
  checkCount(wounds.woundsTakenAfter, 'woundsTakenAfter');
  checkCount(wounds.dampeningUsesBefore, 'dampeningUsesBefore');
  checkCount(wounds.dampeningUsesAfter, 'dampeningUsesAfter');
  if (!Array.isArray(sequence.suitTacEvents) || !Array.isArray(wounds.events) || !Array.isArray(sequence.occupantEvents) || wounds.events.length !== sequence.occupantEvents.length) throw new TypeError('Event count mismatch');
  if (wounds.woundsTakenAfter - wounds.woundsTakenBefore !== wounds.events.filter(e => e.wound?.woundThresholdStillAdvances).length) throw new RangeError('Wound advancement mismatch');
  if (wounds.dampeningUsesAfter > wounds.dampeningUsesBefore) throw new RangeError('Dampening cannot gain charges');
  const beforeHealth = sequence.occupantHandoff?.healthBefore ?? null;
  const afterHealth = wounds.occupantHealthAfter;
  if (afterHealth != null && (!Number.isFinite(afterHealth) || afterHealth < 0)) throw new RangeError('Invalid occupant Health');
  if (beforeHealth != null && (!Number.isFinite(beforeHealth) || beforeHealth < 0 || afterHealth > beforeHealth)) throw new RangeError('Invalid Health transition');
  const pendingActions = wounds.events.map((event, index) => ({
    id: `${resolutionId}:wound:${index + 1}`, status: 'pending', route: 'personnel_wound_consequence',
    origin: { resolutionId, suitId, occupantId, eventIndex: index + 1 },
    details: copy({ threshold: event.threshold, category: event.category, wound: event.wound }),
  }));
  for (const [index, event] of sequence.suitTacEvents.entries()) {
    pendingActions.push({ id: `${resolutionId}:suit_tac:${index + 1}`, status: 'pending', route: 'suit_tac_consequence',
      origin: { resolutionId, suitId, occupantId, eventIndex: index + 1 },
      details: copy(event) });
  }
  return copy({ resolutionId, suitId, occupantId, suitStateBefore: sequence.suitStateBefore,
    suitStateAfter: sequence.suitStateAfter, woundsTakenBefore: wounds.woundsTakenBefore,
    woundsTakenAfter: wounds.woundsTakenAfter, dampeningUsesBefore: wounds.dampeningUsesBefore,
    dampeningUsesAfter: wounds.dampeningUsesAfter, occupantHealthBefore: beforeHealth,
    occupantHealthAfter: afterHealth, pendingActions });
}
/** Atomic projection: either both records are returned updated, or nothing is changed.
 * The caller persists BOTH records and pending actions in one transaction.
 */
export function applyVehiclePersonnelCommit({ commit, suit, occupant } = {}) {
  if (!commit || !nonempty(commit.resolutionId)) throw new TypeError('Commit envelope required');
  checkRecord(suit, 'Suit'); checkRecord(occupant, 'Occupant');
  if (suit.id !== commit.suitId || occupant.id !== commit.occupantId) throw new RangeError('Commit target identity mismatch');
  const suitLedger = ledgerFor(suit), occupantLedger = ledgerFor(occupant);
  const appliedSuit = suitLedger.includes(commit.resolutionId), appliedOccupant = occupantLedger.includes(commit.resolutionId);
  if (appliedSuit !== appliedOccupant) throw new RangeError('Partial prior commit: reconcile records before retry');
  if (appliedSuit) return { status: 'already_applied', suit: copy(suit), occupant: copy(occupant), pendingActions: [] };
  if (suit.armorState !== commit.suitStateBefore || occupant.woundsTaken !== commit.woundsTakenBefore || occupant.dampeningUsesRemaining !== commit.dampeningUsesBefore) throw new RangeError('Stale combat state: re-resolve against current records');
  if (commit.occupantHealthBefore != null && occupant.currentHealth !== commit.occupantHealthBefore) throw new RangeError('Stale occupant Health');
  if (!STATES.has(commit.suitStateAfter)) throw new RangeError('Invalid committed armor state');
  const nextSuit = copy(suit), nextOccupant = copy(occupant);
  nextSuit.armorState = commit.suitStateAfter;
  nextOccupant.woundsTaken = commit.woundsTakenAfter;
  nextOccupant.dampeningUsesRemaining = commit.dampeningUsesAfter;
  if (commit.occupantHealthAfter != null) nextOccupant.currentHealth = commit.occupantHealthAfter;
  nextSuit.appliedVehiclePersonnelResolutionIds = [...suitLedger, commit.resolutionId];
  nextOccupant.appliedVehiclePersonnelResolutionIds = [...occupantLedger, commit.resolutionId];
  return { status: 'applied', suit: nextSuit, occupant: nextOccupant, pendingActions: copy(commit.pendingActions) };
}
