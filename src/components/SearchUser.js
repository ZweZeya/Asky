import React, { useContext, useEffect, useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios'
import { UserContext } from '../Context'

export default function SearchUser(props) {
    let user = useContext(UserContext);
    // Storing a list of users who do not require the request button
    const [noRequestList, setNoRequestList] = useState([user.username]);

    // Send get requests to server on page load
    useEffect(() => {
        // Retrieve the request object
        axios({
            method: 'get',
            url: 'http://localhost:4000/connect',
            withCredentials: true
        })
        .then(res => {
            setNoRequestList(prev => [...prev, ...res.data.in, ...res.data.out]);
        })
        .catch(err => console.log(err.message))

        // Retrieve friends array
        axios({
            method: 'get',
            url: 'http://localhost:4000/friends',
            withCredentials: true
        })
        .then(res => {
            setNoRequestList(prev => [...prev, ...res.data]);
        })
        .catch(err => console.log(err.message))

        // Remoing duplicates from the list of users
        setNoRequestList(prev => {
            let unique = [];
            prev.forEach(user => {
                if (!unique.includes(user)) {
                    unique.push(user);
                };
            })
            return unique;
        });
    }, []);

    // Send a post request to server to send a friend request
    const sendRequest = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/connect',
            withCredentials: true,
            data: {username: props.username}
        })
        .then(res => {
            console.log(res.data);
            window.location.reload(false);
        })
    };

    return (
        <div className="search-user">
            <div>
                <h3>{props.username}</h3>
                <p>Friends: {props.friendsNum}</p>
            </div>
            {noRequestList.includes(props.username) ? <></> : <button type="submit" onClick={sendRequest}><PersonAddIcon /></button>}
        </div>
    )
}