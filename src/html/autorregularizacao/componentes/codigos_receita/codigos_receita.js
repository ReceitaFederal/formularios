export class Codigos extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor da codigos_receita.js");

        console.log(`URL dos dados do codigos_receita.js": ${import.meta.url}`)
        fetch('./componentes/codigos_receita/codigos_receita.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-codigos-receita', Codigos);