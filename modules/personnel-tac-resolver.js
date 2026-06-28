import { getPersonnelTacSeverity } from "../data/personnel-tac.js";
import { TAC_SEVERITY_WEIGHTS, dampenTacSeverity, shiftTacSeverity } from "../data/tac-severity-bands.js";
import { worsenArmorState } from "../data/personal-armor.js";

function weightedPick(weights, roll = Math.random()) {
  const entries = Object.entries(weights);
  const total = entries.reduce((sum, [, weight]) => sum + Number(weight), 0);
  let cursor = Math.max(0, Math.min(0.999999, Number(roll))) * total;
  for (const [id, weight] of entries) {
    cursor -= Number(weight);
    if (cursor < 0) return id;
  }
  return entries.at(-1)[0];
}

export function resolvePersonnelTac({
  currentArmorState = "intact",
  breachCount = 1,
  tacDampeningActive = false,
  sealWarningActive = false,
  forcedSeverity = null,
  categoryRoll = null,
  random = Math.random,
} = {}) {
  const band = TAC_SEVERITY_WEIGHTS[Math.max(1, Math.min(3, Number(breachCount)))];
  let severity = forcedSeverity || weightedPick(band, random());

  if (tacDampeningActive) severity = dampenTacSeverity(severity);

  const severityData = getPersonnelTacSeverity(severity);
  let outcome;

  if (severity === "complete") {
    outcome = severityData.outcomes[0];
  } else {
    const roll = categoryRoll ?? (Math.floor(random() * 4) + 1);
    outcome = severityData.outcomes.find((entry) => entry.roll === Number(roll));
    if (!outcome) throw new RangeError(`Invalid TAC category roll: ${roll}`);

    if (sealWarningActive && outcome.category === "seal_life_support") {
      const upgradedSeverity = shiftTacSeverity(severity, 1);
      const upgradedData = getPersonnelTacSeverity(upgradedSeverity);
      if (upgradedSeverity === "complete") {
        severity = upgradedSeverity;
        outcome = upgradedData.outcomes[0];
      } else {
        severity = upgradedSeverity;
        outcome = upgradedData.outcomes.find((entry) => entry.roll === Number(roll));
      }
    }
  }

  return Object.freeze({
    severity,
    armorState: worsenArmorState(currentArmorState, getPersonnelTacSeverity(severity).armorState),
    outcome,
    consumedSealWarning:
      Boolean(sealWarningActive) && outcome.category === "seal_life_support",
  });
}
