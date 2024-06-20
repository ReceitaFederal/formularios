document.addEventListener('DOMContentLoaded', function() {
  // Adicionar evento de click ao botão flutuante
  document.getElementById('sum-btn').addEventListener('click', function() {
    // Selecionar todos os campos de total da tabela dinâmica
    const totalInputs = document.querySelectorAll('.total-remessa-desktop');
    let totalSum = 0;

    // Iterar sobre cada campo e somar seus valores
    totalInputs.forEach(function(input) {
      const value = parseFloat(input.value) || 0; // Converter para número ou 0 se não for um número válido
      totalSum += value;
    });

    // Exibir o resultado da soma em um alerta ou console
    alert(`Total das remessas: US$ ${totalSum.toFixed(2)}`);
  });
});
