# Warden Resolution Console — Data Model

**Document:** `DEV/DATA_MODEL.md`  
**Status:** Alpha baseline  
**Last reconciled:** 2026-06-27

---

## 1. Scope

This document defines runtime structures used by the alpha console.

It covers:

- Resolver results
- Quick Entities
- Entity templates
- Armor-system state
- Damage inputs and results
- Wounds
- Personnel TAC
- Hazards
- Session state

It does not define campaign actors, full character sheets, factions, scenes, or long-term world state.

---

## 2. Naming

- Stable IDs: lowercase snake case
- Files: lowercase kebab case
- JavaScript properties: camelCase
- Enum values: lowercase snake case

---

## 3. Shared Application Result Envelope

The application stores recent results in a common envelope:

```js
{
  id: "result_ab12",
  resolverId: "damage",
  label: "Pulse Rifle vs Marine",
  status: "resolved",
  summary: "Armor breached; 2 damage applied",
  ruling: "Apply the listed result.",
  metadata: {},
  createdAt: "2026-06-27T20:00:00.000Z"
}
```

Required fields:

- `id`
- `resolverId`
- `label`
- `status`
- `summary`
- `ruling`
- `metadata`
- `createdAt`

Resolver-specific detail belongs inside `metadata`.

The alpha runtime does not require every resolver to expose identical top-level mechanical fields as long as the application envelope remains stable.

---

## 4. Quick Entity

```js
{
  id: "entity_marine_01",
  label: "Marine Rifleman",
  type: "enemy",
  templateId: "marine_rifleman",

  defense: {
    av: 7,
    dr: 0,
    coverAv: 0,
    armored: true,
    tags: [
      "armored"
    ]
  },

  health: {
    healthPerWound: 15,
    currentHealth: 15,
    maximumWounds: 3,
    woundsRemaining: 3
  },

  conditions: {
    bleeding: 0,
    activeTac: [],
    statuses: []
  },

  armorSystems: {
    traumaDampening: {
      id: "trauma_dampening",
      maximumUses: 1,
      usesRemaining: 1,
      functioning: true
    }
  },

  profile: {
    role: "baseline combat infantry",
    threatLevel: "military_standard",
    primaryWeapon: "pulse_rifle",
    secondaryWeapon: "pistol",
    skills: {}
  },

  tags: [
    "human",
    "trained",
    "npc",
    "marine",
    "rifleman"
  ],

  notes: "",
  createdAt: "2026-06-27T20:00:00.000Z",
  updatedAt: "2026-06-27T20:00:00.000Z"
}
```

### Health identity

`healthPerWound` is the size of each Wound band.

`currentHealth` is Health remaining in the active Wound band.

It is not the target's total lifetime Health.

```text
3 Wounds
15 Health per Wound

Current band: 15
Theoretical total durability: 45
```

When damage exceeds the active band, overflow enters the next band and reduces `woundsRemaining`.

### Quick Entity constraints

- `healthPerWound > 0`
- `0 <= currentHealth <= healthPerWound`
- `maximumWounds > 0`
- `0 <= woundsRemaining <= maximumWounds`
- `av >= 0`
- `dr >= 0`
- `coverAv >= 0`
- `armored` is boolean
- arrays remain arrays
- updates return new objects

---

## 5. Entity Template Facade

Public entry point:

```text
data/entity-templates.js
```

Expanded sources:

```text
data/entity-templates/base-bodies.js
data/entity-templates/armor-packages.js
data/entity-templates/roles.js
data/entity-templates/groups.js
```

Template output shape:

```js
{
  id: "marine_rifleman",
  label: "Marine Rifleman",
  type: "enemy",
  description: "Flexible baseline marine infantry.",

  baseBodyId: "trained_human",
  armorPackageId: "standard_battle_dress",

  defaults: {
    defense: {},
    health: {},
    conditions: {},
    armorSystems: {}
  },

  profile: {
    role: "baseline combat infantry",
    threatLevel: "military_standard",
    primaryWeapon: "pulse_rifle",
    secondaryWeapon: "pistol",
    skills: {}
  },

  tags: [],
  status: "active"
}
```

Creating an entity deep-copies all mutable defaults.

Template changes do not retroactively alter existing Quick Entities.

