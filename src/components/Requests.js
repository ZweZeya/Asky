import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

export default function RequestReceived(props) {
    const Add = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/friends',
            withCredentials: true,
            data: {username: props.username, action: "add"}
        })
        .then(res => {
            console.log(res.data);
            window.location.reload(false);
        })
    }

    const Ignore = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/friends',
            withCredentials: true,
            data: {username: props.username, action: "ignore"}
        })
        .then(res => {
            console.log(res.data);
            window.location.reload(false);
        })
    }

    return (
        <div className="request-user">
            <h3>{props.username}</h3>
            <div className="request-actions">
                <button type="submit" onClick={Add}><AddIcon /></button>
                <button type="submit" onClick={Ignore}><DeleteIcon /></button>
            </div>
        </div>
    );
}

export function RequestSent(props) {
    return (
        <div className="request-user">
            <h3>{props.username}</h3>
        </div>
    )
}