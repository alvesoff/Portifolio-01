document.addEventListener('DOMContentLoaded', function() {
  // Menu interativo para mobile
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', function() {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x'); // Muda o ícone para um "X" quando o menu está aberto
  });

  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function() {
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x'); // Volta ao ícone de menu quando um link é clicado
    });
  });

  // Validação e envio do formulário de contato
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    // Validação de Nome
    if (!/^[A-Za-z\s]{3,}$/.test(name)) {
      alert('O nome deve ter pelo menos 3 caracteres e conter apenas letras.');
      return;
    }

    // Validação de Telefone
    if (!/^\d{2}\d{8,}$/.test(phone)) {
      alert('O número de telefone deve conter o DDD seguido de pelo menos 8 dígitos.');
      return;
    }

    // Enviar o formulário se todas as validações passarem
    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        alert('Ocorreu um erro ao enviar a mensagem.');
      }
    });
  });

  // Script para o slider de projetos
  let currentSlide = 0; // Índice do slide atual
  const projectsBox = document.querySelector('.projects-box'); // Seleciona o contêiner dos projetos
  const projects = Array.from(projectsBox.children); // Seleciona todos os projetos e converte para um array
  const totalSlides = projects.length; // Número total de projetos
  let visibleSlides = window.innerWidth < 768 ? 1 : 3; // Número de projetos visíveis ao mesmo tempo, ajustado para mobile

  function showSlides() {
    // Oculta todos os projetos
    projects.forEach(project => project.style.display = 'none');
    
    // Exibe os projetos do conjunto atual
    for (let i = 0; i < visibleSlides; i++) {
      const index = (currentSlide + i) % totalSlides;
      projects[index].style.display = 'flex';
    }
  }

  function moveSlide(direction) {
    // Calcula o novo índice do slide atual
    currentSlide = (currentSlide + direction * visibleSlides + totalSlides) % totalSlides;
    showSlides(); // Atualiza a exibição dos projetos
  }

  document.querySelector('.prev').addEventListener('click', () => {
    moveSlide(-1); // Move para o conjunto anterior de projetos ao clicar no botão "prev"
  });

  document.querySelector('.next').addEventListener('click', () => {
    moveSlide(1); // Move para o próximo conjunto de projetos ao clicar no botão "next"
  });

  // Atualiza a exibição dos projetos ao carregar a página
  showSlides();

  // Adiciona a funcionalidade de troca automática dos slides a cada 10 segundos
  setInterval(() => {
    moveSlide(1); // Move para o próximo conjunto de projetos
  }, 10000); // 10000 milissegundos = 10 segundos

  // Atualiza o número de slides visíveis ao redimensionar a janela
  window.addEventListener('resize', () => {
    visibleSlides = window.innerWidth < 768 ? 1 : 3;
    showSlides();
  });
});
