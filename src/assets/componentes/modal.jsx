import React, { useState, useEffect } from 'react'; // Adicione o useEffect
import './modal.scss';
import Login from './login';
import CadastroContratante from './cadastro';
import EsqueciMinhaSenha from './redefinirSenha';
import ValidarCodigo from './validarCodigo';

const Modal = ({ isOpen, closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRedefinirSenha, setIsRedefinirSenha] = useState(false);
  const [passo, setPasso] = useState(1);

  // Efeito para resetar o modal sempre que for aberto
  useEffect(() => {
    if (isOpen) {
      setIsLogin(true); // Sempre abre no login
      setIsRedefinirSenha(false); // Reseta a tela de redefinição de senha
      setPasso(1); // Reseta o passo para o inicial
    }
  }, [isOpen]); // Executa sempre que isOpen mudar

  if (!isOpen) return null;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsRedefinirSenha(false);
    setPasso(1);
  };

  const toggleRedefinirSenha = () => {
    setIsRedefinirSenha(true);
    setPasso(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>X</button>

        {isRedefinirSenha ? (
          passo === 1 ? (
            <EsqueciMinhaSenha setPasso={setPasso} />
          ) : (
            <ValidarCodigo setPasso={setPasso} />
          )
        ) : isLogin ? (
          <div>
            <Login />
            <button className="toggle-btn" onClick={toggleRedefinirSenha}>
              Esqueceu sua senha?
            </button>
          </div>
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