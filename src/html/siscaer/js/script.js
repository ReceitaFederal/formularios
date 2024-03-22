  /*function showInfo() {
    document.getElementById('infoText').style.display = 'block';
  }

  function hideInfo() {
    document.getElementById('infoText').style.display = 'none';
  } */
  
  // o código a seguir serve para trocar as abas com o elemento tab 
 const tabs = document.querySelectorAll('.tab-btn');

 tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

 const tabClicked = (tab) => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');

    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('show'));

    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId);
    
    content.classList.add('show');
 }

