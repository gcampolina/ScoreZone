import "./style.css";
import { Link } from "react-router-dom";

import jogos from "../../components/Jogos/jogos.js";



export default function Home() {
  return (
    <div className="home-container">
      <div className="game-grid">
        {jogos.map((game) => (

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
