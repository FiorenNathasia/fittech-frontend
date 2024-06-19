import "./Signup.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./SignupValidation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.confirmPassword === ""
    ) {
      axios
        .post("http://localhost:8081/api/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.data &&
            err.response.data.error === "Email already in use"
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email already in use",
            }));
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h2>Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="signup__name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
            />
            {errors.name && (
              <span className="signup__error">{errors.name}</span>
            )}
          </div>
          <div className="signup__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="signup__error">{errors.email}</span>
            )}
          </div>
          <div className="signup__password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="signup__error">{errors.password}</span>
            )}
          </div>
          <div className="signup__confirmPassword">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInput}
            />
            {errors.confirmPassword && (
              <span className="signup__error">{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className="signup__button">
            <strong>Signup</strong>
          </button>
          <p>You agree to our terms and conditions</p>
          <Link to="/" className="signup__button-login">
            <strong>Log in</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;
