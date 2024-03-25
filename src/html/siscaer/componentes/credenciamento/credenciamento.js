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
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-credenciamento', Credenciamento);