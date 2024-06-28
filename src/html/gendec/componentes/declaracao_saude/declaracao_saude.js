import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";

export class Declaracao extends ComponenteBase{
    
    constructor(){
        
        super({templateURL:"./declaracao_saude.html", shadowDOM:false}, import.meta.url);        
    }
}
customElements.define('br-declaracao-saude', Declaracao);