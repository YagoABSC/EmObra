import axios from 'axios';

const API_URL = 'https://apiobra.vercel.app'; 
// const API_URL = 'http://localhost:3000'; 

export const buscarPedreiros = async (tipoServicoId, cepContratante) => {
    try {
        console.log("Enviando requisição para a API...");
        const response = await axios.post(`${API_URL}/buscar/pedreiros`, {
            tipo_servico_id: tipoServicoId,
            cep_contratante: cepContratante
        });
        console.log("Resposta da API:", response);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar pedreiros:", error);
        console.log("Resposta de erro:", error.response);
        throw error;
    }
};

