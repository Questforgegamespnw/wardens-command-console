# Warden Resolution Console — Architecture

**Document:** `DEV/ARCHITECTURE.md`  
**Status:** Alpha baseline  
**Lock target:** Initial functional alpha  
**Last reconciled:** 2026-06-27

---

## 1. Application Role

The Warden Resolution Console is a standalone static web application for resolving mechanical uncertainty during live Mothership play.

It answers:

> How is this action, consequence, wound, hazard, or damage event resolved?

It does not own:

- Campaign truth
- Scene state
- Factions
- Long-term actor records
- Mission structure
- Narrative generation
- Canonical rule authorship

Those responsibilities remain in Quest Forge, campaign files, or the Mothership homebrew archive.

---

## 2. Alpha Scope

The initial alpha includes:

- Quick Roll
- Standard Test
- Contest
- Calm
- Wounds
- Environmental Hazards
- Personnel TAC
- Damage Resolver
- Quick Entities
- Entity templates and team templates
- Recent results
- Temporary session persistence
- Responsive desktop and mobile shell

Deferred after alpha:

- Vehicle TAC resolver and vehicle-specific result tables
- Ship TAC resolver and ship-specific result tables
- Deeper automated handoff chaining between Damage, TAC, and Wounds
- Full reference-search library expansion
- Quest Forge integration

Vehicle and ship targets may still be represented in Quick Entities and passed through general Damage resolution. Their dedicated TAC consequence resolvers remain intentionally deferred.

---

## 3. Architectural Principles

The alpha architecture is locked around these principles:

- Static web application
- Native ES modules
- Plain JavaScript
- No backend
- No framework requirement
- Declarative runtime data
- Pure resolver modules where practical
- Application state coordinated by `app.js`
- Rendering separated from mechanical calculation
- Temporary session state only
- Explicit calculations and visible overrides
- Mobile usability
- No hidden campaign persistence

---

## 4. Repository Structure

```text
warden-console/
├── index.html
├── styles.css
├── app.js
│
├── data/
│   ├── entity-templates.js
│   ├── entity-templates/
│   │   ├── base-bodies.js
│   │   ├── armor-packages.js
│   │   ├── roles.js
│   │   └── groups.js
│   ├── wound-severity.js
│   ├── wound-tables.js
│   ├── tac-severity-bands.js
│   ├── personal-armor.js
│   ├── personal-penetration.js
│   ├── personnel-tac.js
│   └── trauma-dampening.js
│
├── modules/
│   ├── dice.js
│   ├── percentile.js
│   ├── standard-test.js
│   ├── contest.js
│   ├── calm-resolver.js
│   ├── wound-resolver.js
│   ├── tac-resolver.js
│   ├── damage-resolver.js
│   ├── quick-entities.js
│   └── hazard-trackers.js
│
├── renderers/
│   ├── shared-renderers.js
│   ├── standard-test-renderer.js
│   ├── contest-renderer.js
│   ├── calm-renderer.js
│   ├── wound-renderer.js
│   ├── hazard-renderer.js
│   ├── tac-renderer.js
│   ├── damage-renderer.js
│   └── quick-entities-renderer.js
│
├── styles/
│   ├── tokens-base.css
│   ├── shell.css
│   ├── forms.css
│   ├── results.css
│   ├── session.css
│   ├── quick-entities.css
│   ├── wounds-hazards.css
│   ├── personnel-tac.css
│   ├── damage.css
│   └── responsive.css
│
└── DEV/
    ├── README.md
    ├── ARCHITECTURE.md
    ├── DATA_MODEL.md
    ├── RESOLVER_CONTRACT.md
    ├── RULES_DECISIONS.md
    ├── SOURCE_MAPPING.md
    ├── TEST_CHECKLIST.md
    ├── ROADMAP.md
    └── ALPHA_LOCK.md
```

Exact filenames may differ slightly in the runtime, but the layer ownership below is authoritative.

---

## 5. Layer Ownership

### Runtime Data — `data/`

Owns declarative mechanical content:

- Wound tables
- TAC severity profiles
- Armor definitions
- Penetration definitions
- Trauma Dampening definitions
- Entity template definitions
- Team/group template definitions

Runtime data must not:

- Query the DOM
- Own browser state
- Render HTML
- Call application navigation
- Mutate Quick Entities

### Resolver and State Modules — `modules/`

Own mechanical interpretation and immutable state helpers:

- Dice generation
- Percentile degrees
- Contest comparison
- Wound resolution
- Personnel TAC resolution
- Damage calculation
- Quick Entity validation and creation
- Hazard tracker updates

Modules must not:

- Render HTML
- Query DOM selectors
- Own global application state
- Write directly to local storage
- Import `app.js`

### Presentation — `renderers/`

Owns forms, cards, summaries, and result display.

Renderers may:

- Format resolver outputs
- Render input controls
- Render Quick Entity templates and groups
- Render visible calculation phases

Renderers must not:

- Recalculate mechanics
- Mutate Quick Entities
- Call random services
- Decide TAC or Wound outcomes

### Application Coordination — `app.js`

Owns:

- Tool registry
- Active tool
- Form event coordination
- Resolver invocation
- Recent results
- Active result
- Quick Entity collection
- Selected Quick Entity
- Hazard collection
- Local persistence
- Mobile navigation and session tray

`app.js` coordinates; it should not become the home of resolver math or template definitions.

### Shell and Styles — `index.html`, `styles.css`, `styles/*`

Own:

- Stable DOM mount points
- Responsive layout
- Accessibility structure
- Visual hierarchy
- Mobile and desktop behavior

---

## 6. Dependency Direction

Preferred flow:

