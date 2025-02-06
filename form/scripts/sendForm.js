// Função para coletar e enviar dados do formulário
async function handleFormSubmission(event) {
  event.preventDefault();

  // Validação do telefone
  const phoneInput = document.getElementById("phone");
  if (!validatePhone(phoneInput.value)) {
    alert("Por favor, insira um número de telefone válido no formato (00) 0 0000-0000");
    return;
  }

  // Coleta as habilidades selecionadas
  const selectedSkills = Array.from(
    document.querySelectorAll('input[name="skills"]:checked')
  ).map((checkbox) => checkbox.value);

  // Coleta os ministérios selecionados
  const selectedMinistries = Array.from(
    document.querySelectorAll('input[name="ministries"]:checked')
  ).map((checkbox) => checkbox.value);

  // Cria o objeto com todos os dados
  const formData = {
    name: document.getElementById("fullName").value,
    phone: phoneInput.value,
    hard_skills: selectedSkills,
    ministries: selectedMinistries,
    about_volunteer: document.getElementById("about_volunteer").value,
    formation: document.getElementById("work").value,
    registred_at: new Date().toISOString()
  };

  //LEMBRAR DE COLOCAR A URL E API KEY, TIREI PQ O GIT GUARDIAN XIOU
  try {
    // Configuração da requisição
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': '',
        'Authorization': 'Bearer ',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Dados enviados com sucesso!');
    alert('Formulário enviado com sucesso!');
    
    // Opcional: Limpar o formulário após envio bem-sucedido
    document.getElementById("ministry-form").reset();

  } catch (error) {
    console.error('Erro ao enviar os dados:', error);
    alert('Erro ao enviar o formulário. Por favor, tente novamente.');
  }
}

// Adiciona os event listeners quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona a máscara ao campo de telefone
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", maskPhone);

  // Adiciona o handler de submit ao formulário
  const form = document.querySelector(".ministry-form");
  form.addEventListener("submit", handleFormSubmission);
});