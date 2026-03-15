/* ============================================================
   SINTONIA MENTAL — global.js
   Funções utilitárias compartilhadas por todas as páginas

   Inclua este arquivo ANTES dos JS específicos de cada página:
   <script src="{% static 'js/global.js' %}"></script>
   <script src="{% static 'js/pagina.js' %}"></script>
   ============================================================ */


/* ============================================================
   MÁSCARAS DE INPUT
   ============================================================ */

/**
 * Máscara de telefone: (11) 99999-9999
 * Uso: <input oninput="maskPhone(this)">
 */
function maskPhone(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 10)      v = v.replace(/^(\d{2})(\d{5})(\d{4})$/,     '($1) $2-$3');
  else if (v.length > 6)  v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
  else if (v.length > 2)  v = v.replace(/^(\d{2})(\d{0,5})$/,          '($1) $2');
  else if (v.length > 0)  v = v.replace(/^(\d{0,2})$/,                 '($1');
  el.value = v;
}

/**
 * Máscara de CPF: 000.000.000-00
 * Uso: <input oninput="maskCpf(this)">
 */
function maskCpf(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9)      v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{1,3})$/,        '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/^(\d{3})(\d{1,3})$/,               '$1.$2');
  el.value = v;
}

/**
 * Máscara de CEP: 00000-000
 * Uso: <input oninput="maskCep(this)">
 */
function maskCep(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
  el.value = v;
}


/* ============================================================
   SIDEBAR MOBILE (dashboards)
   Requer: #sidebar, #sidebarOverlay no HTML
   ============================================================ */

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('show');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

/**
 * Marca item ativo na sidebar e fecha em mobile
 * Uso: <div class="nav-item" onclick="setPage(this)">
 */
function setPage(el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  closeSidebar();
}


/* ============================================================
   REVEAL ON SCROLL (.fade-up)
   Adiciona .visible quando elemento entra na viewport
   ============================================================ */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.08 });

  // Roda depois do DOM carregar
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  });
})();


/* ============================================================
   TOAST (Bootstrap)
   Requer: #toastSuccess, #toastMsg, #toastSub no HTML
   ============================================================ */

/**
 * Exibe o toast global
 * @param {string} msg   - Título do toast
 * @param {string} sub   - Subtítulo/descrição
 * @param {number} delay - Duração em ms (padrão 3500)
 */
function showToast(msg, sub = '', delay = 3500) {
  const toastEl = document.getElementById('toastSuccess');
  if (!toastEl) return;
  const msgEl = document.getElementById('toastMsg');
  const subEl = document.getElementById('toastSub');
  if (msgEl) msgEl.textContent = msg;
  if (subEl) subEl.textContent = sub;
  new bootstrap.Toast(toastEl, { delay }).show();
}


/* ============================================================
   ANIMAÇÃO DE CONTADOR
   @param {HTMLElement} el       - Elemento alvo
   @param {number}      target   - Valor final
   @param {string}      suffix   - Sufixo (ex: '+', '%')
   @param {number}      duration - Duração em ms
   ============================================================ */
function animateCount(el, target, suffix = '+', duration = 1500) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}


/* ============================================================
   VALIDADORES
   ============================================================ */

/** Valida formato de e-mail */
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Valida CPF (dígitos verificadores) */
function validCpf(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10]);
}


/* ============================================================
   NAVEGAÇÃO POR ABAS GENÉRICA
   @param {string}      activeId  - ID do elemento a mostrar
   @param {string}      groupAttr - Atributo data para agrupar
   @param {HTMLElement} btnEl     - Botão clicado
   ============================================================ */
function switchTab(activeId, groupAttr, btnEl) {
  // Esconde todos do grupo
  const group = btnEl.closest('[data-tab-group]') || document;
  group.querySelectorAll(`[${groupAttr}]`).forEach(el => el.style.display = 'none');
  group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Mostra o ativo
  const target = document.getElementById(activeId);
  if (target) target.style.display = 'block';
  btnEl.classList.add('active');
}


/* ============================================================
   CALENDÁRIO — NAVEGAÇÃO DE MÊS
   Requer que a página defina: currentMonth, currentYear,
   renderCalendar() e renderAgenda()
   ============================================================ */
function changeMonth(dir) {
  if (typeof currentMonth === 'undefined') return;
  currentMonth += dir;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  if (currentMonth < 0)  { currentMonth = 11; currentYear--; }
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof renderAgenda   === 'function') renderAgenda(selectedDay);
}
