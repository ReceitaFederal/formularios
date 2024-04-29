 window.addEventListener("load", ()=>{

    let botao = document.querySelector("#meu_botao");

    try{
        botao.addEventListener("click", (evento)=>{
            console.log(evento);
            console.dir(evento);

            let dicionario = {
                "campo": "valor",
                "lista":[1, 2, 44, 66]
            };

            console.log (dicionario);
            console.dir(dicionario);

        });
    }catch (excecao){
        console.log ("DEU UM ERRO!!!!!!!!!!!!");
        console.dir (excecao);
    }   
});