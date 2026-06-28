
/**
 * Calm Renderer
 *
 * Renders:
 * - Calm tool input form
 * - Panic Check results
 * - Calm loss and recovery results
 * - legacy Stress conversion results
 *
 * This file contains markup only.
 * It does not roll dice, resolve rules, or mutate application state.
 */

import {
  CALM_RULES,
  CALM_LOSS_BANDS,
  CALM_RECOVERY_BANDS
} from "../data/calm.js";

import {
  escapeHtml
} from "../modules/ui-helpers.js";

/* -------------------------------------------------------------------------- */
/* Public Renderers                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Renders the Calm resolver form.
 *
 * @returns {string}
 */
export function renderCalmForm() {
  return `
    <section class="panel calm-tool">
      <header class="panel__header">
        <div>
          <p class="eyebrow">
            Consequences
          </p>

          <h2>Calm</h2>

          <p class="panel__description">
            Resolve Panic Checks, Calm loss, recovery,
            and legacy Stress conversion.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="calm-form">
          ${renderOperationSelector()}

          <section
            class="form-section"
            data-calm-section="shared-state"
          >
            <div class="form-section__heading">
              <h3>Calm State</h3>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label
                  class="form-label"
                  for="calm-current"
                >
                  Current Calm
                </label>

                <input
                  class="input"
                  id="calm-current"
                  name="currentCalm"
                  type="number"
                  min="0"
                  max="999"
                  step="1"
                  value="${CALM_RULES.defaults.startingCalm}"
                  required
                >
              </div>

              <div class="form-field">
                <label
                  class="form-label"
                  for="calm-maximum"
                >
                  Maximum Calm
                </label>

                <input
                  class="input"
                  id="calm-maximum"
                  name="maximumCalm"
                  type="number"
                  min="1"
                  max="999"
                  step="1"
                  value="${CALM_RULES.defaults.maximumCalm}"
                  required
                >
              </div>
            </div>
          </section>

          ${renderPanicCheckFields()}
          ${renderCalmLossFields()}
          ${renderCalmRecoveryFields()}
          ${renderStressConversionFields()}

          <section class="form-section">
            <div class="form-field">
              <label
                class="form-label"
                for="calm-label"
              >
                Result Label
              </label>

              <input
                class="input"
                id="calm-label"
                name="label"
                type="text"
                placeholder="Optional character or event label"
              >
            </div>

            <div class="form-field">
              <label
                class="form-label"
                for="calm-notes"
              >
                Notes
              </label>

              <textarea
                class="textarea"
                id="calm-notes"
                name="notes"
                placeholder="Source of fear, rest conditions, context, or ruling notes"
              ></textarea>
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
              Resolve Calm
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

/**
 * Renders any successful Calm result.
 *
 * Error results are normally handled by the shared error renderer in app.js.
 *
 * @param {object} result
 * @returns {string}
 */
export function renderCalmResult(result) {
  if (!result || typeof result !== "object") {
    return "";
  }

  switch (result.operation) {
    case "panic_check":
      return renderPanicCheckResult(result);

    case "loss":
      return renderCalmChangeResult(result, {
        direction: "loss"
      });

    case "recovery":
      return renderCalmChangeResult(result, {
        direction: "recovery"
      });

    case "stress_conversion":
      return renderStressConversionResult(result);

    default:
      return renderUnknownCalmResult(result);
  }
}

/* -------------------------------------------------------------------------- */
/* Form Sections                                                              */
/* -------------------------------------------------------------------------- */

function renderOperationSelector() {
  return `
    <section class="form-section">
      <div class="form-section__heading">
        <h3>Operation</h3>
      </div>

      <div
        class="segmented-control segmented-control--three calm-operation-control"
      >
        <input
          id="calm-operation-panic"
          name="calmOperation"
          type="radio"
          value="panic_check"
          checked
        >

        <label for="calm-operation-panic">
          Panic Check
        </label>

        <input
          id="calm-operation-loss"
          name="calmOperation"
          type="radio"
          value="loss"
        >

        <label for="calm-operation-loss">
          Calm Loss
        </label>

        <input
          id="calm-operation-recovery"
          name="calmOperation"
          type="radio"
          value="recovery"
        >

        <label for="calm-operation-recovery">
          Recovery
        </label>
      </div>

      <div
        class="segmented-control calm-operation-control calm-operation-control--secondary"
      >
        <input
          id="calm-operation-conversion"
          name="calmOperation"
          type="radio"
          value="stress_conversion"
        >

        <label for="calm-operation-conversion">
          Convert Stress
        </label>
      </div>
    </section>
  `;
}

function renderPanicCheckFields() {
  return `
    <section
      class="form-section"
      data-calm-section="panic_check"
    >
      <div class="form-section__heading">
        <h3>Panic Check</h3>
      </div>

      <div class="form-grid">
        <div class="form-field form-field--full">
          <span class="form-label">
            Roll Mode
          </span>

          <div class="segmented-control segmented-control--three">
            <input
              id="calm-roll-normal"
              name="calmRollMode"
              type="radio"
              value="normal"
              checked
            >

            <label for="calm-roll-normal">
              Normal
            </label>

            <input
              id="calm-roll-advantage"
              name="calmRollMode"
              type="radio"
              value="advantage"
            >

            <label for="calm-roll-advantage">
              Advantage
            </label>

            <input
              id="calm-roll-disadvantage"
              name="calmRollMode"
              type="radio"
              value="disadvantage"
            >

            <label for="calm-roll-disadvantage">
              Disadvantage
            </label>
          </div>
        </div>

        <div class="form-field">
          <label
            class="form-label"
            for="calm-manual-roll"
          >
            Manual d100 Roll
          </label>

          <input
            class="input"
            id="calm-manual-roll"
            name="manualRoll"
            type="number"
            min="1"
            max="100"
            step="1"
            placeholder="Roll automatically"
          >

          <p class="form-help">
            Leave blank to roll automatically.
          </p>
        </div>

        <div class="form-field">
          <span class="form-label">
            Resolve Available
          </span>

          <label class="calm-checkbox-row">
            <input
              id="calm-resolve-available"
              name="resolveAvailable"
              type="checkbox"
            >

            <span>
              Player may invoke Resolve after failure
            </span>
          </label>
        </div>

        <div
          class="form-field"
          id="calm-resolve-amount-field"
          hidden
        >
          <label
            class="form-label"
            for="calm-resolve-amount"
          >
            Resolve Available
          </label>

          <input
            class="input"
            id="calm-resolve-amount"
            name="resolveAmount"
            type="number"
            min="1"
            max="100"
            step="1"
            value="1"
          >

          <p class="form-help">
            This exposes intervention options. Resolve is not
            spent automatically.
          </p>
        </div>
      </div>

      <div class="alert alert--warning calm-critical-note">
        Matching percentile digits are active criticals for Calm:
        a critical success restores Calm, while a critical failure
        adds further Calm loss.
      </div>
    </section>
  `;
}

function renderCalmLossFields() {
  return `
    <section
      class="form-section"
      data-calm-section="loss"
      hidden
    >
      <div class="form-section__heading">
        <h3>Calm Loss</h3>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label
            class="form-label"
            for="calm-loss-band"
          >
            Guideline Band
          </label>

          <select
            class="select"
            id="calm-loss-band"
            name="lossBandId"
          >
            <option value="">
              Custom amount
            </option>

            ${CALM_LOSS_BANDS
              .map(renderLossBandOption)
              .join("")}
          </select>
        </div>

        <div class="form-field">
          <label
            class="form-label"
            for="calm-loss-amount"
          >
            Custom Amount
          </label>

          <input
            class="input"
            id="calm-loss-amount"
            name="lossAmount"
            type="text"
            placeholder="Example: 1d10 or 5"
          >

          <p class="form-help">
            Used when no guideline band is selected.
          </p>
        </div>
      </div>

      <div
        class="calm-band-reference"
        id="calm-loss-band-reference"
      >
        ${renderCalmLossReference()}
      </div>
    </section>
  `;
}

function renderCalmRecoveryFields() {
  return `
    <section
      class="form-section"
      data-calm-section="recovery"
      hidden
    >
      <div class="form-section__heading">
        <h3>Calm Recovery</h3>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label
            class="form-label"
            for="calm-recovery-band"
          >
            Recovery Band
          </label>

          <select
            class="select"
            id="calm-recovery-band"
            name="recoveryBandId"
          >
            <option value="">
              Custom amount
            </option>

            ${CALM_RECOVERY_BANDS
              .map(renderRecoveryBandOption)
              .join("")}
          </select>
        </div>

        <div class="form-field">
          <label
            class="form-label"
            for="calm-recovery-amount"
          >
            Custom Amount
          </label>

          <input
            class="input"
            id="calm-recovery-amount"
            name="recoveryAmount"
            type="text"
            placeholder="Example: 1d5 or 3"
          >

          <p class="form-help">
            Recovery cannot raise Current Calm above Maximum Calm.
          </p>
        </div>
      </div>

      <div
        class="calm-band-reference"
        id="calm-recovery-band-reference"
      >
        ${renderCalmRecoveryReference()}
      </div>
    </section>
  `;
}

function renderStressConversionFields() {
  return `
    <section
      class="form-section"
      data-calm-section="stress_conversion"
      hidden
    >
      <div class="form-section__heading">
        <h3>Legacy Stress Conversion</h3>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label
            class="form-label"
            for="calm-stress"
          >
            Current Stress
          </label>

          <input
            class="input"
            id="calm-stress"
            name="stress"
            type="number"
            min="0"
            step="1"
            value="0"
          >
        </div>

        <div class="form-field">
          <span class="form-label">
            Formula
          </span>

          <div class="calm-formula-display">
            Calm = 85 − (Stress × 3)
          </div>
        </div>
      </div>
    </section>
  `;
}

/* -------------------------------------------------------------------------- */
/* Result Renderers                                                           */
/* -------------------------------------------------------------------------- */

function renderPanicCheckResult(result) {
  const success =
    result.status === "success";

  const critical =
    result.outcome === "critical_success" ||
    result.outcome === "critical_failure";

  const cardClass = success
    ? "result-card--success"
    : "result-card--failure";

  return `
    <article class="result-card ${cardClass}">
      ${renderResultHeader(result, {
        statusLabel: formatOutcomeLabel(result.outcome)
      })}

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(result.ruling ?? "")}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "Calm",
            result.roll?.target ?? "—"
          )}

          ${renderResultStat(
            "Roll",
            formatRollResult(result.roll)
          )}

          ${renderResultStat(
            "Outcome",
            formatOutcomeLabel(result.outcome)
          )}
        </div>

        ${critical
          ? renderCriticalCallout(result)
          : ""
        }

        ${result.panicEffect
          ? renderPanicEffect(result.panicEffect)
          : ""
        }

        ${renderCalmStateChange(result)}

        ${renderCalmChangeComponents(
          result.calmChange?.components
        )}

        ${renderResolveIntervention(
          result.resolveIntervention
        )}

        ${renderResultNotes(
          result.input?.notes
        )}
      </div>
    </article>
  `;
}

function renderCalmChangeResult(
  result,
  {
    direction
  }
) {
  const isRecovery =
    direction === "recovery";

  const statusClass =
    isRecovery
      ? "result-card--success"
      : "result-card--failure";

  const displayedAmount =
    isRecovery
      ? result.amount?.appliedTotal ??
        result.stateDelta?.calm ??
        0
      : Math.abs(
          result.stateDelta?.calm ??
          result.amount?.total ??
          0
        );

  return `
    <article class="result-card ${statusClass}">
      ${renderResultHeader(result, {
        statusLabel:
          isRecovery
            ? "Recovery"
            : "Calm Loss"
      })}

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(result.ruling ?? "")}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            isRecovery
              ? "Recovered"
              : "Lost",
            displayedAmount
          )}

          ${renderResultStat(
            "Previous Calm",
            result.previousState?.currentCalm ?? "—"
          )}

          ${renderResultStat(
            "New Calm",
            result.proposedState?.currentCalm ?? "—"
          )}
        </div>

        ${renderBandDetails(result.band)}

        ${renderAmountDetails(result.amount)}

        ${renderStateCommitNotice()}
      </div>
    </article>
  `;
}

function renderStressConversionResult(result) {
  return `
    <article class="result-card result-card--success">
      ${renderResultHeader(result, {
        statusLabel: "Converted"
      })}

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(result.ruling ?? "")}
        </p>

        <div class="result-grid">
          ${renderResultStat(
            "Stress",
            result.input?.stress ?? "—"
          )}

          ${renderResultStat(
            "Current Calm",
            result.result?.currentCalm ?? "—"
          )}

          ${renderResultStat(
            "Maximum Calm",
            result.result?.maximumCalm ?? "—"
          )}
        </div>

        <div class="alert">
          Conversion creates a proposed Calm value only.
          It does not alter a character record automatically.
        </div>
      </div>
    </article>
  `;
}

function renderUnknownCalmResult(result) {
  return `
    <article class="result-card result-card--error">
      ${renderResultHeader(result, {
        statusLabel: "Unknown"
      })}

      <div class="result-card__body">
        <p class="result-card__ruling">
          The Calm result used an unsupported operation.
        </p>
      </div>
    </article>
  `;
}

/* -------------------------------------------------------------------------- */
/* Result Components                                                          */
/* -------------------------------------------------------------------------- */

function renderResultHeader(
  result,
  {
    statusLabel
  }
) {
  return `
    <header class="result-card__header">
      <div>
        <h2 class="result-card__title">
          ${escapeHtml(result.label ?? "Calm")}
        </h2>

        <p class="result-card__summary">
          ${escapeHtml(result.summary ?? "")}
        </p>
      </div>

      <span class="result-card__status">
        ${escapeHtml(statusLabel)}
      </span>
    </header>
  `;
}

function renderResultStat(label, value) {
  return `
    <div class="result-stat">
      <span class="result-stat__label">
        ${escapeHtml(label)}
      </span>

      <strong class="result-stat__value">
        ${escapeHtml(String(value))}
      </strong>
    </div>
  `;
}

function renderPanicEffect(effect) {
  return `
    <section class="calm-effect">
      <div class="calm-effect__heading">
        <div>
          <span class="calm-effect__range">
            ${escapeHtml(formatRollRange(effect))}
          </span>

          <h3>
            ${escapeHtml(effect.label ?? "Panic Effect")}
          </h3>
        </div>

        <span class="calm-effect__category">
          ${escapeHtml(
            formatIdentifier(effect.category)
          )}
        </span>
      </div>

      <p>
        ${escapeHtml(effect.effect ?? "")}
      </p>

      ${renderPanicEffectMetadata(effect)}
    </section>
  `;
}

function renderPanicEffectMetadata(effect) {
  const rows = [];

  addMetadataRow(
    rows,
    "Calm Loss",
    effect.calmLoss
  );

  addMetadataRow(
    rows,
    "Duration",
    effect.duration
  );

  addMetadataRow(
    rows,
    "Fatal Timer",
    effect.fatalTimer
  );

  addMetadataRow(
    rows,
    "Required Check",
    effect.requiredCheck
  );

  addMetadataRow(
    rows,
    "Recovery Check",
    effect.recoveryCheck
  );

  addMetadataRow(
    rows,
    "Condition",
    effect.condition
  );

  addMetadataRow(
    rows,
    "Trigger",
    effect.trigger
      ? formatIdentifier(effect.trigger)
      : null
  );

  if (rows.length === 0) {
    return "";
  }

  return `
    <dl class="calm-effect__metadata">
      ${rows.join("")}
    </dl>
  `;
}

function addMetadataRow(
  rows,
  label,
  value
) {
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

function renderCalmStateChange(result) {
  if (
    !result.previousState ||
    !result.proposedState
  ) {
    return "";
  }

  const calmDelta =
    result.stateDelta?.calm ?? 0;

  const maximumDelta =
    result.stateDelta?.maximumCalm ?? 0;

  if (
    calmDelta === 0 &&
    maximumDelta === 0
  ) {
    return "";
  }

  return `
    <section class="calm-state-change">
      <div class="form-section__heading">
        <h3>Proposed State</h3>
      </div>

      <div class="result-grid">
        ${renderResultStat(
          "Previous Calm",
          result.previousState.currentCalm
        )}

        ${renderResultStat(
          "New Calm",
          result.proposedState.currentCalm
        )}

        ${renderResultStat(
          "Change",
          formatSignedNumber(calmDelta)
        )}
      </div>

      ${maximumDelta !== 0
        ? `
          <p class="form-help">
            Maximum Calm changes by
            ${escapeHtml(formatSignedNumber(maximumDelta))}.
          </p>
        `
        : ""
      }

      ${renderStateCommitNotice()}
    </section>
  `;
}

function renderCalmChangeComponents(components) {
  if (
    !Array.isArray(components) ||
    components.length === 0
  ) {
    return "";
  }

  return `
    <section class="calm-calculation">
      <div class="form-section__heading">
        <h3>Calm Calculation</h3>
      </div>

      <ul class="calculation-list">
        ${components
          .map((component) => {
            return `
              <li class="calculation-row">
                <span class="calculation-row__label">
                  ${escapeHtml(component.label ?? "Calm Change")}
                </span>

                <strong class="calculation-row__value">
                  ${escapeHtml(
                    formatSignedNumber(component.amount ?? 0)
                  )}
                </strong>
              </li>
            `;
          })
          .join("")}
      </ul>
    </section>
  `;
}

function renderCriticalCallout(result) {
  if (result.outcome === "critical_success") {
    return `
      <div class="alert calm-critical calm-critical--success">
        Matching digits produced a Critical Success.
        No Panic Effect occurs and Calm recovery is rolled.
      </div>
    `;
  }

  if (result.outcome === "critical_failure") {
    return `
      <div class="alert alert--warning calm-critical calm-critical--failure">
        Matching digits produced a Critical Failure.
        Apply the Panic Effect and the additional Calm loss.
      </div>
    `;
  }

  return "";
}

function renderResolveIntervention(intervention) {
  if (
    !intervention ||
    intervention.available !== true ||
    !Array.isArray(intervention.methods) ||
    intervention.methods.length === 0
  ) {
    return "";
  }

  return `
    <section class="calm-resolve-options">
      <div class="form-section__heading">
        <h3>Resolve Available</h3>
      </div>

      <div class="alert">
        The Panic Check has already resolved.
        The player may now choose whether to spend Resolve.
      </div>

      <div class="calm-resolve-options__list">
        ${intervention.methods
          .map(renderResolveMethod)
          .join("")}
      </div>
    </section>
  `;
}

function renderResolveMethod(method) {
  const shiftedEffect =
    method.proposedPanicEffect;

  return `
    <article class="calm-resolve-option">
      <div>
        <h4>
          ${escapeHtml(method.label ?? "Resolve Option")}
        </h4>

        <p>
          ${escapeHtml(method.description ?? "")}
        </p>

        ${method.id === "table_shift"
          ? `
            <p class="form-help">
              Table result:
              ${escapeHtml(String(method.originalTableRoll))}
              →
              ${escapeHtml(String(method.proposedTableRoll))}
              ${shiftedEffect
                ? `(${escapeHtml(shiftedEffect.label)})`
                : ""
              }
            </p>
          `
          : ""
        }
      </div>

      <span class="calm-resolve-option__cost">
        Cost:
        ${escapeHtml(String(method.resolveCost ?? 1))}
      </span>
    </article>
  `;
}

function renderBandDetails(band) {
  if (!band) {
    return "";
  }

  return `
    <section class="calm-band-result">
      <div class="form-section__heading">
        <h3>
          ${escapeHtml(band.label ?? "Guideline Band")}
        </h3>
      </div>

      ${band.description
        ? `
          <p>
            ${escapeHtml(band.description)}
          </p>
        `
        : ""
      }

      ${Array.isArray(band.examples) &&
        band.examples.length > 0
        ? `
          <p class="form-help">
            Examples:
            ${escapeHtml(band.examples.join(", "))}
          </p>
        `
        : ""
      }
    </section>
  `;
}

function renderAmountDetails(amount) {
  if (!amount) {
    return "";
  }

  const rolls =
    amount.rolls ??
    [];

  const rolledTotal =
    amount.rolledTotal ??
    amount.total ??
    amount.appliedTotal;

  if (
    !Array.isArray(rolls) ||
    rolls.length === 0
  ) {
    return "";
  }

  return `
    <section class="calm-calculation">
      <div class="form-section__heading">
        <h3>Roll</h3>
      </div>

      <ul class="calculation-list">
        <li class="calculation-row">
          <span class="calculation-row__label">
            Dice
          </span>

          <strong class="calculation-row__value">
            ${escapeHtml(rolls.join(" + "))}
          </strong>
        </li>

        <li class="calculation-row">
          <span class="calculation-row__label">
            Total
          </span>

          <strong class="calculation-row__value">
            ${escapeHtml(String(rolledTotal ?? 0))}
          </strong>
        </li>
      </ul>
    </section>
  `;
}

function renderStateCommitNotice() {
  return `
    <div class="alert">
      This is a proposed state change.
      No character record is altered automatically.
    </div>
  `;
}

function renderResultNotes(notes) {
  if (!notes) {
    return "";
  }

  return `
    <section class="calm-result-notes">
      <div class="form-section__heading">
        <h3>Notes</h3>
      </div>

      <p>
        ${escapeHtml(notes)}
      </p>
    </section>
  `;
}

/* -------------------------------------------------------------------------- */
/* Reference Components                                                       */
/* -------------------------------------------------------------------------- */

function renderLossBandOption(band) {
  return `
    <option value="${escapeHtml(band.id)}">
      ${escapeHtml(band.label)}
      — ${escapeHtml(String(band.calmLoss))}
    </option>
  `;
}

function renderRecoveryBandOption(band) {
  return `
    <option value="${escapeHtml(band.id)}">
      ${escapeHtml(band.label)}
      — ${escapeHtml(String(band.calmRecovery))}
    </option>
  `;
}

function renderCalmLossReference() {
  return `
    <div class="calm-band-grid">
      ${CALM_LOSS_BANDS
        .map((band) => {
          return `
            <article class="calm-band-card">
              <span class="calm-band-card__value">
                ${escapeHtml(String(band.calmLoss))}
              </span>

              <strong>
                ${escapeHtml(band.label)}
              </strong>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCalmRecoveryReference() {
  return `
    <div class="calm-band-grid">
      ${CALM_RECOVERY_BANDS
        .map((band) => {
          return `
            <article class="calm-band-card">
              <span class="calm-band-card__value">
                ${escapeHtml(String(band.calmRecovery))}
              </span>

              <strong>
                ${escapeHtml(band.label)}
              </strong>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

/* -------------------------------------------------------------------------- */
/* Formatting Helpers                                                         */
/* -------------------------------------------------------------------------- */

function formatRollResult(roll) {
  if (!roll) {
    return "—";
  }

  if (
    Array.isArray(roll.rolls) &&
    roll.rolls.length > 1
  ) {
    return `${roll.finalRoll} (${roll.rolls.join(", ")})`;
  }

  return String(
    roll.finalRoll ?? "—"
  );
}

function formatRollRange(effect) {
  if (
    effect.rollMin === effect.rollMax
  ) {
    return `Roll ${effect.rollMin}`;
  }

  return `Roll ${effect.rollMin}–${effect.rollMax}`;
}

function formatOutcomeLabel(outcome) {
  const labels = {
    critical_success: "Critical Success",
    success: "Success",
    failure: "Failure",
    critical_failure: "Critical Failure"
  };

  return (
    labels[outcome] ??
    formatIdentifier(outcome)
  );
}

function formatIdentifier(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatSignedNumber(value) {
  const numericValue =
    Number(value);

  if (!Number.isFinite(numericValue)) {
    return String(value ?? 0);
  }

  if (numericValue > 0) {
    return `+${numericValue}`;
  }

  return String(numericValue);
}

