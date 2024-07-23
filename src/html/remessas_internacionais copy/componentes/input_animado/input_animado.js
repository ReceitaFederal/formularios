import { ComponenteBase } from "../../bibliotecas/ultima/componente_base.js";

export class InputAnimado extends ComponenteBase{
    
    constructor(){
        super({templateURL:"./input_animado.html", shadowDOM:false}, import.meta.url);         
    }

    set value (valor){

        //Apenas anima quando o valor muda
        if (this.valor != valor){
            this.valor = valor;
            this.animar();
        }
    }

    get value (){
        return this.valor;
    }

    animar(){
        const container_input = this.noRaiz.querySelector('.container-input');
        const input_valor_anterior = this.noRaiz.querySelector('#campoInput');
        const input_novo_valor = document.createElement('input');

        input_novo_valor.type = 'text';
        input_novo_valor.classList.add('campo-input', 'novo');
        input_novo_valor.value = this.valor;
        input_novo_valor.readOnly = true;

        container_input.appendChild(input_novo_valor);

        setTimeout(() => {
            input_valor_anterior.classList.add('anterior');
            input_novo_valor.classList.remove('novo');

            setTimeout(() => {
                container_input.removeChild(this.noRaiz.querySelector('#campoInput'));
                input_novo_valor.id = 'campoInput';
            }, 500);
        }, 10);
    }
    
}
customElements.define('input-animado', InputAnimado);