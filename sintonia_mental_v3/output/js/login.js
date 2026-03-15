  /* ---- STATE ---- */
  let currentTab  = 'login';
  let currentStep = 0;
  let selectedRole = null;
  let rememberMe   = false;
  let termsChecked = false;
  let selectedSpecialties = [];

  /* ---- TAB SWITCH ---- */
  function showTab(tab) {
    currentTab = tab;
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
    document.getElementById('form-login').style.display    = tab === 'login'    ? 'block' : 'none';
    document.getElementById('form-register').style.display = tab === 'register' ? 'block' : 'none';

    // reset
    if (tab === 'register') {
      currentStep = 0;
      selectedRole = null;
      renderStep(0);
      updateStepBars(0);
    }
    if (tab === 'login') hideForgot();
  }

  /* ---- FORGOT PASSWORD ---- */
  function showForgot() {
    document.getElementById('loginMain').style.display    = 'none';
    document.getElementById('forgotScreen').style.display = 'block';
  }
  function hideForgot() {
    document.getElementById('loginMain').style.display    = 'block';
    document.getElementById('forgotScreen').style.display = 'none';
  }
  function sendReset() {
    const email = document.getElementById('forgotEmail').value.trim();
    if (!email || !email.includes('@')) {
      showError('forgotEmail','forgotEmailErr','Informe um e-mail válido.');
      return;
    }
    const btn = event.currentTarget;
    setLoading(btn, true);
    setTimeout(() => {
      setLoading(btn, false);
      hideForgot();
      // show mini toast-like msg
      alert('Instruções enviadas para ' + email + '!');
    }, 1500);
  }

  /* ---- REMEMBER + TERMS ---- */
  function toggleRemember() {
    rememberMe = !rememberMe;
    const box = document.getElementById('rememberBox');
    box.classList.toggle('checked', rememberMe);
  }
  function toggleTerms() {
    termsChecked = !termsChecked;
    const box = document.getElementById('termsBox');
    box.classList.toggle('checked', termsChecked);
    if (termsChecked) document.getElementById('termsErr').classList.remove('show');
  }

  /* ---- ROLE SELECTION ---- */
  function selectRole(role) {
    selectedRole = role;
    document.getElementById('role-patient').classList.toggle('selected', role === 'patient');
    document.getElementById('role-specialist').classList.toggle('selected', role === 'specialist');
    document.getElementById('roleErr').style.display = 'none';
  }

  /* ---- SPECIALTY TOGGLE ---- */
  function toggleSpecialty(el) {
    el.classList.toggle('selected');
    selectedSpecialties = Array.from(document.querySelectorAll('#specialtyGrid .spec-tag.selected')).map(e => e.textContent.trim());
    if (selectedSpecialties.length > 0) document.getElementById('specSpecialtyErr').classList.remove('show');
  }

  /* ---- STEP NAVIGATION ---- */
  function renderStep(step) {
    document.getElementById('reg-step-0').style.display = step === 0 ? 'block' : 'none';
    document.getElementById('reg-step-1').style.display = step === 1 ? 'block' : 'none';
    document.getElementById('reg-step-2').style.display = step === 2 ? 'block' : 'none';

    const titles = ['Criar conta', 'Seus dados', 'Confirmar'];
    document.getElementById('regTitle').textContent = titles[step];

    if (step === 1) {
      document.getElementById('patient-fields').style.display    = selectedRole === 'patient'    ? 'block' : 'none';
      document.getElementById('specialist-fields').style.display = selectedRole === 'specialist' ? 'block' : 'none';
    }
    if (step === 2) buildSummary();
  }

  function updateStepBars(step) {
    for (let i = 0; i < 3; i++) {
      const bar = document.getElementById(`step-bar-${i}`);
      const lbl = document.getElementById(`step-lbl-${i}`);
      bar.className = 'reg-step ' + (i < step ? 'done' : i === step ? 'active' : '');
      lbl.className = 'step-lbl '  + (i < step ? 'done' : i === step ? 'active' : '');
    }
  }

  function nextStep() {
    if (currentStep === 0) {
      if (!selectedRole) { document.getElementById('roleErr').style.removeProperty('display'); return; }
      currentStep = 1;
    } else if (currentStep === 1) {
      if (!validateStep1()) return;
      currentStep = 2;
    }
    renderStep(currentStep);
    updateStepBars(currentStep);
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep(currentStep);
      updateStepBars(currentStep);
    }
  }

  /* ---- STEP 1 VALIDATION ---- */
  function validateStep1() {
    let valid = true;
    if (selectedRole === 'patient') {
      if (!document.getElementById('regFirstName').value.trim()) { showError('regFirstName','regFirstNameErr','Informe seu nome.'); valid=false; }
      if (!document.getElementById('regLastName').value.trim())  { showError('regLastName','regLastNameErr','Informe seu sobrenome.'); valid=false; }
      if (!validEmail(document.getElementById('regEmail').value)) { showError('regEmail','regEmailErr','Informe um e-mail válido.'); valid=false; }
    } else {
      if (!document.getElementById('specFirstName').value.trim()) { showError('specFirstName','specFirstNameErr','Informe seu nome.'); valid=false; }
      if (!document.getElementById('specLastName').value.trim())  { showError('specLastName','specLastNameErr','Informe seu sobrenome.'); valid=false; }
      if (!validEmail(document.getElementById('specEmail').value)){ showError('specEmail','specEmailErr','Informe um e-mail válido.'); valid=false; }
      if (!document.getElementById('specCrp').value.trim())       { showError('specCrp','specCrpErr','Informe seu registro profissional.'); valid=false; }
      if (selectedSpecialties.length === 0) { document.getElementById('specSpecialtyErr').classList.add('show'); valid=false; }
    }
    const pw  = document.getElementById('regPassword').value;
    const pw2 = document.getElementById('regPassword2').value;
    if (pw.length < 8) { showError('regPassword','regPasswordErr','A senha precisa ter pelo menos 8 caracteres.'); valid=false; }
    else if (pw !== pw2) { showError('regPassword2','regPassword2Err','As senhas não conferem.'); valid=false; }
    return valid;
  }

  /* ---- SUMMARY ---- */
  function buildSummary() {
    const isSpec  = selectedRole === 'specialist';
    const fname   = document.getElementById(isSpec ? 'specFirstName' : 'regFirstName').value.trim();
    const lname   = document.getElementById(isSpec ? 'specLastName'  : 'regLastName').value.trim();
    const email   = document.getElementById(isSpec ? 'specEmail'     : 'regEmail').value.trim();
    const initials = (fname[0] || '') + (lname[0] || '');
    const av = document.getElementById('summaryAvatar');
    av.textContent = initials.toUpperCase();
    av.style.background = isSpec ? 'linear-gradient(135deg,#7c3aed,#4c1d95)' : 'linear-gradient(135deg,#F1601C,#c94d12)';

    document.getElementById('summaryName').textContent  = `${fname} ${lname}`;
    document.getElementById('summaryRole').textContent  = isSpec ? 'Especialista' : 'Paciente';
    document.getElementById('summaryEmail').textContent = email;

    const specDiv = document.getElementById('summarySpecialties');
    specDiv.innerHTML = isSpec && selectedSpecialties.length
      ? selectedSpecialties.map(s => `<span style="background:var(--orange-dim);color:var(--orange-glow);border:1px solid var(--orange-border);padding:.18rem .6rem;border-radius:2rem;font-size:.72rem;font-weight:600;">${s}</span>`).join('')
      : '';
  }

  /* ---- DO LOGIN ---- */
  function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pw    = document.getElementById('loginPassword').value;
    let valid   = true;

    if (!validEmail(email)) { showError('loginEmail','loginEmailErr','Informe um e-mail válido.'); valid=false; }
    if (pw.length < 6)       { showError('loginPassword','loginPasswordErr','Senha incorreta ou muito curta.'); valid=false; }
    if (!valid) return;

    const btn = document.getElementById('loginBtn');
    setLoading(btn, true);
    setTimeout(() => {
      setLoading(btn, false);
      // Django: redirect or show error here
      // location.href = '/dashboard/';
      alert('Login realizado! (redirecionar para /dashboard/)');
    }, 1600);
  }

  /* ---- DO REGISTER ---- */
  function doRegister() {
    if (!termsChecked) { document.getElementById('termsErr').classList.add('show'); return; }
    const btn = document.getElementById('finalRegBtn');
    setLoading(btn, true);
    setTimeout(() => {
      setLoading(btn, false);
      const isSpec = selectedRole === 'specialist';
      const fname  = document.getElementById(isSpec ? 'specFirstName' : 'regFirstName').value.trim();
      document.getElementById('successMsg').textContent =
        isSpec
          ? `Bem-vinda, ${fname}! Seu perfil de especialista será revisado em até 24h. Você receberá um e-mail de confirmação.`
          : `Bem-vindo(a), ${fname}! Sua conta foi criada. Você já pode buscar especialistas e agendar consultas.`;
      document.getElementById('registerSteps').style.display = 'none';
      document.getElementById('registerSuccess').style.display = 'block';
    }, 2000);
  }

  /* ---- HELPERS ---- */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function showError(inputId, errId, msg) {
    document.getElementById(inputId).classList.add('error');
    const el = document.getElementById(errId);
    el.querySelector('span').textContent = msg;
    el.classList.add('show');
  }
  function clearError(inputId) {
    document.getElementById(inputId).classList.remove('error');
    const errEl = document.getElementById(inputId + 'Err');
    if (errEl) errEl.classList.remove('show');
  }

  function setLoading(btn, on) {
    btn.classList.toggle('loading', on);
    btn.disabled = on;
  }

  function togglePw(inputId, iconId) {
    const inp  = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (inp.type === 'password') { inp.type = 'text';  icon.className = 'bi bi-eye-slash input-toggle'; }
    else                         { inp.type = 'password'; icon.className = 'bi bi-eye input-toggle'; }
    icon.id = iconId; // keep id
  }

)(\d{5})(\d{4})$/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    else if (v.length > 0) v = v.replace(/^(\d{0,2})$/, '($1');
    el.value = v;
  }

  /* ---- PASSWORD STRENGTH ---- */
  function updatePwStrength(pw) {
    const bars  = [document.getElementById('pb1'), document.getElementById('pb2'), document.getElementById('pb3'), document.getElementById('pb4')];
    const label = document.getElementById('pwLabel');
    bars.forEach(b => b.className = 'pw-bar');

    if (!pw) { label.textContent = 'Digite uma senha'; return; }

    let score = 0;
    if (pw.length >= 8)  score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const configs = [
      { cls: 'weak',   txt: 'Muito fraca',  color: 'var(--red)' },
      { cls: 'weak',   txt: 'Fraca',        color: 'var(--red)' },
      { cls: 'medium', txt: 'Média',        color: 'var(--yellow)' },
      { cls: 'medium', txt: 'Boa',          color: 'var(--yellow)' },
      { cls: 'strong', txt: 'Forte! 💪',    color: 'var(--green)' },
    ];
    const cfg = configs[score];
    for (let i = 0; i < score + (score < 4 ? 1 : 1); i++) {
      if (bars[i]) bars[i].classList.add(cfg.cls);
    }
    label.textContent = cfg.txt;
    label.style.color = cfg.color;
  }

