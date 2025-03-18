import { useState } from "react";

const Login = () => {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://apiobra.vercel.app/user/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identificador, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao autenticar");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userType", data.tipo);

      alert("Login bem-sucedido!");
      // Redirecionar para a página inicial ou 
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
        <h2 className="login-title">Entrar</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group-modal-cadastro">
            <input
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              placeholder="Email ou CPF"
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
    
    </div>
  );
};

export default Login;
