import test from 'node:test';
import assert from 'node:assert/strict';
import {assembleVehicle,createVehicleRegistry,assignVehicleCrew} from '../modules/vehicle-instance-registry.js';
const entity = {id:'q1',type:'vehicle',templateId:'generic_tank',health:{currentHealth:40}};
const create = () => assembleVehicle({entity,vehicleId:'v1',mountIds:['m1','m2','m3'],stationIds:['s1'],crewStations:['Driver']});
test('tank loadout gets three independently identified mounts, no invented weapon catalog',()=>{
 const r=create(); assert.equal(r.vehicleRegistry.mounts.length,3);
 assert.deepEqual(r.vehicleRegistry.mounts.map(m=>m.label),['main gun','coaxial weapon','smoke / chaff']);
 assert.ok(r.vehicleRegistry.mounts.every(m=>m.catalogId===null));
 assert.equal(r.entity.vehicleId,'v1');assert.equal(r.vehicleRegistry.stations[0].occupantId,null);
});
test('crew assignment links existing occupant without generating or changing person',()=>{
 const original=create().vehicleRegistry;const next=assignVehicleCrew(original,'s1','marine1');
 assert.equal(next.stations[0].occupantId,'marine1');assert.equal(original.stations[0].occupantId,null);
});
test('duplicate mounts and orphan mounts rejected',()=>{
 assert.throws(()=>assembleVehicle({entity,vehicleId:'v1',mountIds:['m1','m1','m3']}));
 const r=create().vehicleRegistry;r.mounts[0].vehicleId='missing';assert.throws(()=>createVehicleRegistry(r));
});
test('duplicate entity and vehicle ID rejected',()=>{
 const old=create().vehicleRegistry;
 assert.throws(()=>assembleVehicle({entity,vehicleId:'v2',mountIds:['a','b','c'],registry:old}));
});
test('manual vehicle creates no fabricated mounts or crew',()=>{
 const r=assembleVehicle({entity:{id:'manual',type:'vehicle'},vehicleId:'manual-v'});
 assert.equal(r.vehicleRegistry.mounts.length,0);assert.equal(r.vehicleRegistry.stations.length,0);
});
test('registry survives serialization and crew transfer',()=>{
 const r=create().vehicleRegistry;const loaded=createVehicleRegistry(JSON.parse(JSON.stringify(r)));
 assert.deepEqual(loaded,r);assert.equal(assignVehicleCrew(assignVehicleCrew(loaded,'s1','p1'),'s1',null).stations[0].occupantId,null);
});
