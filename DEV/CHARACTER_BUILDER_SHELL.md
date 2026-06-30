# Character Builder Shell — Integration Note

## Purpose

This patch creates the first functional Character Builder vertical slice without locking unfinished Career or Specialty mechanics.

It supports:

- identity entry;
- build mode selection;
- Origin selection;
- Origin-filtered Background selection;
- Career selection;
- primary and compatible Specialty selection;
- Scientist suggested or custom Focus selection;
- restricted Agent overlay controls;
- canonical record preview;
- JSON export;
- JSON import.

It intentionally does not yet apply:

- Stat or Save generation;
- Career modifiers;
- skill grants or choices;
- Specialty Edges or Limits;
- equipment packages;
- validation beyond basic record identity;
- public/private export filtering.

## Files

```text
builders/character-builder-shell.js
modules/character-builder-state.js
renderers/character-builder-renderer.js
styles/character-builder.css
character-builder-demo.html
```

Dependencies already expected in the repository:

```text
data/character-record-schema.js
data/character-builder-options.js
```

## Immediate test

Extract the patch into the repository root and open:

```text
character-builder-demo.html
```

through Live Server.

## Main application integration

The shell is designed to mount inside the future top-level Build workspace:

```js
import {
  mountCharacterBuilder
} from "./builders/character-builder-shell.js";

const controller = mountCharacterBuilder(
  document.querySelector("#builder-workspace")
);
```

Add the stylesheet after the main application stylesheet:

```html
<link rel="stylesheet" href="./styles/character-builder.css">
```

Do not register the Character Builder as an ordinary Resolution Console tool. The intended final structure is:

```text
Resolve | Build | Reference
```

This demo page exists only to prove the builder record flow before top-level workspace integration.

## Next development pass

After this shell is stable, add:

1. local draft persistence;
2. record validator integration;
3. core Stat, Save, Health, Calm, Resolve, and Wound-capacity generation;
4. source-tracked package application;
5. public/private export filtering;
6. armor, inventory, and weapon steps.

## Career-to-Specialty Filtering

The Specialty step is restricted by the selected Career.

- Background does not restrict Career. A character may move from a military, scientific, or industrial Background into any current Career.
- Career restricts the visible Specialty list to that Career's explicit `specialtyIds`.
- Changing Career clears the current Specialty when it is not part of the new Career's list.
- The state module rejects a Specialty selection that is not authorized by the selected Career, even if an invalid ID is submitted outside the UI.
- `compatibleCareerIds` remain available as design metadata for later cross-training, advancement, or Warden-override features. They do not expand the normal creation list.

## Android Origin Expansion

The shell now displays the full Android Origin trait package, baseline FTS Handshake protocol hook, and Android-only service Background packages. Androids continue to have access to normal Backgrounds. Android Background skill grants and choices are previewed but are not yet applied automatically.

## Structured Stat and Save Generation

The shell now implements the locked structured generation contract.

### Stats

- 4d10 baseline in Body (stored as `strength`), Speed, Intellect, and Combat.
- Background allocates 2d10 among eligible Stats, maximum 1 die per Stat.
- Career allocates 3d10 among eligible Stats, maximum 2 dice per Stat.
- Specialty allocates 2d10 among eligible Stats; both may be assigned to one Stat.
- No Stat pool may exceed 8d10.
- Generated raw Stat scores are capped at 60.
- Skills apply later and may raise a test target above 60.

### Saves

- 5d10 baseline in Body, Fear, and Sanity.
- Background allocates 1d10 to an eligible Save.
- Career adds 1d10 to each of its two listed Saves.
- Specialty allocates 1d10 to an eligible Save.
- No Save pool may exceed 8d10.
- Generated raw Save scores are capped at 60.
- Skills do not normally apply to Saves.

The Agent overlay never contributes ordinary creation dice.

Generation records preserve allocations, dice pools, individual die results, uncapped totals, and capped totals for audit and export.

## Skill Selection Layer

The standalone shell now includes a required Skills step after Stats & Saves.

- Skills retain their canonical fixed rank: Trained +10 or Expert +15.
- Selecting the same skill again never raises its rank.
- Duplicate fixed grants create a replacement choice from that package.
- Background, Career, and Specialty packages are source-tracked.
- Scientist Researcher and Applied Scientist defining skills are filtered through the selected Focus where a canonical mapping exists.
- Agent overlays do not grant ordinary creation skills.
- Doctrine pairings remain derived and are not selected in this step.


## Generation Record Placement

All creation audit data now lives under `record.generation`:

```js
generation: {
  method: "structured",
  stats: { /* allocations, pools, rolls, totals */ },
  saves: { /* allocations, pools, rolls, totals */ },
  skills: { /* selections, replacements, resolved skills */ },
  rolled: true
}
```

Early test exports that used root-level `skillGeneration` are accepted during import and normalized into `generation.skills`. New exports do not retain the legacy root field.
