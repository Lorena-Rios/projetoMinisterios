// Função para coletar dados do formulário
function collectFormData(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  // Pega o valor do telefone e valida
  const phoneInput = document.getElementById("phone");
  if (!validatePhone(phoneInput.value)) {
    alert("Por favor, insira um número de telefone válido no formato (00) 0 0000-0000");
    return;
  }

  // Coleta as habilidades selecionadas
  const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map((checkbox) => checkbox.value);

  // Coleta os ministérios selecionados
  const selectedMinistries = Array.from(document.querySelectorAll('input[name="ministries"]:checked')).map((checkbox) => checkbox.value);

  // Cria o objeto com todos os dados
  const formData = {
    personalInfo: {
      fullName: document.getElementById("fullName").value,
      phone: phoneInput.value,
      skills: selectedSkills,
    },
    ministries: selectedMinistries,
  };

  // Loga os dados no console
  console.log("Dados do formulário:", formData);
  return formData;
}

// Adiciona os event listeners quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona a máscara ao campo de telefone
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", maskPhone);

  // Adiciona o handler de submit ao formulário
  const form = document.querySelector(".ministry-form");
  form.addEventListener("submit", collectFormData);
});
