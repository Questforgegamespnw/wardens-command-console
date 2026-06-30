# Warden Resolution Console — Roadmap

**Current stage:** Active alpha development  
**Current target:** Ship combat and Ship TAC completion  
**Next stabilization target:** Live-play UI/UX hardening

---

## Current State

The original alpha shell is now substantially complete.

The console currently includes:

- Standard Tests
- Contests
- Damage Resolver
- editable weapon presets
- editable skill presets
- Calm
- Wounds
- Personnel TAC
- Vehicle TAC
- Environmental Hazards
- Quick Entities
- personnel templates
- vehicle templates
- persistent vehicle subsystem state
- recent result history
- local browser-session persistence
- result-first center display
- desktop and mobile layouts

The main unresolved mechanical family is now ship combat and Ship TAC.

---

# Completed Work

## Core Resolution Tools

Completed:

- Standard Test resolver
- Contest resolver
- Damage Resolver
- Calm resolver
- Wound resolver
- Personnel TAC resolver
- Vehicle TAC resolver
- Hazard trackers
- Quick Entity session tracking
- recent result history
- browser persistence

## Damage and Wounds

Completed:

- dice damage
- fixed damage
- direct Wounds
- Standard, Piercing, Anti-Armor, and Siege penetration
- separate `[Armored]`, AV, and DR handling
- cover before target armor
- TAC trigger on qualifying armor breach
- Aegis shield target handling
- segmented Health behavior
- Wound threshold handoff
- first-Wound severity restriction
- second-Wound severity expansion
- unrestricted third Wound
- charge-based Trauma Dampening
- linked Trauma Dampening use tracking

## Personnel TAC

Completed:

- separate Personnel TAC resolver family
- category selection
- severity weighting
- armor-state handling
- Seal Warning handling
- hostile environment handling
- preferred category support
- deterministic forced-roll inputs

## Vehicle TAC

Completed:

- separate Vehicle TAC resolver family
- vehicle-specific categories
- Light, Moderate, Severe, and Catastrophic progression
- vehicle platform types
- persistent subsystem conditions
- repeated subsystem escalation
- random and preferred category selection
- preferred category source support
- linked Quick Entity updates
- vehicle-specific renderer
- vehicle template support
- vehicle subsystem display
- heat clock and countdown display

Remaining Vehicle TAC work:

- formal deterministic regression suite
- broader live-play validation
- any balance corrections revealed by play

## Quick Entities

Completed:

- manual entity creation
- editing
- duplication
- deletion
- personnel templates
- team/group templates
- vehicle templates
- grouped template selection
- linked Damage handling
- linked Wound handling
- linked Vehicle TAC handling
- vehicle subsystem persistence
- session-tray summaries

## Input Quality of Life

Completed:

- grouped skill selector
- automatic Trained `+10`
- automatic Expert `+15`
- Custom / Manual skill option
- editable skill fields after selection
- grouped weapon preset selector
- alternate weapon profiles
- editable damage fields after selection
- result-first center layout
- smooth result reveal
- condensed right-side result history

## Documentation

Completed:

- expanded root README
- live GitHub Pages link
- local Live Server instructions
- repository structure overview
- architecture summary
- developer-document references
- current feature and deferral summary
- updated changelog

---

# Alpha Closure Work Still Open

These are no longer feature-development blockers, but they should be completed before a formal tagged alpha release.

- reconcile all `DEV/` documents against current runtime behavior
- complete the alpha test checklist
- add deterministic tests for Vehicle TAC
- add storage schema versioning or create a locked implementation ticket
- verify persistence after several schema changes
- confirm no blocking browser-console errors
- tag the first formal alpha release

Proposed release target:

```text
v0.1.0-alpha
```

This release does not need Ship TAC if the project prefers to tag the current ground-combat console first.

Alternatively, Ship TAC may be treated as the final alpha feature before tagging.

---

# Mini-Sprint 1 — Ship Combat Resolution

**Goal:** Add a complete ship-scale damage path without treating ships as oversized vehicles.

## Scope

### Ship damage identity

Define and lock:

- ship scale bands
- ship durability model
- hull or integrity model
- armor and penetration interaction
- ship weapon damage profiles
- ship-specific breach thresholds
- compartment exposure rules
- direct ship Wound or critical-damage behavior
- interaction with Aegis or other defensive layers

### Ship weapon presets

Add editable presets for the current ship weapon set.

