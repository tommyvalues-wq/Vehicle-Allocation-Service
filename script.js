// Vehicle Allocation - OpenStreetMap 999 dispatcher simulation
// Free: uses Leaflet + OpenStreetMap tiles. Road movement uses public OSRM routing with a local fallback.

const towns = [
['Aberdeen',57.1497,-2.0943],['Aberystwyth',52.4153,-4.0829],['Accrington',53.7534,-2.3638],['Airdrie',55.8660,-3.9803],['Aldershot',51.2482,-0.7639],['Altrincham',53.3875,-2.3485],['Andover',51.2112,-1.4919],['Arbroath',56.5591,-2.5915],['Ashford',51.1465,0.8750],['Aylesbury',51.8156,-0.8084],['Ayr',55.4586,-4.6292],
['Banbury',52.0629,-1.3398],['Bangor',53.2274,-4.1293],['Barnsley',53.5526,-1.4797],['Barnstaple',51.0809,-4.0583],['Barrow-in-Furness',54.1109,-3.2276],['Basildon',51.5761,0.4887],['Basingstoke',51.2665,-1.0924],['Bath',51.3811,-2.3590],['Bedford',52.1359,-0.4667],['Belfast',54.5973,-5.9301],['Beverley',53.8459,-0.4233],['Birkenhead',53.3899,-3.0230],['Birmingham',52.4862,-1.8904],['Blackburn',53.7486,-2.4875],['Blackpool',53.8175,-3.0357],['Bognor Regis',50.7829,-0.6730],['Bolton',53.5769,-2.4282],['Boston',52.9789,-0.0266],['Bournemouth',50.7192,-1.8808],['Bradford',53.7938,-1.7564],['Braintree',51.8787,0.5529],['Brentwood',51.6205,0.3050],['Brighton',50.8225,-0.1372],['Bristol',51.4545,-2.5879],['Burnley',53.7893,-2.2405],['Burton upon Trent',52.8073,-1.6426],['Bury',53.5933,-2.2966],
['Caerphilly',51.5788,-3.2181],['Cambridge',52.2053,0.1218],['Canterbury',51.2802,1.0789],['Cardiff',51.4816,-3.1791],['Carlisle',54.8925,-2.9329],['Carmarthen',51.8560,-4.3121],['Chelmsford',51.7356,0.4685],['Cheltenham',51.8994,-2.0783],['Chester',53.1934,-2.8931],['Chesterfield',53.2350,-1.4216],['Chichester',50.8365,-0.7792],['Colchester',51.8959,0.8919],['Corby',52.4923,-0.6842],['Coventry',52.4068,-1.5197],['Crawley',51.1091,-0.1872],['Crewe',53.1004,-2.4438],['Croydon',51.3762,-0.0982],
['Darlington',54.5236,-1.5595],['Derby',52.9225,-1.4746],['Doncaster',53.5228,-1.1285],['Dover',51.1279,1.3134],['Dudley',52.5123,-2.0811],['Dundee',56.4620,-2.9707],['Dunfermline',56.0717,-3.4522],['Durham',54.7753,-1.5849],
['Eastbourne',50.7680,0.2905],['Eastleigh',50.9672,-1.3747],['Edinburgh',55.9533,-3.1883],['Ely',52.3981,0.2622],['Exeter',50.7184,-3.5339],
['Falkirk',56.0019,-3.7839],['Fareham',50.8516,-1.1793],['Farnborough',51.2869,-0.7526],['Folkestone',51.0814,1.1695],
['Gateshead',54.9527,-1.6034],['Glasgow',55.8642,-4.2518],['Gloucester',51.8642,-2.2382],['Grantham',52.9125,-0.6426],['Great Yarmouth',52.5982,1.7280],['Grimsby',53.5675,-0.0808],['Guildford',51.2362,-0.5704],
['Halifax',53.7270,-1.8575],['Harrogate',53.9921,-1.5418],['Hartlepool',54.6917,-1.2129],['Hastings',50.8543,0.5730],['Hemel Hempstead',51.7537,-0.4497],['Hereford',52.0564,-2.7159],['High Wycombe',51.6286,-0.7482],['Huddersfield',53.6458,-1.7850],['Hull',53.7676,-0.3274],
['Inverness',57.4778,-4.2247],['Ipswich',52.0567,1.1482],['Kendal',54.3280,-2.7463],['Kettering',52.3984,-0.7257],['Kidderminster',52.3886,-2.2497],['Kingston upon Thames',51.4123,-0.3007],['Kirkcaldy',56.1165,-3.1599],
['Lancaster',54.0466,-2.8007],['Leeds',53.8008,-1.5491],['Leicester',52.6369,-1.1398],['Lincoln',53.2307,-0.5406],['Liverpool',53.4084,-2.9916],['Llandudno',53.3241,-3.8276],['London',51.5072,-0.1276],['Loughborough',52.7721,-1.2062],['Luton',51.8787,-0.4200],
['Maidstone',51.2704,0.5227],['Manchester',53.4808,-2.2426],['Mansfield',53.1472,-1.1987],['Margate',51.3896,1.3862],['Middlesbrough',54.5742,-1.2348],['Milton Keynes',52.0406,-0.7594],['Motherwell',55.7839,-3.9810],
['Newcastle upon Tyne',54.9783,-1.6178],['Newport',51.5842,-2.9977],['Newquay',50.4155,-5.0737],['Northampton',52.2405,-0.9027],['Norwich',52.6309,1.2974],['Nottingham',52.9548,-1.1581],
['Oldham',53.5409,-2.1114],['Oxford',51.7520,-1.2577],['Paisley',55.8473,-4.4401],['Peterborough',52.5695,-0.2405],['Plymouth',50.3755,-4.1427],['Poole',50.7151,-1.9872],['Portsmouth',50.8198,-1.0880],['Preston',53.7632,-2.7031],
['Reading',51.4551,-0.9787],['Redditch',52.3088,-1.9409],['Rhyl',53.3191,-3.4916],['Rochdale',53.6097,-2.1561],['Rotherham',53.4326,-1.3635],['Rugby',52.3709,-1.2642],
['Salford',53.4875,-2.2901],['Salisbury',51.0688,-1.7945],['Scarborough',54.2831,-0.3998],['Scunthorpe',53.5886,-0.6544],['Sheffield',53.3811,-1.4701],['Shrewsbury',52.7073,-2.7553],['Slough',51.5105,-0.5950],['Southampton',50.9097,-1.4044],['Southend-on-Sea',51.5459,0.7077],['Southport',53.6457,-3.0101],['St Albans',51.7527,-0.3394],['St Helens',53.4563,-2.7371],['Stafford',52.8067,-2.1207],['Stevenage',51.9038,-0.1966],['Stirling',56.1165,-3.9369],['Stockport',53.4084,-2.1493],['Stoke-on-Trent',53.0027,-2.1794],['Sunderland',54.9069,-1.3838],['Swansea',51.6214,-3.9436],['Swindon',51.5558,-1.7797],
['Taunton',51.0153,-3.1068],['Telford',52.6784,-2.4453],['Torquay',50.4619,-3.5253],['Truro',50.2632,-5.0510],['Wakefield',53.6833,-1.4977],['Walsall',52.5862,-1.9829],['Warrington',53.3900,-2.5969],['Warwick',52.2823,-1.5849],['Watford',51.6565,-0.3903],['Weston-super-Mare',51.3460,-2.9773],['Wigan',53.5451,-2.6325],['Winchester',51.0629,-1.3167],['Wolverhampton',52.5862,-2.1281],['Worcester',52.1936,-2.2216],['Worthing',50.8179,-0.3729],['Wrexham',53.0465,-2.9938],['York',53.9590,-1.0815]
];

