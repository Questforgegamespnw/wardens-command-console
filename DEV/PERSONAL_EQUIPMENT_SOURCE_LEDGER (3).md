# Personal Equipment Source Ledger

**Status:** Working source audit v0.1  
**Scope:** Character-carried, worn, deployed, consumed, or character-associated equipment; starting-kit dependencies; trinkets; patches; and relevant scale-boundary references.  
**Rule:** This ledger preserves source disagreement. It is not yet the final canonical catalog.

## Source hierarchy

1. **Vanilla manuals** — original names, prices, packages, trinkets, patches, and baseline effects.
2. **Codex markdown** — expanded mechanics, tags, limits, variants, access, and setting doctrine.
3. **Runtime data** — implemented resolver structures and normalized rule hooks.
4. **Future builder catalog** — eventual canonical definitions plus character-owned instances.

## Disposition vocabulary

| Code | Meaning |
|---|---|
| `KEEP` | Candidate standalone catalog entry. |
| `ALIAS` | Likely alternate name for another entry; do not merge until reviewed. |
| `VARIANT` | Related model, package, scale, or capability variant. |
| `BUNDLE` | Contains or issues other canonical items. |
| `RULE_HOOK` | Supporting subsystem, status, attachment mode, or resolver behavior rather than owned gear. |
| `BOUNDARY` | Vehicle, ship, facility, or strategic-scale reference kept to prevent category leakage. |
| `CONFLICT` | Sources disagree materially and require a doctrine decision. |

## Ledger field target

The eventual canonical record should be able to hold: `id`, `name`, `aliases`, `family`, `subcategory`, `scale`, `access`, `cost`, `quantity`, `capacity`, `range`, `duration`, `damage`, `woundType`, `penetration`, `armor`, `systems`, `tags`, `relevantSkills`, `mechanicalEffect`, `limitations`, `failureComplications`, `procurement`, `legality`, `startingPackages`, and `sourceProvenance`.

## Coverage summary

| Family | Unique candidate records |
|---|---:|
| Ammunition | 6 |
| Armor / Suit | 9 |
| Industrial / Utility Tool | 28 |
| Medical / Survival | 26 |
| MilSpec / Security Tool | 15 |
| Natural / Unarmed | 1 |
| Patch | 100 |
| Sensor / Scanner / Comms | 22 |
| Shield / Defensive System | 1 |
| Trinket | 100 |
| Weapon | 40 |
| Weapon Attachment — Barrel | 6 |
| Weapon Attachment — Stock | 3 |
| Weapon Attachment — Underbarrel | 4 |
| Weapon Fire Mode | 3 |
| **Total** | **364** |

## Master equipment index

| Ledger ID | Display name | Family | Disposition | Source appearances | Runtime cross-reference | Review note |
|---|---|---|---|---:|---|---|
| `ammo` | Ammo | Ammunition | `KEEP` | 1 | — | — |
| `ap_ammunition` | AP / Piercing Ammunition | Ammunition | `KEEP` | 1 | `ammunition.js:ap` | — |
| `cryo_ammunition` | Cryo Ammunition | Ammunition | `KEEP` | 1 | `ammunition.js:cryo` | — |
| `less_lethal_ammunition` | Less-Lethal / Rubberized Ammunition | Ammunition | `KEEP` | 1 | — | — |
| `phosphorus_dragon_ammunition` | Phosphorus / Dragon Rounds | Ammunition | `KEEP` | 1 | `ammunition.js:phosphorus_dragon` | — |
| `ship_safe_ammunition` | Ship-Safe Ammunition | Ammunition | `KEEP` | 1 | `ammunition.js:ship_safe` | — |
| `advanced_battle_dress` | Advanced Battle Dress | Armor / Suit | `KEEP` | 2 | — | Current codex mechanics are canonical: AV 10 with expanded systems. Vanilla +15 Armor Save is legacy metadata; 1,500-credit price retained provisionally. |
| `aegis_advanced_battle_suit` | Aegis Advanced Battle Suit | Armor / Suit | `KEEP` | 1 | — | Armor definition also embeds shield mechanics; keep links to shield and armor registries. |
| `armored_combat_eva` | Armored Combat EVA | Armor / Suit | `KEEP` | 1 | — | — |
| `combat_hazard_suit` | Combat Hazard Suit | Armor / Suit | `KEEP` | 1 | — | — |
| `eva_suit` | EVA Suit<br><sub>Aliases/labels: Vaccsuit</sub> | Armor / Suit | `KEEP` | 2 | — | Canonical name: EVA Suit. Vaccsuit retained as vanilla alias. Current codex AV 5 and environmental systems are canonical; vanilla price retained provisionally. |
| `hazard_suit` | Hazard Suit | Armor / Suit | `KEEP` | 2 | — | Same item across sources. Codex AV 5 and protection tags are canonical; vanilla source supplies provisional price and baseline description. |
| `juggernaut_class_armor` | Juggernaut-Class Armor | Armor / Suit | `KEEP` | 1 | — | — |
| `standard_battle_dress` | Standard Battle Dress | Armor / Suit | `KEEP` | 2 | — | Current codex AV 7 mechanics are canonical. Vanilla +10 Armor Save is legacy metadata; 750-credit price retained provisionally. |
| `standard_crew_attire` | Standard Crew Attire | Armor / Suit | `KEEP` | 2 | — | Source enrichment resolved. Codex AV 0 and clothing/crew/utility tags are canonical; vanilla 20-credit price retained provisionally. |
| `assorted_tools` | Assorted Tools | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `breaching_collar` | Breaching Collar | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `breaching_frame` | Breaching Frame | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `cargo_net_load_restraint_kit` | Cargo Net / Load Restraint Kit | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `chemlights` | Chemlights | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `cutter_clamp` | Cutter Clamp | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `cutting_torch` | Cutting Torch | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `electronic_tool_set` | Electronic Tool Set | Industrial / Utility Tool | `KEEP` | 2 | — | Source enrichment resolved. Codex +10 electronics effect and specialist limitations are canonical; vanilla 650-credit price retained provisionally. |
| `emergency_sealant_kit` | Emergency Sealant Kit | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `entrenching_tool` | Entrenching Tool | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `exoloader` | ExoLoader | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `explosives_and_detonator` | Explosives & Detonator | Industrial / Utility Tool | `KEEP` | 1 | — | Compare against Satchel Charge and Demolition Charge; likely package/category relationship, not direct alias. |
| `field_fabricator_parts_printer` | Field Fabricator / Parts Printer | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `flashlight` | Flashlight | Industrial / Utility Tool | `KEEP` | 2 | — | Source enrichment resolved. Canonical item supports handheld or shoulder mounting and approximately 20 m / one-band illumination; vanilla 10-credit price retained provisionally. |
| `grapple_launcher` | Grapple Launcher | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `industrial_saw_rescue_saw` | Industrial Saw / Rescue Saw | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `magnetic_boots` | Magnetic Boots<br><sub>Aliases/labels: Mag-Boots</sub> | Industrial / Utility Tool | `KEEP` | 2 | — | Alias resolved. Canonical name: Magnetic Boots; Mag-Boots retained as vanilla alias. Codex mobility profile is canonical; vanilla 55-credit price retained provisionally. |
| `marker_tape` | Marker Tape | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `patch_plate_kit` | Patch Plate Kit | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `portable_air_pump_pressure_equalizer` | Portable Air Pump / Pressure Equalizer | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `portable_floodlight` | Portable Floodlight | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `portable_power_cell` | Portable Power Cell | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `portable_winch_come_along` | Portable Winch / Come-Along | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `rucksack` | Rucksack | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `salvage_drone` | Salvage Drone | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `sealant_shroud` | Sealant Shroud | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `survey_kit` | Survey Kit | Industrial / Utility Tool | `KEEP` | 2 | — | Source enrichment resolved. Codex expanded survey profile is canonical; vanilla 200-credit price retained provisionally. |
| `tether_kit` | Tether Kit | Industrial / Utility Tool | `KEEP` | 1 | — | — |
| `automed` | Automed<br><sub>Aliases/labels: Automed (x6)</sub> | Medical / Survival | `KEEP` | 2 | — | Bundle resolved. Canonical definition is one dose; Automed (x6) is a six-dose package with vanilla package price 300 credits. |
| `camping_gear` | Camping Gear | Medical / Survival | `KEEP` | 1 | — | Compare with MoHab Unit; likely basic bundle versus expanded field shelter. |
| `climbing_harness` | Climbing Harness | Medical / Survival | `KEEP` | 1 | — | — |
| `decontamination_kit` | Decontamination Kit | Medical / Survival | `KEEP` | 1 | — | — |
| `fire_extinguisher` | Fire Extinguisher | Medical / Survival | `KEEP` | 1 | — | — |
| `first_aid_kit` | First Aid Kit | Medical / Survival | `KEEP` | 1 | — | Keep distinct from Trauma Kit unless explicitly upgraded; lower-capability vanilla kit. |
| `foldable_stretcher` | Foldable Stretcher | Medical / Survival | `KEEP` | 1 | — | — |
| `hardpoint_casevac_stretcher` | Hardpoint CASEVAC Stretcher | Medical / Survival | `KEEP` | 1 | — | — |
| `medpack_drug_kit` | Medpack / Drug Kit | Medical / Survival | `KEEP` | 1 | — | — |
| `mohab_unit` | MoHab Unit | Medical / Survival | `KEEP` | 1 | — | — |
| `mre` | MRE<br><sub>Aliases/labels: MRE (x7)</sub> | Medical / Survival | `KEEP` | 2 | — | Bundle resolved. Canonical definition is one MRE; MRE (x7) is a seven-day ration bundle with vanilla package price 70 credits. |
| `oxygen_tank` | Oxygen Tank | Medical / Survival | `KEEP` | 2 | — | Sources resolve to one item: 12 hours normal / 4 hours under stress. Pressurized and explosive hazard retained. |
| `pain_pills` | Pain Pills<br><sub>Aliases/labels: Pain Pills (x6)</sub> | Medical / Survival | `KEEP` | 2 | — | Bundle and mechanics resolved. Canonical definition is one dose: heal 1d10 Health and reduce Stress by 1, with codex painkiller, impairing, addiction, and overdose risks. Pain Pills (x6) is a six-dose package with vanilla package price 450 credits. |
| `portable_iv_fluid_kit` | Portable IV / Fluid Kit | Medical / Survival | `KEEP` | 1 | — | — |
| `portable_quarantine_hood` | Portable Quarantine Hood | Medical / Survival | `KEEP` | 1 | — | — |
| `quarantine_bag_body_bag` | Quarantine Bag / Body Bag | Medical / Survival | `KEEP` | 1 | — | — |
| `radiation_dosimeter_patch` | Radiation Dosimeter Patch | Medical / Survival | `KEEP` | 1 | — | — |
| `radiation_pills` | Radiation Pills | Medical / Survival | `KEEP` | 1 | — | — |
| `rebreather` | Rebreather | Medical / Survival | `KEEP` | 2 | — | Source enrichment resolved. Twenty-minute underwater duration is canonical; codex filter behavior and environmental limitations apply. Vanilla 45-credit price retained provisionally. |
| `sample_case` | Sample Case | Medical / Survival | `KEEP` | 1 | — | — |
| `specialized_water_filter` | Specialized Water Filter<br><sub>Aliases/labels: Water Filter</sub> | Medical / Survival | `MERGE / RENAME` | 2 | — | Rename canonical record to Water Filter. Specialized Water Filter remains an expanded descriptor/model label. Use codex expanded profile and retain vanilla 15-credit price provisionally. |
| `stimpack` | StimPack<br><sub>Aliases/labels: Stimpak</sub> | Medical / Survival | `KEEP` | 2 | — | Canonical single-dose item. Stimpak is a vanilla spelling alias; x6 is a purchasable or starting package quantity, not a separate definition. Current codex effect is canonical. |
| `stimpak` | Stimpak (x6) | Medical / Survival | `MERGE` | 1 | — | Merge into `stimpack`; preserve x6 as package quantity and vanilla package price. |
| `suit_medical_staunching_systems` | Suit Medical Staunching Systems | Medical / Survival | `KEEP` | 1 | — | — |
| `thermal_blanket_emergency_cocoon` | Thermal Blanket / Emergency Cocoon | Medical / Survival | `KEEP` | 1 | — | — |
| `trauma_kit` | Trauma Kit | Medical / Survival | `KEEP` | 1 | — | — |
| `body_cam` | Body Cam | MilSpec / Security Tool | `KEEP` | 2 | — | Source enrichment resolved. Codex command-feed and evidence profile is canonical; vanilla 50-credit price retained provisionally. |
| `door_wedge_lock_bar_kit` | Door Wedge / Lock Bar Kit | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `e_smoke_grenade` | E-Smoke Grenade | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `evidence_collection_kit` | Evidence Collection Kit | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `flashbang_stun_charge` | Flashbang / Stun Charge | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `heads_up_display` | Heads-Up Display | MilSpec / Security Tool | `KEEP` | 2 | — | Source enrichment resolved. Codex tactical-interface profile is canonical; vanilla 75-credit price retained provisionally. |
| `infrared_goggles` | Infrared Goggles | MilSpec / Security Tool | `KEEP` | 2 | — | Source enrichment resolved. Codex thermal-vision limitations are canonical; vanilla 100-credit price retained provisionally. |
| `jetpack` | Jetpack | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `locator` | Locator | MilSpec / Security Tool | `KEEP` | 2 | — | Source enrichment resolved. Codex tracking, spoofing, and signal limitations are canonical; vanilla 45-credit price retained provisionally. |
| `lockpick_suite` | Lockpick Suite<br><sub>Aliases/labels: Lockpick Set</sub> | MilSpec / Security Tool | `KEEP` | 2 | — | Alias resolved. Canonical name: Lockpick Suite; Lockpick Set retained as vanilla alias. Codex electronic-entry profile is canonical; vanilla 40-credit price retained provisionally. |
| `portable_command_slate` | Portable Command Slate | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `portable_computer_terminal` | Portable Computer Terminal | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `restraints` | Restraints | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `signal_scrambler_spoof_tag` | Signal Scrambler / Spoof Tag | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `tactical_breaching_shield` | Tactical Breaching Shield | MilSpec / Security Tool | `KEEP` | 1 | — | — |
| `unarmed` | Unarmed | Natural / Unarmed | `RULE_HOOK` | 1 | `damage-weapon-presets.js:unarmed` | — |
| `acoustic_sensor_contact_mic` | Acoustic Sensor / Contact Mic | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `atmospheric_analyzer` | Atmospheric Analyzer | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `binoculars` | Binoculars | Sensor / Scanner / Comms | `KEEP` | 2 | — | Source enrichment resolved. Canonical base profile uses 20x magnification, with thermal/night-vision options as variants. Vanilla 35-credit price retained provisionally. |
| `bioscanner` | Bioscanner | Sensor / Scanner / Comms | `KEEP` | 2 | — | Source enrichment resolved. Codex 100-meter life-sign profile is canonical; vanilla 150-credit price retained provisionally. |
| `chemical_sniffer` | Chemical Sniffer | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `cybernetic_diagnostic_scanner` | Cybernetic Diagnostic Scanner | Sensor / Scanner / Comms | `KEEP` | 2 | — | Source enrichment resolved. Codex cybernetic/android diagnostic profile is canonical; vanilla 500-credit price retained provisionally. |
| `data_tap_packet_sniffer` | Data Tap / Packet Sniffer | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `emergency_beacon` | Emergency Beacon | Sensor / Scanner / Comms | `KEEP` | 2 | — | Source enrichment resolved. Codex loud, silent, and restricted modes plus signal limitations are canonical; vanilla 30-credit price retained provisionally. |
| `field_recorder` | Field Recorder | Sensor / Scanner / Comms | `KEEP` | 2 | — | Source enrichment resolved. Codex research, biological sampling, and material-analysis profile is canonical; vanilla 50-credit price retained provisionally. |
| `geiger_counter` | Geiger Counter | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `long_range_communications` | Long-Range Communications<br><sub>Aliases/labels: Long-range Comms</sub> | Sensor / Scanner / Comms | `KEEP` | 2 | — | Alias resolved. Canonical name: Long-Range Communications; Long-range Comms retained as vanilla alias. Codex profile is canonical; vanilla 65-credit price retained provisionally. |
| `medscanner` | Medscanner | Sensor / Scanner / Comms | `KEEP` | 2 | — | Source enrichment resolved. Codex diagnostic and forensic profile is canonical; vanilla 150-credit price retained provisionally. |
| `motion_alarm` | Motion Alarm | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `portable_lidar_mapper` | Portable LIDAR Mapper | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `radio_jammer` | Radio Jammer | Sensor / Scanner / Comms | `KEEP` | 2 | — | Current codex 1 km range is canonical. Vanilla 100 km range is legacy metadata; 175-credit price retained provisionally. |
| `recon_drone` | Recon Drone | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `seismic_thumper_ground_sonar` | Seismic Thumper / Ground Sonar | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `short_range_communications` | Short-Range Communications<br><sub>Aliases/labels: Short-range Comms</sub> | Sensor / Scanner / Comms | `KEEP` | 2 | — | Alias resolved. Canonical name: Short-Range Communications; Short-range Comms retained as vanilla alias. Codex profile is canonical; vanilla 30-credit price retained provisionally. |
| `signal_analyzer` | Signal Analyzer | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `signal_flare` | Signal Flare | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `signal_relay_node` | Signal Relay Node | Sensor / Scanner / Comms | `KEEP` | 1 | — | — |
| `handheld_aegis` | Handheld Aegis | Shield / Defensive System | `KEEP` | 1 | — | Distinct from Tactical Breaching Shield; do not merge merely because both are carried shields. |
| `anti_armor_grenade_shaped_charge_grenade` | Anti-Armor Grenade / Shaped Charge Grenade | Weapon | `KEEP` | 1 | — | — |
| `breaching_axe` | Breaching Axe | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:breaching_axe` | — |
| `combat_shotgun` | Combat Shotgun | Weapon | `KEEP` | 2 | `damage-weapon-presets.js:combat_shotgun` | Codex profile is canonical: Close 1 Wound; Nearby 3d10; 4 loaded + 4 side saddle. Vanilla price retained provisionally. |
| `concussion_breach_grenade` | Concussion / Breach Grenade | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:concussion_grenade` | — |
| `crowbar` | Crowbar | Tool / Melee Profile | `KEEP` | 3 | `damage-weapon-presets.js:crowbar` | One utility tool with a weapon profile. Codex 1d5 Blunt Force and prying utility are canonical; price discrepancy deferred to economy audit. |
| `demolition_charge` | Demolition Charge | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:demolition_charge` | — |
| `disposable_anti_armor_launcher` | Disposable Anti-Armor Launcher | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:disposable_anti_armor_launcher` | — |
| `e_smoke_chaff_grenade` | E-Smoke / Chaff Grenade | Weapon | `KEEP` | 1 | — | — |
| `emp_disruption_grenade` | EMP / Disruption Grenade | Weapon | `KEEP` | 1 | — | — |
| `flamethrower` | Flamethrower<br><sub>Aliases/labels: Flame Thrower</sub> | Weapon | `KEEP` | 2 | — | Alias and mechanics resolved. Canonical spelling: Flamethrower. Use codex 1-Wound Nearby cone/stream, area-denial, and lingering-fire profile; vanilla 2,000-credit price retained provisionally. |
| `flare_gun` | Flare Gun | Weapon | `KEEP` | 2 | — | Current codex profile is canonical: 1d5 damage, one loaded flare, Nearby weapon range and Far visual signal. Vanilla 85-credit price retained provisionally. |
| `flashbang_stun_grenade` | Flashbang / Stun Grenade | Weapon | `KEEP` | 1 | — | — |
| `foam_grenade` | Foam Grenade | Weapon | `KEEP` | 1 | — | — |
| `foam_gun` | Foam Gun | Weapon / Control Tool | `KEEP` | 2 | — | Codex control profile is canonical: normally no damage; 1d10 Blunt Force only when impact-hardened or misused. |
| `frag_grenade` | Frag Grenade<br><sub>Aliases/labels: Fragmentation Grenade, Frag Grenade (x6)</sub> | Weapon | `KEEP` | 4 | `damage-weapon-presets.js:frag_grenade` | One grenade definition. Codex exposure bands are canonical; Fragmentation Grenade is an alias and x6 is a package quantity. |
| `gas_grenade` | Gas Grenade | Weapon | `KEEP` | 1 | — | — |
| `grenade_proximity` | Grenade Proximity | Weapon | `KEEP` | 1 | — | — |
| `hand_welder` | Hand Welder | Tool / Weapon Profile | `KEEP` | 2 | — | One industrial tool with a weapon profile. Codex 1d10 Fire/Explosive and contact-time penetration are canonical. |
| `handheld_railgun` | Handheld Railgun | Weapon | `KEEP` | 1 | — | — |
| `heavy_anti_armor_launcher` | Heavy Anti-Armor Launcher | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:heavy_anti_armor_launcher` | — |
| `incendiary_grenade` | Incendiary Grenade | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:incendiary_grenade` | — |
| `laser_cutter` | Laser Cutter | Tool / Weapon Profile | `KEEP` | 2 | — | Canonical personal-scale industrial cutter uses codex profile. Ship-mounted utility laser remains a distinct scale-specific record. |
| `lmg_saw` | LMG / SAW | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:lmg_saw` | — |
| `machine_pistol` | Machine Pistol | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:machine_pistol` | — |
| `mag_mine_limpet_charge` | Mag-Mine / Limpet Charge | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:mag_mine` | — |
| `minigun_rotary_weapon` | Minigun / Rotary Weapon | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:minigun_rotary` | — |
| `nail_gun` | Nail Gun | Tool / Improvised Weapon | `KEEP` | 2 | — | Codex 1d5, 32-shot improvised industrial profile is canonical; vanilla price retained provisionally. |
| `orion_anti_material_rifle` | Orion Anti-Material Rifle | Weapon | `KEEP` | 2 | `damage-weapon-presets.js:orion_anti_material_rifle` | Dedicated lore profile, weapon catalog profile, and damage-resolver preset all coexist. |
| `pistol` | Pistol | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:pistol` | — |
| `pulse_rifle` | Pulse Rifle | Weapon | `KEEP` | 2 | `damage-weapon-presets.js:pulse_rifle` | Codex 2d10 Nearby/Far profile with smart-link and integrated launcher is canonical; vanilla price retained provisionally. |
| `revolver` | Revolver | Weapon | `KEEP` | 2 | `damage-weapon-presets.js:revolver` | Codex 2d10, 6-round, Piercing profile is canonical; vanilla price retained provisionally. |
| `rigging_gun` | Rigging Gun | Tool / Weapon Profile | `KEEP` | 2 | — | Codex 1d10 plus 2d10 on forced removal, one tethered harpoon, Nearby/Far profile is canonical. |
| `satchel_charge` | Satchel Charge | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:satchel_charge` | — |
| `scalpel` | Scalpel | Medical Tool / Melee Profile | `KEEP` | 3 | `damage-weapon-presets.js:scalpel` | One medical tool with a melee profile. Codex 1d10 Bleeding and precision/fragile tags are canonical. |
| `smart_rifle` | Smart Rifle | Weapon | `KEEP` | 1 | — | — |
| `smg` | SMG | Weapon | `KEEP` | 2 | `damage-weapon-presets.js:smg` | Current codex profile is canonical: 3d10, Close/Nearby, 30 rounds, selectable burst/full-auto. Vanilla 1,200-credit price retained provisionally. |
| `sniper_rifle` | Sniper Rifle | Weapon | `KEEP` | 1 | `damage-weapon-presets.js:sniper_rifle` | — |
| `stun_baton` | Stun Baton | Weapon | `KEEP` | 2 | `damage-weapon-presets.js:stun_baton` | Current codex profile is canonical: 1d5 plus Body Save effect, Less-Lethal Wound type, and armor-interaction limitations. Vanilla 115-credit price retained provisionally. |
| `tranquilizer_pistol` | Tranquilizer Pistol<br><sub>Aliases/labels: Tranq Pistol</sub> | Weapon | `KEEP` | 2 | — | Alias and mechanics resolved. Canonical name: Tranquilizer Pistol; Tranq Pistol retained as vanilla alias. Use codex 1 damage plus Body Save, six darts, Close/Nearby profile; vanilla 850-credit price retained provisionally. |
| `vibechete` | Vibechete | Tool / Melee Weapon | `KEEP` | 3 | `damage-weapon-presets.js:vibechete` | Codex 3d10 Bleeding profile is canonical; Massive/Gore applies only when severe-trauma fiction supports it. |
| `choke` | Choke | Weapon Attachment — Barrel | `KEEP` | 1 | — | — |
| `muzzle_brake` | Muzzle Brake | Weapon Attachment — Barrel | `KEEP` | 1 | — | — |
| `ship_safe_barrel` | Ship-Safe Barrel | Weapon Attachment — Barrel | `KEEP` | 1 | — | — |
| `stabilizer` | Stabilizer | Weapon Attachment — Barrel | `KEEP` | 1 | — | — |
| `subsonic_barrel_subsonic_kit` | Subsonic Barrel / Subsonic Kit | Weapon Attachment — Barrel | `KEEP` | 1 | — | — |
| `suppressor_silencer` | Suppressor / Silencer | Weapon Attachment — Barrel | `KEEP` | 1 | — | — |
| `collapsible_stock` | Collapsible Stock | Weapon Attachment — Stock | `KEEP` | 1 | — | — |
| `extended_stock` | Extended Stock | Weapon Attachment — Stock | `KEEP` | 1 | — | — |
| `standard_stock` | Standard Stock | Weapon Attachment — Stock | `KEEP` | 1 | — | — |
| `bipod` | Bipod | Weapon Attachment — Underbarrel | `KEEP` | 1 | — | — |
| `g_launcher` | G-Launcher | Weapon Attachment — Underbarrel | `KEEP` | 1 | — | — |
| `grip` | Grip | Weapon Attachment — Underbarrel | `KEEP` | 1 | — | — |
| `tac_light` | Tac-Light | Weapon Attachment — Underbarrel | `KEEP` | 1 | — | — |
| `burst_b` | Burst `[B]` | Weapon Fire Mode | `RULE_HOOK` | 1 | — | — |
| `full_auto_fa` | Full Auto `[FA]` | Weapon Fire Mode | `RULE_HOOK` | 1 | — | — |
| `single_s` | Single `[S]` | Weapon Fire Mode | `RULE_HOOK` | 1 | — | — |


