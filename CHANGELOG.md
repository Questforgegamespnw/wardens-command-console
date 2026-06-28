# Changelog

## Unreleased — Initial Alpha Candidate

### Added

- Damage Resolver
- Dice, fixed, and direct-Wound damage modes
- d5, d10, and d100 damage die selection
- Cover and concealment
- Standard, Piercing, Anti-Armor, and Siege penetration
- Aegis shield target handling
- Personnel TAC resolver
- Wound resolver with charge-based Trauma Dampening
- Quick Entities
- Entity role templates
- Team/group templates
- Linked entity damage and wound state
- Hazard tracking
- Recent results and session persistence

### Changed

- Quick Entity Health clarified as Health per active Wound band.
- Entity templates reorganized behind `data/entity-templates.js`.
- Template definitions split into base bodies, armor packages, roles, and groups.
- Personnel TAC separated from future Vehicle TAC and Ship TAC.
- Trauma Dampening changed from severity shifting to limited automatic Light gating.
- Damage identity separated into `[Armored]`, AV, and DR.
- TAC trigger changed to target AV breach rather than Health damage.
- Cover resolves before target armor.
- Aegis follow-through made manual and explicit.

### Deferred

- Vehicle TAC
- Ship TAC
- Automated chained resolver transactions
- Full Quest Forge integration
