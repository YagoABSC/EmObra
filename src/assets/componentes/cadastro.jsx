import React, { useState } from "react";
import { cadastrarContratante } from "../../api"; // A função que faz o cadastro via API
 
function CadastroContratante() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [telefone, setTelefone] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
 
    const handleCadastrar = async () => {
        try {
            setErro(""); // Limpa a mensagem de erro
            setSucesso(""); // Limpa a mensagem de sucesso
            const data = await cadastrarContratante({ nome, email, senha, cpf, cep, telefone });
 
            if (data.message) {
                setSucesso(data.message);
            }
        } catch (err) {
            setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }
    };
 
    return (
<section className="cadastro">
<h1>Cadastro de Contratante</h1>
<h2>Complete os campos abaixo para realizar seu cadastro.</h2>
 
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
            {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
</section>
    );
}
 
export default CadastroContratante;