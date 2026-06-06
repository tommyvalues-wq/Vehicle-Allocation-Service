/* ==========================================
   fleet.js
   Vehicle Allocation Simulator v2
========================================== */

let fleet = [];
let selectedUnit = null;
let officerCount = 0;

const fleetSizes = {
    "London": 30,
    "Birmingham": 24,
    "Manchester": 22,
    "Liverpool": 18,
    "Leeds": 18,
    "Sheffield": 15,
    "Nottingham": 14,
    "Leicester": 14,
    "Bristol": 14,
    "Blackpool": 10,
    "Preston": 8,
    "Lancaster": 6,
    "Kendal": 5
};

const vehicleTypes = [
    "DCA","DCA","DCA","DCA","DCA","DCA","DCA",
    "Rapid Response",
    "Advanced Paramedic",
    "JRU",
    "HEMS"
];

const unitStatuses = [
    "available",
    "mobile",
    "onscene",
    "hospital",
    "restock"
];

function getFleetSize(town){
    return fleetSizes[town[0]] || Math.floor(Math.random() * 6) + 4;
}

function generateCallsign(){
    const prefix = Math.random() < 0.5 ? "M1-B" : "NW-A";
    return prefix + String(Math.floor(Math.random() * 900) + 100);
}

function pickRandom(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateVehicleType(){
    if(officerCount < 2 && Math.random() < 0.06){
        officerCount++;
        return "Officer";
    }

    return pickRandom(vehicleTypes);
}

function generateCrew(type){
    const a = pickRandom(firstNames);
    let b = pickRandom(firstNames);

    while(b === a){
        b = pickRandom(firstNames);
    }

    if(
        type === "Rapid Response" ||
        type === "Advanced Paramedic" ||
        type === "JRU" ||
        type === "HEMS" ||
        type === "Officer"
    ){
        return [a];
    }

    return [a,b];
}

async function regenerateFleet(town){

    clearVehicleMarkers();
    clearRoutes();

    fleet = [];
    officerCount = 0;

    const count = getFleetSize(town);

    for(let i = 0; i < count; i++){

        const type = generateVehicleType();
        const crew = generateCrew(type);
        const start = randomPointNearTown(town);
        const end = randomPointNearTown(town);

        const route = await getRoadRoute(start,end);

        const unit = {
            id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
            callsign: generateCallsign(),
            type,
            crew,
            lat: route[0][0],
            lng: route[0][1],
            status: pickRandom(unitStatuses),
            route,
            routeIndex: 0,
            speed: Math.random() * 0.00045 + 0.00025,
            job: null,
            messages: [],
            unread: 0,
            personality: pickRandom(["chatty","formal","dry","tired","banter","quiet"]),
            marker: null,
            routeLine: null
        };

        unit.routeLine = drawRoute(route);

        createVehicleMarker(unit);

        unit.marker.on("click", () => {
            selectUnit(unit);
        });

        fleet.push(unit);
    }

    if(typeof updateDispatcherUI === "function"){
        updateDispatcherUI();
    }
}

function selectUnit(unit){
    selectedUnit = unit;

    if(typeof App !== "undefined"){
        App.selectedUnit = unit;
    }

    if(typeof renderSelectedUnit === "function"){
        renderSelectedUnit(unit);
    }

    if(typeof renderMessages === "function"){
        renderMessages(unit);
    }
}

function updateFleetMovement(){

    fleet.forEach(unit => {

        if(unit.status === "code0") return;
        if(unit.status === "meal") return;
        if(!unit.route || unit.route.length < 2) return;

        const next = unit.route[unit.routeIndex + 1];

        if(!next){
            assignNewRoute(unit);
            return;
        }

        const dLat = next[0] - unit.lat;
        const dLng = next[1] - unit.lng;
        const dist = Math.sqrt(dLat*dLat + dLng*dLng);

        let speedMultiplier = 1;

        if(unit.status === "mobile") speedMultiplier = 1.6;
        if(unit.status === "onscene") speedMultiplier = 0.25;
        if(unit.status === "hospital") speedMultiplier = 0.2;
        if(unit.status === "restock") speedMultiplier = 0.3;

        const step = unit.speed * speedMultiplier;

        if(dist <= step){
            unit.lat = next[0];
            unit.lng = next[1];
            unit.routeIndex++;
        } else {
            unit.lat += (dLat / dist) * step;
            unit.lng += (dLng / dist) * step;
        }

        updateVehicleMarker(unit);
    });
}

async function assignNewRoute(unit){

    const town = App.currentTown || towns.find(t => t[0] === "London");

    const start = [unit.lat, unit.lng];
    const end = randomPointNearTown(town);

    unit.route = await getRoadRoute(start,end);
    unit.routeIndex = 0;

    if(unit.routeLine){
        routeLayer.removeLayer(unit.routeLine);
    }

    unit.routeLine = drawRoute(unit.route);
}

function setUnitStatus(unit,status){

    unit.status = status;

    if(unit.marker){
        updateVehicleMarker(unit);
    }

    if(selectedUnit === unit && typeof renderSelectedUnit === "function"){
        renderSelectedUnit(unit);
    }
}

function getAvailableUnits(){
    return fleet.filter(u => u.status === "available");
}

function getUnitsOnJobs(){
    return fleet.filter(u => u.job);
}

function getNearestUnit(lat,lng){
    let nearest = null;
    let best = Infinity;

    fleet.forEach(unit => {
        if(unit.status === "meal" || unit.status === "code0") return;

        const d = Math.sqrt(
            Math.pow(unit.lat - lat,2) +
            Math.pow(unit.lng - lng,2)
        );

        if(d < best){
            best = d;
            nearest = unit;
        }
    });

    return nearest;
}
