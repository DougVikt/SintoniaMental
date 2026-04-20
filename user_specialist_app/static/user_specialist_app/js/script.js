
const today = new Date();
let currentMonth = today.getMonth();
let currentYear  = today.getFullYear();
let selectedDay  = today.getDate();
let isAvailable  = true;
let currentPatient = null;

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const MONTHS_SHORT = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];

/* ---- DATA ---- */
const appointments = [
{ day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), time: '09:00', patient: 'João Silva',    type: 'Online',     color: 'orange', status: 'confirmed' },
{ day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), time: '11:00', patient: 'Maria Lima',    type: 'Online',     color: 'blue',   status: 'confirmed' },
{ day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), time: '14:30', patient: 'Pedro Santos',  type: 'Presencial', color: 'green',  status: 'pending'   },
{ day: today.getDate() + 2, month: today.getMonth(), year: today.getFullYear(), time: '10:00', patient: 'Carla Dias', type: 'Online', color: 'purple', status: 'confirmed' },
{ day: today.getDate() + 4, month: today.getMonth(), year: today.getFullYear(), time: '15:00', patient: 'Lucas Mota', type: 'Online', color: 'orange', status: 'confirmed' },
];

const pending = [
{ name: 'Bruno Mendes', time: 'Amanhã · 10:00', color: 'linear-gradient(135deg,#0284c7,#075985)', initials: 'BM', tag: 'TDAH' },
{ name: 'Sofia Alves',  time: 'Sex · 14:30',     color: 'linear-gradient(135deg,#059669,#064e3b)', initials: 'SA', tag: 'TEA' },
];

const patients = [
{ name: 'João Silva',   initials: 'JS', color: 'linear-gradient(135deg,#7c3aed,#4c1d95)', since: 'Jan/2024', sessions: 12, tag: 'TDAH',      tagClass: 'orange', nextAppt: `${today.getDate()}/${today.getMonth()+1}`, notes: ['Boa evolução no foco. Manter técnica Pomodoro.','Relata melhora no sono após início da medicação.'] },
{ name: 'Maria Lima',   initials: 'ML', color: 'linear-gradient(135deg,#0284c7,#075985)', since: 'Mar/2024', sessions: 8,  tag: 'TEA',       tagClass: 'blue',   nextAppt: `${today.getDate()}/${today.getMonth()+1}`, notes: ['Dificuldade em interações sociais. Trabalhar rotinas.'] },
{ name: 'Pedro Santos', initials: 'PS', color: 'linear-gradient(135deg,#059669,#064e3b)', since: 'Abr/2024', sessions: 5,  tag: 'TDAH + TEA', tagClass: 'purple', nextAppt: `${today.getDate()}/${today.getMonth()+1}`, notes: [] },
{ name: 'Carla Dias',   initials: 'CD', color: 'linear-gradient(135deg,#b45309,#78350f)', since: 'Fev/2024', sessions: 15, tag: 'Ansiedade',  tagClass: 'green',  nextAppt: `${today.getDate()+2}/${today.getMonth()+1}`, notes: ['Progressos significativos. Redução de episódios de pânico.'] },
{ name: 'Lucas Mota',   initials: 'LM', color: 'linear-gradient(135deg,#be185d,#881337)', since: 'Mai/2024', sessions: 4,  tag: 'TDAH',       tagClass: 'orange', nextAppt: `${today.getDate()+4}/${today.getMonth()+1}`, notes: [] },
];

/* ---- CALENDAR ---- */
function renderCalendar() {
document.getElementById('calMonthLabel').textContent = `${MONTHS[currentMonth]} ${currentYear}`;
const firstDay = new Date(currentYear, currentMonth, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const apptDays = appointments.filter(a => a.month === currentMonth && a.year === currentYear).map(a => a.day);
const container = document.getElementById('calDays');
container.innerHTML = '';

for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    container.appendChild(el);
}
for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;
    const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    if (isToday) el.classList.add('today');
    if (d === selectedDay && currentMonth === currentMonth) el.classList.add('selected');
    if (apptDays.includes(d)) el.classList.add('has-appt');
    el.addEventListener('click', () => { selectedDay = d; renderCalendar(); renderAgenda(d); });
    container.appendChild(el);
}
}

