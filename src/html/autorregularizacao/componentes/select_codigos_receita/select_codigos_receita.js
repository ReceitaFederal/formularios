import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectCodigosReceita extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor da codigos_receita.js");

        console.log(`URL dos dados do codigos_receita.js": ${import.meta.url}`)
        fetch('./componentes/select_codigos_receita/select_codigos_receita.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                setTimeout(() => {
                   
                    GovBRUtils.inicializarSelects(this);

                    this.dispatchEvent(new CustomEvent("carregou"));                
                });                
            });
        });        
    }
}
customElements.define('select-codigos-receita', SelectCodigosReceita);
