import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { UserContext } from '../Context'
import axios from 'axios';

export default function Home() {
    // Checking if user is logged in
    const user = useContext(UserContext);

    if (!user) {
        return (
            <Layout>
                    <div className="home-unauth">
                        <h1>The world at your fingertips</h1>
                        <h3>Make friends and build your network</h3>
                        <div className="home-unauth-form">
                            <p>Login to your account</p>
                            <div className="home-unauth-btn" >
                                <Link to="/login">Login</Link>
                            </div>
                            <p>Don't have an account?</p>                    
                            <div className="home-unauth-btn">
                                <Link to="/register">Register</Link>
                            </div>
                        </div>
                    </div>           
            </Layout>       
        ) 
    } 

    return (
        <Layout>
            <h2 className="home-title">Welcome back {user.username}</h2>
            <div>

            </div>
        </Layout>
    )

}



