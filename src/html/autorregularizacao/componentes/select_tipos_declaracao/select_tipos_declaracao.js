import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectTiposDeclaracao extends HTMLElement{
    
    constructor(){
        super();      

        Promise.all([
            
            this.carregar_template('./componentes/select_tipos_declaracao/select_tipos_declaracao.html'),
            this.carregar_tipos_declaracao('./componentes/select_tipos_declaracao/tipos_declaracao.json')

        ]).then(() => {
            
            this.id_select_tipos_declaracao = `selectTiposDeclaracao_${GovBRUtils.gerarUUID()}`;

            this.querySelector(".br-select").id = this.id_select_tipos_declaracao;

            this.criar_itens_select();

            this.dispatchEvent(new CustomEvent("carregou"));                
        });        
    }



    criar_itens_select() {

        let template_item = this.querySelector("#template_br_item_tipo_declaracao");

        let itens_promises = []; // Array para armazenar as Promises de criação de itens
    
        for (const indice_tipo_declaracao in this.tipos_declaracao["tipos_declaracao"]) {

            const tipo_declaracao = this.tipos_declaracao["tipos_declaracao"][indice_tipo_declaracao];
            
            
            const uuid = GovBRUtils.gerarUUID();
            const novo_item = template_item.content.cloneNode(true);

            novo_item.id = `br_item_tipo_declaracao_${uuid}`;
            const elemento_input = novo_item.querySelector("input");
            const elemento_label = novo_item.querySelector("label");

            elemento_input.id = `br_item_input_tipo_declaracao_${uuid}`;
            elemento_input.value = elemento_input.id;

            elemento_label.htmlFor = elemento_input.id;
            elemento_label.textContent = tipo_declaracao;

            this.querySelector(".br-list").appendChild(novo_item);                                                
        }
            
        //Usando setTimeout para que os elementos recem criados existam        
        //O código abaixo será executado após a próxima renderização do navegador
        setTimeout(()=>{
            
            // Agora que todos os itens foram criados, inicializa os selects
            GovBRUtils.inicializarSelects(this);
        });
    }


    async carregar_tipos_declaracao(url){

        const resposta = await fetch(url);            

        if (!resposta.ok) {
            throw new Error('Erro ao carregar tipos declaracao');
        }
                
        this.tipos_declaracao = await resposta.json();
                          
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
customElements.define('select-tipos-declaracao', SelectTiposDeclaracao);
