var valido = false;
      let registrosManuais = [];
      var tabelaDebitosBody = document.getElementById('tabelaDebitosBody');
      var tabelaPropriosBody = document.getElementById('tabelaPropriosBody');
      var tabelaTerceirosBody = document.getElementById('tabelaTerceirosBody');
      var tabelaPrecatoriosBody = document.getElementById('tabelaPrecatoriosBody');

      
      // GERA PDF COM BIBLIOTECAS
      function gerarPDF() {

          if (validarCamposPreenchidos()) {

              // Tabela débitos
              var tabelaDebitos = document.getElementById('tabelaDebitos');
              var linhasOriginais = tabelaDebitos.querySelectorAll('tbody tr');

              if (linhasOriginais.length === 0) {
                  alert('Deve existir pelo menos 1 débito para gerar o PDF');
                  return false;
              }

              if (linhasOriginais.length > 0) {
                  var tabelaDebitosPrint = document.getElementById('tabelaDebitosPrint');
                  var tabelaDebitosPrintBody = tabelaDebitosPrint.querySelector('tbody');

                  // Limpar a tabela de valores antes de criar a nova versão
                  tabelaDebitosPrintBody.innerHTML = '';

                  linhasOriginais.forEach(function (linha) {
                      var novaLinha = tabelaDebitosPrintBody.insertRow();
                      Array.from(linha.cells).forEach(function (cell) {
                          var novoCell = novaLinha.insertCell();
                          novoCell.textContent = cell.querySelector('input, select')?.value || cell.textContent;
                      });
                  });
              } else {
                  let debitosPrint = document.querySelector('#debitosPrint');
                  debitosPrint.classList.add('d-none');
              }

              // Tabela créditos Proprios
              var tabelaProprios = document.getElementById('tabelaProprios');
              var linhasOriginais = tabelaProprios.querySelectorAll('tbody tr');

              linhasOriginais.forEach((linha) => {
                  const celulas = linha.querySelectorAll('td');
                  let temVazia = false;

                  celulas.forEach((celula) => {
                      const input = celula.querySelector('input');
                      if (input && input.value.trim() === '') {
                          temVazia = true;
                      }
                  });

                  if (temVazia) {
                      linha.remove();
                  }
              });

              linhasOriginais = tabelaProprios.querySelectorAll('tbody tr');

              if (linhasOriginais.length > 0) {
                  var tabelaPropriosPrint = document.getElementById('tabelaPropriosPrint');
                  var tabelaPropriosPrintBody = tabelaPropriosPrint.querySelector('tbody');

                  // Limpar a tabela de valores antes de criar a nova versão
                  tabelaPropriosPrintBody.innerHTML = '';

                  linhasOriginais.forEach(function (linha) {
                      var novaLinha = tabelaPropriosPrintBody.insertRow();
                      Array.from(linha.cells).forEach(function (cell) {
                          var novoCell = novaLinha.insertCell();
                          novoCell.textContent = cell.querySelector('input, select')?.value || cell.textContent;
                      });
                  });
              } else {
                  let propriosPrint = document.querySelector('#propriosPrint');
                  propriosPrint.classList.add('d-none');
              }

              // Tabela créditos terceiros
              var tabelaTerceiros = document.getElementById('tabelaTerceiros');
              var linhasOriginais = tabelaTerceiros.querySelectorAll('tbody tr');

              if (linhasOriginais.length > 0) {
                  var tabelaTerceirosPrint = document.getElementById('tabelaTerceirosPrint');
                  var tabelaTerceirosPrintBody = tabelaTerceirosPrint.querySelector('tbody');

                  // Limpar a tabela de valores antes de criar a nova versão
                  tabelaTerceirosPrintBody.innerHTML = '';

                  linhasOriginais.forEach(function (linha) {
                      var novaLinha = tabelaTerceirosPrintBody.insertRow();
                      Array.from(linha.cells).forEach(function (cell) {
                          var novoCell = novaLinha.insertCell();
                          novoCell.textContent = cell.querySelector('input, select')?.value || cell.textContent;
                      });
                  });
              } else {
                  let terceirosPrint = document.querySelector('#terceirosPrint');
                  terceirosPrint.classList.add('d-none');
              }

              // Tabela precatórios
              var tabelaPrecatorios = document.getElementById('tabelaPrecatorios');
              var linhasOriginais = tabelaPrecatorios.querySelectorAll('tbody tr');

              if (linhasOriginais.length > 0) {
                  var tabelaPrecatoriosPrint = document.getElementById('tabelaPrecatoriosPrint');
                  var tabelaPrecatoriosPrintBody = tabelaPrecatoriosPrint.querySelector('tbody');

                  // Limpar a tabela de valores antes de criar a nova versão
                  tabelaPrecatoriosPrintBody.innerHTML = '';

                  linhasOriginais.forEach(function (linha) {
                      var novaLinha = tabelaPrecatoriosPrintBody.insertRow();
                      Array.from(linha.cells).forEach(function (cell) {
                          var novoCell = novaLinha.insertCell();
                          novoCell.textContent = cell.querySelector('input, select')?.value || cell.textContent;
                      });
                  });
              } else {
                  let precatoriosPrint = document.querySelector('#precatoriosPrint');
                  precatoriosPrint.classList.add('d-none');
              }

              // INICIO DA PARTE QUE GERA O PDF
              const elements = document.querySelectorAll('.html2pdf');

              // Criar um novo elemento contendo todos os elementos
              var allElementsContent = document.createElement('div');
              elements.forEach(function(element) {
                  allElementsContent.appendChild(element.cloneNode(true));
              });

              // Chamar a função para gerar o JSON quando necessário
              var json = gerarJSON();

              var metadataJSON = {
                  keywords: json,
              }

              var opt = { 
                      html2canvas: { scale: 1 },
                      filename: 'autorregularizacao.pdf', // Nome do arquivo PDF
                      // margin: [0.5, 0.5, 0.5, 0.5], // Margens em polegadas: superior, esquerda, inferior, direita
                      pagebreak: { mode: 'css', avoid: '.html2pdf' },
                      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
                  }

              // Imprimir todos os elementos em páginas separadas
              html2pdf().set(opt).from(allElementsContent).toPdf().get('pdf').then(function(pdf) {
                  
                  // Adicionar metadados ao objeto jsPDF
                  adicionarMetadados(pdf, metadataJSON);

                  pdf.save(opt.filename);
              })

          };

      }

      // Selecionar o botão pelo ID e anexar o evento onclick
        document.getElementById("btnGerarPDF").onclick = gerarPDF;


      // Função para adicionar metadados ao objeto jsPDF
      function adicionarMetadados(pdf, metadata) {
          pdf.setProperties(metadata);
      }

    
    // Função para inicializar os componentes de lista suspensa conforme o padrão do design system
