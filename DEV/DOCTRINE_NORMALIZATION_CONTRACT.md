# Doctrine Normalization Contract

## Core Rule

Doctrine pairings are a derived reference layer.

A character does not purchase doctrines during creation. A doctrine becomes available when the character has the required skills and, where relevant, the required equipment or context.

Doctrine benefits do not stack flat skill bonuses. Use the highest relevant skill bonus.

## Requirement Grammar

```js
requirements: {
  allSkillIds: [],
  anySkillIds: [],
  anySkillBranchIds: [],
  allEquipmentTagIds: [],
  anyEquipmentTagIds: [],
  contextTagIds: []
}
```

### Field meanings

- `allSkillIds`: every listed skill is required.
- `anySkillIds`: at least one listed skill is required.
- `anySkillBranchIds`: at least one known skill from a listed branch is required.
- `allEquipmentTagIds`: every listed equipment tag is required.
- `anyEquipmentTagIds`: at least one listed equipment tag is required.
- `contextTagIds`: the doctrine only applies in the named situation; context is not a character-build requirement.

## Derived States

- `available`: all skill requirements are met.
- `equipment_ready`: skill requirements and current equipment requirements are met.
- `available_with_gear`: skills are met, but required equipment is not currently present.
- `near_match`: the character is missing one skill and may view the doctrine as a build suggestion.
- `unavailable`: multiple requirements are missing.
- `pinned`: display preference only; does not change mechanics.

## Non-Skill Requirement Normalization

| Source wording | Normalized requirement |
|---|---|
| Survey + Tools | `allSkillIds: ["survey"]`; `anyEquipmentTagIds: ["survey_kit", "bioscanner", "geiger_counter", "field_recorder", "survey_drone"]` |
| Zero-G + Tether Kit | `allSkillIds: ["zero_g"]`; `allEquipmentTagIds: ["tether_kit"]` |
| Field Medicine + Tether Kit | `allSkillIds: ["field_medicine"]`; `allEquipmentTagIds: ["tether_kit"]` |
| Diagnostics + Medscanner | `allSkillIds: ["diagnostics"]`; `allEquipmentTagIds: ["medscanner"]` |
| Security Procedures + Lockpick Suite | `allSkillIds: ["security_procedures"]`; `allEquipmentTagIds: ["lockpick_suite"]` |
| Restraints + Hand-to-Hand Combat | `allSkillIds: ["hand_to_hand_combat"]`; `allEquipmentTagIds: ["restraints"]` |

## Alternative Requirement Normalization

| Source wording | Normalized requirement |
|---|---|
| Firearms + Survey or Electronics | `allSkillIds: ["firearms"]`; `anySkillIds: ["survey", "electronics"]` |
| Gunnery + Survey or Electronics | `allSkillIds: ["gunnery"]`; `anySkillIds: ["survey", "electronics"]` |
| Psychology + Hacking or Computers | `allSkillIds: ["psychology"]`; `anySkillIds: ["hacking", "computers"]` |
| Mysticism + Physics or Science | `allSkillIds: ["mysticism"]`; `anySkillIds: ["physics"]`; `anySkillBranchIds: ["science"]` |
| Pathology + Forensics | Normalize to `allSkillIds: ["pathology", "security_procedures"]` |

### Pathology + Forensics decision

`Forensics` is not a canonical skill. `Security Procedures` is the closest existing skill for scene discipline, evidence handling, logs, authorization, chain of custody, and recognizing when a scene has been manipulated.

Canonical doctrine:

```text
Pathology + Security Procedures
→ Cause of Death
```

## Canonical Pair Ordering

Skill-pair identity is order-independent.

```text
Firearms + Ship Systems
=
Ship Systems + Firearms
```

Store pair keys alphabetically by canonical skill ID:

```js
pairKey: ["firearms", "ship_systems"].sort().join("+")
```

## Duplicate Pair Consolidation

Where two catalog entries use the same pair and substantially the same professional context, use one canonical doctrine.

