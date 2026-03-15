  /* ---- METHOD SWITCH ---- */
  function switchMethod(method, btn) {
    ['cartao','pix','boleto'].forEach(m => {
      document.getElementById('method-' + m).style.display = m === method ? 'block' : 'none';
    });
    document.querySelectorAll('.method-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Hide billing for pix/boleto (simpler)
    document.getElementById('billingCard').style.display = method === 'cartao' ? 'block' : 'block';

    if (method === 'pix') startPixTimer();
  }

  /* ---- CARD FORMATTING ---- */
  function formatCardNumber(el) {
    let v = el.value.replace(/\D/g,'').slice(0,16);
    el.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    const disp = v.padEnd(16,'•').replace(/(.{4})/g,'$1 ').trim();
    document.getElementById('previewNumber').textContent = disp;
  }

  function formatExpiry(el) {
    let v = el.value.replace(/\D/g,'');
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2,4);
    el.value = v;
    document.getElementById('previewExp').textContent = v || 'MM/AA';
  }

  const BRANDS = {
    visa:       { re: /^4/, icon: '💳', color: '#1a1f71' },
    mastercard: { re: /^5[1-5]/, icon: '🔴', color: '#eb001b' },
    amex:       { re: /^3[47]/, icon: '💠', color: '#007bc1' },
    elo:        { re: /^4011|^4312|^4389/, icon: '🟡', color: '#00a4e0' },
  };
  function detectBrand(num) {
    const n = num.replace(/\s/g,'');
    let brand = null;
    for (const [name, data] of Object.entries(BRANDS)) {
      if (data.re.test(n)) { brand = name; break; }
    }
    document.getElementById('cardBrand').textContent = brand ? BRANDS[brand].icon : '💳';
  })(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
    el.value = v;
  }

)(\d{5})(\d{4})$/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    el.value = v;
  }

  /* ---- PIX TIMER ---- */
  let pixInterval = null;
  function startPixTimer() {
    let secs = 14 * 60 + 59;
    clearInterval(pixInterval);
    pixInterval = setInterval(() => {
      const m = String(Math.floor(secs/60)).padStart(2,'0');
      const s = String(secs%60).padStart(2,'0');
      const el = document.getElementById('pixTimer');
      if (el) el.textContent = `${m}:${s}`;
      if (--secs < 0) clearInterval(pixInterval);
    }, 1000);
  }

  function copyPix() {
    navigator.clipboard?.writeText('00020126580014BR.GOV.BCB.PIX0136sintoniamental@pix.com');
    const btn = event.currentTarget;
    btn.innerHTML = '<i class="bi bi-check me-1"></i>Copiado!';
    setTimeout(() => { btn.innerHTML = '<i class="bi bi-clipboard me-1"></i>Copiar'; }, 2000);
  }

  /* ---- BOLETO ---- */
  function gerarBoleto() {
    document.getElementById('boletoCode').style.display = 'block';
    document.getElementById('btnGerarBoleto').innerHTML = '<i class="bi bi-download me-1"></i> Baixar PDF';
    document.getElementById('btnGerarBoleto').onclick = () => alert('PDF do boleto gerado! (integrar com backend)');
  }

  /* ---- PAYMENT ---- */
  function processPayment() {
    const btn = document.getElementById('payBtn');
    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(() => {
      btn.classList.remove('loading');
      btn.disabled = false;

      // Update steps
      document.getElementById('checkoutLayout').style.display = 'none';
      document.getElementById('successScreen').style.display = 'block';
      document.getElementById('successProtocol').textContent = '#SM' + Date.now().toString().slice(-10);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2200);
  }

  /* ---- INIT ---- */
  // Set today's date in summary
  const d = new Date();
  d.setDate(d.getDate() + 1);
  document.getElementById('sumDate').textContent = d.toLocaleDateString('pt-BR');
