import test from 'node:test';
import assert from 'node:assert/strict';
import { DAMAGE_WEAPON_PRESETS } from '../data/damage-weapon-presets.js';
import { planVehiclePersonnelImpact, chooseWeightedCategory, applyWeaponSeverityPolicy } from '../modules/vehicle-personnel-impact.js';
const weapon = id => DAMAGE_WEAPON_PRESETS.find(w => w.id === id);
test('mounted gun uses authored infantry profile and preserves ordinary damage', () => {
 const p = planVehiclePersonnelImpact({weapon:weapon('pintle_gun'),profileId:'standard',exposureId:'exposed_infantry'});
 assert.equal(p.route,'personnel_damage'); assert.equal(p.diceCount,3); assert.equal(p.mode,'dice');
});
test('missing exposure fails closed', () => {
 assert.equal(planVehiclePersonnelImpact({weapon:weapon('pintle_gun'),profileId:'standard',exposureId:'direct_impact'}).supported,false);
});
test('explicit catastrophic designation applies only to infantry', () => {
 const w=weapon('main_gun_120mm');
 const infantry=planVehiclePersonnelImpact({weapon:w,profileId:'standard',exposureId:'direct_projectile',catastrophic:true});
 assert.equal(infantry.route,'catastrophic_kia');
 const suit=planVehiclePersonnelImpact({weapon:w,profileId:'standard',exposureId:'direct_projectile',targetKind:'powered_suit',catastrophic:true});
 assert.notEqual(suit.route,'catastrophic_kia');
});
test('direct vehicle wounds route to sequential suit TAC and occupant wounds, no damage duplication', () => {
 const w=weapon('tactical_missile');
 const direct=w.profiles.find(p=>p.mode==='direct_wounds');
 assert.ok(direct);
 const exposure=Object.keys(w.personnelImpact.exposures)[0];
 const p=planVehiclePersonnelImpact({weapon:w,profileId:direct.id,exposureId:exposure,targetKind:'powered_suit'});
 assert.equal(p.suitTacCount,direct.directWounds); assert.equal(p.occupantWoundCount,direct.directWounds);
 assert.equal(p.conventionalDamage,false); assert.equal(p.additionalBlowover,false);
 assert.deepEqual(p.sequence,['suit_tac','occupant_wounds']);
});
test('category weighting uses exact discrete intervals', () => {
 assert.equal(chooseWeightedCategory({gunshot:85,massive_gore:15},0.84),'gunshot');
 assert.equal(chooseWeightedCategory({gunshot:85,massive_gore:15},0.85),'massive_gore');
 assert.throws(()=>chooseWeightedCategory({gunshot:90},0.5),RangeError);
});
test('weighted severity floors never downgrade a natural deadly result', () => {
 const p={mode:'weighted_minimum',minimum:'severe',weights:{severe:15,deadly:85}};
 assert.equal(applyWeaponSeverityPolicy('light',p,0),'severe');
 assert.equal(applyWeaponSeverityPolicy('light',p,0.15),'deadly');
 assert.equal(applyWeaponSeverityPolicy('deadly',p,0),'deadly');
 assert.equal(applyWeaponSeverityPolicy('light',{mode:'minimum',minimum:'moderate'}),'moderate');
});
