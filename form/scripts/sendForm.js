// Importa o cliente do Supabase
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  "https://wcisxoawarrciybncehs.supabase.co", // Substitua pela sua URL do Supabase
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjaXN4b2F3YXJyY2l5Ym5jZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzMyNDIsImV4cCI6MjA1NDI0OTI0Mn0.IZNW5zJy-c2AszKlVHrkooBlBcg207INqQisr87XUHA" 
);



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

  // Cria o objeto com todos os dados conforme estrutura do Supabase
  const formData = {
    name: document.getElementById("fullName").value,
    phone: phoneInput.value,
    hard_skills: selectedSkills, 
    ministries: selectedMinistries,
    about_volunteer: document.getElementById("about_volunteer").value,
    formation: document.getElementById("work").value, // Campo work do form corresponde ao formation da tabela
    registred_at: new Date().toISOString() // Adicionando timestamp atual
  };

  // Loga os dados no console de forma formatada
  console.log("Dados do formulário:", {
    ...formData,
    hard_skills: JSON.parse(formData.hard_skills), // Convertendo de volta para array para melhor visualização
    ministries: JSON.parse(formData.ministries) // Convertendo de volta para array para melhor visualização
  });

  return formData;
}

// Inserindo no Supabase
const { data, error } = await supabase.from("form_volunteers").insert([formData]);

if (error) {
  console.error("Erro ao enviar os dados:", error);
  alert("Erro ao enviar o formulário. Tente novamente.");
} else {
  console.log("Dados inseridos com sucesso:", data);
  alert("Formulário enviado com sucesso!");
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