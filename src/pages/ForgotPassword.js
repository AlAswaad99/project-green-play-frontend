import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userPool } from '../aws-config';

import "./Register.css";
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showConfirmationForm, setshowConfirmationForm] = useState(false);
    const [username, setUsername] = useState('');


    const [formData, setFormData] = useState({
        email: '',
        username: '',
        oldpassword: '',
        newPassword: '',
        confirmNewPassword: '',
        verificationCode: ''
    });



    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!showConfirmationForm) {
                if (formData.newPassword !== formData.confirmNewPassword) {
                    alert('Passowrd and confirm password mismatch');
                    return;
                }
                const dataEmail = {
                    Name: 'email',
                    Value: formData.email
                };
                const attributeEmail = new CognitoUserAttribute(dataEmail);


                // await new Promise((resolve, reject) => {
                userPool.signUp(formData.email, "D@xasd!234", [attributeEmail], null, function (err, result) {
                    console.log(err);
                    console.log(result);
                    if (err) {
                        if (err.message === "An account with the given email already exists.") {
                            var userData = {
                                Username: formData.email,
                                Pool: userPool,
                            };
                            const cognitoUser = new CognitoUser(userData);
                            cognitoUser.forgotPassword({
                                onSuccess: function (data) {
                                    // successfully initiated reset password request
                                    console.log('CodeDeliveryData from forgotPassword: ' + data);
                                },
                                onFailure: function (err) {
                                    alert(err.message || JSON.stringify(err));
                                },
                                // //Optional automatic callback
                                // inputVerificationCode: function(data) {
                                //     console.log('Code sent to: ', data);

                                //     cognitoUser.confirmPassword(formData.verificationCode, newPassword, {
                                //         onSuccess() {
                                //             console.log('Password confirmed!');
                                //         },
                                //         onFailure(err) {
                                //             console.log('Password not confirmed!');
                                //         },
                                //     });
                                // },
                            });
                            setshowConfirmationForm(true);
                            setLoading(false);
                            // reject(err);
                            return;
                        }
                        else {
                            console.error("Email Doesn't Exist:");
                            alert("Email Doesn't Exist:")
                            setLoading(false);
                            // reject(err);
                            return;
                        }

                    }

                    console.error("Email Doesn't Exist:");
                    alert("Email Doesn't Exist:")
                    setLoading(false);
                    // reject(err);
                    return;
                    // Optionally, handle additional actions after successful sign-up
                    // resolve();
                });
            }
            else {
                if (formData.newPassword !== formData.confirmNewPassword) {
                    alert('Passowrd and confirm password mismatch');
                    setLoading(false);
                    return;
                }
                var userData = {
                    Username: formData.email,
                    Pool: userPool,
                };
                const cognitoUser = new CognitoUser(userData);

                cognitoUser.forgotPassword({
                    onSuccess: function (data) {
                        // successfully initiated reset password request
                        console.log('CodeDeliveryData from forgotPassword: ' + data);
                    },
                    onFailure: function (err) {
                        alert(err.message || JSON.stringify(err));
                    },
                    //Optional automatic callback
                    inputVerificationCode: function (data) {
                        console.log('zdata: ', data)
                        console.log('formData.verificationCode: ', formData.verificationCode)
                        console.log('formData.newPassword: ', formData.newPassword)

                        cognitoUser.confirmPassword(formData.verificationCode, formData.newPassword, {
                            onSuccess() {
                                console.log('Password confirmed!');
                                setLoading(false);
                                navigate("/login")
                            },
                            onFailure(err) {
                                console.log('Password not confirmed!');
                                alert("Password not confirmed!");
                                setLoading(false);
                            },
                        });
                    },
                });
            }
        } catch (error) {
            console.error('Password Reset failed', error);
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
                        <h1>Reset Password</h1>

                        <p>Email</p>
                        <input type="email" name="email"
                            placeholder="Email address" value={formData.email}
                            onChange={handleInputChange} />

                        <button disabled={loading} className="register-item" type="submit">
                            {loading ? "Sending..." : "Send"}
                        </button>
                        <div className="redirect-login">
                            <Link to="/login">Go to Login</Link>
                        </div>
                    </div>
                </form>}
                {showConfirmationForm && <form onSubmit={onSubmit}>

                    <div className="register-form">
                        <h1>Reset Password</h1>
                        <p>A verification code has been sent to your email. Please use that to reset password</p>
                        <p>Verification Code</p>
                        <input type="text" name="verificationCode"
                            placeholder="Code" value={formData.verificationCode}
                            onChange={handleInputChange} />
                        <p>New Password</p>
                        <input type="text" name="newPassword"
                            placeholder="New Password" value={formData.newPassword}
                            onChange={handleInputChange} />
                        <p>Confirm New Password</p>
                        <input type="text" name="confirmNewPassword"
                            placeholder="Confirm New Password" value={formData.confirmNewPassword}
                            onChange={handleInputChange} />
                        <button disabled={loading} className="register-item" type="submit">
                            {loading ? "Resetting..." : "Reset"}
                        </button>
                        <div className="redirect-login">
                            <Link to="/login">Go to Login</Link>
                        </div>
                    </div>
                </form>}

            </div>
        </div>
    );
};

export default ForgotPassword;
