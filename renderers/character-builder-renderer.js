import {
  BUILD_MODES,
  listOrigins,
  listBackgrounds,
  listCareers,
  listSpecialties,
  listSuggestedFocuses,
  listAgentOverlayProfiles,
  AGENT_OVERLAY_STATES,
  getOrigin,
  getBackground,
  getAndroidProtocolHook,
  getCareer,
  getSpecialty,
  getBackgroundGenerationEligibility,
  getCareerGenerationEligibility,
  getSpecialtyGenerationEligibility,
  CHARACTER_STAT_GENERATION,
  CHARACTER_SAVE_GENERATION,
} from "../data/character-builder-options.js";

import {
  getSkillDefinition,
} from "../data/character-skill-options.js";

import {
  getSkillPackageView,
} from "../modules/character-skill-rules.js";

import {
  CHARACTER_BUILDER_STEPS,
  getBuilderCompletion,
  serializeCharacterExport,
} from "../modules/character-builder-state.js";

export function renderCharacterBuilderShell(state) {
  const completion = getBuilderCompletion(state);
  const record = state.record;

  return `
    <section class="character-builder" data-character-builder>
      <header class="character-builder__header">
        <div>
          <p class="eyebrow">Builder Suite</p>
          <h2>Character Builder</h2>
          <p class="panel__description">
            Assemble an exportable character record. Career and Specialty
            mechanics are intentionally provisional in this shell.
          </p>
        </div>

        <div class="character-builder__header-actions">
          <button class="button button--secondary" type="button" data-builder-action="import">
            Import JSON
          </button>
          <button class="button button--primary" type="button" data-builder-action="export">
            Export JSON
          </button>
        </div>
      </header>

      ${renderNotices(state)}

      <div class="character-builder__layout">
        ${renderStepNavigation(state, completion)}

        <main class="character-builder__workspace">
          ${renderActiveStep(state)}
        </main>

        ${renderSummaryRail(state)}
      </div>

      <input
        type="file"
        accept="application/json,.json"
        data-builder-import-input
        hidden
      >
    </section>
  `;
}

function renderStepNavigation(state, completion) {
  return `
    <nav class="character-builder__steps" aria-label="Character builder steps">
      ${CHARACTER_BUILDER_STEPS.map((step, index) => {
        const active = step.id === state.activeStepId;
        const complete = completion[step.id] === true;

        return `
          <button
            class="character-builder__step${active ? " is-active" : ""}${complete ? " is-complete" : ""}"
            type="button"
            data-builder-step="${escapeHtml(step.id)}"
            aria-current="${active ? "step" : "false"}"
          >
            <span class="character-builder__step-number">${index + 1}</span>
            <span>${escapeHtml(step.label)}</span>
          </button>
        `;
      }).join("")}
    </nav>
  `;
}

function renderActiveStep(state) {
  switch (state.activeStepId) {
    case "identity": return renderIdentityStep(state);
    case "origin": return renderOriginStep(state);
    case "background": return renderBackgroundStep(state);
    case "career": return renderCareerStep(state);
    case "specialty": return renderSpecialtyStep(state);
    case "generation": return renderGenerationStep(state);
    case "skills": return renderSkillsStep(state);
    case "agent": return renderAgentStep(state);
    case "review": return renderReviewStep(state);
    default: return renderIdentityStep(state);
  }
}

