
export class Cotacao {

    static cotacoesCache = {};

    static async COTACAO_DOLAR() {

        let valor = localStorage.getItem('cotacao_dolar');

        //Caso não haja informação de cotação do dolar
        if (!valor){

            //Coloca uma cotação arbitrada em R$ 5.53 (cotação de 27/06/2024)
            valor = 5.53;
            
            //Atualizar o armazenamento local
            localStorage.setItem('cotacao_dolar', valor);

        }else{

            //Caso exista cotação, converte para float para usarmos em outros lugares
            valor = parseFloat(valor);
        }

        return valor;        
    }

    static atualizarCotacao(valor){
        localStorage.setItem('cotacao_dolar', valor);
    }
}