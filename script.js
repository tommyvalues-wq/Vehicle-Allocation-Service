const towns = {
  "Northwood": ["High Street", "Market Lane", "Oak Avenue", "Station Road", "Riverside Drive", "Church Close", "Mill Road"],
  "Westhaven": ["Harbour Road", "Sea View", "Queensway", "Marina Walk", "Abbey Street", "Cliff Road", "Victoria Park"],
  "Ashford Vale": ["King Street", "The Crescent", "Elm Grove", "Brookside", "School Lane", "Meadow Road", "Pine Court"],
  "Bramley": ["London Road", "New Road", "Hilltop", "Orchard Close", "South Street", "Bridge Road", "Green Lane"]
};
const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Sam", "Avery", "Charlie", "Drew", "Harper", "Quinn", "Rowan", "Finley"];
const callTypes = ["Chest pain", "Breathing difficulty", "Fall with injury", "Road traffic collision", "Seizure", "Fainting episode", "Abdominal pain", "Allergic reaction", "Mental health concern", "Stroke symptoms", "Unwell child", "Diabetic emergency"];
const townQueries = {
  "Northwood": "Northwood London UK",
  "Westhaven": "Westhaven UK",
  "Ashford Vale": "Ashford Kent UK",
  "Bramley": "Bramley Surrey UK"
};

const places = ["Medical Centre", "Supermarket", "Rail Station", "School", "Care Home", "Leisure Centre", "Town Hall", "Industrial Estate", "Park Gates"];

let fleet = [];
let selected = null;
const map = document.getElementById('map');
const vehicleLayer = document.querySelector('.vehicle-layer');
const googleMap = document.getElementById('googleMap');
const townSelect = document.getElementById('townSelect');
const chatLog = document.getElementById('chatLog');

function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function callSign(i) {
  const prefix = i % 2 === 0 ? 'M1-B' : 'NW-A';
  return `${prefix}${String(Math.floor(rand(100, 999))).padStart(3, '0')}`;
}
function randomAddress(town) {
  return `${Math.floor(rand(1, 220))} ${pick(towns[town])}, ${town}`;
}

function updateGoogleMap() {
  const town = townSelect.value || Object.keys(towns)[0];
  const q = encodeURIComponent(townQueries[town] || town);
  googleMap.src = `https://www.google.com/maps?q=${q}&output=embed`;
}

Object.keys(towns).forEach(t => {
  const opt = document.createElement('option');
  opt.value = t; opt.textContent = t;
  townSelect.appendChild(opt);
});

townSelect.addEventListener('change', generateTown);
document.getElementById('regenBtn').addEventListener('click', generateTown);
document.getElementById('closeCode').addEventListener('click', () => document.getElementById('codePopup').classList.add('hidden'));
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

function generateTown() {
  selected = null;
  fleet.forEach(v => clearTimeout(v.timer));
  fleet = [];
  vehicleLayer.querySelectorAll('.ambulance,.place').forEach(el => el.remove());
  updateGoogleMap();
  document.getElementById('selectedTitle').textContent = 'Select an ambulance';
  document.getElementById('selectedMeta').textContent = 'Click a vehicle to see job details and message the crew.';
  document.getElementById('jobBox').textContent = 'No vehicle selected';
  chatLog.innerHTML = '<div class="system-msg">Messages will appear here once a crew is selected.</div>';

  places.forEach((p, idx) => {
    const el = document.createElement('div');
    el.className = 'place';
    el.textContent = p;
    el.style.left = `${12 + (idx * 11) % 78}%`;
    el.style.top = `${18 + (idx * 17) % 70}%`;
    vehicleLayer.appendChild(el);
  });

  for (let i = 0; i < 14; i++) createAmbulance(i);
}

