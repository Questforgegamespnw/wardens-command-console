export * from "./doctrine.js";
export * from "./protection-timers.js";
export * from "./air-loss.js";
export * from "./vacuum.js";
export * from "./radiation-personnel.js";
export * from "./radiation-ship.js";
export * from "./thermal.js";
export * from "./toxins.js";

import { AIR_LOSS_HAZARD } from "./air-loss.js";
import { VACUUM_HAZARD } from "./vacuum.js";
import { PERSONNEL_RADIATION_HAZARD } from "./radiation-personnel.js";
import { SHIP_RADIATION_HAZARD } from "./radiation-ship.js";
import { THERMAL_HAZARDS } from "./thermal.js";
import { TOXIN_PROFILE_SCHEMA } from "./toxins.js";

export const HAZARDS = Object.freeze({
  airLoss: AIR_LOSS_HAZARD,
  vacuum: VACUUM_HAZARD,
  personnelRadiation: PERSONNEL_RADIATION_HAZARD,
  shipRadiation: SHIP_RADIATION_HAZARD,
  thermal: THERMAL_HAZARDS,
  toxins: TOXIN_PROFILE_SCHEMA,
});
