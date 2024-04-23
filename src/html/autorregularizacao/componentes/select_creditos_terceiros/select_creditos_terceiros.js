import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectCreditosTerceiros extends HTMLElement{
    
    constructor(){
        super();      

        Promise.all([
            
            this.carregar_template('./componentes/select_creditos_terceiros/select_creditos_terceiros.html'),
            this.carregar_creditos_terceiros('./componentes/select_creditos_terceiros/creditos_terceiros.json')

        ]).then(() => {
            
            this.id_select_creditos_terceiros = `selectCreditosTerceiros_${GovBRUtils.gerarUUID()}`;

            this.querySelector(".br-select").id = this.id_select_creditos_terceiros;

            this.criar_itens_select();

            this.dispatchEvent(new CustomEvent("carregou"));                
        });        
    }



    criar_itens_select() {

        let template_item = this.querySelector("#template_br_item_credito_terceiros");

        let itens_promises = []; // Array para armazenar as Promises de criação de itens
    
        for (const indice_credito_terceiros in this.creditos_terceiros["creditos_terceiros"]) {

            const creditos_terceiros = this.creditos_terceiros["creditos_terceiros"][indice_credito_terceiros];
            
            
            const uuid = GovBRUtils.gerarUUID();
            const novo_item = template_item.content.cloneNode(true);

            novo_item.id = `br_item_credito_terceiros_${uuid}`;
            const elemento_input = novo_item.querySelector("input");
            const elemento_label = novo_item.querySelector("label");

            elemento_input.id = `br_item_input_credito_terceiros_${uuid}`;
            elemento_input.value = elemento_input.id;

            elemento_label.htmlFor = elemento_input.id;
            elemento_label.textContent = creditos_terceiros;

            this.querySelector(".br-list").appendChild(novo_item);                                                
        }
            
        //Usando setTimeout para que os elementos recem criados existam        
        //O código abaixo será executado após a próxima renderização do navegador
        setTimeout(()=>{
            
            // Agora que todos os itens foram criados, inicializa os selects
            GovBRUtils.inicializarSelects(this);
        });
    }


    async carregar_creditos_terceiros(url){

        const resposta = await fetch(url);            

        if (!resposta.ok) {
            throw new Error('Erro ao carregar creditos_terceiros');
        }
                
        this.creditos_terceiros = await resposta.json();
                          
        return true;        
    }



    async carregar_template(template_url) {
        
        const resposta = await fetch(template_url);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar o template');
        }
        
        const texto_pagina = await resposta.text();
        
        const template = document.createElement('template');
        template.innerHTML = texto_pagina;

        this.appendChild(template.content.cloneNode(true));
                
        return true;        
    }
}
customElements.define('select-creditos-terceiros', SelectCreditosTerceiros);
