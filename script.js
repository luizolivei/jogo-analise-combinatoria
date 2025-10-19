function fatorial(n) {
    if (n < 0) return NaN;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}

function C(n, k) {
    if (k < 0 || k > n) return 0;
    k = Math.min(k, n - k);
    let num = 1;
    let den = 1;
    for (let i = 1; i <= k; i++) {
        num *= n - (k - i);
        den *= i;
    }
    return Math.round(num / den);
}

function gerarDistratores(correta, candidatos) {
    const pool = new Set();
    for (const candidato of candidatos) {
        if (candidato > 0) pool.add(Math.round(candidato));
        if (pool.size >= 6) break;
    }
    while (pool.size < 3) {
        const delta = Math.floor(Math.random() * 6) + 1;
        pool.add(Math.max(1, correta + (Math.random() > 0.5 ? delta : -delta)));
    }
    const distratores = Array.from(pool).filter((valor) => valor !== correta);
    while (distratores.length < 3) {
        const delta = Math.floor(Math.random() * 6) + 1;
        const candidato = Math.max(1, correta + (Math.random() > 0.5 ? delta : -delta));
        if (!distratores.includes(candidato) && candidato !== correta) {
            distratores.push(candidato);
        }
    }
    const selecionados = shuffle(distratores).slice(0, 3);
    selecionados.push(correta);
    return shuffle(selecionados);
}

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function formatarResultado(problema, valor) {
    if (problema && typeof problema.formatarResposta === 'function') {
        return problema.formatarResposta(valor);
    }
    if (Array.isArray(valor)) {
        return valor.join(', ');
    }
    if (valor && typeof valor === 'object') {
        return Object.entries(valor)
            .map(([chave, numero]) => `${chave}: ${numero}`)
            .join(' | ');
    }
    return `${valor}`;
}

