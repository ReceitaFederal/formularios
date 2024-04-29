window.addEventListener("load", ()=>{    

    var contador = 0;

    setInterval(()=>{

        contador = contador + 1;

        document.querySelector("#meu_texto_1").value = `${contador} - ${new Date().toISOString()}`;
    }, 3000);

});