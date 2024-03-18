let currentTab = 1;

function go(tab, content) {

    document.querySelector('.tabcontent.active').remove('active');    
    document.querySelector('.tablinks.active').remove('active');
    tab.add('active');
    content.add('active');
    currentTab++;
    updateButtons();
    updateTabColors();
}

function goBack(tab, content) {
    document.querySelector('.tabcontent.active').classList.remove('active');
    document.querySelector('.tablinks.active').classList.remove('active');
    tab.classList.add('active');
    content.classList.add('active');
    currentTab--;
    updateButtons();
    updateTabColors();
}

function updateTabColors() {
    const tabLinks = document.querySelector(".tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
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
        document.querySelector('#nextBtn').disabled = true;
        document.querySelector('#saveBtn').disabled = false;
        // Desabilitar o botão "Submit"
        document.querySelector('#submitBtn').disabled = true;
    } else {
        document.querySelector('#nextBtn').disabled = false;
        document.querySelector('#saveBtn').disabled = true;
        // Habilitar o botão "Submit" nas outras abas
        document.querySelector('#submitBtn').disabled = false;
    }

    // Desabilitar o botão "anterior" na primeira aba
    if (currentTab === 1) {
        document.querySelector('#prevBtn').disabled = true;
    } else {
        document.querySelector('#prevBtn').disabled = false;
    }

    // Atualizar a cor da aba ativa
    document.querySelector('.tablinks').classList.remove('active');
    document.querySelector('#tab-' + currentTab).classList.add('active');
}

window.addEventListener('load', ()=>{



    document.querySelector('#prevBtn').addEventListener('click', () => {
            
        if (currentTab > 1) {
            goBack(
                document.querySelector('#tab-' + (currentTab - 1)), 
                document.querySelector('.tablinks:contains("Tab' + (currentTab - 1) + '")')
            );
        }
    });

    document.querySelector('#nextBtn').addEventListener('click', () => {
            
        go(
            document.querySelector(`#tab-${currentTab + 1}`), 
            document.querySelector(`#tab-${currentTab + 1}`)
        );
    });

    // Adicione a lógica para o botão "Salvar" (gerar PDF)
    document.querySelector('#saveBtn').addEventListener('click', () => {
        // Adicione a lógica para gerar um PDF com base nos dados preenchidos
        // Substitua o seguinte exemplo com sua lógica real para criar um PDF
        alert('Lógica para gerar PDF aqui');
    });
});

