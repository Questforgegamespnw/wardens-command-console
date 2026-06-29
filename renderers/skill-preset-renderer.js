import {
  escapeHtml
} from "../modules/ui-helpers.js";

export function renderSkillPresetOptions(
  skills = []
) {
  const groups = new Map();

  for (const entry of skills) {
    const groupLabel =
      entry.branchLabel
      ?? "Other Skills";

    if (!groups.has(groupLabel)) {
      groups.set(groupLabel, []);
    }

    groups.get(groupLabel).push(entry);
  }

  return `
    <option value="">
      No Skill
    </option>

    <option value="__manual__">
      Custom / Manual Skill
    </option>

    ${[...groups.entries()]
      .map(
        ([groupLabel, entries]) => `
          <optgroup
            label="${escapeHtml(groupLabel)}"
          >
            ${entries
              .sort(
                (left, right) =>
                  Number(left.sortOrder ?? 100)
                  - Number(right.sortOrder ?? 100)
                  || left.label.localeCompare(
                    right.label
                  )
              )
              .map(
                (entry) => `
                  <option
                    value="${escapeHtml(entry.id)}"
                  >
                    ${escapeHtml(entry.label)}
                  </option>
                `
              )
              .join("")}
          </optgroup>
        `
      )
      .join("")}
  `;
}