function changeMonth(dir) {
currentMonth += dir;
if (currentMonth > 11) { currentMonth = 0; currentYear++; }
if (currentMonth < 0)  { currentMonth = 11; currentYear--; }
renderCalendar(); renderAgenda(selectedDay);
}

/* ---- AGENDA ---- */
function renderAgenda(day) {
const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
document.getElementById('agendaLabel').textContent = isToday ? 'Agenda de hoje' : `Agenda — ${day} de ${MONTHS[currentMonth]}`;
const items = appointments.filter(a => a.day === day && a.month === currentMonth && a.year === currentYear);
const container = document.getElementById('agendaItems');

if (!items.length) {
    container.innerHTML = `<div class="agenda-empty"><i class="bi bi-calendar2-x"></i>Nenhuma consulta neste dia.</div>`;
    return;
}
container.innerHTML = items.map((a, i) => `
    <div class="agenda-item" id="appt-${i}">
    <div class="agenda-time">
        <div class="agenda-time-h">${a.time.split(':')[0]}</div>
        <div class="agenda-time-m">:${a.time.split(':')[1]}</div>
    </div>
    <div class="agenda-dot ${a.color}"></div>
    <div class="agenda-info">
        <div class="agenda-title">${a.patient}</div>
        <div class="agenda-sub"><i class="bi bi-${a.type==='Online'?'camera-video':'geo-alt'}-fill me-1"></i>${a.type}</div>
    </div>
    ${a.status === 'pending'
        ? `<button class="btn-accept" onclick="acceptAppt(${i})"><i class="bi bi-check-lg"></i> Confirmar</button>
            <button class="btn-decline ms-1" onclick="declineAppt(${i})"><i class="bi bi-x-lg"></i></button>`
        : `<span class="agenda-status status-${a.status}">${a.status === 'confirmed' ? 'Confirmado' : 'Realizado'}</span>
            <div class="btn-act view ms-2" title="Ver paciente" onclick="openPatientModal('${a.patient}')"><i class="bi bi-person"></i></div>`
    }
    </div>
`).join('');
}

function acceptAppt(i) {
const filtered = appointments.filter(a => a.day === selectedDay && a.month === currentMonth && a.year === currentYear);
filtered[i].status = 'confirmed';
renderAgenda(selectedDay);
showToast('Consulta confirmada!', `${filtered[i].patient} foi notificado.`);
}
function declineAppt(i) {
const filtered = appointments.filter(a => a.day === selectedDay && a.month === currentMonth && a.year === currentYear);
const idx = appointments.indexOf(filtered[i]);
appointments.splice(idx, 1);
renderAgenda(selectedDay);
renderCalendar();
showToast('Consulta recusada.', 'O paciente será notificado.');
}

/* ---- PENDING ---- */
function renderPending() {
const list = document.getElementById('pendingList');
if (!pending.length) {
    list.innerHTML = `<p style="color:var(--muted);font-size:.85rem;padding:0 0 .5rem;text-align:center;">Nenhuma solicitação pendente.</p>`;
    return;
}
list.innerHTML = pending.map((p, i) => `
    <div class="pending-item" id="pend-${i}">
    <div class="pending-avatar" style="background:${p.color}">${p.initials}</div>
    <div>
        <div class="pending-name">${p.name}</div>
        <div class="pending-time"><i class="bi bi-clock me-1"></i>${p.time} &nbsp;<span class="tag orange" style="font-size:.65rem;">${p.tag}</span></div>
    </div>
    <div class="pending-btns">
        <button class="btn-accept" onclick="acceptPending(${i})"><i class="bi bi-check-lg"></i></button>
        <button class="btn-decline" onclick="declinePending(${i})"><i class="bi bi-x-lg"></i></button>
    </div>
    </div>
`).join('');
}

