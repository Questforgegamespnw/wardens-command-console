# Ship Combat Resolver Contract

**Status:** Locked for implementation  
**Tool location:** Resolve  
**Resolver ID:** `ship_combat`

## Resolver Boundary

Ship Combat is a dedicated resolver. It does not use the general Damage Resolver path.

```text
General Damage Resolver
→ personnel / vehicles / structures / Aegis

Ship Combat
→ ship-scale weapons / range / severity / PR / Hull / Ship TAC / Megadamage
```

Ship Combat owns weapon profile, range validation, hit quality, scale mismatch, penetration, vulnerability, final severity, Hull consequence, Ship TAC handoff, Megadamage eligibility, and linked Ship Entity previews.

It does not own attack rolls, detailed Ship TAC outcomes, crew Wounds, hazard advancement, or automatic linked-state mutation.

## Core Resolution Order

```text
1. Select weapon or custom attack.
2. Validate range.
3. Determine base severity.
4. Apply weapon-profile effects.
5. Apply hit-quality shift.
6. Resolve weapon-size floor and overmatch.
7. Apply penetration against PR.
8. Apply vulnerability or exposed-system effects.
9. Determine final severity.
10. Apply Hull consequence.
11. Generate Ship TAC handoff.
12. Check Megadamage eligibility.
13. Preview linked Ship Entity changes.
14. Apply only after explicit confirmation.
```

## Severity Ladder

```text
No Effect
Glancing
Solid
Breaching
Catastrophic
```

Severity shifts clamp within the ladder.

### No Effect
- Hull loss: 0
- Ship TAC: none

### Glancing
- Hull loss: 0
- Ship TAC: none by default
- temporary consequence required

Examples include momentary sensor interference, forced course correction, lost lock, one immediate action at Disadvantage, heat warning, or crew thrown from stations.

### Solid

```text
Target chooses:
- lose 1 Hull
OR
- resolve Minor Ship TAC
```

### Breaching
- Hull loss: 1
- Ship TAC: Moderate

### Catastrophic
- Hull loss: 2
- Ship TAC: Severe
- Megadamage eligible, but optional

Additional Hull loss requires an explicit weapon, vulnerability, overmatch, or scenario rule.

## Hit Quality

```text
Weak / Partial Lock → severity -1
Clean Hit → no shift
Strong / Full Lock / Critical → severity +1
```

Strong hit quality shifts severity first. It does not directly trigger Megadamage.

## Range Bands

```text
Close
Short
Medium
Long
Out of Reach
```

- Weapons may attack only in listed bands.
- Long range normally applies Disadvantage.
- Out of Reach cannot be attacked normally.
- Boarding requires Close.
- Short-range boarding requires a closing or attachment procedure.
- Version one validates range but does not roll Battle.

## Protection Rating

```text
Final Severity
= shifted attack severity
- effective PR
```

Effective PR cannot fall below 0.

### None
PR reduction 0.

### Piercing
PR reduction 1.

### Anti-Armor
PR reduction 2.

### Siege
- Class 0–III: ignore PR
- Class IV–V: reduce PR by 3
- Class VI: treat as Anti-Armor unless peer-scale siege
- Class VII–VIII: district or strategic resolution only

### Capital
- Class 0–III: ignore PR and minimum Breaching on a valid hit
- Class IV–V: ignore PR
- Class VI: reduce PR by 3
- Class VII–VIII: target a section or district

### Anti-Capital / Sovereign
- Class 0–VI: scenario-scale overmatch
- Class VII–VIII: target strategic section, district, or integrity track

## Weapon Size and Target Class

Normal minimum Weapon Size is 1.

Weapon Size 0 is reserved for point defense, anti-personnel mounts, improvised light systems, and explicitly small weapons.

### Meaningful attack floor

```text
Weapon Size ≥ Target Class - 2
```

Below the floor, the attack normally has No Effect unless the target is vulnerable, an exposed system is targeted, specialized penetration applies, the section is already damaged, or the scenario defines a weak point.

### Overmatch

```text
Weapon Size ≥ Target Class + 2
→ severity +1
```

Only one overmatch shift applies unless an explicit rule says otherwise.

## Attack Source

```text
Ship Weapon
Ground / Vehicle Weapon
Custom
```

Ground and vehicle attacks translate to ship Weapon Size.

A vulnerability toggle is required:

```text
Vulnerable Target: On / Off
```

When active, a marginal attack may resolve normally, exposed-system selection becomes available, and an optional severity +1 may be applied at Warden discretion. The toggle does not automatically grant all three benefits.

## Exposed Systems

Exposed targeting may permit a marginal attack, set a preferred Ship TAC category or location, or justify a severity increase.

Examples:
- crew
- sensors
- open bays
- landing gear
- thrusters
- radiators
- external weapons
- ramps
- cargo
- already damaged sections

## Special Weapon Contracts

### Point Defense
- ordinary ships: Glancing
- missiles, drones, or shuttles: Solid

### Rigging Gun / Boarding Harpoon
- low direct Hull damage
- Solid or better may create attachment
- may enable boarding at Close
- preferred Ship TAC only when a mount or attachment point is damaged

### ECM / Decoys
Defensive-only in version one. No normal Hull or Ship TAC result.

### Ion Snare
- no Hull damage by default
- Solid → Minor Ship TAC
- Breaching → Moderate Ship TAC
- Catastrophic → Severe Ship TAC
- preferred categories: Power / Systems or Mobility / Thrusters
- PR does not reduce the result unless hardened-system protection applies

### Torpedo
- Base Severity Catastrophic
- Anti-Armor by default
- optional Siege profile
- Clean or Strong hit generates at least Moderate Ship TAC

### Military Railgun
- Base Severity Catastrophic
- Siege against smaller targets
- Anti-Armor against peer hardened targets
- Long range only
- supports exposed-section targeting with a valid firing solution

### Spinal and Sovereign Weapons
Use capital or scenario-scale resolution and display an authorization warning.

## Megadamage

Megadamage is optional unless an explicit rule forces it.

Possible triggers:
- Catastrophic hit
- uncontrolled Severe Ship TAC
- Broken-system escalation
- weapon-specific catastrophe
- capital-scale overmatch
- Warden ruling

Input:

```text
Advance Megadamage?
- No
- Yes, +1
- Custom
```

Track:

```text
01 Fuel Leak
02 Weapons Offline
03 Navigation Offline
04 Fire on Deck
05 Hull Breach
06 Life Support Offline
07 Radiation Leak
08 Dead in the Water
09+ Abandon Ship
```

## Ship Class Damage Models

```text
Class 0–III → pooled Hull
Class IV–V → pooled Hull with major sections
Class VI → sectional capital
Class VII–VIII → district / environment scale
```

Major sections:
- command
- drive
- power
- weapons
- life support
- hangar / cargo
- habitation

Class VII–VIII use strategic integrity, districts, major infrastructure, or scenario objectives rather than ordinary pooled Hull.

## Linked Ship Entity Behavior

```text
Resolve
→ preview changes
→ explicit Apply to Ship
```

Preview includes Hull before/after, Megadamage before/after, Ship TAC severity, preferred category/location, temporary consequence, generated hazards, generated crew consequences, and crisis-state change.
