
export class GovBRUtils{
    
    static gerarUUID() {
        const timestamp = new Date().getTime();
        const randomPart = Math.random().toString(36).substr(2, 9); // gera uma string aleatória de 9 caracteres
        return timestamp.toString(36) + randomPart; // combina a data atual com a parte aleatória
    }

    // Função para inicializar os componentes de lista suspensa conforme o padrão do design system
    static inicializarSelects (elemento_container) {
        const notFoundElement = `
            <div class="br-item not-found">
            <div class="container">
            <div class="row">
                <div class="col">
                <p><strong>Ops!</strong> Não encontramos o que você está procurando!</p>
                </div>
            </div>
            </div>
            </div>
        `;        

        // Itera sobre cada select dentro da nova linha
        elemento_container.querySelectorAll('.br-select').forEach((brSelect) => {

            const brselect = new core.BRSelect('br-select', brSelect, notFoundElement);
            brSelect.addEventListener('onChange', (e) => {                
                // Seu código de manipulação de evento aqui
            });
        });
    }
}