const PROBLEMAS = [
    {
        dificuldade: 'Fácil',
        titulo: 'Selecionando rochas para análise',
        enunciado:
            'Na sala de treinamento há <strong>4 rochas especiais</strong> e você precisa levar <strong>2</strong> para a nave. Quantas duplas diferentes podem ser escolhidas?',
        tipo: 'slider',
        calcular: () => C(4, 2),
        sliderMin: 0,
        sliderMax: 12,
        sliderStep: 1,
        sliderInitial: 4,
        sliderLegend: (valor) => `Duplas possíveis: ${valor}`,
        sliderInstruction: 'Ajuste o console para indicar quantas duplas distintas podem seguir para o laboratório.',
        mensagemAcerto: 'Perfeito! O laboratório confirma 6 combinações distintas de rochas.',
        mensagemErro: (correta) => `O painel indica ${correta} duplas possíveis de rochas especiais.`,
        resumoAcerto: 'Leitura do console calibrada com precisão.',
        explicacao: 'C(4,2) = 4×3/(2×1) = 6 possíveis duplas de rochas.',
        imagem: {
            src: 'assets/questions/questao1.png',
            alt: 'Amostras minerais brilhando em bancada tecnológica'
        }
    },
    {
        dificuldade: 'Fácil',
        titulo: 'Anagramas para nomear a nave',
        enunciado:
            'A equipe quer criar um codinome divertido usando as letras de <strong>SPACEX</strong>. Quantos anagramas distintos podem ser formados com essas letras?',
        tipo: 'multiple',
        calcular: () => fatorial(6),
        gerarOpcoes: (correta) => gerarDistratores(correta, [fatorial(5), correta / 2, correta * 2, fatorial(6) / 3]),
        mensagemAcerto: 'Excelente! Você descobriu todas as permutações para batizar a nave.',
        mensagemErro: (correta) => `São ${correta} rearranjos diferentes para a palavra SPACEX.`,
        resumoAcerto: 'Você domina anagramas espaciais.',
        explicacao:
            'Como todas as 6 letras de SPACEX são distintas, basta calcular 6! = 720 anagramas possíveis.',
        imagem: {
            src: 'assets/questions/questao2.png',
            alt: 'Letreiros brilhando com o nome SPACEX em um hangar futurista'
        }
    },
    {
        dificuldade: 'Médio',
        titulo: 'Tripulação com pilotos e engenheiros',
        enunciado:
            'Sua nave precisa de <strong>2 pilotos</strong> entre <strong>5</strong> e <strong>2 engenheiros</strong> entre <strong>4</strong>. Quantas equipes completas diferentes podem ser formadas?',
        tipo: 'multiple',
        calcular: () => C(5, 2) * C(4, 2),
        gerarOpcoes: (correta) => gerarDistratores(correta, [C(5, 1) * C(4, 3), C(5, 2) * C(4, 1), 2 * correta, C(9, 4)]),
        mensagemAcerto: 'Equipe completa! A sala de comando aprovou sua seleção.',
        mensagemErro: (correta) => `Existem ${correta} formações possíveis para esta tripulação da SpaceX.`,
        resumoAcerto: 'Pilotos e engenheiros escolhidos com precisão orbital.',
        explicacao: 'Escolha os pilotos: C(5,2)=10. Escolha os engenheiros: C(4,2)=6. Multiplique: 60 equipes.',
        imagem: {
            src: 'assets/questions/questao3.png',
            alt: 'Pilotos e engenheiros em treinamento diante de um painel da nave'
        }
    },
    {
        dificuldade: 'Médio',
        titulo: 'Selecionando cientistas e médicos',
        enunciado:
            'Para uma missão de pesquisa você precisa de <strong>3 cientistas</strong> entre <strong>7</strong> e <strong>2 médicos</strong> entre <strong>4</strong>. Informe ao controle o número de tripulações possíveis.',
        tipo: 'input',
        calcular: () => C(7, 3) * C(4, 2),
        placeholder: 'Quantas tripulações podem ser formadas para esta missão?',
        dica: 'Resolva cada combinação separadamente e depois multiplique os resultados.',
        mensagemAcerto: 'Perfeito! Você combinou cientistas e médicos conforme o protocolo da SpaceX.',
        mensagemErro: (correta) => `O controle registra ${correta} tripulações ao combinar cientistas e médicos.`,
        resumoAcerto: 'Ótimo domínio das combinações de tripulação.',
        explicacao:
            'Primeiro escolha os cientistas: C(7,3)=35. Depois os médicos: C(4,2)=6. Multiplique: 35×6 = 210 equipes.',
        imagem: {
            src: 'assets/questions/questao4.png',
            alt: 'Cientistas e médicos avaliando dados em tablets'
        }
    },
    {
        dificuldade: 'Difícil',
        titulo: 'Montando a tripulação completa',
        enunciado:
            'Para a missão final você precisa de <strong>1 comandante</strong> dentre <strong>3</strong>, <strong>2 pilotos</strong> dentre <strong>5</strong> e <strong>3 cientistas</strong> dentre <strong>6</strong>. Ajuste o controle até representar todas as equipes completas possíveis.',
        tipo: 'slider',
        calcular: () => C(3, 1) * C(5, 2) * C(6, 3),
        sliderMin: 0,
        sliderMax: 720,
        sliderStep: 10,
        sliderInitial: 300,
        sliderLegend: (valor) => `Configurações possíveis: ${valor}`,
        sliderInstruction: 'Ajuste o console até o valor que representa todas as formações completas.',
        mensagemAcerto: 'Fantástico! Você coordenou a montagem completa da tripulação da SpaceX.',
        mensagemErro: (correta) => `O controle informa ${correta} configurações possíveis. Cada escolha conta.`,
        resumoAcerto: 'Você coordenou perfeitamente a missão final da SpaceX.',
        explicacao:
            'Escolha o comandante (3 opções), depois 2 pilotos entre 5 (C(5,2)=10) e 3 cientistas entre 6 (C(6,3)=20). Multiplique: 3×10×20 = 600.',
        imagem: {
            src: 'assets/questions/questao5.png',
            alt: 'Comandante e pilotos monitorando a cabine principal'
        }
    },
    {
        dificuldade: 'Difícil',
        titulo: 'Codificando o acesso à cápsula',
        enunciado:
            'O centro de controle liberou os algarismos <strong>1, 2, 3, 4, 5 e 6</strong> para gerar códigos de quatro dígitos todos distintos. Complete os itens e transmita os resultados ao controle:<br><br><strong>a)</strong> Quantos códigos distintos podem ser formados?<br><strong>b)</strong> Quantos desses códigos terminam obrigatoriamente em 6?<br><strong>c)</strong> Quantos códigos pares podem ser formados?<br><strong>d)</strong> Quantos códigos ímpares podem ser formados?',
        tipo: 'multi-input',
        calcular: () => ({ a: 360, b: 60, c: 180, d: 180 }),
        subquestoes: [
            { id: 'a', label: 'a) Total de códigos distintos' },
            { id: 'b', label: 'b) Códigos com final 6' },
            { id: 'c', label: 'c) Códigos pares' },
            { id: 'd', label: 'd) Códigos ímpares' }
        ],
        avaliar: (resposta, correta) =>
            resposta && ['a', 'b', 'c', 'd'].every((chave) => Number(resposta[chave]) === correta[chave]),
        formatarResposta: (valor) =>
            ['a) ' + valor.a, 'b) ' + valor.b, 'c) ' + valor.c, 'd) ' + valor.d].join(' | '),
        mensagemAcerto: 'Cálculo impecável! O controle registrou todos os quatro totais corretamente.',
        mensagemErro: (correta, formatada) =>
            `Revise os cálculos: o controle aponta ${formatada || ['a) ' + correta.a, 'b) ' + correta.b, 'c) ' + correta.c, 'd) ' + correta.d].join(' | ')}.`,
        resumoAcerto: 'Você dominou cada variação possível para os códigos de acesso.',
        explicacao:
            'Os códigos são permutações de 4 algarismos distintos entre 6 disponíveis. (a) P(6,4)=360. (b) Fixando 6 no final, permute os 3 primeiros: P(5,3)=60. (c) Para códigos pares, escolha a unidade entre 2,4,6 (3 opções) e permute os demais: 3×P(5,3)=180. (d) Para códigos ímpares, unidade entre 1,3,5, resultando em 3×P(5,3)=180.',
        imagem: {
            src: 'assets/questions/questao6.png',
            alt: 'Terminal futurista exibindo códigos de acesso luminosos'
        }
    }
];

