var valido = false;
      let registrosManuais = [];
      let optionValueTipoDeclaracao = ['DCTF', 'DCTF Web/e-Social', 'DIRPF', 'DITR', 'GFIP', 'Auto de infração', 'TDPF', 'Outro'];
      let optionTextTiposDeclaracao = ['DCTF', 'DCTF Web/e-Social', 'DIRPF', 'DITR', 'GFIP', 'Auto de infração', 'TDPF', 'Outro'];
      let optionValueReceita = ['0000', '0026', '0039', '0041', '0054', '0067', '0070', '0082', '0095', '0107', '0110', '0122', '0123', '0148', '0150', '0158', '0190', '0211', '0220', '0231', '0244', '0246', '0297', '0298', '0300', '0331', '0338', '0348', '0360', '0383', '0390', '0416', '0422', '0434', '0449', '0468', '0473', '0474', '0481', '0490', '0497', '0513', '0542', '0561', '0565', '0588', '0594', '0610', '0627', '0656', '0662', '0668', '0676', '0679', '0691', '0724', '0753', '0760', '0764', '0776', '0782', '0809', '0821', '0838', '0850', '0867', '0906', '0916', '0924', '0929', '1020', '1054', '1068', '1070', '1082', '1097', '1099', '1138', '1141', '1145', '1150', '1151', '1154', '1162', '1170', '1176', '1181', '1184', '1191', '1196', '1200', '1205', '1209', '1213', '1218', '1221', '1225', '1251', '1253', '1254', '1258', '1269', '1271', '1272', '1274', '1317', '1319', '1345', '1376', '1402', '1438', '1458', '1512', '1573', '1599', '1603', '1626', '1632', '1646', '1647', '1649', '1653', '1654', '1656', '1657', '1661', '1684', '1690', '1700', '1708', '1717', '1718', '1723', '1730', '1741', '1742', '1752', '1769', '1781', '1808', '1814', '1837', '1840', '1850', '1872', '1889', '1895', '1921', '1928', '2030', '2063', '2089', '2096', '2110', '2141', '2158', '2164', '2170', '2172', '2185', '2187', '2193', '2203', '2249', '2255', '2261', '2278', '2281', '2290', '2317', '2319', '2323', '2346', '2352', '2362', '2369', '2372', '2381', '2390', '2398', '2401', '2408', '2410', '2414', '2430', '2456', '2469', '2484', '2605', '2612', '2892', '2904', '2917', '2927', '2932', '2945', '2956', '2958', '2960', '2973', '2985', '2986', '2991', '2999', '3005', '3059', '3092', '3121', '3148', '3208', '3219', '3223', '3249', '3251', '3260', '3277', '3280', '3283', '3308', '3316', '3317', '3320', '3332', '3345', '3358', '3359', '3360', '3373', '3375', '3426', '3467', '3488', '3533', '3540', '3556', '3562', '3579', '3601', '3624', '3630', '3674', '3699', '3703', '3738', '3746', '3767', '3770', '4028', '4085', '4095', '4112', '4138', '4153', '4166', '4288', '4290', '4397', '4406', '4407', '4409', '4424', '4465', '4562', '4574', '4597', '4600', '4669', '4685', '4693', '4802', '4840', '4857', '4863', '5006', '5029', '5035', '5058', '5110', '5123', '5136', '5149', '5192', '5200', '5204', '5217', '5220', '5232', '5273', '5286', '5299', '5300', '5320', '5338', '5434', '5442', '5477', '5519', '5557', '5565', '5583', '5598', '5600', '5625', '5668', '5706', '5788', '5802', '5804', '5856', '5869', '5871', '5884', '5928', '5936', '5937', '5940', '5944', '5952', '5960', '5979', '5987', '5993', '6012', '6015', '6094', '6147', '6150', '6175', '6177', '6188', '6190', '6215', '6216', '6222', '6228', '6230', '6239', '6243', '6256', '6324', '6337', '6340', '6352', '6378', '6380', '6393', '6405', '6418', '6542', '6555', '6570', '6583', '6596', '6608', '6610', '6623', '6636', '6649', '6651', '6656', '6680', '6744', '6758', '6773', '6799', '6800', '6808', '6813', '6824', '6826', '6839', '6840', '6841', '6854', '6875', '6882', '6883', '6891', '6895', '6904', '6912', '6939', '7036', '7049', '7051', '7213', '7238', '7756', '7769', '7780', '7784', '7797', '7837', '7878', '7893', '7905', '7940', '7987', '8002', '8045', '8053', '8109', '8205', '8301', '8468', '8496', '8504', '8523', '8536', '8619', '8645', '8651', '8660', '8673', '8726', '8739', '8741', '8754', '8767', '8770', '8835', '8848', '8850', '8863', '8972', '9060', '9086', '9303', '9304', '9331', '9385', '9412', '9427', '9453', '9466', '9478', '9479'];
      let optionTextReceita = ['0000', '0026', '0039', '0041', '0054', '0067', '0070', '0082', '0095', '0107', '0110', '0122', '0123', '0148', '0150', '0158', '0190', '0211', '0220', '0231', '0244', '0246', '0297', '0298', '0300', '0331', '0338', '0348', '0360', '0383', '0390', '0416', '0422', '0434', '0449', '0468', '0473', '0474', '0481', '0490', '0497', '0513', '0542', '0561', '0565', '0588', '0594', '0610', '0627', '0656', '0662', '0668', '0676', '0679', '0691', '0724', '0753', '0760', '0764', '0776', '0782', '0809', '0821', '0838', '0850', '0867', '0906', '0916', '0924', '0929', '1020', '1054', '1068', '1070', '1082', '1097', '1099', '1138', '1141', '1145', '1150', '1151', '1154', '1162', '1170', '1176', '1181', '1184', '1191', '1196', '1200', '1205', '1209', '1213', '1218', '1221', '1225', '1251', '1253', '1254', '1258', '1269', '1271', '1272', '1274', '1317', '1319', '1345', '1376', '1402', '1438', '1458', '1512', '1573', '1599', '1603', '1626', '1632', '1646', '1647', '1649', '1653', '1654', '1656', '1657', '1661', '1684', '1690', '1700', '1708', '1717', '1718', '1723', '1730', '1741', '1742', '1752', '1769', '1781', '1808', '1814', '1837', '1840', '1850', '1872', '1889', '1895', '1921', '1928', '2030', '2063', '2089', '2096', '2110', '2141', '2158', '2164', '2170', '2172', '2185', '2187', '2193', '2203', '2249', '2255', '2261', '2278', '2281', '2290', '2317', '2319', '2323', '2346', '2352', '2362', '2369', '2372', '2381', '2390', '2398', '2401', '2408', '2410', '2414', '2430', '2456', '2469', '2484', '2605', '2612', '2892', '2904', '2917', '2927', '2932', '2945', '2956', '2958', '2960', '2973', '2985', '2986', '2991', '2999', '3005', '3059', '3092', '3121', '3148', '3208', '3219', '3223', '3249', '3251', '3260', '3277', '3280', '3283', '3308', '3316', '3317', '3320', '3332', '3345', '3358', '3359', '3360', '3373', '3375', '3426', '3467', '3488', '3533', '3540', '3556', '3562', '3579', '3601', '3624', '3630', '3674', '3699', '3703', '3738', '3746', '3767', '3770', '4028', '4085', '4095', '4112', '4138', '4153', '4166', '4288', '4290', '4397', '4406', '4407', '4409', '4424', '4465', '4562', '4574', '4597', '4600', '4669', '4685', '4693', '4802', '4840', '4857', '4863', '5006', '5029', '5035', '5058', '5110', '5123', '5136', '5149', '5192', '5200', '5204', '5217', '5220', '5232', '5273', '5286', '5299', '5300', '5320', '5338', '5434', '5442', '5477', '5519', '5557', '5565', '5583', '5598', '5600', '5625', '5668', '5706', '5788', '5802', '5804', '5856', '5869', '5871', '5884', '5928', '5936', '5937', '5940', '5944', '5952', '5960', '5979', '5987', '5993', '6012', '6015', '6094', '6147', '6150', '6175', '6177', '6188', '6190', '6215', '6216', '6222', '6228', '6230', '6239', '6243', '6256', '6324', '6337', '6340', '6352', '6378', '6380', '6393', '6405', '6418', '6542', '6555', '6570', '6583', '6596', '6608', '6610', '6623', '6636', '6649', '6651', '6656', '6680', '6744', '6758', '6773', '6799', '6800', '6808', '6813', '6824', '6826', '6839', '6840', '6841', '6854', '6875', '6882', '6883', '6891', '6895', '6904', '6912', '6939', '7036', '7049', '7051', '7213', '7238', '7756', '7769', '7780', '7784', '7797', '7837', '7878', '7893', '7905', '7940', '7987', '8002', '8045', '8053', '8109', '8205', '8301', '8468', '8496', '8504', '8523', '8536', '8619', '8645', '8651', '8660', '8673', '8726', '8739', '8741', '8754', '8767', '8770', '8835', '8848', '8850', '8863', '8972', '9060', '9086', '9303', '9304', '9331', '9385', '9412', '9427', '9453', '9466', '9478', '9479'];
      let optionValueReceitaDeOficio = ['0148', '0150', '0158', '0244', '0298', '0300', '0331', '0338', '0348', '0360', '0383', '0390', '0416', '0434', '0449', '0468', '0513', '0542', '0565', '0594', '1269', '1271', '1272', '1274', '1317', '1319', '1345', '1376', '1402', '1438', '1512', '1603', '1632', '1649', '1741', '1742', '1928', '2096', '2141', '2158', '2164', '2170', '2185', '2187', '2193', '2203', '2249', '2255', '2261', '2278', '2290', '2317', '2323', '2346', '2352', '2369', '2381', '2398', '2408', '2414', '2892', '2904', '2917', '2932', '2945', '2956', '2958', '2960', '2973', '2986', '2999', '3005', '3059', '3148', '3219', '3260', '3283', '3308', '3316', '3332', '3345', '3358', '3359', '3360', '3375', '3488', '3601', '3624', '3630', '3738', '3767', '4288', '4406', '4562', '4597', '4669', '4685', '4693', '4802', '4840', '4857', '4863', '5006', '5058', '5149', '5300', '5320', '5338', '5477', '5583', '5668', '5788', '5802', '5804', '6324', '6337', '6340', '6352', '6380', '6393', '6405', '6418', '6542', '6555', '6570', '6583', '6596', '6608', '6610', '6623', '6636', '6649', '6656', '6680', '6744', '6808', '6841', '6882', '6939', '7036',    '7049', '7051', '7780', '7878', '7940', '8504', '8619', '8651', '8660', '9303', '9304', '9479'];
      let optionValueReceitaDeclaracoes = ['0000', '0026', '0039', '0041', '0054', '0067', '0070', '0082', '0095', '0107', '0110', '0122', '0123', '0151', '0160', '0171', '0180', '0181', '0182', '0185', '0190', '0191', '0196', '0200', '0211', '0220', '0231', '0246', '0297', '0300', '0360', '0383', '0390', '0422', '0468', '0473', '0474', '0481', '0490', '0497', '0561', '0588', '0610', '0627', '0656', '0662', '0668', '0676', '0679', '0691', '0724', '0753', '0760', '0764', '0776', '0782', '0809', '0821', '0838', '0850', '0867', '0906', '0916', '0924', '0929', '1020', '1054', '1068', '1070', '1082', '1097', '1099', '1138', '1141', '1145', '1150', '1151', '1154', '1162', '1170', '1176', '1181', '1184', '1191', '1196', '1200', '1205', '1209', '1213', '1218', '1221', '1225', '1251', '1253', '1254', '1258', '1269', '1271', '1272', '1274', '1317', '1319', '1345', '1376', '1402', '1438', '1458', '1573', '1599', '1626', '1646', '1647', '1649', '1653', '1654', '1656', '1657', '1661', '1684', '1690', '1700', '1708', '1717', '1718', '1723', '1730', '1741', '1742', '1752', '1769', '1781', '1808', '1814', '1837', '1840', '1850', '1872', '1889', '1895', '1921', '2030', '2063', '2089', '2110', '2158', '2164', '2170', '2172', '2185', '2187', '2193', '2203', '2249', '2255', '2261', '2278', '2281', '2290', '2317', '2319', '2323', '2346', '2352', '2362', '2369', '2372', '2381', '2390', '2398', '2401', '2408', '2410', '2414', '2430', '2456', '2469', '2484', '2605', '2612', '2892', '2904', '2917', '2927', '2932', '2945', '2956', '2958', '2960', '2973', '2985', '2986', '2991', '2999', '3005', '3092', '3121', '3208', '3223', '3249', '3251', '3277', '3280', '3317', '3320', '3332', '3373', '3375', '3426', '3467', '3533', '3540', '3556', '3562', '3579', '3624', '3699', '3703', '3738', '3746', '3770', '4028', '4085', '4095', '4112', '4138', '4153', '4166', '4290', '4397', '4407', '4409', '4424', '4465', '4574', '4600', '4693', '5192', '5200', '5217', '5220', '5232', '5273', '5286', '5299', '5340', '5434', '5442', '5519', '5557', '5565', '5598', '5600', '5625', '5706', '5856', '5869', '5871', '5884', '5928', '5936', '5937', '5940', '5944', '5952', '5960', '5979', '5987', '5993', '6012', '6015', '6094', '6147', '6150', '6175', '6177', '6188', '6190', '6215', '6216', '6222', '6228', '6230', '6239', '6243', '6256', '6324', '6337', '6340', '6352', '6378', '6405', '6418', '6773', '6799', '6800', '6813', '6839', '6854', '6875', '6891', '6895', '6904', '6912', '7049', '7051', '7213', '7238', '7756', '7769', '7784', '7797', '7837', '7893', '7905', '7987', '8002', '8045', '8053', '8109', '8301', '8468', '8496', '8523', '8536', '8645', '8673', '8726', '8739', '8741', '8754', '8767', '8770', '8835', '8848', '8850', '8863', '8972', '9060', '9086', '9412', '9427', '9453', '9466', '9478'];
      let optionValueAliquota = ['9%', '15%', '20%', '25%'];
      let optionTextAliquota = ['9%', '15%', '20%', '25%'];
      let optionAliquotaPF = ['25%'];
      let optionAliquotaBCN = ['9%', '15%', '20%'];
      let optionValueTipoCredito = ['Prejuízo Fiscal (PF)', 'Base de Cálculo Negativa (BCN) da CSLL'];
      let optionTextTipoCredito = ['Prejuízo Fiscal (PF)', 'Base de Cálculo Negativa (BCN) da CSLL'];
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

    

        
        
