import { Routes, Route, Navigate  } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Jogos from './pages/Jogos';
import Login from './pages/Login';
import JogoDetalhes from './pages/JogoDetalhes';
import { useState, useEffect  } from 'react';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);



  return (
    <>

   
      

      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route path="/jogo/:id" element={<JogoDetalhes />} />
      </Routes>
      
      
      
    </>
  );  
}