const LIMITES_ERROS = Object.freeze({
    IMPRENSA: 1,
    FINANCEIRO: 2,
    FALHAS: 3,
    ABORTAR: 4
});

const estadoInicial = () => ({
    nivel: 0,
    score: 0,
    respostas: [],
    respondido: false,
    corretaAtual: null
});

let estado = estadoInicial();

// DOM
const scrStart = document.getElementById('screen-start');
const scrHow = document.getElementById('screen-how');
const scrLevel = document.getElementById('screen-level');
const scrEnd = document.getElementById('screen-end');

const btnStart = document.getElementById('btn-start');
const btnHow = document.getElementById('btn-how');
const btnBack = document.getElementById('btn-back-home');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const levelIdx = document.getElementById('level-index');
const levelTotal = document.getElementById('level-total');
const levelBadge = document.getElementById('level-badge');
const scoreEl = document.getElementById('score');
const levelTitle = document.getElementById('level-title');
const statement = document.getElementById('level-statement');
const levelArt = document.getElementById('level-art');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');
const finalTotal = document.getElementById('final-total');
const summaryEl = document.getElementById('summary');
const progressBar = document.getElementById('progress-bar');
const missionProgress = document.getElementById('mission-progress');
const missionStatusBar = document.getElementById('mission-status-bar');
const missionStatusFeedback = document.getElementById('mission-status-feedback');
const missionGoalEl = document.getElementById('mission-goal');
const finalHeading = document.getElementById('final-heading');
const finalStatus = document.getElementById('final-status');
const finalCard = document.querySelector('.card-end');
const finalVisual = document.getElementById('final-visual');
const finalVisualImg = finalVisual ? finalVisual.querySelector('img') : null;

const FINAL_VISUAIS = {
    success: {
        src: 'assets/sucess.png',
        alt: 'Astronauta comemorando com bandeira'
    },
    fail: {
        src: 'assets/failure.png',
        alt: 'Telão vermelho exibindo rachaduras e mensagem de missão em risco'
    }
};

levelTotal.textContent = PROBLEMAS.length;
finalTotal.textContent = PROBLEMAS.length;

function inicializarPainelMissao() {
    if (!missionStatusBar) return;
    missionStatusBar.innerHTML = '';
    for (let i = 0; i < PROBLEMAS.length; i++) {
        const marcador = document.createElement('button');
        marcador.type = 'button';
        marcador.className = 'mission-marker';
        marcador.dataset.state = 'upcoming';
        marcador.dataset.index = String(i);
        marcador.setAttribute('role', 'listitem');
        marcador.innerHTML = `
            <span class="marker-index">${i + 1}</span>
            <span class="marker-status">Em espera</span>
        `;
        marcador.setAttribute('aria-label', `Missão ${i + 1} aguardando tentativa.`);
        missionStatusBar.appendChild(marcador);
    }
    atualizarPainelMissao();
}

