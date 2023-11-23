import "./styles.scss";
import img from "../../assets/tablet.png";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [ddd, setDDD] = useState("");

  const [alertName, setAlertName] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertPhone, setAlertPhone] = useState(false);
  const [alertPass, setAlertPass] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  // Validação de campos vazios e dominio válido
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const navigate = useNavigate();

  const handleDDDKeyUp = (e) => {
    // Verifica se o input está preenchido
    if (e.target.value.length === 2) {
      // Foco no próximo input
      document.getElementById("tel").focus();
    }
  };

  const sendData = async () => {
    if (!validName) {
      setAlertName(true);
      if (name === "") {
        setMsgAlert("Registre o seu nome para prosseguir.");
      }
      setTimeout(() => {
        setAlertName(false);
      }, 7000);

      return;
    } else if (!validEmail) {
      setAlertEmail(true);

      if (email === "") {
        setMsgAlert("Registre o seu endereço de e-mail para prosseguir.");
      } else if (validateSpecialCharacter("email", email)) {
        setMsgAlert(
          "Existem acentos, símbolos ou espaços não permitidos no e-mail. Por favor, remova-os."
        );
      } else {
        setMsgAlert(
          'Insira um formato válido de e-mail. "Exemplo: nome@email.com".'
        );
        setTimeout(() => {
          setAlertEmail(false);
        }, 7000);

        return;
      }
      return;
    } else if (validateSpecialCharacter("email", email)) {
      setAlertEmail(true);
      setMsgAlert(
        "Existem acentos, símbolos ou espaços não permitidos no e-mail. Por favor, remova-os."
      );
      setTimeout(() => {
        setAlertEmail(false);
      }, 7000);
      return;
    } else if (pass === "") {
      setAlertPass(true);
      setMsgAlert("Registre uma senha para prosseguir.");

      setTimeout(() => {
        setAlertPass(false);
      }, 7000);
      return;
    } else if (phone === "") {
      setAlertPhone(true);
      setMsgAlert("Registre o seu telefone para prosseguir.");

      setTimeout(() => {
        setAlertPhone(false);
      }, 7000);
      return;
    }
  };

  async function handleRegister(e) {
    sendData();
    e.preventDefault();

    try {
      console.log("Request Payload:", { email, password: pass });
      const response = await api.post("/auth/register", {
        email: email,
        password: pass,
        nome: name,
        telefones: [
          {
            numero: phone,
            ddd: ddd,
          },
        ],
      });
      console.log(response.data);
      //navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }

    navigate("/");
  }

  const validateSpecialCharacter = (contentField) => {
    var regex =
      /[!@#$%^&*()_+\-=\[\]{};':¨"\\|,<>~?/ àáâãäåèéêëìíîïòóôõöøùúûüç]/g;

    if (contentField.match(regex)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let validatedName = /^([A-zà-úÀ-Ú]{2,})/;

    setValidName(validatedName.test(name));
  }, [name]);

  useEffect(() => {
    let validatedEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setValidEmail(validatedEmail.test(email));
  }, [email]);

  return (
    <>
      <div className="container">
        <div className="inner-conteiner">
          <img src={img} alt="" />
          <div className="login-container">
            <h3>Cadastro</h3>
            <hr />
            <form action="">
              <div className="input-wrap">
                <span htmlFor="">Nome</span>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="div-alert">
                  {alertName ? <small>{msgAlert}</small> : " "}
                </div>
              </div>
              <div className="input-wrap">
                <span htmlFor="">Email</span>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="div-alert">
                  {alertEmail ? <small>{msgAlert}</small> : " "}
                </div>
              </div>

              <div className="input-wrap">
                <span htmlFor="">Senha</span>
                <br />
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <div className="div-alert">
                  {alertPass ? <small>{msgAlert}</small> : " "}
                </div>
              </div>
              <div className="input-wrap">
                <span htmlFor="">Telefone</span>
                <br />
                <div className="phone-number">
                  <input
                    className="ddd"
                    type="text"
                    value={ddd}
                    maxLength="2"
                    onChange={(e) => setDDD(e.target.value)}
                    onKeyUp={handleDDDKeyUp}
                  />
                  <input
                    id="tel"
                    className="tel"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength="9"
                  />
                </div>
                <div className="div-alert">
                  {alertPhone ? <small>{msgAlert}</small> : " "}
                </div>
              </div>
              <div className="button-wrap">
                <button onClick={handleRegister}>Cadastrar</button>
              </div>
            </form>
            <div className="signUp">
              <p>Já tem uma conta?</p>
              <a href="/">Login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
