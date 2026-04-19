
/* ---- SPECIALISTS DATA ---- */
const specialists = [
    { name: 'Dra. Ana Costa', role: 'Neuropsicóloga', tags: ['TDAH', 'TEA', 'Infância'], rating: 4.9, sessions: 128, avatar: 'AC', color: 'color-a', online: true },
    { name: 'Dr. Rafael Lima', role: 'Psiquiatra', tags: ['TDAH', 'Ansiedade'], rating: 4.8, sessions: 87, avatar: 'RL', color: 'color-b', online: false },
    { name: 'Dra. Camila Reis', role: 'Psicóloga', tags: ['TEA', 'Comportamento'], rating: 4.7, sessions: 64, avatar: 'CR', color: 'color-c', online: true },
    { name: 'Dr. Pedro Alves', role: 'Neuropsicólogo', tags: ['TDAH', 'Adultos', 'Foco'], rating: 5.0, sessions: 203, avatar: 'PA', color: 'color-d', online: true },
];

/* ---- APPOINTMENTS DATA ---- */
const today = new Date();
const appointments = [
    { day: 28, month: today.getMonth(), year: today.getFullYear(), time: '14:00', spec: 'Dra. Ana Costa', type: 'Online', color: 'orange', status: 'confirmed' },
    { day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), time: '10:30', spec: 'Dr. Rafael Lima', type: 'Presencial', color: 'blue', status: 'confirmed' },
    { day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), time: '16:00', spec: 'Dra. Camila Reis', type: 'Online', color: 'green', status: 'pending' },
];

/* ---- CALENDAR STATE ---- */
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDay = today.getDate();

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

