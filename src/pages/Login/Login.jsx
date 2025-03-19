import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const signup = () => {
    navigate("/signup");
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
            </div>{" "}
            {error && <div className="login__message">{error}</div>}
          </div>

          <div className="login__submit-container">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={signup}>Signup</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
