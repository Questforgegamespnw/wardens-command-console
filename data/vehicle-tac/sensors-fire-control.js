export const VEHICLE_TAC_SENSORS_FIRE_CONTROL = Object.freeze([
  Object.freeze({
    "id": "optics_shattered",
    "roll": 1,
    "label": "Optics Shattered",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Visual penalty; backup camera grain",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Called shots impossible through that arc",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Blind arc; attacks from that side gain advantage",
        "tags": [
          "blind"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "sensor_mast_removed",
    "roll": 2,
    "label": "Sensor Mast Removed",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Reduced detection range",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Lose radar/thermal/long-range scan mode",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Vehicle blind beyond visual range",
        "tags": [
          "blind"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "targeting_computer_rebooting",
    "roll": 3,
    "label": "Targeting Computer Rebooting",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Cannot gain smart/targeting bonus this exchange",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Must spend action to reboot before accurate fire",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "targeting_computer_rebooting"
          }
        }
      },
      "severe": {
        "text": "Fire-control computer offline; manual fire only",
        "tags": [
          "burning",
          "offline"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "targeting_computer_rebooting"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "laser_rangefinder_offline",
    "roll": 4,
    "label": "Laser Rangefinder Offline",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Long-range penalty",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "No precision shots or range-corrected fire",
        "tags": [
          "burning",
          "offline"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "laser_rangefinder_offline"
          }
        }
      },
      "severe": {
        "text": "Heavy weapons suffer severe accuracy loss",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "lock_on_system_jammed",
    "roll": 5,
    "label": "Lock-On System Jammed",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Lock takes extra action",
        "tags": [
          "jammed",
          "locked"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Guided weapons cannot lock",
        "tags": [
          "jammed",
          "locked"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Missile/guided weapon suite offline",
        "tags": [
          "jammed",
          "locked",
          "offline"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "drone_relay_lost",
    "roll": 6,
    "label": "Drone Relay Lost",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "One linked drone drops",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Drone network delayed, confused, or degraded",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "All linked drones lose coordination or go autonomous",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "thermal_view_burned_out",
    "roll": 7,
    "label": "Thermal View Burned Out",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Cannot see through smoke/heat clutter",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "thermal_view_burned_out"
          }
        }
      },
      "moderate": {
        "text": "Thermal spoofing works against vehicle",
        "tags": [
          "burning"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Vehicle vulnerable to smoke, chaff, decoys, and heat traps",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "thermal_view_burned_out"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "command_feed_corrupted",
    "roll": 8,
    "label": "Command Feed Corrupted",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Delayed commands or bad telemetry",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Cannot benefit from squad net / command assist",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Vehicle receives false orders, bad map data, or isolation",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "iff_data_stale",
    "roll": 9,
    "label": "IFF Data Stale",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Hesitation before firing near allies",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Friendly fire risk or target confirmation required",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "iff_data_stale"
          }
        }
      },
      "severe": {
        "text": "Cannot tell friend from foe without manual confirmation",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "fire_control_desynced",
    "roll": 10,
    "label": "Fire-Control Desynced",
    "category": "sensors_fire_control",
    "effects": {
      "light": {
        "text": "Gun aim and cockpit aim disagree",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_control_desynced"
          }
        }
      },
      "moderate": {
        "text": "First shot each round risks miss/near hit",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_control_desynced"
          }
        }
      },
      "severe": {
        "text": "Weapon points somewhere other than display says it does",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_control_desynced"
          }
        }
      }
    }
  }),
]);
