import { SelectBase } from "../select_base/select_base.js";

export class SelectAliquotasCreditosProprios extends SelectBase{
    
    constructor(){
        super('./componentes/select_aliquota_creditos_proprios/aliquotas_creditos_proprios.json', 
        'aliquotas_creditos_proprios',
        'text-center');            
    }

}
customElements.define('select-aliquotas-creditos-proprios', SelectAliquotasCreditosProprios);
