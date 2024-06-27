import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";

export class ModalRemessas extends ComponenteBase {
    
    constructor() {
        super({templateURL:"./modal_remessas.html", shadowDOM:false}, import.meta.url);

        this.addEventListener("carregou", ()=>{
            this.noRaiz.querySelector('#close-modal').addEventListener('click', () => {
                this.ocultar();
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

customElements.define('modal-remessas', ModalRemessas);
