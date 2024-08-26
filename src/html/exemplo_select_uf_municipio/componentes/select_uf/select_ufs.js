import { SelectBase } from "../select_base/select_base.js";

export class SelectUfs extends SelectBase{
    
    constructor(){        
        super('./componentes/select_uf/ufs.json','ufs');      
    }
}
customElements.define('select-ufs', SelectUfs);