## Source occurrence details

### Ammunition

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `ammo` | Ammo | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 50 per magazine/box | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `ap_ammunition` | AP / Piercing Ammunition | `Ammo_types.md` | — | Uses normal weapon damage. Uses weapon default Wound Type. Improves penetration by one step within weapon limits. Tags: [Ammo] [AP] [Piercing] |
| `cryo_ammunition` | Cryo Ammunition | `Ammo_types.md` | — | Uses normal weapon damage. Tags: [Ammo] [Cryo] [Thermal Shock] [Slow] [Brittle] [Specialty] |
| `less_lethal_ammunition` | Less-Lethal / Rubberized Ammunition | `Ammo_types.md` | — | Uses normal weapon damage. Wound Type: [Less-Lethal] Tags: [Ammo] [Less-Lethal] [Rubberized] [Blunt Force] [Nonlethal] [Knockdown] |
| `phosphorus_dragon_ammunition` | Phosphorus / Dragon Rounds | `Ammo_types.md` | — | Uses normal weapon damage. Wound Type: [Fire/Explosive] if Wound occurs. Tags: [Ammo] [Phosphorus] [Dragon Rounds] [Fire/Explosive] [Ignition] [Burning] [Smoke] [Hazardous] |
| `ship_safe_ammunition` | Ship-Safe Ammunition | `Ammo_types.md` | — | Uses normal weapon damage. Uses weapon default Wound Type. Tags: [Ammo] [Ship-Safe] [Low-Penetration] [Reduced Overpenetration] [Security] |

### Armor / Suit

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `advanced_battle_dress` | Advanced Battle Dress | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 1500 | Heavy combat outfit; +15% Armor save; small exoskeleton doubles carry. |
| `advanced_battle_dress` | Advanced Battle Dress | `suits_and_armors.md` | — | AV: 10 Tags: [Armored] [Powered] [Heavy] [Exoskeleton] [HUD] [Tac Link] [Comms] [AutoInjector] [Med Suite] [Trauma Dampening] [Targeting] [Ammo Rig] [Utility Mounts] [Powered Carry] [Optional: Sealed] [Optional: O2] |
| `aegis_advanced_battle_suit` | Aegis Advanced Battle Suit | `shields_and_defensive_systems.md` | **Category:** Prototype Advanced Battle Dress / Reactive Supersuit<br>**Tags:** [Armored] [Powered] [Prototype] [Aegis] [Kinetic] | [Reactive Armor] [Projectile Defense] [Fast] [Mobility Assist] [HUD] [Tac Link] [Comms] [Targeting] [AutoInjector] [Med Suite] [Trauma Dampening] [Restricted] [Corporate Supertech] |
| `armored_combat_eva` | Armored Combat EVA | `suits_and_armors.md` | — | AV: 10 Tags: [Armored] [Sealed] [O2] [Pressurized] [Vacuum Rated] [Zero-G] [Maneuver Jets] [Mag] [Tether] [HUD] [Tac Link] [Comms] [AutoInjector] [Med Suite] [Trauma Dampening] [Targeting] [Powered] [Cumbersome] [Boarding] [Utility Mounts] |
| `combat_hazard_suit` | Combat Hazard Suit | `suits_and_armors.md` | — | Treat as Standard Battle Dress or Advanced Battle Dress plus a Hazard Package. |
| `eva_suit` | EVA Suit | `suits_and_armors.md` | — | AV: 5 Tags: [Sealed] [O2] [Pressurized] [Vacuum Rated] [Mag] [Lights] [Comms] [Utility] [Cumbersome] |
| `hazard_suit` | Hazard Suit | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 750 | Air filtration and small air supply; +5% Armor save. |
| `hazard_suit` | Hazard Suit | `suits_and_armors.md` | — | AV: 5 Tags: [Sealed] [Filter] [Resistant] [Chemical Protection] [Biohazard Protection] [Utility] [Comms] [Cumbersome] |
| `juggernaut_class_armor` | Juggernaut-Class Armor | `suits_and_armors.md` | — | AV: 15 DR: 10 Tags: [Armored] [Powered] [Heavy] [Cumbersome] [Exoskeleton+] [HUD] [Tac Link] [Comms] [AutoInjector] [Med Suite] [Trauma Dampening+] [Targeting] [Powered Carry] [Hardpoint] [Ammo Rig] [Utility Mounts] [Reinforced] [Resilient] [Sealed: Optional] [O2: Optional] [Mag: Optional] |
| `standard_battle_dress` | Standard Battle Dress | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 750 | Light plated marine armor; +10% Armor save. |
| `standard_battle_dress` | Standard Battle Dress | `suits_and_armors.md` | — | AV: 7 Tags: [Armored] [HUD] [Tac Link] [Comms] [Ammo Rig] [Utility Mounts] [Marine Issue] |
| `standard_crew_attire` | Standard Crew Attire | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 20 | Basic crew clothing. |
| `standard_crew_attire` | Standard Crew Attire | `suits_and_armors.md` | — | AV: 0 Tags: [Clothing] [Crew] [Utility] |
| `eva_suit` | Vaccsuit | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 1000 | Space movement, radiation/oxygen protection with tank; +7% Armor save. |

