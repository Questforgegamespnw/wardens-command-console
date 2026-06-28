import { getShipClass, SHIP_DAMAGE_MODELS, DEFAULT_ENVIRONMENT_DISTRICTS, DEFAULT_MAJOR_SHIP_SECTIONS } from "../data/ship-classes.js";
import { getShipRoleTemplate } from "../data/ship-role-templates.js";

const midpoint = (range) => Array.isArray(range) ? Math.round((range[0] + range[1]) / 2) : null;
const clamp = (value, range) => Array.isArray(range) ? Math.max(range[0], Math.min(range[1], value)) : value;

export function buildShipProfile({
  classId,
  roleTemplateId,
  name = null,
  owner = null,
  statBase = 35,
  overrides = {},
}) {
  const shipClass = getShipClass(classId);
  const role = getShipRoleTemplate(roleTemplateId);
  const hullBase = midpoint(shipClass.hullRange);
  const prBase = midpoint(shipClass.prRange);

  const sections =
    [SHIP_DAMAGE_MODELS.pooled_hull_sections, SHIP_DAMAGE_MODELS.sectional_capital].includes(shipClass.damageModel)
      ? [...DEFAULT_MAJOR_SHIP_SECTIONS] : [];

  const districts =
    shipClass.damageModel === SHIP_DAMAGE_MODELS.district_environment
      ? [...DEFAULT_ENVIRONMENT_DISTRICTS] : [];

  return Object.freeze({
    name,
    owner,
    classId: shipClass.classId,
    classLabel: shipClass.label,
    className: shipClass.name,
    roleTemplateId: role.id,
    damageModel: shipClass.damageModel,
    hull: hullBase === null ? null : clamp(hullBase + Number(role.hullBias || 0), shipClass.hullRange),
    protectionRating: clamp(prBase + Number(role.prBias || 0), shipClass.prRange),
    thrusters: Math.max(5, Math.min(85, statBase + role.thrustersBias * 10)),
    battle: Math.max(5, Math.min(85, statBase + role.battleBias * 10)),
    systems: Math.max(5, Math.min(85, statBase + role.systemsBias * 10)),
    weaponSizeRange: shipClass.weaponSizeRange,
    hardpointRange: shipClass.hardpointRange,
    hardpointFocus: role.hardpointFocus,
    sections: Object.freeze([...(overrides.sections || sections)]),
    districts: Object.freeze([...(overrides.districts || districts)]),
    ...overrides,
  });
}
