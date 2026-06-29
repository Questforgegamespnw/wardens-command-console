# Warden Resolution Console

A lightweight, standalone browser console for resolving mechanical uncertainty during live **Mothership** play.

The Warden Resolution Console is built for the moment when the table already knows what is happening and needs a fast, transparent answer to:

> How does this resolve?

It provides dedicated tools for percentile tests, contests, damage, wounds, armor consequences, vehicle consequences, Calm, environmental hazards, and temporary combat-state tracking without requiring a backend, account system, campaign database, or virtual tabletop.

## Live Version

Run the current GitHub Pages build here:

**https://questforgegamespnw.github.io/wardens-command-console/**

The live page tracks the current deployed state of the repository and may be ahead of a tagged release while the project remains in alpha development.

---

## Project Status

**Current stage:** Active alpha development

The application has moved beyond the original pre-alpha shell and now supports a stable working set of live-play tools.

### Active tools

- Standard Test
- Contest
- Damage Resolver
- Calm
- Wounds
- Personnel TAC
- Vehicle TAC
- Environmental Hazards
- Quick Entities
- Recent-result history
- Temporary browser-session persistence

### Current quality-of-life systems

- Canonical skill selectors with editable bonuses
- Editable weapon presets
- Multi-profile weapons
- Linked Quick Entity damage
- Personnel and vehicle templates
- Grouped entity-template selection
- Persistent vehicle subsystem state
- Result-first center display
- Desktop and mobile layouts
- Session-tray summaries

### Still deferred or intentionally incomplete

- Ship TAC / STAC
- Full ship subsystem tracking
- Automatic chained execution between Damage, TAC, and Wounds
- Full campaign persistence
- Quest Forge integration
- Ammunition, reload, firing-arc, and hardpoint simulation
- Multiplayer or shared-session synchronization
- Full rules-reference search

See [`CHANGELOG.md`](CHANGELOG.md) for recent implementation changes and [`DEV/ROADMAP.md`](DEV/ROADMAP.md) for planned development.

---

## What This Project Is

The console is a **mechanical resolution tool**.

It is designed to:

- resolve uncertain actions quickly
- make calculation steps visible
- preserve manual Warden control
- support generated or entered rolls
- track temporary encounter state
- reduce rule lookup during live play
- keep common weapons, skills, and entity profiles one click away
- remain usable without a framework or backend

The console favors editable defaults rather than locked automation.

A preset should accelerate the common case, not prevent the Warden from changing the fiction.

---

## What This Project Is Not

The Warden Resolution Console is not intended to become:

- a full character sheet manager
- a campaign database
- a virtual tabletop
- a lore archive
- a narrative generator
- a multiplayer combat tracker
- a replacement for Quest Forge
- the upstream source of canonical homebrew rules

Quick Entities are temporary session records, not complete campaign actors.

Browser persistence is a convenience feature, not authoritative long-term storage.

---

## Project Boundary

The broader tool ecosystem follows this separation:

```text
Quest Forge
What is happening?

Warden Resolution Console
How is it resolved?

Mothership Homebrew Archive
What are the canonical rules and design truths?
```

The console consumes curated mechanical data from the homebrew archive.

It should not duplicate the full archive or absorb campaign and narrative responsibilities from Quest Forge.

For the deeper architectural boundary, see [`DEV/ARCHITECTURE.md`](DEV/ARCHITECTURE.md).

---

## Running the Console

### Use the live GitHub Pages build

Open:

**https://questforgegamespnw.github.io/wardens-command-console/**

No installation is required.

### Run locally with Live Server

This is the primary local workflow used during development.

1. Clone or download the repository.
2. Open the repository folder in Visual Studio Code.
3. Install the **Live Server** extension if needed.
4. Open `index.html`.
5. Select **Open with Live Server**.

The console uses native ES modules, so opening `index.html` directly through a `file://` URL is not recommended.

### Run locally with Python

From the repository root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Other static servers

Any static HTTP server that serves the repository root should work.

Examples include:

```bash
npx serve
```

or:

```bash
npx http-server
```

No build command, package installation, database, or environment file is currently required.

---

## Browser Storage

The console stores temporary session state in browser `localStorage`.

Current stored state may include:

