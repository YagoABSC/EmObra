import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verificarToken } from "../api";

const useAuth = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verificarAutenticacao = async () => {
            if (!token) {
                navigate("/");
                return;
            }


            const usuarioValido = await verificarToken();
            if (!usuarioValido) {
                localStorage.removeItem("token");
                navigate("/");
                // return;
            }
        };

        verificarAutenticacao();
        
    }, [token, navigate]);
};

export default useAuth;