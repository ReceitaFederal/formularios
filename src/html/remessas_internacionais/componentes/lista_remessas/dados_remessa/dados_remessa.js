

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

            let valor_em_dolar = valor / this.cotacao_dolar;

            //Inicializa variáveis
            let aliquota = -1;            
            
            //Se não for remessa conforme
            /*
                A calculadora pergunta à pessoa se ela comprou de site certificado no PRC. Haverá 3 respostas: sim, não ou não sei.
                se ela optar por não sei, haverá um link para a listagem dos sites certificados
                a pessoa digitará o VALOR DA COMPRA em REAIS

                no caso da resposta da pergunta 1 ser "não", a calculadora exibirá diretamente os resultados, que serão: 
                II no valor de 60%, sempre em reais e ICMS no valor de 17% "por dentro" e incidindo também sobre o II calculado .
                 
                no caso da resposta da pergunta 2 ser "sim", a calculadora comparará o valor digitado com o equivalente, em reais,
                 a USD 50. A calculadora deverá calcular esse valor utilizando o dólar do Siscomex do dia anterior. 
                No caso de o valor calculado ser MAIOR que o equivalente a USD 50, a calculadora exibirá os resultados exatamente 
                como no item 4, acima. 
                No caso de o valor calculado ser IGUAL OU MENOR que o equivalente em reais a USD 50, a calculadora exibirá 
                o II no valor zero (alíquota 0%) e o ICMS no valor de 17% "por dentro" (na prática, o ICMS será de pouco mais de 20%)                 
            */
            if (!this.remessa_conforme || (valor_em_dolar > 50)){

                aliquota = 0.6;


            }else{
                
                aliquota = 0;
            }
       

            let ii = valor * aliquota;            
            

            let soma = valor + ii;

            let icms = (soma/(1-DadosRemessa.ALIQUOTA_ICMS))*DadosRemessa.ALIQUOTA_ICMS;
            this.valor_total = soma + icms;
            


            // Convertendo input para porcentagem
            const aliquotaPorcentagem = aliquota * 100;

            this.atualizar_inputs(
                valor, 
                aliquotaPorcentagem.toFixed(0) + '%',
                ii.toFixed(2),                 
                soma.toFixed(2), 
                icms.toFixed(2), 
                'R$' + ' ' +  this.valor_total.toFixed(2));            
        }

        this.dispatchEvent(new CustomEvent("atualizou_valores"));
    }



    atualizar_inputs(valor, aliquota, ii, soma, icms, valor_total){

        this.noRaiz.querySelector("#valor-remessa").value = valor;
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

