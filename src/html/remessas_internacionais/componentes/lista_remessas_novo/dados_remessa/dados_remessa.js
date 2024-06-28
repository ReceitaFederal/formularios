

import { ComponenteBase } from "../../../bibliotecas/ultima/componente_base.js";
import { InputAnimado } from "../../input_animado/input_animado.js";



export class DadosRemessa extends ComponenteBase {
    


    static VALOR_BASE = 50.00;

    static ALIQUOTA_ICMS = 0.17;



    constructor() {
        super({templateURL:"./dados_remessa.html", shadowDOM:false}, import.meta.url);


        this.valor_total = 0;        


        this.addEventListener("carregou", ()=> {
           
            this.elemento_unico = false;

            this.usar_icms = true;

            this.adicionar_comportamento();            
        });
    }



    adicionar_comportamento() {        

        let input_valor = this.noRaiz.querySelector("#valor-remessa");

        //Mudança de valore do produto da remessa
        {            
            // Adiciona um event listener para capturar eventos de teclado
            input_valor.addEventListener('keydown', evento => {
                // Permite apenas números e teclas de controle como Backspace, Delete e setas
                if (!/[0-9]/.test(evento.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(evento.key)) {
                    evento.preventDefault(); // Cancela a ação padrão se a tecla não for um número
                }
            });

            
            // Sempre que uma tecla for pressionada chama o calcula_imposto
            input_valor.addEventListener("input", evento => {
                
                this.calcular_imposto(input_valor.value);
            });
        }


        //Remoção ou limpeza do valor
        {
            this.noRaiz.querySelector("#btn_remover").addEventListener("click", ()=>{

                //Se ele for um elemento único, o botão chama limpar e apenas zera o valor
                if (this.elemento_unico){

                    input_valor.value = "";
                    this.calcular_imposto(input_valor.value);

                //Caso esse seja um elemento de uma lista, o botão chama remover e 
                //dispara um evento para a lista remover este elemento
                }else{

                    //Dispara o evento "remover"
                    let instancia_evento_customizado = new CustomEvent("remover");
                    this.dispatchEvent(instancia_evento_customizado);
                }
            });
        }
    }

    
    
    set elemento_unico(valor){

        this._elemento_unico = valor;        

       /* if (this._elemento_unico){

            this.noRaiz.querySelector("#btn_remover").textContent = "Limpar";

        }else{

            this.noRaiz.querySelector("#btn_remover").textContent = "Remover";
        } */
    }


    get elemento_unico(){
        return this._elemento_unico;
    }

    

    set usar_icms(valor){

        this._usar_icms = valor;        

        this.noRaiz.querySelector("#soma-remessa").style.display = (this._usar_icms ? "block" : "none");
        this.noRaiz.querySelector("#icms-remessa").style.display = (this._usar_icms ? "block" : "none");
    }


    get usar_icms(){
        return this._usar_icms;
    }


    calcular_imposto(valor_input){
        

        //Se nada foi digitado
        if (valor_input.length == 0){

            this.atualizar_inputs("", "", "", "", "", "", "", "");
            this.valor_total = 0;
            this.dispatchEvent(new CustomEvent("atualizou_valores"));

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
            

            let soma = 0;
            let icms = 0;

            if (this._usar_icms){

                soma = valor + ii_final;

                icms = (soma/(1-DadosRemessa.ALIQUOTA_ICMS))*DadosRemessa.ALIQUOTA_ICMS;

                this.valor_total = soma + icms;
            }else{

                this.valor_total = valor + ii_final;
            }

            // Convertendo input para porcentagem
            const aliquotaPorcentagem = aliquota * 100;

            this.atualizar_inputs(
                valor, 
                aliquotaPorcentagem.toFixed(0) + '%',
                ii_inicial.toFixed(2), 
                'US$' + ' ' +  desconto.toFixed(0), 
                ii_final.toFixed(2), 
                soma.toFixed(2), 
                icms.toFixed(2), 
                'R$' + ' ' +  this.valor_total.toFixed(2));            
        }

        this.dispatchEvent(new CustomEvent("atualizou_valores"));
    }



    atualizar_inputs(valor, aliquota, ii_inicial, desconto, ii_final, soma, icms, valor_total){

        this.noRaiz.querySelector("#valor-remessa").value = valor;
        this.noRaiz.querySelector("#aliquota-remessa").value = aliquota;
        this.noRaiz.querySelector("#iiinicial-remessa").value = ii_inicial;
        this.noRaiz.querySelector("#desconto-remessa").value = desconto;
        this.noRaiz.querySelector("#iifinal-remessa").value = ii_final;        
        this.noRaiz.querySelector("#soma-remessa").value = soma;
        this.noRaiz.querySelector("#icms-remessa").value = icms;
        this.noRaiz.querySelector("#total-remessa").value = valor_total;
    }



    static isNumeroValido(str) {
        // Remove espaços em branco no início e no fim da string
        str = str.trim();
    
        // Verifica se a string é um número usando parseFloat e isNaN
        return !isNaN(parseFloat(str)) && isFinite(str);
    }
}


customElements.define('br-remessa', DadosRemessa);

