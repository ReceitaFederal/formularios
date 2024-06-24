import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";

export class Cabecalho extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./cabecalho.html", shadowDOM:false}, import.meta.url);         
    }
}
customElements.define('br-cabecalho', Cabecalho);