import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userPool } from '../aws-config';

import "./Register.css";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showConfirmationForm, setshowConfirmationForm] = useState(false);
  const [username, setUsername] = useState('');


  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!showConfirmationForm) {
        if (formData.password !== formData.confirmPassword) {
          alert('Passowrd and confirm password mismatch');
          return;
        }
        const dataEmail = {
          Name: 'email',
          Value: formData.email
        };
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        const dataUsername = {
          Name: 'name',
          Value: formData.username
        };
        const attributeUsername = new CognitoUserAttribute(dataUsername);
        console.log("hehe")

        // await new Promise((resolve, reject) => {
        userPool.signUp(formData.email, formData.password, [attributeEmail,attributeUsername], null, function (err, result) {
          console.log(err);
          console.log(result);
          if (err) {
            console.error('Error signing up:', err.message || JSON.stringify(err));
            alert('Error signing up: ' + (err.message || JSON.stringify(err)))
            setLoading(false);
            // reject(err);
            return;
          }

          const cognitoUser = result.user;
          console.log('User signed up:', cognitoUser.getUsername());
          setUsername(cognitoUser.getUsername());
          setshowConfirmationForm(true);
          // localStorage.setItem('user', JSON.stringify(cognitoUser.getUserData()));
          // localStorage.setItem('session', JSON.stringify(cognitoUser.getSession()));

          setLoading(false);

          // navigate('/campaign');
          return;
          // Optionally, handle additional actions after successful sign-up
          // resolve();
        });
      }
      else {
        var userData = {
          Username: username,
          Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        // var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmRegistration(formData.verificationCode, true, function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            setLoading(false);
            return;
          }
          console.log('call result: ' + result);
          setLoading(false);
          navigate('/login')
        });
      }
    } catch (error) {
      console.error('Sign-up failed', error);
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
        {!showConfirmationForm && <form onSubmit={onSubmit}>

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
        </form>}
        {showConfirmationForm && <form onSubmit={onSubmit}>

          <div className="register-form">
            <h1>Verify Email</h1>
            <p>A verification code has been sent to your email. Please use that to verify your Account</p>
            <p>Verification Code</p>
            <input type="text" name="verificationCode"
              placeholder="Code" value={formData.verificationCode}
              onChange={handleInputChange} />
            <button disabled={loading} className="register-item" type="submit">
              {loading ? "Verifying..." : "Verify"}
            </button>
            <div className="redirect-login">
              Didn't get code? <Link onClick={() => {
                var userData = {
                  Username: username,
                  Pool: userPool,
                };
                const cognitoUser = new CognitoUser(userData);
                cognitoUser.resendConfirmationCode(function (err, result) {
                  if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                  }
                  console.log('call result: ' + result);
                });
              }}>Resend Code</Link>
            </div>
          </div>
        </form>}

      </div>
    </div>
  );
};

export default Register;