- active tool
- recent results
- selected result
- Quick Entities
- selected Quick Entity
- hazard trackers
- selected hazard tracker
- session-tray preferences

Important limitations:

- storage is local to the current browser and device
- clearing site data removes the session
- stored state is not a campaign save
- no cloud synchronization is provided
- schema migrations are not yet guaranteed during alpha development

For the current state model, see [`DEV/DATA_MODEL.md`](DEV/DATA_MODEL.md).

---

## Tool Overview

## Standard Test

Resolves one percentile action or Save.

Supports:

- roll-under percentile resolution
- margin-based degree bands
- generated or manual rolls
- advantage and disadvantage
- situational modifiers
- canonical skill selection
- custom skill names and values
- editable skill bonuses

Action calculation:

```text
Base Stat
+ highest relevant Skill bonus
+ situational modifiers
= Final Target
```

Save calculation:

```text
Save
+ situational modifiers
= Final Target
```

Canonical skill bonuses:

```text
Untrained: +0
Trained: +10
Expert: +15
```

Skill bonuses do not stack. Doctrine pairings may reduce a meaningful penalty or enable a specialized approach, but do not add another flat skill bonus.

Detailed percentile and skill behavior belongs in [`DEV/RULES_DECISIONS.md`](DEV/RULES_DECISIONS.md).

---

## Contest

Resolves two participants against their own percentile targets.

Each side may have:

- its own base value
- its own skill
- its own modifiers
- its own roll mode
- a generated or manual roll

Contest comparison uses:

1. degree band
2. whether simultaneous resolution is possible
3. distance from each side's own target
4. status quo or shared consequence on an exact tie

Raw percentile rolls are not compared as if both participants had the same target.

The full comparison contract is documented in [`DEV/RESOLVER_CONTRACT.md`](DEV/RESOLVER_CONTRACT.md) and the locked rule interpretation is recorded in [`DEV/RULES_DECISIONS.md`](DEV/RULES_DECISIONS.md).

---

## Damage Resolver

Resolves attacks against:

- personnel
- vehicles
- structures
- ships
- Aegis shields

Supported damage modes:

- dice damage
- fixed damage
- direct Wounds

Supported penetration levels:

- Standard
- Piercing
- Anti-Armor
- Siege

The normal defensive order is:

```text
Damage roll
→ [Armored] adjustment
→ Cover AV
→ Target AV
→ TAC trigger when eligible
→ DR
→ Health or Integrity
→ Wound threshold handoff
```

Important distinctions:

- `[Armored]`, AV, and DR are separate properties
- cover and worn or hull armor are separate layers
- TAC may trigger even when DR prevents Health damage
- direct Wounds bypass normal damage calculations only when the Warden deliberately selects that profile
- Aegis shields resolve as separate targets
- Aegis overflow is handled manually rather than silently passing into the next defense layer

### Weapon presets

The Damage Resolver includes editable weapon defaults grouped by:

- Small Arms
- Longarms
- Anti-Tank — Tactical
- Anti-Tank — Extreme Range / Siege
- Grenades and Explosives
- Melee Weapons
- Vehicle Weapons

Selecting a weapon fills the existing fields.

Every field remains editable.

Weapons with multiple meaningful profiles expose an additional profile selector for range, charge, blast placement, target type, or direct-Wound use.

For the full calculation order and state contract, see [`DEV/RESOLVER_CONTRACT.md`](DEV/RESOLVER_CONTRACT.md).

---

## Wounds

Resolves wound-table outcomes by:

- wound type
- available severity
- current Wound threshold
- deadly authorization
- manual or rolled result
- Trauma Dampening state

Current Wound access:

```text
First Wound
→ Light or Moderate

Second Wound
→ Light, Moderate, or Severe

Third Wound
→ unrestricted
```

Trauma Dampening is charge-based:

- standard system: one qualifying use
- enhanced system: two qualifying uses
- an eligible non-Light Wound becomes Light
- already-Light Wounds do not consume a use
- damage and Wound-threshold progression still apply
- linked entity state overrides manual fallback controls

Canonical wound behavior is maintained in [`DEV/RULES_DECISIONS.md`](DEV/RULES_DECISIONS.md).

---

## Personnel TAC

Personnel TAC resolves armor damage after a qualifying breach.

It tracks:

- breach count
- severity weighting
- armor condition
- category
- optional preferred category
- severity shifts
- Seal Warning
- hostile environment
- Trauma Dampening interaction

Personnel TAC categories:

```text
Electronics
Mobility
Structural
Seal / Life Support
```

Personnel TAC is its own consequence family and does not share event tables with Vehicle TAC or future Ship TAC.

---

## Vehicle TAC

Vehicle TAC resolves what a damaged vehicle can no longer do.

Categories:

```text
Mobility
Weapons
Sensors / Fire Control
Crew / Cockpit
Power Systems
Armor / Structure
```

Severity:

```text
Light
Moderate
Severe
Catastrophic
```

Subsystem condition:

```text
Operational
Degraded
Compromised
Failing
Destroyed
```

Repeated relevant subsystem hits escalate minimum severity.

Vehicle TAC can:

- resolve a one-off result
- link to a tracked vehicle
- create a vehicle from a TAC result
- update persistent subsystem records
- use random or preferred category selection
- account for platform type

Vehicle templates and subsystem display are integrated with Quick Entities.

---

## Calm

Handles Calm loss, recovery, panic checks, stress conversion, and Resolve interaction according to the current console rules.

The tool is designed to preserve the distinction between:

- current Calm
- maximum Calm
- Calm loss
- Calm recovery
- stress conversion
- available Resolve

---

## Environmental Hazards

The hazard system creates and advances temporary trackers for:

- air loss
- vacuum exposure
- personnel radiation
- heat
- cold
- toxins
- ship radiation

Hazard trackers may include:

- protection state
- protection timers
- escalation stages
- interval advancement
- Save requirements
- Wound handoffs
- exposure ending or stabilization

Hazards return structured consequences and handoffs rather than directly resolving every downstream injury.

---

## Quick Entities

Quick Entities are lightweight encounter records used during a live session.

They support:

- manual creation
- personnel templates
- vehicle templates
- team or group templates
- editing
- duplication
- deletion
- selection
- loading into compatible resolvers
- temporary damage state
- temporary armor-system state
- vehicle subsystem state

A Quick Entity may track:

- label and type
- AV, DR, and `[Armored]`
- Health per Wound
- current Health
- maximum and remaining Wounds
- statuses
- bleeding
- active TAC
- Trauma Dampening
- vehicle platform type
- vehicle subsystem conditions
- heat clock
- active countdowns
- short Warden notes

### Health model

Health is tracked within the current Wound band.

Example:

```text
Health per Wound: 15
Current Health: 15
Wounds Remaining: 3
```

After 18 damage reaches Health:

```text
15 damage empties the current band
→ one Wound threshold is crossed
→ 3 damage enters the next band
→ Current Health becomes 12
→ Wounds Remaining becomes 2
```

`currentHealth` is not total remaining Health across all Wounds.

The full Quick Entity model is described in [`DEV/DATA_MODEL.md`](DEV/DATA_MODEL.md).

---

## Results and Session Tray

The center workspace displays the full active result above the current resolver.

The right session tray provides condensed access to:

- recent results
- Quick Entities
- hazard trackers

Selecting a recent result brings its full result card back into the center view.

Recent results are intentionally temporary and limited.

---

## Repository Structure

The project uses plain HTML, CSS, and native JavaScript modules.

```text
wardens-command-console/
├── README.md
├── CHANGELOG.md
├── index.html
├── styles.css
├── app.js
│
├── data/
│   ├── entity-templates.js
│   ├── entity-templates/
│   ├── damage-weapon-presets.js
│   ├── skill-presets.js
│   ├── vehicle-tac/
│   ├── wound-severity.js
│   ├── wound-tables.js
│   ├── personnel-tac.js
│   ├── personal-armor.js
│   ├── personal-penetration.js
│   └── trauma-dampening.js
│
├── modules/
│   ├── dice.js
│   ├── percentile.js
│   ├── standard-test.js
│   ├── contest.js
│   ├── damage-resolver.js
│   ├── calm-resolver.js
│   ├── wound-resolver.js
│   ├── personnel-tac-resolver.js
│   ├── vehicle-tac-resolver.js
│   ├── hazard-trackers.js
│   ├── quick-entities.js
│   └── ui-helpers.js
│
├── renderers/
│   ├── shared-renderers.js
│   ├── standard-test-renderer.js
│   ├── contest-renderer.js
│   ├── damage-renderer.js
│   ├── calm-renderer.js
│   ├── wound-renderer.js
│   ├── tac-renderer.js
│   ├── vehicle-tac-renderer.js
│   ├── hazard-renderer.js
│   ├── quick-entities-renderer.js
│   └── skill-preset-renderer.js
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
│   ├── utilities.css
│   └── responsive.css
│
└── DEV/
    ├── README.md
    ├── ALPHA_LOCK.md
    ├── ARCHITECTURE.md
    ├── DATA_MODEL.md
    ├── RESOLVER_CONTRACT.md
    ├── RULES_DECISIONS.md
    ├── SOURCE_MAPPING.md
    ├── TEST_CHECKLIST.md
    └── ROADMAP.md
```