function acceptPending(i) {
const p = pending[i];
// Add to appointments
const [timeH, timeM] = p.time.split(' · ')[1]?.split(':') || ['10','00'];
appointments.push({ day: today.getDate()+1, month: today.getMonth(), year: today.getFullYear(), time: p.time.split('·')[1]?.trim()||'10:00', patient: p.name, type: 'Online', color: 'blue', status: 'confirmed' });
pending.splice(i, 1);
renderPending();
renderCalendar();
showToast('Solicitação aceita!', `Consulta agendada com ${p.name}.`);
}
function declinePending(i) {
const name = pending[i].name;
pending.splice(i, 1);
renderPending();
showToast('Solicitação recusada.', `${name} foi notificado.`);
}

/* ---- PATIENTS TABLE ---- */
function renderPatients() {
const table = document.getElementById('patientsTable');
table.innerHTML = `
    <thead>
    <tr>
        <th>Paciente</th>
        <th>Condição</th>
        <th>Consultas</th>
        <th>Próxima</th>
        <th>Ações</th>
    </tr>
    </thead>
    <tbody>
    ${patients.map((p, i) => `
        <tr>
        <td>
            <div class="patient-cell">
            <div class="patient-av" style="background:${p.color}">${p.initials}</div>
            <div>
                <div class="patient-name">${p.name}</div>
                <div class="patient-since">Desde ${p.since}</div>
            </div>
            </div>
        </td>
        <td><span class="tag ${p.tagClass}">${p.tag}</span></td>
        <td style="font-family:var(--font-d);font-weight:700;color:#fff;">${p.sessions}</td>
        <td style="font-size:.82rem;color:var(--muted);">${p.nextAppt}</td>
        <td>
            <button class="btn-table" onclick="openPatientModal('${p.name}')">
            <i class="bi bi-folder2-open me-1"></i> Ver ficha
            </button>
        </td>
        </tr>
    `).join('')}
    </tbody>
`;
}

/* ---- PATIENT MODAL ---- */
function openPatientModal(name) {
const p = patients.find(pt => pt.name === name);
if (!p) return;
currentPatient = p;

document.getElementById('modalPatAv').textContent = p.initials;
document.getElementById('modalPatAv').style.background = p.color;
document.getElementById('modalPatName').textContent = p.name;
document.getElementById('modalPatMeta').textContent = `${p.tag} · Paciente desde ${p.since}`;
document.getElementById('modalPatSessions').textContent = p.sessions;
document.getElementById('modalNextDate').textContent = p.nextAppt;
document.getElementById('modalPatTags').innerHTML = `<span class="tag ${p.tagClass}">${p.tag}</span>`;
document.getElementById('newNoteInput').value = '';

renderNotes(p);
new bootstrap.Modal(document.getElementById('modalPatient')).show();
}

function renderNotes(p) {
const container = document.getElementById('modalNotes');
if (!p.notes.length) {
    container.innerHTML = `<p style="color:var(--muted);font-size:.85rem;font-style:italic;margin-bottom:.5rem;">Nenhuma anotação ainda.</p>`;
    return;
}
const dates = ['12/02/2025','20/01/2025','05/01/2025'];
container.innerHTML = p.notes.map((note, i) => `
    <div class="note-card">
    <div class="note-date"><i class="bi bi-calendar3 me-1"></i>${dates[i] || '01/01/2025'}</div>
    <div class="note-text">${note}</div>
    </div>
`).join('');
}

function saveNote() {
const val = document.getElementById('newNoteInput').value.trim();
if (!val || !currentPatient) return;
currentPatient.notes.unshift(val);
document.getElementById('newNoteInput').value = '';
renderNotes(currentPatient);
showToast('Anotação salva!', `Registrado para ${currentPatient.name}.`);
}