function renderIdentityStep(state) {
  const identity = state.record.identity;
  const mode = state.record.provenance?.creationMode ?? "campaign";

  return renderStepPanel({
    eyebrow: "Step 1",
    title: "Identity",
    description: "Set the public identity and build mode. These fields do not apply mechanics.",
    body: `
      <div class="form-grid">
        ${renderTextField("Name", "name", identity.name, true)}
        ${renderTextField("Player Name", "playerName", identity.playerName)}
        ${renderTextField("Callsign", "callsign", identity.callsign)}
        ${renderTextField("Pronouns", "pronouns", identity.pronouns)}
        ${renderTextField("Rank / Title", "rank", identity.rank)}
        ${renderTextField("Crew", "crewName", identity.crewName)}
        ${renderTextField("Ship", "shipName", identity.shipName)}
        ${renderTextField("Employer", "employer", identity.employer)}
        <div class="form-field form-field--full">
          <label class="form-label" for="builder-creation-mode">Build Mode</label>
          <select id="builder-creation-mode" class="select" data-builder-creation-mode>
            ${BUILD_MODES.map((entry) => `
              <option value="${escapeHtml(entry.id)}" ${entry.id === mode ? "selected" : ""}>
                ${escapeHtml(entry.label)}
              </option>
            `).join("")}
          </select>
          <p class="form-help">Campaign Build will eventually expose the full debt, legality, ownership, and hidden-data controls.</p>
        </div>
      </div>
    `,
  });
}

function renderOriginStep(state) {
  const selectedId = state.record.profile.origin.definitionId;
  const selected = selectedId ? getOrigin(selectedId) : null;

  return renderStepPanel({
    eyebrow: "Step 2",
    title: "Origin",
    description: "Origin defines the character's biological or synthetic baseline.",
    body: `
      ${renderOptionCards(listOrigins(), selectedId, "select-origin")}
      ${selected ? renderOriginDetails(selected) : ""}
    `,
  });
}

function renderBackgroundStep(state) {
  const originId = state.record.profile.origin.definitionId;
  const selectedId = state.record.profile.background.definitionId;
  const selected = selectedId ? getBackground(selectedId) : null;

  return renderStepPanel({
    eyebrow: "Step 3",
    title: "Background",
    description: originId
      ? "Background describes what shaped the character before their present Career. Androids may use normal Backgrounds or Android-specific service routes."
      : "Choose an Origin first to filter available Backgrounds.",
    body: `
      ${renderOptionCards(
        originId ? listBackgrounds({ originId }) : [],
        selectedId,
        "select-background",
        "No Backgrounds are available until an Origin is selected."
      )}
      ${selected ? renderBackgroundDetails(selected) : ""}
    `,
  });
}

function renderOriginDetails(origin) {
  const traits = Array.isArray(origin.traits) ? origin.traits : [];
  const hooks = Array.isArray(origin.protocolHookIds)
    ? origin.protocolHookIds
        .map((id) => getAndroidProtocolHook(id))
        .filter(Boolean)
    : [];

  if (!traits.length && !hooks.length) return "";

  return `
    <section class="character-builder__subpanel">
      <div class="form-section__heading">
        <div>
          <h3>${escapeHtml(origin.label)} Traits</h3>
          <p class="form-help">These describe the Origin baseline. Final mechanical application remains provisional.</p>
        </div>
      </div>
      ${traits.length ? `
        <div class="character-builder__detail-list">
          ${traits.map((trait) => `
            <article class="character-builder__detail-item">
              <strong>${escapeHtml(trait.label)}</strong>
              <p>${escapeHtml(trait.description)}</p>
            </article>
          `).join("")}
        </div>
      ` : ""}
      ${hooks.length ? `
        <div class="character-builder__detail-list">
          ${hooks.map((hook) => `
            <article class="character-builder__detail-item">
              <strong>${escapeHtml(hook.label)}</strong>
              <p>${escapeHtml(hook.description)}</p>
            </article>
          `).join("")}
        </div>
      ` : ""}
    </section>
  `;
}

