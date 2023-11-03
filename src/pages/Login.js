import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, formData);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      setLoading(false);
      navigate('/campaign');
    } catch (error) {
      alert('Sign-in failed. Please check your credentials.');
      console.error('Sign-in failed', error);
      setLoading(false);

    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="login-container">
      <div className="login-image">
        {/* <img src={require("../assets/images/img-3.jpg")} alt="Forest trees" /> */}
      </div>
      <div className="login-form-container">
        <form onSubmit={onSubmit}>
          <div className="login-form">
            <h1>Login</h1>
            <p>Email</p>
            <input type="email" name="email"
              placeholder="Email address" value={formData.email}
              onChange={handleInputChange} />
            <div className="password">
              <p>Password</p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <input type="password" name="password"
              placeholder="Password" value={formData.password}
              onChange={handleInputChange} />
            <button disabled={loading} className="login-item" type="submit">
              {loading ? "Logging in..." : "Login"}

            </button>
            <div className="register">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
