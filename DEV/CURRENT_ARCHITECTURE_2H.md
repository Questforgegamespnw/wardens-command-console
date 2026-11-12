# Warden Console — Verified Architecture (Phase 2H)

**Reconciled:** 2026-11-11  
**Basis:** `questforge-warden-console(6).zip` with released 2H-1 → 2H-4 patches applied in order. This is a reconstructed baseline, not a post-2H-4 synchronized repository export.  
**Verification:** 155/155 automated tests passed in 2H-5; Warden browser-confirmed team creation, duplication, manual edits and live State Bar updates. Full page-reload restoration has **not** been confirmed.

## Product boundary

The Warden Console is a standalone, browser-based Mothership resolution and temporary state-tracking tool, not a complete combat simulator or campaign database. It must remain useful without Foundry. Stats and skills are optional for Quick Entities; manual override remains a first-class workflow.

## Layer ownership

| Layer | Primary files | Owns |
|---|---|---|
| Authored catalogs | `data/personal-equipment.js`, `data/armor-mechanics.js`, `data/entity-templates/`, other `data/` tables | Immutable starting definitions and authored mechanical parameters |
| Pure mechanics | `modules/damage-resolver.js`, personnel/vehicle/ship resolvers, consequence modules | Calculations, validation, consequences, deterministic state transitions |
| Entity and equipment instances | `modules/occupant-suit-registry.js`, `modules/weapon-instance-registry.js`, `modules/vehicle-instance-registry.js` | Stable identities, condition, resources, equipment ownership and relationships |
| Assembly | `modules/quick-entity-assembly.js`, `modules/quick-entity-batch-assembly.js`, `modules/quick-entity-state-operations.js` | Creation and batch/duplicate coordination without UI coupling |
| Session graph validation | `modules/session-integrity.js` | Quick Entity and equipment graph validation prior to restoring that graph |
| Host/UI | `app.js`, `renderers/`, `styles/` | Browser events, presentation, persistence, tool navigation |

`modules/personal-damage-resolver.js` is retired legacy code. `modules/damage-resolver.js` is the authoritative general damage pathway. Do not reinstate a second implementation.

## Entity creation and ownership

- Quick Entity chooses **personnel** or **vehicle**; ships are handled separately.
- Personnel archetype supplies a starting person; armor/suit and weapon selections reference catalog IDs and remain editable before creation.
- A single creation action assembles an occupant, optional independent suit, equipped weapon and optionally carried secondary weapon; relationships use IDs rather than embedding live equipment state into the person.
- Personnel Health and wounds belong to the occupant. Suit AV, DR, condition, seals, air and dampening charges belong to the suit. Weapon condition, ammo and attachments belong to the weapon instance.
- Vehicle chassis assembly creates independent vehicle and mount IDs. Chassis loadout strings are **descriptive**, not canonical weapon IDs; crew stations are optional and must reference existing occupants rather than inventing personnel.
- Group creation and duplication allocate fresh IDs for each assembled instance; state assembly rejects invalid batches without partially modifying the caller's state.
- An entity's creation-time equipment fields may be historical. The live occupant/suit registry determines currently equipped armor after doff or transfer.

## Damage and consequence semantics

- Personnel `Armored` halves **each die** before AV (round down), except Anti-Armor bypasses per-die halving and halves DR. Cover precedes target AV. Armor breach may generate a suit TAC even if DR stops occupant damage.
- Conventional damage stops at the first crossed wound threshold. First wound caps at Moderate, second at Severe, third unrestricted. Authored direct wounds are handled separately.
- Trauma dampening belongs to a functioning suit and consumes a charge only when it actually reduces a qualifying wound to Light.
- A single attack may commit occupant damage and create **separate pending suit TAC and personnel wound consequences**. These are not additional attacks.
- `modules/personnel-consequence-lifecycle.js` acknowledges pending consequences idempotently, with provenance validation; **acknowledgement does not execute a TAC's mechanical effect**. Executing an authored effect must go through its appropriate resolver.

## Persistence and integrity: exact scope

`app.js` serializes browser-local session state (`storageSchemaVersion: 3` in the inspected code). `restoreSessionState()` calls `validateSessionSnapshot()` before assigning the Quick Entity and equipment registries. The validator checks IDs and cross-links among Quick Entities, occupants, suits, weapons, vehicles, mounts and crew stations, plus selected Quick Entity references.

**Not whole-session atomic validation:** recent results, pending actions, hazard trackers, ship entities, multi-step challenges and their selections have separate restoration checks. The storage schema version is recorded but is not yet enforced as a formal migration contract. The browser's live State Bar update has been verified; save → full page reload → restored relationships has not yet been browser-confirmed.

## Future Foundry v14 integration (design intent, not implemented)

Keep a shared host-independent homebrew engine and two host adapters: standalone console and Foundry. Inspect the actual Foundry v14 Mothership system repository before selecting Actor/Item mappings, hooks or extension packaging. Foundry must preserve vanilla behavior by default, with configurable, dependency-aware homebrew toggles; switching a toggle off must not erase existing state. No Foundry compatibility is currently claimed.

## Known debt and non-goals

1. Add whole-session validation and storage-version migrations; add full browser save/reload round-trip tests.
2. Test actual execution (not just acknowledgement) of suit TAC and personnel wound effects in both orders.
3. Reconcile legacy `data/entity-templates/armor-packages.js` compatibility consumers before retiring it.
4. Extract further `app.js` orchestration only when changing a concrete pathway; avoid a broad rewrite.
5. Map vehicle loadout labels to canonical weapons only when authored mappings exist; do not invent stats or crew.
6. Preserve temporary standalone operation; no multiplayer, full campaign persistence or Foundry dependency is implied.

See `DEV/PHASE_2H_STABILIZATION_BACKLOG.md` for acceptance checks.
