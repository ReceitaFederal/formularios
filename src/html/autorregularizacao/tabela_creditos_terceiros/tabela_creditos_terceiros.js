export class Tabela extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor da tabela_creditos_terceiros.js");

        console.log(`URL dos dados da tabela_debitos_autorregularizar.js: ${import.meta.url}`)
        fetch('./tabela_creditos_terceiros.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-tabela_creditos_terceiros', Tabela);