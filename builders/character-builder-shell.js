import {
  createCharacterBuilderState,
  setBuilderStep,
  updateIdentityField,
  selectOrigin,
  selectBackground,
  selectCareer,
  selectSpecialty,
  selectSpecialtyFocus,
  setAgentOverlayEnabled,
  updateAgentOverlay,
  adjustBuilderGenerationAllocation,
  rollBuilderGeneration,
  resetBuilderGeneration,
  setBuilderSkillSelection,
  serializeCharacterExport,
  parseCharacterImport,
} from "../modules/character-builder-state.js";

import {
  renderCharacterBuilderShell,
} from "../renderers/character-builder-renderer.js";

export function mountCharacterBuilder(root, options = {}) {
  if (!(root instanceof Element)) {
    throw new TypeError("mountCharacterBuilder requires a DOM Element.");
  }

  let state = createCharacterBuilderState(options);

  function render() {
    root.innerHTML = renderCharacterBuilderShell(state);
  }

  function setState(nextState) {
    state = nextState;
    render();
  }

  root.addEventListener("click", async (event) => {
    const stepButton = event.target.closest("[data-builder-step]");
    if (stepButton) {
      setState(setBuilderStep(state, stepButton.dataset.builderStep));
      return;
    }

    const actionButton = event.target.closest("[data-builder-action]");
    if (!actionButton) return;

    const action = actionButton.dataset.builderAction;
    const optionId = actionButton.dataset.optionId ?? null;

    if (action === "select-origin") {
      setState(selectOrigin(state, optionId));
    } else if (action === "select-background") {
      setState(selectBackground(state, optionId));
    } else if (action === "select-career") {
      setState(selectCareer(state, optionId));
    } else if (action === "select-specialty") {
      setState(selectSpecialty(state, optionId));
    } else if (action === "apply-focus") {
      const focusId = root.querySelector("[data-builder-focus-select]")?.value ?? "";
      const customLabel = root.querySelector("[data-builder-focus-custom]")?.value ?? "";
      setState(selectSpecialtyFocus(state, { focusId, customLabel }));
    } else if (action === "generation-adjust") {
      setState(adjustBuilderGenerationAllocation(state, {
        section: actionButton.dataset.section,
        layer: actionButton.dataset.layer,
        id: actionButton.dataset.trackId,
        delta: Number(actionButton.dataset.delta || 0),
      }));
    } else if (action === "generation-roll") {
      setState(rollBuilderGeneration(state));
    } else if (action === "generation-reset") {
      setState(resetBuilderGeneration(state));
    } else if (action === "export") {
      downloadJson(
        serializeCharacterExport(state.record),
        buildExportFilename(state.record),
      );
    } else if (action === "import") {
      root.querySelector("[data-builder-import-input]")?.click();
    }
  });

  root.addEventListener("input", (event) => {
    const field = event.target.dataset.builderIdentityField;
    if (field) {
      state = updateIdentityField(state, field, event.target.value);
      refreshSummaryOnly(root, state);
      return;
    }

    if (event.target.matches("[data-builder-agent-objective]")) {
      state = updateAgentOverlay(state, { secretObjective: event.target.value });
    }

    if (event.target.matches("[data-builder-agent-trigger]")) {
      state = updateAgentOverlay(state, { revealTrigger: event.target.value });
    }
  });

  root.addEventListener("change", async (event) => {
    if (event.target.matches("[data-builder-skill-select]")) {
      setState(setBuilderSkillSelection(state, {
        layer: event.target.dataset.skillLayer,
        groupId: event.target.dataset.skillGroup,
        index: Number(event.target.dataset.skillIndex || 0),
        skillId: event.target.value,
      }));
      return;
    }

    if (event.target.matches("[data-builder-agent-enabled]")) {
      setState(setAgentOverlayEnabled(state, event.target.checked));
      return;
    }

    if (event.target.matches("[data-builder-agent-profile]")) {
      setState(updateAgentOverlay(state, { profileId: event.target.value }));
      return;
    }

    if (event.target.matches("[data-builder-agent-state]")) {
      setState(updateAgentOverlay(state, { stateId: event.target.value }));
      return;
    }

    if (event.target.matches("[data-builder-import-input]")) {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const record = parseCharacterImport(await file.text());
        state = createCharacterBuilderState({ record });
        state.dirty = false;
        render();
      } catch (error) {
        state = {
          ...state,
          errors: [error.message],
        };
        render();
      }
    }

    if (event.target.matches("[data-builder-creation-mode]")) {
      state = {
        ...state,
        record: {
          ...state.record,
          provenance: {
            ...state.record.provenance,
            creationMode: event.target.value,
          },
        },
        dirty: true,
      };
      refreshSummaryOnly(root, state);
    }
  });

  render();

  return Object.freeze({
    getState: () => state,
    getRecord: () => state.record,
    replaceRecord(record) {
      state = createCharacterBuilderState({ record });
      render();
    },
    destroy() {
      root.innerHTML = "";
    },
  });
}

function refreshSummaryOnly(root, state) {
  const summary = root.querySelector(".character-builder__summary");
  if (!summary) return;

  const name = state.record.identity.name || "Unnamed Character";
  const help = state.dirty ? "Unsaved changes" : "No changes";

  const heading = summary.querySelector("h3");
  const helpNode = summary.querySelector(".form-help");

  if (heading) heading.textContent = name;
  if (helpNode) helpNode.textContent = help;
}

function buildExportFilename(record) {
  const base = record.identity.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "character";

  return `${base}.character.json`;
}

function downloadJson(text, filename) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
