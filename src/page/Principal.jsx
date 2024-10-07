import React, { useState } from 'react';
import { apiGet, apiPost } from '../services/api.js'; // Importar suas funções de requisição
import './principal.styles.css';

const Principal = () => {
  const [formData, setFormData] = useState({
    question: '',
    imageUrl: '',
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  });

  const [questionExists, setQuestionExists] = useState(null); // Estado para verificar se a pergunta já existe

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleCheckQuestion = async () => {
    const { question } = formData;
    
    if (!question) {
      alert('Por favor, insira uma pergunta.');
      return;
    }

    try {
      // Usar apiGet para verificar se a pergunta já existe
      const response = await apiGet(`/questao/descricao/${encodeURIComponent(question)}`);
      console.log(response.length);

      // Exibir mensagem caso a questão exista
      if (response.length == 1) {
        setQuestionExists(true);
      } else {
        setQuestionExists(false);
      }
    } catch (error) {
      console.error('Erro ao buscar pergunta:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    handleCheckQuestion();
  };

  const handleClear = () => {
    setFormData({
      question: '',
      imageUrl: '',
      option1: '',
      option2: '',
      option3: '',
      option4: ''
    });
    setQuestionExists(null); // Resetar o estado de existência da pergunta
  };

  return (
    <div className="container">
      <h1>Adicionar Pergunta</h1>

      <form onSubmit={handleSubmit}>
        {/* Pergunta */}
        <label htmlFor="question">Pergunta:</label>
        <textarea
          id="question"
          placeholder="Digite sua pergunta aqui..."
          value={formData.question}
          onChange={handleChange}
          required
        />

        {/* Botão para verificar se a pergunta existe */}
        <button type="button" onClick={handleCheckQuestion}>Verificar Pergunta</button>
        {questionExists !== null && (
          <p>{questionExists ? 'A pergunta já existe no banco de dados.' : 'A pergunta não foi encontrada.'}</p>
        )}

        {/* URL da Imagem */}
        <label htmlFor="imageUrl">URL da Imagem (opcional):</label>
        <input
          type="url"
          id="imageUrl"
          placeholder="https://exemplo.com/imagem.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        {/* Opções de Resposta */}
        <label htmlFor="option1">Opção 1:</label>
        <input
          type="text"
          id="option1"
          placeholder="Digite a primeira opção..."
          value={formData.option1}
          onChange={handleChange}
          required
        />

        <label htmlFor="option2">Opção 2:</label>
        <input
          type="text"
          id="option2"
          placeholder="Digite a segunda opção..."
          value={formData.option2}
          onChange={handleChange}
          required
        />

        <label htmlFor="option3">Opção 3:</label>
        <input
          type="text"
          id="option3"
          placeholder="Digite a terceira opção..."
          value={formData.option3}
          onChange={handleChange}
          required
        />

        <label htmlFor="option4">Opção 4:</label>
        <input
          type="text"
          id="option4"
          placeholder="Digite a quarta opção..."
          value={formData.option4}
          onChange={handleChange}
          required
        />

        {/* Botões */}
        <div className="button-container">
          <button type="submit">Enviar</button>
          <button type="button" onClick={handleClear}>Limpar</button>
        </div>
      </form>
    </div>
  );
};

export default Principal;
