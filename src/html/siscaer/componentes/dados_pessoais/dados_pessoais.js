export class Dados_pessoais extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor do dados_pessoais.js");

        console.log(`URL do dados_pessoais.js: ${import.meta.url}`)
        fetch('./componentes/dados_pessoais/dados_pessoais.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento()
                this.adicionar_campo()
                this.remover_campo()

                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet'
        linkFonte.href = '../bibliotecas/Fontes - Rawline/Rawline/';
        document.head.appendChild(linkFonte)
    }

    adicionar_comportamento() {
        let adicionar = document.querySelector("#adicionar_campo");

        adicionar.addEventListener("click", (evento) => {
            evento.preventDefault();
            console.log("Clicou");
            this.adicionar_campo
        });
    }

    adicionar_campo() {
        let template = document.querySelector("#dados");
        let fieldsetdados = document.querySelector("#dados_naturalizados");

        let tituloNaturalizacao = document.createElement("div");
        let nomeNaturalizacao = `Naturalização ${this.Naturalizacao}`;

    }




    
}

customElements.define('br-dados_pessoais', Dados_pessoais);