/* ---- AVAILABILITY TOGGLE ---- */
function toggleAvailability() {
isAvailable = !isAvailable;
const toggle = document.getElementById('availToggle');
const label  = document.getElementById('availLabel');
toggle.className = `avail-toggle ${isAvailable ? 'online' : 'offline'}`;
label.textContent = isAvailable ? 'Disponível' : 'Indisponível';
showToast(
    isAvailable ? 'Você está disponível!' : 'Você está indisponível.',
    isAvailable ? 'Pacientes podem solicitar consultas.' : 'Novas solicitações estão pausadas.'
);
}

/* ---- TOAST ---- */
function showToast(msg, sub) {
document.getElementById('toastMsg').textContent = msg;
document.getElementById('toastSub').textContent = sub;
new bootstrap.Toast(document.getElementById('toastSuccess'), { delay: 3500 }).show();
}

/* ---- SIDEBAR MOBILE ---- */
function openSidebar()  { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('show'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('show'); }
function setPage(el)    { document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active')); el.classList.add('active'); closeSidebar(); }

/* ---- TOPBAR DATE ---- */
document.getElementById('topbarDate').textContent = today.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });

/* ---- EARNINGS BAR ANIMATION ---- */
setTimeout(() => { document.getElementById('earningsBar').style.width = '80%'; }, 600);

/* ---- REVEAL ---- */
const observer = new IntersectionObserver(entries => {
entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 100); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

/* ============================================================
    AVAILABILITY MANAGEMENT
    ============================================================ */
const DAYS = [
{ key: 'seg', label: 'Segunda' },
{ key: 'ter', label: 'Terça'   },
{ key: 'qua', label: 'Quarta'  },
{ key: 'qui', label: 'Quinta'  },
{ key: 'sex', label: 'Sexta'   },
{ key: 'sab', label: 'Sábado'  },
{ key: 'dom', label: 'Domingo' },
];

// Default availability state
let availability = {
duration: 50,
days: {
    seg: { active: true,  slots: ['08:00','09:00','10:00','14:00','15:00','16:00'] },
    ter: { active: true,  slots: ['09:00','10:00','11:00','14:00','15:00'] },
    qua: { active: false, slots: [] },
    qui: { active: true,  slots: ['08:00','09:00','10:00','14:00','15:00','16:00'] },
    sex: { active: true,  slots: ['09:00','10:00','11:00'] },
    sab: { active: false, slots: [] },
    dom: { active: false, slots: [] },
}
};

let blockedDates = [
{ date: '2025-03-15', reason: 'Congresso de Neuropsicologia' },
{ date: '2025-04-18', reason: 'Feriado' },
];

// Track which day is showing inline input
let addingSlotFor = null;

function openAvailModal() {
renderDaysList();
renderBlockedList();
renderResumo();
}

/* ---- TAB SWITCH ---- */
function switchAvailTab(tab, btn) {
['horarios','excecoes','resumo'].forEach(t => {
    document.getElementById(`tab-${t}`).style.display = 'none';
});
document.querySelectorAll('.avail-tab').forEach(b => b.classList.remove('active'));
document.getElementById(`tab-${tab}`).style.display = 'block';
btn.classList.add('active');
if (tab === 'resumo') renderResumo();
}

/* ---- DURATION ---- */
function selectDuration(val, btn) {
availability.duration = val;
document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('selected'));
btn.classList.add('selected');
}

/* ---- RENDER DAYS LIST ---- */
function renderDaysList() {
const container = document.getElementById('daysList');
container.innerHTML = DAYS.map(d => {
    const day = availability.days[d.key];
    return `
    <div class="day-row ${day.active ? 'active' : 'day-disabled'}" id="dayrow-${d.key}">
        <div class="day-toggle-wrap">
        <label class="toggle-switch">
            <input type="checkbox" ${day.active ? 'checked' : ''} onchange="toggleDay('${d.key}', this.checked)">
            <span class="toggle-slider"></span>
        </label>
        <span class="day-name">${d.label}</span>
        </div>
        <div class="slots-area" id="slots-${d.key}">
        ${renderSlotPills(d.key)}
        </div>
    </div>
    `;
}).join('');
}

