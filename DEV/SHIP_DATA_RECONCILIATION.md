# Ship Resolver Data Reconciliation

**Status:** Pre-implementation audit  
**Purpose:** Identify what the current ship data already supports and what must change before coding.

# Existing Data Coverage

## `ship-classes.js`

Already covers:
- Class 0–VIII
- Hull and PR ranges
- weapon-size and hardpoint ranges
- damage-model families
- major sections
- environment-scale districts
- class lookup

Required additions:
- standard minimum Weapon Size constants
- helper for damage model
- helper for pooled Hull
- helper for major-section requirement
- helper for district-scale targets

Suggested helpers:

```js
export const STANDARD_MINIMUM_SHIP_WEAPON_SIZE = 1;
export const SPECIAL_MINIMUM_SHIP_WEAPON_SIZE = 0;

export function getShipDamageModel(classId) {}
export function usesPooledHull(classId) {}
export function requiresMajorSection(classId) {}
export function usesDistrictIntegrity(classId) {}
```

## `ship-role-templates.js`

Already covers role identity and stat/Hull/PR/hardpoint biases.

Not required for the first resolver implementation.

Use later for Ship Entity templates after the user supplies the ship batch.

Required pre-coding changes: none.

## `ship-rules.js`

Already covers:
- severity ladder and rank
- penetration identities
- distance bands
- hit quality
- final severity effects
- severity shifting
- lookups

Required changes:

### Penetration
Replace descriptive-only Siege, Capital, and Anti-Capital handling with explicit class-sensitive rules.

### Weapon-size helpers

```js
export function getMinimumMeaningfulWeaponSize(classId) {}
export function hasShipWeaponOvermatch(weaponSize, classId) {}
```

Contract:

```text
minimum meaningful size = max(1, classId - 2)
except explicit Size-0 weapon exceptions
```

### Severity metadata
- Solid must expose target choice: 1 Hull or Minor Ship TAC.
- Catastrophic must expose optional Megadamage eligibility.
- Glancing must expose a temporary-consequence requirement.

## `ship-stac.js`

Already covers:
- Minor, Moderate, Severe, Broken
- broad severity effects
- granular locations
- major-section associations
- small-ship crisis rule
- location lookup

Required changes:

### Add final sheet categories

```js
export const SHIP_TAC_CATEGORIES = Object.freeze([
  "sensors_fire_control",
  "mobility_thrusters",
  "armor_structure",
  "power_systems",
  "crew_habitation",
  "weapons",
  "life_support_seal",
  "cargo_mission_asset",
]);
```

### Re-map locations
Each location should include:

```js
{
  id,
  label,
  category,
  majorSection,
  tags
}
```

### Add condition ladder

```js
export const SHIP_SYSTEM_CONDITIONS = Object.freeze([
  "operational",
  "degraded",
  "compromised",
  "failing",
  "destroyed",
]);
```

### Add repeated-hit minimums

```js
export const SHIP_TAC_MINIMUM_BY_CONDITION = Object.freeze({
  operational: "minor",
  degraded: "moderate",
  compromised: "severe",
  failing: "broken",
  destroyed: "redirect",
});
```

### Add crisis helpers
Add explicit Class 0 and Class I–II crisis rules.

### Add actual outcome tables
The current file only provides generic severity guidance. Ship TAC coding requires category- or location-specific outcomes.

Recommended structure:

```text
data/ship-tac/
├── categories.js
├── locations.js
├── outcomes.js
└── conditions.js
```

## `ship-weapons.js`

Already covers:
- weapon labels and sizes
- base severity
- penetration
- range
- tags
- alternate and conditional behavior
- defensive-only systems
- direct system attacks
- torpedo minimum Ship TAC
- capital warnings

Required changes:

### Normalize weapons into profile arrays
Current optional fields vary by weapon. Normalize them into a consistent structure:

```js
{
  id,
  label,
  tags,
  authorization,
  profiles: [
    {
      id,
      label,
      weaponSize,
      baseSeverity,
      penetration,
      rangeBands,
      hullDamageMode,
      minimumShipTacSeverity,
      preferredTacCategories,
      notes
    }
  ]
}
```

This should mirror the successful editable weapon-preset pattern used by the general Damage Resolver.

### Add preferred Ship TAC metadata
Examples:
- Heavy Disabling Laser → Sensors / Fire Control, Weapons, Power / Systems
- Ion Snare → Power / Systems, Mobility / Thrusters
- Military Railgun → Armor / Structure, Weapons, Power / Systems

