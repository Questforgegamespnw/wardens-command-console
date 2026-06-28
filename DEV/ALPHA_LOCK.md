# Warden Resolution Console — Initial Alpha Lock

**Status:** Candidate  
**Target:** First table-usable alpha  
**Date:** 2026-06-27

---

## 1. Alpha Definition

The console is alpha-ready when its current tools can be loaded, exercised, and restored without requiring Vehicle TAC or Ship TAC.

The alpha is not feature-complete for all future combat scales.

It is function-complete for the current personnel and general damage workflow.

---

## 2. Included in Alpha

- Application shell and responsive navigation
- Quick Roll
- Standard Test
- Contest
- Calm
- Wounds
- Hazards
- Personnel TAC
- Damage Resolver
- Quick Entities
- Entity role templates
- Team/group templates
- Recent results
- Temporary browser persistence
- Linked-entity damage and wound workflows
- Aegis target resolution
- Cover and concealment
- Penetration ladder

---

## 3. Explicitly Deferred

- Vehicle TAC
- Ship TAC
- Vehicle-specific subsystem consequence tables
- Ship-specific subsystem consequence tables
- Automated chained resolver transactions
- Full campaign integration
- Cloud or account persistence

Deferred items do not block initial alpha.

---

## 4. Required Before Tagging Alpha

### Runtime

- [ ] All ES-module imports load from a local static server.
- [ ] No tool opens to an uncaught exception.
- [ ] All active forms submit.
- [ ] Recent results render and clear.
- [ ] Quick Entities persist and restore.
- [ ] Hazards persist and restore.
- [ ] Linked entity selection survives rerender.
- [ ] Mobile navigation opens and closes.
- [ ] Session tray opens and closes.

### Standard Tests and Contests

- [ ] Exact-target result is Narrow Success.
- [ ] Degree bands match `RULES_DECISIONS.md`.
- [ ] Contest same-band behavior is visible.
- [ ] Manual rolls do not get replaced.

### Wounds

- [ ] First, second, and third Wound restrictions work.
- [ ] Compact tables ignore disabled severity input.
- [ ] Manual severity identifies itself.
- [ ] Trauma Dampening consumes only on reduction.
- [ ] Linked entity uses decrement and persist.
- [ ] Broken armor disables remaining dampening access.

### Personnel TAC

- [ ] Breach profiles produce expected weighted severities.
- [ ] Preferred category works.
- [ ] Random category works.
- [ ] Seal Warning persists until seal/life-support.
- [ ] Armor state only worsens.
- [ ] AV recalculates from original AV.
- [ ] Complete Failure disables all armor systems.

### Damage

- [ ] d5, d10, and d100 selectors work.
- [ ] Manual die lists validate against selected die size.
- [ ] `[Armored]` halves each die.
- [ ] Fixed damage halves as a total.
- [ ] Cover resolves before target AV.
- [ ] Target AV breach triggers one TAC.
- [ ] DR may stop Health damage after TAC.
- [ ] Anti-Armor halves DR.
- [ ] Siege ignores DR.
- [ ] Direct Wounds skip damage math.
- [ ] Aegis returns overflow and stops.
- [ ] Segmented Health overflow is correct.
- [ ] Linked Quick Entity state updates correctly.

### Quick Entities

- [ ] Manual creation works.
- [ ] Template creation deep-copies state.
- [ ] Group spawning creates independent entities.
- [ ] Duplicate creates a new ID.
- [ ] Delete removes only the selected entity.
- [ ] Armor-system state is preserved.
- [ ] Current Health remains within one Wound band.

### Persistence Safety

- [ ] Corrupt local data fails safely.
- [ ] Clear-session behavior is verified.
- [ ] Storage keys are documented.
- [ ] A schema version is added or explicitly deferred with a ticket.

---

## 5. Known Alpha Limitations

- Vehicle and ship hits may produce generic Damage results without dedicated TAC consequence resolution.
- Some handoffs require the Warden to open the next resolver manually.
- Cover destruction remains narrative rather than tracked.
- Aegis overflow requires manual follow-through.
- Quick Entities are not campaign actors.
- Browser storage is not authoritative.
- Entity templates are starting points, not full loadout simulations.

---

## 6. Alpha Tag Recommendation

Recommended tag:

```text
v0.1.0-alpha
```

Recommended branch state:

```text
alpha-lock
```

Recommended lock rule:

> After alpha lock, mechanical changes require either a failing test, a documented table-play issue, or a deliberate rules decision update.

---

## 7. Documentation Gate

The following documents should ship with the alpha:

- `README.md`
- `DEV/ARCHITECTURE.md`
- `DEV/DATA_MODEL.md`
- `DEV/RESOLVER_CONTRACT.md`
- `DEV/RULES_DECISIONS.md`
- `DEV/TEST_CHECKLIST.md`
- `DEV/ROADMAP.md`
- `DEV/ALPHA_LOCK.md`
- `CHANGELOG.md`