```text
data/*
  ↓
modules/*
  ↓
app.js
  ↓
renderers/* and DOM
```

Allowed practical exception:

```text
app.js
  ↓
modules/*
  ↓
data/*
```

Renderers may import shared formatting and escaping helpers.

Avoid:

```text
data/* → modules/*
modules/* → app.js
modules/* → DOM
renderers/* → resolver calculations
```

---

## 7. Tool Registry

Active tools are registered in `app.js`.

Each entry includes:

```js
{
  id,
  label,
  category,
  status,
  render
}
```

Supported status values:

```js
"active"
"placeholder"
"deferred"
```

Vehicle TAC and Ship TAC should appear as deliberate deferred tools or remain absent until their data and resolver contracts are ready. They must not expose incomplete controls that imply finished behavior.

---

## 8. Application State

The alpha state model is session-scoped:

```js
const appState = {
  activeToolId: "standard_test",
  activeResultId: null,
  recentResults: [],
  quickEntities: [],
  selectedEntityId: null,
  editingEntityId: null,
  quickEntityErrors: [],
  activeHazards: [],
  preferences: {},
};
```

Names may vary in the runtime, but ownership does not.

Quick Entities are temporary combat records, not campaign actors.

---

## 9. Quick Entity Architecture

Quick Entities support:

- Manual creation
- Template creation
- Team/group spawning
- Editing
- Duplication
- Deletion
- Selection
- Loading into compatible resolvers
- Temporary state updates

Template architecture:

```text
Base body
→ Armor package
→ Role/loadout template
→ Optional group/team definition
→ Independent Quick Entity instance
```

The stable public data entry point is:

```text
data/entity-templates.js
```

Expanded definitions live under:

```text
data/entity-templates/
```

`modules/quick-entities.js` owns creation, validation, group spawning, updates, duplication, and result application.

`renderers/quick-entities-renderer.js` owns template and group controls.

---

## 10. Damage Resolver Architecture

Damage resolution separates:

1. Attack generation
2. `[Armored]` reduction
3. Cover layer
4. Target AV breach
5. TAC trigger
6. DR reduction
7. Health or Integrity damage
8. Wound threshold handoff
9. Proposed state changes

The resolver supports:

- Dice damage
- Fixed damage
- Direct Wounds
- d5, d10, and d100 damage dice
- Standard, Piercing, Anti-Armor, and Siege penetration
- Cover AV
- Concealment metadata
- Personnel, Aegis, Vehicle, Ship, and Structure targets
- TAC and Wound handoff metadata

The resolver remains mechanically general. Dedicated Vehicle TAC and Ship TAC consequences are deferred.

---

## 11. Personnel TAC Architecture

Personnel TAC is its own resolver family.

Resolution order:

```text
Breach number
→ base severity
→ general severity shift
→ TAC dampening
→ category selection
→ Seal Warning, when applicable
→ final event
→ armor-state worsening
→ AV recalculation
```

Personnel TAC does not share event tables with future Vehicle TAC or Ship TAC.

---

## 12. Wound Architecture

The Wound resolver supports:

- Threshold-derived severity
- Manual severity override
- Compact wound tables
- Deadly authorization
- Trauma Dampening
- Manual and linked-entity state

Linked Quick Entity state is authoritative.

Manual Trauma Dampening controls are fallback only.

Trauma Dampening uses are stored on the entity armor-system state and consumed only when a qualifying non-Light wound is reduced to Light.

---

## 13. Result Architecture

All tools create a recent-result envelope compatible with the application result system.

Resolver-specific metadata remains nested.

The renderer must preserve:

- Source roll
- Adjusted roll or damage
- Calculation phases
- Override source
- State-change proposal
- TAC or Wound handoffs
- Linked entity identity
- Timestamp

Results are temporary session history.

---

## 14. Persistence

Browser storage may persist:

- Recent results
- Quick Entities
- Active hazards
- Selected tool
- Selected entity
- UI preferences

Browser storage is convenience storage, not authority.

Stored data must be validated or safely normalized during restore.

A future schema-version field is recommended before public distribution.

---

## 15. HTML Shell

The alpha shell uses stable regions:

```text
Header
Tool navigation
Active tool workspace
Active result workspace
Session tray
Mobile overlay
```

The uploaded `index.html` already reflects this structure and does not require an alpha-lock rewrite solely for documentation status.

---

## 16. Testing Boundary

Mechanical modules should be testable without the DOM.

Minimum deterministic coverage:

- Percentile degree bands
- Contest comparison
- Wound severity restrictions
- Trauma Dampening charge behavior
- Personnel TAC severity and category flow
- Damage armor/cover/DR phases
- Aegis overflow
- Quick Entity validation and template cloning
- Hazard tracker updates

Browser smoke testing separately covers:

- Module imports
- Tool navigation
- Form visibility
- Linked entity loading
- Result rendering
- Session persistence
- Mobile layout

---

## 17. Alpha Non-Goals

The alpha does not attempt to become:

- A campaign manager
- A character sheet manager
- A VTT
- A multiplayer service
- A cloud application
- A complete rules archive
- A vehicle combat simulator
- A ship combat simulator
- A narrative generator

---

## 18. Alpha Architecture Lock

The following are considered locked for the initial alpha:

- Static native-module application
- Layered data/module/renderer/app separation
- Quick Entities as temporary session records
- Entity-template facade plus branched definitions
- Shared recent-result flow
- Damage phases and defensive-layer identity
- Personnel TAC as a separate resolver
- Vehicle TAC and Ship TAC deferred as separate future resolvers
- No automatic campaign mutation
- No cover integrity tracking
- No hidden multi-layer Aegis follow-through
