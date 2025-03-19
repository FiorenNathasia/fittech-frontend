import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        user
      );
      navigate("/login");
      return response;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__header">
            <p className="signup__text">Sign Up</p>
            <div className="signup__underline"></div>
          </div>

          <div className="signup__inputs">
            <div className="signup__input">
              <input
                className="signup__input-box"
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="sign__input-box"
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="signup__input">
              <input
                className="signup__input-box"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="signup__input">
              <input
                className="signup__input-box"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="login__message">{error}</div>}
          </div>
          <div className="signup__submit-container">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
