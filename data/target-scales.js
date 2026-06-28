export const TARGET_SCALES = Object.freeze({
  person: { id: "person", hasIndependentHealth: true },
  personal_armor: { id: "personal_armor", hasIndependentHealth: false },
  powered_suit: { id: "powered_suit", hasIndependentHealth: false },
  juggernaut_armor: { id: "juggernaut_armor", hasIndependentHealth: false, heavyDr: true },
  walker: { id: "walker", hasIndependentHealth: true },
  vehicle: { id: "vehicle", hasIndependentHealth: true },
  ship: { id: "ship", hasIndependentHealth: true },
  capital_ship: { id: "capital_ship", hasIndependentHealth: true },
  environment_scale_ship: { id: "environment_scale_ship", hasIndependentHealth: false, usesDistrictIntegrity: true },
});
