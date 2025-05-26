import "./style.css";
import { useParams } from "react-router-dom";
import Estrelas from "../../components/Estrelas";
import jogos from "../../components/Jogos/jogos.js";


export default function JogoDetalhes() {
  const { id } = useParams();
  const jogo = jogos.find((j) => j.id === parseInt(id));

  if (!jogo) {
    return <h2>Jogo não encontrado!</h2>;
  }

  return (
    <div
      className="detalhes-container"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(30,30,47,0.6), #1e1e2f 80%, #1e1e2f 100%),
          url(${jogo.fundo})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="detalhes-content">
        <div className="detalhes-head">
          <img
            src={jogo.imagem}
            alt={jogo.nome}
            style={{ width: "300px", maxHeight: "300px", borderRadius: "10px"}}



          />
          <h2>Avalie agora:</h2>
          <Estrelas />
        </div>

        <div className="detalhes-info">
          <h1>{jogo.nome}</h1>
          <p>{jogo.descricao}</p> <br />
          <p>Lançado em {jogo.ano}</p>
        </div>
      </div>
    </div>
  );
}
