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
let currentMessageTab = 'chat';
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
  $('chatTab').onclick = () => setMessageTab('chat');
  $('inboxTab').onclick = () => setMessageTab('inbox');
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
  if($('inboxPanel')) $('inboxPanel').innerHTML = '<p>No previous messages yet.</p>';
  updateUnreadBadge();
  const count = Math.floor(rand(28,45));
  $('statusStrip').textContent = `Building road-following routes for ${count} units in ${town[0]}...`;
  const token = lastTownToken;
  for(let i=0; i<count; i++) await addVehicle(token);
  renderIncidents();
  renderInbox(); updateUnreadBadge();
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
    messages:[], unread:0, personality:pick(personalities), shiftJobs:Math.floor(rand(1,10)), lastUserTexts:[], lastReplyAt:0,
    chatMemory:{mood:pick(['good','knackered','busy','calm','hungry']), lastTopic:null, pendingQuestion:null, lastAsked:null, rapport:0, lastUserIntent:null},
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

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function setMessageTab(tab){
  currentMessageTab = tab;
  $('chatTab').classList.toggle('active', tab === 'chat');
  $('inboxTab').classList.toggle('active', tab === 'inbox');
  $('messages').classList.toggle('hidden', tab !== 'chat');
  $('messageForm').classList.toggle('hidden', tab !== 'chat');
  $('inboxPanel').classList.toggle('hidden', tab !== 'inbox');
  if(tab === 'chat' && selected){ selected.unread = 0; updateUnreadBadge(); }
  renderMessages();
  renderInbox();
}
function addCrewMessage(unit, text, sound='message'){
  unit.messages.push({who:'crew', text});
  if(selected !== unit || currentMessageTab !== 'chat') unit.unread = (unit.unread || 0) + 1;
  playSound(sound);
  updateUnreadBadge();
  if(selected === unit){ renderMessages(); renderSelected(); }
  renderInbox();
}
function updateUnreadBadge(){
  const total = fleet.reduce((sum,u)=>sum+(u.unread||0),0);
  $('unreadBadge').textContent = total;
  $('unreadBadge').style.display = total ? 'inline-block' : 'none';
}
function lastMessage(unit){
  const m = [...unit.messages].reverse().find(x => x.who === 'crew' || x.who === 'me');
  return m ? m.text : 'No previous messages';
}
function renderInbox(){
  const panel = $('inboxPanel');
  if(!panel) return;
  const withMessages = fleet.filter(u => u.messages.length || u.unread).sort((a,b)=>(b.unread||0)-(a.unread||0) || b.messages.length-a.messages.length);
  panel.innerHTML = withMessages.length ? withMessages.map(u=>`<div class="inbox-item ${(u.unread||0)?'unread':''}" onclick="openThread('${u.id}')"><div><strong>${escapeHtml(u.call)}</strong> <small>${escapeHtml(u.name)} • ${statusText(u.status)}</small><br><small>${escapeHtml(lastMessage(u)).slice(0,120)}</small></div>${(u.unread||0)?`<span class="inbox-count">${u.unread}</span>`:''}</div>`).join('') : '<p>No previous messages yet.</p>';
}
function openThread(id){
  const unit = fleet.find(u=>u.id === id);
  if(!unit) return;
  selected = unit;
  unit.unread = 0;
  renderSelected();
  setMessageTab('chat');
}
function renderMessages(){
  const box = $('messages');
  if(!selected){ box.textContent = 'Messages will appear here once a crew is selected.'; return; }
  if(currentMessageTab === 'chat') selected.unread = 0;
  updateUnreadBadge();
  box.innerHTML = selected.messages.length
    ? selected.messages.map(m=>`<div class="msg ${m.who}">${escapeHtml(m.text)}</div>`).join('')
    : `<div class="msg crew">${escapeHtml(selected.name)}: Hey control, ${escapeHtml(selected.call)} here. What do you need?</div>`;
  box.scrollTop = box.scrollHeight;
  renderInbox();
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
  responder.lastUserTexts = responder.lastUserTexts.slice(-8);
  responder.messages.push({who:'me', text});
  rememberUserMessage(responder, text);
  renderMessages();

  const replyPlan = enhancedCrewReply(text, responder);
  const seenOnly = replyPlan.seenOnly || Math.random() < 0.04;

  setTimeout(()=>{
    responder.messages.push({who:'seen', text:'Seen'});
    if(selected === responder) renderMessages();
  }, rand(600,1800));

  if(seenOnly){
    responder.chatMemory.pendingQuestion = responder.chatMemory.pendingQuestion || inferIntent(text);
    return;
  }

  setTimeout(()=>{
    responder.messages = responder.messages.filter(m => !(m.who === 'seen' && m.text === 'Seen'));
    responder.messages.push({who:'typing', text:`${responder.name} is typing…`});
    if(selected === responder) renderMessages();
    setTimeout(()=>{
      responder.messages = responder.messages.filter(m => m.who !== 'typing');
      addCrewMessage(responder, replyPlan.main, 'message');
      responder.lastReplyAt = Date.now();
      if(replyPlan.followUp){
        setTimeout(()=>{
          if(!fleet.includes(responder)) return;
          addCrewMessage(responder, `${responder.name}: ${replyPlan.followUp}`, 'message');
          if(selected === responder) renderMessages();
        }, rand(5500,17000));
      }
      if(selected === responder) renderMessages();
    }, replyPlan.delay || rand(1800,7600));
  }, rand(1200,2600));
}

