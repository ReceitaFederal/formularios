export class LinhaTabelaDebitos extends HTMLElement{
    
    constructor(){
        super();

        console.log ("Constructor LinhaTabelaDebitos");
        
        fetch('./linha_tabela_debitos/linha_tabela_debitos.html').then(resultado => {
            

            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;

                this.appendChild(template.content.cloneNode(true));
                
                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });

        

    }
}
customElements.define('br-linha-tabela-debitos', LinhaTabelaDebitos);