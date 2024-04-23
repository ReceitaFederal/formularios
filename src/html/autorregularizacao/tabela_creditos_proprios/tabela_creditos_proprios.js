import { GovBRUtils } from "../js/GovBRUtils.js";
import { SelectAliquotasCreditosProprios } from "../componentes/select_aliquota_creditos_proprios/select_aliquotas_creditos_proprios.js";

export class TabelaCreditosProprios extends HTMLElement{
    
    constructor(){
        super();

        this.qtd_linhas_creditos_proprios = 0;

        console.log ("Constructor LinhaTabelaCreditosProprios");
        
        fetch('./tabela_creditos_proprios/tabela_creditos_proprios.html').then(resultado => {
            
            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou")); 
        });
      
    });
     
    }    
   
}
customElements.define('br-tabela-creditos-proprios', TabelaCreditosProprios);