// ADICIONA LINHA NA TABELA DEBITOS
function incluirNovoDebito() {
    // Cria uma nova linha de tabela
    var novaLinha = document.createElement('tr');

    // Carrega o conteúdo do arquivo tabela_debitos_autorregularizar.html
    fetch('./tabela_debitos_autorregularizar.html')
        .then(response => response.text())
        .then(html => {
            // Insere o HTML carregado na nova linha
            novaLinha.innerHTML = html;

            // Seleciona os elementos dentro da nova linha pelo ID
            var tipoDeclaracao = novaLinha.querySelector('#tipoDeclaracao');
            var dataEntrega = novaLinha.querySelector('#dataEntrega');
            var cpfCnpjDebito = novaLinha.querySelector('#cpfCnpjDebito');
            var numeroProcesso = novaLinha.querySelector('#numeroProcesso');
            var codigoReceita = novaLinha.querySelector('#codigoReceita');
            var periodoApuracao = novaLinha.querySelector('#periodoApuracao');
            var vencimentoTributo = novaLinha.querySelector('#vencimentoTributo');
            var valorDebito = novaLinha.querySelector('#valorDebito');
            var cibCnoCnpjPrestador = novaLinha.querySelector('#cibCnoCnpjPrestador');
            var acoes = novaLinha.querySelector('#acoes');

            // Cria uma nova linha de tabela para os campos de entrada
            var linhaCampos = document.createElement('tr');

            // Cria células para os campos de entrada e insere-os na linha de campos
            linhaCampos.appendChild(criarCelula(tipoDeclaracao));
            linhaCampos.appendChild(criarCelula(dataEntrega));
            linhaCampos.appendChild(criarCelula(cpfCnpjDebito));
            linhaCampos.appendChild(criarCelula(numeroProcesso));
            linhaCampos.appendChild(criarCelula(codigoReceita));
            linhaCampos.appendChild(criarCelula(periodoApuracao));
            linhaCampos.appendChild(criarCelula(vencimentoTributo));
            linhaCampos.appendChild(criarCelula(valorDebito));
            linhaCampos.appendChild(criarCelula(cibCnoCnpjPrestador));
            linhaCampos.appendChild(criarCelula(acoes));

            // Insere a linha de campos abaixo dos títulos
            document.getElementById('tabelaDebitosBody').appendChild(linhaCampos);

            // Adiciona evento de clique ao botão de exclusão de linha
            var btnExcluirLinha = linhaCampos.querySelector('#btnExcluirLinha');
            btnExcluirLinha.onclick = function() {
                // Remove a linha correspondente ao botão de exclusão
                var linhaParaExcluir = this.closest("tr");
                linhaParaExcluir.remove();
            };
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo tabela_debitos_autorregularizar.html:', error);
        });

    // Adiciona a nova linha ao array de registros manuais
    registrosManuais.push(novaLinha);
}

