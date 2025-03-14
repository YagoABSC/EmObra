import React, { useState, useEffect } from "react";
import { FaHardHat, FaMapMarkerAlt, FaShieldAlt, FaTools, FaRedo, FaStar } from "react-icons/fa";
import { IMaskInput } from "react-imask";
import { buscarPedreiros, buscarTiposServico } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
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

    useEffect(() => {
        const fetchTiposServico = async () => {
            setLoadingTipos(true);
            try {
                const data = await buscarTiposServico();
                setTiposServico(data);
            } catch (err) {
                console.error("Erro ao buscar tipos de serviços:", err);
            } finally {
                setLoadingTipos(false);
            }
        };
        fetchTiposServico();
    }, []);

    const handleBuscar = async () => {
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
                        />
                        <button onClick={handleBuscar} disabled={isLoadingBusca}>
                            {isLoadingBusca ? "Carregando..." : "Buscar Pedreiros"}
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
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            spaceBetween={20}
                            slidesPerView={1}
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
                                            <p><FaStar /> {pedreiro.media_avaliacoes || "Sem avaliações"}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="erro">Nenhum pedreiro encontrado para esse serviço.</p>
                    )}
                </>
            )}
        </section>
    );
}

export default Buscas;