function atualizarPainelMissao() {
    if (!missionStatusBar) {
        atualizarStatusGeral();
        return;
    }
    const marcadores = missionStatusBar.querySelectorAll('.mission-marker');
    marcadores.forEach((marcador, idx) => {
        const statusSpan = marcador.querySelector('.marker-status');
        let estadoMarcador = 'upcoming';
        let textoStatus = 'Em espera';
        let label = `Missão ${idx + 1} aguardando tentativa.`;

        if (idx < estado.respostas.length) {
            const resposta = estado.respostas[idx];
            if (resposta.correta) {
                estadoMarcador = 'correct';
                textoStatus = 'Acerto';
                label = `Missão ${idx + 1} concluída com sucesso.`;
            } else {
                estadoMarcador = 'wrong';
                textoStatus = 'Falha';
                label = `Missão ${idx + 1} falhou. Consulte o relatório para revisar.`;
            }
        } else if (idx === estado.nivel && !estado.respondido) {
            estadoMarcador = 'active';
            textoStatus = 'Em curso';
            label = `Missão ${idx + 1} em andamento.`;
        }

        marcador.dataset.state = estadoMarcador;
        marcador.setAttribute('aria-label', label);
        if (statusSpan) {
            statusSpan.textContent = textoStatus;
        }
    });

    if (!missionStatusFeedback) {
        atualizarStatusGeral();
        return;
    }

    if (missionStatusFeedback.dataset.mode === 'detail') {
        const idxAtual = Number(missionStatusFeedback.dataset.index);
        if (Number.isInteger(idxAtual)) {
            mostrarDetalhesMissao(idxAtual);
            return;
        }
    }
    atualizarStatusGeral();
}

function atualizarStatusGeral() {
    if (!missionStatusFeedback) return;

    const total = PROBLEMAS.length;
    const completadas = estado.respostas.length;
    const restantes = total - completadas;
    const erros = Math.max(0, completadas - estado.score);

    const integridadeAtual = Math.max(0, Math.min(100, 100 - erros * 25));
    if (missionGoalEl) {
        missionGoalEl.textContent = `Integridade da missão: ${integridadeAtual}%`;
    }

    let texto;
    let estadoPainel = 'neutral';

    if (completadas === 0 && !estado.respondido) {
        texto = 'O centro de comando aguarda sua primeira decisão para avaliar a integridade da missão.';
    } else if (erros >= LIMITES_ERROS.ABORTAR) {
        texto = restantes > 0
            ? 'As sirenes de emergência dominam o hangar. Cada sistema pede reinicialização imediata.'
            : 'As falhas em série derrubaram a missão. Reinicie o protocolo para tentar novamente.';
        estadoPainel = 'danger';
        if (missionGoalEl) {
            missionGoalEl.textContent = 'Integridade da missão: 0%';
        }
    } else if (erros === LIMITES_ERROS.FALHAS) {
        texto = restantes > 0
            ? 'A missão cambaleia: qualquer novo deslize pode comprometer tudo.'
            : 'Missão concluída, mas as falhas registradas deixaram marcas profundas nos relatórios.';
        estadoPainel = 'danger';
    } else if (erros === LIMITES_ERROS.FINANCEIRO) {
        texto = restantes > 0
            ? 'Os contadores financeiros dispararam. Evite novos erros para conter as perdas.'
            : 'Missão concluída, mas o financeiro acusa muita perda monetária pelos incidentes.';
        estadoPainel = 'warning';
    } else if (erros === LIMITES_ERROS.IMPRENSA) {
        texto = restantes > 0
            ? 'Uma falha acendeu holofotes. Capriche nas próximas etapas para recuperar a imagem da missão.'
            : 'Missão entregue, mas a imprensa não reconheceu o brilho da operação.';
        estadoPainel = 'warning';
    } else {
        texto = restantes > 0
            ? 'Todos os sistemas respondem impecavelmente. Continue com a mesma precisão.'
            : 'Controle registra um desempenho impecável. Nada saiu do plano.';
        estadoPainel = 'success';
    }

    missionStatusFeedback.dataset.mode = 'global';
    delete missionStatusFeedback.dataset.index;
    missionStatusFeedback.textContent = texto;

    if (estadoPainel === 'neutral') {
        missionStatusFeedback.removeAttribute('data-state');
        if (missionProgress) {
            missionProgress.removeAttribute('data-state');
        }
    } else {
        missionStatusFeedback.dataset.state = estadoPainel;
        if (missionProgress) {
            missionProgress.dataset.state = estadoPainel;
        }
    }
}

