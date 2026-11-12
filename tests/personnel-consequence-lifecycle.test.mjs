import test from 'node:test';
import assert from 'node:assert/strict';
import {registerQuickEntity,registerQuickEntitySuit,commitQuickEntityAttackToSession} from '../modules/console-equipment-workflow.js';
import {equipSuit} from '../modules/occupant-suit-registry.js';
import {acknowledgePersonnelConsequence,validatePersonnelPendingActions} from '../modules/personnel-consequence-lifecycle.js';

const entity={id:'p1',label:'Marine',health:{currentHealth:8,healthPerWound:15,maximumWounds:3,woundsRemaining:2},defense:{av:15,dr:10,armored:true},armorSystems:{traumaDampening:{id:'trauma_dampening_plus',usesRemaining:2}}};
function committedAttack(){
 let registry=registerQuickEntity({registry:{occupants:[],suits:[]},quickEntity:entity});
 registry=registerQuickEntitySuit({registry,quickEntity:entity,suitId:'s1'});
 registry=equipSuit(registry,'p1','s1');
 const commit={resolutionId:'attack-1',suitId:'s1',occupantId:'p1',suitStateBefore:'intact',suitStateAfter:'light',woundsTakenBefore:1,woundsTakenAfter:2,dampeningUsesBefore:2,dampeningUsesAfter:1,occupantHealthBefore:8,occupantHealthAfter:0,pendingActions:[
 {id:'attack-1:suit_tac:1',status:'pending',route:'suit_tac_consequence',origin:{resolutionId:'attack-1',suitId:'s1',occupantId:'p1',eventIndex:1},details:{nextArmorState:'light'}},
 {id:'attack-1:wound:1',status:'pending',route:'personnel_wound_consequence',origin:{resolutionId:'attack-1',suitId:'s1',occupantId:'p1',eventIndex:1},details:{threshold:'second',category:'gunshot'}}]};
 const committed=commitQuickEntityAttackToSession({registry,quickEntities:[entity],commit});
 assert.equal(committed.status,'applied');
 validatePersonnelPendingActions(committed.pendingActions);
 return {commit,committed};
}
for(const order of [['suit_tac_consequence','personnel_wound_consequence'],['personnel_wound_consequence','suit_tac_consequence']]){
 test(`independent consequence acknowledgements: ${order.join(' then ')}`,()=>{
  const {commit,committed}=committedAttack();
  const original=structuredClone(committed);
  const suit=committed.pendingActions.find(a=>a.route==='suit_tac_consequence');
  const wound=committed.pendingActions.find(a=>a.route==='personnel_wound_consequence');
  assert.ok(suit && wound,'attack must produce both consequence types');
  assert.equal(suit.origin.resolutionId,commit.resolutionId);
  assert.equal(wound.origin.resolutionId,commit.resolutionId);
  let actions=committed.pendingActions;
  for(const route of order){
   const target=actions.find(a=>a.route===route && a.status==='pending');
   const result=acknowledgePersonnelConsequence({pendingActions:actions,consequenceId:target.id});
   assert.equal(result.status,'resolved');
   actions=result.pendingActions;
   assert.deepEqual(committed.registry,original.registry,'acknowledgement must not touch health, armor or dampening');
  }
  assert.equal(actions.filter(a=>a.status==='resolved').length,committed.pendingActions.length);
  assert.deepEqual(committed.pendingActions,original.pendingActions,'original actions remain untouched');
  const retry=acknowledgePersonnelConsequence({pendingActions:actions,consequenceId:suit.id});
  assert.equal(retry.status,'already_resolved');
  assert.deepEqual(retry.pendingActions,actions);
  const replay=commitQuickEntityAttackToSession({registry:committed.registry,quickEntities:committed.quickEntities,pendingActions:actions,commit});
  assert.equal(replay.status,'already_applied');
  assert.deepEqual(replay.registry,committed.registry);
  assert.deepEqual(replay.pendingActions,actions);
 });
}
test('pending consequences stay pending until acknowledged and invalid IDs fail closed',()=>{
 const {committed}=committedAttack();
 assert.ok(committed.pendingActions.every(a=>a.status==='pending'));
 const snapshot=structuredClone(committed.pendingActions);
 assert.throws(()=>acknowledgePersonnelConsequence({pendingActions:committed.pendingActions,consequenceId:'nonexistent'}),/Unknown/);
 assert.deepEqual(committed.pendingActions,snapshot);
});
test('duplicate IDs, wrong provenance, and unsupported statuses are rejected',()=>{
 const {committed}=committedAttack();
 const actions=committed.pendingActions;
 assert.throws(()=>validatePersonnelPendingActions([...actions,structuredClone(actions[0])]),/duplicate/);
 assert.throws(()=>validatePersonnelPendingActions([{...actions[0],status:'applied'}]),/status/);
 assert.throws(()=>validatePersonnelPendingActions([{...actions[0],origin:{...actions[0].origin,resolutionId:'other'}}]),/match attack/);
});
