# Warden Resolution Console

A lightweight static web application for resolving Mothership homebrew mechanics during live play.

## Alpha Status

Current target:

```text
v0.1.0-alpha
```

Function-complete alpha scope:

- Quick Roll
- Standard Test
- Contest
- Calm
- Wounds
- Hazards
- Personnel TAC
- Damage Resolver
- Quick Entities
- Entity and team templates
- Recent-result and temporary session state

Deferred:

- Vehicle TAC
- Ship TAC

## Run Locally

Because the project uses native ES modules, run it through a local static server rather than opening `index.html` through `file://`.

Example:

```bash
python -m http.server 8000
```

Then open the local server address in a browser.

## Project Boundary

```text
Quest Forge
→ campaign and narrative state

Warden Resolution Console
→ mechanical resolution

Mothership Homebrew Archive
→ canonical source rules
```

## Alpha Documentation

See:

- `DEV/ALPHA_LOCK.md`
- `DEV/ARCHITECTURE.md`
- `DEV/DATA_MODEL.md`
- `DEV/RESOLVER_CONTRACT.md`
- `DEV/RULES_DECISIONS.md`
- `DEV/TEST_CHECKLIST.md`
- `DEV/ROADMAP.md`

## Important Runtime Truths

- Quick Entities are temporary session records.
- Health is tracked per Wound band.
- `[Armored]`, AV, and DR are separate properties.
- Cover and worn armor are separate layers.
- Personnel TAC is separate from future Vehicle TAC and Ship TAC.
- Aegis shields resolve as separate targets.
