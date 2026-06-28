export const entry = (
  tableId,
  severity,
  roll,
  label,
  effectText,
  effects = {},
  tags = [],
) =>
  Object.freeze({
    id: `${tableId}_${severity}_${String(roll).padStart(2, "0")}`,
    roll,
    label,
    effectText,
    effects: Object.freeze(effects),
    tags: Object.freeze(tags),
  });

export const band = (tableId, severity, die, rows) =>
  Object.freeze({
    die,
    entries: Object.freeze(
      rows.map(([roll, label, text, effects, tags]) =>
        entry(tableId, severity, roll, label, text, effects, tags),
      ),
    ),
  });

export const table = (id, label, bands, extra = {}) =>
  Object.freeze({
    id,
    label,
    mode: "severity_banded",
    bands: Object.freeze(bands),
    ...extra,
  });
