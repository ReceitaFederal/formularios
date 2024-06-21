import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";

export class Pessoais extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./dados_pessoais.html", shadowDOM:false}, import.meta.url);         
    }
}
customElements.define('br-pessoais', Pessoais);