function renderBackgroundDetails(background) {
  const granted = background.mechanics?.grantedSkills ?? [];
  const choices = background.mechanics?.skillChoiceGroups ?? [];
  const hooks = background.suggestedProtocolHookIds ?? [];

  if (!granted.length && !choices.length && !hooks.length) return "";

  return `
    <section class="character-builder__subpanel">
      <div class="form-section__heading">
        <div>
          <h3>${escapeHtml(background.label)} Package</h3>
          <p class="form-help">Skill application is not active yet; this preview preserves the intended package.</p>
        </div>
      </div>
      ${granted.length ? `
        <p><strong>Granted skills:</strong> ${granted.map((entry) => escapeHtml(formatIdentifier(entry.skillId))).join(", ")}</p>
      ` : ""}
      ${choices.map((group) => `
        <p><strong>${escapeHtml(group.label)}</strong> ${group.skillIds.map((id) => escapeHtml(formatIdentifier(id))).join(", ")}</p>
      `).join("")}
      ${hooks.length ? `
        <p><strong>Suggested protocol hooks:</strong> ${hooks.map((id) => {
          const hook = getAndroidProtocolHook(id);
          return escapeHtml(hook?.label ?? formatIdentifier(id));
        }).join(", ")}</p>
      ` : ""}
    </section>
  `;
}


function renderCareerStep(state) {
  return renderOptionStep({
    eyebrow: "Step 4",
    title: "Career",
    description: "Career is the broad kind of work the character does. Mechanical packages remain pending.",
    options: listCareers(),
    selectedId: state.record.profile.career.definitionId,
    action: "select-career",
  });
}

function renderSpecialtyStep(state) {
  const careerId = state.record.profile.career.definitionId;
  const selectedId = state.record.profile.specialty.definitionId;
  const specialties = careerId
    ? listSpecialties({ careerId, includeCompatible: false })
    : [];
  const selected = selectedId ? getSpecialty(selectedId) : null;

  return renderStepPanel({
    eyebrow: "Step 5",
    title: "Specialty",
    description: careerId
      ? "Specialty defines the focused way the character practices their Career. Only Specialties assigned to that Career are shown."
      : "Choose a Career first to view its available Specialties.",
    body: `
      ${renderOptionCards(specialties, selectedId, "select-specialty", "No Specialties are available until a Career is selected.")}
      ${selected?.focus?.required ? renderFocusPicker(state, selected) : ""}
    `,
  });
}

function renderFocusPicker(state, specialty) {
  const selectedFocus = state.record.profile.specialty.choices?.focus ?? null;
  const focuses = listSuggestedFocuses(specialty.id);

  return `
    <section class="character-builder__subpanel">
      <div class="form-section__heading">
        <div>
          <h3>Specialty Focus</h3>
          <p class="form-help">The parent Specialty owns the mechanic. Focus defines the subject field and display title.</p>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="builder-focus-select">Suggested Focus</label>
          <select id="builder-focus-select" class="select" data-builder-focus-select>
            <option value="">Custom Focus</option>
            ${focuses.map((focus) => `
              <option value="${escapeHtml(focus.id)}" ${focus.id === selectedFocus?.definitionId ? "selected" : ""}>
                ${escapeHtml(focus.label)}
              </option>
            `).join("")}
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="builder-focus-custom">Custom Focus</label>
          <input
            id="builder-focus-custom"
            class="input"
            type="text"
            value="${escapeHtml(selectedFocus?.custom ? selectedFocus.label : "")}"
            placeholder="Cryogenic Biochemistry"
            data-builder-focus-custom
          >
        </div>
      </div>

      <div class="form-actions">
        <button class="button button--secondary" type="button" data-builder-action="apply-focus">
          Apply Focus
        </button>
      </div>
    </section>
  `;
}


