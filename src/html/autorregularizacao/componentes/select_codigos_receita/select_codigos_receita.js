import { SelectBase } from "../select_base/select_base.js";

export class SelectCodigosReceita extends SelectBase{
    
    constructor(){
        super('./componentes/select_codigos_receita/codigos_receita.json',
        'codigos_receita',
        'text-center');      
}
}
customElements.define('select-codigos-receita', SelectCodigosReceita);
