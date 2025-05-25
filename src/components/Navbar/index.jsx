import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { useBusca } from "../../hooks/BuscaContext.jsx";


export default function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const { busca, setBusca } = useBusca();
  const navigate = useNavigate();


  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="start-nav">
          <Link to="/" className="nav-logo">
            ScoreZone
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
          </div>
        </div>


        <div className="end-nav">

          {isAuthenticated ? (
          <Link className="btnEntrar" to="/login" onClick={handleLogout}>
             Sair <i className="fa-solid fa-right-to-bracket"></i>
          </Link>
          ) : (

          <Link className="btnEntrar" to="/login">
             Entrar <i className="fa-solid fa-right-to-bracket"></i>
          </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