const firstNames = ['Alex','Sam','Jamie','Morgan','Taylor','Jordan','Casey','Riley','Charlie','Drew','Chris','Robin','Lee','Jess','Ash','Cameron','Harper','Bailey','Kai','Ellis','Finley','Reece','Rowan','Mia','Noah','Evie','Archie','Amelia','Ollie'];
const callTypes = ['Chest pain','Breathing difficulties','Fall with injury','RTC reported','Abdominal pain','Stroke symptoms','Seizure','Unconscious person','Mental health crisis','Maternity emergency','Diabetic emergency','Allergic reaction','Overdose concern','Cardiac arrest','Welfare concern','Collapse queried','Paediatric fever'];
const streets = ['High Street','Station Road','Church Lane','Victoria Road','Queen Street','King Street','London Road','Park Road','Mill Lane','School Road','Bridge Street','Market Place','The Crescent','Manor Road','Albert Road','Hospital Road','North Street','South Street','Green Lane'];
const statuses = ['available','mobile','onscene','hospital','restock'];
const resourceTypes = ['Police','Fire','Extra ambulance','HEMS','Mental health team','Specialist paramedic'];
const personalities = ['chilled','dry','formal','chatty','tired'];


// --- Dispatcher sound system: no audio files needed, uses Web Audio tones ---
let audioCtx = null;
let soundReady = false;
function setupAudioUnlock(){
  const unlock = () => {
    try{
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      audioCtx.resume?.();
      soundReady = true;
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
    }catch(e){ }
  };
  document.addEventListener('click', unlock);
  document.addEventListener('keydown', unlock);
}
function tone(freq, start, duration, type='sine', gain=.045){
  if(!soundReady) return;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const now = audioCtx.currentTime + start;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gain, now + 0.025);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(g); g.connect(audioCtx.destination);
  osc.start(now); osc.stop(now + duration + 0.03);
}
function playSound(kind){
  try{
    if(kind === 'message'){
      tone(740,0,.11,'sine',.035); tone(980,.11,.13,'sine',.03);
    }else if(kind === 'job'){
      tone(520,0,.12,'triangle',.04); tone(660,.14,.12,'triangle',.04); tone(880,.30,.18,'triangle',.04);
    }else if(kind === 'code0'){
      for(let i=0;i<7;i++){ tone(i%2?610:420,i*.18,.14,'square',.055); }
    }else if(kind === 'click'){
      tone(360,0,.06,'sine',.018);
    }
  }catch(e){ }
}

