import {
  escapeHtml,
  formatNumber
} from "../modules/ui-helpers.js";

/**
 * Render the full Quick Entities management tool.
 *
 * @param {object} options
 * @param {Array<object>} options.entities
 * @param {Array<object>} options.templates
 * @param {Array<object>} options.groups
 * @param {string|null} options.selectedEntityId
 * @param {object|null} options.editingEntity
 * @param {Array<object>} options.errors
 * @returns {string}
 */
export function renderQuickEntitiesTool({
  entities = [],
  templates = [],
  groups = [],
  selectedEntityId = null,
  editingEntity = null,
  errors = []
} = {}) {
  return `
    <section class="panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">Temporary Combat State</p>
          <h2>Quick Entities</h2>

          <p class="panel__description">
            Create and manage lightweight targets during play.
            These records are session tools, not full campaign actors.
          </p>
        </div>

        <button
          class="button button--primary"
          type="button"
          data-quick-entity-action="new"
        >
          Add Entity
        </button>
      </header>

      <div class="panel__body">
        <div class="form-grid">
          <section class="form-field">
            <div class="form-section__heading">
              <div>
                <h3>Entities</h3>

                <p class="form-help">
                  Select an entity to inspect or edit it.
                </p>
              </div>
            </div>

            <div class="quick-entity-list">
              ${
                entities.length > 0
                  ? entities
                      .map((entity) =>
                        renderQuickEntityListItem(
                          entity,
                          entity.id === selectedEntityId
                        )
                      )
                      .join("")
                  : renderEmptyQuickEntityState()
              }
            </div>
          </section>

          <section class="form-field">
            ${
              renderQuickEntityEditor({
                templates,
                groups,
                entity: editingEntity,
                errors
              })
            }
          </section>
        </div>
      </div>
    </section>
  `;
}

/**
 * Render the compact right-side session board.
 *
 * @param {Array<object>} entities
 * @param {string|null} selectedEntityId
 * @returns {string}
 */
export function renderQuickEntityBoard(
  entities = [],
  selectedEntityId = null
) {
  if (entities.length === 0) {
    return `
      <div class="empty-state empty-state--compact">
        No Quick Entities yet.
      </div>
    `;
  }

  return `
    <div class="quick-entity-board">
      ${entities
        .map((entity) =>
          renderQuickEntityBoardCard(
            entity,
            entity.id === selectedEntityId
          )
        )
        .join("")}
    </div>
  `;
}

export function renderQuickEntityListItem(
  entity,
  isSelected = false
) {
  return `
    <article
      class="quick-entity-item${
        isSelected ? " is-selected" : ""
      }"
      data-quick-entity-id="${escapeHtml(entity.id)}"
    >
      <button
        class="quick-entity-item__main"
        type="button"
        data-quick-entity-action="select"
        data-entity-id="${escapeHtml(entity.id)}"
      >
        <span class="quick-entity-item__heading">
          <strong>
            ${escapeHtml(entity.label)}
          </strong>

          <span class="tool-button__status">
            ${escapeHtml(
              entity.profile?.role
              ?? entity.type
            )}
          </span>
        </span>

        <span class="quick-entity-item__summary">
          HP
          ${formatNumber(entity.health.currentHealth)}
          /
          ${formatNumber(entity.health.healthPerWound)}
          · Wounds
          ${formatNumber(entity.health.woundsRemaining)}
          /
          ${formatNumber(entity.health.maximumWounds)}
          · AV
          ${formatNumber(entity.defense.av)}
          · DR
          ${formatNumber(entity.defense.dr)}
        </span>

        ${renderVehicleCompactSummary(entity)}
      </button>

      <div class="quick-entity-item__actions">
        <button
          class="text-button"
          type="button"
          data-quick-entity-action="duplicate"
          data-entity-id="${escapeHtml(entity.id)}"
        >
          Duplicate
        </button>

        <button
          class="text-button"
          type="button"
          data-quick-entity-action="delete"
          data-entity-id="${escapeHtml(entity.id)}"
        >
          Delete
        </button>
      </div>
    </article>
  `;
}

