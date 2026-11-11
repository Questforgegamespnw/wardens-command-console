# Warden Command Console — Career & Specialty Gear Recommendations

**Status:** First-pass curation for review  
**Purpose:** Surface useful starting-gear choices without creating fixed loadout packages or hardcoded item allowances.

## Locked behavior

- Every catalog item remains available through the full equipment catalog.
- Career and Specialty recommendations are guidance, not automatic grants.
- Finalizing the character implies that the player and Warden have already agreed on the selected items.
- Gear-source groups may remain empty.
- When Career and Specialty recommend the same item, the UI displays it once and combines the recommendation reasons.
- Vehicles, vehicle-mounted systems, ship weapons, ship modules, and strategic assets remain outside character inventory.

## Recommendation dispositions

| Disposition | Meaning |
|---|---|
| `commonly_issued` | Frequently supplied by an employer, unit, institution, or ship for this work. |
| `recommended` | A practical personal or professional tool for the role. |
| `situational` | Valuable for particular assignments, environments, or interpretations of the role. |
| `requires_authorization` | Relevant, but controlled, expensive, military, hazardous, or otherwise subject to Warden approval. |
| `normally_ship_shared` | Usually drawn from a ship, facility, team locker, or mission pool rather than personally owned. |
| `normally_personal_purchase` | Commonly acquired and retained by the character rather than formally issued. |

## Suggested source vocabulary

- `career_gear`
- `specialty_gear`
- `employer_issued`
- `ship_issued`
- `personal_keepsake`
- `restricted_item`
- `debt_finance_item`

---

# Career recommendations

Career lists are broad professional baselines. They should emphasize ordinary working tools and leave the Specialty to provide the distinctive equipment.

## Marine

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `standard_battle_dress` | Standard Battle Dress | `commonly_issued` | employer_issued, career_gear | Baseline protection for dangerous operations. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | employer_issued, career_gear | Unit coordination in active operations. |
| `body_cam` | Body Cam | `commonly_issued` | employer_issued | Command feed, accountability, and incident record. |
| `heads_up_display` | Heads-Up Display | `recommended` | employer_issued, career_gear | Smart-link, tactical awareness, and shared feeds. |
| `flashlight` | Flashlight | `recommended` | career_gear | Basic low-light utility. |
| `first_aid_kit` | First Aid Kit | `recommended` | career_gear, employer_issued | Immediate stabilization until medical support arrives. |
| `pistol` | Pistol | `commonly_issued` | employer_issued, career_gear | Compact defensive sidearm. |
| `pulse_rifle` | Pulse Rifle | `requires_authorization` | employer_issued, restricted_item | Standard military longarm when the campaign supports armed deployment. |
| `frag_grenade` | Frag Grenade | `requires_authorization` | employer_issued, restricted_item | Mission-specific explosive capability. |
| `restraints` | Restraints | `situational` | employer_issued, career_gear | Detention, transport, and control tasks. |
| `emergency_beacon` | Emergency Beacon | `recommended` | career_gear, employer_issued | Recovery and location after separation or mission failure. |

## Scientist

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `field_recorder` | Field Recorder | `recommended` | career_gear, employer_issued | General-purpose sample, observation, and research documentation. |
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | career_gear, employer_issued | Field analysis, records, models, and technical interfaces. |
| `sample_case` | Sample Case | `recommended` | career_gear, employer_issued | Preserves specimens and evidence. |
| `bioscanner` | Bioscanner | `situational` | career_gear, employer_issued | Locates biological activity during fieldwork. |
| `atmospheric_analyzer` | Atmospheric Analyzer | `situational` | career_gear, employer_issued | Environmental assessment and expedition safety. |
| `survey_kit` | Survey Kit | `situational` | career_gear, employer_issued | Broad planetary and site assessment. |
| `hazard_suit` | Hazard Suit | `commonly_issued` | employer_issued, ship_issued | Protection during contaminated or alien-environment research. |
| `flashlight` | Flashlight | `recommended` | career_gear | Basic field utility. |
| `short_range_communications` | Short-Range Communications | `recommended` | career_gear, employer_issued | Team coordination during field or laboratory work. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued, career_gear | Preserves research history and incident evidence. |

## Teamster

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `assorted_tools` | Assorted Tools | `recommended` | career_gear, normally_personal_purchase | General repair and improvised maintenance. |
| `electronic_tool_set` | Electronic Tool Set | `recommended` | career_gear, employer_issued | Detailed electronics repair and construction. |
| `flashlight` | Flashlight | `recommended` | career_gear | Routine inspection and emergency work. |
| `crowbar` | Crowbar | `recommended` | career_gear, normally_personal_purchase | Prying, access, lifting, and improvised leverage. |
| `tether_kit` | Tether Kit | `recommended` | career_gear, ship_issued | Safe work in unstable, elevated, or zero-g environments. |
| `magnetic_boots` | Magnetic Boots | `situational` | ship_issued, career_gear | Ship exterior and zero-g work. |
| `emergency_sealant_kit` | Emergency Sealant Kit | `commonly_issued` | ship_issued, employer_issued | Immediate response to leaks and punctures. |
| `portable_power_cell` | Portable Power Cell | `situational` | ship_issued, employer_issued | Field power for tools and damaged systems. |
| `short_range_communications` | Short-Range Communications | `recommended` | ship_issued, career_gear | Crew coordination during maintenance and cargo operations. |
| `standard_crew_attire` | Standard Crew Attire | `commonly_issued` | career_gear, employer_issued | Ordinary working clothing and utility wear. |

