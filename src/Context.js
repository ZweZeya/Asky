import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext({});

export default function Context({ children }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get('http://localhost:4000/user', {withCredentials: true}).then(
            res => setUser(res.data)
        );
    }, [])
    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )
}