### Industrial / Utility Tool

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `assorted_tools` | Assorted Tools | `industrial_tools.md` | **Category:** Tool Kit / Industrial Utility<br>**Tool Subcategory:** Industrial / Repair<br>**Scale:** Personal<br>**Access:** Common<br>**Cost Band:** credits<br>**Damage:** 1d5 if used as weapon<br>**Wound Type:** [Blunt Force] | A basic set of practical hand tools: wrenches, spanners, screwdrivers, pliers, clamps, measuring tools, fastener kits, and other general-use maintenance gear. |
| `breaching_collar` | Breaching Collar | `industrial_tools.md` | **Category:** Special / Boarding Tool<br>**Tool Subcategory:** Industrial / Space Breaching<br>**Scale:** Squad Support / Shipboard<br>**Access:** Commercial Restricted / MilSpec / Salvage Professional<br>**Cost Band:** kcredits to mK depending model<br>**Tags:** [Breaching] [Micro-Airlock] [Seal] [Setup] [Boarding] [Industrial] [Forced Entry] | A portable sealing frame used to cut into pressurized ships, stations, vehicles, and sealed structures without causing immediate uncontrolled decompression. |
| `breaching_frame` | Breaching Frame | `industrial_tools.md` | **Category:** Special / Boarding Tool<br>**Tags:** [Breaching] [Seal] [Micro-Airlock] [Setup] [Boarding] [Industrial] [Squad Entry] | A larger, heavier version of the breaching collar. |
| `cargo_net_load_restraint_kit` | Cargo Net / Load Restraint Kit | `industrial_tools.md` | **Category:** Tool / Load Restraint / Field Utility<br>**Tool Subcategory:** Industrial / Cargo Control<br>**Scale:** Personal / Cargo Support<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Cargo Control] [Load Restraint] [Anchoring] [Shipboard] [Salvage] [Utility] | A bundle of cargo nets, restraint straps, magnetic tie-downs, smart buckles, load hooks, and compression webbing. |
| `chemlights` | Chemlights | `industrial_tools.md` | **Category:** Tool / Disposable Light / Route Marker<br>**Tool Subcategory:** Industrial / Field Utility / Emergency Signal<br>**Scale:** Personal / Disposable<br>**Access:** Common<br>**Cost Band:** credits<br>**Duration:** Usually several hours<br>**Use:** 1 chemlight | Chemlights are disposable chemical light sticks used for marking routes, identifying hazards, signaling, low-light navigation, tagging cleared rooms, and leaving visible trail markers. |
| `crowbar` | Crowbar | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 25 | Advantage on Strength checks to open jammed airlocks or lift heavy objects; weapon-capable. |
| `cutter_clamp` | Cutter Clamp | `industrial_tools.md` | **Category:** Special / Breaching Accessory<br>**Tags:** [Breaching] [Cutting] [Guided Tool] [Setup] [Industrial] | A clamp-mounted cutting guide for laser cutters, plasma torches, or saws. |
| `cutting_torch` | Cutting Torch | `industrial_tools.md` | **Category:** Tool / Industrial Cutter<br>**Tool Subcategory:** Industrial / Breaching<br>**Scale:** Personal<br>**Access:** Common to Commercial<br>**Cost Band:** credits to kcredits<br>**Damage:** 1d10 if used as a weapon<br>**Wound Type:** [Fire/Explosive] or [Bleeding], depending on use | A portable torch used to cut locks, bars, bolts, restraints, panels, vents, light doors, and damaged structural material. |
| `electronic_tool_set` | Electronic Tool Set | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 650 | Detailed electronics repair/construction; +10% to electronics repair rolls. |
| `electronic_tool_set` | Electronic Tool Set | `industrial_tools.md` | **Category:** Tool Kit / Electronics<br>**Tool Subcategory:** Industrial / Electronics<br>**Scale:** Personal / Specialist<br>**Access:** Commercial<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Electronics] [Repair] [Construction] [Technical] [Specialized] | A full set of precision tools for detailed repair, diagnostics, construction, and modification of electronic systems. |
| `emergency_sealant_kit` | Emergency Sealant Kit | `industrial_tools.md` | **Category:** Tool / Emergency Repair / Hull Patch<br>**Tool Subcategory:** Industrial / Shipboard Emergency Repair<br>**Scale:** Personal / Emergency<br>**Access:** Common aboard ships and stations<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Sealant] [Hull Patch] [Pressure Patch] [Emergency Repair] [Shipboard] [Utility] | A compact emergency repair kit containing pressure patches, expanding sealant foam, adhesive plating, quick-cure hull tape, clamp strips, and emergency gasket material. |
| `entrenching_tool` | Entrenching Tool | `industrial_tools.md` | **Category:** Tool / Field Shovel / Improvised Weapon<br>**Tool Subcategory:** Industrial / Field Utility<br>**Scale:** Personal<br>**Access:** Common<br>**Cost Band:** credits<br>**Damage:** 1d5 if used as weapon<br>**Wound Type:** [Blunt Force] or [Bleeding], depending on use | A compact folding shovel used for digging, scraping, trenching, burying, clearing debris, preparing camp, collecting samples, making fire pits, and field survival work. |
| `exoloader` | ExoLoader | `industrial_tools.md` | **Category:** Industrial Exoskeleton / Heavy Loader<br>**Tool Subcategory:** Industrial / Heavy Equipment<br>**Scale:** Powered Platform / Industrial<br>**Access:** Commercial / Industrial Site Equipment<br>**Cost Band:** kcredits to low mK depending model<br>**Damage:** 1 Wound with loader claws<br>**Battery Life:** 48 hours | An open-frame mechanical exoskeleton designed for heavy lifting, cargo movement, loading operations, construction work, and industrial handling. |
| `explosives_and_detonator` | Explosives & Detonator | `industrial_tools.md` | **Category:** Tool / Demolition Charge<br>**Tool Subcategory:** Industrial / Demolition<br>**Scale:** Personal / Squad Support<br>**Access:** Restricted<br>**Cost Band:** kcredits, black market, contract issue, or controlled procurement<br>**Damage:** 1 [Fire/Explosive] Wound to Nearby organisms on failed Body Save<br>**Tags:** [Tool] [Explosive] [Demolition] [Breaching] [Remote Detonator] [Radio Trigger] [Hazardous] [Loud] | A prepared explosive charge with a compatible detonator, powerful enough to breach heavy doors, blast open an airlock, destroy machinery, or collapse vulnerable structures. |
| `field_fabricator_parts_printer` | Field Fabricator / Parts Printer | `industrial_tools.md` | **Category:** Tool / Portable Fabricator / Repair Support<br>**Tool Subcategory:** Industrial / Fabrication<br>**Scale:** Deployable / Specialist<br>**Access:** Commercial / Industrial / Corporate<br>**Cost Band:** kcredits to low mK depending capability<br>**Tags:** [Tool] [Fabrication] [Parts Printer] [Repair] [Feedstock] [Technical] [Utility] | A rugged field fabricator used to print or machine small replacement parts from material feedstock. |
| `flashlight` | Flashlight | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 10 | Handheld or shoulder mounted; illuminates 20m. |
| `flashlight` | Flashlight | `industrial_tools.md` | **Category:** Tool / Illumination<br>**Tool Subcategory:** Industrial / Personal Utility<br>**Scale:** Personal / Handheld<br>**Access:** Common<br>**Cost Band:** credits<br>**Range:** 20 meters or 1 range band<br>**Tags:** [Tool] [Light] [Utility] [Handheld] [Shoulder Mount] | A handheld or shoulder-mounted light source used for navigation, search, repair, and combat visibility. |
| `grapple_launcher` | Grapple Launcher | `industrial_tools.md` | **Category:** Tool / Mobility Launcher<br>**Tool Subcategory:** Industrial / Mobility Gear<br>**Scale:** Personal<br>**Access:** Commercial to Restricted depending model<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Grapple] [Climbing] [Tether] [Mobility] [Rescue] [Launcher] | A compact launcher that fires a grappling hook, smart anchor, magnetic clamp, or spike tether to a distant surface. |
| `industrial_saw_rescue_saw` | Industrial Saw / Rescue Saw | `industrial_tools.md` | **Category:** Tool / Powered Saw / Rescue Cutter<br>**Tool Subcategory:** Industrial / Cutting and Rescue<br>**Scale:** Personal / Powered<br>**Access:** Commercial / Rescue / Industrial<br>**Cost Band:** credits to kcredits<br>**Damage:** 1d10 if used as weapon<br>**Wound Type:** [Bleeding] or [Gore/Massive], depending on target and use | A rugged powered saw designed to cut wreckage, polymer panels, roots, bone, light bulkheads, vehicle panels, cargo containers, and collapsed structures. |
| `magnetic_boots` | Mag-Boots | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 55 | Magnetic grip for ship surfaces or metal asteroids. |
| `magnetic_boots` | Magnetic Boots | `industrial_tools.md` | **Category:** Tool / Mobility Gear<br>**Tool Subcategory:** Industrial / Mobility Gear<br>**Scale:** Personal / Worn<br>**Access:** Common aboard ships and stations<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Magnetic] [Zero-G] [Shipboard] [Surface Grip] [Mobility] | Magnetic Boots allow the wearer to grip ferrous metal surfaces, ship hulls, station exteriors, metal-based asteroids, docking frames, and other compatible surfaces. |
| `marker_tape` | Marker Tape | `industrial_tools.md` | **Category:** Tool / Route Marker / Field Utility<br>**Tool Subcategory:** Industrial / Field Utility<br>**Scale:** Personal / Disposable<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Marker] [Route Marking] [Hazard Marking] [Utility] [Disposable] | Bright adhesive tape, reflective strips, glow markers, or peel-off hazard tags used to mark routes, rooms, doors, samples, bodies, hazards, extraction paths, and searched areas. |
| `patch_plate_kit` | Patch Plate Kit | `industrial_tools.md` | **Category:** Tool / Hull Patch / Structural Brace<br>**Tool Subcategory:** Industrial / Shipboard Emergency Repair<br>**Scale:** Personal / Squad Support<br>**Access:** Common aboard ships, stations, salvage rigs, and industrial sites<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Repair] [Hull Patch] [Structural Brace] [Seal] [Shipboard] [Emergency Repair] | A rugged emergency repair kit containing magnetic patch plates, clamp braces, rivet strips, expanding gasket rope, pressure tape, and quick-lock hull anchors. |
| `portable_air_pump_pressure_equalizer` | Portable Air Pump / Pressure Equalizer | `industrial_tools.md` | **Category:** Tool / Air Pump / Pressure Management<br>**Tool Subcategory:** Industrial / Environmental Control<br>**Scale:** Personal / Deployable<br>**Access:** Commercial / Shipboard<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Air Pump] [Pressure Equalizer] [Environmental Control] [Shipboard] [Breaching Support] [Hazard Control] | A deployable pump and regulator used to move, vent, pressurize, depressurize, or equalize atmosphere in small spaces. |
| `portable_floodlight` | Portable Floodlight | `industrial_tools.md` | **Category:** Tool / Deployable Illumination<br>**Tool Subcategory:** Industrial / Field Utility<br>**Scale:** Personal / Deployable<br>**Access:** Common<br>**Cost Band:** credits to low kcredits<br>**Tags:** [Tool] [Light] [Deployable] [Area Illumination] [Power] [Utility] | A portable high-output light used to illuminate rooms, work sites, landing zones, tunnels, crash sites, dig areas, or defensive perimeters. |
| `portable_power_cell` | Portable Power Cell | `industrial_tools.md` | **Category:** Tool / Portable Power Supply<br>**Tool Subcategory:** Industrial / Power Support<br>**Scale:** Personal / Field Support<br>**Access:** Common to Commercial<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Battery] [Power] [Recharge] [Utility] [Hazardous] | A rugged field battery used to recharge or power drones, lights, scanners, comms, suits, terminals, tools, and small powered systems. |
| `portable_winch_come_along` | Portable Winch / Come-Along | `industrial_tools.md` | **Category:** Tool / Mechanical Puller / Recovery Gear<br>**Tool Subcategory:** Industrial / Field Utility<br>**Scale:** Personal / Squad Support<br>**Access:** Common / Industrial<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Winch] [Recovery] [Heavy Pull] [Anchoring] [Salvage] [Utility] | A portable hand-cranked, powered, or ratcheting winch used to pull, drag, recover, lift, or force heavy objects. |
| `rucksack` | Rucksack | `industrial_tools.md` | **Category:** Tool / Storage<br>**Tool Subcategory:** Industrial / Field Storage<br>**Scale:** Personal<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Storage] [Waterproof] [Durable] [Field Gear] | A large, durable, waterproof backpack designed for field operations, travel, salvage, military patrols, and expedition work. |
| `salvage_drone` | Salvage Drone | `industrial_tools.md` | **Category:** Tool / Remote Drone / Industrial Support<br>**Tool Subcategory:** Industrial / Remote Support<br>**Scale:** Remote / Field Support<br>**Access:** Commercial<br>**Cost Band:** kcredits<br>**Battery Life:** 2 hours<br>**Tags:** [Tool] [Drone] [Remote Operated] [Salvage] [Camera] [Transmission] [Battery] [Cargo Lift] [Optional: Laser Cutter] | A remote-controlled salvage drone used for inspection, retrieval, scouting, light lifting, and hazardous access work. |
| `sealant_shroud` | Sealant Shroud | `industrial_tools.md` | **Category:** Special / Emergency Breaching Tool<br>**Tags:** [Breaching] [Seal] [Emergency Repair] [Flexible] [Rescue] | A flexible emergency version of the breaching collar. |
| `survey_kit` | Survey Kit | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 200 | Maps nearby kilometers and reports air, gravity, and surrounding features. |
| `survey_kit` | Survey Kit | `industrial_tools.md` | **Category:** Tool Kit / Exploration / Field Science<br>**Tool Subcategory:** Industrial / Exploration<br>**Scale:** Personal / Field Science<br>**Access:** Commercial<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Survey] [Mapping] [Atmospheric Testing] [Gravity Testing] [Field Science] [Exploration] [Sensor] | A compact field survey kit used for planetary exploration, colony scouting, environmental checks, and terrain assessment. |
| `tether_kit` | Tether Kit | `industrial_tools.md` | **Category:** Tool / Field Utility / Rescue Gear<br>**Tool Subcategory:** Industrial / Field Utility<br>**Scale:** Personal / Squad Support<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Tether] [Climbing] [Rescue] [Anchoring] [Zero-G] [Utility] | A compact kit of high-strength rope, smart cable, clamps, carabiners, anchor spikes, quick-lock hooks, and harness connectors. |