function includesAny(text, words){ return words.some(w => text.includes(w)); }

function inferIntent(text){
  const t = text.toLowerCase();
  if(includesAny(t,['eta','how long','arrival','mins','minutes'])) return 'eta';
  if(includesAny(t,['where','location','position'])) return 'location';
  if(includesAny(t,['free','available','clear','status','update','state'])) return 'status';
  if(includesAny(t,['hospital','handover','convey','destination'])) return 'hospital';
  if(includesAny(t,['break','food','coffee','brew','meal'])) return 'break';
  if(includesAny(t,['shift','busy','day','you ok','alright'])) return 'smalltalk';
  if(includesAny(t,['police','fire','resource','resources','extra','support','backup'])) return 'resources';
  if(includesAny(t,['code 0','code-0','urgent','panic'])) return 'urgent';
  if(includesAny(t,['yes','yeah','yep','send','attach','approved','go ahead'])) return 'confirm';
  if(includesAny(t,['no','negative','stand down','cancel'])) return 'deny';
  if(includesAny(t,['thanks','thank','cheers','ta'])) return 'thanks';
  if(includesAny(t,['hello','hi','morning','evening','yo'])) return 'hello';
  return 'general';
}

function rememberUserMessage(unit, text){
  unit.chatMemory = unit.chatMemory || {};
  const intent = inferIntent(text);
  unit.chatMemory.lastUserIntent = intent;
  unit.chatMemory.lastTopic = intent === 'general' ? unit.chatMemory.lastTopic : intent;
  if(intent === 'thanks') unit.chatMemory.rapport = (unit.chatMemory.rapport || 0) + 1;
  if(intent === 'resources' || intent === 'confirm') unit.chatMemory.pendingQuestion = null;
}

