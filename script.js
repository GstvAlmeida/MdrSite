document.addEventListener('DOMContentLoaded', () => {

    const analysisForms = document.querySelectorAll('.analysis-form');
    const analysisButtons = document.querySelectorAll('.analysis-btn');

    // --- FUNÇÕES DE GERAÇÃO (LÓGICA ORIGINAL RESTAURADA) ---
    function gerar_tarifa() {
        let texto = "";
        const fase = document.getElementById("fase_tarifa").value;
        const rastreioInicial = document.getElementById("rastreio_tarifa").value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA TARIFA (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando cobrança indevida de tarifa de pacote de serviços não contratada, com descontos recorrentes em sua conta bancária. Sustenta ausência de informação clara e prévia sobre a cobrança. Pleiteia restituição dos valores, correção monetária e indenização por danos morais. ";
        if (document.getElementById("contestacao_tarifa")?.checked) {
            texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_tarifa").value}), `;
        }
        if (document.getElementById("pericia_tarifa")?.checked) {
            texto += `Perícia realizada, constatando erro no valor da causa mencionado pela parte autora (${document.getElementById("rastreio_pericia_tarifa").value}). `;
        }
        if (document.getElementById("suspenso_tarifa")?.checked) {
            texto += `Processo suspenso com base no Tema ${document.getElementById("tema_tarifa").value}/STJ. Aguardando resolução para desenrolar da lide. (${document.getElementById("rastreio_suspenso_tarifa").value}). `;
        } else if (document.getElementById("nao_suspenso_tarifa")?.checked) {
            texto += "Processo segue em curso. ";
        }
        const sentenca = document.getElementById("sentenca_select_tarifa")?.value;
        if (sentenca) {
            texto += `Sentença proferida, sendo ${sentenca} (${document.getElementById("rastreio_sentenca_tarifa").value}). `;
        } else if (document.getElementById("sem_sentenca_tarifa")?.checked) {
            texto += "Ainda não houve sentença, aguardando julgamento de mérito. ";
        }
        if (document.getElementById("apelacao_tarifa")?.checked) {
            texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_tarifa").value}). `;
        }
        if (document.getElementById("contrarrazoes_tarifa")?.checked) {
            texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_tarifa").value}). `;
        }
        const acordao = document.getElementById("acordao_select_tarifa")?.value;
        if (acordao) {
            texto += `Acórdão, (${document.getElementById("rastreio_acordao_tarifa").value}). `;
            texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. ";
        }
        if (document.getElementById("embargos_tarifa")?.checked) {
            texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_tarifa").value}). `;
        }
        const pe = document.getElementById("pe_tarifa")?.value;
        if (pe) {
            texto += `Estabelece-se PE em ${pe}% tendo em vista jurisprudência favorável à parte autora, considerando demandas semelhantes. Caso o subsídio não seja robusto, há uma grande possibilidade de êxito por parte da autora. `;
        }
        const valor = document.getElementById("valor_tarifa")?.value;
        if (valor) {
            texto += `Valor da causa/pedido é de R$ ${valor}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `;
        }
        const pcond = document.getElementById("pcond_tarifa")?.value;
        if (pcond) {
            texto += `PCond estimado em R$ ${pcond}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `;
        }
        if (document.getElementById("procuracao_tarifa")?.checked) {
            texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_tarifa").value}). `;
        }
        document.getElementById("saida_tarifa").value = texto.trim();
    }

    function gerar_cartao() {
        let texto = "";
        const fase = document.getElementById("fase_cartao").value;
        const rastreioInicial = document.getElementById("rastreio_cartao").value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA COBRANÇA INDEVIDA (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor ajuíza ação alegando cobrança indevida em fatura de cartão de crédito, referente a serviços ou encargos não contratados. Sustenta ausência de informação clara e prévia sobre os lançamentos. Pleiteia restituição dos valores, correção monetária e indenização por danos morais. ";
        if (document.getElementById("contestacao_cartao")?.checked) {
            texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_cartao").value}), `;
        }
        if (document.getElementById("pericia_cartao")?.checked) {
            texto += `Perícia realizada, constatando erro no valor da causa mencionado pela parte autora (${document.getElementById("rastreio_pericia_cartao").value}). `;
        }
        if (document.getElementById("suspenso_cartao")?.checked) {
            texto += `Processo suspenso com base no Tema ${document.getElementById("tema_cartao").value}/STJ. Aguardando resolução para desenrolar da lide. (${document.getElementById("rastreio_suspenso_cartao").value}). `;
        } else if (document.getElementById("nao_suspenso_cartao")?.checked) {
            texto += "Processo segue em curso. ";
        }
        const sentenca = document.getElementById("sentenca_select_cartao")?.value;
        if (sentenca) {
            texto += `Sentença proferida, sendo ${sentenca} (${document.getElementById("rastreio_sentenca_cartao").value}). `;
        } else if (document.getElementById("sem_sentenca_cartao")?.checked) {
            texto += "Ainda não houve sentença, aguardando julgamento de mérito. ";
        }
        if (document.getElementById("apelacao_cartao")?.checked) {
            texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_cartao").value}). `;
        }
        if (document.getElementById("contrarrazoes_cartao")?.checked) {
            texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_cartao").value}). `;
        }
        const acordao = document.getElementById("acordao_select_cartao")?.value;
        if (acordao) {
            texto += `Acórdão, (${document.getElementById("rastreio_acordao_cartao").value}). `;
            texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. ";
        }
        if (document.getElementById("embargos_cartao")?.checked) {
            texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_cartao").value}). `;
        }
        const pe = document.getElementById("pe_cartao")?.value;
        if (pe) {
            texto += `Estabelece-se PE em ${pe}% tendo em vista jurisprudência favorável à parte autora, considerando demandas semelhantes. Caso o subsídio não seja robusto, há uma grande possibilidade de êxito por parte da autora. `;
        }
        const valor = document.getElementById("valor_cartao")?.value;
        if (valor) {
            texto += `Valor da causa/pedido é de R$ ${valor}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `;
        }
        const pcond = document.getElementById("pcond_cartao")?.value;
        if (pcond) {
            texto += `PCond estimado em R$ ${pcond}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `;
        }
        if (document.getElementById("procuracao_cartao")?.checked) {
            texto += `Procuração juntada aos autos (${document.getElementById("rastreio_procuracao_cartao").value}). `;
        }
        document.getElementById("saida_cartao").value = texto.trim();
    }

    function gerar_pasep() {
        let texto = "";
        const fase = document.getElementById("fase_pasep").value;
        const rastreioInicial = document.getElementById("rastreio_pasep").value;
        texto += `BB RÉU – AÇÃO INDENIZATÓRIA PASEP (${rastreioInicial}) – FASE DE ${fase.toUpperCase()} – `;
        texto += "Autor alega desfalque e ausência de atualização monetária em conta vinculada ao PASEP, pleiteando recomposição do saldo, aplicação de índices de correção e indenização. ";
        if (document.getElementById("contestacao_pasep")?.checked) {
            texto += `Processo distribuído, Contestação Apresentada de maneira tempestiva (${document.getElementById("rastreio_contestacao_pasep").value}), `;
        }
        if (document.getElementById("pericia_pasep")?.checked) {
            texto += `Perícia realizada, constatando erro no valor da causa mencionado pela parte autora (${document.getElementById("rastreio_pericia_pasep").value}). `;
        }
        if (document.getElementById("suspenso_pasep")?.checked) {
            texto += `Processo suspenso com base no Tema ${document.getElementById("tema_pasep").value}/STJ. Aguardando resolução para desenrolar da lide. (${document.getElementById("rastreio_suspenso_pasep").value}). `;
        } else if (document.getElementById("nao_suspenso_pasep")?.checked) {
            texto += "Processo segue em curso. ";
        }
        const sentenca = document.getElementById("sentenca_select_pasep")?.value;
        if (sentenca) {
            texto += `Sentença proferida, sendo ${sentenca} (${document.getElementById("rastreio_sentenca_pasep").value}). `;
        } else if (document.getElementById("sem_sentenca_pasep")?.checked) {
            texto += "Ainda não houve sentença, aguardando julgamento de mérito. ";
        }
        if (document.getElementById("apelacao_pasep")?.checked) {
            texto += `APELAÇÃO INTERPOSTA, (${document.getElementById("rastreio_apelacao_pasep").value}). `;
        }
        if (document.getElementById("contrarrazoes_pasep")?.checked) {
            texto += `Contrarrazões já protocolada, (${document.getElementById("rastreio_contrarrazoes_pasep").value}). `;
        }
        const acordao = document.getElementById("acordao_select_pasep")?.value;
        if (acordao) {
            texto += `Acórdão, (${document.getElementById("rastreio_acordao_pasep").value}). `;
            texto += acordao === "procedente" ? "Reformando Sentença. " : "Mantendo Sentença, aguardando Trânsito em julgado. ";
        }
        if (document.getElementById("embargos_pasep")?.checked) {
            texto += `Foram opostos embargos de declaração, ainda pendentes de análise. (${document.getElementById("rastreio_embargos_pasep").value}). `;
        }
        const pe = document.getElementById("pe_pasep")?.value;
        if (pe) {
            texto += `Estabelece-se PE em ${pe}% tendo em vista a ausência de provas técnicas e a jurisprudência favorável ao Banco em casos semelhantes. `;
        }
        const valor = document.getElementById("valor_pasep")?.value;
        if (valor) {
            texto += `Valor da causa/pedido é de R$ ${valor}, com base nos pedidos cumulados, levando em consideração o valor da causa, sabendo que será atualizado por eventuais perícias. `;
        }
        const pcond = document.getElementById("pcond_pasep")?.value;
        if (pcond) {
            texto += `PCond estimado em R$ ${pcond}, com base em precedentes regionais consolidados e perfil probatório das demandas semelhantes. `;
        }
        if (document.getElementById("procuracao_pasep")?.checked) {
            texto += `Processo com procuração já juntada aos autos (${document.getElementById("rastreio_procuracao_pasep").value}). `;
        }
        document.getElementById("saida_pasep").value = texto.trim();
    }

    // --- FUNÇÕES DE CONTROLE E UTILIDADE (LÓGICA ORIGINAL) ---
    function mostrarFormulario(targetFormId) {
        analysisForms.forEach(form => form.classList.add('hidden'));
        analysisButtons.forEach(button => button.classList.remove('active'));

        const formToShow = document.getElementById(targetFormId);
        const buttonToActivate = document.querySelector(`[data-form-id="${targetFormId}"]`);
        
        if (formToShow) formToShow.classList.remove('hidden');
        if (buttonToActivate) buttonToActivate.classList.add('active');
    }

    function copiarTexto(elementId) {
        const textarea = document.getElementById(elementId);
        if (!textarea.value) {
            alert("Não há nada para copiar.");
            return;
        }
        textarea.select();
        document.execCommand('copy');
        alert("Análise copiada para a área de transferência!");
    }

    function exportarTXT(elementId) {
        const texto = document.getElementById(elementId).value;
        if (!texto) {
            alert("Não há nada para exportar.");
            return;
        }
        const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.download = "analise_risco.txt";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

        // URL do seu App da Web do Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw35I2xNrJLXDmBAffoG2EGqOkIOFteB1dv5bRMaF-MgUl6vUd6BthwjP1hEG9QkuvD/exec'; // <-- IMPORTANTE: Cole a URL que você copiou

    // Nova função para enviar os dados para a planilha
    async function sendDataToSheet(analysisType, generatedContent) {
        try {
            // 1. Obter o IP do usuário usando um serviço gratuito
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIp = ipData.ip;

            // 2. Montar o pacote de dados (payload)
            const payload = {
                ip: userIp,
                analysisType: analysisType,
                generatedContent: generatedContent
            };

            // 3. Enviar os dados para o Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Importante para evitar erros de CORS com o Google Script
                cache: 'no-cache',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            console.log("Data sent to Google Sheet.");

        } catch (error) {
            console.error("Error sending data to Google Sheet:", error);
        }
    }


    // Função original, agora modificada para chamar a nova lógica
    // Função salvaHistorico ATUALIZADA
function salvarHistorico(sourceId, historyId) {
    const atual = document.getElementById(sourceId).value;
    const historico = document.getElementById(historyId);

    if (atual) {
        // --- MUDANÇA APLICADA AQUI ---

        // Define um separador mais simples e limpo.
        const separador = "\n\n------------------------------------\n\n";

        // A nova lógica: se o histórico já tiver conteúdo, o texto novo é adicionado
        // no topo, seguido pelo separador e o conteúdo antigo.
        // Se estiver vazio, ele apenas adiciona o texto novo.
        if (historico.value) {
            historico.value = atual + separador + historico.value;
        } else {
            historico.value = atual;
        }
        
        alert("Análise salva no histórico!");

        // --- O RESTO DA FUNÇÃO CONTINUA IGUAL ---
        // Esta parte, que envia os dados para a planilha, não foi alterada.
        let analysisType = 'Desconhecido';
        if (sourceId.includes('tarifa')) analysisType = 'Tarifa';
        else if (sourceId.includes('cartao')) analysisType = 'Cobrança Indevida';
        else if (sourceId.includes('pasep')) analysisType = 'PASEP';
        
        sendDataToSheet(analysisType, atual); // Continua enviando os dados para a planilha normalmente

    } else {
        alert("Nada para salvar. Gere uma análise primeiro.");
    }
}

    // O resto do seu script.js continua aqui...

    // --- ADICIONANDO EVENTOS (LISTENERS) ---
    analysisButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            mostrarFormulario(e.currentTarget.dataset.formId);
        });
    });

    document.getElementById('btn_gerar_tarifa')?.addEventListener('click', gerar_tarifa);
    document.getElementById('btn_gerar_cartao')?.addEventListener('click', gerar_cartao);
    document.getElementById('btn_gerar_pasep')?.addEventListener('click', gerar_pasep);

    document.querySelectorAll('.btn_copiar').forEach(button => {
        button.addEventListener('click', (e) => copiarTexto(e.currentTarget.dataset.target));
    });

    document.querySelectorAll('.btn_exportar').forEach(button => {
        button.addEventListener('click', (e) => exportarTXT(e.currentTarget.dataset.target));
    });

    document.querySelectorAll('.btn_salvar').forEach(button => {
        button.addEventListener('click', (e) => salvarHistorico(e.currentTarget.dataset.target, e.currentTarget.dataset.history));
    });

    // Inicia mostrando o primeiro formulário por padrão
    mostrarFormulario('tarifa-form');
});