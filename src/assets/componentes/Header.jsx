import React, { useState, useEffect } from "react";
import "./Header.scss";
import { IoMdCloudDownload } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import Modal from "./modal";

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        setIsAuthenticated(!!token);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        window.location.reload();
    };

    return (
        <header>
            <nav>
                <img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo em obra" />
                {isMobile ? (
                    <>
                        <button className="menu-icon" onClick={toggleMenu}>
                            {isMenuOpen ? <FiX size={30} color="black" /> : <FiMenu size={30} color="black" />}
                        </button>
                        {isMenuOpen && (
                            <div className="mobile-menu">
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
                    </>
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
