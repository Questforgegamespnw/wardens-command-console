# Warden Resolution Console — Alpha Test Checklist

**Status:** Initial alpha gate  
**Date:** 2026-06-27

Use a local static server. Do not validate the module build through direct `file://` loading.

---

## 1. Startup

- [ ] `index.html` loads without console errors.
- [ ] `app.js` imports all modules.
- [ ] Default tool renders.
- [ ] Tool navigation renders all active tools.
- [ ] Deferred tools are absent or clearly labeled.
- [ ] Session tray renders.

---

## 2. Quick Roll

- [ ] d100 works.
- [ ] d20 works.
- [ ] d10 works.
- [ ] d5 works.
- [ ] Multiple dice work.
- [ ] Manual values remain visible.

---

## 3. Standard Test

- [ ] Success under target.
- [ ] Exact target is Narrow Success.
- [ ] Narrow Failure begins at target + 1.
- [ ] Highest bands trigger at ±30.
- [ ] Manual roll works.
- [ ] Result appears in recent history.

---

## 4. Contest

- [ ] Success beats failure.
- [ ] Better degree wins.
- [ ] Same-band simultaneous outcome is available.
- [ ] Same-band distance tiebreak works.
- [ ] Exact tie preserves tie/status quo.
- [ ] Mutual failure remains visible.

---

## 5. Calm

- [ ] Generated roll works.
- [ ] Manual roll works.
- [ ] Calm change is visible.
- [ ] Invalid input produces safe error output.

---

## 6. Wounds

- [ ] First Wound only allows Light/Moderate.
- [ ] Second Wound allows through Severe.
- [ ] Third Wound permits full table.
- [ ] Manual severity is identified.
- [ ] Threshold roll source is identified.
- [ ] Compact table roll source is identified.
- [ ] Deadly authorization is enforced.
- [ ] Standard dampening has 1 use.
- [ ] Plus dampening has 2 uses.
- [ ] Light result spends no use.
- [ ] Qualifying non-Light result becomes Light.
- [ ] Excluded hazard does not trigger dampening.
- [ ] Broken/nonfunctioning armor blocks dampening.
- [ ] Linked entity state overrides manual controls.
- [ ] Linked use count persists after consumption.

---

## 7. Personnel TAC

- [ ] Breach 1 weight smoke test.
- [ ] Breach 2 weight smoke test.
- [ ] Breach 3 weight smoke test.
- [ ] Manual severity works.
- [ ] Random category works.
- [ ] Preferred category works.
- [ ] Seal Warning applies only to seal/life-support.
- [ ] Seal Warning remains after other categories.
- [ ] Light armor-state result worsens correctly.
- [ ] Moderate armor-state result worsens correctly.
- [ ] Severe armor-state result worsens correctly.
- [ ] Broken state sets AV to 0.
- [ ] State never improves.
- [ ] Hostile-environment exposure appears when appropriate.
- [ ] Severe Structural only disables Strength assistance.
- [ ] Complete Failure disables all armor systems.

---

## 8. Damage Resolver

- [ ] d5 selected.
- [ ] d10 selected.
- [ ] d100 selected.
- [ ] Automatic dice rolls.
- [ ] Manual dice rolls.
- [ ] Invalid die values rejected.
- [ ] Dice mode Armored per-die halving.
- [ ] Fixed mode Armored total halving.
- [ ] Piercing bypasses halving.
- [ ] Anti-Armor bypasses halving and halves DR.
- [ ] Siege bypasses halving and DR.
- [ ] Cover AV 3.
- [ ] Cover AV 5.
- [ ] Cover AV 7.
- [ ] Concealment -3.
- [ ] Concealment -5.
- [ ] Concealment -10.
- [ ] Cover normal.
- [ ] Cover ignore.
- [ ] Cover breach.
- [ ] Cover penetration alone does not trigger Personnel TAC.
- [ ] Target AV breach triggers one TAC.
- [ ] Exact AV match does not breach.
- [ ] DR can reduce damage to zero after TAC.
- [ ] Direct Wounds skip damage math.
- [ ] Aegis Integrity damage.
- [ ] Aegis overflow.
- [ ] Aegis stops automatic follow-through.
- [ ] Wound threshold crossing.
- [ ] Multiple threshold crossing.
- [ ] Segmented Health overflow.
- [ ] Linked entity values override manual values.
- [ ] Linked entity update persists.

---

## 9. Quick Entities

- [ ] Manual entity creation.
- [ ] Validation errors display.
- [ ] Edit entity.
- [ ] Duplicate entity.
- [ ] Delete entity.
- [ ] Select entity.
- [ ] Load entity into Damage.
- [ ] Template spawn.
- [ ] Group spawn.
- [ ] Group members have distinct IDs.
- [ ] Group members do not share nested state.
- [ ] Armor-system state renders or persists.
- [ ] Session-board summary matches entity state.

---

## 10. Hazards

- [ ] Create tracker.
- [ ] Tick down.
- [ ] Tick up.
- [ ] Warning state.
- [ ] Critical state.
- [ ] Expired state.
- [ ] Pause.
- [ ] Resolve.
- [ ] Persist and restore.

---

## 11. Session and Persistence

- [ ] Recent results persist.
- [ ] Quick Entities persist.
- [ ] Hazards persist.
- [ ] Active tool restores.
- [ ] Selected entity restores or fails safely.
- [ ] Clear recent results.
- [ ] Clear hazards.
- [ ] Clear Quick Entities/session data.
- [ ] Corrupt stored JSON does not crash startup.

---

## 12. Responsive and Accessibility

- [ ] Desktop three-column layout.
- [ ] Mid-width layout.
- [ ] Mobile single-column layout.
- [ ] No horizontal scrolling.
- [ ] Tool drawer keyboard accessible.
- [ ] Session tray keyboard accessible.
- [ ] Visible focus states.
- [ ] Form labels connected.
- [ ] Result regions announce changes appropriately.
- [ ] Color is not the sole status indicator.

---

## 13. Deferred Tests

Not required for alpha:

- Vehicle TAC resolver
- Ship TAC resolver
- Ship subsystem state
- Automated handoff chaining