## Medical

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `trauma_kit` | Trauma Kit | `recommended` | career_gear, employer_issued | Broad emergency treatment capability. |
| `medscanner` | Medscanner | `recommended` | career_gear, employer_issued | Rapid non-invasive diagnosis. |
| `first_aid_kit` | First Aid Kit | `recommended` | career_gear | Compact immediate-care backup. |
| `automed` | Automed | `commonly_issued` | employer_issued, career_gear | General treatment and recovery support. |
| `foldable_stretcher` | Foldable Stretcher | `situational` | employer_issued, ship_issued | Patient movement and casualty extraction. |
| `portable_iv_fluid_kit` | Portable IV / Fluid Kit | `situational` | employer_issued, career_gear | Stabilization and sustained care. |
| `short_range_communications` | Short-Range Communications | `recommended` | employer_issued, career_gear | Coordination with responders and treatment teams. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued | Treatment history and forensic continuity. |
| `portable_quarantine_hood` | Portable Quarantine Hood | `situational` | employer_issued, ship_issued | Immediate isolation during unknown exposure. |
| `hazard_suit` | Hazard Suit | `situational` | employer_issued, ship_issued | Treatment in contaminated environments. |

## Security

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `body_cam` | Body Cam | `commonly_issued` | employer_issued, career_gear | Evidence, command visibility, and accountability. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | employer_issued | Patrol and response coordination. |
| `restraints` | Restraints | `commonly_issued` | employer_issued, career_gear | Detention and controlled transport. |
| `stun_baton` | Stun Baton | `commonly_issued` | employer_issued, career_gear | Less-lethal control. |
| `flashlight` | Flashlight | `recommended` | career_gear | Inspection and low-light response. |
| `locator` | Locator | `commonly_issued` | employer_issued | Personnel tracking and dispatch. |
| `heads_up_display` | Heads-Up Display | `situational` | employer_issued | Shared feeds, alerts, and tactical overlays. |
| `standard_battle_dress` | Standard Battle Dress | `situational` | employer_issued | Armed response and high-risk assignments. |
| `pistol` | Pistol | `requires_authorization` | employer_issued, restricted_item | Armed security assignments. |
| `door_wedge_lock_bar_kit` | Door Wedge / Lock Bar Kit | `recommended` | career_gear, employer_issued | Access denial, room security, and emergency lockdown. |
| `motion_alarm` | Motion Alarm | `situational` | employer_issued, career_gear | Temporary perimeter and unattended-area monitoring. |

## Diplomat

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | career_gear, employer_issued | Briefings, agreements, records, and communications. |
| `long_range_communications` | Long-Range Communications | `commonly_issued` | employer_issued, career_gear | Contact with institutions, patrons, and command. |
| `short_range_communications` | Short-Range Communications | `recommended` | employer_issued, career_gear | Local delegation and staff coordination. |
| `body_cam` | Body Cam | `situational` | employer_issued | Official record, security, and accountability. |
| `locator` | Locator | `situational` | employer_issued | Protective tracking during travel and negotiations. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued, career_gear | Verifiable record of meetings and incidents. |
| `signal_scrambler_spoof_tag` | Signal Scrambler / Spoof Tag | `requires_authorization` | restricted_item, employer_issued | Secure or deniable movement in politically sensitive work. |
| `standard_crew_attire` | Standard Crew Attire | `recommended` | career_gear, normally_personal_purchase | Practical travel and shipboard clothing. |
| `medpack_drug_kit` | Medpack / Drug Kit | `situational` | career_gear, employer_issued | Sustaining long travel and crisis negotiations. |

---

# Specialty recommendations

Specialty lists add narrower, identity-defining choices. They intentionally overlap with Career lists where an item is especially central; the UI should deduplicate by `itemId` and combine reasons.

## Marine specialties

### Heavy Weapons

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `lmg_saw` | LMG / SAW | `commonly_issued` | employer_issued, specialty_gear | Standard suppression and lane-control weapon. |
| `minigun_rotary_weapon` | Minigun / Rotary Weapon | `requires_authorization` | restricted_item, employer_issued | Powered or braced sustained-fire platform. |
| `heavy_anti_armor_launcher` | Heavy Anti-Armor Launcher | `requires_authorization` | restricted_item, employer_issued | Squad anti-vehicle capability. |
| `disposable_anti_armor_launcher` | Disposable Anti-Armor Launcher | `requires_authorization` | employer_issued, restricted_item | Portable one-shot anti-armor response. |
| `heads_up_display` | Heads-Up Display | `recommended` | employer_issued, specialty_gear | Fire coordination and weapon telemetry. |
| `bipod` | Bipod | `recommended` | specialty_gear, employer_issued | Stable firing position for heavy weapons. |
| `portable_power_cell` | Portable Power Cell | `situational` | employer_issued, ship_issued | Supports powered weapons and field systems. |
| `advanced_battle_dress` | Advanced Battle Dress | `requires_authorization` | employer_issued, restricted_item | Carry assistance, protection, and heavy-weapon integration. |

