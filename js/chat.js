/* ==========================================
   chat.js
   Vehicle Allocation Simulator v2
========================================== */

let conversations = {};

function random(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function bossName(){
    return random(bossNames);
}

function initConversation(unit){

    conversations[unit.callsign] = {

        unread:0,

        history:[],

        personality:unit.personality,

        waitingReply:false

    };

}

function addCrewMessage(unit,text){

    if(!conversations[unit.callsign]){
        initConversation(unit);
    }

    conversations[unit.callsign].history.push({

        sender:"crew",

        text:text,

        time:new Date()

    });

    conversations[unit.callsign].unread++;

    if(typeof playNotification==="function"){
        playNotification();
    }

}

function addControlMessage(unit,text){

    if(!conversations[unit.callsign]){
        initConversation(unit);
    }

    conversations[unit.callsign].history.push({

        sender:"control",

        text:text,

        time:new Date()

    });

}

function personalityEnding(unit){

    switch(unit.personality){

        case "banter":
            return " 😂";

        case "chatty":
            return " mate";

        case "formal":
            return ".";

        case "dry":
            return "...";

        case "tired":
            return " honestly shattered.";

        default:
            return "";
    }

}

function crewReply(unit,message){

    const boss = bossName();

    const msg = message.toLowerCase();

    if(unit.status==="onscene"){

        return random([

            "Still assessing "+boss,

            "Will update shortly",

            "Bit tied up at the minute",

            "Patient still with us"

        ])+personalityEnding(unit);

    }

    if(unit.status==="transport"){

        return random([

            "Transporting now "+boss,

            "Patient stable thankfully",

            "ETA around 10 mins",

            "Just heading into hospital"

        ])+personalityEnding(unit);

    }

    if(msg.includes("meal")){

        return Math.random()<0.5 ?
            random(mealBreakYesReplies):
            random(mealBreakNoReplies);

    }

    if(msg.includes("free")){

        return random([

            "Yeah we're available",

            "Just mobile now",

            "Paperwork nearly done",

            "Available if needed"

        ])+personalityEnding(unit);

    }

    return random([

        "Copy that 👍",

        "Roger Boss",

        "Will do",

        "No dramas",

        "Cheers",

        "Got it"

    ])+personalityEnding(unit);

}

function sendMessageToCrew(unit,text){

    addControlMessage(unit,text);

    const delay=(3+Math.random()*12)*1000;

    setTimeout(()=>{

        addCrewMessage(

            unit,

            crewReply(unit,text)

        );

    },delay);

}

function messageAll(text){

    fleet.forEach(unit=>{

        if(Math.random()<0.75){

            const delay=(Math.random()*40+5)*1000;

            setTimeout(()=>{

                addCrewMessage(

                    unit,

                    crewReply(unit,text)

                );

            },delay);

        }

    });

}

function randomFriendMessage(){

    if(Math.random()<0.9)return;

    const available=fleet.filter(

        x=>x.status==="available"

    );

    if(!available.length)return;

    const unit=random(available);

    addCrewMessage(

        unit,

        random(casualFriendMessages)

    );

}

function sendRandomCrewUpdate(){

    const jobs=fleet.filter(

        x=>x.job

    );

    if(!jobs.length)return;

    const unit=random(jobs);

    const updates=[

        "Boss we're on scene now.",

        "Patient stable thankfully.",

        "Looks like we'll be transporting.",

        "Police now on scene.",

        "Just waiting for HEMS.",

        "Will update once we've assessed.",

        "Just waiting for family.",

        "Looks like hospital transport."

    ];

    addCrewMessage(

        unit,

        random(updates)

    );

}

function readLastMessageAloud(unit){

    if(!window.speechSynthesis)return;

    const convo=conversations[unit.callsign];

    if(!convo)return;

    if(!convo.history.length)return;

    const msg=convo.history[

        convo.history.length-1

    ];

    const speech=new SpeechSynthesisUtterance(

        msg.text

    );

    speech.rate=1;

    speech.pitch=1;

    window.speechSynthesis.speak(speech);

}
