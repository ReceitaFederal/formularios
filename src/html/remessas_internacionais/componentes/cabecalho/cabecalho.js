import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";
import { PainelInformacoes } from "../painel_informacoes/painel_informacoes.js";

export class Cabecalho extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./cabecalho.html", shadowDOM:false}, import.meta.url);

        this.addEventListener(ComponenteBase.EVENTO_CARREGOU, this.processarCarregamento);
    }

    processarCarregamento(evento){
        evento.preventDefault();
        this.removeEventListener(ComponenteBase.EVENTO_CARREGOU, this.processarCarregamento);

        this.noRaiz.querySelector('painel-informacoes').addEventListener(ComponenteBase.EVENTO_CARREGOU, ()=>{
            this.dispatchEvent(new CustomEvent(ComponenteBase.EVENTO_CARREGOU));
        });
    }
}
customElements.define('br-cabecalho', Cabecalho);