### EVA Assault

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `armored_combat_eva` | Armored Combat EVA | `commonly_issued` | employer_issued, specialty_gear | Core protection and maneuver support for hostile EVA. |
| `magnetic_boots` | Magnetic Boots | `recommended` | specialty_gear, employer_issued | Controlled movement on hulls and metal structures. |
| `tether_kit` | Tether Kit | `recommended` | specialty_gear, employer_issued | Prevents separation and supports boarding movement. |
| `jetpack` | Jetpack | `situational` | employer_issued, restricted_item | Active maneuvering where suits lack integrated thrust. |
| `rigging_gun` | Rigging Gun | `recommended` | specialty_gear, employer_issued | Boarding, anchoring, and forced tethering. |
| `breaching_collar` | Breaching Collar | `requires_authorization` | employer_issued, restricted_item | Controlled hull or airlock entry. |
| `emergency_sealant_kit` | Emergency Sealant Kit | `recommended` | specialty_gear, employer_issued | Field response to suit and hull punctures. |
| `oxygen_tank` | Oxygen Tank | `commonly_issued` | employer_issued, ship_issued | Mission life support reserve. |

### Recon / Pathfinder

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `binoculars` | Binoculars | `recommended` | specialty_gear, employer_issued | Long-range observation and target identification. |
| `recon_drone` | Recon Drone | `recommended` | specialty_gear, employer_issued | Remote route and threat assessment. |
| `portable_lidar_mapper` | Portable LIDAR Mapper | `recommended` | specialty_gear, employer_issued | Interior mapping and route planning. |
| `motion_alarm` | Motion Alarm | `situational` | specialty_gear | Temporary security and rear warning. |
| `infrared_goggles` | Infrared Goggles | `recommended` | specialty_gear, employer_issued | Low-light and thermal observation. |
| `signal_relay_node` | Signal Relay Node | `situational` | employer_issued, ship_issued | Extends communications across difficult terrain. |
| `survey_kit` | Survey Kit | `situational` | specialty_gear | Environmental and terrain assessment. |
| `emergency_beacon` | Emergency Beacon | `recommended` | specialty_gear | Recovery if isolated from the unit. |

### Military Pilot

This specialty does not grant a vehicle. Recommendations are personal equipment used while operating or surviving around assigned craft.

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `heads_up_display` | Heads-Up Display | `commonly_issued` | employer_issued, specialty_gear | Flight telemetry and tactical overlays. |
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear, employer_issued | Mission plans, navigation data, and craft status. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `commonly_issued` | employer_issued | Flight record and recovery evidence. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | employer_issued | Ground and crew coordination. |
| `emergency_beacon` | Emergency Beacon | `recommended` | specialty_gear, employer_issued | Rescue following ejection or crash. |
| `oxygen_tank` | Oxygen Tank | `situational` | employer_issued, ship_issued | Emergency breathing reserve. |
| `eva_suit` | EVA Suit | `situational` | employer_issued, ship_issued | Survival around depressurized or space-capable craft. |
| `flare_gun` | Flare Gun | `situational` | specialty_gear | Visual signaling after forced landing. |

### Combat Medic

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `trauma_kit` | Trauma Kit | `commonly_issued` | employer_issued, specialty_gear | Primary battlefield treatment kit. |
| `medscanner` | Medscanner | `recommended` | specialty_gear, employer_issued | Rapid triage under pressure. |
| `stimpack` | StimPack | `requires_authorization` | employer_issued, restricted_item | Emergency performance and survival intervention. |
| `foldable_stretcher` | Foldable Stretcher | `situational` | employer_issued, ship_issued | Casualty movement. |
| `hardpoint_casevac_stretcher` | Hardpoint CASEVAC Stretcher | `requires_authorization` | employer_issued, ship_issued | Powered or vehicle-supported extraction. |
| `portable_iv_fluid_kit` | Portable IV / Fluid Kit | `recommended` | specialty_gear, employer_issued | Stabilization during delayed evacuation. |
| `standard_battle_dress` | Standard Battle Dress | `commonly_issued` | employer_issued | Protection while treating casualties under fire. |
| `smg` | SMG | `requires_authorization` | employer_issued, restricted_item | Compact defensive weapon that leaves room for medical equipment. |

### Combat Engineer

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `breaching_axe` | Breaching Axe | `recommended` | specialty_gear, employer_issued | Forced entry, obstacle removal, and utility cutting. |
| `breaching_collar` | Breaching Collar | `requires_authorization` | employer_issued, restricted_item | Controlled structural entry. |
| `explosives_and_detonator` | Explosives & Detonator | `requires_authorization` | employer_issued, restricted_item | General demolition work. |
| `demolition_charge` | Demolition Charge | `requires_authorization` | restricted_item, employer_issued | Heavy placed breaching and destruction. |
| `electronic_tool_set` | Electronic Tool Set | `recommended` | specialty_gear, employer_issued | Access, bypass, repair, and field modification. |
| `door_wedge_lock_bar_kit` | Door Wedge / Lock Bar Kit | `recommended` | specialty_gear | Rapid fortification and route control. |
| `cutting_torch` | Cutting Torch | `recommended` | specialty_gear, employer_issued | Cutting structural material and damaged access points. |
| `tactical_breaching_shield` | Tactical Breaching Shield | `situational` | employer_issued, restricted_item | Protected approach during forced entry. |

## Scientist specialties

Scientist Focus may add or reorder recommendations later. These parent lists cover the shared practice of each Specialty.