### Add target metadata
Point defense needs explicit profiles for missiles, drones, and shuttles.

### Normalize authorization

```text
normal
military
executive
scenario
```

## `ground-fire-against-ships.js`

Already covers:
- ground/vehicle translation categories
- ship Weapon Size ranges
- vulnerability states
- exposed targets

Required changes:

### Add defaults
Each translation should have an editable default in addition to its range.

```js
defaultShipWeaponSize
shipWeaponSizeRange
```

### Categorize vulnerability states
Suggested tags:

```text
permission
exposure
position
mission_constraint
open_compartment
already_damaged
```

### Map exposed targets
Add preferred Ship TAC category and location metadata.

Examples:
- thrusters → Mobility / Thrusters
- radiators → Power / Systems
- external weapons → Weapons
- open bays → Cargo / Mission Asset
- crew → Crew / Habitation

# New Data Files Required

## `data/ship-tac/categories.js`
- eight sheet categories
- labels
- sort order
- descriptions
- compatible major sections

## `data/ship-tac/locations.js`
- granular locations
- category mapping
- major-section mapping
- hazard and crew-exposure tags

## `data/ship-tac/outcomes.js`
- category/location outcomes
- severity
- effect text
- stat changes
- disabled functions
- countdowns
- hazard handoffs
- crew handoffs
- Megadamage recommendations

## `data/ship-tac/conditions.js`
- operational condition ladder
- condition rank
- repeated-hit minimum severity
- paper-sheet translation
- escalation helpers

## `data/ship-entity-templates.js`
Deferred until the user supplies the ship batch.

# New Runtime Modules

## `modules/ship-combat-resolver.js`
- validate range
- normalize weapon profile
- apply hit quality
- apply meaningful-size floor
- apply overmatch
- apply penetration
- apply vulnerability
- calculate final severity
- calculate Hull result
- generate Ship TAC handoff
- generate Megadamage eligibility
- return state preview

## `modules/ship-tac-resolver.js`
- normalize severity
- apply repeated-hit minimum
- select category
- select location
- select outcome
- calculate condition transition
- calculate crisis state
- generate hazard handoffs
- generate crew handoffs
- return state preview

## `modules/ship-entities.js`
- validate Ship Entity
- create and update Ship Entity
- apply confirmed Ship Combat results
- apply confirmed Ship TAC results
- preserve immutable updates
- calculate unresolved crisis counts
- support persistence

# New Renderers

## `renderers/ship-combat-renderer.js`

Form:
- linked Ship Entity
- attack source
- weapon preset/profile
- range
- hit quality
- target class
- target PR
- target Hull
- vulnerability toggle
- exposed system
- forced test controls
- Megadamage choice

Result:
- calculation
- final severity
- Hull consequence
- Ship TAC handoff
- Megadamage eligibility
- preview
- Apply to Ship

## `renderers/ship-tac-renderer.js`

Form:
- linked Ship Entity
- severity
- category mode
- preferred category
- location mode
- preferred location
- existing condition
- unresolved crisis count
- forced test controls

Result:
- category/location
- severity
- condition transition
- outcome
- stat/function effect
- hazard handoffs
- crew handoffs
- crisis change
- preview
- Apply to Ship

## `renderers/ship-entities-renderer.js`

Initial scope:
- create/edit minimal Ship Entity
- list/select ships
- show Hull, PR, Megadamage
- show eight system conditions
- show active Ship TAC
- show crisis state
- load into Ship Combat
- load into Ship TAC

# Application Integration

Tool registration:

```text
Resolve
- Ship Combat

Consequences
- Ship TAC

Session
- Ship Entities
```

Session tray compact display:
- label
- class
- Hull
- PR
- Megadamage
- unresolved Severe/Broken count
- critical system conditions

Persistence additions:

```js
shipEntities: [],
selectedShipEntityId: null
```

Storage schema versioning should be added during this implementation.

# Recommended Coding Order

```text
1. Reconcile ship-rules.js
2. Reconcile ship-stac.js
3. Normalize ship-weapons.js
4. Reconcile ground-fire-against-ships.js
5. Add Ship Entity model
6. Implement Ship Combat resolver
7. Implement Ship Combat renderer
8. Add Ship TAC outcome data
9. Implement Ship TAC resolver
10. Implement Ship TAC renderer
11. Implement Ship Entity tracker
12. Add session tray integration
13. Add deterministic tests
14. Run live ship-combat test
```

# Blocking Decisions Remaining

None.

Ship Entity templates are deferred until the user supplies the ship batch.

The resolver and entity contracts are sufficiently locked for implementation.
