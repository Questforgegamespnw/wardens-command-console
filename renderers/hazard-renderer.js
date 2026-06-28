import {
  escapeHtml
} from "../modules/ui-helpers.js";

import {
  renderResultStat
} from "./shared-renderers.js";

import {
  renderEffects,
  renderHandoffs
} from "./effect-renderer.js";

export function renderHazardForm({
  trackers = [],
  selectedTrackerId = null
} = {}) {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Environmental Resolution</p>
          <h2>Hazards</h2>

          <p class="panel__description">
            Create or advance temporary hazard trackers.
            Protection may be binary, timed, or both.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="hazard-form" novalidate>
          <section class="form-section">
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="hazard-operation">
                  Operation
                </label>

                <select id="hazard-operation" class="select">
                  <option value="create">Create Tracker</option>
                  <option
                    value="advance"
                    ${trackers.length === 0 ? "disabled" : ""}
                  >
                    Advance Tracker
                  </option>
                </select>
              </div>

              <div
                class="form-field"
                data-hazard-operation-section="advance"
                hidden
              >
                <label class="form-label" for="hazard-tracker-id">
                  Active Tracker
                </label>

                <select id="hazard-tracker-id" class="select">
                  ${trackers.length
                    ? trackers
                        .map(
                          (item) => `
                            <option
                              value="${escapeHtml(item.id)}"
                              ${
                                item.id === selectedTrackerId
                                  ? "selected"
                                  : ""
                              }
                            >
                              ${escapeHtml(item.label)}
                            </option>
                          `
                        )
                        .join("")
                    : `
                      <option value="">
                        No active trackers
                      </option>
                    `
                  }
                </select>
              </div>

              <div
                class="form-field"
                data-hazard-operation-section="create"
              >
                <label class="form-label" for="hazard-type">
                  Hazard Type
                </label>

                <select id="hazard-type" class="select">
                  <option value="air_loss">Air Loss</option>
                  <option value="vacuum">Vacuum</option>
                  <option value="personnel_radiation">
                    Personnel Radiation
                  </option>
                  <option value="heat">Heat</option>
                  <option value="cold">Cold</option>
                  <option value="toxin">Toxin</option>
                  <option value="ship_radiation">
                    Ship Radiation
                  </option>
                </select>
              </div>

              <div
                class="form-field form-field--full"
                data-hazard-operation-section="create"
              >
                <label class="form-label" for="hazard-label">
                  Tracker Label
                </label>

                <input
                  id="hazard-label"
                  class="input"
                  type="text"
                  placeholder="Optional character, room, or ship label"
                >
              </div>
            </div>
          </section>

          <section
            class="form-section"
            data-hazard-create-section="shared"
          >
            <div class="form-section__heading">
              <h3>Protection</h3>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label>
                  <input
                    id="hazard-protection-enabled"
                    type="checkbox"
                  >
                  Meaningful protection applies
                </label>
              </div>

              <div class="form-field">
                <label>
                  <input
                    id="hazard-protection-effective"
                    type="checkbox"
                    checked
                  >
                  Protection is effective
                </label>
              </div>

              <div class="form-field">
                <label>
                  <input
                    id="hazard-protection-timed"
                    type="checkbox"
                  >
                  Protection has a timer
                </label>
              </div>

              <div
                class="form-field"
                id="hazard-protection-source-field"
                hidden
              >
                <label class="form-label" for="hazard-protection-source">
                  Protection Source
                </label>

                <input
                  id="hazard-protection-source"
                  class="input"
                  type="text"
                  placeholder="Sealed suit"
                >
              </div>

              <div
                class="form-field"
                id="hazard-protection-remaining-field"
                hidden
              >
                <label class="form-label" for="hazard-protection-remaining">
                  Remaining
                </label>

                <input
                  id="hazard-protection-remaining"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="10"
                >
              </div>

              <div
                class="form-field"
                id="hazard-protection-unit-field"
                hidden
              >
                <label class="form-label" for="hazard-protection-unit">
                  Unit
                </label>

                <select id="hazard-protection-unit" class="select">
                  <option value="rounds">Rounds</option>
                  <option value="minutes" selected>Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="intervals">Intervals</option>
                </select>
              </div>
            </div>
          </section>

          ${renderAirLossFields()}
          ${renderVacuumFields()}
          ${renderRadiationFields()}
          ${renderThermalFields()}
          ${renderToxinFields()}
          ${renderShipRadiationFields()}
          ${renderAdvanceFields()}

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
              Resolve Hazard
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderHazardResult(result) {
  const metadata = result.metadata ?? {};
  const tracker = metadata.tracker ?? {};
  const consequences = metadata.consequences ?? {};
  const stage =
    consequences.stage ??
    consequences.currentStage ??
    null;

  return `
    <article class="result-card ${statusClass(result.status)}">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(
              formatIdentifier(
                tracker.type ?? metadata.operation ?? "hazard"
              )
            )}
          </p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label)}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(result.summary)}
          </p>
        </div>

        <span class="result-card__status">
          ${escapeHtml(
            formatIdentifier(
              tracker.status ?? result.status
            )
          )}
        </span>
      </header>

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(result.ruling)}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "Hazard",
            formatIdentifier(
              tracker.hazardId ?? tracker.type
            )
          )}

          ${renderResultStat(
            "Status",
            formatIdentifier(tracker.status)
          )}

          ${renderResultStat(
            "Stage",
            formatIdentifier(
              tracker.stageId ?? "—"
            )
          )}
        </div>

        ${renderProtection(tracker.protection)}
        ${renderBreathingSupply(tracker.breathingSupply)}
        ${renderConsequences(consequences)}
        ${stage
          ? renderEffects(stage.effects, {
              heading: `${stage.label ?? "Stage"} Effects`
            })
          : ""
        }
        ${renderHandoffs(metadata.handoffs)}
      </div>
    </article>
  `;
}

export function renderHazardTrackerBoard(
  trackers = []
) {
  if (trackers.length === 0) {
    return `
      <div class="empty-state empty-state--compact">
        No active hazards.
      </div>
    `;
  }

  return `
    <div class="hazard-tracker-board">
      ${trackers
        .map(
          (item) => `
            <button
              class="hazard-tracker-card"
              type="button"
              data-tool-id="hazards"
              data-hazard-tracker-id="${escapeHtml(item.id)}"
            >
              <span class="hazard-tracker-card__topline">
                <span class="hazard-tracker-card__label">
                  ${escapeHtml(item.label)}
                </span>

                <span class="hazard-tracker-card__status">
                  ${escapeHtml(
                    formatIdentifier(item.tracker.status)
                  )}
                </span>
              </span>

              <span class="hazard-tracker-card__summary">
                ${escapeHtml(
                  formatIdentifier(
                    item.tracker.hazardId ??
                    item.tracker.type
                  )
                )}
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAirLossFields() {
  return `
    <section
      class="form-section"
      data-hazard-type-section="air_loss"
    >
      <h3>Air Loss</h3>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="hazard-air-source">
            Source
          </label>

          <select id="hazard-air-source" class="select">
            <option value="low_oxygen">Low Oxygen</option>
            <option value="vacuum">Vacuum</option>
            <option value="drowning">Drowning</option>
            <option value="smoke">Smoke</option>
            <option value="choking">Choking</option>
            <option value="gas_displacement">Gas Displacement</option>
            <option value="respiratory_paralysis">
              Respiratory Paralysis
            </option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-air-interval">
            Check Interval
          </label>

          <input
            id="hazard-air-interval"
            class="input"
            type="text"
            placeholder="Use source default"
          >
        </div>
      </div>
    </section>
  `;
}

function renderVacuumFields() {
  return `
    <section
      class="form-section"
      data-hazard-type-section="vacuum"
      hidden
    >
      <h3>Vacuum</h3>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="hazard-vacuum-protection-state">
            Protection State
          </label>

          <select
            id="hazard-vacuum-protection-state"
            class="select"
          >
            <option value="fully_exposed">Fully Exposed</option>
            <option value="suit_protected">Suit Protected</option>
            <option value="habitat_protected">Habitat Protected</option>
          </select>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-vacuum-seal-intact"
              type="checkbox"
            >
            Seal is intact
          </label>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-vacuum-collision-risk"
              type="checkbox"
            >
            Collision risk
          </label>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-vacuum-explosive"
              type="checkbox"
            >
            Explosive decompression
          </label>
        </div>
      </div>
    </section>
  `;
}

function renderRadiationFields() {
  return `
    <section
      class="form-section"
      data-hazard-type-section="personnel_radiation"
      hidden
    >
      <h3>Personnel Radiation</h3>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="hazard-radiation-intensity">
            Intensity
          </label>

          <select id="hazard-radiation-intensity" class="select">
            <option value="low">Low — 1 hour</option>
            <option value="high">High — 30 minutes</option>
            <option value="extreme">Extreme — 10 minutes</option>
            <option value="catastrophic">Catastrophic — 1 minute</option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-radiation-stage">
            Starting Stage
          </label>

          <select id="hazard-radiation-stage" class="select">
            <option value="protected">Protected</option>
            <option value="irradiated">Irradiated</option>
            <option value="radiation_sickness">Radiation Sickness</option>
            <option value="tissue_degradation">Tissue Degradation</option>
            <option value="organ_failure">Organ Failure</option>
            <option value="fatal">Fatal</option>
          </select>
        </div>
      </div>
    </section>
  `;
}

function renderThermalFields() {
  return `
    <section
      class="form-section"
      data-hazard-type-section="heat"
      hidden
    >
      <h3>Heat Exposure</h3>
      <p class="form-help">
        Uses the heat stage track.
      </p>
    </section>

    <section
      class="form-section"
      data-hazard-type-section="cold"
      hidden
    >
      <h3>Cold / Cryogenic Exposure</h3>
      <p class="form-help">
        Uses the cold stage track, including cryogenic effects.
      </p>
    </section>
  `;
}

function renderToxinFields() {
  return `
    <section
      class="form-section"
      data-hazard-type-section="toxin"
      hidden
    >
      <h3>Toxin Profile</h3>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="hazard-toxin-family">
            Family
          </label>

          <select id="hazard-toxin-family" class="select">
            <option value="irritant">Irritant</option>
            <option value="sedative">Sedative</option>
            <option value="neurotoxin">Neurotoxin</option>
            <option value="respiratory">Respiratory</option>
            <option value="hemotoxin">Hemotoxin</option>
            <option value="corrosive">Corrosive</option>
            <option value="hallucinogen">Hallucinogen</option>
            <option value="biological">Biological</option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-toxin-severity">
            Severity
          </label>

          <select id="hazard-toxin-severity" class="select">
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="deadly">Deadly</option>
          </select>
        </div>

        <div class="form-field form-field--full">
          <label class="form-label" for="hazard-toxin-routes">
            Exposure Routes
          </label>

          <input
            id="hazard-toxin-routes"
            class="input"
            type="text"
            placeholder="inhaled, contact"
          >
        </div>

        <div class="form-field form-field--full">
          <label class="form-label" for="hazard-toxin-effects">
            Effects
          </label>

          <input
            id="hazard-toxin-effects"
            class="input"
            type="text"
            placeholder="air_loss_checks, coughing"
          >
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-toxin-duration">
            Duration
          </label>

          <input
            id="hazard-toxin-duration"
            class="input"
            type="text"
            value="until_treated"
          >
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-toxin-treatment">
            Treatment
          </label>

          <input
            id="hazard-toxin-treatment"
            class="input"
            type="text"
            placeholder="antidote, fresh_air"
          >
        </div>
      </div>
    </section>
  `;
}

function renderShipRadiationFields() {
  return `
    <section
      class="form-section"
      data-hazard-type-section="ship_radiation"
      hidden
    >
      <h3>Ship Radiation</h3>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="hazard-ship-mode">
            Mode
          </label>

          <select id="hazard-ship-mode" class="select">
            <option value="external_irradiation">
              External Irradiation
            </option>
            <option value="internal_contamination">
              Internal Contamination
            </option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-ship-intensity">
            Intensity
          </label>

          <select id="hazard-ship-intensity" class="select">
            <option value="trace">Trace</option>
            <option value="hazardous" selected>Hazardous</option>
            <option value="severe">Severe</option>
            <option value="extreme">Extreme</option>
            <option value="catastrophic">Catastrophic</option>
          </select>
        </div>
      </div>
    </section>
  `;
}

function renderAdvanceFields() {
  return `
    <section
      class="form-section"
      data-hazard-operation-section="advance"
      hidden
    >
      <h3>Advance Tracker</h3>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="hazard-intervals">
            Intervals
          </label>

          <input
            id="hazard-intervals"
            class="input"
            type="number"
            min="0"
            step="1"
            value="1"
          >
        </div>

        <div class="form-field">
          <label class="form-label" for="hazard-save-result">
            Save Result
          </label>

          <select id="hazard-save-result" class="select">
            <option value="">Request Save</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </select>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-leave"
              type="checkbox"
            >
            Leave hazard / exposure ends
          </label>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-breathing-restored"
              type="checkbox"
            >
            Breathing restored
          </label>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-seal-failed"
              type="checkbox"
            >
            Vacuum seal failed
          </label>
        </div>

        <div class="form-field">
          <label>
            <input
              id="hazard-collision-occurred"
              type="checkbox"
            >
            Collision occurred
          </label>
        </div>
      </div>
    </section>
  `;
}

function renderProtection(protection) {
  if (!protection) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>Protection</h3>

      <div class="result-grid">
        ${renderResultStat(
          "Source",
          protection.source ?? "—"
        )}
        ${renderResultStat(
          "Effective",
          protection.effective === false
            ? "No"
            : "Yes"
        )}
        ${renderResultStat(
          "Remaining",
          protection.timer
            ? `${protection.timer.remaining} ${protection.timer.unit ?? ""}`
            : "No timer"
        )}
      </div>
    </section>
  `;
}

function renderBreathingSupply(timer) {
  if (!timer) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>Breathing Supply</h3>

      <div class="result-grid">
        ${renderResultStat(
          "Remaining",
          `${timer.remaining} ${timer.unit ?? ""}`
        )}
      </div>
    </section>
  `;
}

function renderConsequences(consequences) {
  const rows = Object.entries(consequences)
    .filter(
      ([key, value]) =>
        value !== null &&
        value !== undefined &&
        value !== false &&
        key !== "stage" &&
        key !== "currentStage" &&
        key !== "effects"
    );

  if (rows.length === 0) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>Consequences</h3>

      <ul class="calculation-list">
        ${rows
          .map(
            ([key, value]) => `
              <li class="calculation-row">
                <span class="calculation-row__label">
                  ${escapeHtml(formatIdentifier(key))}
                </span>

                <span class="calculation-row__value">
                  ${escapeHtml(formatValue(value))}
                </span>
              </li>
            `
          )
          .join("")}
      </ul>
    </section>
  `;
}

function statusClass(status) {
  if (
    status === "fatal" ||
    status === "failure"
  ) {
    return "result-card--failure";
  }

  if (
    status === "resolved" ||
    status === "stabilized"
  ) {
    return "result-card--success";
  }

  return "";
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map(formatValue).join(", ");
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

  return formatIdentifier(value);
}

function formatIdentifier(value) {
  return String(value ?? "—")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
