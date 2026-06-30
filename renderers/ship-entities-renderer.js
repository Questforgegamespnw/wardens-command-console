import { escapeHtml } from "../modules/ui-helpers.js";
import { SHIP_CLASSES } from "../data/ship-classes.js";
import { SHIP_TAC_CATEGORIES } from "../data/ship-tac/categories.js";
import { SHIP_SYSTEM_CONDITIONS } from "../data/ship-tac/conditions.js";
import { countUnresolvedSevereShipTac } from "../modules/ship-entities.js";

export function renderShipEntitiesTool({ ships = [], templates = [], selectedShipId = null, editingShip = null } = {}) {
  const ship = editingShip ?? null;

  return `
    <section class="tool-card ship-tool">
      <header class="tool-card__header">
        <div>
          <p class="eyebrow">Session</p>
          <h2>Ship Entities</h2>
          <p>Track persistent Hull, PR, Megadamage, and ship-system conditions.</p>
        </div>
      </header>

      <div class="ship-entities-layout">
        <form id="ship-entity-form" class="ship-entity-form">
          <input id="ship-entity-id" type="hidden" value="${escapeHtml(ship?.id ?? "")}">

          <section class="ship-template-picker">
            <div class="form-field form-field--full">
              <label class="form-label" for="ship-entity-template">Chassis Template</label>
              <div class="ship-template-picker__controls">
                <select id="ship-entity-template" class="select">
                  <option value="">Custom / blank ship</option>
                  ${renderShipTemplateOptions(templates, ship?.identity?.templateId ?? "")}
                </select>
                <button class="button button--secondary" type="button" data-apply-ship-template>Load Template</button>
              </div>
              <p class="form-help">Loads calibrated stats, Hull, PR, hardpoints, weapon size, and lightweight identity metadata. You can edit every field afterward.</p>
            </div>
          </section>

          <div class="form-grid">
            <div class="form-field form-field--full">
              <label class="form-label" for="ship-entity-label">Ship Name</label>
              <input id="ship-entity-label" class="input" type="text" value="${escapeHtml(ship?.label ?? "")}" required>
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-registry">Registry</label>
              <input id="ship-entity-registry" class="input" type="text" value="${escapeHtml(ship?.identity?.registry ?? "")}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-model">Make / Model</label>
              <input id="ship-entity-model" class="input" type="text" value="${escapeHtml(ship?.identity?.makeModel ?? "")}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-class">Class</label>
              <select id="ship-entity-class" class="select">
                ${SHIP_CLASSES.map((entry) => `<option value="${entry.classId}" ${Number(ship?.scale?.classId ?? 1) === entry.classId ? "selected" : ""}>${escapeHtml(entry.label)} — ${escapeHtml(entry.name)}</option>`).join("")}
              </select>
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-pr">PR</label>
              <input id="ship-entity-pr" class="input" type="number" min="0" value="${Number(ship?.scale?.protectionRating ?? 1)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-current-hull">Current Hull</label>
              <input id="ship-entity-current-hull" class="input" type="number" min="0" value="${Number(ship?.scale?.currentHull ?? 4)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-maximum-hull">Maximum Hull</label>
              <input id="ship-entity-maximum-hull" class="input" type="number" min="0" value="${Number(ship?.scale?.maximumHull ?? 4)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-megadamage">Megadamage</label>
              <input id="ship-entity-megadamage" class="input" type="number" min="0" value="${Number(ship?.scale?.currentMegadamage ?? 0)}">
            </div>
            <div class="form-field">
              <label class="form-label" for="ship-entity-hardpoints">Hardpoints</label>
              <input id="ship-entity-hardpoints" class="input" type="number" min="0" value="${Number(ship?.scale?.hardpoints ?? 0)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-weapon-size">Weapon Size Limit</label>
              <input id="ship-entity-weapon-size" class="input" type="number" min="0" max="8" value="${Number(ship?.scale?.weaponSizeLimit ?? 1)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-thrusters">Thrusters</label>
              <input id="ship-entity-thrusters" class="input" type="number" value="${Number(ship?.stats?.thrusters ?? 25)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-battle">Battle</label>
              <input id="ship-entity-battle" class="input" type="number" value="${Number(ship?.stats?.battle ?? 20)}">
            </div>

            <div class="form-field">
              <label class="form-label" for="ship-entity-systems">Systems</label>
              <input id="ship-entity-systems" class="input" type="number" value="${Number(ship?.stats?.systems ?? 25)}">
            </div>

            ${ship?.identity?.identityLine ? `
              <div class="form-field form-field--full ship-template-summary">
                <strong>${escapeHtml(ship.identity.family ?? "custom")} · ${escapeHtml(ship.identity.role ?? "ship")}</strong>
                <p>${escapeHtml(ship.identity.identityLine)}</p>
                <span>${escapeHtml(ship.operations?.disablementProfile ?? "")}</span>
              </div>
            ` : ""}

            <div class="form-field form-field--full">
              <label class="form-label" for="ship-entity-notes">Notes</label>
              <textarea id="ship-entity-notes" class="textarea">${escapeHtml(ship?.notes ?? "")}</textarea>
            </div>
          </div>

          <div class="tool-card__actions">
            <button class="button button--primary" type="submit">${ship ? "Update Ship" : "Create Ship"}</button>
            <button class="button button--secondary" type="reset">New Ship</button>
          </div>
        </form>

        <div class="ship-entity-list">
          ${ships.length ? ships.map((entry) => renderShipEntityCard(entry, entry.id === selectedShipId)).join("") : `
            <div class="empty-state">No Ship Entities yet.</div>
          `}
        </div>
      </div>
    </section>
  `;
}