### Analyst

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Core data analysis and records access. |
| `signal_analyzer` | Signal Analyzer | `situational` | specialty_gear, employer_issued | Pattern and transmission analysis. |
| `data_tap_packet_sniffer` | Data Tap / Packet Sniffer | `situational` | employer_issued, restricted_item | Network and systems intelligence. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `recommended` | specialty_gear | Preserves source data and analytical history. |
| `field_recorder` | Field Recorder | `recommended` | specialty_gear | Captures observations and evidence. |
| `portable_command_slate` | Portable Command Slate | `situational` | employer_issued | Presents conclusions to operational teams. |

### Researcher

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `field_recorder` | Field Recorder | `recommended` | specialty_gear, employer_issued | Experiment and observation record. |
| `sample_case` | Sample Case | `recommended` | specialty_gear, employer_issued | Specimen and material preservation. |
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Models, literature, analysis, and research control. |
| `bioscanner` | Bioscanner | `situational` | specialty_gear | Biological research focus. |
| `cybernetic_diagnostic_scanner` | Cybernetic Diagnostic Scanner | `situational` | specialty_gear, employer_issued | Synthetic, robotics, or cybernetics focus. |
| `field_fabricator_parts_printer` | Field Fabricator / Parts Printer | `situational` | employer_issued, normally_ship_shared | Prototype and apparatus support. |
| `hazard_suit` | Hazard Suit | `situational` | employer_issued | Hazardous experiments and unknown specimens. |

### Field Technician

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `survey_kit` | Survey Kit | `recommended` | specialty_gear, employer_issued | Broad site and planetary assessment. |
| `portable_lidar_mapper` | Portable LIDAR Mapper | `recommended` | specialty_gear, employer_issued | Field mapping and spatial documentation. |
| `atmospheric_analyzer` | Atmospheric Analyzer | `recommended` | specialty_gear, employer_issued | Environmental safety and sample context. |
| `field_recorder` | Field Recorder | `recommended` | specialty_gear | On-site analysis and documentation. |
| `sample_case` | Sample Case | `recommended` | specialty_gear | Preserves collected material. |
| `recon_drone` | Recon Drone | `situational` | employer_issued, specialty_gear | Remote inspection and sample-site scouting. |
| `hazard_suit` | Hazard Suit | `commonly_issued` | employer_issued | Protection in uncontrolled environments. |
| `tether_kit` | Tether Kit | `situational` | specialty_gear | Safe access to difficult terrain and structures. |

### Applied Scientist

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Converts domain knowledge into immediate decisions. |
| `field_recorder` | Field Recorder | `recommended` | specialty_gear | Tests and documents practical solutions. |
| `electronic_tool_set` | Electronic Tool Set | `situational` | specialty_gear | Robotics, cybernetics, electronics, and instrumentation focuses. |
| `chemical_sniffer` | Chemical Sniffer | `situational` | specialty_gear | Chemistry, materials, or environmental focuses. |
| `atmospheric_analyzer` | Atmospheric Analyzer | `situational` | specialty_gear | Environmental and planetary focuses. |
| `bioscanner` | Bioscanner | `situational` | specialty_gear | Biological, ecological, and medical focuses. |
| `field_fabricator_parts_printer` | Field Fabricator / Parts Printer | `situational` | employer_issued, normally_ship_shared | Produces practical components and experimental fixes. |

## Teamster specialties

### Boatswain

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `assorted_tools` | Assorted Tools | `recommended` | specialty_gear | Routine shipboard maintenance. |
| `emergency_sealant_kit` | Emergency Sealant Kit | `commonly_issued` | ship_issued, specialty_gear | Immediate hull and compartment response. |
| `patch_plate_kit` | Patch Plate Kit | `commonly_issued` | ship_issued | Structural repair after puncture or damage. |
| `portable_air_pump_pressure_equalizer` | Portable Air Pump / Pressure Equalizer | `normally_ship_shared` | ship_issued | Compartment pressure and atmosphere recovery. |
| `tether_kit` | Tether Kit | `recommended` | specialty_gear, ship_issued | Safe exterior and zero-g work. |
| `magnetic_boots` | Magnetic Boots | `recommended` | ship_issued, specialty_gear | Hull and zero-g footing. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | ship_issued | Crew coordination through the vessel. |
| `eva_suit` | EVA Suit | `commonly_issued` | ship_issued | Exterior inspection and emergency decompression response. |

### Heavy Operator

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `exoloader` | ExoLoader | `normally_ship_shared` | employer_issued, ship_issued | Heavy cargo and machinery handling. |
| `cargo_net_load_restraint_kit` | Cargo Net / Load Restraint Kit | `recommended` | specialty_gear, employer_issued | Secures loads and stabilizes work sites. |
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear, employer_issued | Machine status, task plans, and safety checks. |
| `heads_up_display` | Heads-Up Display | `situational` | employer_issued | Equipment telemetry and hazard warning. |
| `climbing_harness` | Climbing Harness | `recommended` | specialty_gear | Safe work around elevated machinery. |
| `portable_winch_come_along` | Portable Winch / Come-Along | `recommended` | employer_issued, specialty_gear | Controlled movement and recovery of heavy loads. |
| `flashlight` | Flashlight | `recommended` | specialty_gear | Inspection and machine access. |

### Quartermaster

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Inventory, manifests, requisitions, and routing. |
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear, employer_issued | Mobile issue and logistics control. |
| `cargo_net_load_restraint_kit` | Cargo Net / Load Restraint Kit | `recommended` | employer_issued, ship_issued | Cargo security and movement. |
| `locator` | Locator | `situational` | employer_issued | Tracks personnel, containers, or issued equipment. |
| `signal_scrambler_spoof_tag` | Signal Scrambler / Spoof Tag | `requires_authorization` | restricted_item, employer_issued | Contraband, disputed cargo, or covert logistics. |
| `short_range_communications` | Short-Range Communications | `recommended` | employer_issued | Dock, cargo, and crew coordination. |
| `rucksack` | Rucksack | `recommended` | specialty_gear, normally_personal_purchase | Carries issued supplies and field inventory. |

