export const DAMAGE_MODES = Object.freeze([
  "dice",
  "fixed",
  "direct_wounds",
]);

export const TARGET_TYPES = Object.freeze([
  "personnel",
  "aegis_shield",
  "vehicle",
  "ship",
  "structure",
]);

export const PENETRATION_PROFILES = Object.freeze({
  standard: Object.freeze({
    id: "standard",
    ignoresArmoredHalving: false,
    drMode: "full",
  }),

  piercing: Object.freeze({
    id: "piercing",
    ignoresArmoredHalving: true,
    drMode: "full",
  }),

  anti_armor: Object.freeze({
    id: "anti_armor",
    ignoresArmoredHalving: true,
    drMode: "half",
  }),

  siege: Object.freeze({
    id: "siege",
    ignoresArmoredHalving: true,
    drMode: "ignore",
  }),
});

export const COVER_AV = Object.freeze({
  none: 0,
  light: 3,
  medium: 5,
  heavy: 7,
});

export const CONCEALMENT_MODIFIERS = Object.freeze({
  none: 0,
  light: -3,
  medium: -5,
  heavy: -10,
});

export const COVER_INTERACTIONS = Object.freeze([
  "normal",
  "ignore",
  "breach",
]);

const DEFAULT_WOUND_TYPE = "gunshot";

export function resolveDamage({
  mode = "dice",
  attack = {},
  target = {},
  attackContext = {},
  random = Math.random,
} = {}) {
  validateMode(mode);

  const normalizedAttack = normalizeAttack(
    attack,
    mode,
  );

  const normalizedTarget = normalizeTarget(target);
  const normalizedContext = normalizeAttackContext(
    attackContext,
    normalizedAttack.coverInteraction,
  );

  if (mode === "direct_wounds") {
    return resolveDirectWounds({
      attack: normalizedAttack,
      target: normalizedTarget,
      attackContext: normalizedContext,
    });
  }

  const penetration = getPenetrationProfile(
    normalizedAttack.penetration,
  );

  const rolledDamage = buildDamageRoll({
    mode,
    attack: normalizedAttack,
    random,
  });

  const armoredAdjustment = applyArmoredAdjustment({
    mode,
    rolls: rolledDamage.rolls,
    rawTotal: rolledDamage.rawTotal,
    armored: normalizedTarget.armored,
    ignoresArmoredHalving:
      penetration.ignoresArmoredHalving,
  });

  const coverResolution = resolveCoverLayer({
    damage: armoredAdjustment.adjustedTotal,
    cover: normalizedContext.cover,
    interaction: normalizedAttack.coverInteraction,
  });

  const defenseResolution = resolveDefenseLayer({
    damage: coverResolution.damageAfterCover,
    av: normalizedTarget.av,
    dr: normalizedTarget.dr,
    penetration,
  });

  const durabilityResolution = resolveDurability({
    target: normalizedTarget,
    damage: defenseResolution.finalDamage,
  });

  const tacHandoff = buildTacHandoff({
    attack: normalizedAttack,
    target: normalizedTarget,
    armorBreached: defenseResolution.armorBreached,
  });

  const woundHandoff = buildWoundHandoff({
    attack: normalizedAttack,
    target: normalizedTarget,
    durability: durabilityResolution,
  });

  return Object.freeze({
    resolverId: "damage",
    mode,

    attack: Object.freeze({
      id: normalizedAttack.id,
      label: normalizedAttack.label,
      penetration: normalizedAttack.penetration,
      woundType: normalizedAttack.woundType,
      coverInteraction:
        normalizedAttack.coverInteraction,
      tacEligible: normalizedAttack.tacEligible,
      preferredTacCategory:
        normalizedAttack.preferredTacCategory,
    }),

    target: Object.freeze({
      id: normalizedTarget.id,
      label: normalizedTarget.label,
      type: normalizedTarget.type,
      armored: normalizedTarget.armored,
      tacEligible: normalizedTarget.tacEligible,
      tacResolverId:
        normalizedTarget.tacResolverId,
    }),

    attackContext: Object.freeze({
      concealmentLevel:
        normalizedContext.concealment.level,
      combatModifier:
        normalizedContext.concealment
          .combatModifier,
    }),

    rolls: Object.freeze({
      original: Object.freeze([
        ...rolledDamage.rolls,
      ]),
      afterArmored: Object.freeze([
        ...armoredAdjustment.adjustedRolls,
      ]),
    }),

    damage: Object.freeze({
      rawTotal: rolledDamage.rawTotal,
      adjustedTotal:
        armoredAdjustment.adjustedTotal,
      armoredHalvingApplied:
        armoredAdjustment.applied,
      fixedDamage:
        mode === "fixed"
          ? rolledDamage.rawTotal
          : null,
    }),

    cover: Object.freeze(coverResolution),
    defense: Object.freeze(defenseResolution),
    durability: Object.freeze(durabilityResolution),
    tacHandoff: Object.freeze(tacHandoff),
    woundHandoff: Object.freeze(woundHandoff),

    stateChanges: Object.freeze(
      buildStateChanges({
        target: normalizedTarget,
        durability: durabilityResolution,
      }),
    ),
  });
}

