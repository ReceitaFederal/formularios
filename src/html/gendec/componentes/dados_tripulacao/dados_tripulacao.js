export class Tripulacao extends HTMLElement {
    constructor() {
        super();

        this.numeroTripulantes = 1; // Inicializa o contador de tripulantes

        console.log("Constructor dos dados da tripulação.js");

        console.log(`URL dos dados da tripulação.js: ${import.meta.url}`);
        fetch('./componentes/dados_tripulacao/dados_tripulacao.html').then(resultado => {
            resultado.text().then(texto_pagina => {
                let template = document.createElement('template');
                template.innerHTML = texto_pagina;
                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();
                this.adicionar_tripulante();
                this.remover_tripulante();

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
        let adicionar = document.querySelector("#adicionar_tripulante");

        adicionar.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o comportamento padrão do link
            console.log("Clicou");
            this.adicionar_tripulante();
        });
    }

    adicionar_tripulante() {
        let template = document.querySelector("#tripulante");
        let fieldsetTripulantes = document.querySelector("#lista_tripulantes");

        // Criar título para o tripulante
        let tituloTripulante = document.createElement("div");
        let nomeTripulante = `Tripulante ${this.numeroTripulantes}`;
        let primeiroNomeMaiusculo = nomeTripulante.charAt(0).toUpperCase() + nomeTripulante.slice(1).toLowerCase();
        tituloTripulante.textContent = primeiroNomeMaiusculo;
        tituloTripulante.style.fontFamily = "Rawline"; // Aplicar a fonte Rawline
        tituloTripulante.style.fontWeight = "bold"; // Aplicar negrito ao título
        tituloTripulante.style.fontSize = "16px"; // Definir tamanho da fonte
        tituloTripulante.style.color = "#333333"; // Definir cor da fonte

        // Adicionar título antes do bloco do tripulante
        fieldsetTripulantes.appendChild(tituloTripulante);

        // Adicionar bloco do tripulante
        fieldsetTripulantes.appendChild(template.content.cloneNode(true));

        this.numeroTripulantes++; // Incrementa o contador de tripulantes
    }

    remover_tripulante() {
        let remover = document.querySelector("#remover_tripulante");

        remover.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o comportamento padrão do link
            let fieldsetTripulantes = document.querySelector("#lista_tripulantes");
            let ultimoTripulante = fieldsetTripulantes.lastElementChild;

            if (ultimoTripulante) {
                // Remover título do tripulante
                fieldsetTripulantes.removeChild(ultimoTripulante.previousElementSibling);
                // Remover bloco do tripulante
                fieldsetTripulantes.removeChild(ultimoTripulante);
                console.log("Tripulante removido");
                this.numeroTripulantes--; // Decrementa o contador de tripulantes
            } else {
                console.log("Nenhum tripulante para remover");
            }
        });
    }
}

customElements.define('br-tripulacao', Tripulacao);