function renderGenerationStep(state) {
  const record = state.record;
  const backgroundId = record.profile.background.definitionId;
  const careerId = record.profile.career.definitionId;
  const specialtyId = record.profile.specialty.definitionId;
  const ready = Boolean(backgroundId && careerId && specialtyId);
  const generation = record.generation;

  return renderStepPanel({
    eyebrow: "Step 6",
    title: "Stats & Saves",
    description: ready
      ? "Allocate structured generation dice, then roll the final pools. Raw generated scores are capped at 60."
      : "Choose a Background, Career, and Specialty before allocating generation dice.",
    body: ready ? `
      <div class="alert alert--info">
        Structured generation is active. Agent overlays do not add Stat or Save dice.
      </div>

      ${renderGenerationSection({
        title: "Stats",
        section: "stats",
        ids: ["strength", "speed", "intellect", "combat"],
        generation,
        rules: CHARACTER_STAT_GENERATION,
        eligibility: {
          background: getBackgroundGenerationEligibility(backgroundId)?.stats ?? [],
          career: getCareerGenerationEligibility(careerId)?.stats ?? [],
          specialty: getSpecialtyGenerationEligibility(specialtyId)?.stats ?? [],
        },
      })}

      ${renderGenerationSection({
        title: "Saves",
        section: "saves",
        ids: ["body", "fear", "sanity"],
        generation,
        rules: CHARACTER_SAVE_GENERATION,
        eligibility: {
          background: getBackgroundGenerationEligibility(backgroundId)?.saves ?? [],
          career: getCareerGenerationEligibility(careerId)?.saves ?? [],
          specialty: getSpecialtyGenerationEligibility(specialtyId)?.saves ?? [],
        },
      })}

      <div class="form-actions">
        <button class="button button--primary" type="button" data-builder-action="generation-roll">
          Roll Stats & Saves
        </button>
        <button class="button button--secondary" type="button" data-builder-action="generation-reset">
          Reset Allocations
        </button>
      </div>

      ${renderGenerationResults(generation)}
    ` : `<div class="empty-state">Complete Background, Career, and Specialty first.</div>`,
  });
}

function renderGenerationSection({ title, section, ids, generation, rules, eligibility }) {
  const sectionData = generation?.[section];

  return `
    <section class="character-builder__subpanel generation-panel">
      <div class="form-section__heading">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p class="form-help">
            Baseline ${section === "stats" ? rules.baselineDice : rules.baselineDice}d10 each. Pool cap ${rules.poolCap}d10. Score cap ${rules.scoreCap}.
          </p>
        </div>
      </div>

      <div class="generation-grid generation-grid--header">
        <span>Track</span>
        <span>Background</span>
        <span>Career</span>
        <span>Specialty</span>
      </div>

      ${ids.map((id) => `
        <div class="generation-grid">
          <strong>${escapeHtml(displayTrackName(id))}</strong>
          ${renderAllocationControl(section, "background", id, sectionData, eligibility.background)}
          ${renderAllocationControl(section, "career", id, sectionData, eligibility.career)}
          ${renderAllocationControl(section, "specialty", id, sectionData, eligibility.specialty)}
        </div>
      `).join("")}

      <div class="generation-budget-row">
        ${renderBudgetSummary("Background", sectionData?.allocations?.background, rules.backgroundDice)}
        ${renderBudgetSummary("Career", sectionData?.allocations?.career, rules.careerDice)}
        ${renderBudgetSummary("Specialty", sectionData?.allocations?.specialty, rules.specialtyDice)}
      </div>
    </section>
  `;
}


