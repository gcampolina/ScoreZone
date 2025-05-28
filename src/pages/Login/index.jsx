import "./style.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login({ setIsAuthenticated }) {

  const [usuario, setUsuario] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [sucess, setSucess] = useState("");
  const navigate = useNavigate();
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  


  async function handleCadastro(e) {
  e.preventDefault();
  setErroLogin("");
  setSucess("");

if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
  setErroLogin("Email inválido. Use um formato como nome@dominio.com");
  setTimeout(() => {
        setErroLogin("");
      }, 2000);
  return;
}

  try {
    const response = await axios.post('http://localhost:3000/usuarios', {
      nome,
      email,
      senha: senhaCadastro,
      idade: idade ? parseInt(idade, 10) : null,
    });

    if (response.status === 201) {
      setSucess("Cadastro realizado com sucesso!");
      setMostrarCadastro(false); // volta pro login
      setTimeout(() => {
        setSucess("");
      }, 2000);
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 409) {
      setErroLogin('Email já cadastrado.');
    } else if (data.error) {
      setErroLogin('Erro ao cadastrar: ' + data.error);
    } else if (data.message) {
      setErroLogin('Erro ao cadastrar: ' + data.message);
    } else {
      setErroLogin('Erro ao cadastrar.');
    }
  } else {
    setErroLogin('Erro inesperado. Tente novamente.');
  }

    setTimeout(() => {
    setErroLogin('');
  }, 3000);


    console.error(error);
  }
}

  

  async function handleLogin(e) {
    e.preventDefault();
    setErroLogin("");
    try {
      const response = await axios.post('http://localhost:3000/login', {email: usuario, senha: senhaLogin });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("nomeUsuario", response.data.nome);
        setIsAuthenticated(true);
        navigate('/');
      } 
    } catch (error) {
    // Erros do servidor (resposta com status)
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        setErroLogin('Usuário não encontrado');
      } else if (status === 401) {
        setErroLogin('Senha incorreta');
      } else {
        setErroLogin('Erro no servidor: ' + data.error);
      }
    } else {
      // Erros inesperados (sem resposta do servidor)
      setErroLogin('Erro ao fazer login. Tente novamente.');
    }

    setTimeout(() => {
        setErroLogin(false);
        setTimeout(() => setErroLogin(''), 500); // espera o fade-out terminar pra remover o texto
      }, 3000);
    

    console.error(error);
  }
}

  return (
    <>

    <div className="msgContainer">
      <div className="erroContainer">
        {sucess && <div className="sucess-login">{sucess}</div>}
      </div>
      <div className="erroContainer">
        {erroLogin && <div className="erro-login">{erroLogin}</div>}
      </div>
    </div>
      

      <div className="login-container">
        <h1>{mostrarCadastro ? 'Cadastro' : 'Login'}</h1>

        {!mostrarCadastro ? (
          <form className="formLogin" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senhaLogin}
              onChange={(e) => setSenhaLogin(e.target.value)}
            />
            <button className="btnEntrar" type="submit">Entrar</button>
            <div className="linkLoginRegister">
            <p>Não possui uma conta? <a href="#" onClick={e => { e.preventDefault(); setMostrarCadastro(true)}}>Cadastrar-se agora!</a></p>
            </div>
          </form>
        ) : (
          <form className="formLogin" onSubmit={handleCadastro}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senhaCadastro}
              onChange={(e) => setSenhaCadastro(e.target.value)}
            />
            <button className="btnEntrar" type="submit">Cadastrar</button>
            <div className="linkLoginRegister">
            <p>Já tem uma conta? <a href="#" onClick={() => setMostrarCadastro(false)}>Entrar agora!</a></p>
            </div>
          </form>
        )}
      </div>
    
    </>
  );
}

