const townNames = ["Aberdeen", "Aberystwyth", "Aldershot", "Altrincham", "Amersham", "Andover", "Arbroath", "Ashford", "Aylesbury", "Ayr", "Banbury", "Bangor", "Barnsley", "Barnstaple", "Barrow-in-Furness", "Basildon", "Basingstoke", "Bath", "Bedford", "Belfast", "Beverley", "Birkenhead", "Birmingham", "Blackburn", "Blackpool", "Bolton", "Boston", "Bournemouth", "Bracknell", "Bradford", "Braintree", "Brecon", "Brentwood", "Bridgend", "Bridgwater", "Brighton", "Bristol", "Bromley", "Burnley", "Burton upon Trent", "Bury", "Bury St Edmunds", "Caerphilly", "Cambridge", "Canterbury", "Cardiff", "Carlisle", "Carmarthen", "Chelmsford", "Cheltenham", "Chester", "Chesterfield", "Chichester", "Colchester", "Corby", "Coventry", "Crawley", "Crewe", "Croydon", "Darlington", "Derby", "Doncaster", "Dorchester", "Dover", "Dudley", "Dumfries", "Dundee", "Durham", "Eastbourne", "Edinburgh", "Ely", "Enfield", "Exeter", "Falkirk", "Falmouth", "Farnborough", "Folkestone", "Glasgow", "Gloucester", "Grantham", "Gravesend", "Great Yarmouth", "Greenock", "Grimsby", "Guildford", "Halifax", "Harrogate", "Harlow", "Hartlepool", "Hastings", "Hemel Hempstead", "Hereford", "High Wycombe", "Huddersfield", "Hull", "Inverness", "Ipswich", "Kendal", "Kettering", "Kidderminster", "Kingston upon Thames", "Lancaster", "Leamington Spa", "Leeds", "Leicester", "Lincoln", "Liverpool", "Llandudno", "Luton", "Maidstone", "Manchester", "Mansfield", "Margate", "Middlesbrough", "Milton Keynes", "Newark-on-Trent", "Newcastle upon Tyne", "Newport", "Northampton", "Norwich", "Nottingham", "Nuneaton", "Oldham", "Oxford", "Paisley", "Peterborough", "Plymouth", "Poole", "Portsmouth", "Preston", "Reading", "Redditch", "Reigate", "Rhyl", "Ripon", "Rochdale", "Rotherham", "Rugby", "Salisbury", "Scarborough", "Scunthorpe", "Sheffield", "Shrewsbury", "Slough", "Southampton", "Southend-on-Sea", "Southport", "St Albans", "St Helens", "Stafford", "Stevenage", "Stirling", "Stockport", "Stockton-on-Tees", "Stoke-on-Trent", "Sunderland", "Swansea", "Swindon", "Taunton", "Telford", "Torquay", "Truro", "Wakefield", "Walsall", "Warrington", "Warwick", "Watford", "Wigan", "Winchester", "Wolverhampton", "Worcester", "Worthing", "Wrexham", "York"];
const streetNames = ["High Street", "Station Road", "Church Road", "London Road", "Victoria Road", "Green Lane", "Park Road", "Queensway", "Kingsway", "Mill Lane", "Market Street", "Bridge Street", "New Road", "The Crescent", "School Lane", "Riverside Drive", "Abbey Road", "Orchard Close", "North Street", "South Street", "West Street", "East Street"];
const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Sam", "Avery", "Charlie", "Drew", "Harper", "Quinn", "Rowan", "Finley", "Kai", "Lou", "Ellis", "Reese", "Bailey", "Frankie", "Jesse"];
const callTypes = ["Chest pain", "Breathing difficulty", "Fall with injury", "Road traffic collision", "Seizure", "Fainting episode", "Abdominal pain", "Allergic reaction", "Mental health concern", "Stroke symptoms", "Unwell child", "Diabetic emergency", "Maternity emergency", "Overdose", "Cardiac arrest", "Major trauma"];
const places = ["A&E", "Ambulance Station", "Rail Station", "Town Centre", "Care Home", "School", "Retail Park", "Industrial Estate", "GP Surgery", "Leisure Centre", "Police Station", "Fire Station"];
let fleet = [];
let selected = null;
const vehicleLayer = document.querySelector('.vehicle-layer');
const googleMap = document.getElementById('googleMap');
const townSelect = document.getElementById('townSelect');
const chatLog = document.getElementById('chatLog');
function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function callSign(i) { const prefix = i % 2 === 0 ? 'M1-B' : 'NW-A'; return `${prefix}${String(Math.floor(rand(100, 999))).padStart(3, '0')}`; }
function randomAddress(town) { return `${Math.floor(rand(1, 240))} ${pick(streetNames)}, ${town}`; }
function updateGoogleMap() { const town = townSelect.value || townNames[0]; googleMap.src = `https://www.google.com/maps?q=${encodeURIComponent(town + ', UK')}&z=14&output=embed`; }
townNames.forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.textContent = t; townSelect.appendChild(opt); });
townSelect.value = 'Birmingham';
townSelect.addEventListener('change', generateTown);
document.getElementById('regenBtn').addEventListener('click', generateTown);
document.getElementById('closeCode').addEventListener('click', () => document.getElementById('codePopup').classList.add('hidden'));
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
function generateTown() {
  selected = null;
  fleet.forEach(v => clearTimeout(v.timer)); fleet = [];
  vehicleLayer.innerHTML = '';
  updateGoogleMap();
  document.getElementById('selectedTitle').textContent = 'Select an ambulance';
  document.getElementById('selectedMeta').textContent = 'Click a vehicle to see job details and message the crew.';
  document.getElementById('jobBox').textContent = 'No vehicle selected';
  chatLog.innerHTML = '<div class="system-msg">Messages will appear here once a crew is selected.</div>';
  places.forEach((p, idx) => { const el = document.createElement('div'); el.className = 'place'; el.textContent = p; el.style.left = `${8 + (idx * 13) % 84}%`; el.style.top = `${14 + (idx * 19) % 72}%`; vehicleLayer.appendChild(el); });
  const count = Math.floor(rand(18, 30));
  document.getElementById('fleetCount').textContent = `${count} active vehicles`;
  for (let i = 0; i < count; i++) createAmbulance(i);
}
function createAmbulance(i) {
  const el = document.createElement('div'); el.className = 'ambulance';
  el.innerHTML = `<div class="name-tag"></div><div class="light"></div><div class="vehicle-body"></div><div class="wheel left"></div><div class="wheel right"></div>`;
  vehicleLayer.appendChild(el);
  const vehicle = { el, name: pick(firstNames), callSign: callSign(i), x: rand(7, 93), y: rand(9, 89), onJob: Math.random() < .42, job: null, timer: null };
  vehicle.job = vehicle.onJob ? makeJob() : null;
  el.querySelector('.name-tag').innerHTML = `${vehicle.name}<br>${vehicle.callSign}`;
  el.style.left = vehicle.x + '%'; el.style.top = vehicle.y + '%';
  el.addEventListener('click', () => selectVehicle(vehicle)); fleet.push(vehicle); drive(vehicle);
}
function makeJob() { return { type: pick(callTypes), address: randomAddress(townSelect.value), priority: pick(['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4']), incident: `INC-${Math.floor(rand(100000,999999))}` }; }
function drive(vehicle) {
  const pause = rand(2500, 9000);
  vehicle.timer = setTimeout(() => {
    vehicle.el.classList.remove('stopped'); const oldX = vehicle.x;
    vehicle.x = rand(7, 93); vehicle.y = rand(9, 89);
    vehicle.el.style.left = vehicle.x + '%'; vehicle.el.style.top = vehicle.y + '%';
    vehicle.el.style.transform = `translate(-50%, -50%) scaleX(${vehicle.x < oldX ? -1 : 1})`;
    setTimeout(() => { vehicle.el.classList.add('stopped'); if (Math.random() < .22) { vehicle.onJob = Math.random() < .5; vehicle.job = vehicle.onJob ? makeJob() : null; } drive(vehicle); }, 5200);
  }, pause);
}
function selectVehicle(vehicle) {
  selected = vehicle; document.querySelectorAll('.ambulance').forEach(a => a.classList.remove('selected')); vehicle.el.classList.add('selected');
  document.getElementById('selectedTitle').textContent = `${vehicle.name} • ${vehicle.callSign}`;
  document.getElementById('selectedMeta').textContent = `Fleet: ${vehicle.callSign.startsWith('M1-B') ? 'M1-B' : 'NW-A'} • Town: ${townSelect.value} • GPS simulated`;
  if (Math.random() < .55) { vehicle.onJob = true; vehicle.job = makeJob(); } else { vehicle.onJob = false; vehicle.job = null; }
  document.getElementById('jobBox').innerHTML = vehicle.onJob ? `<b>${vehicle.job.priority}: ${vehicle.job.type}</b><br>${vehicle.job.address}<br>Incident: ${vehicle.job.incident}<br>Status: Allocated / mobile` : '<b>No job</b><br>This crew is currently clear and available.';
  chatLog.innerHTML = `<div class="system-msg">Secure channel opened with ${vehicle.name} on ${vehicle.callSign}.</div>`;
}
function sendMessage() { const input = document.getElementById('messageInput'); const text = input.value.trim(); if (!text || !selected) return; addMsg(text, 'user'); input.value = ''; setTimeout(() => addMsg(crewReply(text), 'crew'), rand(650, 1800)); }
function addMsg(text, who) { const div = document.createElement('div'); div.className = `msg ${who}`; div.textContent = who === 'crew' ? `${selected.name}: ${text}` : text; chatLog.appendChild(div); chatLog.scrollTop = chatLog.scrollHeight; }
function crewReply(text) { const lower = text.toLowerCase(); if (lower.includes('eta')) return `ETA ${Math.floor(rand(3, 14))} minutes, traffic dependent.`; if (lower.includes('status')) return selected.onJob ? 'Mobile to scene, will update on arrival.' : 'Clear and available, awaiting next allocation.'; if (lower.includes('address') || lower.includes('job')) return selected.onJob ? `Showing ${selected.job.type} at ${selected.job.address}.` : 'No job showing on MDT.'; return pick(['Received control.', 'Copy, will update shortly.', 'Understood, checking now.', 'Message received.', 'Acknowledged.']); }
function scheduleCodeZero() { const delay = rand(10, 20) * 60 * 1000; setTimeout(() => { const v = pick(fleet); if (v) { document.getElementById('codeText').textContent = `${v.callSign} (${v.name}) has reported CODE-0 in ${townSelect.value}. Immediate welfare check required.`; document.getElementById('codePopup').classList.remove('hidden'); } scheduleCodeZero(); }, delay); }
generateTown(); scheduleCodeZero();