### Medical / Survival

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `automed` | Automed | `medical_survival_support.md` | **Category:** Medical Tool / Consumable Nanotech<br>**Tool Subcategory:** Medical / Nanotech Recovery<br>**Scale:** Personal / Dose<br>**Access:** Medical / Commercial Restricted / Corporate<br>**Cost Band:** kcredits depending quality and legality<br>**Use:** 1 dose<br>**Tags:** [Consumable] [Medical] [Nanotech] [Recovery] [Disease] [Poison] [Stress Reduction] | Automed capsules contain short-lived medical nanotech and biochemical repair agents designed to assist the body's own recovery systems. |
| `automed` | Automed (x6) | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 300 | Nanotech pills; +10% Body saves vs disease/poison/healing and +10% Fear saves to reduce Stress. |
| `camping_gear` | Camping Gear | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 250 | Tent, canteen, stove, backpack, sleeping bag. |
| `climbing_harness` | Climbing Harness | `medical_survival_support.md` | **Category:** Tool / Mobility Gear / Rescue Gear<br>**Tool Subcategory:** Medical / Survival Support / Rescue Gear<br>**Scale:** Personal / Worn<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Harness] [Climbing] [Rescue] [Tether Compatible] [Fall Protection] [CASEVAC] | A field harness with reinforced attachment points for rope, tethers, rescue hooks, cargo clips, and evacuation lines. |
| `decontamination_kit` | Decontamination Kit | `medical_survival_support.md` | **Category:** Medical and Survival Tool / Decontamination<br>**Tool Subcategory:** Medical / Hazard Control<br>**Scale:** Personal / Squad Support<br>**Access:** Medical / Industrial / Rescue / Military<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Medical] [Decontamination] [Hazard Control] [Biohazard] [Chemical] [Containment] | A field decontamination kit containing neutralizer wipes, spray bottles, disposable gloves, sealable waste pouches, filter masks, contamination tags, absorbent pads, and emergency rinse packs. |
| `fire_extinguisher` | Fire Extinguisher | `medical_survival_support.md` | **Category:** Tool / Fire Suppression<br>**Tool Subcategory:** Medical / Survival Support / Emergency Response<br>**Scale:** Personal / Shipboard Emergency<br>**Access:** Common aboard ships, stations, vehicles, habitats, and industrial sites<br>**Cost Band:** credits<br>**Tags:** [Tool] [Fire Suppression] [Shipboard] [Emergency] [Hazard Control] | A compact extinguisher or suppressant canister used to put out small fires, suppress burning gear, reduce smoke spread, or prevent an equipment fire from becoming a shipboard disaster. |
| `first_aid_kit` | First Aid Kit | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 75 | +10% to bandage wounds and stop bleeding. |
| `foldable_stretcher` | Foldable Stretcher | `medical_survival_support.md` | **Category:** Medical Tool / Patient Transport<br>**Tool Subcategory:** Medical / CASEVAC<br>**Scale:** Squad Support / Portable<br>**Access:** Common medical, rescue, and field operations equipment<br>**Cost Band:** credits<br>**Tags:** [Tool] [Medical] [Patient Transport] [Foldable] [Rucksack Portable] [Stabilization] [CASEVAC] | A compact foldable stretcher designed for field evacuation and patient transport. |
| `hardpoint_casevac_stretcher` | Hardpoint CASEVAC Stretcher | `medical_survival_support.md` | **Category:** Medical Tool / Patient Transport / Armored CASEVAC<br>**Tags:** [Armored] [Hardpoint Carry] [CASEVAC] [Patient Shielding] | Some military or rescue models are reinforced for extraction under fire. |
| `medpack_drug_kit` | Medpack / Drug Kit | `medical_survival_support.md` | **Category:** Medical Tool / Drug Kit<br>**Tool Subcategory:** Medical / Pharmacological Support<br>**Scale:** Personal / Specialist<br>**Access:** Medical / Restricted depending contents<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Medical] [Drug Kit] [Pharmacology] [Pain Control] [Anti-Toxin] [Restricted] | A compact medical drug kit containing painkillers, antibiotics, anti-rads, stimulants, sedatives, anti-toxins, antiemetics, hydration salts, and emergency injectors. |
| `mohab_unit` | MoHab Unit | `medical_survival_support.md` | **Category:** Medical / Survival Shelter / Mobile Habitat<br>**Tool Subcategory:** Medical / Survival Support / Field Shelter<br>**Scale:** Squad Support / Field Camp<br>**Access:** Commercial / Expeditionary<br>**Cost Band:** credits to kcredits depending rating<br>**Tags:** [Tool] [Medical] [Survival] [Shelter] [Rest] [Comfort] [Field Camp] [Expedition] | A MoHab Unit, or Mobile Habitat Unit, is a compact field survival package designed to create a basic rest site in hostile or undeveloped environments. |
| `mre` | MRE | `medical_survival_support.md` | **Category:** Survival Tool / Ration<br>**Tool Subcategory:** Medical / Survival Support / Field Ration<br>**Scale:** Personal / Meal<br>**Access:** Common<br>**Cost Band:** credits<br>**Use:** 1 meal<br>**Tags:** [Consumable] [Food] [Survival] [Ration] [Shelf-Stable] | MREs are shelf-stable field meals used by marines, security teams, survey crews, colonists, miners, and anyone operating away from proper food supply. |
| `mre` | MRE (x7) | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 70 | Seven one-day food rations; water not included. |
| `oxygen_tank` | Oxygen Tank | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 50 | Vaccsuit oxygen: 12h normal / 4h stressful; explosive. |
| `oxygen_tank` | Oxygen Tank | `medical_survival_support.md` | **Category:** Medical / EVA Support / Life Support<br>**Tool Subcategory:** Medical / Survival Support / Life Support<br>**Scale:** Personal / Suit Support<br>**Access:** Common aboard ships, stations, EVA lockers, rescue kits, and med bays<br>**Cost Band:** credits to kcredits depending duration and compatibility<br>**Tags:** [Tool] [Medical] [O2] [Life Support] [EVA] [Pressurized] [Explosive] [Hazardous] | A portable oxygen tank compatible with vaccsuits and other life-support systems. |
| `pain_pills` | Pain Pills | `medical_survival_support.md` | **Category:** Medical Tool / Pain Management<br>**Tool Subcategory:** Medical / Pain Management<br>**Scale:** Personal / Dose<br>**Access:** Common Medical / Restricted depending strength<br>**Cost Band:** credits<br>**Use:** 1 dose<br>**Tags:** [Consumable] [Medical] [Painkiller] [Stress Reduction] [Impairing] [Addictive] | Pain pills reduce pain, panic, tremors, and physical distress. |
| `pain_pills` | Pain Pills (x6) | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 450 | Heal 1d10 and lower Stress by 1; addiction/overdose risk. |
| `portable_iv_fluid_kit` | Portable IV / Fluid Kit | `medical_survival_support.md` | **Category:** Medical Tool / Fluid Support<br>**Tool Subcategory:** Medical / Stabilization<br>**Scale:** Personal / Field Medical<br>**Access:** Medical / Rescue / Shipboard<br>**Cost Band:** credits<br>**Tags:** [Tool] [Medical] [IV] [Fluid Support] [Stabilization] [Shock] [Emergency] | A compact field kit containing IV lines, fluid bags, pressure infusers, electrolyte packs, blood substitute, sterile ports, and vascular access tools. |
| `portable_quarantine_hood` | Portable Quarantine Hood | `medical_survival_support.md` | **Category:** Medical Tool / Patient Isolation Hood<br>**Tool Subcategory:** Medical / Quarantine Support<br>**Scale:** Personal / Patient Support<br>**Access:** Medical / Shipboard / Rescue<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Medical] [Quarantine] [Breathing Gear] [Biohazard] [Patient Isolation] [Containment] | A collapsible isolation hood placed over a patient’s head and upper torso to reduce droplet spread, airborne contamination, or unknown respiratory exposure. |
| `quarantine_bag_body_bag` | Quarantine Bag / Body Bag | `medical_survival_support.md` | **Category:** Medical Tool / Body Containment / Biohazard Control<br>**Tool Subcategory:** Medical / Containment<br>**Scale:** Personal / CASEVAC<br>**Access:** Medical / Rescue / Shipboard<br>**Cost Band:** credits<br>**Tags:** [Tool] [Medical] [Containment] [Biohazard] [Body Bag] [Quarantine] [CASEVAC] | A sealable body or quarantine bag designed to contain corpses, infected crew, contaminated clothing, alien residue, or large biological samples too big for a Sample Case. |
| `radiation_dosimeter_patch` | Radiation Dosimeter Patch | `medical_survival_support.md` | **Category:** Medical Tool / Radiation Exposure Monitor<br>**Tool Subcategory:** Medical / Exposure Tracking<br>**Scale:** Personal / Disposable<br>**Access:** Common in industrial, medical, military, and shipboard environments<br>**Cost Band:** credits<br>**Tags:** [Tool] [Medical] [Radiation] [Dosimeter] [Exposure Tracking] [Disposable] [Hazard Control] | A wearable patch, badge, or clip that tracks accumulated radiation exposure on a person. |
| `radiation_pills` | Radiation Pills | `medical_survival_support.md` | **Category:** Medical Tool / Radiation Countermeasure<br>**Tool Subcategory:** Medical / Radiation Countermeasure<br>**Scale:** Personal / Dose<br>**Access:** Medical / Industrial / Shipboard / Military<br>**Cost Band:** credits to kcredits<br>**Use:** 1 dose<br>**Tags:** [Consumable] [Medical] [Radiation] [Countermeasure] [Exposure] [Preventative] | Radiation pills are prophylactic and emergency medical countermeasures used before or shortly after radiation exposure. |
| `rebreather` | Rebreather | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 45 | Filters air and supports underwater breathing for 20 minutes. |
| `rebreather` | Rebreather | `medical_survival_support.md` | **Category:** Medical / Survival Breathing Gear<br>**Tool Subcategory:** Medical / Survival Support / Breathing Gear<br>**Scale:** Personal / Worn<br>**Access:** Commercial / Rescue / Expeditionary<br>**Cost Band:** credits to kcredits depending filters<br>**Duration:** 20 minutes underwater before resurfacing or cycling air<br>**Tags:** [Tool] [Medical] [Breathing Gear] [Filter] [Underwater] [Survival] [Compact] | A compact breathing device that filters air and allows limited underwater operation. |
| `sample_case` | Sample Case | `medical_survival_support.md` | **Category:** Tool / Sample Storage / Containment<br>**Tool Subcategory:** Medical / Survival Support / Field Science<br>**Scale:** Personal / Field Research<br>**Access:** Commercial / Research Issue<br>**Cost Band:** credits to kcredits depending containment rating<br>**Tags:** [Tool] [Sample Storage] [Biohazard] [Containment] [Field Science] [Research] | A sealed field case with sterile vials, swabs, sample tubes, cryo-packets, contamination sleeves, specimen bags, and small secure storage cells. |
| `scalpel` | Scalpel | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 50 | +10% Surgery; weapon-capable. |
| `specialized_water_filter` | Specialized Water Filter | `medical_survival_support.md` | **Category:** Survival Tool / Water Filter<br>**Tool Subcategory:** Medical / Survival Support / Water Safety<br>**Scale:** Personal / Field Utility<br>**Access:** Common / Expeditionary<br>**Cost Band:** credits to kcredits<br>**Use:** Limited filter capacity<br>**Tags:** [Consumable] [Survival] [Water] [Filter] [Utility] [Field Gear] | A compact field filtration system designed to make questionable water safer to drink. |
| `stimpack` | StimPack | `medical_survival_support.md` | **Category:** Medical Tool / Combat Drug / Emergency Enhancer<br>**Tool Subcategory:** Medical / Combat Drug<br>**Scale:** Personal / Injector Dose<br>**Access:** Restricted / MilSpec / Corporate Medical / Black Market<br>**Cost Band:** kcredits<br>**Duration:** 1d4 hours<br>**Use:** 1 dose | A StimPack is an emergency combat stimulant and trauma-response injector designed to keep a body moving after it should have stopped. |
| `stimpak` | Stimpak (x6) | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 600 | Temporary 2d10 Health and +2d10 Strength/Combat for 1d10 hours; addiction/overdose risk. |
| `suit_medical_staunching_systems` | Suit Medical Staunching Systems | `medical_survival_support.md` | **Category:** Suit System / Proactive Medical Stabilization<br>**Tool Subcategory:** Armor / Suit Medical System<br>**Scale:** Integrated Suit System<br>**Access:** Advanced Armor / MilSpec / Corporate Security / Specialist EVA<br>**Cost Band:** Built into compatible suits or purchased as a major upgrade<br>**Use:** Limited internal medical supplies, usually mission-limited<br>**Tags:** [Suit System] [Medical] [Auto-Staunching] [Wound Closure] [Disinfectant] [Nanowebbing] [Combat Stabilization] | Some advanced suits include proactive medical staunching systems designed to keep the wearer alive and operational during combat. |
| `thermal_blanket_emergency_cocoon` | Thermal Blanket / Emergency Cocoon | `medical_survival_support.md` | **Category:** Medical and Survival Tool / Exposure Protection<br>**Tool Subcategory:** Medical / Survival Support<br>**Scale:** Personal / Patient Support<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Medical] [Survival] [Thermal] [Exposure Protection] [Shock] [CASEVAC] | A compact insulating blanket, thermal wrap, or emergency cocoon used to reduce heat loss, stabilize shock, protect exposed patients, and improve survival during extraction. |
| `trauma_kit` | Trauma Kit | `medical_survival_support.md` | **Category:** Medical Tool / Consumable Field Medical Kit<br>**Tool Subcategory:** Medical / Battlefield Trauma Care<br>**Scale:** Personal / Field Medical / Squad Support<br>**Access:** Medical / Rescue / MilSpec / Shipboard<br>**Cost Band:** kcredits depending quality and restock level<br>**Use:** Limited supplies<br>**Tags:** [Consumable] [Medical] [Trauma Care] [Bleeding Control] [Wound Treatment] [Stress Reduction] [Requires Training] | A robust field-service medical kit containing bandages, wound sealant, disinfectants, trauma foam, clotting agents, injectors, splints, surgical tools, pain management, airway tools, pressure dressings, and emergency stabilization supplies. |
| `specialized_water_filter` | Water Filter | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 15 | Filters 50 liters/hour from brackish water. |

### MilSpec / Security Tool

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `body_cam` | Body Cam | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 50 | Streams wearer video to a control center. |
| `body_cam` | Body Cam | `milspec_tools.md` | **Category:** MilSpec Tool / Recording Device<br>**Tool Subcategory:** MilSpec / Recording and Command Feed<br>**Scale:** Personal / Worn<br>**Access:** Commercial Security / MilSpec<br>**Cost Band:** credits to kcredits depending encryption and transmission range<br>**Tags:** [Tool] [MilSpec] [Camera] [Body Cam] [Transmission] [Comms] [Command Feed] [Evidence] | A compact camera worn on clothing, armor, helmet, or tactical webbing. |
| `door_wedge_lock_bar_kit` | Door Wedge / Lock Bar Kit | `milspec_tools.md` | **Category:** MilSpec Tool / Door Control<br>**Tool Subcategory:** MilSpec / Area Control<br>**Scale:** Personal / Field Utility<br>**Access:** Common / Security / MilSpec<br>**Cost Band:** credits<br>**Tags:** [Tool] [MilSpec] [Door Control] [Lock Bar] [Area Denial] [Security] [Entry] | A compact kit of reinforced wedges, lock bars, magnetic blocks, hinge clamps, and access braces used to hold doors open, hold doors shut, or prevent automated movement. |
| `e_smoke_grenade` | E-Smoke Grenade | `milspec_tools.md` | **Category:** MilSpec Tool / Tactical Grenade / Sensor Denial<br>**Tool Subcategory:** MilSpec / Countermeasure<br>**Scale:** Personal / Thrown<br>**Access:** Restricted / MilSpec / Corporate Security<br>**Cost Band:** credits to kcredits<br>**Use:** 1 grenade<br>**Tags:** [Consumable] [Grenade] [Smoke] [E-Smoke] [Obscuring] [Sensor Scramble] [EM Chaff] [Area Denial] [Tactical] | An E-Smoke grenade disperses a dense cloud of obscuring smoke mixed with electromagnetic chaff and sensor-scrambling particulate. |
| `evidence_collection_kit` | Evidence Collection Kit | `milspec_tools.md` | **Category:** MilSpec Tool / Evidence Handling<br>**Tool Subcategory:** MilSpec / Forensics and Custody<br>**Scale:** Personal / Specialist<br>**Access:** Law Enforcement / Corporate Security / Research<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [MilSpec] [Evidence] [Forensics] [Chain of Custody] [Sample Storage] [Investigation] | A compact kit containing sample bags, print lift film, tamper tags, chain-of-custody seals, evidence markers, swabs, disposable tools, labels, and portable documentation supplies. |
| `flashbang_stun_charge` | Flashbang / Stun Charge | `milspec_tools.md` | **Category:** MilSpec Tool / Stun Device<br>**Tool Subcategory:** MilSpec / Less-Lethal Entry<br>**Scale:** Personal / Disposable<br>**Access:** Restricted / Law Enforcement / MilSpec<br>**Cost Band:** credits to kcredits<br>**Damage:** Usually none; may cause injury in confined spaces<br>**Wound Type:** [Less-Lethal] or [Blunt Force] at GM discretion | A tactical distraction charge that produces a blinding flash, concussive report, and sensory overload. |
| `frag_grenade` | Fragmentation Grenade | `milspec_tools.md` | **Category:** Consumable Weapon / Hand Grenade<br>**Tool Subcategory:** MilSpec / Explosive Ordnance<br>**Scale:** Personal / Thrown<br>**Access:** Restricted / MilSpec / Black Market<br>**Cost Band:** credits to kcredits depending access<br>**Damage:** 2d10 or 1 Wound in blast center, GM preference<br>**Wound Type:** [Fire/Explosive] | A basic hand-thrown fragmentation grenade designed to wound or kill personnel with blast pressure and shrapnel. |
| `heads_up_display` | Heads-Up Display | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 75 | Views body-cam feeds and enables smart-link weapon capabilities. |
| `heads_up_display` | Heads-Up Display | `milspec_tools.md` | **Category:** MilSpec Tool / Tactical Interface<br>**Tool Subcategory:** MilSpec / Tactical Interface<br>**Scale:** Personal / Worn<br>**Access:** MilSpec / Corporate Security / Restricted Civilian Tactical<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [MilSpec] [HUD] [Tac-Link] [Smart-Link] [Squad Feed] [Targeting] [Comms] | A tactical visual interface commonly used by marines, security response teams, and advanced combat units. |
| `infrared_goggles` | Infrared Goggles | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 100 | Sees heat signatures, sometimes hours old. |
| `infrared_goggles` | Infrared Goggles | `milspec_tools.md` | **Category:** MilSpec Tool / Optics<br>**Tool Subcategory:** MilSpec / Optics<br>**Scale:** Personal / Worn<br>**Access:** Commercial Tactical / MilSpec<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [MilSpec] [Infrared] [Thermal Vision] [Optics] [Tracking] [Night Operations] | Infrared Goggles allow the wearer to see heat signatures, warm bodies, hot machinery, recent footprints, engine heat, fired weapons, and other thermal traces. |
| `jetpack` | Jetpack | `milspec_tools.md` | **Category:** MilSpec Tool / Mobility System<br>**Tool Subcategory:** MilSpec / Mobility System<br>**Scale:** Personal / Powered Mobility<br>**Access:** Restricted / MilSpec / Corporate Rescue or Assault Issue<br>**Cost Band:** kcredits to low mK depending model<br>**Tags:** [Tool] [MilSpec] [Jetpack] [Flight] [Fuel] [Explosive] [Hazardous] [Mobility] [Cumbersome] | A fuel-operated personal flight system used for vertical movement, rapid repositioning, battlefield access, EVA maneuvering where appropriate, and hazardous terrain traversal. |
| `locator` | Locator | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 45 | Allows bridge/control center to track wearer. |
| `locator` | Locator | `milspec_tools.md` | **Category:** MilSpec Tool / Tracking Beacon<br>**Tool Subcategory:** MilSpec / Tracking and Command Feed<br>**Scale:** Personal / Worn<br>**Access:** Commercial Security / MilSpec / Expeditionary<br>**Cost Band:** credits to kcredits depending range and encryption<br>**Tags:** [Tool] [MilSpec] [Locator] [Tracking] [Beacon] [Comms] [Command Feed] | A worn tracking beacon that allows crew members at a control center, command post, or ship bridge to monitor the wearer’s location. |
| `lockpick_suite` | Lockpick Set | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 40 | Electronic airlock/door hacking tools; +10% to opening rolls. |
| `lockpick_suite` | Lockpick Suite | `milspec_tools.md` | **Category:** MilSpec Tool / Electronic Entry Kit<br>**Tool Subcategory:** MilSpec / Electronic Entry Kit<br>**Scale:** Personal / Specialist<br>**Access:** Restricted / Security / Corporate Issue / Black Market<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [MilSpec] [Lockpick] [Electronic Entry] [Hacking] [Airlock] [Door Systems] [Security Bypass] | A highly advanced set of electronic intrusion tools designed to bypass basic airlocks, electronic doors, access panels, and commercial security locks. |
| `portable_command_slate` | Portable Command Slate | `milspec_tools.md` | **Category:** MilSpec Tool / Tactical Coordination Device<br>**Tool Subcategory:** MilSpec / Command Feed<br>**Scale:** Personal / Command Support<br>**Access:** Corporate Security / MilSpec / Restricted<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [MilSpec] [Command Feed] [Tac-Link] [Squad Feed] [Comms] [Interface] [Coordination] | A rugged command slate used to monitor squad cams, locators, objectives, sensor pings, drone feeds, and tactical overlays. |
| `portable_computer_terminal` | Portable Computer Terminal | `milspec_tools.md` | **Category:** MilSpec Tool / Computer Interface<br>**Tool Subcategory:** MilSpec / Computer Interface<br>**Scale:** Personal / Specialist<br>**Access:** Commercial Technical / MilSpec / Corporate Issue<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [MilSpec] [Computer] [Terminal] [Hacking] [Network Access] [Interface] [Portable] [Technical] | A flat portable computer terminal with monitor, keyboard, interface ports, diagnostic software, and network access tools. |
| `restraints` | Restraints | `milspec_tools.md` | **Category:** Tool / Security Gear / Capture Gear<br>**Tool Subcategory:** MilSpec / Security Gear<br>**Scale:** Personal / Disposable<br>**Access:** Common to Restricted depending model<br>**Cost Band:** credits<br>**Tags:** [Tool] [Security] [Restraint] [Capture] [Disposable] [Law Enforcement] | Flex cuffs, magnetic cuffs, zip restraints, locking bands, or security ties used to restrain prisoners, suspects, infected crew, panicking civilians, captured targets, or compromised personnel. |
| `signal_scrambler_spoof_tag` | Signal Scrambler / Spoof Tag | `milspec_tools.md` | **Category:** MilSpec Tool / Signal Spoofing Device<br>**Tool Subcategory:** MilSpec / Counter-Surveillance<br>**Scale:** Personal / Disposable or Reusable<br>**Access:** Restricted / Black Market / Corporate Security<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [MilSpec] [Signal Spoofing] [Counter-Surveillance] [Tracking] [Electronic Warfare] [Deception] | A compact signal device used to confuse locators, fake a tag identity, delay scanner handshakes, or throw off command feed. |
| `tactical_breaching_shield` | Tactical Breaching Shield | `milspec_tools.md` | **Category:** MilSpec Tool / Breaching Shield<br>**Tool Subcategory:** MilSpec / Entry and Protection<br>**Scale:** Personal / Squad Support<br>**Access:** Restricted / Law Enforcement / MilSpec<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [MilSpec] [Shield] [Breaching] [Cover] [Entry] [Patient Shielding] [Cumbersome] | A directional carried shield used during forced entry, hallway crossing, rescue movement, riot control, and close protection. |