function mostrarDetalhesMissao(indice) {
    if (!missionStatusFeedback) return;
    if (indice < 0 || indice >= PROBLEMAS.length) {
        atualizarStatusGeral();
        return;
    }

    const numero = indice + 1;
    let texto;
    let estadoPainel = 'neutral';

    if (indice < estado.respostas.length) {
        const resposta = estado.respostas[indice];
        if (resposta.correta) {
            texto = `Missão ${numero}: ✅ "${PROBLEMAS[indice].titulo}" concluída com sucesso.`;
            estadoPainel = 'success';
        } else {
            texto = `Missão ${numero}: ❌ "${PROBLEMAS[indice].titulo}" falhou e deixou o painel em alerta. Consulte o relatório para conter o dano.`;
            estadoPainel = 'danger';
        }
    } else if (indice === estado.nivel && !estado.respondido) {
        texto = `Missão ${numero}: em andamento. Resolva "${PROBLEMAS[indice].titulo}" para avançar.`;
        estadoPainel = 'warning';
    } else {
        texto = `Missão ${numero}: aguardando tentativa. Prepare-se para "${PROBLEMAS[indice].titulo}".`;
        estadoPainel = 'neutral';
    }

    missionStatusFeedback.dataset.mode = 'detail';
    missionStatusFeedback.dataset.index = String(indice);
    missionStatusFeedback.textContent = texto;

    if (estadoPainel === 'neutral') {
        missionStatusFeedback.removeAttribute('data-state');
    } else {
        missionStatusFeedback.dataset.state = estadoPainel;
    }
}

function restaurarStatusGlobal() {
    if (!missionStatusFeedback) return;
    delete missionStatusFeedback.dataset.index;
    missionStatusFeedback.dataset.mode = 'global';
    atualizarStatusGeral();
}

function goTo(screen) {
    [scrStart, scrHow, scrLevel, scrEnd].forEach((s) => s.classList.remove('active'));
    screen.classList.add('active');
}

function resetarJogo() {
    estado = estadoInicial();
    scoreEl.textContent = '0';
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    btnNext.disabled = true;
    btnNext.textContent = 'Próxima missão';
    progressBar.style.width = '0%';
    if (missionGoalEl) {
        missionGoalEl.textContent = 'Integridade da missão: 100%';
    }
    if (missionStatusFeedback) {
        missionStatusFeedback.textContent = '';
        missionStatusFeedback.removeAttribute('data-state');
        missionStatusFeedback.dataset.mode = 'global';
    }
    if (missionProgress) {
        missionProgress.removeAttribute('data-state');
    }
    inicializarPainelMissao();
    if (finalHeading) {
        finalHeading.textContent = 'Missão concluída! ✨';
    }
    if (finalStatus) {
        finalStatus.textContent = 'Aguarde o relatório final do controle de missão.';
        finalStatus.removeAttribute('data-state');
    }
    if (finalCard) {
        finalCard.removeAttribute('data-result');
    }
    if (finalVisualImg) {
        finalVisualImg.src = FINAL_VISUAIS.success.src;
        finalVisualImg.alt = FINAL_VISUAIS.success.alt;
    }
    carregarNivel();
    goTo(scrLevel);
}

function carregarNivel() {
    const problema = PROBLEMAS[estado.nivel];
    const correta = problema.calcular();

    estado.corretaAtual = correta;
    estado.respondido = false;

    levelIdx.textContent = estado.nivel + 1;
    levelBadge.textContent = problema.dificuldade;
    levelBadge.dataset.difficulty = problema.dificuldade.toLowerCase().replace(/\s+/g, '-');
    levelTitle.textContent = `Missão ${estado.nivel + 1} – Problema ${problema.dificuldade}`;
    statement.innerHTML = problema.enunciado;

    if (problema.imagem) {
        levelArt.classList.add('visible');
        levelArt.innerHTML = `
            <img src="${problema.imagem.src}" alt="${problema.imagem.alt}" loading="lazy">
        `;
    } else {
        levelArt.classList.remove('visible');
        levelArt.innerHTML = '';
    }

    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';

    btnNext.disabled = true;
    btnNext.textContent = estado.nivel + 1 === PROBLEMAS.length ? 'Encerrar expedição' : 'Próxima missão';

    optionsEl.innerHTML = '';
    optionsEl.dataset.type = problema.tipo;
    optionsEl.setAttribute('role', problema.tipo === 'multiple' ? 'list' : 'group');
    optionsEl.className = `interaction-zone interaction-${problema.tipo}`;

    if (problema.tipo === 'multiple') {
        renderMultipleChoice(problema, correta);
    } else if (problema.tipo === 'input') {
        renderNumericInput(problema, correta);
    } else if (problema.tipo === 'slider') {
        renderSliderChallenge(problema, correta);
    } else if (problema.tipo === 'multi-input') {
        renderMultiInputChallenge(problema, correta);
    }

    atualizarProgresso();
    atualizarPainelMissao();
}

