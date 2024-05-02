import { SelectBase } from "../select_base/select_base.js";

export class SelectAliquotasCreditosTerceiros extends SelectBase{
    
    constructor(){
        super('./componentes/select_creditos_terceiros/aliquotas_creditos_terceiros.json',
        'aliquotas_creditos_terceiros',
        'text-center');      
 
    }
}
customElements.define('select-aliquotas-creditos-terceiros', SelectAliquotasCreditosTerceiros);