### Natural / Unarmed

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `unarmed` | Unarmed | `melee_weapons_and_tags.md` | **Category:** Melee / Natural Attack<br>**Damage:** Current Wounds as damage<br>**Wound Type:** [Blunt Force]<br>**Tags:** [Melee] [Unarmed] [Nonlethal] [Grapple] | Punches, kicks, elbows, knees, headbutts, shoves, tackles, biting, wrestling, and improvised body violence. |

### Sensor / Scanner / Comms

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `acoustic_sensor_contact_mic` | Acoustic Sensor / Contact Mic | `sensors_scanners.md` | **Category:** Tool / Listening Device / Contact Microphone<br>**Tool Subcategory:** Sensors and Scanners / Acoustic Detection<br>**Scale:** Personal / Handheld<br>**Access:** Commercial Security / Rescue / MilSpec / Black Market<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Sensor] [Acoustic] [Contact Mic] [Detection] [Recon] [Surveillance] | A sensitive microphone or vibration sensor used to listen through walls, doors, hull plates, pipes, vents, and structural members. |
| `atmospheric_analyzer` | Atmospheric Analyzer | `sensors_scanners.md` | **Category:** Tool / Atmosphere Scanner<br>**Tool Subcategory:** Sensors and Scanners / Environmental Analysis<br>**Scale:** Personal / Handheld<br>**Access:** Commercial / Survey / Shipboard<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Scanner] [Atmospheric Testing] [Chemical] [Environmental Analysis] [Hazard] [Detection] | A handheld scanner used to assess atmosphere composition, pressure, oxygen levels, flammability, toxic gases, corrosive vapors, and breathable safety. |
| `binoculars` | Binoculars | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 35 | 20x magnification; optional thermal/night vision. |
| `binoculars` | Binoculars | `sensors_scanners.md` | **Category:** Tool / Optics / Field Scanner<br>**Tool Subcategory:** Sensors and Scanners / Optics<br>**Scale:** Personal / Handheld<br>**Access:** Common to Commercial<br>**Cost Band:** credits to kcredits depending features<br>**Tags:** [Tool] [Optics] [Magnification] [Field Gear] [Optional: Thermal Vision] [Optional: Night Vision] | High-powered binoculars used for scouting, surveillance, navigation, target identification, and long-distance observation. |
| `bioscanner` | Bioscanner | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 150 | Scans 100m in all directions for life signs; location but not identity. |
| `bioscanner` | Bioscanner | `sensors_scanners.md` | **Category:** Tool / Life Sign Scanner<br>**Tool Subcategory:** Sensors and Scanners / Life Sign Scanner<br>**Scale:** Personal / Handheld<br>**Access:** Commercial / Medical / Survey<br>**Cost Band:** kcredits<br>**Range:** 100 meters in all directions<br>**Tags:** [Tool] [Scanner] [Bioscanner] [Life Signs] [Detection] [Field Science] | A Bioscanner detects biological life signs in the immediate area. |
| `chemical_sniffer` | Chemical Sniffer | `sensors_scanners.md` | **Category:** Tool / Chemical Trace Scanner<br>**Tool Subcategory:** Sensors and Scanners / Chemical Detection<br>**Scale:** Personal / Handheld<br>**Access:** Security / Industrial / Survey / MilSpec<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Scanner] [Chemical] [Trace Detection] [Forensics] [Hazard] [Detection] | A chemical trace scanner used to detect residue, vapor, contamination, propellant, explosives, narcotics, solvents, cleaning agents, decomposition gases, and industrial leaks. |
| `cybernetic_diagnostic_scanner` | Cybernetic Diagnostic Scanner | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 500 | Diagnoses android/cybernetic physical or mental issues; can locate synthetic organisms. |
| `cybernetic_diagnostic_scanner` | Cybernetic Diagnostic Scanner | `sensors_scanners.md` | **Category:** Tool / Cybernetic Scanner / Synthetic Diagnostic<br>**Tool Subcategory:** Sensors and Scanners / Synthetic Diagnostic<br>**Scale:** Personal / Handheld<br>**Access:** Commercial Restricted / Corporate / Blacksite / Technical<br>**Cost Band:** kcredits to mK depending capability and access lock<br>**Tags:** [Tool] [Scanner] [Cybernetic] [Synthetic] [Diagnostics] [Locating] [Technical] | A diagnostic scanner designed to identify, evaluate, and troubleshoot androids, cyborgs, cybernetic organisms, prosthetic systems, neural implants, and synthetic biological interfaces. |
| `data_tap_packet_sniffer` | Data Tap / Packet Sniffer | `sensors_scanners.md` | **Category:** Tool / Data Tap / Network Sniffer<br>**Tool Subcategory:** Sensors and Scanners / Network Monitoring<br>**Scale:** Personal / Specialist<br>**Access:** Technical / Security / Black Market<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Data Tap] [Packet Sniffer] [Network Access] [Interface] [Monitoring] [Technical] | A small device clipped onto a cable, terminal line, door controller, camera feed, drone dock, or network port to monitor traffic without fully taking control of the system. |
| `emergency_beacon` | Emergency Beacon | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 30 | Flare, audible beep, open radio distress call; configurable silent/known channels. |
| `emergency_beacon` | Emergency Beacon | `sensors_scanners.md` | **Category:** Tool / Emergency Signal Device<br>**Tool Subcategory:** Sensors and Scanners / Emergency Signal<br>**Scale:** Personal / Deployable<br>**Access:** Common aboard ships, stations, vehicles, rescue kits, and field packs<br>**Cost Band:** credits to kcredits depending range and encryption<br>**Tags:** [Tool] [Beacon] [Emergency] [Signal] [Radio] [Flare] [Locator] [Rescue] | A small emergency device used to mark position and call for rescue. |
| `field_recorder` | Field Recorder | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 50 | Alien flora/fauna research; vital signs, DNA, basic genetic/material analysis. |
| `field_recorder` | Field Recorder | `sensors_scanners.md` | **Category:** Tool / Field Science / Biological Survey<br>**Tool Subcategory:** Sensors and Scanners / Field Science<br>**Scale:** Personal / Field Research<br>**Access:** Commercial / Research / Survey<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Field Recorder] [Field Science] [Research] [DNA Sampling] [Material Analysis] [Biology] | A field research device used to document, sample, and analyze alien flora, fauna, biological residue, and foreign materials. |
| `geiger_counter` | Geiger Counter | `sensors_scanners.md` | **Category:** Tool / Radiation Detector<br>**Tool Subcategory:** Sensors and Scanners / Hazard Detection<br>**Scale:** Personal / Handheld<br>**Access:** Common to Commercial<br>**Cost Band:** credits to kcredits<br>**Tags:** [Tool] [Scanner] [Radiation] [Detection] [Hazard] [Field Gear] | A handheld radiation detector that measures and displays radiation levels. |
| `long_range_communications` | Long-range Comms | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 65 | Ship-to-surface communication. |
| `long_range_communications` | Long-Range Communications | `sensors_scanners.md` | **Category:** Tool / Communications System<br>**Tool Subcategory:** Sensors and Scanners / Communications<br>**Scale:** Field System / Vehicle / Ship Support<br>**Access:** Commercial / Expeditionary / MilSpec<br>**Cost Band:** kcredits to mK depending range, encryption, and power<br>**Use:** Ship-to-surface communication<br>**Tags:** [Tool] [Comms] [Long-Range Comms] [Ship-to-Surface] [Transmission] [Command Feed] | A long-range communications package designed for ship-to-surface contact, expedition coordination, orbital support, remote base communication, and high-power transmissions across difficult environments. |
| `medscanner` | Medscanner | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 150 | Non-invasive analysis of living/dead bodies for disease or abnormalities. |
| `medscanner` | Medscanner | `sensors_scanners.md` | **Category:** Tool / Medical Scanner<br>**Tool Subcategory:** Sensors and Scanners / Medical Scanner<br>**Scale:** Personal / Handheld<br>**Access:** Medical / Commercial / Research<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Medical] [Scanner] [Diagnostics] [Disease Detection] [Forensics] [Non-Invasive] | A medical scanner used to examine living or dead bodies without requiring immediate biopsy or autopsy. |
| `motion_alarm` | Motion Alarm | `sensors_scanners.md` | **Category:** Tool / Deployable Sensor<br>**Tool Subcategory:** Sensors and Scanners / Security Sensor<br>**Scale:** Personal / Deployable<br>**Access:** Common to Commercial<br>**Cost Band:** credits to kcredits depending sensor quality<br>**Tags:** [Tool] [Sensor] [Motion Detection] [Alarm] [Perimeter] [Security] [Deployable] | A small deployable motion sensor used to monitor corridors, vents, doors, campsites, blind approaches, cave mouths, stairwells, or perimeter lines. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `sensors_scanners.md` | **Category:** Tool / Personal Event Recorder<br>**Tool Subcategory:** Sensors and Scanners / Personal Telemetry<br>**Scale:** Personal / Worn<br>**Access:** Commercial / Shipboard / MilSpec / Corporate<br>**Cost Band:** credits to kcredits depending encryption and durability<br>**Tags:** [Tool] [Recorder] [Telemetry] [Forensics] [Life Signs] [Evidence] [Personal Data] | A rugged personal recorder that tracks vitals, position, audio, suit events, atmosphere warnings, trauma markers, and last-known telemetry. |
| `portable_lidar_mapper` | Portable LIDAR Mapper | `sensors_scanners.md` | **Category:** Tool / LIDAR Mapper / 3D Scanner<br>**Tool Subcategory:** Sensors and Scanners / Spatial Mapping<br>**Scale:** Personal / Deployable<br>**Access:** Survey / Industrial / Security / MilSpec<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Scanner] [LIDAR] [Mapping] [Spatial Analysis] [Recon] [Detection] | A portable light detection and ranging scanner used to build local 3D maps of corridors, caves, derelicts, ruins, facilities, and terrain. |
| `radio_jammer` | Radio Jammer | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 175 | Renders radio signals incomprehensible within 100km in this source version. |
| `radio_jammer` | Radio Jammer | `sensors_scanners.md` | **Category:** Tool / Electronic Warfare<br>**Tool Subcategory:** Sensors and Scanners / Electronic Warfare<br>**Scale:** Deployable / Area Denial<br>**Access:** Restricted / MilSpec / Black Market<br>**Cost Band:** kcredits to mK depending power<br>**Range:** 1 km<br>**Tags:** [Tool] [Jammer] [Radio Jammer] [Electronic Warfare] [Signal Denial] [Comms Disruption] [Area Denial] | A radio interference device that disrupts radio communication within its area of effect. |
| `recon_drone` | Recon Drone | `sensors_scanners.md` | **Category:** Tool / Remote Drone / Reconnaissance<br>**Tool Subcategory:** Sensors and Scanners / Reconnaissance<br>**Scale:** Remote / Field Support<br>**Access:** Commercial / Survey / MilSpec<br>**Cost Band:** kcredits<br>**Battery Life:** 2 hours<br>**Tags:** [Tool] [Drone] [Recon] [Remote Operated] [Camera] [Transmission] [Battery] [Sensor Platform] [Modular] | A remote-controlled reconnaissance drone designed for scouting, surveillance, mapping, overwatch, and remote sensor deployment. |
| `seismic_thumper_ground_sonar` | Seismic Thumper / Ground Sonar | `sensors_scanners.md` | **Category:** Tool / Seismic Scanner / Ground Sonar<br>**Tool Subcategory:** Sensors and Scanners / Subsurface Mapping<br>**Scale:** Deployable / Field Survey<br>**Access:** Industrial / Survey / Mining / Military<br>**Cost Band:** kcredits to mK<br>**Tags:** [Tool] [Scanner] [Seismic] [Ground Sonar] [Mapping] [Subsurface] [Detection] | A deployable thumper and receiver system used to map voids, tunnels, buried structures, unstable ground, and heavy movement through terrain. |
| `short_range_communications` | Short-range Comms | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 30 | Local ship-to-ship and surface-to-surface within about 12km. |
| `short_range_communications` | Short-Range Communications | `sensors_scanners.md` | **Category:** Tool / Communications System<br>**Tool Subcategory:** Sensors and Scanners / Communications<br>**Scale:** Personal / Field Team / Vehicle<br>**Access:** Common<br>**Cost Band:** credits to kcredits depending encryption and ruggedization<br>**Range:** Surface-to-surface within roughly a dozen kilometers; ship-to-ship within reasonable local distance<br>**Tags:** [Tool] [Comms] [Short-Range Comms] [Surface Comms] [Ship-to-Ship] [Transmission] | A compact communications system used for local operations, surface teams, convoy coordination, ship-to-ship contact, and field command. |
| `signal_analyzer` | Signal Analyzer | `sensors_scanners.md` | **Category:** Tool / Signal Detection and Analysis<br>**Tool Subcategory:** Sensors and Scanners / Signal Intelligence<br>**Scale:** Personal / Specialist<br>**Access:** Commercial Technical / MilSpec / Corporate<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Scanner] [Signal Analysis] [Comms] [Detection] [Electronic Warfare] [Technical] | A passive signal analysis device used to detect, classify, and direction-find active transmissions. |
| `signal_flare` | Signal Flare | `sensors_scanners.md` | **Category:** Tool / Emergency Signal / Light Source<br>**Tool Subcategory:** Sensors and Scanners / Emergency Signal<br>**Scale:** Personal / Disposable<br>**Access:** Common<br>**Cost Band:** credits<br>**Tags:** [Tool] [Signal] [Flare] [Light] [Emergency] [Ignition] [Disposable] | A handheld flare used to signal aircraft, mark extraction zones, illuminate an area, frighten animals, start fires, or identify a location in bad visibility. |
| `signal_relay_node` | Signal Relay Node | `sensors_scanners.md` | **Category:** Tool / Communications Relay<br>**Tool Subcategory:** Sensors and Scanners / Communications<br>**Scale:** Deployable / Network Support<br>**Access:** Commercial / Expeditionary / MilSpec<br>**Cost Band:** kcredits<br>**Tags:** [Tool] [Comms] [Signal Relay] [Beacon] [Network Support] [Deployable] | A deployable relay used to extend radio range, route signals around terrain, maintain drone links, or keep ship-to-surface communication alive in difficult environments. |

### Shield / Defensive System

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `handheld_aegis` | Handheld Aegis | `shields_and_defensive_systems.md` | — | Base AV: 5 Max AV: 20 Integrity: 30 DR: 5 vs eligible projectile overflow Tags: [Shield] [Ballistic Shield] [Kinetic] [Reactive Armor] [Projectile Defense] [Directional] [Integrity] [2-Handed] [1-Handed: Exoskeleton] [Cumbersome] |

