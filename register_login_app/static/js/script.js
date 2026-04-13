/* ---- ESTADO DA APLICAÇÃO ---- */
// Rastreia a aba atual (login ou registro)
let currentTab = "login";
// Posição atual no fluxo de registro (0, 1 ou 2)
let currentStep = 0;
// Tipo de usuário selecionado (patient ou specialist)
let selectedRole = null;
// Marca se o usuário deseja ser lembrado no login
let rememberMe = false;
// Marca se o usuário aceitou os termos e condições
let termsChecked = false;
// Lista de especialidades selecionadas pelo especialista
let selectedSpecialties = [];

/* ---- ALTERNÂNCIA DE ABAS ---- */
// Alterna entre as abas de login e registro
function showTab(tab) {
    currentTab = tab;
    // Ativa/desativa a aba de login
    document
        .getElementById("tab-login")
        .classList.toggle("active", tab === "login");
    // Ativa/desativa a aba de registro
    document
        .getElementById("tab-register")
        .classList.toggle("active", tab === "register");
    // Mostra/oculta o formulário de login
    document.getElementById("form-login").style.display =
        tab === "login" ? "block" : "none";
    // Mostra/oculta o formulário de registro
    document.getElementById("form-register").style.display =
        tab === "register" ? "block" : "none";

    // Reseta o fluxo de registro quando a aba é ativada
    if (tab === "register") {
        currentStep = 0;
        selectedRole = null;
        renderStep(0);
        updateStepBars(0);
    }
    // Oculta a tela de "esqueci a senha" ao voltar ao login
    if (tab === "login") hideForgot();
}

/* ---- RECUPERAÇÃO DE SENHA ---- */
// Exibe a tela de recuperação de senha
function showForgot() {
    document.getElementById("loginMain").style.display = "none";
    document.getElementById("forgotScreen").style.display = "block";
}
// Oculta a tela de recuperação de senha
function hideForgot() {
    document.getElementById("loginMain").style.display = "block";
    document.getElementById("forgotScreen").style.display = "none";
}
// Envia instruções de reset de senha para o e-mail informado
function sendReset() {
    const email = document.getElementById("forgotEmail").value.trim();
    // Valida se o e-mail foi preenchido corretamente
    if (!email || !email.includes("@")) {
        showError("forgotEmail", "forgotEmailErr", "Informe um e-mail válido.");
        return;
    }
    const btn = event.currentTarget;
    // Simula carregamento por 1.5 segundos
    setLoading(btn, true);
    setTimeout(() => {
        setLoading(btn, false);
        hideForgot();
        // Exibe mensagem de confirmação
        alert("Instruções enviadas para " + email + "!");
    }, 1500);
}

/* ---- LEMBRAR + TERMOS ---- */
// Alterna o estado do checkbox "Lembrar-me"
function toggleRemember() {
    rememberMe = !rememberMe;
    const box = document.getElementById("rememberBox");
    box.classList.toggle("checked", rememberMe);
}
// Alterna o estado do checkbox de aceitar termos
function toggleTerms() {
    termsChecked = !termsChecked;
    const box = document.getElementById("termsBox");
    box.classList.toggle("checked", termsChecked);
    // Remove mensagem de erro se termos foram aceitos
    if (termsChecked)
        document.getElementById("termsErr").classList.remove("show");
}

/* ---- SELEÇÃO DE TIPO DE USUÁRIO ---- */
// Define o tipo de usuário selecionado (paciente ou especialista)
function selectRole(role) {
    selectedRole = role;
    // Marca visualmente a opção selecionada
    document
        .getElementById("role-patient")
        .classList.toggle("selected", role === "patient");
    document
        .getElementById("role-specialist")
        .classList.toggle("selected", role === "specialist");
    // Oculta mensagem de erro se uma opção foi selecionada
    document.getElementById("roleErr").style.display = "none";
}

