import test from 'node:test';
import assert from 'node:assert/strict';
import {registerQuickEntity,registerQuickEntitySuit,commitQuickEntityAttackToSession} from '../modules/console-equipment-workflow.js';
import {equipSuit,unequipSuit} from '../modules/occupant-suit-registry.js';
const entity={id:'p1',label:'Marine',health:{currentHealth:8,healthPerWound:15,maximumWounds:3,woundsRemaining:2},defense:{av:15,dr:10,armored:true},armorSystems:{traumaDampening:{id:'trauma_dampening_plus',usesRemaining:1}}};
test('registration preserves occupant health and suit independently',()=>{
 const a=registerQuickEntity({registry:{occupants:[],suits:[]},quickEntity:entity});
 const b=registerQuickEntitySuit({registry:a,quickEntity:entity,suitId:'s1'});
 const c=equipSuit(b,'p1','s1'); const d=unequipSuit(c,'p1');
 assert.deepEqual(d.occupants[0].health,entity.health);
 assert.equal(d.suits[0].traumaDampening.chargesRemaining,1);
 assert.equal(d.occupants[0].equippedSuitId,null);
});
test('duplicate suit identity is rejected',()=>{
 const a=registerQuickEntitySuit({registry:{occupants:[],suits:[]},quickEntity:entity,suitId:'s1'});
 assert.throws(()=>registerQuickEntitySuit({registry:a,quickEntity:entity,suitId:'s1'}));
});
test('commit refuses mismatched equipped suit and leaves records untouched',()=>{
 const a=registerQuickEntity({registry:{occupants:[],suits:[]},quickEntity:entity});
 const b=registerQuickEntitySuit({registry:a,quickEntity:entity,suitId:'s1'});
 const snapshot=structuredClone(b);
 assert.throws(()=>commitQuickEntityAttackToSession({registry:b,quickEntities:[entity],commit:{occupantId:'p1',suitId:'s1',resolutionId:'r1'}}));
 assert.deepEqual(b,snapshot);
});
test('end-to-end preview, commit, replay and doff preserve personal Health',async()=>{
 const {resolveQuickEntitySuitAttack}=await import('../modules/console-equipment-workflow.js');
 const {getDamageWeaponPreset}=await import('../data/damage-weapon-presets.js');
 let registry=registerQuickEntity({registry:{occupants:[],suits:[]},quickEntity:entity});
 registry=registerQuickEntitySuit({registry,quickEntity:entity,suitId:'s1'});
 registry=equipSuit(registry,'p1','s1');
 const preview=resolveQuickEntitySuitAttack({registry,occupantId:'p1',weapon:getDamageWeaponPreset('pintle_gun'),profileId:'standard',exposureId:'exposed_infantry',resolutionId:'attack-1',random:()=>.6});
 const first=commitQuickEntityAttackToSession({registry,quickEntities:[entity],commit:preview.commit});
 assert.equal(first.status,'applied');
 const replay=commitQuickEntityAttackToSession({registry:first.registry,quickEntities:first.quickEntities,pendingActions:first.pendingActions,commit:preview.commit});
 assert.equal(replay.status,'already_applied');
 assert.deepEqual(replay.registry,first.registry);
 const doffed=unequipSuit(first.registry,'p1');
 assert.deepEqual(doffed.occupants[0].health,first.registry.occupants[0].health);
 assert.deepEqual(doffed.suits[0],first.registry.suits[0]);
});
