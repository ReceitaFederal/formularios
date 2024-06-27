

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

    const dados_encomendas = cabecalho.noRaiz.querySelector("dados-encomendas");

    esperarEvento(dados_encomendas, "carregou").then(() => {

      lista_remessas.addEventListener("fechou", (evento)=>{
        
        dados_encomendas.remessa_conforme = evento.detail.remessa_conforme;        
    });

      lista_remessas.addEventListener("atualizou_total", ()=>{        
        if (dados_encomendas){
          dados_encomendas.valor_total = lista_remessas.total.toFixed(2);    
        }        
      });
    
    
      dados_encomendas.addEventListener("atualizou_remessa_conforme", ()=>{
        lista_remessas.remessa_conforme = dados_encomendas.remessa_conforme;
      });
    });
  });
});
