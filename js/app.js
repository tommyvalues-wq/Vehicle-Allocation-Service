/* ==========================================================
   Vehicle Allocation Simulator v2.0
   app.js
   Main simulator bootstrap
========================================================== */

const App = {

    version: "2.0",

    started: false,

    currentTown: null,

    fleet: [],

    selectedUnit: null,

    map: null,

    streetLayer: null,

    satelliteLayer: null,

    landmarkLayer: null,

    hospitalLayer: null,

    stationLayer: null,

    messageQueue: [],

    unreadMessages: [],

    codeZeroActive: false,

    timers: {}

};

document.addEventListener("DOMContentLoaded", bootSimulator);

function bootSimulator(){

    console.log("Vehicle Allocation Simulator v2.0");

    App.started=true;

    initialiseMap();

    initialiseFleet();

    initialiseDispatcher();

    initialiseChat();

    initialiseIncidents();

    initialiseAudio();

    initialiseCode0();

    startMainLoop();

}

function startMainLoop(){

    App.timers.clock=
        setInterval(updateSimulator,1000);

    App.timers.friendMessages=
        setInterval(randomFriendMessage,1800000);

    App.timers.jobs=
        setInterval(generateRandomIncident,90000);

    App.timers.code0=
        setInterval(checkForCodeZero,600000);

    App.timers.updates=
        setInterval(sendRandomCrewUpdate,480000);

}

function updateSimulator(){

    updateFleetMovement();

    updateIncidentProgress();

    updateChatTimers();

    updateDispatcherUI();

}

function simulatorTime(){

    return new Date().toLocaleTimeString(
        [],
        {
            hour:'2-digit',
            minute:'2-digit'
        }
    );

}

function log(text){

    console.log(
        "["+
        simulatorTime()+
        "] "+
        text
    );

}
