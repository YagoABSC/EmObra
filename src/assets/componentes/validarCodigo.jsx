import React, { useState } from "react";

function ValidarCodigo({ setPasso }) {
  const [codigo, setCodigo] = useState(""); // Código de verificação
  const [novaSenha, setNovaSenha] = useState(""); // Nova senha
  const [confirmarSenha, setConfirmarSenha] = useState(""); // Confirmação de senha
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(""); // Estado para mensagens de erro

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(""); // Limpa mensagens de erro anteriores

    // Validações
    if (!codigo || !novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://apiobra.vercel.app/redefinir-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo, novaSenha }),
      });

      // Verifica a resposta antes de processá-la como JSON
      const responseText = await response.text();
      console.log("Resposta do servidor:", responseText);

      if (!response.ok) {
        // Tenta parsear o erro como JSON, se possível
        let errorMessage = "Erro ao redefinir a senha.";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error("Resposta do servidor não é um JSON válido:", responseText);
        }
        throw new Error(errorMessage);
      }

      // Converte a resposta para JSON
      const data = JSON.parse(responseText);
      if (data.message) {
        console.log("Senha redefinida com sucesso!");
        setPasso(3); // Passo 3: Sucesso na redefinição
      }
    } catch (err) {
      console.error("Erro ao redefinir a senha:", err);
      setErro(err.message || "Erro ao redefinir a senha."); // Exibe mensagem de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Digite o código de verificação e a nova senha</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>} {/* Exibe mensagem de erro */}
      <form onSubmit={handleRedefinirSenha}>
        <div className="input-group-modal-cadastro">
          <input
            type="text"
            value={codigo}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
              setCodigo(onlyNumbers.slice(0, 6)); // Limita a 6 caracteres
            }}
            placeholder="Código de verificação"
            required
          />
        </div>

        <div className="input-group-modal-cadastro">
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Nova senha"
            required
          />
        </div>

        <div className="input-group-modal-cadastro">
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirmar nova senha"
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Carregando..." : "Redefinir Senha"}
        </button>
      </form>
    </div>
  );
}

export default ValidarCodigo;