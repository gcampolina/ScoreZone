import "./style.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login({ setIsAuthenticated }) {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {email: usuario, senha });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/');
      } 
    } catch (error) {
    // Erros do servidor (resposta com status)
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        alert('Usuário não encontrado');
      } else if (status === 401) {
        alert('Senha incorreta');
      } else {
        alert('Erro no servidor: ' + data.error);
      }
    } else {
      // Erros inesperados (sem resposta do servidor)
      alert('Erro ao fazer login. Tente novamente.');
    }

    console.error(error);
  }
}

  return (

   <div className="login-container">
      <h1>Login</h1>
      <form className="formLogin" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Email" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        <button type="button" onClick={handleLogin}>Entrar</button>
      </form>
    </div>
   
    


  );
}