function enhancedCrewReply(text, unit){
  const t = text.toLowerCase();
  const job = unit.job;
  const p = unit.personality;
  const mem = unit.chatMemory = unit.chatMemory || {mood:'busy'};
  const prefix = `${unit.name}: `;
  const eta = Math.ceil(rand(3,14));
  const casual = p === 'formal' ? '' : pick([' 👍',' mate',' 😂','']);
  const opener = p === 'formal' ? pick(['Received. ','Understood. ','Thanks control. ']) : pick(['Yeah, ','Yep, ','No worries, ','Sound, ','Alright, ']);
  const traffic = pick(['traffic is moving alright','traffic is horrible through town','roads are weirdly quiet','we are stuck behind every red light going','we are getting through it slowly']);
  const moodLine = {
    good: 'crew are alright', knackered: 'we are pretty tired but cracking on', busy: 'it has been back-to-back', calm: 'all calm our end', hungry: 'we are still chasing food, no surprise'
  }[mem.mood || 'busy'];

  let main, followUp = null, delay = rand(1800,7200);
  const intent = inferIntent(text);

  if(intent === 'confirm' && job?.resourceRequest && !job.resourceSent){
    main = `${prefix}${opener}please attach ${job.resourceRequest.toLowerCase()} when you can. Scene feels like it might get messy.`;
    followUp = pick([`Also, can you let them know access is via ${pick(streets)} side if possible?`, `If there is a supervisor nearby, happy for them to tag on as well.`, `Patient is okay-ish at the minute, it is more the scene we are worried about.`]);
  }else if(intent === 'deny' && job?.resourceRequest && !job.resourceSent){
    main = `${prefix}Okay, we’ll hold for now, but can you keep it in mind please? We may come back for it if things change.`;
  }else if(intent === 'eta'){
    main = prefix + (job ? `${opener}sat nav says about ${eta} mins to ${job.addr}. ${traffic}, so I’ll shout if that changes${casual}` : `${opener}not committed right now. We are roughly ${eta} mins from the centre if you need us${casual}`);
    followUp = job ? pick([`Caller notes still say ${job.type}, yeah?`, `If the caller rings back, can you send any updates through?`, `We will mark on scene as soon as we pull up.`]) : null;
  }else if(intent === 'location'){
    main = prefix + pick([
      `${opener}we’re near ${town[0]} centre, mobile at the moment${casual}`,
      `${opener}just passing ${pick(['the station','the retail park','the high street','the hospital side of town'])}. Map should have us moving.`,
      job ? `${opener}heading towards ${job.addr}. Not far off now.` : `${opener}sitting clear near the station area. Ready if you need us.`
    ]);
  }else if(intent === 'status'){
    if(job){
      main = prefix + pick([
        `${opener}we’re ${statusText(unit.status).toLowerCase()} on the ${job.priority} ${job.type}. Patient sounds stable from the notes so far.`,
        `${opener}still dealing with ${job.type}. Nothing dramatic yet, but we’ll update if it changes.`,
        `${opener}currently ${statusText(unit.status).toLowerCase()}. We’ve got the details and we’re working through it.`
      ]);
      followUp = Math.random()<.45 ? pick([`Can you confirm if there are any access notes?`, `Do we have an age for the patient?`, `Can you keep an eye out for a caller update?`]) : null;
    }else{
      main = prefix + pick([`${opener}no job on us at the moment. Clear in ${town[0]}.`,`${opener}all quiet for us right now, which is never a bad thing.`,`${opener}available. Van’s good, crew’s good-ish${p==='dry'?'… ish.':''}`]);
    }
  }else if(intent === 'hospital'){
    main = prefix + (job ? `${opener}likely ${job.hospital}. If handover is rough we’ll let you know before we get stuck there${p==='formal'?'.':' 😂'}` : `${opener}no conveyance right now. If we pick one up I’ll update the destination.`);
    followUp = job ? pick([`Can you check if ${job.hospital} has any diverts showing?`, `If there is a better destination clinically, send it over before we move.`]) : null;
  }else if(intent === 'break'){
    main = prefix + pick([`A brew would save lives at this point${p==='formal'?'.':' 😂'}`,`We’ve been trying to get food for about two hours. Standard day really.`,`If you can protect us for ten mins after this, we’d love you forever.`,`Coffee’s gone cold again, obviously.`]);
    followUp = unit.status === 'meal' ? `We’ll book back on as soon as the three minutes is up.` : null;
  }else if(intent === 'smalltalk'){
    main = prefix + pick([`Busy but manageable. Think we’re on job ${unit.shiftJobs} now${casual}`,`It’s been non-stop, but we’re alright. ${moodLine}.`, `One of those shifts where the radio knows when you open your sandwich${p==='formal'?'.':' 😂'}`, `Not too bad. Ask me again after handover though.`]);
    followUp = pick([`How’s control looking, busy your end?`, `Please tell me there is not a stack of Cat 2s waiting for us.`, `We’ll survive. Probably.`]);
  }else if(intent === 'resources'){
    if(job?.resourceRequest && !job.resourceSent){
      main = `${prefix}${opener}yeah, ${job.resourceRequest.toLowerCase()} is what we need. Can you attach them to ${job.addr} please?`;
      followUp = pick([`Scene is okay for now, just want them started.`, `We will update if it turns into anything more urgent.`, `Caller sounds a bit anxious so sooner is better.`]);
    }else if(job){
      const req = pick(resourceTypes);
      job.resourceRequest = req;
      const cad = incidents.find(i => i.unit === unit.call && i.addr === job.addr);
      if(cad) cad.resourceRequest = req;
      renderIncidents(); renderSelected();
      main = `${prefix}${opener}actually yes — can you start ${req.toLowerCase()} to ${job.addr}? It would make this a lot safer/easier.`;
    }else{
      main = `${prefix}${opener}no extra resources needed from us. We’re clear at the moment.`;
    }
  }else if(intent === 'urgent'){
    main = prefix + (unit.status === 'code0' ? `Code 0 confirmed. Need urgent assistance to our location now. Keep the line open.` : `${opener}no Code 0 from us. We’re okay, just busy.`);
  }else if(intent === 'thanks'){
    main = prefix + pick([`No worries${casual}`,`Cheers control.`, `All good, we’ll keep you posted.`, `Ta, speak in a bit.`, `Appreciate it.`]);
  }else if(intent === 'hello'){
    main = prefix + pick([`Hey, go ahead${casual}`,`Hi control, receiving you.`, `Morning. We’re awake… mostly${p==='formal'?'.':' 😂'}`, `Evening, what’s occurring?`]);
  }else{
    // Continue the conversation using the last topic instead of ignoring context.
    if(mem.pendingQuestion === 'eta' || mem.lastTopic === 'eta'){
      main = `${prefix}${opener}still looking like around ${eta} mins. I’ll give you a shout if that changes.`;
    }else if(mem.lastTopic === 'resources' && job){
      main = `${prefix}${opener}on that resource request, ${job.resourceSent ? job.resourceSent + ' has come through, thanks.' : 'we could still do with support when you can.'}`;
    }else if(mem.lastTopic === 'smalltalk'){
      main = prefix + pick([`Honestly, we’re just hoping for a quiet half hour${casual}`, `Could be worse. Could be paperwork day.`, `We’re alright. Bit tired, bit hungry, still smiling.`]);
    }else{
      main = prefix + pick([
        `${opener}that’s fine, we’ll keep you updated.`,
        `${opener}give us a sec and we’ll come back to you.`,
        `${opener}we’re just working through it now.`,
        `${opener}message received. If anything changes our end I’ll shout.`,
        `${opener}bit tied up, but we’ve seen it.`
      ]);
    }
  }

  mem.lastTopic = intent === 'general' ? mem.lastTopic : intent;
  if(job && Math.random() < 0.18 && !job.resourceRequest && ['status','eta','general'].includes(intent)){
    const req = pick(resourceTypes);
    job.resourceRequest = req;
    const cad = incidents.find(i => i.unit === unit.call && i.addr === job.addr);
    if(cad) cad.resourceRequest = req;
    followUp = followUp || `Actually control, can you also start ${req.toLowerCase()} to us please?`;
    setTimeout(()=>{ renderIncidents(); renderSelected(); }, 50);
  }

  return {main, followUp, delay, seenOnly:false};
}

