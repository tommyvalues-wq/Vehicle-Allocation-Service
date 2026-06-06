const towns = [
['Aberdeen',57.1497,-2.0943],['Aberystwyth',52.4153,-4.0829],['Accrington',53.7534,-2.3638],['Airdrie',55.8660,-3.9803],['Aldershot',51.2482,-0.7639],['Altrincham',53.3875,-2.3485],['Andover',51.2112,-1.4919],['Arbroath',56.5591,-2.5915],['Ashford',51.1465,0.8750],['Aylesbury',51.8156,-0.8084],['Ayr',55.4586,-4.6292],
['Banbury',52.0629,-1.3398],['Bangor',53.2274,-4.1293],['Barnsley',53.5526,-1.4797],['Barnstaple',51.0809,-4.0583],['Barrow-in-Furness',54.1109,-3.2276],['Basildon',51.5761,0.4887],['Basingstoke',51.2665,-1.0924],['Bath',51.3811,-2.3590],['Bedford',52.1359,-0.4667],['Belfast',54.5973,-5.9301],['Beverley',53.8459,-0.4233],['Birkenhead',53.3899,-3.0230],['Birmingham',52.4862,-1.8904],['Blackburn',53.7486,-2.4875],['Blackpool',53.8175,-3.0357],['Bognor Regis',50.7829,-0.6730],['Bolton',53.5769,-2.4282],['Boston',52.9789,-0.0266],['Bournemouth',50.7192,-1.8808],['Bradford',53.7938,-1.7564],['Braintree',51.8787,0.5529],['Brentwood',51.6205,0.3050],['Brighton',50.8225,-0.1372],['Bristol',51.4545,-2.5879],['Burnley',53.7893,-2.2405],['Burton upon Trent',52.8073,-1.6426],['Bury',53.5933,-2.2966],
['Caerphilly',51.5788,-3.2181],['Cambridge',52.2053,0.1218],['Canterbury',51.2802,1.0789],['Cardiff',51.4816,-3.1791],['Carlisle',54.8925,-2.9329],['Carmarthen',51.8560,-4.3121],['Chelmsford',51.7356,0.4685],['Cheltenham',51.8994,-2.0783],['Chester',53.1934,-2.8931],['Chesterfield',53.2350,-1.4216],['Chichester',50.8365,-0.7792],['Colchester',51.8959,0.8919],['Corby',52.4923,-0.6842],['Coventry',52.4068,-1.5197],['Crawley',51.1091,-0.1872],['Crewe',53.1004,-2.4438],['Croydon',51.3762,-0.0982],
['Darlington',54.5236,-1.5595],['Derby',52.9225,-1.4746],['Doncaster',53.5228,-1.1285],['Dover',51.1279,1.3134],['Dudley',52.5123,-2.0811],['Dundee',56.4620,-2.9707],['Dunfermline',56.0717,-3.4522],['Durham',54.7753,-1.5849],
['Eastbourne',50.7680,0.2905],['Eastleigh',50.9672,-1.3747],['Edinburgh',55.9533,-3.1883],['Ely',52.3981,0.2622],['Exeter',50.7184,-3.5339],
['Falkirk',56.0019,-3.7839],['Fareham',50.8516,-1.1793],['Farnborough',51.2869,-0.7526],['Folkestone',51.0814,1.1695],
['Gateshead',54.9527,-1.6034],['Glasgow',55.8642,-4.2518],['Gloucester',51.8642,-2.2382],['Grantham',52.9125,-0.6426],['Great Yarmouth',52.5982,1.7280],['Grimsby',53.5675,-0.0808],['Guildford',51.2362,-0.5704],
['Halifax',53.7270,-1.8575],['Harrogate',53.9921,-1.5418],['Hartlepool',54.6917,-1.2129],['Hastings',50.8543,0.5730],['Hemel Hempstead',51.7537,-0.4497],['Hereford',52.0564,-2.7159],['High Wycombe',51.6286,-0.7482],['Huddersfield',53.6458,-1.7850],['Hull',53.7676,-0.3274],
['Inverness',57.4778,-4.2247],['Ipswich',52.0567,1.1482],
['Kendal',54.3280,-2.7463],['Kettering',52.3984,-0.7257],['Kidderminster',52.3886,-2.2497],['Kingston upon Thames',51.4123,-0.3007],['Kirkcaldy',56.1165,-3.1599],
['Lancaster',54.0466,-2.8007],['Leeds',53.8008,-1.5491],['Leicester',52.6369,-1.1398],['Lincoln',53.2307,-0.5406],['Liverpool',53.4084,-2.9916],['Llandudno',53.3241,-3.8276],['London',51.5072,-0.1276],['Loughborough',52.7721,-1.2062],['Luton',51.8787,-0.4200],
['Maidstone',51.2704,0.5227],['Manchester',53.4808,-2.2426],['Mansfield',53.1472,-1.1987],['Margate',51.3896,1.3862],['Middlesbrough',54.5742,-1.2348],['Milton Keynes',52.0406,-0.7594],['Motherwell',55.7839,-3.9810],
['Newcastle upon Tyne',54.9783,-1.6178],['Newport',51.5842,-2.9977],['Newquay',50.4155,-5.0737],['Northampton',52.2405,-0.9027],['Norwich',52.6309,1.2974],['Nottingham',52.9548,-1.1581],
['Oldham',53.5409,-2.1114],['Oxford',51.7520,-1.2577],
['Paisley',55.8473,-4.4401],['Peterborough',52.5695,-0.2405],['Plymouth',50.3755,-4.1427],['Poole',50.7151,-1.9872],['Portsmouth',50.8198,-1.0880],['Preston',53.7632,-2.7031],
['Reading',51.4551,-0.9787],['Redditch',52.3088,-1.9409],['Rhyl',53.3191,-3.4916],['Rochdale',53.6097,-2.1561],['Rotherham',53.4326,-1.3635],['Rugby',52.3709,-1.2642],
['Salford',53.4875,-2.2901],['Salisbury',51.0688,-1.7945],['Scarborough',54.2831,-0.3998],['Scunthorpe',53.5886,-0.6544],['Sheffield',53.3811,-1.4701],['Shrewsbury',52.7073,-2.7553],['Slough',51.5105,-0.5950],['Southampton',50.9097,-1.4044],['Southend-on-Sea',51.5459,0.7077],['Southport',53.6457,-3.0101],['St Albans',51.7527,-0.3394],['St Helens',53.4563,-2.7371],['Stafford',52.8067,-2.1207],['Stevenage',51.9038,-0.1966],['Stirling',56.1165,-3.9369],['Stockport',53.4084,-2.1493],['Stoke-on-Trent',53.0027,-2.1794],['Sunderland',54.9069,-1.3838],['Swansea',51.6214,-3.9436],['Swindon',51.5558,-1.7797],
['Taunton',51.0153,-3.1068],['Telford',52.6784,-2.4453],['Torquay',50.4619,-3.5253],['Truro',50.2632,-5.0510],
['Wakefield',53.6833,-1.4977],['Walsall',52.5862,-1.9829],['Warrington',53.3900,-2.5969],['Warwick',52.2823,-1.5849],['Watford',51.6565,-0.3903],['Westhaven',54.5480,-3.5860],['Weston-super-Mare',51.3460,-2.9773],['Wigan',53.5451,-2.6325],['Winchester',51.0629,-1.3167],['Wolverhampton',52.5862,-2.1281],['Worcester',52.1936,-2.2216],['Worthing',50.8179,-0.3729],['Wrexham',53.0465,-2.9938],
['York',53.9590,-1.0815]
];

