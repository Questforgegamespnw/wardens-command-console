/** Split from legacy data/hazards.js. */

export const SHIP_RADIATION_HAZARD =
  Object.freeze({
    id: "ship_radiation",
    label: "Ship-Side Radiation",

    modes: Object.freeze({
      externalIrradiation: Object.freeze({
        examples: Object.freeze([
          "solar_event",
          "pulsar",
          "radiation_belt",
          "reactor_beam",
          "radiation_weapon",
          "cosmic_anomaly"
        ]),

        defenses: Object.freeze([
          "hull_mass",
          "shielding",
          "powered_polarized_layer",
          "orientation",
          "distance"
        ])
      }),

      internalContamination: Object.freeze({
        examples: Object.freeze([
          "reactor_leak",
          "damaged_fuel",
          "radioactive_cargo",
          "contaminated_dust",
          "failed_decontamination"
        ]),

        defenses: Object.freeze([
          "containment",
          "compartment_seals",
          "filters",
          "scrubbers",
          "decontamination"
        ])
      })
    }),

    protectionTimer: Object.freeze({
      label: "RAD Protection Remaining",
      unit: "minutes",

      represents: Object.freeze([
        "shielding_saturation",
        "filter_load",
        "polarized_layer_endurance",
        "cooling_tolerance",
        "safe_accumulated_dose",
        "containment_margin"
      ])
    }),

    intensity: Object.freeze({
      trace: Object.freeze({
        drainRate: 0,

        description:
          "Normal hull protection is sufficient; prolonged exposure may affect sensitive systems."
      }),

      hazardous: Object.freeze({
        drainRate: 1,

        description:
          "Drain RAD protection normally."
      }),

      severe: Object.freeze({
        drainRate: 2,

        description:
          "Drain protection rapidly; Systems checks may be required."
      }),

      extreme: Object.freeze({
        drainRate: 3,

        description:
          "Protection collapses in minutes or rounds; S-TAC is likely."
      }),

      catastrophic: Object.freeze({
        drainRate: null,

        description:
          "Ordinary vessels cannot remain safely exposed."
      })
    }),

    failureBands: Object.freeze({
      minor: Object.freeze([
        "radiation_alarms",
        "faster_timer_drain",
        "sensor_or_computer_interference",
        "localized_elevated_readings"
      ]),

      moderate: Object.freeze([
        "scrubber_or_filter_overload",
        "one_compartment_unprotected",
        "personal_protection_required",
        "sharp_timer_reduction"
      ]),

      severe: Object.freeze([
        "shielding_breach_or_reactor_leak",
        "radiation_rises_each_interval",
        "multiple_unsafe_compartments",
        "repair_evacuation_or_isolation_required"
      ]),

      broken: Object.freeze([
        "shipwide_protection_lost",
        "continuous_personnel_exposure",
        "habitable_spaces_must_be_abandoned_or_isolated"
      ])
    }),

    tacRouting: Object.freeze([
      "life_support_seal",
      "power_systems",
      "crew_habitation"
    ])
  });