export function renderQuickEntityEditor({
  templates = [],
  groups = [],
  entity = null,
  errors = []
} = {}) {
  const isEditing = Boolean(entity?.id);

  const defenseTags =
    entity?.defense?.tags?.join(", ") ?? "";

  const statuses =
    entity?.conditions?.statuses?.join(", ") ?? "";

  const activeTac =
    entity?.conditions?.activeTac?.join(", ") ?? "";

  return `
    <form id="quick-entity-form" novalidate>
      <div class="form-section__heading">
        <div>
          <h3>
            ${isEditing ? "Edit Entity" : "Create Entity"}
          </h3>

          <p class="form-help">
            Start from a template or enter values directly.
          </p>
        </div>
      </div>

      ${
        errors.length > 0
          ? renderQuickEntityErrors(errors)
          : ""
      }

      <input
        id="quick-entity-id"
        type="hidden"
        value="${escapeHtml(entity?.id ?? "")}"
      >

      <section class="form-section">
        <div class="form-grid">
          <div class="form-field form-field--full">
            <label
              class="form-label"
              for="quick-entity-template"
            >
              Template
            </label>

            <select
              id="quick-entity-template"
              class="select"
            >
              <option value="">
                Manual / No Template
              </option>

              ${renderGroupedTemplateOptions(
                templates,
                entity?.templateId ?? null
              )}
            </select>

            <p class="form-help">
              Selecting a template previews its defaults.
              Saving creates an independent entity.
            </p>
          </div>

          <div class="form-field form-field--full">
            <label
              class="form-label"
              for="quick-entity-group"
            >
              Team / Group Template
            </label>

            <div class="quick-entity-group-picker">
              <select
                id="quick-entity-group"
                class="select"
              >
                <option value="">
                  Choose a team
                </option>

                ${groups
                  .map(
                    (group) => `
                      <option
                        value="${escapeHtml(group.id)}"
                      >
                        ${escapeHtml(group.label)}
                      </option>
                    `
                  )
                  .join("")}
              </select>

              <button
                class="button button--secondary"
                type="button"
                data-quick-entity-action="create-group"
              >
                Add Team
              </button>
            </div>

            <p class="form-help">
              Creates each team member as a separate,
              independently tracked Quick Entity.
            </p>
          </div>

          <div class="form-field">
            <label
              class="form-label"
              for="quick-entity-label"
            >
              Label
            </label>

            <input
              id="quick-entity-label"
              class="input"
              type="text"
              value="${escapeHtml(entity?.label ?? "")}"
              placeholder="Enemy Actor A"
              required
            >
          </div>

          <div class="form-field">
            <label
              class="form-label"
              for="quick-entity-type"
            >
              Type
            </label>

            <select
              id="quick-entity-type"
              class="select"
            >
              ${renderEntityTypeOptions(
                entity?.type ?? "enemy"
              )}
            </select>
          </div>
        </div>
      </section>

      <section class="form-section">
        <div class="form-section__heading">
          <h3>Defense</h3>
        </div>

        <div class="form-grid form-grid--three">
          ${renderNumberField(
            "quick-entity-av",
            "AV",
            entity?.defense?.av ?? 0,
            0
          )}

          ${renderNumberField(
            "quick-entity-dr",
            "DR",
            entity?.defense?.dr ?? 0,
            0
          )}

          ${renderNumberField(
            "quick-entity-cover-av",
            "Cover AV",
            entity?.defense?.coverAv ?? 0,
            0
          )}

          <div class="form-field">
            <label class="form-label">
              <input
                id="quick-entity-armored"
                type="checkbox"
                ${
                  entity?.defense?.armored
                    ? "checked"
                    : ""
                }
              >
              Armored
            </label>
          </div>

          <div class="form-field form-field--full">
            <label
              class="form-label"
              for="quick-entity-defense-tags"
            >
              Defense Tags
            </label>

            <input
              id="quick-entity-defense-tags"
              class="input"
              type="text"
              value="${escapeHtml(defenseTags)}"
              placeholder="armored, juggernaut"
            >

            <p class="form-help">
              Separate tags with commas.
            </p>
          </div>
        </div>
      </section>

      <section class="form-section">
        <div class="form-section__heading">
          <h3>Health</h3>
        </div>

        <div class="form-grid">
          ${renderNumberField(
            "quick-entity-health-per-wound",
            "Health Per Wound",
            entity?.health?.healthPerWound ?? 10,
            1
          )}

          ${renderNumberField(
            "quick-entity-current-health",
            "Current Health",
            entity?.health?.currentHealth ?? 10,
            0
          )}

          ${renderNumberField(
            "quick-entity-maximum-wounds",
            "Maximum Wounds",
            entity?.health?.maximumWounds ?? 1,
            1
          )}

          ${renderNumberField(
            "quick-entity-wounds-remaining",
            "Wounds Remaining",
            entity?.health?.woundsRemaining ?? 1,
            0
          )}
        </div>
      </section>

      <section class="form-section">
        <div class="form-section__heading">
          <h3>Conditions</h3>
        </div>

        <div class="form-grid">
          ${renderNumberField(
            "quick-entity-bleeding",
            "Bleeding",
            entity?.conditions?.bleeding ?? 0,
            0
          )}

          <div class="form-field">
            <label
              class="form-label"
              for="quick-entity-statuses"
            >
              Statuses
            </label>

            <input
              id="quick-entity-statuses"
              class="input"
              type="text"
              value="${escapeHtml(statuses)}"
              placeholder="pinned, burning"
            >
          </div>

          <div class="form-field form-field--full">
            <label
              class="form-label"
              for="quick-entity-active-tac"
            >
              Active TAC
            </label>

            <input
              id="quick-entity-active-tac"
              class="input"
              type="text"
              value="${escapeHtml(activeTac)}"
              placeholder="tac_seal_light_01"
            >
          </div>

          <div class="form-field form-field--full">
            <label
              class="form-label"
              for="quick-entity-notes"
            >
              Notes
            </label>

            <textarea
              id="quick-entity-notes"
              class="textarea"
              placeholder="Short Warden notes"
            >${escapeHtml(entity?.notes ?? "")}</textarea>
          </div>
        </div>
      </section>

      ${renderVehicleEditorState(entity)}

      <div class="form-actions">
        ${
          isEditing
            ? `
              <button
                class="button button--secondary"
                type="button"
                data-quick-entity-action="cancel-edit"
              >
                Cancel
              </button>
            `
            : `
              <button
                class="button button--secondary"
                type="reset"
              >
                Reset
              </button>
            `
        }

        <button
          class="button button--primary"
          type="submit"
        >
          ${isEditing ? "Save Changes" : "Create Entity"}
        </button>
      </div>
    </form>
  `;
}

