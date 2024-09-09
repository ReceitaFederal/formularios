import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";

export class Credenciamento extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./credenciamento.html", shadowDOM:false}, import.meta.url); 

        super.addEventListener("carregou", (evento) =>{

            this.adicionar_comportamento();

            this.selecionar_orgao_publico();

            this.remover_tripulante();
            
        })
    }

    adicionar_comportamento(){
        let selecionar = document.querySelector("#selecionar_orgao_publico");

        selecionar.addEventListener("click", (evento) => {
            console.log("Clicou");

            this.selecionar_orgao_publico();
        });

    }

}
customElements.define('br-credenciamento', Credenciamento);