/* ---- ALTERNÂNCIA DE ESPECIALIDADES ---- */
// Marca/desmarca uma especialidade como selecionada
function toggleSpecialty(el) {
    el.classList.toggle("selected");
    // Atualiza a lista de especialidades selecionadas
    selectedSpecialties = Array.from(
        document.querySelectorAll("#specialtyGrid .spec-tag.selected"),
    ).map((e) => e.textContent.trim());
    // Remove erro se pelo menos uma especialidade foi selecionada
    if (selectedSpecialties.length > 0)
        document.getElementById("specSpecialtyErr").classList.remove("show");
}

/* ---- NAVEGAÇÃO ENTRE PASSOS ---- */
// Renderiza o conteúdo do passo especificado (0, 1 ou 2)
function renderStep(step) {
    // Mostra apenas o passo atual
    document.getElementById("reg-step-0").style.display =
        step === 0 ? "block" : "none";
    document.getElementById("reg-step-1").style.display =
        step === 1 ? "block" : "none";
    document.getElementById("reg-step-2").style.display =
        step === 2 ? "block" : "none";

    // Atualiza o título do registro conforme o passo
    const titles = ["Criar conta", "Seus dados", "Confirmar"];
    document.getElementById("regTitle").textContent = titles[step];

    // No passo 1: mostra campos baseado no tipo de usuário
    if (step === 1) {
        document.getElementById("patient-fields").style.display =
            selectedRole === "patient" ? "block" : "none";
        document.getElementById("specialist-fields").style.display =
            selectedRole === "specialist" ? "block" : "none";
    }
    // No passo 2: constrói e exibe o resumo dos dados
    if (step === 2) buildSummary();
}

// Atualiza a barra de progresso dos passos
function updateStepBars(step) {
    for (let i = 0; i < 3; i++) {
        const bar = document.getElementById(`step-bar-${i}`);
        const lbl = document.getElementById(`step-lbl-${i}`);
        // Marca passos completados, atuais e futuros
        bar.className =
            "reg-step " + (i < step ? "done" : i === step ? "active" : "");
        lbl.className =
            "step-lbl " + (i < step ? "done" : i === step ? "active" : "");
    }
}

// Avança para o próximo passo se validações passarem
function nextStep() {
    // Passo 0: valida se um tipo de usuário foi selecionado
    if (currentStep === 0) {
        if (!selectedRole) {
            document.getElementById("roleErr").style.removeProperty("display");
            return;
        }
        currentStep = 1;
    } 
    // Passo 1: valida preenchimento e integridade dos dados
    else if (currentStep === 1) {
        if (!validateStep1()) return;
        currentStep = 2;
    }
    // Renderiza e atualiza a interface
    renderStep(currentStep);
    updateStepBars(currentStep);
}

// Volta para o passo anterior
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
        updateStepBars(currentStep);
    }
}

/* ---- VALIDAÇÃO DO PASSO 1 ---- */
// Valida todos os campos do passo 1 (dados pessoais e senha)
function validateStep1() {
    let valid = true;
    
    // Validações específicas para pacientes
    if (selectedRole === "patient") {
        if (!document.getElementById("regFirstName").value.trim()) {
            showError("regFirstName", "regFirstNameErr", "Informe seu nome.");
            valid = false;
        }
        if (!document.getElementById("regLastName").value.trim()) {
            showError("regLastName", "regLastNameErr", "Informe seu sobrenome.");
            valid = false;
        }
        if (!validEmail(document.getElementById("regEmail").value)) {
            showError("regEmail", "regEmailErr", "Informe um e-mail válido.");
            valid = false;
        }
    } 
    // Validações específicas para especialistas
    else {
        if (!document.getElementById("specFirstName").value.trim()) {
            showError("specFirstName", "specFirstNameErr", "Informe seu nome.");
            valid = false;
        }
        if (!document.getElementById("specLastName").value.trim()) {
            showError("specLastName", "specLastNameErr", "Informe seu sobrenome.");
            valid = false;
        }
        if (!validEmail(document.getElementById("specEmail").value)) {
            showError("specEmail", "specEmailErr", "Informe um e-mail válido.");
            valid = false;
        }
        // CRP: registro profissional obrigatório
        if (!document.getElementById("specCrp").value.trim()) {
            showError("specCrp", "specCrpErr", "Informe seu registro profissional.");
            valid = false;
        }
        // Pelo menos uma especialidade deve ser selecionada
        if (selectedSpecialties.length === 0) {
            document.getElementById("specSpecialtyErr").classList.add("show");
            valid = false;
        }
    }
    
    // Validações de senha (comum a todos)
    const pw = document.getElementById("regPassword").value;
    const pw2 = document.getElementById("regPassword2").value;
    if (pw.length < 8) {
        showError(
            "regPassword",
            "regPasswordErr",
            "A senha precisa ter pelo menos 8 caracteres.",
        );
        valid = false;
    } 
    // Confirma se as duas senhas coincidem
    else if (pw !== pw2) {
        showError("regPassword2", "regPassword2Err", "As senhas não conferem.");
        valid = false;
    }
    return valid;
}

