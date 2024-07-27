
import { ComponenteBase } from "../bibliotecas/ultima/componente_base.js";

window.addEventListener("load", () => {  

  const cabecalho = document.querySelector("br-cabecalho");

  const painel_informacoes = document.querySelector("painel-informacoes");

  const calculadora_compras = document.querySelector("calculadora-compras");

  function esperarEvento(elemento, evento) {
    console.log (`esperarEvento ${elemento} ${evento}`);
    return new Promise((resolve) => {      
      elemento.addEventListener(evento, resolve, { once: true });
    });
  }

  Promise.all([
    painel_informacoes.aguardar_carrregamento(),
    calculadora_compras.aguardar_carrregamento()
  ]).then(() => {    

    // Para funcionar o botão fechar do br-message
    const alertList = []
    for (const brAlert of window.document.querySelectorAll('.br-message')) {
      alertList.push(new core.BRAlert('br-message', brAlert))
    }

    //Cotação pode ser atualizada por mudança no input do usuário
    painel_informacoes.addEventListener("atualizou_cotacao_dolar", ()=>{          
      calculadora_compras.cotacao_dolar = painel_informacoes.cotacao_dolar;
    });
    //Cotação também pode ser trazida por API e estar disponível desde o começo      
    if (painel_informacoes.cotacao_dolar){              
      calculadora_compras.cotacao_dolar = painel_informacoes.cotacao_dolar;
    }    
  });
});
