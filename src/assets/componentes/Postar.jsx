import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { buscarTiposServico, postarServico } from "../../api";
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
            await postarServico({
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="postar-servico">
            <div className="container-postar">
                <div className="header-postar">
                    <h2>Postar serviço</h2>
                    <p>Preencha as informações abaixo para encontrar um profissional</p>
                </div>
                
                <div className="form-content">
                    <div className="form-group">
                        <div className="input-container">
                            <textarea 
                                required
                                value={descricao} 
                                onChange={(e) => setDescricao(e.target.value)}
                                rows={3}
                            />
                            <label className={descricao ? "active" : ""}>Descrição do serviço</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <IMaskInput 
                                required
                                mask="00000-000" 
                                value={cepObra} 
                                onAccept={(value) => setCepObra(value)} 
                            />
                            <label className={cepObra ? "active" : ""}>CEP da obra</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <div className="input-container">
                                <input 
                                    type="date" 
                                    value={prazo} 
                                    onChange={(e) => setPrazo(e.target.value)} 
                                />
                                <label className={prazo ? "active" : ""}>Prazo (Opcional)</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-container">
                                <input 
                                    type="text" 
                                    value={valor} 
                                    onChange={(e) => setValor(e.target.value)} 
                                    placeholder=" " 
                                />
                                <label className={valor ? "active" : ""}>Valor (Opcional)</label>
                            </div>
                        </div>
                    </div>

                    <div className="tipo-servico-section">
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
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        {loading ? "Enviando..." : "Postar serviço"}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Postar;