Presets should support:

- ordinary ship weapons
- heavy ship weapons
- missile or torpedo profiles
- point-defense systems
- spinal or rail weapons
- alternate firing profiles where needed
- preferred Ship TAC category metadata

As with infantry and vehicle weapons, presets must remain editable defaults.

### Damage Resolver integration

Add ship-specific behavior to the existing Damage Resolver without breaking current personnel, vehicle, structure, or Aegis resolution.

Required outcomes:

- ship target selection works cleanly
- ship durability is displayed correctly
- ship armor and DR rules are explicit
- qualifying breaches create a Ship TAC handoff
- direct ship-critical outcomes are deliberate and visible
- linked ship state can be updated or intentionally deferred

## Completion Criteria

- ship damage rules are written and locked
- at least one light, medium, and heavy ship target profile exists
- at least one ordinary, missile, and heavy ship weapon profile exists
- ship damage resolves without using Vehicle TAC logic
- deterministic tests cover blocked, penetrating, and catastrophic hits
- Damage Resolver remains stable for all existing target types

---

# Mini-Sprint 2 — Ship TAC

**Goal:** Resolve ship damage as consequences to compartments, systems, crew, and mission capability.

## Ship TAC categories

Initial category set:

- Hull / Structure
- Power
- Drives / Maneuvering
- Weapons
- Sensors / Fire Control
- Atmosphere / Life Support
- Crew / Command
- Cargo / Mission Systems

The exact category list should be finalized before implementation.

## Severity model

Define:

- Light
- Moderate
- Severe
- Catastrophic

Also define whether Ship TAC uses:

- subsystem condition tracks
- compartment state
- fire state
- decompression state
- crew casualty state
- cascading failures
- repeated-hit escalation

## Required consequences

Ship TAC should support:

- hull breach
- atmosphere loss
- decompression
- fire
- power loss
- drive impairment
- maneuver loss
- weapon disablement
- sensor degradation
- command or crew casualties
- cargo or mission loss
- secondary hazard handoffs

## Persistence decision

Before implementation, decide whether ship state is stored as:

1. a new Quick Entity ship type,
2. a separate lightweight ship tracker,
3. a temporary Ship TAC result only.

Recommended direction:

```text
Separate lightweight ship tracker
```

A ship has enough persistent subsystem state that forcing it into the current Quick Entity model may create unnecessary complexity.

## Completion Criteria

- Ship TAC is a separate resolver family
- no Vehicle TAC event tables are reused
- categories and severity progression are locked
- repeated-hit escalation is defined
- fire and decompression create explicit hazard handoffs
- ship subsystem persistence approach is implemented
- renderer supports both one-off and linked resolution
- deterministic tests cover all severity bands
- at least one live-play scenario is completed

---

# Mini-Sprint 3 — Live-Play UI/UX Hardening

**Goal:** Use actual table play to identify friction rather than adding speculative features.

## Test Focus

Run complete live workflows for:

- Standard Test
- Contest
- Damage
- Wounds
- Personnel TAC
- Vehicle TAC
- Ship Combat
- Ship TAC
- Hazards
- Quick Entities

## Observe

Track:

- number of clicks
- unnecessary scrolling
- repeated manual entry
- unclear labels
- fields that should retain values
- fields that should reset
- output that is too dense
- output that is too condensed
- mobile layout problems
- session-tray overload
- accidental state mutation
- unclear handoffs
- browser-console errors

## Likely UX targets

Only implement these when live testing confirms the need:

- clearer resolver-to-resolver handoff buttons
- keep or clear form-state controls
- stronger selected-entity visibility
- better stale-result indication
- compact and expanded result modes
- search within large preset lists
- faster mobile entity selection
- improved hazard tracker navigation
- improved recent-result filtering
- clearer state-application confirmation

## Completion Criteria

- at least three complete live sessions are observed
- all discovered issues are logged
- blocking issues are fixed
- repeated friction points are prioritized
- speculative feature requests are separated from actual usability failures
- mobile and desktop workflows are both verified

---

# Mini-Sprint 4 — Alpha Release Hardening

**Goal:** Convert the stable playtest build into a deliberately tagged alpha release.

## Required Work

- finish `DEV/` reconciliation
- complete manual regression checklist
- add deterministic resolver tests
- add storage schema version
- document migration expectations
- verify GitHub Pages deployment
- confirm README matches current behavior
- confirm changelog matches current behavior
- confirm no stale deferred items remain
- create release notes
- tag release

