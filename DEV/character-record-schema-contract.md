Recommended next milestone: Character Builder Foundation Pack

I would make the next package contain five concrete files.

1. character-record-schema.js

Define the canonical character record and defaults.

This should lock:

identity
Origin / Background / Career / Specialty
Stats and Saves
skills and doctrines
Health
Wound capacity
Wound records
ailments
Calm and Resolve
armor
inventory
weapons and loadout cards
cybermods
debts
faction Notice
hidden Warden data

This is the most important next file because every renderer, import, export, print layout, and player tracker will depend on it.

2. character-builder-options.js

Create normalized registries for:

Human and Android Origins
current Backgrounds
current Careers
Agent as advanced Career
placeholder/manual Specialty support
creation modes: Quick Build and Campaign Build

Do not wait for every Specialty to be authored. Support:

Choose defined Specialty
or
Create Custom Specialty

That keeps the project moving without pretending the Specialty library is finished.

3. character-build-rules.js

Put all derived values and validation in one place.

Examples:

maximum Wounds from Strength
remaining Wounds
cyberware slots from Strength
slickware slots from Intellect
career Stat and Save adjustments
duplicate skill redirection
skill prerequisite validation
derived doctrines
Faction Notice posture
overclock level
Calm maximum modifiers

This file should return facts only. No HTML and no state mutation, matching the existing resolver architecture. The console already keeps calculations in modules and presentation in renderers, so the builders should follow the same dependency discipline.

4. character-record-validator.js

Validate records before export.

At minimum:

stable required IDs
numeric ranges
valid skill ranks
no duplicate installed-mod IDs
current Health within maximum
current Wounds within capacity
valid linked Wound and ailment references
valid equipment definition references
public and hidden layers remain correctly separated
schema version exists

This is where we prevent malformed builder exports from later poisoning the player tracker.

5. character-record-example.json

Build one complete test character by hand.

I would deliberately make it complicated enough to exercise the model:

Human
Military background
Marine career
Breacher specialty
armor with Trauma Dampening
primary and secondary weapon
one existing Wound
one short-term ailment
one faction Notice entry
one debt-funded cybermod
one hidden corporate clause

If that record feels natural rather than forced, the contract is sound.

Resolve the few remaining decisions during that pass

You do not need another broad research phase. You need to lock only the questions that directly affect schema behavior.

Career adjustments

Decide whether the old class modifiers are:

exact starting Career rules

or:

balance references used to author new Career packages

The builder contract currently treats them as calibration references, which is probably the better long-term choice.

Starting Calm

Lock the default starting and maximum Calm rule for newly generated characters.

The current Calm resolver already treats current and maximum Calm as separate state and supports maximum changes, so the builder only needs to provide the initial values cleanly.

Specialty minimum viable format

Lock a simple first format:

{
  id,
  label,
  expertSkillChoice,
  edge,
  limit,
  suggestedLoadoutId,
  doctrineIds,
  tags
}

That is enough for v1.

Wound storage language

The builder should use:

health.current
health.maximum
woundCapacity.currentWounds
woundCapacity.maximumWounds
wounds[]

The current runtime still uses internal names such as healthPerWound and woundsRemaining for Quick Entities. That is fine, but the permanent character record should use the cleaner terminology and rely on an adapter when creating session entities. The current Quick Entity model explicitly remains temporary and session-scoped.

Then build the smallest possible UI slice

Once those five files exist, implement only this vertical slice:

Build workspace
→ Character Builder
→ Identity
→ Origin
→ Career
→ Stats / Saves
→ Skills
→ Review JSON
→ Download JSON

Do not begin with print rendering, cybermods, faction ledgers, and weapon-card layout all at once.

The goal of the first slice is to prove:

UI selections
→ valid canonical character record
→ export
→ re-import
→ same record

After that works, add sections in this order:

Health, Wounds, Calm, Resolve, and Ailments.
Armor, tools, weapons, and loadout cards.
Background and Specialty.
Cybermods, body debt, and Faction Notice.
Printable packet renderer.
Character-to-Quick-Entity adapter.
Player tracker import.
Ship Builder can follow the same pattern

The Ship Builder is still a strong candidate for the first visually impressive builder because buildShipProfile() already combines class, role, and overrides.

But I would first make the shared builder/export foundation character-capable. Then the ship record can use the same:

schema envelope
validation style
import/export utilities
workspace navigation
review screen
print pipeline
One documentation correction to make now

The current README and older architecture still describe the console as not being a full character-sheet manager and focus on temporary session state. That was correct for the Resolution Console, but the broader product has now expanded into a Builder Suite.

Do not overwrite that boundary. Clarify it:

Resolution workspace
→ temporary session state

Build workspace
→ permanent exportable records

That small documentation update will prevent future contributors from “fixing” the builder out of the project because they only read the older console boundary.



- **Build the Character Builder Foundation Pack: canonical schema, normalized options, derived rules, validator, and one complete example record.**

That turns this from a well-designed concept into something safe to code against.
# Proposed broad Career descriptions

These are strong enough to begin building around:
- Marine
  People trained to organize, endure, and carry out dangerous operations under hostile conditions.

