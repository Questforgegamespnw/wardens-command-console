import {
  resolveStandardTest
} from "./modules/standard-test.js";

import {
  resolveContest
} from "./modules/contest.js";

import {
  createQuickEntity,
  createEntityFromTemplate,
  updateQuickEntity,
  duplicateQuickEntity,
  removeQuickEntity,
  getQuickEntity,
  replaceQuickEntity,
  createEntitiesFromGroupTemplate,
  isQuickEntityError
} from "./modules/quick-entities.js";

import {
  getActiveEntityTemplates,
  getActiveEntityGroups,
  getEntityTemplate
} from "./data/entity-templates.js";

import {
  renderPlaceholderTool,
  renderErrorResult
} from "./renderers/shared-renderers.js";

import {
  renderStandardTestForm,
  renderStandardTestResult
} from "./renderers/standard-test-renderer.js";

import {
  renderContestForm,
  renderContestResult
} from "./renderers/contest-renderer.js";

import {
  resolveDamage,
  COVER_AV,
  CONCEALMENT_MODIFIERS
} from "./modules/damage-resolver.js";

import {
  renderDamageForm,
  renderDamageResult
} from "./renderers/damage-renderer.js";

import {
  renderQuickEntitiesTool,
  renderQuickEntityBoard
} from "./renderers/quick-entities-renderer.js";

import {
  getCheckedValue,
  isMobileViewport,
  escapeHtml
} from "./modules/ui-helpers.js";

import {
  resolveCalm
} from "./modules/calm-resolver.js";

import {
  renderCalmForm,
  renderCalmResult
} from "./renderers/calm-renderer.js";

import {
  resolveWound
} from "./modules/wound-resolver.js";

import {
  TRAUMA_DAMPENING,
  TRAUMA_DAMPENING_PLUS
} from "./data/trauma-dampening.js";

import {
  createAirLossTracker,
  advanceAirLossTracker,
  createPersonnelRadiationTracker,
  advancePersonnelRadiationTracker,
  createThermalTracker,
  advanceThermalTracker,
  createVacuumTracker,
  advanceVacuumTracker,
  createShipRadiationTracker,
  advanceShipRadiationTracker,
  createToxinTracker,
  advanceToxinTracker
} from "./modules/hazard-trackers.js";

import {
  renderWoundForm,
  renderWoundResult
} from "./renderers/wound-renderer.js";

import {
  renderHazardForm,
  renderHazardResult,
  renderHazardTrackerBoard
} from "./renderers/hazard-renderer.js";

import {
  resolvePersonnelTac
} from "./modules/tac-resolver.js";

import {
  renderTacForm,
  renderTacResult
} from "./renderers/tac-renderer.js";


const MAX_RECENT_RESULTS = 12;
const STORAGE_KEY = "warden_console_session_v1";

const appState = {
  activeTool: "standard_test",
  recentResults: [],
  activeResultId: null,

  quickEntities: [],
  selectedEntityId: null,
  editingEntityId: null,
  quickEntityErrors: [],

  hazardTrackers: [],
  selectedHazardTrackerId: null,

  preferences: {
    sessionTrayExpanded: true,
    mobileNavOpen: false,
    mobileSessionOpen: false
  }
};

const tools = {
  standard_test: {
    id: "standard_test",
    label: "Standard Test",
    category: "resolve",
    status: "active",
    render: renderStandardTestForm
  },

  contest: {
    id: "contest",
    label: "Contest",
    category: "resolve",
    status: "active",
    render: renderContestForm
  },

  damage: {
    id: "damage",
    label: "Damage Resolver",
    category: "resolve",
    status: "active",
    render: () =>
      renderDamageForm({
        entities: appState.quickEntities,
        selectedEntityId:
          appState.selectedEntityId
      })
  },

  calm: {
    id: "calm",
    label: "Calm",
    category: "consequences",
    status: "active",
    render: renderCalmForm,
  },

  wounds: {
    id: "wounds",
    label: "Wounds",
    category: "consequences",
    status: "active",
    render: () =>
      renderWoundForm({
        entities: appState.quickEntities,
        selectedEntityId:
          appState.selectedEntityId
      })
  },

  tac: {
    id: "tac",
    label: "Personnel TAC",
    category: "consequences",
    status: "active",
    render: renderTacForm
  },

  quick_entities: {
    id: "quick_entities",
    label: "Quick Entities",
    category: "session",
    status: "active",
    render: () =>
      renderQuickEntitiesTool({
        entities: appState.quickEntities,
        templates: getActiveEntityTemplates(),
        groups: getActiveEntityGroups(),
        selectedEntityId: appState.selectedEntityId,
        editingEntity: getEditingEntity(),
        errors: appState.quickEntityErrors
      })
  },

  hazards: {
    id: "hazards",
    label: "Hazards",
    category: "session",
    status: "active",
    render: () =>
      renderHazardForm({
        trackers: appState.hazardTrackers,
        selectedTrackerId:
          appState.selectedHazardTrackerId
      })
  }
};

const resultRenderers = {
  standard_test: renderStandardTestResult,
  contest: renderContestResult,
  damage: renderDamageResult,
  calm: renderCalmResult,
  wounds: renderWoundResult,
  tac: renderTacResult,
  hazards: renderHazardResult
};

const toolCategories = [
  {
    id: "resolve",
    label: "Resolve"
  },
  {
    id: "consequences",
    label: "Consequences"
  },
  {
    id: "session",
    label: "Session"
  }
];

const elements = {};

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  cacheElements();
  restoreSessionState();
  bindShellEvents();

  renderToolNavigation();
  renderActiveTool();
  renderActiveResult();
  renderRecentResults();
  renderQuickEntitySessionBoard();
  renderHazardSessionBoard();
  renderSessionTrayState();
}

function cacheElements() {
  elements.body = document.body;
  elements.toolNavigation =
    document.querySelector("#tool-navigation");
  elements.toolList =
    document.querySelector("#tool-list");
  elements.activeTool =
    document.querySelector("#active-tool");
  elements.activeResult =
    document.querySelector("#active-result");
  elements.sessionTray =
    document.querySelector("#session-tray");
  elements.recentResults =
    document.querySelector("#recent-results");
  elements.quickEntitySummary =
    document.querySelector("#quick-entity-summary");
  elements.hazardSummary =
    document.querySelector("#hazard-summary");
  elements.mobileOverlay =
    document.querySelector("#mobile-overlay");

  elements.mobileNavToggle =
    document.querySelector("#mobile-nav-toggle");
  elements.mobileNavClose =
    document.querySelector("#mobile-nav-close");
  elements.sessionTrayToggle =
    document.querySelector("#session-tray-toggle");
  elements.sessionTrayCollapse =
    document.querySelector("#session-tray-collapse");
  elements.clearResults =
    document.querySelector("#clear-results");
}

function bindShellEvents() {
  elements.toolList.addEventListener(
    "click",
    handleToolNavigationClick
  );

  document.addEventListener(
    "click",
    handleGlobalToolLinkClick
  );

  document.addEventListener(
    "click",
    handleQuickEntityAction
  );

  document.addEventListener(
    "click",
    handleHazardTrackerLinkClick
  );

  elements.mobileNavToggle.addEventListener(
    "click",
    openMobileNavigation
  );

  elements.mobileNavClose.addEventListener(
    "click",
    closeMobilePanels
  );

  elements.sessionTrayToggle.addEventListener(
    "click",
    toggleSessionTray
  );

  elements.sessionTrayCollapse.addEventListener(
    "click",
    collapseSessionTray
  );

  elements.mobileOverlay.addEventListener(
    "click",
    closeMobilePanels
  );

  elements.clearResults.addEventListener(
    "click",
    clearRecentResults
  );

  elements.recentResults.addEventListener(
    "click",
    handleRecentResultClick
  );

  window.addEventListener(
    "resize",
    handleViewportChange
  );
}

/* -------------------------------------------------------------------------- */
/* Tool Navigation                                                            */
/* -------------------------------------------------------------------------- */

function renderToolNavigation() {
  elements.toolList.innerHTML = toolCategories
    .map((category) => {
      const categoryTools = Object.values(tools)
        .filter((tool) => tool.category === category.id);

      return `
        <section class="tool-group">
          <h3 class="tool-group__label">
            ${escapeHtml(category.label)}
          </h3>

          ${categoryTools
            .map((tool) => renderToolButton(tool))
            .join("")}
        </section>
      `;
    })
    .join("");
}

function renderToolButton(tool) {
  const activeClass =
    appState.activeTool === tool.id
      ? " is-active"
      : "";

  const statusLabel =
    tool.status === "active"
      ? ""
      : `<span class="tool-button__status">
          ${escapeHtml(tool.status)}
        </span>`;

  return `
    <button
      class="tool-button${activeClass}"
      type="button"
      data-tool-id="${escapeHtml(tool.id)}"
      aria-current="${
        appState.activeTool === tool.id
          ? "page"
          : "false"
      }"
    >
      <span>${escapeHtml(tool.label)}</span>
      ${statusLabel}
    </button>
  `;
}

function handleToolNavigationClick(event) {
  const button = event.target.closest("[data-tool-id]");

  if (!button) {
    return;
  }

  activateTool(button.dataset.toolId);
}

function handleGlobalToolLinkClick(event) {
  const button = event.target.closest(
    "[data-tool-id]"
  );

  if (!button || elements.toolList.contains(button)) {
    return;
  }

  activateTool(button.dataset.toolId);
}

function activateTool(toolId) {
  if (!tools[toolId]) {
    return;
  }

  appState.activeTool = toolId;

  renderToolNavigation();
  renderActiveTool();
  closeMobilePanels();
  persistSessionState();
}

function renderActiveTool() {
  const tool = tools[appState.activeTool];

  if (!tool) {
    elements.activeTool.innerHTML =
      renderPlaceholderTool({
        label: "Unknown Tool",
        description:
          "The selected tool is not registered."
      });

    return;
  }

  if (typeof tool.render === "function") {
    elements.activeTool.innerHTML = tool.render();
    bindActiveToolEvents(tool.id);
    return;
  }

  elements.activeTool.innerHTML =
    renderPlaceholderTool({
      label: tool.label,
      description:
        "This tool is registered but has not been implemented yet."
    });
}