let map, fleet = [], selected = null, town = towns.find(t => t[0] === 'London');
let incidents = [], landmarkLayer, routeLayer, unitLayer, lastTownToken = 0;

function $(id){ return document.getElementById(id); }
function rand(a,b){ return Math.random() * (b-a) + a; }
function pick(a){ return a[Math.floor(Math.random() * a.length)]; }
function pad(n){ return String(n).padStart(3,'0'); }
function callsign(){ return Math.random() < 0.5 ? `M1-B${pad(Math.floor(rand(1,999)))}` : `NW-A${pad(Math.floor(rand(1,999)))}`; }
function address(){ return `${Math.floor(rand(1,240))} ${pick(streets)}`; }
function safeId(){ return (crypto?.randomUUID?.() || String(Date.now() + Math.random())); }
function statusText(s){ return ({available:'Available',mobile:'Mobile',onscene:'On scene',hospital:'At hospital',restock:'Restocking',meal:'Meal break',code0:'CODE 0'})[s] || s; }

function init(){
  setupAudioUnlock();
  towns.sort((a,b)=>a[0].localeCompare(b[0]));
  $('townList').innerHTML = towns.map(t=>`<option value="${t[0]}"></option>`).join('');
  $('townSearch').value = town[0];
  map = L.map('map',{zoomControl:true,preferCanvas:true}).setView([town[1],town[2]],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  routeLayer = L.layerGroup().addTo(map);
  landmarkLayer = L.layerGroup().addTo(map);
  unitLayer = L.layerGroup().addTo(map);
  $('goTown').onclick = selectTown;
  $('regenFleet').onclick = regenerateFleet;
  $('townSearch').addEventListener('keydown',e=>{ if(e.key === 'Enter') selectTown(); });
  $('messageForm').addEventListener('submit',sendMessage);
  $('closeCode0').onclick = () => $('code0Modal').classList.add('hidden');
  setInterval(tick, 700);
  setInterval(updateClock, 1000);
  setInterval(randomDispatcherActivity, 8500);
  setInterval(randomCrewJobMessages, 22000);
  updateClock();
  loadLandmarks();
  regenerateFleet();
  scheduleCode0();
}

function selectTown(){
  const q = $('townSearch').value.trim().toLowerCase();
  const found = towns.find(t => t[0].toLowerCase() === q) || towns.find(t => t[0].toLowerCase().includes(q));
  if(!found){ $('statusStrip').textContent = 'Town not found in local selector'; return; }
  town = found;
  lastTownToken++;
  $('townSearch').value = town[0];
  map.flyTo([town[1], town[2]], 14, {duration: 1});
  loadLandmarks();
  regenerateFleet();
}

function unitIcon(status){
  return L.divIcon({className:'',html:`<div class="unit-blip status-${status}"><span></span></div>`,iconSize:[18,18],iconAnchor:[9,9]});
}
function labelIcon(v){
  return L.divIcon({className:'',html:`<div class="unit-label">${v.name} • ${v.call}</div>`,iconSize:[132,22],iconAnchor:[66,38]});
}
function randomPointNearTown(radius=.035){ return [town[1]+rand(-radius,radius), town[2]+rand(-radius*1.45,radius*1.45)]; }

async function roadRoute(start){
  const a = start || randomPointNearTown(.032), b = randomPointNearTown(.032);
  const url = `https://router.project-osrm.org/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=full&geometries=geojson`;
  try{
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), 4500);
    const res = await fetch(url, {signal: controller.signal});
    clearTimeout(timer);
    const data = await res.json();
    const coords = data?.routes?.[0]?.geometry?.coordinates?.map(c=>[c[1],c[0]]) || [];
    if(coords.length > 4) return coords;
  }catch(e){ }
  // fallback: road-ish local route instead of teleporting across the map
  const mid1 = [a[0], b[1]];
  const mid2 = [(a[0]+b[0])/2 + rand(-.006,.006), (a[1]+b[1])/2 + rand(-.006,.006)];
  return [a, mid1, mid2, b];
}

