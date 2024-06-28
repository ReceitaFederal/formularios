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

                this.alternarCamposAdicionais();

                this.adicionar_comportamento_check();
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet'
        linkFonte.href = './bibliotecas/Fontes - Rawline/Rawline/';
        document.head.appendChild(linkFonte)
    }

    adicionar_comportamento_check() {
        let adicionar = document.querySelector("#alternarCamposAdicionais")

        adicionar.addEventListener("click", (evento) => {
            evento.preventDefault();
            console.log("Clicou");
            this.alternarCamposAdicionais();
        });
    }

    alternarCamposAdicionais() {
        let template = document.querySelector("#template_nacionalidade");

        let fieldsetendereco = document.querySelector("#campos-adicionais");
        
        let checkbox = this.querySelector("#brasileiroNaturalizado");
        

        if (checkbox.checkbox) {
            camposAdicionais.style.display = "block";
        } else {
            camposAdicionais.style.display = "none";
        }
    }




    
}

customElements.define('br-dados_pessoais', Dados_pessoais);
