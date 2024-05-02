import { SelectBase } from "../select_base/select_base.js";

export class SelectTiposDeclaracao extends SelectBase{
    
    constructor(){
        super('./componentes/select_tipos_declaracao/tipos_declaracao.json',
        'tipos_declaracao');      

    }
}
customElements.define('select-tipos-declaracao', SelectTiposDeclaracao);