| Specialty          | Primary niche                           | Secondary overlap                          |
| ------------------ | --------------------------------------- | ------------------------------------------ |
| Heavy Weapons      | suppression and force projection        | Teamster equipment handling                |
| EVA Assault        | boarding and hostile-environment combat | Teamster EVA operations                    |
| Recon / Pathfinder | information and positioning             | Scientist fieldwork, Security surveillance |
| Military Pilot     | hostile vehicle and craft operation     | Teamster Pilot                             |
| Combat Medic       | immediate stabilization                 | Medical treatment                          |
| Combat Engineer    | tactical access and field construction  | Teamster engineering                       |


- Scientist
  - People who investigate, interpret, test, and apply specialized knowledge about the universe and its systems.

| Specialty             | Core lane                                                                       | Typical play expression                                                                                                          | Suggested focuses                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Analyst**           | Interprets incomplete data, patterns, systems, and evidence                     | Turns uncertain information into useful conclusions, identifies relationships, reduces ambiguity, supports decisions             | Signals, systems, networks, behavior, statistics, threat modeling, anomaly analysis, intelligence                                                   |
| **Researcher**        | Creates, tests, and advances new knowledge                                      | Designs experiments, develops theories, uncovers hidden properties, and produces deeper understanding over time                  | Robotics, cybernetics, synthetic cognition, xenobiology, medicine, materials, artifacts, physics, astrophysics                                      |
| **Field Technician**  | Conducts scientific work in uncontrolled or hazardous environments              | Operates instruments, collects samples, preserves evidence, performs rapid field assessment, and maintains scientific equipment  | Planetary survey, environmental sampling, remote sensing, specimen recovery, archaeological fieldwork, contamination monitoring, expedition science |
| **Applied Scientist** | Uses an established scientific discipline to solve immediate practical problems | Adapts known science to current conditions, produces recommendations, improves procedures, and reduces technical or medical risk | Chemistry, genetics, ecology, materials science, physics, microbiology, environmental science, planetary science, robotics, cybernetics             |


- Teamster
  - People who operate, repair, move, and sustain the machinery civilization depends on.

| Specialty               | Core lane                                |
| ----------------------- | ---------------------------------------- |
| Boatswain               | shipboard maintenance and operations     |
| Heavy Operator          | vehicles and industrial machinery        |
| Quartermaster           | supply, cargo, and logistics             |
| Foreman                 | labor leadership and work coordination   |
| Infrastructure Engineer | construction and large-scale systems     |
| Extraction Specialist   | mining, salvage, and industrial recovery |


- Medical
  - People who preserve, restore, and manage biological or psychological function.

| Specialty                     | Core lane                                             |
| ----------------------------- | ----------------------------------------------------- |
| Trauma Surgeon                | severe injury and emergency care                      |
| General Physician             | broad treatment and long-term care                    |
| Behavioral Health Specialist  | Calm, trauma, and psychological recovery              |
| Hazardous Exposure Specialist | radiation, toxin, infection, and environmental injury |
| Medical Investigator          | diagnosis, pathology, and medical evidence            |

- Security
  - People who control access, investigate threats, protect assets, and maintain order.

| Specialty                       | Core lane                                                             | Typical play expression                                                                                                                                 | Secondary overlap                                         |
| ------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Facility & Station Security** | Securing built environments and understanding their operating systems | Manages access control, patrol routes, lockdowns, alarms, evacuation paths, station traffic, and security infrastructure                                | Teamster systems knowledge, Diplomat administration       |
| **Asset Security**              | Protecting a person, small group, sensitive object, or mobile asset   | Plans routes, identifies exposure, establishes safe rooms, assesses threats, and maintains close protection during movement                             | Marine protective operations, Diplomat protocol           |
| **Crisis Liaison**              | Coordinating and de-escalating active incidents                       | Bridges civilians, responders, command staff, medical teams, and security forces during hostage events, disasters, unrest, or containment failures      | Diplomat mediation, Medical emergency response            |
| **Investigator**                | Reconstructing incidents and identifying responsible parties          | Conducts interviews, reviews evidence, builds timelines, tracks motives, and investigates theft, fraud, violence, disappearance, or internal misconduct | Scientist analysis, Medical forensics, Agent intelligence |
| **Customs Inspector**           | Controlling entry, cargo, manifests, and restricted movement          | Detects contraband, verifies credentials, inspects cargo, enforces quarantine and port rules, and identifies suspicious routing                         | Diplomat law and trade, Teamster logistics                |
| **Counterintelligence**         | Detecting infiltration, information leakage, and hostile influence    | Identifies insiders, compromised personnel, false identities, surveillance, sabotage, and hostile intelligence operations                               | Agent operations, Investigator work                       |

- Diplomat
  - People who manage relationships, institutions, access, and negotiated outcomes.

| Specialty                          | Core lane                                                            | Typical play expression                                                                                                                           | Secondary overlap                                 |
| ---------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Ambassador / Envoy**             | Formal representation between factions, institutions, or communities | Establishes official contact, negotiates access, delivers demands, preserves legitimacy, and speaks with recognized authority                     | Administrator, Conflict Resolution                |
| **Conflict Resolution Specialist** | Managing disputes, tensions, and negotiated settlements              | Mediates grievances, de-escalates faction conflict, supports ceasefires, resolves labor disputes, and preserves damaged relationships             | Security Crisis Liaison, Agent negotiation        |
| **Broker**                         | Building transactional relationships and arranging access            | Connects buyers, sellers, specialists, and patrons; arranges favors, procurement, introductions, trade, and informal agreements                   | Teamster Quartermaster, Agent Acquisitions        |
| **Administrator**                  | Managing institutions, policy, procedure, and resource allocation    | Coordinates departments, interprets bureaucracy, manages permits, implements policy, and turns political decisions into operating systems         | Teamster Foreman, Security facility operations    |
| **Legal Representative**           | Advocacy, contracts, liability, jurisdiction, and ownership          | Interprets agreements, contests claims, handles custody and salvage disputes, negotiates corporate obligations, and manages formal legal exposure | Broker, Administrator, Security Customs Inspector |

