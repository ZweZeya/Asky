import React, { useState } from 'react'
import Layout from '../Layout'
import axios from 'axios';

export default function Login() {
    // Storing form data in a state object
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    // Storing error message in a state
    const [errMsg, setErrMsg] = useState("");
    const handleChange = (e) => {
        setData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    };
    // Send a post request to server
    const login = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/login',
            data: data,
            withCredentials: true
        })
        .then(res => {
            if (res.data === "success") {
                window.location.href = "/"
            } else {
                console.log("Failed to login");
            }
        })
        .catch(err => {
            console.log(err.message)
            setErrMsg("Invalid username or password")
        })
    };
    
    return (
        <Layout>
            <div className="register-main">
                <h2>Login</h2>
                <div className="register-form">         
                    <input onChange={handleChange} name="username" value={data.username} placeholder="Username" type="text"/>
                    <input onChange={handleChange} name="password" value={data.password} placeholder="Password" type="password"/>
                    <button className="login-btn" type="submit" onClick={login}>Login</button>
                    <p className="register-err-msg">{errMsg}</p>
                </div>
            </div>      
        </Layout>
    )
}