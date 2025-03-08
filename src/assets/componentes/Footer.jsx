import React from "react";
import './Footer.scss';
import { AiFillInstagram } from "react-icons/ai";
import { TfiYoutube } from "react-icons/tfi";
import { AiFillTikTok } from "react-icons/ai";

function Footer() {
    return (
        <footer>
            <h2>Contato</h2>
            <div className="info-contato-footer">
                <p>(11) 8989898989</p>
                <p>emobracom@gmail.com</p>
            </div>
            <div className="redes-sociais-footer">

                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><AiFillInstagram className="redes-icons" /></a>


                <a href="https://www.tiktok.com/pt-BR/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><AiFillTikTok className="redes-icons"/></a>


                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><TfiYoutube className="redes-icons" /></a>
            </div>
        </footer>
    )
}

export default Footer;