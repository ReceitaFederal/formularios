export class Passageiros extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor dos dados dos passageiros.js");

        console.log(`URL dos dados dos passageiros.js: ${import.meta.url}`)
        fetch('./componentes/dados_passageiros/dados_passageiros.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();

                this.adicionar_passageiro();

                this.remover_passageiro();
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

    }

    adicionar_comportamento(){
        let adicionar = document.querySelector("#adicionar_passageiro");

        adicionar.addEventListener("click", (evento) => {
            console.log("Clicou");

            this.adicionar_passageiro();
        });

    }

    adicionar_passageiro(){
        let template = document.querySelector("#passageiro");

        let fieldsetpassageiros = document.querySelector("#lista_passageiros");

        fieldsetpassageiros.appendChild(template.content.cloneNode(true));
    }

    remover_passageiro(){
        let remover = document.querySelector("#remover_passageiro");

        remover.addEventListener("click", () => {
            let fieldsetpassageiros = document.querySelector("#lista_passageiros");

            let ultimopassageiro = fieldsetpassageiros.lastElementChild;

            if (ultimopassageiro){
                fieldsetpassageiros.removeChild(ultimopassageiro);

                console.log("passageiro removido");
            }

            else {
                console.log("Nenhum passageiro para remover");
            }
    });
}
}
customElements.define('br-passageiros', Passageiros);