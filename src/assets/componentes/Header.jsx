import React from "react";
import { useState, useEffect } from "react";
import './Header.scss';
import { FaAlignJustify } from "react-icons/fa6";

function Header() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 700);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header>
            <nav>
                <h1>EmObra</h1>
                {isMobile ? (
                
                    <FaAlignJustify size={20} />
                    
                ) : (
                    <div className="menu-header">
                        <a href="">Sobre nós</a>
                        <a href="">Aplicativo</a>
                        <a href="">Parceiros</a>
                        <a href="">Contato</a>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;