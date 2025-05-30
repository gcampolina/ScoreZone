import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";


export default function Estrelas({ jogoId, onAlerta  }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [meuVoto, setMeuVoto] = useState(null);
  const [media, setMedia] = useState(0);
  const [totalVotos, setTotalVotos] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;


 async function carregarDados() {
  const token = localStorage.getItem("token");
  setLoading(true);
  
  try {
    const res = await fetch(`${baseURL}/voto?jogoId=` + jogoId, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const texto = await res.text();
      console.error("Resposta inválida da API (não ok):", texto);
      throw new Error("Erro ao carregar votos");
    }

    const dados = await res.json();
    setMedia(dados.media);
    setTotalVotos(dados.totalVotos);
    setMeuVoto(dados.seuVoto || null);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (jogoId) carregarDados();
  }, [jogoId]);




  async function votar(index) {
    const voto = index + 1;
    const token = localStorage.getItem("token");

    if (!token) {
       onAlerta && onAlerta("É preciso estar logado para votar.");
      return;
    }
    try {
      const res = await fetch(`${baseURL}/votar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ voto, jogoId }),
      });

      if (!res.ok) {

        if (res.status === 401) {
          navigate("/login");
          return;
        }
        const erro = await res.json();
        alert(erro.erro || "Erro ao votar");
        return;
      }
      
      const data = await res.json();
      setMeuVoto(voto);
      setMedia(data.media);
      setTotalVotos(data.totalVotos);
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar voto");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!jogoId) return <p>ID do jogo não fornecido.</p>;
  


  
  return (
    <>
    <div className="estrelas">
      {[...Array(5)].map((_, index) => {
        const estrelaAtiva =
          hoverIndex !== null
            ? index <= hoverIndex
            : meuVoto !== null
            ? index < meuVoto
            : false;

        return (
          <span
            key={index}
            className={`estrela ${estrelaAtiva ? "ativa" : ""}`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => votar(index)}
            style={{ cursor: "pointer" }}
          >
            ★
          </span>
        );
      })}
      
    </div>
    <p>Média: {media.toFixed(1)} ({totalVotos} voto{totalVotos !== 1 ? "s" : ""})</p>
    </>
  );
}
