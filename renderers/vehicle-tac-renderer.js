import {
  escapeHtml
} from "../modules/ui-helpers.js";

import {
  renderResultStat
} from "./shared-renderers.js";

import {
  renderHandoffs
} from "./effect-renderer.js";

import {
  VEHICLE_TAC_CATEGORIES,
  VEHICLE_TAC_CATEGORY_LABELS,
  VEHICLE_TAC_SEVERITIES,
  VEHICLE_SUBSYSTEM_CONDITIONS,
  VEHICLE_PLATFORM_TYPES,
  VEHICLE_PLATFORM_RULES
} from "../data/vehicle-tac/index.js";

export function renderVehicleTacForm({
  entities = [],
  selectedEntityId = null
} = {}) {
  const vehicles = entities.filter(
    (entity) => entity.type === "vehicle"
  );

  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Vehicle Consequence Resolution</p>
          <h2>Vehicle TAC</h2>

          <p class="panel__description">
            Resolve what a damaged vehicle can no longer do.
            Link a tracked vehicle or run a one-off result.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="vehicle-tac-form" novalidate>
          <section class="form-section">
            <div class="form-section__heading">
              <h3>Vehicle</h3>
            </div>

            <div class="form-grid">
              <div class="form-field form-field--full">
                <label
                  class="form-label"
                  for="vehicle-tac-entity-id"
                >
                  Linked Vehicle
                </label>

                <select
                  id="vehicle-tac-entity-id"
                  class="select"
                >
                  <option value="">
                    Manual / Unlinked Resolution
                  </option>

                  ${vehicles
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
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-label"
                >
                  Vehicle Label
                </label>

                <input
                  id="vehicle-tac-label"
                  class="input"
                  type="text"
                  placeholder="Walker Alpha"
                >
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-platform"
                >
                  Platform Type
                </label>

                <select
                  id="vehicle-tac-platform"
                  class="select"
                >
                  ${VEHICLE_PLATFORM_TYPES
                    .map(
                      (id) => `
                        <option value="${escapeHtml(id)}">
                          ${escapeHtml(
                            VEHICLE_PLATFORM_RULES[id].label
                          )}
                        </option>
                      `
                    )
                    .join("")}
                </select>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <h3>Severity and Category</h3>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-count"
                >
                  TAC Count
                </label>

                <input
                  id="vehicle-tac-count"
                  class="input"
                  type="number"
                  min="1"
                  max="3"
                  step="1"
                  value="1"
                >
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-forced-severity"
                >
                  Manual Severity
                </label>

                <select
                  id="vehicle-tac-forced-severity"
                  class="select"
                >
                  <option value="">Roll Severity</option>

                  ${VEHICLE_TAC_SEVERITIES
                    .map(
                      (id) => `
                        <option value="${escapeHtml(id)}">
                          ${escapeHtml(formatIdentifier(id))}
                        </option>
                      `
                    )
                    .join("")}
                </select>
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-severity-shift"
                >
                  Severity Shift
                </label>

                <input
                  id="vehicle-tac-severity-shift"
                  class="input"
                  type="number"
                  min="-3"
                  max="3"
                  step="1"
                  value="0"
                >
              </div>

              <div class="form-field form-field--full">
                <span class="form-label">Category Mode</span>

                <div class="segmented-control">
                  <input
                    id="vehicle-tac-category-random"
                    name="vehicleTacCategoryMode"
                    type="radio"
                    value="random"
                    checked
                  >

                  <label for="vehicle-tac-category-random">
                    Random
                  </label>

                  <input
                    id="vehicle-tac-category-preferred"
                    name="vehicleTacCategoryMode"
                    type="radio"
                    value="preferred"
                  >

                  <label for="vehicle-tac-category-preferred">
                    Preferred
                  </label>
                </div>
              </div>

              <div
                id="vehicle-tac-preferred-field"
                class="form-field"
                hidden
              >
                <label
                  class="form-label"
                  for="vehicle-tac-preferred-category"
                >
                  Preferred Category
                </label>

                <select
                  id="vehicle-tac-preferred-category"
                  class="select"
                  disabled
                >
                  ${VEHICLE_TAC_CATEGORIES
                    .map(
                      (id) => `
                        <option value="${escapeHtml(id)}">
                          ${escapeHtml(
                            VEHICLE_TAC_CATEGORY_LABELS[id]
                          )}
                        </option>
                      `
                    )
                    .join("")}
                </select>
              </div>

              <div
                id="vehicle-tac-preferred-source-field"
                class="form-field"
                hidden
              >
                <label
                  class="form-label"
                  for="vehicle-tac-preferred-source"
                >
                  Preference Source
                </label>

                <select
                  id="vehicle-tac-preferred-source"
                  class="select"
                  disabled
                >
                  <option value="manual">Manual</option>
                  <option value="weapon">Weapon</option>
                  <option value="ammunition">Ammunition</option>
                  <option value="called_shot">Called Shot</option>
                  <option value="fictional_position">
                    Fictional Position
                  </option>
                </select>
              </div>

              <div
                id="vehicle-tac-category-roll-field"
                class="form-field"
              >
                <label
                  class="form-label"
                  for="vehicle-tac-category-roll"
                >
                  Manual Category Roll
                </label>

                <input
                  id="vehicle-tac-category-roll"
                  class="input"
                  type="number"
                  min="1"
                  max="6"
                  step="1"
                  placeholder="Roll automatically"
                >
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-outcome-roll"
                >
                  Manual Outcome Roll
                </label>

                <input
                  id="vehicle-tac-outcome-roll"
                  class="input"
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  placeholder="Roll automatically"
                >
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <div>
                <h3>Subsystem</h3>

                <p class="form-help">
                  A linked vehicle checks the named subsystem for
                  prior damage and escalates automatically.
                </p>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-subsystem-id"
                >
                  Subsystem ID
                </label>

                <input
                  id="vehicle-tac-subsystem-id"
                  class="input"
                  type="text"
                  placeholder="left_knee"
                >
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="vehicle-tac-subsystem-label"
                >
                  Subsystem Label
                </label>

                <input
                  id="vehicle-tac-subsystem-label"
                  class="input"
                  type="text"
                  placeholder="Left Knee Actuator"
                >
              </div>

              <div
                id="vehicle-tac-existing-condition-field"
                class="form-field"
              >
                <label
                  class="form-label"
                  for="vehicle-tac-existing-condition"
                >
                  Existing Condition
                </label>

                <select
                  id="vehicle-tac-existing-condition"
                  class="select"
                >
                  ${VEHICLE_SUBSYSTEM_CONDITIONS
                    .map(
                      (id) => `
                        <option value="${escapeHtml(id)}">
                          ${escapeHtml(formatIdentifier(id))}
                        </option>
                      `
                    )
                    .join("")}
                </select>
              </div>

              <div
                id="vehicle-tac-existing-severity-field"
                class="form-field"
              >
                <label
                  class="form-label"
                  for="vehicle-tac-existing-severity"
                >
                  Last Severity
                </label>

                <select
                  id="vehicle-tac-existing-severity"
                  class="select"
                >
                  <option value="">Fresh Subsystem</option>

                  ${VEHICLE_TAC_SEVERITIES
                    .map(
                      (id) => `
                        <option value="${escapeHtml(id)}">
                          ${escapeHtml(formatIdentifier(id))}
                        </option>
                      `
                    )
                    .join("")}
                </select>
              </div>
            </div>
          </section>

          <section
            id="vehicle-tac-create-entity-section"
            class="form-section"
          >
            <div class="form-section__heading">
              <h3>Optional Vehicle Entity</h3>
            </div>

            <div class="form-grid">
              <div class="form-field form-field--full">
                <label>
                  <input
                    id="vehicle-tac-save-entity"
                    type="checkbox"
                  >
                  Save this one-off result as a Vehicle Quick Entity
                </label>
              </div>

              ${renderNumberField(
                "vehicle-tac-av",
                "AV",
                0,
                0
              )}

              ${renderNumberField(
                "vehicle-tac-dr",
                "DR",
                0,
                0
              )}

              ${renderNumberField(
                "vehicle-tac-health-per-wound",
                "Health per Wound",
                20,
                1
              )}

              ${renderNumberField(
                "vehicle-tac-wounds",
                "Wounds",
                3,
                1
              )}
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
              Resolve Vehicle TAC
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderVehicleTacResult(result) {
  const tac = result.metadata?.vehicleTac ?? {};
  const category = tac.category ?? {};
  const subsystem = tac.subsystem ?? {};
  const nextState = subsystem.nextState ?? {};
  const outcome = tac.outcome ?? {};

  return `
    <article class="result-card ${getCardClass(tac)}">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(
              VEHICLE_TAC_CATEGORY_LABELS[category.id]
              ?? formatIdentifier(category.id)
            )}
          </p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label ?? "Vehicle TAC")}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(
              outcome.label
              ?? result.summary
              ?? "Vehicle subsystem consequence"
            )}
          </p>
        </div>

        <span class="result-card__status">
          ${escapeHtml(formatIdentifier(tac.finalSeverity))}
        </span>
      </header>

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(
            outcome.effectText
            ?? result.ruling
            ?? "Apply the listed Vehicle TAC effect."
          )}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "Platform",
            formatIdentifier(tac.platformType)
          )}

          ${renderResultStat(
            "Category",
            VEHICLE_TAC_CATEGORY_LABELS[category.id]
              ?? formatIdentifier(category.id)
          )}

          ${renderResultStat(
            "Category Source",
            formatCategorySource(category)
          )}

          ${renderResultStat(
            "Outcome Roll",
            tac.outcomeRoll ?? "—"
          )}

          ${renderResultStat(
            "Subsystem",
            subsystem.label ?? "—"
          )}

          ${renderResultStat(
            "Condition",
            formatIdentifier(nextState.condition)
          )}
        </div>

        ${renderSeverityPath(tac)}
        ${renderEscalation(tac.escalation)}
        ${renderSubsystemState(subsystem)}
        ${renderPlatformGuidance(tac.platformGuidance)}
        ${renderHandoffs(tac.handoffs)}
      </div>
    </article>
  `;
}

function renderSeverityPath(tac) {
  const rows = [
    ["Rolled", tac.rolledSeverity],
    ["After Shift", tac.shiftedSeverity],
    ["Final", tac.finalSeverity]
  ];

  return `
    <section class="form-section">
      <h3>Severity Path</h3>

      <ul class="calculation-list">
        ${rows
          .map(
            ([label, value]) => `
              <li class="calculation-row">
                <span class="calculation-row__label">
                  ${escapeHtml(label)}
                </span>

                <span class="calculation-row__value">
                  ${escapeHtml(formatIdentifier(value))}
                </span>
              </li>
            `
          )
          .join("")}
      </ul>
    </section>
  `;
}

function renderEscalation(escalation = {}) {
  if (!escalation.applied) {
    return "";
  }

  return `
    <div class="alert alert--warning">
      <strong>Repeated subsystem damage:</strong>
      the previous
      ${escapeHtml(formatIdentifier(escalation.fromSeverity))}
      result established a minimum severity of
      ${escapeHtml(formatIdentifier(escalation.minimumSeverity))}.
    </div>
  `;
}

function renderSubsystemState(subsystem = {}) {
  const previous = subsystem.previousState;
  const next = subsystem.nextState ?? {};

  return `
    <section class="form-section">
      <h3>Subsystem State</h3>

      <div class="result-grid">
        ${renderResultStat(
          "Previous Condition",
          previous
            ? formatIdentifier(previous.condition)
            : "Operational"
        )}

        ${renderResultStat(
          "New Condition",
          formatIdentifier(next.condition)
        )}

        ${renderResultStat(
          "Last Severity",
          formatIdentifier(next.lastSeverity)
        )}

        ${renderResultStat(
          "Tags",
          Array.isArray(next.tags) && next.tags.length
            ? next.tags.map(formatIdentifier).join(", ")
            : "None"
        )}
      </div>
    </section>
  `;
}

function renderPlatformGuidance(platformGuidance) {
  if (!platformGuidance?.guidance) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>Platform Guidance</h3>

      <p>
        ${escapeHtml(platformGuidance.guidance)}
      </p>
    </section>
  `;
}

function formatCategorySource(category = {}) {
  if (category.mode === "preferred") {
    return category.source
      ? formatIdentifier(category.source)
      : "Selected";
  }

  if (category.mode === "random") {
    return `d6: ${category.roll ?? "—"}`;
  }

  return formatIdentifier(category.mode);
}

function getCardClass(tac) {
  if (tac.finalSeverity === "catastrophic") {
    return "result-card--failure";
  }

  return "";
}

function renderNumberField(
  id,
  label,
  value,
  minimum
) {
  return `
    <div class="form-field">
      <label
        class="form-label"
        for="${escapeHtml(id)}"
      >
        ${escapeHtml(label)}
      </label>

      <input
        id="${escapeHtml(id)}"
        class="input"
        type="number"
        min="${minimum}"
        step="1"
        value="${value}"
      >
    </div>
  `;
}

function formatIdentifier(value) {
  return String(value ?? "—")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
