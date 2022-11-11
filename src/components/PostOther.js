import React from 'react'
import dateFormat from './Date'

export default function PostOther(props) {
    const date = dateFormat(props.date)
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <h5>Posted by <em>{props.author}</em> on {date}</h5>
            </div>
            <p>{props.content}</p>
            <h4>Replies: {props.replies.length}</h4>
        </div>
    )
}