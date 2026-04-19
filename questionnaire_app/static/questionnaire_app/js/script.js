
/* ================================================================
   PERGUNTAS POR CATEGORIA
   ================================================================ */
const QUESTIONS = {

  eu: [
    /* Desatenção */
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência você tem dificuldade em manter a atenção em tarefas longas ou entediantes?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência você comete erros por descuido em trabalho ou estudos?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência você perde objetos necessários para suas atividades (chaves, celular, documentos)?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência você esquece compromissos ou obrigações do dia a dia?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência você se distrai com estímulos externos enquanto tenta se concentrar?' },
    /* Hiperatividade */
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência você se sente inquieto ou com dificuldade de ficar parado por muito tempo?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência você se levanta em situações onde deveria permanecer sentado?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência você fala em excesso ou de forma acelerada?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência você sente uma sensação interna de agitação, mesmo quando está quieto?' },
    /* Impulsividade */
    { section: 'Impulsividade', icon: 'bi-fast-forward',
      text: 'Com que frequência você interrompe os outros enquanto falam?' },
    { section: 'Impulsividade', icon: 'bi-fast-forward',
      text: 'Com que frequência você toma decisões impulsivas que depois se arrepende?' },
    { section: 'Impulsividade', icon: 'bi-fast-forward',
      text: 'Com que frequência você tem dificuldade em esperar sua vez em filas ou situações similares?' },
    /* Interação social */
    { section: 'Interação Social', icon: 'bi-people',
      text: 'Com que frequência você tem dificuldade em iniciar ou manter conversas sociais?' },
    { section: 'Interação Social', icon: 'bi-people',
      text: 'Com que frequência você prefere atividades solitárias a estar em grupo?' },
    { section: 'Interação Social', icon: 'bi-people',
      text: 'Com que frequência você tem dificuldade em entender expressões faciais ou tom de voz das pessoas?' },
    /* Comportamento */
    { section: 'Comportamento', icon: 'bi-arrow-repeat',
      text: 'Com que frequência você tem rotinas rígidas que, quando quebradas, causam grande desconforto?' },
    { section: 'Comportamento', icon: 'bi-arrow-repeat',
      text: 'Com que frequência você tem interesses muito intensos e específicos que absorvem grande parte do seu tempo?' },
    { section: 'Comportamento', icon: 'bi-arrow-repeat',
      text: 'Com que frequência você se incomoda com texturas, sons, luzes ou cheiros com mais intensidade que outras pessoas?' },
    /* Funções executivas */
    { section: 'Funções Executivas', icon: 'bi-diagram-3',
      text: 'Com que frequência você tem dificuldade em organizar e priorizar tarefas?' },
    { section: 'Funções Executivas', icon: 'bi-diagram-3',
      text: 'Com que frequência você procrastina tarefas importantes, mesmo sabendo das consequências?' },
  ],

  parente: [
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência o familiar tem dificuldade em manter a atenção em uma mesma atividade?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência ele/ela parece não ouvir quando você fala diretamente?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência ele/ela perde ou esquece objetos importantes com frequência?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência ele/ela esquece compromissos ou tarefas combinadas?' },
    { section: 'Desatenção', icon: 'bi-eye-slash',
      text: 'Com que frequência ele/ela se distrai facilmente por barulhos ou atividades ao redor?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência o familiar fica se mexendo ou remexendo quando deveria estar quieto?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência ele/ela corre ou sobe em lugares em situações inapropriadas?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência ele/ela fala excessivamente, sem respeitar pausas na conversa?' },
    { section: 'Hiperatividade', icon: 'bi-lightning-charge',
      text: 'Com que frequência ele/ela demonstra dificuldade em se engajar em atividades silenciosas?' },
    { section: 'Impulsividade', icon: 'bi-fast-forward',
      text: 'Com que frequência ele/ela responde perguntas antes mesmo de terminarem de ser feitas?' },
    { section: 'Impulsividade', icon: 'bi-fast-forward',
      text: 'Com que frequência ele/ela age sem pensar nas consequências?' },
    { section: 'Impulsividade', icon: 'bi-fast-forward',
      text: 'Com que frequência ele/ela tem dificuldade em aguardar sua vez em jogos ou atividades?' },
    { section: 'Interação Social', icon: 'bi-people',
      text: 'Com que frequência o familiar tem dificuldade em fazer ou manter amizades?' },
    { section: 'Interação Social', icon: 'bi-people',
      text: 'Com que frequência ele/ela tem dificuldade em entender as emoções dos outros?' },
    { section: 'Interação Social', icon: 'bi-people',
      text: 'Com que frequência ele/ela evita contato visual em conversas?' },
    { section: 'Comportamento', icon: 'bi-arrow-repeat',
      text: 'Com que frequência ele/ela apresenta comportamentos repetitivos (balançar, girar objetos, etc.)?' },
    { section: 'Comportamento', icon: 'bi-arrow-repeat',
      text: 'Com que frequência ele/ela fica muito perturbado quando a rotina é alterada?' },
    { section: 'Comportamento', icon: 'bi-arrow-repeat',
      text: 'Com que frequência ele/ela reage de forma intensa a sons, luzes ou texturas?' },
    { section: 'Funções Executivas', icon: 'bi-diagram-3',
      text: 'Com que frequência ele/ela tem dificuldade em organizar suas tarefas ou pertences?' },
    { section: 'Funções Executivas', icon: 'bi-diagram-3',
      text: 'Com que frequência ele/ela precisa de lembretes constantes para completar tarefas?' },
  ],

  aluno: [
    { section: 'Atenção em Sala', icon: 'bi-eye-slash',
      text: 'Com que frequência o aluno tem dificuldade em manter o foco durante as aulas?' },
    { section: 'Atenção em Sala', icon: 'bi-eye-slash',
      text: 'Com que frequência ele/ela parece estar "no mundo da lua" durante explicações?' },
    { section: 'Atenção em Sala', icon: 'bi-eye-slash',
      text: 'Com que frequência o aluno comete erros por falta de atenção nos exercícios?' },
    { section: 'Atenção em Sala', icon: 'bi-eye-slash',
      text: 'Com que frequência ele/ela se distrai com qualquer movimento ou barulho na sala?' },
    { section: 'Atenção em Sala', icon: 'bi-eye-slash',
      text: 'Com que frequência o aluno esquece de anotar tarefas ou traz material errado?' },
    { section: 'Comportamento em Sala', icon: 'bi-lightning-charge',
      text: 'Com que frequência ele/ela se levanta ou muda de posição desnecessariamente durante a aula?' },
    { section: 'Comportamento em Sala', icon: 'bi-lightning-charge',
      text: 'Com que frequência o aluno perturba os colegas ao redor?' },
    { section: 'Comportamento em Sala', icon: 'bi-lightning-charge',
      text: 'Com que frequência ele/ela faz comentários fora de hora ou interrompe o professor?' },
    { section: 'Comportamento em Sala', icon: 'bi-lightning-charge',
      text: 'Com que frequência ele/ela demonstra dificuldade em participar de atividades que exigem esperar?' },
    { section: 'Comportamento em Sala', icon: 'bi-lightning-charge',
      text: 'Com que frequência o aluno age de forma impulsiva, sem pensar nas consequências?' },
    { section: 'Socialização', icon: 'bi-people',
      text: 'Com que frequência o aluno tem dificuldade em se relacionar com os colegas?' },
    { section: 'Socialização', icon: 'bi-people',
      text: 'Com que frequência ele/ela prefere ficar isolado durante atividades em grupo?' },
    { section: 'Socialização', icon: 'bi-people',
      text: 'Com que frequência o aluno demonstra dificuldade em entender regras sociais básicas?' },
    { section: 'Socialização', icon: 'bi-people',
      text: 'Com que frequência ele/ela tem reações emocionais desproporcional a situações comuns?' },
    { section: 'Aprendizagem', icon: 'bi-book',
      text: 'Com que frequência o aluno tem dificuldade em organizar suas tarefas e materiais?' },
    { section: 'Aprendizagem', icon: 'bi-book',
      text: 'Com que frequência ele/ela precisa de mais tempo que os colegas para concluir atividades?' },
    { section: 'Aprendizagem', icon: 'bi-book',
      text: 'Com que frequência o aluno demonstra dificuldade em seguir instruções com várias etapas?' },
    { section: 'Aprendizagem', icon: 'bi-book',
      text: 'Com que frequência ele/ela apresenta desempenho irregular — vai bem em algumas matérias e mal em outras?' },
    { section: 'Sensorial', icon: 'bi-soundwave',
      text: 'Com que frequência o aluno demonstra sensibilidade excessiva a sons, luzes ou toques?' },
    { section: 'Sensorial', icon: 'bi-soundwave',
      text: 'Com que frequência ele/ela apresenta comportamentos repetitivos (balançar, bater os dedos, etc.) em sala?' },
  ],
};

