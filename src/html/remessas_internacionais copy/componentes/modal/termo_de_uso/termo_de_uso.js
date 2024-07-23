import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";

export class TermoDeUso extends ComponenteBase {
    
    constructor() {
        super({templateURL:"./termo_de_uso.html", shadowDOM:false}, import.meta.url);

        this.addEventListener(ComponenteBase.EVENTO_CARREGOU, ()=>{
            this.noRaiz.querySelector('#btn_eu_concordo').addEventListener('click', () => {
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
        this.dispatchEvent(new CustomEvent("fechou"));     
    }
}

customElements.define('termo-de-uso', TermoDeUso);
