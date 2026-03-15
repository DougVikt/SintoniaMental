  /* ============================================================
     STATE
     ============================================================ */
  let micOn   = true;
  let camOn   = true;
  let shareOn = false;
  let chatOpen = false;
  let callStarted = false;
  let callSeconds = 0;
  let callTimerInterval = null;
  let selectedRating = 0;

  /* ============================================================
     COUNTDOWN — simulates specialist arriving in ~10 seconds for demo
     ============================================================ */
  let secondsUntilStart = 10; // In real app, compute from scheduled time

  // Set appointment date display
  const today = new Date();
  today.setDate(today.getDate() + 1);
  document.getElementById('apptDate').textContent = today.toLocaleDateString('pt-BR');
  document.getElementById('navApptTime').textContent = 'Hoje, 10:00';

  const countdownInterval = setInterval(() => {
    secondsUntilStart--;
    const m = Math.max(0, Math.floor(secondsUntilStart / 60));
    const s = Math.max(0, secondsUntilStart % 60);
    document.getElementById('cdMin').textContent = String(m).padStart(2,'0');
    document.getElementById('cdSec').textContent = String(s).padStart(2,'0');

    if (secondsUntilStart <= 0) {
      clearInterval(countdownInterval);
      specialistArrived();
    }
  }, 1000);

  /* ============================================================
     SPECIALIST ARRIVES
     ============================================================ */
  function specialistArrived() {
    // Update status
    const bar = document.getElementById('statusBar');
    bar.className = 'status-bar ready';
    document.getElementById('statusText').textContent = 'Especialista pronta! Você pode entrar agora.';

    // Update specialist dot
    document.getElementById('specStatusDot').className = 'spec-status-dot online';

    // Enable enter button
    const btn = document.getElementById('btnEnter');
    btn.disabled = false;
    btn.classList.add('active');
    document.getElementById('btnEnterLabel').textContent = 'Entrar na Consulta';
    document.getElementById('enterHint').textContent = 'A Dra. Ana Costa já está na sala esperando por você.';
    document.getElementById('enterHint').style.color = 'var(--green)';

    // Send system chat message
    addWaitChatMsg('system', 'Dra. Ana Costa entrou na sala de espera.');

    // Simulate doctor message after 2s
    setTimeout(() => {
      addWaitChatMsg('other', 'Olá! Pode entrar quando quiser 😊');
    }, 2000);
  }

  /* ============================================================
     ENTER CALL
     ============================================================ */
  function enterCall() {
    document.getElementById('waitingMain').style.display = 'none';
    const callScreen = document.getElementById('callScreen');
    callScreen.style.display = 'flex';
    callStarted = true;
    startCallTimer();

    // Show chat notification after 5s
    setTimeout(() => {
      const notif = document.getElementById('chatNotif');
      notif.style.display = 'flex';
      addCallChatMsg('other', 'Olá! Tudo bem? Pode me contar o que está sentindo.');
    }, 5000);
  }

  /* ============================================================
     CALL CONTROLS
     ============================================================ */
  function toggleMic() {
    micOn = !micOn;
    document.getElementById('ctrlMic').className = `ctrl-btn ${micOn ? 'mic-on' : 'mic-off'}`;
    document.getElementById('micIcon').className  = `bi bi-mic${micOn ? '-fill' : '-mute-fill'}`;
  }

  function toggleCam() {
    camOn = !camOn;
    document.getElementById('ctrlCam').className = `ctrl-btn ${camOn ? 'cam-on' : 'cam-off'}`;
    document.getElementById('camIcon').className  = `bi bi-camera-video${camOn ? '-fill' : '-off-fill'}`;
  }

  function toggleShare() {
    shareOn = !shareOn;
    document.getElementById('ctrlShare').className = `ctrl-btn ${shareOn ? 'share-on' : 'share-off'}`;
    document.getElementById('shareIcon').className  = `bi bi-display${shareOn ? '-fill' : ''}`;
  }

  function toggleCallChat() {
    chatOpen = !chatOpen;
    document.getElementById('callChat').classList.toggle('open', chatOpen);
    if (chatOpen) {
      document.getElementById('chatNotif').style.display = 'none';
      document.getElementById('callChatInput').focus();
    }
  }

  /* ============================================================
     CALL TIMER
     ============================================================ */
  function startCallTimer() {
    callTimerInterval = setInterval(() => {
      callSeconds++;
      const m = String(Math.floor(callSeconds/60)).padStart(2,'0');
      const s = String(callSeconds%60).padStart(2,'0');
      document.getElementById('callTimerBadge').textContent = `${m}:${s}`;
    }, 1000);
  }

  /* ============================================================
     END CALL
     ============================================================ */
  function endCall() {
    if (!confirm('Deseja encerrar a consulta?')) return;
    clearInterval(callTimerInterval);
    document.getElementById('callScreen').style.display = 'none';
    const post = document.getElementById('postcallScreen');
    post.style.display = 'flex';
  }

  /* ============================================================
     CHAT — WAITING ROOM
     ============================================================ */
  function addWaitChatMsg(type, text) {
    const msgs = document.getElementById('waitChatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    if (type === 'system') {
      div.innerHTML = `<div class="chat-bubble" style="background:rgba(255,255,255,.04);color:var(--muted);font-size:.78rem;text-align:center;">${text}</div>`;
    } else if (type === 'other') {
      const now = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${now}</div>`;
    } else {
      const now = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${now}</div>`;
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendWaitChat() {
    const inp = document.getElementById('waitChatInput');
    const val = inp.value.trim();
    if (!val) return;
    addWaitChatMsg('me', val);
    inp.value = '';
  }

  /* ============================================================
     CHAT — IN CALL
     ============================================================ */
  function addCallChatMsg(type, text) {
    const msgs = document.getElementById('callChatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    const now = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    if (type === 'system') {
      div.innerHTML = `<div class="chat-bubble" style="background:rgba(255,255,255,.04);color:var(--muted-2);font-size:.75rem;text-align:center;">${text}</div>`;
    } else {
      div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${now}</div>`;
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendCallChat() {
    const inp = document.getElementById('callChatInput');
    const val = inp.value.trim();
    if (!val) return;
    addCallChatMsg('me', val);
    inp.value = '';
  }

  /* ============================================================
     DEVICE TESTS
     ============================================================ */
  function simulateTest(device) {
    const btn = document.getElementById(`btnTest${device.charAt(0).toUpperCase()+device.slice(1)}`);
    btn.innerHTML = `<div style="width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite;"></div> Testando...`;
    btn.disabled = true;

    setTimeout(() => {
      testDevice(device);
      btn.disabled = false;
      btn.innerHTML = `<i class="bi bi-${device==='cam'?'camera-video':'mic'} me-1"></i> Testado ✓`;
      btn.classList.add('ok');
    }, 1500);
  }

  function testDevice(device) {
    const item   = document.getElementById(`chk-${device}`);
    const status = document.getElementById(`chk-${device}-status`);
    item.classList.add('done');
    status.textContent = 'OK';
    status.className = 'check-status ok';
  }

  /* ============================================================
     CANCEL
     ============================================================ */
  function confirmCancel() {
    if (confirm('Deseja cancelar e sair da sala de espera?')) {
      location.href = '/dashboard/';
    }
  }

  /* ============================================================
     POST-CALL RATING
     ============================================================ */
  function setRating(n) {
    selectedRating = n;
    document.querySelectorAll('.rating-star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.n) <= n);
    });
  }

  function submitRating() {
    if (!selectedRating) { alert('Selecione uma nota para continuar.'); return; }
    location.href = '/dashboard/';
  }