const OPTIONS = [
  { label: 'Nunca',           score: 0 },
  { label: 'Raramente',       score: 1 },
  { label: 'Às vezes',        score: 2 },
  { label: 'Frequentemente',  score: 3 },
  { label: 'Quase sempre',    score: 4 },
];

const CAT_LABELS = {
  eu:      'Para mim mesmo',
  parente: 'Para um parente',
  aluno:   'Para um aluno',
};

/* ================================================================
   ESTADO
   ================================================================ */
let selectedCat = null;
let questions   = [];
let answers     = {};
let currentQ    = 0;

/* ================================================================
   INTRO
   ================================================================ */
function selectCat(cat, el) {
  selectedCat = cat;
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btnStart').disabled = false;
}

function startQuiz() {
  questions = QUESTIONS[selectedCat];
  answers   = {};
  currentQ  = 0;
  document.getElementById('qTotal').textContent = questions.length;
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('quizScreen').style.display  = 'block';
  renderQ(0);
}

/* ================================================================
   QUIZ
   ================================================================ */
function renderQ(idx) {
  const q   = questions[idx];
  const pct = Math.round((idx / questions.length) * 100);

  document.getElementById('qNum').textContent         = idx + 1;
  document.getElementById('qPct').textContent         = pct + '%';
  document.getElementById('progressBar').style.width  = pct + '%';
  document.getElementById('quizBadge').textContent    = q.section;
  document.getElementById('prevBtn').disabled         = idx === 0;
  document.getElementById('nextBtn').disabled         = answers[idx] === undefined;
  document.getElementById('nextBtn').innerHTML        = idx === questions.length - 1
    ? 'Ver resultado <i class="bi bi-bar-chart-line"></i>'
    : 'Próxima <i class="bi bi-arrow-right"></i>';

  document.getElementById('questionArea').innerHTML = `
    <div class="cat-pill">
      <i class="${q.icon}"></i> ${q.section}
    </div>
    <div class="question-card">
      <div class="question-num">Pergunta ${idx + 1} de ${questions.length}</div>
      <div class="question-text">${q.text}</div>
      <div class="answers">
        ${OPTIONS.map((opt, oi) => `
          <div class="answer-opt ${answers[idx] === oi ? 'selected' : ''}"
               onclick="selectAnswer(${idx}, ${oi}, this)">
            <div class="answer-bullet">${String.fromCharCode(65 + oi)}</div>
            <span class="answer-label">${opt.label}</span>
            <span class="answer-score">${opt.score > 0 ? '+' + opt.score : '0'}</span>
          </div>
        `).join('')}
      </div>
      <div class="answer-hint" id="answerHint">
        <i class="bi bi-exclamation-circle"></i> Selecione uma opção para continuar.
      </div>
    </div>
  `;
}