### Foreman

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear, employer_issued | Work orders, staffing, safety, and progress tracking. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | employer_issued | Coordinates crews across an active site. |
| `body_cam` | Body Cam | `situational` | employer_issued | Incident record and worksite accountability. |
| `marker_tape` | Marker Tape | `recommended` | specialty_gear | Marks hazards, routes, tasks, and completed work. |
| `portable_floodlight` | Portable Floodlight | `situational` | employer_issued, normally_ship_shared | Keeps crews productive in damaged or dark sites. |
| `first_aid_kit` | First Aid Kit | `recommended` | career_gear | Basic worksite emergency response. |
| `motion_alarm` | Motion Alarm | `situational` | specialty_gear | Warns crews around restricted or dangerous zones. |

### Infrastructure Engineer

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `electronic_tool_set` | Electronic Tool Set | `recommended` | specialty_gear, employer_issued | Controls, power, diagnostics, and systems work. |
| `field_fabricator_parts_printer` | Field Fabricator / Parts Printer | `normally_ship_shared` | employer_issued, ship_issued | Produces replacement parts and structural components. |
| `portable_power_cell` | Portable Power Cell | `recommended` | employer_issued, specialty_gear | Temporary power and commissioning. |
| `portable_lidar_mapper` | Portable LIDAR Mapper | `situational` | specialty_gear | Surveying built environments and damage. |
| `cutting_torch` | Cutting Torch | `recommended` | specialty_gear, employer_issued | Structural alteration and repair. |
| `patch_plate_kit` | Patch Plate Kit | `recommended` | employer_issued | Rapid structural reinforcement. |
| `portable_air_pump_pressure_equalizer` | Portable Air Pump / Pressure Equalizer | `situational` | employer_issued, normally_ship_shared | Atmosphere and pressure infrastructure. |
| `survey_kit` | Survey Kit | `situational` | specialty_gear | Site assessment and construction planning. |

### Extraction Specialist

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `cutting_torch` | Cutting Torch | `recommended` | specialty_gear, employer_issued | Cuts salvage, ore, and damaged structure. |
| `industrial_saw_rescue_saw` | Industrial Saw / Rescue Saw | `recommended` | specialty_gear, employer_issued | Rapid material removal and casualty access. |
| `portable_winch_come_along` | Portable Winch / Come-Along | `recommended` | specialty_gear, employer_issued | Controlled extraction of heavy objects. |
| `salvage_drone` | Salvage Drone | `recommended` | employer_issued, specialty_gear | Remote recovery and inspection. |
| `rigging_gun` | Rigging Gun | `recommended` | specialty_gear | Anchoring, hauling, and securing salvage. |
| `sample_case` | Sample Case | `situational` | specialty_gear | Preserves valuable or hazardous recovered material. |
| `seismic_thumper_ground_sonar` | Seismic Thumper / Ground Sonar | `situational` | employer_issued, specialty_gear | Locates voids, deposits, and buried structures. |
| `eva_suit` | EVA Suit | `situational` | ship_issued, employer_issued | Derelict and exterior recovery. |

## Medical specialties

### Trauma Surgeon

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `trauma_kit` | Trauma Kit | `recommended` | specialty_gear, employer_issued | Severe injury treatment. |
| `medscanner` | Medscanner | `recommended` | specialty_gear, employer_issued | Rapid injury localization and operative planning. |
| `portable_iv_fluid_kit` | Portable IV / Fluid Kit | `recommended` | specialty_gear, employer_issued | Stabilizes shock and blood loss. |
| `medpack_drug_kit` | Medpack / Drug Kit | `recommended` | specialty_gear, employer_issued | Anesthesia, antibiotics, analgesia, and surgical drugs. |
| `foldable_stretcher` | Foldable Stretcher | `situational` | ship_issued, employer_issued | Patient transport to treatment. |
| `automed` | Automed | `commonly_issued` | employer_issued | Supports recovery and post-operative care. |
| `scalpel` | Scalpel | `recommended` | specialty_gear | Precision surgical instrument. |

### General Physician

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `medscanner` | Medscanner | `recommended` | specialty_gear, employer_issued | Broad diagnostic work. |
| `first_aid_kit` | First Aid Kit | `recommended` | specialty_gear | Routine injury treatment. |
| `medpack_drug_kit` | Medpack / Drug Kit | `recommended` | specialty_gear, employer_issued | General pharmaceutical support. |
| `automed` | Automed | `commonly_issued` | employer_issued | Disease, poison, healing, and recovery support. |
| `portable_iv_fluid_kit` | Portable IV / Fluid Kit | `situational` | specialty_gear | Sustained and emergency care. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued | Longitudinal patient and incident record. |
| `water_filter` | Water Filter | `situational` | specialty_gear, ship_issued | Public health and survival support. |

