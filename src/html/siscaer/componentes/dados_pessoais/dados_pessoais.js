import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";

export class Dados_pessoais extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./dados_pessoais.html", shadowDOM:false}, import.meta.url); 
            
        super.addEventListener("carregou", (evento) =>{

            this.alternarCamposAdicionais();

            this.adicionar_comportamento_check();


        })

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


/*adicionar_comportamento_check() {
    let checkbox = this.querySelector("#brasileiroNaturalizado")

    checkbox.addEventListener("click", (evento) => {
        evento.preventDefault();
        console.log("Checkbox clicado");
        this.alternarCamposAdicionais();
    });
}

alternarCamposAdicionais() {
    let checkbox = this.querySelector("#brasileiroNaturalizado");

    let camposAdicionais = this.querySelector("#campos-adicionais");
    let template = document.querySelector("#template_nacionalidade");

    
    if (checkbox.checked) {
        camposAdicionais.style.display = "block";
    } else {
        camposAdicionais.style.display = "none";
    }
}

}*/