/* ---- RESUMO DOS DADOS ---- */
// Constrói e exibe o resumo com os dados preenchidos
function buildSummary() {
    const isSpec = selectedRole === "specialist";
    // Coleta dados do formulário baseado no tipo de usuário
    const fname = document
        .getElementById(isSpec ? "specFirstName" : "regFirstName")
        .value.trim();
    const lname = document
        .getElementById(isSpec ? "specLastName" : "regLastName")
        .value.trim();
    const email = document
        .getElementById(isSpec ? "specEmail" : "regEmail")
        .value.trim();
    
    // Cria iniciais para o avatar
    const initials = (fname[0] || "") + (lname[0] || "");
    const av = document.getElementById("summaryAvatar");
    av.textContent = initials.toUpperCase();
    
    // Define cor do avatar conforme o tipo de usuário
    av.style.background = isSpec
        ? "linear-gradient(135deg,#7c3aed,#4c1d95)"
        : "linear-gradient(135deg,#F1601C,#c94d12)";

    // Exibe dados no resumo
    document.getElementById("summaryName").textContent = `${fname} ${lname}`;
    document.getElementById("summaryRole").textContent = isSpec
        ? "Especialista"
        : "Paciente";
    document.getElementById("summaryEmail").textContent = email;

    // Exibe especialidades (apenas para especialistas)
    const specDiv = document.getElementById("summarySpecialties");
    specDiv.innerHTML =
        isSpec && selectedSpecialties.length
            ? selectedSpecialties
                    .map((s) => `<span class="tag-inline">${s}</span>`)
                    .join("")
            : "";
}

/* ---- EXECUTAR LOGIN ---- */
// Processa o login com validação de e-mail e senha
function doLogin() {
    const email = document.getElementById("loginEmail").value.trim();
    const pw = document.getElementById("loginPassword").value;
    let valid = true;

    // Valida formato do e-mail
    if (!validEmail(email)) {
        showError("loginEmail", "loginEmailErr", "Informe um e-mail válido.");
        valid = false;
    }
    // Valida comprimento mínimo da senha
    if (pw.length < 6) {
        showError(
            "loginPassword",
            "loginPasswordErr",
            "Senha incorreta ou muito curta.",
        );
        valid = false;
    }
    if (!valid) return;

    // Simula requisição ao servidor por 1.6 segundos
    const btn = document.getElementById("loginBtn");
    setLoading(btn, true);
    setTimeout(() => {
        setLoading(btn, false);
        // Aqui seria feita a chamada ao Django para autenticar
        // location.href = '/dashboard/';
        alert("Login realizado! (redirecionar para /dashboard/)");
    }, 1600);
}

/* ---- EXECUTAR REGISTRO ---- */
// Processa o registro final após aceitar termos
function doRegister() {
    // Verifica se termos foram aceitos
    if (!termsChecked) {
        document.getElementById("termsErr").classList.add("show");
        return;
    }
    
    // Simula salvamento no servidor por 2 segundos
    const btn = document.getElementById("finalRegBtn");
    setLoading(btn, true);
    setTimeout(() => {
        setLoading(btn, false);
        const isSpec = selectedRole === "specialist";
        const fname = document
            .getElementById(isSpec ? "specFirstName" : "regFirstName")
            .value.trim();
        
        // Exibe mensagem de sucesso diferenciada por tipo de usuário
        document.getElementById("successMsg").textContent = isSpec
            ? `Bem-vinda, ${fname}! Seu perfil de especialista será revisado em até 24h. Você receberá um e-mail de confirmação.`
            : `Bem-vindo(a), ${fname}! Sua conta foi criada. Você já pode buscar especialistas e agendar consultas.`;
        
        // Oculta formulário e exibe tela de sucesso
        document.getElementById("registerSteps").style.display = "none";
        document.getElementById("registerSuccess").style.display = "block";
    }, 2000);
}

