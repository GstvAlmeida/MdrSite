// Aguarda o carregamento completo do HTML antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE ABAS (para a página analise-risco.html) ---

    // Seleciona todos os elementos que são formulários de análise (com abas).
    const analysisForms = document.querySelectorAll('.analysis-form');
    // Seleciona todos os botões que alternam entre os formulários.
    const analysisButtons = document.querySelectorAll('.analysis-btn');

    /**
     * Mostra o formulário correspondente ao botão clicado e esconde os outros.
     */
    function mostrarFormulario(targetFormId) {
        // Se não houver botões de análise, não faz nada.
        if (analysisButtons.length === 0) return;

        analysisForms.forEach(form => form.classList.add('hidden'));
        analysisButtons.forEach(button => button.classList.remove('active'));

        const formToShow = document.getElementById(targetFormId);
        const buttonToActivate = document.querySelector(`[data-form-id="${targetFormId}"]`);
        
        if (formToShow) formToShow.classList.remove('hidden');
        if (buttonToActivate) buttonToActivate.classList.add('active');
    }

    // --- FUNÇÕES DE GERAÇÃO DE TEXTO ---

    function gerar_tarifa() {
        let texto = "";
        const fase = document.getElementById("fase_tarifa").value;
        const rastreioInicial = document.getElementById("rastreio_tarifa").value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA TARIFA (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando cobrança indevida de tarifa de pacote de serviços não contratada, com descontos recorrentes em sua conta bancária. Sustenta ausência de informação clara e prévia sobre a cobrança. Pleiteia restituição dos valores, correção monetária e indenização por danos morais. ";
        if (document.getElementById("contestacao_tarifa")?.checked) { texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_tarifa").value}), `; }
        if (document.getElementById("pericia_tarifa")?.checked) { texto += `Perícia realizada, constatando erro no valor da causa mencionado pela parte autora (${document.getElementById("rastreio_pericia_tarifa").value}). `; }
        if (document.getElementById("suspenso_tarifa")?.checked) { texto += `Processo suspenso com base no Tema ${document.getElementById("tema_tarifa").value}/STJ. Aguardando resolução para desenrolar da lide. (${document.getElementById("rastreio_suspenso_tarifa").value}). `; }
        else if (document.getElementById("nao_suspenso_tarifa")?.checked) { texto += "Processo segue em curso. "; }
        const sentenca = document.getElementById("sentenca_select_tarifa")?.value;
        if (sentenca) { texto += `Sentença proferida, sendo ${sentenca} (${document.getElementById("rastreio_sentenca_tarifa").value}). `; }
        else if (document.getElementById("sem_sentenca_tarifa")?.checked) { texto += "Ainda não houve sentença, aguardando julgamento de mérito. "; }
        if (document.getElementById("apelacao_tarifa")?.checked) { texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_tarifa").value}). `; }
        if (document.getElementById("contrarrazoes_tarifa")?.checked) { texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_tarifa").value}). `; }
        const acordao = document.getElementById("acordao_select_tarifa")?.value;
        if (acordao) { texto += `Acórdão, (${document.getElementById("rastreio_acordao_tarifa").value}). `; texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. "; }
        if (document.getElementById("embargos_tarifa")?.checked) { texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_tarifa").value}). `; }
        const pe = document.getElementById("pe_tarifa")?.value; if (pe) { texto += `Estabelece-se PE em ${pe}% tendo em vista jurisprudência favorável à parte autora, considerando demandas semelhantes. Caso o subsídio não seja robusto, há uma grande possibilidade de êxito por parte da autora. `; }
        const valor = document.getElementById("valor_tarifa")?.value; if (valor) { texto += `Valor da causa/pedido é de R$ ${valor}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `; }
        const pcond = document.getElementById("pcond_tarifa")?.value; if (pcond) { texto += `PCond estimado em R$ ${pcond}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `; }
        if (document.getElementById("procuracao_tarifa")?.checked) { texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_tarifa").value}). `; }
        document.getElementById("saida_tarifa").value = texto.trim();
    }

    function gerar_cartao() {
        let texto = "";
        const fase = document.getElementById("fase_cartao").value;
        const rastreioInicial = document.getElementById("rastreio_cartao").value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA COBRANÇA INDEVIDA (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando cobrança indevida em fatura de cartão de crédito, referente a serviços ou encargos não contratados. Sustenta ausência de informação clara e prévia sobre os lançamentos. Pleiteia restituição dos valores, correção monetária e indenização por danos morais. ";
        if (document.getElementById("contestacao_cartao")?.checked) { texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_cartao").value}), `; }
        if (document.getElementById("pericia_cartao")?.checked) { texto += `Perícia realizada, constatando erro no valor da causa mencionado pela parte autora (${document.getElementById("rastreio_pericia_cartao").value}). `; }
        if (document.getElementById("suspenso_cartao")?.checked) { texto += `Processo suspenso com base no Tema ${document.getElementById("tema_cartao").value}/STJ. Aguardando resolução para desenrolar da lide. (${document.getElementById("rastreio_suspenso_cartao").value}). `; }
        else if (document.getElementById("nao_suspenso_cartao")?.checked) { texto += "Processo segue em curso. "; }
        const sentenca = document.getElementById("sentenca_select_cartao")?.value;
        if (sentenca) { texto += `Sentença proferida, sendo ${sentenca} (${document.getElementById("rastreio_sentenca_cartao").value}). `; }
        else if (document.getElementById("sem_sentenca_cartao")?.checked) { texto += "Ainda não houve sentença, aguardando julgamento de mérito. "; }
        if (document.getElementById("apelacao_cartao")?.checked) { texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_cartao").value}). `; }
        if (document.getElementById("contrarrazoes_cartao")?.checked) { texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_cartao").value}). `; }
        const acordao = document.getElementById("acordao_select_cartao")?.value;
        if (acordao) { texto += `Acórdão, (${document.getElementById("rastreio_acordao_cartao").value}). `; texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. "; }
        if (document.getElementById("embargos_cartao")?.checked) { texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_cartao").value}). `; }
        const pe = document.getElementById("pe_cartao")?.value; if (pe) { texto += `Estabelece-se PE em ${pe}% tendo em vista jurisprudência favorável à parte autora, considerando demandas semelhantes. Caso o subsídio não seja robusto, há uma grande possibilidade de êxito por parte da autora. `; }
        const valor = document.getElementById("valor_cartao")?.value; if (valor) { texto += `Valor da causa/pedido é de R$ ${valor}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `; }
        const pcond = document.getElementById("pcond_cartao")?.value; if (pcond) { texto += `PCond estimado em R$ ${pcond}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `; }
        if (document.getElementById("procuracao_cartao")?.checked) { texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_cartao").value}). `; }
        document.getElementById("saida_cartao").value = texto.trim();
    }

    function gerar_pasep() {
        let texto = "";
        const fase = document.getElementById("fase_pasep").value;
        const rastreioInicial = document.getElementById("rastreio_pasep").value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA PASEP (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor alega desfalque e ausência de atualização monetária em conta vinculada ao PASEP, pleiteando recomposição do saldo, aplicação de índices de correção e indenização. ";
        if (document.getElementById("contestacao_pasep")?.checked) { texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_pasep").value}), `; }
        if (document.getElementById("pericia_pasep")?.checked) { texto += `Perícia realizada, constatando erro no valor da causa mencionado pela parte autora (${document.getElementById("rastreio_pericia_pasep").value}). `; }
        if (document.getElementById("suspenso_pasep")?.checked) { texto += `Processo suspenso com base no Tema ${document.getElementById("tema_pasep").value}/STJ. Aguardando resolução para desenrolar da lide. (${document.getElementById("rastreio_suspenso_pasep").value}). `; }
        else if (document.getElementById("nao_suspenso_pasep")?.checked) { texto += "Processo segue em curso. "; }
        const sentenca = document.getElementById("sentenca_select_pasep")?.value;
        if (sentenca) { texto += `Sentença proferida, sendo ${sentenca} (${document.getElementById("rastreio_sentenca_pasep").value}). `; }
        else if (document.getElementById("sem_sentenca_pasep")?.checked) { texto += "Ainda não houve sentença, aguardando julgamento de mérito. "; }
        if (document.getElementById("apelacao_pasep")?.checked) { texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_pasep").value}). `; }
        if (document.getElementById("contrarrazoes_pasep")?.checked) { texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_pasep").value}). `; }
        const acordao = document.getElementById("acordao_select_pasep")?.value;
        if (acordao) { texto += `Acórdão, (${document.getElementById("rastreio_acordao_pasep").value}). `; texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. "; }
        if (document.getElementById("embargos_pasep")?.checked) { texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_pasep").value}). `; }
        const pe = document.getElementById("pe_pasep")?.value; if (pe) { texto += `Estabelece-se PE em ${pe}% tendo em vista a ausência de provas técnicas e a jurisprudência favorável ao Banco em casos semelhantes. `; }
        const valor = document.getElementById("valor_pasep")?.value; if (valor) { texto += `Valor da causa/pedido é de R$ ${valor}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `; }
        const pcond = document.getElementById("pcond_pasep")?.value; if (pcond) { texto += `PCond estimado em R$ ${pcond}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `; }
        if (document.getElementById("procuracao_pasep")?.checked) { texto += `Processo com procuração já juntada aos autos (${document.getElementById("rastreio_procuracao_pasep").value}). `; }
        document.getElementById("saida_pasep").value = texto.trim();
    }
    
    function gerarAnaliseSuper() {
    let texto = "";

    // 1. Coleta os valores dos campos principais
    const rastreio = document.getElementById("rastreio_sup").value;
    const fase = document.getElementById("fase_sup").value;
    const tema = document.getElementById("tema_sup").value;

    // 2. Monta o cabeçalho e a introdução da análise
    texto += `BB RÉU – AÇÃO DE REPACTUAÇÃO (SUPERENDIVIDAMENTO) (${rastreio}) – FASE DE ${fase.toUpperCase()} – `;
    texto += "Autor, com base na Lei do Superendividamento (Lei 14.181/2021), ajuíza ação pleiteando a instauração de processo de repactuação de dívidas. Alega que a totalidade de seus débitos compromete seu mínimo existencial e busca a elaboração de um plano de pagamento consolidado que inclua todas as suas dívidas com a instituição. ";

    // 3. Adiciona textos com base nos checkboxes, incluindo os rastreios
    if (document.getElementById("contestacao_sup")?.checked) {
        texto += `Contestação apresentada pelo Banco (${document.getElementById("rastreio_contestacao_sup").value}), arguindo os requisitos legais para a repactuação. `;
    } else if (document.getElementById("sem_contestacao_sup")?.checked) {
        texto += "Ainda não houve apresentação de contestação pelo Banco. ";
    }

    if (document.getElementById("pericia_sup")?.checked) {
        texto += `Perícia contábil realizada (${document.getElementById("rastreio_pericia_sup").value}) para apurar o montante da dívida. `;
    }

    if (document.getElementById("suspenso_sup")?.checked) {
        texto += `Processo suspenso com base no Tema ${tema}/STJ (${document.getElementById("rastreio_suspenso_sup").value}). `;
    } else if (document.getElementById("nao_suspenso_sup")?.checked) {
        texto += "Processo segue em curso regular. ";
    }

    // 4. Lógica aprimorada para Sentença, considerando o checkbox "sem sentença"
    const sentenca = document.getElementById("sentenca_select_sup")?.value;
    if (sentenca) {
        texto += `Sentença proferida, julgando o pedido ${sentenca} (${document.getElementById("rastreio_sentenca_sup").value}). `;
    } else if (document.getElementById("sem_sentenca_sup")?.checked) {
        texto += "Ainda não houve sentença, aguardando audiência conciliatória ou julgamento. ";
    }
    
    // 5. Continua adicionando textos para as fases recursais
    if (document.getElementById("apelacao_sup")?.checked) {
        texto += `Apelação interposta (${document.getElementById("rastreio_apelacao_sup").value}). `;
    }
    if (document.getElementById("contrarrazoes_sup")?.checked) {
        texto += `Contrarrazões apresentadas (${document.getElementById("rastreio_contrarrazoes_sup").value}). `;
    }

    const acordao = document.getElementById("acordao_select_sup")?.value;
    if (acordao) {
        texto += `Acórdão proferido (${document.getElementById("rastreio_acordao_sup").value}), `;
        texto += acordao === "procedente" ? "reformando a sentença para aprovar o plano de pagamento. " : "mantendo a decisão de primeira instância. ";
    }

    if (document.getElementById("embargos_sup")?.checked) {
        texto += `Foram opostos embargos de declaração (${document.getElementById("rastreio_embargos_sup").value}), pendentes de análise. `;
    }
    
    // 6. Adiciona as informações financeiras
    const pe = document.getElementById("pe_sup")?.value;
    if (pe) {
        texto += `PE fixado em ${pe}% devido à natureza conciliatória do processo e à necessidade de apresentação de plano de pagamento. `;
    }
    const valor = document.getElementById("valor_sup")?.value;
    if (valor) {
        texto += `O valor consolidado das dívidas apontado na inicial é de R$ ${valor}. `;
    }
    const pcond = document.getElementById("pcond_sup")?.value;
    if (pcond) {
        texto += `PCond estimado em R$ ${pcond}, considerando os custos processuais e a baixa probabilidade de condenação em honorários em caso de acordo. `;
    }

    if (document.getElementById("procuracao_sup")?.checked) {
        texto += `Procuração e documentos de representação devidamente juntados aos autos (${document.getElementById("rastreio_procuracao_sup").value}). `;
    }
    
    // 7. Coloca o texto final no campo de saída
    document.getElementById("saida_super").value = texto.trim();
}

    // --- FUNÇÕES DE UTILIDADE (Copiar, Exportar, Salvar) ---

    function copiarTexto(elementId) {
        const textarea = document.getElementById(elementId);
        if (!textarea.value) { alert("Não há nada para copiar."); return; }
        textarea.select();
        document.execCommand('copy');
        alert("Análise copiada para a área de transferência!");
    }

    function exportarTXT(elementId) {
        const texto = document.getElementById(elementId).value;
        if (!texto) { alert("Não há nada para exportar."); return; }
        const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.download = "analise_risco.txt";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
    
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw35I2xNrJLXDmBAffoG2EGqOkIOFteB1dv5bRMaF-MgUl6vUd6BthwjP1hEG9QkuvD/exec';

    async function sendDataToSheet(analysisType, generatedContent) {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const payload = { ip: ipData.ip, analysisType, generatedContent };
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST', mode: 'no-cors', cache: 'no-cache', redirect: 'follow',
                headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
            });
            console.log("Dados enviados para a Planilha Google.");
        } catch (error) {
            console.error("Erro ao enviar dados para a Planilha Google:", error);
        }
    }

    function salvarHistorico(sourceId, historyId) {
        const atual = document.getElementById(sourceId).value;
        const historico = document.getElementById(historyId);
        if (atual) {
            const separador = "\n\n------------------------------------\n\n";
            historico.value = historico.value ? atual + separador + historico.value : atual;
            alert("Análise salva no histórico!");
            let analysisType = 'Desconhecido';
            if (sourceId.includes('tarifa')) { analysisType = 'Tarifa'; }
            else if (sourceId.includes('cartao')) { analysisType = 'Cobrança Indevida'; }
            else if (sourceId.includes('pasep')) { analysisType = 'PASEP'; }
            else if (sourceId.includes('super')) { analysisType = 'Superendividamento'; }
            sendDataToSheet(analysisType, atual);
        } else {
            alert("Nada para salvar. Gere uma análise primeiro.");
        }
    }

    // --- CONFIGURAÇÃO DOS EVENTOS (EVENT LISTENERS) ---

    // 1. Configura os botões de troca de abas (analise-risco.html)
    analysisButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            mostrarFormulario(e.currentTarget.dataset.formId);
        });
    });

    // 2. Configura os botões de "Gerar" para cada formulário específico
    document.getElementById('btn_gerar_tarifa')?.addEventListener('click', gerar_tarifa);
    document.getElementById('btn_gerar_cartao')?.addEventListener('click', gerar_cartao);
    document.getElementById('btn_gerar_pasep')?.addEventListener('click', gerar_pasep);
    document.getElementById('btn_gerar_super')?.addEventListener('click', gerarAnaliseSuper);

    // 3. Configura os botões de utilidade (copiar, exportar, salvar)
    document.querySelectorAll('.btn_copiar').forEach(button => {
        button.addEventListener('click', (e) => copiarTexto(e.currentTarget.dataset.target));
    });
    document.querySelectorAll('.btn_exportar').forEach(button => {
        button.addEventListener('click', (e) => exportarTXT(e.currentTarget.dataset.target));
    });
    document.querySelectorAll('.btn_salvar').forEach(button => {
        button.addEventListener('click', (e) => salvarHistorico(e.currentTarget.dataset.target, e.currentTarget.dataset.history));
    });

    // --- INICIALIZAÇÃO ---

    // Se estiver na página de análise de risco, exibe o primeiro formulário ("Tarifa") como padrão.
    mostrarFormulario('tarifa-form');
});