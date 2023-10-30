import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={require("../assets/images/img-3.jpg")} alt="Forest trees" />
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <h1>Login</h1>
          <p>Email</p>
          <input type="email" placeholder="Email address" />
          <div className="password">
            <p>Password</p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <input type="password" placeholder="Password" />
          <button className="login-item" type="submit">
            Login
          </button>
          <div className="register">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
