import test from "node:test";
import assert from "node:assert/strict";
import { resolveVehicleTac } from "../modules/vehicle-tac-resolver.js";
import { collectVehicleTacPendingActions, filterUnappliedVehicleTacActions } from "../modules/vehicle-tac-consequence-dispatcher.js";

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

test("same TAC resolution generates stable consequence IDs on repeated collection", () => {
  const tac = catastrophic(2);
  const opts = { vehicleId: "tank-a", resolutionId: "tac-001", attackId: "attack-017" };
  const first = collectVehicleTacPendingActions(tac, opts);
  const again = collectVehicleTacPendingActions(tac, opts);
  assert.deepEqual(first, again);
  assert.deepEqual(first.map(a => a.id), ["tac-001:wound", "tac-001:hazard"]);
  assert.equal(first[0].origin.attackId, "attack-017");
});

test("separate TAC events may wound the same subsystem independently", () => {
  const tac = catastrophic(4);
  const first = collectVehicleTacPendingActions(tac, { resolutionId: "tac-001" });
  const second = collectVehicleTacPendingActions(tac, { resolutionId: "tac-002" });
  assert.notEqual(first[0].id, second[0].id);
  assert.equal(first[0].origin.subsystemId, second[0].origin.subsystemId);
});

test("cascade carries parent and attack provenance", () => {
  const actions = collectVehicleTacPendingActions(catastrophic(9), {
    resolutionId: "tac-002", parentResolutionId: "tac-001", attackId: "attack-017",
  });
  assert.equal(actions[0].origin.parentResolutionId, "tac-001");
  assert.equal(actions[0].origin.attackId, "attack-017");
});

test("applied consequence ledger filters retries without suppressing distinct events", () => {
  const tac = catastrophic(4);
  const a = collectVehicleTacPendingActions(tac, { resolutionId: "tac-001" });
  const b = collectVehicleTacPendingActions(tac, { resolutionId: "tac-002" });
  const pending = filterUnappliedVehicleTacActions([...a, ...b], [a[0].id]);
  assert.deepEqual(pending.map(x => x.id), [b[0].id]);
});

test("invalid event ID is rejected", () => {
  assert.throws(() => collectVehicleTacPendingActions(catastrophic(4), { resolutionId: "" }), /resolutionId/);
});
