import test from 'node:test';
import assert from 'node:assert/strict';
import { projectQuickEntityEquipment } from '../modules/quick-entity-equipment-view.js';
import { renderLinkedEquipmentSummary } from '../renderers/quick-entities-renderer.js';
const person = {id:'marine-1',type:'enemy'};
const vehicle = {id:'tank-1',type:'vehicle'};
test('legacy Quick Entities have empty, safe projections',()=>{
  assert.deepEqual(projectQuickEntityEquipment(person), {kind:'personnel',occupantId:null,suit:null,weapon:null,vehicle:null,mounts:[],stations:[]});
  assert.equal(renderLinkedEquipmentSummary(person),'');
});
test('equipment projection uses current suit and weapon instance state, not template snapshot',()=>{
  const registries={occupantSuitRegistry:{occupants:[{id:'marine-1',equippedSuitId:'s-1'}],suits:[{id:'s-1',label:'Marine Suit',armorState:'severe',originalAv:15,dr:10,traumaDampening:{chargesRemaining:0}}]},weaponRegistry:{weapons:[{id:'w-1',ownerId:'marine-1',catalogId:'combat_shotgun',condition:'damaged',ammunitionId:null,ammunitionRemaining:3,attachmentIds:[]}]}};
  const entity={...person,equippedWeaponId:'w-1'};
  const projection=projectQuickEntityEquipment(entity,registries);
  assert.equal(projection.suit.condition,'severe');
  assert.equal(projection.suit.dampeningCharges,0);
  assert.equal(projection.weapon.ammunitionRemaining,3);
  assert.match(renderLinkedEquipmentSummary(entity,registries),/Marine Suit/);
  assert.match(renderLinkedEquipmentSummary(entity,registries),/ammo 3/);
});
test('transferred or doffed suits are not shown as equipped',()=>{
  const registries={occupantSuitRegistry:{occupants:[{id:'marine-1',equippedSuitId:null}],suits:[{id:'s-1',label:'Old suit'}]}};
  assert.equal(projectQuickEntityEquipment(person,registries).suit,null);
});
test('vehicle mount and crew station projections retain independent IDs',()=>{
  const registries={vehicleRegistry:{vehicles:[{id:'v-1',entityId:'tank-1',condition:'operational',chassisId:'tank'}],mounts:[{id:'m-1',vehicleId:'v-1',label:'Main gun',condition:'damaged',ammunitionRemaining:2}],stations:[{id:'st-1',vehicleId:'v-1',label:'Driver',occupantId:'marine-1'},{id:'st-2',vehicleId:'v-1',label:'Gunner',occupantId:null}]}};
  const view=projectQuickEntityEquipment(vehicle,registries);
  assert.equal(view.mounts[0].id,'m-1');
  assert.equal(view.stations[0].occupantId,'marine-1');
  assert.match(renderLinkedEquipmentSummary(vehicle,registries),/Crew assigned: 1\/2/);
});
test('projected records cannot mutate live registries',()=>{
  const registries={vehicleRegistry:{vehicles:[{id:'v-1',entityId:'tank-1',condition:'operational',chassisId:''}],mounts:[],stations:[]}};
  const view=projectQuickEntityEquipment(vehicle,registries);
  view.vehicle.condition='destroyed';
  assert.equal(registries.vehicleRegistry.vehicles[0].condition,'operational');
});