- Agent
  - People who pursue hidden objectives through access, deception, intelligence, and asymmetric leverage.

| Agent profile               | Core lane                                                 | Typical covert expression                                                                                                                        | Common cover compatibility              |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| **Wet Work Specialist**     | Deniable targeted violence                                | Assassination, elimination, cleanup, evidence minimization, constrained combat, and removal of protected targets                                 | Marine, Security, Medical               |
| **Acquisitions Specialist** | Obtaining restricted people, objects, data, or technology | Theft, retrieval, kidnapping, covert procurement, sample recovery, data extraction, sabotage through removal                                     | Teamster, Scientist, Security, Diplomat |
| **Handler**                 | Recruiting, directing, and controlling assets             | Manages informants and field agents, passes instructions, protects compartmentalization, maintains cover stories, and controls intelligence flow | Diplomat, Security, Scientist           |
| **Deep Cover**              | Long-term infiltration beneath a credible public identity | Maintains false identity, embeds inside institutions, survives scrutiny, earns trust, and operates through a real cover Career                   | Any standard Career                     |
| **Double Agent / Sleeper**  | Conflicted, dormant, or concealed allegiance              | Serves competing interests, carries conditioned directives, activates under a trigger, defects, or becomes compromised                           | Any standard Career                     |

Public Career + Public Specialty
→ visible identity and genuine professional competence

Hidden Agent Overlay
→ secret allegiance, objective, covert abilities, and reveal state

## Scientist 
Career: Scientist
Specialty: Analyst / Researcher / Field Technician / Applied Scientist
Focus: player-selected field
Display: Specialty — Focus

Analyst — Signals
Researcher — Robotics
Field Technician — Planetary Survey
Applied Scientist — Genetics

The parent Specialty owns:

mechanical feature
Edge
Limit
core doctrine skew
broad skill emphasis

The Focus owns:

fictional field of expertise
suggested skills
suggested equipment
likely doctrine applications
display identity

# Stat Allocation based on Background, Career, and Specialties

Baseline:
4d10 in every Stat

Background:
Choose 2 different eligible Stats
Add 1d10 to each

Career:
Allocate 3d10 among 3 eligible Stats
Maximum 2 Career dice in one Stat

Specialty:
Allocate 2d10 among eligible Stats
Both may be placed in the same Stat

Generation pool cap:
8d10 per Stat

Generated score cap:
60

| Background                  | Eligible Stats           |
| --------------------------- | ------------------------ |
| Military Service            | Body, Speed, Combat      |
| Science Education           | Intellect, Speed, Body   |
| Medical Training            | Intellect, Speed, Body   |
| Teamster / Industrial Labor | Body, Speed, Intellect   |
| Ship Crew                   | Speed, Intellect, Body   |
| Corporate Security          | Combat, Speed, Intellect |
| Frontier / Colony           | Body, Speed, Intellect   |
| Rimwise / Underworld        | Speed, Intellect, Combat |
| Academic / Cultural         | Intellect, Speed, Body   |


| Android Background           | Eligible Stats           |
| ---------------------------- | ------------------------ |
| Corporate Service Android    | Intellect, Speed, Body   |
| Scientific Assistant Android | Intellect, Speed, Body   |
| Industrial Service Android   | Body, Speed, Intellect   |
| Security Android             | Combat, Speed, Body      |
| Shipboard Android            | Speed, Intellect, Body   |
| Free / Unassigned Android    | Speed, Intellect, Combat |


| Career        | Eligible Stats           | Reasoning                                                                                                                             |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Marine**    | Body, Speed, Combat      | Physical conditioning, action under fire, and direct combat competence                                                                |
| **Scientist** | Intellect, Speed, Body   | Analysis is central, Speed supports field response and technical work under pressure, Body supports hazardous fieldwork and endurance |
| **Teamster**  | Body, Speed, Intellect   | Physical labor, machinery operation, engineering judgment, logistics, and repair                                                      |
| **Medical**   | Intellect, Speed, Body   | Diagnosis and knowledge, rapid response, sustained physical work during treatment or extraction                                       |
| **Security**  | Combat, Speed, Intellect | Enforcement, reaction, investigation, surveillance, threat assessment, and access control                                             |
| **Diplomat**  | Intellect, Speed, Body   | Negotiation and institutional knowledge, fast social response, endurance, presence, and functioning through prolonged crises          |


| Specialty              | Eligible Stats   | Design intent                                                                 |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------- |
| **Heavy Weapons**      | Body, Combat     | Weapon handling, recoil control, ammunition management, and effective fire    |
| **EVA Assault**        | Body, Speed      | Physical endurance and precise movement in vacuum or zero gravity             |
| **Recon / Pathfinder** | Speed, Intellect | Infiltration, navigation, observation, and rapid route assessment             |
| **Military Pilot**     | Speed, Intellect | Fast vehicle control, spatial awareness, navigation, and systems judgment     |
| **Combat Medic**       | Speed, Intellect | Rapid treatment, triage decisions, and casualty stabilization under fire      |
| **Combat Engineer**    | Body, Intellect  | Breaching, demolition, fortification, obstacle removal, and field engineering |

