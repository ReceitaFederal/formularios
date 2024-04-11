export class Endereco_contato extends HTMLElement{
    
    constructor(){
        super();

        this.numeroreferencia = 0;

        console.log ("Constructor do endereco_contato.js");

        console.log(`URL do endereco_contato.js: ${import.meta.url}`)
        fetch('./componentes/endereco_contato/endereco_contato.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));

                this.adicionar_comportamento();
                this.adicionar_referencia();
                this.remover_referencia();
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet';
        linkFonte.href = '../bibliotecas/Fontes - Rawline/Rawline/';
        document.head.appendChild(linkFonte); 
    }

    adicionar_comportamento() {
        let adicionar = document.querySelector("#adicionar_referencia")

        adicionar.addEventListener("click", (evento) => {
            evento.preventDefault();
            console.log("Clicou");
            this.adicionar_referencia();
        });
    }

    adicionar_referencia() {
        let template = document.querySelector("#template_endereco");
        let fieldsetendereco = document.querySelector("#lista_referencia");

        let tituloendereco = document.createElement("div");
        let nomeendereco = `referência ${this.numeroreferencia}`;
        let primeiroNomeMaiusculo = nomeendereco.charAt(0).toUpperCase() + nomeendereco.slice(1).toLowerCase();
        tituloendereco.textContent = primeiroNomeMaiusculo;
        tituloendereco.style.fontFamily = "Rawline";
        tituloendereco.style.fontWeight = "bold";
        tituloendereco.style.fontSize = "16px"
        tituloendereco.style.color = "#333333"

        fieldsetendereco.appendChild(tituloendereco);

        fieldsetendereco.appendChild(template.content.cloneNode(true));

        this.numeroreferencia++;
    }

    remover_referencia() {
        let remover = document.querySelector("#remover_referencia");

        remover.addEventListener("click", (evento) => {
            evento.preventDefault();
            let fieldsetendereco = document.querySelector("#lista_referencia");
            let ultimareferencia = fieldsetendereco.lastElementChild;

            if (ultimareferencia) {

                fieldsetendereco.removeChild(ultimareferencia.previousElementSibling);

                fieldsetendereco.removeChild(ultimareferencia);
                console.log("referência removida");
                this.numeroreferencia--;
            } else {
                console.log("Nenhuma referência para remover")
            }
        })
    }

}

customElements.define('br-endereco_contato', Endereco_contato);