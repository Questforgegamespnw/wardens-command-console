export const VEHICLE_TAC_POWER_SYSTEMS = Object.freeze([
  Object.freeze({
    "id": "capacitor_fault",
    "roll": 1,
    "label": "Capacitor Fault",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Charge weapons delayed",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Charged weapon cannot fire until vented/recycled",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "capacitor_fault"
          }
        }
      },
      "severe": {
        "text": "Capacitor arcs; damages weapon, crew, or power bus",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "reactor_trip",
    "roll": 2,
    "label": "Reactor Trip",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Power flicker; nonessential systems blink",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Vehicle loses one major system for a round",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Emergency shutdown or reactor instability",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "power_bus_short",
    "roll": 3,
    "label": "Power Bus Short",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "One subsystem loses power",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Choose: weapons, mobility, sensors, or defenses offline",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Electrical fire; multiple systems threatened",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "power_bus_short"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "coolant_leak",
    "roll": 4,
    "label": "Coolant Leak",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Heat builds under sustained action",
        "tags": [
          "leaking"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "coolant_leak"
          }
        }
      },
      "moderate": {
        "text": "Cannot use heavy weapons or sprint without heat risk",
        "tags": [
          "leaking"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "coolant_leak"
          }
        }
      },
      "severe": {
        "text": "Overheat clock starts; fire or engine seizure possible",
        "tags": [
          "burning",
          "leaking",
          "locked"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "coolant_leak"
          },
          "countdown": {
            "recommended": true,
            "reason": "coolant_leak"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "battery_fire",
    "roll": 5,
    "label": "Battery Fire",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Smoke and warning alarms",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "battery_fire"
          }
        }
      },
      "moderate": {
        "text": "Fire spreads if not suppressed",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "battery_fire"
          }
        }
      },
      "severe": {
        "text": "Battery detonation, toxic smoke, or power loss",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "battery_fire"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "hydraulic_pressure_loss",
    "roll": 6,
    "label": "Hydraulic Pressure Loss",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Slow limb/turret/actuator response",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "vacuum_or_air_loss",
            "reason": "hydraulic_pressure_loss"
          }
        }
      },
      "moderate": {
        "text": "Movement, turret, or lifting system weakened",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "vacuum_or_air_loss",
            "reason": "hydraulic_pressure_loss"
          }
        }
      },
      "severe": {
        "text": "Limb, turret, brake, or stabilizer fails hard",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "vacuum_or_air_loss",
            "reason": "hydraulic_pressure_loss"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "active_shield_collapse",
    "roll": 7,
    "label": "Active Shield Collapse",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Shield flickers; reduced value",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Shield offline until reset",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Shield generator burned out or dangerous overload",
        "tags": [
          "burning"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "charge_cycle_halted",
    "roll": 8,
    "label": "Charge Cycle Halted",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Charged weapon delayed",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Weapon loses stored charge",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Charge system locks; firing risks internal damage",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "motor_controller_failure",
    "roll": 9,
    "label": "Motor Controller Failure",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Stutter-step movement or drive lag",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "One limb/track/wheel bank unreliable",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Motor bank dead; mobility or manipulation disabled",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "emergency_shutdown",
    "roll": 10,
    "label": "Emergency Shutdown",
    "category": "power_systems",
    "effects": {
      "light": {
        "text": "Systems cut for a heartbeat",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Vehicle loses next action unless rebooted",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Full shutdown; dead machine until crew restarts or bypasses",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
]);
