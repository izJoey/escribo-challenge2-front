import "./styles.scss";
import reactlogo from "../../assets/React-Symbol.png";
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      console.log("Request Payload:", { email, password: pass });
      const response = await api.post("/auth/login", {
        email: email,
        password: pass,
      });

      const userData = response.data;
      console.log(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/feed");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        setErrorMessage(error.response.data.mensagem);
      } else if (error.request) {
        console.error("No response received from the server.");
        setErrorMessage("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        setErrorMessage("Error setting up the request: " + error.message);
      }
    }
  }

  return (
    <>
      <div className="container-login">
        <div className="inner-conteiner">
          <img src={reactlogo} alt="" />
          <div className="login-container">
            <h3>Login</h3>
            <hr />
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the default form submission behavior
                handleLogin(e);
              }}
            >
              <div className="input-wrap">
                <span htmlFor="">Email</span>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-wrap">
                <span htmlFor="">Senha</span>
                <br />
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="button-wrap">
                <button type="submit">Entrar</button>
              </div>
            </form>
            {/* Exibe a mensagem de erro se existir */}
            {errorMessage && (
              <div className="error-message">
                <small>{errorMessage}</small>
              </div>
            )}
            <div className="signUp">
              <p>Ainda não tem uma conta?</p>
              <a href="/cadastro">Cadastre-se já </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
