import { SelectBase } from "../select_base/select_base.js";

export class SelectCreditosTerceiros extends SelectBase{
    
    constructor(){
        super('./componentes/select_creditos_terceiros/creditos_terceiros.json',
        'creditos_terceiros');           
    }
}
customElements.define('select-creditos-terceiros', SelectCreditosTerceiros);