// Função auxiliar para criar uma célula de tabela com um elemento filho
function criarCelula(elemento) {
    var celula = document.createElement('td');
    celula.appendChild(elemento);
    return celula;
}

// Selecionar o botão pelo ID e anexar o evento onclick
document.getElementById("incluirNovoDebito").onclick = incluirNovoDebito;







      // ADICIONA LINHA NA TABELA CREDITOS PROPRIOS
      function incluirNovoCreditoProprio() {
          // Adiciona uma nova linha em branco à tabela
          var novaLinha = tabelaPropriosBody.insertRow(-1);

          // Adiciona células à nova linha
          for (var i = 0; i < 6; i++) {
              var novaCelula = novaLinha.insertCell(i);

              if (i == 1 || i == 3) {
                  var inputText = document.createElement('input');
                  inputText.style.fontSize = 'small';
                  inputText.type = 'text';
                  inputText.classList.add('form-control', 'form-control-sm', 'text-center');
                  inputText.setAttribute('contenteditable', 'true');
                  inputText.setAttribute('required', 'true');
                  novaCelula.appendChild(inputText);
                  inputText.addEventListener('input', function () {
                      validarValor(this);
                  });
              }
              if (i == 4) {
                  var inputText = document.createElement('input');
                  inputText.style.fontSize = 'small';
                  inputText.type = 'text';
                  inputText.classList.add('form-control', 'form-control-sm', 'text-center');
                  inputText.setAttribute('contenteditable', 'true');
                  inputText.setAttribute('required', 'true');
                  inputText.setAttribute('placeholder', 'dd/mm/aaaa');
                  novaCelula.appendChild(inputText);
                  inputText.addEventListener('change', function () {
                      validacaoData(this);
                  });
              }
              if (i == 0 || i == 2) {
                  var inputSelect = document.createElement('select');
                  inputSelect.style.fontSize = 'small';
                  inputSelect.classList.add('form-select', 'form-select-sm', 'text-center');
                  inputSelect.setAttribute('required', 'true');
                  novaCelula.appendChild(inputSelect);
                  if (i == 0) {
                      for (let i = 0; i < optionValueTipoCredito.length && i < optionTextTipoCredito.length; i++) {
                          let option = document.createElement('option');
                          option.value = optionValueTipoCredito[i];
                          option.text = optionTextTipoCredito[i];
                          inputSelect.appendChild(option);
                      }
                  }
                  if (i == 2) {
                      for (let i = 0; i < optionValueAliquota.length && i < optionTextAliquota.length; i++) {
                          let option = document.createElement('option');
                          option.value = optionValueAliquota[i];
                          option.text = optionTextAliquota[i];
                          inputSelect.appendChild(option);
                      }
                  }
              }
              if (i == 5) {
                  const btnExcluir = document.createElement('button');
                  btnExcluir.classList.add('btn', 'btn-close', 'text-bg-danger');
                  novaCelula.appendChild(btnExcluir);
                  btnExcluir.addEventListener('click', function () {
                      excluirLinha(this);
                  });
              }

              // Adiciona a nova linha ao array de registros manuais
              registrosManuais.push(novaLinha);
          }
      }

      // ADICIONA LINHA NA TABELA CREDITO DE TERCEIROS
      
      function incluirNovoCreditoTerceiros() {
          // Adiciona uma nova linha em branco à tabela
          var novaLinha = tabelaTerceirosBody.insertRow(-1);

          // Adiciona células à nova linha
          for (var i = 0; i < 7; i++) {
              var novaCelula = novaLinha.insertCell(i);
              novaCelula.classList.add('p-1', 'text-center');

              // Se não for a última célula, adicionar um campo de texto
              if (i == 0) {
                novaCelula.classList.add('col-2');
                let inputContainer = document.createElement('div');
                let inputText = document.createElement('input');
                inputContainer.classList.add('br-input', 'small');
                inputText.type = 'text';
                inputText.classList.add('text-center', 'p-1', 'text-down-01')
                inputText.setAttribute('contenteditable', 'true');
                inputText.setAttribute('required', 'true');
                inputText.setAttribute('minlength', '14');
                inputContainer.appendChild(inputText);
                novaCelula.appendChild(inputContainer);
                inputText.addEventListener('change', function () {
                    validarCNPJ(this);
                });
              }
              if (i == 2 || i == 4) {
                novaCelula.classList.add('col-2');
                let inputContainer = document.createElement('div');
                let inputText = document.createElement('input');
                inputContainer.classList.add('br-input', 'small');
                inputText.type = 'text';
                inputText.classList.add('text-center', 'p-1', 'text-down-01')
                inputText.setAttribute('contenteditable', 'true');
                inputText.setAttribute('required', 'true');
                inputContainer.appendChild(inputText);
                novaCelula.appendChild(inputContainer);
                  inputText.addEventListener('input', function () {
                      validarValor(this);
                  });
              }
              if (i == 5) {
                novaCelula.classList.add('col-2');
                let inputContainer = document.createElement('div');
                let inputText = document.createElement('input');
                inputContainer.classList.add('br-input', 'small');
                inputText.type = 'text';
                inputText.classList.add('text-center', 'p-1', 'text-down-01')
                inputText.setAttribute('contenteditable', 'true');
                inputText.setAttribute('required', 'true');
                inputText.setAttribute('placeholder', 'dd/mm/aaaa');
                inputContainer.appendChild(inputText);
                novaCelula.appendChild(inputContainer);
                inputText.addEventListener('change', function () {
                    validacaoData(this);
                });
              }
              if (i == 6) {
                novaCelula.classList.add('col-1');
                let btnExcluir = document.createElement('button');
                let iconeLixeira = document.createElement('i');
                btnExcluir.classList.add('br-button', 'p-1');
                iconeLixeira.classList.add('fa', 'fa-trash-alt');
                btnExcluir.appendChild(iconeLixeira);
                novaCelula.appendChild(btnExcluir);
                btnExcluir.addEventListener('click', function () {
                    excluirLinha(this);
                });
              }
              if (i == 1 || i == 3) {
                  let inputSelect = document.createElement('select');
                  inputSelect.classList.add('text-center', 'p-1', 'br-select');
                  inputSelect.setAttribute('required', 'true');
                  novaCelula.appendChild(inputSelect);
                  if (i == 1) {
                    novaCelula.classList.add('col-2');
                      for (let i = 0; i < optionValueTipoCredito.length && i < optionTextTipoCredito.length; i++) {
                        let option = document.createElement('option');
                        option.value = optionValueTipoCredito[i];
                        option.text = optionTextTipoCredito[i];
                        inputSelect.appendChild(option);
                      }
                      inputSelect.addEventListener('change', function () {
                        alteraConteudoOptionsAliquota(this);
                      });
                  }
                  if (i == 3) {
                      // inicia o select com aliquotas de PF
                      novaCelula.classList.add('col-1');
                      for (let i = 0; i < optionAliquotaPF.length; i++) {
                        let option = document.createElement('option');
                        option.value = optionAliquotaPF[i];
                        option.text = optionAliquotaPF[i];
                        inputSelect.appendChild(option);
                      }
                  }
              }

              // Adiciona a nova linha ao array de registros manuais
              registrosManuais.push(novaLinha);
              
          }
      }

      // Selecionar o botão pelo ID e anexar o evento onclick
      document.getElementById("btnIncluirCreditoTerceiros").onclick = incluirNovoCreditoTerceiros;

      console.log("Botão 'Incluir novo crédito' clicado!");

      // ADICIONA LINHA NA TABELA CREDITO DE TERCEIROS
      function incluirNovoPrecatorio() {
          // Adiciona uma nova linha em branco à tabela
          var novaLinha = tabelaPrecatoriosBody.insertRow(-1);

          // Adiciona células à nova linha
          for (var i = 0; i < 6; i++) {
              var novaCelula = novaLinha.insertCell(i);
              novaCelula.classList.add('p-1', 'text-center');

              // Se não for a última célula, adicionar um campo de texto
              if (i == 0 || i == 1) {
                let inputContainer = document.createElement('div');
                let inputText = document.createElement('input');
                inputContainer.classList.add('br-input', 'small');
                inputText.type = 'text';
                inputText.classList.add('text-center', 'p-1', 'text-down-01')
                inputText.setAttribute('contenteditable', 'true');
                inputText.setAttribute('required', 'true');
                inputText.setAttribute('minlength', '14');
                inputContainer.appendChild(inputText);
                novaCelula.appendChild(inputContainer);
                inputText.addEventListener('change', function () {
                    somenteDigitos(this);
                });
              }
              if (i == 4) {
                let inputContainer = document.createElement('div');
                let inputText = document.createElement('input');
                inputContainer.classList.add('br-input', 'small');
                inputText.type = 'text';
                inputText.classList.add('text-center', 'p-1', 'text-down-01')
                inputText.setAttribute('contenteditable', 'true');
                inputText.setAttribute('required', 'true');
                inputText.setAttribute('minlength', '14');
                inputContainer.appendChild(inputText);
                novaCelula.appendChild(inputContainer);
                inputText.addEventListener('input', function () {
                    validarValor(this);
                });
              }
              if (i == 5) {
                let btnExcluir = document.createElement('button');
                let iconeLixeira = document.createElement('i');
                btnExcluir.classList.add('br-button', 'p-1');
                iconeLixeira.classList.add('fa', 'fa-trash-alt');
                btnExcluir.appendChild(iconeLixeira);
                novaCelula.appendChild(btnExcluir);
                btnExcluir.addEventListener('click', function () {
                    excluirLinha(this);
                });
              }
              if (i == 2 || i == 3) {
                let inputContainer = document.createElement('div');
                let inputText = document.createElement('input');
                inputContainer.classList.add('br-input', 'small');
                inputText.type = 'text';
                inputText.classList.add('text-center', 'p-1', 'text-down-01')
                inputText.setAttribute('contenteditable', 'true');
                inputText.setAttribute('required', 'true');
                inputText.setAttribute('placeholder', 'dd/mm/aaaa');
                inputContainer.appendChild(inputText);
                novaCelula.appendChild(inputContainer);
                inputText.addEventListener('change', function () {
                    validacaoData(this);
                });
              }

              // Adiciona a nova linha ao array de registros manuais
              registrosManuais.push(novaLinha);
          }
      }

      // Selecionar o botão pelo ID e anexar o evento onclick
      document.getElementById("btnIncluirNovoPrecatorio").onclick = incluirNovoPrecatorio;

      console.log("Botão 'Incluir Novo Precatorio' clicado!");

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

      function excluirLinha(botao) {
          const linha = botao.closest('tr'); // Encontra a linha mais próxima do botão clicado
          if (linha) {
              linha.remove(); // Remove a linha
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

