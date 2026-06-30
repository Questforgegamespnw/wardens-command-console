import { escapeHtml } from "../modules/ui-helpers.js";
import { normalizeShipWeaponProfiles } from "../data/ship-weapons.js";
import { SHIP_CLASSES, DEFAULT_MAJOR_SHIP_SECTIONS, DEFAULT_ENVIRONMENT_DISTRICTS } from "../data/ship-classes.js";
import { SHIP_DISTANCE_BANDS, SHIP_HIT_QUALITY, SHIP_PENETRATION } from "../data/ship-rules.js";
import { GROUND_TO_SHIP_SIZE_EQUIVALENTS, GROUND_TO_SHIP_DEFAULT_SIZE, DIRTSIDE_VULNERABILITY_STATES, EXPOSED_SHIP_TARGETS } from "../data/ground-fire-against-ships.js";

function options(entries, valueKey = "id", labelKey = "label") {
  return entries.map((entry) => `<option value="${escapeHtml(entry[valueKey])}">${escapeHtml(entry[labelKey])}</option>`).join("");
}

export function renderShipCombatForm({ ships = [], selectedShipId = null, weapons = [] } = {}) {
  const weaponOptions = weapons.map((weapon) => `<option value="${escapeHtml(weapon.id)}">${escapeHtml(weapon.label)}</option>`).join("");
  const shipOptions = ships.map((ship) => `<option value="${escapeHtml(ship.id)}" ${ship.id === selectedShipId ? "selected" : ""}>${escapeHtml(ship.label)}</option>`).join("");

  return `
    <form id="ship-combat-form" class="tool-card ship-tool">
      <header class="tool-card__header">
        <div>
          <p class="eyebrow">Resolve</p>
          <h2>Ship Combat</h2>
          <p>Resolve ship-scale severity, PR, Hull, Ship TAC, and optional Megadamage.</p>
        </div>
      </header>

      <section class="form-section">
        <h3>Linked Ship</h3>
        <div class="form-grid">
          <div class="form-field form-field--full">
            <label class="form-label" for="ship-combat-entity-id">Ship Entity</label>
            <select id="ship-combat-entity-id" class="select">
              <option value="">Manual target</option>
              ${shipOptions}
            </select>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3>Attack</h3>
        <div class="form-grid">
          <div class="form-field">
            <label class="form-label" for="ship-combat-source">Attack Source</label>
            <select id="ship-combat-source" class="select">
              <option value="ship_weapon">Ship Weapon</option>
              <option value="ground_vehicle">Ground / Vehicle Weapon</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div id="ship-combat-weapon-field" class="form-field">
            <label class="form-label" for="ship-combat-weapon">Weapon</label>
            <select id="ship-combat-weapon" class="select">
              <option value="">Choose weapon</option>
              ${weaponOptions}
            </select>
          </div>

          <div id="ship-combat-profile-field" class="form-field" hidden>
            <label class="form-label" for="ship-combat-profile">Profile</label>
            <select id="ship-combat-profile" class="select"></select>
          </div>

          <div id="ship-combat-ground-field" class="form-field" hidden>
            <label class="form-label" for="ship-combat-ground-category">Ground Weapon Category</label>
            <select id="ship-combat-ground-category" class="select">
              ${options(Object.values(GROUND_TO_SHIP_SIZE_EQUIVALENTS))}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-weapon-label">Attack Label</label>
            <input id="ship-combat-weapon-label" class="input" type="text" value="Ship Attack">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-weapon-size">Weapon Size</label>
            <input id="ship-combat-weapon-size" class="input" type="number" min="0" max="8" value="3">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-base-severity">Base Severity</label>
            <select id="ship-combat-base-severity" class="select">
              <option value="no_effect">No Effect</option>
              <option value="glancing">Glancing</option>
              <option value="solid">Solid</option>
              <option value="breaching" selected>Breaching</option>
              <option value="catastrophic">Catastrophic</option>
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-penetration">Penetration</label>
            <select id="ship-combat-penetration" class="select">
              ${options(Object.values(SHIP_PENETRATION))}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-range">Range</label>
            <select id="ship-combat-range" class="select">
              ${options(SHIP_DISTANCE_BANDS)}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-hit-quality">Hit Quality</label>
            <select id="ship-combat-hit-quality" class="select">
              ${options(Object.values(SHIP_HIT_QUALITY))}
            </select>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3>Target</h3>
        <div class="form-grid">
          <div class="form-field">
            <label class="form-label" for="ship-combat-target-label">Target Label</label>
            <input id="ship-combat-target-label" class="input" type="text" value="Target Ship">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-class">Ship Class</label>
            <select id="ship-combat-class" class="select">
              ${SHIP_CLASSES.map((entry) => `<option value="${entry.classId}">${escapeHtml(entry.label)} — ${escapeHtml(entry.name)}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-pr">Protection Rating</label>
            <input id="ship-combat-pr" class="input" type="number" min="0" value="1">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-hull">Current Hull</label>
            <input id="ship-combat-hull" class="input" type="number" min="0" value="6">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-max-hull">Maximum Hull</label>
            <input id="ship-combat-max-hull" class="input" type="number" min="0" value="6">
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-megadamage-current">Current Megadamage</label>
            <input id="ship-combat-megadamage-current" class="input" type="number" min="0" value="0">
          </div>

          <div id="ship-combat-major-section-field" class="form-field" hidden>
            <label class="form-label" for="ship-combat-major-section">Major Section</label>
            <select id="ship-combat-major-section" class="select">
              <option value="">Choose section</option>
              ${DEFAULT_MAJOR_SHIP_SECTIONS.map((id) => `<option value="${id}">${escapeHtml(id.replaceAll("_", " "))}</option>`).join("")}
            </select>
          </div>

          <div id="ship-combat-district-field" class="form-field" hidden>
            <label class="form-label" for="ship-combat-district">District</label>
            <select id="ship-combat-district" class="select">
              <option value="">Choose district</option>
              ${DEFAULT_ENVIRONMENT_DISTRICTS.map((id) => `<option value="${id}">${escapeHtml(id.replaceAll("_", " "))}</option>`).join("")}
            </select>
          </div>
        </div>
      </section>

      <section class="form-section">
        <h3>Exposure and Consequence</h3>
        <div class="form-grid">
          <label class="checkbox-row form-field--full">
            <input id="ship-combat-vulnerable" type="checkbox">
            <span>Target is in a vulnerable state</span>
          </label>

          <div id="ship-combat-vulnerability-state-field" class="form-field" hidden>
            <label class="form-label" for="ship-combat-vulnerability-state">Vulnerability State</label>
            <select id="ship-combat-vulnerability-state" class="select">
              ${DIRTSIDE_VULNERABILITY_STATES.map((id) => `<option value="${id}">${escapeHtml(id.replaceAll("_", " "))}</option>`).join("")}
            </select>
          </div>

          <label id="ship-combat-vulnerability-shift-field" class="checkbox-row" hidden>
            <input id="ship-combat-vulnerability-shift" type="checkbox">
            <span>Apply optional severity +1</span>
          </label>

          <div id="ship-combat-exposed-field" class="form-field" hidden>
            <label class="form-label" for="ship-combat-exposed-system">Exposed System</label>
            <select id="ship-combat-exposed-system" class="select">
              <option value="">None</option>
              ${EXPOSED_SHIP_TARGETS.map((id) => `<option value="${id}">${escapeHtml(id.replaceAll("_", " "))}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="ship-combat-megadamage-advance">Advance Megadamage</label>
            <input id="ship-combat-megadamage-advance" class="input" type="number" min="0" value="0">
          </div>
        </div>
      </section>

      <footer class="tool-card__actions">
        <button class="button button--primary" type="submit">Resolve Ship Hit</button>
        <button class="button button--secondary" type="reset">Reset</button>
      </footer>
    </form>
  `;
}

export function getShipWeaponProfilesForRenderer(weapon) {
  return normalizeShipWeaponProfiles(weapon);
}

export function renderShipCombatResult(result) {
  const shipCombat = result.metadata?.shipCombat ?? {};
  const effect = shipCombat.effect ?? {};
  const preview = shipCombat.preview ?? {};
  const calc = shipCombat.calculation ?? [];
  const linked = Boolean(result.metadata?.linkedShipId);
  const targetChoice = effect.targetChoice === true;

  return `
    <article class="result-card ship-result">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">Ship Combat</p>
          <h2>${escapeHtml(result.label)}</h2>
        </div>
        <span class="result-badge">${escapeHtml(shipCombat.finalSeverity ?? "No Result")}</span>
      </header>

      <div class="ship-result__severity">
        <strong>${escapeHtml((shipCombat.finalSeverity ?? "unknown").replaceAll("_", " "))}</strong>
      </div>

      <div class="result-grid">
        <div class="result-stat">
          <span class="result-stat__label">Hull Loss</span>
          <strong>${Number(effect.hullLoss ?? 0)}</strong>
        </div>
        <div class="result-stat">
          <span class="result-stat__label">Ship TAC</span>
          <strong>${escapeHtml(effect.shipTacSeverity ?? effect.alternateShipTacSeverity ?? "None")}</strong>
        </div>
        <div class="result-stat">
          <span class="result-stat__label">Megadamage</span>
          <strong>${effect.megadamageEligible ? "Eligible" : "No"}</strong>
        </div>
      </div>

      ${shipCombat.finalSeverity === "solid" ? `
        <div class="callout">
          <strong>Solid:</strong> lose 1 Hull and resolve Minor Ship TAC.
        </div>
      ` : ""}

      <section class="result-card__section">
        <h3>Calculation</h3>
        <div class="ship-calculation">
          ${calc.map((entry) => `
            <div>
              <span>${escapeHtml(entry.label)}</span>
              <strong>${escapeHtml(String(entry.value).replaceAll("_", " "))}</strong>
            </div>
          `).join("")}
        </div>
      </section>

      ${preview ? `
        <section class="result-card__section">
          <h3>Preview</h3>
          <p>
            ${preview.hullBefore != null ? `Hull ${preview.hullBefore} → ${preview.hullAfter}. ` : ""}
            ${preview.megadamageBefore != null ? `Megadamage ${preview.megadamageBefore} → ${preview.megadamageAfter}.` : ""}
          </p>
        </section>
      ` : ""}

      ${(shipCombat.warnings ?? []).length ? `
        <section class="result-card__section">
          <h3>Warnings</h3>
          <ul>${shipCombat.warnings.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
        </section>
      ` : ""}

      ${linked ? `
        <div class="ship-result__apply">
          ${targetChoice ? `
            <label class="form-label" for="ship-combat-apply-choice-${escapeHtml(result.id)}">Apply Choice</label>
            <select id="ship-combat-apply-choice-${escapeHtml(result.id)}" class="select" data-ship-combat-choice>
              <option value="hull">1 Hull</option>
              <option value="minor_stac">Minor Ship TAC</option>
            </select>
          ` : ""}
          <button class="button button--primary" type="button" data-apply-ship-combat="${escapeHtml(result.id)}">
            Apply to Ship
          </button>
        </div>
      ` : ""}
    </article>
  `;
}
