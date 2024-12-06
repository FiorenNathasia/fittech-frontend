import { useState } from "react";
import "./Login.scss";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

function Login() {
  const [action, setAction] = useState("Login");
  return (
    <>
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <p className="login__text">{action}</p>
            <div className="login__underline"></div>
          </div>

          <div className="login__inputs">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="login__input">
                <img className="login__img" src={user_icon} alt="" />
                <input
                  className="login__input-box"
                  type="text"
                  placeholder="Name"
                />
              </div>
            )}

            <div className="login__input">
              <img className="login__img" src={email_icon} alt="" />
              <input
                className="login__input-box"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="login__input">
              <img className="login__img" src={password_icon} alt="" />
              <input
                className="login__input-box"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          {action === "Sign up" ? (
            <div></div>
          ) : (
            <div className="login__forgotpassword">
              Forgot Password? <span>Click here!</span>
            </div>
          )}

          <div className="login__submit-container">
            <div
              className={
                action === "Login" ? "login__submit gray" : "login__submit"
              }
              onClick={() => {
                setAction("Sign up");
              }}
            >
              Sign up
            </div>
            <div
              className={
                action === "Sign up" ? "login__submit gray" : "login__submit"
              }
              onClick={() => {
                setAction("Login");
              }}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