function renderSlotPills(dayKey) {
const day = availability.days[dayKey];
const pills = day.slots.sort().map(slot => `
    <span class="slot-pill orange">
    ${slot}
    <span class="slot-pill-remove" onclick="removeSlot('${dayKey}','${slot}')">✕</span>
    </span>
`).join('');

const addBtn = addingSlotFor === dayKey
    ? `<span class="slot-input-wrap">
        <input type="time" class="slot-time-input" id="slotInput-${dayKey}" value="08:00">
        <button class="btn-slot-ok" onclick="confirmAddSlot('${dayKey}')">OK</button>
        <button class="btn-slot-cancel" onclick="cancelAddSlot()">✕</button>
        </span>`
    : `<span class="btn-add-slot" onclick="startAddSlot('${dayKey}')">
        <i class="bi bi-plus"></i> Horário
        </span>`;

return pills + addBtn;
}

function toggleDay(dayKey, active) {
availability.days[dayKey].active = active;
const row = document.getElementById(`dayrow-${dayKey}`);
if (active) row.classList.add('active'), row.classList.remove('day-disabled');
else        row.classList.remove('active'), row.classList.add('day-disabled');
}

function startAddSlot(dayKey) {
addingSlotFor = dayKey;
refreshSlots(dayKey);
// focus input
setTimeout(() => {
    const inp = document.getElementById(`slotInput-${dayKey}`);
    if (inp) inp.focus();
}, 50);
}

function cancelAddSlot() {
addingSlotFor = null;
DAYS.forEach(d => refreshSlots(d.key));
}

function confirmAddSlot(dayKey) {
const inp = document.getElementById(`slotInput-${dayKey}`);
if (!inp) return;
const val = inp.value;
if (!val) return;
if (!availability.days[dayKey].slots.includes(val)) {
    availability.days[dayKey].slots.push(val);
}
addingSlotFor = null;
refreshSlots(dayKey);
}

function removeSlot(dayKey, slot) {
availability.days[dayKey].slots = availability.days[dayKey].slots.filter(s => s !== slot);
refreshSlots(dayKey);
}

function refreshSlots(dayKey) {
const container = document.getElementById(`slots-${dayKey}`);
if (container) container.innerHTML = renderSlotPills(dayKey);
}