function inicializarSelectsPadraoDesignSystem(novaLinha) {
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
    novaLinha.querySelectorAll('.br-select').forEach(function(brSelect) {
        const brselect = new core.BRSelect('br-select', brSelect, notFoundElement);
        brSelect.addEventListener('onChange', function (e) {
            // Seu código de manipulação de evento aqui
        });
    });
}

// ADICIONA LINHA NA TABELA DEBITOS
function incluirNovoDebito() {

    let novaLinha = document.createElement('br-linha-tabela-debitos');
           
    novaLinha.addEventListener("carregou", () => {
            
        // Seleciona os elementos dentro da nova linha pelo ID
        let tipoDeclaracao = novaLinha.querySelector('#tipoDeclaracao');
        let dataEntrega = novaLinha.querySelector('#dataEntrega');
        let cpfCnpjDebito = novaLinha.querySelector('#cpfCnpjDebito');
        let numeroProcesso = novaLinha.querySelector('#numeroProcesso');
        let codigoReceita = novaLinha.querySelector('#codigoReceita');
        let periodoApuracao = novaLinha.querySelector('#periodoApuracao');
        let vencimentoTributo = novaLinha.querySelector('#vencimentoTributo');
        let valorDebito = novaLinha.querySelector('#valorDebito');
        let cibCnoCnpjPrestador = novaLinha.querySelector('#cibCnoCnpjPrestador');
        let acoes = novaLinha.querySelector('#acoes');


        // Insere a linha de campos abaixo dos títulos
        document.getElementById('tabelaDebitosBody').appendChild(novaLinha);

        // Ajusta o espaçamento dos títulos e campos
        let titulosCampos = novaLinha.querySelectorAll('td');
        titulosCampos.forEach(function(elemento) {
            elemento.style.padding = "5px"; // Espaçamento interno dos títulos e campos
        });

        // Adiciona evento de clique ao botão de exclusão de linha
        let btnExcluirLinha = novaLinha.querySelector('#btnExcluirLinha');
        btnExcluirLinha.onclick = () => {
            // Remove a linha correspondente ao botão de exclusão
            novaLinha.remove();

            // Verifica se todas as linhas foram removidas e ajusta a margem esquerda da tabela
            if (document.querySelectorAll('#tabelaDebitosBody tr').length === 0) {
                var tabela = document.getElementById('tabelaDebitos');
                tabela.style.marginLeft = "-5px"; // Volta à margem padrão
            }
        };

        // Ajusta a margem esquerda da tabela após adicionar uma nova linha
        var tabela = document.getElementById('tabelaDebitos');
        tabela.style.marginLeft = "-5px"; // Ajusta a margem esquerda

        // Inicializa os selects conforme o padrão do design system após adicionar uma nova linha
        inicializarSelectsPadraoDesignSystem(novaLinha);
        
        // Adiciona a nova linha ao array de registros manuais
        registrosManuais.push(novaLinha);
    });
}

