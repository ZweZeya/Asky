import React from 'react'

export default function Post(props) {
    return (
        <div className="post-main">
            <h3>{props.title}</h3>
            <p className="post-content">{props.content}</p>
        </div>
    )
}