async function regenerateFleet(){
  unitLayer.clearLayers();
  routeLayer.clearLayers();
  fleet = []; incidents = []; selected = null;
  $('messages').textContent = 'Messages will appear here once a crew is selected.';
  $('selectedVehicle').textContent = 'No vehicle selected';
  const count = Math.floor(rand(28,45));
  $('statusStrip').textContent = `Building road-following routes for ${count} units in ${town[0]}...`;
  const token = lastTownToken;
  for(let i=0; i<count; i++) await addVehicle(token);
  renderIncidents();
  setTimeout(()=>$('statusStrip').textContent = `${fleet.length} units active • routes locked to roads where OSRM is available`, 1000);
}

async function addVehicle(token){
  if(token !== lastTownToken) return;
  const route = await roadRoute();
  if(token !== lastTownToken) return;
  const [lat,lng] = route[0];
  const status = pick(['available','available','mobile','onscene','hospital','restock']);
  const v = {
    id:safeId(), name:pick(firstNames), call:callsign(), lat, lng, status,
    job:null, speed:rand(.00022,.00065), route, routeIndex:0, stop:Math.random()<.2?Math.floor(rand(6,22)):0,
    messages:[], personality:pick(personalities), shiftJobs:Math.floor(rand(1,10)), lastUserTexts:[], lastReplyAt:0,
    routeLine:null, currentLandmark:null
  };
  if(status !== 'available' && Math.random()<.65) assignIncident(v, false);
  v.marker = L.marker([lat,lng],{icon:unitIcon(v.status)}).addTo(unitLayer).on('click',()=>selectVehicle(v));
  v.label = L.marker([lat,lng],{icon:labelIcon(v),interactive:false}).addTo(unitLayer);
  v.routeLine = L.polyline(route,{weight:2,opacity:.22,dashArray:'4,8'}).addTo(routeLayer);
  fleet.push(v);
}

function assignIncident(v, push=true){
  v.job = {type:pick(callTypes), addr:address(), priority:`CAT ${Math.ceil(rand(1,5))}`, hospital:nearestHospitalName(), created:new Date(), resourceRequest:null, resourceSent:null};
  if(push){
    playSound('job');
    incidents.unshift({unit:v.call, crew:v.name, ...v.job});
    if(incidents.length > 12) incidents.pop();
    renderIncidents();
  }
}

function nearestHospitalName(){
  const hospitalMarkers = landmarkLayer?.getLayers?.().filter(l => l.options?.kind === 'hospital') || [];
  if(hospitalMarkers.length){
    const m = pick(hospitalMarkers);
    return m.options.landmarkName || `${town[0]} Hospital`;
  }
  return `${town[0]} ${pick(['General Hospital','Royal Infirmary','District Hospital','University Hospital','Urgent Treatment Centre'])}`;
}

async function resetVehicleRoute(v){
  const start = [v.lat, v.lng];
  v.route = await roadRoute(start);
  v.routeIndex = 0;
  if(v.routeLine) v.routeLine.setLatLngs(v.route);
}
function moveAlongRoute(v){
  if(!v.route || v.route.length < 2) return;
  let next = v.route[v.routeIndex + 1];
  if(!next){ resetVehicleRoute(v); return; }
  const cur = [v.lat, v.lng];
  const dlat = next[0] - cur[0], dlng = next[1] - cur[1];
  const dist = Math.hypot(dlat, dlng);
  const modifier = v.status === 'mobile' ? 1.6 : v.status === 'available' ? 1 : .45;
  const step = v.speed * modifier;
  if(dist <= step){ v.lat = next[0]; v.lng = next[1]; v.routeIndex++; }
  else { v.lat += dlat/dist*step; v.lng += dlng/dist*step; }
}

