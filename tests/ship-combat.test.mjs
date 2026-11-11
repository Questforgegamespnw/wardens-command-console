import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveShipCombat } from '../modules/ship-combat-resolver.js';
import { applyShipCombatResult, createShipEntity } from '../modules/ship-entities.js';
import { resolveShipEffectivePr } from '../data/ship-rules.js';

const hit = (overrides = {}) => resolveShipCombat({
  attack: { weaponSize: 3, baseSeverity: 'solid', penetration: 'none', ...(overrides.attack ?? {}) },
  target: { classId: 3, protectionRating: 0, currentHull: 4, ...(overrides.target ?? {}) },
  context: { rangeBand: 'medium', hitQuality: 'clean', ...(overrides.context ?? {}) },
});

test('Solid hit inflicts 1 Hull loss and Minor Ship TAC together', () => {
  const result = hit();
  assert.equal(result.finalSeverity, 'solid');
  assert.equal(result.effect.hullLoss, 1);
  assert.equal(result.effect.shipTacSeverity, 'minor');
  assert.equal(result.effect.targetChoice, false);
  assert.equal(result.handoffs.shipTac.severity, 'minor');
  assert.equal(result.preview.hullLoss, 1);
});
test('Applying Solid hit reduces Hull and queues Minor TAC', () => {
  const ship = createShipEntity({ classId: 3, currentHull: 4, maximumHull: 4 });
  const applied = applyShipCombatResult(ship, hit());
  assert.equal(applied.scale.currentHull, 3);
  assert.equal(applied.pendingShipTac.severity, 'minor');
});
test('Breaching still inflicts Hull and Moderate TAC together', () => {
  const result = hit({ attack: { baseSeverity: 'breaching' } });
  assert.equal(result.effect.hullLoss, 1);
  assert.equal(result.handoffs.shipTac.severity, 'moderate');
});
test('Overmatch adds exactly one severity at +2 and no minimum Breaching at +3', () => {
  const result = hit({ attack: { weaponSize: 6, baseSeverity: 'glancing' } });
  assert.equal(result.finalSeverity, 'solid');
  assert.equal(result.overmatch, true);
});
test('Weapon below class minus 2 floor is ineffective', () => {
  const result = hit({ attack: { weaponSize: 2 }, target: { classId: 5 } });
  assert.equal(result.outcome, 'weapon_too_small');
});
test('Weapon exactly two below target class is allowed without penalty', () => {
  const result = hit({ attack: { weaponSize: 3 }, target: { classId: 5 } });
  assert.equal(result.finalSeverity, 'solid');
});
test('PR reduction and anti-armor follow severity ladder', () => {
  const blocked = hit({ target: { protectionRating: 2 } });
  const piercing = hit({ attack: { penetration: 'piercing' }, target: { protectionRating: 2 } });
  const antiArmor = hit({ attack: { penetration: 'anti_armor' }, target: { protectionRating: 2 } });
  assert.equal(blocked.finalSeverity, 'no_effect');
  assert.equal(piercing.finalSeverity, 'glancing');
  assert.equal(antiArmor.finalSeverity, 'solid');
});
test('Siege and capital class-sensitive PR rules', () => {
  assert.equal(resolveShipEffectivePr({basePr: 4, penetrationId:'siege', targetClass: 3}).effectivePr, 0);
  assert.equal(resolveShipEffectivePr({basePr: 4, penetrationId:'siege', targetClass: 5}).effectivePr, 1);
  assert.equal(resolveShipEffectivePr({basePr: 4, penetrationId:'siege', targetClass: 6}).effectivePr, 2);
  assert.equal(resolveShipEffectivePr({basePr: 4, penetrationId:'siege', targetClass: 6, peerScaleSiege:true}).effectivePr, 0);
  assert.equal(resolveShipEffectivePr({basePr: 4, penetrationId:'capital', targetClass: 5}).effectivePr, 0);
  assert.equal(resolveShipEffectivePr({basePr: 4, penetrationId:'capital', targetClass: 6}).effectivePr, 1);
});
test('Capital penetration minimum Breaching for Class III and below is retained', () => {
  const result = hit({attack:{baseSeverity:'glancing', penetration:'capital'}});
  assert.equal(result.finalSeverity, 'breaching');
});
test('Listed weapon range bands are enforced', () => {
  const result = hit({attack:{rangeBands:['long']}});
  assert.equal(result.outcome, 'weapon_out_of_range');
});
test('Systems-only attacks still generate TAC without Hull loss', () => {
  const result = hit({attack:{penetration:'systems_bypass', hullDamageMode:'none'}, target:{protectionRating:4}});
  assert.equal(result.effect.hullLoss, 0);
  assert.equal(result.handoffs.shipTac.severity, 'minor');
  assert.equal(result.effect.targetChoice, false);
});
