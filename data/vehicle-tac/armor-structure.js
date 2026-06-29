export const VEHICLE_TAC_ARMOR_STRUCTURE = Object.freeze([
  Object.freeze({
    "id": "armor_plate_cracked",
    "roll": 1,
    "label": "Armor Plate Cracked",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Mark weak facing; next hit gains +effect",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "AV reduced on that facing",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Armor section compromised; future hits escalate severity",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "reactive_block_detonated",
    "roll": 2,
    "label": "Reactive Block Detonated",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Reactive protection spent in one area",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Nearby systems exposed; crew jolted",
        "tags": [
          "locked",
          "exposed"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Chain reaction or armor gap opens",
        "tags": [
          "locked"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "exposed_frame",
    "roll": 3,
    "label": "Exposed Frame",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Cosmetic exposure; targeting clue",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Called shots against frame easier",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Structural member vulnerable; collapse if hit again",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "open_seam",
    "roll": 4,
    "label": "Open Seam",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Dust, smoke, sparks, breach line",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Internal systems can be targeted through seam",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Breach opens into crew/system compartment",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "side_skirt_torn_off",
    "roll": 5,
    "label": "Side Skirt Torn Off",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Track/wheel/leg more exposed",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Mobility components vulnerable",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Mobility TAC on next hit to that side is automatic",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "limb_mount_cracked",
    "roll": 6,
    "label": "Limb Mount Cracked",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Walker limb suffers penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Limb cannot bear full load or recoil",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Limb may tear free, collapse, or become unusable",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "hatch_warped",
    "roll": 7,
    "label": "Hatch Warped",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Hatch slow or jammed",
        "tags": [
          "jammed"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Crew cannot enter/exit quickly",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Crew trapped or hatch blown inward/outward",
        "tags": [
          "trapped"
        ],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "cargo_bay_breached",
    "roll": 8,
    "label": "Cargo Bay Breached",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Cargo exposed or damaged",
        "tags": [
          "exposed"
        ],
        "handoffs": {}
      },
      "moderate": {
        "text": "Loose cargo, falling stores, or explosive risk",
        "tags": [
          "fall_risk"
        ],
        "handoffs": {}
      },
      "severe": {
        "text": "Bay tears open; cargo spill, crew hazard, or secondary event",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "support_arm_severed",
    "roll": 9,
    "label": "Support Arm Severed",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Tool/gantry/launcher unstable",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "Attached equipment disabled",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Equipment drops, crushes, or tears away connected systems",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
  Object.freeze({
    "id": "chassis_twisted",
    "roll": 10,
    "label": "Chassis Twisted",
    "category": "armor_structure",
    "effects": {
      "light": {
        "text": "Alignment problems; movement/aim penalty",
        "tags": [],
        "handoffs": {}
      },
      "moderate": {
        "text": "One side rides wrong; multiple systems stressed",
        "tags": [],
        "handoffs": {}
      },
      "severe": {
        "text": "Vehicle permanently deformed; severe mobility or weapon restriction",
        "tags": [],
        "handoffs": {}
      }
    }
  }),
]);
