import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";


export class passageiros extends ComponenteBase
 {
    constructor() {
        super({templateURL:"./dados_passageiros.html", shadowDOM:false}, import.meta.url);  

        this.numeropassageiros = 1; // Inicializa o contador de passageiros

        super.addEventListener("carregou", (evento)=>{            

            this.adicionar_comportamento();
            this.adicionar_passageiro();
            this.remover_passageiro();

            //TODO: tirei o disparar carregou pois é o mesmo evento de ComponenteBase e entrava em loop
            //o evento deve ser propagado acho que vai dar certo
            //this.dispatchEvent(new CustomEvent("carregou"));            
        });

        //TODO: Verificar como lidar com esse Rawline, novo uso do ComponenteBase deve ter função para adicionar CSS
        // Adiciona o link para o arquivo de fonte Rawline
        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet';
        linkFonte.href = '../bibliotecas/Fontes - Rawline/Rawline/';
        document.head.appendChild(linkFonte);
    }

    adicionar_comportamento() {
        let adicionar = document.querySelector("#adicionar_passageiro");

        adicionar.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o comportamento padrão do link
            console.log("Clicou");
            this.adicionar_passageiro();
        });
    }

    adicionar_passageiro() {
        let template = document.querySelector("#passageiro");
        let fieldsetpassageiros = document.querySelector("#lista_passageiros");

        // Criar título para o passageiro
        let titulopassageiro = document.createElement("div");
        let nomepassageiro = `passageiro ${this.numeropassageiros}`;
        let primeiroNomeMaiusculo = nomepassageiro.charAt(0).toUpperCase() + nomepassageiro.slice(1).toLowerCase();
        titulopassageiro.textContent = primeiroNomeMaiusculo;
        titulopassageiro.style.fontFamily = "Rawline"; // Aplicar a fonte Rawline
        titulopassageiro.style.fontWeight = "bold"; // Aplicar negrito ao título
        titulopassageiro.style.fontSize = "16px"; // Definir tamanho da fonte
        titulopassageiro.style.color = "#333333"; // Definir cor da fonte

        // Adicionar título antes do bloco do passageiro
        fieldsetpassageiros.appendChild(titulopassageiro);

        // Adicionar bloco do passageiro
        fieldsetpassageiros.appendChild(template.content.cloneNode(true));

        this.numeropassageiros++; // Incrementa o contador de passageiros
    }

    remover_passageiro() {
        let remover = document.querySelector("#remover_passageiro");

        remover.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o comportamento padrão do link
            let fieldsetpassageiros = document.querySelector("#lista_passageiros");
            let ultimopassageiro = fieldsetpassageiros.lastElementChild;

            if (ultimopassageiro) {
                // Remover título do passageiro
                fieldsetpassageiros.removeChild(ultimopassageiro.previousElementSibling);
                // Remover bloco do passageiro
                fieldsetpassageiros.removeChild(ultimopassageiro);
                console.log("passageiro removido");
                this.numeropassageiros--; // Decrementa o contador de passageiros
            } else {
                console.log("Nenhum passageiro para remover");
            }
        });
    }
}

customElements.define('br-passageiros', passageiros);