### Behavioral Health Specialist

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Records, assessment tools, and treatment plans. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued | Event reconstruction and behavioral review. |
| `field_recorder` | Field Recorder | `situational` | specialty_gear | Interviews, observations, and environmental context. |
| `pain_pills` | Pain Pills | `requires_authorization` | employer_issued, restricted_item | Crisis medication with addiction and impairment risks. |
| `automed` | Automed | `situational` | employer_issued | Recovery and Fear-support medication. |
| `short_range_communications` | Short-Range Communications | `recommended` | employer_issued | Crisis-team and patient coordination. |
| `locator` | Locator | `situational` | employer_issued | Locates patients at risk of wandering or self-endangerment. |

### Hazardous Exposure Specialist

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `hazard_suit` | Hazard Suit | `commonly_issued` | employer_issued, specialty_gear | Core contaminated-environment protection. |
| `decontamination_kit` | Decontamination Kit | `recommended` | specialty_gear, employer_issued | Removes or contains hazardous exposure. |
| `geiger_counter` | Geiger Counter | `recommended` | specialty_gear | Radiation detection. |
| `chemical_sniffer` | Chemical Sniffer | `recommended` | specialty_gear | Toxin and chemical detection. |
| `atmospheric_analyzer` | Atmospheric Analyzer | `recommended` | specialty_gear | Air-quality and environmental assessment. |
| `radiation_dosimeter_patch` | Radiation Dosimeter Patch | `commonly_issued` | employer_issued | Tracks accumulated exposure. |
| `radiation_pills` | Radiation Pills | `situational` | employer_issued, restricted_item | Exposure mitigation where medically appropriate. |
| `portable_quarantine_hood` | Portable Quarantine Hood | `recommended` | specialty_gear, employer_issued | Immediate patient or specimen isolation. |

### Medical Investigator

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `medscanner` | Medscanner | `recommended` | specialty_gear, employer_issued | Forensic and diagnostic examination. |
| `evidence_collection_kit` | Evidence Collection Kit | `recommended` | specialty_gear, employer_issued | Preserves medical and biological evidence. |
| `sample_case` | Sample Case | `recommended` | specialty_gear | Maintains specimen chain of custody. |
| `field_recorder` | Field Recorder | `recommended` | specialty_gear | Documents scenes, bodies, and environmental context. |
| `bioscanner` | Bioscanner | `situational` | specialty_gear | Locates hidden or residual biological activity. |
| `chemical_sniffer` | Chemical Sniffer | `situational` | specialty_gear | Poison, contamination, and exposure investigations. |
| `quarantine_bag_body_bag` | Quarantine Bag / Body Bag | `situational` | employer_issued, ship_issued | Safe recovery and transport of remains or contaminated subjects. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `recommended` | employer_issued | Preserves investigative continuity. |

## Security specialties

### Facility & Station Security

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear, employer_issued | Access logs, patrols, alarms, and lockdown controls. |
| `motion_alarm` | Motion Alarm | `recommended` | specialty_gear, employer_issued | Temporary perimeter and restricted-zone monitoring. |
| `door_wedge_lock_bar_kit` | Door Wedge / Lock Bar Kit | `recommended` | specialty_gear | Rapid lockdown and access denial. |
| `lockpick_suite` | Lockpick Suite | `situational` | employer_issued, specialty_gear | Authorized bypass and emergency access. |
| `heads_up_display` | Heads-Up Display | `situational` | employer_issued | Camera, alert, and patrol overlays. |
| `tactical_breaching_shield` | Tactical Breaching Shield | `requires_authorization` | employer_issued, restricted_item | Protected response to barricaded threats. |
| `foam_gun` | Foam Gun | `situational` | employer_issued | Access denial, restraint, and fire suppression. |

### Asset Security

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `standard_battle_dress` | Standard Battle Dress | `commonly_issued` | employer_issued | Protection while escorting exposed people or cargo. |
| `body_cam` | Body Cam | `commonly_issued` | employer_issued | Continuous protective record. |
| `locator` | Locator | `recommended` | employer_issued | Tracks principal, team, or protected item. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | employer_issued | Close-protection coordination. |
| `stun_baton` | Stun Baton | `recommended` | employer_issued, specialty_gear | Less-lethal intervention. |
| `pistol` | Pistol | `requires_authorization` | employer_issued, restricted_item | Compact armed protection. |
| `tactical_breaching_shield` | Tactical Breaching Shield | `situational` | employer_issued | Mobile cover during extraction. |
| `emergency_beacon` | Emergency Beacon | `recommended` | specialty_gear | Recovery after route compromise. |

### Crisis Liaison

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear, employer_issued | Shared incident picture and task coordination. |
| `long_range_communications` | Long-Range Communications | `recommended` | employer_issued | Connects command, institutions, and responders. |
| `short_range_communications` | Short-Range Communications | `commonly_issued` | employer_issued | On-scene responder coordination. |
| `body_cam` | Body Cam | `situational` | employer_issued | Incident documentation and command visibility. |
| `portable_floodlight` | Portable Floodlight | `situational` | ship_issued, employer_issued | Establishes an emergency command or treatment area. |
| `first_aid_kit` | First Aid Kit | `recommended` | specialty_gear | Immediate aid before medical teams arrive. |
| `signal_relay_node` | Signal Relay Node | `situational` | employer_issued | Maintains communications through damaged facilities. |

