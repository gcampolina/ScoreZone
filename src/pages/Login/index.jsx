import "./style.css";

export default function Login() {
  return (


   <div className="login-container">
      <h1>Login</h1>
      <form className="formLogin">
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="button">Entrar</button>
      </form>
    </div>
   
    


  );
}

