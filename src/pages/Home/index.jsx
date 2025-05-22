import "./style.css";
import GtaImg from "../../assets/gtav.jpg";
import ValorantImg from "../../assets/valorant.jpg";
import LolImg from "../../assets/lol.jpg";

const jogos = [
  {
    id: 1,
    nome: "Grand Theft Auto V",
    ano: 2013,
    imagem: GtaImg,
  },
  {
    id: 2,
    nome: "League of Legends",
    ano: 2009,
    imagem: LolImg,
  },
  {
    id: 3,
    nome: "Valorant",
    ano: 2020,
    imagem: ValorantImg,
  },
  // mais jogos...
];

export default function Home() {
  return (
    <div className="home-container">
      <div className="game-grid">
        {jogos.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.imagem} alt={game.nome} />
            <div className="info-card">
              <h2>{game.nome}</h2>
              <p>{game.ano}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
