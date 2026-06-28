# Warden Resolution Console — Resolver Contract

**Document:** `DEV/RESOLVER_CONTRACT.md`  
**Status:** Alpha baseline  
**Last reconciled:** 2026-06-27

---

## 1. General Contract

A resolver receives normalized facts and returns a structured mechanical result.

```text
Input
→ validation
→ random or manual resolution
→ mechanical phases
→ structured result
→ application envelope
→ renderer
```

Resolvers must not render HTML or mutate global application state.

---

## 2. Context Injection

Preferred signature:

```js
resolveThing(input, context = {})
```

Context may provide:

```js
{
  rng: Math.random,
  now: () => new Date().toISOString()
}
```

Deterministic tests should inject both where supported.

---

## 3. Validation

Expected user errors should return structured errors or throw controlled validation exceptions caught by `app.js`.

Invalid manual values must not silently trigger replacement random rolls.

Validation should preserve field identity and a Warden-readable message.

---

## 4. Randomness

Resolvers should use shared dice helpers or injected RNG.

Manual rolls are first-class:

- Validate them.
- Preserve them.
- Mark them as manual.
- Apply the same interpretation as generated rolls.

---

## 5. Immutability

Resolvers and state helpers should avoid mutating:

- Inputs
- Runtime data
- Existing Quick Entities
- Existing hazards
- Existing recent results

State application belongs at the controller boundary.

---

## 6. Standard Test Contract

```js
resolveStandardTest(input, context)
```

Required mechanics:

1. Normalize target and modifiers.
2. Determine final target.
3. Generate or accept percentile roll.
4. Calculate margin.
5. Determine degree band.
6. Return one result.

Margin:

```js
margin = finalTarget - roll;
```

Exact target is Narrow Success.

---

## 7. Contest Contract

```js
resolveContest(input, context)
```

Required mechanics:

1. Resolve both participants against their own targets.
2. Compare degree bands.
3. Permit simultaneous outcomes when fiction allows.
4. Otherwise compare distance from each participant's own target.
5. Preserve exact ties and mutual failures.

Raw percentile rolls are not directly compared across different targets.

---

## 8. Wound Resolver Contract

```js
resolveWound(input, context)
```

Required phases:

1. Validate wound table and threshold.
2. Determine allowed severity range.
3. Roll severity or accept manual severity.
4. Apply deadly authorization and table restrictions.
5. Apply Trauma Dampening.
6. Roll or accept table entry.
7. Return result and dampening state metadata.

Trauma Dampening:

- Automatic
- Charge-based
- Qualifying non-Light wounds become Light
- One charge consumed only when severity is reduced
- Linked entity state overrides manual fallback

Compact wound tables may bypass severity bands.

---

## 9. Personnel TAC Resolver Contract

```js
resolveTac(input, context)
```

Alpha family:

```js
family: "personnel"
```

Required phases:

1. Validate breach number.
2. Determine or accept base severity.
3. Apply general shift.
4. Apply TAC dampening.
5. Determine category.
6. Apply Seal Warning only to seal/life-support.
7. Select event evenly from the valid final pool.
8. Worsen armor state.
9. Recalculate AV from original AV.
10. Return exposure and system effects.

Maximum one Personnel TAC per resolved attack or volley unless a special effect explicitly says otherwise.

---

## 10. Damage Resolver Contract

```js
resolveDamage(input, context)
```

Supported modes:

```js
"dice"
"fixed"
"direct_wounds"
```

### Dice mode phases

1. Validate die count and die size.
2. Generate or accept each die.
3. Apply penetration identity.
4. Apply `[Armored]` per die when not bypassed.
5. Sum adjusted dice.
6. Apply cover interaction and Cover AV.
7. Compare remainder against target AV.
8. Mark target AV breach.
9. Generate at most one eligible TAC handoff.
10. Apply effective DR.
11. Apply remaining damage to Health or Integrity.
12. Detect Wound thresholds.
13. Return state changes and handoffs.

### Fixed mode phases

Same as dice mode except `[Armored]` halves the fixed total once.

### Direct Wounds

Direct Wounds are selected by the Warden.

They skip:

- `[Armored]`
- Cover AV
- target AV
- DR
- ordinary Health arithmetic

