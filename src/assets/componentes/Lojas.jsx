import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Lojas.scss'
import fotoLoja from '/imgs-fixas/parceiro-padrao.png'

import { Pagination } from 'swiper/modules';

const cards = [
    { id: 1, nome: "Card 1", endereco: "Rua Endereço, nº 0", link: "www.google.com" },
    { id: 2, nome: "Card 2", endereco: "Rua Endereço, nº 0", link: "www.google.com" },
    { id: 3, nome: "Card 3", endereco: "Rua Endereço, nº 0", link: "www.google.com" },
    { id: 4, nome: "Card 4", endereco: "Rua Endereço, nº 0", link: "www.google.com" },
    { id: 5, nome: "Card 5", endereco: "Rua Endereço, nº 0", link: "www.google.com" },
    { id: 6, nome: "Card 6", endereco: "Rua Endereço, nº 0", link: "www.google.com" }
];

function Lojas() {
    return (
        <section className="banners-lojas-parceiros">
            <h2>Lojas Parceiras do EmObra.com</h2>

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
                        <article className="banner-loja-fundo">
                            <div className="banner-loja-parceira">
                                <img src={fotoLoja} alt="Parceiro Padrão" />
                                <div className="info-loja-parceira">
                                    <h3>
                                        {card.nome}
                                    </h3>
                                    <p>
                                        {card.endereco}
                                    </p>
                                    <p>
                                        {card.link}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
}

export default Lojas;