export class Endereco_contato extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor do endereco_contato.js");

        console.log(`URL do endereco_contato.js: ${import.meta.url}`)
        fetch('./componentes/endereco_contato/endereco_contato.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-endereco_contato', Endereco_contato);