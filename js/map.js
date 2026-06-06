/* ==========================================
   map.js
   Vehicle Allocation Simulator v2
========================================== */

let map;
let vehicleLayer;
let landmarkLayer;
let hospitalLayer;
let stationLayer;
let routeLayer;

let streetTiles;
let satelliteTiles;
let currentMapMode = "street";

/* =========================
   INITIALISE MAP
========================= */

function initialiseMap(){

    map = L.map("map", {
        zoomControl: true,
        preferCanvas: true
    });

    streetTiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 20,
            attribution: ""
        }
    );

    satelliteTiles = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            maxZoom: 20,
            attribution: ""
        }
    );

    streetTiles.addTo(map);

    vehicleLayer = L.layerGroup().addTo(map);
    landmarkLayer = L.layerGroup().addTo(map);
    hospitalLayer = L.layerGroup().addTo(map);
    stationLayer = L.layerGroup().addTo(map);
    routeLayer = L.layerGroup().addTo(map);

    const london = [51.5072, -0.1276];
    map.setView(london, 11);
}

/* =========================
   SATELLITE TOGGLE
========================= */

function toggleSatellite(){

    if(currentMapMode === "street"){
        map.removeLayer(streetTiles);
        satelliteTiles.addTo(map);
        currentMapMode = "satellite";
    } else {
        map.removeLayer(satelliteTiles);
        streetTiles.addTo(map);
        currentMapMode = "street";
    }
}

/* =========================
   TOWN SEARCH
========================= */

function goToTown(name){

    const town = towns.find(
        t => t[0].toLowerCase() === name.toLowerCase()
    );

    if(!town){
        console.warn("Town not found:", name);
        return;
    }

    if(typeof App !== "undefined"){
        App.currentTown = town;
    }

    map.flyTo([town[1], town[2]], 13);

    loadLandmarks(town);

    if(typeof regenerateFleet === "function"){
        regenerateFleet(town);
    }
}

/* =========================
   ICONS
========================= */

function hospitalIcon(){
    return L.divIcon({
        className: "",
        html: "🏥",
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function stationIcon(){
    return L.divIcon({
        className: "",
        html: "🚑",
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function policeIcon(){
    return L.divIcon({
        className: "",
        html: "👮",
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function fireIcon(){
    return L.divIcon({
        className: "",
        html: "🚒",
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function landmarkIcon(){
    return L.divIcon({
        className: "",
        html: "📍",
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
}

function vehicleIcon(status){

    return L.divIcon({
        className: "",
        html: `<div class="vehicleBlip ${status}"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });
}

/* =========================
   LANDMARKS
========================= */

function loadLandmarks(town){

    landmarkLayer.clearLayers();
    hospitalLayer.clearLayers();
    stationLayer.clearLayers();

    const name = town[0];
    const lat = town[1];
    const lng = town[2];

    L.marker([lat + 0.012, lng + 0.012], { icon: hospitalIcon() })
        .bindPopup(`<b>${name} General Hospital</b>`)
        .addTo(hospitalLayer);

    L.marker([lat - 0.012, lng - 0.012], { icon: stationIcon() })
        .bindPopup(`<b>${name} Ambulance Station</b>`)
        .addTo(stationLayer);

    L.marker([lat + 0.018, lng - 0.015], { icon: policeIcon() })
        .bindPopup(`<b>${name} Police Station</b>`)
        .addTo(landmarkLayer);

    L.marker([lat - 0.018, lng + 0.015], { icon: fireIcon() })
        .bindPopup(`<b>${name} Fire Station</b>`)
        .addTo(landmarkLayer);

    L.marker([lat + 0.006, lng - 0.022], { icon: landmarkIcon() })
        .bindPopup(`<b>${name} Town Centre</b>`)
        .addTo(landmarkLayer);
}

/* =========================
   VEHICLE MARKERS
========================= */

function createVehicleMarker(unit){

    const marker = L.marker(
        [unit.lat, unit.lng],
        {
            icon: vehicleIcon(unit.status || "available")
        }
    );

    marker.bindPopup(`
        <b>${unit.callsign || unit.call}</b><br>
        ${unit.type || unit.vehicleType || "DCA"}<br>
        ${unit.crew || unit.name || "Crew"}
    `);

    marker.addTo(vehicleLayer);

    unit.marker = marker;

    return marker;
}

function updateVehicleMarker(unit){

    if(!unit.marker) return;

    unit.marker.setLatLng([unit.lat, unit.lng]);

    unit.marker.setIcon(
        vehicleIcon(unit.status || "available")
    );
}

function clearVehicleMarkers(){
    vehicleLayer.clearLayers();
}

/* =========================
   ROUTING / OSRM
========================= */

async function getRoadRoute(start, end){

    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start[1]},${start[0]};${end[1]},${end[0]}` +
        `?overview=full&geometries=geojson`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        const coords =
            data.routes?.[0]?.geometry?.coordinates;

        if(!coords || coords.length < 2){
            throw new Error("No route found");
        }

        return coords.map(c => [c[1], c[0]]);
    }
    catch(err){
        console.warn("OSRM failed, using fallback route", err);

        return [
            start,
            [
                (start[0] + end[0]) / 2,
                (start[1] + end[1]) / 2
            ],
            end
        ];
    }
}

function drawRoute(route){

    if(!route || !route.length) return null;

    const line = L.polyline(route, {
        weight: 2,
        opacity: 0.35,
        dashArray: "4,8"
    });

    line.addTo(routeLayer);

    return line;
}

function clearRoutes(){
    routeLayer.clearLayers();
}

/* =========================
   RANDOM MAP HELPERS
========================= */

function randomPointNearTown(town, radius = 0.035){

    return [
        town[1] + (Math.random() * radius * 2 - radius),
        town[2] + (Math.random() * radius * 2 - radius)
    ];
}
