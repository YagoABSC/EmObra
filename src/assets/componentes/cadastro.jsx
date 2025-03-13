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
 
    const handleCadastrar = async () => {
        try {
            setErro(""); 
            setMensagem(""); 
 
            // Enviando dados para o cadastro
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
 
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao cadastrar. Tente novamente.");
            }
 
            // Processa a resposta da API se o cadastro for bem-sucedido
            const data = await response.json();
            if (data.message) {
                setMensagem(data.message);
            }
        } catch (err) {
            console.error("Erro ao cadastrar contratante:", err);
            setErro(err.message || "Erro desconhecido ao cadastrar.");
        }
    };
 
    return (
        <section className="cadastro">
            <h1>Estamos <span>Em Obra!</span></h1>
            <h2>Cadastre-se para encontrar ou oferecer serviços.</h2>
 
            <div>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <button onClick={handleCadastrar}>Cadastrar</button>
            </div>
 
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
        </section>
    );
}
 
export default CadastroContratante;