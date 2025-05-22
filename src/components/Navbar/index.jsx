import { Link } from 'react-router-dom';
import "./style.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">ScoreZone</Link>
        <div className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/login">Login <i class="fa-solid fa-right-to-bracket"></i> </Link>
        </div>
      </div>
    </nav>
  );
}