function tick(){
  fleet.forEach(v=>{
    if(v.status === 'code0' || v.status === 'meal') return;
    if(v.stop > 0){ v.stop--; return; }
    if(['onscene','hospital','restock'].includes(v.status) && Math.random()<.18){ v.stop = Math.floor(rand(5,20)); return; }
    if(Math.random()<.035){ v.stop = Math.floor(rand(3,17)); return; }
    moveAlongRoute(v);
    v.marker.setLatLng([v.lat,v.lng]);
    v.label.setLatLng([v.lat,v.lng]);
    v.marker.setIcon(unitIcon(v.status));
  });
}

function randomDispatcherActivity(){
  if(!fleet.length) return;
  const v = pick(fleet);
  if(v.status === 'code0' || v.status === 'meal') return;
  if(Math.random() < .28){
    const next = pick(statuses);
    v.status = next;
    if(['mobile','onscene','hospital'].includes(next) && !v.job) assignIncident(v, true);
    if(next === 'available' && Math.random()<.65) v.job = null;
    if(selected === v) renderSelected();
    renderIncidents();
  }
}

function selectVehicle(v){
  playSound('click');
  selected = v;
  if(!v.job && Math.random()<.45){
    v.status = 'mobile';
    assignIncident(v, true);
  }
  renderSelected();
  renderMessages();
}

function renderSelected(){
  if(!selected) return;
  const job = selected.job
    ? `<b>Current job:</b> ${selected.job.priority} - ${selected.job.type}<br><b>Address:</b> ${selected.job.addr}, ${town[0]}<br><b>Destination:</b> ${selected.job.hospital}${selected.job.resourceRequest ? `<br><b class="resource-warn">Resource request:</b> ${selected.job.resourceRequest}${selected.job.resourceSent ? ` — ${selected.job.resourceSent} sent` : ''}` : ''}`
    : '<b>Status:</b> No job';
  const mealBtn = selected.status === 'meal' ? `<button class="small-btn disabled" disabled>Meal break active</button>` : `<button class="small-btn" onclick="putSelectedOnMealBreak()">Put on meal break</button>`;
  const resourceBtns = selected.job && selected.job.resourceRequest && !selected.job.resourceSent
    ? `<div class="resource-actions"><button class="small-btn urgent" onclick="sendRequestedResource()">Send requested resource</button><button class="small-btn" onclick="sendResource('Extra ambulance')">Send extra ambulance</button><button class="small-btn" onclick="sendResource('Police')">Send police</button><button class="small-btn" onclick="sendResource('Fire')">Send fire</button></div>`
    : selected.job ? `<div class="resource-actions"><button class="small-btn" onclick="sendResource('Extra ambulance')">Send extra ambulance</button><button class="small-btn" onclick="sendResource('Police')">Send police</button><button class="small-btn" onclick="sendResource('Fire')">Send fire</button></div>` : '';
  $('selectedVehicle').innerHTML = `<b>${selected.call}</b><br>Crew: ${selected.name}<br>Status: <span class="status-pill ${selected.status}">${statusText(selected.status)}</span><br>Personality: ${selected.personality}<br>${job}<div class="unit-actions">${mealBtn}${resourceBtns}</div>`;
}
function renderIncidents(){
  const live = incidents.slice(0,12);
  $('incidentList').innerHTML = live.length ? live.map(i=>`<div class="incident ${i.resourceRequest && !i.resourceSent ? 'needs-resource' : ''}"><strong>${i.priority} • ${i.type}</strong><span>${i.addr}, ${town[0]}</span><br><small>Assigned: ${i.unit} • ${i.hospital}</small>${i.resourceRequest ? `<br><em>Resource: ${i.resourceSent ? i.resourceSent + ' sent' : i.resourceRequest + ' requested'}</em>` : ''}</div>`).join('') : '<p>No live incidents assigned.</p>';
}
function renderMessages(){
  const box = $('messages');
  if(!selected) return;
  box.innerHTML = selected.messages.length
    ? selected.messages.map(m=>`<div class="msg ${m.who}">${m.text}</div>`).join('')
    : `<div class="msg crew">${selected.name}: Hey control, ${selected.call} here. What do you need?</div>`;
  box.scrollTop = box.scrollHeight;
}

