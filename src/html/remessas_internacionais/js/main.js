window.addEventListener("load", ()=>{

  let lista_remessas = document.querySelector("lista-remessas");

  lista_remessas.addEventListener("atualizou_total", ()=>{    
    document.querySelector("#sum-value").textContent = lista_remessas.total.toFixed(2);
  });
});