function renderMultipleChoice(problema, correta) {
    const opcoes = problema.gerarOpcoes(correta);
    const grid = document.createElement('div');
    grid.className = 'options-grid';

    opcoes.forEach((valor) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn';
        btn.textContent = `${valor}`;
        btn.addEventListener('click', () => {
            if (estado.respondido) return;
            registrarResposta(valor, (acertou) => {
                Array.from(grid.children).forEach((child) => {
                    child.disabled = true;
                    const numero = Number(child.textContent);
                    if (numero === estado.corretaAtual) {
                        child.dataset.state = 'correct';
                    } else if (numero === valor && !acertou) {
                        child.dataset.state = 'wrong';
                    } else {
                        child.dataset.state = 'neutral';
                    }
                });
            });
        });
        grid.appendChild(btn);
    });

    optionsEl.appendChild(grid);
}

function renderNumericInput(problema) {
    const form = document.createElement('form');
    form.className = 'input-challenge';

    const label = document.createElement('label');
    const inputId = `answer-input-${estado.nivel}`;
    label.setAttribute('for', inputId);
    label.className = 'input-label';
    label.textContent = 'Informe sua resposta ao controle de missão:';

    const input = document.createElement('input');
    input.type = 'number';
    input.id = inputId;
    input.min = '0';
    input.step = '1';
    input.placeholder = problema.placeholder || 'Transmita a resposta';

    const helper = document.createElement('small');
    helper.className = 'input-helper';
    if (problema.dica) {
        helper.textContent = problema.dica;
    }

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'btn secondary';
    submit.textContent = 'Confirmar resposta';

    form.append(label, input, helper, submit);
    optionsEl.appendChild(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (estado.respondido) return;

        const raw = input.value.trim();
        if (raw === '') {
            helper.textContent = 'Informe um número inteiro válido antes de confirmar.';
            helper.dataset.state = 'error';
            return;
        }

        const valor = Number(raw);
        if (!Number.isFinite(valor) || !Number.isInteger(valor)) {
            helper.textContent = 'Utilize apenas números inteiros.';
            helper.dataset.state = 'error';
            return;
        }

        helper.textContent = '';
        helper.dataset.state = '';

        registrarResposta(valor, (acertou) => {
            form.dataset.state = acertou ? 'correct' : 'wrong';
            input.disabled = true;
            submit.disabled = true;
            helper.textContent = acertou
                ? 'Excelente! O controle de missão confirmou seu cálculo.'
                : `O controle informa que a resposta correta era ${estado.corretaAtual}.`;
            helper.dataset.state = acertou ? 'success' : 'error';
        });
    });
}

function renderSliderChallenge(problema) {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider-challenge';

    const instruction = document.createElement('p');
    instruction.className = 'slider-instruction';
    instruction.textContent = problema.sliderInstruction || 'Calibre o painel até o valor correto.';

    const valueBadge = document.createElement('div');
    valueBadge.className = 'slider-value';

    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(problema.sliderMin ?? 0);
    range.max = String(problema.sliderMax ?? Math.max(estado.corretaAtual + 5, estado.corretaAtual));
    range.step = String(problema.sliderStep ?? 1);
    range.value = String(problema.sliderInitial ?? range.min);

    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'btn secondary';
    confirm.textContent = 'Confirmar leitura';

    const helper = document.createElement('small');
    helper.className = 'input-helper';

    const atualizarLegenda = () => {
        const valorAtual = Number(range.value);
        valueBadge.textContent = problema.sliderLegend
            ? problema.sliderLegend(valorAtual)
            : `Leitura atual: ${valorAtual}`;
    };

    atualizarLegenda();

    range.addEventListener('input', atualizarLegenda);

    confirm.addEventListener('click', () => {
        if (estado.respondido) return;
        const valorEscolhido = Number(range.value);
        registrarResposta(valorEscolhido, (acertou) => {
            wrapper.dataset.state = acertou ? 'correct' : 'wrong';
            range.disabled = true;
            confirm.disabled = true;
            helper.textContent = acertou
                ? 'Excelente ajuste! Telemetria confirmada.'
                : `A leitura correta era ${estado.corretaAtual}.`;
            helper.dataset.state = acertou ? 'success' : 'error';
        });
    });

    wrapper.append(instruction, range, valueBadge, confirm, helper);
    optionsEl.appendChild(wrapper);
}

