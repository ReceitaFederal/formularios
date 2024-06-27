

import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";
import { Cotacao } from "../../js/cotacao.js";

export class DadosEncomendas extends ComponenteBase {
    
    constructor() {
        super({templateURL:"./dados_encomendas.html", shadowDOM:false}, import.meta.url);

        this.addEventListener("carregou", ()=>{

            Cotacao.COTACAO_DOLAR().then(cotacao => {
                this.cotacao_dolar = cotacao;
                this.noRaiz.querySelector("#valor_cotacao_dolar").textContent = this.cotacao_dolar;
            });

            this.adicionar_comportamento();
        });
    }



    adicionar_comportamento() {
        
        let checkbox_remessa_conforme = this.querySelector("#remessa_conforme");

        checkbox_remessa_conforme.addEventListener("click", ()=>{

            this.remessa_conforme = checkbox_remessa_conforme.checked;
            this.dispatchEvent(new CustomEvent("atualizou_remessa_conforme"));
        });
    }


    set remessa_conforme (valor){
        this._remessa_conforme = valor;
        this.noRaiz.querySelector("#remessa_conforme").checked = this._remessa_conforme;        
    }
    
    get remessa_conforme(){
        return this._remessa_conforme;
    }


    set valor_total (valor){
        const span_valor_total = this.noRaiz.querySelector("#sum-value");
        if (span_valor_total){
            span_valor_total.textContent = valor;
        }
    }
}
customElements.define('dados-encomendas', DadosEncomendas);
