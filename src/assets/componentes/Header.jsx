import React, { useState, useEffect } from "react";
import './Header.scss';
import { IoMdCloudDownload } from "react-icons/io";
import Modal from './modal';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 700);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Define como true se houver um token
    }, []);

    const openModal = () => setIsModalOpen(true); 
    const closeModal = () => setIsModalOpen(false);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove o token do localStorage
        localStorage.removeItem("userId"); // Remove o userId do localStorage
        setIsAuthenticated(false); // Atualiza o estado para refletir a desautenticação
        window.location.reload(); // Recarrega a página para aplicar as mudanças
    };

    return (
        <header>
            <nav>
                <img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo em obra" />
                {isMobile ? (
                    <button className="btn-app">
                        <span>Baixar App</span>
                        <IoMdCloudDownload size={25} color="white" />
                    </button>
                ) : (
                    <div className="menu-header">
                        <a href="">Sobre nós</a>
                        <a href="">Parceiros</a>
                        <a href="">Contato</a>
                        {isAuthenticated ? (
                            <a href="#" onClick={handleLogout}>Sair</a>
                        ) : (
                            <a href="#" onClick={openModal}>Login</a>
                        )}
                        <button className="btn-app">
                            <span>Baixar App</span>
                            <IoMdCloudDownload size={25} color="white" />
                        </button>
                    </div>
                )}
            </nav>
            <Modal isOpen={isModalOpen} closeModal={closeModal} />
        </header>
    );
}

export default Header;
