import React, { useState } from "react";

function EsqueciMinhaSenha({ setPasso }) {
  const [identificador, setIdentificador] = useState(""); // Pode ser o e-mail ou CPF
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSolicitarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setMensagem("");

    try {
      const response = await fetch('https://apiobra.vercel.app/solicitar-codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identificador,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao solicitar o código. Tente novamente.");
      }

      const data = await response.json();
      if (data.message) {
        setMensagem(data.message); // Mensagem de sucesso
        setPasso(2); // Mudar para o passo de validar código
      }
    } catch (err) {
      console.error("Erro ao solicitar código:", err);
      setErro(err.message || "Erro desconhecido ao solicitar o código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Esqueceu sua senha?</h2>

      {erro && <p className="error-message">{erro}</p>}
      {mensagem && <p className="success-message">{mensagem}</p>}

      <form onSubmit={handleSolicitarCodigo}>
        <div className="input-group-modal-cadastro">
          <input
            type="text"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            placeholder="E-mail ou CPF"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Carregando..." : "Solicitar Código"}
        </button>
      </form>
    </div>
  );
}

export default EsqueciMinhaSenha;
