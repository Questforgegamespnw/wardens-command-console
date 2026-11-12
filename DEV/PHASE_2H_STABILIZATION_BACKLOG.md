# Phase 2H — Stabilization Backlog and Verification Gate

**Status:** 2H-1 through 2H-5 completed as implemented/tested or assessed; 2H-6 documentation refreshed. Architecture is **conditionally documented, not frozen**.

## Verified in reconstructed codebase

- [x] 2H-1: pending personnel consequence acknowledgement and replay/idempotency tests.
- [x] 2H-2: Quick Entity / equipment relationship graph validation on restore.
- [x] 2H-3: canonical equipment catalog + explicit supplemental armor mechanics.
- [x] 2H-4: group/duplicate orchestration extracted from `app.js`.
- [x] 2H-5: source-level architecture review, 155/155 automated tests passing.
- [x] Warden browser-tested group creation, duplication, manual edit, and State Bar update.

## Verification still required

- [ ] **Browser round trip:** create team; change Health, suit condition and weapon ammunition; save; reload the entire page; verify IDs, values, links and State Bar remain identical.
- [ ] **Invalid session sections:** malformed hazard/ship/challenge/pending-action data must not produce misleading partial restoration; define explicit fail/repair policy.
- [ ] **Schema migrations:** reject unsupported versions or migrate deterministically; retain recoverable original snapshot on failure.
- [ ] **Effect ordering:** execute suit TAC and personnel wound *effects* in both orders; verify one attack's Health and dampening are never double-applied. Acknowledgement-only tests do not cover this.
- [ ] **Transfer ownership:** verify weapon and suit transfers followed by save/reload preserve identities and conditions.
- [ ] **Repository hygiene:** capture a fresh post-2H-4 full repository ZIP or Git commit, reconcile intentional uncommitted edits, run the full suite from that exact revision.
- [ ] **Foundry discovery:** inspect the actual v14 Mothership system source and licensing before designing adapters or toggles.

## Proposed gate before calling architecture frozen

All high-priority persistence and effect-execution items above have automated tests; browser reload is verified; code and docs reference the same pinned revision. Other optional UI extraction may remain deferred.

## Local commands

```powershell
node --test tests/*.test.mjs
```

Use a local HTTP server for browser testing rather than opening `index.html` via `file://`.
