import "./style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Estrelas from "../../components/Estrelas";


export default function JogoDetalhes() {
  
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState("");  // só o texto do alerta
  const baseURL = import.meta.env.VITE_API_URL;

  

  useEffect(() => {
    fetch(`${baseURL}/jogo/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar o jogo");
        }
        return res.json();
      })
      .then((data) => {
        setJogo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!jogo) return <h2>Jogo não encontrado!</h2>;


function mostrarAlerta(msg) {
  setAlerta(msg);
  setTimeout(() => setAlerta(""), 3000);
}

  
  return (
<>

  

  <div className="msgContainer">
      <div className="erroContainer">
        {alerta && <div className="erro-login">{alerta}</div>}
      </div>
    </div>

    <div
      className="detalhes-container"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(30,30,47,0.6), #1e1e2f 80%, #1e1e2f 100%),
          url(${jogo.imgFundo})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="detalhes-content">
        <div className="detalhes-head">
          <img className="detalhes-img"
            src={jogo.imgCard}
            alt={jogo.nome}
          />
          <h2>Avalie agora:</h2>
          <Estrelas jogoId={id} onAlerta={mostrarAlerta} />
        </div>

        <div className="detalhes-info">
          <h1>{jogo.nome}</h1>
          <p>{jogo.descricao}</p> <br />
          <p>Lançado em {jogo.anoLancamento}</p>
        </div>
      </div>
    </div>
    </>
  );
  
}
