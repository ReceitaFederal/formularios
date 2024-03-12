export class Cabecalho extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor do cabeçalho.js");

        console.log(`URL do cabeçalho.js: ${import.meta.url}`)
        fetch('./componentes/cabecalho/cabecalho.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-cabecalho', Cabecalho);