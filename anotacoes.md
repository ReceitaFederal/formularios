# Anotações para a criação do formulário

---

* Tabindex: É o nome dado ao ato de clicar em um botão para ir passando para as pŕoximas etapas de preenchimento do formulário, por exemplo.

## Sites usados para "cópia" do código ou referência

* https://stackoverflow.com/questions/46692464/on-submit-click-button-enable-next-tab
* https://digital.belgium.be/iaf/hil/police/gendec/?lng=en
* https://www.gendec.eu/
* https://www.aopa.org/-/media/Files/AOPA/Home/Go-Flying/Bahamas-and-Caribbean-Download-Forms/General-Delcaration.pdf
* Chat GPT
* https://pt.stackoverflow.com/questions/213100/colocar-texto-na-borda-div

## Ideias

* Cookies / indexDB para armazenar dados localmente no navegador
* Web componentes para as abas
* Se a pessoa sair da página, os campos que ela já preencheu ainda vai estar ali
* A ideia das abas não foi a mais apropriada para esse tipo de formulário, então transformei abas em seções
* Coloquei os títulos de cada seção na própria linha das bordas (no meio delas), achei que ficou bem legal e não é tão difícil fazer

## Não esquecer

* Colocar "required" em todos os campos
* Melhorar o visual do formulário
* Colocar quantidade máxima de caracteres conforme cada campo. Ex.: CPF = 11 dígitos, nº do voo = X caracteres (alfanumérico)
* Colocar o campo de CPF com a opção de trocar para CNPJ
* Incluir um botão "estrangeiro" que ao clicar troca o CPF pelo número do passaporte. O botão muda para brasileiro para voltar
