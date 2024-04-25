import { GovBRUtils } from "../js/GovBRUtils.js";
import { SelectCreditosTerceiros } from "../componentes/select_creditos_terceiros/select_creditos_terceiros.js";
import { SelectAliquotasCreditosTerceiros } from "../componentes/select_creditos_terceiros/select_aliquotas_creditos_terceiros.js";

export class TabelaCreditosTerceiros extends HTMLElement{
    
    constructor(){
        super();

        this.qtd_linhas_credito_terceiros = 0;

        console.log ("Constructor LinhaTabelaCreditosTerceiros");
        
        fetch('./tabela_creditos_terceiros/tabela_creditos_terceiros.html').then(resultado => {
            
            resultado.text().then(texto_pagina => {                            

                let template = document.createElement('template');

                template.innerHTML = texto_pagina;
                
                this.appendChild(template.content.cloneNode(true));
                
                // Selecionar o botão pelo ID e anexar o evento onclick
                this.querySelector("#btnIncluirCreditoTerceiros").addEventListener('click', () => {

                    this.incluirNovoCreditoTerceiros();
                });

                this.dispatchEvent(new CustomEvent("carregou"));                
            });
        });        
    }

    // ADICIONA LINHA NA TABELA Creditos Terceiros
    incluirNovoCreditoTerceiros() {

        let template_linha = this.querySelector('#template_linha_tabela_creditos_terceiros');
        
        let body_tabela_creditos_terceiros = this.querySelector('#tabelaTerceirosBody');
        
        let nova_linha_credito_terceiros = body_tabela_creditos_terceiros.appendChild(template_linha.content.cloneNode(true));                
        nova_linha_credito_terceiros.id = "nova_linha_credito_terceiros";

        setTimeout(()=> {
            
            let novaLinha = body_tabela_creditos_terceiros.children[body_tabela_creditos_terceiros.children.length-1];

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
                if (this.querySelectorAll('#tabelaCreditosTerceirosBody tr').length === 0) {
                    let tabela = this.querySelector('#tabelaCreditosTerceiros');
                    tabela.style.marginLeft = "-5px"; // Volta à margem padrão
                }
            });

            // Ajusta a margem esquerda da tabela após adicionar uma nova linha
            let tabela = this.querySelector('#tabelaCreditosTerceiros');
            tabela.style.marginLeft = "-5px"; // Ajusta a margem esquerda
            
            // Inicializa os selects conforme o padrão do design system após adicionar uma nova linha
            GovBRUtils.inicializarSelects(novaLinha);                  
         });            
    }    
}
customElements.define('br-tabela-creditos-terceiros', TabelaCreditosTerceiros);