const firstNames = ['Alex','Sam','Jamie','Morgan','Taylor','Jordan','Casey','Riley','Charlie','Drew','Chris','Pat','Robin','Lee','Jess','Ash','Cameron','Harper','Bailey','Kai','Ellis','Finley','Reece','Rowan'];
const callTypes = ['Chest pain','Breathing difficulties','Fall with injury','RTC reported','Abdominal pain','Stroke symptoms','Seizure','Unconscious person','Mental health crisis','Maternity emergency','Diabetic emergency','Allergic reaction','Overdose concern','Cardiac arrest'];
const streets = ['High Street','Station Road','Church Lane','Victoria Road','Queen Street','King Street','London Road','Park Road','Mill Lane','School Road','Bridge Street','Market Place','The Crescent','Manor Road','Albert Road'];
const hospitals = ['General Hospital','Royal Infirmary','District Hospital','Urgent Treatment Centre','University Hospital'];
let map, fleet = [], selected = null, town = towns.find(t=>t[0]==='London'), incidents=[], landmarkLayer=null;

function $(id){return document.getElementById(id)}
function rand(a,b){return Math.random()*(b-a)+a}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pad(n){return String(n).padStart(3,'0')}
function callsign(){return Math.random()<0.5 ? `M1-B${pad(Math.floor(rand(1,999)))}` : `NW-A${pad(Math.floor(rand(1,999)))}`}
function address(){return `${Math.floor(rand(1,240))} ${pick(streets)}`}

