// import React, { Component } from "react";
import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
//Now with link coming from react-router you can use **to**
import backgroundVideo from "../resources/backgroundVideo.mp4";
import "./login.css";
import axios from 'axios';

function SignInPage({setUserId}) {
    // render() {

        const [loginUsername, setLoginUsername] = useState("");
        const [loginPassword, setLoginPassword] = useState("");

        const login = () => {
            axios({
                method: "post",
                data: {
                    username: loginUsername,
                    password: loginPassword
                },
                withCredentials: true,
                url: "https://team-ion-backend.herokuapp.com/user/login"
            }).then((req) => localStorage.setItem('userId', req.data));
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
                                    opacity: "90%"
                                }}
                                >
                                    <source src = {backgroundVideo} type ="video/mp4"></source>
                                </video>
                            </div>
                            <h3>Welcome</h3>

                            {/* Username Field */}
                            <div className="form-group">
                                <label>Username</label>
                                <input type="email" className="form-control" placeholder="Username/Email" onChange={e => setLoginUsername(e.target.value)} />
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={e => setLoginPassword(e.target.value)} />
                            </div>

                            {/* Remember me button */}
                            <div className="form-group">
                                <div className="custom-control custom-checkbox" >
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1"> Remember me</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <Link to="/contact-page">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={login}>Sign in</button>
                                </Link>
                            </div>
                            
                            <p className="have-an-account">
                                Don't have an account?
                                <Link to="/sign-up" > Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    // }
}

export default SignInPage;