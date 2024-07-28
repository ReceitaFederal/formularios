

import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";
import { Cotacao } from "../../js/cotacao.js";
import { RemessaUtil } from "../../js/remessa_util.js";



export class PainelInformacoes extends ComponenteBase {
    
    constructor() {
        super({templateURL:"./painel_informacoes.html", shadowDOM:false}, import.meta.url);

        this.addEventListener(ComponenteBase.EVENTO_CARREGOU, this.processarCarregamento);
    }

    processarCarregamento(evento){
        evento.preventDefault();
        this.removeEventListener(ComponenteBase.EVENTO_CARREGOU, this.processarCarregamento);

        Cotacao.COTACAO_DOLAR().then(cotacao => {                

            this.adicionar_comportamento();

            this.cotacao_dolar = cotacao;            

            this.noRaiz.querySelector("#valor_cotacao_dolar").value = `R$ ${this.cotacao_dolar.toFixed(2).replace(".",",")}`;                                        
            this.dispatchEvent(new CustomEvent("atualizou_cotacao_dolar"));            
            super.disparar_evento_carregou();
        });        
    }


    adicionar_comportamento() {
        
        let input_valor_cotacao_dolar = this.noRaiz.querySelector("#valor_cotacao_dolar");

        //Mudança de valore do produto da remessa
        {            
            // Adiciona um event listener para capturar eventos de teclado
            input_valor_cotacao_dolar.addEventListener('keydown', evento => {

                // Permite apenas números e teclas de controle como Backspace, Delete e setas
                if (!RemessaUtil.tecla_valida(evento.key, input_valor_cotacao_dolar.value)){

                    // Cancela a ação padrão se a tecla não for um número
                    evento.preventDefault(); 
                }                
            });

            
            // Sempre que uma tecla for pressionada indica atualização da cotação do dolar
            input_valor_cotacao_dolar.addEventListener("input", evento => {

                let valor = input_valor_cotacao_dolar.value.replace(/^R\$\s?/, ''); // Remove prefixo existente
                input_valor_cotacao_dolar.value = 'R$ ' + valor;
                valor = valor.replace(",",".");

                if (valor === ''){
                    this.cotacao_dolar = 0;
                }else{
                    this.cotacao_dolar = parseFloat(valor);
                }

                Cotacao.atualizarCotacao(this.cotacao_dolar);
                
                this.dispatchEvent(new CustomEvent("atualizou_cotacao_dolar"));
            });

            input_valor_cotacao_dolar.addEventListener('focus', () => {
                if (input_valor_cotacao_dolar.value === '') {
                    input_valor_cotacao_dolar.value = 'R$ ';
                }

                // Reposiciona o cursor após o $
                if (input_valor_cotacao_dolar.value.startsWith('R$') && input_valor_cotacao_dolar.selectionStart < 3) {
                    input_valor_cotacao_dolar.setSelectionRange(3, 3);
                }
            });

            input_valor_cotacao_dolar.addEventListener('click', () => {
                // Reposiciona o cursor após o $
                if (input_valor_cotacao_dolar.value.startsWith('R$') && input_valor_cotacao_dolar.selectionStart < 3) {
                    input_valor_cotacao_dolar.setSelectionRange(3, 3);
                }
            });

            input_valor_cotacao_dolar.addEventListener('blur', () => {
                if (input_valor_cotacao_dolar.value === 'R$ ') {
                    input_valor_cotacao_dolar.value = '';
                }
            });
        }
    }
}
customElements.define('painel-informacoes', PainelInformacoes);