function init(){
  towns.sort((a,b)=>a[0].localeCompare(b[0]));
  $('townList').innerHTML = towns.map(t=>`<option value="${t[0]}"></option>`).join('');
  $('townSearch').value = town[0];
  map = L.map('map',{zoomControl:true}).setView([town[1],town[2]],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  landmarkLayer = L.layerGroup().addTo(map);
  $('goTown').onclick = selectTown;
  $('regenFleet').onclick = regenerateFleet;
  $('townSearch').addEventListener('keydown',e=>{if(e.key==='Enter')selectTown()});
  $('messageForm').addEventListener('submit',sendMessage);
  $('closeCode0').onclick=()=>$('code0Modal').classList.add('hidden');
  setInterval(tick,900); setInterval(updateClock,1000); updateClock();
  loadLandmarks(); regenerateFleet(); scheduleCode0();
}

function selectTown(){
  const q=$('townSearch').value.trim().toLowerCase();
  const found=towns.find(t=>t[0].toLowerCase()===q) || towns.find(t=>t[0].toLowerCase().includes(q));
  if(!found){$('statusStrip').textContent='Town not in local list';return}
  town=found; $('townSearch').value=town[0]; map.flyTo([town[1],town[2]],14,{duration:1}); loadLandmarks(); regenerateFleet();
}

function regenerateFleet(){
  fleet.forEach(v=>{map.removeLayer(v.marker);map.removeLayer(v.label)});
  fleet=[]; incidents=[]; selected=null; $('messages').textContent='Messages will appear here once a crew is selected.'; $('selectedVehicle').textContent='No vehicle selected';
  const count=Math.floor(rand(10,18));
  $('statusStrip').textContent=`Building road routes for ${count} units in ${town[0]}...`;
  for(let i=0;i<count;i++) addVehicle();
  renderIncidents(); setTimeout(()=>$('statusStrip').textContent=`${fleet.length} active units road-snapped in ${town[0]}`,1500);
}
function unitIcon(status,heading){return L.divIcon({className:'',html:`<div class="unit-blip status-${status}"><span></span></div>`,iconSize:[18,18],iconAnchor:[9,9]})}
function labelIcon(v){return L.divIcon({className:'',html:`<div class="unit-label">${v.name} • ${v.call}</div>`,iconSize:[120,22],iconAnchor:[60,38]})}
function randomPointNearTown(radius=.035){return [town[1]+rand(-radius,radius), town[2]+rand(-radius*1.45,radius*1.45)]}
async function roadRoute(){
  const a=randomPointNearTown(.032), b=randomPointNearTown(.032);
  const url=`https://router.project-osrm.org/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=full&geometries=geojson`;
  try{
    const res=await fetch(url); const data=await res.json();
    const coords=data?.routes?.[0]?.geometry?.coordinates?.map(c=>[c[1],c[0]]) || [];
    if(coords.length>4) return coords;
  }catch(e){}
  return [a,b];
}
async function addVehicle(){
  const route=await roadRoute();
  const [lat,lng]=route[0];
  const v={id:crypto.randomUUID(),name:pick(firstNames),call:callsign(),lat,lng,heading:rand(0,360),status:'available',job:null,speed:rand(.00015,.00045),route,routeIndex:0,routeProgress:0,stop:Math.random()<.25?Math.floor(rand(5,18)):0,messages:[]};
  v.marker=L.marker([lat,lng],{icon:unitIcon(v.status,v.heading)}).addTo(map).on('click',()=>selectVehicle(v));
  v.label=L.marker([lat,lng],{icon:labelIcon(v),interactive:false}).addTo(map);
  fleet.push(v);
}
async function resetVehicleRoute(v){v.route=await roadRoute(); v.routeIndex=0; v.routeProgress=0; [v.lat,v.lng]=v.route[0];}
function bearing(a,b){return Math.atan2(b[1]-a[1], b[0]-a[0]) * 180 / Math.PI}
function moveAlongRoute(v){
  if(!v.route || v.route.length<2) return;
  let next=v.route[v.routeIndex+1];
  if(!next){resetVehicleRoute(v); return;}
  const cur=[v.lat,v.lng];
  const dlat=next[0]-cur[0], dlng=next[1]-cur[1];
  const dist=Math.hypot(dlat,dlng); const step=v.speed*1.8;
  if(dist<=step){v.lat=next[0]; v.lng=next[1]; v.routeIndex++;}
  else{v.lat+=dlat/dist*step; v.lng+=dlng/dist*step;}
  v.heading=bearing(cur,[v.lat,v.lng]);
}

function tick(){
  fleet.forEach(v=>{
    if(v.status==='code0') return;
    if(v.stop>0){v.stop--; return;}
    if(Math.random()<.04){v.stop=Math.floor(rand(4,20)); return;}
    moveAlongRoute(v);
    v.marker.setLatLng([v.lat,v.lng]); v.label.setLatLng([v.lat,v.lng]);
    v.marker.setIcon(unitIcon(v.status,v.heading));
  });
}
function selectVehicle(v){
  selected=v;
  if(!v.job && Math.random()<.65){
    v.status='job'; v.job={type:pick(callTypes),addr:address(),priority:`CAT ${Math.ceil(rand(1,5))}`,hospital:`${town[0]} ${pick(hospitals)}`};
    incidents.unshift({unit:v.call,...v.job}); if(incidents.length>8)incidents.pop(); renderIncidents();
  }
  renderSelected(); renderMessages();
}
function renderSelected(){
  if(!selected)return;
  const job = selected.job ? `<b>Current job:</b> ${selected.job.priority} - ${selected.job.type}<br><b>Address:</b> ${selected.job.addr}, ${town[0]}<br><b>Destination:</b> ${selected.job.hospital}` : '<b>Status:</b> No job';
  $('selectedVehicle').innerHTML=`<b>${selected.call}</b><br>Crew: ${selected.name}<br>Status: ${selected.status.toUpperCase()}<br>${job}`;
}
function renderIncidents(){
  $('incidentList').innerHTML = incidents.length ? incidents.map(i=>`<div class="incident"><strong>${i.priority} • ${i.type}</strong><span>${i.addr}, ${town[0]}</span><br><small>Assigned: ${i.unit} • ${i.hospital}</small></div>`).join('') : '<p>No live incidents assigned.</p>';
}
function renderMessages(){
  const box=$('messages'); box.innerHTML = selected.messages.length ? selected.messages.map(m=>`<div class="msg ${m.who}">${m.text}</div>`).join('') : `<div class="msg crew">${selected.call} here, go ahead control.</div>`; box.scrollTop=box.scrollHeight;
}
function sendMessage(e){
  e.preventDefault(); if(!selected)return; const input=$('messageInput'); const text=input.value.trim(); if(!text)return; input.value='';
  selected.messages.push({who:'me',text}); renderMessages();
  const responder = selected;
  setTimeout(()=>{
    responder.messages.push({who:'crew',text:`${responder.name} is typing...`});
    renderMessages();
    setTimeout(()=>{
      responder.messages.pop();
      responder.messages.push({who:'crew',text:crewReply(text,responder)});
      renderMessages();
    }, rand(900,2400));
  },rand(350,900));
}
function crewReply(t,unit=selected){
  const original=t.trim();
  t=t.toLowerCase();
  const job=unit.job;
  const crewName=unit.name;
  const callsign=unit.call;
  const minute=Math.ceil(rand(3,16));
  const hospital=job?.hospital || `${town[0]} General Hospital`;
  const mood=pick(['No worries','Yep','Alright','Understood','Thanks control','Cheers']);
  if(t.includes('eta') || t.includes('how long') || t.includes('arrival')){
    return `${crewName}: ${mood}, we are about ${minute} minutes away${job ? ` from ${job.addr}` : ''}. Traffic is ${pick(['moving okay','a bit heavy','clear at the moment','slow near the centre'])}, will shout if that changes.`;
  }
  if(t.includes('status') || t.includes('update') || t.includes('state')){
    if(job) return `${crewName}: Quick update - we are ${pick(['making our way in','on scene now','with the patient','getting details from family','loading shortly'])}. Job is showing as ${job.priority} ${job.type}. I will keep you posted.`;
    return `${crewName}: We are clear, mobile in ${town[0]} and available for the next call. Nothing outstanding our end.`;
  }
  if(t.includes('hospital') || t.includes('convey') || t.includes('destination')){
    return `${crewName}: Looks like ${hospital} at the moment. Patient condition is ${pick(['stable','being monitored','improving','unchanged'])}. I will confirm once we are ready to move.`;
  }
  if(t.includes('hello') || t.includes('hi') || t.includes('morning') || t.includes('evening')){
    return `${crewName}: Hi control, ${callsign} receiving you. We are ${unit.status==='job'?'currently tied up on the job':'available and listening'}.`;
  }
  if(t.includes('break') || t.includes('food') || t.includes('meal')){
    return `${crewName}: We have not had a proper break yet. Happy to stay available, but we would appreciate a meal break when cover allows.`;
  }
  if(t.includes('code 0') || t.includes('code-0') || t.includes('emergency')){
    return `${crewName}: Nothing Code 0 from us at the moment. If that changes we will declare it straight away.`;
  }
  if(t.includes('thank')){
    return `${crewName}: No problem, control. We will update you if anything changes.`;
  }
  if(t.includes('shift') || t.includes('busy')){
    return `${crewName}: Busy enough! We have had ${Math.ceil(rand(2,7))} jobs so far. Crew is okay, just keeping moving.`;
  }
  return pick([
    `${crewName}: Got that, control. We will deal with it and come back to you if we need anything.`,
    `${crewName}: Copy. Just checking the details now, I will update you in a minute.`,
    `${crewName}: Understood. We are mobile and will keep the radio clear.`,
    `${crewName}: Received. Nothing else from us right now.`,
    `${crewName}: That is fine, control. We will keep you posted.`,
    `${crewName}: Thanks, message received. We are just ${job ? 'working through the job' : 'covering the area'} at the moment.`
  ]);
}

function landmarkIcon(kind){return L.divIcon({className:'',html:`<div class="landmark ${kind}"></div>`,iconSize:[18,18],iconAnchor:[9,9]})}
async function loadLandmarks(){
  if(!landmarkLayer)return; landmarkLayer.clearLayers();
  $('statusStrip').textContent=`Loading map landmarks for ${town[0]}...`;
  const q=`[out:json][timeout:8];(node(around:5500,${town[1]},${town[2]})[amenity~"hospital|police|fire_station"];node(around:5500,${town[1]},${town[2]})[railway="station"];node(around:5500,${town[1]},${town[2]})[emergency="ambulance_station"];);out center 30;`;
  try{
    const res=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data=await res.json();
    (data.elements||[]).slice(0,24).forEach(el=>{
      const tags=el.tags||{}; const lat=el.lat||el.center?.lat, lon=el.lon||el.center?.lon; if(!lat||!lon)return;
      let kind='poi'; if(tags.amenity==='hospital')kind='hospital'; else if(tags.amenity==='police')kind='police'; else if(tags.amenity==='fire_station')kind='fire'; else if(tags.emergency==='ambulance_station')kind='ambulance'; else if(tags.railway==='station')kind='station';
      const name=tags.name || kind.replace(/^./,c=>c.toUpperCase());
      L.marker([lat,lon],{icon:landmarkIcon(kind)}).bindPopup(`<b>${name}</b><br>${kind.replace('_',' ')}`).addTo(landmarkLayer);
    });
  }catch(e){
    // If the public landmark service is busy, show integrated local control landmarks instead.
    ['Hospital','Ambulance Station','Police Station','Fire Station','Rail Station'].forEach((name,i)=>{
      const p=randomPointNearTown(.02);
      L.marker(p,{icon:landmarkIcon(['hospital','ambulance','police','fire','station'][i])}).bindPopup(`<b>${town[0]} ${name}</b>`).addTo(landmarkLayer);
    });
  }
}

function scheduleCode0(){setTimeout(()=>{triggerCode0();scheduleCode0();},rand(10,20)*60*1000)}
function triggerCode0(){
  const v=pick(fleet.filter(x=>x.status!=='code0')||fleet); if(!v)return; v.status='code0'; v.marker.setIcon(unitIcon(v.status,v.heading));
  $('code0Text').textContent=`${v.call} (${v.name}) has declared CODE 0 in ${town[0]}. Immediate dispatcher review required.`;
  $('code0Modal').classList.remove('hidden'); if(selected===v)renderSelected(); setTimeout(()=>{v.status='available';v.job=null;},120000);
}
function updateClock(){const d=new Date();$('clock').textContent=d.toLocaleTimeString('en-GB',{hour12:false})}
window.addEventListener('load',init);