---

## 6. Entity Group Template

```js
{
  id: "orion_fireteam",
  label: "Orion Fireteam",
  description: "One gunner and one spotter.",

  members: [
    {
      templateId: "orion_gunner",
      quantity: 1
    },
    {
      templateId: "orion_spotter",
      quantity: 1
    }
  ],

  status: "active"
}
```

Spawning a group creates separate independent Quick Entities.

Groups do not share Health, armor state, TAC state, or Wounds.

---

## 7. Armor System State

### Trauma Dampening

```js
{
  id: "trauma_dampening",
  maximumUses: 1,
  usesRemaining: 1,
  functioning: true
}
```

Plus:

```js
{
  id: "trauma_dampening_plus",
  maximumUses: 2,
  usesRemaining: 2,
  functioning: true
}
```

Rules:

- Standard has 1 use.
- Plus has 2 uses.
- A use is consumed only when severity is actually reduced.
- Light wounds do not consume a use.
- Broken armor disables the system and removes remaining use access.
- Exhausted dampening does not disable unrelated systems.

---

## 8. Damage Resolver Input

```js
{
  mode: "dice",

  attack: {
    id: "pulse_rifle",
    label: "Pulse Rifle",

    dice: {
      count: 2,
      sides: 10,
      rolls: [8, 6]
    },

    fixedDamage: null,
    directWounds: null,

    penetration: "standard",
    woundType: "gunshot",
    coverInteraction: "normal",

    tacEligible: true,
    preferredTacCategory: null
  },

  target: {
    id: "entity_marine_01",
    label: "Marine Rifleman",
    type: "personnel",

    armored: true,
    av: 7,
    dr: 0,

    currentHealth: 15,
    healthPerWound: 15,
    woundsRemaining: 3,
    maximumWounds: 3,

    tacEligible: true,
    tacResolverId: "personnel_tac"
  },

  attackContext: {
    concealment: {
      level: "none",
      combatModifier: 0
    },

    cover: {
      present: false,
      level: "none",
      av: 0
    }
  }
}
```

Supported damage modes:

```js
[
  "dice",
  "fixed",
  "direct_wounds"
]
```

Supported die sizes:

```js
[
  5,
  10,
  100
]
```

Supported target types:

```js
[
  "personnel",
  "aegis_shield",
  "vehicle",
  "ship",
  "structure"
]
```

---

## 9. Damage Result

```js
{
  resolverId: "damage",

  attack: {
    mode: "dice",
    penetration: "standard",
    woundType: "gunshot"
  },

  target: {
    id: "entity_marine_01",
    type: "personnel"
  },

  rolls: {
    original: [8, 8, 6],
    afterArmored: [4, 4, 3]
  },

  damage: {
    rawTotal: 22,
    adjustedTotal: 11,
    armoredHalvingApplied: true
  },

  cover: {
    present: true,
    originalAv: 3,
    effectiveAv: 3,
    damageBeforeCover: 11,
    damageAfterCover: 8,
    penetrated: true,
    bypassed: false
  },

  defense: {
    originalAv: 7,
    effectiveAv: 7,
    armorBreached: true,
    armorRemainder: 1,

    originalDr: 0,
    effectiveDr: 0,

    finalDamage: 1
  },

  durability: {
    healthBefore: 15,
    healthAfter: 14,
    woundsBefore: 3,
    woundsAfter: 3,
    thresholdsCrossed: 0
  },

  tacHandoff: {
    triggered: true,
    resolverId: "personnel_tac",
    preferredCategory: null
  },

  woundHandoff: {
    triggered: false,
    count: 0,
    woundType: null,
    thresholds: [],
    overflowDamage: 0
  },

  stateChanges: []
}
```

The resolver describes changes. The application decides whether and how to apply them to a linked entity.

---

## 10. Penetration Data

```js
{
  id: "anti_armor",
  ignoresArmoredHalving: true,
  drMode: "half"
}
```

Supported values:

```js
[
  "standard",
  "piercing",
  "anti_armor",
  "siege"
]
```

The standard penetration ladder does not reduce AV.

---

## 11. Cover and Concealment Data

Cover AV presets:

```js
{
  none: 0,
  light: 3,
  medium: 5,
  heavy: 7
}
```

