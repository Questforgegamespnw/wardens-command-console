# Warden Resolution Console — Roadmap

**Current target:** `v0.1.0-alpha`

---

## Alpha Lock

- Reconcile runtime documentation
- Complete alpha test checklist
- Resolve blocking browser errors
- Confirm segmented Health behavior
- Confirm linked entity state changes
- Add storage schema version or ticket
- Tag `v0.1.0-alpha`

---

## Post-Alpha Priority 1 — Vehicle TAC

Design as a separate resolver family.

Required work:

- Vehicle TAC categories
- Vehicle severity progression
- Vehicle armor/hull state
- Vehicle subsystem consequences
- Crew/cockpit handoffs
- Preferred VTAC integration from weapons
- Vehicle-specific renderer
- Deterministic tests

Do not reuse Personnel TAC events.

---

## Post-Alpha Priority 2 — Ship TAC

Design as a separate resolver family.

Required work:

- Ship scale and damage identity
- Compartment selection
- Hull, power, drive, weapons, sensors, atmosphere, and crew consequences
- Fire and decompression handoffs
- Ship-specific renderer
- Ship subsystem persistence decision
- Deterministic tests

Do not model Ship TAC as Vehicle TAC with larger numbers.

---

## Post-Alpha Priority 3 — Workflow Improvements

- One-click handoff from Damage to Personnel TAC
- One-click handoff from Damage to Wounds
- One-click handoff from TAC to Hazards
- Review/commit interface for linked state changes
- Stronger stale-result protection
- Storage schema migration
- Export/import temporary session state

---

## Post-Alpha Priority 4 — Reference and Integration

- Expand rule-search entries
- Add source mapping
- Add Quest Forge launch link
- Pass temporary target/action context
- Return compact result summaries
- Preserve repository separation

---

## Explicit Non-Roadmap

Not planned without a separate project decision:

- Accounts
- Cloud sync
- Campaign database
- Multiplayer
- VTT
- Full character sheets
- Narrative generation