### Investigator

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `evidence_collection_kit` | Evidence Collection Kit | `recommended` | specialty_gear, employer_issued | Scene processing and chain of custody. |
| `body_cam` | Body Cam | `recommended` | employer_issued | Interview and scene record. |
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Timelines, records, and case analysis. |
| `field_recorder` | Field Recorder | `recommended` | specialty_gear | Environmental and physical evidence capture. |
| `acoustic_sensor_contact_mic` | Acoustic Sensor / Contact Mic | `situational` | specialty_gear, restricted_item | Covert listening and structural sound analysis. |
| `data_tap_packet_sniffer` | Data Tap / Packet Sniffer | `requires_authorization` | employer_issued, restricted_item | Digital evidence and unauthorized-network investigation. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `recommended` | employer_issued | Preserves case continuity. |

### Customs Inspector

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Manifests, credentials, permits, and routing. |
| `chemical_sniffer` | Chemical Sniffer | `recommended` | employer_issued, specialty_gear | Detects chemical contraband and hazardous cargo. |
| `bioscanner` | Bioscanner | `situational` | employer_issued | Detects concealed organisms or passengers. |
| `cybernetic_diagnostic_scanner` | Cybernetic Diagnostic Scanner | `situational` | employer_issued | Verifies synthetic identity and concealed modifications. |
| `evidence_collection_kit` | Evidence Collection Kit | `recommended` | specialty_gear | Seizes and documents contraband. |
| `locator` | Locator | `recommended` | employer_issued | Tracks inspected personnel or released cargo. |
| `restraints` | Restraints | `commonly_issued` | employer_issued | Detention during inspection incidents. |
| `hazard_suit` | Hazard Suit | `situational` | employer_issued | Quarantine and hazardous-cargo inspection. |

### Counterintelligence

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `signal_analyzer` | Signal Analyzer | `recommended` | specialty_gear, employer_issued | Finds suspicious transmissions and patterns. |
| `data_tap_packet_sniffer` | Data Tap / Packet Sniffer | `requires_authorization` | employer_issued, restricted_item | Detects leakage, intrusion, and covert traffic. |
| `signal_scrambler_spoof_tag` | Signal Scrambler / Spoof Tag | `requires_authorization` | restricted_item, employer_issued | Tests or defeats tracking and identity systems. |
| `radio_jammer` | Radio Jammer | `requires_authorization` | employer_issued, restricted_item | Communications denial during active operations. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `recommended` | employer_issued | Preserves sensitive investigative history. |
| `body_cam` | Body Cam | `situational` | employer_issued | Controlled evidence and oversight. |
| `lockpick_suite` | Lockpick Suite | `requires_authorization` | employer_issued, restricted_item | Covert or emergency access. |
| `pistol` | Pistol | `situational` | employer_issued, restricted_item | Defensive capability during hostile investigations. |

## Diplomat specialties

### Ambassador / Envoy

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `long_range_communications` | Long-Range Communications | `commonly_issued` | employer_issued | Contact with the represented institution. |
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Credentials, agreements, briefs, and official record. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued | Verifiable diplomatic record. |
| `locator` | Locator | `situational` | employer_issued | Protective tracking during travel. |
| `body_cam` | Body Cam | `situational` | employer_issued | Formal record in volatile negotiations. |
| `emergency_beacon` | Emergency Beacon | `recommended` | specialty_gear | Recovery during remote travel. |
| `medpack_drug_kit` | Medpack / Drug Kit | `situational` | employer_issued | Sustains delegation during prolonged travel or crisis. |

### Conflict Resolution Specialist

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `short_range_communications` | Short-Range Communications | `recommended` | specialty_gear, employer_issued | Coordinates separate parties and response teams. |
| `portable_command_slate` | Portable Command Slate | `recommended` | specialty_gear | Tracks commitments, timelines, and active concerns. |
| `body_cam` | Body Cam | `situational` | employer_issued | Transparent record where trust is low. |
| `first_aid_kit` | First Aid Kit | `recommended` | specialty_gear | Immediate support during volatile incidents. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued | Preserves agreements and disputed interactions. |
| `foam_gun` | Foam Gun | `requires_authorization` | employer_issued | Nonlethal control option for violent escalation. |

### Broker

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, normally_personal_purchase | Contacts, market data, contracts, and transaction records. |
| `long_range_communications` | Long-Range Communications | `recommended` | specialty_gear, normally_personal_purchase | Maintains a wide network of buyers, sellers, and patrons. |
| `signal_scrambler_spoof_tag` | Signal Scrambler / Spoof Tag | `requires_authorization` | restricted_item, normally_personal_purchase | Conceals sensitive meetings or cargo links. |
| `locator` | Locator | `situational` | specialty_gear | Tracks couriers, cargo, or arranged exchanges. |
| `rucksack` | Rucksack | `recommended` | normally_personal_purchase | Samples, documents, and portable trade goods. |
| `pistol` | Pistol | `situational` | normally_personal_purchase, restricted_item | Personal protection in informal markets. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | normally_personal_purchase | Insurance against disputed arrangements. |

### Administrator

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Policy, records, approvals, and resource allocation. |
| `portable_command_slate` | Portable Command Slate | `recommended` | employer_issued | Mobile operational oversight. |
| `long_range_communications` | Long-Range Communications | `recommended` | employer_issued | Coordinates departments and distant authorities. |
| `locator` | Locator | `situational` | employer_issued | Personnel and asset accountability. |
| `body_cam` | Body Cam | `situational` | employer_issued | Inspections and incident oversight. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `situational` | employer_issued | Auditable decision and incident record. |
| `signal_relay_node` | Signal Relay Node | `situational` | employer_issued, normally_ship_shared | Supports temporary administration during outages. |