The exact data-file list will continue to expand, but layer ownership should remain stable.

---

## Architecture Summary

The application is separated into five practical layers:

```text
Runtime data
→ Resolver and state modules
→ Application coordination
→ Renderers and DOM
→ Temporary browser state
```

### `data/`

Declarative runtime definitions:

- tables
- profiles
- templates
- weapon presets
- skill presets
- severity rules
- category definitions

Data files should not manipulate the DOM or own browser state.

### `modules/`

Mechanical logic and immutable state helpers:

- dice
- percentile math
- test resolution
- contest comparison
- damage calculation
- wound resolution
- TAC resolution
- hazard progression
- Quick Entity validation and updates

Modules should not render HTML or import `app.js`.

### `renderers/`

Forms, cards, summaries, and result display.

Renderers may format resolver output but should not recalculate mechanics.

### `app.js`

Application coordinator:

- tool registration
- event binding
- input collection
- resolver invocation
- active result
- recent results
- Quick Entity collection
- hazard collection
- local persistence
- desktop and mobile shell behavior

`app.js` should coordinate systems rather than become the home of rule tables or resolver math.

### `styles/`

Design tokens, shell layout, forms, result cards, session tray, tool-specific layouts, utilities, and responsive behavior.

For the authoritative layer rules, see [`DEV/ARCHITECTURE.md`](DEV/ARCHITECTURE.md).

---

## Developer Documentation

The root README is the public project guide.

Detailed technical and rules documentation lives under `DEV/`.

| File | Purpose |
|---|---|
| [`DEV/README.md`](DEV/README.md) | Developer documentation index and maintenance guidance |
| [`DEV/ALPHA_LOCK.md`](DEV/ALPHA_LOCK.md) | Locked alpha scope and release boundary |
| [`DEV/ARCHITECTURE.md`](DEV/ARCHITECTURE.md) | Module boundaries, layer ownership, state ownership, and dependency direction |
| [`DEV/DATA_MODEL.md`](DEV/DATA_MODEL.md) | Shared runtime objects, resolver inputs and outputs, Quick Entities, and session state |
| [`DEV/RESOLVER_CONTRACT.md`](DEV/RESOLVER_CONTRACT.md) | Detailed resolver responsibilities, input normalization, calculation order, and return contracts |
| [`DEV/RULES_DECISIONS.md`](DEV/RULES_DECISIONS.md) | Mechanical truths that should not drift casually |
| [`DEV/SOURCE_MAPPING.md`](DEV/SOURCE_MAPPING.md) | Mapping from canonical homebrew sources into runtime data |
| [`DEV/TEST_CHECKLIST.md`](DEV/TEST_CHECKLIST.md) | Manual and resolver testing expectations |
| [`DEV/ROADMAP.md`](DEV/ROADMAP.md) | Deferred systems, future phases, and known expansion work |
| [`CHANGELOG.md`](CHANGELOG.md) | Implemented changes by development pass |

When a code change alters an architectural boundary, data contract, or locked rule, update the relevant `DEV/` document in the same change.

---

## Source Authority

The intended content flow is:

```text
Mothership Homebrew Archive
            ↓
Curated extraction
            ↓
Console runtime data
            ↓
Resolver logic
            ↓
Warden-facing result
```

The console is downstream of the canonical homebrew archive.

When runtime behavior intentionally transforms, simplifies, or narrows a source rule, record that transformation in:

