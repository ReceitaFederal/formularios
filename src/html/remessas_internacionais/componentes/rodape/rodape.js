import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";

export class Rodape extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./rodape.html", shadowDOM:false}, import.meta.url);                
    }
}
customElements.define('br-rodape', Rodape);