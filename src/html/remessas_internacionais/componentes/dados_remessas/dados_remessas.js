export class remessas extends HTMLElement {
    constructor() {
        super();

        this.numeroremessas = 1; // Inicializa o contador de remessas

        console.log("Constructor dos dados da remessas.js");

        console.log(`URL dos dados da remessas.js: ${import.meta.url}`);
        fetch('./componentes/dados_remessas/dados_remessas.html').then(resultado => {
            resultado.text().then(texto_pagina => {
                let template = document.createElement('template');
                template.innerHTML = texto_pagina;
                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();
                this.adicionar_remessa();
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
        let adicionar = document.querySelector("#adicionar_remessa");

        adicionar.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o comportamento padrão do link
            console.log("Clicou");
            this.adicionar_remessa();
        });
    }

    adicionar_remessa() {
        let template = document.querySelector("#remessa");
        let fieldsetremessas = document.querySelector("#lista_remessas");

        // Criar título para o remessa
        let tituloremessa = document.createElement("div");
        let nomeremessa = `remessa ${this.numeroremessas}`;
        let primeiroNomeMaiusculo = nomeremessa.charAt(0).toUpperCase() + nomeremessa.slice(1).toLowerCase();
        tituloremessa.textContent = primeiroNomeMaiusculo;
        tituloremessa.style.fontFamily = "Rawline"; // Aplicar a fonte Rawline
        tituloremessa.style.fontWeight = "bold"; // Aplicar negrito ao título
        tituloremessa.style.fontSize = "16px"; // Definir tamanho da fonte
        tituloremessa.style.color = "#333333"; // Definir cor da fonte

        // Adicionar título antes do bloco do remessa
        fieldsetremessas.appendChild(tituloremessa);

        // Adicionar bloco do remessa
        fieldsetremessas.appendChild(template.content.cloneNode(true));

        this.numeroremessas++; // Incrementa o contador de remessas
    }

    remover_remessa() {
        let remover = document.querySelector("#remover_remessa");

        remover.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o comportamento padrão do link
            let fieldsetremessas = document.querySelector("#lista_remessas");
            let ultimoremessa = fieldsetremessas.lastElementChild;

            if (ultimoremessa) {
                // Remover título do remessa
                fieldsetremessas.removeChild(ultimoremessa.previousElementSibling);
                // Remover bloco do remessa
                fieldsetremessas.removeChild(ultimoremessa);
                console.log("remessa removida");
                this.numeroremessas--; // Decrementa o contador de remessas
            } else {
                console.log("Nenhuma remessa para remover");
            }
        });
    }
}

customElements.define('br-remessas', remessas);
