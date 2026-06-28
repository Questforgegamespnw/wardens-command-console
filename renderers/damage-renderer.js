import {
  escapeHtml,
} from "../modules/ui-helpers.js";

import {
  renderResultStat,
} from "./shared-renderers.js";

const WOUND_OPTIONS = Object.freeze([
  ["gunshot", "Gunshot"],
  ["bleeding", "Bleeding"],
  ["blunt_force", "Blunt Force"],
  ["less_lethal", "Less-Lethal"],
  ["massive_gore", "Massive Gore"],
  ["fire_explosive", "Fire / Explosive"],
  ["electrical", "Electrical"],
  ["toxic_chemical", "Toxic / Chemical"],
]);

export function renderDamageForm({
  entities = [],
  selectedEntityId = null,
} = {}) {
  return `
    <section class="panel damage-tool">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Layered Damage Resolution</p>
          <h2>Damage</h2>

          <p class="panel__description">
            Resolve damage dice, fixed damage, or direct Wounds
            through Armored halving, cover, AV, DR, durability,
            TAC, and Wound thresholds.
          </p>
        </div>
      </header>

      <div class="panel__body">
        <form id="damage-form" novalidate>
          <section class="form-section">
            <div class="form-section__heading">
              <h3>Attack</h3>
            </div>

            <div class="form-grid">
              <div class="form-field form-field--full">
                <label class="form-label" for="damage-mode">
                  Damage Mode
                </label>

                <select id="damage-mode" class="select">
                  <option value="dice">Damage Dice</option>
                  <option value="fixed">Fixed Damage</option>
                  <option value="direct_wounds">Direct Wounds</option>
                </select>
              </div>

              <div class="form-field" id="damage-dice-count-field">
                <label class="form-label" for="damage-dice-count">
                  Dice Count
                </label>

                <input
                  id="damage-dice-count"
                  class="input"
                  type="number"
                  min="1"
                  step="1"
                  value="3"
                >
              </div>

              <div class="form-field" id="damage-die-size-field">
                <label class="form-label" for="damage-die-size">
                  Die Size
                </label>

                <select
                  id="damage-die-size"
                  class="select"
                >
                  <option value="5">d5</option>
                  <option value="10" selected>d10</option>
                  <option value="100">d100</option>
                </select>
              </div>

              <div class="form-field form-field--full" id="damage-manual-rolls-field">
                <label class="form-label" for="damage-manual-rolls">
                  Manual Dice Results
                </label>

                <input
                  id="damage-manual-rolls"
                  class="input"
                  type="text"
                  placeholder="Example: 8, 8, 6 — blank rolls automatically"
                >
              </div>

              <div class="form-field form-field--full" id="damage-fixed-field" hidden>
                <label class="form-label" for="damage-fixed-amount">
                  Fixed Damage
                </label>

                <input
                  id="damage-fixed-amount"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="1"
                >
              </div>

              <div class="form-field form-field--full" id="damage-direct-wounds-field" hidden>
                <label class="form-label" for="damage-direct-wounds">
                  Direct Wounds
                </label>

                <input
                  id="damage-direct-wounds"
                  class="input"
                  type="number"
                  min="1"
                  step="1"
                  value="1"
                >

                <p class="form-help">
                  Direct Wounds are a Warden-selected profile and
                  skip ordinary cover, Armored, AV, and DR math.
                </p>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-penetration">
                  Penetration
                </label>

                <select id="damage-penetration" class="select">
                  <option value="standard">Standard</option>
                  <option value="piercing">Piercing</option>
                  <option value="anti_armor">Anti-Armor</option>
                  <option value="siege">Siege</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-wound-type">
                  Wound Type
                </label>

                <select id="damage-wound-type" class="select">
                  ${WOUND_OPTIONS.map(
                    ([id, label]) => `
                      <option value="${escapeHtml(id)}">
                        ${escapeHtml(label)}
                      </option>
                    `,
                  ).join("")}
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-cover-interaction">
                  Cover Interaction
                </label>

                <select id="damage-cover-interaction" class="select">
                  <option value="normal">Normal</option>
                  <option value="ignore">Ignore Cover</option>
                  <option value="breach">Breach Through Cover</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-preferred-tac">
                  Preferred TAC Category
                </label>

                <input
                  id="damage-preferred-tac"
                  class="input"
                  type="text"
                  placeholder="Optional"
                >
              </div>

              <div class="form-field form-field--full">
                <label>
                  <input id="damage-attack-tac-eligible" type="checkbox" checked>
                  This attack may trigger TAC
                </label>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <h3>Cover and Concealment</h3>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="damage-cover-level">
                  Physical Cover
                </label>

                <select id="damage-cover-level" class="select">
                  <option value="none">None — AV 0</option>
                  <option value="light">Light — AV 3</option>
                  <option value="medium">Medium — AV 5</option>
                  <option value="heavy">Heavy — AV 7</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-cover-av">
                  Cover AV
                </label>

                <input
                  id="damage-cover-av"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="0"
                >
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-concealment-level">
                  Concealment
                </label>

                <select id="damage-concealment-level" class="select">
                  <option value="none">None — 0</option>
                  <option value="light">Light — -3 Combat</option>
                  <option value="medium">Medium — -5 Combat</option>
                  <option value="heavy">Heavy — -10 Combat</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-combat-modifier">
                  Combat Modifier
                </label>

                <input
                  id="damage-combat-modifier"
                  class="input"
                  type="number"
                  step="1"
                  value="0"
                >
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-section__heading">
              <h3>Target</h3>
            </div>

            <div class="form-grid">
              <div class="form-field form-field--full">
                <label class="form-label" for="damage-entity-id">
                  Linked Entity
                </label>

                <select id="damage-entity-id" class="select">
                  <option value="">Manual / Unlinked Resolution</option>

                  ${entities.map(
                    (entity) => `
                      <option
                        value="${escapeHtml(entity.id)}"
                        ${entity.id === selectedEntityId ? "selected" : ""}
                      >
                        ${escapeHtml(entity.label)}
                      </option>
                    `,
                  ).join("")}
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-target-type">
                  Target Type
                </label>

                <select id="damage-target-type" class="select">
                  <option value="personnel">Personnel</option>
                  <option value="aegis_shield">Aegis Shield</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="ship">Ship</option>
                  <option value="structure">Structure</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-target-label">
                  Target Label
                </label>

                <input
                  id="damage-target-label"
                  class="input"
                  type="text"
                  placeholder="Optional"
                >
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-target-av">
                  Target AV
                </label>

                <input
                  id="damage-target-av"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="0"
                >
              </div>

              <div class="form-field">
                <label class="form-label" for="damage-target-dr">
                  Target DR
                </label>

                <input
                  id="damage-target-dr"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="0"
                >
              </div>

              <div class="form-field form-field--full">
                <label>
                  <input id="damage-target-armored" type="checkbox">
                  Target has the independent [Armored] tag
                </label>
              </div>

              <div class="form-field" id="damage-health-field">
                <label class="form-label" for="damage-current-health">
                  Current Health
                </label>

                <input
                  id="damage-current-health"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="30"
                >
              </div>

              <div class="form-field" id="damage-maximum-health-field">
                <label class="form-label" for="damage-maximum-health">
                  Maximum Health
                </label>

                <input
                  id="damage-maximum-health"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="30"
                >
              </div>

              <div class="form-field" id="damage-integrity-field" hidden>
                <label class="form-label" for="damage-current-integrity">
                  Current Integrity
                </label>

                <input
                  id="damage-current-integrity"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="30"
                >
              </div>

              <div class="form-field" id="damage-maximum-integrity-field" hidden>
                <label class="form-label" for="damage-maximum-integrity">
                  Maximum Integrity
                </label>

                <input
                  id="damage-maximum-integrity"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="30"
                >
              </div>

              <div class="form-field" id="damage-health-per-wound-field">
                <label class="form-label" for="damage-health-per-wound">
                  Health per Wound
                </label>

                <input
                  id="damage-health-per-wound"
                  class="input"
                  type="number"
                  min="1"
                  step="1"
                  value="10"
                >
              </div>

              <div class="form-field" id="damage-wounds-remaining-field">
                <label class="form-label" for="damage-wounds-remaining">
                  Wounds Remaining
                </label>

                <input
                  id="damage-wounds-remaining"
                  class="input"
                  type="number"
                  min="0"
                  step="1"
                  value="3"
                >
              </div>

              <div class="form-field form-field--full">
                <label>
                  <input id="damage-target-tac-eligible" type="checkbox" checked>
                  Target may suffer TAC when its AV is breached
                </label>
              </div>
            </div>
          </section>

          <section class="form-section">
            <div class="form-field">
              <label class="form-label" for="damage-result-label">
                Result Label
              </label>

              <input
                id="damage-result-label"
                class="input"
                type="text"
                placeholder="Optional attack or incident label"
              >
            </div>
          </section>

          <div class="form-actions">
            <button class="button button--secondary" type="reset">
              Reset
            </button>

            <button class="button button--primary" type="submit">
              Resolve Damage
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function renderDamageResult(result) {
  const damage = result.metadata?.damage ?? result;
  const mode = damage.mode ?? "dice";

  if (mode === "direct_wounds") {
    return renderDirectWoundResult(result, damage);
  }

  const cover = damage.cover ?? {};
  const defense = damage.defense ?? {};
  const durability = damage.durability ?? {};
  const tac = damage.tacHandoff ?? {};
  const wound = damage.woundHandoff ?? {};

  return `
    <article class="result-card damage-result">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(formatIdentifier(damage.target?.type))}
          </p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label ?? damage.attack?.label ?? "Damage Result")}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(buildDamageSummary(damage))}
          </p>
        </div>

        <span class="result-card__status">
          ${escapeHtml(getDamageStatus(damage))}
        </span>
      </header>

      <div class="result-card__body">
        <div class="result-grid">
          ${renderResultStat("Raw Damage", damage.damage?.rawTotal ?? "—")}
          ${renderResultStat("Adjusted Damage", damage.damage?.adjustedTotal ?? "—")}
          ${renderResultStat("Penetration", formatIdentifier(damage.attack?.penetration))}
          ${renderResultStat("Final Damage", defense.finalDamage ?? 0)}
        </div>

        ${renderRollBreakdown(damage)}
        ${renderConcealment(damage.attackContext)}
        ${renderLayerBreakdown(damage)}
        ${renderDurability(damage)}
        ${renderHandoffs({ tac, wound })}
      </div>
    </article>
  `;
}

function renderDirectWoundResult(result, damage) {
  const wound = damage.woundHandoff ?? {};

  return `
    <article class="result-card damage-result">
      <header class="result-card__header">
        <div>
          <p class="eyebrow">Direct Wound Profile</p>

          <h2 class="result-card__title">
            ${escapeHtml(result.label ?? damage.attack?.label ?? "Direct Wounds")}
          </h2>

          <p class="result-card__summary">
            ${escapeHtml(
              `${wound.count ?? 0} ${pluralize("Wound", wound.count)} selected directly.`,
            )}
          </p>
        </div>

        <span class="result-card__status">
          Wound Handoff
        </span>
      </header>

      <div class="result-card__body">
        <div class="result-grid">
          ${renderResultStat("Wounds", wound.count ?? 0)}
          ${renderResultStat("Wound Type", formatIdentifier(wound.woundType))}
          ${renderResultStat("Thresholds", formatThresholds(wound.thresholds))}
          ${renderResultStat("Damage Math", "Skipped")}
        </div>

        <div class="alert alert--warning">
          Direct Wounds bypassed cover, [Armored], AV, and DR because
          the Warden selected the direct-Wound profile.
        </div>
      </div>
    </article>
  `;
}

function renderRollBreakdown(damage) {
  const original = damage.rolls?.original ?? [];
  const adjusted = damage.rolls?.afterArmored ?? [];

  if (damage.mode === "fixed") {
    return `
      <section class="damage-breakdown">
        <h3>Damage Source</h3>
        <p>
          Fixed damage:
          <strong>${escapeHtml(damage.damage?.rawTotal ?? 0)}</strong>
          ${damage.damage?.armoredHalvingApplied
            ? ` → <strong>${escapeHtml(damage.damage?.adjustedTotal ?? 0)}</strong> after [Armored]`
            : ""
          }
        </p>
      </section>
    `;
  }

  if (original.length === 0) {
    return "";
  }

  return `
    <section class="damage-breakdown">
      <h3>Damage Dice</h3>

      <div class="damage-dice-line">
        ${original.map((roll, index) => `
          <span class="damage-die">
            <span>${escapeHtml(roll)}</span>
            ${damage.damage?.armoredHalvingApplied
              ? `<small>→ ${escapeHtml(adjusted[index])}</small>`
              : ""
            }
          </span>
        `).join("")}
      </div>

      ${damage.damage?.armoredHalvingApplied
        ? `<p class="form-help">[Armored] halved each die individually before summing.</p>`
        : ""
      }
    </section>
  `;
}

function renderConcealment(context = {}) {
  if (!context.concealmentLevel || context.concealmentLevel === "none") {
    return "";
  }

  return `
    <div class="alert">
      ${escapeHtml(formatIdentifier(context.concealmentLevel))}
      concealment applies
      <strong>${escapeHtml(formatSigned(context.combatModifier))}</strong>
      to the attacker's Combat roll. It does not reduce damage after a hit.
    </div>
  `;
}

function renderLayerBreakdown(damage) {
  const cover = damage.cover ?? {};
  const defense = damage.defense ?? {};

  return `
    <section class="damage-breakdown">
      <h3>Defensive Layers</h3>

      <ol class="damage-layers">
        ${cover.present
          ? `
            <li class="damage-layer ${cover.penetrated ? "is-breached" : "is-blocked"}">
              <div>
                <strong>Cover</strong>
                <span>${escapeHtml(formatIdentifier(cover.level))}</span>
              </div>

              <div>
                ${escapeHtml(cover.damageBeforeCover)}
                − ${escapeHtml(cover.effectiveAv)} AV
                = <strong>${escapeHtml(cover.damageAfterCover)}</strong>
              </div>

              <small>
                ${escapeHtml(getCoverOutcome(cover))}
              </small>
            </li>
          `
          : `
            <li class="damage-layer is-skipped">
              <div><strong>Cover</strong></div>
              <div>None</div>
            </li>
          `
        }

        <li class="damage-layer ${defense.armorBreached ? "is-breached" : "is-blocked"}">
          <div>
            <strong>Target AV</strong>
            <span>${escapeHtml(damage.target?.label ?? "Target")}</span>
          </div>

          <div>
            ${escapeHtml(cover.damageAfterCover ?? damage.damage?.adjustedTotal ?? 0)}
            − ${escapeHtml(defense.effectiveAv ?? 0)} AV
            = <strong>${escapeHtml(defense.armorRemainder ?? 0)}</strong>
          </div>

          <small>
            ${defense.armorBreached
              ? "Target AV breached; eligible TAC may trigger."
              : "Target AV held; no TAC and no damage proceeds."
            }
          </small>
        </li>

        <li class="damage-layer ${defense.finalDamage > 0 ? "is-breached" : "is-blocked"}">
          <div>
            <strong>Damage Resistance</strong>
            <span>${escapeHtml(formatDrChange(defense))}</span>
          </div>

          <div>
            ${escapeHtml(defense.armorRemainder ?? 0)}
            − ${escapeHtml(defense.effectiveDr ?? 0)} DR
            = <strong>${escapeHtml(defense.finalDamage ?? 0)}</strong>
          </div>

          <small>
            ${defense.finalDamage > 0
              ? "Damage reached the target's durability pool."
              : "DR absorbed the remaining force."
            }
          </small>
        </li>
      </ol>
    </section>
  `;
}

function renderDurability(damage) {
  const durability = damage.durability ?? {};
  const label = durability.resource === "integrity"
    ? "Integrity"
    : "Health";

  return `
    <section class="damage-breakdown">
      <h3>${escapeHtml(label)}</h3>

      <div class="result-grid">
        ${renderResultStat(`${label} Before`, durability.valueBefore ?? "—")}
        ${renderResultStat(`${label} After`, durability.valueAfter ?? "—")}
        ${renderResultStat("Damage Applied", durability.damageApplied ?? 0)}
        ${renderResultStat("Overflow", durability.overflowDamage ?? 0)}
      </div>

      ${durability.thresholdsCrossed > 0
        ? `
          <div class="alert alert--warning">
            Crossed
            <strong>${escapeHtml(durability.thresholdsCrossed)}</strong>
            ${escapeHtml(pluralize("Wound threshold", durability.thresholdsCrossed))}.
          </div>
        `
        : ""
      }
    </section>
  `;
}

function renderHandoffs({ tac, wound }) {
  if (!tac.triggered && !wound.triggered) {
    return `
      <section class="damage-breakdown">
        <h3>Resolver Handoffs</h3>
        <p class="form-help">No TAC or Wound handoff was generated.</p>
      </section>
    `;
  }

  return `
    <section class="damage-breakdown">
      <h3>Resolver Handoffs</h3>

      <div class="damage-handoffs">
        ${tac.triggered
          ? `
            <div class="alert alert--warning">
              <strong>${escapeHtml(formatIdentifier(tac.resolverId))}</strong>
              triggered because target AV was breached.
              ${tac.preferredCategory
                ? `Preferred category: <strong>${escapeHtml(formatIdentifier(tac.preferredCategory))}</strong>.`
                : ""
              }
            </div>
          `
          : ""
        }

        ${wound.triggered
          ? `
            <div class="alert alert--warning">
              <strong>${escapeHtml(wound.count)}</strong>
              ${escapeHtml(pluralize("Wound", wound.count))}
              generated using
              <strong>${escapeHtml(formatIdentifier(wound.woundType))}</strong>.
              Thresholds: ${escapeHtml(formatThresholds(wound.thresholds))}.
            </div>
          `
          : ""
        }
      </div>
    </section>
  `;
}

function buildDamageSummary(damage) {
  const defense = damage.defense ?? {};
  const durability = damage.durability ?? {};

  if (!defense.armorBreached) {
    return "The target's AV stopped the attack.";
  }

  if ((defense.finalDamage ?? 0) <= 0) {
    return "The target's AV was breached, but DR stopped the remaining damage.";
  }

  const resource = durability.resource === "integrity"
    ? "Integrity"
    : "Health";

  return `${defense.finalDamage} damage reached ${resource}.`;
}

function getDamageStatus(damage) {
  if (!damage.defense?.armorBreached) {
    return "Blocked";
  }

  if ((damage.defense?.finalDamage ?? 0) <= 0) {
    return "AV Breached";
  }

  return "Damage Through";
}

function getCoverOutcome(cover) {
  if (cover.interaction === "ignore") {
    return "Cover ignored by the attack profile.";
  }

  if (cover.interaction === "breach") {
    return "Attack opened a breach and bypassed Cover AV.";
  }

  return cover.penetrated
    ? "Cover was penetrated; remainder continued to target AV."
    : "Cover stopped the attack.";
}

function formatDrChange(defense) {
  if (defense.originalDr === defense.effectiveDr) {
    return `DR ${defense.effectiveDr ?? 0}`;
  }

  return `DR ${defense.originalDr ?? 0} → ${defense.effectiveDr ?? 0}`;
}

function formatThresholds(thresholds = []) {
  if (thresholds.length === 0) {
    return "None";
  }

  return thresholds.map(formatIdentifier).join(", ");
}

function formatSigned(value) {
  const numeric = Number(value) || 0;
  return numeric > 0 ? `+${numeric}` : String(numeric);
}

function pluralize(label, count) {
  return Number(count) === 1 ? label : `${label}s`;
}

function formatIdentifier(value) {
  return String(value ?? "—")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}