Concealment modifiers:

```js
{
  none: 0,
  light: -3,
  medium: -5,
  heavy: -10
}
```

Cover and concealment are independently selectable.

Cover does not normally have Health or Integrity.

---

## 12. Aegis Target

```js
{
  type: "aegis_shield",
  av: 20,
  dr: 5,
  currentIntegrity: 30,
  maximumIntegrity: 30
}
```

The Aegis is a separate target layer.

Overflow is returned for manual follow-through.

The resolver does not automatically continue into worn armor.

---

## 13. Wound Resolver Input

```js
{
  woundType: "gunshot",
  requestedSeverity: null,
  threshold: "first",
  deadlyAuthorized: false,
  traumaDampening: null,
  traumaDampeningUsesRemaining: 0,
  armorFunctioning: true,
  forcedRoll: null
}
```

Threshold severity access:

```text
First Wound: Light / Moderate
Second Wound: Light / Moderate / Severe
Third Wound: unrestricted
```

Compact tables may bypass severity selection.

---

## 14. Wound Result Metadata

```js
{
  woundType: "gunshot",
  threshold: "first",
  mode: "severity_banded",
  originalSeverity: "moderate",
  severity: "light",
  severitySource: "threshold_roll",
  roll: 4,
  result: {},

  traumaDampeningApplied: true,
  traumaDampeningId: "trauma_dampening",
  traumaDampeningReason: "applied",
  traumaDampeningMaximumUses: 1,
  traumaDampeningUsesBefore: 1,
  traumaDampeningUsesAfter: 0,
  traumaDampeningUseConsumed: true
}
```

---

## 15. Personnel TAC Input

```js
{
  breachNumber: 1,
  manualSeverity: null,
  severityShift: 0,
  dampening: false,
  categoryMode: "random",
  preferredCategory: null,
  sealWarning: false,
  hostileEnvironment: false,
  armorState: "intact",
  originalAv: 10
}
```

---

## 16. Personnel TAC Result

```js
{
  baseSeverity: "moderate",
  shiftedSeverity: "moderate",
  dampenedSeverity: "light",
  finalSeverity: "light",

  category: "seal_life_support",
  selectedEvent: {},

  armorStateBefore: "intact",
  armorStateAfter: "light",
  originalAv: 10,
  effectiveAvAfter: 6,

  sealWarningConsumed: true,
  exposureTriggered: false
}
```

Personnel TAC categories:

```js
[
  "electronics",
  "mobility",
  "structural",
  "seal_life_support"
]
```

---

## 17. Armor Damage States

```js
[
  "intact",
  "light",
  "moderate",
  "severe",
  "broken"
]
```

AV recalculation:

```text
Intact: original AV
Light: original AV - 4
Moderate: original AV - 6
Severe: original AV - 10
Broken: AV 0
```

Minimum AV is 0.

Armor state never improves through TAC resolution.

---

## 18. Hazard State

```js
{
  id: "hazard_oxygen_01",
  hazardId: "oxygen",
  label: "Rig Oxygen",
  current: 38,
  maximum: 60,
  unit: "minutes",
  direction: "down",
  tickAmount: 1,
  status: "active",
  notes: "",
  createdAt: "",
  updatedAt: ""
}
```

Hazards are temporary session state.

---

## 19. Session State

```js
{
  activeToolId: "damage",
  activeResultId: null,
  recentResults: [],
  quickEntities: [],
  selectedEntityId: null,
  editingEntityId: null,
  quickEntityErrors: [],
  activeHazards: [],
  preferences: {}
}
```

---

## 20. Deferred Models

The alpha reserves but does not finalize:

- Vehicle TAC event data
- Vehicle TAC resolver result shape
- Ship TAC event data
- Ship TAC resolver result shape
- Ship subsystem state
- Automated chained resolution transactions

These should not be inferred from Personnel TAC.

---

## 21. Alpha Data Lock

Locked for alpha:

- Quick Entity segmented Health model
- Entity-template layering
- Independent group-spawned entities
- Explicit armor-system state
- Damage phase result structure
- Cover and concealment values
- Penetration identities
- Personnel TAC armor-state progression
- Trauma Dampening charges
- Aegis as a separate target
