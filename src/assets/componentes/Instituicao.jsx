import React from "react";
import './Instituicao.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import parceiro1 from '../imgs-fixas/parceiro-belasartes.png';
import parceiro2 from '../imgs-fixas/parceiro-faap.jpg';
import parceiro3 from '../imgs-fixas/parceiro-fssp.jpg';
import parceiro4 from '../imgs-fixas/parceiro-ic.jpeg';
import parceiro5 from '../imgs-fixas/parceiro-poliusp.jpg';
import parceiro6 from '../imgs-fixas/parceiro-senai.jpg';

const cards = [
    { id: 1, nome: "Card 1", descricao: "Rua Endereço, nº 0", link: "www.google.com", img: parceiro1 },
    { id: 2, nome: "Card 2", descricao: "Rua Endereço, nº 0", link: "www.google.com", img: parceiro2 },
    { id: 3, nome: "Card 3", descricao: "Rua Endereço, nº 0", link: "www.google.com", img: parceiro3 },
    { id: 4, nome: "Card 4", descricao: "Rua Endereço, nº 0", link: "www.google.com", img: parceiro4 },
    { id: 5, nome: "Card 5", descricao: "Rua Endereço, nº 0", link: "www.google.com", img: parceiro5 },
    { id: 6, nome: "Card 6", descricao: "Rua Endereço, nº 0", link: "www.google.com", img: parceiro6 }
];

function Instituicao() {
    return (
        <section className="instituicoes-parceiras">
            <div className="chamada-institu-parceiras">
                <h2>O seu futuro faz parte da nossa obra!</h2>
                <p>Conheça nossos parceiros que querem fazer parte dessa empreitada.</p>
            </div>
            <div className="container-parceiros">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },

                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                        1444: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {cards.map((card) => (
                        <SwiperSlide key={card.id}>
                            <div className="banner-institu-parceira">
                                <div className="info-institu-parceira">
                                    <h3>
                                        {card.nome}
                                    </h3>
                                    <p>
                                        {card.descricao}
                                    </p>
                                    <a href={card.link} className="btn-institu" target="_blank"
                                        rel="noopener noreferrer">Veja mais</a>
                                </div>
                                <img src={card.img}
                                    alt={card.nome} />
                            </div>
                        </SwiperSlide>
                    ))}



                </Swiper>
            </div>
        </section>
    )
}

export default Instituicao;