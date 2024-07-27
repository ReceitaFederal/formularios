

import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";
import { RemessaUtil } from "../../js/remessa_util.js";



export class CalculadoraCompras extends ComponenteBase {
    


    static VALOR_BASE = 50.00;

    static ALIQUOTA_ICMS = 0.17;



    constructor() {
        super({templateURL:"./calculadora_compras.html", shadowDOM:false}, import.meta.url);

        this.addEventListener(ComponenteBase.EVENTO_CARREGOU, ()=> {

            this.remessa_conforme = undefined;

            this.adicionar_comportamento();            
        });
    }


    


    adicionar_comportamento() {        

        this.noRaiz.querySelector("#com_remessa_conforme").addEventListener("click", ()=>{
            this.remessa_conforme = true;
        });

        this.noRaiz.querySelector("#sem_remessa_conforme").addEventListener("click", ()=>{
            this.remessa_conforme = false;
        });

        let input_valor = this.noRaiz.querySelector("#valor-remessa");

        //Mudança de valores do produto da remessa
        {            
            // Adiciona um event listener para capturar eventos de teclado
            input_valor.addEventListener('keydown', evento => {

                // Permite apenas números e teclas de controle como Backspace, Delete e setas
                if (!RemessaUtil.tecla_valida(evento.key, input_valor.value)){

                    // Cancela a ação padrão se a tecla não for um número
                    evento.preventDefault(); 
                }                
            });

            
            // Sempre que uma tecla for pressionada chama o calcula_imposto
            input_valor.addEventListener("input", evento => {
                
                this.calcular_imposto();
            });
        }


    }


    set cotacao_dolar(valor){

        this._cotacao_dolar = valor;
        this.calcular_imposto();                
    }    


    get cotacao_dolar(){

        return this._cotacao_dolar;
    }


    set remessa_conforme(valor){
                
        //Quando um valor para remessa conforme é definido o valor passa a estar disponível para mudança (enabled)
        //Caso contrário, se o valor for undefined, então o valor-remessa será desabilitado
        this.noRaiz.querySelector("#valor-remessa").disabled = (valor === undefined);

        this._remessa_conforme = valor;
        this.calcular_imposto();                
    }


    get remessa_conforme(){
        return this._remessa_conforme;
    }


    calcular_imposto(){
        

        let input_valor = this.noRaiz.querySelector("#valor-remessa");

        let valor_input = input_valor.value;
    

        //Troca a vírgula por ponto para o javascript processar como float
        valor_input = valor_input.replace(",", ".");

        //Se nada foi digitado
        if (valor_input.length == 0){

            this.atualizar_inputs("", "", "", "", "", "", "");            
            this.dispatchEvent(new CustomEvent("atualizou_valores"));

        //Se não é um número valido
        }else if (!CalculadoraCompras.isNumeroValido(valor_input)){

            //Faz alguma coisa
            alert(`${valor_input} não é um número válido!`)


        }else{
            
            this.processar_calculo(valor_input, this.remessa_conforme, true);
            let valor_alternativo = this.processar_calculo(valor_input, !this.remessa_conforme, false);
            this.noRaiz.querySelector("#valor_alternativo").textContent = `Seria ${valor_alternativo} ${!this.remessa_conforme?"com":"sem"} Remessa Conforme.`;
        }

        this.dispatchEvent(new CustomEvent("atualizou_valores"));
    }



    processar_calculo (valor_input, remessa_conforme, atualizar_campos){

        let valor = parseFloat(valor_input);

        let valor_em_dolar = valor / this.cotacao_dolar;

        //Inicializa variáveis
        let aliquota = -1;
        let desconto = -1;
        

        if (!remessa_conforme){

            aliquota = 0.60; //60% de II
            desconto = 0; //Não tem desconto

        }else{
            if (valor_em_dolar <= CalculadoraCompras.VALOR_BASE){

                aliquota = 0.20; //20% de II
                desconto = 0; //Não tem desconto

            }else{
                aliquota = 0.60; //60% de II
                desconto = 20 * this.cotacao_dolar; //$20 de desconto            
            }
        }

        let ii_inicial = valor * aliquota;
        let ii_final = ii_inicial - desconto;
        

        let soma = valor + ii_final;

        let icms = (soma/(1-CalculadoraCompras.ALIQUOTA_ICMS))*CalculadoraCompras.ALIQUOTA_ICMS;

        let valor_total = soma + icms;


        // Convertendo input para porcentagem
        const aliquotaPorcentagem = aliquota * 100;
        
        /*
        console.log(`em dolar: $ ${valor_em_dolar.toFixed(2)}`);
        console.log(`aliquota: ${aliquotaPorcentagem.toFixed(0)}%`);
        console.log(`ii inicial: R$ ${ii_inicial.toFixed(2)}`);
        console.log(`desconto: R$ ${desconto}`);        
        console.log(`ii_final: R$ ${ii_final.toFixed(2)}`);                 
        console.log(`soma: R$ ${soma.toFixed(2)}`); 
        console.log(`icms: R$ ${icms.toFixed(2)}`); 
        console.log(`total: R$ ${this.valor_total.toFixed(2)}`);  
        console.log ("----------------");
        */
        if (atualizar_campos){
            this.atualizar_inputs(
                aliquotaPorcentagem.toFixed(0) + '%',
                `R$ ${ii_final.toFixed(2)}`,                 
                `R$ ${soma.toFixed(2)}`, 
                `R$ ${icms.toFixed(2)}`, 
                `R$ ${valor_total.toFixed(2)}`);   
        }

        return `R$ ${valor_total.toFixed(2)}`;
    }    



    atualizar_inputs(aliquota, ii, soma, icms, valor_total){

        this.noRaiz.querySelector("#aliquota-remessa").value = aliquota;
        this.noRaiz.querySelector("#ii-remessa").value = ii;        
        this.noRaiz.querySelector("#soma-remessa").value = soma;
        this.noRaiz.querySelector("#icms-remessa").value = icms;
        this.noRaiz.querySelector("#total-remessa").textContent = valor_total;
    }



    static isNumeroValido(str) {
        // Remove espaços em branco no início e no fim da string
        str = str.trim();
    
        // Verifica se a string é um número usando parseFloat e isNaN
        return !isNaN(parseFloat(str)) && isFinite(str);
    }
}


customElements.define('calculadora-compras', CalculadoraCompras);

