import { GovBRUtils } from "../../js/GovBRUtils.js";

export class SelectTipoAtividade extends HTMLElement{

    constructor(){
        super();

        Promise.all([

            this.carregar_template('./componentes/select_tipo_de_atividade.html'),
            this.carregar_tipo_de_atividade('./componentes/select_tipo_de_atividade.json')

        ]).then(() => {

            this.id_select_tipo_de_atividade = `selectCredenciamento_${GovBRUtils.gerarUUID()}`;

            this.querySelector(".br-select").id = this.id_select_tipo_de_atividade ;

            this.dispatchEvent(new CustomEvent("carregou"));
        });
    }


    criar_itens_select() {

        let template_item = this.querySelector("#template_br_item_tipo_atividade");

        let itens_promises = [];

        for (const indice_atividade in this.tipos_de_atividades["tipos_de_atividades"]) {

            const tipo_de_atividade = this.tipos_de_atividades["tipos_de_atividades"][indice_atividade];

        }

        setTimeout(() => {

            GovBRUtils.inicializarSelects(this)
        });
    }

    async carregar_tipo_de_atividade(url){

        const resposta = await fetch(url);

        if(!resposta.ok) {
            throw new Error('Erro ao carregar Atividade');
        }

        this.tipos_de_atividades = await resposta.json();

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
customElements.define('select-tipo-de-atividade', SelectTipoAtividade) 