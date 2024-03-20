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
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-tripulacao', Tripulacao);