export function renderQuickEntityBoardCard(
  entity,
  isSelected = false
) {
  const tacCount =
    entity.conditions?.activeTac?.length ?? 0;

  const statusCount =
    entity.conditions?.statuses?.length ?? 0;

  return `
    <article
      class="quick-entity-board-card${
        isSelected ? " is-selected" : ""
      }"
    >
      <button
        class="quick-entity-board-card__main"
        type="button"
        data-quick-entity-action="select"
        data-entity-id="${escapeHtml(entity.id)}"
      >
        <strong>
          ${escapeHtml(entity.label)}
        </strong>

        <span>
          HP
          ${formatNumber(entity.health.currentHealth)}
          /
          ${formatNumber(entity.health.healthPerWound)}
          · W
          ${formatNumber(entity.health.woundsRemaining)}
          /
          ${formatNumber(entity.health.maximumWounds)}
        </span>

        <span>
          AV ${formatNumber(entity.defense.av)}
          · DR ${formatNumber(entity.defense.dr)}
          · Bleed ${formatNumber(
            entity.conditions?.bleeding ?? 0
          )}
        </span>

        ${
          tacCount > 0 || statusCount > 0
            ? `
              <span>
                TAC ${tacCount}
                · Status ${statusCount}
              </span>
            `
            : ""
        }

        ${renderVehicleCompactSummary(entity)}
      </button>

      <div class="quick-entity-board-card__actions">
        <button
          class="text-button"
          type="button"
          data-quick-entity-action="load-damage"
          data-entity-id="${escapeHtml(entity.id)}"
        >
          Damage
        </button>

        <button
          class="text-button"
          type="button"
          data-tool-id="quick_entities"
        >
          Open
        </button>
      </div>
    </article>
  `;
}