| Specialty             | Eligible Stats   | Design intent                                                                    |
| --------------------- | ---------------- | -------------------------------------------------------------------------------- |
| **Analyst**           | Intellect, Speed | Rapidly interpreting incomplete information and identifying useful patterns      |
| **Researcher**        | Intellect, Body  | Deep investigation, sustained experimentation, and demanding laboratory work     |
| **Field Technician**  | Speed, Body      | Operating instruments, collecting samples, and working in hazardous environments |
| **Applied Scientist** | Intellect, Speed | Converting established knowledge into immediate practical solutions              |

| Specialty                   | Eligible Stats   | Design intent                                                                  |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| **Boatswain**               | Body, Intellect  | Shipboard maintenance, damage control, technical judgment, and crew operations |
| **Heavy Operator**          | Speed, Body      | Controlling ships, vehicles, cranes, industrial platforms, and heavy machinery |
| **Quartermaster**           | Intellect, Speed | Logistics, procurement, cargo handling, manifests, and supply decisions        |
| **Foreman**                 | Intellect, Body  | Organizing labor, enforcing safe procedure, and sustaining work crews          |
| **Infrastructure Engineer** | Intellect, Body  | Constructing and maintaining large structural and environmental systems        |
| **Extraction Specialist**   | Body, Speed      | Mining, salvage cutting, rigging, excavation, and industrial recovery          |

| Specialty                         | Eligible Stats   | Design intent                                                                               |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| **Trauma Surgeon**                | Intellect, Speed | Fast clinical judgment and precise emergency intervention                                   |
| **General Physician**             | Intellect, Body  | Broad diagnosis, long-term care, occupational health, and sustained medical work            |
| **Behavioral Health Specialist**  | Intellect, Speed | Reading patients, recognizing crises, and responding before conditions escalate             |
| **Hazardous Exposure Specialist** | Intellect, Body  | Contamination medicine, radiation, toxins, decompression, quarantine, and protective work   |
| **Medical Investigator**          | Intellect, Speed | Differential diagnosis, forensic examination, outbreak tracing, and evidence interpretation |

| Specialty                       | Eligible Stats    | Design intent                                                                |
| ------------------------------- | ----------------- | ---------------------------------------------------------------------------- |
| **Facility & Station Security** | Intellect, Speed  | Surveillance, access control, lockdowns, patrol planning, and rapid response |
| **Asset Security**              | Combat, Speed     | Protective movement, threat response, safe routes, and close protection      |
| **Crisis Liaison**              | Intellect, Speed  | Rapid communication, de-escalation, and coordination during active incidents |
| **Investigator**                | Intellect, Speed  | Interviews, evidence review, timelines, surveillance, and pursuit            |
| **Customs Inspector**           | Intellect, Speed  | Screening, manifests, contraband detection, credentials, and traffic control |
| **Counterintelligence**         | Intellect, Combat | Detecting infiltration while remaining capable of confronting hostile agents |

| Specialty                          | Eligible Stats   | Design intent                                                                        |
| ---------------------------------- | ---------------- | ------------------------------------------------------------------------------------ |
| **Ambassador / Envoy**             | Intellect, Body  | Formal representation, institutional knowledge, authority, and sustained presence    |
| **Conflict Resolution Specialist** | Intellect, Speed | Rapidly reading tensions, reframing disputes, and intervening before escalation      |
| **Broker**                         | Intellect, Speed | Negotiating deals, recognizing opportunity, arranging access, and responding quickly |
| **Administrator**                  | Intellect, Body  | Policy, bureaucracy, institutional endurance, and managing large organizations       |
| **Legal Representative**           | Intellect, Body  | Argument, jurisdiction, contracts, sustained advocacy, and formal pressure           |


# Save allocation based on background career and specialties

Baseline:
5d10 in Body, Fear, and Sanity

Background:
Choose 1 eligible Save
Add 1d10

Career:
Add 1d10 to each of the Career’s 2 listed Saves

Specialty:
Add 1d10 to 1 eligible Save

Generation pool cap:
8d10 per Save

Generated score cap:
60

Skills:
Do not normally apply to Saves

| Android Background           | Eligible Saves |
| ---------------------------- | -------------- |
| Corporate Service Android    | Sanity or Fear |
| Scientific Assistant Android | Sanity or Fear |
| Industrial Service Android   | Body or Fear   |
| Security Android             | Body or Fear   |
| Shipboard Android            | Fear or Body   |
| Free / Unassigned Android    | Fear or Sanity |


| Background                  | Eligible Saves |
| --------------------------- | -------------- |
| Military Service            | Body or Fear   |
| Science Education           | Sanity or Fear |
| Medical Training            | Sanity or Body |
| Teamster / Industrial Labor | Body or Fear   |
| Ship Crew                   | Fear or Body   |
| Corporate Security          | Fear or Body   |
| Frontier / Colony           | Body or Fear   |
| Rimwise / Underworld        | Fear or Sanity |
| Academic / Cultural         | Sanity or Fear |


