import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { buscarTiposServico } from "../../api";
import axios from "axios";

const API_URL = "https://apiobra.vercel.app";

function Postar() {
    const [descricao, setDescricao] = useState("");
    const [contratanteId, setContratanteId] = useState("");
    const [tipoServico, setTipoServico] = useState("");
    const [cepObra, setCepObra] = useState("");
    const [prazo, setPrazo] = useState("");
    const [valor, setValor] = useState("");
    const [tiposServico, setTiposServico] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const fetchTiposServico = async () => {
            try {
                const data = await buscarTiposServico();
                setTiposServico(data);
            } catch (error) {
                console.error("Erro ao buscar tipos de serviço:", error);
            }
        };
        fetchTiposServico();
    }, []);

    const handlePostarServico = async () => {
        setLoading(true);
        setMensagem("");
        try {
            const response = await axios.post(`${API_URL}/add/servico`, {
                descricao,
                contratante_id: Number(contratanteId),
                tipo_servico: Number(tipoServico),
                cep_obra: cepObra,
                prazo: prazo || "A combinar",
                valor: valor || "A combinar",
            });
            setMensagem("Serviço postado com sucesso!");
        } catch (error) {
            setMensagem("Erro ao postar serviço. Verifique os dados e tente novamente.");
            console.error("Erro ao postar serviço:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="postar">
            <div className="container">
                <h2>Poste seu serviço</h2>
                <label>Descrição:</label>
                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                <label>Contratante ID:</label>
                <input type="number" value={contratanteId} onChange={(e) => setContratanteId(e.target.value)} />

                <label>CEP da Obra:</label>
                <IMaskInput mask="00000-000" value={cepObra} onAccept={(value) => setCepObra(value)} placeholder="Informe o CEP" />

                <label>Prazo (Opcional):</label>
                <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} placeholder="A combinar" />

                <label>Valor (Opcional):</label>
                <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="A combinar" />

                <label>Tipo de Serviço:</label>
                <select value={tipoServico} onChange={(e) => setTipoServico(e.target.value)}>
                    <option value="">Selecione um serviço</option>
                    {tiposServico.length > 0 ? (
                        tiposServico.map((servico) => (
                            <option key={servico.id} value={servico.id}>
                                {servico.nome_servico}
                            </option>
                        ))
                    ) : (
                        <option disabled>Carregando serviços...</option>
                    )}
                </select>

                {mensagem && <p className="mensagem">{mensagem}</p>}
                <button onClick={handlePostarServico} disabled={loading}>{loading ? "Postando..." : "Postar serviço"}</button>
            </div>
        </section>
    );
}

export default Postar;
