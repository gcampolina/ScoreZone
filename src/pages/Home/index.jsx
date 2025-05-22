import "./style.css";
import { Link } from "react-router-dom";
import jogos from "../../components/Jogos/jogos.js";
import { useBusca } from "../../hooks/BuscaContext.jsx";
import { useEffect } from "react";

export default function Home() {
  const { busca, setBusca } = useBusca();
  useEffect(() => {
    // limpa a busca ao entrar na home
    setBusca("");
  }, []);

  const jogosFiltrados = jogos.filter((game) =>
    game.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="home-container">

      <input
        type="text"
        placeholder="Buscar por um jogo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="search-input"
      />


      <div className="game-grid">
        {jogosFiltrados.map((game) => (
          <Link to={`/jogo/${game.id}`} key={game.id} className="game-card">
            <img src={game.imagem} alt={game.nome} />
            <div className="info-card">
              <h2>{game.nome}</h2>
              <p>{game.ano}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