| Career        | Eligible Saves | Reason                                                                                                 |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| **Marine**    | Body, Fear     | Physical punishment and action despite danger                                                          |
| **Scientist** | Sanity, Fear   | Processing impossible information and functioning around dangerous discoveries                         |
| **Teamster**  | Body, Fear     | Industrial endurance, accidents, hazardous work, and crisis response                                   |
| **Medical**   | Sanity, Body   | Exposure to trauma, prolonged work, contamination, and casualty handling                               |
| **Security**  | Fear, Body     | Threat response, violence, restraint, and operational endurance                                        |
| **Diplomat**  | Fear, Sanity   | Remaining functional under threat, manipulation, institutional pressure, and destabilizing revelations |

| Specialty              | Eligible Saves | Design intent                                                                             |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------- |
| **Heavy Weapons**      | Body or Fear   | Enduring weapon strain and continuing to operate under intense threat                     |
| **EVA Assault**        | Body or Fear   | Surviving hostile environments and acting despite vacuum-related danger                   |
| **Recon / Pathfinder** | Fear or Sanity | Operating alone, processing danger, and remaining functional after disturbing discoveries |
| **Military Pilot**     | Fear or Sanity | Maintaining control through catastrophic speed, system failure, and sensory overload      |
| **Combat Medic**       | Sanity or Body | Processing severe trauma while physically sustaining treatment and evacuation             |
| **Combat Engineer**    | Body or Fear   | Working near explosives, unstable structures, hostile systems, and active fire            |

| Specialty             | Eligible Saves | Design intent                                                                             |
| --------------------- | -------------- | ----------------------------------------------------------------------------------------- |
| **Analyst**           | Sanity or Fear | Processing impossible conclusions and remaining functional as patterns become threatening |
| **Researcher**        | Sanity or Body | Enduring prolonged experimentation, cognitive strain, and hazardous research conditions   |
| **Field Technician**  | Body or Fear   | Physical exposure, isolation, environmental danger, and field emergencies                 |
| **Applied Scientist** | Sanity or Fear | Making consequential decisions with incomplete information during a crisis                |

| Specialty                   | Eligible Saves | Design intent                                                                                       |
| --------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| **Boatswain**               | Body or Fear   | Damage control, dangerous machinery, structural failure, and crew emergencies                       |
| **Heavy Operator**          | Fear or Body   | High-speed operation, industrial accidents, vehicle failure, and crushing hazards                   |
| **Quartermaster**           | Sanity or Fear | Resource crises, impossible shortages, liability, and responsibility for survival-critical supplies |
| **Foreman**                 | Body or Fear   | Workplace hazards, exhausted crews, accidents, and responsibility during industrial disasters       |
| **Infrastructure Engineer** | Sanity or Body | System-scale failure, collapse, contamination, and prolonged emergency work                         |
| **Extraction Specialist**   | Body or Fear   | Mining collapse, decompression, dangerous tools, unstable salvage, and confined spaces              |

| Specialty                         | Eligible Saves | Design intent                                                                                |
| --------------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| **Trauma Surgeon**                | Sanity or Body | Processing catastrophic injury while maintaining physical precision                          |
| **General Physician**             | Sanity or Body | Sustained exposure to illness, suffering, exhaustion, and difficult treatment decisions      |
| **Behavioral Health Specialist**  | Sanity or Fear | Remaining grounded while absorbing trauma, panic, delusion, and emotional instability        |
| **Hazardous Exposure Specialist** | Body or Sanity | Resisting contamination while understanding the full implications of exposure                |
| **Medical Investigator**          | Sanity or Fear | Examining disturbing evidence and confronting the meaning behind unusual deaths or outbreaks |

| Specialty                       | Eligible Saves | Design intent                                                                            |
| ------------------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| **Facility & Station Security** | Fear or Body   | Responding to violence, disasters, lockdowns, riots, and structural emergencies          |
| **Asset Security**              | Fear or Body   | Remaining operational while directly exposed to threats aimed at someone else            |
| **Crisis Liaison**              | Fear or Sanity | Absorbing panic, threats, contradictory demands, and emotionally destabilizing incidents |
| **Investigator**                | Sanity or Fear | Confronting violence, motive, deception, and disturbing evidence                         |
| **Customs Inspector**           | Fear or Sanity | Standing against intimidation, corruption, coercion, and concealed threats               |
| **Counterintelligence**         | Sanity or Fear | Withstanding paranoia, betrayal, manipulation, surveillance, and identity uncertainty    |

| Specialty                          | Eligible Saves | Design intent                                                                                          |
| ---------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| **Ambassador / Envoy**             | Fear or Sanity | Remaining composed under threats, manipulation, political danger, and destabilizing revelations        |
| **Conflict Resolution Specialist** | Fear or Sanity | Entering volatile disputes without becoming overwhelmed or psychologically compromised                 |
| **Broker**                         | Fear or Sanity | Handling coercion, betrayal, criminal pressure, and dangerous transactional relationships              |
| **Administrator**                  | Sanity or Body | Sustaining function through institutional collapse, resource crises, and prolonged responsibility      |
| **Legal Representative**           | Sanity or Fear | Resisting intimidation, cognitive pressure, hostile argument, and exposure to institutional wrongdoing |