function sendMessage(e){
  e.preventDefault();
  if(!selected) return;
  const input = $('messageInput');
  const text = input.value.trim();
  if(!text) return;
  input.value = '';
  const responder = selected;
  responder.lastUserTexts.push(text);
  responder.lastUserTexts = responder.lastUserTexts.slice(-5);
  responder.messages.push({who:'me', text});
  renderMessages();
  if(Math.random() < .08){
    setTimeout(()=>{
      if(!responder.messages.some(m=>m.text === 'Seen')) responder.messages.push({who:'seen', text:'Seen'});
      if(selected === responder) renderMessages();
    }, rand(1200,2800));
    return;
  }
  setTimeout(()=>{
    responder.messages.push({who:'typing', text:`${responder.name} is typing…`});
    if(selected === responder) renderMessages();
    setTimeout(()=>{
      responder.messages = responder.messages.filter(m => m.who !== 'typing');
      responder.messages.push({who:'crew', text:crewReply(text, responder)});
      playSound('message');
      responder.lastReplyAt = Date.now();
      if(selected === responder) renderMessages();
    }, rand(1800,7600));
  }, rand(500,1600));
}

function crewReply(text, unit){
  const t = text.toLowerCase();
  const job = unit.job;
  const p = unit.personality;
  const prefix = `${unit.name}: `;
  const eta = Math.ceil(rand(3,14));
  const traffic = pick(['traffic is moving alright','traffic is grim through town','roads are weirdly quiet','we are stuck behind every red light going','we are getting through it slowly']);
  const casual = p === 'formal' ? '' : pick([' 👍',' mate',' 😂','']);
  const tired = p === 'tired' ? ' Honestly, we could do with a brew after this.' : '';

  if(t.includes('eta') || t.includes('how long') || t.includes('arrival')){
    return prefix + (job ? `Sat nav says about ${eta} mins to ${job.addr}. ${traffic}, so I’ll shout if that changes${casual}` : `We’re not committed at the moment, but we’re about ${eta} mins from the centre if you need us${casual}`);
  }
  if(t.includes('where') || t.includes('location')){
    return prefix + pick([
      `We’re near ${town[0]} centre, mobile at the moment${casual}`,
      `Just coming past the main road now. Map should have us moving${casual}`,
      job ? `Heading towards ${job.addr}. We’re not far off now.` : `Sitting clear near the station area, ready for the next one.`
    ]);
  }
  if(t.includes('free') || t.includes('available') || t.includes('clear')){
    if(unit.status === 'available') return prefix + pick([`Yep, we’re clear and available${casual}`,`All clear our end. Send it over if you need us.`,`Available now, just finishing a quick tidy in the back.`]);
    return prefix + pick([`Not quite, still tied up. Shouldn’t be too long${casual}`,`Still on this one. We’ll book clear as soon as we can.`,`Negative at the moment, just waiting on handover.`]);
  }
  if(t.includes('status') || t.includes('update') || t.includes('state')){
    if(job) return prefix + pick([`Quick update: we’re ${statusText(unit.status).toLowerCase()} on a ${job.priority} ${job.type}. Patient is stable for now.${tired}`,`We’re still dealing with ${job.type}. Nothing dramatic to report, will update if it changes.`,`Currently ${statusText(unit.status).toLowerCase()}. We’ve got the details and we’re working through it.`]);
    return prefix + pick([`No job on us at the moment. We’re clear in ${town[0]}.`,`All quiet for us right now, which is never a bad thing.`,`We’re available. Van’s good, crew’s good-ish${p==='dry'?'… ish.':''}`]);
  }
  if(t.includes('hospital') || t.includes('handover') || t.includes('convey')){
    return prefix + (job ? `Looks like ${job.hospital}. Handover queue doesn’t look too awful at the moment, famous last words${p==='formal'?'.':' 😂'}` : `No conveyance right now. If we pick one up I’ll update the destination.`);
  }
  if(t.includes('break') || t.includes('food') || t.includes('coffee') || t.includes('brew')){
    return prefix + pick([`A brew would save lives at this point${p==='formal'?'.':' 😂'}`,`We’ve been trying to get food for about two hours. Standard day really.`,`If you can protect us for ten mins after this, we’d love you forever.`,`Coffee’s gone cold again, obviously.`]);
  }
  if(t.includes('shift') || t.includes('busy') || t.includes('day')){
    return prefix + pick([`Busy but manageable. Think we’re on job ${unit.shiftJobs} now${casual}`,`It’s been non-stop, but we’re alright.`, `One of those shifts where the radio knows when you open your sandwich${p==='formal'?'.':' 😂'}`]);
  }
  if(t.includes('police') || t.includes('fire')){
    return prefix + pick([`Yeah, police would be helpful if you can start them.`, `Fire might be needed if that RTC update is right.`, `No other services needed yet, but we’ll shout if the scene changes.`]);
  }
  if(t.includes('code 0') || t.includes('code-0') || t.includes('urgent')){
    return prefix + (unit.status === 'code0' ? `Yeah, Code 0 confirmed. Need urgent assistance to our location now.` : `No Code 0 from us. We’re okay, just busy.`);
  }
  if(t.includes('thank') || t.includes('cheers')){
    return prefix + pick([`No worries${casual}`,`Cheers control.`, `All good, we’ll keep you posted.`, `Ta, speak in a bit.`]);
  }
  if(t.includes('hello') || t.includes('hi') || t.includes('morning') || t.includes('evening')){
    return prefix + pick([`Hey, go ahead${casual}`,`Hi control, receiving you.`, `Morning. We’re awake… mostly${p==='formal'?'.':' 😂'}`, `Evening, what’s occurring?`]);
  }
  return prefix + pick([
    `Yeah no problem, we’ll sort that${casual}`,
    `Copy that. Give us a sec and we’ll come back to you.`,
    `Alright, received. We’re just working through it now.`,
    `Yep, that’s fine. We’ll keep you updated.`,
    `Sound. If anything changes our end I’ll message straight away.`,
    `Got it. Bit tied up, but we’ve seen it.`
  ]);
}