function renderGenerationResults(generation) {
  const statIds = ["strength", "speed", "intellect", "combat"];
  const saveIds = ["body", "fear", "sanity"];
  const hasResults = [...statIds, ...saveIds].some((id) => {
    const section = statIds.includes(id) ? generation?.stats : generation?.saves;
    return section?.cappedTotals?.[id] != null;
  });

  if (!hasResults) {
    return `
      <section class="character-builder__subpanel generation-results generation-results--empty">
        <div class="form-section__heading">
          <div>
            <h3>Generated Results</h3>
            <p class="form-help">Allocate all required dice, then roll to display final Stats and Saves here.</p>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="character-builder__subpanel generation-results" aria-live="polite">
      <div class="form-section__heading">
        <div>
          <h3>Generated Results</h3>
          <p class="form-help">The pool shows the final number of d10s rolled. Generated scores are capped at 60.</p>
        </div>
      </div>

      <div class="generation-results__groups">
        ${renderGenerationResultGroup("Stats", generation?.stats, statIds, CHARACTER_STAT_GENERATION)}
        ${renderGenerationResultGroup("Saves", generation?.saves, saveIds, CHARACTER_SAVE_GENERATION)}
      </div>

      ${renderDurabilitySummary(generation)}
    </section>
  `;
}

function renderGenerationResultGroup(title, sectionData, ids, rules) {
  return `
    <div class="generation-results__group">
      <h4>${escapeHtml(title)}</h4>
      <div class="generation-results__array">
        ${ids.map((id) => {
          const pool = sectionData?.pools?.[id] ?? rules.baselineDice;
          const result = sectionData?.cappedTotals?.[id];
          const uncapped = sectionData?.uncappedTotals?.[id];
          const capped = result != null && uncapped > rules.scoreCap;

          return `
            <div class="generation-result-card">
              <span class="generation-result-card__label">${escapeHtml(displayTrackName(id))}</span>
              <span class="generation-result-card__pool">${pool}d10</span>
              <strong class="generation-result-card__value">${result == null ? "—" : result}</strong>
              ${capped ? `<small>${uncapped} rolled, capped at ${rules.scoreCap}</small>` : `<small>Final score</small>`}
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}


function renderDurabilitySummary(generation) {
  const strength = generation?.stats?.cappedTotals?.strength;
  if (strength == null) return "";

  const maximumWounds = Math.max(0, Math.min(5, Math.floor(Number(strength) / 10)));

  return `
    <div class="durability-summary">
      <div>
        <span class="durability-summary__label">Health</span>
        <strong>15 / 15</strong>
      </div>
      <div>
        <span class="durability-summary__label">Wounds</span>
        <strong>0 / ${maximumWounds}</strong>
      </div>
      <small>Maximum Wounds = floor(Strength ÷ 10), capped at 5.</small>
    </div>
  `;
}

function renderAllocationControl(section, layer, id, sectionData, eligibleIds) {
  const eligible = eligibleIds.includes(id);
  const value = Number(sectionData?.allocations?.[layer]?.[id] ?? 0);

  if (!eligible) {
    return `<span class="generation-allocation is-ineligible">—</span>`;
  }

  return `
    <span class="generation-allocation">
      <button
        class="generation-button"
        type="button"
        aria-label="Remove ${escapeHtml(layer)} die from ${escapeHtml(displayTrackName(id))}"
        data-builder-action="generation-adjust"
        data-section="${escapeHtml(section)}"
        data-layer="${escapeHtml(layer)}"
        data-track-id="${escapeHtml(id)}"
        data-delta="-1"
      >−</button>
      <strong>${value}</strong>
      <button
        class="generation-button"
        type="button"
        aria-label="Add ${escapeHtml(layer)} die to ${escapeHtml(displayTrackName(id))}"
        data-builder-action="generation-adjust"
        data-section="${escapeHtml(section)}"
        data-layer="${escapeHtml(layer)}"
        data-track-id="${escapeHtml(id)}"
        data-delta="1"
      >+</button>
    </span>
  `;
}

function renderBudgetSummary(label, allocation, budget) {
  const used = Object.values(allocation ?? {}).reduce((sum, value) => sum + Number(value || 0), 0);
  return `<span class="generation-budget${used === budget ? " is-complete" : ""}">${escapeHtml(label)}: ${used}/${budget}</span>`;
}

function displayTrackName(id) {
  return id === "strength" ? "Strength" : formatIdentifier(id);
}


function renderSkillsStep(state) {
  const record = state.record;
  const ready = Boolean(
    record.profile.background.definitionId
    && record.profile.career.definitionId
    && record.profile.specialty.definitionId
  );

  if (!ready) {
    return renderStepPanel({
      eyebrow: "Step 7",
      title: "Skills",
      description: "Choose a Background, Career, and Specialty before selecting skills.",
      body: `<div class="empty-state">Complete Background, Career, and Specialty first.</div>`,
    });
  }

  const generation = record.generation?.skills;

  return renderStepPanel({
    eyebrow: "Step 7",
    title: "Skills",
    description:
      "Skills have fixed ranks. Duplicate selections never improve a skill and must be replaced with another valid option.",
    body: `
      <div class="alert alert--info">
        Trained skills grant +10. Expert skills grant +15. Use the highest relevant skill bonus; flat skill bonuses do not stack.
      </div>

      ${renderSkillPackageSection(record, generation, "background", "Background Skills")}
      ${renderSkillPackageSection(record, generation, "career", "Career Skills")}
      ${renderSkillPackageSection(record, generation, "specialty", "Specialty Skills")}
      ${renderSkillSummary(generation)}
    `,
  });
}

function renderSkillPackageSection(record, generation, layer, title) {
  const view = getSkillPackageView(record, generation, layer);

  if (!view) {
    return `
      <section class="character-builder__subpanel skill-package">
        <h3>${escapeHtml(title)}</h3>
        <div class="empty-state">No package is available for this selection.</div>
      </section>
    `;
  }

  return `
    <section class="character-builder__subpanel skill-package">
      <div class="form-section__heading">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p class="form-help">Fixed grants apply automatically. Each remaining slot must contain a distinct skill.</p>
        </div>
      </div>

      ${view.fixedSkills.length ? `
        <div class="skill-fixed-list">
          ${view.fixedSkills.map((entry) => renderSkillPill(entry, "Fixed")).join("")}
        </div>
      ` : ""}

      <div class="skill-choice-groups">
        ${view.groups.map((group) => `
          <div class="skill-choice-group${group.replacement ? " is-replacement" : ""}">
            <div>
              <strong>${escapeHtml(group.label)}</strong>
              ${group.replacement ? `<p class="form-help">A fixed grant duplicated an existing skill, so choose a replacement.</p>` : ""}
            </div>
            <div class="skill-choice-slots">
              ${Array.from({ length: group.count }, (_, index) => renderSkillSelect({
                layer,
                group,
                index,
                selectedId: view.selections?.[group.id]?.[index] ?? "",
                generation,
              })).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderSkillSelect({ layer, group, index, selectedId, generation }) {
  const selectedElsewhere = new Set(
    (generation?.resolvedSkills ?? [])
      .map((entry) => entry.definitionId)
      .filter((id) => id !== selectedId),
  );

  return `
    <select
      class="select"
      data-builder-skill-select
      data-skill-layer="${escapeHtml(layer)}"
      data-skill-group="${escapeHtml(group.id)}"
      data-skill-index="${index}"
    >
      <option value="">Choose skill</option>
      ${group.skillIds.map((skillId) => {
        const definition = getSkillDefinition(skillId);
        if (!definition) return "";
        const disabled = selectedElsewhere.has(skillId);
        return `
          <option
            value="${escapeHtml(skillId)}"
            ${skillId === selectedId ? "selected" : ""}
            ${disabled ? "disabled" : ""}
          >
            ${escapeHtml(definition.label)} (${definition.bonus > 10 ? "Expert +15" : "Trained +10"})
          </option>
        `;
      }).join("")}
    </select>
  `;
}

function renderSkillSummary(generation) {
  const skills = generation?.resolvedSkills ?? [];
  const complete = generation?.complete === true;

  return `
    <section class="character-builder__subpanel skill-summary" aria-live="polite">
      <div class="form-section__heading">
        <div>
          <h3>Final Skill Package</h3>
          <p class="form-help">${complete ? "All required skill selections are complete." : "Complete every required choice and resolve all duplicates."}</p>
        </div>
      </div>

      ${skills.length ? `
        <div class="skill-summary__grid">
          ${skills.map((entry) => `
            <article class="skill-summary-card">
              <span>${escapeHtml(entry.label)}</span>
              <strong>+${entry.bonus}</strong>
              <small>${escapeHtml(formatIdentifier(entry.tier))}</small>
            </article>
          `).join("")}
        </div>
      ` : `<div class="empty-state">No skills resolved yet.</div>`}
    </section>
  `;
}

function renderSkillPill(skill, prefix = "") {
  return `
    <span class="skill-pill">
      ${prefix ? `<small>${escapeHtml(prefix)}</small>` : ""}
      <strong>${escapeHtml(skill.label)}</strong>
      <span>+${skill.bonus}</span>
    </span>
  `;
}

function renderAgentStep(state) {
  const overlay = state.record.hiddenWardenData.agentOverlay ?? null;

  return renderStepPanel({
    eyebrow: "Step 8",
    title: "Agent Overlay",
    description: "Optional, Warden-controlled hidden layer. The public Career and Specialty remain mechanically real.",
    body: `
      <label class="character-builder__toggle">
        <input type="checkbox" data-builder-agent-enabled ${overlay ? "checked" : ""}>
        <span>Enable restricted Agent overlay</span>
      </label>

      ${overlay ? `
        <div class="alert alert--warning">
          Agent data is hidden by default and should not appear in public exports or player sheets without explicit Warden approval.
        </div>

        <div class="form-grid">
          <div class="form-field">
            <label class="form-label" for="builder-agent-profile">Operational Profile</label>
            <select id="builder-agent-profile" class="select" data-builder-agent-profile>
              <option value="">Choose profile</option>
              ${listAgentOverlayProfiles().map((profile) => `
                <option value="${escapeHtml(profile.id)}" ${profile.id === overlay.profileId ? "selected" : ""}>
                  ${escapeHtml(profile.label)}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="form-field">
            <label class="form-label" for="builder-agent-state">Overlay State</label>
            <select id="builder-agent-state" class="select" data-builder-agent-state>
              ${AGENT_OVERLAY_STATES.map((entry) => `
                <option value="${escapeHtml(entry.id)}" ${entry.id === overlay.state ? "selected" : ""}>
                  ${escapeHtml(entry.label)}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="form-field form-field--full">
            <label class="form-label" for="builder-agent-objective">Secret Objective</label>
            <textarea id="builder-agent-objective" class="textarea" data-builder-agent-objective>${escapeHtml(overlay.secretObjective)}</textarea>
          </div>

          <div class="form-field form-field--full">
            <label class="form-label" for="builder-agent-trigger">Reveal / Activation Trigger</label>
            <input id="builder-agent-trigger" class="input" type="text" value="${escapeHtml(overlay.revealTrigger)}" data-builder-agent-trigger>
          </div>
        </div>
      ` : ""}
    `,
  });
}

function renderReviewStep(state) {
  const record = state.record;
  const origin = getOrigin(record.profile.origin.definitionId);
  const background = getBackground(record.profile.background.definitionId);
  const career = getCareer(record.profile.career.definitionId);
  const specialty = getSpecialty(record.profile.specialty.definitionId);

  return renderStepPanel({
    eyebrow: "Step 9",
    title: "Review",
    description: "Review the shell record before export. Mechanical packages will be layered in later.",
    body: `
      <dl class="character-builder__review-grid">
        ${reviewEntry("Name", record.identity.name || "Unnamed Character")}
        ${reviewEntry("Origin", origin?.label ?? "Not selected")}
        ${reviewEntry("Background", background?.label ?? "Not selected")}
        ${reviewEntry("Career", career?.label ?? "Not selected")}
        ${reviewEntry("Specialty", record.profile.specialty.label || specialty?.label || "Not selected")}
        ${reviewEntry("Stats", formatTrackSummary(record.stats, ["strength", "speed", "intellect", "combat"]))}
        ${reviewEntry("Saves", formatTrackSummary(record.saves, ["body", "fear", "sanity"]))}
        ${reviewEntry("Health", formatDurabilityHealth(record))}
        ${reviewEntry("Wounds", formatDurabilityWounds(record))}
        ${reviewEntry("Skills", formatSkillSummary(record.skills))}
        ${reviewEntry("Agent Overlay", record.hiddenWardenData.agentOverlay?.profileLabel || "Disabled")}
      </dl>

      <section class="character-builder__json-preview">
        <div class="form-section__heading">
          <div>
            <h3>Canonical Record Preview</h3>
            <p class="form-help">This is the export envelope that downstream tools will consume.</p>
          </div>
        </div>
        <pre>${escapeHtml(serializeCharacterExport(record))}</pre>
      </section>
    `,
  });
}


function formatDurabilityHealth(record) {
  const health = record?.durability?.health;
  if (health?.maximum == null) return "Not generated";
  return `${health.current ?? health.maximum} / ${health.maximum}`;
}

function formatDurabilityWounds(record) {
  const capacity = record?.durability?.woundCapacity;
  if (capacity?.maximumWounds == null) return "Not generated";
  return `${capacity.currentWounds ?? 0} / ${capacity.maximumWounds}`;
}

function renderOptionStep({ eyebrow, title, description, options, selectedId, action, emptyMessage }) {
  return renderStepPanel({
    eyebrow,
    title,
    description,
    body: renderOptionCards(options, selectedId, action, emptyMessage),
  });
}

function renderOptionCards(options, selectedId, action, emptyMessage = "No options available.") {
  if (!options.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }

  return `
    <div class="character-builder__option-grid">
      ${options.map((option) => `
        <button
          class="character-builder__option${option.id === selectedId ? " is-selected" : ""}"
          type="button"
          data-builder-action="${escapeHtml(action)}"
          data-option-id="${escapeHtml(option.id)}"
        >
          <span class="character-builder__option-title">${escapeHtml(option.label)}</span>
          <span class="character-builder__option-description">${escapeHtml(option.description ?? "")}</span>
          <span class="character-builder__option-meta">Mechanics: ${escapeHtml(option.mechanics?.status ?? "pending")}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderSummaryRail(state) {
  const record = state.record;

  return `
    <aside class="character-builder__summary">
      <p class="eyebrow">Current Build</p>
      <h3>${escapeHtml(record.identity.name || "Unnamed Character")}</h3>
      <dl>
        ${summaryEntry("Origin", record.profile.origin.label)}
        ${summaryEntry("Background", record.profile.background.label)}
        ${summaryEntry("Career", record.profile.career.label)}
        ${summaryEntry("Specialty", record.profile.specialty.label)}
      </dl>
      <p class="form-help">${state.dirty ? "Unsaved changes" : "No changes"}</p>
    </aside>
  `;
}

function renderStepPanel({ eyebrow, title, description, body }) {
  return `
    <section class="panel character-builder__panel">
      <header class="panel__header">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
          <p class="panel__description">${escapeHtml(description)}</p>
        </div>
      </header>
      <div class="panel__body">${body}</div>
    </section>
  `;
}

function renderTextField(label, field, value, required = false) {
  return `
    <div class="form-field">
      <label class="form-label" for="builder-identity-${escapeHtml(field)}">${escapeHtml(label)}</label>
      <input
        id="builder-identity-${escapeHtml(field)}"
        class="input"
        type="text"
        value="${escapeHtml(value)}"
        data-builder-identity-field="${escapeHtml(field)}"
        ${required ? "required" : ""}
      >
    </div>
  `;
}

function formatIdentifier(value) {
  return String(value ?? "")
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatTrackSummary(tracks, ids) {
  return ids.map((id) => `${displayTrackName(id)} ${tracks?.[id]?.base ?? "—"}`).join(" · ");
}

function formatSkillSummary(skills) {
  if (!Array.isArray(skills) || !skills.length) return "Not selected";
  return skills.map((entry) => `${entry.label} +${entry.bonus}`).join(" · ");
}

function renderNotices(state) {
  const messages = [...state.errors, ...state.notices];
  if (!messages.length) return "";

  return `
    <div class="character-builder__notices">
      ${messages.map((message) => `<div class="alert alert--warning">${escapeHtml(message)}</div>`).join("")}
    </div>
  `;
}

function summaryEntry(label, value) {
  return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "—")}</dd></div>`;
}

function reviewEntry(label, value) {
  return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
