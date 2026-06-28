import {
  escapeHtml
} from "../modules/ui-helpers.js";

import {
  renderResultStat
} from "./shared-renderers.js";

import {
  renderEffects
} from "./effect-renderer.js";

export function renderTacForm() {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Personnel Armor Failure</p>
          <h2>Personnel TAC</h2>

          <p class="panel__description">
            Resolve personnel armor degradation, subsystem failure,
            Seal Warning escalation, and hostile-environment exposure.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="tac-form" novalidate>
          <section class="form-section">
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="tac-count">
                  TAC Number
                </label>

                <select id="tac-count" class="select">
                  <option value="1">First TAC</option>
                  <option value="2">Second TAC</option>
                  <option value="3">Third or Later TAC</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="tac-current-armor-state">
                  Current Armor State
                </label>

                <select id="tac-current-armor-state" class="select">
                  <option value="intact">Intact</option>
                  <option value="light">Light Damage</option>
                  <option value="moderate">Moderate Damage</option>
                  <option value="severe">Severe Damage</option>
                  <option value="broken">Broken</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="tac-original-av">
                  Original AV
                </label>

                <input
                  id="tac-original-av"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="10"
                >
              </div>

              <div class="form-field">
                <label class="form-label" for="tac-severity-shift">
                  General Severity Shift
                </label>

                <input
                  id="tac-severity-shift"
                  class="input"
                  type="number"
                  min="-3"
                  max="3"
                  step="1"
                  value="0"
                >
              </div>

              <div class="form-field">
                <label class="form-label" for="tac-forced-severity">
                  Forced Severity
                </label>

                <select id="tac-forced-severity" class="select">
                  <option value="">Roll Normally</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="complete">Complete Failure</option>
                </select>
              </div>

              <div class="form-field form-field--full">
                <label>
                  <input id="tac-dampening-active" type="checkbox">
                  TAC Dampening is active
                </label>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <h3>Failure Category</h3>
            </div>

            <div class="form-grid">
              <div class="form-field form-field--full">
                <span class="form-label">Category Mode</span>

                <div class="segmented-control">
                  <input
                    id="tac-category-random"
                    name="tacCategoryMode"
                    type="radio"
                    value="random"
                    checked
                  >

                  <label for="tac-category-random">
                    Random
                  </label>

                  <input
                    id="tac-category-preferred"
                    name="tacCategoryMode"
                    type="radio"
                    value="preferred"
                  >

                  <label for="tac-category-preferred">
                    Select Preferred
                  </label>
                </div>
              </div>

              <div
                class="form-field"
                id="tac-preferred-category-field"
                hidden
              >
                <label class="form-label" for="tac-preferred-category">
                  Preferred Category
                </label>

                <select id="tac-preferred-category" class="select">
                  <option value="electronics">Electronics</option>
                  <option value="mobility">Mobility</option>
                  <option value="structural">Structural</option>
                  <option value="seal_life_support">
                    Seal / Life Support
                  </option>
                </select>
              </div>

              <div
                class="form-field"
                id="tac-forced-roll-field"
              >
                <label class="form-label" for="tac-forced-roll">
                  Manual d4 Roll
                </label>

                <input
                  id="tac-forced-roll"
                  class="input"
                  type="number"
                  min="1"
                  max="4"
                  step="1"
                  placeholder="Roll automatically"
                >
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <h3>Current Conditions</h3>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label>
                  <input
                    id="tac-seal-warning-active"
                    type="checkbox"
                  >
                  Seal Warning is active
                </label>

                <p class="form-help">
                  The next Seal / Life Support TAC is shifted up one severity,
                  then the warning is consumed.
                </p>
              </div>

              <div class="form-field">
                <label>
                  <input
                    id="tac-hostile-environment"
                    type="checkbox"
                  >
                  Environment is hostile
                </label>

                <p class="form-help">
                  Seal collapse or complete armor failure causes immediate
                  exposure only when this is active.
                </p>
              </div>

              <div class="form-field form-field--full">
                <label class="form-label" for="tac-label">
                  Result Label
                </label>

                <input
                  id="tac-label"
                  class="input"
                  type="text"
                  placeholder="Optional wearer or armor label"
                >
              </div>
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
              Resolve Personnel TAC
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderTacResult(result) {
  const tac = result.metadata?.tac ?? {};
  const outcome = tac.outcome ?? {};

  return `
    <article class="result-card ${getCardClass(tac)}">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(formatIdentifier(tac.category))}
          </p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label)}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(outcome.label ?? result.summary)}
          </p>
        </div>

        <span class="result-card__status">
          ${escapeHtml(formatIdentifier(tac.finalSeverity))}
        </span>
      </header>

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(outcome.text ?? result.ruling)}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "TAC Number",
            tac.tacCount ?? "—"
          )}

          ${renderResultStat(
            "Category",
            formatIdentifier(tac.category)
          )}

          ${renderResultStat(
            "Category Source",
            tac.categoryMode === "preferred"
              ? "Selected"
              : tac.categoryMode === "automatic"
                ? "Automatic"
                : `d4: ${tac.categoryRoll ?? "—"}`
          )}

          ${renderResultStat(
            "Armor State",
            `${formatIdentifier(tac.currentArmorState)}
            → ${formatIdentifier(tac.nextArmorState)}`
          )}

          ${renderResultStat(
            "Effective AV",
            `${tac.previousEffectiveAv ?? "—"}
            → ${tac.effectiveAv ?? "—"}`
          )}

          ${renderResultStat(
            "Exposure",
            tac.exposureRequired
              ? "Immediate"
              : "No immediate exposure"
          )}
        </div>

        ${renderSeverityPath(tac)}
        ${renderSealWarning(tac)}
        ${renderSystemChanges(tac.systemChanges)}
        ${renderEffects(outcome.effects, {
          heading: "TAC Effects"
        })}

        ${tac.brokenState
          ? renderEffects(tac.brokenState, {
              heading: "Broken Armor State"
            })
          : ""
        }
      </div>
    </article>
  `;
}

function renderSeverityPath(tac) {
  const rows = [
    ["Rolled", tac.rolledSeverity],
    ["After General Shift", tac.shiftedSeverity],
    ["After TAC Dampening", tac.dampenedSeverity],
    ["Final", tac.finalSeverity],
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

function renderSealWarning(tac) {
  if (!tac.sealWarningActive) {
    return "";
  }

  return `
    <div class="alert ${
      tac.sealWarningApplied
        ? "alert--warning"
        : ""
    }">
      ${
        tac.sealWarningApplied
          ? "Seal Warning applied, increased this Seal / Life Support result by one severity, and is now consumed."
          : "Seal Warning remains active because this TAC did not target Seal / Life Support."
      }
    </div>
  `;
}

function renderSystemChanges(changes = {}) {
  if (
    !changes.disableAllArmorSystems &&
    !changes.disabled?.length &&
    !changes.suppressed?.length
  ) {
    return "";
  }

  return `
    <section class="form-section">
      <h3>Armor System Changes</h3>

      ${changes.disableAllArmorSystems
        ? `
          <div class="alert alert--warning">
            All armor-derived systems are offline.
          </div>
        `
        : ""
      }

      ${changes.disabled?.length
        ? `
          <p>
            <strong>Disabled:</strong>
            ${escapeHtml(
              changes.disabled
                .map(formatIdentifier)
                .join(", ")
            )}
          </p>
        `
        : ""
      }

      ${changes.suppressed?.length
        ? `
          <p>
            <strong>Temporarily suppressed:</strong>
            ${escapeHtml(
              changes.suppressed
                .map(formatIdentifier)
                .join(", ")
            )}
          </p>
        `
        : ""
      }
    </section>
  `;
}

function getCardClass(tac) {
  if (
    tac.finalSeverity === "complete" ||
    tac.exposureRequired
  ) {
    return "result-card--failure";
  }

  return "";
}

function formatIdentifier(value) {
  return String(value ?? "—")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