```text
DEV/SOURCE_MAPPING.md
```

Rule interpretations that should remain stable belong in:

```text
DEV/RULES_DECISIONS.md
```

---

## Development Principles

### Prefer transparent calculation

A result should show enough information for the Warden to understand how it was produced.

Avoid:

- hidden modifiers
- silent state mutation
- silent damage follow-through
- implicit rules that cannot be inspected
- presets that lock the user out of manual correction

### Keep defaults editable

Skill, weapon, entity, armor, and platform presets are starting points.

They should accelerate input without pretending every fictional situation is identical.

### Keep resolver families separate

Personnel TAC, Vehicle TAC, and Ship TAC are separate consequence systems.

Shared UI patterns are useful.

Shared consequence tables are not.

### Preserve state boundaries

Resolver calculation and application-state mutation should remain distinguishable.

Quick Entities are temporary state records.

Canonical campaign truth remains outside this repository.

### Avoid unnecessary framework growth

The project currently uses:

- semantic HTML
- modular CSS
- plain JavaScript
- native ES modules
- browser `localStorage`

A framework, bundler, backend, or database should only be introduced when a demonstrated requirement justifies the added complexity.

---

## Adding or Changing a Resolver

Before changing a resolver:

1. Confirm the canonical rule source.
2. Check [`DEV/RULES_DECISIONS.md`](DEV/RULES_DECISIONS.md).
3. Check the relevant contract in [`DEV/RESOLVER_CONTRACT.md`](DEV/RESOLVER_CONTRACT.md).
4. Place declarative content under `data/`.
5. Place mechanical calculation under `modules/`.
6. Place form and result markup under `renderers/`.
7. Use `app.js` only for coordination and state flow.
8. Add or update test cases in [`DEV/TEST_CHECKLIST.md`](DEV/TEST_CHECKLIST.md).
9. Record source transformations in [`DEV/SOURCE_MAPPING.md`](DEV/SOURCE_MAPPING.md).
10. Update [`CHANGELOG.md`](CHANGELOG.md).

---

## Validation

The current project has no required build pipeline.

At minimum, changed JavaScript files should pass:

```bash
node --check path/to/file.js
```

For multiple changed files:

```bash
node --check app.js
node --check modules/damage-resolver.js
node --check renderers/damage-renderer.js
```

Browser validation should include:

- page initialization
- tool switching
- form submission
- reset behavior
- generated rolls
- manual rolls
- recent-result selection
- linked Quick Entity behavior
- persistence after refresh
- desktop layout
- mobile layout
- browser console errors

Use [`DEV/TEST_CHECKLIST.md`](DEV/TEST_CHECKLIST.md) for the maintained test surface.

---

## Alpha Data Safety

The console is suitable for active playtesting, but alpha rules still apply:

- do not treat browser storage as a permanent campaign save
- expect stored data shapes to change
- verify important state outside the app
- keep the repository under version control
- review resolver output before applying major consequences
- report reproducible problems with the active tool, exact input, and browser console error

---

## Reporting a Problem

A useful issue report should include:

- tool name
- expected behavior
- actual behavior
- exact input values
- whether an entity was linked
- browser and device
- console error, if present
- steps to reproduce
- screenshot when layout is involved
- whether the issue survives a hard refresh

For rule disputes, also identify the canonical source document or the relevant section of [`DEV/RULES_DECISIONS.md`](DEV/RULES_DECISIONS.md).

---

## License and Third-Party Status

A formal repository license and final third-party attribution statement should be added before broad public release.

This project is an independent tool for a customized Mothership play environment. It is not presented as an official Mothership product.

Do not assume that repository availability grants rights beyond the license eventually included with the project.

---

## Current Development Focus

The console is now stable enough that development can shift from proving the shell to improving live-play speed, documentation quality, test coverage, and the remaining resolver families.

Near-term priorities include:

- continued live-play validation
- DEV documentation reconciliation
- Ship TAC design and implementation
- safer state-schema evolution
- broader automated resolver testing
- continued Quick Entity and preset refinement
- clearer handoffs between Damage, Wounds, and TAC
- eventual optional Quest Forge integration

See [`DEV/ROADMAP.md`](DEV/ROADMAP.md) for the maintained development sequence.
