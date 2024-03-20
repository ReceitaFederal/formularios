export class Aeronave extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor dos dados da aeronave.js");

        console.log(`URL dos dados da aeronave.js: ${import.meta.url}`)
        fetch('./componentes/dados_aeronave/dados_aeronave.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-aeronave', Aeronave);