function resolveDirectWounds({
  attack,
  target,
  attackContext,
}) {
  const count = toNonNegativeInteger(
    attack.directWounds,
    "Direct Wounds",
  );

  if (count < 1) {
    throw new RangeError(
      "Direct Wounds must be at least 1.",
    );
  }

  const thresholds = buildDirectWoundThresholds({
    count,
    woundsRemaining: target.woundsRemaining,
  });

  return Object.freeze({
    resolverId: "damage",
    mode: "direct_wounds",

    attack: Object.freeze({
      id: attack.id,
      label: attack.label,
      penetration: attack.penetration,
      woundType: attack.woundType,
      coverInteraction: attack.coverInteraction,
      tacEligible: false,
      preferredTacCategory: null,
    }),

    target: Object.freeze({
      id: target.id,
      label: target.label,
      type: target.type,
      armored: target.armored,
      tacEligible: target.tacEligible,
      tacResolverId: target.tacResolverId,
    }),

    attackContext: Object.freeze({
      concealmentLevel:
        attackContext.concealment.level,
      combatModifier:
        attackContext.concealment.combatModifier,
    }),

    rolls: Object.freeze({
      original: Object.freeze([]),
      afterArmored: Object.freeze([]),
    }),

    damage: Object.freeze({
      rawTotal: null,
      adjustedTotal: null,
      armoredHalvingApplied: false,
      fixedDamage: null,
    }),

    cover: Object.freeze(
      buildSkippedCoverResult(
        attackContext.cover,
        attack.coverInteraction,
      ),
    ),

    defense: Object.freeze({
      skipped: true,
      originalAv: target.av,
      effectiveAv: target.av,
      armorBreached: null,
      armorRemainder: null,
      originalDr: target.dr,
      effectiveDr: target.dr,
      finalDamage: null,
    }),

    durability: Object.freeze({
      resource: getDurabilityResource(target.type),
      valueBefore: getDurabilityValue(target),
      valueAfter: getDurabilityValue(target),
      damageApplied: 0,
      overflowDamage: 0,
      thresholdsCrossed: count,
      woundsBefore: target.woundsRemaining,
      woundsAfter:
        Number.isInteger(target.woundsRemaining)
          ? Math.max(
              0,
              target.woundsRemaining - count,
            )
          : null,
    }),

    tacHandoff: Object.freeze({
      triggered: false,
      resolverId: null,
      preferredCategory: null,
      reason: "direct_wounds_selected",
    }),

    woundHandoff: Object.freeze({
      triggered: true,
      count,
      woundType: attack.woundType,
      thresholds: Object.freeze(thresholds),
      overflowDamage: 0,
      direct: true,
    }),

    stateChanges: Object.freeze([]),
  });
}

function normalizeAttack(attack, mode) {
  const penetration =
    attack.penetration ?? "standard";

  getPenetrationProfile(penetration);

  const coverInteraction =
    attack.coverInteraction ?? "normal";

  if (!COVER_INTERACTIONS.includes(coverInteraction)) {
    throw new RangeError(
      `Unknown cover interaction: ${coverInteraction}`,
    );
  }

  return {
    id: attack.id ?? null,
    label: attack.label ?? "Damage Result",
    penetration,
    woundType:
      attack.woundType ?? DEFAULT_WOUND_TYPE,
    coverInteraction,
    tacEligible: attack.tacEligible !== false,
    preferredTacCategory:
      attack.preferredTacCategory ?? null,
    dice: attack.dice ?? {},
    fixedDamage: attack.fixedDamage,
    directWounds:
      mode === "direct_wounds"
        ? attack.directWounds
        : null,
  };
}

