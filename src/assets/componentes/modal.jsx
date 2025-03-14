import React, { useState } from 'react';
import './modal.scss';  
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
        <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>

       
        {isLogin ? (
          <form>
            <input type="text" placeholder="Usuário" />
            <input type="password" placeholder="Senha" />
            <button type="submit">Entrar</button>
          </form>
        ) : (
      
          <CadastroContratante />
        )}

        <button className="toggle-btn" onClick={toggleForm}>
          {isLogin ? 'Criar conta' : 'Já tem uma conta? Fazer login'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
