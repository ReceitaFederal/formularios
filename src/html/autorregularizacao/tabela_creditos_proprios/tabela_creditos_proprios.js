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

                setTimeout(() => {
                
                    let select_creditos_proprios = this.querySelector("#select-creditos-proprios");

                    console.dir(select_creditos_proprios);

                    // Inicializa o select_creditos_proprios conforme o padrão do design system 
                    GovBRUtils.inicializarSelects(select_creditos_proprios);
                    
                    this.dispatchEvent(new CustomEvent("carregou")); 
                });
        });
      
    });
     
    }    
   
}
customElements.define('br-tabela-creditos-proprios', TabelaCreditosProprios);