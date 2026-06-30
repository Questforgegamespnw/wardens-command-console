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
- Vehicle TAC resolver
- Vehicle TAC category selection using random or preferred-category resolution
- Vehicle TAC severity progression across Light, Moderate, Severe, and Catastrophic results
- Persistent vehicle subsystem condition tracking across repeated TAC results
- Vehicle platform support for light vehicles, armored carriers, tanks, walkers, aircraft, drones, and super-heavy platforms
- Wound resolver with charge-based Trauma Dampening
- Quick Entities
- Entity role templates
- Team/group templates
- Vehicle Quick Entity templates
- Vehicle subsystem state, platform condition, heat clock, and countdown display
- Grouped Quick Entity template selector using native option groups
- Linked entity damage, wound, and vehicle subsystem state
- Editable Damage Resolver weapon presets
- Alternate weapon profiles for range, charge, placement, blast exposure, and direct-Wound modes
- Weapon preset groups for Small Arms, Longarms, Anti-Tank, Grenades, Melee Weapons, and Vehicle Weapons
- Hazard tracking
- Recent results and session persistence

### Changed

- Quick Entity Health clarified as Health per active Wound band.
- Entity templates reorganized behind `data/entity-templates.js`.
- Template definitions split into base bodies, armor packages, roles, groups, and vehicle templates.
- Quick Entity templates now include explicit category, group, and sort-order metadata.
- Quick Entity vehicle defaults now pass through template cloning and entity creation.
- Quick Entity cards and the session tray now surface vehicle platform and damaged-subsystem state.
- Personnel TAC separated from Vehicle TAC and future Ship TAC.
- Vehicle TAC repeated-subsystem hits now escalate minimum severity.
- Vehicle TAC results can update linked Quick Entity subsystem records.
- Trauma Dampening changed from severity shifting to limited automatic Light gating.
- Damage identity separated into `[Armored]`, AV, and DR.
- TAC trigger changed to target AV breach rather than Health damage.
- Cover resolves before target armor.
- Aegis follow-through made manual and explicit.
- Damage Resolver presets now populate the existing form rather than introducing a separate weapon-resolution path.
- All weapon preset values remain editable after selection.
- Infantry Railgun classified as an in-engagement, braced anti-armor weapon with charge profiles.
- Orion Anti-Material Rifle classified as an extreme-range, crew-served siege sniper with separate hard-target and occupied-interior profiles.
- Minigun / Rotary Weapon set to 3d10, distinguished from the LMG / SAW through sustained suppression and deeper ammunition capacity.
- Vehicle TAC result-label handling corrected to avoid mixed nullish-coalescing and logical-OR syntax failure.

### Deferred

- Ship TAC
- Automated chained resolver transactions
- Full Quest Forge integration
- Automatic weapon loadout transfer from Quick Entities into the Damage Resolver
- Ammunition, reload, firing-arc, hardpoint, and weapon-action simulation
- Damage Resolver search/filter controls for very large preset libraries
- Non-damaging control grenade presets
- Electronic-warfare and drone mission-effect presets
- Strategic S.H.M.A.C. weapon presets
- Plasma-Thermal Cutter Blade preset


Added
Added Ship Entity chassis-template selection.
Added 50 calibrated Class 0–V templates.
Added grouped template families:
Shipbreaker references
independent
commercial
corporate
government and naval
strategic civilian
Added template metadata for role, ownership, source status, crew scale, damage-control bias, escape capacity, and disablement behavior.
Added automatic population of Hull, PR, Stats, hardpoints, Weapon Size, and default weapon information.
Preserved manual editing after template selection.
Changed
Reframed Shipbreaker chassis as role and stat references rather than direct durability baselines.
Expanded ship combat toward sustained dogfight and naval-exchange pacing.
Separated structural endurance through Hull from defensive resistance through Protection Rating.
Standardized Class 0–V Hull, PR, hardpoint, and Weapon Size calibration bands.
Defined Hull 0 as disablement rather than automatic destruction.
Established Classes VI–VIII as sectional, district, and civic-crisis scales.
Fixed
Corrected Solid ship-combat results to apply 1 Hull and Minor Ship TAC.
Confirmed Breaching as 1 Hull plus Moderate Ship TAC.
Confirmed Catastrophic as at least 2 Hull plus Severe Ship TAC, with Megadamage when applicable.
Deferred
Class VI sectional entity interface.
Class VII district-scale mobile-station interface.
Class VIII civic and strategic continuity interface.
Ship and station generation builder tab.
Chassis-plus-identity overlay workflow.
Automatic export from builders into active Ship Entities.