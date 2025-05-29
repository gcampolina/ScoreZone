import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import logo from '../../../public/assets/logo.png';

export default function NavBar({ isAuthenticated, setIsAuthenticated }) {

  const navigate = useNavigate();

  const [nomeUsuario, setNomeUsuario] = useState("");
useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, [isAuthenticated]);


  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem("nomeUsuario");
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (

   <>
    <nav className="navbar">
      <div className="nav-container">

        <div className="start-nav">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="Logo da ScoreZone" />
          </Link>
          
        </div>

        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/jogos">Explorar</Link>
            <Link to="/">Sobre</Link>
            <Link to="/">Sugerir Jogo</Link>
        </div>

        <div className="end-nav">
          
          {isAuthenticated && <p>Bem-vindo, <strong>{nomeUsuario}</strong></p>}
          {isAuthenticated ? (
          <>
          <Link className="btnEntrar" to="/">
              <i className="fa-solid fa-user"></i>
          </Link>

          <Link className="btnEntrar" to="/" onClick={handleLogout}>
             Sair <i className="fa-solid fa-right-to-bracket"></i>
          </Link>
          </>
          ) : (

          <Link className="btnEntrar" to="/login">
            Entrar <i className="fa-solid fa-right-to-bracket"></i>
          </Link>
          )}
        </div>
      </div>
    </nav>



</>
  );
}