function normalizeTarget(target) {
  const type = target.type ?? "personnel";

  if (!TARGET_TYPES.includes(type)) {
    throw new RangeError(
      `Unknown damage target type: ${type}`,
    );
  }

  const currentHealth = readOptionalNonNegativeNumber(
    target.currentHealth,
    "Current Health",
  );

  const currentIntegrity =
    readOptionalNonNegativeNumber(
      target.currentIntegrity,
      "Current Integrity",
    );

  if (
    type === "aegis_shield"
    && currentIntegrity === null
  ) {
    throw new TypeError(
      "Aegis shield resolution requires currentIntegrity.",
    );
  }

  if (
    type !== "aegis_shield"
    && currentHealth === null
  ) {
    throw new TypeError(
      `${formatIdentifier(type)} resolution requires currentHealth.`,
    );
  }

  return {
    id: target.id ?? null,
    label: target.label ?? formatIdentifier(type),
    type,
    armored: Boolean(target.armored),
    av: toNonNegativeNumber(target.av ?? 0, "AV"),
    dr: toNonNegativeNumber(target.dr ?? 0, "DR"),
    currentHealth,
    maximumHealth: readOptionalNonNegativeNumber(
      target.maximumHealth,
      "Maximum Health",
    ),
    currentIntegrity,
    maximumIntegrity: readOptionalNonNegativeNumber(
      target.maximumIntegrity,
      "Maximum Integrity",
    ),
    healthPerWound: readOptionalPositiveNumber(
      target.healthPerWound,
      "Health per Wound",
    ),
    woundsRemaining:
      target.woundsRemaining === null
      || target.woundsRemaining === undefined
        ? null
        : toNonNegativeInteger(
            target.woundsRemaining,
            "Wounds Remaining",
          ),
    tacEligible: target.tacEligible !== false,
    tacResolverId:
      target.tacResolverId
      ?? defaultTacResolverId(type),
  };
}

function normalizeAttackContext(
  attackContext,
  coverInteraction,
) {
  const concealmentLevel =
    attackContext.concealment?.level ?? "none";

  if (
    !Object.hasOwn(
      CONCEALMENT_MODIFIERS,
      concealmentLevel,
    )
  ) {
    throw new RangeError(
      `Unknown concealment level: ${concealmentLevel}`,
    );
  }

  const coverLevel =
    attackContext.cover?.level ?? "none";

  if (!Object.hasOwn(COVER_AV, coverLevel)) {
    throw new RangeError(
      `Unknown cover level: ${coverLevel}`,
    );
  }

  const coverAv =
    attackContext.cover?.av === null
    || attackContext.cover?.av === undefined
      ? COVER_AV[coverLevel]
      : toNonNegativeNumber(
          attackContext.cover.av,
          "Cover AV",
        );

  const present =
    attackContext.cover?.present
    ?? coverAv > 0;

  return {
    concealment: {
      level: concealmentLevel,
      combatModifier:
        attackContext.concealment
          ?.combatModifier
        ?? CONCEALMENT_MODIFIERS[
          concealmentLevel
        ],
    },

    cover: {
      present: Boolean(present),
      level: coverLevel,
      av: coverAv,
      interaction: coverInteraction,
    },
  };
}

function buildDamageRoll({
  mode,
  attack,
  random,
}) {
  if (mode === "fixed") {
    const amount = toNonNegativeInteger(
      attack.fixedDamage,
      "Fixed Damage",
    );

    return {
      rolls: [],
      rawTotal: amount,
    };
  }

  const count = toPositiveInteger(
    attack.dice.count,
    "Damage Dice Count",
  );

  const sides = toPositiveInteger(
    attack.dice.sides,
    "Damage Die Size",
  );

  const suppliedRolls = attack.dice.rolls;

  const rolls = suppliedRolls === null
    || suppliedRolls === undefined
    || suppliedRolls.length === 0
      ? Array.from(
          { length: count },
          () => Math.floor(random() * sides) + 1,
        )
      : validateDiceRolls({
          rolls: suppliedRolls,
          count,
          sides,
        });

  return {
    rolls,
    rawTotal: sum(rolls),
  };
}

function applyArmoredAdjustment({
  mode,
  rolls,
  rawTotal,
  armored,
  ignoresArmoredHalving,
}) {
  const applied =
    armored && !ignoresArmoredHalving;

  if (!applied) {
    return {
      applied: false,
      adjustedRolls: [...rolls],
      adjustedTotal: rawTotal,
    };
  }

  if (mode === "fixed") {
    return {
      applied: true,
      adjustedRolls: [],
      adjustedTotal: Math.floor(rawTotal / 2),
    };
  }

  const adjustedRolls = rolls.map(
    (roll) => Math.floor(roll / 2),
  );

  return {
    applied: true,
    adjustedRolls,
    adjustedTotal: sum(adjustedRolls),
  };
}

