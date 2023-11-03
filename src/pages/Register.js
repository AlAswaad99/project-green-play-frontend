import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        alert('Passowrd and confirm password mismatch');
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/register`, formData);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      setLoading(false);

      navigate('/campaign');
    } catch (error) {
      console.error('Sign-in failed', error);
      alert(error.response.data.error);

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
    <div className="register-container">
      <div className="register-image">
        {/* <img src={require("../assets/images/img-6.jpg")} alt="Forest trees" /> */}
      </div>
      <div className="register-form-container">
        <form onSubmit={onSubmit}>

          <div className="register-form">
            <h1>Register</h1>
            <p>Username</p>
            <input type="text" name="username"
              placeholder="Username" value={formData.username}
              onChange={handleInputChange} />
            <p>Email</p>
            <input type="email" name="email"
              placeholder="Email address" value={formData.email}
              onChange={handleInputChange} />
            <p>Password</p>
            <input type="password" name="password"
              placeholder="Password" value={formData.password}
              onChange={handleInputChange} />
            <p>Confirm password</p>
            <input type="password" name="confirmPassword"
              placeholder="Confirm password" value={formData.confirmPassword}
              onChange={handleInputChange} />
            <button disabled={loading} className="register-item" type="submit">
              {loading ? "Registering..." : "Register"}
            </button>
            <div className="redirect-login">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Register;
