import { SelectBase } from "../select_base/select_base.js";

export class SelectMunicipio extends SelectBase{
    
    constructor(){
        super();      
    }
}
customElements.define('select-municipio', SelectMunicipio);
