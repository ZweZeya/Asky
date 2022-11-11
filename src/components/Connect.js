import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import axios from 'axios';
import SearchUser from './SearchUser'
import RequestReceived, { RequestSent } from './Requests';

export default function Connect() {
    const [name, setName] = useState("");
    const [found, setFound] = useState([]);
    const [requestsReceived, setRequestsReceived] = useState();
    const [requestsSent, setRequestsSent] = useState();
    const [errMsg, setErrMsg] = useState("");

    // Load the request side of the page when the page loads
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:4000/connect',
            withCredentials: true
        })
        .then(res => {
            setRequestsReceived(prevRequests => {
                if (res.data.in.length > 0) {
                    const newRequests = res.data.in.map(
                        item => {
                            return (
                                <RequestReceived key={item} username={item} />
                            )
                        }
                    )
                    return newRequests
                }
            });
            setRequestsSent(prevRequests => {
                if (res.data.out.length > 0) {
                    const newRequests = res.data.out.map(
                        item => {
                            return (
                                <RequestSent key={item} username={item} />
                            )
                        }
                    )
                    return newRequests
                }
            });
        })
        .catch(err => console.log(err.message))
    }, [])

    // Storing search field in a state
    const handleChange = (e) => {
        setName(prevName => e.target.value);
    }

    // Send a post request to the server to search up users
    const search = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/search',
            withCredentials: true,
            data: {name: name}
        })
        .then(res => {
            if (res.data === "No search results") {
                setErrMsg(res.data);
                setFound([]);

            } else {
                setFound(res.data);
                setErrMsg("");
            }
        })
        .catch(err => console.log(err.message))
    };

    // Map the search results into SearchUser elements
    const foundUsers = found.map(user => {
        return (
            <SearchUser
                key={user.username}
                username={user.username}
                friendsNum={user.friends}
            />
        )
    })

    return (
        <Layout>
            <div className="connect-main">
                <div className="connect-search">
                    <div>
                        <h3>Search & Connect</h3>
                        <input type="text" onChange={handleChange} value={name} placeholder="Username" required />
                        <button type="submit" onClick={search}>Search</button>
                        <p>{errMsg}</p>  
                        <div className="connect-search-results">
                            <h4>Users Found: {found.length}</h4>
                            {foundUsers}
                        </div>
                    </div>
                </div>
                <div className="connect-requests">
                    <div className="connect-requests-in">
                        <h3>Requests Received: {requestsReceived ? requestsReceived.length : 0}</h3>
                        {requestsReceived && requestsReceived}
                    </div>
                    <div className="connect-requests-out">
                        <h3>Requests Sent: {requestsSent ? requestsSent.length : 0}</h3>
                        {requestsSent && requestsSent}
                    </div>
                </div>
            </div>
        </Layout>
    )
}