| Pair | Canonical doctrine | Merge or retire |
|---|---|---|
| Firearms + Ship Systems | Shipboard Fire Discipline | Merge `Shipboard Combat Safety` |
| Mechanical Repair + Powered Platform Training | Field Platform Maintenance | Merge `Suit Field Repair` |
| Industrial Equipment + Asteroid Mining | Extraction Operations | Merge `Mining Operations` |
| Hacking + Security Procedures | Security Bypass Doctrine | Merge `Systemic Intrusion` |
| Psychology + Field Medicine | Crisis Stabilization | Merge `Shock Counseling` |
| Biology + Pathology | Living Damage Analysis | Merge `Disease Anatomy` |
| Biology + Xenomedicine | Alien Physiology | Keep one entry |
| Chemistry + Explosives | Energetic Materials | Merge `Explosive Materials Handling` |
| Physics + Engineering | Applied Systems Physics | Merge `Applied Physical Systems` |
| Mathematics + Astrogation | Precision Course Plotting | Merge `Navigation Math` |
| Piloting + Gunnery | Mobile Fire Control | Merge `Pilot-Gunner Coordination` |
| Gunnery + Powered Platform Training | Integrated Hardpoint Control | Merge `Walker Gunner` |
| Industrial Equipment + Engineering | Industrial Systems Design | Merge `Worksite Design` |
| Engineering + Explosives | Precision Breaching | Merge `Structural Demolition` |
| Piloting + Zero-G | Docking and Freefall Control | Merge `Microgravity Maneuvering` |
| Survival + Geology | Terrain Hazard Reading | Merge `Hazard Ground Reading` |
| Survival + Zoology | Creature Fieldcraft | Merge `Predator Avoidance` |
| Command + Tactics | Combat Command | Merge `Battle Leadership` |
| Psychology + Tactics | Behavioral Prediction | Merge `Enemy Intent Read` |
| Computers + Mathematics | Computational Modeling | Merge `Data Analysis` |
| Linguistics + Archaeology | Dead Language Recovery | Merge `Ruin Interpretation` |
| Rimwise + Scavenging | Black-Market Salvage | Merge `Useful Trash Economy` |

## Same Pair, Distinct Benefits

Multiple doctrines from one pair should be avoided by default. Keep separate entries only when the action contexts are materially different and cannot be expressed as one broader benefit.

The first normalization pass should prefer one doctrine per pair.

## Doctrine Definition Shape

```js
{
  id: "shipboard_fire_discipline",
  label: "Shipboard Fire Discipline",
  category: "combat",
  pairKey: "firearms+ship_systems",

  requirements: {
    allSkillIds: ["firearms", "ship_systems"],
    anySkillIds: [],
    anySkillBranchIds: [],
    allEquipmentTagIds: [],
    anyEquipmentTagIds: [],
    contextTagIds: ["shipboard", "station"]
  },

  benefitType: "reduce_complication",
  benefit:
    "Reduce one collateral damage, ricochet, overpenetration, or pressure-system complication when firing aboard a ship or station.",

  tags: ["combat", "shipboard", "firearms", "damage_control"]
}
```

## Tool-Supported Doctrine Example

```js
{
  id: "tethered_casevac",
  label: "Tethered CASEVAC",
  category: "medical",
  pairKey: null,

  requirements: {
    allSkillIds: ["field_medicine"],
    anySkillIds: [],
    anySkillBranchIds: [],
    allEquipmentTagIds: ["tether_kit"],
    anyEquipmentTagIds: [],
    contextTagIds: ["zero_g", "vertical", "unstable_terrain"]
  }
}
```

## Broad-Branch Doctrine Example

```js
{
  id: "anomalous_pattern_recognition",
  label: "Anomalous Pattern Recognition",
  category: "social_culture_investigation",

  requirements: {
    allSkillIds: ["mysticism"],
    anySkillIds: ["physics"],
    anySkillBranchIds: ["science"],
    allEquipmentTagIds: [],
    anyEquipmentTagIds: [],
    contextTagIds: ["anomaly", "ritual", "impossible_event"]
  }
}
```

## Builder Presentation

Doctrines do not need a required creation step.

After skill selection, display:

1. `Available Doctrines` — all requirements met.
2. `Available With Gear` — skill requirements met, equipment missing.
3. `Related Pairings` — near matches missing exactly one skill.
4. `Pinned Doctrines` — optional display preference.

A doctrine being pinned does not add or change mechanics.

## Agent Overlay

Agent profiles do not grant doctrine pairings directly. Any Agent-relevant doctrine is derived from the character's public and hidden skills in the same way as every other doctrine.
