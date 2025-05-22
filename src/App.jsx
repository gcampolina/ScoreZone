import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import JogoDetalhes from './pages/JogoDetalhes';

export default function App() {
  return (
    <>
      <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/jogo/:id" element={<JogoDetalhes />} />
      </Routes>
      

    </>
  );
}
