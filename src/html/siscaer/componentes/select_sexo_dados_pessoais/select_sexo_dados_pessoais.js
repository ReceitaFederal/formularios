import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectSexoDados extends HTMLElement{

    constructor(){
        super();

        Promise.all([

            this.carregar_template('./componentes/select_sexo_dados_pessoais/select_sexo_dados_pessoais.html'),
            this.carregar_sexo_dados_pessoais('./componentes/select_sexo_dados_pessoais/sexo_dados_pessoais.json')

        ]).then(() => {

            this.id_select_sexo_dados = `selectDadosPessoais_${GovBRUtils.gerarUUID()}`;

            this.querySelector(".br-select").id = this.id_select_sexo_dados;

            this.criar_itens_select();

            this.dispatchEvent(new CustomEvent("carregou"));
        });
    }


    criar_itens_select() {

        let template_item = this.querySelector("#template_br_item_tipo_declaracao");

        let itens_promises = [];

        for (const indice_sexo_dados in this.sexo["sexo"]) {

            const sexo_dados = this.sexo["sexo"][indice_sexo_dados];

            const uuid = GovBRUtils.gerarUUID();
            const novo_item = template_item.content.cloneNode(true);

            novo_item.id = `br_item_sexo_dados_${uuid}`;
            const elemento_input = novo_item.querySelector("input");
            const elemento_label = novo_item.querySelector("label");

            elemento_input.id = `br_item_input_sexo_dados_${uuid}`;
            elemento_input.value = elemento_input.id;

            elemento_label.htmlFor = elemento_input.id;
            elemento_label.textContent = sexo_dados;

            this.querySelector(".br-list").appendChild(novo_item);
        }

        setTimeout(() => {

            GovBRUtils.inicializarSelects(this)
        });
    }

    async carregar_sexo_dados_pessoais(url){

        const resposta = await fetch(url);

        if(!resposta.ok) {
            throw new Error('Erro ao carregar sexo dados pessoais');
        }

        this.sexo_dados = await resposta.json();

        return true;
    }

    async carregar_template(template_url) {

        const resposta = await fetch(template_url);
        if (!resposta.ok) {
            throw new Error ('Erro ao carregar template');
        }

        const texto_pagina = await resposta.text();

        const template = document.createElement('template');
        template.innerHTML = texto_pagina;

        this.appendChild(template.content.cloneNode(true));

        return true;
    }

    
}
customElements.define('select-sexo-dados-pessoais', SelectSexoDados)