function createAmbulance(i) {
  const el = document.createElement('div');
  el.className = 'ambulance';
  el.innerHTML = `<div class="name-tag"></div><div class="light"></div><div class="vehicle-body"></div><div class="wheel left"></div><div class="wheel right"></div>`;
  vehicleLayer.appendChild(el);
  const vehicle = {
    el,
    name: pick(firstNames),
    callSign: callSign(i),
    x: rand(8, 92),
    y: rand(10, 88),
    onJob: Math.random() < 0.38,
    job: null,
    timer: null
  };
  vehicle.job = vehicle.onJob ? makeJob() : null;
  el.querySelector('.name-tag').innerHTML = `${vehicle.name}<br>${vehicle.callSign}`;
  el.style.left = vehicle.x + '%';
  el.style.top = vehicle.y + '%';
  el.addEventListener('click', () => selectVehicle(vehicle));
  fleet.push(vehicle);
  drive(vehicle);
}

function makeJob() {
  const town = townSelect.value;
  return { type: pick(callTypes), address: randomAddress(town), priority: pick(['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4']) };
}

function drive(vehicle) {
  const pause = rand(2500, 9000);
  vehicle.timer = setTimeout(() => {
    vehicle.el.classList.remove('stopped');
    const oldX = vehicle.x;
    vehicle.x = rand(7, 93);
    vehicle.y = rand(9, 89);
    vehicle.el.style.left = vehicle.x + '%';
    vehicle.el.style.top = vehicle.y + '%';
    vehicle.el.style.transform = `translate(-50%, -50%) scaleX(${vehicle.x < oldX ? -1 : 1})`;
    setTimeout(() => {
      vehicle.el.classList.add('stopped');
      if (Math.random() < 0.2) {
        vehicle.onJob = Math.random() < 0.5;
        vehicle.job = vehicle.onJob ? makeJob() : null;
      }
      drive(vehicle);
    }, 5200);
  }, pause);
}

function selectVehicle(vehicle) {
  selected = vehicle;
  document.querySelectorAll('.ambulance').forEach(a => a.classList.remove('selected'));
  vehicle.el.classList.add('selected');
  document.getElementById('selectedTitle').textContent = `${vehicle.name} • ${vehicle.callSign}`;
  document.getElementById('selectedMeta').textContent = `Category: ${vehicle.callSign.startsWith('M1-B') ? 'M1-B fleet' : 'NW-A fleet'} • Town: ${townSelect.value}`;
  if (Math.random() < 0.5) {
    vehicle.onJob = true;
    vehicle.job = makeJob();
  } else {
    vehicle.onJob = false;
    vehicle.job = null;
  }
  document.getElementById('jobBox').innerHTML = vehicle.onJob
    ? `<b>${vehicle.job.priority}: ${vehicle.job.type}</b><br>${vehicle.job.address}<br>Status: Allocated / mobile`
    : '<b>No job</b><br>This crew is currently clear and available.';
  chatLog.innerHTML = `<div class="system-msg">Opened chat with ${vehicle.name} on ${vehicle.callSign}.</div>`;
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text || !selected) return;
  addMsg(text, 'user');
  input.value = '';
  setTimeout(() => addMsg(crewReply(text), 'crew'), rand(600, 1600));
}

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = `msg ${who}`;
  div.textContent = who === 'crew' ? `${selected.name}: ${text}` : text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function crewReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('eta')) return `ETA around ${Math.floor(rand(3, 14))} minutes, traffic dependent.`;
  if (lower.includes('status')) return selected.onJob ? 'We are mobile to the call now.' : 'We are clear, available, and awaiting allocation.';
  if (lower.includes('address') || lower.includes('job')) return selected.onJob ? `Current job is ${selected.job.type} at ${selected.job.address}.` : 'No job showing on our screen at the moment.';
  return pick(['Received, thanks.', 'Copy that, we will update shortly.', 'Understood, we are checking now.', 'Thanks control, message received.', 'We will let you know if anything changes.']);
}

function scheduleCodeZero() {
  const delay = rand(10, 20) * 60 * 1000;
  setTimeout(() => {
    const v = pick(fleet);
    if (v) {
      document.getElementById('codeText').textContent = `${v.callSign} (${v.name}) has reported CODE-0 in ${townSelect.value}. Immediate welfare check required.`;
      document.getElementById('codePopup').classList.remove('hidden');
    }
    scheduleCodeZero();
  }, delay);
}

generateTown();
scheduleCodeZero();
