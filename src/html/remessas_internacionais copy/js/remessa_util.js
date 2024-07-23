

export class RemessaUtil{


    
    static tecla_valida(tecla, valor){        

        let retorno = false;        

        //Número são teclas válidas. Verifica usando expressão regular /[0-9]/
        if (/[0-9]/.test(tecla)){

            retorno = true;

        //Teclas especiais válidas de edição e navegação
        }else if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(tecla)){

            retorno = true;

        //Vírgula é válido apenas em alguma situações
        }else if (tecla == ','){

            //Se for o único caracter não é válido
            if (valor.length == 0){

                retorno = false;

            //Se já existir uma vírgula também não é válido
            }else if (valor.includes(",")){

                retorno = false;                
            
            }else{

                retorno = true;
            }
        }

        return retorno;
    }
}