function renderMultiInputChallenge(problema, correta) {
    const form = document.createElement('form');
    form.className = 'multi-input-challenge';

    const grid = document.createElement('div');
    grid.className = 'multi-input-grid';

    const inputs = new Map();

    (problema.subquestoes || []).forEach((sub, idx) => {
        const field = document.createElement('div');
        field.className = 'multi-input-field';

        const label = document.createElement('label');
        const inputId = `multi-input-${estado.nivel}-${sub.id}`;
        label.setAttribute('for', inputId);
        label.innerHTML = `<span>${sub.label}</span>`;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = inputId;
        input.min = '0';
        input.step = '1';
        input.placeholder = 'Informe o valor';

        field.append(label, input);
        grid.appendChild(field);
        inputs.set(sub.id, input);
    });

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'btn secondary';
    submit.textContent = 'Transmitir resultados';

    const helper = document.createElement('small');
    helper.className = 'input-helper';

    form.append(grid, submit, helper);
    optionsEl.appendChild(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (estado.respondido) return;

        let valido = true;
        const resposta = {};

        inputs.forEach((input, chave) => {
            const raw = input.value.trim();
            if (raw === '') {
                valido = false;
                helper.textContent = 'Preencha todos os campos com números inteiros.';
                helper.dataset.state = 'error';
                return;
            }

            const valor = Number(raw);
            if (!Number.isInteger(valor) || !Number.isFinite(valor) || valor < 0) {
                valido = false;
                helper.textContent = 'Use apenas valores inteiros não negativos em cada campo.';
                helper.dataset.state = 'error';
                return;
            }

            resposta[chave] = valor;
        });

        if (!valido) {
            return;
        }

        helper.textContent = '';
        helper.dataset.state = '';

        registrarResposta(resposta, (acertou) => {
            form.dataset.state = acertou ? 'correct' : 'wrong';
            inputs.forEach((input) => {
                input.disabled = true;
            });
            submit.disabled = true;
            const corretaFormatada = formatarResultado(problema, correta);
            helper.textContent = acertou
                ? 'Excelente! O controle de missão confirmou todos os totais.'
                : `O controle aponta os totais corretos como ${corretaFormatada}.`;
            helper.dataset.state = acertou ? 'success' : 'error';
        });
    });
}

function registrarResposta(escolhido, onFinalize) {
    if (estado.respondido) return;

    const problema = PROBLEMAS[estado.nivel];
    const correta = estado.corretaAtual;
    const avaliador = typeof problema.avaliar === 'function' ? problema.avaliar : null;
    const acertou = avaliador ? avaliador(escolhido, correta) : escolhido === correta;

    const corretaFormatada = formatarResultado(problema, correta);
    const escolhidoFormatado = formatarResultado(problema, escolhido);

    if (acertou) {
        estado.score += 1;
        scoreEl.textContent = `${estado.score}`;
    }

    const mensagemErro = typeof problema.mensagemErro === 'function'
        ? problema.mensagemErro(correta, corretaFormatada)
        : problema.mensagemErro || `Ops! O controle de missão aponta que a resposta correta era ${corretaFormatada}.`;

    feedbackEl.textContent = acertou
        ? problema.mensagemAcerto || 'Acertou! A tripulação está pronta para a próxima órbita.'
        : mensagemErro;
    feedbackEl.className = `feedback ${acertou ? 'success' : 'error'}`;

    estado.respostas.push({
        correta: acertou,
        corretaValor: correta,
        corretaFormatada,
        escolhido,
        escolhidoFormatado
    });

    estado.respondido = true;
    btnNext.disabled = false;
    btnNext.textContent = estado.nivel + 1 === PROBLEMAS.length ? 'Abrir relatório final' : 'Próxima missão';

    if (typeof onFinalize === 'function') {
        onFinalize(acertou);
    }

    atualizarProgresso();
    atualizarPainelMissao();
}

function atualizarProgresso() {
    const progresso = (estado.nivel + (estado.respondido ? 1 : 0)) / PROBLEMAS.length;
    const percentual = Math.min(100, Math.max(0, progresso * 100));
    progressBar.style.width = `${percentual}%`;
}

function avancar() {
    if (estado.nivel + 1 >= PROBLEMAS.length) {
        finalizar();
    } else {
        estado.nivel += 1;
        carregarNivel();
    }
}

