import {
  escapeHtml,
  formatNumber,
  formatSignedNumber
} from "../modules/ui-helpers.js";

import {
  renderCalculationRow,
  renderResultStat
} from "./shared-renderers.js";

import {
  renderSkillPresetOptions
} from "./skill-preset-renderer.js";

export function renderStandardTestForm({
  skills = []
} = {}) {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Percentile Resolution</p>
          <h2>Standard Test</h2>

          <p class="panel__description">
            Resolve a Save or an Action against a final
            percentile target. Equal to or under succeeds.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="standard-test-form" novalidate>
          <section class="form-section">
            <div class="form-grid">
              <div class="form-field form-field--full">
                <label
                  class="form-label"
                  for="test-label"
                >
                  Test Label
                </label>

                <input
                  id="test-label"
                  class="input"
                  name="label"
                  type="text"
                  placeholder="Override Reactor Lockout"
                >
              </div>

              <div class="form-field form-field--full">
                <span class="form-label">
                  Test Type
                </span>

                <div class="segmented-control">
                  <input
                    id="test-type-action"
                    name="testType"
                    type="radio"
                    value="action"
                    checked
                  >

                  <label for="test-type-action">
                    Action
                  </label>

                  <input
                    id="test-type-save"
                    name="testType"
                    type="radio"
                    value="save"
                  >

                  <label for="test-type-save">
                    Save
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-grid">
              <div class="form-field">
                <label
                  class="form-label"
                  for="base-label"
                >
                  Base Label
                </label>

                <input
                  id="base-label"
                  class="input"
                  name="baseLabel"
                  type="text"
                  value="Stat"
                  placeholder="Intellect"
                  required
                >
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="base-value"
                >
                  Base Value
                </label>

                <input
                  id="base-value"
                  class="input"
                  name="baseValue"
                  type="number"
                  min="0"
                  max="99"
                  step="1"
                  placeholder="35"
                  required
                >
              </div>

              <div
                id="skill-preset-field"
                class="form-field form-field--full"
              >
                <label
                  class="form-label"
                  for="skill-preset"
                >
                  Skill
                </label>

                <select
                  id="skill-preset"
                  class="select"
                  name="skillPreset"
                >
                  ${renderSkillPresetOptions(skills)}
                </select>

                <p class="form-help">
                  Selecting a skill fills its canonical bonus.
                  Use Custom / Manual for campaign-specific skills.
                </p>
              </div>

              <div
                id="skill-label-field"
                class="form-field"
              >
                <label
                  class="form-label"
                  for="skill-label"
                >
                  Skill Label
                </label>

                <input
                  id="skill-label"
                  class="input"
                  name="skillLabel"
                  type="text"
                  placeholder="Computers"
                >
              </div>

              <div
                id="skill-value-field"
                class="form-field"
              >
                <label
                  class="form-label"
                  for="skill-value"
                >
                  Skill Bonus
                </label>

                <input
                  id="skill-value"
                  class="input"
                  name="skillValue"
                  type="number"
                  step="1"
                  value="0"
                >
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <div>
                <h3>Situational Modifiers</h3>

                <p class="form-help">
                  Add positive or negative modifiers.
                </p>
              </div>

              <button
                id="add-modifier"
                class="button button--secondary"
                type="button"
              >
                Add Modifier
              </button>
            </div>

            <div
              id="modifier-list"
              class="modifier-list"
            ></div>
          </section>

          <section class="form-section">
            <div class="form-grid">
              <div class="form-field form-field--full">
                <span class="form-label">
                  Roll Mode
                </span>

                <div class="segmented-control segmented-control--three">
                  <input
                    id="roll-mode-normal"
                    name="rollMode"
                    type="radio"
                    value="normal"
                    checked
                  >

                  <label for="roll-mode-normal">
                    Normal
                  </label>

                  <input
                    id="roll-mode-advantage"
                    name="rollMode"
                    type="radio"
                    value="advantage"
                  >

                  <label for="roll-mode-advantage">
                    Advantage
                  </label>

                  <input
                    id="roll-mode-disadvantage"
                    name="rollMode"
                    type="radio"
                    value="disadvantage"
                  >

                  <label for="roll-mode-disadvantage">
                    Disadvantage
                  </label>
                </div>
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="manual-roll"
                >
                  Manual Final Roll
                </label>

                <input
                  id="manual-roll"
                  class="input"
                  name="manualRoll"
                  type="number"
                  min="0"
                  max="99"
                  step="1"
                  placeholder="Leave blank to roll"
                >

                <p class="form-help">
                  A manual value is treated as the already
                  selected final percentile result.
                </p>
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="test-notes"
                >
                  Notes
                </label>

                <textarea
                  id="test-notes"
                  class="textarea"
                  name="notes"
                  placeholder="Optional Warden context"
                ></textarea>
              </div>
            </div>
          </section>

          <div
            id="standard-test-warning"
            class="alert alert--warning"
            hidden
          ></div>

          <div class="form-actions">
            <button
              id="reset-standard-test"
              class="button button--secondary"
              type="reset"
            >
              Reset
            </button>

            <button
              class="button button--primary"
              type="submit"
            >
              Resolve Test
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderStandardTestResult(result) {
  const metadata = result.metadata ?? {};

  return `
    <article
      class="result-card result-card--${escapeHtml(
        result.status
      )}"
    >
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(
              metadata.degreeLabel ?? "Result"
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
          ${escapeHtml(result.status)}
        </span>
      </header>

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(result.ruling)}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "Target",
            formatNumber(metadata.finalTarget)
          )}

          ${renderResultStat(
            "Roll",
            result.roll?.selected?.display ??
              formatNumber(
                result.roll?.selected?.total
              )
          )}

          ${renderResultStat(
            "Margin",
            formatSignedNumber(metadata.margin)
          )}
        </div>

        <section>
          <h3>Calculation</h3>

          <ul class="calculation-list">
            ${(result.calculation ?? [])
              .map(renderCalculationRow)
              .join("")}
          </ul>
        </section>

        ${
          result.consequence
            ? `
              <div class="alert alert--warning">
                ${escapeHtml(result.consequence)}
              </div>
            `
            : ""
        }
      </div>
    </article>
  `;
}