function renderVehicleCompactSummary(entity) {
  if (entity?.type !== "vehicle") {
    return "";
  }

  const platform =
    formatIdentifier(
      entity.vehicle?.platformType
      ?? "light_vehicle"
    );

  const condition =
    formatIdentifier(
      entity.vehicle?.condition
      ?? "operational"
    );

  const damagedSystems =
    getVehicleSubsystemEntries(entity);

  return `
    <span class="quick-entity-item__summary quick-entity-item__summary--vehicle">
      ${escapeHtml(platform)}
      · ${escapeHtml(condition)}
      · Damaged Systems ${damagedSystems.length}
    </span>
  `;
}

function renderVehicleEditorState(entity) {
  if (entity?.type !== "vehicle") {
    return "";
  }

  const vehicle =
    entity.vehicle ?? {};

  const subsystemGroups =
    getVehicleSubsystemGroups(entity);

  const heatClock =
    vehicle.heatClock ?? {
      current: 0,
      maximum: 4
    };

  const countdowns =
    Array.isArray(vehicle.activeCountdowns)
      ? vehicle.activeCountdowns
      : [];

  return `
    <section class="form-section quick-entity-vehicle-state">
      <div class="form-section__heading">
        <div>
          <h3>Vehicle State</h3>

          <p class="form-help">
            Vehicle TAC updates this state automatically.
          </p>
        </div>
      </div>

      <div class="result-grid">
        ${renderReadOnlyStat(
          "Platform",
          formatIdentifier(
            vehicle.platformType
            ?? "light_vehicle"
          )
        )}

        ${renderReadOnlyStat(
          "Condition",
          formatIdentifier(
            vehicle.condition
            ?? "operational"
          )
        )}

        ${renderReadOnlyStat(
          "Heat",
          `${formatNumber(
            heatClock.current ?? 0
          )} / ${formatNumber(
            heatClock.maximum ?? 4
          )}`
        )}

        ${renderReadOnlyStat(
          "Countdowns",
          countdowns.length
        )}
      </div>

      ${
        subsystemGroups.length > 0
          ? `
            <div class="quick-entity-vehicle-systems">
              ${subsystemGroups
                .map(renderVehicleSubsystemGroup)
                .join("")}
            </div>
          `
          : `
            <div class="empty-state empty-state--compact">
              No damaged vehicle subsystems.
            </div>
          `
      }
    </section>
  `;
}

function renderVehicleSubsystemGroup(group) {
  return `
    <section class="quick-entity-vehicle-system-group">
      <h4>
        ${escapeHtml(
          formatIdentifier(group.category)
        )}
      </h4>

      <div class="quick-entity-vehicle-system-list">
        ${group.entries
          .map(renderVehicleSubsystemEntry)
          .join("")}
      </div>
    </section>
  `;
}

function renderVehicleSubsystemEntry(entry) {
  const tags =
    Array.isArray(entry.tags)
      ? entry.tags
      : [];

  return `
    <article class="quick-entity-vehicle-system">
      <div class="quick-entity-vehicle-system__heading">
        <strong>
          ${escapeHtml(
            entry.label
            ?? formatIdentifier(entry.id)
          )}
        </strong>

        <span class="tool-button__status">
          ${escapeHtml(
            formatIdentifier(
              entry.condition
              ?? "degraded"
            )
          )}
        </span>
      </div>

      <p class="form-help">
        Severity:
        ${escapeHtml(
          formatIdentifier(
            entry.lastSeverity
            ?? "unknown"
          )
        )}
      </p>

      ${
        tags.length > 0
          ? `
            <p class="form-help">
              ${escapeHtml(
                tags
                  .map(formatIdentifier)
                  .join(", ")
              )}
            </p>
          `
          : ""
      }
    </article>
  `;
}