function renderCalendar() {
    const label = document.getElementById('calMonthLabel');
    label.textContent = `${MONTHS[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const container = document.getElementById('calDays');
    container.innerHTML = '';

    // days with appointments this month
    const apptDays = appointments
        .filter(a => a.month === currentMonth && a.year === currentYear)
        .map(a => a.day);

    // empty cells before
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
        const isSelected = d === selectedDay && currentMonth === currentMonth && currentYear === currentYear;

        if (isToday) el.classList.add('today');
        if (d === selectedDay) el.classList.add('selected');
        if (apptDays.includes(d)) el.classList.add('has-event');

        el.addEventListener('click', () => {
            selectedDay = d;
            renderCalendar();
            renderAgenda(d);
        });

        container.appendChild(el);
    }
}

function changeMonth(dir) {
    currentMonth += dir;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
    renderAgenda(selectedDay);
}

/* ---- AGENDA ---- */
function renderAgenda(day) {
    const label = document.getElementById('agendaDateLabel');
    const container = document.getElementById('agendaItems');

    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    label.textContent = isToday ? 'Agenda de hoje' : `Agenda — ${day} de ${MONTHS[currentMonth]}`;

    const items = appointments.filter(a => a.day === day && a.month === currentMonth && a.year === currentYear);

    if (items.length === 0) {
        container.innerHTML = `
      <div class="agenda-empty">
        <i class="bi bi-calendar2-x"></i>
        Nenhuma consulta neste dia.<br>
        <a href="#" data-bs-toggle="modal" data-bs-target="#modalAgendar"
          onclick="openScheduleModal('Especialista','color-a')"
          style="color:var(--orange);font-weight:600;text-decoration:none;">+ Agendar consulta</a>
      </div>`;
        return;
    }

    container.innerHTML = items.map(a => `
    <div class="agenda-item">
      <div class="agenda-time">
        <div class="agenda-time-h">${a.time.split(':')[0]}</div>
        <div class="agenda-time-m">:${a.time.split(':')[1]}</div>
      </div>
      <div class="agenda-dot ${a.color}"></div>
      <div class="agenda-info">
        <div class="agenda-title">${a.spec}</div>
        <div class="agenda-sub"><i class="bi bi-${a.type === 'Online' ? 'camera-video' : 'geo-alt'}-fill me-1"></i>${a.type}</div>
      </div>
      <span class="agenda-status status-${a.status}">${a.status === 'confirmed' ? 'Confirmado' : 'Pendente'}</span>
    </div>
  `).join('');
}

/* ---- SPECIALISTS GRID ---- */
function renderSpecialists() {
    const grid = document.getElementById('specialistsGrid');
    grid.innerHTML = specialists.map(s => `
    <div class="specialist-card">
      <div class="specialist-avatar ${s.color}">
        ${s.online ? '<span class="online-dot"></span>' : ''}
        ${s.avatar}
      </div>
      <div class="specialist-name">${s.name}</div>
      <div class="specialist-role">${s.role}</div>
      <div class="specialist-tags">
        ${s.tags.map((t, i) => `<span class="spec-tag ${i === 0 ? 'active' : ''}">${t}</span>`).join('')}
      </div>
      <div class="specialist-meta">
        <span><span class="specialist-stars">★</span> ${s.rating}</span>
        <span><i class="bi bi-calendar-check me-1" style="color:var(--muted)"></i>${s.sessions} consultas</span>
        <span style="color:${s.online ? 'var(--green)' : 'var(--muted)'}">
          <i class="bi bi-circle-fill me-1" style="font-size:.5rem"></i>${s.online ? 'Online' : 'Offline'}
        </span>
      </div>
      <button class="btn-agendar" onclick="openScheduleModal('${s.name}','${s.color}')" data-bs-toggle="modal" data-bs-target="#modalAgendar">
        <i class="bi bi-calendar-plus-fill"></i> Agendar Consulta
      </button>
    </div>
  `).join('');
}

/* ---- TOPBAR DATE ---- */
function setTopbarDate() {
    const opts = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('topbar-date').textContent = today.toLocaleDateString('pt-BR', opts);
}

/* ---- NEXT APPT ---- */
function setNextAppt() {
    const future = appointments.filter(a =>
        new Date(a.year, a.month, a.day) >= today
    ).sort((a, b) => new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day))[0];

    if (future) {
        document.getElementById('nextApptDay').textContent = future.day;
        document.getElementById('nextApptMonth').textContent = MONTHS_SHORT[future.month];
    }
}

/* ---- MODAL AGENDAR ---- */
const TIME_SLOTS = ['08:00', '09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '14:00', '14:30', '15:00', '15:30', '16:00'];
const TAKEN_SLOTS = ['09:00', '10:30', '15:00'];
let selectedSlot = null;
let selectedSpecialist = 'Especialista';

function openScheduleModal(name, colorClass) {
    selectedSpecialist = name;
    document.getElementById('modalSpecName').textContent = name;
    const av = document.getElementById('modalSpecAvatar');
    av.className = `modal-spec-avatar ${colorClass}`;
    av.textContent = name.split(' ').map(w => w[0]).slice(0, 2).join('');

    // min date = today
    const dateInput = document.getElementById('apptDate');
    const yyyy = today.getFullYear(), mm = String(today.getMonth() + 1).padStart(2, '0'), dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;

    renderTimeSlots();
    updateSummary();
}

function renderTimeSlots() {
    const grid = document.getElementById('timeSlotsGrid');
    selectedSlot = null;
    grid.innerHTML = TIME_SLOTS.map(t => {
        const taken = TAKEN_SLOTS.includes(t);
        return `<div class="time-slot ${taken ? 'taken' : ''}" onclick="${taken ? '' : ''}" data-time="${t}"
      ${taken ? 'title="Horário indisponível"' : ''}>
      ${t}
    </div>`;
    }).join('');

    grid.querySelectorAll('.time-slot:not(.taken)').forEach(el => {
        el.addEventListener('click', () => {
            grid.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            el.classList.add('selected');
            selectedSlot = el.dataset.time;
            updateSummary();
        });
    });
}

function selectType(el) {
    document.querySelectorAll('.type-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    updateSummary();
}

function updateSummary() {
    const dateVal = document.getElementById('apptDate').value;
    const typeEl = document.querySelector('.type-option.selected span');

    let dateStr = '—';
    if (dateVal) {
        const [y, m, d] = dateVal.split('-');
        dateStr = `${d}/${m}/${y}`;
    }
    document.getElementById('summaryDate').innerHTML = `<i class="bi bi-calendar3 me-1" style="color:var(--orange)"></i>${dateStr}`;
    document.getElementById('summaryTime').innerHTML = `<i class="bi bi-clock me-1" style="color:var(--orange)"></i>${selectedSlot || '—'}`;
    document.getElementById('summaryType').innerHTML = `<i class="bi bi-camera-video me-1" style="color:var(--orange)"></i>${typeEl ? typeEl.textContent : '—'}`;
}

document.getElementById('apptDate').addEventListener('change', () => {
    renderTimeSlots();
    updateSummary();
});

function confirmAgendamento() {
    const dateVal = document.getElementById('apptDate').value;
    if (!dateVal || !selectedSlot) {
        alert('Por favor, selecione uma data e horário.');
        return;
    }

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('modalAgendar')).hide();

    // Show toast
    setTimeout(() => {
        new bootstrap.Toast(document.getElementById('toastSuccess'), { delay: 4000 }).show();
    }, 300);

    // Add to calendar
    const [y, m, d] = dateVal.split('-').map(Number);
    appointments.push({
        day: d, month: m - 1, year: y,
        time: selectedSlot,
        spec: selectedSpecialist,
        type: document.querySelector('.type-option.selected span')?.textContent || 'Online',
        color: 'orange',
        status: 'pending'
    });

    renderCalendar();
    renderAgenda(selectedDay);
}

/* ---- SIDEBAR MOBILE ---- */
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('show');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
}

/* ---- NAV ACTIVE ---- */
function setPage(page) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    closeSidebar();
}

/* ---- REVEAL ON SCROLL ---- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 100);
        }
    });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

/* ---- INIT ---- */
setTopbarDate();
setNextAppt();
renderCalendar();
renderAgenda(today.getDate());
renderSpecialists();

