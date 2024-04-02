export class Dados_pessoais extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor do dados_pessoais.js");

        console.log(`URL do dados_pessoais.js: ${import.meta.url}`)
        fetch('./componentes/dados_pessoais/dados_pessoais.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));

                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

    }
    
}

customElements.define('br-dados_pessoais', Dados_pessoais);