function bindActiveToolEvents(toolId) {
  switch (toolId) {
    case "standard_test":
      bindStandardTestEvents();
      updateStandardTestTypeFields();
      break;

    case "contest":
      bindContestEvents();
      updateSimultaneousOutcomeField();
      break;

    case "damage":
      bindDamageEvents();
      updateDamageForm();
      break;

    case "calm":
      bindCalmEvents();
      updateCalmOperationFields();
      updateCalmResolveFields();
      break;

    case "wounds":
      bindWoundEvents();
      updateWoundFields();
      break;

    case "tac":
      bindTacEvents();
      updateTacCategoryFields();
      break;

    case "hazards":
      bindHazardEvents();
      updateHazardOperationFields();
      updateHazardTypeFields();
      updateHazardProtectionFields();
      break;

    case "quick_entities":
      bindQuickEntityToolEvents();
      break;

    default:
      break;
  }
}

/* -------------------------------------------------------------------------- */
/* Standard Test                                                              */
/* -------------------------------------------------------------------------- */

function bindStandardTestEvents() {
  const form = document.querySelector(
    "#standard-test-form"
  );

  const addModifierButton = document.querySelector(
    "#add-modifier"
  );

  const modifierList = document.querySelector(
    "#modifier-list"
  );

  form.addEventListener(
    "submit",
    handleStandardTestSubmit
  );

  form.addEventListener(
    "change",
    handleStandardTestChange
  );

  form.addEventListener(
    "reset",
    handleStandardTestReset
  );

  addModifierButton.addEventListener(
    "click",
    () => addModifierRow()
  );

  modifierList.addEventListener(
    "click",
    handleModifierListClick
  );
}

function handleStandardTestChange(event) {
  if (event.target.name === "testType") {
    updateStandardTestTypeFields();
  }
}

function updateStandardTestTypeFields() {
  const testType = getCheckedValue(
    "testType",
    "action"
  );

  const isSave = testType === "save";

  const baseLabelInput =
    document.querySelector("#base-label");

  const skillLabelField =
    document.querySelector("#skill-label-field");

  const skillValueField =
    document.querySelector("#skill-value-field");

  const skillLabelInput =
    document.querySelector("#skill-label");

  const skillValueInput =
    document.querySelector("#skill-value");

  skillLabelField.hidden = isSave;
  skillValueField.hidden = isSave;

  skillLabelInput.disabled = isSave;
  skillValueInput.disabled = isSave;

  if (isSave) {
    baseLabelInput.value =
      baseLabelInput.value === "Stat"
        ? "Save"
        : baseLabelInput.value;
  } else if (baseLabelInput.value === "Save") {
    baseLabelInput.value = "Stat";
  }
}

function addModifierRow(modifier = {}) {
  const modifierList = document.querySelector(
    "#modifier-list"
  );

  const row = document.createElement("div");

  row.className = "modifier-row";

  row.innerHTML = `
    <input
      class="input"
      data-modifier-label
      type="text"
      value="${escapeHtml(modifier.label ?? "")}"
      placeholder="Damaged Controls"
      aria-label="Modifier label"
    >

    <input
      class="input"
      data-modifier-value
      type="number"
      step="1"
      value="${Number(modifier.value ?? 0)}"
      aria-label="Modifier value"
    >

    <button
      class="icon-button"
      type="button"
      data-remove-modifier
      aria-label="Remove modifier"
    >
      ×
    </button>
  `;

  modifierList.append(row);
}

function handleModifierListClick(event) {
  const removeButton = event.target.closest(
    "[data-remove-modifier]"
  );

  if (!removeButton) {
    return;
  }

  removeButton.closest(".modifier-row")?.remove();
}

function handleStandardTestSubmit(event) {
  event.preventDefault();

  const input = collectStandardTestInput();
  const result = resolveStandardTest(input);

  addRecentResult(result);
  appState.activeResultId = result.id;

  renderActiveResult();
  renderRecentResults();
  persistSessionState();
}

function collectStandardTestInput() {
  const testType = getCheckedValue(
    "testType",
    "action"
  );

  const manualRollValue =
    document.querySelector("#manual-roll").value;

  const skillLabel =
    document.querySelector("#skill-label").value.trim();

  const skillValue =
    document.querySelector("#skill-value").value;

  return {
    resolverId: "standard_test",
    testType,

    label:
      document.querySelector("#test-label").value.trim(),

    base: {
      label:
        document.querySelector("#base-label").value.trim(),
      value:
        document.querySelector("#base-value").value
    },

    skill:
      testType === "action" &&
      (
        skillLabel !== "" ||
        Number(skillValue) !== 0
      )
        ? {
            label: skillLabel || "Skill",
            value: skillValue
          }
        : null,

    modifiers: collectModifiers(),

    rollMode: getCheckedValue(
      "rollMode",
      "normal"
    ),

    manualRoll:
      manualRollValue === ""
        ? null
        : Number(manualRollValue),

    notes:
      document.querySelector("#test-notes").value.trim()
  };
}

function collectModifiers() {
  return Array.from(
    document.querySelectorAll(".modifier-row")
  )
    .map((row, index) => {
      const label = row
        .querySelector("[data-modifier-label]")
        .value
        .trim();

      const value = row
        .querySelector("[data-modifier-value]")
        .value;

      return {
        id: `modifier_${index + 1}`,
        label: label || `Modifier ${index + 1}`,
        value
      };
    });
}

function handleStandardTestReset() {
  window.setTimeout(() => {
    document.querySelector("#modifier-list").innerHTML = "";
    updateStandardTestTypeFields();
  }, 0);
}/* -------------------------------------------------------------------------- */
/* Contest                                                                    */
/* -------------------------------------------------------------------------- */

function bindContestEvents() {
  const form = document.querySelector("#contest-form");

  form.addEventListener(
    "submit",
    handleContestSubmit
  );

  form.addEventListener(
    "reset",
    handleContestReset
  );

  document
    .querySelector("#contest-simultaneous")
    .addEventListener(
      "change",
      updateSimultaneousOutcomeField
    );

  document
    .querySelectorAll("[data-add-contest-modifier]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        addContestModifierRow(
          button.dataset.addContestModifier
        );
      });
    });

  form.addEventListener(
    "click",
    handleContestModifierClick
  );
}

function updateSimultaneousOutcomeField() {
  const allowed = document.querySelector(
    "#contest-simultaneous"
  ).checked;

  document.querySelector(
    "#contest-simultaneous-outcome"
  ).disabled = !allowed;
}

function addContestModifierRow(sideId, modifier = {}) {
  const list = document.querySelector(
    `#contest-${sideId}-modifiers`
  );

  const row = document.createElement("div");
  row.className = "modifier-row";
  row.dataset.contestModifierSide = sideId;

  row.innerHTML = `
    <input
      class="input"
      data-contest-modifier-label
      type="text"
      value="${escapeHtml(modifier.label ?? "")}"
      placeholder="Situational Modifier"
      aria-label="Modifier label"
    >

    <input
      class="input"
      data-contest-modifier-value
      type="number"
      step="1"
      value="${Number(modifier.value ?? 0)}"
      aria-label="Modifier value"
    >

    <button
      class="icon-button"
      type="button"
      data-remove-contest-modifier
      aria-label="Remove modifier"
    >
      ×
    </button>
  `;

  list.append(row);
}

function handleContestModifierClick(event) {
  const removeButton = event.target.closest(
    "[data-remove-contest-modifier]"
  );

  if (!removeButton) {
    return;
  }

  removeButton.closest(".modifier-row")?.remove();
}

function handleContestSubmit(event) {
  event.preventDefault();

  const input = collectContestInput();
  const result = resolveContest(input);

  addRecentResult(result);
  appState.activeResultId = result.id;

  renderActiveResult();
  renderRecentResults();
  persistSessionState();
}

function handleContestReset() {
  window.setTimeout(() => {
    document.querySelector(
      "#contest-a-modifiers"
    ).innerHTML = "";

    document.querySelector(
      "#contest-b-modifiers"
    ).innerHTML = "";

    updateSimultaneousOutcomeField();
  }, 0);
}

function collectContestInput() {
  const simultaneousAllowed =
    document.querySelector(
      "#contest-simultaneous"
    ).checked;

  return {
    resolverId: "contest",

    label:
      document.querySelector(
        "#contest-label"
      ).value.trim(),

    sideA: collectContestSideInput("a", "Side A"),
    sideB: collectContestSideInput("b", "Side B"),

    simultaneousAllowed,

    simultaneousOutcome:
      simultaneousAllowed
        ? document.querySelector(
            "#contest-simultaneous-outcome"
          ).value.trim()
        : "",

    notes:
      document.querySelector(
        "#contest-notes"
      ).value.trim()
  };
}

function collectContestSideInput(
  sideId,
  fallbackLabel
) {
  const manualRollValue =
    document.querySelector(
      `#contest-${sideId}-manual-roll`
    ).value;

  const skillLabel =
    document.querySelector(
      `#contest-${sideId}-skill-label`
    ).value.trim();

  const skillValue =
    document.querySelector(
      `#contest-${sideId}-skill-value`
    ).value;

  return {
    label:
      document.querySelector(
        `#contest-${sideId}-label`
      ).value.trim() || fallbackLabel,

    base: {
      label:
        document.querySelector(
          `#contest-${sideId}-base-label`
        ).value.trim() || "Base Target",

      value:
        document.querySelector(
          `#contest-${sideId}-base-value`
        ).value
    },

    skill:
      skillLabel !== "" ||
      Number(skillValue) !== 0
        ? {
            label: skillLabel || "Skill",
            value: skillValue
          }
        : null,

    modifiers:
      collectContestModifiers(sideId),

    rollMode:
      document.querySelector(
        `input[name="contest-${sideId}-roll-mode"]:checked`
      )?.value ?? "normal",

    manualRoll:
      manualRollValue === ""
        ? null
        : Number(manualRollValue)
  };
}