function finalizar() {
    finalScore.textContent = `${estado.score}`;
    summaryEl.innerHTML = '';

    const total = PROBLEMAS.length;
    const erros = Math.max(0, total - estado.score);

    let heading;
    let status;
    let statusTone = null;
    let resumo;

    if (erros >= LIMITES_ERROS.ABORTAR) {
        heading = 'Missão abortada';
        status = 'Os erros acumulados forçaram o cancelamento imediato da operação.';
        statusTone = 'danger';
        resumo = 'As falhas em série desestabilizaram o projeto. Reorganize a tripulação e tente novamente.';
    } else {
        switch (erros) {
            case 0:
                heading = 'Missão concluída com o maior sucesso!';
                status = 'Missão concluída com o maior sucesso. Controle aclama a precisão impecável da equipe.';
                statusTone = 'success';
                resumo = 'Você conduziu a expedição perfeita e elevou o prestígio da tripulação.';
                break;
            case LIMITES_ERROS.IMPRENSA:
                heading = 'Missão concluída sem o brilho da imprensa';
                status = 'Missão concluída, mas não foi um sucesso da imprensa. O deslize ficou estampado nos comunicados.';
                statusTone = 'warning';
                resumo = 'A equipe de comunicação já trabalha para recuperar a imagem da missão.';
                break;
            case LIMITES_ERROS.FINANCEIRO:
                heading = 'Missão concluída com perdas financeiras';
                status = 'Missão concluída, mas houve muita perda monetária para a empresa por causa dos incidentes.';
                statusTone = 'warning';
                resumo = 'Os analistas pedem medidas imediatas para conter os prejuízos.';
                break;
            case LIMITES_ERROS.FALHAS:
                heading = 'Missão concluída com algumas falhas';
                status = 'Missão concluída com algumas falhas registradas. Os relatórios técnicos indicam reparos urgentes.';
                statusTone = 'warning';
                resumo = 'O conselho recomenda reforçar os sistemas mais vulneráveis antes da próxima decolagem.';
                break;
            default:
                heading = 'Missão concluída';
                status = 'Missão concluída com ressalvas. Revise os relatórios antes da próxima expedição.';
                statusTone = 'warning';
                resumo = 'Reveja os procedimentos para eliminar as falhas residuais.';
                break;
        }
    }

    if (finalHeading) {
        finalHeading.textContent = heading;
    }

    if (finalStatus) {
        finalStatus.textContent = status;
        if (statusTone) {
            finalStatus.dataset.state = statusTone;
        } else {
            finalStatus.removeAttribute('data-state');
        }
    }

    if (finalCard) {
        if (erros >= LIMITES_ERROS.ABORTAR) {
            finalCard.dataset.result = 'fail';
        } else {
            finalCard.removeAttribute('data-result');
        }
    }

    if (finalVisualImg) {
        const visual = erros >= LIMITES_ERROS.ABORTAR ? FINAL_VISUAIS.fail : FINAL_VISUAIS.success;
        finalVisualImg.src = visual.src;
        finalVisualImg.alt = visual.alt;
    }

    const mensagem = document.createElement('p');
    mensagem.innerHTML = resumo;
    summaryEl.appendChild(mensagem);

    estado.respostas.forEach((resp, idx) => {
        const problema = PROBLEMAS[idx];
        const item = document.createElement('div');
        item.className = 'summary-item';
        item.dataset.result = resp.correta ? 'correct' : 'wrong';

        const nota = resp.correta
            ? problema.resumoAcerto || 'Excelente estratégia de missão.'
            : problema.explicacao || `Repare que a resposta correta era ${resp.corretaValor}.`;

        item.innerHTML = `
            <div class="summary-header">
                <strong>Missão ${idx + 1} – ${problema.dificuldade}</strong>
                <span>${problema.titulo}</span>
            </div>
            <div class="summary-body">
                <span>Você respondeu: <strong>${resp.escolhidoFormatado ?? resp.escolhido}</strong></span>
                <span>Resposta correta: <strong>${resp.corretaFormatada ?? resp.corretaValor}</strong></span>
                <span class="summary-note">${nota}</span>
            </div>
        `;

        summaryEl.appendChild(item);
    });

    progressBar.style.width = '100%';
    goTo(scrEnd);
}

// Listeners
btnStart.addEventListener('click', resetarJogo);
btnRestart.addEventListener('click', resetarJogo);
btnHow.addEventListener('click', () => goTo(scrHow));
btnBack.addEventListener('click', () => goTo(scrStart));
btnNext.addEventListener('click', avancar);

if (missionStatusBar) {
    const lidarComMarcador = (event) => {
        const marcador = event.target.closest('.mission-marker');
        if (!marcador) return;
        const idx = Number(marcador.dataset.index);
        if (Number.isInteger(idx)) {
            mostrarDetalhesMissao(idx);
        }
    };
    missionStatusBar.addEventListener('pointerover', lidarComMarcador);
    missionStatusBar.addEventListener('focusin', lidarComMarcador);
    missionStatusBar.addEventListener('click', lidarComMarcador);
    missionStatusBar.addEventListener('pointerleave', restaurarStatusGlobal);
    missionStatusBar.addEventListener('focusout', (event) => {
        if (!missionStatusBar.contains(event.relatedTarget)) {
            restaurarStatusGlobal();
        }
    });
}

// Mostrar tela inicial ao carregar
window.addEventListener('load', () => {
    goTo(scrStart);
});