### Weapon

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `anti_armor_grenade_shaped_charge_grenade` | Anti-Armor Grenade / Shaped Charge Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Anti-Armor Charge<br>**Damage:** 5d10 or 1 Vehicle Wound if properly placed against a weak point<br>**Range / Delivery:** Thrown / Close; placed for best effect<br>**Ammo / Shots:** Single-use<br>**Penetration:** [Anti-Armor]<br>**Tags:** [Throwable] [Grenade] [Anti-Armor] [Shaped Charge] [Close] [Explosive] [Restricted] | — |
| `breaching_axe` | Breaching Axe | `melee_weapons_and_tags.md` | **Category:** Melee / Breaching Tool<br>**Damage:** 2d10<br>**Wound Type:** [Bleeding] or [Blunt Force], depending on use<br>**Tags:** [Melee] [2-Handed] [Breaching] [Industrial] [Cumbersome] [Brutal] | A heavy chopping and forced-entry tool used by marines, emergency crews, salvage teams, prison response units, and boarding parties. |
| `combat_shotgun` | Combat Shotgun | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 1400 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `combat_shotgun` | Combat Shotgun | `weapons_and_armaments.md` | **Category:** Longarm / Close-Quarters Weapon<br>**Damage:** Close: 1 Wound; Nearby: 3d10<br>**Range:** Close / Nearby<br>**Ammo / Shots:** 4 loaded + 4 side saddle<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [2-Handed] [Longarm] [Ammo] [Underbarrel] [Barrel] [Breaching] [CQB] [Audio Rangefinder] | — |
| `concussion_breach_grenade` | Concussion / Breach Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Shock Explosive<br>**Damage:** 1 Wound; 2 Wounds in confined spaces or direct breach placement<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard<br>**Tags:** [Throwable] [Grenade] [Concussion] [Breach] [Stun] [Knockdown] [Area] [One-Shot] | — |
| `crowbar` | Crowbar | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 50 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `crowbar` | Crowbar | `melee_weapons_and_tags.md` | **Category:** Melee / Utility Tool<br>**Damage:** 1d5<br>**Wound Type:** [Blunt Force]<br>**Tags:** [Melee] [1-Handed] [Utility] [Prying] [Improvised] [Breaching] | A simple pry bar, wrecking bar, or utility crowbar used for opening crates, forcing doors, lifting panels, breaking locks, pulling nails, and applying leverage where subtlety has failed. |
| `demolition_charge` | Demolition Charge | `weapons_and_armaments.md` | **Category:** Heavy Demolition / Siege Charge<br>**Damage:** 8d10<br>**Range / Delivery:** Placed / Timed / Remote Detonated<br>**Ammo / Shots:** Single-use<br>**Penetration:** [Siege]<br>**Tags:** [Explosive] [Demolition] [Siege] [Placed Charge] [Breach] [Anti-Structure] [Hazardous] [Restricted] | — |
| `disposable_anti_armor_launcher` | Disposable Anti-Armor Launcher | `weapons_and_armaments.md` | **Category:** Infantry Anti-Armor / One-Shot Launcher<br>**Damage:** 5d10<br>**Range / Delivery:** Nearby / Far<br>**Ammo / Shots:** Single-use<br>**Penetration:** [Anti-Armor]<br>**Tags:** [Anti-Armor] [Launcher] [Disposable] [Explosive] [Shaped Charge] [One-Shot] [Backblast] [Restricted] | — |
| `e_smoke_chaff_grenade` | E-Smoke / Chaff Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Electronic Smoke / Sensor Chaff<br>**Damage:** None<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard<br>**Tags:** [Throwable] [Grenade] [E-Smoke] [Chaff] [Obscuring] [Countermeasure] [Sensor Disruption] [Lock Breaker] [One-Shot] | — |
| `emp_disruption_grenade` | EMP / Disruption Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Electronic Disruption<br>**Damage:** None or 1d10 to fragile electronics<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard<br>**Tags:** [Throwable] [Grenade] [EMP] [Disruption] [Anti-Drone] [Electronics] [Sensor Disruption] [One-Shot] | — |
| `flamethrower` | Flame Thrower | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 2000 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `flamethrower` | Flamethrower | `weapons_and_armaments.md` | **Category:** Heavy Utility Weapon / Area Denial<br>**Damage:** 1 Wound<br>**Range / Delivery:** Nearby cone or stream<br>**Ammo / Shots:** Canister<br>**Penetration:** Standard; ignores some cover if flame can reach around, through, or into it<br>**Tags:** [2-Handed] [Area Denial] [Lingering Fire] [Thermal Suppression] [Canister] [Hazardous Tank] | — |
| `flare_gun` | Flare Gun | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 85 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `flare_gun` | Flare Gun | `weapons_and_armaments.md` | **Category:** Utility Weapon / Signal Launcher<br>**Damage:** 1d5<br>**Range:** Nearby shot; Far visual signal<br>**Ammo / Shots:** 1 flare loaded<br>**Wound Type:** [Fire/Explosive]<br>**Penetration:** Standard<br>**Tags:** [Signal] [Light] [Ignition] [Utility] [One-Shot] | — |
| `flashbang_stun_grenade` | Flashbang / Stun Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Disorientation<br>**Damage:** None or 1d10 in dangerous proximity<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard<br>**Tags:** [Throwable] [Grenade] [Flash] [Stun] [Disorient] [Less-Lethal] [Room Clear] [One-Shot] | — |
| `foam_grenade` | Foam Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Restraint Foam / Area Control<br>**Damage:** None, or 1d10 [Blunt Force] if impact-hardened or used dangerously<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard<br>**Tags:** [Throwable] [Grenade] [Foam] [Restraining] [Obstruction] [Nonlethal] [Area Denial] [Crowd Control] [One-Shot] | — |
| `foam_gun` | Foam Gun | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 275 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `foam_gun` | Foam Gun | `weapons_and_armaments.md` | **Category:** Utility Weapon / Restraint Foam Projector<br>**Damage:** None; 1d10 [Blunt Force] if impact-hardened or misused<br>**Range:** Close / Nearby<br>**Ammo / Shots:** Foam canister<br>**Wound Type:** [Less-Lethal] [Blunt Force]<br>**Penetration:** Standard<br>**Tags:** [Control] [Restraining] [Obstruction] [Nonlethal] [Foam] [Area Denial] | — |
| `frag_grenade` | Frag Grenade | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 70 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `frag_grenade` | Frag Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Fragmentation Explosive<br>**Damage:** 2 Wounds at center blast; 1 Wound near blast; 3d10 through partial cover or poor exposure<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard; fragments may count as `[Piercing]` against exposed soft targets at GM discretion<br>**Tags:** [Throwable] [Grenade] [Explosive] [Fragmentation] [Area] [One-Shot] [Hazardous] | — |
| `frag_grenade` | Frag Grenade (x6) | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 400 | 1d10 to everyone within 20m; can do 1 MDMG to ship if placed internally. |
| `gas_grenade` | Gas Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Chemical Area Denial<br>**Damage:** None, 1d10, or 1 Wound depending payload<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Ignores worn AV unless the target has [Sealed], [Filter], or appropriate protection<br>**Tags:** [Throwable] [Grenade] [Gas] [Chemical] [Area Denial] [Crowd Control] [Hazardous] | — |
| `grenade_proximity` | Grenade Proximity | `weapons_and_armaments.md` | — | When exact measurement is not worth slowing play, resolve grenade exposure by position: |
| `hand_welder` | Hand Welder | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 250 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `hand_welder` | Hand Welder | `weapons_and_armaments.md` | **Category:** Utility Weapon / Industrial Welder<br>**Damage:** 1d10<br>**Range:** Close<br>**Ammo / Shots:** Power cell / fuel feed<br>**Wound Type:** [Fire/Explosive]<br>**Penetration:** [Piercing] against soft armor, seals, and material with contact time<br>**Tags:** [Piercing] [Industrial] [Breaching] [Tool] [Close] | — |
| `handheld_railgun` | Handheld Railgun | `weapons_and_armaments.md` | **Category:** Special / Variable-Charge Rail Weapon<br>**Damage:** Variable, up to 10d10 per battery<br>**Range / Delivery:** Far / Extreme, line shot<br>**Ammo / Shots:** 1 battery; charge determines damage<br>**Penetration:** [Siege] at high charge; [Anti-Armor] at lower combat charges<br>**Tags:** [Siege] [Anti-Armor] [Variable Charge] [Crew-Served] [Cumbersome] [External Power] [Battery] [Material] [Line] | — |
| `heavy_anti_armor_launcher` | Heavy Anti-Armor Launcher | `weapons_and_armaments.md` | **Category:** Squad Anti-Armor Weapon<br>**Damage:** 8d10<br>**Range / Delivery:** Far / Extreme with lock, spotter, or clear firing line<br>**Ammo / Shots:** Single loaded round; reload requires setup or loader<br>**Penetration:** [Anti-Armor]<br>**Tags:** [Anti-Armor] [Launcher] [Squad Weapon] [Crew-Served] [Explosive] [Lock-On Optional] [Backblast] [Cumbersome] [Restricted] | — |
| `incendiary_grenade` | Incendiary Grenade | `weapons_and_armaments.md` | **Category:** Throwable / Fire Payload<br>**Damage:** 1 Wound on hit or ignition; lingering fire hazard<br>**Range / Delivery:** Thrown / Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** Standard<br>**Tags:** [Throwable] [Grenade] [Incendiary] [Ignition] [Area Denial] [Lingering Fire] [Hazardous] | — |
| `laser_cutter` | Laser Cutter | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 1200 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `laser_cutter` | Laser Cutter | `weapons_and_armaments.md` | **Category:** Utility Weapon / Industrial Cutter<br>**Damage:** 5d10 line in beam mode<br>**Range:** Close / Nearby line<br>**Ammo / Shots:** Battery / charge cycle<br>**Wound Type:** [Fire/Explosive]<br>**Penetration:** [Piercing]; may count as [Anti-Armor] against material or structure with time and setup<br>**Tags:** [Piercing] [Anti-Armor] [Breaching] [Line] [Industrial] [Cutter] [Battery] | — |
| `lmg_saw` | LMG / SAW | `weapons_and_armaments.md` | **Category:** Longarm / Squad Automatic Weapon<br>**Damage:** 3d10<br>**Range:** Nearby / Far<br>**Ammo / Shots:** Belt, box, or drum feed<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [2-Handed] [Longarm] [LMG] [Squad Automatic] [Burst] [Full Auto] [Suppressive] [Pinning] [Sustained Fire] [Ammo] [Bipod] [Cumbersome] | — |
| `machine_pistol` | Machine Pistol | `weapons_and_armaments.md` | **Category:** Small Arm / Automatic Sidearm<br>**Damage:** 3d5<br>**Range:** Close<br>**Ammo / Shots:** 20-30 rounds, depending magazine<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [1-Handed] [Sidearm] [Burst] [Underbarrel] [Stock] [Barrel] [Ammo] [CQB] | — |
| `mag_mine_limpet_charge` | Mag-Mine / Limpet Charge | `weapons_and_armaments.md` | **Category:** Attached Anti-Vehicle Charge<br>**Damage:** 1 Vehicle Wound<br>**Range / Delivery:** Placed / Attached / Thrown Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** [Anti-Armor]<br>**Tags:** [Mine] [Limpet] [Anti-Armor] [Attached Charge] [Sabotage] [Close] [Explosive] [Restricted] | — |
| `minigun_rotary_weapon` | Minigun / Rotary Weapon | `weapons_and_armaments.md` | **Category:** Heavy Automatic Weapon / Rotary Weapon<br>**Damage:** 3d10<br>**Range / Delivery:** Nearby<br>**Ammo / Shots:** Backpack feed or mounted belt<br>**Penetration:** Standard<br>**Tags:** [Burst] [Suppressive] [Pinning] [Sustained Fire] [Backpack Feed] [Powered Carry] [Stationary Fire] [Cumbersome] | — |
| `nail_gun` | Nail Gun | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 150 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `nail_gun` | Nail Gun | `weapons_and_armaments.md` | **Category:** Industrial Tool / Improvised Small Arm<br>**Damage:** 1d5<br>**Range:** Close<br>**Ammo / Shots:** 32 shots<br>**Wound Type:** [Gunshot] [Bleeding]<br>**Penetration:** Standard<br>**Tags:** [1-Handed] [Industrial] [Improvised] [Close] [Ammo] [Tool] | — |
| `orion_anti_material_rifle` | Orion Anti-Material Rifle | `Orion.md` | **Category:** Special / Siege Sniper<br>**Damage:** 2 Wounds / 5d10<br>**Wound Type:** [Gore/Massive]<br>**Tags:** [Siege Sniper] [Anti-Armor] [Gore/Massive] [Crew-Served] [Cumbersome] [Powered Carry] [Emplacement] [External Power] [Charge] [Extreme Range] [Two-Stage Round] [Asset Recovery] | The Orion is a crew-served anti-material rifle built to defeat cover, armor, reinforced positions, vehicles, walkers, and enclosed fighting platforms without necessarily destroying the entire asset. |
| `orion_anti_material_rifle` | Orion Anti-Material Rifle | `weapons_and_armaments.md` | **Category:** Special / Siege Sniper<br>**Damage:** 2 Wounds / 5d10<br>**Range / Delivery:** Far / Extreme, braced or emplaced<br>**Ammo / Shots:** Single heavy round or limited magazine, model dependent<br>**Penetration:** [Anti-Armor]<br>**Tags:** [Siege Sniper] [Anti-Armor] [Gore/Massive] [Crew-Served] [Cumbersome] [Powered Carry] [Emplacement] [External Power] [Charge] [Extreme Range] [Two-Stage Round] [Asset Recovery] | — |
| `pistol` | Pistol | `weapons_and_armaments.md` | **Category:** Small Arm / Sidearm<br>**Damage:** 1d10<br>**Range:** Close<br>**Ammo / Shots:** 12 rounds<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [1-Handed] [Sidearm] [Scope] [Underbarrel] [Barrel] [Ammo] | — |
| `pulse_rifle` | Pulse Rifle | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 1600 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `pulse_rifle` | Pulse Rifle | `weapons_and_armaments.md` | **Category:** Longarm / Military Rifle<br>**Damage:** 2d10<br>**Range:** Nearby / Far<br>**Ammo / Shots:** Standard magazine or power-cell magazine, model dependent<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [2-Handed] [Longarm] [Ammo] [Scope] [Smart-Link] [Burst] [Integrated Launcher] [AP Capable] | — |
| `revolver` | Revolver | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 750 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `revolver` | Revolver | `weapons_and_armaments.md` | **Category:** Small Arm / Heavy Sidearm<br>**Damage:** 2d10<br>**Range:** Close / Nearby<br>**Ammo / Shots:** 6 rounds<br>**Wound Type:** [Gunshot]<br>**Penetration:** [Piercing]<br>**Tags:** [1-Handed] [Sidearm] [Underbarrel] [Piercing] [Ammo] [Heavy Slug] | — |
| `rigging_gun` | Rigging Gun | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 350 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `rigging_gun` | Rigging Gun | `weapons_and_armaments.md` | **Category:** Utility Weapon / Harpoon and Tether Launcher<br>**Damage:** 1d10; +2d10 if forcibly removed<br>**Range:** Nearby / Far<br>**Ammo / Shots:** 1 tethered harpoon loaded<br>**Wound Type:** [Gunshot] [Bleeding]<br>**Penetration:** Standard<br>**Tags:** [Harpoon] [Retractable] [Tether] [Utility] [Entangle] [Ammo] | — |
| `satchel_charge` | Satchel Charge | `weapons_and_armaments.md` | **Category:** Portable Demolition / Breach Charge<br>**Damage:** 5d10 or 1 Vehicle Wound if placed well<br>**Range / Delivery:** Placed / Thrown Close<br>**Ammo / Shots:** Single-use<br>**Penetration:** [Anti-Armor] when placed; Standard as thrown explosive damage<br>**Tags:** [Explosive] [Demolition] [Placed Charge] [Breach] [Anti-Structure] [Hazardous] [Restricted] | — |
| `scalpel` | Scalpel | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 50 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `scalpel` | Scalpel | `melee_weapons_and_tags.md` | **Category:** Melee / Medical Tool<br>**Damage:** 1d10<br>**Wound Type:** [Bleeding]<br>**Tags:** [Melee] [1-Handed] [Medical] [Concealable] [Precision] [Fragile] | A surgical cutting tool. Small, sharp, precise, and dangerous in trained hands. |
| `smart_rifle` | Smart Rifle | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 12000 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `smg` | SMG | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 1200 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `smg` | SMG | `weapons_and_armaments.md` | **Category:** Longarm / Compact Automatic Weapon<br>**Damage:** 3d10<br>**Range:** Close / Nearby<br>**Ammo / Shots:** 30 rounds<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [1-Handed] [Ammo] [Underbarrel] [Barrel] [Stock] [Selectable Fire: B/FA] [Burst] [Full Auto] [CQB] | — |
| `sniper_rifle` | Sniper Rifle | `weapons_and_armaments.md` | **Category:** Longarm / Precision Rifle<br>**Damage:** Ideal braced range: 1 Wound; other valid shots: 3d10<br>**Range:** Far / Extreme when braced<br>**Ammo / Shots:** 5-10 rounds, model dependent<br>**Wound Type:** [Gunshot]<br>**Penetration:** Standard<br>**Tags:** [2-Handed] [Longarm] [Ammo] [Scope] [Smart-Link] [Bipod] [Precision] [Spectroscope] [AP Capable] | — |
| `stun_baton` | Stun Baton | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 115 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `stun_baton` | Stun Baton | `melee_weapons_and_tags.md` | **Category:** Melee / Security Weapon<br>**Damage:** 1d5 + Body Save effect<br>**Wound Type:** [Less-Lethal]<br>**Tags:** [Melee] [1-Handed] [Security] [Stun] [Less-Lethal] [Shock] [Pain Compliance] [Nonlethal] | A close-range security weapon used by prison guards, colony police, corporate response teams, riot units, and shipboard security. |
| `tranquilizer_pistol` | Tranq Pistol | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 850 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `tranquilizer_pistol` | Tranquilizer Pistol | `weapons_and_armaments.md` | **Category:** Utility Weapon / Less-Lethal Sidearm<br>**Damage:** 1 damage + Body Save<br>**Range:** Close / Nearby<br>**Ammo / Shots:** 6 darts<br>**Wound Type:** [Less-Lethal]<br>**Penetration:** Standard<br>**Tags:** [1-Handed] [Sidearm] [Dart] [Sedative] [Less-Lethal] [Ammo] | — |
| `vibechete` | Vibechete | `Mothership-PSG-v3.pdf pp.17–18` | **Cost:** 75 | Powered foliage-clearing machete; weapon-capable. |
| `vibechete` | Vibechete | `Mothership-PSG-v3.pdf pp.2, 13–14` | **Cost:** 75 | Vanilla weapon-table entry; preserve original statistics during comparison. |
| `vibechete` | Vibechete | `melee_weapons_and_tags.md` | **Category:** Melee / Powered Blade<br>**Damage:** 3d10<br>**Wound Type:** [Bleeding] or [Gore/Massive] on severe trauma<br>**Tags:** [Melee] [1-Handed] [Powered] [Vibroblade] [Brutal] [Limb Severing] [Forestry] [Hazardous] | A powered machete with a vibrating or oscillating cutting edge, built for dense vegetation, organic material, light barricades, and close-quarters brutality. |

