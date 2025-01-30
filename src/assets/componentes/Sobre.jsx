import React from "react";
import './Sobre.scss';
import missaoImg from '../imgs-fixas/tijolo.png'
import visaoImg from '../imgs-fixas/muro1.png'
import valorImg from '../imgs-fixas/acordo.png'

function Sobre() {
    return (
        <section class="sobre-nos" id="sobre-nos">
            <h2>Vem saber mais sobre a gente</h2>
            <div class="sobre-nos-carrossel">
                <article class="sobre-nos-card">
                    <h3>A nossa Obra</h3>
                    <p>Aqui, a ideia é simples: conectar quem precisa com quem sabe fazer, de um jeito rápido e fácil.
                    </p>
                    <div class="sobre-nos-icones">
                        <img src={missaoImg} alt="Ícone de missão" class="sobre-nos-icone" />
                    </div>
                </article>

                <article class="sobre-nos-card">
                    <h3>A Obra que Queremos Entregar</h3>
                    <p>Ser a solução prática que todo mundo usa no dia a dia.</p>
                    <div class="sobre-nos-icones">
                        <img src={visaoImg} alt="Ícone de visão" class="sobre-nos-icone" />
                    </div>
                </article>

                <article class="sobre-nos-card">
                    <h3>Nossos alicerces</h3>
                    <p>Oportunidade para todos e respeito em cada ação. Aqui, todo mundo tem espaço.</p>
                    <div class="sobre-nos-icones">
                        <img src={valorImg} alt="Ícone de valores" class="sobre-nos-icone" />
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Sobre;