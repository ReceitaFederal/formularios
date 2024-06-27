import { ComponenteBase } from "../../../../bibliotecas/ultima/componente_base.js";

export class RemessaConforme extends ComponenteBase {
    
    static LINK_LISTA_EMPRESAS_CERTIFICADAS = "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/empresas-certificadas-no-programa-remessa-conforme-prc";

    constructor() {
        super({templateURL:"./remessa_conforme.html", shadowDOM:false}, import.meta.url);

        this.addEventListener("carregou", ()=>{

            this.noRaiz.querySelector('#btn_sim').addEventListener('click', () => {
                this.ocultar();
            });

            this.noRaiz.querySelector('#btn_nao').addEventListener('click', () => {
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
    }
}

customElements.define('remessa-conforme', RemessaConforme);