function addCrewSystemMessage(unit, text, sound='message'){
  unit.messages.push({who:'crew', text:`${unit.name}: ${text}`});
  playSound(sound);
  if(selected === unit){ renderMessages(); renderSelected(); }
}

function putSelectedOnMealBreak(){
  if(!selected || selected.status === 'code0') return;
  const unit = selected;
  unit.prevStatusBeforeMeal = unit.status;
  unit.status = 'meal';
  unit.stop = 260; // approximately 3 minutes at the current tick speed
  unit.marker?.setIcon(unitIcon(unit.status));
  addCrewSystemMessage(unit, pick([
    'Cheers, we’ll grab food quickly and keep the radio on.',
    'Nice one. Three mins to inhale something that counts as lunch 😂',
    'Meal break received, thank you. We’ll be back available shortly.',
    'Absolute legend. We’ll be back in three.'
  ]));
  renderSelected();
  setTimeout(()=>{
    if(!fleet.includes(unit) || unit.status !== 'meal') return;
    unit.status = 'available';
    unit.job = null;
    unit.stop = 0;
    unit.marker?.setIcon(unitIcon(unit.status));
    addCrewSystemMessage(unit, pick([
      'Back from meal, booked clear and available.',
      'That was the fastest food break known to humanity. We’re clear now 😂',
      'Meal break complete, available when needed.',
      'We’re back mobile and clear.'
    ]));
    if(selected === unit) renderSelected();
  }, 180000);
}

function sendResource(type){
  if(!selected || !selected.job) return;
  selected.job.resourceSent = type;
  const cad = incidents.find(i => i.unit === selected.call && i.addr === selected.job.addr);
  if(cad){ cad.resourceRequest = selected.job.resourceRequest; cad.resourceSent = type; }
  playSound('job');
  addCrewSystemMessage(selected, pick([
    `${type} received, thanks control. That’ll help.`,
    `Perfect, thanks. We’ll keep an eye out for ${type.toLowerCase()}.`,
    `Cheers, ${type.toLowerCase()} is exactly what we needed.`,
    `Thanks mate, we’ll update once they arrive.`
  ]));
  renderSelected();
  renderIncidents();
}

function sendRequestedResource(){
  if(selected?.job?.resourceRequest) sendResource(selected.job.resourceRequest);
}