They return Wound handoffs.

### Supported die sizes

```js
5
10
100
```

### Cover interaction

```js
"normal"
"ignore"
"breach"
```

`breach` bypasses Cover AV while preserving breach metadata.

### Aegis

The Aegis is selected as the target.

The resolver returns Integrity damage and overflow, then stops.

It does not automatically continue into worn armor.

---

## 11. Quick Entity Module Contract

Key functions:

```js
createQuickEntity()
createEntityFromTemplate()
createEntitiesFromGroupTemplate()
updateQuickEntity()
duplicateQuickEntity()
removeQuickEntity()
getQuickEntity()
replaceQuickEntity()
applyDamageResultToEntity()
createQuickEntitySummary()
```

Requirements:

- Validate nested defense, Health, and conditions.
- Deep-copy template defaults.
- Preserve independent armor-system state.
- Preserve profile metadata and tags.
- Never mutate the source template.
- Never mutate the source entity.
- Group creation returns independent entities.

---

## 12. Hazard Tracker Contract

Tracker helpers return new tracker objects.

Expected operations:

```js
createHazardTracker()
tickHazardTracker()
setHazardTrackerValue()
pauseHazardTracker()
resolveHazardTracker()
```

---

## 13. Application Result Envelope

`app.js` wraps resolver outputs for recent history:

```js
{
  id,
  resolverId,
  label,
  status,
  summary,
  ruling,
  metadata,
  createdAt
}
```

The resolver's detailed result should remain available under `metadata`.

---

## 14. Renderer Contract

Renderers receive facts and produce HTML.

They may:

- Format phases
- Show before/after values
- Show warnings
- Show handoffs
- Show linked-entity authority
- Disable manual fallback fields

They must not:

- Reroll
- Recalculate
- Mutate entities
- Apply TAC
- Spend Trauma Dampening uses
- Infer missing mechanics

---

## 15. Linked Entity Authority

When a compatible resolver links to a Quick Entity:

```text
Quick Entity state
→ authoritative
```

Manual fallback controls are ignored or disabled.

This applies to:

- AV
- DR
- `[Armored]`
- Health per Wound
- Current Health
- Wounds remaining
- Trauma Dampening type
- Trauma Dampening uses
- Armor-system functioning

The controller may apply returned state changes after resolution.

---

## 16. Handoff Contract

Resolvers report handoffs rather than silently chaining them.

### TAC

```js
{
  triggered: true,
  resolverId: "personnel_tac",
  preferredCategory: null
}
```

### Wound

```js
{
  triggered: true,
  count: 1,
  woundType: "gunshot",
  thresholds: ["first"],
  overflowDamage: 3
}
```

The Warden or controller decides when to open and resolve the next tool.

---

## 17. Error Boundary

Expected errors:

- Invalid numeric input
- Unsupported enum
- Missing table
- Impossible linked state
- Invalid manual roll

Unexpected errors:

- Missing module
- Corrupt runtime data
- Broken import
- Unhandled null state

Expected errors should remain inside the tool.

Unexpected errors are caught by `app.js`, logged for development, and shown as safe result errors.

---

## 18. Alpha Test Contract

Resolver tests should cover:

- Manual and generated rolls
- Percentile margins
- Contest same-band behavior
- Wound threshold restrictions
- Compact wounds
- Trauma Dampening charges
- Personnel TAC breach profiles
- Seal Warning persistence
- Armor-state degradation
- Per-die Armored halving
- Fixed-total Armored halving
- Cover before target AV
- AV breach before DR
- Penetration ladder
- Direct Wounds
- Aegis overflow
- Template deep cloning
- Group spawning
- Entity validation

---

## 19. Deferred Resolver Contracts

Not locked in alpha:

- Vehicle TAC resolver
- Ship TAC resolver
- Automated multi-resolver transaction chains
- Ship subsystem persistence

These must be designed as separate families rather than extensions of Personnel TAC.

---

## 20. Alpha Contract Lock

Stable for alpha:

- Resolver-to-renderer boundary
- Application result envelope
- Manual roll transparency
- Linked entity authority
- State-change reporting
- Explicit handoffs
- Damage phase order
- Personnel TAC family separation
- Template deep-copy behavior
