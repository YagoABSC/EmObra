import React, { useState, useEffect } from "react";
import { 
    FaHardHat, 
    FaMapMarkerAlt, 
    FaShieldAlt, 
    FaTools, 
    FaRedo, 
    FaStar, 
    FaSearch, 
    FaPhone, 
    FaWhatsapp 
} from "react-icons/fa";
import { IMaskInput } from "react-imask";
import { buscarPedreiros, buscarTiposServico } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Buscas.scss";

function Buscas() {
    const [tipoServico, setTipoServico] = useState("");
    const [cep, setCep] = useState("");
    const [pedreiros, setPedreiros] = useState([]);
    const [erro, setErro] = useState("");
    const [tiposServico, setTiposServico] = useState([]);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [isLoadingBusca, setIsLoadingBusca] = useState(false);
    const [buscaRealizada, setBuscaRealizada] = useState(false);
    
    const token = localStorage.getItem("token"); // Checando se o token existe
    const isLoggedIn = !!token; // Se existir o token, o usuário está logado

    useEffect(() => {
        const fetchTiposServico = async () => {
            setLoadingTipos(true);
            try {
                const data = await buscarTiposServico();
                if (Array.isArray(data)) {
                    setTiposServico(data);
                } else {
                    setTiposServico([]);
                }
            } catch (err) {
                console.error("Erro ao buscar tipos de serviços:", err);
                setTiposServico([]);
            } finally {
                setLoadingTipos(false);
            }
        };
        fetchTiposServico();
    }, []);

    const handleBuscar = async () => {
        if (!cep.replace(/[^0-9]/g, "").length) {
            setErro("Por favor, informe um CEP válido.");
            return;
        }
        
        if (!tipoServico) {
            setErro("Por favor, selecione um tipo de serviço.");
            return;
        }
        
        setIsLoadingBusca(true);
        try {
            setErro("");
            const data = await buscarPedreiros(tipoServico, cep);
            setPedreiros(data.pedreiros || []);
            setBuscaRealizada(true);
        } catch (err) {
            setErro("Erro ao buscar pedreiros. Verifique os dados e tente novamente.");
        } finally {
            setIsLoadingBusca(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    };

    return (
        <section className="buscas">
            <h1>Sua Obra merece os <span>melhores profissionais! <FaHardHat /></span></h1>
            <h2>
                Encontre <span><FaTools /> pedreiros qualificados</span> perto de você e transforme sua obra em
                <span> realidade</span> com <span><FaShieldAlt /> segurança</span> e <span>eficiência</span>.
            </h2>

            {!buscaRealizada && (
                <div className="busca-inputs">
                    <div className="buscador">
                        <IMaskInput
                            mask="00000-000"
                            value={cep}
                            onAccept={(value) => setCep(value)}
                            placeholder="Informe seu CEP"
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleBuscar} disabled={isLoadingBusca}>
                            {isLoadingBusca ? (
                                <>Carregando...</>
                            ) : (
                                <>
                                    <FaSearch /> Buscar Pedreiros
                                </>
                            )}
                        </button>
                    </div>
                    {loadingTipos ? (
                        <div className="spinnerContainer">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="radio-inputs">
                            {tiposServico.length > 0 ? (
                                tiposServico.map((servico) => (
                                    <label key={servico.id}>
                                        <input
                                            className="radio-input"
                                            type="checkbox"
                                            name="tipo_servicos"
                                            value={servico.id}
                                            onChange={() => setTipoServico(servico.id)}
                                            checked={tipoServico === servico.id}
                                        />
                                        <span className="radio-tile">
                                            <span className="radio-icon">
                                                <img
                                                    src={servico.img_servico ? `/imgs-fixas/${servico.img_servico}` : "/imgs-perfil/avatar-pedreiro.jpg"}
                                                    alt={servico.nome_servico}
                                                />
                                            </span>
                                            <span className="radio-label">{servico.nome_servico}</span>
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <p className="erro">Nenhum tipo de serviço encontrado.</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {erro && <p className="erro">{erro}</p>}

            {isLoadingBusca && (
                <div className="spinnerContainer">
                    <div className="spinner"></div>
                </div>
            )}

            {buscaRealizada && (
                <>
                    <button className="refazer-busca" onClick={() => setBuscaRealizada(false)}>
                        <FaRedo /> Refazer Busca
                    </button>
                    {pedreiros.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="swiper-container"
                        >
                            {pedreiros.map((pedreiro) => (
                                <SwiperSlide key={pedreiro.id}>
                                    <div className="pedreiro-card">
                                        <img
                                            src={pedreiro.img_perfil ? pedreiro.img_perfil : "/imgs-perfil/avatar-pedreiro.jpg"}
                                            alt={pedreiro.nome}
                                            className="pedreiro-img"
                                        />
                                        <div className="pedreiro-info">
                                            <h3>{pedreiro.nome}</h3>
                                            <p><FaMapMarkerAlt /> {pedreiro.distancia_km} km de distância</p>
                                            <p>
                                                <FaStar /> 
                                                {pedreiro.media_avaliacoes 
                                                    ? `${pedreiro.media_avaliacoes} estrelas` 
                                                    : "Sem avaliações"}
                                            </p>
                                            {isLoggedIn ? (
                                                <>
                                                    <p><FaPhone /> 
                                                        <IMaskInput
                                                            mask="(00) 00000-0000"
                                                            value={pedreiro.telefone}
                                                            disabled
                                                            placeholder="Telefone"
                                                            className="masked-input"
                                                        />
                                                    </p>
                                                    <a 
                                                        href={`https://wa.me/55${pedreiro.telefone.replace(/\D/g, "")}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="whatsapp-button"
                                                    >
                                                        <FaWhatsapp /> Chamar no WhatsApp
                                                    </a>
                                                </>
                                            ) : (
                                                <p>Faça login para ver os contatos.</p>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="erro">Nenhum pedreiro encontrado para esse serviço na sua região.</p>
                    )}
                </>
            )}
        </section>
    );
}

export default Buscas;
