window.addEventListener("load", ()=>{

    setInterval(()=>{

        contador = contador + 1;

        let tempo_padrao_ISO = new Date().toISOString();
        let prefixo = "Abelha";

        document.querySelector("#meu_texto_2").value = `${contador} - ${prefixo}: ${tempo_padrao_ISO}`;
    }, 5000);
});