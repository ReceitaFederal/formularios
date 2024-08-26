import { GovBRUtils } from "../../bibliotecas/govbrutils.js";

export class SelectBase extends HTMLElement{
    

    static template = undefined;
    static dicionario_codigos = {};

    
    constructor(url_json_codigos, campo_codigos, classe_alinhamento){
        super();      

        this.campo_codigos = campo_codigos;

        this.classe_alinhamento = classe_alinhamento;

        if (url_json_codigos){

            Promise.all([
                
                SelectBase.carregar_template('./componentes/select_base/select_base.html'),
                SelectBase.carregar_codigos(url_json_codigos)

            ]).then((retorno) => {
                
                this.appendChild(retorno[0]);

                this.codigos = retorno[1];

                this.id_select = `selectBase_${GovBRUtils.gerarUUID()}`;

                this.querySelector(".br-select").id = this.id_select;

                this.criar_itens_select();

                this.dispatchEvent(new CustomEvent("carregou"));                
            });        

        }else{
            Promise.all([                
                SelectBase.carregar_template('./componentes/select_base/select_base.html'),                
            ]).then((retorno) => {
                
                this.appendChild(retorno[0]);

                this.codigos = retorno[1];

                this.id_select = `selectBase_${GovBRUtils.gerarUUID()}`;

                this.querySelector(".br-select").id = this.id_select;                

                this.dispatchEvent(new CustomEvent("carregou"));                
            });     
        }
    }

    static get observedAttributes() {
        return ['opcoes'];
    }
    
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'opcoes') {            

            this.codigos = JSON.parse(newValue);            

            this.campo_codigos = "opcoes";  
            
            this.criar_itens_select();
        }
    }

    criar_itens_select() {        

        let template_item = this.querySelector("#template_br_item_select");
    
        for (const indice_codigo in this.codigos[this.campo_codigos]) {

            const codigo = this.codigos[this.campo_codigos][indice_codigo];
            
            
            const uuid = GovBRUtils.gerarUUID();
            const novo_item = template_item.content.cloneNode(true);

            novo_item.id = `br_item_${uuid}`;
            const elemento_input = novo_item.querySelector("input");
            const elemento_label = novo_item.querySelector("label");

            elemento_label.classList.add(this.classe_alinhamento);

            elemento_input.id = `br_item_${uuid}`;
            elemento_input.value = elemento_input.id;

            elemento_label.htmlFor = elemento_input.id;
            elemento_label.textContent = codigo;

            this.querySelector(".br-list").appendChild(novo_item);                                                
        }
            
        //Usando setTimeout para que os elementos recem criados existam        
        //O código abaixo será executado após a próxima renderização do navegador
        setTimeout(()=>{
            
            // Agora que todos os itens foram criados, inicializa os selects
            GovBRUtils.inicializarSelects(this);
        });
    }


    static async carregar_codigos(url){

        let json_retorno = undefined;

        if (!SelectBase.dicionario_codigos[url]){

            const resposta = await fetch(url);            

            if (!resposta.ok) {
                throw new Error('Erro ao carregar codigos');
            }
                    
            SelectBase.dicionario_codigos[url] = await resposta.json();
        }
                          
        return SelectBase.dicionario_codigos[url];        
    }

    async carregar_codigos_1(url){

        let json_retorno = undefined;
    

        const resposta = await fetch(url);            

        if (!resposta.ok) {
            throw new Error('Erro ao carregar codigos');
        }
                
        return await resposta.json();
       
    }



    static async carregar_template(template_url) {
        
        if (!SelectBase.template){

            const resposta = await fetch(template_url);
            if (!resposta.ok) {
                throw new Error('Erro ao carregar o template');
            }
            
            const texto_pagina = await resposta.text();
            
            SelectBase.template = document.createElement('template');
            SelectBase.template.innerHTML = texto_pagina;
        }
                
        return SelectBase.template.content.cloneNode(true);        
    }
}
