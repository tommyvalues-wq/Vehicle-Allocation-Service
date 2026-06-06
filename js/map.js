/* ==========================================
   map.js
   Vehicle Allocation Simulator v2
========================================== */

let map;

let vehicleLayer;
let landmarkLayer;
let hospitalLayer;
let stationLayer;

let streetTiles;
let satelliteTiles;

function initialiseMap(){

    map=L.map("map",{

        zoomControl:true,

        preferCanvas:true

    });

    streetTiles=L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:20,

            attribution:""

        }

    );

    satelliteTiles=L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            maxZoom:20,

            attribution:""

        }

    );

    streetTiles.addTo(map);

    vehicleLayer=L.layerGroup().addTo(map);

    landmarkLayer=L.layerGroup().addTo(map);

    hospitalLayer=L.layerGroup().addTo(map);

    stationLayer=L.layerGroup().addTo(map);

    const london=[51.5072,-0.1276];

    map.setView(london,11);

}
