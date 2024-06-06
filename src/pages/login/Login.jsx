import "./Login.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./LoginValidation";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2>Log in</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="login__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="login__error">{errors.email}</span>
            )}
          </div>
          <div className="login__password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="login__error">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="login__button">
            <strong>Login</strong>{" "}
          </button>
          <p>You agree to our terms and conditions</p>
          <Link to="/signup" className="login__button-signup">
            <strong>Create Account</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
