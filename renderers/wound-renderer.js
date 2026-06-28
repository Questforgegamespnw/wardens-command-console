import {
  escapeHtml
} from "../modules/ui-helpers.js";

import {
  renderResultStat
} from "./shared-renderers.js";

import {
  renderEffects
} from "./effect-renderer.js";

const WOUND_OPTIONS = Object.freeze([
  ["asphyxiation", "Asphyxiation"],
  ["bleeding", "Bleeding"],
  ["blunt_force", "Blunt Force"],
  ["electrical", "Electrical"],
  ["fire_explosive", "Fire / Explosive"],
  ["gunshot", "Gunshot"],
  ["less_lethal", "Less-Lethal"],
  ["massive_gore", "Massive Gore"],
  ["toxic_chemical", "Toxic / Chemical"],
  ["vacuum_decompression", "Vacuum / Decompression"],
  ["pressure_barotrauma", "Pressure / Barotrauma"]
]);

export function renderWoundForm({
  entities = [],
  selectedEntityId = null
} = {}) {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Injury Resolution</p>
          <h2>Wounds</h2>

          <p class="panel__description">
            Resolve severity-banded or compact wound tables.
            Linked entity armor state overrides the manual
            Trauma Dampening controls.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="wound-form" novalidate>
          <section class="form-section">
            <div class="form-grid">
              <div class="form-field form-field--full">
                <label class="form-label" for="wound-entity-id">
                  Linked Entity
                </label>

                <select
                  id="wound-entity-id"
                  class="select"
                >
                  <option value="">
                    Manual / Unlinked Resolution
                  </option>

                  ${entities
                    .map(
                      (entity) => `
                        <option
                          value="${escapeHtml(entity.id)}"
                          ${
                            entity.id === selectedEntityId
                              ? "selected"
                              : ""
                          }
                        >
                          ${escapeHtml(entity.label)}
                        </option>
                      `
                    )
                    .join("")}
                </select>

                <p class="form-help">
                  When linked, the entity's installed dampening
                  system, remaining uses, and functioning state
                  are authoritative.
                </p>
              </div>

              <div class="form-field">
                <label class="form-label" for="wound-type">
                  Wound Type
                </label>

                <select
                  id="wound-type"
                  class="select"
                  required
                >
                  ${WOUND_OPTIONS
                    .map(
                      ([id, label]) => `
                        <option value="${escapeHtml(id)}">
                          ${escapeHtml(label)}
                        </option>
                      `
                    )
                    .join("")}
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="wound-severity">
                  Requested Severity
                </label>

                <select
                  id="wound-severity"
                  class="select"
                >
                  <option value="">
                    Roll from Wound Threshold
                  </option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="deadly">Deadly</option>
                </select>

                <p class="form-help" id="wound-severity-help">
                  Leave blank to use the selected threshold's
                  normal severity chances. Choose a band only
                  to override that roll.
                </p>
              </div>

              <div class="form-field">
                <label class="form-label" for="wound-threshold">
                  Wound Threshold
                </label>

                <select
                  id="wound-threshold"
                  class="select"
                >
                  <option value="first">First Wound</option>
                  <option value="second">Second Wound</option>
                  <option value="third">Third Wound</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="wound-forced-roll">
                  Manual Table Roll
                </label>

                <input
                  id="wound-forced-roll"
                  class="input"
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  placeholder="Roll automatically"
                >
              </div>

              <div class="form-field form-field--full">
                <span class="form-label">Authorization</span>

                <label>
                  <input
                    id="wound-deadly-authorized"
                    type="checkbox"
                  >
                  Deadly results are authorized
                </label>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <div>
                <h3>Trauma Dampening</h3>

                <p
                  class="form-help"
                  id="wound-dampening-source"
                >
                  Manual fallback controls.
                </p>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="wound-dampening">
                  Installed System
                </label>

                <select
                  id="wound-dampening"
                  class="select"
                >
                  <option value="">None</option>

                  <option value="trauma_dampening">
                    Trauma Dampening — 1 use, gate to Light
                  </option>

                  <option value="trauma_dampening_plus">
                    Trauma Dampening Plus — 2 uses, gate to Light
                  </option>
                </select>
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="wound-dampening-uses"
                >
                  Uses Remaining
                </label>

                <input
                  id="wound-dampening-uses"
                  class="input"
                  type="number"
                  min="0"
                  max="2"
                  step="1"
                  value="0"
                >
              </div>

              <div
                class="form-field form-field--full"
                id="wound-armor-field"
              >
                <label>
                  <input
                    id="wound-armor-functioning"
                    type="checkbox"
                    checked
                  >
                  Dampening system is functioning
                </label>
              </div>

              <div class="form-field form-field--full">
                <p class="form-help">
                  A functioning system automatically gates any
                  qualifying non-Light wound to Light and consumes
                  one use. It never spends a use on a Light wound.
                </p>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-field">
              <label class="form-label" for="wound-label">
                Result Label
              </label>

              <input
                id="wound-label"
                class="input"
                type="text"
                placeholder="Optional character or incident label"
              >
            </div>
          </section>

          <div class="form-actions">
            <button
              class="button button--secondary"
              type="reset"
            >
              Reset
            </button>

            <button
              class="button button--primary"
              type="submit"
            >
              Resolve Wound
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderWoundResult(result) {
  const wound = result.metadata?.wound ?? {};
  const entry = wound.result ?? {};

  return `
    <article class="result-card">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(formatIdentifier(wound.woundType))}
          </p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label)}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(entry.label ?? result.summary)}
          </p>
        </div>

        <span class="result-card__status">
          ${escapeHtml(formatIdentifier(wound.severity))}
        </span>
      </header>

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(entry.effectText ?? result.ruling)}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "Roll",
            wound.roll ?? "—"
          )}

          ${renderResultStat(
            "Threshold",
            formatIdentifier(wound.threshold)
          )}

          ${renderResultStat(
            "Severity",
            formatIdentifier(wound.severity)
          )}

          ${renderResultStat(
            "Severity Source",
            getSeveritySourceLabel(wound)
          )}
        </div>

        ${renderSeverityChange(wound)}
        ${renderTraumaDampeningResult(wound)}

        ${renderEffects(entry.effects, {
          heading: "Mechanical Effects"
        })}

        ${entry.tags?.length
          ? `
            <section class="form-section">
              <h3>Tags</h3>

              <p>
                ${escapeHtml(
                  entry.tags
                    .map(formatIdentifier)
                    .join(", ")
                )}
              </p>
            </section>
          `
          : ""
        }
      </div>
    </article>
  `;
}

function renderSeverityChange(wound) {
  if (
    !wound.originalSeverity
    || wound.originalSeverity === wound.severity
  ) {
    return "";
  }

  return `
    <div class="alert">
      Severity changed from
      <strong>
        ${escapeHtml(
          formatIdentifier(wound.originalSeverity)
        )}
      </strong>
      to
      <strong>
        ${escapeHtml(
          formatIdentifier(wound.severity)
        )}
      </strong>.
    </div>
  `;
}

function renderTraumaDampeningResult(wound) {
  if (wound.traumaDampeningApplied) {
    return `
      <div class="alert alert--warning">
        <strong>
          ${escapeHtml(
            formatIdentifier(
              wound.traumaDampeningId
            )
          )}
        </strong>
        activated automatically and gated the wound to Light.

        ${
          wound.traumaDampeningUseConsumed
            ? `
              Uses remaining:
              <strong>
                ${escapeHtml(
                  wound.traumaDampeningUsesBefore
                )}
                →
                ${escapeHtml(
                  wound.traumaDampeningUsesAfter
                )}
              </strong>.
            `
            : ""
        }
      </div>
    `;
  }

  if (
    !wound.traumaDampeningId
    || wound.traumaDampeningReason === "not_selected"
  ) {
    return "";
  }

  return `
    <div class="alert">
      Trauma Dampening did not activate:
      <strong>
        ${escapeHtml(
          formatDampeningReason(
            wound.traumaDampeningReason
          )
        )}
      </strong>.

      ${
        Number.isFinite(
          Number(
            wound.traumaDampeningUsesAfter
          )
        )
          ? `
            Uses remaining:
            ${escapeHtml(
              wound.traumaDampeningUsesAfter
            )}.
          `
          : ""
      }
    </div>
  `;
}

function getSeveritySourceLabel(wound) {
  if (wound.mode === "compact_d10") {
    return "Compact Table Roll";
  }

  if (
    wound.severitySource ===
    "manual_override"
  ) {
    return "Manual Override";
  }

  return "Threshold Chance Roll";
}

function formatDampeningReason(reason) {
  const labels = {
    already_light:
      "the wound was already Light",
    no_uses_remaining:
      "no uses remained",
    armor_not_functioning:
      "the dampening system was not functioning",
    wound_type_not_eligible:
      "the wound type was not eligible",
    wound_table_ineligible:
      "the wound table bypasses dampening",
    unsupported_dampening_mode:
      "the installed system uses an unsupported mode"
  };

  return labels[reason]
    ?? formatIdentifier(reason);
}

function formatIdentifier(value) {
  return String(value ?? "—")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
