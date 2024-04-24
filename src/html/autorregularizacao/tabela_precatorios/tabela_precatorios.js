import { GovBRUtils } from "../js/GovBRUtils.js";

export class TabelaPrecatorios extends HTMLElement{
    
    constructor(){
        super();

        this.qtd_linhas_precatorio = 0;

        console.log ("Constructor LinhaTabelaPrecatorios");
        
        fetch('./tabela_precatorios/tabela_precatorios.html').then(resultado => {
            
            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;
                
                this.appendChild(template.content.cloneNode(true));
                
                // Selecionar o botão pelo ID e anexar o evento onclick
                this.querySelector("#btnIncluirNovoPrecatorio").addEventListener('click', () => {

                    this.incluirNovoPrecatorio();
                });

                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });        
    }

    // ADICIONA LINHA NA TABELA PRECATORIOS
    incluirNovoPrecatorio() {

        let template_linha = this.querySelector('#template_linha_tabela_precatorios');
        
        let body_tabela_precatorios = this.querySelector('#tabelaPrecatoriosBody');
        
        let nova_linha_precatorio = body_tabela_precatorios.appendChild(template_linha.content.cloneNode(true));                
        nova_linha_precatorio.id = "nova_linha_precatorio";

        return true;

        setTimeout(()=> {

                nova_linha_precatorio = body_tabela_precatorios.querySelector("#nova_linha_precatorio");

                nova_linha_precatorio.id = `linhaprecatorio_${body_tabela_precatorios.children.length-1}`;
            
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
                    if (this.querySelectorAll('#tabelaPrecatoriosBody tr').length === 0) {
                        let tabela = this.querySelector('#tabelaPrecatorios');
                        tabela.style.marginLeft = "-5px"; // Volta à margem padrão
                    }
                });

                // Ajusta a margem esquerda da tabela após adicionar uma nova linha
                let tabela = this.querySelector('#tabelaPrecatorios');
                tabela.style.marginLeft = "-5px"; // Ajusta a margem esquerda
                
                // Inicializa os selects conforme o padrão do design system após adicionar uma nova linha
                GovBRUtils.inicializarSelects(novaLinha);                  
            });             
    }    
}
customElements.define('br-tabela-precatorios', TabelaPrecatorios);