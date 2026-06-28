import {
  escapeHtml
} from "../modules/ui-helpers.js";

export function renderEffects(
  effects = {},
  {
    heading = "Effects"
  } = {}
) {
  if (!effects || typeof effects !== "object") {
    return "";
  }

  const rows = [];

  addRow(rows, "Calm Loss", effects.calmLoss);
  addRow(rows, "Bleeding", formatSigned(effects.bleedingDelta));
  addRow(rows, "Duration", effects.duration);
  addRow(rows, "Medical Treatment", yesNo(effects.medicalTreatmentRequired));
  addRow(rows, "Death", effects.death === true ? "Immediate" : null);

  if (effects.disadvantage) {
    addRow(
      rows,
      "Disadvantage",
      formatDisadvantage(effects.disadvantage)
    );
  }

  if (effects.attributeModifier) {
    addRow(
      rows,
      "Attribute Modifier",
      formatAttributeModifier(
        effects.attributeModifier
      )
    );
  }

  for (
    const modifier of
    effects.attributeModifiers ?? []
  ) {
    addRow(
      rows,
      "Attribute Modifier",
      formatAttributeModifier(modifier)
    );
  }

  if (effects.conditionsAdded?.length) {
    addRow(
      rows,
      "Conditions",
      effects.conditionsAdded
        .map(formatIdentifier)
        .join(", ")
    );
  }

  if (effects.ongoingDamage) {
    addRow(
      rows,
      "Ongoing Damage",
      formatOngoingDamage(
        effects.ongoingDamage
      )
    );
  }

  if (effects.fatalTimer) {
    addRow(
      rows,
      "Fatal Timer",
      formatTimer(effects.fatalTimer)
    );
  }

  if (effects.bodySave) {
    addRow(
      rows,
      "Body Save",
      formatBodySave(effects.bodySave)
    );
  }

  if (effects.actionLoss) {
    addRow(
      rows,
      "Action Loss",
      formatValue(effects.actionLoss)
    );
  }

  if (effects.actionLimit) {
    addRow(
      rows,
      "Action Limit",
      formatValue(effects.actionLimit)
    );
  }

  if (effects.movementReduced === true) {
    addRow(rows, "Movement", "Reduced");
  }

  const knownKeys = new Set([
    "calmLoss",
    "bleedingDelta",
    "duration",
    "medicalTreatmentRequired",
    "death",
    "disadvantage",
    "attributeModifier",
    "attributeModifiers",
    "conditionsAdded",
    "ongoingDamage",
    "fatalTimer",
    "bodySave",
    "actionLoss",
    "actionLimit",
    "movementReduced"
  ]);

  for (const [key, value] of Object.entries(effects)) {
    if (
      knownKeys.has(key) ||
      value === null ||
      value === undefined ||
      value === false
    ) {
      continue;
    }

    addRow(
      rows,
      formatIdentifier(key),
      formatValue(value)
    );
  }

  if (rows.length === 0) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>${escapeHtml(heading)}</h3>

      <dl class="effect-list">
        ${rows.join("")}
      </dl>
    </section>
  `;
}

export function renderHandoffs(
  handoffs = {}
) {
  const active = Object.entries(handoffs)
    .filter(([, value]) => Boolean(value));

  if (active.length === 0) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>Resolver Handoffs</h3>

      <div class="alert alert--warning">
        ${active
          .map(
            ([key, value]) => `
              <p>
                <strong>
                  ${escapeHtml(formatIdentifier(key))}
                </strong>:
                ${escapeHtml(formatValue(value))}
              </p>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function addRow(rows, label, value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return;
  }

  rows.push(`
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(String(value))}</dd>
    </div>
  `);
}

function formatDisadvantage(disadvantage) {
  if (typeof disadvantage !== "object") {
    return formatValue(disadvantage);
  }

  const targets = (
    disadvantage.targets ?? []
  )
    .map(formatIdentifier)
    .join(", ");

  const steps =
    Number(disadvantage.steps) || 0;

  const notation =
    steps > 0
      ? Array.from(
          { length: steps },
          () => "[-]"
        ).join("")
      : "None";

  return [
    notation,
    targets,
    disadvantage.duration
      ? formatIdentifier(
          disadvantage.duration
        )
      : null
  ].filter(Boolean).join(" · ");
}

function formatAttributeModifier(modifier) {
  if (!modifier) {
    return "";
  }

  return [
    formatIdentifier(modifier.attribute),
    formatSigned(modifier.amount),
    modifier.duration
      ? formatIdentifier(modifier.duration)
      : null
  ].filter(Boolean).join(" · ");
}

function formatOngoingDamage(damage) {
  return [
    damage.amount,
    damage.interval
      ? `per ${formatIdentifier(damage.interval)}`
      : null
  ].filter(Boolean).join(" ");
}

function formatTimer(timer) {
  return [
    timer.duration ?? timer.remaining,
    timer.unit,
    timer.stoppedBy?.length
      ? `stopped by ${timer.stoppedBy
          .map(formatIdentifier)
          .join(", ")}`
      : null
  ].filter(Boolean).join(" · ");
}

function formatBodySave(save) {
  if (save.required === false) {
    return "Not required";
  }

  return save.onFailure
    ? `Required · failure: ${formatValue(save.onFailure)}`
    : "Required";
}

function formatSigned(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return String(value);
  }

  return numeric > 0
    ? `+${numeric}`
    : String(numeric);
}

function yesNo(value) {
  return value === true
    ? "Yes"
    : null;
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? formatIdentifier(item)
          : formatValue(item)
      )
      .join(", ");
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return Object.entries(value)
      .map(
        ([key, nested]) =>
          `${formatIdentifier(key)}: ${formatValue(nested)}`
      )
      .join(" · ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    return formatIdentifier(value);
  }

  return String(value);
}

function formatIdentifier(value) {
  return String(value ?? "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
