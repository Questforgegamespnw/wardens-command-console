# Ship TAC Resolver Contract

**Status:** Locked for implementation  
**Tool location:** Consequences  
**Resolver ID:** `ship_tac`

## Resolver Boundary

Ship TAC resolves the specific consequence of ship damage.

It is separate from Personnel TAC, Vehicle TAC, Ship Combat, Hazards, and Wounds.

```text
Ship Combat → determines Ship TAC severity
Ship TAC → determines affected category, location, condition, and crisis
Hazards → tracks fire, decompression, radiation, or air loss
Quick Entities → tracks affected crew
Ship Entities → stores persistent ship state
```

Ship TAC never reuses Vehicle TAC event tables.

## Player-Facing Categories

```text
Sensors / Fire Control
Mobility / Thrusters
Armor / Structure
Power / Systems
Crew / Habitation
Weapons
Life Support / Seal
Cargo / Mission Asset
```

Internal IDs:

```text
sensors_fire_control
mobility_thrusters
armor_structure
power_systems
crew_habitation
weapons
life_support_seal
cargo_mission_asset
```

## Granular Locations

### Sensors / Fire Control
- Sensors / Targeting
- Navigation Sensors
- Fire-Control Computer
- Communications / IFF

### Mobility / Thrusters
- Maneuvering Thrusters
- Main Drive / Burn Control
- Jump Drive
- Navigation Core
- Landing / Docking Systems

### Armor / Structure
- Hull Plating
- Structural Frame
- Bulkhead / Compartment
- Hardpoint Mount
- External Radiator
- Docking Spine

### Power / Systems
- Reactor
- Power Routing
- Batteries / Capacitors
- Cooling
- Computer Core
- Control Bus

### Crew / Habitation
- Bridge / Cockpit
- Crew Compartment
- Medbay
- Gravity
- Access Corridor
- Crew Station

### Weapons
- Weapon Mount
- Ammunition Feed
- Capacitor
- Missile Rack
- Turret Traverse
- Point Defense

### Life Support / Seal
- Atmosphere
- Pressure Seal
- Oxygen
- Scrubbers
- Thermal Control
- Radiation Shielding
- Contamination Control

### Cargo / Mission Asset
- Cargo Bay
- Hangar
- Mission Payload
- Passenger Module
- Cryo
- Escape System
- Salvage / VIP / Objective

## Severity Ladder

```text
Minor
Moderate
Severe
Broken
```

### Minor
Possible effects:
- `-10` to one relevant ship check
- Disadvantage on one immediate action
- localized impairment
- alarm, heat, noise, delay, or manual intervention
- one damage-control action clears the temporary consequence

Persistent condition:

```text
Operational → Degraded
```

### Moderate
Possible effects:
- reduce one ship Stat by 5–10
- disable one function until repaired
- partial system failure
- nearby crew Save
- immediate repair or reroute
- major operational limitation

Persistent condition:

```text
Operational → Compromised
Degraded → Compromised
```

### Severe
Possible effects:
- urgent countdown
- fire
- decompression
- radiation
- uncontrolled burn
- overload
- crew casualties
- named compartment crisis
- possible Megadamage

Persistent condition:

```text
Operational / Degraded / Compromised → Failing
```

### Broken
Possible effects:
- destroyed
- vented
- burned out
- severed
- unrecoverable during the scene
- major repair or replacement required

Persistent condition:

```text
Any state → Destroyed
```

## Operational Condition Language

Ship systems use the same condition language as vehicle subsystems:

```text
Operational
Degraded
Compromised
Failing
Destroyed
```

Paper-sheet translation:

```text
Operational → OK
Degraded → Strained
Compromised → Damaged
Failing → Dangerous
Destroyed → Offline
```

The console uses the operational terms. The printed ship sheet may retain its existing terms.

## Repeated-Hit Escalation

```text
Operational → no minimum escalation
Degraded → minimum Moderate
Compromised → minimum Severe
Failing → minimum Broken
Destroyed → redirect to connected system, compartment, Hull, or Megadamage
```

A repeated hit escalates or spreads rather than creating an identical duplicate.

## Category and Location Selection

Category modes:

```text
Random
Preferred
Forced
```

Preferred sources may include:
- weapon profile
- exposed target
- attack position
- Warden choice
- named compartment

Location modes:

```text
Random within category
Preferred location
Forced location
```

Every result resolves as:

```text
Category
→ Location
→ Severity
→ Effect
```

## Small-Ship Crisis Rule

### Class I–II

```text
1 unresolved Severe or Broken Ship TAC
→ active crisis

2 unresolved Severe or Broken Ship TAC
→ probably disabled

3 unresolved Severe or Broken Ship TAC
→ abandon ship, surrender, or die
```

### Class 0

```text
1 Severe or Broken
→ probably disabled

2 Severe or Broken
→ loss of craft likely
```

The resolver generates the ruling and crisis state. It does not automatically destroy the ship.

## Hazard Handoffs

Ship TAC creates structured handoffs rather than advancing hazards directly.

### Fire
- location
- urgency
- countdown
- spread risk
- crew exposure
- systems at risk

### Decompression
- breached compartment
- pressure-loss state
- sealable routes
- connected compartments
- exposed crew
- oxygen impact

### Radiation
- source
- affected section
- protection status
- intensity
- crew exposure
- personnel hazard handoff

### Crew Casualties
- station or compartment
- Save requirement
- possible Wound handoff
- operator vacancy
- ship-stat penalty

Ship TAC does not directly roll Personnel Wounds.

## Megadamage Escalation

Ship TAC may recommend or force Megadamage when:
- a Severe result becomes uncontrolled
- a Broken result affects a critical system
- a repeated hit strikes a Destroyed system
- fire, decompression, or radiation exceeds containment
- the Warden chooses a ship-wide catastrophe

Megadamage remains explicit.

## Ship Entity Application

```text
Resolve
→ preview
→ Apply to Ship
```

Preview includes:
- category condition before/after
- exact location
- severity
- effect text
- stat changes
- disabled functions
- countdown
- hazard handoffs
- crew handoffs
- crisis state
- Megadamage recommendation

## Suggested Result Shape

```js
{
  resolverId: "ship_tac",
  severity: "moderate",

  category: {
    id: "power_systems",
    label: "Power / Systems"
  },

  location: {
    id: "reactor",
    label: "Reactor"
  },

  subsystem: {
    previousCondition: "degraded",
    nextCondition: "compromised",
    minimumSeverityApplied: "moderate"
  },

  outcome: {
    id: "reactor_output_fluctuation",
    label: "Reactor Output Fluctuation",
    effectText: "...",
    statChanges: [],
    disabledFunctions: [],
    countdown: null
  },

  handoffs: {
    hazards: [],
    crew: [],
    megadamageRecommended: false
  },

  crisis: {
    unresolvedSevereCountBefore: 0,
    unresolvedSevereCountAfter: 0,
    state: "stable"
  }
}
```

## Deterministic Inputs

Required testing controls:
- forced severity
- forced category
- forced location
- forced outcome roll
- existing condition
- existing last severity
- unresolved Severe/Broken count
- ship class
- hostile environment
- linked Ship Entity ID

## Non-Goals

Ship TAC does not initially:
- manage full repair downtime
- calculate repair costs
- roll crew Wounds
- advance hazard trackers
- perform ship attack rolls
- simulate every installed component
- manage campaign debt or custody
