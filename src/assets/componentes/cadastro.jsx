import React, { useState } from "react";
import axios from "axios";

const CadastroContratante = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://apiobra.vercel.app';

  const cadastrarContratante = async (nome, email, senha, cpf, cep, telefone) => {
    try {
      const response = await axios.post(`${API_URL}/add/contratante`, { nome, email, senha, cpf, cep, telefone, tipoUsuario: 'contratante' });
      return response.data;
    } catch (error) {
      console.error('Erro:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleCadastrar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setMensagem("");

    try {
      const response = await cadastrarContratante(nome, email, senha, cpf, cep, telefone);

      if (response.message) {
        setMensagem(response.message);
      }
    } catch (err) {
      setErro(err.response?.data?.message || "Erro desconhecido ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  const formatCpf = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    const formatted = onlyNumbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return formatted.length <= 14 ? formatted : formatted.substring(0, 14); 
  };

  const formatTelefone = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    const formatted = onlyNumbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
    return formatted.length <= 15 ? formatted : formatted.substring(0, 15); 
  };

  const formatCep = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    const formatted = onlyNumbers.replace(/(\d{5})(\d)/, '$1-$2');
    return formatted.length <= 9 ? formatted : formatted.substring(0, 9); 
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Cadastro</h2>
      {erro && <p className="error-message">{erro}</p>}
      {mensagem && <p className="success-message">{mensagem}</p>}
      <form onSubmit={handleCadastrar}>
        <div className="input-group-modal-cadastro">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            required
            className="border-0 outline-none shadow-none"
          />
        </div>
        <div className="input-group-modal-cadastro">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border-0 outline-none shadow-none"
          />
        </div>
        <div className="input-group-modal-cadastro">
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="border-0 outline-none shadow-none"
          />
        </div>
        <div className="input-group-modal-cadastro">
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            placeholder="CPF"
            maxLength={14} 
            required
            className="border-0 outline-none shadow-none"
          />
        </div>
        <div className="input-group-modal-cadastro">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            placeholder="CEP"
            maxLength={9} // Limita o campo a 9 caracteres
            required
            className="border-0 outline-none shadow-none"
          />
        </div>
        <div className="input-group-modal-cadastro">
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
            placeholder="Telefone"
            maxLength={15} 
            required
            className="border-0 outline-none shadow-none"
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default CadastroContratante;
