

import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";


export class DadosRemessa extends ComponenteBase {
    
    static VALOR_BASE = 50.00;
    static ALIQUOTA_ICMS = 0.17;

    constructor() {
        super({templateURL:"./dados_remessa.html", shadowDOM:false}, import.meta.url);

        this.valor_total = 0;

        // Inicializa os contadores de remessas para desktop e mobile
        //this.numeroremessasDesktop = 0; // Inicia com 0 para que o primeiro seja 1
        //this.numeroremessasMobile = 0; // Inicia com 0 para que o primeiro seja 1
        
        this.addEventListener("carregou", ()=> {
           
            this.adicionar_comportamento();
            //this.adicionar_remessa('#remessas-desktop', ++this.numeroremessasDesktop); // Adicionar primeira remessa no desktop
            //this.adicionar_remessa('#remessas-mobile', ++this.numeroremessasMobile); // Adicionar primeira remessa no mobile
            //this.remover_remessa();

            //this.dispatchEvent(new CustomEvent("carregou_lista_remessa"));
        });

        // Adiciona o link para o arquivo de fonte Rawline
        let linkFonte = document.createElement('link');
        linkFonte.rel = 'stylesheet';
        linkFonte.href = '../bibliotecas/Fontes - Rawline/Rawline/';
        document.head.appendChild(linkFonte);
    }

    adicionar_comportamento() {
        let input_valor = this.noRaiz.querySelector("#valor-remessa-mobile");

         // Adiciona um event listener para capturar eventos de teclado
        input_valor.addEventListener('keydown', evento => {
            // Permite apenas números e teclas de controle como Backspace, Delete e setas
            if (!/[0-9]/.test(evento.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(evento.key)) {
                evento.preventDefault(); // Cancela a ação padrão se a tecla não for um número
            }
        });

        input_valor.addEventListener("input", evento => {
            
            this.calcula_imposto(input_valor.value);
        });
    }

    calcula_imposto(valor_input){
        

        //Se nada foi digitado
        if (valor_input.length == 0){

            this.atualiza_inputs("", "", "", "", "", "", "", "");

        //Se não é um número valido
        }else if (!DadosRemessa.isNumeroValido(valor_input)){

            //Faz alguma coisa
            alert(`${valor_input} não é um número válido!`)


        }else{
            
            let valor = parseFloat(valor_input);

            //Inicializa variáveis
            let aliquota = -1;
            let desconto = -1;
            

            if (valor > DadosRemessa.VALOR_BASE){

                aliquota = 0.60; //60% de II
                desconto = 20; //$20 de desconto

            }else{

                aliquota = 0.20; //20% de II
                desconto = 0; //Não tem desconto
            }

            let ii_inicial = valor * aliquota;
            let ii_final = ii_inicial - desconto;

            let soma = valor + ii_final;

            let icms = (soma/(1-DadosRemessa.ALIQUOTA_ICMS))*DadosRemessa.ALIQUOTA_ICMS;

            this.valor_total = soma + icms;

            this.atualiza_inputs(
                valor, 
                aliquota.toFixed(2), 
                ii_inicial.toFixed(2), 
                desconto.toFixed(2), 
                ii_final.toFixed(2), 
                soma.toFixed(2), 
                icms.toFixed(2), 
                this.valor_total.toFixed(2));            
        }

        this.dispatchEvent(new CustomEvent("atualizou_valores"));
    }

    atualiza_inputs(valor, aliquota, ii_inicial, desconto, ii_final, soma, icms, valor_total){

        this.noRaiz.querySelector("#valor-remessa-mobile").value = valor;
        this.noRaiz.querySelector("#aliquota-remessa-mobile").value = aliquota;
        this.noRaiz.querySelector("#iiinicial-remessa-mobile").value = ii_inicial;
        this.noRaiz.querySelector("#desconto-remessa-mobile").value = desconto;
        this.noRaiz.querySelector("#iifinal-remessa-mobile").value = ii_final;
        this.noRaiz.querySelector("#soma-remessa-mobile").value = soma;
        this.noRaiz.querySelector("#icms-remessa-mobile").value = icms;
        this.noRaiz.querySelector("#total-remessa-mobile").value = valor_total;
    }


    static isNumeroValido(str) {
        // Remove espaços em branco no início e no fim da string
        str = str.trim();
    
        // Verifica se a string é um número usando parseFloat e isNaN
        return !isNaN(parseFloat(str)) && isFinite(str);
    }
}

customElements.define('br-remessa', DadosRemessa);
