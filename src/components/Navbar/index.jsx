import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { useRef, useEffect, useState } from "react";
import logo from "../../../public/assets/logo.png";

export default function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const [collapsed, setCollapsed] = useState(isMobile);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const sidebarRef = useRef();
  const toggleButtonRef = useRef();

  useEffect(() => {
    function handleClick(event) {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) return;

      const clickedOutside =
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target);

      const clickedInsideLink =
        sidebarRef.current &&
        sidebarRef.current.contains(event.target) &&
        event.target.closest("a");

      if (!collapsed && (clickedOutside || clickedInsideLink)) {
        setCollapsed(true);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [collapsed]);

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, [isAuthenticated]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="sidebar-toggle-mobile"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <span
          className={`material-symbols-rounded ${
            collapsed ? "rotate-right" : "rotate-left"
          }`}
        >
          chevron_right
        </span>
      </button>

      <aside
        ref={sidebarRef}
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
      >
        <header className="sidebar-header">
          <img className="header-logo" src={logo} alt="Logo da GameScore" />
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
        </header>

        <div className="sidebar-content">
          <ul className="menu-list">
            <li className="menu-item">
              <Link className="menu-link" to="/">
                <span className="material-symbols-rounded">home</span>
                <p>Home</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to="/jogos">
                <span className="material-symbols-rounded">stadia_controller</span>
                <p>Explorar</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to="/">
                <span className="material-symbols-rounded">info</span>
                <p>Sobre</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to="/">
                <span className="material-symbols-rounded">wb_incandescent</span>
                <p>Sugerir Jogo</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to="/">
                <span className="material-symbols-rounded">bug_report</span>
                <p>Relatar Bug</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          {isAuthenticated && (
            <div className="text-welcome">
              <p>
                Bem-vindo, <strong>{nomeUsuario}</strong>
              </p>
            </div>
          )}
          {isAuthenticated ? (
            <ul className="menu-list">
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  <span className="material-symbols-rounded">person</span>
                  <p>Minha conta</p>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/" onClick={handleLogout}>
                  <span className="material-symbols-rounded">logout</span>
                  <p>Sair</p>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="menu-list">
              <li className="menu-item">
                <Link className="menu-link" to="/login">
                  <span className="material-symbols-rounded">login</span>
                  <p>Entrar</p>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