## Consolidated Stats and Saves Speciality Table
| Career    | Specialty                      | Eligible Stats    | Eligible Saves |
| --------- | ------------------------------ | ----------------- | -------------- |
| Marine    | Heavy Weapons                  | Body, Combat      | Body, Fear     |
| Marine    | EVA Assault                    | Body, Speed       | Body, Fear     |
| Marine    | Recon / Pathfinder             | Speed, Intellect  | Fear, Sanity   |
| Marine    | Military Pilot                 | Speed, Intellect  | Fear, Sanity   |
| Marine    | Combat Medic                   | Speed, Intellect  | Sanity, Body   |
| Marine    | Combat Engineer                | Body, Intellect   | Body, Fear     |
| Scientist | Analyst                        | Intellect, Speed  | Sanity, Fear   |
| Scientist | Researcher                     | Intellect, Body   | Sanity, Body   |
| Scientist | Field Technician               | Speed, Body       | Body, Fear     |
| Scientist | Applied Scientist              | Intellect, Speed  | Sanity, Fear   |
| Teamster  | Boatswain                      | Body, Intellect   | Body, Fear     |
| Teamster  | Heavy Operator                 | Speed, Body       | Fear, Body     |
| Teamster  | Quartermaster                  | Intellect, Speed  | Sanity, Fear   |
| Teamster  | Foreman                        | Intellect, Body   | Body, Fear     |
| Teamster  | Infrastructure Engineer        | Intellect, Body   | Sanity, Body   |
| Teamster  | Extraction Specialist          | Body, Speed       | Body, Fear     |
| Medical   | Trauma Surgeon                 | Intellect, Speed  | Sanity, Body   |
| Medical   | General Physician              | Intellect, Body   | Sanity, Body   |
| Medical   | Behavioral Health Specialist   | Intellect, Speed  | Sanity, Fear   |
| Medical   | Hazardous Exposure Specialist  | Intellect, Body   | Body, Sanity   |
| Medical   | Medical Investigator           | Intellect, Speed  | Sanity, Fear   |
| Security  | Facility & Station Security    | Intellect, Speed  | Fear, Body     |
| Security  | Asset Security                 | Combat, Speed     | Fear, Body     |
| Security  | Crisis Liaison                 | Intellect, Speed  | Fear, Sanity   |
| Security  | Investigator                   | Intellect, Speed  | Sanity, Fear   |
| Security  | Customs Inspector              | Intellect, Speed  | Fear, Sanity   |
| Security  | Counterintelligence            | Intellect, Combat | Sanity, Fear   |
| Diplomat  | Ambassador / Envoy             | Intellect, Body   | Fear, Sanity   |
| Diplomat  | Conflict Resolution Specialist | Intellect, Speed  | Fear, Sanity   |
| Diplomat  | Broker                         | Intellect, Speed  | Fear, Sanity   |
| Diplomat  | Administrator                  | Intellect, Body   | Sanity, Body   |
| Diplomat  | Legal Representative           | Intellect, Body   | Sanity, Fear   |

# Skills allocated based on career backround and specialties 

## Backgrounds 
| Background                      | Core skills                                                                                                  | Additional choice                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Military Service**            | Military Training +10; Firearms +10                                                                          | Choose 1: Athletics +10, Military Conditioning +10, Zero-G +10, Less-Lethal / Riot Suppression +10, Stealth +10, Field Medicine +10, Mechanical Repair +10, Tactics +15, or Ship Systems +15 |
| **Science Education**           | Choose 2: Biology, Chemistry, Physics, Geology, Botany, Zoology, Mathematics, Survey, or Computers — all +10 | Choose 1: Genetics, Ecology, Asteroid Mining, Hydroponics, Planetary Survey, Medical Research, Pathology, Robotics, or Xenomedicine — all +15                                                |
| **Medical Training**            | Field Medicine +10; Diagnostics +10                                                                          | Choose 1: Psychology, Surgery, Pathology, Pharmacology, Epidemiology, Xenomedicine, or Medical Research +15; or Zero-G +10                                                                   |
| **Teamster / Industrial Labor** | Industrial Equipment +10; Athletics +10                                                                      | Choose 1: Mechanical Repair +10, Jury Rigging +10, Piloting +10, Scavenging +10, Zero-G +10, Survival +10, Asteroid Mining +15, or Ship Systems +15                                          |
| **Ship Crew**                   | Ship Systems +15; Zero-G +10                                                                                 | Choose 1: Piloting +10, Astrogation +10, Mechanical Repair +10, Electronics +10, Computers +10, Communications +10, Field Medicine +10, or Military Training +10                             |
| **Corporate Security**          | Less-Lethal / Riot Suppression +10; Security Procedures +10                                                  | Choose 1: Firearms +10, Hand-to-Hand Combat +10, Stealth +10, Field Medicine +10, Psychology +15, Tactics +15, or Hacking +15                                                                |
| **Frontier / Colony**           | Survival +10; Jury Rigging +10                                                                               | Choose 1: Survey +10, Field Medicine +10, Mechanical Repair +10, Botany +10, Geology +10, Scavenging +10, Piloting +10, Rimwise +10, or Planetary Survey +15                                 |
| **Rimwise / Underworld**        | Rimwise +10; Scavenging +10                                                                                  | Choose 1: Stealth +10, Firearms +10, Hand-to-Hand Combat +10, Jury Rigging +10, Piloting +10, Security Procedures +10, Psychology +15, or Hacking +15                                        |
| **Academic / Cultural**         | Choose 2: Linguistics, Theology, Archaeology, Art, Mathematics, Computers, or Communications — all +10       | Choose 1: Psychology, Mysticism, Sophontology, or Xenoesotericism — all +15                                                                                                                  |