function renderShipTemplateOptions(templates, selectedId) {
  const families = new Map();
  templates.forEach((template) => {
    const label = template.familyLabel ?? template.family ?? "Other";
    if (!families.has(label)) families.set(label, []);
    families.get(label).push(template);
  });

  return [...families.entries()].map(([familyLabel, entries]) => `
    <optgroup label="${escapeHtml(familyLabel)}">
      ${entries.map((entry) => `
        <option value="${escapeHtml(entry.id)}" ${entry.id === selectedId ? "selected" : ""}>
          ${escapeHtml(entry.label)} — Class ${entry.scale.classId}
        </option>
      `).join("")}
    </optgroup>
  `).join("");
}

function renderShipEntityCard(ship, selected) {
  return `
    <article class="ship-entity-card${selected ? " is-selected" : ""}">
      <header>
        <div>
          <h3>${escapeHtml(ship.label)}</h3>
          <p>${escapeHtml(ship.identity?.classType ?? "")}</p>
        </div>
        <span class="ship-entity-card__hull">Hull ${ship.scale.currentHull}/${ship.scale.maximumHull}</span>
      </header>

      <div class="ship-entity-card__stats">
        <span>PR ${ship.scale.protectionRating}</span>
        <span>HP ${ship.scale.hardpoints}</span>
        <span>W.Size ${ship.scale.weaponSizeLimit}</span>
        <span>MDMG ${ship.scale.currentMegadamage}</span>
        <span>Crisis ${countUnresolvedSevereShipTac(ship)}</span>
      </div>

      ${ship.identity?.identityLine ? `<p class="ship-entity-card__identity">${escapeHtml(ship.identity.identityLine)}</p>` : ""}

      <div class="ship-system-grid">
        ${SHIP_TAC_CATEGORIES.map((category) => `
          <div>
            <span>${escapeHtml(category.label)}</span>
            <strong>${escapeHtml(ship.systems?.[category.id]?.condition ?? "operational")}</strong>
          </div>
        `).join("")}
      </div>

      <div class="ship-entity-card__actions">
        <button class="text-button" type="button" data-ship-action="select" data-ship-id="${escapeHtml(ship.id)}">Select</button>
        <button class="text-button" type="button" data-ship-action="load-combat" data-ship-id="${escapeHtml(ship.id)}">Combat</button>
        <button class="text-button" type="button" data-ship-action="load-tac" data-ship-id="${escapeHtml(ship.id)}">TAC</button>
        <button class="text-button" type="button" data-ship-action="duplicate" data-ship-id="${escapeHtml(ship.id)}">Duplicate</button>
        <button class="text-button" type="button" data-ship-action="delete" data-ship-id="${escapeHtml(ship.id)}">Delete</button>
      </div>
    </article>
  `;
}

export function renderShipEntityBoard(ships = [], selectedShipId = null) {
  if (!ships.length) return `<div class="empty-state empty-state--compact">No Ship Entities yet.</div>`;

  return `
    <div class="ship-session-list">
      ${ships.map((ship) => `
        <button
          class="ship-session-card${ship.id === selectedShipId ? " is-selected" : ""}"
          type="button"
          data-ship-action="select"
          data-ship-id="${escapeHtml(ship.id)}"
        >
          <span class="ship-session-card__topline">
            <strong>${escapeHtml(ship.label)}</strong>
            <span>Hull ${ship.scale.currentHull}/${ship.scale.maximumHull}</span>
          </span>
          <span>PR ${ship.scale.protectionRating} · MDMG ${ship.scale.currentMegadamage} · Crisis ${countUnresolvedSevereShipTac(ship)}</span>
        </button>
      `).join("")}
    </div>
  `;
}
