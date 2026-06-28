export const ENTITY_GROUP_TEMPLATES = Object.freeze([
  Object.freeze({
    id: "orion_fireteam",
    label: "Orion Fireteam",
    description:
      "One Orion gunner and one spotter.",

    members: Object.freeze([
      Object.freeze({
        templateId: "orion_gunner",
        quantity: 1,
      }),

      Object.freeze({
        templateId: "orion_spotter",
        quantity: 1,
      }),
    ]),

    status: "active",
  }),

  Object.freeze({
    id: "corporate_overwatch_cell",
    label: "Corporate Overwatch Cell",
    description:
      "Overwatch, skywatch, and technical operations.",

    members: Object.freeze([
      Object.freeze({
        templateId:
          "corporate_overwatch_operator",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "corporate_skywatch_officer",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "corporate_technical_operator",
        quantity: 1,
      }),
    ]),

    status: "active",
  }),

  Object.freeze({
    id: "corporate_reclamation_team",
    label: "Corporate Reclamation Team",
    description:
      "Four-part corporate intervention team.",

    members: Object.freeze([
      Object.freeze({
        templateId:
          "reclamation_breach_lead",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "reclamation_asset_handler",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "reclamation_tactical_control",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "reclamation_precision_enforcer",
        quantity: 1,
      }),
    ]),

    status: "active",
  }),

  Object.freeze({
    id: "adjudicator_assault_crew",
    label: "Adjudicator Assault Crew",
    description:
      "Walker pilot, fire-control specialist, and section lead.",

    members: Object.freeze([
      Object.freeze({
        templateId:
          "walker_assault_team_lead",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "adjudicator_walker_pilot",
        quantity: 1,
      }),

      Object.freeze({
        templateId:
          "adjudicator_fire_control_specialist",
        quantity: 1,
      }),
    ]),

    status: "active",
  }),
]);
