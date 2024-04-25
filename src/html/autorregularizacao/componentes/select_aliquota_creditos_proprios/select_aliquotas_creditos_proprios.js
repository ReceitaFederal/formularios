import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectAliquotasCreditosProprios extends HTMLElement{
    
    constructor(){
        super();      

        Promise.all([
            
            this.carregar_template('./componentes/select_aliquota_creditos_proprios/select_aliquotas_creditos_proprios.html'),
            this.carregar_aliquotas_creditos_proprios('./componentes/select_aliquota_creditos_proprios/aliquotas_creditos_proprios.json')

        ]).then(() => {
            
            this.id_select_aliquotas_creditos_proprios = `selectAliquotasCreditosProprios_${GovBRUtils.gerarUUID()}`;

            this.querySelector(".br-select").id = this.id_select_aliquotas_creditos_proprios;

            this.criar_itens_select();

            this.dispatchEvent(new CustomEvent("carregou"));                
        });        
    }



    criar_itens_select() {

        let template_item = this.querySelector("#template_br_item_aliquota_creditos_proprios");

        let itens_promises = []; // Array para armazenar as Promises de criação de itens
    
        for (const indice_aliquota_creditos_proprios in this.aliquotas_creditos_proprios["aliquotas_creditos_proprios"]) {

            const aliquota_creditos_proprios = this.aliquotas_creditos_proprios["aliquotas_creditos_proprios"][indice_aliquota_creditos_proprios];
            
            
            const uuid = GovBRUtils.gerarUUID();
            const novo_item = template_item.content.cloneNode(true);

            novo_item.id = `br_item_aliquota_creditos_proprios_${uuid}`;
            const elemento_input = novo_item.querySelector("input");
            const elemento_label = novo_item.querySelector("label");

            elemento_input.id = `br_item_input_aliquota_creditos_proprios_${uuid}`;
            elemento_input.value = elemento_input.id;

            elemento_label.htmlFor = elemento_input.id;
            elemento_label.textContent = aliquota_creditos_proprios;

            this.querySelector(".br-list").appendChild(novo_item);                                                
        }
            
        //Usando setTimeout para que os elementos recem criados existam        
        //O código abaixo será executado após a próxima renderização do navegador
        setTimeout(()=>{
            
            // Agora que todos os itens foram criados, inicializa os selects
            GovBRUtils.inicializarSelects(this);
        });
    }


    async carregar_aliquotas_creditos_proprios(url){

        const resposta = await fetch(url);            

        if (!resposta.ok) {
            throw new Error('Erro ao carregar aliquotas creditos proprios');
        }
                
        this.aliquotas_creditos_proprios = await resposta.json();
                          
        return true;        
    }


    async carregar_template(template_url) {
        
        const resposta = await fetch(template_url);
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar o template: ${template_url}`);
        }
        
        const texto_pagina = await resposta.text();
        
        const template = document.createElement('template');
        template.innerHTML = texto_pagina;

        this.appendChild(template.content.cloneNode(true));
                
        return true;        
    }
}
customElements.define('select-aliquotas-creditos-proprios', SelectAliquotasCreditosProprios);
