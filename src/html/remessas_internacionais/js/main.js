

import { Cabecalho } from "../componentes/cabecalho/cabecalho.js";


window.addEventListener("load", () => {

  const cabecalho = document.querySelector("br-cabecalho");
  const lista_remessas = document.querySelector("lista-remessas");

  function esperarEvento(elemento, evento) {
    return new Promise((resolve) => {
      elemento.addEventListener(evento, resolve, { once: true });
    });
  }

  Promise.all([
    esperarEvento(cabecalho, "carregou"),
    esperarEvento(lista_remessas, "carregou")
  ]).then(() => {

    const painel_informacoes = cabecalho.noRaiz.querySelector("painel-informacoes");

    esperarEvento(painel_informacoes, "carregou").then(() => {

      lista_remessas.addEventListener("fechou", (evento)=>{
        
        painel_informacoes.remessa_conforme = evento.detail.remessa_conforme;        
      });

      lista_remessas.addEventListener("atualizou_total", ()=>{        
        if (painel_informacoes){
          painel_informacoes.valor_total = lista_remessas.total.toFixed(2);    
        }        
      });
    
      
      painel_informacoes.addEventListener("atualizou_remessa_conforme", ()=>{
        lista_remessas.remessa_conforme = painel_informacoes.remessa_conforme;
      });

      //Cotação pode ser atualizada por mudança no input do usuário
      painel_informacoes.addEventListener("atualizou_cotacao_dolar", ()=>{        
        lista_remessas.cotacao_dolar = painel_informacoes.cotacao_dolar;
      });
      //Cotação também pode ser trazida por API e estar disponível desde o começo      
      if (painel_informacoes.cotacao_dolar){        
        lista_remessas.cotacao_dolar = painel_informacoes.cotacao_dolar;
      }
    });
  });
});
