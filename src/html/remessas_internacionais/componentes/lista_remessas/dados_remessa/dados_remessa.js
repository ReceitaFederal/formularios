

import { ComponenteBase } from "../../../../bibliotecas/ultima/componente_base.js";
import { InputAnimado } from "../../input_animado/input_animado.js";



export class DadosRemessa extends ComponenteBase {
    


    static VALOR_BASE = 50.00;

    static ALIQUOTA_ICMS = 0.17;



    constructor() {
        super({templateURL:"./dados_remessa.html", shadowDOM:false}, import.meta.url);


        this.valor_total = 0;        


        this.addEventListener("carregou", ()=> {
           
            this.elemento_unico = false;

            this.remessa_conforme = true;

            this.adicionar_comportamento();            
        });
    }


    tecla_valida(tecla, valor){

        let retorno = false;        

        //Número são teclas válidas
        if (/[0-9]/.test(tecla)){

            retorno = true;

        //Teclas especiais válidas de edição e navegação
        }else if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(tecla)){

            retorno = true;

        //Vírgula é válido apenas em alguma situações
        }else if (tecla == ','){

            //Se for o único caracter não é válido
            if (valor.length == 0){

                retorno = false;

            //Se já existir uma vírgula também não é válido
            }else if (valor.includes(",")){

                retorno = false;                
            
            }else{

                retorno = true;
            }
        }

        return retorno;
    }


    adicionar_comportamento() {        

        let input_valor = this.noRaiz.querySelector("#valor-remessa");

        //Mudança de valore do produto da remessa
        {            
            // Adiciona um event listener para capturar eventos de teclado
            input_valor.addEventListener('keydown', evento => {

                // Permite apenas números e teclas de controle como Backspace, Delete e setas
                if (!this.tecla_valida(evento.key, input_valor.value)){

                    // Cancela a ação padrão se a tecla não for um número
                    evento.preventDefault(); 
                }                
            });

            
            // Sempre que uma tecla for pressionada chama o calcula_imposto
            input_valor.addEventListener("input", evento => {
                
                this.calcular_imposto();
            });
        }


        //Remoção ou limpeza do valor
        {
            this.noRaiz.querySelector("#btn_remover").addEventListener("click", ()=>{

                //Se ele for um elemento único, o botão chama limpar e apenas zera o valor
                if (this.elemento_unico){

                    input_valor.value = "";
                    this.calcular_imposto();

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
    }


    get elemento_unico(){
        return this._elemento_unico;
    }


    set cotacao_dolar(valor){

        this._cotacao_dolar = valor;
        this.calcular_imposto();                
    }    


    get cotacao_dolar(){

        return this._cotacao_dolar;
    }


    set remessa_conforme(valor){

        this._remessa_conforme = valor;
        this.calcular_imposto();                
    }


    get remessa_conforme(){
        return this._remessa_conforme;
    }


    calcular_imposto(){
        

        let input_valor = this.noRaiz.querySelector("#valor-remessa");

        let valor_input = input_valor.value;


        //Se termina com vírgula
        if (valor_input.endsWith(",")){

            //Adiciona um zero apenas para processar corretamente
            valor_input += "0"; 
        }

        //Troca a vírgula por ponto para o javascript processar como float
        valor_input = valor_input.replace(",", ".");

        //Se nada foi digitado
        if (valor_input.length == 0){

            this.atualizar_inputs("", "", "", "", "", "", "");
            this.valor_total = 0;
            this.dispatchEvent(new CustomEvent("atualizou_valores"));

        //Se não é um número valido
        }else if (!DadosRemessa.isNumeroValido(valor_input)){

            //Faz alguma coisa
            alert(`${valor_input} não é um número válido!`)


        }else{
            
            let valor = parseFloat(valor_input);

            let valor_em_dolar = valor / this.cotacao_dolar;

            //Inicializa variáveis
            let aliquota = -1;            
            
            //Se não for remessa conforme ou o valor em dolar for maior que 50 dólares
            if (!this.remessa_conforme || (valor_em_dolar > 50)){

                //Alíquota de 60%
                aliquota = 0.6;

            }else{
                
                //Caso contrário alíquota zero
                aliquota = 0;
            }
       

            let ii = valor * aliquota;            
            

            let soma = valor + ii;

            let icms = (soma/(1-DadosRemessa.ALIQUOTA_ICMS))*DadosRemessa.ALIQUOTA_ICMS;
            this.valor_total = soma + icms;
            


            // Convertendo input para porcentagem
            const aliquotaPorcentagem = aliquota * 100;

            this.atualizar_inputs(
                aliquotaPorcentagem.toFixed(0) + '%',
                `R$ ${ii.toFixed(2)}`,                 
                `R$ ${soma.toFixed(2)}`, 
                `R$ ${icms.toFixed(2)}`, 
                `R$ ${this.valor_total.toFixed(2)}`);            
        }

        this.dispatchEvent(new CustomEvent("atualizou_valores"));
    }



    atualizar_inputs(aliquota, ii, soma, icms, valor_total){

        this.noRaiz.querySelector("#aliquota-remessa").value = aliquota;
        this.noRaiz.querySelector("#ii-remessa").value = ii;        
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

