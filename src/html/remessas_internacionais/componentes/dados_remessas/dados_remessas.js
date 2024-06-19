export class remessas extends HTMLElement {
    constructor() {
        super();

        // Inicializa os contadores de remessas para desktop e mobile
        this.numeroremessasDesktop = 0; // Inicia com 0 para que o primeiro seja 1
        this.numeroremessasMobile = 0; // Inicia com 0 para que o primeiro seja 1

        console.log("Constructor dos dados da remessas.js");

        console.log(`URL dos dados da remessas.js: ${import.meta.url}`);
        fetch('./componentes/dados_remessas/dados_remessas.html').then(resultado => {
            resultado.text().then(texto_pagina => {
                let template = document.createElement('template');
                template.innerHTML = texto_pagina;
                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();
                this.adicionar_remessa('#remessas-desktop', ++this.numeroremessasDesktop); // Adicionar primeira remessa no desktop
                this.adicionar_remessa('#remessas-mobile', ++this.numeroremessasMobile); // Adicionar primeira remessa no mobile
                this.remover_remessa();

                this.dispatchEvent(new CustomEvent("carregou"));
            });
        });

        // Adiciona o link para o arquivo de fonte Rawline
        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet';
        linkFonte.href = '../bibliotecas/Fontes - Rawline/Rawline/';
        document.head.appendChild(linkFonte);
    }

    adicionar_comportamento() {
        let adicionarDesktop = this.querySelector("#remessas-desktop #adicionar_remessa");
        let adicionarMobile = this.querySelector("#remessas-mobile #adicionar_remessa");

        if (adicionarDesktop) {
            adicionarDesktop.addEventListener("click", (evento) => {
                evento.preventDefault(); // Impede o comportamento padrão do link
                console.log("Clicou em adicionar no desktop");
                this.adicionar_remessa('#remessas-desktop', ++this.numeroremessasDesktop);
            });
        }

        if (adicionarMobile) {
            adicionarMobile.addEventListener("click", (evento) => {
                evento.preventDefault(); // Impede o comportamento padrão do link
                console.log("Clicou em adicionar no mobile");
                this.adicionar_remessa('#remessas-mobile', ++this.numeroremessasMobile);
            });
        }

        let removerDesktop = this.querySelector("#remessas-desktop #remover_remessa");
        let removerMobile = this.querySelector("#remessas-mobile #remover_remessa");

        if (removerDesktop) {
            removerDesktop.addEventListener("click", (evento) => {
                evento.preventDefault(); // Impede o comportamento padrão do link
                console.log("Clicou em remover no desktop");
                this.remover_remessa('#remessas-desktop');
            });
        }

        if (removerMobile) {
            removerMobile.addEventListener("click", (evento) => {
                evento.preventDefault(); // Impede o comportamento padrão do link
                console.log("Clicou em remover no mobile");
                this.remover_remessa('#remessas-mobile');
            });
        }
    }

    adicionar_remessa(idTemplate, contador) {
        let template = this.querySelector(`${idTemplate} template`);
        let fieldsetRemessas = this.querySelector(`${idTemplate} #lista_remessas`);

        if (template && fieldsetRemessas) {
            // Criar título para a remessa
            let tituloremessa = document.createElement("div");
            let nomeremessa = contador === 1 ? "remessa 1" : `remessa ${contador}`;
            let primeiroNomeMaiusculo = nomeremessa.charAt(0).toUpperCase() + nomeremessa.slice(1).toLowerCase();
            tituloremessa.textContent = primeiroNomeMaiusculo;
            tituloremessa.style.fontFamily = "Rawline"; // Aplicar a fonte Rawline
            tituloremessa.style.fontWeight = "bold"; // Aplicar negrito ao título
            tituloremessa.style.fontSize = "16px"; // Definir tamanho da fonte
            tituloremessa.style.color = "#333333"; // Definir cor da fonte

            // Adicionar título antes do bloco da remessa
            fieldsetRemessas.appendChild(tituloremessa);

            // Adicionar bloco da remessa
            fieldsetRemessas.appendChild(template.content.cloneNode(true));
        }
    }

    remover_remessa(idTemplate) {
        let fieldsetRemessas = this.querySelector(`${idTemplate} #lista_remessas`);
        let ultimoremessa = fieldsetRemessas.lastElementChild;

        if (ultimoremessa) {
            // Remover título da remessa
            fieldsetRemessas.removeChild(ultimoremessa.previousElementSibling);
            // Remover bloco da remessa
            fieldsetRemessas.removeChild(ultimoremessa);

            // Decrementar o contador correspondente
            if (idTemplate === '#remessas-desktop') {
                this.numeroremessasDesktop--;
            } else if (idTemplate === '#remessas-mobile') {
                this.numeroremessasMobile--;
            }
        } else {
            console.log("Nenhuma remessa para remover");
        }
    }
}

customElements.define('br-remessas', remessas);
