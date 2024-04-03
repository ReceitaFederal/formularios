const selectList = []
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
`
for (const brSelect of window.document.querySelectorAll('.br-select')) {
  const brselect = new core.BRSelect('br-select', brSelect, notFoundElement)
  //Exemplo de uso de listener do select
  brSelect.addEventListener('onChange', function (e) {})
  selectList.push(brselect)
}