| Android Background               | Core skills                                               | Additional choice                                                                                                                                   |
| -------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Corporate Service Android**    | Computers +10; Security Procedures +10                    | Choose 1: Electronics +10, Psychology +15, Hacking +15, Medical Research +15, or Command +15                                                        |
| **Scientific Assistant Android** | Computers +10; Survey +10                                 | Choose 1: Biology +10, Chemistry +10, Physics +10, Genetics +15, Pathology +15, Robotics +15, or Medical Research +15                               |
| **Industrial Service Android**   | Industrial Equipment +10; Mechanical Repair +10           | Choose 1: Electronics +10, Jury Rigging +10, Engineering +10, Ship Systems +15, Asteroid Mining +15, Powered Platform Training +15, or Robotics +15 |
| **Security Android**             | Military Training +10; Less-Lethal / Riot Suppression +10 | Choose 1: Firearms +10, Hand-to-Hand Combat +10, Military Conditioning +10, Stealth +10, Security Procedures +10, Tactics +15, or Heavy Weapons +15 |
| **Shipboard Android**            | Ship Systems +15; Computers +10                           | Choose 1: Zero-G +10, Electronics +10, Mechanical Repair +10, Astrogation +10, Piloting +10, Communications +10, or Robotics +15                    |
| **Free / Unassigned Android**    | Rimwise +10; Scavenging +10                               | Choose 1: Stealth +10, Jury Rigging +10, Computers +10, Mechanical Repair +10, Security Procedures +10, Psychology +15, or Hacking +15              |

## Careers
- Marine
| Requirement          | Options                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Core**             | Military Training +10                                                                                                            |
| **Choose 1 Trained** | Firearms, Athletics, Military Conditioning, Hand-to-Hand Combat, Less-Lethal / Riot Suppression, Stealth, Zero-G, Field Medicine |
| **Choose 1 Expert**  | Tactics, Specialized Weapons, Heavy Weapons, Explosives, Gunnery, Powered Platform Training                                      |

- Scientist 
  | Requirement          | Options                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| **Core**             | Choose Survey +10 or Computers +10                                                                    |
| **Choose 1 Trained** | Biology, Chemistry, Physics, Geology, Botany, Zoology, Mathematics, Archaeology                       |
| **Choose 1 Expert**  | Genetics, Ecology, Hydroponics, Planetary Survey, Robotics, Medical Research, Pathology, Xenomedicine |

- Teamster
| Requirement          | Options                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Core**             | Industrial Equipment +10                                                                                     |
| **Choose 1 Trained** | Mechanical Repair, Electronics, Engineering, Jury Rigging, Athletics, Piloting, Zero-G, Scavenging, Survival |
| **Choose 1 Expert**  | Ship Systems, Asteroid Mining, Robotics, Powered Platform Training, Gunnery, Command                         |

- Medical
| Requirement          | Options                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **Core**             | Field Medicine +10                                                                         |
| **Choose 1 Trained** | Diagnostics, Biology, Chemistry, Zero-G, Communications                                    |
| **Choose 1 Expert**  | Surgery, Pathology, Pharmacology, Epidemiology, Xenomedicine, Medical Research, Psychology |

- Security 
| Requirement          | Options                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Core**             | Security Procedures +10                                                                                           |
| **Choose 1 Trained** | Firearms, Hand-to-Hand Combat, Less-Lethal / Riot Suppression, Stealth, Communications, Computers, Field Medicine |
| **Choose 1 Expert**  | Tactics, Psychology, Hacking, Command, Specialized Weapons                                                        |

- Diplomat 
| Requirement          | Options                                                                          |
| -------------------- | -------------------------------------------------------------------------------- |
| **Core**             | Communications +10                                                               |
| **Choose 1 Trained** | Linguistics, Rimwise, Theology, Art, Security Procedures, Computers, Archaeology |
| **Choose 1 Expert**  | Psychology, Command, Mysticism, Sophontology, Xenoesotericism                    |

## Specialty

- Marine
| Specialty              | Defining skill     | Choose 1 support skill                                                                                                |
| ---------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Heavy Weapons**      | Heavy Weapons +15  | Firearms +10, Athletics +10, Military Conditioning +10, Tactics +15, Specialized Weapons +15, or Gunnery +15          |
| **EVA Assault**        | Zero-G +10         | Athletics +10, Military Conditioning +10, Firearms +10, Stealth +10, Ship Systems +15, or Tactics +15                 |
| **Recon / Pathfinder** | Stealth +10        | Survey +10, Survival +10, Communications +10, Military Training +10, Tactics +15, or Planetary Survey +15             |
| **Military Pilot**     | Piloting +10       | Astrogation +10, Zero-G +10, Communications +10, Gunnery +15, Ship Systems +15, or Tactics +15                        |
| **Combat Medic**       | Field Medicine +10 | Diagnostics +10, Zero-G +10, Military Training +10, Psychology +15, Pharmacology +15, or Surgery +15                  |
| **Combat Engineer**    | Explosives +15     | Engineering +10, Mechanical Repair +10, Electronics +10, Jury Rigging +10, Military Training +10, or Ship Systems +15 |

