

// const BASE_URL = 'http://192.168.1.5:8082/v1';  
 const URL = 'http://localhost:8082/v1';  


// Função GET
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Erro na requisição GET:', error);
    throw error;
  }

};

// Função POST
export const apiPost = async (endpoint, body) => {
  try {
    const response = await fetch(`${URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Lançar um erro com o status e a resposta do servidor
      const errorMessage = await response.text(); // Caso a resposta tenha alguma mensagem de erro
      throw new Error(`Erro HTTP! status: ${response.status}, mensagem: ${errorMessage}`);
    }

    // Tentar converter para JSON apenas se a resposta for JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Resposta não está em formato JSON');
    }
  } catch (error) {
    console.error(' Erro na requisição POST:', error);
    throw error; // Repassar o erro para ser tratado fora da função
  }
};
// Você pode adicionar funções para PUT, DELETE, etc. da mesma forma.
