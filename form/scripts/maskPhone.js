// Função para aplicar máscara ao telefone
function maskPhone(event) {
  let input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove tudo que não é número
  let formattedValue = "";

  if (value.length > 0) {
    // Adiciona parênteses no DDD
    formattedValue = "(" + value.substring(0, 2);

    if (value.length > 2) {
      // Adiciona o fechamento do parênteses e o espaço
      formattedValue += ") " + value.substring(2, 3);

      if (value.length > 3) {
        // Adiciona o bloco de 4 dígitos
        formattedValue += " " + value.substring(3, 7);

        if (value.length > 7) {
          // Adiciona o hífen e os últimos 4 dígitos
          formattedValue += "-" + value.substring(7, 11);
        }
      }
    }
  }

  input.value = formattedValue;
}

// Função para validar o telefone
function validatePhone(phone) {
  // Remove todos os caracteres não numéricos
  const numbers = phone.replace(/\D/g, "");

  // Verifica se tem 11 dígitos (com DDD)
  if (numbers.length !== 11) {
    return false;
  }

  // Verifica se o DDD é válido (maior que 11)
  const ddd = parseInt(numbers.substring(0, 2));
  if (ddd < 11) {
    return false;
  }

  // Verifica se o nono dígito é 9
  if (numbers[2] !== "9") {
    return false;
  }

  return true;
}
