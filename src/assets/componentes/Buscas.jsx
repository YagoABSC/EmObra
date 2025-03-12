import React, { useState, useEffect } from "react";
import { FaUserTie, FaMapMarkerAlt, FaShieldAlt, FaTools } from "react-icons/fa";
import InputMask from "react-input-mask"; // Importando a biblioteca para máscara
import { buscarPedreiros } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./Buscas.scss";
import { FaStar } from "react-icons/fa6";

function Buscas() {
    const [tipoServico, setTipoServico] = useState("");
    const [cep, setCep] = useState("");
    const [pedreiros, setPedreiros] = useState([]);
    const [erro, setErro] = useState("");
    const [tiposServico, setTiposServico] = useState([]);

    useEffect(() => {
        // Buscar os tipos de serviços da API
        const fetchTiposServico = async () => {
            try {
                const response = await fetch('https://apiobra.vercel.app/tipos/servicos');
                const data = await response.json();
                setTiposServico(data);
            } catch (err) {
                console.error("Erro ao buscar tipos de serviços:", err);
            }
        };
        fetchTiposServico();
    }, []);

    const handleBuscar = async () => {
        try {
            setErro("");
            const data = await buscarPedreiros(tipoServico, cep);
            setPedreiros(data.pedreiros || []);
        } catch (err) {
            setErro("Erro ao buscar pedreiros. Verifique os dados e tente novamente.");
        }
    };

    return (
        <section className="buscas">
            <h1>Seu projeto merece os <span>melhores profissionais!<FaUserTie /></span></h1>
            <h2>
                Encontre <span><FaTools /> pedreiros qualificados</span> perto de você e transforme sua obra em 
                <span>realidade</span> com <span><FaShieldAlt /> segurança</span> e <span>eficiência</span>.
            </h2>

            <div className="busca-inputs">
                <InputMask
                    mask="99999-999"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="Informe seu Cep"
                />
                <div className="tipo-servico">
                    {tiposServico.map((servico) => (
                        <button
                            key={servico.id}
                            onClick={() => setTipoServico(servico.id)}
                            className={tipoServico === servico.id ? "ativo" : ""}
                        >
                            <img
                                src={`/imgs-fixas/${servico.img_servico}`}
                                alt={servico.nome_servico}
                                className="icone-servico"
                            />
                            {servico.nome_servico}
                        </button>
                    ))}
                </div>
                <button onClick={handleBuscar}>Buscar Pedreiros</button>
            </div>

            {erro && <p className="erro">{erro}</p>}

            {pedreiros.length > 0 && (
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="swiper-container"
                >
                    {pedreiros.map((pedreiro) => (
                        <SwiperSlide key={pedreiro.id}>
                            <div className="pedreiro-card">
                                <img 
                                    src={pedreiro.img_perfil.startsWith("http") ? pedreiro.img_perfil : `/images/${pedreiro.img_perfil}`} 
                                    alt={pedreiro.nome} 
                                    className="pedreiro-img"
                                />
                                <div className="pedreiro-info">
                                    <h3>{pedreiro.nome}</h3>
                                    <p><FaMapMarkerAlt /> {pedreiro.distancia_km} km de distância</p>
                                    <p><FaStar/> {pedreiro.media_avaliacoes || "Sem avaliações"}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}

export default Buscas;
