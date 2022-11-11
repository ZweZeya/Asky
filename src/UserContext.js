import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const UserContext = createContext(null);
export default function Context({ children }) {
    const [user, setUser] = useState("");
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:4000/user',
            withCredentials: true,
        })
        .then(res => setUser(res.data))
    }, [])

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )
}

