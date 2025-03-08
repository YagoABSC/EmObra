import React, { useState } from "react";
import { buscarPedreiros } from "../../api";

function Buscas() {
    const [tipoServico, setTipoServico] = useState("");
    const [cep, setCep] = useState("");
    const [pedreiros, setPedreiros] = useState([]);
    const [erro, setErro] = useState("");

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
            <h1>Estamos <span>Em Obra!</span></h1>
            <h2>Facilitando conexões, <br /> concretizando projetos.</h2>

            <div>
                <input
                    type="text"
                    placeholder="Tipo de Serviço ID"
                    value={tipoServico}
                    onChange={(e) => setTipoServico(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="CEP Contratante"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />
                <button onClick={handleBuscar}>Buscar Pedreiros</button>
            </div>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <ul>
                {pedreiros.map((pedreiro) => (
                    <li key={pedreiro.id}>
                        {pedreiro.nome} - {pedreiro.distancia_km} km
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Buscas;
