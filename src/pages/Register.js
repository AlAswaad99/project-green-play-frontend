import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-image">
        <img src={require("../assets/images/img-6.jpg")} alt="Forest trees" />
      </div>
      <div className="register-form-container">
        <div className="register-form">
          <h1>Register</h1>
          <p>Username</p>
          <input type="text" placeholder="Username" />
          <p>Email</p>
          <input type="email" placeholder="Email address" />
          <p>Password</p>
          <input type="password" placeholder="Password" />
          <p>Confirm password</p>
          <input type="password" placeholder="Confirm password" />
          <button className="register-item" type="submit">
            Register
          </button>
          <div className="redirect-login">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
