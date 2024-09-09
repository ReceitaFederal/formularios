import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";

export class Endereco_contato extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./endereco_contato.html", shadowDOM:false}, import.meta.url); 

        this.numeroreferencia = 1;

        super.addEventListener("carregou", (evento) =>{

            this.adicionar_comportamento();
            this.adicionar_referencia();


        })

        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet';
        linkFonte.href = './bibliotecas/Fontes - Rawline/Rawline/';
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

        let template = document.querySelector("#template_referencia");

        let fieldsetendereco = document.querySelector("#lista_referencia");

        fieldsetendereco.appendChild(template.content.cloneNode(true));

        //Esperar o próximo laço de eventos do navegador pois ai os filhos do linha-referencia
        //já vão estar criados e prontos para serem acessados via querySelector
        setTimeout(() => {

            let nome_referencia = `referência ${this.numeroreferencia}`;

            let nome_com_primeira_letra_maiuscula = nome_referencia.charAt(0).toUpperCase() + nome_referencia.slice(1).toLowerCase();

            let div_titulo_referencia = fieldsetendereco.querySelector("#titulo_referencia");

            //Linha nova...
            const referenciaAtual = 
        document.querySelector(`[name="referencia${numeroreferencia - 1}"]`);
            const novoCampo = referenciaAtual.cloneNode(true);
            novoCampo.name = `referencia${this.numeroreferencia}`;
            novoCampo.id = `Referência ${this.numeroreferencia}`;


            div_titulo_referencia.id = `${div_titulo_referencia.id}_${this.numeroreferencia}`;

            div_titulo_referencia.textContent = nome_com_primeira_letra_maiuscula;


            let nova_referencia = fieldsetendereco.querySelector("#linha-referencia");

            nova_referencia.id = `${nova_referencia.id}_${this.numeroreferencia}`;

            this.mudar_id(
                nova_referencia.querySelector("#nome-referencia"),
                nova_referencia.querySelector("#label-nome-referencia"),
                this.numeroreferencia
            );

            this.mudar_id(
                nova_referencia.querySelector("#telefone-referencia"),
                nova_referencia.querySelector("#label-telefone-referencia"),
                this.numeroreferencia
            );

            this.mudar_id(
                nova_referencia.querySelector("#vinculo-referencia"),
                nova_referencia.querySelector("#label-vinculo-referencia"),
                this.numeroreferencia
            );

            nova_referencia.querySelector("#remover_referencia").addEventListener("click", (evento) => {
                nova_referencia.remove();
            });

            this.numeroreferencia++;
        });
    }

    mudar_id(elemento_princial, elemento_label, numeroreferencia) {

        elemento_princial.id = `${elemento_princial.id}_${numeroreferencia}`;

        elemento_label.id = `${elemento_label.id}_${numeroreferencia}`;

        elemento_label.for = elemento_princial.id;
    }
}

customElements.define('br-endereco_contato', Endereco_contato);