/* ---- BLOCKED DATES ---- */
function renderBlockedList() {
const list = document.getElementById('blockedList');
// Set default date to today
const yyyy = today.getFullYear(), mm = String(today.getMonth()+1).padStart(2,'0'), dd = String(today.getDate()).padStart(2,'0');
const blockInput = document.getElementById('blockDateInput');
if (blockInput && !blockInput.value) blockInput.min = `${yyyy}-${mm}-${dd}`;

if (!blockedDates.length) {
    list.innerHTML = `<p style="color:var(--muted);font-size:.85rem;font-style:italic;text-align:center;padding:1rem 0;">Nenhuma data bloqueada.</p>`;
    return;
}

list.innerHTML = blockedDates
    .sort((a,b) => a.date.localeCompare(b.date))
    .map((item, i) => {
    const [y,m,d] = item.date.split('-');
    const formatted = `${d}/${m}/${y}`;
    const dayName = new Date(item.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long' });
    return `
        <div class="blocked-item">
        <div>
            <div class="blocked-date"><i class="bi bi-slash-circle me-2" style="color:var(--red)"></i>${formatted} <span style="color:var(--muted);font-weight:400;">(${dayName})</span></div>
            ${item.reason ? `<div class="blocked-reason">${item.reason}</div>` : ''}
        </div>
        <button class="btn-unblock" onclick="removeBlockedDate(${i})"><i class="bi bi-trash3 me-1"></i>Remover</button>
        </div>
    `;
    }).join('');
}

function addBlockedDate() {
const dateVal   = document.getElementById('blockDateInput').value;
const reasonVal = document.getElementById('blockReasonInput').value.trim();
if (!dateVal) { alert('Selecione uma data.'); return; }
if (blockedDates.find(b => b.date === dateVal)) { alert('Esta data já está bloqueada.'); return; }
blockedDates.push({ date: dateVal, reason: reasonVal });
document.getElementById('blockDateInput').value  = '';
document.getElementById('blockReasonInput').value = '';
renderBlockedList();
showToast('Data bloqueada!', 'Nenhuma consulta poderá ser agendada nesta data.');
}

function removeBlockedDate(i) {
blockedDates.splice(i, 1);
renderBlockedList();
}

/* ---- RESUMO ---- */
function renderResumo() {
// Preview status
const previewStatus = document.getElementById('previewStatus');
previewStatus.innerHTML = isAvailable
    ? `<span style="display:flex;align-items:center;gap:.4rem;font-size:.82rem;font-weight:600;color:var(--green);background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.25);padding:.3rem .85rem;border-radius:2rem;"><span style="width:7px;height:7px;background:var(--green);border-radius:50%;display:inline-block;"></span>Disponível</span>`
    : `<span style="display:flex;align-items:center;gap:.4rem;font-size:.82rem;font-weight:600;color:var(--muted);background:var(--dark-500);border:1px solid rgba(255,255,255,0.1);padding:.3rem .85rem;border-radius:2rem;"><span style="width:7px;height:7px;background:var(--muted);border-radius:50%;display:inline-block;"></span>Indisponível</span>`;

// Preview next available slots (next 3)
const previewSlots = document.getElementById('previewSlots');
const allSlots = [];
DAYS.forEach(d => {
    if (availability.days[d.key].active) {
    availability.days[d.key].slots.slice(0,2).forEach(s => allSlots.push(`${d.label.slice(0,3)} ${s}`));
    }
});
previewSlots.innerHTML = allSlots.slice(0,6).map(s =>
    `<span style="background:var(--dark-500);border:1px solid rgba(255,255,255,0.08);color:var(--light);padding:.3rem .75rem;border-radius:2rem;font-size:.8rem;font-weight:600;">${s}</span>`
).join('') || `<span style="color:var(--muted);font-style:italic;font-size:.85rem;">Nenhum horário configurado.</span>`;

// Full summary
const resumoDays = document.getElementById('resumoDays');
resumoDays.innerHTML = `
    <div class="avail-summary">
    <div class="avail-summary-title"><i class="bi bi-calendar-check me-1"></i>Grade semanal completa · Consultas de ${availability.duration} min</div>
    ${DAYS.map(d => {
        const day = availability.days[d.key];
        return `
        <div class="summary-day-row">
            <span class="summary-day-name">${d.label}</span>
            ${day.active && day.slots.length
            ? `<div class="summary-slots">${day.slots.sort().map(s => `<span class="summary-slot">${s}</span>`).join('')}</div>`
            : `<span class="summary-off">${day.active ? 'Sem horários definidos' : 'Folga'}</span>`
            }
        </div>
        `;
    }).join('')}
    ${blockedDates.length ? `
        <div style="border-top:1px solid rgba(255,255,255,0.06);margin-top:.75rem;padding-top:.75rem;">
        <div style="font-size:.72rem;color:var(--red);font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem;">
            <i class="bi bi-slash-circle me-1"></i>${blockedDates.length} data(s) bloqueada(s)
        </div>
        ${blockedDates.map(b => {
            const [y,m,d] = b.date.split('-');
            return `<div style="font-size:.8rem;color:var(--muted);">${d}/${m}/${y}${b.reason ? ` — ${b.reason}` : ''}</div>`;
        }).join('')}
        </div>
    ` : ''}
    </div>
`;
}

/* ---- SAVE ---- */
function saveAvailability() {
bootstrap.Modal.getInstance(document.getElementById('modalAvailability')).hide();
setTimeout(() => showToast('Disponibilidade salva!', 'Suas alterações estão visíveis para os pacientes.'), 300);
}


renderCalendar();
renderAgenda(today.getDate());
renderPending();
renderPatients();

// Trigger openAvailModal when modal opens
document.getElementById('modalAvailability').addEventListener('show.bs.modal', openAvailModal);

