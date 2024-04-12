import { GovBRUtils } from "../js/GovBRUtils.js";
import { SelectCodigosReceita } from "../componentes/select_codigos_receita/select_codigos_receita.js";

export class TabelaDebitos extends HTMLElement{
    
    constructor(){
        super();

        this.qtd_linhas_debito = 0;

        console.log ("Constructor LinhaTabelaDebitos");
        
        fetch('./tabela_debitos/tabela_debitos.html').then(resultado => {
            
            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;
                
                this.appendChild(template.content.cloneNode(true));
                
                // Selecionar o botão pelo ID e anexar o evento onclick
                this.querySelector("#btnIncluirNovoDebito").addEventListener('click', () => {

                    this.incluirNovoDebito();
                });

                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });        
    }

    // ADICIONA LINHA NA TABELA DEBITOS
    incluirNovoDebito() {

        let template_linha = this.querySelector('#template_linha_tabela_debitos');
        
        let body_tabela_debitos = this.querySelector('#tabelaDebitosBody');
        
        let nova_linha_debito = body_tabela_debitos.appendChild(template_linha.content.cloneNode(true));                

        setTimeout(()=>{            
            
            let novaLinha = body_tabela_debitos.children[body_tabela_debitos.children.length-1];

            novaLinha.querySelector('#selectTipoDeclaracao').id = `selectTipoDeclaracao_${body_tabela_debitos.children.length-1}`;
        
            // Ajusta o espaçamento dos títulos e campos
            let titulosCampos = novaLinha.querySelectorAll('td');
            titulosCampos.forEach(function(elemento) {
                elemento.style.padding = "5px"; // Espaçamento interno dos títulos e campos
            });

            // Adiciona evento de clique ao botão de exclusão de linha
            let btnExcluirLinha = novaLinha.querySelector('#btnExcluirLinha');

            btnExcluirLinha.addEventListener('click',  () => {

                // Remove a linha correspondente ao botão de exclusão
                novaLinha.remove();

                // Verifica se todas as linhas foram removidas e ajusta a margem esquerda da tabela
                if (this.querySelectorAll('#tabelaDebitosBody tr').length === 0) {
                    let tabela = this.querySelector('#tabelaDebitos');
                    tabela.style.marginLeft = "-5px"; // Volta à margem padrão
                }
            });

            // Ajusta a margem esquerda da tabela após adicionar uma nova linha
            let tabela = this.querySelector('#tabelaDebitos');
            tabela.style.marginLeft = "-5px"; // Ajusta a margem esquerda
            
            // Inicializa os selects conforme o padrão do design system após adicionar uma nova linha
            GovBRUtils.inicializarSelects(novaLinha);  
        });              
    }    
}
customElements.define('br-tabela-debitos', TabelaDebitos);