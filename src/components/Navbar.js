import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
    const user = useContext(UserContext);
    const logOut = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/logout',
            withCredentials: true
        })
        .then(res => {
            if (res.data === "success") {
                window.location.href = "/"
            } else {
                console.log("Failed to logout")
            }
        })
    };
    return (
        <div className="nav-main">
            <Link className="nav-brand" to="/">Asky</Link>
            {user && 
            <div className="nav-items">
                <Link className="nav-item" to="/activity">Activity</Link>
                <Link className="nav-item" to="/connect">Connect</Link>
                <Link className="nav-item" to="/profile">Profile</Link>                
                <Link className="nav-item" onClick={logOut}><LogoutIcon /></Link>
            </div>
            }
        </div>
    )
}