function collectContestModifiers(sideId) {
  return Array.from(
    document.querySelectorAll(
      `#contest-${sideId}-modifiers .modifier-row`
    )
  ).map((row, index) => {
    const label = row
      .querySelector(
        "[data-contest-modifier-label]"
      )
      .value
      .trim();

    const value = row
      .querySelector(
        "[data-contest-modifier-value]"
      )
      .value;

    return {
      id: `${sideId}_modifier_${index + 1}`,
      label: label || `Modifier ${index + 1}`,
      value
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Damage                                                                     */
/* -------------------------------------------------------------------------- */

function bindDamageEvents() {
  const form = document.querySelector("#damage-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", handleDamageSubmit);
  form.addEventListener("change", handleDamageChange);
  form.addEventListener("reset", () => {
    window.setTimeout(updateDamageForm, 0);
  });
}

function handleDamageChange(event) {
  const id = event.target.id;

  if (
    id === "damage-mode"
    || id === "damage-target-type"
    || id === "damage-entity-id"
    || id === "damage-cover-level"
    || id === "damage-concealment-level"
  ) {
    updateDamageForm({ changedId: id });
  }
}

function updateDamageForm({ changedId = null } = {}) {
  const mode = document.querySelector("#damage-mode")?.value ?? "dice";
  const targetType = document.querySelector("#damage-target-type")?.value ?? "personnel";
  const linkedEntity = getLinkedDamageEntity();

  setDamageFieldState("#damage-dice-count-field", mode !== "dice");
  setDamageFieldState("#damage-die-size-field", mode !== "dice");
  setDamageFieldState("#damage-manual-rolls-field", mode !== "dice");
  setDamageFieldState("#damage-fixed-field", mode !== "fixed");
  setDamageFieldState("#damage-direct-wounds-field", mode !== "direct_wounds");

  const direct = mode === "direct_wounds";
  [
    "#damage-penetration",
    "#damage-cover-interaction",
    "#damage-attack-tac-eligible",
    "#damage-cover-level",
    "#damage-cover-av"
  ].forEach((selector) => {
    const control = document.querySelector(selector);
    if (control) control.disabled = direct;
  });

  const shield = targetType === "aegis_shield";
  setDamageFieldState("#damage-health-field", shield);
  setDamageFieldState("#damage-maximum-health-field", shield);
  setDamageFieldState("#damage-health-per-wound-field", shield || targetType === "structure");
  setDamageFieldState("#damage-wounds-remaining-field", shield || targetType === "structure");
  setDamageFieldState("#damage-integrity-field", !shield);
  setDamageFieldState("#damage-maximum-integrity-field", !shield);

  if (changedId === "damage-cover-level") {
    const level = document.querySelector("#damage-cover-level")?.value ?? "none";
    document.querySelector("#damage-cover-av").value = COVER_AV[level] ?? 0;
  }

  if (changedId === "damage-concealment-level") {
    const level = document.querySelector("#damage-concealment-level")?.value ?? "none";
    document.querySelector("#damage-combat-modifier").value = CONCEALMENT_MODIFIERS[level] ?? 0;
  }

  applyLinkedDamageEntity(linkedEntity);
}

function setDamageFieldState(selector, hidden) {
  const field = document.querySelector(selector);
  if (!field) return;
  field.hidden = hidden;
  field.querySelectorAll("input, select, textarea").forEach((control) => {
    control.disabled = hidden;
  });
}

function getLinkedDamageEntity() {
  const entityId = document.querySelector("#damage-entity-id")?.value ?? "";
  return entityId
    ? getQuickEntity(appState.quickEntities, entityId)
    : null;
}

function applyLinkedDamageEntity(entity) {
  const controls = [
    "#damage-target-type",
    "#damage-target-label",
    "#damage-target-av",
    "#damage-target-dr",
    "#damage-target-armored",
    "#damage-current-health",
    "#damage-maximum-health",
    "#damage-health-per-wound",
    "#damage-wounds-remaining"
  ];

  controls.forEach((selector) => {
    const control = document.querySelector(selector);
    if (control) control.disabled = Boolean(entity);
  });

  if (!entity) {
    return;
  }

  const targetType = inferDamageTargetType(entity);
  document.querySelector("#damage-target-type").value = targetType;
  document.querySelector("#damage-target-label").value = entity.label ?? "";
  document.querySelector("#damage-target-av").value = entity.defense?.av ?? 0;
  document.querySelector("#damage-target-dr").value = entity.defense?.dr ?? 0;
  document.querySelector("#damage-target-armored").checked = entity.defense?.armored === true;
  document.querySelector("#damage-current-health").value = entity.health?.currentHealth ?? 0;
  document.querySelector("#damage-maximum-health").value = entity.health?.healthPerWound ?? entity.health?.currentHealth ?? 0;
  document.querySelector("#damage-health-per-wound").value = entity.health?.healthPerWound ?? 1;
  document.querySelector("#damage-wounds-remaining").value = entity.health?.woundsRemaining ?? 0;

  const shield = targetType === "aegis_shield";
  setDamageFieldState("#damage-health-field", shield);
  setDamageFieldState("#damage-maximum-health-field", shield);
  setDamageFieldState("#damage-health-per-wound-field", shield || targetType === "structure");
  setDamageFieldState("#damage-wounds-remaining-field", shield || targetType === "structure");
  setDamageFieldState("#damage-integrity-field", !shield);
  setDamageFieldState("#damage-maximum-integrity-field", !shield);

  controls.forEach((selector) => {
    const control = document.querySelector(selector);
    if (control) control.disabled = true;
  });
}

function inferDamageTargetType(entity) {
  const value = String(entity?.type ?? "personnel").toLowerCase();
  if (value.includes("ship")) return "ship";
  if (value.includes("vehicle") || value.includes("walker")) return "vehicle";
  if (value.includes("structure")) return "structure";
  if (value.includes("aegis") || value.includes("shield")) return "aegis_shield";
  return "personnel";
}

function handleDamageSubmit(event) {
  event.preventDefault();

  try {
    const linkedEntity = getLinkedDamageEntity();
    const input = collectDamageInput(linkedEntity);
    const damage = resolveDamage(input);

    if (linkedEntity) {
      applyDamageToLinkedEntity(linkedEntity, damage);
    }

    const result = createConsoleResult({
      resolverId: "damage",
      label:
        document.querySelector("#damage-result-label")?.value.trim()
        || damage.attack?.label
        || linkedEntity?.label
        || "Damage Result",
      status: getDamageResultStatus(damage),
      summary: buildDamageResultSummary(damage),
      ruling: buildDamageResultRuling(damage),
      metadata: {
        damage,
        linkedEntityId: linkedEntity?.id ?? null
      }
    });

    addRecentResult(result);
    appState.activeResultId = result.id;
    renderActiveResult();
    renderRecentResults();
    renderQuickEntitySessionBoard();
    persistSessionState();

    if (linkedEntity) {
      renderActiveTool();
    }
  } catch (error) {
    addResolverExceptionResult("damage", "Damage Resolution Error", error);
  }
}

function collectDamageInput(linkedEntity) {
  const mode = document.querySelector("#damage-mode").value;
  const targetType = linkedEntity
    ? inferDamageTargetType(linkedEntity)
    : document.querySelector("#damage-target-type").value;

  const manualRolls = parseDamageRolls(
    document.querySelector("#damage-manual-rolls")?.value ?? ""
  );

  const target = {
    id: linkedEntity?.id ?? null,
    label:
      linkedEntity?.label
      ?? document.querySelector("#damage-target-label")?.value.trim()
      ?? "",
    type: targetType,
    armored:
      linkedEntity?.defense?.armored
      ?? document.querySelector("#damage-target-armored")?.checked
      ?? false,
    av:
      linkedEntity?.defense?.av
      ?? Number(document.querySelector("#damage-target-av")?.value ?? 0),
    dr:
      linkedEntity?.defense?.dr
      ?? Number(document.querySelector("#damage-target-dr")?.value ?? 0),
    tacEligible:
      document.querySelector("#damage-target-tac-eligible")?.checked === true,
    tacResolverId: getTacResolverId(targetType),
    woundsRemaining:
      linkedEntity?.health?.woundsRemaining
      ?? Number(document.querySelector("#damage-wounds-remaining")?.value ?? 0),
    healthPerWound:
      linkedEntity?.health?.healthPerWound
      ?? Number(document.querySelector("#damage-health-per-wound")?.value ?? 1)
  };

  if (targetType === "aegis_shield") {
    target.currentIntegrity = Number(document.querySelector("#damage-current-integrity")?.value ?? 0);
    target.maximumIntegrity = Number(document.querySelector("#damage-maximum-integrity")?.value ?? target.currentIntegrity);
  } else {
    target.currentHealth = linkedEntity?.health?.currentHealth
      ?? Number(document.querySelector("#damage-current-health")?.value ?? 0);
    target.maximumHealth = linkedEntity?.health?.healthPerWound
      ?? Number(document.querySelector("#damage-maximum-health")?.value ?? target.currentHealth);
  }

  return {
    mode,
    attack: {
      label: document.querySelector("#damage-result-label")?.value.trim() || "Damage Result",
      dice: {
        count: Number(document.querySelector("#damage-dice-count")?.value ?? 1),
        sides: Number(document.querySelector("#damage-die-size")?.value ?? 10),
        rolls: manualRolls.length > 0 ? manualRolls : null
      },
      fixedDamage: Number(document.querySelector("#damage-fixed-amount")?.value ?? 0),
      directWounds: Number(document.querySelector("#damage-direct-wounds")?.value ?? 1),
      penetration: document.querySelector("#damage-penetration")?.value ?? "standard",
      woundType: document.querySelector("#damage-wound-type")?.value ?? "gunshot",
      coverInteraction: document.querySelector("#damage-cover-interaction")?.value ?? "normal",
      tacEligible: document.querySelector("#damage-attack-tac-eligible")?.checked === true,
      preferredTacCategory:
        document.querySelector("#damage-preferred-tac")?.value.trim() || null
    },
    target,
    attackContext: {
      concealment: {
        level: document.querySelector("#damage-concealment-level")?.value ?? "none",
        combatModifier: Number(document.querySelector("#damage-combat-modifier")?.value ?? 0)
      },
      cover: {
        present: Number(document.querySelector("#damage-cover-av")?.value ?? 0) > 0,
        level: document.querySelector("#damage-cover-level")?.value ?? "none",
        av: Number(document.querySelector("#damage-cover-av")?.value ?? 0)
      }
    }
  };
}

function parseDamageRolls(value) {
  const text = String(value ?? "").trim();
  if (!text) return [];
  return text.split(/[ ,]+/).filter(Boolean).map((item) => {
    const roll = Number(item);
    if (!Number.isInteger(roll)) {
      throw new TypeError(`Invalid damage die result: ${item}`);
    }
    return roll;
  });
}

function getTacResolverId(targetType) {
  if (targetType === "personnel") return "personnel_tac";
  if (targetType === "vehicle") return "vehicle_tac";
  if (targetType === "ship") return "ship_tac";
  return null;
}

function applyDamageToLinkedEntity(entity, damage) {
  if (damage.mode === "direct_wounds") {
    return;
  }

  const durability = damage.durability ?? {};
  if (durability.resource !== "health") {
    return;
  }

  appState.quickEntities = appState.quickEntities.map((candidate) => {
    if (candidate.id !== entity.id) return candidate;

    return {
      ...candidate,
      health: {
        ...candidate.health,
        currentHealth: durability.valueAfter,
        woundsRemaining:
          durability.woundsAfter
          ?? candidate.health?.woundsRemaining
      }
    };
  });
}

function getDamageResultStatus(damage) {
  if (damage.mode === "direct_wounds") return "resolved";
  if ((damage.defense?.finalDamage ?? 0) > 0) return "damage";
  if (damage.tacHandoff?.triggered) return "breach";
  return "blocked";
}

function buildDamageResultSummary(damage) {
  if (damage.mode === "direct_wounds") {
    return `${damage.woundHandoff?.count ?? 0} direct ${damage.woundHandoff?.count === 1 ? "Wound" : "Wounds"}`;
  }

  const finalDamage = damage.defense?.finalDamage ?? 0;
  if (finalDamage > 0) return `${finalDamage} damage reached ${damage.target?.label ?? "the target"}.`;
  if (damage.tacHandoff?.triggered) return "Armor breached; DR prevented Health damage.";
  return "The attack was stopped by the defensive layers.";
}

function buildDamageResultRuling(damage) {
  if (damage.woundHandoff?.triggered) {
    return "Resolve the generated Wound handoff using the listed Wound Type and thresholds.";
  }
  if (damage.tacHandoff?.triggered) {
    return `Resolve one ${formatAppIdentifier(damage.tacHandoff.resolverId)} result.`;
  }
  if ((damage.defense?.finalDamage ?? 0) > 0) {
    return "Apply the displayed durability change to the target.";
  }
  return "No damage or TAC passes the target's defenses.";
}

/* -------------------------------------------------------------------------- */
/* Calm                                                                       */
/* -------------------------------------------------------------------------- */

function bindCalmEvents() {
  const form = document.querySelector(
    "#calm-form"
  );

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    handleCalmSubmit
  );

  form.addEventListener(
    "change",
    handleCalmFormChange
  );

  form.addEventListener(
    "reset",
    handleCalmReset
  );
}

function handleCalmFormChange(event) {
  if (
    event.target.name ===
    "calmOperation"
  ) {
    updateCalmOperationFields();
  }

  if (
    event.target.id ===
    "calm-resolve-available"
  ) {
    updateCalmResolveFields();
  }
}

function updateCalmOperationFields() {
  const operation =
    getCheckedValue(
      "calmOperation",
      "panic_check"
    );

  document
    .querySelectorAll(
      "[data-calm-section]"
    )
    .forEach((section) => {
      const sectionId =
        section.dataset.calmSection;

      if (
        sectionId === "shared-state"
      ) {
        section.hidden =
          operation ===
          "stress_conversion";

        setSectionInputsDisabled(
          section,
          operation ===
            "stress_conversion"
        );

        return;
      }

      const isActive =
        sectionId === operation;

      section.hidden = !isActive;

      setSectionInputsDisabled(
        section,
        !isActive
      );
    });
}

function updateCalmResolveFields() {
  const checkbox =
    document.querySelector(
      "#calm-resolve-available"
    );

  const field =
    document.querySelector(
      "#calm-resolve-amount-field"
    );

  const amountInput =
    document.querySelector(
      "#calm-resolve-amount"
    );

  if (
    !checkbox ||
    !field ||
    !amountInput
  ) {
    return;
  }

  const available =
    checkbox.checked;

  field.hidden = !available;
  amountInput.disabled = !available;
}

function setSectionInputsDisabled(
  section,
  disabled
) {
  section
    .querySelectorAll(
      "input, select, textarea, button"
    )
    .forEach((control) => {
      control.disabled = disabled;
    });
}

function handleCalmSubmit(event) {
  event.preventDefault();

  const input =
    collectCalmInput();

  const result =
    resolveCalm(input);

  addRecentResult(result);
  appState.activeResultId =
    result.id;

  renderActiveResult();
  renderRecentResults();
  persistSessionState();
}

function collectCalmInput() {
  const operation =
    getCheckedValue(
      "calmOperation",
      "panic_check"
    );

  const input = {
    resolverId: "calm",

    operation,

    label:
      document.querySelector(
        "#calm-label"
      )?.value.trim() ?? "",

    notes:
      document.querySelector(
        "#calm-notes"
      )?.value.trim() ?? ""
  };

  if (
    operation !==
    "stress_conversion"
  ) {
    input.currentCalm =
      document.querySelector(
        "#calm-current"
      )?.value;

    input.maximumCalm =
      document.querySelector(
        "#calm-maximum"
      )?.value;
  }

  switch (operation) {
    case "panic_check": {
      const manualRoll =
        document.querySelector(
          "#calm-manual-roll"
        )?.value ?? "";

      const resolveAvailable =
        document.querySelector(
          "#calm-resolve-available"
        )?.checked === true;

      input.rollMode =
        getCheckedValue(
          "calmRollMode",
          "normal"
        );

      input.manualRoll =
        manualRoll === ""
          ? null
          : Number(manualRoll);

      input.resolveAvailable =
        resolveAvailable;

      input.resolveAmount =
        resolveAvailable
          ? Number(
              document.querySelector(
                "#calm-resolve-amount"
              )?.value ?? 1
            )
          : 0;

      break;
    }

    case "loss": {
      const bandId =
        document.querySelector(
          "#calm-loss-band"
        )?.value ?? "";

      const amount =
        document.querySelector(
          "#calm-loss-amount"
        )?.value.trim() ?? "";

      input.bandId =
        bandId || null;

      input.amount =
        bandId
          ? null
          : amount || null;

      break;
    }

    case "recovery": {
      const bandId =
        document.querySelector(
          "#calm-recovery-band"
        )?.value ?? "";

      const amount =
        document.querySelector(
          "#calm-recovery-amount"
        )?.value.trim() ?? "";

      input.bandId =
        bandId || null;

      input.amount =
        bandId
          ? null
          : amount || null;

      break;
    }

    case "stress_conversion":
      input.stress =
        document.querySelector(
          "#calm-stress"
        )?.value;

      break;

    default:
      break;
  }

  return input;
}

function handleCalmReset() {
  window.setTimeout(() => {
    updateCalmOperationFields();
    updateCalmResolveFields();
  }, 0);
}

/* -------------------------------------------------------------------------- */
/* Personnel TAC                                                              */
/* -------------------------------------------------------------------------- */

function bindTacEvents() {
  const form =
    document.querySelector("#tac-form");

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    handleTacSubmit
  );

  form.addEventListener(
    "change",
    handleTacFormChange
  );

  form.addEventListener(
    "reset",
    () => {
      window.setTimeout(
        updateTacCategoryFields,
        0
      );
    }
  );
}

function handleTacFormChange(event) {
  if (
    event.target.name ===
    "tacCategoryMode"
  ) {
    updateTacCategoryFields();
  }
}

function updateTacCategoryFields() {
  const mode =
    getCheckedValue(
      "tacCategoryMode",
      "random"
    );

  const preferredField =
    document.querySelector(
      "#tac-preferred-category-field"
    );

  const preferredInput =
    document.querySelector(
      "#tac-preferred-category"
    );

  const rollField =
    document.querySelector(
      "#tac-forced-roll-field"
    );

  const rollInput =
    document.querySelector(
      "#tac-forced-roll"
    );

  const preferred =
    mode === "preferred";

  if (
    preferredField &&
    preferredInput
  ) {
    preferredField.hidden =
      !preferred;

    preferredInput.disabled =
      !preferred;
  }

  if (rollField && rollInput) {
    rollField.hidden =
      preferred;

    rollInput.disabled =
      preferred;
  }
}

function handleTacSubmit(event) {
  event.preventDefault();

  try {
    const categoryMode =
      getCheckedValue(
        "tacCategoryMode",
        "random"
      );

    const forcedSeverityValue =
      document.querySelector(
        "#tac-forced-severity"
      ).value;

    const forcedRollValue =
      document.querySelector(
        "#tac-forced-roll"
      ).value;

    const tac =
      resolvePersonnelTac({
        tacCount:
          document.querySelector(
            "#tac-count"
          ).value,

        currentArmorState:
          document.querySelector(
            "#tac-current-armor-state"
          ).value,

        originalAv:
          document.querySelector(
            "#tac-original-av"
          ).value,

        dampeningActive:
          document.querySelector(
            "#tac-dampening-active"
          ).checked,

        severityShift:
          document.querySelector(
            "#tac-severity-shift"
          ).value,

        forcedSeverity:
          forcedSeverityValue === ""
            ? null
            : forcedSeverityValue,

        categoryMode,

        preferredCategory:
          categoryMode ===
            "preferred"
            ? document.querySelector(
                "#tac-preferred-category"
              ).value
            : null,

        forcedRoll:
          categoryMode === "random"
          && forcedRollValue !== ""
            ? Number(forcedRollValue)
            : null,

        sealWarningActive:
          document.querySelector(
            "#tac-seal-warning-active"
          ).checked,

        hostileEnvironment:
          document.querySelector(
            "#tac-hostile-environment"
          ).checked
      });

    const result =
      createConsoleResult({
        resolverId: "tac",

        label:
          document.querySelector(
            "#tac-label"
          ).value.trim()
          || tac.outcome.label
          || "Personnel TAC",

        status:
          tac.finalSeverity ===
            "complete"
          || tac.exposureRequired
            ? "failure"
            : "resolved",

        summary:
          tac.outcome.label,

        ruling:
          tac.outcome.text,

        metadata: {
          tac
        }
      });

    addRecentResult(result);
    appState.activeResultId =
      result.id;

    renderActiveResult();
    renderRecentResults();
    persistSessionState();
  } catch (error) {
    addResolverExceptionResult(
      "tac",
      "Personnel TAC Error",
      error
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Wounds                                                                     */
/* -------------------------------------------------------------------------- */

function bindWoundEvents() {
  const form =
    document.querySelector("#wound-form");

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    handleWoundSubmit
  );

  form.addEventListener(
    "change",
    updateWoundFields
  );

  form.addEventListener(
    "reset",
    () => {
      window.setTimeout(
        updateWoundFields,
        0
      );
    }
  );
}

function updateWoundFields() {
  const woundType =
    document.querySelector(
      "#wound-type"
    )?.value;

  const severity =
    document.querySelector(
      "#wound-severity"
    );

  const compact =
    woundType ===
      "vacuum_decompression"
    || woundType ===
      "pressure_barotrauma";

  if (severity) {
    severity.disabled = compact;
  }

  const linkedEntity =
    getLinkedWoundEntity();

  const dampeningSelect =
    document.querySelector(
      "#wound-dampening"
    );

  const usesInput =
    document.querySelector(
      "#wound-dampening-uses"
    );

  const functioningInput =
    document.querySelector(
      "#wound-armor-functioning"
    );

  const sourceNote =
    document.querySelector(
      "#wound-dampening-source"
    );

  if (
    !dampeningSelect
    || !usesInput
    || !functioningInput
  ) {
    return;
  }

  if (linkedEntity) {
    const system =
      linkedEntity.armorSystems
        ?.traumaDampening
      ?? null;

    dampeningSelect.value =
      system?.id ?? "";

    usesInput.value =
      system?.usesRemaining ?? 0;

    functioningInput.checked =
      system?.functioning !== false
      && Boolean(system);

    dampeningSelect.disabled = true;
    usesInput.disabled = true;
    functioningInput.disabled = true;

    if (sourceNote) {
      sourceNote.textContent =
        `Using linked state from ${linkedEntity.label}.`;
    }

    return;
  }

  dampeningSelect.disabled = false;
  usesInput.disabled = false;
  functioningInput.disabled = false;

  if (sourceNote) {
    sourceNote.textContent =
      "Manual fallback controls.";
  }

  if (dampeningSelect.value === "") {
    usesInput.value = 0;
  } else {
    const maximumUses =
      dampeningSelect.value ===
        "trauma_dampening_plus"
        ? 2
        : 1;

    if (
      Number(usesInput.value) <= 0
      || Number(usesInput.value) >
        maximumUses
    ) {
      usesInput.value =
        maximumUses;
    }
  }
}

function getLinkedWoundEntity() {
  const entityId =
    document.querySelector(
      "#wound-entity-id"
    )?.value ?? "";

  if (!entityId) {
    return null;
  }

  return getQuickEntity(
    appState.quickEntities,
    entityId
  );
}

function handleWoundSubmit(event) {
  event.preventDefault();

  try {
    const linkedEntity =
      getLinkedWoundEntity();

    const linkedSystem =
      linkedEntity?.armorSystems
        ?.traumaDampening
      ?? null;

    const manualDampeningId =
      document.querySelector(
        "#wound-dampening"
      ).value;

    const dampeningId =
      linkedEntity
        ? linkedSystem?.id ?? ""
        : manualDampeningId;

    const traumaDampening =
      dampeningId ===
        "trauma_dampening"
        ? TRAUMA_DAMPENING
        : dampeningId ===
          "trauma_dampening_plus"
          ? TRAUMA_DAMPENING_PLUS
          : null;

    const usesRemaining =
      linkedEntity
        ? Number(
            linkedSystem
              ?.usesRemaining
            ?? 0
          )
        : Number(
            document.querySelector(
              "#wound-dampening-uses"
            ).value
            || 0
          );

    const armorFunctioning =
      linkedEntity
        ? Boolean(linkedSystem)
          && linkedSystem
            .functioning !== false
        : document.querySelector(
            "#wound-armor-functioning"
          ).checked;

    const forcedRollValue =
      document.querySelector(
        "#wound-forced-roll"
      ).value;

    const wound = resolveWound({
      woundType:
        document.querySelector(
          "#wound-type"
        ).value,

      requestedSeverity: (() => {
        const severityInput =
          document.querySelector(
            "#wound-severity"
          );

        if (
          severityInput.disabled
          || severityInput.value === ""
        ) {
          return null;
        }

        return severityInput.value;
      })(),

      threshold:
        document.querySelector(
          "#wound-threshold"
        ).value,

      deadlyAuthorized:
        document.querySelector(
          "#wound-deadly-authorized"
        ).checked,

      traumaDampening,

      traumaDampeningUsesRemaining:
        usesRemaining,

      armorFunctioning,

      forcedRoll:
        forcedRollValue === ""
          ? null
          : Number(forcedRollValue)
    });

    if (
      linkedEntity
      && linkedSystem
      && wound
        .traumaDampeningUseConsumed
    ) {
      appState.quickEntities =
        appState.quickEntities.map(
          (entity) =>
            entity.id !==
              linkedEntity.id
              ? entity
              : {
                  ...entity,

                  armorSystems: {
                    ...entity
                      .armorSystems,

                    traumaDampening: {
                      ...linkedSystem,

                      usesRemaining:
                        wound
                          .traumaDampeningUsesAfter
                    }
                  }
                }
        );

      renderQuickEntitySessionBoard();
    }

    const result =
      createConsoleResult({
        resolverId: "wounds",

        label:
          document.querySelector(
            "#wound-label"
          ).value.trim()
          || linkedEntity?.label
          || wound.result?.label
          || "Wound Result",

        status: "resolved",

        summary:
          wound.result?.label
          ?? `${formatAppIdentifier(
            wound.woundType
          )} wound`,

        ruling:
          wound.result?.effectText
          ?? "Apply the listed wound effect.",

        metadata: {
          wound,

          linkedEntityId:
            linkedEntity?.id
            ?? null
        }
      });

    addRecentResult(result);
    appState.activeResultId =
      result.id;

    renderActiveResult();
    renderRecentResults();
    persistSessionState();

    if (linkedEntity) {
      renderActiveTool();
    }
  } catch (error) {
    addResolverExceptionResult(
      "wounds",
      "Wound Resolution Error",
      error
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Hazards                                                                    */
/* -------------------------------------------------------------------------- */

function bindHazardEvents() {
  const form =
    document.querySelector("#hazard-form");

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    handleHazardSubmit
  );

  form.addEventListener(
    "change",
    handleHazardFormChange
  );

  form.addEventListener(
    "reset",
    () => {
      window.setTimeout(() => {
        updateHazardOperationFields();
        updateHazardTypeFields();
        updateHazardProtectionFields();
      }, 0);
    }
  );
}

function handleHazardFormChange(event) {
  if (
    event.target.id ===
    "hazard-operation"
  ) {
    updateHazardOperationFields();
  }

  if (
    event.target.id ===
    "hazard-type"
  ) {
    updateHazardTypeFields();
  }

  if (
    event.target.id ===
      "hazard-protection-enabled"
    || event.target.id ===
      "hazard-protection-timed"
  ) {
    updateHazardProtectionFields();
  }

  if (
    event.target.id ===
    "hazard-tracker-id"
  ) {
    appState.selectedHazardTrackerId =
      event.target.value || null;

    persistSessionState();
  }
}

function updateHazardOperationFields() {
  const operation =
    document.querySelector(
      "#hazard-operation"
    )?.value ?? "create";

  document
    .querySelectorAll(
      "[data-hazard-operation-section]"
    )
    .forEach((section) => {
      const active =
        section.dataset
          .hazardOperationSection
        === operation;

      section.hidden = !active;

      setSectionInputsDisabled(
        section,
        !active
      );
    });

  document
    .querySelectorAll(
      "[data-hazard-create-section]"
    )
    .forEach((section) => {
      const active =
        operation === "create";

      section.hidden = !active;

      setSectionInputsDisabled(
        section,
        !active
      );
    });

  updateHazardTypeFields();
}

function updateHazardTypeFields() {
  const operation =
    document.querySelector(
      "#hazard-operation"
    )?.value ?? "create";

  const type =
    document.querySelector(
      "#hazard-type"
    )?.value ?? "air_loss";

  document
    .querySelectorAll(
      "[data-hazard-type-section]"
    )
    .forEach((section) => {
      const active =
        operation === "create"
        && section.dataset
          .hazardTypeSection === type;

      section.hidden = !active;

      setSectionInputsDisabled(
        section,
        !active
      );
    });
}

function updateHazardProtectionFields() {
  const enabled =
    document.querySelector(
      "#hazard-protection-enabled"
    )?.checked === true;

  const timed =
    enabled &&
    document.querySelector(
      "#hazard-protection-timed"
    )?.checked === true;

  toggleField(
    "#hazard-protection-source-field",
    enabled
  );

  toggleField(
    "#hazard-protection-remaining-field",
    timed
  );

  toggleField(
    "#hazard-protection-unit-field",
    timed
  );

  const effective =
    document.querySelector(
      "#hazard-protection-effective"
    );

  const timedInput =
    document.querySelector(
      "#hazard-protection-timed"
    );

  if (effective) {
    effective.disabled = !enabled;
  }

  if (timedInput) {
    timedInput.disabled = !enabled;
  }
}

function toggleField(
  selector,
  visible
) {
  const field =
    document.querySelector(selector);

  if (!field) {
    return;
  }

  field.hidden = !visible;

  field
    .querySelectorAll(
      "input, select, textarea"
    )
    .forEach((input) => {
      input.disabled = !visible;
    });
}

function handleHazardSubmit(event) {
  event.preventDefault();

  const operation =
    document.querySelector(
      "#hazard-operation"
    ).value;

  try {
    if (operation === "advance") {
      advanceSelectedHazard();
    } else {
      createHazardFromForm();
    }
  } catch (error) {
    addResolverExceptionResult(
      "hazards",
      "Hazard Resolution Error",
      error
    );
  }
}

function createHazardFromForm() {
  const type =
    document.querySelector(
      "#hazard-type"
    ).value;

  const protection =
    collectHazardProtection();

  let response;

  switch (type) {
    case "air_loss":
      response =
        createAirLossTracker({
          source:
            document.querySelector(
              "#hazard-air-source"
            ).value,

          interval:
            document.querySelector(
              "#hazard-air-interval"
            ).value.trim()
            || null,

          protection
        });
      break;

    case "vacuum":
      response =
        createVacuumTracker({
          protectionState:
            document.querySelector(
              "#hazard-vacuum-protection-state"
            ).value,

          suitSealIntact:
            document.querySelector(
              "#hazard-vacuum-seal-intact"
            ).checked,

          breathingSupply:
            protection?.timer?.remaining
            ?? null,

          breathingUnit:
            protection?.timer?.unit
            ?? "rounds",

          collisionRisk:
            document.querySelector(
              "#hazard-vacuum-collision-risk"
            ).checked,

          explosiveDecompression:
            document.querySelector(
              "#hazard-vacuum-explosive"
            ).checked
        });
      break;

    case "personnel_radiation":
      response =
        createPersonnelRadiationTracker({
          intensity:
            document.querySelector(
              "#hazard-radiation-intensity"
            ).value,

          protection,

          stageId:
            document.querySelector(
              "#hazard-radiation-stage"
            ).value
        });
      break;

    case "heat":
    case "cold":
      response =
        createThermalTracker({
          trackId: type,
          protection
        });
      break;

    case "toxin":
      response =
        createToxinTracker({
          profile:
            collectToxinProfile(),

          protection
        });
      break;

    case "ship_radiation":
      response =
        createShipRadiationTracker({
          mode:
            document.querySelector(
              "#hazard-ship-mode"
            ).value,

          intensity:
            document.querySelector(
              "#hazard-ship-intensity"
            ).value,

          protectionRemaining:
            protection?.timer?.remaining
            ?? 60,

          protectionUnit:
            protection?.timer?.unit
            ?? "minutes"
        });
      break;

    default:
      throw new RangeError(
        `Unknown hazard type: ${type}`
      );
  }

  handleHazardResponse(
    response,
    {
      operation: "create",
      type
    }
  );
}

function advanceSelectedHazard() {
  const trackerRecord =
    getSelectedHazardTracker();

  if (!trackerRecord) {
    throw new RangeError(
      "Select an active hazard tracker."
    );
  }

  const intervals = Number(
    document.querySelector(
      "#hazard-intervals"
    ).value || 1
  );

  const saveValue =
    document.querySelector(
      "#hazard-save-result"
    ).value;

  const saveSucceeded =
    saveValue === ""
      ? null
      : saveValue === "success";

  const leaveHazard =
    document.querySelector(
      "#hazard-leave"
    ).checked;

  const breathingRestored =
    document.querySelector(
      "#hazard-breathing-restored"
    ).checked;

  let response;

  switch (trackerRecord.tracker.type) {
    case "air_loss":
      response =
        advanceAirLossTracker(
          trackerRecord.tracker,
          {
            saveSucceeded,
            breathingRestored,
            protectionIntervals:
              intervals
          }
        );
      break;

    case "vacuum":
      response =
        advanceVacuumTracker(
          trackerRecord.tracker,
          {
            intervals,

            suitSealFailed:
              document.querySelector(
                "#hazard-seal-failed"
              ).checked,

            collisionOccurred:
              document.querySelector(
                "#hazard-collision-occurred"
              ).checked
          }
        );
      break;

    case "personnel_radiation":
      response =
        advancePersonnelRadiationTracker(
          trackerRecord.tracker,
          {
            intervals,
            bodySaveSucceeded:
              saveSucceeded,
            leaveHazard
          }
        );
      break;

    case "heat":
    case "cold":
      response =
        advanceThermalTracker(
          trackerRecord.tracker,
          {
            intervals,
            bodySaveSucceeded:
              saveSucceeded,
            leaveHazard
          }
        );
      break;

    case "toxin":
      response =
        advanceToxinTracker(
          trackerRecord.tracker,
          {
            intervals,
            exposureEnded:
              leaveHazard
          }
        );
      break;

    case "ship_radiation":
      response =
        advanceShipRadiationTracker(
          trackerRecord.tracker,
          {
            intervals,
            leaveHazard
          }
        );
      break;

    default:
      throw new RangeError(
        `Unsupported tracker type: ${trackerRecord.tracker.type}`
      );
  }

  handleHazardResponse(
    response,
    {
      operation: "advance",
      trackerRecord
    }
  );
}

function collectHazardProtection() {
  const enabled =
    document.querySelector(
      "#hazard-protection-enabled"
    ).checked;

  if (!enabled) {
    return null;
  }

  const timed =
    document.querySelector(
      "#hazard-protection-timed"
    ).checked;

  return {
    source:
      document.querySelector(
        "#hazard-protection-source"
      ).value.trim()
      || "Protection",

    effective:
      document.querySelector(
        "#hazard-protection-effective"
      ).checked,

    timer:
      timed
        ? {
            remaining: Number(
              document.querySelector(
                "#hazard-protection-remaining"
              ).value || 0
            ),

            maximum: Number(
              document.querySelector(
                "#hazard-protection-remaining"
              ).value || 0
            ),

            unit:
              document.querySelector(
                "#hazard-protection-unit"
              ).value,

            depletionRate: 1
          }
        : null
  };
}

function collectToxinProfile() {
  const family =
    document.querySelector(
      "#hazard-toxin-family"
    ).value;

  return {
    id: `toxin_${family}`,
    label:
      `${formatAppIdentifier(family)} Exposure`,
    family,

    exposureRoutes:
      parseCommaList(
        document.querySelector(
          "#hazard-toxin-routes"
        ).value
      ),

    severity:
      document.querySelector(
        "#hazard-toxin-severity"
      ).value,

    effects:
      parseCommaList(
        document.querySelector(
          "#hazard-toxin-effects"
        ).value
      ),

    duration:
      document.querySelector(
        "#hazard-toxin-duration"
      ).value.trim()
      || "until_treated",

    treatment:
      parseCommaList(
        document.querySelector(
          "#hazard-toxin-treatment"
        ).value
      )
  };
}

function handleHazardResponse(
  response,
  {
    operation,
    type = null,
    trackerRecord = null
  }
) {
  if (!response?.ok) {
    const message =
      response?.errors?.join(" ")
      || "The hazard resolver rejected the input.";

    throw new Error(message);
  }

  let record;

  if (operation === "create") {
    record = {
      id: createLocalId(
        "hazard_tracker"
      ),

      label:
        document.querySelector(
          "#hazard-label"
        ).value.trim()
        || formatAppIdentifier(
          response.tracker.hazardId
          ?? response.tracker.type
          ?? type
        ),

      tracker:
        response.tracker
    };

    appState.hazardTrackers.unshift(
      record
    );
  } else {
    record = {
      ...trackerRecord,
      tracker:
        response.tracker
    };

    appState.hazardTrackers =
      appState.hazardTrackers.map(
        (item) =>
          item.id === record.id
            ? record
            : item
      );
  }

  appState.selectedHazardTrackerId =
    record.id;

  const result =
    createConsoleResult({
      resolverId: "hazards",
      label: record.label,

      status:
        mapHazardStatus(
          response.tracker.status
        ),

      summary:
        summarizeHazardResponse(
          response
        ),

      ruling:
        ruleHazardResponse(
          response
        ),

      metadata: {
        operation,
        trackerId:
          record.id,

        tracker:
          response.tracker,

        consequences:
          response.consequences ?? {},

        handoffs:
          response.handoffs ?? {},

        warnings:
          response.warnings ?? []
      }
    });

  addRecentResult(result);
  appState.activeResultId =
    result.id;

  renderActiveResult();
  renderRecentResults();
  renderHazardSessionBoard();
  renderActiveTool();
  persistSessionState();
}

function getSelectedHazardTracker() {
  const selectedId =
    document.querySelector(
      "#hazard-tracker-id"
    )?.value
    || appState.selectedHazardTrackerId;

  return appState.hazardTrackers.find(
    (item) =>
      item.id === selectedId
  ) ?? null;
}

function handleHazardTrackerLinkClick(
  event
) {
  const button =
    event.target.closest(
      "[data-hazard-tracker-id]"
    );

  if (!button) {
    return;
  }

  appState.selectedHazardTrackerId =
    button.dataset.hazardTrackerId;

  appState.activeTool = "hazards";

  renderToolNavigation();
  renderActiveTool();
  closeMobilePanels();
  persistSessionState();
}

function renderHazardSessionBoard() {
  if (!elements.hazardSummary) {
    return;
  }

  elements.hazardSummary.innerHTML =
    renderHazardTrackerBoard(
      appState.hazardTrackers
    );
}

function mapHazardStatus(status) {
  if (
    status === "fatal" ||
    status === "exposed"
  ) {
    return "failure";
  }

  if (
    status === "resolved" ||
    status === "stabilized"
  ) {
    return "resolved";
  }

  return "active";
}

function summarizeHazardResponse(
  response
) {
  const tracker =
    response.tracker ?? {};

  const stage =
    response.consequences?.stage
    ?? response.consequences?.currentStage;

  if (stage?.label) {
    return stage.label;
  }

  return `${formatAppIdentifier(
    tracker.hazardId ?? tracker.type
  )}: ${formatAppIdentifier(
    tracker.status
  )}`;
}

function ruleHazardResponse(
  response
) {
  const consequences =
    response.consequences ?? {};

  if (consequences.bodySaveRequired) {
    return "Make the required Body Save using the displayed disadvantage.";
  }

  if (consequences.woundRollRequired) {
    return "Resolve the listed wound-table handoff and begin any secondary hazard tracker.";
  }

  if (consequences.exposureStopped) {
    return "New exposure stops. Existing injuries or stages remain until treated.";
  }

  if (
    consequences.directExposure === false
    || consequences.directVacuumExposure === false
  ) {
    return "Protection remains effective. Advance any active timer as shown.";
  }

  return "Apply the displayed hazard consequences and retain the updated tracker.";
}

function createConsoleResult({
  resolverId,
  label,
  status,
  summary,
  ruling,
  metadata = {}
}) {
  return {
    id: createLocalId(resolverId),
    resolverId,
    label,
    status,
    summary,
    ruling,
    metadata,
    createdAt:
      new Date().toISOString()
  };
}

function addResolverExceptionResult(
  resolverId,
  label,
  error
) {
  const result =
    createConsoleResult({
      resolverId,
      label,
      status: "error",
      summary:
        "The resolver could not complete this request.",
      ruling:
        error?.message
        ?? String(error),
      metadata: {
        errors: [
          {
            field: "resolver",
            message:
              error?.message
              ?? String(error)
          }
        ]
      }
    });

  addRecentResult(result);
  appState.activeResultId =
    result.id;

  renderActiveResult();
  renderRecentResults();
  persistSessionState();
}

function createLocalId(prefix) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random()
    .toString(16)
    .slice(2)}`;
}

function formatAppIdentifier(value) {
  return String(value ?? "Unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

/* -------------------------------------------------------------------------- */
/* Quick Entities                                                             */
/* -------------------------------------------------------------------------- */

function bindQuickEntityToolEvents() {
  const form = document.querySelector(
    "#quick-entity-form"
  );

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    handleQuickEntitySubmit
  );

  form.addEventListener(
    "reset",
    handleQuickEntityReset
  );

  const templateSelect = document.querySelector(
    "#quick-entity-template"
  );

  templateSelect?.addEventListener(
    "change",
    handleQuickEntityTemplateChange
  );
}

function handleQuickEntityAction(event) {
  const control = event.target.closest(
    "[data-quick-entity-action]"
  );

  if (!control) {
    return;
  }

  const action =
    control.dataset.quickEntityAction;

  const entityId =
    control.dataset.entityId ??
    null;

  switch (action) {
    case "new":
      beginNewQuickEntity();
      break;

    case "select":
      selectQuickEntity(entityId);
      break;

    case "duplicate":
      duplicateSelectedQuickEntity(entityId);
      break;

    case "delete":
      deleteQuickEntity(entityId);
      break;

    case "cancel-edit":
      cancelQuickEntityEdit();
      break;

    case "load-damage":
      loadQuickEntityInDamageTool(entityId);
      break;

    case "create-group":
      createQuickEntityGroup();
      break;

    default:
      break;
  }
}

function createQuickEntityGroup() {
  const groupId =
    document.querySelector(
      "#quick-entity-group"
    )?.value;

  if (!groupId) {
    return;
  }

  const result =
    createEntitiesFromGroupTemplate(
      groupId
    );

  if (isQuickEntityError(result)) {
    appState.quickEntityErrors =
      result.errors;

    renderActiveTool();
    return;
  }

  appState.quickEntities = [
    ...appState.quickEntities,
    ...result
  ];

  appState.selectedEntityId =
    result[0]?.id ?? null;

  appState.editingEntityId =
    result[0]?.id ?? null;

  appState.quickEntityErrors = [];

  renderQuickEntityViews();
  persistSessionState();
}

function beginNewQuickEntity() {
  appState.editingEntityId = null;
  appState.quickEntityErrors = [];
  appState.activeTool = "quick_entities";

  renderToolNavigation();
  renderActiveTool();
}

function selectQuickEntity(entityId) {
  const entity = getQuickEntity(
    appState.quickEntities,
    entityId
  );

  if (!entity) {
    return;
  }

  appState.selectedEntityId = entityId;
  appState.editingEntityId = entityId;
  appState.quickEntityErrors = [];

  if (appState.activeTool === "quick_entities") {
    renderActiveTool();
  }

  renderQuickEntitySessionBoard();
  persistSessionState();
}

function duplicateSelectedQuickEntity(entityId) {
  const source = getQuickEntity(
    appState.quickEntities,
    entityId
  );

  if (!source) {
    return;
  }

  const duplicate = duplicateQuickEntity(source);

  if (isQuickEntityError(duplicate)) {
    appState.quickEntityErrors =
      duplicate.errors;

    appState.activeTool = "quick_entities";
    renderToolNavigation();
    renderActiveTool();
    return;
  }

  appState.quickEntities = [
    ...appState.quickEntities,
    duplicate
  ];

  appState.selectedEntityId =
    duplicate.id;

  appState.editingEntityId =
    duplicate.id;

  appState.quickEntityErrors = [];

  renderQuickEntityViews();
  persistSessionState();
}

function deleteQuickEntity(entityId) {
  const entity = getQuickEntity(
    appState.quickEntities,
    entityId
  );

  if (!entity) {
    return;
  }

  const confirmed = window.confirm(
    `Delete ${entity.label}?`
  );

  if (!confirmed) {
    return;
  }

  appState.quickEntities =
    removeQuickEntity(
      appState.quickEntities,
      entityId
    );

  if (
    appState.selectedEntityId === entityId
  ) {
    appState.selectedEntityId =
      appState.quickEntities[0]?.id ??
      null;
  }

  if (
    appState.editingEntityId === entityId
  ) {
    appState.editingEntityId = null;
  }

  appState.quickEntityErrors = [];

  renderQuickEntityViews();
  persistSessionState();
}

function cancelQuickEntityEdit() {
  appState.editingEntityId = null;
  appState.quickEntityErrors = [];

  renderActiveTool();
}

function handleQuickEntitySubmit(event) {
  event.preventDefault();

  const formInput =
    collectQuickEntityFormInput();

  let result;

  if (formInput.id) {
    const existing = getQuickEntity(
      appState.quickEntities,
      formInput.id
    );

    if (!existing) {
      appState.quickEntityErrors = [
        {
          field: "id",
          code: "entity_not_found",
          message:
            "The entity being edited no longer exists."
        }
      ];

      renderActiveTool();
      return;
    }

    result = updateQuickEntity(
      existing,
      formInput
    );
  } else if (formInput.templateId) {
    result = createEntityFromTemplate(
      formInput.templateId,
      formInput
    );
  } else {
    result = createQuickEntity(formInput);
  }

  if (isQuickEntityError(result)) {
    appState.quickEntityErrors =
      result.errors;

    renderActiveTool();
    return;
  }

  if (formInput.id) {
    appState.quickEntities =
      replaceQuickEntity(
        appState.quickEntities,
        result
      );
  } else {
    appState.quickEntities = [
      ...appState.quickEntities,
      result
    ];
  }

  appState.selectedEntityId = result.id;
  appState.editingEntityId = result.id;
  appState.quickEntityErrors = [];

  renderQuickEntityViews();
  persistSessionState();
}

function handleQuickEntityReset() {
  window.setTimeout(() => {
    appState.editingEntityId = null;
    appState.quickEntityErrors = [];
    renderActiveTool();
  }, 0);
}

function handleQuickEntityTemplateChange(event) {
  const templateId = event.target.value;

  if (!templateId) {
    return;
  }

  const template =
    getEntityTemplate(templateId);

  if (!template) {
    return;
  }

  const preview = createEntityFromTemplate(
    template,
    {
      label:
        document.querySelector(
          "#quick-entity-label"
        )?.value.trim() ||
        template.label
    }
  );

  if (isQuickEntityError(preview)) {
    return;
  }

  populateQuickEntityForm(preview, {
    preserveId: true
  });
}function collectQuickEntityFormInput() {
  return {
    id:
      document.querySelector(
        "#quick-entity-id"
      ).value || null,

    label:
      document.querySelector(
        "#quick-entity-label"
      ).value.trim(),

    type:
      document.querySelector(
        "#quick-entity-type"
      ).value,

    templateId:
      document.querySelector(
        "#quick-entity-template"
      ).value || null,

    defense: {
      av: Number(
        document.querySelector(
          "#quick-entity-av"
        ).value
      ),

      dr: Number(
        document.querySelector(
          "#quick-entity-dr"
        ).value
      ),

      coverAv: Number(
        document.querySelector(
          "#quick-entity-cover-av"
        ).value
      ),

      armored:
        document.querySelector(
          "#quick-entity-armored"
        ).checked,

      tags: parseCommaList(
        document.querySelector(
          "#quick-entity-defense-tags"
        ).value
      )
    },

    health: {
      healthPerWound: Number(
        document.querySelector(
          "#quick-entity-health-per-wound"
        ).value
      ),

      currentHealth: Number(
        document.querySelector(
          "#quick-entity-current-health"
        ).value
      ),

      maximumWounds: Number(
        document.querySelector(
          "#quick-entity-maximum-wounds"
        ).value
      ),

      woundsRemaining: Number(
        document.querySelector(
          "#quick-entity-wounds-remaining"
        ).value
      )
    },

    conditions: {
      bleeding: Number(
        document.querySelector(
          "#quick-entity-bleeding"
        ).value
      ),

      activeTac: parseCommaList(
        document.querySelector(
          "#quick-entity-active-tac"
        ).value
      ),

      statuses: parseCommaList(
        document.querySelector(
          "#quick-entity-statuses"
        ).value
      )
    },

    notes:
      document.querySelector(
        "#quick-entity-notes"
      ).value.trim()
  };
}

function populateQuickEntityForm(
  entity,
  {
    preserveId = false
  } = {}
) {
  const idField = document.querySelector(
    "#quick-entity-id"
  );

  if (!preserveId) {
    idField.value = entity.id ?? "";
  }

  document.querySelector(
    "#quick-entity-template"
  ).value = entity.templateId ?? "";

  document.querySelector(
    "#quick-entity-label"
  ).value = entity.label ?? "";

  document.querySelector(
    "#quick-entity-type"
  ).value = entity.type ?? "enemy";

  document.querySelector(
    "#quick-entity-av"
  ).value = entity.defense?.av ?? 0;

  document.querySelector(
    "#quick-entity-dr"
  ).value = entity.defense?.dr ?? 0;

  document.querySelector(
    "#quick-entity-cover-av"
  ).value = entity.defense?.coverAv ?? 0;

  document.querySelector(
    "#quick-entity-armored"
  ).checked =
    entity.defense?.armored === true;

  document.querySelector(
    "#quick-entity-defense-tags"
  ).value =
    entity.defense?.tags?.join(", ") ?? "";

  document.querySelector(
    "#quick-entity-health-per-wound"
  ).value =
    entity.health?.healthPerWound ?? 10;

  document.querySelector(
    "#quick-entity-current-health"
  ).value =
    entity.health?.currentHealth ?? 10;

  document.querySelector(
    "#quick-entity-maximum-wounds"
  ).value =
    entity.health?.maximumWounds ?? 1;

  document.querySelector(
    "#quick-entity-wounds-remaining"
  ).value =
    entity.health?.woundsRemaining ?? 1;

  document.querySelector(
    "#quick-entity-bleeding"
  ).value =
    entity.conditions?.bleeding ?? 0;

  document.querySelector(
    "#quick-entity-active-tac"
  ).value =
    entity.conditions?.activeTac?.join(", ") ?? "";

  document.querySelector(
    "#quick-entity-statuses"
  ).value =
    entity.conditions?.statuses?.join(", ") ?? "";

  document.querySelector(
    "#quick-entity-notes"
  ).value =
    entity.notes ?? "";
}

function getEditingEntity() {
  if (!appState.editingEntityId) {
    return null;
  }

  return getQuickEntity(
    appState.quickEntities,
    appState.editingEntityId
  );
}

function renderQuickEntityViews() {
  if (appState.activeTool === "quick_entities") {
    renderActiveTool();
  }

  renderQuickEntitySessionBoard();
}


function renderQuickEntitySessionBoard() {
  elements.quickEntitySummary.innerHTML =
    renderQuickEntityBoard(
      appState.quickEntities,
      appState.selectedEntityId
    );
}

function loadQuickEntityInDamageTool(entityId) {
  const entity = getQuickEntity(
    appState.quickEntities,
    entityId
  );

  if (!entity) {
    return;
  }

  appState.selectedEntityId = entityId;
  appState.activeTool = "damage";

  renderToolNavigation();
  renderActiveTool();
  renderQuickEntitySessionBoard();
  closeMobilePanels();
  persistSessionState();
}

function parseCommaList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/* Results                                                                    */
/* -------------------------------------------------------------------------- */

function addRecentResult(result) {
  appState.recentResults.unshift(result);

  if (
    appState.recentResults.length >
    MAX_RECENT_RESULTS
  ) {
    appState.recentResults.length =
      MAX_RECENT_RESULTS;
  }
}

function renderActiveResult() {
  const result = getActiveResult();

  if (!result) {
    elements.activeResult.innerHTML = "";
    return;
  }

  if (result.status === "error") {
    elements.activeResult.innerHTML =
      renderErrorResult(result);
    return;
  }

  const renderer = resultRenderers[result.resolverId];

  elements.activeResult.innerHTML = renderer
    ? renderer(result)
    : renderErrorResult({
        ...result,
        label: "Unknown Result Type",
        summary:
          `No result renderer is registered for ${result.resolverId}.`,
        ruling:
          "Register a renderer before displaying this result.",
        metadata: {
          errors: []
        }
      });
}

function getActiveResult() {
  return appState.recentResults.find(
    (result) =>
      result.id === appState.activeResultId
  ) ?? null;
}

function renderRecentResults() {
  if (appState.recentResults.length === 0) {
    elements.recentResults.innerHTML = `
      <div class="empty-state empty-state--compact">
        No results yet.
      </div>
    `;

    return;
  }

  elements.recentResults.innerHTML =
    appState.recentResults
      .map((result) => {
        return `
          <button
            class="recent-result"
            type="button"
            data-result-id="${escapeHtml(result.id)}"
          >
            <span class="recent-result__topline">
              <span class="recent-result__label">
                ${escapeHtml(result.label)}
              </span>

              <span
                class="
                  recent-result__status
                  recent-result__status--${escapeHtml(
                    result.status
                  )}
                "
              >
                ${escapeHtml(result.status)}
              </span>
            </span>

            <span class="recent-result__summary">
              ${escapeHtml(result.summary)}
            </span>
          </button>
        `;
      })
      .join("");
}

function handleRecentResultClick(event) {
  const button = event.target.closest(
    "[data-result-id]"
  );

  if (!button) {
    return;
  }

  appState.activeResultId =
    button.dataset.resultId;

  renderActiveResult();
  persistSessionState();
}

function clearRecentResults() {
  if (appState.recentResults.length === 0) {
    return;
  }

  const confirmed = window.confirm(
    "Clear all recent results?"
  );

  if (!confirmed) {
    return;
  }

  appState.recentResults = [];
  appState.activeResultId = null;

  renderActiveResult();
  renderRecentResults();
  persistSessionState();
}

/* -------------------------------------------------------------------------- */
/* Persistence                                                                */
/* -------------------------------------------------------------------------- */

function persistSessionState() {
  try {
    const payload = {
      activeTool: appState.activeTool,
      recentResults: appState.recentResults,
      activeResultId: appState.activeResultId,
      quickEntities: appState.quickEntities,
      selectedEntityId: appState.selectedEntityId,
      hazardTrackers: appState.hazardTrackers,
      selectedHazardTrackerId:
        appState.selectedHazardTrackerId,
      preferences: {
        sessionTrayExpanded:
          appState.preferences.sessionTrayExpanded
      }
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(payload)
    );
  } catch (error) {
    console.warn(
      "Unable to persist Warden Console session state.",
      error
    );
  }
}

function restoreSessionState() {
  try {
    const raw = localStorage.getItem(
      STORAGE_KEY
    );

    if (!raw) {
      return;
    }

    const stored = JSON.parse(raw);

    if (
      typeof stored.activeTool === "string" &&
      tools[stored.activeTool]
    ) {
      appState.activeTool =
        stored.activeTool;
    }

    if (Array.isArray(stored.recentResults)) {
      appState.recentResults =
        stored.recentResults.slice(
          0,
          MAX_RECENT_RESULTS
        );
    }

    if (
      typeof stored.activeResultId === "string" ||
      stored.activeResultId === null
    ) {
      appState.activeResultId =
        stored.activeResultId;
    }

    if (Array.isArray(stored.quickEntities)) {
      appState.quickEntities =
        stored.quickEntities;
    }

    if (
      typeof stored.selectedEntityId === "string" ||
      stored.selectedEntityId === null
    ) {
      appState.selectedEntityId =
        stored.selectedEntityId;
    }

    if (Array.isArray(stored.hazardTrackers)) {
      appState.hazardTrackers =
        stored.hazardTrackers;
    }

    if (
      typeof stored.selectedHazardTrackerId
        === "string"
      || stored.selectedHazardTrackerId === null
    ) {
      appState.selectedHazardTrackerId =
        stored.selectedHazardTrackerId;
    }

    if (
      typeof stored.preferences
        ?.sessionTrayExpanded === "boolean"
    ) {
      appState.preferences
        .sessionTrayExpanded =
        stored.preferences
          .sessionTrayExpanded;
    }
  } catch (error) {
    console.warn(
      "Unable to restore Warden Console session state.",
      error
    );
  }
}/* -------------------------------------------------------------------------- */
/* Session Tray and Mobile Shell                                              */
/* -------------------------------------------------------------------------- */

function toggleSessionTray() {
  if (isMobileViewport()) {
    appState.preferences.mobileSessionOpen =
      !appState.preferences.mobileSessionOpen;

    appState.preferences.mobileNavOpen = false;
  } else {
    appState.preferences.sessionTrayExpanded =
      !appState.preferences.sessionTrayExpanded;
  }

  renderSessionTrayState();
  persistSessionState();
}

function collapseSessionTray() {
  if (isMobileViewport()) {
    appState.preferences.mobileSessionOpen = false;
  } else {
    appState.preferences.sessionTrayExpanded = false;
  }

  renderSessionTrayState();
  persistSessionState();
}

function openMobileNavigation() {
  appState.preferences.mobileNavOpen = true;
  appState.preferences.mobileSessionOpen = false;

  renderSessionTrayState();
}

function closeMobilePanels() {
  appState.preferences.mobileNavOpen = false;
  appState.preferences.mobileSessionOpen = false;

  renderSessionTrayState();
}

function renderSessionTrayState() {
  const isMobile = isMobileViewport();

  elements.body.classList.toggle(
    "session-tray-collapsed",
    !isMobile &&
      !appState.preferences.sessionTrayExpanded
  );

  elements.toolNavigation.classList.toggle(
    "is-open",
    isMobile &&
      appState.preferences.mobileNavOpen
  );

  elements.sessionTray.classList.toggle(
    "is-open",
    isMobile &&
      appState.preferences.mobileSessionOpen
  );

  elements.mobileOverlay.hidden =
    !isMobile ||
    (
      !appState.preferences.mobileNavOpen &&
      !appState.preferences.mobileSessionOpen
    );

  elements.mobileNavToggle.setAttribute(
    "aria-expanded",
    String(
      isMobile &&
      appState.preferences.mobileNavOpen
    )
  );

  elements.sessionTrayToggle.setAttribute(
    "aria-expanded",
    String(
      isMobile
        ? appState.preferences.mobileSessionOpen
        : appState.preferences.sessionTrayExpanded
    )
  );
}

function handleViewportChange() {
  if (!isMobileViewport()) {
    appState.preferences.mobileNavOpen = false;
    appState.preferences.mobileSessionOpen = false;
  }

  renderSessionTrayState();
}