### Weapon Attachment — Barrel

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `choke` | Choke | `attachments_ammo_customizations.md` | — | A choke modifies shotgun spread. |
| `muzzle_brake` | Muzzle Brake | `attachments_ammo_customizations.md` | — | Reduces recoil and muzzle climb by redirecting gases. |
| `ship_safe_barrel` | Ship-Safe Barrel | `attachments_ammo_customizations.md` | — | A ship-safe barrel modifies weapon pressure, velocity, or projectile behavior to reduce the risk of penetrating hulls, pressure systems, internal bulkheads, or critical ship components. |
| `stabilizer` | Stabilizer | `attachments_ammo_customizations.md` | — | Improves barrel control and shot consistency. |
| `subsonic_barrel_subsonic_kit` | Subsonic Barrel / Subsonic Kit | `attachments_ammo_customizations.md` | — | A subsonic kit is tuned to fire low-velocity rounds quietly and safely in enclosed spaces. |
| `suppressor_silencer` | Suppressor / Silencer | `attachments_ammo_customizations.md` | — | Reduces weapon report and makes shots harder to locate. |

### Weapon Attachment — Stock

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `collapsible_stock` | Collapsible Stock | `attachments_ammo_customizations.md` | — | Better in tight quarters and easier to carry. |
| `extended_stock` | Extended Stock | `attachments_ammo_customizations.md` | — | Better control and accuracy when braced, stationary, or firing at range. |
| `standard_stock` | Standard Stock | `attachments_ammo_customizations.md` | — | Balanced default with no special advantage or drawback. |

### Weapon Attachment — Underbarrel

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `bipod` | Bipod | `attachments_ammo_customizations.md` | — | Allows braced fire. |
| `g_launcher` | G-Launcher | `attachments_ammo_customizations.md` | — | Allows the weapon to fire compatible grenades. Capacity depends on model. |
| `grip` | Grip | `attachments_ammo_customizations.md` | — | Helps control recoil. |
| `tac_light` | Tac-Light | `attachments_ammo_customizations.md` | — | Illuminates a nearby area or target lane. |

### Weapon Fire Mode

| Candidate ID | Source name | Source | Key fields captured | Source summary |
|---|---|---|---|---|
| `burst_b` | Burst `[B]` | `attachments_ammo_customizations.md` | — | Controlled multi-shot fire. |
| `full_auto_fa` | Full Auto `[FA]` | `attachments_ammo_customizations.md` | — | Sustained automatic fire. |
| `single_s` | Single `[S]` | `attachments_ammo_customizations.md` | — | Standard controlled fire. |

## Vanilla d100 trinket registry

These are retained as identity objects with **no fixed numeric effect**. The Warden’s manual nevertheless supports using fitting equipment, patches, and trinkets as evidence of competence or fictional permission.

| d100 | Trinket | Initial tags / review cue |
|---:|---|---|
| 00 | Preserved Insectile Aberration | identity / personal effect |
| 01 | Faded Green Poker Chip | identity / personal effect |
| 02 | Antique Company Script (Asteroid Mine) | identity / personal effect |
| 03 | Dessicated Husk Doll | identity / personal effect |
| 04 | Alien Pressed Flower (common) | identity / personal effect |
| 05 | Necklace of Shell Casings | identity / personal effect |
| 06 | Corroded Android Logic Core | identity / personal effect |
| 07 | Pamphlet: Signs of Parasitical Infection | document |
| 08 | Manual: Treat Your Rifle Like A Lady | document |
| 09 | Bone Knife | weapon-like |
| 10 | Calendar: Alien Pin-Up Art | document |
| 11 | Dog Tags (Heirloom) | credential/key/personal |
| 12 | Holographic Serpentine Dancer | identity / personal effect |
| 13 | Snake Whiskey | consumable/unknown substance, credential/key/personal |
| 14 | Medical Container, Purple Powder | consumable/unknown substance |
| 15 | Pills: Male Enhancement, Shoddy | consumable/unknown substance |
| 16 | Casino Playing Cards | identity / personal effect |
| 17 | Lagomorph Foot | identity / personal effect |
| 18 | Moonstone Ring | identity / personal effect |
| 19 | Manual: Mining Safety and You | document |
| 20 | Pamphlet: Against Human Simulacrum | document |
| 21 | Animal Skull, 3 Eyes, Curled Horns | identity / personal effect |
| 22 | Bartender’s Certification (Expired) | document |
| 23 | Bent Wrench | tool/utility potential |
| 24 | Prospecting Mug, Dented | identity / personal effect |
| 25 | Eerie Mask | identity / personal effect |
| 26 | Vantablack Marble | identity / personal effect |
| 27 | Ivory Dice | identity / personal effect |
| 28 | Tarot Cards, Worn, Pyrite Gilded edges | identity / personal effect |
| 29 | Bag of Assorted Teeth | identity / personal effect |
| 30 | Ashes (A Relative) | identity / personal effect |
| 31 | DNR Beacon Necklace | credential/key/personal |
| 32 | Cigarettes (Grinning Skull) | consumable/unknown substance |
| 33 | Pills: Areca Nut | consumable/unknown substance |
| 34 | Rejected Application (Colony Ship) | identity / personal effect |
| 35 | Pamphlet: Android Overlords | document |
| 36 | Smut (Seditious): The Captain, Ordered | identity / personal effect |
| 37 | Key (Childhood Home) | credential/key/personal |
| 38 | Manual: Panic: Harbinger of Catastrophe | document |
| 39 | Token: “Is Your Morale Improving?” | identity / personal effect |
| 40 | Phosphorescent Sticks, Neon | identity / personal effect |
| 41 | Pamphlet: The Indifferent Stars | document |
| 42 | Calendar: Military Battles | document |
| 43 | Manual: Rich Captain, Poor Captain | document |
| 44 | Campaign Poster (Home Planet) | document |
| 45 | Pendant: Shell Fragments Suspended in Plastic | identity / personal effect |
| 46 | Titanium Toothpick | identity / personal effect |
| 47 | Gloves, Leather (Xenomorph Hide) | identity / personal effect |
| 48 | Pamphlet: Zen and the Art of Cargo Arrangement | document |
| 49 | Pictorial Pornography, Dogeared, Well Thumbed | identity / personal effect |
| 50 | Brass Knuckles | weapon-like |
| 51 | Fuzzy Handcuffs | identity / personal effect |
| 52 | Journal of Grudges | document |
| 53 | Stylized Cigarette Case | identity / personal effect |
| 54 | Ball of Assorted Gauge Wire | tool/utility potential |
| 55 | Spanner | tool/utility potential |
| 56 | Switchblade, Ornamental | weapon-like |
| 57 | Powdered Xenomorph Horn | consumable/unknown substance |
| 58 | Bonsai Tree | identity / personal effect |
| 59 | Golf Club (Putter) | identity / personal effect |
| 60 | Trilobite Fossil | identity / personal effect |
| 61 | Pamphlet: A Girl In Every Port | document |
| 62 | Patched Overalls, Personalized | identity / personal effect |
| 63 | Fleshy Thing Sealed in a Murky Jar | identity / personal effect |
| 64 | Spiked Bracelet | identity / personal effect |
| 65 | Harmonica | identity / personal effect |
| 66 | Manual: Spacefarer’s Almanac (out of date) | document |
| 67 | Faded Photograph, A Windswept Heath | identity / personal effect |
| 68 | Stress Ball reads: Zero Stress in Zero G | identity / personal effect |
| 69 | Manual: Moonshining With Gun Oil & Fuel | document |
| 70 | Gyroscope, Bent, Tin | identity / personal effect |
| 71 | Coffee Cup, Chipped, HAPPINESS IS MANDATORY | identity / personal effect |
| 72 | Darts, Magnetic | identity / personal effect |
| 73 | Spray Paint | tool/utility potential |
| 74 | Wanted Poster, Weathered | document |
| 75 | Locket, Hair Braid | identity / personal effect |
| 76 | Pick, Miniature | identity / personal effect |
| 77 | Blanket, Fire Retardant | identity / personal effect |
| 78 | Hooded Parka, Fleece-Lined | identity / personal effect |
| 79 | BB Gun | weapon-like |
| 80 | Flint Hatchet | weapon-like |
| 81 | Pendant: Two Astronauts form a Skull | identity / personal effect |
| 82 | Rubik's Cube | identity / personal effect |
| 83 | Manual: Survival: Eat Soup With a Knife | weapon-like, document |
| 84 | Sputnik Pin | identity / personal effect |
| 85 | Ushanka | identity / personal effect |
| 86 | Trucker Cap, Mesh, Grey Alien Logo | identity / personal effect |
| 87 | Menthol Balm | consumable/unknown substance |
| 88 | Pith Helmet | identity / personal effect |
| 89 | 10x10 Tarp | tool/utility potential |
| 90 | I Ching, Missing Sticks | document |
| 91 | Kukri | weapon-like |
| 92 | Trench Shovel | tool/utility potential |
| 93 | Shiv, Sharpened Butter Knife | weapon-like |
| 94 | Taxidermied Cat | identity / personal effect |
| 95 | Pamphlet: Interpreting Sheep Dreams | document |
| 96 | Pair of Shot Glasses, Spent Shotgun Shells | identity / personal effect |
| 97 | Opera Glasses | identity / personal effect |
| 98 | Pamphlet: The Relic of Flesh | document |
| 99 | Miniature Chess Set, Bone, Pieces Missing | identity / personal effect |

## Vanilla d100 patch registry

| d100 | Patch | Initial tags / review cue |
|---:|---|---|
| 00 | “#1 Worker” | trade/science identity |
| 01 | Security Guard patch | security/combat identity |
| 02 | Blood Type (Reference Patch) | medical identity |
| 03 | Red Shirt Logo | identity / affiliation / attitude |
| 04 | “Don’t Run You’ll Only Die Tired” Backpatch | backpatch |
| 05 | Poker Hand: Dead Mans Hand | identity / affiliation / attitude |
| 06 | Biohazard Symbol | identity / affiliation / attitude |
| 07 | Mr. Yuck | identity / affiliation / attitude |
| 08 | Nuclear Symbol | identity / affiliation / attitude |
| 09 | “Eat The Rich” | identity / affiliation / attitude |
| 10 | “Be Sure: Doubletap” | security/combat identity |
| 11 | Flame Emoji | identity / affiliation / attitude |
| 12 | Smiley Face (Glow in the Dark) | identity / affiliation / attitude |
| 13 | “Smile: Big Brother is Watching” | identity / affiliation / attitude |
| 14 | Jolly Roger | identity / affiliation / attitude |
| 15 | Viking Skull | identity / affiliation / attitude |
| 16 | “APEX PREDATOR” (Sabertooth Skull) | identity / affiliation / attitude |
| 17 | Pin-Up (Ace of Spades) | identity / affiliation / attitude |
| 18 | Queen of Hearts | identity / affiliation / attitude |
| 19 | Pin-Up (Mechanic) | identity / affiliation / attitude |
| 20 | BOHICA | identity / affiliation / attitude |
| 21 | Front Towards Enemy (Claymore Mine) | security/combat identity |
| 22 | Pin-Up (Riding Missile) | identity / affiliation / attitude |
| 23 | FUBAR | identity / affiliation / attitude |
| 24 | “I’m A (Love) Machine” | identity / affiliation / attitude |
| 25 | Medic Patch (Skull and Crossbones on Logo) | medical identity |
| 26 | HELLO MY NAME IS: | identity / affiliation / attitude |
| 27 | “Powered By Coffee” | identity / affiliation / attitude |
| 28 | “Take Me To Your Leader” (UFO) | identity / affiliation / attitude |
| 29 | “DO YOUR JOB” | identity / affiliation / attitude |
| 30 | “Take My Life (Please)” | identity / affiliation / attitude |
| 31 | “All Out of Fucks To Give” (Astronaut with Turned Out Pockets) | identity / affiliation / attitude |
| 32 | Allergic To Bullshit (Medical Style Patch) | medical identity |
| 33 | “Fix Me First” (Caduceus) | medical identity, trade/science identity |
| 34 | “Upstanding Citizen” | identity / affiliation / attitude |
| 35 | NASA Logo | identity / affiliation / attitude |
| 36 | “Cowboy Up” (Crossed Revolvers) | identity / affiliation / attitude |
| 37 | Dove in Crosshairs | identity / affiliation / attitude |
| 38 | Chibi Cthulhu | identity / affiliation / attitude |
| 39 | “Welcome to the DANGER ZONE” | security/combat identity |
| 40 | Skull and Crossed Wrenches | trade/science identity |
| 41 | Pin-Up (Succubus) | identity / affiliation / attitude |
| 42 | “DILLIGAF?” | identity / affiliation / attitude |
| 43 | “DRINK / FIGHT / FUCK” | identity / affiliation / attitude |
| 44 | “Work Hard / Party Harder” | identity / affiliation / attitude |
| 45 | Mudflap Girl | identity / affiliation / attitude |
| 46 | Fun Meter (reading: bad time) | identity / affiliation / attitude |
| 47 | “GAME OVER” (Bride & Groom) | identity / affiliation / attitude |
| 48 | Heart | identity / affiliation / attitude |
| 49 | “IMPROVE / ADAPT / OVERCOME” | identity / affiliation / attitude |
| 50 | “SUCK IT UP” | identity / affiliation / attitude |
| 51 | HMFIC | identity / affiliation / attitude |
| 52 | “Troubleshooter” | identity / affiliation / attitude |
| 53 | “IF I’M RUNNING KEEP UP” Backpatch | backpatch |
| 54 | Crossed Hammers with Wings | trade/science identity |
| 55 | “Keep Well Lubricated” | identity / affiliation / attitude |
| 56 | Soviet Hammer & Sickle | trade/science identity |
| 57 | “Plays Well With Others” | identity / affiliation / attitude |
| 58 | “Live Free and Die” | identity / affiliation / attitude |
| 59 | Pin-Up (Nurse): “The Louder You Scream the Faster I Come” | identity / affiliation / attitude |
| 60 | “Meat Bag” | identity / affiliation / attitude |
| 61 | “I Am Not A Robot” | identity / affiliation / attitude |
| 62 | Red Gear | identity / affiliation / attitude |
| 63 | “I Can’t Fix Stupid” | trade/science identity |
| 64 | “Space IS My Home” (Sad Astronaut) | identity / affiliation / attitude |
| 65 | All Seeing Eye | identity / affiliation / attitude |
| 66 | “Do I LOOK Like An Expert” | identity / affiliation / attitude |
| 67 | “NOMAD” | identity / affiliation / attitude |
| 68 | “I’m Not A Rocket Scientist / But You’re An Idiot” | trade/science identity |
| 69 | “LONER” | identity / affiliation / attitude |
| 70 | “I Am My Brothers Keeper” | identity / affiliation / attitude |
| 71 | “Mama Tried” | identity / affiliation / attitude |
| 72 | Black Widow Spider | identity / affiliation / attitude |
| 73 | “My Other Ride Married You” | identity / affiliation / attitude |
| 74 | “One Size Fits All” (Grenade) | security/combat identity |
| 75 | Grim Reaper Backpatch | backpatch |
| 76 | трахаться (Get Fucked, Russian) | identity / affiliation / attitude |
| 77 | “Smooth Operator” | identity / affiliation / attitude |
| 78 | Atom Symbol | identity / affiliation / attitude |
| 79 | “For Science!” | trade/science identity |
| 80 | “Actually, I Am A Rocket Scientist” | trade/science identity |
| 81 | “Help Wanted” | identity / affiliation / attitude |
| 82 | Princess | identity / affiliation / attitude |
| 83 | “I Like My Tools Clean / And My Lovers Dirty” | trade/science identity |
| 84 | “GOOD BOY” | identity / affiliation / attitude |
| 85 | Dice (Snake Eyes) | identity / affiliation / attitude |
| 86 | “Travel To Distant Exotic Places / Meet Unusual Things / Get Eaten” | identity / affiliation / attitude |
| 87 | “Good” (Brain) | identity / affiliation / attitude |
| 88 | “Bad Bitch” | identity / affiliation / attitude |
| 89 | “Too Pretty To Die” | identity / affiliation / attitude |
| 90 | “Fuck Forever” (Roses) | identity / affiliation / attitude |
| 91 | Icarus | identity / affiliation / attitude |
| 92 | “Girls Best Friend” (Diamond) | identity / affiliation / attitude |
| 93 | Risk of Electrocution Symbol | identity / affiliation / attitude |
| 94 | Inverted Cross | identity / affiliation / attitude |
| 95 | “Do You Sign My Paychecks?” Backpatch | backpatch |
| 96 | “I ♥ Myself” | identity / affiliation / attitude |
| 97 | Double Cherry | identity / affiliation / attitude |
| 98 | “Volunteer” | identity / affiliation / attitude |
| 99 | “Solve Et Coagula” (Baphomet) | identity / affiliation / attitude |

