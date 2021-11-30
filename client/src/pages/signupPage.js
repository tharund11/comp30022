// import React, { Component } from "react";
import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import backgroundVideo from "../resources/backgroundVideo.mp4";
import "./login.css";
import axios from 'axios';

function SignUpPage() {
    // render() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    
    const register = () => {
        axios({
            method: "post",
            data: {
                username: registerUsername,
                firstName: registerFirstName,
                lastName: registerLastName,
                phoneNumber: registerPhoneNumber,
                password: registerPassword
            },
            withCredentials: true,
            url: "https://team-ion-backend.herokuapp.com/user/register"
        }).then((res) => console.log(res.data));
    };
    
        return (
            <div className = 'login'>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form>
                            <div className="form-group">
                                <video autoPlay loop muted
                                style = {{
                                    position: "absolute",
                                    width: "100%",
                                    left: "0%",
                                    top: "0%",
                                    height: "100%",
                                    objectFit: "cover",
                                    // transform: "translate(-50%,-50%)",
                                    zIndex: "-1",
                                    opacity: "85%"
                                }}
                                >
                                    <source src = {backgroundVideo} type ="video/mp4"></source>
                                </video>
                            </div>
                            <h3>Sign Up</h3>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Username/Email" onChange={e => setRegisterUsername(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="First name" onChange={e => setRegisterFirstName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" onChange={e => setRegisterLastName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control" placeholder="Phone Number" onChange={e => setRegisterPhoneNumber(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" onChange={e => setRegisterPassword(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" onClick={register} >Sign Up</button>
                            </div>

                            <p className="have-an-account">
                                Already have an account?
                                <Link to="/sign-in" > Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    // }
}

export default SignUpPage;