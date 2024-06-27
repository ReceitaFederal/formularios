

import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";


export class TotalEncomendas extends ComponenteBase {
    
    constructor() {
        super({templateURL:"./total_encomendas.html", shadowDOM:false}, import.meta.url);
    }
}
customElements.define('total-encomendas', TotalEncomendas);
