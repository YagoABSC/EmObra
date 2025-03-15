import React, { useState } from 'react';
import './modal.scss';
import Login from './login';
import CadastroContratante from './cadastro';



const Modal = ({ isOpen, closeModal }) => {

  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>X</button>


        {isLogin ? (
          < Login />
        ) : (

          <CadastroContratante />
        )}

        <button className="toggle-btn" onClick={toggleForm}>
          {isLogin ? 'Cadastre-se' : 'Já tem uma conta? Fazer login'}
        </button>

      </div>
    </div>
  );
};

export default Modal;