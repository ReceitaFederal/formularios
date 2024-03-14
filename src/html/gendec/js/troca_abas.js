var currentTab = 1;

function go(tab, content) {
    $('.tabcontent.active').removeClass('active');
    $('.tablinks.active').removeClass('active');
    tab.addClass('active');
    content.addClass('active');
    currentTab++;
    updateButtons();
    updateTabColors();
}

function goBack(tab, content) {
    $('.tabcontent.active').removeClass('active');
    $('.tablinks.active').removeClass('active');
    tab.addClass('active');
    content.addClass('active');
    currentTab--;
    updateButtons();
    updateTabColors();
}

function updateTabColors() {
    var tabLinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tabLinks.length; i++) {
        if (i + 1 === currentTab) {
            tabLinks[i].style.backgroundColor = "#071D41"; // Cor da aba ativa
            tabLinks[i].style.color = "#fff"; // Cor do texto da aba ativa
        } else {
            tabLinks[i].style.backgroundColor = ""; // Reverter a cor das outras abas
            tabLinks[i].style.color = ""; // Reverter a cor do texto das outras abas
        }
    }
}

function updateButtons() {
    // Desabilitar o botão "próximo" e habilitar o botão "Salvar" na última aba
    if (currentTab > 4) {
        $('#nextBtn').prop('disabled', true);
        $('#saveBtn').prop('disabled', false);
        // Desabilitar o botão "Submit"
        $('#submitBtn').prop('disabled', true);
    } else {
        $('#nextBtn').prop('disabled', false);
        $('#saveBtn').prop('disabled', true);
        // Habilitar o botão "Submit" nas outras abas
        $('#submitBtn').prop('disabled', false);
    }

    // Desabilitar o botão "anterior" na primeira aba
    if (currentTab === 1) {
        $('#prevBtn').prop('disabled', true);
    } else {
        $('#prevBtn').prop('disabled', false);
    }

    // Atualizar a cor da aba ativa
    $('.tablinks').removeClass('active');
    $('#tab-' + currentTab).addClass('active');
}

$(function(){
    $('#form').on('submit', function(e){
        e.preventDefault();
        go($('#tab-' + (currentTab + 1)), $('.tablinks:contains("Tab' + (currentTab + 1) + '")'));
    });

    $('#prevBtn').on('click', function() {
        if (currentTab > 1) {
            goBack($('#tab-' + (currentTab - 1)), $('.tablinks:contains("Tab' + (currentTab - 1) + '")'));
        }
    });

    $('#nextBtn').on('click', function() {
        // Adicione sua lógica personalizada para ação "Próximo" se necessário
    });

    // Adicione a lógica para o botão "Salvar" (gerar PDF)
    $('#saveBtn').on('click', function() {
        // Adicione a lógica para gerar um PDF com base nos dados preenchidos
        // Substitua o seguinte exemplo com sua lógica real para criar um PDF
        alert('Lógica para gerar PDF aqui');
    });
});
