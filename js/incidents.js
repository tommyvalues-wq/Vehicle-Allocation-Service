/* ==========================================
   incidents.js
   Vehicle Allocation Simulator v2
========================================== */

let incidents = [];

const callTypes = [
    "Chest pain",
    "Breathing difficulties",
    "Fall with injury",
    "RTC reported",
    "Abdominal pain",
    "Stroke symptoms",
    "Seizure",
    "Unconscious person",
    "Mental health crisis",
    "Maternity emergency",
    "Diabetic emergency",
    "Allergic reaction",
    "Overdose concern",
    "Cardiac arrest",
    "Welfare concern",
    "Collapse queried",
    "Paediatric fever"
];

const streets = [
    "High Street",
    "Station Road",
    "Church Lane",
    "Victoria Road",
    "Queen Street",
    "King Street",
    "London Road",
    "Park Road",
    "Mill Lane",
    "School Road",
    "Bridge Street",
    "Market Place",
    "The Crescent",
    "Manor Road",
    "Albert Road",
    "Hospital Road",
    "North Street",
    "South Street",
    "Green Lane"
];

const resourceTypes = [
    "Police",
    "Fire",
    "Extra ambulance",
    "HEMS",
    "Mental health team",
    "Specialist paramedic"
];

function randomAddress(){
    return `${Math.floor(Math.random()*240)+1} ${random(streets)}`;
}

function randomPriority(){
    const priorities = [
        "CAT 1",
        "CAT 2",
        "CAT 2",
        "CAT 3",
        "CAT 3",
        "CAT 4",
        "CAT 5"
    ];

    return random(priorities);
}

function generateRandomIncident(){

    if(!fleet || !fleet.length) return;

    const available = fleet.filter(
        u => u.status === "available"
    );

    if(!available.length) return;

    const unit = random(available);

    const incident = createIncident(unit);

    assignIncidentToUnit(unit, incident);
}

function createIncident(unit){

    const town = App.currentTown || towns.find(t => t[0] === "London");

    const incident = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()+Math.random()),
        type: random(callTypes),
        priority: randomPriority(),
        address: randomAddress(),
        town: town[0],
        created: new Date(),
        assignedUnit: unit.callsign,
        hospital: `${town[0]} General Hospital`,
        stage: "assigned",
        resourceRequest: null,
        resourceSent: null,
        transcript: null
    };

    if(typeof generate999Transcript === "function"){
        incident.transcript = generate999Transcript(incident, unit);
    }

    return incident;
}

function assignIncidentToUnit(unit, incident){

    unit.job = incident;
    unit.status = "mobile";

    incidents.unshift(incident);

    if(typeof setUnitStatus === "function"){
        setUnitStatus(unit,"mobile");
    }

    if(typeof playJobSound === "function"){
        playJobSound();
    }

    if(typeof addCrewMessage === "function"){
        addCrewMessage(
            unit,
            `Attached to ${incident.priority} ${incident.type} at ${incident.address}. We’re mobile now Boss.`
        );
    }

    if(typeof updateDispatcherUI === "function"){
        updateDispatcherUI();
    }
}

function updateIncidentProgress(){

    incidents.forEach(incident => {

        const unit = fleet.find(
            u => u.callsign === incident.assignedUnit
        );

        if(!unit) return;

        const age = Date.now() - incident.created.getTime();

        if(incident.stage === "assigned" && age > 45000){
            incident.stage = "onscene";
            unit.status = "onscene";
            setUnitStatus(unit,"onscene");

            addCrewMessage(
                unit,
                `On scene now. We'll assess and update shortly.`
            );
        }

        if(incident.stage === "onscene" && age > 150000){
            incident.stage = "transporting";
            unit.status = "transport";
            setUnitStatus(unit,"transport");

            addCrewMessage(
                unit,
                `Transporting to ${incident.hospital}. Patient stable at the moment.`
            );
        }

        if(incident.stage === "transporting" && age > 300000){
            incident.stage = "hospital";
            unit.status = "hospital";
            setUnitStatus(unit,"hospital");

            addCrewMessage(
                unit,
                `At hospital now. We'll hand over and clear when done.`
            );
        }

        if(incident.stage === "hospital" && age > 420000){
            clearIncident(unit,incident);
        }
    });
}

function clearIncident(unit,incident){

    incident.stage = "closed";

    unit.job = null;
    unit.status = "available";

    setUnitStatus(unit,"available");

    addCrewMessage(
        unit,
        random([
            "Booked clear and available Boss.",
            "Clear from hospital, ready when needed.",
            "All done here, back available.",
            "Handover complete, just cleaned down and clear."
        ])
    );

    incidents = incidents.filter(i => i.id !== incident.id);

    if(typeof updateDispatcherUI === "function"){
        updateDispatcherUI();
    }
}

function requestExtraResource(unit){

    if(!unit.job) return;

    if(unit.job.resourceRequest) return;

    const resource = random(resourceTypes);

    unit.job.resourceRequest = resource;

    addCrewMessage(
        unit,
        random([
            `Boss can we get ${resource.toLowerCase()} started to this job please?`,
            `Any chance of ${resource.toLowerCase()} for this one?`,
            `Can you attach ${resource.toLowerCase()} please?`,
            `We're going to need ${resource.toLowerCase()} here when you can.`
        ])
    );

    if(typeof updateDispatcherUI === "function"){
        updateDispatcherUI();
    }
}

function sendResource(unit,type){

    if(!unit.job) return;

    unit.job.resourceSent = type;

    addCrewMessage(
        unit,
        random([
            `${type} received, cheers Boss.`,
            `Perfect, thanks. We'll look out for ${type.toLowerCase()}.`,
            `Thanks Tom, ${type.toLowerCase()} will help.`,
            `Nice one Gaffer, we'll update when they arrive.`
        ])
    );

    if(typeof updateDispatcherUI === "function"){
        updateDispatcherUI();
    }
}
