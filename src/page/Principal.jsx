import React, { useState } from 'react';
import { apiGet, apiPost } from '../services/api.js'; // Importar suas funções de requisição
import './principal.styles.css';

const Principal = () => {
  const [formData, setFormData] = useState({
    question: '',
    imageUrl: '',
    correctOption: "A",
    opcoes: [
      { optionLetter: "A", optionText: '' },
      { optionLetter: "B", optionText: '' },
      { optionLetter: "C", optionText: '' },
      { optionLetter: "D", optionText: '' }
    ]
  });

  const [questionExists, setQuestionExists] = useState(null); // Estado para verificar se a pergunta já existe

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Verificar se o campo alterado é uma opção ou outro campo
    if (id.startsWith("option")) {
      const index = parseInt(id.replace("option", "")) - 1;
      setFormData((prevData) => {
        const updatedOpcoes = [...prevData.opcoes];
        updatedOpcoes[index].optionText = value;
        return {
          ...prevData,
          opcoes: updatedOpcoes
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
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
      if (response.length === 1) {
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

    // Verificar se a pergunta já existe
    handleCheckQuestion();

    // Construir o JSON no formato esperado
    const payload = {
      questionText: formData.question,
      imageUrl: formData.imageUrl || null, // Se a imagem não for fornecida, envia null
      correctOption: formData.correctOption,
      opcoes: formData.opcoes
    };

    try {
      // Enviar os dados via POST
      const response = await apiPost('/questao', payload);
      console.log('Pergunta cadastrada com sucesso:', response);
      handleClear();
    } catch (error) {
      console.error('Erro ao cadastrar pergunta:', error);
    }

    console.log(payload);
  };

  const handleClear = () => {
    setFormData({
      question: '',
      imageUrl: '',
      correctOption: "A",
      opcoes: [
        { optionLetter: "A", optionText: '' },
        { optionLetter: "B", optionText: '' },
        { optionLetter: "C", optionText: '' },
        { optionLetter: "D", optionText: '' }
      ]
    });
    setQuestionExists(null); // Resetar o estado de existência da pergunta
  };

  return (
    <div className="container">
      <h1>Adicionar Pergunta</h1>

      <form onSubmit={handleSubmit}>
      <div className="perguntaImg">
        <div className="pergunta">
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
            <p className='msg'>{questionExists ? <span className='spanOrange'>A pergunta já existe no banco de dados.</span>  : <span className='spanGreen'>A pergunta não foi encontrada.</span>}</p>
          )}
        </div>
        <div className="img">
          {/* URL da Imagem */}
          <label htmlFor="imageUrl">URL da Imagem (opcional):</label>
          <input
            type="url"
            id="imageUrl"
            placeholder="https://exemplo.com/imagem.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
      </div>

        {/* Opções de Resposta */}
        <label htmlFor="option1">Opção 1:</label>
        <input
          type="text"
          id="option1"
          placeholder="Digite a primeira opção..."
          value={formData.opcoes[0].optionText}
          onChange={handleChange}
          required
        />

        <label htmlFor="option2">Opção 2:</label>
        <input
          type="text"
          id="option2"
          placeholder="Digite a segunda opção..."
          value={formData.opcoes[1].optionText}
          onChange={handleChange}
          required
        />

        <label htmlFor="option3">Opção 3:</label>
        <input
          type="text"
          id="option3"
          placeholder="Digite a terceira opção..."
          value={formData.opcoes[2].optionText}
          onChange={handleChange}
          required
        />

        <label htmlFor="option4">Opção 4:</label>
        <input
          type="text"
          id="option4"
          placeholder="Digite a quarta opção..."
          value={formData.opcoes[3].optionText}
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
