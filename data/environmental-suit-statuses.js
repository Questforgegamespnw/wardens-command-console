export const ENVIRONMENTAL_SUIT_STATUSES = Object.freeze({
  seal_warning: {
    id: "seal_warning",
    label: "Seal Warning",
    nextSealTacSeverityShift: 1,
    uses: 1,
  },
  seal_breach: {
    id: "seal_breach",
    label: "Seal Breach",
    sealedDisabled: true,
    clearedBy: ["field_patch", "repair"],
  },
  critical_seal_failure: {
    id: "critical_seal_failure",
    label: "Critical Seal Failure",
    sealedDisabled: true,
    immediateExposure: true,
    clearedBy: ["major_repair"],
  },
  o2_leak: {
    id: "o2_leak",
    label: "O2 Leak",
    oxygenLossPerCycle: 1,
    clearedBy: ["field_patch", "repair"],
  },
  filter_rupture: {
    id: "filter_rupture",
    label: "Filter Rupture",
    exposesTo: ["gas", "spores", "smoke", "contaminants"],
    clearedBy: ["filter_replacement", "repair"],
  },
  pressure_failure: {
    id: "pressure_failure",
    label: "Pressure Failure",
    disables: ["vacuum_protection", "underwater_pressure_protection"],
    clearedBy: ["major_repair"],
  },
  thermal_control_failure: {
    id: "thermal_control_failure",
    label: "Thermal Control Failure",
    disables: ["temperature_control"],
    clearedBy: ["repair"],
  },
  hazard_layer_failure: {
    id: "hazard_layer_failure",
    label: "Hazard Layer Failure",
    disables: ["chemical_filtration", "biohazard_protection", "radiation_protection"],
    clearedBy: ["major_repair"],
  },
});
