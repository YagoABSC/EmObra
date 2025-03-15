import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { buscarTiposServico } from "../../api";
import axios from "axios";
import './Postar.scss';

function Postar() {
    const token = localStorage.getItem("token");
    const contratanteIdFromStorage = localStorage.getItem("userId");
    
    if (!token || !contratanteIdFromStorage) {
        return null;
    }
    
    const [descricao, setDescricao] = useState("");
    const [contratanteId] = useState(contratanteIdFromStorage);
    const [tipoServico, setTipoServico] = useState("");
    const [cepObra, setCepObra] = useState("");
    const [prazo, setPrazo] = useState("");
    const [valor, setValor] = useState("");
    const [tiposServico, setTiposServico] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    useEffect(() => {
        const fetchTiposServico = async () => {
            setLoadingTipos(true);
            try {
                const data = await buscarTiposServico();
                setTiposServico(data);
            } catch (error) {
                console.error("Erro ao buscar tipos de serviço:", error);
            } finally {
                setLoadingTipos(false);
            }
        };
        fetchTiposServico();
    }, []);

    const handlePostarServico = async () => {
        if (!descricao.trim() || !tipoServico || !cepObra.trim()) {
            setMensagem("Por favor, preencha os campos obrigatórios.");
            setTipoMensagem("erro");
            return;
        }

        setLoading(true);
        setMensagem("");
        
        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
            await axios.post(`${API_URL}/add/servico`, {
                descricao,
                contratante_id: Number(contratanteId),
                tipo_servico: Number(tipoServico),
                cep_obra: cepObra,
                prazo: prazo || "A combinar",
                valor: valor || "A combinar",
            });
            
            setMensagem("Serviço postado com sucesso!");
            setTipoMensagem("sucesso");
            
            // Limpar formulário após o sucesso
            setDescricao("");
            setTipoServico("");
            setCepObra("");
            setPrazo("");
            setValor("");
            
        } catch (error) {
            setMensagem("Erro ao postar serviço. Verifique os dados e tente novamente.");
            setTipoMensagem("erro");
            console.error("Erro ao postar serviço:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="postar-servico">
            <div className="container-postar">
                <h2>Postar serviço</h2>
                
                <div className="form-group">
                    <label>Descrição do serviço</label>
                    <textarea 
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descreva o serviço que você precisa..."
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label>CEP da obra</label>
                    <IMaskInput 
                        mask="00000-000" 
                        value={cepObra} 
                        onAccept={(value) => setCepObra(value)} 
                        placeholder="Informe o CEP"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Prazo (Opcional)</label>
                        <input 
                            type="date" 
                            value={prazo} 
                            onChange={(e) => setPrazo(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Valor (Opcional)</label>
                        <input 
                            type="text" 
                            value={valor} 
                            onChange={(e) => setValor(e.target.value)} 
                            placeholder="A combinar" 
                        />
                    </div>
                </div>

                <div className="form-group tipo-servico-section">
                    <legend className="tipo-legend">Tipo de serviço</legend>
                    
                    {loadingTipos ? (
                        <div className="loader"></div>
                    ) : (
                        <div className="tipo-opcoes">
                            {tiposServico.length > 0 ? (
                                tiposServico.map((servico) => (
                                    <label 
                                        key={servico.id}
                                        htmlFor={`tipo-${servico.id}`}
                                        className={`tipo-option ${tipoServico === servico.id ? 'selected' : ''}`}
                                    >
                                        <div className="tipo-icon">
                                            <img
                                                src={servico.img_servico ? `/imgs-fixas/${servico.img_servico}` : "/imgs-perfil/avatar-pedreiro.jpg"}
                                                alt={servico.nome_servico}
                                            />
                                        </div>
                                        {servico.nome_servico}
                                        <input
                                            type="radio"
                                            name="tipo_servico"
                                            id={`tipo-${servico.id}`}
                                            value={servico.id}
                                            checked={tipoServico === servico.id}
                                            onChange={() => setTipoServico(servico.id)}
                                        />
                                    </label>
                                ))
                            ) : (
                                <p className="erro-message">Nenhum tipo de serviço encontrado.</p>
                            )}
                        </div>
                    )}
                </div>

                {mensagem && <div className={`mensagem ${tipoMensagem}`}>{mensagem}</div>}
                
                <button 
                    className="btn-postar" 
                    onClick={handlePostarServico} 
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Postar serviço"}
                </button>
            </div>
        </section>
    );
}

export default Postar;