import React, { useState } from "react";

function CadastroContratante() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setMensagem("");

    try {
      const response = await fetch('https://apiobra.vercel.app/add/contratante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          cpf,
          cep,
          telefone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar. Tente novamente.");
      }

      const data = await response.json();
      if (data.message) {
        setMensagem(data.message);
      }
    } catch (err) {
      console.error("Erro ao cadastrar contratante:", err);
      setErro(err.message || "Erro desconhecido ao cadastrar.");
    } finally {
      setLoading(false);
    }
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
            />
          </div>
          <div className="input-group-modal-cadastro">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group-modal-cadastro">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />
          </div>
          <div className="input-group-modal-cadastro">
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF"
              required
            />
          </div>
          <div className="input-group-modal-cadastro">
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="CEP"
              required
            />
          </div>
          <div className="input-group-modal-cadastro">
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>
    
    </div>
  );
}

export default CadastroContratante;
