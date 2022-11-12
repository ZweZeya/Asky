import React, { useState } from 'react'
import Layout from '../Layout'
import axios from 'axios'

export default function Register() {
    // Storing form data in a state object
    const [data, setData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    
    // Storing error message in a state
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    };
    // Send a post request to server
    const register = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/register',
            data: data,
            withCredentials: true
        })
        .then(res => {
            if (res.data === "success") {
                window.location.href = "/login"
            } else {
                setErrorMsg(res.data)
            }
        })
    };

    return (
        <Layout>
            <div className="register-main">
                <h2>Register</h2>
                <div className="register-form">         
                    <input onChange={handleChange} name="username" value={data.username} placeholder="Username" type="text" required/>
                    <input onChange={handleChange} name="password" value={data.password} placeholder="Password" type="password" required/>
                    <input onChange={handleChange} name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" type="password" required/>
                    <button className="login-btn" type="submit" onClick={register}>Register</button>
                    <p className="register-err-msg">{errorMsg}</p>
                </div>
            </div>      
        </Layout>
    )
}