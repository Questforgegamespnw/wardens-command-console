import {
  escapeHtml,
  formatNumber,
  formatSignedNumber,
  formatPercentileDisplay
} from "../modules/ui-helpers.js";

export function renderContestForm() {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Opposed Percentile Resolution</p>
          <h2>Contest</h2>

          <p class="panel__description">
            Resolve both participants against their own targets.
            Degree band decides first. Same-band outcomes may
            occur simultaneously or be broken by distance from
            each participant's own target.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="contest-form" novalidate>
          <section class="form-section">
            <div class="form-grid">
              <div class="form-field form-field--full">
                <label
                  class="form-label"
                  for="contest-label"
                >
                  Contest Label
                </label>

                <input
                  id="contest-label"
                  class="input"
                  type="text"
                  placeholder="Seize the Access Card"
                >
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-grid">
              ${renderContestSideForm("a", "Side A")}
              ${renderContestSideForm("b", "Side B")}
            </div>
          </section>

          <section class="form-section">
            <div class="form-grid">
              <div class="form-field form-field--full">
                <label class="form-label">
                  <input
                    id="contest-simultaneous"
                    type="checkbox"
                  >
                  Allow simultaneous same-band outcome
                </label>

                <p class="form-help">
                  Use this when both actions can occur at the
                  same time, such as both participants grabbing
                  the same object.
                </p>
              </div>

              <div class="form-field form-field--full">
                <label
                  class="form-label"
                  for="contest-simultaneous-outcome"
                >
                  Simultaneous Outcome
                </label>

                <textarea
                  id="contest-simultaneous-outcome"
                  class="textarea"
                  placeholder="Both seize the object and struggle for control."
                  disabled
                ></textarea>
              </div>

              <div class="form-field form-field--full">
                <label
                  class="form-label"
                  for="contest-notes"
                >
                  Notes
                </label>

                <textarea
                  id="contest-notes"
                  class="textarea"
                  placeholder="Optional Warden context"
                ></textarea>
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
              Resolve Contest
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderContestSideForm(
  sideId,
  fallbackLabel
) {
  const sideName = sideId.toUpperCase();

  return `
    <div class="form-field">
      <section class="panel">
        <header class="panel__header">
          <div>
            <p class="eyebrow">Participant ${sideName}</p>
            <h3>${escapeHtml(fallbackLabel)}</h3>
          </div>
        </header>

        <div class="panel__body">
          <div class="form-grid">
            <div class="form-field form-field--full">
              <label
                class="form-label"
                for="contest-${sideId}-label"
              >
                Participant Label
              </label>

              <input
                id="contest-${sideId}-label"
                class="input"
                type="text"
                placeholder="${escapeHtml(fallbackLabel)}"
              >
            </div>

            <div class="form-field">
              <label
                class="form-label"
                for="contest-${sideId}-base-label"
              >
                Base Label
              </label>

              <input
                id="contest-${sideId}-base-label"
                class="input"
                type="text"
                value="Stat"
                placeholder="Speed"
              >
            </div>

            <div class="form-field">
              <label
                class="form-label"
                for="contest-${sideId}-base-value"
              >
                Base Value
              </label>

              <input
                id="contest-${sideId}-base-value"
                class="input"
                type="number"
                min="0"
                max="99"
                step="1"
                required
              >
            </div>

            <div class="form-field">
              <label
                class="form-label"
                for="contest-${sideId}-skill-label"
              >
                Skill Label
              </label>

              <input
                id="contest-${sideId}-skill-label"
                class="input"
                type="text"
                placeholder="Athletics"
              >
            </div>

            <div class="form-field">
              <label
                class="form-label"
                for="contest-${sideId}-skill-value"
              >
                Skill Bonus
              </label>

              <input
                id="contest-${sideId}-skill-value"
                class="input"
                type="number"
                step="1"
                value="0"
              >
            </div>

            <div class="form-field form-field--full">
              <span class="form-label">
                Roll Mode
              </span>

              <div class="segmented-control segmented-control--three">
                <input
                  id="contest-${sideId}-normal"
                  name="contest-${sideId}-roll-mode"
                  type="radio"
                  value="normal"
                  checked
                >

                <label for="contest-${sideId}-normal">
                  Normal
                </label>

                <input
                  id="contest-${sideId}-advantage"
                  name="contest-${sideId}-roll-mode"
                  type="radio"
                  value="advantage"
                >

                <label for="contest-${sideId}-advantage">
                  Advantage
                </label>

                <input
                  id="contest-${sideId}-disadvantage"
                  name="contest-${sideId}-roll-mode"
                  type="radio"
                  value="disadvantage"
                >

                <label for="contest-${sideId}-disadvantage">
                  Disadvantage
                </label>
              </div>
            </div>

            <div class="form-field form-field--full">
              <label
                class="form-label"
                for="contest-${sideId}-manual-roll"
              >
                Manual Final Roll
              </label>

              <input
                id="contest-${sideId}-manual-roll"
                class="input"
                type="number"
                min="0"
                max="99"
                step="1"
                placeholder="Leave blank to roll"
              >
            </div>

            <div class="form-field form-field--full">
              <div class="form-section__heading">
                <h3>Modifiers</h3>

                <button
                  class="button button--secondary"
                  type="button"
                  data-add-contest-modifier="${sideId}"
                >
                  Add Modifier
                </button>
              </div>

              <div
                id="contest-${sideId}-modifiers"
                class="modifier-list"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function renderContestResult(result) {
  const metadata = result.metadata ?? {};
  const sideA = metadata.sideA ?? {};
  const sideB = metadata.sideB ?? {};

  const cardClass =
    result.status === "failure"
      ? "result-card--failure"
      : result.status === "resolved"
        ? "result-card--success"
        : "";

  return `
    <article class="result-card ${cardClass}">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(
              formatContestOutcome(metadata.outcome)
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

        <div class="form-grid">
          ${renderContestSideResult(
            sideA,
            metadata.winner === "sideA"
          )}

          ${renderContestSideResult(
            sideB,
            metadata.winner === "sideB"
          )}
        </div>

        <section class="form-section">
          <h3>Comparison</h3>

          <ul class="calculation-list">
            <li class="calculation-row">
              <span class="calculation-row__label">
                Method
              </span>

              <span class="calculation-row__value">
                ${escapeHtml(
                  formatContestComparison(
                    metadata.comparisonMethod
                  )
                )}
              </span>
            </li>

            <li class="calculation-row">
              <span class="calculation-row__label">
                Same Degree Band
              </span>

              <span class="calculation-row__value">
                ${metadata.sameDegreeBand ? "Yes" : "No"}
              </span>
            </li>

            <li class="calculation-row">
              <span class="calculation-row__label">
                Simultaneous Allowed
              </span>

              <span class="calculation-row__value">
                ${
                  metadata.simultaneousAllowed
                    ? "Yes"
                    : "No"
                }
              </span>
            </li>
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

export function renderContestSideResult(
  side,
  isWinner
) {
  return `
    <section class="result-stat">
      <span class="result-stat__label">
        ${escapeHtml(side.label ?? "Participant")}
        ${isWinner ? " — Winner" : ""}
      </span>

      <h3>
        ${escapeHtml(
          side.degreeLabel ?? "Unknown Result"
        )}
      </h3>

      <ul class="calculation-list">
        <li class="calculation-row">
          <span class="calculation-row__label">
            Target
          </span>

          <span class="calculation-row__value">
            ${escapeHtml(
              formatNumber(side.finalTarget)
            )}
          </span>
        </li>

        <li class="calculation-row">
          <span class="calculation-row__label">
            Roll
          </span>

          <span class="calculation-row__value">
            ${escapeHtml(
              formatPercentileDisplay(side.roll)
            )}
          </span>
        </li>

        <li class="calculation-row">
          <span class="calculation-row__label">
            Margin
          </span>

          <span class="calculation-row__value">
            ${escapeHtml(
              formatSignedNumber(side.margin)
            )}
          </span>
        </li>

        <li class="calculation-row">
          <span class="calculation-row__label">
            Distance
          </span>

          <span class="calculation-row__value">
            ${escapeHtml(
              formatNumber(side.distanceFromTarget)
            )}
          </span>
        </li>
      </ul>
    </section>
  `;
}

export function formatContestOutcome(outcome) {
  const labels = {
    side_a_wins: "Side A Wins",
    side_b_wins: "Side B Wins",
    simultaneous: "Simultaneous Outcome",
    mutual_failure: "Mutual Failure",
    exact_tie: "Exact Tie",
    status_quo: "Status Quo"
  };

  return labels[outcome] ?? "Contest Result";
}

export function formatContestComparison(method) {
  const labels = {
    degree_band: "Degree Band",
    same_degree_band_simultaneous:
      "Same Band — Simultaneous",
    same_degree_band_mutual_failure:
      "Same Band — Mutual Failure",
    distance_from_target:
      "Distance From Own Target",
    exact_tie: "Exact Tie",
    exact_tie_mutual_failure:
      "Exact Tie — Mutual Failure"
  };

  return labels[method] ?? method ?? "Unknown";
}
