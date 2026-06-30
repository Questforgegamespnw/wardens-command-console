import { escapeHtml } from "../modules/ui-helpers.js";
import { SHIP_TAC_CATEGORIES } from "../data/ship-tac/categories.js";
import { SHIP_TAC_LOCATIONS } from "../data/ship-tac/locations.js";
import { SHIP_SYSTEM_CONDITIONS } from "../data/ship-tac/conditions.js";

export function renderShipTacForm({ ships = [], selectedShipId = null } = {}) {
  return `
    <form id="ship-tac-form" class="tool-card ship-tool">
      <header class="tool-card__header">
        <div>
          <p class="eyebrow">Consequences</p>
          <h2>Ship TAC</h2>
          <p>Resolve a ship system, compartment, crew, or mission consequence.</p>
        </div>
      </header>

      <section class="form-section">
        <h3>Ship and Severity</h3>
        <div class="form-grid">
          <div class="form-field form-field--full">
            <label class="form-label" for="ship-tac-entity-id">Ship Entity</label>
            <select id="ship-tac-entity-id" class="select">
              <option value="">Manual ship state</option>
              ${ships.map((ship) => `<option value="${escapeHtml(ship.id)}" ${ship.id === selectedShipId ? "selected" : ""}>${escapeHtml(ship.label)}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-label">Result Label</label>
            <input id="ship-tac-label" class="input" type="text" value="Ship TAC">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-class">Ship Class</label>
            <input id="ship-tac-class" class="input" type="number" min="0" max="8" value="2">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-severity">Severity</label>
            <select id="ship-tac-severity" class="select">
              <option value="minor">Minor</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
              <option value="broken">Broken</option>
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-existing-condition">Existing Condition</label>
            <select id="ship-tac-existing-condition" class="select">
              ${SHIP_SYSTEM_CONDITIONS.map((id) => `<option value="${id}">${escapeHtml(id)}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-unresolved-severe">Unresolved Severe / Broken</label>
            <input id="ship-tac-unresolved-severe" class="input" type="number" min="0" value="0">
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3>Category and Location</h3>
        <div class="form-grid">
          <div class="form-field">
            <label class="form-label" for="ship-tac-category-mode">Category Mode</label>
            <select id="ship-tac-category-mode" class="select">
              <option value="random">Random</option>
              <option value="preferred">Preferred</option>
              <option value="forced">Forced</option>
            </select>
          </div>

          <div id="ship-tac-category-field" class="form-field" hidden>
            <label class="form-label" for="ship-tac-category">Category</label>
            <select id="ship-tac-category" class="select">
              ${SHIP_TAC_CATEGORIES.map((entry) => `<option value="${entry.id}">${escapeHtml(entry.label)}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-location-mode">Location Mode</label>
            <select id="ship-tac-location-mode" class="select">
              <option value="random">Random</option>
              <option value="preferred">Preferred</option>
              <option value="forced">Forced</option>
            </select>
          </div>

          <div id="ship-tac-location-field" class="form-field" hidden>
            <label class="form-label" for="ship-tac-location">Location</label>
            <select id="ship-tac-location" class="select"></select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-category-roll">Category Roll</label>
            <input id="ship-tac-category-roll" class="input" type="number" min="1" value="">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-location-roll">Location Roll</label>
            <input id="ship-tac-location-roll" class="input" type="number" min="1" value="">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-tac-outcome-roll">Outcome Roll</label>
            <input id="ship-tac-outcome-roll" class="input" type="number" min="1" value="">
          </div>
        </div>
      </section>

      <footer class="tool-card__actions">
        <button class="button button--primary" type="submit">Resolve Ship TAC</button>
        <button class="button button--secondary" type="reset">Reset</button>
      </footer>
    </form>
  `;
}

export function getShipTacLocationsForCategory(categoryId) {
  return SHIP_TAC_LOCATIONS.filter((entry) => entry.category === categoryId);
}

export function renderShipTacResult(result) {
  const tac = result.metadata?.shipTac ?? {};

  if (tac.redirected) {
    return `
      <article class="result-card ship-result">
        <header class="result-card__header">
          <div><p class="eyebrow">Ship TAC</p><h2>${escapeHtml(result.label)}</h2></div>
          <span class="result-badge">Redirect</span>
        </header>
        <p>${escapeHtml(tac.ruling)}</p>
      </article>
    `;
  }

  const linked = Boolean(result.metadata?.linkedShipId);

  return `
    <article class="result-card ship-result">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">Ship TAC</p>
          <h2>${escapeHtml(result.label)}</h2>
        </div>
        <span class="result-badge">${escapeHtml(tac.severity ?? "")}</span>
      </header>

      <div class="ship-tac-path">
        <strong>${escapeHtml(tac.category?.label ?? "")}</strong>
        <span>→</span>
        <strong>${escapeHtml(tac.location?.label ?? "")}</strong>
      </div>

      <h3>${escapeHtml(tac.outcome?.label ?? "")}</h3>
      <p>${escapeHtml(tac.outcome?.effectText ?? "")}</p>

      <div class="result-grid">
        <div class="result-stat">
          <span class="result-stat__label">Condition Before</span>
          <strong>${escapeHtml(tac.subsystem?.previousCondition ?? "")}</strong>
        </div>
        <div class="result-stat">
          <span class="result-stat__label">Condition After</span>
          <strong>${escapeHtml(tac.subsystem?.nextCondition ?? "")}</strong>
        </div>
        <div class="result-stat">
          <span class="result-stat__label">Crisis State</span>
          <strong>${escapeHtml((tac.crisis?.state ?? "stable").replaceAll("_", " "))}</strong>
        </div>
      </div>

      ${(tac.handoffs?.hazards ?? []).length ? `
        <section class="result-card__section">
          <h3>Hazard Handoffs</h3>
          <ul>${tac.handoffs.hazards.map((entry) => `<li>${escapeHtml(entry.type.replaceAll("_", " "))} — ${escapeHtml(entry.locationLabel)}</li>`).join("")}</ul>
        </section>
      ` : ""}

      ${(tac.handoffs?.crew ?? []).length ? `
        <section class="result-card__section">
          <h3>Crew Handoff</h3>
          <p>Resolve crew exposure or casualty effects at ${escapeHtml(tac.location?.label ?? "the affected station")}.</p>
        </section>
      ` : ""}

      ${linked ? `
        <div class="ship-result__apply">
          <button class="button button--primary" type="button" data-apply-ship-tac="${escapeHtml(result.id)}">
            Apply to Ship
          </button>
        </div>
      ` : ""}
    </article>
  `;
}
