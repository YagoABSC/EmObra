import React from "react";
import './Premium.scss'
import alcance from '../imgs-fixas/alcance.png'
import visibilidade from '../imgs-fixas/visibilidade.png'
import notificacao from '../imgs-fixas/notificacao2.png'

function Premium(){
    return(
        <section className="vantagens-premium">
            <h2>Conheça as vantagens de ser PedreiroPro</h2>

            <article className="vantagem-premium">
                <img src={alcance} alt="Ícone de alcance"/>
                <div className="explicacao-premium">
                    <h3>Maior alcance</h3>
                    <p>Encontre serviços em um raio de distância ainda maior. Pedreiro premium tem o dobro de alcance!</p>
                </div>
            </article>

            <article className="vantagem-premium">
                <img src={visibilidade} alt="Ícone de visibilidade"/>
                <div className="explicacao-premium">
                    <h3>Maior visibilidade</h3>
                    <p>Seja um dos primeiros resultados. Pedreiro Premium aparecerá entre os primeiros resultados quando um contratante realizar uma busca.</p>
                </div>
            </article>

            <article className="vantagem-premium">
                <img src={notificacao} alt="Ícone de notificação"/>
                <div className="explicacao-premium">
                    <h3>Notificação em tempo real</h3>
                    <p>Avisamos quando tiver serviço novo. Receba no seu celular e email um aviso de quando surgirem novas oportunidades do seu interesse.</p>
                </div>
            </article>
        </section>
    )
}

export default Premium; 