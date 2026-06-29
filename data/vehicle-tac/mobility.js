export const VEHICLE_TAC_MOBILITY = Object.freeze([
  Object.freeze({
    "id": "tire_blown",
    "roll": 1,
    "label": "Tire Blown",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Speed reduced; handling check on sharp turns",
        "tags": [],
        "handoffs": {
          "crewSave": {
            "recommended": true,
            "reason": "tire_blown"
          }
        }
      },
      "moderate": {
        "text": "Vehicle cannot sprint, evade, or maintain convoy speed",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Vehicle spins out, crashes, or becomes immobilized on that side",
        "tags": [
          "immobilized",
          "crash_risk"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "track_thrown",
    "roll": 2,
    "label": "Track Thrown",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Movement penalty; cannot cross rough terrain cleanly",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Immobilized until crew spends repair time outside",
        "tags": [
          "immobilized"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Track assembly tears free; vehicle becomes a static fighting position",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "suspension_broken",
    "roll": 3,
    "label": "Suspension Broken",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Rough movement; crew suffers jolt or aim penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Speed halved; obstacle crossing risks further TAC",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Chassis bottoms out; mobility kill unless towed or lifted",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "leg_actuator_damaged",
    "roll": 4,
    "label": "Leg Actuator Damaged",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Walker movement penalty; jump/dash unavailable",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Limb drags; cannot climb, sprint, or brace properly",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Limb collapses or locks; walker falls or kneels uncontrollably",
        "tags": [
          "locked",
          "fall_risk"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "hip_joint_locked",
    "roll": 5,
    "label": "Hip Joint Locked",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Turning penalty; weak side exposed",
        "tags": [
          "locked",
          "exposed"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Walker cannot pivot freely; flank attacks gain advantage",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Walker locked in place or forced prone/kneeling",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "knee_housing_split",
    "roll": 6,
    "label": "Knee Housing Split",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Movement noisy, unstable, and slower",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Each movement risks fall, further damage, or pilot jolt",
        "tags": [
          "fall_risk"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Leg fails under load; fall, cockpit trauma, or immobilization",
        "tags": [
          "immobilized",
          "fall_risk"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "stabilizer_failure",
    "roll": 7,
    "label": "Stabilizer Failure",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Fire while moving suffers penalty",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "stabilizer_failure"
          }
        }
      },
      "moderate": {
        "text": "Cannot fire heavy weapons and move in same exchange",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "stabilizer_failure"
          }
        }
      },
      "severe": {
        "text": "Recoil or terrain knocks vehicle off balance / flips / forces shutdown",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "hover_skirt_torn",
    "roll": 8,
    "label": "Hover Skirt Torn",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Low hover instability; dust/debris plume",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Cannot cross water, rubble, or soft ground safely",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Hard landing; hover system offline and undercarriage damaged",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "vtol_lift_fan_damaged",
    "roll": 9,
    "label": "VTOL Lift Fan Damaged",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Altitude loss; evasive flight penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Forced landing soon; cannot hover in place",
        "tags": [],
        "handoffs": {
          "countdown": {
            "recommended": true,
            "reason": "vtol_lift_fan_damaged"
          }
        }
      },
      "severe": {
        "text": "Crash, uncontrolled descent, or emergency auto-landing",
        "tags": [
          "crash_risk"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "drive_train_seized",
    "roll": 10,
    "label": "Drive Train Seized",
    "category": "mobility",
    "effects": {
      "light": {
        "text": "Grinding loss of speed; heat spike",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "drive_train_seized"
          }
        }
      },
      "moderate": {
        "text": "Vehicle cannot accelerate; movement requires check",
        "tags": [],
        "handoffs": {
          "crewSave": {
            "recommended": true,
            "reason": "drive_train_seized"
          }
        }
      },
      "severe": {
        "text": "Full mobility kill; engine or transmission locks hard",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      }
    }
  }),
]);
