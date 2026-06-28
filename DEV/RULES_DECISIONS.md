# Warden Resolution Console — Rules Decisions

**Document:** `DEV/RULES_DECISIONS.md`  
**Status:** Alpha rules lock  
**Last reconciled:** 2026-06-27

This file records mechanical truths that should not drift casually.

---

## 1. Percentile Tests

- Roll equal to or under final target: success
- Roll over final target: failure
- Margin:

```js
margin = finalTarget - roll;
```

- Exact target is Narrow Success.
- Doubles do not create automatic criticals.
- Degree bands are margin-based.

| Margin | Degree |
|---:|---|
| `30+` | Highest Success |
| `20–29` | Strong Success |
| `10–19` | Success |
| `0–9` | Narrow Success |
| `-1 to -10` | Narrow Failure |
| `-11 to -20` | Failure |
| `-21 to -30` | Severe Failure |
| `-31 or lower` | Highest Failure |

---

## 2. Contests

1. Resolve both sides against their own targets.
2. Compare degree bands.
3. Same-band outcomes may resolve simultaneously when fiction allows.
4. Otherwise compare distance from each side's own target.
5. Exact ties preserve status quo or create a shared consequence.
6. A success always defeats a failure because they occupy different degree bands.
7. Mutual failure remains visible even when one side gains the better relative position.

---

## 3. Wound Threshold Access

```text
First Wound
→ Light or Moderate

Second Wound
→ Light, Moderate, or Severe

Third Wound
→ unrestricted
```

The first wound cannot randomly produce Severe or Deadly.

The second cannot randomly produce Deadly.

Manual severity remains subject to threshold and deadly authorization unless a compact table defines its own procedure.

---

## 4. Trauma Dampening

### Standard

```text
Uses: 1
Trigger: automatic
Effect: qualifying non-Light wound becomes Light
```

### Plus

```text
Uses: 2
Trigger: automatic
Effect: qualifying non-Light wound becomes Light
```

Rules:

- No use is spent on an already-Light wound.
- Damage still applies.
- Wound threshold still advances.
- Armor must be functioning.
- Broken armor removes remaining use access.
- Severe Structural TAC does not disable Trauma Dampening.
- Exhausting Trauma Dampening does not disable electronics, seals, or other armor systems.
- Complete armor failure shuts all armor systems down.
- Linked entity state overrides manual controls.

---

## 5. Personnel TAC Severity

Severity weights:

```js
{
  1: {
    light: 70,
    moderate: 15,
    severe: 10,
    complete: 5
  },

  2: {
    light: 15,
    moderate: 70,
    severe: 10,
    complete: 5
  },

  3: {
    light: 5,
    moderate: 10,
    severe: 70,
    complete: 15
  }
}
```

Within the selected severity and category, TAC outcomes are even-chance.

---

## 6. Personnel TAC Categories

```js
[
  "electronics",
  "mobility",
  "structural",
  "seal_life_support"
]
```

Light, Moderate, and Severe categories use their category tables.

Complete Failure has its own sole armor-destruction result.

---

## 7. Seal Warning

- Seal Warning only applies to future `seal_life_support` TAC.
- It shifts that TAC result up one severity.
- It is consumed only when it applies.
- It remains active when another TAC category occurs.

---

## 8. Personnel Armor States

```text
Intact
Light
Moderate
Severe
Broken
```

AV is always recalculated from original AV:

```text
Intact: original AV
Light: original AV - 4
Moderate: original AV - 6
Severe: original AV - 10
Broken: 0
```

AV loss is not cumulative across state transitions.

Armor state never improves through TAC resolution.

Complete Failure disables all armor systems.

---

## 9. Damage Defense Identity

Three separate properties exist:

```text
[Armored]
AV
DR
```

They must never be inferred from one another.

### `[Armored]`

- Independent tag
- Halves dice individually before summing
- Fixed damage halves once as a total
- Rounds down

Example:

```text
3d10 rolls: 8, 8, 6
[Armored]: 4, 4, 3
Adjusted total: 11
```

### AV

- Flat outer-defense subtraction
- Exactly matching AV does not breach
- Beating tracked target AV triggers at most one eligible TAC

### DR

- Applied after AV breach
- Represents internal resistance or padding
- May prevent Health damage after a TAC-triggering breach

---

## 10. Penetration Ladder

| Penetration | `[Armored]` | DR | AV |
|---|---|---|---|
| Standard | Applies | Full | Full |
| Piercing | Ignored | Full | Full |
| Anti-Armor | Ignored | Half, round down | Full |
| Siege | Ignored | Ignored | Full |

The standard penetration ladder does not reduce AV.

Specific weapon properties may bypass AV or cover separately.

---

## 11. Cover and Concealment

Cover and concealment are independent.

### Cover AV

```text
Light: 3
Medium: 5
Heavy: 7
```

### Concealment penalty

```text
Light: -3 Combat
Medium: -5 Combat
Heavy: -10 Combat
```

Cover is resolved before worn or hull AV.

Cover penetration alone does not trigger Personnel TAC.

Cover is not normally assigned Health or Integrity.

Fiction determines whether cover is damaged, shattered, or destroyed.

---

## 12. Cover Interaction

```text
Normal
→ subtract Cover AV

Ignore
→ skip Cover AV

Breach
→ bypass Cover AV and report that a breach channel was opened
```

The Orion and similar special weapons may use breach or ignore properties.

---

## 13. TAC Trigger from Damage

```text
One resolved weapon attack or volley
→ maximum one TAC
```

Damage dice do not equal bullet count.

TAC triggers when the tracked armor or hull AV is breached.

TAC does not require Health damage.

---

## 14. Damage Modes

### Dice

- Roll each die.
- Apply `[Armored]` per die.
- Supported sizes in the alpha UI: d5, d10, d100.

### Fixed

- Enter one number.
- Apply `[Armored]` to the total.

### Direct Wounds

- Selected manually by the Warden.
- Skip normal damage math.
- Used when the fiction and weapon profile justify it.
- A close-range shotgun does not automatically inflict a direct Wound through heavy armor; the Warden may use its dice profile instead.

---

## 15. Layer Order

Normal attack:

```text
Combat roll with concealment
→ damage roll
→ [Armored] adjustment
→ Cover AV
→ target AV
→ TAC trigger if target AV breached
→ DR
→ Health or Integrity
→ Wound threshold handoff
```

---

## 16. Quick Entity Health

Health is segmented by Wound.

```text
Health per Wound: 15
Current Health: 15
Wounds Remaining: 3
```

An 18-damage result:

```text
15 empties current band
→ one Wound threshold crossed
→ 3 damage enters next band
→ Current Health becomes 12
→ Wounds Remaining becomes 2
```

`currentHealth` is current-band Health, not total Health.

---

## 17. Aegis

- Aegis is a separate directional shield object.
- It does not add AV to worn armor.
- Select Aegis as the target.
- Resolve its AV, DR, and Integrity.
- Return overflow.
- Stop.
- Manually resolve overflow against the next layer when needed.
- No automatic hidden follow-through.

---

## 18. Direct State Authority

When linked to a Quick Entity:

```text
Entity values
→ authoritative
```

Manual fallback remains available only for unlinked resolution.

---

## 19. Deferred Rules

Not locked for alpha:

- Vehicle TAC tables and procedure
- Ship TAC tables and procedure
- Ship subsystem state
- Automated chained damage/TAC/Wound execution

These require separate resolver families.
