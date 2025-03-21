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

export const buscarTiposServico = async () => {
    try {
        const response = await axios.get(`${API_URL}/tipos/servicos`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tipos de serviços:", error);
        throw error;
    }
};

export const verificarToken = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const response = await axios.get(`${API_URL}/user/validar-token`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao validar token ", error.response?.data || error.message);
        return null;
    }
};


export const postarServico = async (servico) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Usuário não autenticado");
        }

        const response = await axios.post(
            `${API_URL}/add/servico`,
            servico,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Erro ao postar serviço:", error.response?.data || error.message);
        throw error;
    }
};
