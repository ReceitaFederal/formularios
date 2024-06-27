import { ComponenteBase } from "../../../../bibliotecas/ultima/componente_base.js";

export class RemessaConforme extends ComponenteBase {
    
    static LINK_LISTA_EMPRESAS_CERTIFICADAS = "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/empresas-certificadas-no-programa-remessa-conforme-prc";

    constructor() {
        super({templateURL:"./remessa_conforme.html", shadowDOM:false}, import.meta.url);

        this.addEventListener("carregou", ()=>{

            this.noRaiz.querySelector('#btn_sim').addEventListener('click', () => {
                this.remessa_conforme = true;
                this.ocultar();
            });

            this.noRaiz.querySelector('#btn_nao').addEventListener('click', () => {
                this.remessa_conforme = false;
                this.ocultar();
            });

            this.noRaiz.querySelector('#btn_nao_sei').addEventListener('click', () => {                
                window.open(RemessaConforme.LINK_LISTA_EMPRESAS_CERTIFICADAS, "_blank");
            });
        });
    }

    exibir() {
        const modal = this.noRaiz.querySelector('.modal-overlay');        
        modal.style.display = 'flex';        
    }

    ocultar() {
        const modal = this.noRaiz.querySelector('.modal-overlay');        
        modal.style.display = 'none';    
        this.dispatchEvent(
            new CustomEvent(
                "fechou",                 
                {
                    bubbles: true, // Permite que o evento suba a árvore do DOM
                    composed: true, // Permite que o evento atravesse os limites do shadow DOM
                    detail: {"remessa_conforme":this._remessa_conforme},
                }
            )
        );     
    }

    set remessa_conforme(valor){
        this._remessa_conforme = valor;
    }

    get remessa_conforme(){
        return this._remessa_conforme;
    }
}

customElements.define('remessa-conforme', RemessaConforme);
