document.addEventListener('DOMContentLoaded', () => {

    // Gerencia a troca de formulários na página de Análise de Risco.
    const analysisForms = document.querySelectorAll('.analysis-form');
    const analysisButtons = document.querySelectorAll('.analysis-btn');

    function mostrarFormulario(targetFormId) {
        if (analysisButtons.length === 0) return;
        analysisForms.forEach(form => form.classList.add('hidden'));
        analysisButtons.forEach(button => button.classList.remove('active'));
        const formToShow = document.getElementById(targetFormId);
        const buttonToActivate = document.querySelector(`[data-form-id="${targetFormId}"]`);
        if (formToShow) formToShow.classList.remove('hidden');
        if (buttonToActivate) buttonToActivate.classList.add('active');
    }


    /* --- MÁSCARA MONETÁRIA (IMask.js) --- */
    
    const maskedInputs = {};
    const currencyMaskOptions = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        radix: ',',
        mapToRadix: ['.'],
        min: 0,
    };

    function applyCurrencyMask(elementId) {
        const inputElement = document.getElementById(elementId);
        if (inputElement) {
            maskedInputs[elementId] = IMask(inputElement, currencyMaskOptions);
        }
    }

    applyCurrencyMask('valor_tarifa');
    applyCurrencyMask('pcond_tarifa');
    applyCurrencyMask('valor_cartao');
    applyCurrencyMask('pcond_cartao');
    applyCurrencyMask('valor_pasep');
    applyCurrencyMask('pcond_pasep');
    applyCurrencyMask('valor_sup');
    applyCurrencyMask('pcond_sup');
    applyCurrencyMask('valor_seg');
    applyCurrencyMask('pcond_seg');
    applyCurrencyMask('valor_golpe');
    applyCurrencyMask('pcond_golpe');
    applyCurrencyMask('valor_vicios');
    applyCurrencyMask('pcond_vicios');

    
    // Bloqueia caracteres inválidos (e, +, -, .) nos campos de número.
    const peInputs = document.querySelectorAll('.num-input');
    peInputs.forEach(input => {
        input.addEventListener('keydown', (event) => {
            if (['e', 'E', '+', '-', ',', '.'].includes(event.key)) {
                event.preventDefault();
            }
        });
    });

    // Torna todos os campos de histórico apenas para leitura.
    document.querySelectorAll('textarea[id^="historico_"]').forEach(textarea => {
        textarea.readOnly = true;
    });


    /* --- FUNÇÕES DE GERAÇÃO DE TEXTO --- */

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
        const valor = maskedInputs['valor_tarifa']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `Valor da causa/pedido é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `; }
        const pcond = maskedInputs['pcond_tarifa']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `; }
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
        const valor = maskedInputs['valor_cartao']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `Valor da causa/pedido é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `; }
        const pcond = maskedInputs['pcond_cartao']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `; }
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
        const valor = maskedInputs['valor_pasep']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `Valor da causa/pedido é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `; }
        const pcond = maskedInputs['pcond_pasep']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `; }
        if (document.getElementById("procuracao_pasep")?.checked) { texto += `Processo com procuração já juntada aos autos (${document.getElementById("rastreio_procuracao_pasep").value}). `; }
        document.getElementById("saida_pasep").value = texto.trim();
    }
    
    function gerarAnaliseSuper() {
        let texto = "";
        const rastreio = document.getElementById("rastreio_sup").value;
        const fase = document.getElementById("fase_sup").value;
        const tema = document.getElementById("tema_sup").value;
        texto += `BB RÉU – AÇÃO DE REPACTUAÇÃO (SUPERENDIVIDAMENTO) (${rastreio}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor, com base na Lei do Superendividamento (Lei 14.181/2021), ajuíza ação pleiteando a instauração de processo de repactuação de dívidas. Alega que a totalidade de seus débitos compromete seu mínimo existencial e busca a elaboração de um plano de pagamento consolidado que inclua todas as suas dívidas com a instituição. ";
        if (document.getElementById("contestacao_sup")?.checked) { texto += `Contestação apresentada pelo Banco (${document.getElementById("rastreio_contestacao_sup").value}), arguindo os requisitos legais para a repactuação. `; }
        else if (document.getElementById("sem_contestacao_sup")?.checked) { texto += "Ainda não houve apresentação de contestação pelo Banco. "; }
        if (document.getElementById("pericia_sup")?.checked) { texto += `Perícia contábil realizada (${document.getElementById("rastreio_pericia_sup").value}) para apurar o montante da dívida. `; }
        if (document.getElementById("suspenso_sup")?.checked) { texto += `Processo suspenso com base no Tema ${tema}/STJ (${document.getElementById("rastreio_suspenso_sup").value}). `; }
        else if (document.getElementById("nao_suspenso_sup")?.checked) { texto += "Processo segue em curso regular. "; }
        const sentenca = document.getElementById("sentenca_select_sup")?.value;
        if (sentenca) { texto += `Sentença proferida, julgando o pedido ${sentenca} (${document.getElementById("rastreio_sentenca_sup").value}). `; }
        else if (document.getElementById("sem_sentenca_sup")?.checked) { texto += "Ainda não houve sentença, aguardando audiência conciliatória ou julgamento. "; }
        if (document.getElementById("apelacao_sup")?.checked) { texto += `Apelação interposta (${document.getElementById("rastreio_apelacao_sup").value}). `; }
        if (document.getElementById("contrarrazoes_sup")?.checked) { texto += `Contrarrazões apresentadas (${document.getElementById("rastreio_contrarrazoes_sup").value}). `; }
        const acordao = document.getElementById("acordao_select_sup")?.value;
        if (acordao) { texto += `Acórdão proferido (${document.getElementById("rastreio_acordao_sup").value}), `; texto += acordao === "procedente" ? "reformando a sentença para aprovar o plano de pagamento. " : "mantendo a decisão de primeira instância. "; }
        if (document.getElementById("embargos_sup")?.checked) { texto += `Foram opostos embargos de declaração (${document.getElementById("rastreio_embargos_sup").value}), pendentes de análise. `; }
        const pe = document.getElementById("pe_sup")?.value; if (pe) { texto += `PE fixado em ${pe}% devido à natureza conciliatória do processo e à necessidade de apresentação de plano de pagamento. `; }
        const valor = maskedInputs['valor_sup']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `O valor consolidado das dívidas apontado na inicial é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. `; }
        const pcond = maskedInputs['pcond_sup']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, considerando os custos processuais e a baixa probabilidade de condenação em honorários em caso de acordo. `; }
        if (document.getElementById("procuracao_sup")?.checked) { texto += `Procuração e documentos de representação devidamente juntados aos autos (${document.getElementById("rastreio_procuracao_sup").value}). `; }
        document.getElementById("saida_super").value = texto.trim();
    }
    
    function gerar_seguro() {
        let texto = "";
        const rastreioInicial = document.getElementById("rastreio_seg")?.value;
        const fase = document.getElementById("fase_seg")?.value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA DE SEGURO PRESTAMISTA (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando contratação indevida de seguro prestamista vinculado ao contrato de empréstimo, sem consentimento ou informação clara. Sustenta que a cobrança configura venda casada, prática abusiva vedada pelo CDC. Pleiteia devolução dos valores, correção monetária e indenização por danos morais. ";
        if (document.getElementById("contestacao_seg")?.checked) { texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_seg").value}). `; }
        else if (document.getElementById("sem_contestacao_seg")?.checked) { texto += "Processo distribuído, sem contestação apresentada, pendente de decisão judicial. "; }
        if (document.getElementById("suspenso_seg")?.checked) { texto += `Processo suspenso por decisão judicial. (${document.getElementById("rastreio_suspenso_seg").value}). `; }
        else if (document.getElementById("nao_suspenso_seg")?.checked) { texto += "Processo segue em curso. "; }
        const sentenca = document.getElementById("sentenca_select_seg")?.value;
        if (sentenca) { texto += `Sentença proferida, sendo ${sentenca}. (${document.getElementById("rastreio_sentenca_seg").value}). `; }
        else if (document.getElementById("sem_sentenca_seg")?.checked) { texto += "Ainda não houve sentença. "; }
        if (document.getElementById("apelacao_seg")?.checked) { texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_seg").value}). `; }
        if (document.getElementById("contrarrazoes_seg")?.checked) { texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_seg").value}). `; }
        const acordao = document.getElementById("acordao_select_seg")?.value;
        if (acordao) { texto += `Acórdão, (${document.getElementById("rastreio_acordao_seg").value}). `; texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. "; }
        const pe = document.getElementById("pe_seg")?.value; if (pe) { texto += `Estabelece-se PE em ${pe}% tendo em vista jurisprudência favorável a parte autora em razão de ausência expressiva de consetimento na aderência ao seguro. `; }
        const valor = maskedInputs['valor_seg']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `Valor do pedido é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base nos valores pagos pelo seguro e eventual pedido de dano moral. `; }
        const pcond = maskedInputs['pcond_seg']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, considerando precedentes locais para ações com similar objeto . `; }
        if (document.getElementById("embargos_seg")?.checked) { texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_seg").value}). `; }
        if (document.getElementById("procuracao_seg")?.checked) { texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_seg").value}). `; }
        document.getElementById("saida_seguro").value = texto.trim();
    }

    function gerar_golpe() {
        let texto = "";
        const rastreioInicial = document.getElementById("rastreio_golpe")?.value;
        const fase = document.getElementById("fase_golpe")?.value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA POR TRANSFERÊNCIA NÃO RECONHECIDA (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando ter sido vítima de golpe, com realização de transferência bancária não autorizada via aplicativo ou canal eletrônico do Banco do Brasil. Sustenta que houve falha na segurança do sistema e ausência de mecanismos de proteção da instituição financeira. Pleiteia restituição do valor transferido e indenização por danos morais. ";
        if (document.getElementById("contestacao_golpe")?.checked) { texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_golpe").value}). `; }
        else if (document.getElementById("sem_contestacao_golpe")?.checked) { texto += "Processo distribuído, sem contestação apresentada, pendente de decisão judicial. "; }
        if (document.getElementById("suspenso_golpe")?.checked) { texto += `Processo suspenso por decisão judicial. (${document.getElementById("rastreio_suspenso_golpe").value}). `; }
        else if (document.getElementById("nao_suspenso_golpe")?.checked) { texto += "Processo segue em curso. "; }
        const sentenca = document.getElementById("sentenca_select_golpe")?.value;
        if (sentenca) { texto += `Sentença proferida, sendo ${sentenca}. (${document.getElementById("rastreio_sentenca_golpe").value}). `; }
        else if (document.getElementById("sem_sentenca_golpe")?.checked) { texto += "Ainda não houve sentença. "; }
        if (document.getElementById("apelacao_golpe")?.checked) { texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_golpe").value}). `; }
        if (document.getElementById("contrarrazoes_golpe")?.checked) { texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_golpe").value}). `; }
        const acordao = document.getElementById("acordao_select_golpe")?.value;
        if (acordao) { texto += `Acórdão, (${document.getElementById("rastreio_acordao_golpe").value}). `; texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. "; }
        const pe = document.getElementById("pe_golpe")?.value; if (pe) { texto += `Estabelece-se PE em ${pe}% tendo em vista a análise do caso concreto, a robustez da prova da parte autora quanto à fraude e a linha jurisprudencial majoritária sobre responsabilidade objetiva mitigada em casos de golpe praticado por engenharia social, com atuação decisiva do consumidor. `; }
        const valor = maskedInputs['valor_golpe']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `Valor do pedido é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, considerando o valor da transferência impugnada e eventual dano moral postulado. `; }
        const pcond = maskedInputs['pcond_golpe']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, conforme precedentes locais, grau de instrução da parte autora e eventual identificação de culpa exclusiva da vítima. `; }
        if (document.getElementById("embargos_golpe")?.checked) { texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_golpe").value}). `; }
        if (document.getElementById("procuracao_golpe")?.checked) { texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_golpe").value}). `; }
        document.getElementById("saida_golpe").value = texto.trim();
    }

    function gerar_vicios() {
        let texto = "";
        const rastreioInicial = document.getElementById("rastreio_vicios")?.value;
        const fase = document.getElementById("fase_vicios")?.value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA DE VÍCIOS CONSTRUTIVOS (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando a existência de vícios construtivos no imóvel adquirido por meio de financiamento habitacional, incluindo infiltrações, rachaduras e falhas estruturais. Sustenta que os defeitos comprometem a habitabilidade e segurança do bem. Pleiteia reparação dos danos materiais, morais e eventual abatimento do valor financiado. ";
        if (document.getElementById("contestacao_vicios")?.checked) { texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_vicios").value}). `; }
        else if (document.getElementById("sem_contestacao_vicios")?.checked) { texto += "Processo distribuído, sem contestação apresentada, pendente de decisão judicial. "; }
        if (document.getElementById("suspenso_vicios")?.checked) { texto += `Processo suspenso por decisão judicial. (${document.getElementById("rastreio_suspenso_vicios").value}). `; }
        else if (document.getElementById("nao_suspenso_vicios")?.checked) { texto += "Processo segue em curso. "; }
        const sentenca = document.getElementById("sentenca_select_vicios")?.value;
        if (sentenca) { texto += `Sentença proferida, sendo ${sentenca}. (${document.getElementById("rastreio_sentenca_vicios").value}). `; }
        else if (document.getElementById("sem_sentenca_vicios")?.checked) { texto += "Ainda não houve sentença. "; }
        if (document.getElementById("apelacao_vicios")?.checked) { texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_vicios").value}). `; }
        if (document.getElementById("contrarrazoes_vicios")?.checked) { texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_vicios").value}). `; }
        const acordao = document.getElementById("acordao_select_vicios")?.value;
        if (acordao) { texto += `Acórdão, (${document.getElementById("rastreio_acordao_vicios").value}). `; texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. "; }
        const pe = document.getElementById("pe_vicios")?.value;
        if (pe) { texto += `Estabelece-se PE em ${pe}% tendo em vista a vinculação contractual entre as partes, a responsabilização subsidiária do agente financeiro e a necessidade de perícia para comprovação da origem e gravidade dos vícios apontados. `; }
        const valor = maskedInputs['valor_vicios']?.typedValue;
        if (valor !== undefined && !isNaN(valor)) { texto += `Valor do pedido é de R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, com base no custo estimado de reparo, eventual abatimento contratual e danos morais pleiteados. `; }
        const pcond = maskedInputs['pcond_vicios']?.typedValue;
        if (pcond !== undefined && !isNaN(pcond)) { texto += `PCond estimado em R$ ${pcond.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, considerando o entendimento jurisprudencial que diferencia obrigações do banco e da construtora no contrato de financiamento habitacional. `; }
        if (document.getElementById("embargos_vicios")?.checked) { texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_vicios").value}). `; }
        if (document.getElementById("procuracao_vicios")?.checked) { texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_vicios").value}). `; }
        document.getElementById("saida_vicios").value = texto.trim();
    }


    /* --- FUNÇÕES DE AÇÃO DOS BOTÕES --- */
    
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
    
    // Envia a análise para uma Planilha Google.
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw35I2xNrJLXDmBAffoG2EGqOkIOFteB1dv5bRMaF-MgUl6vUd6BthwjP1hEG9QkuvD/exec';
    async function sendDataToSheet(analysisType, generatedContent) {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const payload = { ip: ipData.ip, analysisType, generatedContent };
            
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                redirect: 'follow',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log("Dados enviados para a Planilha Google.");
        } catch (error) {
            console.error("Erro ao enviar dados para a Planilha Google:", error);
        }
    }

    // Salva a análise no histórico local, dispara o envio para a planilha e muda para a aba de histórico.
    function salvarHistorico(sourceId, historyId) {
        const sourceTextarea = document.getElementById(sourceId);
        if (!sourceTextarea) return;

        const currentPanel = sourceTextarea.closest('.results-panel');
        if (!currentPanel) return;

        const historicoTextarea = document.getElementById(historyId);
        const atual = sourceTextarea.value;

        if (atual && historicoTextarea) {
            const separador = "\n\n------------------------------------\n\n";
            historicoTextarea.value = historicoTextarea.value ? atual + separador + historicoTextarea.value : atual;
            alert("Análise salva no histórico!");

            // Muda para a aba de histórico no painel correto.
            const analysisTabButton = currentPanel.querySelector('.tab-btn[data-tab="analise"]');
            const historyTabButton = currentPanel.querySelector('.tab-btn[data-tab="historico"]');
            const analysisPane = sourceTextarea.closest('.tab-pane');
            const historyPane = historicoTextarea.closest('.tab-pane');
            const actionButtons = currentPanel.querySelector('.action-buttons');
            
            if (analysisTabButton) analysisTabButton.classList.remove('active');
            if (analysisPane) analysisPane.classList.remove('active');
            if (historyTabButton) historyTabButton.classList.add('active');
            if (historyPane) historyPane.classList.add('active');
            if (actionButtons) actionButtons.style.display = 'none';

            let analysisType = 'Desconhecido';
            if (sourceId.includes('tarifa')) { analysisType = 'Tarifa'; }
            else if (sourceId.includes('cartao')) { analysisType = 'Cobrança Indevida'; }
            else if (sourceId.includes('pasep')) { analysisType = 'PASEP'; }
            else if (sourceId.includes('super')) { analysisType = 'Superendividamento'; }
            else if (sourceId.includes('seguro')) { analysisType = 'Seguro Prestamista'; }
            else if (sourceId.includes('golpe')) { analysisType = 'Golpe'; }
            else if (sourceId.includes('vicios')) { analysisType = 'Vícios Construtivos'; }
            
            sendDataToSheet(analysisType, atual);
        } else {
            alert("Nada para salvar. Gere uma análise primeiro.");
        }
    }


    /* --- EVENT LISTENERS --- */

    analysisButtons.forEach(button => {
        button.addEventListener('click', (e) => mostrarFormulario(e.currentTarget.dataset.formId));
    });

    document.getElementById('btn_gerar_tarifa')?.addEventListener('click', gerar_tarifa);
    document.getElementById('btn_gerar_cartao')?.addEventListener('click', gerar_cartao);
    document.getElementById('btn_gerar_pasep')?.addEventListener('click', gerar_pasep);
    document.getElementById('btn_gerar_super')?.addEventListener('click', gerarAnaliseSuper);
    document.getElementById('btn_gerar_seguro')?.addEventListener('click', gerar_seguro);
    document.getElementById('btn_gerar_golpe')?.addEventListener('click', gerar_golpe);
    document.getElementById('btn_gerar_vicios')?.addEventListener('click', gerar_vicios);

    document.querySelectorAll('.btn_copiar').forEach(button => {
        button.addEventListener('click', (e) => copiarTexto(e.currentTarget.dataset.target));
    });
    document.querySelectorAll('.btn_exportar').forEach(button => {
        button.addEventListener('click', (e) => exportarTXT(e.currentTarget.dataset.target));
    });
    document.querySelectorAll('.btn_salvar').forEach(button => {
        button.addEventListener('click', (e) => salvarHistorico(e.currentTarget.dataset.target, e.currentTarget.dataset.history));
    });

    
    /* --- LÓGICA DAS ABAS DE RESULTADO --- */

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentPanel = this.closest('.results-panel');
            if (!currentPanel) return;

            const localTabs = currentPanel.querySelectorAll('.tab-btn');
            const localPanes = currentPanel.querySelectorAll('.tab-pane');
            const localActionButtons = currentPanel.querySelector('.action-buttons');

            localTabs.forEach(btn => btn.classList.remove('active'));
            localPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            const targetPaneId = `tab-${this.getAttribute('data-tab')}`;
            const targetPane = currentPanel.querySelector(`#${targetPaneId}`);

            if (targetPane) {
                targetPane.classList.add('active');
            }

            if (this.getAttribute('data-tab') === 'historico') {
                if(localActionButtons) localActionButtons.style.display = 'none';
            } else {
                if(localActionButtons) localActionButtons.style.display = 'flex';
            }
        });
    });

});