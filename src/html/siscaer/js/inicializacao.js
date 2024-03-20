


let cabecalho = document.querySelector("br-cabecalho");
let rodape = document.querySelector("br-rodape");

function esperarPeloEventoCarregou(elemento){
  return new Promise((resolve, reject) => {
    elemento.addEventListener("carregou", () => {
      resolve();
    });    
  });
}

const promessa_carregou_cabecalho = esperarPeloEventoCarregou(cabecalho);
const promessa_carregou_rodape = esperarPeloEventoCarregou(rodape);



Promise.all([promessa_carregou_cabecalho, promessa_carregou_rodape]).then(() => {
  
  let body = document.querySelector("body");

  let script_core = document.createElement("script");
  script_core.type = "module";
  script_core.src = "../bibliotecas/govbr-ds/core.js";

  body.appendChild(script_core);

  let script_core_init = document.createElement("script");        
  script_core_init.src = "../bibliotecas/govbr-ds/core-init.js";

  body.appendChild(script_core_init);

});