function selectAnswer(qIdx, optIdx, el) {
  answers[qIdx] = optIdx;
  document.querySelectorAll('.answer-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('nextBtn').disabled = false;
  document.getElementById('answerHint').classList.remove('show');
}

function nextQ() {
  if (answers[currentQ] === undefined) {
    document.getElementById('answerHint').classList.add('show');
    return;
  }
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQ(currentQ);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    showResult();
  }
}

function prevQ() {
  if (currentQ > 0) {
    currentQ--;
    renderQ(currentQ);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function goBack() {
  if (currentQ === 0) {
    document.getElementById('quizScreen').style.display  = 'none';
    document.getElementById('introScreen').style.display = 'block';
  } else {
    prevQ();
  }
}

/* ================================================================
   RESULTADO
   ================================================================ */
function showResult() {
  document.getElementById('quizScreen').style.display  = 'none';
  document.getElementById('resultScreen').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Calcula score total
  const totalMax   = questions.length * 4;
  let   totalScore = 0;
  questions.forEach((_, i) => { totalScore += OPTIONS[answers[i] ?? 0].score; });
  const pct = Math.round((totalScore / totalMax) * 100);

  // Scores por seção
  const dims = {};
  questions.forEach((q, i) => {
    if (!dims[q.section]) dims[q.section] = { score: 0, max: 0 };
    dims[q.section].score += OPTIONS[answers[i] ?? 0].score;
    dims[q.section].max   += 4;
  });

  const dimColors = [
    'orange','blue','green','purple','orange','blue','green'
  ];

  // Nível
  let level, levelClass, title, sub;
  if (pct < 30) {
    level = 'Baixa probabilidade'; levelClass = 'level-low';
    title = 'Poucos indícios identificados';
    sub   = 'Seu resultado indica baixa presença de sintomas. Ainda assim, se sentir necessidade, um profissional pode ajudar a esclarecer.';
  } else if (pct < 60) {
    level = 'Indícios moderados'; levelClass = 'level-medium';
    title = 'Alguns indícios identificados';
    sub   = 'Seu resultado aponta indícios moderados. Recomendamos uma avaliação com um especialista para maior clareza.';
  } else {
    level = 'Indícios significativos'; levelClass = 'level-high';
    title = 'Indícios significativos encontrados';
    sub   = 'Seu resultado sugere presença considerável de sintomas. Recomendamos fortemente uma consulta com um neuropsicólogo ou psiquiatra.';
  }

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultSub').textContent   = sub;
  document.getElementById('resultLevel').className   = `result-level ${levelClass}`;
  document.getElementById('resultLevel').textContent = level;

  // Anima o anel
  setTimeout(() => {
    const circumference = 330;
    document.getElementById('resultCircle').style.strokeDashoffset = circumference - (pct / 100) * circumference;
    animCount(document.getElementById('resultPct'), pct, '%');
  }, 300);

  // Cards de resumo
  document.getElementById('resultCards').innerHTML = `
    <div class="result-card">
      <div class="result-card-label"><i class="bi bi-percent" style="color:var(--orange)"></i> Pontuação geral</div>
      <div class="result-card-value" style="color:var(--orange)">${pct}%</div>
      <div class="result-card-sub">${totalScore} de ${totalMax} pontos</div>
    </div>
    <div class="result-card">
      <div class="result-card-label"><i class="bi bi-person" style="color:var(--blue)"></i> Categoria</div>
      <div class="result-card-value" style="font-size:1rem;margin-top:.25rem;">${CAT_LABELS[selectedCat]}</div>
      <div class="result-card-sub">${questions.length} perguntas respondidas</div>
    </div>
  `;

  // Barras por dimensão
  const barsHtml = Object.entries(dims).map(([name, d], i) => {
    const dp = Math.round((d.score / d.max) * 100);
    return `
      <div class="dim-row">
        <div class="dim-label">
          <span class="dim-name">${name}</span>
          <span class="dim-pct">${dp}%</span>
        </div>
        <div class="dim-bar">
          <div class="dim-fill ${dimColors[i % dimColors.length]}" data-w="${dp}" style="width:0%"></div>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('dimBars').innerHTML = barsHtml;
  setTimeout(() => {
    document.querySelectorAll('.dim-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
  }, 400);

  // Recomendações
  const recs = buildRecs(pct, dims);
  document.getElementById('recList').innerHTML = recs.map(r => `
    <div class="rec-item">
      <div class="rec-icon" style="background:${r.bg};border:1px solid ${r.border};">
        <i class="${r.icon}" style="color:${r.color}"></i>
      </div>
      <div class="rec-text">
        <strong>${r.title}</strong>
        <span>${r.desc}</span>
      </div>
    </div>
  `).join('');

  // Reveal
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
  }, 100);
}

function buildRecs(pct, dims) {
  const recs = [];
  if (pct >= 60) recs.push({
    icon: 'bi bi-person-badge-fill', color: 'var(--orange)', bg: 'var(--orange-dim)', border: 'var(--orange-border)',
    title: 'Consulte um especialista',
    desc:  'Um neuropsicólogo ou psiquiatra pode fazer uma avaliação completa e confirmar ou descartar diagnósticos.'
  });
  if (pct >= 30) recs.push({
    icon: 'bi bi-clipboard2-pulse-fill', color: 'var(--blue)', bg: 'rgba(96,165,250,.12)', border: 'rgba(96,165,250,.3)',
    title: 'Avaliação neuropsicológica',
    desc:  'Uma bateria formal de testes mapeia com precisão habilidades cognitivas e áreas de atenção.'
  });

  const sections = Object.entries(dims);
  const maxDim   = sections.reduce((a, b) => (b[1].score / b[1].max > a[1].score / a[1].max ? b : a));
  if (maxDim[1].score / maxDim[1].max > 0.5) recs.push({
    icon: 'bi bi-list-check', color: 'var(--green)', bg: 'rgba(74,222,128,.12)', border: 'rgba(74,222,128,.3)',
    title: `Atenção à dimensão: ${maxDim[0]}`,
    desc:  'Esta área apresentou maior pontuação. Estratégias específicas podem ajudar no manejo do dia a dia.'
  });

  recs.push({
    icon: 'bi bi-book-fill', color: 'var(--purple)', bg: 'rgba(167,139,250,.12)', border: 'rgba(167,139,250,.3)',
    title: 'Educação sobre TDAH/TEA',
    desc:  'Conhecer mais sobre a condição ajuda a desenvolver estratégias eficazes de manejo.'
  });
  return recs.slice(0, 4);
}

function animCount(el, target, suffix = '') {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / 1200, 1);
    el.textContent = Math.round(p * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function resetQuiz() {
  answers = {}; currentQ = 0; selectedCat = null;
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('btnStart').disabled = true;
  document.getElementById('resultCircle').style.strokeDashoffset = '330';
  document.getElementById('resultScreen').style.display = 'none';
  document.getElementById('introScreen').style.display  = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}