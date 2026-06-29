export const VEHICLE_TAC_CATASTROPHIC = Object.freeze([
  Object.freeze({
    "id": "mobility_kill",
    "roll": 1,
    "label": "Mobility Kill",
    "category": "catastrophic",
    "effectText": "Vehicle immobilized, crashes, falls, or becomes a static target",
    "tags": [
      "destroyed"
    ],
    "handoffs": {}
  }),
  Object.freeze({
    "id": "fireball_battery_fire",
    "roll": 2,
    "label": "Fireball / Battery Fire",
    "category": "catastrophic",
    "effectText": "Internal or external fire; crew must suppress or bail out",
    "tags": [],
    "handoffs": {
      "wound": {
        "recommended": true,
        "reason": "fireball_battery_fire"
      },
      "hazard": {
        "type": "fire",
        "reason": "fireball_battery_fire"
      }
    }
  }),
  Object.freeze({
    "id": "ammo_cook_off",
    "roll": 3,
    "label": "Ammo Cook-Off",
    "category": "catastrophic",
    "effectText": "Ammunition detonates, launches uncontrolled, or begins countdown",
    "tags": [],
    "handoffs": {
      "countdown": {
        "type": "ammo_cookoff",
        "reason": "ammo_cook_off"
      }
    }
  }),
  Object.freeze({
    "id": "crew_compartment_breach",
    "roll": 4,
    "label": "Crew Compartment Breach",
    "category": "catastrophic",
    "effectText": "Crew takes wounds/saves; cockpit is hostile or exposed",
    "tags": [],
    "handoffs": {
      "wound": {
        "recommended": true,
        "reason": "crew_compartment_breach"
      }
    }
  }),
  Object.freeze({
    "id": "power_collapse",
    "roll": 5,
    "label": "Power Collapse",
    "category": "catastrophic",
    "effectText": "Vehicle shuts down; reboot or abandon required",
    "tags": [],
    "handoffs": {}
  }),
  Object.freeze({
    "id": "weapon_detonation",
    "roll": 6,
    "label": "Weapon Detonation",
    "category": "catastrophic",
    "effectText": "Mounted weapon explodes, burns out, or tears from hardpoint",
    "tags": [],
    "handoffs": {
      "hazard": {
        "type": "fire",
        "reason": "weapon_detonation"
      }
    }
  }),
  Object.freeze({
    "id": "structural_collapse",
    "roll": 7,
    "label": "Structural Collapse",
    "category": "catastrophic",
    "effectText": "Limb, turret, bay, gantry, or chassis section fails",
    "tags": [],
    "handoffs": {}
  }),
  Object.freeze({
    "id": "command_sensor_death",
    "roll": 8,
    "label": "Command / Sensor Death",
    "category": "catastrophic",
    "effectText": "Vehicle blind, deaf, and isolated; manual operation only",
    "tags": [],
    "handoffs": {}
  }),
  Object.freeze({
    "id": "cascading_failure",
    "roll": 9,
    "label": "Cascading Failure",
    "category": "catastrophic",
    "effectText": "Roll or choose a second TAC category at Light or Moderate severity",
    "tags": [],
    "handoffs": {
      "secondaryTac": {
        "severityOptions": [
          "light",
          "moderate"
        ],
        "reason": "cascading_failure"
      }
    }
  }),
  Object.freeze({
    "id": "kill_event",
    "roll": 10,
    "label": "Kill Event",
    "category": "catastrophic",
    "effectText": "Vehicle destroyed, unrecoverable, or mission-killed immediately",
    "tags": [
      "destroyed"
    ],
    "handoffs": {}
  }),
]);
