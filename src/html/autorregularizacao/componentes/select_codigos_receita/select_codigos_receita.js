import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectCodigosReceita extends HTMLElement{
    
    constructor(){
        super();      

        Promise.all([
            
            this.carregar_template('./componentes/select_codigos_receita/select_codigos_receita.html'),
            this.carregar_codigos_receita('./componentes/select_codigos_receita/codigos_receita.json')

        ]).then(() => {
            
            this.id_select_codigos_receita = `selectCodigosReceitas_${GovBRUtils.gerarUUID()}`;

            this.querySelector(".br-select").id = this.id_select_codigos_receita;

            this.criar_itens_select();

            this.dispatchEvent(new CustomEvent("carregou"));                
        });        
    }



    criar_itens_select() {

        let template_item = this.querySelector("#template_br_item_codigo_receita");

        let itens_promises = []; // Array para armazenar as Promises de criação de itens
    
        for (const indice_codigo_receita in this.codigos_receita["codigos_receita"]) {

            const codigo_receita = this.codigos_receita["codigos_receita"][indice_codigo_receita];
            
            
            const uuid = GovBRUtils.gerarUUID();
            const novo_item = template_item.content.cloneNode(true);

            novo_item.id = `br_item_codigo_receita_${uuid}`;
            const elemento_input = novo_item.querySelector("input");
            const elemento_label = novo_item.querySelector("label");

            elemento_input.id = `br_item_input_codigo_receita_${uuid}`;
            elemento_input.value = elemento_input.id;

            elemento_label.htmlFor = elemento_input.id;
            elemento_label.textContent = codigo_receita;

            this.querySelector(".br-list").appendChild(novo_item);                                                
        }
            
        setTimeout(()=>{
            // Agora que todos os itens foram criados, inicializa os selects
            GovBRUtils.inicializarSelects(this);
        });
    }


    async carregar_codigos_receita(url){

        const resposta = await fetch(url);            

        if (!resposta.ok) {
            throw new Error('Erro ao carregar codigos receita');
        }
                
        this.codigos_receita = await resposta.json();
                          
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
customElements.define('select-codigos-receita', SelectCodigosReceita);
