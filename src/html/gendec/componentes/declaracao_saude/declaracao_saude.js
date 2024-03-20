export class Declaracao extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor da declaração de saúde.js");

        console.log(`URL da declaração de saúde.js: ${import.meta.url}`)
        fetch('./componentes/declaracao_saude/declaracao_saude.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-declaracao-saude', Declaracao);