Proposed tag:

```text
v0.1.0-alpha
```

## Release Gate

Do not tag while any of the following remain:

- page initialization failure
- resolver crash
- broken persistence
- linked state corruption
- incorrect consequence escalation
- unresolved ship damage contract
- major mobile navigation failure

---

# Later Workflow Improvements

These remain useful but are not part of the next immediate sprint.

- one-click handoff from Damage to Personnel TAC
- one-click handoff from Damage to Vehicle TAC
- one-click handoff from Damage to Ship TAC
- one-click handoff from Damage to Wounds
- one-click handoff from TAC to Hazards
- review-and-commit interface for linked state changes
- stronger stale-result protection
- storage schema migration support
- export temporary session state
- import temporary session state

---

# Later Reference and Integration Work

- expand rule-search entries
- complete source mapping
- add Quest Forge launch link
- pass temporary target context
- pass temporary action context
- return compact result summaries to Quest Forge
- preserve repository and responsibility separation

---

# Explicit Non-Roadmap

Not planned without a separate project decision:

- accounts
- cloud synchronization
- campaign database
- multiplayer
- virtual tabletop
- full character sheets
- narrative generation
- replacing Quest Forge
- absorbing the full homebrew archive

---

# Later System Expansion — Multi-Step Challenges

- Goal: Support extended checks where one roll does not immediately resolve the entire problem.

Multi-Step Challenges represent tasks with a meaningful amount of work, resistance, complexity, or accumulated progress.

## Examples:

- repairing a damaged reactor
- bypassing layered security
- stabilizing a failing patient
- navigating a hazardous route
- decoding an alien signal
- forcing open a fortified system
- completing a long tactical objective under pressure

## Core Model

A challenge has a progress threshold, functioning like challenge Health.

- Challenge Progress Required
    → reduced by successful actions
    → challenge resolves when remaining progress reaches 0

Each check contributes progress based on its degree of success.

## Initial design direction:

- Narrow Success
    → low progress

- Success
    → standard progress

- Critical Success
    → high progress or an additional benefit

- Failure may:
    add no progress
    consume time
    increase danger
    trigger a complication
    worsen the environment
    reduce remaining opportunities
    advance an opposing clock

Skills should influence progress through the existing percentile result rather than adding a separate stacked damage-style bonus.

## Required Design Decisions

- Before implementation, define:
    challenge progress scale
    progress gained by each success degree
    whether critical success grants only progress or also a special benefit
    whether failure removes progress
    whether different skills contribute different amounts
    whether tools, doctrine pairings, or preparation modify progress
    whether multiple characters may contribute in the same round
    whether challenge difficulty changes the target number, total progress, or both
    how time pressure and opposing clocks interact
    how partial completion is recorded
    whether challenges persist in browser storage

## Proposed UI

- A Multi-Step Challenge tool should support:
    challenge label
    total required progress
    current progress
    acting character or side
    base stat
    canonical or manual skill
    modifiers
    generated or manual percentile roll
    degree-of-success result
    progress gained
    complication or clock advancement
    challenge-complete state
    recent action history
    Architecture Direction

## Recommended structure:
```
data/
└── challenge-progress-rules.js

modules/
└── multi-step-challenge.js

renderers/
└── multi-step-challenge-renderer.js
```

The tool should reuse the existing percentile and skill-selection systems rather than duplicating Standard Test logic.

## Completion Criteria
- progress rules are written and locked
- success degrees map consistently to progress
- failure consequences are explicit
- at least three challenge scales are tested
- challenge state persists safely
- multiple contributors can act without corrupting state
- challenge completion is clearly displayed
- the tool remains distinct from ordinary one-roll Standard Tests
- live-play testing confirms that progress tracking reduces bookkeeping rather than adding it

## Roadmap Placement

This belongs after the current Ship Combat, Ship TAC, and live-play UI/UX hardening work.

Recommended order:

Ship Combat
→ Ship TAC
→ Live-Play UI/UX Hardening
→ Multi-Step Challenges
→ Alpha Release Hardening

# Builder section 

Future plans to include a new tab in the warden console to allow for quickly assembling ships, stations, large vessels, and terrestrial establishments

- important to note that we should ensure that there is at least a similar output for the data structure used by the resolver and session tools so they can be used in the resolver tools. 
- 