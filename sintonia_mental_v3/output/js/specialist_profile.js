  /* ---- TAB SWITCH ---- */
  const tabs = ['sobre','formacao','abordagem','avaliacoes'];
  function showTab(name, el) {
    tabs.forEach(t => {
      document.getElementById('tab-' + t).style.display = t === name ? 'block' : 'none';
    });
    document.querySelectorAll('.profile-tab').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    if (name === 'avaliacoes') animateRatingBars();
  }

  /* ---- ABOUT READ MORE ---- */
  let aboutExpanded = false;
  function toggleAbout() {
    aboutExpanded = !aboutExpanded;
    document.getElementById('aboutFull').style.display = aboutExpanded ? 'block' : 'none';
    document.getElementById('readMoreBtn').innerHTML = aboutExpanded
      ? 'Ler menos <i class="bi bi-chevron-up"></i>'
      : 'Ler mais <i class="bi bi-chevron-down"></i>';
  }

  /* ---- FAV ---- */
  let isFav = false;
  function toggleFav() {
    isFav = !isFav;
    ['favIcon','favIcon2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.className = isFav ? 'bi bi-heart-fill' : 'bi bi-heart';
    });
    ['favLabel','favLabel2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = isFav ? 'Salvo!' : (id === 'favLabel' ? 'Favoritar' : 'Salvar perfil');
    });
    ['favBtn','favBtn2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('saved', isFav);
    });
  }

  /* ---- REVIEWS ---- */
  const reviews = [
    { name: 'João S.', initials: 'JS', color: 'linear-gradient(135deg,#7c3aed,#4c1d95)', stars: 5, date: 'Janeiro 2025', text: 'A Dra. Ana foi incrível. Finalmente entendi como meu TDAH funciona e recebi estratégias práticas que mudaram minha rotina completamente. Super recomendo!' },
    { name: 'Maria L.', initials: 'ML', color: 'linear-gradient(135deg,#0284c7,#075985)', stars: 5, date: 'Dezembro 2024', text: 'Atendimento acolhedor e muito profissional. Ela explicou tudo de forma clara, sem jargões. Meu filho melhorou muito na escola após seguir as orientações dela.' },
    { name: 'Pedro R.', initials: 'PR', color: 'linear-gradient(135deg,#059669,#064e3b)', stars: 5, date: 'Novembro 2024', text: 'Já fiz avaliação com outros profissionais mas a abordagem da Dra. Ana é diferente. Ela realmente escuta e personaliza o atendimento para o que você precisa.' },
    { name: 'Carla D.', initials: 'CD', color: 'linear-gradient(135deg,#b45309,#78350f)', stars: 4, date: 'Outubro 2024', text: 'Excelente profissional. A única ressalva é o tempo de espera para agendar, mas vale muito a pena.' },
    { name: 'Lucas M.', initials: 'LM', color: 'linear-gradient(135deg,#be185d,#881337)', stars: 5, date: 'Setembro 2024', text: 'Descobri meu TDAH adulto com a ajuda da Dra. Ana. Parece que alguém finalmente entendeu o que eu estava passando a vida toda. Sou muito grato.' },
  ];

  let shownReviews = 3;
  function renderReviews() {
    const list = document.getElementById('reviewList');
    const toShow = reviews.slice(0, shownReviews);
    list.innerHTML = toShow.map(r => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar" style="background:${r.color}">${r.initials}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-meta">
              <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span>
              · ${r.date}
            </div>
          </div>
        </div>
        <div class="review-text">${r.text}</div>
      </div>
    `).join('');
    document.getElementById('loadMoreReviews').style.display = shownReviews >= reviews.length ? 'none' : 'inline-flex';
  }
  function loadMore() {
    shownReviews = Math.min(shownReviews + 2, reviews.length);
    renderReviews();
  }

  function animateRatingBars() {
    setTimeout(() => {
      document.querySelectorAll('.rating-bar-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
    }, 200);
  }

  /* ---- AVAILABILITY PREVIEW ---- */
  const today = new Date();
  const dayNames = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const availData = {
    1: ['09:00','10:00','14:00','15:00'],
    2: ['09:00','11:00','15:00'],
    3: [],
    4: ['08:00','09:00','14:00','16:00'],
    5: ['10:00','11:00'],
  };

  function renderAvailPreview() {
    const container = document.getElementById('availPreview');
    container.innerHTML = Object.entries(availData).slice(0,4).map(([offset, slots]) => {
      const d = new Date(today); d.setDate(d.getDate() + parseInt(offset));
      const label = parseInt(offset) === 1 ? 'Amanhã' : dayNames[d.getDay()];
      if (!slots.length) return `
        <div class="avail-day-row">
          <span class="avail-day-name" style="color:var(--muted-2);">${label}</span>
          <span style="font-size:.75rem;color:var(--muted-2);font-style:italic;">Sem horários</span>
        </div>
      `;
      return `
        <div class="avail-day-row">
          <span class="avail-day-name">${label}</span>
          <div class="avail-slots">
            ${slots.slice(0,3).map(s => `<span class="avail-slot free" onclick="prefillSlot('${s}')" data-bs-toggle="modal" data-bs-target="#modalBooking">${s}</span>`).join('')}
            ${slots.length > 3 ? `<span class="avail-slot" style="color:var(--muted)">+${slots.length-3}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ---- BOOKING MODAL ---- */
  let selectedSlot = null;
  let selectedConsultType = 'online';
  let prefilledSlot = null;

  const TAKEN = ['09:00','13:00'];
  const ALL_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

  function openBooking() {
    // Set min date to today
    const inp = document.getElementById('bookDate');
    const d = new Date(); d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear(), mm = String(d.getMonth()+1).padStart(2,'0'), dd = String(d.getDate()).padStart(2,'0');
    inp.min = `${yyyy}-${mm}-${dd}`;
    if (!inp.value) inp.value = `${yyyy}-${mm}-${dd}`;
    updateSlots(inp.value);
    if (prefilledSlot) {
      setTimeout(() => selectSlot(prefilledSlot), 200);
      prefilledSlot = null;
    }
  }

  function prefillSlot(slot) {
    prefilledSlot = slot;
  }

  function updateSlots(dateVal) {
    selectedSlot = null;
    updateSummary();
    const grid = document.getElementById('slotsGrid');
    grid.innerHTML = ALL_SLOTS.map(s => `
      <div class="slot-btn ${TAKEN.includes(s) ? 'taken' : ''}" onclick="${TAKEN.includes(s) ? '' : `selectSlot('${s}', this)`}">${s}</div>
    `).join('');
  }

  function selectSlot(slot, el) {
    selectedSlot = slot;
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
    if (el) el.classList.add('selected');
    else {
      document.querySelectorAll('.slot-btn').forEach(b => { if (b.textContent === slot) b.classList.add('selected'); });
    }
    updateSummary();
  }

  function selectType(type, el) {
    selectedConsultType = type;
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('summaryType').textContent = type === 'online' ? 'Online (Vídeo)' : 'Presencial';
  }

  function updateSummary() {
    const dateVal = document.getElementById('bookDate').value;
    const summary = document.getElementById('bookingSummary');
    if (selectedSlot && dateVal) {
      summary.style.display = 'flex';
      const [y,m,d] = dateVal.split('-');
      document.getElementById('summaryDateTime').textContent = `${d}/${m}/${y} às ${selectedSlot}`;
      document.getElementById('summaryPrice').textContent = 'Grátis (1ª consulta)';
    } else {
      summary.style.display = 'none';
    }
  }

  function confirmBooking() {
    if (!selectedSlot || !document.getElementById('bookDate').value) {
      alert('Selecione data e horário para continuar.');
      return;
    }
    bootstrap.Modal.getInstance(document.getElementById('modalBooking')).hide();
    setTimeout(() => {
  showToast('Consulta agendada!', 'Você receberá um e-mail de confirmação.');
    }, 400);
  }

  /* ---- REVEAL ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ---- INIT ---- */
  renderReviews();
  renderAvailPreview();
  updateSlots('');
  document.getElementById('modalBooking').addEventListener('show.bs.modal', openBooking);
