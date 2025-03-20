import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './assets/componentes/Header';
import PopUp from './assets/componentes/popUpPrivacidade';
import Banner from './assets/componentes/Banner';
import Sobre from './assets/componentes/Sobre';
import Footer from './assets/componentes/Footer';
import Lojas from './assets/componentes/Lojas';
import Premium from './assets/componentes/Premium';
import Instituicao from './assets/componentes/Instituicao';
import Buscas from './assets/componentes/Buscas';
import Postar from './assets/componentes/Postar';

function App() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true); // Inicia com o PopUp aberto

  const handleAccept = () => {
    // Lógica de aceitar a política de privacidade
    console.log('Política de Privacidade aceita');
    setIsPopUpOpen(false); // Fecha o PopUp
  };

  const handleDecline = () => {
    // Lógica de recusar a política de privacidade
    console.log('Política de Privacidade recusada');
    setIsPopUpOpen(false); // Fecha o PopUp
  };

  return (
    <>
      <Header />
      <PopUp isOpen={isPopUpOpen} closePopUp={() => setIsPopUpOpen(false)} handleAccept={handleAccept} handleDecline={handleDecline} />
      <main>
        <Banner />
        <Buscas />
        <Postar />
        <Sobre />
        <Premium />
        <Lojas />
        {/* <Instituicao /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
