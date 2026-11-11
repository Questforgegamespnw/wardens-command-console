import test from "node:test";
import assert from "node:assert/strict";
import { resolveWound } from "../modules/wound-resolver.js";
import { TRAUMA_DAMPENING, TRAUMA_DAMPENING_PLUS } from "../data/trauma-dampening.js";
import { TRAUMA_DAMPENING_RULES } from "../data/wound-rules.js";

const wound = (dampening, options = {}) => resolveWound({
  woundType: "gunshot",
  requestedSeverity: "severe",
  threshold: "third",
  traumaDampening: dampening,
  ...options,
});

test("both published config variants force Light, rather than shift", () => {
  assert.equal(TRAUMA_DAMPENING_RULES.standard, "force_light");
  assert.equal(TRAUMA_DAMPENING_RULES.plus, "force_light");
  assert.equal(TRAUMA_DAMPENING.maximumUses, 1);
  assert.equal(TRAUMA_DAMPENING_PLUS.maximumUses, 2);
});

test("standard forces severe to Light and consumes its single use", () => {
  const result = wound(TRAUMA_DAMPENING);
  assert.equal(result.originalSeverity, "severe");
  assert.equal(result.severity, "light");
  assert.equal(result.traumaDampeningUseConsumed, true);
  assert.equal(result.traumaDampeningUsesAfter, 0);
  assert.equal(result.damageStillApplies, true);
  assert.equal(result.woundThresholdStillAdvances, true);
});

test("plus consumes one of two uses; next wound can consume second", () => {
  const first = wound(TRAUMA_DAMPENING_PLUS);
  assert.equal(first.traumaDampeningUsesAfter, 1);
  const second = wound(TRAUMA_DAMPENING_PLUS, { traumaDampeningUsesRemaining: first.traumaDampeningUsesAfter });
  assert.equal(second.severity, "light");
  assert.equal(second.traumaDampeningUsesAfter, 0);
});

test("exhausted charges do not dampen", () => {
  const result = wound(TRAUMA_DAMPENING, { traumaDampeningUsesRemaining: 0 });
  assert.equal(result.severity, "severe");
  assert.equal(result.traumaDampeningApplied, false);
  assert.equal(result.traumaDampeningReason, "no_uses_remaining");
});

test("already-Light wounds do not consume charges", () => {
  const result = wound(TRAUMA_DAMPENING, { requestedSeverity: "light", threshold: "first" });
  assert.equal(result.severity, "light");
  assert.equal(result.traumaDampeningUsesAfter, 1);
  assert.equal(result.traumaDampeningUseConsumed, false);
});

test("broken armor prevents dampening", () => {
  const result = wound(TRAUMA_DAMPENING, { armorFunctioning: false });
  assert.equal(result.severity, "severe");
  assert.equal(result.traumaDampeningReason, "armor_not_functioning");
});

test("ineligible wound type does not consume charges", () => {
  const result = resolveWound({ woundType: "toxic_chemical", threshold: "third", traumaDampening: TRAUMA_DAMPENING, random: () => 0.5 });
  assert.equal(result.traumaDampeningApplied, false);
  assert.equal(result.traumaDampeningUseConsumed, false);
});

test("first and second threshold severity restrictions remain in force", () => {
  for (const [threshold, expected] of [["first", "moderate"], ["second", "severe"]]) {
    const result = wound(null, { threshold, requestedSeverity: "severe" });
    assert.equal(result.severity, expected);
  }
});
