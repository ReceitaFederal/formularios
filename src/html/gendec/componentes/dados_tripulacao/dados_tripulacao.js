export class Tripulacao extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor dos dados da tripulação.js");

        console.log(`URL dos dados da tripulação.js: ${import.meta.url}`)
        fetch('./componentes/dados_tripulacao/dados_tripulacao.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();

                this.adicionar_tripulante();
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

    }

    adicionar_comportamento(){
        let adicionar = document.querySelector("#adicionar_tripulante");

        adicionar.addEventListener("click", (evento) => {
            console.log("Clicou");

            this.adicionar_tripulante();
        });

    }

    adicionar_tripulante(){
        let template = document.querySelector("#tripulante");

        let fieldsetTripulantes = document.querySelector("#lista_tripulantes");

        fieldsetTripulantes.appendChild(template.content.cloneNode(true));
    }

}
customElements.define('br-tripulacao', Tripulacao);