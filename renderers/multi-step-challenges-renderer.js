import { escapeHtml, formatNumber } from "../modules/ui-helpers.js";
import { renderResultStat } from "./shared-renderers.js";

const LENGTH_OPTIONS = [
  ["short", "Short — 4 progress"],
  ["medium", "Medium — 8 progress"],
  ["long", "Long — 12 progress"],
  ["custom", "Custom"],
];

export function renderMultiStepChallengesTool({
  challenges = [],
  selectedChallenge = null,
} = {}) {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Persistent Session Objective</p>
          <h2>Multi-Step Challenges</h2>
          <p class="panel__description">
            Track durable progress across repeated meaningful attempts.
            Failure normally advances more slowly and adds a consequence.
          </p>
        </div>
      </header>

      <div class="panel__body">
        ${renderChallengeList(challenges, selectedChallenge?.id)}
        ${renderChallengeForm(selectedChallenge)}
        ${selectedChallenge ? renderAttemptForm(selectedChallenge) : ""}
        ${selectedChallenge ? renderScopeForm(selectedChallenge) : ""}
        ${selectedChallenge ? renderChallengeHistory(selectedChallenge) : ""}
      </div>
    </section>
  `;
}

export function renderMultiStepChallengeBoard(
  challenges = [],
  selectedChallengeId = null
) {
  if (challenges.length === 0) {
    return `<div class="empty-state empty-state--compact">No active challenges.</div>`;
  }

  return challenges
    .filter((challenge) =>
      ["active", "paused"].includes(challenge.status)
    )
    .map((challenge) => {
      const selected = challenge.id === selectedChallengeId ? " is-selected" : "";
      const percent = Math.round(
        (challenge.currentProgress / challenge.targetProgress) * 100
      );

      return `
        <button
          class="session-entity-card${selected}"
          type="button"
          data-challenge-action="select"
          data-challenge-id="${escapeHtml(challenge.id)}"
        >
          <strong>${escapeHtml(challenge.label)}</strong>
          <span>${formatNumber(challenge.currentProgress)} / ${formatNumber(challenge.targetProgress)} progress</span>
          <progress value="${challenge.currentProgress}" max="${challenge.targetProgress}">${percent}%</progress>
        </button>
      `;
    })
    .join("") || `<div class="empty-state empty-state--compact">No active challenges.</div>`;
}

export function renderMultiStepChallengeResult(result) {
  const detail = result.metadata?.challengeAttempt;
  if (!detail) return "";

  return `
    <article class="result-card">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">Multi-Step Challenge</p>
          <h2>${escapeHtml(result.label)}</h2>
        </div>
      </header>

      <div class="result-card__body">
        <div class="result-stat-grid">
          ${renderResultStat("Roll", formatPercentileResult(detail.selectedRoll))}
          ${renderResultStat("Final Target", formatNumber(detail.finalTarget))}
          ${renderResultStat("Margin", formatSignedMargin(detail.margin))}
          ${renderResultStat("Degree", detail.degreeLabel)}
          ${renderResultStat("Progress", `+${detail.progressAdded}`)}
          ${renderResultStat("Challenge", `${detail.progressAfter} / ${detail.targetProgress}`)}
        </div>
        <p>${escapeHtml(result.summary)}</p>
        ${detail.consequence ? `<p><strong>Consequence:</strong> ${escapeHtml(detail.consequence)}</p>` : ""}
      </div>
    </article>
  `;
}

function renderChallengeList(challenges, selectedId) {
  return `
    <section class="form-section">
      <div class="form-section__heading">
        <div>
          <h3>Tracked Challenges</h3>
          <p class="form-help">Completed progress remains durable when scope expands.</p>
        </div>
        <button class="button button--secondary" type="button" data-challenge-action="new">New Challenge</button>
      </div>

      <div class="entity-card-list">
        ${challenges.length === 0
          ? `<div class="empty-state">No multi-step challenges yet.</div>`
          : challenges.map((challenge) => `
              <article class="entity-card ${challenge.id === selectedId ? "is-selected" : ""}">
                <button class="entity-card__select" type="button" data-challenge-action="select" data-challenge-id="${escapeHtml(challenge.id)}">
                  <strong>${escapeHtml(challenge.label)}</strong>
                  <span>${escapeHtml(challenge.status)} · ${challenge.currentProgress}/${challenge.targetProgress}</span>
                </button>
                <button class="text-button" type="button" data-challenge-action="delete" data-challenge-id="${escapeHtml(challenge.id)}">Delete</button>
              </article>
            `).join("")}
      </div>
    </section>
  `;
}

function renderChallengeForm(challenge) {
  return `
    <form id="multi-step-challenge-form" class="form-section" novalidate>
      <input id="challenge-id" type="hidden" value="${escapeHtml(challenge?.id ?? "")}">
      <div class="form-section__heading"><div><h3>${challenge ? "Challenge Details" : "Create Challenge"}</h3></div></div>
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label" for="challenge-label">Objective</label>
          <input id="challenge-label" class="input" required value="${escapeHtml(challenge?.label ?? "")}" placeholder="Restore maneuvering thrusters">
        </div>
        <div class="form-field">
          <label class="form-label" for="challenge-length">Length</label>
          <select id="challenge-length" class="select">
            ${LENGTH_OPTIONS.map(([id, label]) => `<option value="${id}" ${challenge?.length === id ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </div>
        <div class="form-field" id="challenge-custom-target-field" ${challenge?.length === "custom" ? "" : "hidden"}>
          <label class="form-label" for="challenge-target">Custom Target</label>
          <input id="challenge-target" class="input" type="number" min="1" max="99" value="${challenge?.targetProgress ?? 4}">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="challenge-stakes">Pressure / Stakes <span class="form-label__optional">Optional</span></label>
          <input id="challenge-stakes" class="input" value="${escapeHtml(challenge?.stakes ?? "")}" placeholder="Enemy boarding action is underway">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="challenge-outcome">Completion Outcome</label>
          <input id="challenge-outcome" class="input" value="${escapeHtml(challenge?.completionOutcome ?? "")}" placeholder="Thrusters return to operational status">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="challenge-notes">Notes</label>
          <textarea id="challenge-notes" class="textarea">${escapeHtml(challenge?.notes ?? "")}</textarea>
        </div>
      </div>
      <div class="form-actions">
        <button class="button button--primary" type="submit">${challenge ? "Save Challenge" : "Create Challenge"}</button>
      </div>
    </form>
  `;
}

function renderAttemptForm(challenge) {
  const test = challenge.defaultTest ?? {};
  const disabled = challenge.status !== "active" ? "disabled" : "";
  return `
    <form id="challenge-attempt-form" class="form-section" novalidate>
      <div class="form-section__heading">
        <div>
          <h3>Make Attempt</h3>
          <p class="form-help">Roll equal to or under the Final Target. Final Target = Base Value + Skill Bonus. Degree is measured from the roll's margin in 10-point bands.</p>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-field"><label class="form-label" for="challenge-attempt-label">Attempt Label</label><input id="challenge-attempt-label" class="input" value="Work on ${escapeHtml(challenge.label)}" ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-actor">Actor</label><input id="challenge-actor" class="input" placeholder="Chief Engineer" ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-base-label">Base Label</label><input id="challenge-base-label" class="input" value="${escapeHtml(test.baseLabel ?? "Stat")}" ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-base-value">Base Value</label><input id="challenge-base-value" class="input" type="number" min="0" max="99" value="${test.baseValue ?? ""}" required ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-skill-label">Skill Label</label><input id="challenge-skill-label" class="input" value="${escapeHtml(test.skillLabel ?? "")}" ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-skill-value">Skill Bonus</label><input id="challenge-skill-value" class="input" type="number" value="${test.skillValue ?? 0}" ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-roll-mode">Roll Mode</label><select id="challenge-roll-mode" class="select" ${disabled}><option value="normal">Normal</option><option value="advantage">Advantage</option><option value="disadvantage">Disadvantage</option></select></div>
        <div class="form-field"><label class="form-label" for="challenge-manual-roll">Manual Roll</label><input id="challenge-manual-roll" class="input" type="number" min="0" max="99" placeholder="Roll automatically" ${disabled}></div>
        <div class="form-field form-field--full"><label class="form-label" for="challenge-approach">Approach</label><input id="challenge-approach" class="input" placeholder="Reroute power through the auxiliary bus" ${disabled}></div>
        <div class="form-field"><label class="form-label" for="challenge-progress-override">Progress Override</label><input id="challenge-progress-override" class="input" type="number" min="0" max="99" placeholder="Use proposed progress" ${disabled}></div>
        <div class="form-field form-field--full"><label class="form-label" for="challenge-consequence">Failure Consequence / Complication</label><textarea id="challenge-consequence" class="textarea" placeholder="Optional Warden consequence" ${disabled}></textarea></div>
      </div>
      <div class="form-actions"><button class="button button--primary" type="submit" ${disabled}>Resolve and Apply Attempt</button></div>
    </form>
  `;
}

function renderScopeForm(challenge) {
  return `
    <form id="challenge-scope-form" class="form-section" novalidate>
      <div class="form-section__heading"><div><h3>Expand Scope</h3><p class="form-help">Increase total required progress without removing completed work.</p></div></div>
      <div class="form-grid">
        <div class="form-field"><label class="form-label" for="challenge-expanded-target">New Target</label><input id="challenge-expanded-target" class="input" type="number" min="${challenge.targetProgress + 1}" max="99" value="${Math.min(99, challenge.targetProgress + 4)}"></div>
        <div class="form-field form-field--full"><label class="form-label" for="challenge-expansion-reason">Reason</label><input id="challenge-expansion-reason" class="input" placeholder="New Ship TAC damaged circuits during repair"></div>
      </div>
      <div class="form-actions"><button class="button button--secondary" type="submit">Expand Challenge</button></div>
    </form>
  `;
}

function renderChallengeHistory(challenge) {
  return `
    <section class="form-section">
      <h3>History</h3>
      <div class="recent-results">
        ${challenge.history.length === 0
          ? `<div class="empty-state empty-state--compact">No attempts or scope changes yet.</div>`
          : [...challenge.history].reverse().map((entry) => `
              <article class="recent-result-card">
                <strong>${entry.type === "attempt" ? escapeHtml(entry.resultLabel) : "Scope Expanded"}</strong>
                <span>${entry.type === "attempt" ? `+${entry.progressAdded} progress · ${escapeHtml(entry.degree ?? "")}` : `${entry.previousTarget} → ${entry.newTarget}`}</span>
                ${entry.consequence ? `<p>${escapeHtml(entry.consequence)}</p>` : ""}
                ${entry.reason ? `<p>${escapeHtml(entry.reason)}</p>` : ""}
              </article>
            `).join("")}
      </div>
    </section>
  `;
}

function formatPercentileResult(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  if (number === 100) return "100";
  return String(number).padStart(2, "0");
}

function formatSignedMargin(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  return number > 0 ? `+${number}` : String(number);
}
