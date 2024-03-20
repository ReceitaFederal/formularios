export class Passageiros extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor dos dados dos passageiros.js");

        console.log(`URL dos dados dos passageiros.js: ${import.meta.url}`)
        fetch('./componentes/dados_passageiros/dados_passageiros.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-passageiros', Passageiros);