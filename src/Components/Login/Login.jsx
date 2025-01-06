import { useState } from "react";
import "./Login.scss";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <p className="login__text">Login</p>
            <div className="login__underline"></div>
          </div>

          <div className="login__inputs">
            <div className="login__input">
              <img className="login__img" src={email_icon} alt="" />
              <input
                className="login__input-box"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login__input">
              <img className="login__img" src={password_icon} alt="" />
              <input
                className="login__input-box"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login__submit-container">
            <button onClick={handleSubmit}>Click me</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
