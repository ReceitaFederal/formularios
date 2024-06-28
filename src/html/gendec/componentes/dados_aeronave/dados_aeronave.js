import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";

export class Aeronave extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./dados_aeronave.html", shadowDOM:false}, import.meta.url);          
    }
}
customElements.define('br-aeronave', Aeronave);