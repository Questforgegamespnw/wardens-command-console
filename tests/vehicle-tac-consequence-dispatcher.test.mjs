import test from "node:test";
import assert from "node:assert/strict";
import { resolveVehicleTac } from "../modules/vehicle-tac-resolver.js";
import { collectVehicleTacPendingActions } from "../modules/vehicle-tac-consequence-dispatcher.js";

function catastrophic(roll) {
  return resolveVehicleTac({ forcedSeverity: "catastrophic", forcedOutcomeRoll: roll,
    categoryMode: "preferred", preferredCategory: "mobility", platformType: "tank_heavy_ifv", subsystemId: "tank-1" });
}

test("ammo cook-off returns pending countdown, not activated countdown", () => {
  const result = collectVehicleTacPendingActions(catastrophic(3), { vehicleId: "v1" });
  assert.equal(result.length, 1);
  assert.equal(result[0].route, "crisis_countdown");
  assert.equal(result[0].status, "pending");
  assert.equal(result[0].origin.vehicleId, "v1");
  assert.equal(result[0].origin.subsystemId, "tank-1");
});
test("crew compartment breach requests personnel wound without inflicting it", () => {
  const result = collectVehicleTacPendingActions(catastrophic(4));
  assert.deepEqual(result.map(x => x.route), ["personnel_wound"]);
  assert.equal(result[0].details.recommended, true);
});
test("cascading failure preserves Light/Moderate secondary TAC constraint", () => {
  const result = collectVehicleTacPendingActions(catastrophic(9));
  assert.equal(result[0].route, "vehicle_tac");
  assert.deepEqual(result[0].details.severityOptions, ["light", "moderate"]);
});
test("fireball preserves multiple independent pending consequences", () => {
  const result = collectVehicleTacPendingActions(catastrophic(2));
  assert.deepEqual(result.map(x => x.type), ["wound", "hazard"]);
});
test("no handoffs means no actions", () => {
  assert.deepEqual(collectVehicleTacPendingActions(catastrophic(1)), []);
});
test("input is unchanged and actions cannot mutate source handoffs", () => {
  const source = catastrophic(9);
  const actions = collectVehicleTacPendingActions(source);
  actions[0].details.severityOptions.push("catastrophic");
  assert.deepEqual(source.handoffs.secondaryTac.severityOptions, ["light", "moderate"]);
});
test("invalid result is rejected", () => {
  assert.throws(() => collectVehicleTacPendingActions({}), /Vehicle TAC/);
});
