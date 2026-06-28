import assert from "node:assert/strict";
import {
  resolveDamage,
} from "../modules/damage-resolver.js";

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test("Armored halves each die before AV", () => {
  const result = resolveDamage({
    mode: "dice",
    attack: {
      dice: {
        count: 3,
        sides: 10,
        rolls: [8, 8, 6],
      },
      penetration: "standard",
    },
    target: {
      type: "personnel",
      armored: true,
      av: 18,
      dr: 5,
      currentHealth: 30,
      healthPerWound: 10,
      woundsRemaining: 3,
    },
  });

  assert.deepEqual(
    result.rolls.afterArmored,
    [4, 4, 3],
  );
  assert.equal(result.damage.adjustedTotal, 11);
  assert.equal(result.defense.armorBreached, false);
  assert.equal(result.tacHandoff.triggered, false);
});

test("AV breach triggers TAC before DR stops damage", () => {
  const result = resolveDamage({
    mode: "fixed",
    attack: {
      fixedDamage: 23,
      penetration: "piercing",
    },
    target: {
      type: "personnel",
      armored: true,
      av: 18,
      dr: 5,
      currentHealth: 30,
      healthPerWound: 10,
      woundsRemaining: 3,
    },
  });

  assert.equal(result.defense.armorBreached, true);
  assert.equal(result.defense.finalDamage, 0);
  assert.equal(result.tacHandoff.triggered, true);
});

test("Anti-Armor bypasses halving and halves DR", () => {
  const result = resolveDamage({
    mode: "dice",
    attack: {
      dice: {
        count: 3,
        sides: 10,
        rolls: [8, 8, 6],
      },
      penetration: "anti_armor",
    },
    target: {
      type: "personnel",
      armored: true,
      av: 10,
      dr: 5,
      currentHealth: 30,
      healthPerWound: 10,
      woundsRemaining: 3,
    },
  });

  assert.equal(result.damage.adjustedTotal, 22);
  assert.equal(result.defense.effectiveDr, 2);
  assert.equal(result.defense.finalDamage, 10);
  assert.equal(result.durability.thresholdsCrossed, 1);
});

test("Cover resolves before target AV", () => {
  const result = resolveDamage({
    mode: "fixed",
    attack: {
      fixedDamage: 20,
      penetration: "piercing",
      coverInteraction: "normal",
    },
    target: {
      type: "personnel",
      av: 10,
      dr: 3,
      currentHealth: 30,
      healthPerWound: 10,
      woundsRemaining: 3,
    },
    attackContext: {
      cover: {
        present: true,
        level: "medium",
        av: 5,
      },
    },
  });

  assert.equal(result.cover.damageAfterCover, 15);
  assert.equal(result.defense.armorRemainder, 5);
  assert.equal(result.defense.finalDamage, 2);
});

test("Breach interaction bypasses cover AV", () => {
  const result = resolveDamage({
    mode: "fixed",
    attack: {
      fixedDamage: 10,
      penetration: "piercing",
      coverInteraction: "breach",
    },
    target: {
      type: "personnel",
      av: 7,
      dr: 0,
      currentHealth: 30,
      healthPerWound: 10,
      woundsRemaining: 3,
    },
    attackContext: {
      cover: {
        present: true,
        level: "heavy",
        av: 7,
      },
    },
  });

  assert.equal(result.cover.effectiveAv, 0);
  assert.equal(result.cover.bypassed, true);
  assert.equal(result.defense.finalDamage, 3);
});

test("Direct Wounds skip damage math", () => {
  const result = resolveDamage({
    mode: "direct_wounds",
    attack: {
      directWounds: 2,
      woundType: "massive_gore",
    },
    target: {
      type: "personnel",
      armored: true,
      av: 18,
      dr: 10,
      currentHealth: 30,
      healthPerWound: 10,
      woundsRemaining: 3,
    },
  });

  assert.equal(result.defense.skipped, true);
  assert.equal(result.woundHandoff.triggered, true);
  assert.equal(result.woundHandoff.count, 2);
  assert.equal(result.tacHandoff.triggered, false);
});

test("Aegis resolution returns integrity overflow", () => {
  const result = resolveDamage({
    mode: "fixed",
    attack: {
      fixedDamage: 25,
      penetration: "piercing",
    },
    target: {
      type: "aegis_shield",
      av: 5,
      dr: 0,
      currentIntegrity: 6,
      maximumIntegrity: 30,
      tacEligible: false,
    },
  });

  assert.equal(result.durability.valueAfter, 0);
  assert.equal(result.durability.overflowDamage, 14);
  assert.equal(result.tacHandoff.triggered, false);
});
