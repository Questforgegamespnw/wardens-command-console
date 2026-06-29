export const VEHICLE_TAC_WEAPONS = Object.freeze([
  Object.freeze({
    "id": "carried_weapon_dropped",
    "roll": 1,
    "label": "Carried Weapon Dropped",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Weapon slips, drags, or loses ready position",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Weapon falls; must spend action to recover if possible",
        "tags": [
          "fall_risk"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Weapon damaged or lost; hardpoint may be exposed",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "turret_jammed",
    "roll": 2,
    "label": "Turret Jammed",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Traverse penalty or narrow firing arc",
        "tags": [
          "jammed"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Turret stuck in current facing",
        "tags": [
          "jammed"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Turret ring damaged; weapon cannot aim until depot repair",
        "tags": [
          "jammed"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "hardpoint_stripped",
    "roll": 3,
    "label": "Hardpoint Stripped",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Mount takes stress; attack penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Attached weapon offline or hanging loose",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Weapon ripped away; exposed mount invites follow-up TAC",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "missile_box_breached",
    "roll": 4,
    "label": "Missile Box Breached",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Missile system safes itself; cannot volley",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Misfire risk; must eject or manually safe",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "missile_box_breached"
          }
        }
      },
      "severe": {
        "text": "Cook-off risk; nearby units threatened by explosion",
        "tags": [],
        "handoffs": {
          "countdown": {
            "recommended": true,
            "reason": "missile_box_breached"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "ammo_feed_severed",
    "roll": 5,
    "label": "Ammo Feed Severed",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Reduced rate of fire",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "ammo_feed_severed"
          }
        }
      },
      "moderate": {
        "text": "Weapon cannot use Burst / Full Auto / sustained fire",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "ammo_feed_severed"
          }
        }
      },
      "severe": {
        "text": "Weapon offline until feed replaced or manually loaded",
        "tags": [
          "offline"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "recoil_collar_damaged",
    "roll": 6,
    "label": "Recoil Collar Damaged",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Heavy shot penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Firing heavy weapon risks self-TAC",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Next heavy shot may damage chassis, crew, or mount",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "weapon_cradle_bent",
    "roll": 7,
    "label": "Weapon Cradle Bent",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Aim penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Cannot track moving targets cleanly",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Barrel/mount alignment ruined; weapon disabled",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "fire_control_link_lost",
    "roll": 8,
    "label": "Fire-Control Link Lost",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Manual aim only; lose smart bonus",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_control_link_lost"
          }
        }
      },
      "moderate": {
        "text": "No lock-on or called shots with that weapon",
        "tags": [
          "burning",
          "locked"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_control_link_lost"
          }
        }
      },
      "severe": {
        "text": "Weapon cannot be operated from cockpit; external/manual access only",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "fire_control_link_lost"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "barrel_warped",
    "roll": 9,
    "label": "Barrel Warped",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Accuracy penalty; heat warning",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "barrel_warped"
          }
        }
      },
      "moderate": {
        "text": "Weapon range reduced; sustained fire unsafe",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "barrel_warped"
          }
        }
      },
      "severe": {
        "text": "Weapon may burst, jam permanently, or explode if fired",
        "tags": [
          "burning",
          "jammed"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "barrel_warped"
          }
        }
      }
    }
  }),
  Object.freeze({
    "id": "charge_system_unstable",
    "roll": 10,
    "label": "Charge System Unstable",
    "category": "weapons",
    "effects": {
      "light": {
        "text": "Charge delay or heat spike",
        "tags": [],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "charge_system_unstable"
          }
        }
      },
      "moderate": {
        "text": "Weapon cannot fire this round; must vent",
        "tags": [
          "burning"
        ],
        "handoffs": {
          "hazard": {
            "type": "heat_or_fire",
            "reason": "charge_system_unstable"
          }
        }
      },
      "severe": {
        "text": "Capacitor discharge, weapon burnout, or internal arc hazard",
        "tags": [
          "burning"
        ],
        "handoffs": {}
      }
    }
  }),
]);
