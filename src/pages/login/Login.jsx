import "./Login.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    setErrors(Validation(values));
  }, [values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
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
