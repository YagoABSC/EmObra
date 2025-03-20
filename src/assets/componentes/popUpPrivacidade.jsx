import React, { useEffect, useState } from 'react';
import './popUpPrivacidade.scss';

const PopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsOpen(true);
    }
  }, []);

  const handleChoice = (choice) => {
    setClosing(true);
    setTimeout(() => {
      localStorage.setItem('cookieConsent', choice);
      setIsOpen(false);
    }, 300); // Tempo da animação
  };

  if (!isOpen) return null;

  return (
    <div className={`popup-overlay ${closing ? 'fade-out' : ''}`}>
      <div className={`popup-content ${closing ? 'popup-closing' : ''}`}>
        <p>Este site usa cookies para garantir que você obtenha a melhor experiência.</p>
        <div className="popup-buttons">
          <button onClick={() => handleChoice('accepted')} className="accept-button">Aceitar</button>
          <button onClick={() => handleChoice('declined')} className="decline-button">Recusar</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
