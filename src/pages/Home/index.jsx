import "./style.css";
import backgroundVideo from '../../../public/assets/backgroundVideo.mp4';
import { useNavigate, Link } from "react-router-dom";


export default function Home() {


  return (
    <>
    

    <video autoPlay loop muted playsInline disablePictureInPicture className="bg-video">
    <source src={backgroundVideo} type="video/mp4" />
    Seu navegador não suporta vídeos em HTML5.
    </video>
    <div className="overlay"></div>

    
   <div className="home">
      <div className="typing-box">
        <h1 className="typing">
          Mostre sua visão gamer!
        </h1>
        <p className="subtext">Explore, avalie e compartilhe sua opinião na GameScore.</p>
        <div className="stars-animation">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
        

          <Link to="/jogos" className="explore-btn">Bora Começar!</Link>

      </div>
    </div>

    
    </>
  );
}