// Selecionar o botão pelo ID e anexar o evento onclick
document.getElementById("btnIncluirNovoDebito").onclick = incluirNovoDebito;






     // ADICIONA LINHA NA TABELA CREDITO DE TERCEIROS
     function incluirNovoCreditoTerceiros() {
        // Cria uma nova linha de tabela
        var novaLinha = document.createElement('tr');

        // Carrega o conteúdo do arquivo tabela_debitos_autorregularizar.html
        fetch('./tabela_creditos_terceiros/tabela_creditos_terceiros.html')
            .then(response => response.text())
            .then(html => {
                // Insere o HTML carregado na nova linha
                novaLinha.innerHTML = html;

                // Seleciona os elementos dentro da nova linha pelo ID
                var cnpjCreditoTerceiros = novaLinha.querySelector('#cnpjCreditoTerceiros');
                var tipoCreditoTerceiros = novaLinha.querySelector('#tipoCreditoTerceiros');
                var montanteCreditoTerceiros = novaLinha.querySelector('#montanteCreditoTerceiros');
                var aliquotaCreditoTerceiros = novaLinha.querySelector('#aliquotaCreditoTerceiros');
                var valorCreditoTerceiros = novaLinha.querySelector('#valorCreditoTerceiros');
                var dataEntregaCreditoTerceiros = novaLinha.querySelector('#dataEntregaCreditoTerceiros');
                var acoes = novaLinha.querySelector('#acoes');

                // Remove a primeira célula vazia
                novaLinha.removeChild(novaLinha.firstChild);

                // Insere a linha de campos abaixo dos títulos
                document.getElementById('tabelaTerceirosBody').appendChild(novaLinha);

                // Ajusta o espaçamento dos títulos
                var titulos = novaLinha.querySelectorAll('td');
                titulos.forEach(function(titulo) {
                    titulo.style.padding = "auto"; // Espaçamento interno dos títulos
                });

                // Ajusta o espaçamento entre os campos
                var campos = [cnpjCreditoTerceiros, tipoCreditoTerceiros, montanteCreditoTerceiros, aliquotaCreditoTerceiros, valorCreditoTerceiros, dataEntregaCreditoTerceiros, acoes];
                campos.forEach(function(elemento) {
                    elemento.style.padding = "auto"; // Espaçamento interno dos campos
                });

                // Adiciona evento de clique ao botão de exclusão de linha
                var btnExcluirLinha = novaLinha.querySelector('#btnExcluirLinha');
                btnExcluirLinha.onclick = function() {
                    // Remove a linha correspondente ao botão de exclusão
                    novaLinha.remove();

                    // Verifica se todas as linhas foram removidas e ajusta a margem esquerda da tabela
                    if (document.querySelectorAll('#tabelaTerceirosBody tr').length === 0) {
                        var tabela = document.getElementById('tabelaTerceiros');
                        tabela.style.marginLeft = "auto"; // Volta à margem padrão
                    }
                };

                // Ajusta a margem esquerda da tabela após adicionar uma nova linha
                var tabela = document.getElementById('tabelaTerceiros');
                tabela.style.marginLeft = "auto"; // Ajusta a margem esquerda

                // Inicializa os selects conforme o padrão do design system após adicionar uma nova linha
                inicializarSelectsPadraoDesignSystem(novaLinha);
            })
            .catch(error => {
                console.error('Erro ao carregar o arquivo tabela_creditos_terceiros.html:', error);
            });

        // Adiciona a nova linha ao array de registros manuais
        registrosManuais.push(novaLinha);
    }

    // Selecionar o botão pelo ID e anexar o evento onclick
    document.getElementById("btnIncluirCreditoTerceiros").onclick = incluirNovoCreditoTerceiros;



        // ADICIONA LINHA NA TABELA CREDITO DE TERCEIROS
     function incluirNovoPrecatorio() {
        // Cria uma nova linha de tabela
        var novaLinha = document.createElement('tr');

        // Carrega o conteúdo do arquivo tabela_debitos_autorregularizar.html
        fetch('./tabela_precatorios/tabela_precatorios.html')
            .then(response => response.text())
            .then(html => {
                // Insere o HTML carregado na nova linha
                novaLinha.innerHTML = html;

                // Seleciona os elementos dentro da nova linha pelo ID
                var numeroPrecatorio = novaLinha.querySelector('#numeroPrecatorio');
                var numeroRequisicaoPagamentoPrecatorio = novaLinha.querySelector('#numeroRequisicaoPagamentoPrecatorio');
                var dataRequisicaoPrecatorio = novaLinha.querySelector('#dataRequisicaoPrecatorio');
                var dataVencimentoPrecatorio = novaLinha.querySelector('#dataVencimentoPrecatorio');
                var valorPrecatorio = novaLinha.querySelector('#valorPrecatorio');
                var acoes = novaLinha.querySelector('#acoes');

                // Remove a primeira célula vazia
                novaLinha.removeChild(novaLinha.firstChild);

                // Insere a linha de campos abaixo dos títulos
                document.getElementById('tabelaPrecatoriosBody').appendChild(novaLinha);

                // Ajusta o espaçamento dos títulos
                var titulos = novaLinha.querySelectorAll('td');
                titulos.forEach(function(titulo) {
                    titulo.style.padding = "auto"; // Espaçamento interno dos títulos
                });

                // Ajusta o espaçamento entre os campos
                var campos = [numeroPrecatorio, numeroRequisicaoPagamentoPrecatorio, dataRequisicaoPrecatorio, dataVencimentoPrecatorio, valorPrecatorio, acoes];
                campos.forEach(function(elemento) {
                    elemento.style.padding = "auto"; // Espaçamento interno dos campos
                });

                // Adiciona evento de clique ao botão de exclusão de linha
                var btnExcluirLinha = novaLinha.querySelector('#btnExcluirLinha');
                btnExcluirLinha.onclick = function() {
                    // Remove a linha correspondente ao botão de exclusão
                    novaLinha.remove();

                    // Verifica se todas as linhas foram removidas e ajusta a margem esquerda da tabela
                    if (document.querySelectorAll('#tabelaPrecatoriosBody tr').length === 0) {
                        var tabela = document.getElementById('tabelaPrecatorios');
                        tabela.style.marginLeft = "auto"; // Volta à margem padrão
                    }
                };

                // Ajusta a margem esquerda da tabela após adicionar uma nova linha
                var tabela = document.getElementById('tabelaPrecatorios');
                tabela.style.marginLeft = "auto"; // Ajusta a margem esquerda
            })
            .catch(error => {
                console.error('Erro ao carregar o arquivo tabela_precatorios.html:', error);
            });

        // Adiciona a nova linha ao array de registros manuais
        registrosManuais.push(novaLinha);
    }

    // Selecionar o botão pelo ID e anexar o evento onclick
    document.getElementById("btnIncluirNovoPrecatorio").onclick = incluirNovoPrecatorio;




      // LIMPA CONTEUDO DA LINHA
      function limpaConteudoLinha(linha, colunasNaoAlterar){
          let elementosInputSelect = linha.querySelectorAll('input, select');

          // Itera sobre os elementos de input e select
          for (let i = 0; i < elementosInputSelect.length; i++) {
              let elemento = elementosInputSelect[i];

              // Verifica o tipo do elemento
              if (!colunasNaoAlterar.includes(elemento.parentElement.cellIndex)){
                  if (elemento.tagName === 'SELECT') {
                      elemento.value = elemento.options[0].value;
                  } else if (elemento.tagName === 'INPUT') {
                      // Se for um input de texto, date, ou number, limpa o valor
                      elemento.value = '';
                  }
              }
          }
      }
      
      // ALTERA CONTEUDO DOS OPTIONS DE CODIGO DE RECEITA CONFORME TIPO DECLARAÇÃO
      function alteraConteudoOptionsCodigoReceita(input){
          // recupera linha toda
          linha = input.closest('tr');

          // limpa conteúdo da linha exceto a coluna 0
          colunasNaoAlterar = [0]
          limpaConteudoLinha(linha, colunasNaoAlterar)

          // valor selecionado no "Tipo declaracao"
          tipoDeclaracao = input.value
          // window.alert('Vai alterar conteúdo do débito:'+tipoDeclaracao);

          // recupera select do "Código receita"
          selectCodigoReceita = linha.cells[4].querySelector('select');
          // apaga o conteúdo dos options
          selectCodigoReceita.innerHTML = '';

          // refaz os options do select
          if (tipoDeclaracao == 'TDPF' || tipoDeclaracao == 'Auto de infração'){
              for (let i = 0; i < optionValueReceitaDeOficio.length; i++) {
                  let option = document.createElement('option');
                  option.value = optionValueReceitaDeOficio[i];
                  option.text = optionValueReceitaDeOficio[i];
                  selectCodigoReceita.appendChild(option);
              }
          }
          else if (tipoDeclaracao == 'Outro'){
              for (let i = 0; i < optionValueReceita.length && i < optionTextReceita.length; i++) {
                  let option = document.createElement('option');
                  option.value = optionValueReceita[i];
                  option.text = optionTextReceita[i];
                  selectCodigoReceita.appendChild(option);
              }
          } else{
              for (let i = 0; i < optionValueReceitaDeclaracoes.length ; i++) {
                  let option = document.createElement('option');
                  option.value = optionValueReceitaDeclaracoes[i];
                  option.text = optionValueReceitaDeclaracoes[i];
                  selectCodigoReceita.appendChild(option);
              }
          }
          
      }
      
      // ALTERA CONTEÚDO DO OPTIONS DE ALIQUOTA CONFORME TIPO DE DÉBITO DE TERCEIROS
      function alteraConteudoOptionsAliquota(input){
          // recupera linha toda
          linha = input.closest('tr');

          // valor selecionado no "Tipo"
          tipoDebito = input.value
          
          // recupera select da "Aliquota"
          selectAliquota = linha.cells[3].querySelector('select');
          // apaga o conteúdo dos options
          selectAliquota.innerHTML = '';

          // refaz os options do select "Aliquota"
          if (tipoDebito == 'Prejuízo Fiscal (PF)'){
              for (let i = 0; i < optionAliquotaPF.length; i++) {
                  let option = document.createElement('option');
                  option.value = optionAliquotaPF[i];
                  option.text = optionAliquotaPF[i];
                  selectAliquota.appendChild(option);
              }
          }
          else {
              for (let i = 0; i < optionAliquotaBCN.length; i++) {
                  let option = document.createElement('option');
                  option.value = optionAliquotaBCN[i];
                  option.text = optionAliquotaBCN[i];
                  selectAliquota.appendChild(option);
              }
          }
      }
      
      //VALIDA CPF OU CNPJ
      function validarCPFCNPJ(input) {
          let valor = input.value.replace(/\D/g, '');

          if (valor.length !== 11 && valor.length !== 14) {
              alert('CPF ou CNPJ inválido');
              input.value = '';
              return false
          }

          if (valor.length === 11) {
              if (!validarCPF(valor)) return false;
          } else if (valor.length === 14) {
              if (!validarCNPJ(valor)) return false;
          }
      }

      function validarCPF(input) {
          let cpf = input;
          if (cpf === '') {
              alert('CPF inválido');
              input.value = '';
              return false
          };
          // Elimina CPFs invalidos conhecidos
          if (
              cpf.length !== 11 ||
              cpf === '00000000000' ||
              cpf === '11111111111' ||
              cpf === '22222222222' ||
              cpf === '33333333333' ||
              cpf === '44444444444' ||
              cpf === '55555555555' ||
              cpf === '66666666666' ||
              cpf === '77777777777' ||
              cpf === '88888888888' ||
              cpf === '99999999999'
          ) {
              alert('CPF inválido');
              input.value = '';
              return false;
          }
          // Valida 1o digito
          let add = 0;
          for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
          let rev = 11 - (add % 11);
          if (rev === 10 || rev === 11) rev = 0;
          if (rev !== parseInt(cpf.charAt(9))) {
              alert('CPF inválido');
              input.value = '';
              return false
          };
          // Valida 2o digito
          add = 0;
          for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
          rev = 11 - (add % 11);
          if (rev === 10 || rev === 11) rev = 0;
          if (rev !== parseInt(cpf.charAt(10))) {
              alert('CPF inválido');
              input.value = '';
              return false
          };
          return true;
      }

      function validarCNPJ(input) {
          let cnpj = input.value? input.value.replace(/\D/g, '') : input;
          if (cnpj === '') {
              alert('CNPJ inválido');
              input.value = '';
              return false
          };
          if (cnpj.length !== 14) {
              alert('CNPJ inválido');
              input.value = '';
              return false
          };
          // Elimina CNPJs invalidos conhecidos
          if (
              cnpj === '00000000000000' ||
              cnpj === '11111111111111' ||
              cnpj === '22222222222222' ||
              cnpj === '33333333333333' ||
              cnpj === '44444444444444' ||
              cnpj === '55555555555555' ||
              cnpj === '66666666666666' ||
              cnpj === '77777777777777' ||
              cnpj === '88888888888888' ||
              cnpj === '99999999999999'
          ) {
              alert('CNPJ inválido');
              input.value = '';
              return false;
          }
          // Valida DVs
          let tamanho = cnpj.length - 2;
          let numeros = cnpj.substring(0, tamanho);
          let digitos = cnpj.substring(tamanho);
          let soma = 0;
          let pos = tamanho - 7;
          for (let i = tamanho; i >= 1; i--) {
              soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
              if (pos < 2) pos = 9;
          }
          let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
          if (resultado !== parseInt(digitos.charAt(0))) {
              alert('CNPJ inválido');
              input.value = '';
              return false
          };
          tamanho = tamanho + 1;
          numeros = cnpj.substring(0, tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (let i = tamanho; i >= 1; i--) {
              soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
              if (pos < 2) pos = 9;
          }
          resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
          if (resultado !== parseInt(digitos.charAt(1))) {
              alert('CNPJ inválido');
              input.value = '';
              return false
          };
          return true;
      }

      function validarProcesso(numero) {
          const numeroLimpo = numero.value.replace(/\D/g, '');

          // recupera linha toda
          linha = numero.closest('tr');
          tipoDeclaracao = linha.cells[0].querySelector('select').value;

          if (numeroLimpo.length !== 9 && numeroLimpo.length !== 15 && numeroLimpo.length !== 17) {
              alert("Número de Processo/DEBCAD inválido. Certifique-se de inserir um número com 9, 15 ou 17 dígitos.");
              numero.value = '';
              return;
          }

          if (tipoDeclaracao === 'TDPF' && numeroLimpo.length != 17){
              alert("Número inválido. Certifique-se de inserir um número com 17 dígitos.");
              numero.value = '';
              return;
          }
          
          if (numeroLimpo.length == 17 && tipoDeclaracao != "TDPF") {

              const numeros = numeroLimpo.substring(0, 15).split('').map(Number);
              const dv1 = parseInt(numeroLimpo.charAt(15));
              const dv2 = parseInt(numeroLimpo.charAt(16));

              let soma = 0;
              let peso = 2;

              for (let i = 14; i >= 0; i--) {
                  soma += numeros[i] * peso;
                  peso++;
                  if (peso > 16) {
                      peso = 2;
                  }
              }

              let resto = soma % 11;
              if (resto === 0) {
                  var digito1 = 1;
              } else if (resto === 1) {
                  var digito1 = 0;
              } else {
                  var digito1 = 11 - resto;
              }
              // const digito1 = resto === 0 ? 1 : 11 - resto;

              numeros.push(digito1);
              soma = 0;
              peso = 2;

              for (let i = 15; i >= 0; i--) {
                  soma += numeros[i] * peso;
                  peso++;
                  if (peso > 17) {
                      peso = 2;
                  }
              }

              resto = soma % 11;
              if (resto === 0) {
                  var digito2 = 1;
              } else if (resto === 1) {
                  var digito2 = 0;
              } else {
                  var digito2 = 11 - resto;
              }
              // const digito2 = resto === 0 ? 1 : 11 - resto;

              if (dv1 === digito1 && dv2 === digito2) {
                  return true;
              } else {
                  alert("Número de Processo/DEBCAD inválido. Os dígitos verificadores estão incorretos.");
                  numero.value = '';
                  return
              }
          }

      }

      function validarValor(input) {
          // Remover caracteres não numéricos e converter para número
          let valorDigitado = input.value.replace(/\D/g, '');
          if (valorDigitado !== '' && valorDigitado > 0) {
              let numero = parseFloat(valorDigitado.replace(',', '.')) / 100;
              // let numeroFormatado = `${numero.toFixed(2).replace('.', ',')}`;;
              let numeroFormatado = numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              input.value = numeroFormatado;
          } else {
              alert('Valor inválido! Deve ser numérico e maior que R$ 0,00.');
              input.value = '';
              return false; // Valor inválido
          }
      }

      // Selecione o elemento pelo ID
        var inputElement = document.getElementById("validarValor");

        // Adicione um listener para o evento input
        inputElement.addEventListener("input", function() {
            validarValor(this);
        });


      function validarCIBCNOCNPJ(input) {
          let valor = input.value.replace(/\D/g, '');

          if (valor.length === 14) {
              validarCNPJ(valor);
          }
      }

      function validarCamposPreenchidos() {
          const tabelas = ['tabelaDebitos', 'tabelaTerceiros', 'tabelaPrecatorios'];
          let camposVazios = false;

          for (let i = 0; i < tabelas.length; i++) {
              const linhas = document.getElementById(tabelas[i]).querySelectorAll('tr');

              for (let j = 1; j < linhas.length; j++) {
                  const campos = linhas[j].querySelectorAll('input[required], select[required]');

                  for (let k = 0; k < campos.length; k++) {
                      if (campos[k].value === '') {
                          camposVazios = true;
                          break;
                      }
                  }

                  if (camposVazios) {
                      break;
                  }
              }

              if (camposVazios) {
                  break;
              }
          }

          if (camposVazios) {
              alert('Existem tabelas com campos vazios. Preencha todos os campos antes de prosseguir!');
              return false;
          } else {
              return true;
          }
      }

      function validacaoData(input) {
          let valor = input.value.replace(/\D/g, ''); // Remover caracteres não numéricos
          const tam = valor.length;

          if (tam > 8) {
              valor = valor.substring(0, 8); // Limitar a 8 dígitos (ddmmyyyy)
          }

          if (tam > 1 && tam < 5) {
              valor = `${valor.substring(0, 2)}/${valor.substring(2)}`; // Adicionar barra após o segundo dígito (dd/mm)
          } else if (tam >= 5) {
              valor = `${valor.substring(0, 2)}/${valor.substring(2, 4)}/${valor.substring(4)}`; // Adicionar barras conforme dd/mm/yyyy
          }

          input.value = valor;

          const dia = parseInt(valor.substring(0, 2), 10);
          const mes = parseInt(valor.substring(3, 5), 10) - 1; // Lembrando que os meses iniciam do zero (janeiro = 0)
          const ano = parseInt(valor.substring(6), 10);

          if (ano < 1980) {
              alert('Data inválida. Ano deve ser maior que 1980.')
              input.value = '';
              return false
          }

          const data = new Date(ano, mes, dia);

          if (data.getDate() !== dia || data.getMonth() !== mes || data.getFullYear() !== ano) {
              input.setCustomValidity('Data inválida! Por favor, insira uma data válida.');
              alert('Data inválida! Por favor, insira uma data válida.')
              input.value = '';
          } else {
              input.setCustomValidity('');
          }
      }

      // Selecione o elemento pelo ID
        var inputElement = document.getElementById("validacaoData");

        // Adicione um listener para o evento change
        inputElement.addEventListener("change", function() {
            validacaoData(this);
        });

      
      function validacaoVencimentoEApuração(input) {
          let valor = input.value.replace(/\D/g, '');
          let dataLimite = new Date('2023-12-01') // Remover caracteres não numéricos
          const tam = valor.length;

          if (tam > 8) {
              valor = valor.substring(0, 8); // Limitar a 8 dígitos (ddmmyyyy)
          }

          if (tam > 1 && tam < 5) {
              valor = `${valor.substring(0, 2)}/${valor.substring(2)}`; // Adicionar barra após o segundo dígito (dd/mm)
          } else if (tam >= 5) {
              valor = `${valor.substring(0, 2)}/${valor.substring(2, 4)}/${valor.substring(4)}`; // Adicionar barras conforme dd/mm/yyyy
          }

          input.value = valor;

          const dia = parseInt(valor.substring(0, 2), 10);
          const mes = parseInt(valor.substring(3, 5), 10) - 1; // Lembrando que os meses iniciam do zero (janeiro = 0)
          const ano = parseInt(valor.substring(6), 10);

          if (ano < 1980 ) {
              alert('Data inválida. Ano deve ser maior que 1980.')
              input.value = '';
              return false
          }

          const data = new Date(ano, mes, dia);

          if (data > dataLimite){
              alert('Nos termos da legislação, o vencimento original dos débitos a serem incluídos na autorregularização incentiva deve ser até 30/11/2023')
              input.value = '';
              return false
          }

          if (data.getDate() !== dia || data.getMonth() !== mes || data.getFullYear() !== ano) {
              input.setCustomValidity('Data inválida! Por favor, insira uma data válida.');
              alert('Data inválida! Por favor, insira uma data válida.')
              input.value = '';
          } else {
              input.setCustomValidity('');
          }
      }

      function gerarJSON() {
          const tabelas = ['tabelaDebitosPrint', 'tabelaPropriosPrint', 'tabelaTerceirosPrint', 'tabelaPrecatoriosPrint'];
          const jsonData = {};

          jsonData["versão"]= "1.2.0";
          
          tabelas.forEach((nomeTabela) => {
              const tabela = document.getElementById(nomeTabela);
              const linhas = tabela.querySelectorAll('tbody tr');
              const dadosTabela = [];

              linhas.forEach((linha) => {
                  const colunas = linha.querySelectorAll('td');
                  const objLinha = {};

                  colunas.forEach((coluna, index) => {
                      const nomeColuna = tabela.querySelector('thead tr').children[index].textContent; // Obter o nome da coluna
                      objLinha[nomeColuna] = coluna.textContent; // Adicionar conteúdo da célula ao objeto da linha
                  });

                  dadosTabela.push(objLinha);
              });

              jsonData[nomeTabela] = dadosTabela;
          });

          return JSON.stringify(jsonData, null, 2)

          // Converter para JSON e exibir na tag com id 'json'
          // document.getElementById('json').innerText = `<json>${JSON.stringify(jsonData, null, 2)}<json>;`
      }

      function somenteDigitos(input) {
          const digitos = /^\d+$/; // Expressão regular para verificar se são apenas dígitos

          if (!digitos.test(input.value)) {
              alert('Por favor, digite apenas números!');
              input.value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
          }
      }


      function limparTabela() {
        location.reload();
    }
    
      // Selecione o botão pelo ID
        var btnLimpar = document.getElementById("btnLimparTabela");

        // Adicione um listener para o evento click
        btnLimpar.addEventListener("click", function() {
            limparTabela();
        });

        
        