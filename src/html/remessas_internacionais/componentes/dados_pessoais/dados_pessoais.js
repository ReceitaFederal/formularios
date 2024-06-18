export class Pessoais extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor de dados pessoais.js");

        console.log(`URL dos dados pessoais.js: ${import.meta.url}`)
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
customElements.define('br-pessoais', Pessoais);