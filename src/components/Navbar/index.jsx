import { Link } from "react-router-dom";
import "./style.css";
import { useBusca } from "../../hooks/BuscaContext.jsx";

export default function NavBar() {
  const { busca, setBusca } = useBusca();

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

          <Link className="btnEntrar" to="/login">
             Entrar <i className="fa-solid fa-right-to-bracket"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