function resolveCoverLayer({
  damage,
  cover,
  interaction,
}) {
  if (!cover.present || cover.av <= 0) {
    return {
      present: false,
      level: cover.level,
      originalAv: cover.av,
      effectiveAv: 0,
      interaction,
      damageBeforeCover: damage,
      damageAfterCover: damage,
      penetrated: null,
      bypassed: false,
    };
  }

  const bypassed =
    interaction === "ignore"
    || interaction === "breach";

  const effectiveAv = bypassed ? 0 : cover.av;
  const damageAfterCover = Math.max(
    0,
    damage - effectiveAv,
  );

  return {
    present: true,
    level: cover.level,
    originalAv: cover.av,
    effectiveAv,
    interaction,
    damageBeforeCover: damage,
    damageAfterCover,
    penetrated: bypassed || damageAfterCover > 0,
    bypassed,
  };
}

function buildSkippedCoverResult(
  cover,
  interaction,
) {
  return {
    present: cover.present,
    level: cover.level,
    originalAv: cover.av,
    effectiveAv: 0,
    interaction,
    damageBeforeCover: null,
    damageAfterCover: null,
    penetrated: null,
    bypassed:
      interaction === "ignore"
      || interaction === "breach",
    skipped: true,
  };
}

function resolveDefenseLayer({
  damage,
  av,
  dr,
  penetration,
}) {
  const armorRemainder = Math.max(0, damage - av);
  const armorBreached = armorRemainder > 0;
  const effectiveDr = getEffectiveDr(
    dr,
    penetration.drMode,
  );

  const finalDamage = armorBreached
    ? Math.max(0, armorRemainder - effectiveDr)
    : 0;

  return {
    skipped: false,
    originalAv: av,
    effectiveAv: av,
    armorBreached,
    armorRemainder,
    originalDr: dr,
    effectiveDr,
    finalDamage,
  };
}

function resolveDurability({
  target,
  damage,
}) {
  const resource = getDurabilityResource(target.type);
  const valueBefore = getDurabilityValue(target);
  const valueAfter = Math.max(0, valueBefore - damage);
  const damageApplied = valueBefore - valueAfter;
  const overflowDamage = Math.max(0, damage - valueBefore);

  const thresholdsCrossed =
    resource === "health"
      ? calculateThresholdsCrossed({
          healthBefore: valueBefore,
          healthAfter: valueAfter,
          healthPerWound: target.healthPerWound,
        })
      : 0;

  const woundsAfter =
    Number.isInteger(target.woundsRemaining)
      ? Math.max(
          0,
          target.woundsRemaining
            - thresholdsCrossed,
        )
      : null;

  return {
    resource,
    valueBefore,
    valueAfter,
    damageApplied,
    overflowDamage,
    thresholdsCrossed,
    woundsBefore: target.woundsRemaining,
    woundsAfter,
  };
}

function calculateThresholdsCrossed({
  healthBefore,
  healthAfter,
  healthPerWound,
}) {
  if (!healthPerWound || healthBefore <= 0) {
    return 0;
  }

  const bandsBefore = Math.ceil(
    healthBefore / healthPerWound,
  );

  const bandsAfter = healthAfter <= 0
    ? 0
    : Math.ceil(healthAfter / healthPerWound);

  return Math.max(0, bandsBefore - bandsAfter);
}

function buildTacHandoff({
  attack,
  target,
  armorBreached,
}) {
  if (!armorBreached) {
    return {
      triggered: false,
      resolverId: null,
      preferredCategory: null,
      reason: "target_av_not_breached",
    };
  }

  if (!attack.tacEligible) {
    return {
      triggered: false,
      resolverId: null,
      preferredCategory: null,
      reason: "attack_not_tac_eligible",
    };
  }

  if (!target.tacEligible || !target.tacResolverId) {
    return {
      triggered: false,
      resolverId: null,
      preferredCategory: null,
      reason: "target_not_tac_eligible",
    };
  }

  return {
    triggered: true,
    resolverId: target.tacResolverId,
    preferredCategory:
      attack.preferredTacCategory,
    reason: "target_av_breached",
  };
}

