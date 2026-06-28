import {
  escapeHtml,
  formatNumber,
  formatSignedNumber
} from "../modules/ui-helpers.js";

export function renderPlaceholderTool({
  label,
  description
}) {
  return `
    <section class="placeholder-tool">
      <p class="eyebrow">Planned Tool</p>
      <h2>${escapeHtml(label)}</h2>
      <p>${escapeHtml(description)}</p>
    </section>
  `;
}

export function renderErrorResult(result) {
  const errors = result.metadata?.errors ?? [];

  return `
    <article class="result-card result-card--error">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">Input Error</p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label)}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(result.summary)}
          </p>
        </div>

        <span class="result-card__status">
          Error
        </span>
      </header>

      <div class="result-card__body">
        <p class="result-card__ruling">
          ${escapeHtml(result.ruling)}
        </p>

        ${
          errors.length > 0
            ? `
              <ul class="result-errors">
                ${errors
                  .map(
                    (error) => `
                      <li>
                        <strong>
                          ${escapeHtml(error.field)}
                        </strong>:
                        ${escapeHtml(error.message)}
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            `
            : ""
        }
      </div>
    </article>
  `;
}

export function renderResultStat(label, value) {
  return `
    <div class="result-stat">
      <span class="result-stat__label">
        ${escapeHtml(label)}
      </span>

      <span class="result-stat__value">
        ${escapeHtml(value)}
      </span>
    </div>
  `;
}

export function renderCalculationRow(step) {
  const value =
    step.display ??
    (
      step.operation === "add" ||
      step.operation === "subtract" ||
      step.operation === "difference" ||
      step.operation === "margin"
        ? formatSignedNumber(step.value)
        : formatNumber(step.value)
    );

  return `
    <li class="calculation-row">
      <span class="calculation-row__label">
        ${escapeHtml(step.label)}
      </span>

      <span class="calculation-row__value">
        ${escapeHtml(value)}
      </span>
    </li>
  `;
}
