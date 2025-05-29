import "./style.css";
import { Link } from "react-router-dom";

import { useBusca } from "../../hooks/BuscaContext.jsx";
import { useEffect, useState } from "react";

export default function Jogos() {
  const { busca, setBusca } = useBusca();
  const [jogos, setJogos] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;





  useEffect(() => {
    // limpa a busca ao entrar em jogos
    setBusca("");
    // busca os jogos do backend
    fetch(`${baseURL}/jogos`) // mude a URL conforme seu backend
      .then((res) => res.json())
      .then((data) => {
      const ordenado = data.sort((a, b) => a.nome.localeCompare(b.nome));
      setJogos(ordenado);
      })
      .catch((err) => console.error("Erro ao buscar jogos:", err));
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

<div className="scrollable-games">
      <div className="game-grid">
        {jogosFiltrados.map((game) => (
          <Link to={`/jogo/${game.id}`} key={game.id} className="game-card">
            <img src={game.imgCard} alt={game.nome} />
            <div className="info-card">
              <h2>{game.nome}</h2>
              <p>{game.anoLancamento}</p>
            </div>
          </Link>
        ))}
      </div>
</div>
    </div>
  );
}
