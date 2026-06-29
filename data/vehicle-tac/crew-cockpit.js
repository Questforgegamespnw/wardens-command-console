export const VEHICLE_TAC_CREW_COCKPIT = Object.freeze([
  Object.freeze({
    "id": "crew_stunned",
    "roll": 1,
    "label": "Crew Stunned",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Crew loses reaction or next minor action",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Crew member loses next action or makes save",
        "tags": [],
        "handoffs": {
          "crewSave": {
            "recommended": true,
            "reason": "crew_stunned"
          }
        }
      },
      "severe": {
        "text": "Crew unconscious, concussed, or unable to operate station",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "crew_stunned"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "pilot_harness_locks",
    "roll": 2,
    "label": "Pilot Harness Locks",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Pilot pinned in seat; slow exit",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Cannot dismount or transfer control quickly",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Pilot trapped; extraction required under fire",
        "tags": [
          "burning",
          "locked",
          "trapped"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "pilot_harness_locks"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "cockpit_spall_event",
    "roll": 3,
    "label": "Cockpit Spall Event",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Stress, minor injury, visor cracks",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "cockpit_spall_event"
          }
        }
      },
      "moderate": {
        "text": "Crew takes damage or wound save",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "cockpit_spall_event"
          },
          "crewSave": {
            "recommended": true,
            "reason": "cockpit_spall_event"
          }
        }
      },
      "severe": {
        "text": "Crew wounded; cockpit interior becomes lethal debris field",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "cockpit_spall_event"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "shockwave_trauma",
    "roll": 4,
    "label": "Shockwave Trauma",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Stress and penalty next action",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "shockwave_trauma"
          }
        }
      },
      "moderate": {
        "text": "Body save or lose action / suffer injury",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "shockwave_trauma"
          },
          "crewSave": {
            "recommended": true,
            "reason": "shockwave_trauma"
          }
        }
      },
      "severe": {
        "text": "Severe concussion, internal injury, or pilot blackout",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "shockwave_trauma"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "fire_in_crew_compartment",
    "roll": 5,
    "label": "Fire in Crew Compartment",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Smoke, heat, warning alarms",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_in_crew_compartment"
          }
        }
      },
      "moderate": {
        "text": "Crew must extinguish or suffer damage",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "fire_in_crew_compartment"
          },
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_in_crew_compartment"
          }
        }
      },
      "severe": {
        "text": "Cockpit burning; bailout or suppression required now",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_in_crew_compartment"
          },
          "bailout": {
            "recommended": true,
            "reason": "fire_in_crew_compartment"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "pressure_seal_rupture",
    "roll": 6,
    "label": "Pressure Seal Rupture",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Suit seals required; alarm state",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "vacuum_or_air_loss",
            "reason": "pressure_seal_rupture"
          }
        }
      },
      "moderate": {
        "text": "Atmosphere loss, smoke, vacuum, or chemical exposure",
        "tags": [
          "exposed"
        ],
        "handoffs": {
          "hazard": {
            "type": "vacuum_or_air_loss",
            "reason": "pressure_seal_rupture"
          }
        }
      },
      "severe": {
        "text": "Crew compartment hostile; unprotected crew dying",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "vacuum_or_air_loss",
            "reason": "pressure_seal_rupture"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "vision_blocks_cracked",
    "roll": 7,
    "label": "Vision Blocks Cracked",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Visual distortion",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Manual sighting penalty and stress",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Forward vision lost; must use instruments or open hatch",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "casualty_extraction_required",
    "roll": 8,
    "label": "Casualty Extraction Required",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Crew member hurt but functional",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Crew member cannot operate station",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Crew member trapped, bleeding, burning, or pinned",
        "tags": [
          "burning",
          "trapped"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "casualty_extraction_required"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "controls_damaged",
    "roll": 9,
    "label": "Controls Damaged",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "One control mode sticky or delayed",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "controls_damaged"
          }
        }
      },
      "moderate": {
        "text": "Movement or weapon station requires check",
        "tags": [],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "controls_damaged"
          },
          "crewSave": {
            "recommended": true,
            "reason": "controls_damaged"
          }
        }
      },
      "severe": {
        "text": "Controls fail or lock; vehicle may continue last input",
        "tags": [
          "locked"
        ],
        "handoffs": {
          "wound": {
            "recommended": true,
            "reason": "controls_damaged"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "internal_comms_fail",
    "roll": 10,
    "label": "Internal Comms Fail",
    "category": "crew_cockpit",
    "effects": {
      "light": {
        "text": "Crew communication delayed",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Stations cannot coordinate easily",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Crew isolated; orders must be shouted, routed, or physically relayed",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
]);