function getVehicleSubsystemGroups(entity) {
  const systems =
    entity?.vehicle?.systems;

  if (
    !systems ||
    typeof systems !== "object"
  ) {
    return [];
  }

  return Object.entries(systems)
    .filter(
      ([, entries]) =>
        Array.isArray(entries)
        && entries.length > 0
    )
    .map(
      ([category, entries]) => ({
        category,
        entries
      })
    );
}

function getVehicleSubsystemEntries(entity) {
  return getVehicleSubsystemGroups(entity)
    .flatMap((group) => group.entries);
}

function renderReadOnlyStat(label, value) {
  return `
    <div class="result-stat">
      <span class="result-stat__label">
        ${escapeHtml(label)}
      </span>

      <span class="result-stat__value">
        ${escapeHtml(String(value))}
      </span>
    </div>
  `;
}

function formatIdentifier(value) {
  return String(value ?? "—")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

export function renderQuickEntityErrors(errors) {
  return `
    <div class="alert alert--warning">
      <strong>
        Entity could not be saved.
      </strong>

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
    </div>
  `;
}

function renderEmptyQuickEntityState() {
  return `
    <div class="empty-state">
      <p>No Quick Entities yet.</p>

      <button
        class="button button--primary"
        type="button"
        data-quick-entity-action="new"
      >
        Create First Entity
      </button>
    </div>
  `;
}

function renderGroupedTemplateOptions(
  templates,
  selectedTemplateId
) {
  const groups = groupTemplatesForPicker(templates);

  return groups
    .map(
      (group) => `
        <optgroup
          label="${escapeHtml(group.label)}"
        >
          ${group.templates
            .map(
              (template) => `
                <option
                  value="${escapeHtml(template.id)}"
                  ${
                    selectedTemplateId === template.id
                      ? "selected"
                      : ""
                  }
                >
                  ${escapeHtml(template.label)}
                </option>
              `
            )
            .join("")}
        </optgroup>
      `
    )
    .join("");
}

function groupTemplatesForPicker(templates) {
  const grouped = new Map();

  for (const template of templates) {
    const categoryLabel =
      template.categoryLabel
      ?? formatIdentifier(
        template.category
        ?? template.type
        ?? "Other"
      );

    const groupLabel =
      template.groupLabel
      ?? formatIdentifier(
        template.group
        ?? "Other"
      );

    const key =
      `${categoryLabel}::${groupLabel}`;

    if (!grouped.has(key)) {
      grouped.set(key, {
        label:
          `${categoryLabel} — ${groupLabel}`,
        category:
          template.category ?? "other",
        group:
          template.group ?? "other",
        sortOrder:
          Number(template.sortOrder ?? 100),
        templates: [],
      });
    }

    grouped.get(key).templates.push(template);
  }

  return [...grouped.values()]
    .sort((left, right) => {
      const categoryOrder = {
        personnel: 10,
        vehicle: 20,
        other: 90,
      };

      const categoryDifference =
        (categoryOrder[left.category] ?? 50)
        - (categoryOrder[right.category] ?? 50);

      if (categoryDifference !== 0) {
        return categoryDifference;
      }

      const orderDifference =
        left.sortOrder - right.sortOrder;

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return left.label.localeCompare(
        right.label
      );
    })
    .map((group) => ({
      ...group,
      templates: [...group.templates]
        .sort((left, right) =>
          left.label.localeCompare(
            right.label
          )
        ),
    }));
}

function renderEntityTypeOptions(
  selectedType
) {
  const types = [
    ["enemy", "Enemy"],
    ["ally", "Ally"],
    ["creature", "Creature"],
    ["vehicle", "Vehicle"],
    ["object", "Object"],
    ["custom", "Custom"]
  ];

  return types
    .map(
      ([value, label]) => `
        <option
          value="${value}"
          ${
            selectedType === value
              ? "selected"
              : ""
          }
        >
          ${label}
        </option>
      `
    )
    .join("");
}

function renderNumberField(
  id,
  label,
  value,
  minimum
) {
  return `
    <div class="form-field">
      <label
        class="form-label"
        for="${id}"
      >
        ${escapeHtml(label)}
      </label>

      <input
        id="${id}"
        class="input"
        type="number"
        min="${minimum}"
        step="1"
        value="${escapeHtml(value)}"
      >
    </div>
  `;
}