/* ---- FUNÇÕES AUXILIARES ---- */
// Valida formato de e-mail com regex
function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Exibe mensagem de erro em um campo
function showError(inputId, errId, msg) {
    // Adiciona classe de erro ao campo
    document.getElementById(inputId).classList.add("error");
    // Define o texto da mensagem de erro
    const el = document.getElementById(errId);
    el.querySelector("span").textContent = msg;
    // Mostra o elemento de erro
    el.classList.add("show");
}

// Remove mensagem de erro de um campo
function clearError(inputId) {
    document.getElementById(inputId).classList.remove("error");
    const errEl = document.getElementById(inputId + "Err");
    if (errEl) errEl.classList.remove("show");
}

// Ativa/desativa estado de carregamento em um botão
function setLoading(btn, on) {
    btn.classList.toggle("loading", on);
    btn.disabled = on;
}

// Alterna a visibilidade da senha entre texto e pontos
function togglePw(inputId, iconId) {
    const inp = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (inp.type === "password") {
        inp.type = "text";
        icon.className = "bi bi-eye-slash input-toggle";
    } else {
        inp.type = "password";
        icon.className = "bi bi-eye input-toggle";
    }
    icon.id = iconId; // mantém o id
}

// Formata número de telefone enquanto o usuário digita
function maskPhone(el) {
    // Remove caracteres não numéricos
    let v = el.value.replace(/\D/g, "");
    // Limita a 11 dígitos
    if (v.length > 11) v = v.slice(0, 11);
    // Aplica máscara: (XX) XXXXX-XXXX ou (XX) XXXX-XXX
    if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    else if (v.length > 6)
        v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, "($1) $2-$3");
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    else if (v.length > 0) v = v.replace(/^(\d{0,2})$/, "($1");
    el.value = v;
}

/* ---- FORÇA DA SENHA ---- */
// Atualiza indicador visual de força da senha
function updatePwStrength(pw) {
    // Referencia aos 4 elementos de barra de progresso
    const bars = [
        document.getElementById("pb1"),
        document.getElementById("pb2"),
        document.getElementById("pb3"),
        document.getElementById("pb4"),
    ];
    const label = document.getElementById("pwLabel");
    // Reseta as barras
    bars.forEach((b) => (b.className = "pw-bar"));

    // Se não há senha, exibe mensagem padrão
    if (!pw) {
        label.textContent = "Digite uma senha";
        return;
    }

    // Calcula pontuação da força (0 a 4)
    let score = 0;
    if (pw.length >= 8) score++; // Comprimento mínimo
    if (/[A-Z]/.test(pw)) score++; // Letra maiúscula
    if (/[0-9]/.test(pw)) score++; // Número
    if (/[^A-Za-z0-9]/.test(pw)) score++; // Caractere especial

    // Configuração de mensagens e cores por nível
    const configs = [
        { cls: "weak", txt: "Muito fraca", color: "var(--red)" },
        { cls: "weak", txt: "Fraca", color: "var(--red)" },
        { cls: "medium", txt: "Média", color: "var(--yellow)" },
        { cls: "medium", txt: "Boa", color: "var(--yellow)" },
        { cls: "strong", txt: "Forte! 💪", color: "var(--green)" },
    ];
    const cfg = configs[score];
    
    // Colore as barras conforme a pontuação
    for (let i = 0; i < score + (score < 4 ? 1 : 1); i++) {
        if (bars[i]) bars[i].classList.add(cfg.cls);
    }
    
    // Atualiza label com mensagem e cor
    label.textContent = cfg.txt;
    label.style.color = cfg.color;
}
