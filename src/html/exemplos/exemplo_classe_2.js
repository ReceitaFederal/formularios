


export class BRUsuario extends HTMLElement{
    constructor(){
        super();
        this.criar_botao();        
    }

    criar_botao(){

        for (let i = 0; i < 10; i++){
            let botao = document.createElement("button");

            botao.addEventListener("click", ()=>{
                console.log ("clicouuuuu");
            });

            botao.textContent = "NOME BOTÃO";

            this.appendChild(botao);
        }
    }
}
customElements.define("br-usuario", BRUsuario);