function randomCrewJobMessages(){
  if(!fleet.length) return;
  const working = fleet.filter(v => v.job && v.status !== 'meal' && v.status !== 'code0');
  if(!working.length) return;
  const unit = pick(working);
  const job = unit.job;
  if(Math.random() < .42 && !job.resourceRequest && !job.resourceSent){
    job.resourceRequest = pick(resourceTypes);
    const cad = incidents.find(i => i.unit === unit.call && i.addr === job.addr);
    if(cad) cad.resourceRequest = job.resourceRequest;
    addCrewSystemMessage(unit, pick([
      `Control, can we get ${job.resourceRequest.toLowerCase()} started to ${job.addr} please?`,
      `Any chance of ${job.resourceRequest.toLowerCase()} for this one? Scene is getting a bit more involved.`,
      `Can you attach ${job.resourceRequest.toLowerCase()} when you get a sec please?`,
      `We’re going to need ${job.resourceRequest.toLowerCase()} here please. Not urgent urgent, but sooner rather than later.`
    ]), 'job');
    renderIncidents();
    return;
  }
  const questions = [
    `Do we have any extra notes for ${job.addr}?`,
    `Can you confirm the caller is still on scene?`,
    `Any hazards flagged for this address?`,
    `Do we know if police have been informed for this?`,
    `Can you check if there’s a key safe code on the log?`,
    `Have we got an age for the patient?`,
    `Can you update us if the caller rings back?`,
    `Is ${job.hospital} still accepting, or are they diverting?`,
    `Do you want us to convey if suitable or wait for clinical advice?`,
    `Can you see if there’s any previous history at this address?`
  ];
  addCrewSystemMessage(unit, pick(questions));
}

function landmarkIcon(kind){ return L.divIcon({className:'',html:`<div class="landmark ${kind}"></div>`,iconSize:[20,20],iconAnchor:[10,10]}); }
async function loadLandmarks(){
  if(!landmarkLayer) return;
  landmarkLayer.clearLayers();
  $('statusStrip').textContent = `Loading hospitals, stations and landmarks for ${town[0]}...`;
  const q = `[out:json][timeout:9];(node(around:7000,${town[1]},${town[2]})[amenity~"hospital|police|fire_station"];node(around:7000,${town[1]},${town[2]})[railway="station"];node(around:7000,${town[1]},${town[2]})[emergency="ambulance_station"];node(around:7000,${town[1]},${town[2]})[amenity~"university|school|townhall"];);out center 45;`;
  try{
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), 6500);
    const res = await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q,signal:controller.signal});
    clearTimeout(timer);
    const data = await res.json();
    const items = (data.elements || []).slice(0,45);
    if(!items.length) throw new Error('No POI returned');
    items.forEach(el => addLandmark(el));
  }catch(e){
    fallbackLandmarks();
  }
}
function addLandmark(el){
  const tags = el.tags || {}; const lat = el.lat || el.center?.lat, lon = el.lon || el.center?.lon;
  if(!lat || !lon) return;
  let kind = 'poi';
  if(tags.amenity === 'hospital') kind = 'hospital';
  else if(tags.emergency === 'ambulance_station') kind = 'ambulance';
  else if(tags.amenity === 'police') kind = 'police';
  else if(tags.amenity === 'fire_station') kind = 'fire';
  else if(tags.railway === 'station') kind = 'station';
  else if(tags.amenity === 'university') kind = 'university';
  else if(tags.amenity === 'school') kind = 'school';
  else if(tags.amenity === 'townhall') kind = 'townhall';
  const name = tags.name || `${town[0]} ${kind}`;
  L.marker([lat,lon],{icon:landmarkIcon(kind), kind, landmarkName:name})
    .bindPopup(`<b>${name}</b><br>${kind.replace('_',' ')}`)
    .addTo(landmarkLayer);
}
function fallbackLandmarks(){
  const data = [
    ['hospital','General Hospital'],['ambulance','Ambulance Station'],['police','Police Station'],['fire','Fire Station'],['station','Rail Station'],['townhall','Town Hall']
  ];
  data.forEach(([kind,name],i)=>{
    const p = randomPointNearTown(.02 + i*.001);
    L.marker(p,{icon:landmarkIcon(kind), kind, landmarkName:`${town[0]} ${name}`}).bindPopup(`<b>${town[0]} ${name}</b>`).addTo(landmarkLayer);
  });
}

function scheduleCode0(){ setTimeout(()=>{ triggerCode0(); scheduleCode0(); }, rand(10,20)*60*1000); }
function triggerCode0(){
  const candidates = fleet.filter(x=>x.status !== 'code0');
  const v = pick(candidates.length ? candidates : fleet); if(!v) return;
  v.status = 'code0'; v.marker.setIcon(unitIcon(v.status));
  playSound('code0');
  $('code0Text').textContent = `${v.call} (${v.name}) has declared CODE 0 in ${town[0]}. Immediate dispatcher review required.`;
  $('code0Modal').classList.remove('hidden');
  if(selected === v) renderSelected();
  setTimeout(()=>{ if(v.status === 'code0'){ v.status = 'available'; v.job = null; if(selected === v) renderSelected(); } }, 120000);
}
function updateClock(){ $('clock').textContent = new Date().toLocaleTimeString('en-GB',{hour12:false}); }
window.addEventListener('load', init);
