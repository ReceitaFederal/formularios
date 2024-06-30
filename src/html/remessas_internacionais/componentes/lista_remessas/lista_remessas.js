

import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";
import { DadosRemessa } from "./dados_remessa/dados_remessa.js";
import { GovBRUtils } from "../../bibliotecas/govbrutils.js";
import { TermoDeUso } from "../modal/termo_de_uso/termo_de_uso.js";
import { RemessaConforme } from "../modal/remessa_conforme/remessa_conforme.js";


export class ListaRemessas extends ComponenteBase {
    
    constructor() {
        super({templateURL:"./lista_remessas.html", shadowDOM:false}, import.meta.url);        

        this.total = 0;
        
        
        this.addEventListener("carregou", ()=> {                                
            
            const modal_termo_de_uso = this.noRaiz.querySelector("termo-de-uso");

            modal_termo_de_uso.addEventListener("carregou", ()=>{
                modal_termo_de_uso.exibir();
            });

            modal_termo_de_uso.addEventListener("fechou", ()=>{    
                
                const modal_remessa_conforme = this.noRaiz.querySelector("remessa-conforme");
                
                modal_remessa_conforme.exibir();
             
                modal_remessa_conforme.addEventListener("fechou", ()=>{

                    this.remessa_conforme = modal_remessa_conforme.remessa_conforme;
                    this.adicionar_comportamento();
                });                
            });            
        });
    }    

    set cotacao_dolar (valor){
        this._cotacao_dolar = valor;        
        this.atualizar_comportamento_dados_remessa();
    }

    get cotacao_dolar(){
        return this._cotacao_dolar;
    }


    set remessa_conforme (valor){
        this._remessa_conforme = valor;        
        this.atualizar_comportamento_dados_remessa();
    }

    get remessa_conforme(){
        return this._remessa_conforme;
    }


    adicionar_comportamento() {          


        this.atualizar_comportamento_dados_remessa();

                
        let btn_adicionar = this.noRaiz.querySelector("#adicionar_remessa");

        btn_adicionar.addEventListener("click", (evento) => {

            evento.preventDefault(); // Impede o comportamento padrão do link
            
            this.adicionar_remessa();
        });                    
    }


    atualizar_comportamento_dados_remessa(){
        
        let remessas = this.noRaiz.querySelectorAll("br-remessa");
        
        let elemento_unico = (remessas.length == 1);

        remessas.forEach(remessa => {
            
            if (remessa.carregado){

                this.adicionar_comportamento_remessa (remessa, elemento_unico);            

            }else{

                remessa.addEventListener("carregou", evento => {
                    
                    this.adicionar_comportamento_remessa (remessa, elemento_unico);  
                });
            }
        });
    }
    



    adicionar_remessa() {
        
        let divRemessas = this.noRaiz.querySelector(`#lista_remessas`);
        let nova_remessa = document.createElement("br-remessa"); 
        
        nova_remessa.id = GovBRUtils.gerarUUID();

        divRemessas.appendChild(nova_remessa);

        this.atualizar_comportamento_dados_remessa();
    }


    adicionar_comportamento_remessa(remessa, elemento_unico){
        
        remessa.elemento_unico = elemento_unico;
        
        remessa.remessa_conforme = this.remessa_conforme;        

        remessa.cotacao_dolar = this.cotacao_dolar;

        //Primeiro remove para evitar ter vários listeners
        remessa.removeEventListener("atualizou_valores", this.atualizou_valores.bind(this));
        //Depois adiciona um listener para quando um valor é atualizado
        remessa.addEventListener("atualizou_valores", this.atualizou_valores.bind(this));  
        
        //Primeiro remove para evitar ter vários listeners
        remessa.removeEventListener("remover", this.remover_remessa.bind(this));        
        //Depois adiciona um listener para quando um item indica que deve ser removido
        remessa.addEventListener("remover", this.remover_remessa.bind(this));
    }



    atualizou_valores(evento){

        let dados_remessas_i = this.noRaiz.querySelectorAll("br-remessa");

        this.total = 0;

        dados_remessas_i.forEach(dado_remessa_i => {

            this.total += dado_remessa_i.valor_total;
        });

        this.dispatchEvent(new CustomEvent("atualizou_total"));
    }    



    remover_remessa(evento) {

        let elemento = evento.currentTarget;

        let divRemessas = this.querySelector(`#lista_remessas`);
        
        divRemessas.removeChild(elemento);  
        
        this.atualizar_comportamento_dados_remessa();
    }
}

customElements.define('lista-remessas', ListaRemessas);
