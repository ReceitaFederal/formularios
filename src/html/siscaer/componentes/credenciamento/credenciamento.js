export class Credenciamento extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor do credenciamento.js");

        console.log(`URL do credenciamento.js: ${import.meta.url}`)
        fetch('./componentes/credenciamento/credenciamento.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();

                this.selecionar_orgao_publico();

                this.remover_tripulante();
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }

    adicionar_comportamento(){
        let selecionar = document.querySelector("#selecionar_orgao_publico");

        selecionar.addEventListener("click", (evento) => {
            console.log("Clicou");

            this.selecionar_orgao_publico();
        });

    }

}
customElements.define('br-credenciamento', Credenciamento);