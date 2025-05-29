import "./style.css";
import backgroundVideo from '../../../public/assets/backgroundVideo.mp4';



export default function Home() {


  return (
    <>
    

    <video autoPlay loop muted className="bg-video">
    <source src={backgroundVideo} type="video/mp4" />
    Seu navegador não suporta vídeos em HTML5.
    </video>
    <div className="overlay"></div>

    
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
        <a href="/jogos" className="explore-btn">Bora Começar!</a> 
      </div>
    </div>

    
    </>
  );
}