function buildWoundHandoff({
  attack,
  target,
  durability,
}) {
  const count = durability.thresholdsCrossed;

  if (count < 1 || target.type !== "personnel") {
    return {
      triggered: false,
      count: 0,
      woundType: null,
      thresholds: [],
      overflowDamage: durability.overflowDamage,
      direct: false,
    };
  }

  return {
    triggered: true,
    count,
    woundType: attack.woundType,
    thresholds: buildThresholdNames({
      count,
      woundsRemaining: target.woundsRemaining,
    }),
    overflowDamage: durability.overflowDamage,
    direct: false,
  };
}

function buildStateChanges({
  target,
  durability,
}) {
  if (durability.damageApplied <= 0 || !target.id) {
    return [];
  }

  const path = target.type === "aegis_shield"
    ? "durability.currentIntegrity"
    : "durability.currentHealth";

  return [
    Object.freeze({
      entityId: target.id,
      path,
      before: durability.valueBefore,
      after: durability.valueAfter,
    }),
  ];
}

function getEffectiveDr(dr, mode) {
  if (mode === "ignore") {
    return 0;
  }

  if (mode === "half") {
    return Math.floor(dr / 2);
  }

  return dr;
}

function getPenetrationProfile(id) {
  const profile = PENETRATION_PROFILES[id];

  if (!profile) {
    throw new RangeError(
      `Unknown penetration profile: ${id}`,
    );
  }

  return profile;
}

function getDurabilityResource(type) {
  return type === "aegis_shield"
    ? "integrity"
    : "health";
}

function getDurabilityValue(target) {
  return target.type === "aegis_shield"
    ? target.currentIntegrity
    : target.currentHealth;
}

function defaultTacResolverId(type) {
  if (type === "personnel") {
    return "personnel_tac";
  }

  if (type === "vehicle") {
    return "vehicle_tac";
  }

  if (type === "ship") {
    return "ship_tac";
  }

  return null;
}

function buildThresholdNames({
  count,
  woundsRemaining,
}) {
  const order = ["first", "second", "third"];

  if (!Number.isInteger(woundsRemaining)) {
    return order.slice(0, count);
  }

  const alreadySuffered = Math.max(
    0,
    3 - woundsRemaining,
  );

  return Array.from(
    { length: count },
    (_, index) =>
      order[alreadySuffered + index]
      ?? "final",
  );
}

function buildDirectWoundThresholds({
  count,
  woundsRemaining,
}) {
  return buildThresholdNames({
    count,
    woundsRemaining,
  });
}

function validateMode(mode) {
  if (!DAMAGE_MODES.includes(mode)) {
    throw new RangeError(
      `Unknown damage mode: ${mode}`,
    );
  }
}

function validateDiceRolls({
  rolls,
  count,
  sides,
}) {
  if (!Array.isArray(rolls)) {
    throw new TypeError(
      "Damage dice rolls must be an array.",
    );
  }

  if (rolls.length !== count) {
    throw new RangeError(
      `Expected ${count} damage dice but received ${rolls.length}.`,
    );
  }

  return rolls.map((value, index) => {
    const roll = Number(value);

    if (
      !Number.isInteger(roll)
      || roll < 1
      || roll > sides
    ) {
      throw new RangeError(
        `Damage die ${index + 1} must be an integer from 1 to ${sides}.`,
      );
    }

    return roll;
  });
}

function toNonNegativeNumber(value, label) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric < 0) {
    throw new RangeError(
      `${label} must be a non-negative number.`,
    );
  }

  return numeric;
}

function readOptionalNonNegativeNumber(value, label) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return toNonNegativeNumber(value, label);
}

function readOptionalPositiveNumber(value, label) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric <= 0) {
    throw new RangeError(
      `${label} must be greater than zero.`,
    );
  }

  return numeric;
}

function toNonNegativeInteger(value, label) {
  const numeric = Number(value);

  if (!Number.isInteger(numeric) || numeric < 0) {
    throw new RangeError(
      `${label} must be a non-negative integer.`,
    );
  }

  return numeric;
}

function toPositiveInteger(value, label) {
  const numeric = Number(value);

  if (!Number.isInteger(numeric) || numeric < 1) {
    throw new RangeError(
      `${label} must be a positive integer.`,
    );
  }

  return numeric;
}

function sum(values) {
  return values.reduce(
    (total, value) => total + value,
    0,
  );
}

function formatIdentifier(value) {
  return String(value ?? "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