function crewReply(text, unit){
  return enhancedCrewReply(text, unit).main;
}

function addCrewSystemMessage(unit, text, sound='message'){
  addCrewMessage(unit, `${unit.name}: ${text}`, sound);
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

const code0Reasons = [
  'crew reports aggressive patient and panic button was pressed during assessment',
  'bystanders becoming hostile at scene and crew requested immediate assistance',
  'patient family member threatening crew while they are on scene',
  'crew unable to safely leave location due to public disorder nearby',
  'crew activated panic button after a sudden safety concern inside the address',
  'crew reports unknown male attempting to enter the ambulance',
  'scene has become unsafe and crew need urgent support before moving patient'
];
const code0Responders = [
  ['Police immediate response unit','Duty Operations Manager','Nearest available ambulance'],
  ['Police','Ambulance officer','Second crew for support'],
  ['Police firearms/local response check','Clinical team leader','Nearest double crewed ambulance'],
  ['Police','Fire service standby','Ambulance incident officer'],
  ['Police grade 1 response','HEMS desk informed','Nearest available resource']
];

function scheduleCode0(){
  // Rare event: roughly one Code 0 every 45-90 minutes while the simulator is open.
  setTimeout(()=>{ triggerCode0(); scheduleCode0(); }, rand(45,90)*60*1000);
}
function triggerCode0(){
  const candidates = fleet.filter(x=>x.status !== 'code0' && x.status !== 'meal');
  const v = pick(candidates.length ? candidates : fleet); if(!v) return;
  const reason = pick(code0Reasons);
  const responders = pick(code0Responders);
  v.status = 'code0';
  v.code0 = { reason, responders, time: new Date() };
  v.marker.setIcon(unitIcon(v.status));
  playSound('code0');
  const location = v.job ? `${v.job.address}, ${town[0]}` : `near ${town[0]} town centre`;
  $('code0Text').innerHTML = `
    <strong>${v.call}</strong> — ${v.name}<br>
    <span class="code0-line"><b>Location:</b> ${location}</span>
    <span class="code0-line"><b>Reason:</b> ${reason}.</span>
    <span class="code0-line"><b>Other services responding:</b> ${responders.join(', ')}.</span>
    <span class="code0-line"><b>Action:</b> keep channel open, monitor crew safety, and dispatch nearest support.</span>
  `;
  $('code0Modal').classList.remove('hidden');
  addCrewMessage(v, `CODE 0 activated. ${reason}. Need urgent assistance to our location now.`, true);
  if(selected === v) renderSelected();
  setTimeout(()=>{ if(v.status === 'code0'){ v.status = 'available'; v.job = null; v.code0 = null; v.marker.setIcon(unitIcon(v.status)); if(selected === v) renderSelected(); } }, 180000);
}
function updateClock(){ $('clock').textContent = new Date().toLocaleTimeString('en-GB',{hour12:false}); }
window.addEventListener('load', init);