## Runtime implementation cross-check

### `ammunition.js`

| Runtime ID | Label | Ledger match |
|---|---|---|
| `ap` | AP / Piercing Ammunition | yes |
| `phosphorus_dragon` | Phosphorus / Dragon Rounds | yes |
| `ship_safe` | Ship-Safe Ammunition | yes |
| `cryo` | Cryo Ammunition | yes |
| `less_lethal` | Less-Lethal / Rubberized | runtime-only / boundary |

### `armor-systems.js`

| Runtime ID | Label | Ledger match |
|---|---|---|
| `sealed` | Sealed | runtime-only / boundary |
| `oxygen_supply` | Oxygen Supply | runtime-only / boundary |
| `vacuum_protection` | Vacuum Protection | runtime-only / boundary |
| `chemical_filtration` | Chemical Filtration | runtime-only / boundary |
| `biohazard_protection` | Biohazard Protection | runtime-only / boundary |
| `temperature_control` | Temperature Control | runtime-only / boundary |
| `radiation_protection` | Radiation Protection | runtime-only / boundary |
| `trauma_dampening` | Trauma Dampening | runtime-only / boundary |
| `auto_patch` | AutoPatch | runtime-only / boundary |
| `auto_injector` | AutoInjector | runtime-only / boundary |
| `medical_monitoring` | Medical Monitoring | runtime-only / boundary |
| `hud` | HUD | runtime-only / boundary |
| `tac_link` | Tac-Link | runtime-only / boundary |
| `smart_systems` | Smart Systems | runtime-only / boundary |
| `strength_assistance` | Strength Assistance | runtime-only / boundary |
| `mobility_assistance` | Mobility Assistance | runtime-only / boundary |

### `environmental-suit-statuses.js`

| Runtime ID | Label | Ledger match |
|---|---|---|
| `seal_warning` | Seal Warning | runtime-only / boundary |
| `seal_breach` | Seal Breach | runtime-only / boundary |
| `critical_seal_failure` | Critical Seal Failure | runtime-only / boundary |
| `o2_leak` | O2 Leak | runtime-only / boundary |
| `filter_rupture` | Filter Rupture | runtime-only / boundary |
| `pressure_failure` | Pressure Failure | runtime-only / boundary |
| `thermal_control_failure` | Thermal Control Failure | runtime-only / boundary |
| `hazard_layer_failure` | Hazard Layer Failure | runtime-only / boundary |

### `damage-weapon-presets.js`

| Runtime ID | Label | Ledger match |
|---|---|---|
| `pistol` | Pistol | yes |
| `standard` | Standard — 1d10 | runtime-only / boundary |
| `revolver` | Revolver | yes |
| `standard` | Heavy Slug — 2d10 | runtime-only / boundary |
| `machine_pistol` | Machine Pistol | yes |
| `burst` | Burst — 3d5 | runtime-only / boundary |
| `combat_shotgun` | Combat Shotgun | yes |
| `nearby` | Nearby — 3d10 | runtime-only / boundary |
| `close` | Close — 1 Direct Wound | runtime-only / boundary |
| `pulse_rifle` | Pulse Rifle | yes |
| `standard` | Standard — 2d10 | runtime-only / boundary |
| `sniper_rifle` | Sniper Rifle | yes |
| `standard` | Other Valid Shot — 3d10 | runtime-only / boundary |
| `ideal_braced` | Ideal Braced Range — 1 Direct Wound | runtime-only / boundary |
| `smg` | SMG | yes |
| `standard` | Standard — 3d10 | runtime-only / boundary |
| `lmg_saw` | LMG / SAW | yes |
| `minigun_rotary` | Minigun / Rotary Weapon | yes |
| `standard` | Sustained Fire — 3d10 | runtime-only / boundary |
| `disposable_anti_armor_launcher` | Disposable Anti-Armor Launcher | yes |
| `standard` | One-Shot — 5d10 | runtime-only / boundary |
| `heavy_anti_armor_launcher` | Heavy Anti-Armor Launcher | yes |
| `standard` | Tank / Walker Killer — 8d10 | runtime-only / boundary |
| `handheld_railgun` | Infantry Railgun | runtime-only / boundary |
| `combat_charge` | Combat Charge — 5d10 | runtime-only / boundary |
| `quick_charge` | Quick Charge — 3d10 | runtime-only / boundary |
| `full_charge` | Full Charge — 10d10 | runtime-only / boundary |
| `anti_armor_grenade` | Anti-Armor Grenade / Shaped Charge | runtime-only / boundary |
| `thrown` | Thrown / Poor Placement — 5d10 | runtime-only / boundary |
| `placed` | Properly Placed — 1 Vehicle Wound | runtime-only / boundary |
| `mag_mine` | Mag-Mine / Limpet Charge | yes |
| `attached` | Attached — 1 Vehicle Wound | runtime-only / boundary |
| `satchel_charge` | Satchel Charge | yes |
| `demolition_charge` | Demolition Charge | yes |
| `placed` | Placed Siege Charge — 8d10 | runtime-only / boundary |
| `orion_anti_material_rifle` | Orion Anti-Material Rifle | yes |
| `hard_target` | Hard Target Penetrator — 5d10 | runtime-only / boundary |
| `biological_or_interior` | Exposed Target / Occupied Interior — 2 Wounds | runtime-only / boundary |
| `frag_grenade` | Frag Grenade | yes |
| `edge` | Edge / Partial Cover — 3d10 | runtime-only / boundary |
| `near` | Near Blast — 1 Wound | runtime-only / boundary |
| `center` | Center Blast — 2 Wounds | runtime-only / boundary |
| `concussion_grenade` | Concussion / Breach Grenade | yes |
| `normal` | Normal Exposure — 1 Wound | runtime-only / boundary |
| `confined` | Confined Space / Direct Breach — 2 Wounds | runtime-only / boundary |
| `incendiary_grenade` | Incendiary Grenade | yes |
| `ignition` | Hit / Ignition — 1 Wound | runtime-only / boundary |
| `unarmed` | Unarmed | yes |
| `current_wounds` | Current Wounds as Damage | runtime-only / boundary |
| `crowbar` | Crowbar | yes |
| `standard` | Strike — 1d5 | runtime-only / boundary |
| `scalpel` | Scalpel | yes |
| `standard` | Precision Cut — 1d10 | runtime-only / boundary |
| `stun_baton` | Stun Baton | yes |
| `standard` | Shock Strike — 1d5 | runtime-only / boundary |
| `breaching_axe` | Breaching Axe | yes |
| `blade` | Blade — 2d10 Bleeding | runtime-only / boundary |
| `blunt` | Back / Pry — 2d10 Blunt | runtime-only / boundary |
| `vibechete` | Vibechete | yes |
| `standard` | Powered Cut — 3d10 | runtime-only / boundary |
| `severe_trauma` | Severe Trauma — 3d10 Massive Gore | runtime-only / boundary |
| `pintle_gun` | Pintle Gun / Roof Gun | runtime-only / boundary |
| `standard` | Mounted Fire — 3d10 | runtime-only / boundary |
| `exposed_infantry` | Exposed Infantry — 1 Wound | runtime-only / boundary |
| `door_gun` | Door Gun / Gunship Mount | runtime-only / boundary |
| `standard` | Suppressive Fire — 3d10 | runtime-only / boundary |
| `riot_cannon` | Riot Cannon / Foam Projector | runtime-only / boundary |
| `impact` | Dangerous Impact — 1d10 | runtime-only / boundary |
| `light_autocannon` | Light Autocannon / 20–30mm | runtime-only / boundary |
| `standard` | Anti-Light Armor — 4d10 | runtime-only / boundary |
| `autocannon_60mm` | 60mm Autocannon | runtime-only / boundary |
| `vehicle` | Vehicle / Walker — 4d10 | runtime-only / boundary |
| `tactical_missile` | Tactical Missile Box | runtime-only / boundary |
| `single` | Single Missile — 5d10 | runtime-only / boundary |
| `full_volley` | Full Volley — 8d10 | runtime-only / boundary |
| `vulnerable_target` | Vulnerable Target — 2 Vehicle Wounds | runtime-only / boundary |
| `main_gun_120mm` | 120mm Main Gun | runtime-only / boundary |
| `standard` | Main Gun — 8d10 | runtime-only / boundary |
| `heavy_mortar` | Heavy Mortar System | runtime-only / boundary |
| `high_explosive` | High Explosive — 5d10 | runtime-only / boundary |
| `exposed_target` | Exposed Target — 1 Wound | runtime-only / boundary |
| `siege_cannon` | Heavy Cannon / Siege Cannon | runtime-only / boundary |
| `standard` | Heavy Direct Fire — 8d10 | runtime-only / boundary |
| `decisive_breach` | Decisive Breach — 2 Vehicle Wounds | runtime-only / boundary |
| `walker_rail_package` | Walker Rail Package | runtime-only / boundary |
| `rocket_pod` | Air-to-Ground Rocket Pod | runtime-only / boundary |
| `area` | Area Saturation — 4d10 | runtime-only / boundary |
| `exposed_cluster` | Exposed Cluster — 1 Wound | runtime-only / boundary |
| `gunship_chin_cannon` | Gunship Chin Cannon | runtime-only / boundary |
| `light_model` | Light Model — 4d10 | runtime-only / boundary |
| `heavy_model` | Heavy Model — 6d10 | runtime-only / boundary |
| `air_defense_missile` | Air-Defense Missile / Interceptor Rack | runtime-only / boundary |
| `standard` | Interceptor — 5d10 | runtime-only / boundary |

### `ship-weapons.js`

| Runtime ID | Label | Ledger match |
|---|---|---|
| `anti_personnel_turret` | Mounted MG / Anti-Personnel Turret | runtime-only / boundary |
| `point_defense_cluster` | Point-Defense Cluster | runtime-only / boundary |
| `laser_cutter` | Laser Cutter / Utility Laser | runtime-only / boundary |
| `rigging_gun` | Rigging Gun / Boarding Harpoon | runtime-only / boundary |
| `decoy_ecm` | Decoy Launcher / Basic ECM | runtime-only / boundary |
| `heavy_disabling_laser` | Heavy Disabling Laser | runtime-only / boundary |
| `ion_snare` | Ion Snare / Disruptor Array | runtime-only / boundary |
| `autocannon_battery` | Autocannon Battery | runtime-only / boundary |
| `missile_rack` | Missile Rack | runtime-only / boundary |
| `light_coilgun` | Light Coilgun / Rail Battery | runtime-only / boundary |
| `particle_lance` | Particle Beam / Lance | runtime-only / boundary |
| `torpedo` | Torpedo | runtime-only / boundary |
| `military_railgun` | Military Railgun | runtime-only / boundary |
| `spinal_lance` | Spinal Lance / Capital Beam | runtime-only / boundary |
| `sovereign_planet_cracker` | Sovereign / Planet-Cracker Weapon | runtime-only / boundary |
| `standard` | Standard | runtime-only / boundary |
| `anti_missile_drone_shuttle` | Missile / Drone / Shuttle | runtime-only / boundary |
| `siege_payload` | Siege Payload | runtime-only / boundary |
| `peer_hardened_target` | Peer Hardened Target | runtime-only / boundary |
| `sustained_lock` | Sustained Lock | runtime-only / boundary |

## Known high-priority normalization decisions

- **`camping_gear`:** Compare with MoHab Unit; likely basic bundle versus expanded field shelter.
- **`first_aid_kit`:** Keep distinct from Trauma Kit unless explicitly upgraded; lower-capability vanilla kit.
- **`lockpick_suite`:** Resolved as one canonical Lockpick Suite record; Lockpick Set retained as vanilla alias.
- **`eva_suit`:** Resolved. Canonical name is EVA Suit; Vaccsuit is retained as a vanilla alias. Current codex AV and systems override legacy Armor Save mechanics.
- **`magnetic_boots`:** Resolved as one canonical Magnetic Boots record; Mag-Boots retained as vanilla alias.
- **`specialized_water_filter`:** Vanilla Water Filter and codex Specialized Water Filter are likely the same lineage.
- **`frag_grenade`:** Resolved. Frag Grenade is canonical; Fragmentation Grenade is an alias and x6 is represented as package quantity.
- **`orion_anti_material_rifle`:** Dedicated lore profile, weapon catalog profile, and damage-resolver preset all coexist.
- **`aegis_advanced_battle_suit`:** Armor definition also embeds shield mechanics; keep links to shield and armor registries.
- **`handheld_aegis`:** Distinct from Tactical Breaching Shield; do not merge merely because both are carried shields.
- **`explosives_and_detonator`:** Compare against Satchel Charge and Demolition Charge; likely package/category relationship, not direct alias.
- **`laser_cutter`:** Functions as industrial tool, personal weapon, and ship-scale utility laser depending mount/scale.
- **Vanilla versus codex statistics:** Prices and original effects must remain source fields even when current doctrine replaces their mechanics.
- **Packages versus items:** Quantities such as `Automed (x6)`, `MRE (x7)`, and `Frag Grenade (x6)` should become package or starting-loadout quantities, not separate product identities unless purchasing packages matters.
- **Owned-instance separation:** A character inventory entry needs condition, quantity, charges, location, ownership, legality, and notes that do not belong on the canonical product definition.
- **Scale separation:** Personal, powered-carry, squad-support, vehicle, ship, and strategic versions must not share a resolver profile merely because their labels overlap.

## Next audit pass

1. Verify all starting loadout package contents from the character sheet/manual sources.
2. Add exact vanilla weapon and armor statistics as source-specific fields rather than summary notes.
3. Compare every duplicate source pair and mark `same item`, `variant`, `successor`, or `distinct` explicitly.
4. Convert the accepted rows into a canonical catalog proposal without deleting provenance.

---

## Approved Conflict Resolutions — Pass 1

Approved doctrine for this pass:

- Current codex mechanics override legacy vanilla mechanics where they disagree.
- Vanilla names, prices, package quantities, and original statistics remain provenance metadata.
- Prices are provisional until the economy and procurement audit.
- Tool/weapon overlap is modeled as one equipment definition with an optional weapon profile.
- Scale-specific equipment remains distinct even when names overlap.
- Packages such as x6 ammunition, grenades, or medical doses are quantities or bundles, not separate item identities.

Resolved records:

`advanced_battle_dress`, `eva_suit`, `hazard_suit`, `standard_battle_dress`, `oxygen_tank`, `stimpack`, `stimpak`, `radio_jammer`, `combat_shotgun`, `crowbar`, `foam_gun`, `frag_grenade`, `hand_welder`, `laser_cutter`, `nail_gun`, `pulse_rifle`, `revolver`, `rigging_gun`, `scalpel`, and `vibechete`.

## Approved Multiple-Source Resolutions — Pass 2

Approved doctrine for this pass:

- Repeated vanilla and codex appearances are treated as source enrichment unless a real mechanical disagreement exists.
- Canonical definitions use current codex mechanics and expanded limitations; vanilla prices remain provisional provenance.
- Alternate spellings and abbreviated labels become aliases rather than separate products.
- Parenthetical quantities such as `(x6)` and `(x7)` become bundles tied to a single-dose or single-unit definition.
- Pain Pills retain the concrete vanilla effect of healing `1d10 Health` and reducing Stress by `1`, alongside the codex addiction, impairment, and overdose risks.
- Water Filter is the canonical display name; Specialized Water Filter remains an expanded descriptor or model label.

Resolved records:

`standard_crew_attire`, `electronic_tool_set`, `flashlight`, `magnetic_boots`, `survey_kit`, `automed`, `mre`, `pain_pills`, `rebreather`, `specialized_water_filter`, `body_cam`, `heads_up_display`, `infrared_goggles`, `locator`, `lockpick_suite`, `binoculars`, `bioscanner`, `cybernetic_diagnostic_scanner`, `emergency_beacon`, `field_recorder`, `long_range_communications`, `medscanner`, `short_range_communications`, `flamethrower`, `flare_gun`, `smg`, `stun_baton`, and `tranquilizer_pistol`.
