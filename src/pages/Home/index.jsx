import "./style.css";

export default function Home() {


  return (
   <div className="home">
      <div className="typing-box">
        <h1 className="typing">
          Quem joga também vota. Mostre sua visão gamer!
        </h1>
        <p className="subtext">Explore, avalie e compartilhe sua opinião na ScoreZone.</p>
        <div className="stars-animation">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
        <a href="/jogos" className="explore-btn">Comece Agora</a>
      </div>
    </div>
  );
}
