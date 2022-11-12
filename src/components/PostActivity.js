import React from 'react'
import dateFormat from './Date'

export default function PostActivity(props) {

    // Adding a custom date format
    const date = dateFormat(props.date);

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <h5>Posted by <em>{props.author}</em> on {date}</h5>
            </div>
            <p className="activity-post">{props.content}</p>
            <div className="activity-replies-header">
                <h4>Replies: {props.replies.length}</h4>
            </div>
        </div>
    )
}