### Legal Representative

| Item ID | Item | Disposition | Suggested sources | Reason |
|---|---|---|---|---|
| `portable_computer_terminal` | Portable Computer Terminal | `recommended` | specialty_gear, employer_issued | Statutes, contracts, filings, claims, and evidence. |
| `personal_blackbox_recorder` | Personal Blackbox Recorder | `recommended` | employer_issued, specialty_gear | Preserves statements, agreements, and custody events. |
| `body_cam` | Body Cam | `situational` | employer_issued | Formal record during inspections or disputes. |
| `long_range_communications` | Long-Range Communications | `recommended` | employer_issued | Access to courts, institutions, clients, and authorities. |
| `evidence_collection_kit` | Evidence Collection Kit | `situational` | specialty_gear | Handles disputed property and evidentiary material. |
| `locator` | Locator | `situational` | employer_issued | Tracks protected clients or contested assets. |
| `lockpick_suite` | Lockpick Suite | `requires_authorization` | employer_issued, restricted_item | Authorized access during seizure, salvage, or custody disputes. |

---

# Deduplication and ordering rule

For a selected Career and Specialty:

1. Combine both recommendation arrays by `itemId`.
2. Preserve every recommendation origin and reason.
3. Use the strongest disposition in this order:
   - `requires_authorization`
   - `commonly_issued`
   - `normally_ship_shared`
   - `recommended`
   - `normally_personal_purchase`
   - `situational`
4. Union all suggested sources without duplicates.
5. Display Specialty recommendations before Career-only recommendations, while retaining a visible “Recommended by” label.
6. Do not add recommendations to inventory automatically.

Example merged presentation:

```text
Medscanner
Recommended by:
- Career: Medical
- Specialty: Trauma Surgeon

Suggested sources:
- Career Gear
- Specialty Gear
- Employer Issued
```

# Implementation note

The first runtime version should use explicit item IDs rather than generating recommendations entirely from tags. Catalog tags may later provide supplemental suggestions, but explicit lists keep the initial curation intentional and auditable.


# Weapon Slot Matrix

| Weapon              |        Ammo        | Optic | Underbarrel | Barrel | Stock | Starting occupancy                                                   |
| ------------------- | :----------------: | :---: | :---------: | :----: | :---: | -------------------------------------------------------------------- |
| Pistol              |          ✓         |   ✓   |      ✓      |    ✓   |   —   | None                                                                 |
| Revolver            |          ✓         |   —   |      ✓      |    —   |   —   | None                                                                 |
| Machine Pistol      |          ✓         |   —   |      ✓      |    ✓   |   ✓   | None                                                                 |
| Nail Gun            |          ✓         |   —   |      —      |    —   |   —   | None                                                                 |
| Combat Shotgun      |          ✓         |   —   |      ✓      |    ✓   |   —   | None                                                                 |
| Pulse Rifle         |          ✓         |   ✓   |      ✓      |    ✓   |   ✓   | Underbarrel occupied by G-Launcher when issued in that configuration |
| Sniper Rifle        |          ✓         |   ✓   |      ✓      |    —   |   —   | Underbarrel occupied by Bipod                                        |
| SMG                 |          ✓         |   —   |      ✓      |    ✓   |   ✓   | None                                                                 |
| LMG / SAW           |          ✓         |   —   |      ✓      |    —   |   —   | Underbarrel occupied by Bipod                                        |
| Smart Rifle         |          ✓         |   ✓   |      —      |    —   |   —   | Smart-Link and spectroscope integrated                               |
| Rigging Gun         |          ✓         |   —   |      —      |    —   |   —   | Tether/harpoon system is intrinsic                                   |
| Tranquilizer Pistol |          ✓         |   —   |      —      |    —   |   —   | Uses tranquilizer darts only                                         |
| Flare Gun           | flare payload only |   —   |      —      |    —   |   —   | Intrinsic signal-launcher configuration                              |
| Foam Gun            | foam canister only |   —   |      —      |    —   |   —   | Intrinsic projector system                                           |

# Attachment Specific Restrictions 

| Attachment        | Required slot | Additional compatibility                                                                                |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| G-Launcher        | Underbarrel   | Normally longarm or substantial two-handed weapon; must fire compatible grenades                        |
| Tac-Light         | Underbarrel   | Any weapon with the slot                                                                                |
| Grip              | Underbarrel   | Any weapon with the slot; mainly useful for Burst, Full Auto, movement, or heavy recoil                 |
| Bipod             | Underbarrel   | Weapon must support meaningful braced, precision, long-range, or heavy fire                             |
| Suppressor        | Barrel        | Compatible ballistic firearm; reduced effectiveness with heavy, supersonic, or high-pressure ammunition |
| Muzzle Brake      | Barrel        | Projectile weapon with meaningful recoil                                                                |
| Stabilizer        | Barrel        | Projectile weapon with recoil, sustained-fire, or range-edge penalties                                  |
| Choke             | Barrel        | **Shotgun only**                                                                                        |
| Ship-Safe Barrel  | Barrel        | Projectile firearm; may forbid AP and cap penetration                                                   |
| Subsonic Kit      | Barrel        | Compatible conventional projectile weapon; works best with Subsonic ammunition                          |
| Collapsible Stock | Stock         | Any weapon with Stock                                                                                   |
| Extended Stock    | Stock         | Any weapon with Stock                                                                                   |
| Standard Stock    | Stock         | Any weapon with Stock                                                                                   |