- Scientist
| Specialty             | Defining skill                 | Choose 1 support skill                                                                                               |
| --------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Analyst**           | Mathematics +10                | Computers +10, Communications +10, Survey +10, Psychology +15, Hacking +15, or Sophontology +15                      |
| **Researcher**        | Choose 1 canonical Focus skill | Computers +10, Mathematics +10, Survey +10, Medical Research +15, Robotics +15, or a second relevant Focus skill     |
| **Field Technician**  | Survey +10                     | Survival +10, Electronics +10, Computers +10, Zero-G +10, Field Medicine +10, or Planetary Survey +15                |
| **Applied Scientist** | Choose 1 canonical Focus skill | Engineering +10, Computers +10, Diagnostics +10, Jury Rigging +10, Survey +10, Medical Research +15, or Robotics +15 |

- Focus Rule
| Focus example    | Canonical skill                     |
| ---------------- | ----------------------------------- |
| Genetics         | Genetics +15                        |
| Robotics         | Robotics +15                        |
| Chemistry        | Chemistry +10                       |
| Signals          | Communications +10 or Computers +10 |
| Planetary Survey | Planetary Survey +15                |
| Pathology        | Pathology +15                       |
| Cybernetics      | Cybernetics +15                     |
| Ecology          | Ecology +15                         |

- Teamster
| Specialty                   | Defining skill                                  | Choose 1 support skill                                                                                                 |
| --------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Boatswain**               | Ship Systems +15                                | Mechanical Repair +10, Electronics +10, Zero-G +10, Communications +10, Engineering +10, or Command +15                |
| **Heavy Operator**          | Choose Industrial Equipment +10 or Piloting +10 | Athletics +10, Mechanical Repair +10, Zero-G +10, Gunnery +15, Powered Platform Training +15, or Asteroid Mining +15   |
| **Quartermaster**           | Choose Computers +10 or Communications +10      | Mathematics +10, Rimwise +10, Security Procedures +10, Scavenging +10, Command +15, or Hacking +15                     |
| **Foreman**                 | Command +15                                     | Industrial Equipment +10, Athletics +10, Military Conditioning +10, Communications +10, Psychology +15, or Tactics +15 |
| **Infrastructure Engineer** | Engineering +10                                 | Mechanical Repair +10, Electronics +10, Survey +10, Ship Systems +15, Robotics +15, or Planetary Survey +15            |
| **Extraction Specialist**   | Asteroid Mining +15                             | Industrial Equipment +10, Geology +10, Zero-G +10, Scavenging +10, Explosives +15, or Powered Platform Training +15    |

- Medical
| Specialty                         | Defining skill   | Choose 1 support skill                                                                                                      |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Trauma Surgeon**                | Surgery +15      | Field Medicine +10, Diagnostics +10, Zero-G +10, Pharmacology +15, Psychology +15, or Medical Research +15                  |
| **General Physician**             | Diagnostics +10  | Field Medicine +10, Biology +10, Chemistry +10, Psychology +15, Pharmacology +15, Epidemiology +15, or Medical Research +15 |
| **Behavioral Health Specialist**  | Psychology +15   | Diagnostics +10, Communications +10, Linguistics +10, Theology +10, Command +15, or Pharmacology +15                        |
| **Hazardous Exposure Specialist** | Epidemiology +15 | Diagnostics +10, Field Medicine +10, Biology +10, Chemistry +10, Pharmacology +15, Ship Systems +15, or Xenomedicine +15    |
| **Medical Investigator**          | Pathology +15    | Diagnostics +10, Biology +10, Psychology +15, Epidemiology +15, Medical Research +15, or Xenomedicine +15                   |

- Security
| Specialty                       | Defining skill          | Choose 1 support skill                                                                                                                |
| ------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Facility & Station Security** | Security Procedures +10 | Communications +10, Computers +10, Electronics +10, Less-Lethal / Riot Suppression +10, Hacking +15, Ship Systems +15, or Command +15 |
| **Asset Security**              | Military Training +10   | Firearms +10, Athletics +10, Stealth +10, Field Medicine +10, Psychology +15, Tactics +15, or Specialized Weapons +15                 |
| **Crisis Liaison**              | Communications +10      | Security Procedures +10, Field Medicine +10, Less-Lethal / Riot Suppression +10, Psychology +15, Command +15, or Tactics +15          |
| **Investigator**                | Psychology +15          | Security Procedures +10, Computers +10, Linguistics +10, Hacking +15, Pathology +15, or Sophontology +15                              |
| **Customs Inspector**           | Security Procedures +10 | Communications +10, Rimwise +10, Computers +10, Linguistics +10, Psychology +15, or Hacking +15                                       |
| **Counterintelligence**         | Psychology +15          | Security Procedures +10, Communications +10, Stealth +10, Linguistics +10, Rimwise +10, Hacking +15, or Tactics +15                   |

- Diplomat 
| Specialty                          | Defining skill          | Choose 1 support skill                                                                                              |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Ambassador / Envoy**             | Communications +10      | Linguistics +10, Theology +10, Art +10, Security Procedures +10, Psychology +15, Command +15, or Sophontology +15   |
| **Conflict Resolution Specialist** | Psychology +15          | Communications +10, Rimwise +10, Theology +10, Less-Lethal / Riot Suppression +10, Command +15, or Sophontology +15 |
| **Broker**                         | Rimwise +10             | Communications +10, Linguistics +10, Computers +10, Security Procedures +10, Psychology +15, or Hacking +15         |
| **Administrator**                  | Command +15             | Communications +10, Computers +10, Mathematics +10, Security Procedures +10, Psychology +15, or Ship Systems +15    |
| **Legal Representative**           | Security Procedures +10 | Communications +10, Linguistics +10, Computers +10, Psychology +15, or Command +15                                  |
